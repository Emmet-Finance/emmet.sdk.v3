import {
  Address,
  beginCell,
  JettonMaster,
  JettonWallet,
  type OpenedContract,
  type Sender,
  toNano,
  type TonClient,
} from "@ton/ton";
import type {
  CalculateCoinFees,
  CalculateDestinationTransactionFees,
  ChainName,
  GetBalance,
  GetCoinPrice,
  GetProvider,
  GetTokenBalance,
  NativeCoinName,
  SendInstallment,
  ValidateAddress,
} from ".";
import { Bridge } from "../contracts/ton";
import { sha256_sync } from "@ton/crypto";
import { Oracle } from "../contracts/ton/oracle";
import { WrappedJetton } from "../contracts/ton/jetton-master";
import { WrappedJettonWallet } from "../contracts/ton/jetton-wallet";

export type TonGasArgs = { value: bigint; bounce?: boolean | null | undefined };

export type TonHelper = GetBalance &
  GetProvider<TonClient> &
  SendInstallment<Sender, string, TonGasArgs> &
  ValidateAddress &
  GetTokenBalance &
  CalculateCoinFees &
  CalculateDestinationTransactionFees &
  GetCoinPrice &
  ChainName &
  NativeCoinName;

export interface TonParams {
  client: TonClient;
  bridge: Address;
  nativeTokenId: bigint;
  oracle: Address;
  burner: Address;
  chainName: string;
}

export function tonHandler({
  client,
  bridge,
  nativeTokenId,
  oracle,
  burner,
  chainName,
}: TonParams): TonHelper {
  const oracleContract = client.open(Oracle.fromAddress(oracle));
  const bridgeReader = client.open(Bridge.fromAddress(bridge));
  async function transferTon(
    bridge: OpenedContract<Bridge>,
    sender: Sender,
    to: string,
    tokenId: bigint,
    chainId: number,
    amount: bigint,
    gasArgs?: TonGasArgs,
  ): Promise<string> {
    return await bridge.send(
      sender,
      {
        //@ts-ignore
        value: amount + toNano("0.45"),
        ...gasArgs,
      },
      {
        $$type: "FreezeTon",
        amount: amount,
        target_chain: BigInt(chainId),
        to: beginCell().storeStringRefTail(to).endCell(),
        token_id: tokenId, // Should map to some token in the tokens table
      },
    ) as unknown as Promise<string>;
  }

  const transferJettonToBurner = async (
    tid: bigint,
    signer: Sender,
    amt: bigint,
    destAddress: string,
    cid: number,
    gasArgs?: TonGasArgs,
  ): Promise<string> => {
    const wtd = await bridgeReader.getWrappedTokens();
    const wt = wtd.get(tid)!;
    const jt = client.open(WrappedJetton.fromAddress(wt.address));
    const jtw = client.open(
      WrappedJettonWallet.fromAddress(
        await jt.getGetWalletAddress(signer.address!),
      ),
    );

    return (await jtw.send(
      signer,
      { value: toNano("0.45"), ...gasArgs },
      {
        $$type: "JettonTransfer",
        amount: amt,
        custom_payload: null,
        query_id: 0n,
        destination: burner,
        forward_payload: beginCell()
          .storeAddress(bridge)
          .storeUint(cid, 16)
          .storeRef(beginCell().storeUint(tid, 256).asCell())
          .storeRef(beginCell().storeStringRefTail(destAddress).asCell())
          .endCell(),
        forward_ton_amount: toNano("0.40"),
        response_destination: bridge,
      }
    )) as unknown as Promise<string>;
  };
  const transferJettonToBridge = async (
    tid: bigint,
    signer: Sender,
    target_chain: number,
    destAddress: string,
    amt: bigint,
    gasArgs?: TonGasArgs,
  ) => {
    const ntd = await bridgeReader.getNativeTokens();
    const wt = ntd.get(tid)!;
    const jt = client.open(WrappedJetton.fromAddress(wt.address));
    const jtw = client.open(
      WrappedJettonWallet.fromAddress(
        await jt.getGetWalletAddress(signer.address!),
      ),
    );
    return (await jtw.send(
      signer,
      { value: toNano("0.45"), ...gasArgs },
      {
        $$type: "JettonTransfer",
        amount: amt,
        custom_payload: null,
        destination: bridge,
        forward_payload: beginCell()
          .storeUint(target_chain, 16) // Target Chain
          .storeUint(tid, 256) // TokenID
          .storeRef(beginCell().storeStringRefTail(destAddress).asCell())
          .endCell(),
        forward_ton_amount: toNano("0.40"),
        query_id: 0n,
        response_destination: bridge,
      },
    )) as unknown as Promise<string>;
  };

  const transferJetton = async (
    to: Address,
    sender: Sender,
    tokenId: bigint,
    chainId: number,
    amount: bigint,
    destAddress: string,
    gasArgs?: TonGasArgs,
  ): Promise<string> => {
    if (to.toString() === burner.toString()) {
      return await transferJettonToBurner(
        tokenId,
        sender,
        amount,
        destAddress,
        chainId,
        gasArgs,
      );
    }

    return await transferJettonToBridge(
      tokenId,
      sender,
      chainId,
      destAddress,
      amount,
      gasArgs,
    );
  };

  async function isWrappedToken(tokenId: bigint) {
    const native = await bridgeReader.getNativeTokens();
    const isNative = native.get(tokenId);
    if (isNative) {
      return false;
    }
    const wrapped = await bridgeReader.getWrappedTokens();
    return wrapped.get(tokenId) !== null;
  }

  return {
    nativeCoin: () => "TON",
    chainName: () => chainName,
    getCoinPrice: async (coin) => {
      const pf = await oracleContract.getPriceFeed();
      const cid = BigInt(`0x${sha256_sync(coin).toString("hex")}`);
      const data = pf.get(cid);
      if (!data) {
        throw new Error(`No price info found for symbol ${coin}, id ${cid}`);
      }
      return data.price;
    },
    calculateTransactionFees: async (chain_name) =>
      oracleContract.getCalculateTransactionFees(chain_name),
    calculateCoinFees: async (coin_name, amt) =>
      oracleContract.getCalculateCoinFees(coin_name, amt),
    balance: (addr) => client.getBalance(Address.parse(addr)),
    provider: () => client,
    validateAddress: (addr) => {
      try {
        Address.parse(addr);
        return Promise.resolve(true);
      } catch (e) {
        return Promise.resolve(false);
      }
    },
    tokenBalance: async (token, addr) => {
      const jc = client.open(JettonMaster.create(Address.parse(token)));
      const jwa = await jc.getWalletAddress(Address.parse(addr));
      const jw = client.open(JettonWallet.create(jwa));
      return jw.getBalance();
    },
    sendInstallment: async (
      signer,
      amt,
      cid,
      tokenSymbol,
      destAddress,
      gasArgs,
    ) => {
      const bc = client.open(Bridge.fromAddress(bridge));
      const tid = BigInt(`0x${sha256_sync(tokenSymbol).toString("hex")}`);
      let hash = "";
      if (tid === nativeTokenId) {
        hash = await transferTon(
          bc,
          signer,
          destAddress,
          tid,
          cid,
          amt,
          gasArgs,
        );
      } else if (await isWrappedToken(tid)) {
        hash = await transferJetton(
          burner,
          signer,
          tid,
          cid,
          amt,
          destAddress,
          gasArgs,
        );
      } else {
        hash = await transferJetton(
          bridge,
          signer,
          tid,
          cid,
          amt,
          destAddress,
          gasArgs,
        );
      }

      return {
        hash: hash,
        tx: hash,
      };
    },
  };
}
