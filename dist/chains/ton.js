"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.assertNotNull = exports.raise = exports.tonHandler = exports.sleep = void 0;
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
/**
 *
 * @param ms number of milliseconds to wait
 * @returns halts the program execution for the `ms` milliseconds
 */
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
exports.sleep = sleep;
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
    return {
        async swapTokens(sender, fromSymbol, targetSymbol, amount, _slippage) {
            try {
                const stonRouter = fetchClient().open(new sdk_1.DEX.v2_2.Router(stonRouterAddress));
                const proxyTon = sdk_1.pTON.v2_1.create(pTonAddress);
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
            }
            catch (error) {
                console.warn(error);
            }
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
        estimateTime: () => Promise.resolve(2n * 60n * 1000n), // 2 minutes
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
        balance: async (addr) => {
            let bal = 0n;
            try {
                bal = await fetchClient().getBalance(ton_1.Address.parse(addr));
            }
            catch (error) {
                console.warn(error);
                await (0, exports.sleep)(1000);
                return await fetchClient().getBalance(ton_1.Address.parse(addr));
            }
            return bal;
        },
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
            let tokenBal = 0n;
            try {
                const jc = fetchClient().open(ton_1.JettonMaster.create(ton_1.Address.parse(token)));
                const jwa = await jc.getWalletAddress(ton_1.Address.parse(addr));
                const jw = await fetchClient().open(ton_1.JettonWallet.create(jwa));
                tokenBal = await jw.getBalance();
            }
            catch (error) {
                console.warn(error);
                // @ts-ignore
                return await this.tokenBalance(token, addr);
            }
            return tokenBal;
        },
        protocolFeeInUSD: () => {
            return 50n;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2NoYWlucy90b24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsa0NBVWtCO0FBQ2xCLHdCQW9DVztBQUNYLDBDQUFtRTtBQUNuRSxrRUFBK0Q7QUFDL0Qsa0VBQXFFO0FBQ3JFLGdFQUE4RTtBQUM5RSxzQ0FBNkM7QUFDN0Msc0NBQXlDO0FBQ3pDLGtGQUEwRTtBQUMxRSxnRkFBd0U7QUFDeEUsOEZBQXNGO0FBQ3RGLHdDQUEwQztBQWtEMUM7Ozs7R0FJRztBQUNJLE1BQU0sS0FBSyxHQUFHLENBQUMsRUFBVSxFQUFFLEVBQUUsQ0FBQyxJQUFJLE9BQU8sQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsVUFBVSxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDO0FBQTlELFFBQUEsS0FBSyxTQUF5RDtBQUVwRSxLQUFLLFVBQVUsVUFBVSxDQUFDLEVBQy9CLElBQUksRUFDSixhQUFhLEVBQ2IsU0FBUyxFQUNULE9BQU8sRUFDUCxVQUFVLEVBQ1YsV0FBVyxFQUNYLGlCQUFpQixFQUNqQixXQUFXLEdBQ0Q7SUFFVixNQUFNLE9BQU8sR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxJQUFJLGVBQVMsQ0FBQyxFQUFFLFFBQVEsRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDcEUsTUFBTSxXQUFXLEdBQUcsR0FBRyxFQUFFO1FBQ3ZCLE1BQU0sY0FBYyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUMvRCxPQUFPLE9BQU8sQ0FBQyxjQUFjLENBQUMsQ0FBQztJQUNqQyxDQUFDLENBQUM7SUFFRixNQUFNLEVBQUUsR0FBRyxXQUFXLEVBQUUsQ0FBQyxJQUFJLENBQUMsMEJBQWMsQ0FBQyxXQUFXLENBQUMs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