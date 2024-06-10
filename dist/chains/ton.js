"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tonHandler = void 0;
const ton_1 = require("@ton/ton");
const ton_2 = require("../contracts/ton");
const crypto_1 = require("@ton/crypto");
const oracle_1 = require("../contracts/ton/oracle");
const jetton_master_1 = require("../contracts/ton/jetton-master");
const jetton_wallet_1 = require("../contracts/ton/jetton-wallet");
function tonHandler({ client, bridge, nativeTokenId, oracle, burner, chainName, chainId, }) {
    //@ts-ignore TODO: Use it.
    const oracleContract = client.open(oracle_1.Oracle.fromAddress(oracle));
    const bridgeReader = client.open(ton_2.Bridge.fromAddress(bridge));
    async function transferTon(bridge, sender, to, tokenId, chainId, amount, gasArgs) {
        return (await bridge.send(sender, {
            //@ts-ignore
            value: amount + (0, ton_1.toNano)("0.45"),
            ...gasArgs,
        }, {
            $$type: "FreezeTon",
            amount: amount,
            target_chain: BigInt(chainId),
            to: (0, ton_1.beginCell)().storeStringRefTail(to).endCell(),
            token_id: tokenId, // Should map to some token in the tokens table
        }));
    }
    const transferJettonToBurner = async (tid, signer, amt, destAddress, cid, gasArgs) => {
        const wtd = await bridgeReader.getWrappedTokens();
        const wt = wtd.get(tid);
        const jt = client.open(jetton_master_1.WrappedJetton.fromAddress(wt.address));
        const jtw = client.open(jetton_wallet_1.WrappedJettonWallet.fromAddress(await jt.getGetWalletAddress(signer.address)));
        return (await jtw.send(signer, { value: (0, ton_1.toNano)("0.45"), ...gasArgs }, {
            $$type: "JettonTransfer",
            amount: amt,
            custom_payload: null,
            query_id: 0n,
            destination: burner,
            forward_payload: (0, ton_1.beginCell)()
                .storeAddress(bridge)
                .storeUint(cid, 16)
                .storeRef((0, ton_1.beginCell)().storeUint(tid, 256).asCell())
                .storeRef((0, ton_1.beginCell)().storeStringRefTail(destAddress).asCell())
                .endCell(),
            forward_ton_amount: (0, ton_1.toNano)("0.40"),
            response_destination: bridge,
        }));
    };
    const transferJettonToBridge = async (tid, signer, target_chain, destAddress, amt, gasArgs) => {
        const ntd = await bridgeReader.getNativeTokens();
        const wt = ntd.get(tid);
        const jt = client.open(jetton_master_1.WrappedJetton.fromAddress(wt.address));
        const jtw = client.open(jetton_wallet_1.WrappedJettonWallet.fromAddress(await jt.getGetWalletAddress(signer.address)));
        return (await jtw.send(signer, { value: (0, ton_1.toNano)("0.45"), ...gasArgs }, {
            $$type: "JettonTransfer",
            amount: amt,
            custom_payload: null,
            destination: bridge,
            forward_payload: (0, ton_1.beginCell)()
                .storeUint(target_chain, 16) // Target Chain
                .storeUint(tid, 256) // TokenID
                .storeRef((0, ton_1.beginCell)().storeStringRefTail(destAddress).asCell())
                .endCell(),
            forward_ton_amount: (0, ton_1.toNano)("0.40"),
            query_id: 0n,
            response_destination: bridge,
        }));
    };
    const transferJetton = async (to, sender, tokenId, chainId, amount, destAddress, gasArgs) => {
        if (to.toString() === burner.toString()) {
            return await transferJettonToBurner(tokenId, sender, amount, destAddress, chainId, gasArgs);
        }
        return await transferJettonToBridge(tokenId, sender, chainId, destAddress, amount, gasArgs);
    };
    async function isWrappedToken(tokenId) {
        const native = await bridgeReader.getNativeTokens();
        const isNative = native.get(tokenId);
        if (isNative) {
            return false;
        }
        const wrapped = await bridgeReader.getWrappedTokens();
        return wrapped.get(tokenId) !== null;
    }
    return {
        async emmetHashFromtx(hash) {
            const txs = await client.getTransactions(bridge, {
                hash,
                limit: 10,
            });
            for (const tx of txs) {
                for (let i = 0; i < tx.outMessagesCount; i++) {
                    const om = tx.outMessages.get(i);
                    const code = om.body.asSlice().loadUint(32);
                    if (code === 3788443406) {
                        const instmt = (0, ton_2.loadSendInstallment)(om.body.asSlice());
                        return `0x${instmt.tx_id.toString(16)}`;
                    }
                }
            }
            throw new Error("No send installment found");
        },
        id: () => Promise.resolve(chainId),
        nativeCoin: () => "TON",
        chainName: () => chainName,
        txFee(coin_name) {
            throw new Error(`Unimplemented ${coin_name}`);
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
            try {
                const tx = await client.getTransactions(bridge, {
                    limit: 1,
                    hash: hash,
                });
                return {
                    timestamp: BigInt(tx[0].now),
                    value: tx[0].totalFees.coins,
                };
            }
            catch (_) {
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
        sendInstallment: async (signer, amt, cid, _, tokenSymbol, destAddress, gasArgs) => {
            const bc = client.open(ton_2.Bridge.fromAddress(bridge));
            const tid = BigInt(`0x${(0, crypto_1.sha256_sync)(tokenSymbol).toString("hex")}`);
            let hash = "";
            if (tid === nativeTokenId) {
                hash = await transferTon(bc, signer, destAddress, tid, cid, amt, gasArgs);
            }
            else if (await isWrappedToken(tid)) {
                hash = await transferJetton(burner, signer, tid, cid, amt, destAddress, gasArgs);
            }
            else {
                hash = await transferJetton(bridge, signer, tid, cid, amt, destAddress, gasArgs);
            }
            return {
                hash: hash,
                tx: hash,
            };
        },
    };
}
exports.tonHandler = tonHandler;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2NoYWlucy90b24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsa0NBU2tCO0FBZWxCLDBDQUErRDtBQUMvRCx3Q0FBMEM7QUFDMUMsb0RBQWlEO0FBQ2pELGtFQUErRDtBQUMvRCxrRUFBcUU7QUEyQnJFLFNBQWdCLFVBQVUsQ0FBQyxFQUN6QixNQUFNLEVBQ04sTUFBTSxFQUNOLGFBQWEsRUFDYixNQUFNLEVBQ04sTUFBTSxFQUNOLFNBQVMsRUFDVCxPQUFPLEdBQ0c7SUFDViwwQkFBMEI7SUFDMUIsTUFBTSxjQUFjLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxlQUFNLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7SUFDL0QsTUFBTSxZQUFZLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxZQUFNLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7SUFDN0QsS0FBSyxVQUFVLFdBQVcsQ0FDeEIsTUFBOEIsRUFDOUIsTUFBYyxFQUNkLEVBQVUsRUFDVixPQUFlLEVBQ2YsT0FBZSxFQUNmLE1BQWMsRUFDZCxPQUFvQjtRQUVwQixPQUFPLENBQUMsTUFBTSxNQUFNLENBQUMsSUFBSSxDQUN2QixNQUFNLEVBQ047WUFDRSxZQUFZO1lBQ1osS0FBSyxFQUFFLE1BQU0sR0FBRyxJQUFBLFlBQU0sRUFBQyxNQUFNLENBQUM7WUFDOUIsR0FBRyxPQUFPO1NBQ1gsRUFDRDtZQUNFLE1BQU0sRUFBRSxXQUFXO1lBQ25CLE1BQU0sRUFBRSxNQUFNO1lBQ2QsWUFBWSxFQUFFLE1BQU0sQ0FBQyxPQUFPLENBQUM7WUFDN0IsRUFBRSxFQUFFLElBQUEsZUFBUyxHQUFFLENBQUMsa0JBQWtCLENBQUMsRUFBRSxDQUFDLENBQUMsT0FBTyxFQUFFO1lBQ2hELFFBQVEsRUFBRSxPQUFPLEVBQUUsK0NBQStDO1NBQ25FLENBQ0YsQ0FBK0IsQ0FBQztJQUNu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