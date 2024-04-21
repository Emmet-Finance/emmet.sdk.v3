"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tonHandler = void 0;
const ton_1 = require("@ton/ton");
const ton_2 = require("../contracts/ton");
const crypto_1 = require("@ton/crypto");
const oracle_1 = require("../contracts/ton/oracle");
const jetton_master_1 = require("../contracts/ton/jetton-master");
const jetton_wallet_1 = require("../contracts/ton/jetton-wallet");
function tonHandler({ client, bridge, nativeTokenId, oracle, burner, chainName, }) {
    const oracleContract = client.open(oracle_1.Oracle.fromAddress(oracle));
    const bridgeReader = client.open(ton_2.Bridge.fromAddress(bridge));
    function transferTon(bridge, sender, to, tokenId, chainId, amount, gasArgs) {
        return bridge.send(sender, {
            //@ts-ignore
            value: amount + (0, ton_1.toNano)("0.45"),
            ...gasArgs,
        }, {
            $$type: "FreezeTon",
            amount: amount,
            target_chain: BigInt(chainId),
            to: (0, ton_1.beginCell)().storeStringRefTail(to).endCell(),
            token_id: tokenId, // Should map to some token in the tokens table
        });
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
        nativeCoin: () => "TON",
        chainName: () => chainName,
        getCoinPrice: async (coin) => {
            const pf = await oracleContract.getPriceFeed();
            const cid = BigInt(`0x${(0, crypto_1.sha256_sync)(coin).toString("hex")}`);
            const data = pf.get(cid);
            if (!data) {
                throw new Error(`No price info found for symbol ${coin}, id ${cid}`);
            }
            return data.price;
        },
        calculateTransactionFees: async (chain_name) => oracleContract.getCalculateTransactionFees(chain_name),
        calculateCoinFees: async (coin_name, amt) => oracleContract.getCalculateCoinFees(coin_name, amt),
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
        tokenBalance: async (token, addr) => {
            const jc = client.open(ton_1.JettonMaster.create(ton_1.Address.parse(token)));
            const jwa = await jc.getWalletAddress(ton_1.Address.parse(addr));
            const jw = client.open(ton_1.JettonWallet.create(jwa));
            return jw.getBalance();
        },
        sendInstallment: async (signer, amt, cid, tokenSymbol, destAddress, gasArgs) => {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2NoYWlucy90b24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsa0NBU2tCO0FBYWxCLDBDQUEwQztBQUMxQyx3Q0FBMEM7QUFDMUMsb0RBQWlEO0FBQ2pELGtFQUErRDtBQUMvRCxrRUFBcUU7QUF3QnJFLFNBQWdCLFVBQVUsQ0FBQyxFQUN6QixNQUFNLEVBQ04sTUFBTSxFQUNOLGFBQWEsRUFDYixNQUFNLEVBQ04sTUFBTSxFQUNOLFNBQVMsR0FDQztJQUNWLE1BQU0sY0FBYyxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsZUFBTSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO0lBQy9ELE1BQU0sWUFBWSxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsWUFBTSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO0lBQzdELFNBQVMsV0FBVyxDQUNsQixNQUE4QixFQUM5QixNQUFjLEVBQ2QsRUFBVSxFQUNWLE9BQWUsRUFDZixPQUFlLEVBQ2YsTUFBYyxFQUNkLE9BQW9CO1FBRXBCLE9BQU8sTUFBTSxDQUFDLElBQUksQ0FDaEIsTUFBTSxFQUNOO1lBQ0UsWUFBWTtZQUNaLEtBQUssRUFBRSxNQUFNLEdBQUcsSUFBQSxZQUFNLEVBQUMsTUFBTSxDQUFDO1lBQzlCLEdBQUcsT0FBTztTQUNYLEVBQ0Q7WUFDRSxNQUFNLEVBQUUsV0FBVztZQUNuQixNQUFNLEVBQUUsTUFBTTtZQUNkLFlBQVksRUFBRSxNQUFNLENBQUMsT0FBTyxDQUFDO1lBQzdCLEVBQUUsRUFBRSxJQUFBLGVBQVMsR0FBRSxDQUFDLGtCQUFrQixDQUFDLEVBQUUsQ0FBQyxDQUFDLE9BQU8sRUFBRTtZQUNoRCxRQUFRLEVBQUUsT0FBTyxFQUFFLCtDQUErQztTQUNuRSxDQUM0QixDQUFDO0lBQ2xDLENBQUM7SUFFRCxNQUFNLHNCQUFzQixHQUFHLEtBQUssRUFDbEMsR0FB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