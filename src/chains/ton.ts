import {
  // address,
  Address,
  // beginCell,
  // JettonMaster,
  // JettonWallet,
  // type OpenedContract,
  type Sender,
  // toNano,
  TonClient,
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
  GetLpFeeDecimals,
  GetLpFeeGrowthGlobal,
  GetLpProviderRewards,
  IsTransferFromLp,
  GetSwapResultAmount,
  GetIncomingStrategy,
  GetCrossChainStrategy,
  // TStrategy,
  SwapTokens,
} from ".";
// import { Bridge, loadOutgoingTransaction } from "../contracts/ton";
// import { sha256_sync } from "@ton/crypto";
// import { WrappedJetton } from "../contracts/ton/jetton-master";
// import { WrappedJettonWallet } from "../contracts/ton/jetton-wallet";
// import { AddressBook as TonAddressBook } from "../contracts/ton/address-book";
// import { EmmetJettonLP } from "../contracts/ton/pools/tact_EmmetJettonLP";
// import { EmmetJettonLPWallet } from "../contracts/ton/pools/tact_EmmetJettonLPWallet";
// import { EmmetTonLP } from "../contracts/ton/pools/ton/tact_EmmetTonLP";
// import { StonApiClient } from "@ston-fi/api";
// import { DEX, pTON } from "@ston-fi/sdk";

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
  GetLpProtocolFeeAmount &
  GetLpProviderRewards &
  GetLpFeeGrowthGlobal &
  GetLpFeeDecimals &
  IsTransferFromLp &
  GetSwapResultAmount &
  GetIncomingStrategy &
  GetCrossChainStrategy &
  SwapTokens<Sender, undefined>;

export interface TonParams {
  rpcs: readonly string[];
  nativeTokenId: bigint;
  chainName: string;
  chainId: bigint;
  addressBook: Address;
  stonApiUrl: string;
  stonRouterAddress: string;
  pTonAddress: string;
}

