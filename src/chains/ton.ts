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
  AddressBook,
  StakeLiquidity,
  GetLpCurrentAPY,
  GetLpProtocolFee,
  GetLpProtocolFeeAmount,
  GetLpTokenFee,
  GetLpTotalSupply,
  WithdrawFees,
  WithdrawLiquidity,
} from ".";
import { Bridge, loadSentInstallment } from "../contracts/ton";
import { sha256_sync } from "@ton/crypto";
import { WrappedJetton } from "../contracts/ton/jetton-master";
import { WrappedJettonWallet } from "../contracts/ton/jetton-wallet";
import { AddressBook as TonAddressBook } from "../contracts/ton/address-book";
import {
  LPDeposit,
  storePoolPayload,
} from "../contracts/ton/pools/tact_LPDeposit";
import { EmmetLP } from "../contracts/ton/pools/tact_EmmetLP";
import { EmmetLPWallet } from "../contracts/ton/pools/tact_EmmetLPWallet";

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
  Decimals &
  AddressBook &
  StakeLiquidity<Sender, string, { value: bigint; bounce?: boolean }> &
  WithdrawLiquidity<Sender, string, { value: bigint; bounce?: boolean }> &
  WithdrawFees<Sender, string, { value: bigint; bounce?: boolean }> &
  GetLpCurrentAPY &
  GetLpTotalSupply &
  GetLpTokenFee &
  GetLpProtocolFee &
  GetLpProtocolFeeAmount;

export interface TonParams {
  client: TonClient;
  nativeTokenId: bigint;
  chainName: string;
  chainId: bigint;
  addressBook: Address;
}

