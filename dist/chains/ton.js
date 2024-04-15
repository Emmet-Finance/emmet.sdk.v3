"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tonHandler = void 0;
const ton_1 = require("@ton/ton");
const ton_2 = require("../contracts/ton");
const crypto_1 = require("@ton/crypto");
function tonHandler({ client, bridge, nativeTokenId, }) {
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
    async function isWrappedToken(tokenId) {
        const wrapped = await bridgeReader.getWrappedTokens();
        return wrapped.get(tokenId) !== null;
    }
    //@ts-ignore
    async function transferJetton(jetton, sender, _to, _tokenId, _chainId, _amount) {
        const jc = client.open(ton_1.JettonMaster.create(jetton));
        const jwa = await jc.getWalletAddress(sender.address);
        const jw = client.open(ton_1.JettonWallet.create(jwa));
        console.log(jw);
    }
    return {
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
            }
            else {
                throw new Error("Need to transfer ");
            }
            return {
                hash: "",
                tx: undefined,
            };
        },
    };
}
exports.tonHandler = tonHandler;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2NoYWlucy90b24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsa0NBU2tCO0FBUWxCLDBDQUEwQztBQUMxQyx3Q0FBMEM7QUFvQjFDLFNBQWdCLFVBQVUsQ0FBQyxFQUN6QixNQUFNLEVBQ04sTUFBTSxFQUNOLGFBQWEsR0FDSDtJQUNWLE1BQU0sWUFBWSxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsWUFBTSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO0lBQzdELFNBQVMsV0FBVyxDQUNsQixNQUE4QixFQUM5QixNQUFjLEVBQ2QsRUFBVSxFQUNWLE9BQWUsRUFDZixPQUFlLEVBQ2YsTUFBYyxFQUNkLE9BQW9CO1FBRXBCLE9BQU8sTUFBTSxDQUFDLElBQUksQ0FDaEIsTUFBTSxFQUNOO1lBQ0UsWUFBWTtZQUNaLEtBQUssRUFBRSxNQUFNLEdBQUcsSUFBQSxZQUFNLEVBQUMsS0FBSyxDQUFDO1lBQzdCLEdBQUcsT0FBTztTQUNYLEVBQ0Q7WUFDRSxNQUFNLEVBQUUsV0FBVztZQUNuQixNQUFNLEVBQUUsTUFBTTtZQUNkLFlBQVksRUFBRSxNQUFNLENBQUMsT0FBTyxDQUFDO1lBQzdCLEVBQUUsRUFBRSxJQUFBLGVBQVMsR0FBRSxDQUFDLGtCQUFrQixDQUFDLEVBQUUsQ0FBQyxDQUFDLE9BQU8sRUFBRTtZQUNoRCxRQUFRLEVBQUUsT0FBTyxFQUFFLCtDQUErQztTQUNuRSxDQUNGLENBQUM7SUFDSixDQUFDO0lBRUQsS0FBSyxVQUFVLGNBQWMsQ0FBQyxPQUFlO1FBQzNDLE1BQU0sT0FBTyxHQUFHLE1BQU0sWUFBWSxDQUFDLGdCQUFnQixFQUFFLENBQUM7UUFDdEQsT0FBTyxPQUFPLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxLQUFLLElBQUksQ0FBQztJQUN2QyxDQUFDO0lBRUQsWUFBWTtJQUNaLEtBQUssVUFBVSxjQUFjLENBQzNCLE1B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