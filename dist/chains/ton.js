"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tonHandler = void 0;
// @ts-ignore
async function tonHandler({ rpcs, nativeTokenId, chainName, chainId, stonApiUrl, addressBook, stonRouterAddress, pTonAddress,
// @ts-ignore
 }) {
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
exports.tonHandler = tonHandler;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2NoYWlucy90b24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBeUdBLGFBQWE7QUFDTixLQUFLLFVBQVUsVUFBVSxDQUFDLEVBQy9CLElBQUksRUFDSixhQUFhLEVBQ2IsU0FBUyxFQUNULE9BQU8sRUFDUCxVQUFVLEVBQ1YsV0FBVyxFQUNYLGlCQUFpQixFQUNqQixXQUFXO0FBQ1gsYUFBYTtFQUNIO0lBRVoseUVBQXlFO0lBQ3pFLGdDQUFnQztJQUNoQyxzRUFBc0U7SUFDdEUsc0NBQXNDO0lBQ3RDLE9BQU87SUFFUCw0RUFBNEU7SUFDNUUsbUJBQW1CO0lBQ25CLDBDQUEwQztJQUMxQyx3REFBd0Q7SUFDeEQseUVBQXlFO0lBQ3pFLG9FQUFvRTtJQUNwRSw0RUFBNEU7SUFDNUUsZ0RBQWdEO0lBQ2hELE1BQU07SUFDTixnQ0FBZ0M7SUFDaEMsc0NBQXNDO0lBQ3RDLHNCQUFzQjtJQUN0QixrQkFBa0I7SUFDbEIseUJBQXlCO0lBQ3pCLHVCQUF1QjtJQUN2QixzQkFBc0I7SUFDdEIsMkJBQTJCO0lBQzNCLHlCQUF5QjtJQUN6QixpQ0FBaUM7SUFDakMsZ0JBQWdCO0lBQ2hCLFVBQVU7SUFDVix5Q0FBeUM7SUFDekMsV0FBVztJQUNYLFVBQVU7SUFDViwrQkFBK0I7SUFDL0IsMEJBQTBCO0lBQzFCLHlDQUF5QztJQUN6Qyw0REFBNEQ7SUFDNUQsa0NBQWtDO0lBQ2xDLHlDQUF5QztJQUN6Qyx1Q0FBdUM7SUFDdkMsd0JBQXdCO0lBQ3hCLGdDQUFnQztJQUNoQyw2Q0FBNkM7SUFDN0MsMkNBQTJDO0lBQzNDLHdCQUF3QjtJQUN4QixXQUFXO0lBQ1gsd0NBQXdDO0lBQ3hDLE1BQU07SUFFTiwyQ0FBMkM7SUFDM0MseUJBQXlCO0lBQ3pCLDJCQUEyQjtJQUMzQixzQkFBc0I7SUFDdEIsbUJBQW1CO0lBQ25CLDJCQUEyQjtJQUMzQixtQkFBbUI7SUFDbkIsMkJBQTJCO0lB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