export async function tonHandler({
  client,
  nativeTokenId,
  chainName,
  chainId,
  addressBook,
}: TonParams): Promise<TonHelper> {
  const ab = client.open(TonAddressBook.fromAddress(addressBook));
  const bridge =
    (await ab.getGet("EmmetBridge")) ??
    raise("Failed to fetch bridge from addressbook");
  const bridgeReader = client.open(Bridge.fromAddress(bridge));
  async function getLastTxHashInBase64ForAddress(addr: Address) {
    const txns = await client.getTransactions(addr, { limit: 1 });
    return txns[0].hash().toString("base64");
  }
  async function transferTon(
    bridge: OpenedContract<Bridge>,
    sender: Sender,
    to: string,
    targetTkn: string,
    chainId: bigint,
    amount: bigint,
    gasArgs: TonGasArgs
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
      }
    )) as unknown as Promise<string>;
  }

  const transferJettonToBurner = async (
    fromToken: string,
    targetToken: string,
    signer: Sender,
    amt: bigint,
    destAddress: string,
    cid: bigint,
    gasArgs: TonGasArgs
  ): Promise<string> => {
    const tid = toKey(fromToken);
    const wtd = await bridgeReader.getTokens();
    const wt = wtd.get(tid)!;
    const jt = client.open(WrappedJetton.fromAddress(wt.address));
    const jtw = client.open(
      WrappedJettonWallet.fromAddress(
        await jt.getGetWalletAddress(signer.address!)
      )
    );

    return (await jtw.send(
      signer,
      { value: gasArgs.value + toNano("0.08") },
      {
        $$type: "JettonBurn",
        amount: amt,
        custom_payload: null,
        query_id: 0n,
        forward_payload: beginCell()
          .storeUint(cid, 64) // Target Chain
          .storeRef(
            beginCell()
              .storeUint(toKey(fromToken), 256)
              .storeStringRefTail(fromToken)
              .asCell()
          )
          .storeRef(beginCell().storeStringRefTail(destAddress).asCell())
          .storeRef(
            beginCell()
              .storeUint(toKey(targetToken), 256)
              .storeStringRefTail(targetToken)
              .asCell()
          )
          .endCell(),
        forward_ton_amount: gasArgs.value + toNano("0.03"),
        response_destination: bridge,
      }
    )) as unknown as Promise<string>;
  };
  const transferJettonToBridge = async (
    fromToken: string,
    targetToken: string,
    signer: Sender,
    target_chain: bigint,
    destAddress: string,
    amt: bigint,
    gasArgs: TonGasArgs
  ) => {
    const tid = toKey(fromToken);
    const ntd = await bridgeReader.getTokens();
    const wt = ntd.get(tid)!;
    const jt = client.open(WrappedJetton.fromAddress(wt.address));
    const jtw = client.open(
      WrappedJettonWallet.fromAddress(
        await jt.getGetWalletAddress(signer.address!)
      )
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
              .asCell()
          )
          .storeRef(beginCell().storeStringRefTail(destAddress).asCell())
          .storeRef(
            beginCell()
              .storeUint(toKey(targetToken), 256)
              .storeStringRefTail(targetToken)
              .asCell()
          )
          .endCell(),
        forward_ton_amount: gasArgs.value,
        query_id: 0n,
        response_destination: bridge,
      }
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
    gasArgs: TonGasArgs
  ): Promise<string> => {
    if (to.toString() === bridge.toString()) {
      return await transferJettonToBurner(
        fromToken,
        targetToken,
        sender,
        amount,
        destAddress,
        chainId,
        gasArgs
      );
    }

    return await transferJettonToBridge(
      fromToken,
      targetToken,
      sender,
      chainId,
      destAddress,
      amount,
      gasArgs
    );
  };

  async function isWrappedToken(
    targetChain: bigint,
    fromTokenId: bigint,
    targetTokenId: bigint
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

  async function getNewTxAfterHash(
    last: string,
    addr: Address,
    op: number
  ): Promise<{hash: string, tx: string}> {
    let foundTx = false;
    let hash = "";
    let retries = 0;
    while (!foundTx && retries < 10) {
      await new Promise((e) => setTimeout(e, 2000));
      const latestTx = (await client.getTransactions(addr, { limit: 1 }))[0];
      if (latestTx.hash().toString("base64") === last) {
        await new Promise((e) => setTimeout(e, 10000));
        retries++;
        continue;
      }
      const txs = await client.getTransactions(addr, { limit: 2 });
      for (const tx of txs) {
        for (let i = 0; i < tx.outMessages.size; i++) {
          const msg = tx.outMessages.get(i) ?? raise("Unreachable");
          if (tx.hash().toString("base64") === last) {
            await new Promise((e) => setTimeout(e, 10000));
            continue;
          }
          if (msg.body.asSlice().loadUint(32) !== op) {
            continue;
          }
          foundTx = true;
          hash = tx.hash().toString("hex");
        }
      }
      retries++;
    }
    return {
      hash,
      tx: hash
    }
  }

  return {
    async getLpCurrentAPY(pool) {
      const pc = client.open(EmmetLP.fromAddress(Address.parse(pool)));
      const apy = await pc.getCurrentApy();
      return apy;
    },
    async getLpProtocolFee(pool) {
      const pc = client.open(EmmetLP.fromAddress(Address.parse(pool)));
      const pf = await pc.getProtocolFee();
      return pf;
    },
    async getLpTokenFee(pool) {
      const pc = client.open(EmmetLP.fromAddress(Address.parse(pool)));
      const pf = await pc.getTokenFee();
      return pf;
    },
    async getLpTotalSupply(pool) {
      const pc = client.open(EmmetLP.fromAddress(Address.parse(pool)));
      const jet = await pc.getGetJettonData();
      return jet.total_supply;
    },
    async getLpProtocolFeeAmount(pool) {
      const pc = client.open(EmmetLP.fromAddress(Address.parse(pool)));
      const pf = await pc.getProtocolFeeAmount();
      return pf;
    },
    async stakeLiquidity(signer, pool, amount, ga) {
      if (!signer.address)
        throw new Error(`Signer address not passed: ${signer}`);
      const lp = client.open(EmmetLP.fromAddress(Address.parse(pool)));
      const ta = await lp.getStakeToken();
      const token = client.open(JettonMaster.create(ta));
      const wallet = await token.getWalletAddress(signer.address);
      const wc = client.open(EmmetLPWallet.fromAddress(wallet));

      const payload = beginCell();

      const last = await getLastTxHashInBase64ForAddress(wc.address);
      storePoolPayload({
        $$type: "PoolPayload",
        mode: 2n,
      })(payload);

      await wc.send(
        signer,
        {
          value: toNano("0.4"),
          ...ga
        },
        {
          $$type: "JettonTransfer",
          amount: amount,
          custom_payload: null,
          destination: lp.address,
          forward_payload: payload.endCell(),
          forward_ton_amount: toNano("0.2"),
          query_id: 0n,
          response_destination: lp.address,
        }
      );
      return await getNewTxAfterHash(last, lp.address, 1935855772);
    },
    async withdrawFees(signer, pool, ga) {
      if (!signer.address)
        throw new Error(`Signer address not passed: ${signer}`);
      const lp = client.open(EmmetLP.fromAddress(Address.parse(pool)));
      const deposit = await lp.getDepositAddress(signer.address);
      const da = client.open(LPDeposit.fromAddress(deposit));
      const last = await getLastTxHashInBase64ForAddress(da.address);
      await da.send(signer, { value: toNano("0.5"), ...ga }, "WithdrawFees");
      return await getNewTxAfterHash(last, da.address, 0);
    },
    async withdrawLiquidity(signer, pool, amount, ga) {
      if (!signer.address)
        throw new Error(`Signer address not passed: ${signer}`);
      const lp = await client.open(EmmetLP.fromAddress(Address.parse(pool)));
      const deposit = await lp.getDepositAddress(signer.address);
      const da = client.open(LPDeposit.fromAddress(deposit));
      const last = await getLastTxHashInBase64ForAddress(da.address);
      await da.send(
        signer,
        { value: toNano("0.5"), ...ga },
        {
          $$type: "WithdrawTokens",
          amount,
        }
      );
      return await getNewTxAfterHash(last, da.address, 1814330430);
    },
    decimals: () => 9,
    async address(contr) {
      const address =
        (await ab.getGet(contr)) ??
        raise(
          `Failed to fetch address for ${contr} in ${addressBook.toString()}`
        );
      return address.toString();
    },
    estimateTime: () => Promise.resolve(undefined),
    async emmetHashFromtx(hash) {
      const b64 = Buffer.from(hash, "hex").toString("base64");
      const txs = await client.getTransactions(bridge, {
        hash: b64,
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
        "base64"
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
      fee
    ) => {
      const lastBridgeTxHash = await getLastTxHashInBase64ForAddress(bridge);
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
          bridge,
          signer,
          fromSymbol,
          targetSymbol,
          cid,
          amt,
          destAddress,
          gs
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
          gs
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

export function assertNotNull<T>(t: T | null | undefined): t is T {
  if (t === null) {
    throw new Error(`Failed to unwrap value: ${t}`);
  }
  if (t === undefined) {
    throw new Error(`Failed to unwrap value: ${t}`);
  }
  return true;
}
