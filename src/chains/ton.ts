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
  GetBalance,
  GetProvider,
  GetTokenBalance,
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
  SendInstallment<Sender, undefined, TonGasArgs> &
  ValidateAddress &
  GetTokenBalance &
  CalculateCoinFees &
  CalculateDestinationTransactionFees;

export interface TonParams {
  client: TonClient;
  bridge: Address;
  nativeTokenId: bigint;
  oracle: Address;
  burner: Address;
}

export function tonHandler({
  client,
  bridge,
  nativeTokenId,
  oracle,
  burner,
}: TonParams): TonHelper {
  const oracleContract = client.open(Oracle.fromAddress(oracle));
  const bridgeReader = client.open(Bridge.fromAddress(bridge));
  function transferTon(
    bridge: OpenedContract<Bridge>,
    sender: Sender,
    to: string,
    tokenId: bigint,
    chainId: number,
    amount: bigint,
    gasArgs?: TonGasArgs,
  ) {
    return bridge.send(
      sender,
      {
        //@ts-ignore
        value: amount + toNano("0.3"),
        ...gasArgs,
      },
      {
        $$type: "FreezeTon",
        amount: amount,
        target_chain: BigInt(chainId),
        to: beginCell().storeStringRefTail(to).endCell(),
        token_id: tokenId, // Should map to some token in the tokens table
      },
    );
  }

  const transferJettonToBurner = async (
    tid: bigint,
    signer: Sender,
    amt: bigint,
    destAddress: string,
    cid: number,
    gasArgs?: TonGasArgs,
  ) => {
    const wtd = await bridgeReader.getWrappedTokens();
    const wt = wtd.get(tid)!;
    const jt = client.open(WrappedJetton.fromAddress(wt.address));
    const jtw = client.open(
      WrappedJettonWallet.fromAddress(
        await jt.getGetWalletAddress(signer.address!),
      ),
    );

    await jtw.send(
      signer,
      { value: 500000000n, ...gasArgs },
      {
        $$type: "JettonTransfer",
        amount: amt,
        custom_payload: null,
        query_id: 0n,
        destination: burner,
        forward_payload: beginCell()
          .storeAddress(bridge)
          .storeUint(cid, 16)
          .storeUint(tid, 16)
          .storeRef(beginCell().storeStringTail(destAddress).asCell())
          .endCell(),
        forward_ton_amount: 100000000n,
        response_destination: bridge,
      },
    );
  };
  const transferJettonToBridge = async (
    tid: bigint,
    signer: Sender,
    target_chain: number,
    destAddress: string,
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
    await jtw.send(
      signer,
      { value: 500000000n, ...gasArgs },
      {
        $$type: "JettonTransfer",
        amount: 1n,
        custom_payload: null,
        destination: bridge,
        forward_payload: beginCell()
          .storeUint(target_chain, 16) // Target Chain
          .storeUint(tid, 16) // TokenID
          .storeRef(beginCell().storeStringTail(destAddress).asCell())
          .endCell(),
        forward_ton_amount: 50000000n,
        query_id: 0n,
        response_destination: bridge,
      },
    );
  };

  const transferJetton = async (
    to: Address,
    sender: Sender,
    tokenId: bigint,
    chainId: number,
    amount: bigint,
    destAddress: string,
    gasArgs?: TonGasArgs,
  ) => {
    if (to.toString() === burner.toString()) {
      transferJettonToBurner(
        tokenId,
        sender,
        amount,
        destAddress,
        chainId,
        gasArgs,
      );
    } else {
      transferJettonToBridge(tokenId, sender, chainId, destAddress, gasArgs);
    }
  };

  async function isWrappedToken(tokenId: bigint) {
    const wrapped = await bridgeReader.getWrappedTokens();
    return wrapped.get(tokenId) !== null;
  }

  return {
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

      if (tid === nativeTokenId) {
        transferTon(bc, signer, destAddress, tid, cid, amt, gasArgs);
      } else if (await isWrappedToken(tid)) {
        await transferJetton(
          burner,
          signer,
          tid,
          cid,
          amt,
          destAddress,
          gasArgs,
        );
      } else {
        await transferJetton(
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
        hash: "",
        tx: undefined,
      };
    },
  };
}
