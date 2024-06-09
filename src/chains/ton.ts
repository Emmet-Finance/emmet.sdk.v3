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
  ChainID,
  ChainName,
  FetchTxInfo,
  GetBalance,
  GetProvider,
  GetTokenBalance,
  GetTxFee,
  NativeCoinName,
  ProtocolFee,
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
  GetTxFee &
  ChainName &
  NativeCoinName &
  ChainID &
  FetchTxInfo &
  ProtocolFee;

export interface TonParams {
  client: TonClient;
  bridge: Address;
  nativeTokenId: bigint;
  oracle: Address;
  burner: Address;
  chainName: string;
  chainId: bigint;
}

export function tonHandler({
  client,
  bridge,
  nativeTokenId,
  oracle,
  burner,
  chainName,
  chainId,
}: TonParams): TonHelper {
  //@ts-ignore TODO: Use it.
  const oracleContract = client.open(Oracle.fromAddress(oracle));
  const bridgeReader = client.open(Bridge.fromAddress(bridge));
  async function transferTon(
    bridge: OpenedContract<Bridge>,
    sender: Sender,
    to: string,
    tokenId: bigint,
    chainId: bigint,
    amount: bigint,
    gasArgs?: TonGasArgs,
  ): Promise<string> {
    return (await bridge.send(
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
    )) as unknown as Promise<string>;
  }

  const transferJettonToBurner = async (
    tid: bigint,
    signer: Sender,
    amt: bigint,
    destAddress: string,
    cid: bigint,
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
      },
    )) as unknown as Promise<string>;
  };
  const transferJettonToBridge = async (
    tid: bigint,
    signer: Sender,
    target_chain: bigint,
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
    chainId: bigint,
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
    id: () => Promise.resolve(chainId),
    nativeCoin: () => "TON",
    chainName: () => chainName,
    txFee(coin_name) {
      throw new Error(`Unimplemented ${coin_name}`);
    },
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
    protocolFee() {
      return bridgeReader.getProtocolFee();
    },
    async txInfo(hash) {
      try {
        const tx = await client.getTransactions(bridge, {
          limit: 1,
          hash: hash,
        });
        return {
          timestamp: BigInt(tx[0].now),
          value: tx[0].totalFees.coins,
        };
      } catch (_) {
        return {
          timestamp: 0n,
          value: 0n,
        };
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
      _,
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
