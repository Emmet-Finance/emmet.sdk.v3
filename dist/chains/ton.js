"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.assertNotNull = exports.raise = exports.tonHandler = void 0;
const ton_1 = require("@ton/ton");
const ton_2 = require("../contracts/ton");
const crypto_1 = require("@ton/crypto");
const jetton_master_1 = require("../contracts/ton/jetton-master");
const jetton_wallet_1 = require("../contracts/ton/jetton-wallet");
const address_book_1 = require("../contracts/ton/address-book");
const tact_LPDeposit_1 = require("../contracts/ton/pools/tact_LPDeposit");
const tact_EmmetLP_1 = require("../contracts/ton/pools/tact_EmmetLP");
const tact_EmmetLPWallet_1 = require("../contracts/ton/pools/tact_EmmetLPWallet");
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
        };
    }
    return {
        async getLpCurrentAPY(pool) {
            const pc = client.open(tact_EmmetLP_1.EmmetLP.fromAddress(ton_1.Address.parse(pool)));
            const apy = await pc.getCurrentApy();
            return apy;
        },
        async getLpProtocolFee(pool) {
            const pc = client.open(tact_EmmetLP_1.EmmetLP.fromAddress(ton_1.Address.parse(pool)));
            const pf = await pc.getProtocolFee();
            return pf;
        },
        async getLpTokenFee(pool) {
            const pc = client.open(tact_EmmetLP_1.EmmetLP.fromAddress(ton_1.Address.parse(pool)));
            const pf = await pc.getTokenFee();
            return pf;
        },
        async getLpTotalSupply(pool) {
            const pc = client.open(tact_EmmetLP_1.EmmetLP.fromAddress(ton_1.Address.parse(pool)));
            const jet = await pc.getGetJettonData();
            return jet.total_supply;
        },
        async getLpProtocolFeeAmount(pool) {
            const pc = client.open(tact_EmmetLP_1.EmmetLP.fromAddress(ton_1.Address.parse(pool)));
            const pf = await pc.getProtocolFeeAmount();
            return pf;
        },
        async stakeLiquidity(signer, pool, amount, ga) {
            if (!signer.address)
                throw new Error(`Signer address not passed: ${signer}`);
            const lp = client.open(tact_EmmetLP_1.EmmetLP.fromAddress(ton_1.Address.parse(pool)));
            const ta = await lp.getStakeToken();
            const token = client.open(ton_1.JettonMaster.create(ta));
            const wallet = await token.getWalletAddress(signer.address);
            const wc = client.open(tact_EmmetLPWallet_1.EmmetLPWallet.fromAddress(wallet));
            const payload = (0, ton_1.beginCell)();
            const last = await getLastTxHashInBase64ForAddress(wc.address);
            (0, tact_LPDeposit_1.storePoolPayload)({
                $$type: "PoolPayload",
                mode: 2n,
            })(payload);
            await wc.send(signer, {
                value: (0, ton_1.toNano)("0.4"),
                ...ga
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
            return await getNewTxAfterHash(last, lp.address, 1935855772);
        },
        async withdrawFees(signer, pool, ga) {
            if (!signer.address)
                throw new Error(`Signer address not passed: ${signer}`);
            const lp = client.open(tact_EmmetLP_1.EmmetLP.fromAddress(ton_1.Address.parse(pool)));
            const deposit = await lp.getDepositAddress(signer.address);
            const da = client.open(tact_LPDeposit_1.LPDeposit.fromAddress(deposit));
            const last = await getLastTxHashInBase64ForAddress(da.address);
            await da.send(signer, { value: (0, ton_1.toNano)("0.5"), ...ga }, "WithdrawFees");
            return await getNewTxAfterHash(last, da.address, 0);
        },
        async withdrawLiquidity(signer, pool, amount, ga) {
            if (!signer.address)
                throw new Error(`Signer address not passed: ${signer}`);
            const lp = await client.open(tact_EmmetLP_1.EmmetLP.fromAddress(ton_1.Address.parse(pool)));
            const deposit = await lp.getDepositAddress(signer.address);
            const da = client.open(tact_LPDeposit_1.LPDeposit.fromAddress(deposit));
            const last = await getLastTxHashInBase64ForAddress(da.address);
            await da.send(signer, { value: (0, ton_1.toNano)("0.5"), ...ga }, {
                $$type: "WithdrawTokens",
                amount,
            });
            return await getNewTxAfterHash(last, da.address, 1814330430);
        },
        decimals: async (pool) => {
            if (!pool)
                return 9;
            const lp = client.open(tact_EmmetLP_1.EmmetLP.fromAddress(ton_1.Address.parse(pool)));
            const dec = await lp.getDecimals();
            return Number(dec);
        },
        async address(contr) {
            const address = (await ab.getGet(contr)) ??
                raise(`Failed to fetch address for ${contr} in ${addressBook.toString()}`);
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
                console.log({ tx });
                return {
                    timestamp: BigInt(tx[0].now),
                    value: tx[0].totalFees.coins,
                };
            }
            catch (e) {
                console.log(e);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2NoYWlucy90b24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsa0NBU2tCO0FBNEJsQiwwQ0FBK0Q7QUFDL0Qsd0NBQTBDO0FBQzFDLGtFQUErRDtBQUMvRCxrRUFBcUU7QUFDckUsZ0VBQThFO0FBQzlFLDBFQUcrQztBQUMvQyxzRUFBOEQ7QUFDOUQsa0ZBQTBFO0FBc0NuRSxLQUFLLFVBQVUsVUFBVSxDQUFDLEVBQy9CLE1BQU0sRUFDTixhQUFhLEVBQ2IsU0FBUyxFQUNULE9BQU8sRUFDUCxXQUFXLEdBQ0Q7SUFDVixNQUFNLEVBQUUsR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLDBCQUFjLENBQUMsV0FBVyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUM7SUFDaEUsTUFBTSxNQUFNLEdBQ1YsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLENBQUM7UUFDaEMsS0FBSyxDQUFDLHlDQUF5QyxDQUFDLENBQUM7SUFDbkQsTUFBTSxZQUFZLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxZQUFNLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7SUFDN0QsS0FBSyxVQUFVLCtCQUErQixDQUFDLElBQWE7UUFDMUQsTUFBTSxJQUFJLEdBQUcsTUFBTSxNQUFNLENBQUMsZUFBZSxDQUFDLElBQUksRUFBRSxFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQzlELE9BQU8sSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUMzQyxDQUFDO0lBQ0QsS0FBSyxVQUFVLFdBQVcsQ0FDeEIsTUFBOEIsRUFDOUIsTUFBYyxFQUNkLEVBQVUsRUFDVixTQUFpQixFQUNqQixPQUFlLEVBQ2YsTUFBYyxFQUNkLE9BQW1CO1FBRW5CLE9BQU8sQ0FBQyxNQUFNLE1B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