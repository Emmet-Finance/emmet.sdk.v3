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
async function tonHandler({ rpcs, nativeTokenId, chainName, chainId, addressBook, }) {
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
    return {
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
        provider: () => fetchClient(),
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
            if (tid === nativeTokenId) {
                await transferTon(bc, signer, destAddress, targetSymbol, cid, amt, gs);
            }
            else if (isWrapped) {
                console.log('burning');
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2NoYWlucy90b24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsa0NBVWtCO0FBZ0NsQiwwQ0FBbUU7QUFDbkUsd0NBQTBDO0FBQzFDLGtFQUErRDtBQUMvRCxrRUFBcUU7QUFDckUsZ0VBQThFO0FBQzlFLGtGQUEwRTtBQUMxRSw4RkFBc0Y7QUFDdEYsZ0ZBQXdFO0FBMENqRSxLQUFLLFVBQVUsVUFBVSxDQUFDLEVBQy9CLElBQUksRUFDSixhQUFhLEVBQ2IsU0FBUyxFQUNULE9BQU8sRUFDUCxXQUFXLEdBQ0Q7SUFDVixNQUFNLE9BQU8sR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxJQUFJLGVBQVMsQ0FBQyxFQUFFLFFBQVEsRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDcEUsTUFBTSxXQUFXLEdBQUcsR0FBRyxFQUFFO1FBQ3ZCLE1BQU0sY0FBYyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUMvRCxPQUFPLE9BQU8sQ0FBQyxjQUFjLENBQUMsQ0FBQztJQUNqQyxDQUFDLENBQUM7SUFFRixNQUFNLEVBQUUsR0FBRyxXQUFXLEVBQUUsQ0FBQyxJQUFJLENBQUMsMEJBQWMsQ0FBQyxXQUFXLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQztJQUN2RSxNQUFNLE1BQU0sR0FDVixDQUFDLE1BQU0sRUFBRSxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUNoQyxLQUFLLENBQUMseUNBQXlDLENBQUMsQ0FBQztJQUNuRCxNQUFNLFlBQVksR0FBRyxXQUFXLEVBQUUsQ0FBQyxJQUFJLENBQUMsWUFBTSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO0lBQ3BFLEtBQUssVUFBVSwrQkFBK0IsQ0FB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