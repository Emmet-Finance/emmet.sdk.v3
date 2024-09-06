"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.assertNotNull = exports.raise = exports.tonHandler = void 0;
const ton_1 = require("@ton/ton");
const ton_2 = require("../contracts/ton");
const crypto_1 = require("@ton/crypto");
const jetton_master_1 = require("../contracts/ton/jetton-master");
const jetton_wallet_1 = require("../contracts/ton/jetton-wallet");
const address_book_1 = require("../contracts/ton/address-book");
const tact_EmmetJettonLP_1 = require("../contracts/ton/pools/tact_EmmetJettonLP");
const tact_EmmetJettonLPWallet_1 = require("../contracts/ton/pools/tact_EmmetJettonLPWallet");
const tact_EmmetTonLP_1 = require("../contracts/ton/pools/ton/tact_EmmetTonLP");
const api_1 = require("@ston-fi/api");
const sdk_1 = require("@ston-fi/sdk");
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
                if (strat === 0n)
                    local.push("nothing");
                if (strat === 1n)
                    local.push("cctp_burn");
                if (strat === 2n)
                    local.push("cctp_claim");
                if (strat === 3n)
                    local.push("lock");
                if (strat === 4n)
                    local.push("mint");
                if (strat === 5n)
                    local.push("burn");
                if (strat === 6n)
                    local.push("pass_to_lp");
                if (strat === 7n)
                    local.push("transfer_from_lp");
                if (strat === 8n)
                    local.push("swap");
                if (strat === 13n)
                    local.push("unlock");
            }
            const foreign = [];
            for (let i = 0; i < strategy.foreign_steps.size; i++) {
                const strat = strategy.foreign_steps.steps.get(BigInt(i));
                if (strat === 0n)
                    foreign.push("nothing");
                if (strat === 1n)
                    foreign.push("cctp_burn");
                if (strat === 2n)
                    foreign.push("cctp_claim");
                if (strat === 3n)
                    foreign.push("lock");
                if (strat === 4n)
                    foreign.push("mint");
                if (strat === 5n)
                    foreign.push("burn");
                if (strat === 6n)
                    foreign.push("pass_to_lp");
                if (strat === 7n)
                    foreign.push("transfer_from_lp");
                if (strat === 8n)
                    foreign.push("swap");
                if (strat === 13n)
                    foreign.push("unlock");
            }
            return {
                foreign,
                local,
            };
        },
        async incomingStrategy(fromChain, fromSymbol, targetSymbol) {
            const ics = await bridgeReader.getIncomingStrategy();
            const strategy = ics
                .get(BigInt(fromChain))
                ?.i.get(toKey(fromSymbol))
                ?.i.get(toKey(targetSymbol));
            if (!strategy)
                throw new Error("No incoming strategy found");
            const res = [];
            for (let i = 0; i < strategy.size; i++) {
                const strat = strategy.steps.get(BigInt(i));
                if (strat === 0n)
                    res.push("nothing");
                if (strat === 1n)
                    res.push("cctp_burn");
                if (strat === 2n)
                    res.push("cctp_claim");
                if (strat === 3n)
                    res.push("lock");
                if (strat === 4n)
                    res.push("mint");
                if (strat === 5n)
                    res.push("burn");
                if (strat === 6n)
                    res.push("pass_to_lp");
                if (strat === 7n)
                    res.push("transfer_from_lp");
                if (strat === 8n)
                    res.push("swap");
                if (strat === 13n)
                    res.push("unlock");
            }
            return res;
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
            const tokens = await bridgeReader.getTokens();
            const qToken = tokens.get(toKey(symbol));
            if (!qToken)
                throw new Error("No Such Token Found in Storage");
            return {
                address: qToken.address.toString(),
                decimals: qToken.decimals,
                fee: qToken.fee,
                feeDecimals: qToken.fee_decimals,
                symbol: qToken.symbol,
                swap: qToken.swap_address.toString(),
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
        protocolFee() {
            return bridgeReader.getProtocolFee();
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2NoYWlucy90b24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsa0NBVWtCO0FBcUNsQiwwQ0FBbUU7QUFDbkUsd0NBQTBDO0FBQzFDLGtFQUErRDtBQUMvRCxrRUFBcUU7QUFDckUsZ0VBQThFO0FBQzlFLGtGQUEwRTtBQUMxRSw4RkFBc0Y7QUFDdEYsZ0ZBQXdFO0FBQ3hFLHNDQUE2QztBQUM3QyxzQ0FBeUM7QUFpRGxDLEtBQUssVUFBVSxVQUFVLENBQUMsRUFDL0IsSUFBSSxFQUNKLGFBQWEsRUFDYixTQUFTLEVBQ1QsT0FBTyxFQUNQLFVBQVUsRUFDVixXQUFXLEVBQ1gsaUJBQWlCLEVBQ2pCLFdBQVcsR0FDRDtJQUNWLE1BQU0sT0FBTyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLElBQUksZUFBUyxDQUFDLEVBQUUsUUFBUSxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQztJQUNwRSxNQUFNLFdBQVcsR0FBRyxHQUFHLEVBQUU7UUFDdkIsTUFBTSxjQUFjLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQy9ELE9BQU8sT0FBTyxDQUFDLGNBQWMsQ0FBQyxDQUFDO0lBQ2pDLENBQUMsQ0FBQztJQUVGLE1BQU0sRUFBRSxHQUFHLFdBQVcsRUFBRSxDQUFDLElBQUksQ0FBQywwQkFBYyxDQUFDLFdBQVcsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDO0lBQ3ZFLE1BQU0sTUFBTSxHQUNWLENBQUMsTUFBTSxFQUFFLENBQUMsTUFBTSxDQUFDLGFBQWEsQ0FBQyxDQUFDO1FBQ2hDLEtBQUssQ0FBQyx5Q0FBeUMsQ0FBQyxDQUFDO0lBQ25ELE1BQU0sWUFBWSxHQUFHLFdBQVcsRUFBRSxDQUFDLElBQUksQ0FBQyxZQUFNLENB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