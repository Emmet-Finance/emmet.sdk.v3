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
            value: amount + (0, ton_1.toNano)("0.3"),
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
        await jtw.send(signer, { value: 500000000n, ...gasArgs }, {
            $$type: "JettonTransfer",
            amount: amt,
            custom_payload: null,
            query_id: 0n,
            destination: burner,
            forward_payload: (0, ton_1.beginCell)()
                .storeAddress(bridge)
                .storeUint(cid, 16)
                .storeUint(tid, 16)
                .storeRef((0, ton_1.beginCell)().storeStringTail(destAddress).asCell())
                .endCell(),
            forward_ton_amount: 100000000n,
            response_destination: bridge,
        });
    };
    const transferJettonToBridge = async (tid, signer, target_chain, destAddress, gasArgs) => {
        const ntd = await bridgeReader.getNativeTokens();
        const wt = ntd.get(tid);
        const jt = client.open(jetton_master_1.WrappedJetton.fromAddress(wt.address));
        const jtw = client.open(jetton_wallet_1.WrappedJettonWallet.fromAddress(await jt.getGetWalletAddress(signer.address)));
        await jtw.send(signer, { value: 500000000n, ...gasArgs }, {
            $$type: "JettonTransfer",
            amount: 1n,
            custom_payload: null,
            destination: bridge,
            forward_payload: (0, ton_1.beginCell)()
                .storeUint(target_chain, 16) // Target Chain
                .storeUint(tid, 16) // TokenID
                .storeRef((0, ton_1.beginCell)().storeStringTail(destAddress).asCell())
                .endCell(),
            forward_ton_amount: 50000000n,
            query_id: 0n,
            response_destination: bridge,
        });
    };
    const transferJetton = async (to, sender, tokenId, chainId, amount, destAddress, gasArgs) => {
        if (to.toString() === burner.toString()) {
            transferJettonToBurner(tokenId, sender, amount, destAddress, chainId, gasArgs);
        }
        else {
            transferJettonToBridge(tokenId, sender, chainId, destAddress, gasArgs);
        }
    };
    async function isWrappedToken(tokenId) {
        const wrapped = await bridgeReader.getWrappedTokens();
        return wrapped.get(tokenId) !== null;
    }
    return {
        nativeCoin: () => "TON",
        chainName: () => chainName,
        getCoinPrice: async (coin) => {
            const pf = await oracleContract.getPriceFeed();
            const cid = BigInt(`0x${(0, crypto_1.sha256_sync)(coin).toString('hex')}`);
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
            if (tid === nativeTokenId) {
                transferTon(bc, signer, destAddress, tid, cid, amt, gasArgs);
            }
            else if (await isWrappedToken(tid)) {
                await transferJetton(burner, signer, tid, cid, amt, destAddress, gasArgs);
            }
            else {
                await transferJetton(bridge, signer, tid, cid, amt, destAddress, gasArgs);
            }
            return {
                hash: "",
                tx: undefined,
            };
        },
    };
}
exports.tonHandler = tonHandler;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2NoYWlucy90b24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsa0NBU2tCO0FBYWxCLDBDQUEwQztBQUMxQyx3Q0FBMEM7QUFDMUMsb0RBQWlEO0FBQ2pELGtFQUErRDtBQUMvRCxrRUFBcUU7QUF3QnJFLFNBQWdCLFVBQVUsQ0FBQyxFQUN6QixNQUFNLEVBQ04sTUFBTSxFQUNOLGFBQWEsRUFDYixNQUFNLEVBQ04sTUFBTSxFQUNOLFNBQVMsR0FDQztJQUNWLE1BQU0sY0FBYyxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsZUFBTSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO0lBQy9ELE1BQU0sWUFBWSxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsWUFBTSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO0lBQzdELFNBQVMsV0FBVyxDQUNsQixNQUE4QixFQUM5QixNQUFjLEVBQ2QsRUFBVSxFQUNWLE9BQWUsRUFDZixPQUFlLEVBQ2YsTUFBYyxFQUNkLE9BQW9CO1FBRXBCLE9BQU8sTUFBTSxDQUFDLElBQUksQ0FDaEIsTUFBTSxFQUNOO1lBQ0UsWUFBWTtZQUNaLEtBQUssRUFBRSxNQUFNLEdBQUcsSUFBQSxZQUFNLEVBQUMsS0FBSyxDQUFDO1lBQzdCLEdBQUcsT0FBTztTQUNYLEVBQ0Q7WUFDRSxNQUFNLEVBQUUsV0FBVztZQUNuQixNQUFNLEVBQUUsTUFBTTtZQUNkLFlBQVksRUFBRSxNQUFNLENBQUMsT0FBTyxDQUFDO1lBQzdCLEVBQUUsRUFBRSxJQUFBLGVBQVMsR0FBRSxDQUFDLGtCQUFrQixDQUFDLEVBQUUsQ0FBQyxDQUFDLE9BQU8sRUFBRTtZQUNoRCxRQUFRLEVBQUUsT0FBTyxFQUFFLCtDQUErQztTQUNuRSxDQUNGLENBQUM7SUFDSixDQUFDO0lBRUQsTUFBTSxzQkFBc0IsR0FBRyxLQUFLLEVBQ2xDLEdBQVcs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