"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.assertNotNull = exports.raise = exports.tonHandler = void 0;
const ton_1 = require("@ton/ton");
const _1 = require(".");
const ton_2 = require("../contracts/ton");
const jetton_master_1 = require("../contracts/ton/jetton-master");
const jetton_wallet_1 = require("../contracts/ton/jetton-wallet");
const address_book_1 = require("../contracts/ton/address-book");
const api_1 = require("@ston-fi/api");
const sdk_1 = require("@ston-fi/sdk");
const tact_EmmetJettonLP_1 = require("../contracts/ton/pools/tact_EmmetJettonLP");
const tact_EmmetTonLP_1 = require("../contracts/ton/pools/ton/tact_EmmetTonLP");
const tact_EmmetJettonLPWallet_1 = require("../contracts/ton/pools/tact_EmmetJettonLPWallet");
const crypto_1 = require("@ton/crypto");
async function tonHandler({ rpcs, nativeTokenId, chainName, chainId, stonApiUrl, addressBook, stonRouterAddress, pTonAddress, }) {
    const clients = rpcs.map((rpc) => new ton_1.TonClient({ endpoint: rpc }));
    const fetchClient = () => {
        const randomRpcIndex = Math.floor(Math.random() * rpcs.length);
        return clients[randomRpcIndex];
    };
    const ab = fetchClient().open(address_book_1.AddressBook.fromAddress(addressBook));
    const bridge = (await ab.getGet("EmmetBridge")) ??
        raise("Failed to fetch bridge from addressbook");
    const bridgeReader = fetchClient().open(ton_2.Bridge.fromAddress(bridge));
    async function getLastTxHashInBase64ForAddress(addr) {
        const txns = await fetchClient().getTransactions(addr, { limit: 1 });
        return txns[0].hash().toString("base64");
    }
    async function transferTon(bridge, sender, to, targetTkn, chainId, amount, gasArgs) {
        return (await bridge.send(sender, {
            value: amount + gasArgs.value,
        }, {
            $$type: "FreezeTon",
            amount: amount,
            target_chain: BigInt(chainId),
            to: (0, ton_1.beginCell)().storeStringRefTail(to).endCell(),
            from_token: (0, ton_1.beginCell)()
                .storeInt(toKey("TON"), 256)
                .storeStringRefTail("TON")
                .endCell(),
            to_token: (0, ton_1.beginCell)()
                .storeInt(toKey(targetTkn), 256)
                .storeStringRefTail(targetTkn)
                .endCell(),
        }));
    }
    const transferJettonToBurner = async (fromToken, targetToken, signer, amt, destAddress, cid, gasArgs) => {
        const tid = toKey(fromToken);
        const wtd = await bridgeReader.getTokens();
        const wt = wtd.get(tid);
        const jt = fetchClient().open(jetton_master_1.WrappedJetton.fromAddress(wt.address));
        const jtw = fetchClient().open(jetton_wallet_1.WrappedJettonWallet.fromAddress(await jt.getGetWalletAddress(signer.address)));
        return (await jtw.send(signer, { value: gasArgs.value + (0, ton_1.toNano)("0.08") }, {
            $$type: "JettonBurn",
            amount: amt,
            custom_payload: null,
            query_id: 0n,
            forward_payload: (0, ton_1.beginCell)()
                .storeUint(cid, 64) // Target Chain
                .storeRef((0, ton_1.beginCell)()
                .storeUint(toKey(fromToken), 256)
                .storeStringRefTail(fromToken)
                .asCell())
                .storeRef((0, ton_1.beginCell)().storeStringRefTail(destAddress).asCell())
                .storeRef((0, ton_1.beginCell)()
                .storeUint(toKey(targetToken), 256)
                .storeStringRefTail(targetToken)
                .asCell())
                .endCell(),
            forward_ton_amount: gasArgs.value + (0, ton_1.toNano)("0.03"),
            response_destination: bridge,
        }));
    };
    const transferJettonToBridge = async (fromToken, targetToken, signer, target_chain, destAddress, amt, gasArgs) => {
        const tid = toKey(fromToken);
        const ntd = await bridgeReader.getTokens();
        const wt = ntd.get(tid);
        const jt = fetchClient().open(jetton_master_1.WrappedJetton.fromAddress(wt.address));
        const jtw = fetchClient().open(jetton_wallet_1.WrappedJettonWallet.fromAddress(await jt.getGetWalletAddress(signer.address)));
        return (await jtw.send(signer, { value: gasArgs.value + (0, ton_1.toNano)("0.05") }, {
            $$type: "JettonTransfer",
            amount: amt,
            custom_payload: null,
            destination: bridge,
            forward_payload: (0, ton_1.beginCell)()
                .storeUint(target_chain, 64) // Target Chain
                .storeRef((0, ton_1.beginCell)()
                .storeUint(toKey(fromToken), 256)
                .storeStringRefTail(fromToken)
                .asCell())
                .storeRef((0, ton_1.beginCell)().storeStringRefTail(destAddress).asCell())
                .storeRef((0, ton_1.beginCell)()
                .storeUint(toKey(targetToken), 256)
                .storeStringRefTail(targetToken)
                .asCell())
                .endCell(),
            forward_ton_amount: gasArgs.value,
            query_id: 0n,
            response_destination: bridge,
        }));
    };
    async function isWrappedToken(targetChain, fromTokenId, targetTokenId) {
        const steps = await bridgeReader.getCrossChainStrategy();
        const strategy = steps
            .get(targetChain)
            ?.i.get(fromTokenId)
            ?.i.get(targetTokenId);
        if (!strategy)
            return false;
        for (let i = 0; i < strategy.local_steps.size; i++) {
            const strat = strategy.local_steps.steps.get(BigInt(i));
            if (strat === 5n)
                return true;
        }
        return false;
    }
    async function getNewTxAfterHash(last, addr, op) {
        let foundTx = false;
        let hash = "";
        let retries = 0;
        while (!foundTx && retries < 10) {
            const latestTx = (await fetchClient().getTransactions(addr, { limit: 1 }))[0];
            if (latestTx.hash().toString("base64") === last) {
                await new Promise((e) => setTimeout(e, 10000));
                retries++;
                continue;
            }
            const txs = await fetchClient().getTransactions(addr, { limit: 25 });
            for (const tx of txs) {
                for (let i = 0; i < tx.outMessages.size; i++) {
                    const msg = tx.outMessages.get(i) ?? raise("Unreachable");
                    if (msg.body.asSlice().loadUint(32) === op) {
                        foundTx = true;
                        hash = tx.hash().toString("hex");
                    }
                }
            }
            retries++;
        }
        return {
            hash,
            tx: hash,
        };
    }
    const ston = new api_1.StonApiClient({
        baseURL: stonApiUrl,
    });
    const stonRouter = fetchClient().open(new sdk_1.DEX.v2.Router(stonRouterAddress));
    const proxyTon = sdk_1.pTON.v2.create(pTonAddress);
    return {
        async swapTokens(sender, fromSymbol, targetSymbol, amount, _slippage) {
            if (!sender.address)
                throw new Error("Sender address not passed");
            const tokens = await bridgeReader.getTokens();
            const ft = tokens.get(toKey(fromSymbol));
            if (!ft)
                throw new Error("From Token not found");
            const tt = tokens.get(toKey(targetSymbol));
            if (!tt)
                throw new Error("Target Token not found");
            if (fromSymbol === targetSymbol) {
                throw new Error("From and Target tokens are the same");
            }
            if (fromSymbol === "TON") {
                await stonRouter.sendSwapTonToJetton(sender, {
                    askJettonAddress: tt.address,
                    minAskAmount: 0,
                    offerAmount: amount,
                    proxyTon,
                    userWalletAddress: sender.address,
                });
                return;
            }
            if (targetSymbol === "TON") {
                await stonRouter.sendSwapJettonToTon(sender, {
                    minAskAmount: 0,
                    offerAmount: amount,
                    proxyTon,
                    userWalletAddress: sender.address,
                    offerJettonAddress: ft.address,
                });
                return;
            }
            await stonRouter.sendSwapJettonToJetton(sender, {
                askJettonAddress: tt.address,
                minAskAmount: 0,
                offerAmount: amount,
                offerJettonAddress: ft.address,
                userWalletAddress: sender.address,
            });
            return;
        },
        async getSwapResultAmount(fromSymbol, targetSymbol, amount, slippage) {
            const tokens = await bridgeReader.getTokens();
            const ft = tokens.get(toKey(fromSymbol));
            if (!ft)
                throw new Error("From Token not found");
            const tt = tokens.get(toKey(targetSymbol));
            if (!tt)
                throw new Error("Target Token not found");
            const simulation = await ston.simulateSwap({
                askAddress: tt.address.toString(),
                offerAddress: ft.address.toString(),
                offerUnits: amount.toString(),
                slippageTolerance: (slippage / 10000).toString(),
            });
            return BigInt(simulation.minAskUnits);
        },
        async crossChainStrategy(targetChain, fromSymbol, targetSymbol) {
            const ccs = await bridgeReader.getCrossChainStrategy();
            const strategy = ccs
                .get(BigInt(targetChain))
                ?.i.get(toKey(fromSymbol))
                ?.i.get(toKey(targetSymbol));
            if (!strategy)
                throw new Error("No cross chain strategy found");
            const local = [];
            for (let i = 0; i < strategy.local_steps.size; i++) {
                const strat = strategy.local_steps.steps.get(BigInt(i));
                if (strat) {
                    const strategyName = _1.strategyMap[BigInt(strat).toString()];
                    local.push(strategyName);
                }
            }
            const foreign = [];
            for (let i = 0; i < strategy.foreign_steps.size; i++) {
                const strat = strategy.local_steps.steps.get(BigInt(i));
                if (strat) {
                    const strategyName = _1.strategyMap[BigInt(strat).toString()];
                    local.push(strategyName);
                }
            }
            return {
                foreign,
                outgoing: local,
                incoming: foreign
            };
        },
        async getLpCurrentAPY(pool) {
            const pc = fetchClient().open(tact_EmmetJettonLP_1.EmmetJettonLP.fromAddress(ton_1.Address.parse(pool)));
            const apy = await pc.getCurrentApy();
            return apy;
        },
        async getLpProtocolFee(pool) {
            const pc = fetchClient().open(tact_EmmetJettonLP_1.EmmetJettonLP.fromAddress(ton_1.Address.parse(pool)));
            const pf = await pc.getProtocolFee();
            return pf;
        },
        async getLpTokenFee(pool) {
            const pc = fetchClient().open(tact_EmmetJettonLP_1.EmmetJettonLP.fromAddress(ton_1.Address.parse(pool)));
            const pf = await pc.getTokenFee();
            return pf;
        },
        async getLpTotalSupply(pool) {
            const pc = fetchClient().open(tact_EmmetJettonLP_1.EmmetJettonLP.fromAddress(ton_1.Address.parse(pool)));
            const jet = await pc.getGetJettonData();
            return jet.total_supply;
        },
        async getLpProtocolFeeAmount(pool) {
            const pc = fetchClient().open(tact_EmmetJettonLP_1.EmmetJettonLP.fromAddress(ton_1.Address.parse(pool)));
            const pf = await pc.getProtocolFeeAmount();
            return pf;
        },
        async getLpFeeDecimals(pool) {
            const pc = fetchClient().open(tact_EmmetJettonLP_1.EmmetJettonLP.fromAddress((0, ton_1.address)(pool)));
            const pf = await pc.getDecimals();
            return pf;
        },
        async getLpFeeGrowthGlobal(pool) {
            const pc = fetchClient().open(tact_EmmetJettonLP_1.EmmetJettonLP.fromAddress((0, ton_1.address)(pool)));
            const fgg = pc.getFeeGrowthGlobal();
            return fgg;
        },
        async getLpProviderRewards(pool, user) {
            const pc = fetchClient().open(tact_EmmetJettonLP_1.EmmetJettonLP.fromAddress((0, ton_1.address)(pool)));
            const depositAddress = await pc.getGetWalletAddress((0, ton_1.address)(user));
            const deposit = fetchClient().open(tact_EmmetJettonLPWallet_1.EmmetJettonLPWallet.fromAddress(depositAddress));
            const rewards = await deposit.getLastInternalFeeGrowth();
            const fgg = await pc.getFeeGrowthGlobal();
            const feeGrowthInside = fgg - rewards;
            if (feeGrowthInside === 0n) {
                if (rewards > 0) {
                    return rewards;
                }
                return 0n;
            }
            return (((await deposit.getGetWalletData()).balance * feeGrowthInside) /
                (await pc.getGetJettonData()).total_supply);
        },
        async stakeLiquidity(signer, pool, amount, ga) {
            const pa = ton_1.Address.parse(pool);
            if (!signer.address)
                throw new Error(`Signer address not passed: ${signer}`);
            const lp = fetchClient().open(tact_EmmetJettonLP_1.EmmetJettonLP.fromAddress(pa));
            const tonLp = await ab.getGet("elpTON");
            const isTonLp = tonLp?.equals(pa) ?? false;
            if (isTonLp) {
                const tonLp = fetchClient().open(tact_EmmetTonLP_1.EmmetTonLP.fromAddress(pa));
                const last = await getLastTxHashInBase64ForAddress(tonLp.address);
                await tonLp.send(signer, {
                    value: amount + (0, ton_1.toNano)("0.1"),
                }, {
                    $$type: "Deposit",
                    amount,
                });
                return await getNewTxAfterHash(last, tonLp.address, 923309543);
            }
            const payload = (0, ton_1.beginCell)().storeUint(2, 8);
            const ta = await lp.getStakeToken();
            const token = fetchClient().open(ton_1.JettonMaster.create(ta));
            const wallet = await token.getWalletAddress(isTonLp ? lp.address : signer.address);
            const wc = fetchClient().open(tact_EmmetJettonLPWallet_1.EmmetJettonLPWallet.fromAddress(wallet));
            const last = await getLastTxHashInBase64ForAddress(wc.address);
            await wc.send(signer, {
                value: (0, ton_1.toNano)("0.4"),
                ...ga,
            }, {
                $$type: "JettonTransfer",
                amount: amount,
                custom_payload: null,
                destination: lp.address,
                forward_payload: payload.endCell(),
                forward_ton_amount: (0, ton_1.toNano)("0.2"),
                query_id: 0n,
                response_destination: lp.address,
            });
            return await getNewTxAfterHash(last, lp.address, 923309543);
        },
        async withdrawFees(signer, pool, ga) {
            if (!signer.address)
                throw new Error(`Signer address not passed: ${signer}`);
            const lp = fetchClient().open(tact_EmmetJettonLP_1.EmmetJettonLP.fromAddress(ton_1.Address.parse(pool)));
            const deposit = await lp.getGetWalletAddress(signer.address);
            const da = fetchClient().open(tact_EmmetJettonLPWallet_1.EmmetJettonLPWallet.fromAddress(deposit));
            const last = await getLastTxHashInBase64ForAddress(da.address);
            await da.send(signer, { value: (0, ton_1.toNano)("0.5"), ...ga }, "WithdrawFees");
            return await getNewTxAfterHash(last, da.address, 0);
        },
        async withdrawLiquidity(signer, pool, amount, ga) {
            if (!signer.address)
                throw new Error(`Signer address not passed: ${signer}`);
            const lp = await fetchClient().open(tact_EmmetJettonLP_1.EmmetJettonLP.fromAddress(ton_1.Address.parse(pool)));
            const deposit = await lp.getGetWalletAddress(signer.address);
            const da = fetchClient().open(tact_EmmetJettonLPWallet_1.EmmetJettonLPWallet.fromAddress(deposit));
            const last = await getLastTxHashInBase64ForAddress(da.address);
            await da.send(signer, { value: (0, ton_1.toNano)("0.5"), ...ga }, {
                $$type: "JettonBurn",
                amount,
                custom_payload: null,
                forward_payload: (0, ton_1.beginCell)().endCell(),
                forward_ton_amount: 0n,
                query_id: 0n,
                response_destination: signer.address,
            });
            return await getNewTxAfterHash(last, da.address, 1814330430);
        },
        decimals: async (pool) => {
            if (!pool)
                return 9;
            const lp = fetchClient().open(tact_EmmetJettonLP_1.EmmetJettonLP.fromAddress(ton_1.Address.parse(pool)));
            const dec = await lp.getDecimals();
            return Number(dec);
        },
        async address(contr) {
            const address = (await ab.getGet(contr)) ??
                raise(`Failed to fetch address for ${contr} in ${addressBook.toString()}`);
            return address.toString();
        },
        estimateTime: () => Promise.resolve(undefined),
        isTransferFromLp: () => Promise.resolve(false), // TODO: update it
        async emmetHashFromtx(hash) {
            const b64 = Buffer.from(hash, "hex").toString("base64");
            const txs = await fetchClient().getTransactions(bridge, {
                hash: b64,
                limit: 10,
            });
            for (const tx of txs) {
                for (let i = 0; i < tx.outMessagesCount; i++) {
                    const om = tx.outMessages.get(i);
                    const code = om.body.asSlice().loadUint(32);
                    if (code === 1673830231) {
                        return `0x${om.body.hash().toString("hex")}`;
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
            const fee = (await bridgeReader.getProtocolFee()) +
                ((await bridgeReader.getChainFees()).get(tc) ??
                    raise("Chain fees not configured for this chain"));
            return fee;
        },
        async token(symbol) {
            const id = toKey(symbol);
            const tokens = await bridgeReader.getTokens();
            const qToken = tokens.get(id);
            if (!qToken)
                throw new Error("No Such Token Found in Storage");
            return {
                address: qToken.address.toString(),
                decimals: qToken.decimals,
                fee: qToken.fee,
                feeDecimals: qToken.fee_decimals,
                symbol: qToken.symbol,
                swap: qToken.swap_address.toString(),
                priceFeed: id.toString(),
                token: qToken.address.toString()
            };
        },
        balance: (addr) => fetchClient().getBalance(ton_1.Address.parse(addr)),
        provider: () => Promise.resolve(fetchClient()),
        validateAddress: (addr) => {
            try {
                ton_1.Address.parse(addr);
                return Promise.resolve(true);
            }
            catch (e) {
                return Promise.resolve(false);
            }
        },
        async protocolFee() {
            return await bridgeReader.getProtocolFee();
        },
        async txInfo(hash) {
            const bs64 = Buffer.from(hash.replace("0x", ""), "hex").toString("base64");
            try {
                const tx = await fetchClient().getTransactions(bridge, {
                    limit: 1,
                    hash: bs64,
                });
                return {
                    timestamp: BigInt(tx[0].now),
                    value: tx[0].totalFees.coins,
                };
            }
            catch (e) {
                return {
                    timestamp: 0n,
                    value: 0n,
                };
            }
        },
        tokenBalance: async (token, addr) => {
            const jc = fetchClient().open(ton_1.JettonMaster.create(ton_1.Address.parse(token)));
            const jwa = await jc.getWalletAddress(ton_1.Address.parse(addr));
            const jw = fetchClient().open(ton_1.JettonWallet.create(jwa));
            return jw.getBalance();
        },
        sendInstallment: async (signer, amt, cid, fromSymbol, targetSymbol, destAddress, fee) => {
            const lastBridgeTxHash = await getLastTxHashInBase64ForAddress(bridge);
            const bc = fetchClient().open(ton_2.Bridge.fromAddress(bridge));
            const fsid = BigInt(`0x${(0, crypto_1.sha256_sync)(fromSymbol).toString("hex")}`);
            const tid = BigInt(`0x${(0, crypto_1.sha256_sync)(targetSymbol).toString("hex")}`);
            const isWrapped = await isWrappedToken(cid, fsid, tid);
            const gs = fee !== undefined
                ? {
                    value: fee,
                }
                : {
                    value: (await bridgeReader.getProtocolFee()) +
                        ((await bridgeReader.getChainFees()).get(cid) ??
                            raise("Chain fees not configured for this chain")),
                };
            if (fsid === nativeTokenId) {
                await transferTon(bc, signer, destAddress, targetSymbol, cid, amt, gs);
            }
            else if (isWrapped) {
                console.log("burning");
                await transferJettonToBurner(fromSymbol, targetSymbol, signer, amt, destAddress, chainId, gs);
            }
            else {
                await transferJettonToBridge(fromSymbol, targetSymbol, signer, cid, destAddress, amt, gs);
            }
            let foundTx = false;
            let hash = "";
            let retries = 0;
            while (!foundTx && retries < 10) {
                await new Promise((e) => setTimeout(e, 2000));
                const latestTx = (await fetchClient().getTransactions(bridge, { limit: 1 }))[0];
                if (latestTx.hash().toString("base64") === lastBridgeTxHash) {
                    await new Promise((e) => setTimeout(e, 10000));
                    retries++;
                    continue;
                }
                const txs = await fetchClient().getTransactions(bridge, { limit: 2 });
                for (const tx of txs) {
                    for (let i = 0; i < tx.outMessages.size; i++) {
                        const msg = tx.outMessages.get(i) ?? raise("Unreachable");
                        if (tx.hash().toString("base64") === lastBridgeTxHash) {
                            await new Promise((e) => setTimeout(e, 10000));
                            continue;
                        }
                        if (msg.body.asSlice().loadUint(32) !== 1673830231) {
                            continue;
                        }
                        const otx = (0, ton_2.loadOutgoingTransaction)(msg.body.asSlice());
                        if (destAddress === otx.to.asSlice().loadStringRefTail() &&
                            amt === otx.amount &&
                            otx.from_token.asSlice().loadStringRefTail() === fromSymbol) {
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
exports.tonHandler = tonHandler;
const toKey = (key) => {
    return BigInt(`0x${(0, crypto_1.sha256_sync)(key).toString("hex")}`);
};
function raise(msg) {
    throw new Error(msg);
}
exports.raise = raise;
function assertNotNull(t) {
    if (t === null) {
        throw new Error(`Failed to unwrap value: ${t}`);
    }
    if (t === undefined) {
        throw new Error(`Failed to unwrap value: ${t}`);
    }
    return true;
}
exports.assertNotNull = assertNotNull;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2NoYWlucy90b24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsa0NBVWtCO0FBQ2xCLHdCQW1DVztBQUNYLDBDQUFtRTtBQUNuRSxrRUFBK0Q7QUFDL0Qsa0VBQXFFO0FBQ3JFLGdFQUE4RTtBQUM5RSxzQ0FBNkM7QUFDN0Msc0NBQXlDO0FBQ3pDLGtGQUEwRTtBQUMxRSxnRkFBd0U7QUFDeEUsOEZBQXNGO0FBQ3RGLHdDQUEwQztBQWlEbkMsS0FBSyxVQUFVLFVBQVUsQ0FBQyxFQUMvQixJQUFJLEVBQ0osYUFBYSxFQUNiLFNBQVMsRUFDVCxPQUFPLEVBQ1AsVUFBVSxFQUNWLFdBQVcsRUFDWCxpQkFBaUIsRUFDakIsV0FBVyxHQUNEO0lBRVYsTUFBTSxPQUFPLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUMsSUFBSSxlQUFTLENBQUMsRUFBRSxRQUFRLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQ3BFLE1BQU0sV0FBVyxHQUFHLEdBQUcsRUFBRTtRQUN2QixNQUFNLGNBQWMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDL0QsT0FBTyxPQUFPLENBQUMsY0FBYyxDQUFDLENBQUM7SUFDakMsQ0FBQyxDQUFDO0lBRUYsTUFBTSxFQUFFLEdBQUcsV0FBVyxFQUFFLENBQUMsSUFBSSxDQUFDLDBCQUFjLENBQUMsV0FBVyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUM7SUFDdkUsTUFBTSxNQUFNLEdBQ1YsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLENBQUM7UUFDaEMsS0FBSyxDQUFDLHlDQUF5QyxDQUFDLENBQUM7SUFDbkQsTUFBTSxZQUFZLEdBQUcsV0FBVyxFQUFFLENBQUMsSUFBSSxD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