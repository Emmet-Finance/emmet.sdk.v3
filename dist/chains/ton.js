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
async function tonHandler({ client, nativeTokenId, chainName, chainId, addressBook, }) {
    const ab = client.open(address_book_1.AddressBook.fromAddress(addressBook));
    const bridge = (await ab.getGet("EmmetBridge")) ??
        raise("Failed to fetch bridge from addressbook");
    const bridgeReader = client.open(ton_2.Bridge.fromAddress(bridge));
    async function getLastTxHashInBase64ForAddress(addr) {
        const txns = await client.getTransactions(addr, { limit: 1 });
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
        const jt = client.open(jetton_master_1.WrappedJetton.fromAddress(wt.address));
        const jtw = client.open(jetton_wallet_1.WrappedJettonWallet.fromAddress(await jt.getGetWalletAddress(signer.address)));
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
        const jt = client.open(jetton_master_1.WrappedJetton.fromAddress(wt.address));
        const jtw = client.open(jetton_wallet_1.WrappedJettonWallet.fromAddress(await jt.getGetWalletAddress(signer.address)));
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
    const transferJetton = async (to, sender, fromToken, targetToken, chainId, amount, destAddress, gasArgs) => {
        if (to.toString() === bridge.toString()) {
            return await transferJettonToBurner(fromToken, targetToken, sender, amount, destAddress, chainId, gasArgs);
        }
        return await transferJettonToBridge(fromToken, targetToken, sender, chainId, destAddress, amount, gasArgs);
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
            if (strat === 3n)
                return true;
        }
        return false;
    }
    async function getNewTxAfterHash(last, addr, op) {
        let foundTx = false;
        let hash = "";
        let retries = 0;
        while (!foundTx && retries < 10) {
            const latestTx = (await client.getTransactions(addr, { limit: 1 }))[0];
            if (latestTx.hash().toString("base64") === last) {
                await new Promise((e) => setTimeout(e, 10000));
                retries++;
                continue;
            }
            const txs = await client.getTransactions(addr, { limit: 25 });
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
            const pc = client.open(tact_EmmetJettonLP_1.EmmetJettonLP.fromAddress(ton_1.Address.parse(pool)));
            const apy = await pc.getCurrentApy();
            return apy;
        },
        async getLpProtocolFee(pool) {
            const pc = client.open(tact_EmmetJettonLP_1.EmmetJettonLP.fromAddress(ton_1.Address.parse(pool)));
            const pf = await pc.getProtocolFee();
            return pf;
        },
        async getLpTokenFee(pool) {
            const pc = client.open(tact_EmmetJettonLP_1.EmmetJettonLP.fromAddress(ton_1.Address.parse(pool)));
            const pf = await pc.getTokenFee();
            return pf;
        },
        async getLpTotalSupply(pool) {
            const pc = client.open(tact_EmmetJettonLP_1.EmmetJettonLP.fromAddress(ton_1.Address.parse(pool)));
            const jet = await pc.getGetJettonData();
            return jet.total_supply;
        },
        async getLpProtocolFeeAmount(pool) {
            const pc = client.open(tact_EmmetJettonLP_1.EmmetJettonLP.fromAddress(ton_1.Address.parse(pool)));
            const pf = await pc.getProtocolFeeAmount();
            return pf;
        },
        async getLpFeeDecimals(pool) {
            const pc = client.open(tact_EmmetJettonLP_1.EmmetJettonLP.fromAddress((0, ton_1.address)(pool)));
            const pf = await pc.getDecimals();
            return pf;
        },
        async getLpFeeGrowthGlobal(pool) {
            const pc = client.open(tact_EmmetJettonLP_1.EmmetJettonLP.fromAddress((0, ton_1.address)(pool)));
            const fgg = pc.getFeeGrowthGlobal();
            return fgg;
        },
        async getLpProviderRewards(pool, user) {
            const pc = client.open(tact_EmmetJettonLP_1.EmmetJettonLP.fromAddress((0, ton_1.address)(pool)));
            const depositAddress = await pc.getGetWalletAddress((0, ton_1.address)(user));
            const deposit = client.open(tact_EmmetJettonLPWallet_1.EmmetJettonLPWallet.fromAddress(depositAddress));
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
            const lp = client.open(tact_EmmetJettonLP_1.EmmetJettonLP.fromAddress(pa));
            const tonLp = await ab.getGet("elpTON");
            const isTonLp = tonLp?.equals(pa) ?? false;
            if (isTonLp) {
                const tonLp = client.open(tact_EmmetTonLP_1.EmmetTonLP.fromAddress(pa));
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
            const token = client.open(ton_1.JettonMaster.create(ta));
            const wallet = await token.getWalletAddress(isTonLp ? lp.address : signer.address);
            const wc = client.open(tact_EmmetJettonLPWallet_1.EmmetJettonLPWallet.fromAddress(wallet));
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
            const lp = client.open(tact_EmmetJettonLP_1.EmmetJettonLP.fromAddress(ton_1.Address.parse(pool)));
            const deposit = await lp.getGetWalletAddress(signer.address);
            const da = client.open(tact_EmmetJettonLPWallet_1.EmmetJettonLPWallet.fromAddress(deposit));
            const last = await getLastTxHashInBase64ForAddress(da.address);
            await da.send(signer, { value: (0, ton_1.toNano)("0.5"), ...ga }, "WithdrawFees");
            return await getNewTxAfterHash(last, da.address, 0);
        },
        async withdrawLiquidity(signer, pool, amount, ga) {
            if (!signer.address)
                throw new Error(`Signer address not passed: ${signer}`);
            const lp = await client.open(tact_EmmetJettonLP_1.EmmetJettonLP.fromAddress(ton_1.Address.parse(pool)));
            const deposit = await lp.getGetWalletAddress(signer.address);
            const da = client.open(tact_EmmetJettonLPWallet_1.EmmetJettonLPWallet.fromAddress(deposit));
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
            const lp = client.open(tact_EmmetJettonLP_1.EmmetJettonLP.fromAddress(ton_1.Address.parse(pool)));
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
            const txs = await client.getTransactions(bridge, {
                hash: b64,
                limit: 10,
            });
            for (const tx of txs) {
                for (let i = 0; i < tx.outMessagesCount; i++) {
                    const om = tx.outMessages.get(i);
                    const code = om.body.asSlice().loadUint(32);
                    if (code === 1717832165) {
                        const instmt = (0, ton_2.loadSentInstallment)(om.body.asSlice());
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
        balance: (addr) => client.getBalance(ton_1.Address.parse(addr)),
        provider: () => client,
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
                const tx = await client.getTransactions(bridge, {
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
            const jc = client.open(ton_1.JettonMaster.create(ton_1.Address.parse(token)));
            const jwa = await jc.getWalletAddress(ton_1.Address.parse(addr));
            const jw = client.open(ton_1.JettonWallet.create(jwa));
            return jw.getBalance();
        },
        sendInstallment: async (signer, amt, cid, fromSymbol, targetSymbol, destAddress, fee) => {
            const lastBridgeTxHash = await getLastTxHashInBase64ForAddress(bridge);
            const bc = client.open(ton_2.Bridge.fromAddress(bridge));
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
                await transferJetton(bridge, signer, fromSymbol, targetSymbol, cid, amt, destAddress, gs);
            }
            else {
                await transferJetton(bridge, signer, fromSymbol, targetSymbol, cid, amt, destAddress, gs);
            }
            let foundTx = false;
            let hash = "";
            let retries = 0;
            while (!foundTx && retries < 10) {
                await new Promise((e) => setTimeout(e, 2000));
                const latestTx = (await client.getTransactions(bridge, { limit: 1 }))[0];
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
                        const log = (0, ton_2.loadSentInstallment)(msg.body.asSlice());
                        const emmethash = log.tx_hash;
                        const txn = (await bridgeReader.getOutgoing()).get(emmethash) ??
                            raise("Unreachable");
                        if (destAddress === txn.to.asSlice().loadStringRefTail() &&
                            amt === txn.amount &&
                            txn.from_token.asSlice().loadStringRefTail() === fromSymbol) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2NoYWlucy90b24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsa0NBVWtCO0FBZ0NsQiwwQ0FBK0Q7QUFDL0Qsd0NBQTBDO0FBQzFDLGtFQUErRDtBQUMvRCxrRUFBcUU7QUFDckUsZ0VBQThFO0FBQzlFLGtGQUEwRTtBQUMxRSw4RkFBc0Y7QUFDdEYsZ0ZBQXdFO0FBMENqRSxLQUFLLFVBQVUsVUFBVSxDQUFDLEVBQy9CLE1BQU0sRUFDTixhQUFhLEVBQ2IsU0FBUyxFQUNULE9BQU8sRUFDUCxXQUFXLEdBQ0Q7SUFDVixNQUFNLEVBQUUsR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLDBCQUFjLENBQUMsV0FBVyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUM7SUFDaEUsTUFBTSxNQUFNLEdBQ1YsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLENBQUM7UUFDaEMsS0FBSyxDQUFDLHlDQUF5QyxDQUFDLENBQUM7SUFDbkQsTUFBTSxZQUFZLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxZQUFNLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7SUFDN0QsS0FBSyxVQUFVLCtCQUErQixDQUFDLElBQWE7UUFDMUQsTUFBTSxJQUFJLEdBQUcsTUFBTSxNQUFNLENBQUMsZUFBZSxDQUFDLElBQUksRUFBRSxFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQzlELE9BQU8sSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUMzQyxDQUFDO0lBQ0QsS0FBSyxVQUFVLFdBQVcsQ0FDeEIsTUFBOEIsRUFDOUIsTUFBYyxFQUNkLEVBQVUsRUFDVixTQUFpQixFQUNqQixPQUFlLEVBQ2YsTUFBYyxFQUNkLE9BQW1CO1FBRW5CLE9BQU8sQ0FBQyxNQUFNLE1B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