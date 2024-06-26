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
  Decimals,
  FetchTxInfo,
  GetBalance,
  GetBridgeAddress,
  GetEmmetHashFromTx,
  GetEstimatedTime,
  GetProvider,
  GetTokenBalance,
  GetTxFee,
  NativeCoinName,
  ProtocolFee,
  SendInstallment,
  TokenInfo,
  ValidateAddress,
} from ".";
import { Bridge, loadSentInstallment } from "../contracts/ton";
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
  ProtocolFee &
  GetEmmetHashFromTx &
  TokenInfo &
  GetEstimatedTime &
  GetBridgeAddress &
  Decimals;

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
  async function getLastBridgeTxHashInBase64() {
    const txns = await client.getTransactions(bridge, { limit: 1 });
    return txns[0].hash().toString("base64");
  }
  async function transferTon(
    bridge: OpenedContract<Bridge>,
    sender: Sender,
    to: string,
    targetTkn: string,
    chainId: bigint,
    amount: bigint,
    gasArgs: TonGasArgs,
  ): Promise<string> {
    return (await bridge.send(
      sender,
      {
        value: amount + gasArgs.value,
      },
      {
        $$type: "FreezeTon",
        amount: amount,
        target_chain: BigInt(chainId),
        to: beginCell().storeStringRefTail(to).endCell(),
        from_token: beginCell()
          .storeInt(toKey("TON"), 256)
          .storeStringRefTail("TON")
          .endCell(),
        to_token: beginCell()
          .storeInt(toKey(targetTkn), 256)
          .storeStringRefTail(targetTkn)
          .endCell(),
      },
    )) as unknown as Promise<string>;
  }

  const transferJettonToBurner = async (
    fromToken: string,
    targetToken: string,
    signer: Sender,
    amt: bigint,
    destAddress: string,
    cid: bigint,
    gasArgs: TonGasArgs,
  ): Promise<string> => {
    const tid = toKey(fromToken);
    const wtd = await bridgeReader.getTokens();
    const wt = wtd.get(tid)!;
    const jt = client.open(WrappedJetton.fromAddress(wt.address));
    const jtw = client.open(
      WrappedJettonWallet.fromAddress(
        await jt.getGetWalletAddress(signer.address!),
      ),
    );

    return (await jtw.send(
      signer,
      { value: gasArgs.value + toNano("0.08") },
      {
        $$type: "JettonTransfer",
        amount: amt,
        custom_payload: null,
        query_id: 0n,
        destination: burner,
        forward_payload: beginCell()
          .storeAddress(bridge)
          .storeUint(cid, 64) // Target Chain
          .storeRef(
            beginCell()
              .storeUint(toKey(fromToken), 256)
              .storeStringRefTail(fromToken)
              .asCell(),
          )
          .storeRef(beginCell().storeStringRefTail(destAddress).asCell())
          .storeRef(
            beginCell()
              .storeUint(toKey(targetToken), 256)
              .storeStringRefTail(targetToken)
              .asCell(),
          )
          .endCell(),
        forward_ton_amount: gasArgs.value + toNano("0.03"),
        response_destination: bridge,
      },
    )) as unknown as Promise<string>;
  };
  const transferJettonToBridge = async (
    fromToken: string,
    targetToken: string,
    signer: Sender,
    target_chain: bigint,
    destAddress: string,
    amt: bigint,
    gasArgs: TonGasArgs,
  ) => {
    const tid = toKey(fromToken);
    const ntd = await bridgeReader.getTokens();
    const wt = ntd.get(tid)!;
    const jt = client.open(WrappedJetton.fromAddress(wt.address));
    const jtw = client.open(
      WrappedJettonWallet.fromAddress(
        await jt.getGetWalletAddress(signer.address!),
      ),
    );
    return (await jtw.send(
      signer,
      { value: gasArgs.value + toNano("0.05") },
      {
        $$type: "JettonTransfer",
        amount: amt,
        custom_payload: null,
        destination: bridge,
        forward_payload: beginCell()
          .storeUint(target_chain, 64) // Target Chain
          .storeRef(
            beginCell()
              .storeUint(toKey(fromToken), 256)
              .storeStringRefTail(fromToken)
              .asCell(),
          )
          .storeRef(beginCell().storeStringRefTail(destAddress).asCell())
          .storeRef(
            beginCell()
              .storeUint(toKey(targetToken), 256)
              .storeStringRefTail(targetToken)
              .asCell(),
          )
          .endCell(),
        forward_ton_amount: gasArgs.value,
        query_id: 0n,
        response_destination: bridge,
      },
    )) as unknown as Promise<string>;
  };

  const transferJetton = async (
    to: Address,
    sender: Sender,
    fromToken: string,
    targetToken: string,
    chainId: bigint,
    amount: bigint,
    destAddress: string,
    gasArgs: TonGasArgs,
  ): Promise<string> => {
    if (to.toString() === burner.toString()) {
      return await transferJettonToBurner(
        fromToken,
        targetToken,
        sender,
        amount,
        destAddress,
        chainId,
        gasArgs,
      );
    }

    return await transferJettonToBridge(
      fromToken,
      targetToken,
      sender,
      chainId,
      destAddress,
      amount,
      gasArgs,
    );
  };

  async function isWrappedToken(
    targetChain: bigint,
    fromTokenId: bigint,
    targetTokenId: bigint,
  ) {
    const steps = await bridgeReader.getCrossChainStrategy();
    const strategy = steps
      .get(targetChain)
      ?.i.get(fromTokenId)
      ?.i.get(targetTokenId);
    if (!strategy) return false;
    for (let i = 0; i < strategy.local_steps.size; i++) {
      const strat = strategy.local_steps.steps.get(BigInt(i));
      if (strat === 3n) return true;
    }
    return false;
  }

  return {
    decimals: () => 9,
    estimateTime: () => Promise.resolve(undefined),
    async emmetHashFromtx(hash) {
      const txs = await client.getTransactions(bridge, {
        hash,
        limit: 10,
      });
      for (const tx of txs) {
        for (let i = 0; i < tx.outMessagesCount; i++) {
          const om = tx.outMessages.get(i)!;
          const code = om.body.asSlice().loadUint(32);
          if (code === 1717832165) {
            const instmt = loadSentInstallment(om.body.asSlice());
            return `0x${instmt.tx_hash.toString(16)}`;
          }
        }
      }
      throw new Error("No send installment found");
    },
    id: () => Promise.resolve(chainId),
    async bridge() {
      return await bridge.toString();
    },
    nativeCoin: () => "TON",
    chainName: () => chainName,
    async txFee(tc) {
      const fee =
        (await bridgeReader.getProtocolFee()) +
        ((await bridgeReader.getChainFees()).get(tc) ??
          raise("Chain fees not configured for this chain"));
      return fee;
    },
    async token(symbol) {
      const tokens = await bridgeReader.getTokens();
      const qToken = tokens.get(toKey(symbol));
      if (!qToken) throw new Error("No Such Token Found in Storage");
      return {
        address: qToken.address.toString(),
        decimals: qToken.decimals,
        fee: qToken.fee,
        feeDecimals: qToken.fee_decimals,
        symbol: qToken.symbol,
        swap: qToken.swap_address.toString(),
      };
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
      const bs64 = Buffer.from(hash.replace("0x", ""), "hex").toString(
        "base64",
      );
      try {
        const tx = await client.getTransactions(bridge, {
          limit: 1,
          hash: bs64,
        });
        console.log({ tx });

        return {
          timestamp: BigInt(tx[0].now),
          value: tx[0].totalFees.coins,
        };
      } catch (e) {
        console.log(e);

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
      fromSymbol,
      targetSymbol,
      destAddress,
      fee,
    ) => {
      const lastBridgeTxHash = await getLastBridgeTxHashInBase64();
      const bc = client.open(Bridge.fromAddress(bridge));
      const fsid = BigInt(`0x${sha256_sync(fromSymbol).toString("hex")}`);
      const tid = BigInt(`0x${sha256_sync(targetSymbol).toString("hex")}`);
      const isWrapped = await isWrappedToken(cid, fsid, tid);
      const gs =
        fee !== undefined
          ? {
              value: fee,
            }
          : {
              value:
                (await bridgeReader.getProtocolFee()) +
                ((await bridgeReader.getChainFees()).get(cid) ??
                  raise("Chain fees not configured for this chain")),
            };
      if (tid === nativeTokenId) {
        await transferTon(bc, signer, destAddress, targetSymbol, cid, amt, gs);
      } else if (isWrapped) {
        await transferJetton(
          burner,
          signer,
          fromSymbol,
          targetSymbol,
          cid,
          amt,
          destAddress,
          gs,
        );
      } else {
        await transferJetton(
          bridge,
          signer,
          fromSymbol,
          targetSymbol,
          cid,
          amt,
          destAddress,
          gs,
        );
      }

      let foundTx = false;
      let hash = "";
      let retries = 0;
      while (!foundTx && retries < 10) {
        await new Promise((e) => setTimeout(e, 2000));
        const latestTx = (
          await client.getTransactions(bridge, { limit: 1 })
        )[0];
        if (latestTx.hash().toString("base64") === lastBridgeTxHash) {
          await new Promise((e) => setTimeout(e, 10000));
          retries++;
          continue;
        }
        const txs = await client.getTransactions(bridge, { limit: 2 });
        for (const tx of txs) {
          for (let i = 0; i < tx.outMessages.size; i++) {
            const msg = tx.outMessages.get(i) ?? raise("Unreachable");
            if (tx.hash().toString("base64") === lastBridgeTxHash) {
              await new Promise((e) => setTimeout(e, 10000));
              continue;
            }
            if (msg.body.asSlice().loadUint(32) !== 1717832165) {
              continue;
            }
            const log = loadSentInstallment(msg.body.asSlice());
            const emmethash = log.tx_hash;
            const txn =
              (await bridgeReader.getOutgoing()).get(emmethash) ??
              raise("Unreachable");

            if (
              destAddress === txn.to.asSlice().loadStringRefTail() &&
              amt === txn.amount &&
              txn.from_token.asSlice().loadStringRefTail() === fromSymbol
            ) {
              foundTx = true;
              hash = tx.hash().toString("hex");
            }
          }
        }
        retries++;
      }

      return {
        hash: hash,
        tx: hash,
      };
    },
  };
}

const toKey = (key: string) => {
  return BigInt(`0x${sha256_sync(key).toString("hex")}`);
};
export function raise(msg: string): never {
  throw new Error(msg);
}