// @ts-ignore
export async function tonHandler({
  rpcs,
  nativeTokenId,
  chainName,
  chainId,
  stonApiUrl,
  addressBook,
  stonRouterAddress,
  pTonAddress,
  // @ts-ignore
}: TonParams): Promise<TonHelper> {

//   const clients = rpcs.map((rpc) => new TonClient({ endpoint: rpc }));
//   const fetchClient = () => {
//     const randomRpcIndex = Math.floor(Math.random() * rpcs.length);
//     return clients[randomRpcIndex];
//   };

//   const ab = fetchClient().open(TonAddressBook.fromAddress(addressBook));
//   const bridge =
//     (await ab.getGet("EmmetBridge")) ??
//     raise("Failed to fetch bridge from addressbook");
//   const bridgeReader = fetchClient().open(Bridge.fromAddress(bridge));
//   async function getLastTxHashInBase64ForAddress(addr: Address) {
//     const txns = await fetchClient().getTransactions(addr, { limit: 1 });
//     return txns[0].hash().toString("base64");
//   }
//   async function transferTon(
//     bridge: OpenedContract<Bridge>,
//     sender: Sender,
//     to: string,
//     targetTkn: string,
//     chainId: bigint,
//     amount: bigint,
//     gasArgs: TonGasArgs,
//   ): Promise<string> {
//     return (await bridge.send(
//       sender,
//       {
//         value: amount + gasArgs.value,
//       },
//       {
//         $$type: "FreezeTon",
//         amount: amount,
//         target_chain: BigInt(chainId),
//         to: beginCell().storeStringRefTail(to).endCell(),
//         from_token: beginCell()
//           .storeInt(toKey("TON"), 256)
//           .storeStringRefTail("TON")
//           .endCell(),
//         to_token: beginCell()
//           .storeInt(toKey(targetTkn), 256)
//           .storeStringRefTail(targetTkn)
//           .endCell(),
//       },
//     )) as unknown as Promise<string>;
//   }

//   const transferJettonToBurner = async (
//     fromToken: string,
//     targetToken: string,
//     signer: Sender,
//     amt: bigint,
//     destAddress: string,
//     cid: bigint,
//     gasArgs: TonGasArgs,
//   ): Promise<string> => {
//     const tid = toKey(fromToken);
//     const wtd = await bridgeReader.getTokens();
//     const wt = wtd.get(tid)!;
//     const jt = fetchClient().open(WrappedJetton.fromAddress(wt.address));
//     const jtw = fetchClient().open(
//       WrappedJettonWallet.fromAddress(
//         await jt.getGetWalletAddress(signer.address!),
//       ),
//     );

//     return (await jtw.send(
//       signer,
//       { value: gasArgs.value + toNano("0.08") },
//       {
//         $$type: "JettonBurn",
//         amount: amt,
//         custom_payload: null,
//         query_id: 0n,
//         forward_payload: beginCell()
//           .storeUint(cid, 64) // Target Chain
//           .storeRef(
//             beginCell()
//               .storeUint(toKey(fromToken), 256)
//               .storeStringRefTail(fromToken)
//               .asCell(),
//           )
//           .storeRef(beginCell().storeStringRefTail(destAddress).asCell())
//           .storeRef(
//             beginCell()
//               .storeUint(toKey(targetToken), 256)
//               .storeStringRefTail(targetToken)
//               .asCell(),
//           )
//           .endCell(),
//         forward_ton_amount: gasArgs.value + toNano("0.03"),
//         response_destination: bridge,
//       },
//     )) as unknown as Promise<string>;
//   };
//   const transferJettonToBridge = async (
//     fromToken: string,
//     targetToken: string,
//     signer: Sender,
//     target_chain: bigint,
//     destAddress: string,
//     amt: bigint,
//     gasArgs: TonGasArgs,
//   ) => {
//     const tid = toKey(fromToken);
//     const ntd = await bridgeReader.getTokens();
//     const wt = ntd.get(tid)!;
//     const jt = fetchClient().open(WrappedJetton.fromAddress(wt.address));
//     const jtw = fetchClient().open(
//       WrappedJettonWallet.fromAddress(
//         await jt.getGetWalletAddress(signer.address!),
//       ),
//     );
//     return (await jtw.send(
//       signer,
//       { value: gasArgs.value + toNano("0.05") },
//       {
//         $$type: "JettonTransfer",
//         amount: amt,
//         custom_payload: null,
//         destination: bridge,
//         forward_payload: beginCell()
//           .storeUint(target_chain, 64) // Target Chain
//           .storeRef(
//             beginCell()
//               .storeUint(toKey(fromToken), 256)
//               .storeStringRefTail(fromToken)
//               .asCell(),
//           )
//           .storeRef(beginCell().storeStringRefTail(destAddress).asCell())
//           .storeRef(
//             beginCell()
//               .storeUint(toKey(targetToken), 256)
//               .storeStringRefTail(targetToken)
//               .asCell(),
//           )
//           .endCell(),
//         forward_ton_amount: gasArgs.value,
//         query_id: 0n,
//         response_destination: bridge,
//       },
//     )) as unknown as Promise<string>;
//   };

//   async function isWrappedToken(
//     targetChain: bigint,
//     fromTokenId: bigint,
//     targetTokenId: bigint,
//   ) {
//     const steps = await bridgeReader.getCrossChainStrategy();
//     const strategy = steps
//       .get(targetChain)
//       ?.i.get(fromTokenId)
//       ?.i.get(targetTokenId);
//     if (!strategy) return false;
//     for (let i = 0; i < strategy.local_steps.size; i++) {
//       const strat = strategy.local_steps.steps.get(BigInt(i));
//       if (strat === 5n) return true;
//     }
//     return false;
//   }

//   async function getNewTxAfterHash(
//     last: string,
//     addr: Address,
//     op: number,
//   ): Promise<{ hash: string; tx: string }> {
//     let foundTx = false;
//     let hash = "";
//     let retries = 0;
//     while (!foundTx && retries < 10) {
//       const latestTx = (
//         await fetchClient().getTransactions(addr, { limit: 1 })
//       )[0];
//       if (latestTx.hash().toString("base64") === last) {
//         await new Promise((e) => setTimeout(e, 10000));
//         retries++;
//         continue;
//       }
//       const txs = await fetchClient().getTransactions(addr, { limit: 25 });
//       for (const tx of txs) {
//         for (let i = 0; i < tx.outMessages.size; i++) {
//           const msg = tx.outMessages.get(i) ?? raise("Unreachable");
//           if (msg.body.asSlice().loadUint(32) === op) {
//             foundTx = true;
//             hash = tx.hash().toString("hex");
//           }
//         }
//       }
//       retries++;
//     }
//     return {
//       hash,
//       tx: hash,
//     };
//   }
//   const ston = new StonApiClient({
//     baseURL: stonApiUrl,
//   });
//   const stonRouter = fetchClient().open(new DEX.v2.Router(stonRouterAddress));

//   const proxyTon = pTON.v2.create(pTonAddress);

//   return {
//     async swapTokens(sender, fromSymbol, targetSymbol, amount, _slippage) {
//       if (!sender.address) throw new Error("Sender address not passed");
//       const tokens = await bridgeReader.getTokens();
//       const ft = tokens.get(toKey(fromSymbol));
//       if (!ft) throw new Error("From Token not found");
//       const tt = tokens.get(toKey(targetSymbol));
//       if (!tt) throw new Error("Target Token not found");
//       if (fromSymbol === targetSymbol) {
//         throw new Error("From and Target tokens are the same");
//       }
//       if (fromSymbol === "TON") {
//         await stonRouter.sendSwapTonToJetton(sender, {
//           askJettonAddress: tt.address,
//           minAskAmount: 0,
//           offerAmount: amount,
//           proxyTon,
//           userWalletAddress: sender.address,
//         });
//         return;
//       }
//       if (targetSymbol === "TON") {
//         await stonRouter.sendSwapJettonToTon(sender, {
//           minAskAmount: 0,
//           offerAmount: amount,
//           proxyTon,
//           userWalletAddress: sender.address,
//           offerJettonAddress: ft.address,
//         });
//         return;
//       }
//       await stonRouter.sendSwapJettonToJetton(sender, {
//         askJettonAddress: tt.address,
//         minAskAmount: 0,
//         offerAmount: amount,
//         offerJettonAddress: ft.address,
//         userWalletAddress: sender.address,
//       });
//       return;
//     },
//     async getSwapResultAmount(fromSymbol, targetSymbol, amount, slippage) {
//       const tokens = await bridgeReader.getTokens();
//       const ft = tokens.get(toKey(fromSymbol));
//       if (!ft) throw new Error("From Token not found");
//       const tt = tokens.get(toKey(targetSymbol));
//       if (!tt) throw new Error("Target Token not found");
//       const simulation = await ston.simulateSwap({
//         askAddress: tt.address.toString(),
//         offerAddress: ft.address.toString(),
//         offerUnits: amount.toString(),
//         slippageTolerance: (slippage / 10000).toString(),
//       });
//       return BigInt(simulation.minAskUnits);
//     },
//     async crossChainStrategy(targetChain, fromSymbol, targetSymbol) {
//       const ccs = await bridgeReader.getCrossChainStrategy();
//       const strategy = ccs
//         .get(BigInt(targetChain))
//         ?.i.get(toKey(fromSymbol))
//         ?.i.get(toKey(targetSymbol));
//       if (!strategy) throw new Error("No cross chain strategy found");
//       const local: TStrategy[] = [];

//       for (let i = 0; i < strategy.local_steps.size; i++) {
//         const strat = strategy.local_steps.steps.get(BigInt(i));
//         if (strat === 0n) local.push("nothing");
//         if (strat === 1n) local.push("cctp_burn");
//         if (strat === 2n) local.push("cctp_claim");
//         if (strat === 3n) local.push("lock");
//         if (strat === 4n) local.push("mint");
//         if (strat === 5n) local.push("burn");
//         if (strat === 6n) local.push("pass_to_lp");
//         if (strat === 7n) local.push("transfer_from_lp");
//         if (strat === 8n) local.push("swap");
//         if (strat === 13n) local.push("unlock");
//       }
//       const foreign: TStrategy[] = [];
//       for (let i = 0; i < strategy.foreign_steps.size; i++) {
//         const strat = strategy.foreign_steps.steps.get(BigInt(i));
//         if (strat === 0n) foreign.push("nothing");
//         if (strat === 1n) foreign.push("cctp_burn");
//         if (strat === 2n) foreign.push("cctp_claim");
//         if (strat === 3n) foreign.push("lock");
//         if (strat === 4n) foreign.push("mint");
//         if (strat === 5n) foreign.push("burn");
//         if (strat === 6n) foreign.push("pass_to_lp");
//         if (strat === 7n) foreign.push("transfer_from_lp");
//         if (strat === 8n) foreign.push("swap");
//         if (strat === 13n) foreign.push("unlock");
//       }
//       return {
//         foreign,
//         local,
//       };
//     },
//     async incomingStrategy(fromChain, fromSymbol, targetSymbol) {
//       const ics = await bridgeReader.getIncomingStrategy();
//       const strategy = ics
//         .get(BigInt(fromChain))
//         ?.i.get(toKey(fromSymbol))
//         ?.i.get(toKey(targetSymbol));
//       if (!strategy) throw new Error("No incoming strategy found");
//       const res: TStrategy[] = [];
//       for (let i = 0; i < strategy.size; i++) {
//         const strat = strategy.steps.get(BigInt(i));
//         if (strat === 0n) res.push("nothing");
//         if (strat === 1n) res.push("cctp_burn");
//         if (strat === 2n) res.push("cctp_claim");
//         if (strat === 3n) res.push("lock");
//         if (strat === 4n) res.push("mint");
//         if (strat === 5n) res.push("burn");
//         if (strat === 6n) res.push("pass_to_lp");
//         if (strat === 7n) res.push("transfer_from_lp");
//         if (strat === 8n) res.push("swap");
//         if (strat === 13n) res.push("unlock");
//       }
//       return res;
//     },
//     async getLpCurrentAPY(pool) {
//       const pc = fetchClient().open(
//         EmmetJettonLP.fromAddress(Address.parse(pool)),
//       );
//       const apy = await pc.getCurrentApy();
//       return apy;
//     },
//     async getLpProtocolFee(pool) {
//       const pc = fetchClient().open(
//         EmmetJettonLP.fromAddress(Address.parse(pool)),
//       );
//       const pf = await pc.getProtocolFee();
//       return pf;
//     },
//     async getLpTokenFee(pool) {
//       const pc = fetchClient().open(
//         EmmetJettonLP.fromAddress(Address.parse(pool)),
//       );
//       const pf = await pc.getTokenFee();
//       return pf;
//     },
//     async getLpTotalSupply(pool) {
//       const pc = fetchClient().open(
//         EmmetJettonLP.fromAddress(Address.parse(pool)),
//       );
//       const jet = await pc.getGetJettonData();
//       return jet.total_supply;
//     },
//     async getLpProtocolFeeAmount(pool) {
//       const pc = fetchClient().open(
//         EmmetJettonLP.fromAddress(Address.parse(pool)),
//       );
//       const pf = await pc.getProtocolFeeAmount();
//       return pf;
//     },
//     async getLpFeeDecimals(pool) {
//       const pc = fetchClient().open(EmmetJettonLP.fromAddress(address(pool)));
//       const pf = await pc.getDecimals();
//       return pf;
//     },
//     async getLpFeeGrowthGlobal(pool) {
//       const pc = fetchClient().open(EmmetJettonLP.fromAddress(address(pool)));
//       const fgg = pc.getFeeGrowthGlobal();
//       return fgg;
//     },
//     async getLpProviderRewards(pool, user) {
//       const pc = fetchClient().open(EmmetJettonLP.fromAddress(address(pool)));
//       const depositAddress = await pc.getGetWalletAddress(address(user));
//       const deposit = fetchClient().open(
//         EmmetJettonLPWallet.fromAddress(depositAddress),
//       );
//       const rewards = await deposit.getLastInternalFeeGrowth();
//       const fgg = await pc.getFeeGrowthGlobal();
//       const feeGrowthInside = fgg - rewards;
//       if (feeGrowthInside === 0n) {
//         if (rewards > 0) {
//           return rewards;
//         }
//         return 0n;
//       }
//       return (
//         ((await deposit.getGetWalletData()).balance * feeGrowthInside) /
//         (await pc.getGetJettonData()).total_supply
//       );
//     },
//     async stakeLiquidity(signer, pool, amount, ga) {
//       const pa = Address.parse(pool);
//       if (!signer.address)
//         throw new Error(`Signer address not passed: ${signer}`);
//       const lp = fetchClient().open(EmmetJettonLP.fromAddress(pa));
//       const tonLp = await ab.getGet("elpTON");
//       const isTonLp = tonLp?.equals(pa) ?? false;
//       if (isTonLp) {
//         const tonLp = fetchClient().open(EmmetTonLP.fromAddress(pa));
//         const last = await getLastTxHashInBase64ForAddress(tonLp.address);
//         await tonLp.send(
//           signer,
//           {
//             value: amount + toNano("0.1"),
//           },
//           {
//             $$type: "Deposit",
//             amount,
//           },
//         );
//         return await getNewTxAfterHash(last, tonLp.address, 923309543);
//       }
//       const payload = beginCell().storeUint(2, 8);
//       const ta = await lp.getStakeToken();
//       const token = fetchClient().open(JettonMaster.create(ta));
//       const wallet = await token.getWalletAddress(
//         isTonLp ? lp.address : signer.address,
//       );
//       const wc = fetchClient().open(EmmetJettonLPWallet.fromAddress(wallet));
//       const last = await getLastTxHashInBase64ForAddress(wc.address);
//       await wc.send(
//         signer,
//         {
//           value: toNano("0.4"),
//           ...ga,
//         },
//         {
//           $$type: "JettonTransfer",
//           amount: amount,
//           custom_payload: null,
//           destination: lp.address,
//           forward_payload: payload.endCell(),
//           forward_ton_amount: toNano("0.2"),
//           query_id: 0n,
//           response_destination: lp.address,
//         },
//       );
//       return await getNewTxAfterHash(last, lp.address, 923309543);
//     },
//     async withdrawFees(signer, pool, ga) {
//       if (!signer.address)
//         throw new Error(`Signer address not passed: ${signer}`);
//       const lp = fetchClient().open(
//         EmmetJettonLP.fromAddress(Address.parse(pool)),
//       );
//       const deposit = await lp.getGetWalletAddress(signer.address);
//       const da = fetchClient().open(EmmetJettonLPWallet.fromAddress(deposit));
//       const last = await getLastTxHashInBase64ForAddress(da.address);
//       await da.send(signer, { value: toNano("0.5"), ...ga }, "WithdrawFees");
//       return await getNewTxAfterHash(last, da.address, 0);
//     },
//     async withdrawLiquidity(signer, pool, amount, ga) {
//       if (!signer.address)
//         throw new Error(`Signer address not passed: ${signer}`);
//       const lp = await fetchClient().open(
//         EmmetJettonLP.fromAddress(Address.parse(pool)),
//       );
//       const deposit = await lp.getGetWalletAddress(signer.address);
//       const da = fetchClient().open(EmmetJettonLPWallet.fromAddress(deposit));
//       const last = await getLastTxHashInBase64ForAddress(da.address);
//       await da.send(
//         signer,
//         { value: toNano("0.5"), ...ga },
//         {
//           $$type: "JettonBurn",
//           amount,
//           custom_payload: null,
//           forward_payload: beginCell().endCell(),
//           forward_ton_amount: 0n,
//           query_id: 0n,
//           response_destination: signer.address,
//         },
//       );
//       return await getNewTxAfterHash(last, da.address, 1814330430);
//     },
//     decimals: async (pool) => {
//       if (!pool) return 9;
//       const lp = fetchClient().open(
//         EmmetJettonLP.fromAddress(Address.parse(pool)),
//       );
//       const dec = await lp.getDecimals();
//       return Number(dec);
//     },
//     async address(contr) {
//       const address =
//         (await ab.getGet(contr)) ??
//         raise(
//           `Failed to fetch address for ${contr} in ${addressBook.toString()}`,
//         );
//       return address.toString();
//     },
//     estimateTime: () => Promise.resolve(undefined),
//     isTransferFromLp: () => Promise.resolve(false), // TODO: update it
//     async emmetHashFromtx(hash) {
//       const b64 = Buffer.from(hash, "hex").toString("base64");
//       const txs = await fetchClient().getTransactions(bridge, {
//         hash: b64,
//         limit: 10,
//       });
//       for (const tx of txs) {
//         for (let i = 0; i < tx.outMessagesCount; i++) {
//           const om = tx.outMessages.get(i)!;
//           const code = om.body.asSlice().loadUint(32);
//           if (code === 1673830231) {
//             return `0x${om.body.hash().toString("hex")}`;
//           }
//         }
//       }
//       throw new Error("No send installment found");
//     },
//     id: () => Promise.resolve(chainId),
//     async bridge() {
//       return await bridge.toString();
//     },
//     nativeCoin: () => "TON",
//     chainName: () => chainName,
//     async txFee(tc) {
//       const fee =
//         (await bridgeReader.getProtocolFee()) +
//         ((await bridgeReader.getChainFees()).get(tc) ??
//           raise("Chain fees not configured for this chain"));
//       return fee;
//     },
//     async token(symbol) {
//       const tokens = await bridgeReader.getTokens();
//       const qToken = tokens.get(toKey(symbol));
//       if (!qToken) throw new Error("No Such Token Found in Storage");
//       return {
//         address: qToken.address.toString(),
//         decimals: qToken.decimals,
//         fee: qToken.fee,
//         feeDecimals: qToken.fee_decimals,
//         symbol: qToken.symbol,
//         swap: qToken.swap_address.toString(),
//       };
//     },
//     balance: (addr) => fetchClient().getBalance(Address.parse(addr)),
//     provider: () => Promise.resolve(fetchClient()),
//     validateAddress: (addr) => {
//       try {
//         Address.parse(addr);
//         return Promise.resolve(true);
//       } catch (e) {
//         return Promise.resolve(false);
//       }
//     },
//     protocolFee() {
//       return bridgeReader.getProtocolFee();
//     },
//     async txInfo(hash) {
//       const bs64 = Buffer.from(hash.replace("0x", ""), "hex").toString(
//         "base64",
//       );
//       try {
//         const tx = await fetchClient().getTransactions(bridge, {
//           limit: 1,
//           hash: bs64,
//         });

//         return {
//           timestamp: BigInt(tx[0].now),
//           value: tx[0].totalFees.coins,
//         };
//       } catch (e) {
//         return {
//           timestamp: 0n,
//           value: 0n,
//         };
//       }
//     },
//     tokenBalance: async (token, addr) => {
//       const jc = fetchClient().open(JettonMaster.create(Address.parse(token)));
//       const jwa = await jc.getWalletAddress(Address.parse(addr));
//       const jw = fetchClient().open(JettonWallet.create(jwa));
//       return jw.getBalance();
//     },
//     sendInstallment: async (
//       signer,
//       amt,
//       cid,
//       fromSymbol,
//       targetSymbol,
//       destAddress,
//       fee,
//     ) => {
//       const lastBridgeTxHash = await getLastTxHashInBase64ForAddress(bridge);
//       const bc = fetchClient().open(Bridge.fromAddress(bridge));
//       const fsid = BigInt(`0x${sha256_sync(fromSymbol).toString("hex")}`);
//       const tid = BigInt(`0x${sha256_sync(targetSymbol).toString("hex")}`);
//       const isWrapped = await isWrappedToken(cid, fsid, tid);
//       const gs =
//         fee !== undefined
//           ? {
//               value: fee,
//             }
//           : {
//               value:
//                 (await bridgeReader.getProtocolFee()) +
//                 ((await bridgeReader.getChainFees()).get(cid) ??
//                   raise("Chain fees not configured for this chain")),
//             };
//       if (fsid === nativeTokenId) {
//         await transferTon(bc, signer, destAddress, targetSymbol, cid, amt, gs);
//       } else if (isWrapped) {
//         console.log("burning");
//         await transferJettonToBurner(
//           fromSymbol,
//           targetSymbol,
//           signer,
//           amt,
//           destAddress,
//           chainId,
//           gs,
//         );
//       } else {
//         await transferJettonToBridge(
//           fromSymbol,
//           targetSymbol,
//           signer,
//           cid,
//           destAddress,
//           amt,
//           gs,
//         );
//       }

//       let foundTx = false;
//       let hash = "";
//       let retries = 0;
//       while (!foundTx && retries < 10) {
//         await new Promise((e) => setTimeout(e, 2000));
//         const latestTx = (
//           await fetchClient().getTransactions(bridge, { limit: 1 })
//         )[0];
//         if (latestTx.hash().toString("base64") === lastBridgeTxHash) {
//           await new Promise((e) => setTimeout(e, 10000));
//           retries++;
//           continue;
//         }
//         const txs = await fetchClient().getTransactions(bridge, { limit: 2 });
//         for (const tx of txs) {
//           for (let i = 0; i < tx.outMessages.size; i++) {
//             const msg = tx.outMessages.get(i) ?? raise("Unreachable");
//             if (tx.hash().toString("base64") === lastBridgeTxHash) {
//               await new Promise((e) => setTimeout(e, 10000));
//               continue;
//             }
//             if (msg.body.asSlice().loadUint(32) !== 1673830231) {
//               continue;
//             }
//             const otx = loadOutgoingTransaction(msg.body.asSlice());
//             if (
//               destAddress === otx.to.asSlice().loadStringRefTail() &&
//               amt === otx.amount &&
//               otx.from_token.asSlice().loadStringRefTail() === fromSymbol
//             ) {
//               foundTx = true;
//               hash = tx.hash().toString("hex");
//             }
//           }
//         }
//         retries++;
//       }

//       return {
//         hash: hash,
//         tx: hash,
//       };
//     },
//   };
// }

// const toKey = (key: string) => {
//   return BigInt(`0x${sha256_sync(key).toString("hex")}`);
// };
// export function raise(msg: string): never {
//   throw new Error(msg);
// }

// export function assertNotNull<T>(t: T | null | undefined): t is T {
//   if (t === null) {
//     throw new Error(`Failed to unwrap value: ${t}`);
//   }
//   if (t === undefined) {
//     throw new Error(`Failed to unwrap value: ${t}`);
//   }
//   return true;
}
