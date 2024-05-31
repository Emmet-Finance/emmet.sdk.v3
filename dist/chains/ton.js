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
    async function transferTon(bridge, sender, to, tokenId, chainId, amount, gasArgs) {
        return await bridge.send(sender, {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2NoYWlucy90b24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsa0NBU2tCO0FBYWxCLDBDQUEwQztBQUMxQyx3Q0FBMEM7QUFDMUMsb0RBQWlEO0FBQ2pELGtFQUErRDtBQUMvRCxrRUFBcUU7QUF3QnJFLFNBQWdCLFVBQVUsQ0FBQyxFQUN6QixNQUFNLEVBQ04sTUFBTSxFQUNOLGFBQWEsRUFDYixNQUFNLEVBQ04sTUFBTSxFQUNOLFNBQVMsR0FDQztJQUNWLE1BQU0sY0FBYyxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsZUFBTSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO0lBQy9ELE1BQU0sWUFBWSxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsWUFBTSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO0lBQzdELEtBQUssVUFBVSxXQUFXLENBQ3hCLE1BQThCLEVBQzlCLE1BQWMsRUFDZCxFQUFVLEVBQ1YsT0FBZSxFQUNmLE9BQWUsRUFDZixNQUFjLEVBQ2QsT0FBb0I7UUFFcEIsT0FBTyxNQUFNLE1BQU0sQ0FBQyxJQUFJLENBQ3RCLE1BQU0sRUFDTjtZQUNFLFlBQVk7WUFDWixLQUFLLEVBQUUsTUFBTSxHQUFHLElBQUEsWUFBTSxFQUFDLE1BQU0sQ0FBQztZQUM5QixHQUFHLE9BQU87U0FDWCxFQUNEO1lBQ0UsTUFBTSxFQUFFLFdBQVc7WUFDbkIsTUFBTSxFQUFFLE1BQU07WUFDZCxZQUFZLEVBQUUsTUFBTSxDQUFDLE9BQU8sQ0FBQztZQUM3QixFQUFFLEVBQUUsSUFBQSxlQUFTLEdBQUUsQ0FBQyxrQkFBa0IsQ0FBQyxFQUFFLENBQUMsQ0FBQyxPQUFPLEVBQUU7WUFDaEQsUUFBUSxFQUFFLE9BQU8sRUFBRSwrQ0FBK0M7U0FDbkUsQ0FDNEIsQ0FBQztJQUNsQyxDQUFDO0lBRUQsTUFBTSxzQkFBc0IsR0FBRyxLQUFL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