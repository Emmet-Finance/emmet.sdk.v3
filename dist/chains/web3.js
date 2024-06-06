"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.web3Helper = void 0;
const ethers_1 = require("ethers");
const web3_1 = require("@emmet-contracts/web3");
const ethers_decode_error_1 = require("ethers-decode-error");
async function web3Helper({ provider, addressBook, chainName, nativeCoin, }) {
    const addrBook = web3_1.EmmetAddressBook__factory.connect(addressBook, provider);
    const bridgeAddr = await addrBook.get("EmmetBridge");
    const emmetData = await addrBook.get("EmmetData");
    const bridge = web3_1.EmmetBridge__factory.connect(bridgeAddr, provider);
    const data = web3_1.EmmetData__factory.connect(emmetData, provider);
    return {
        id: async () => (await provider.getNetwork()).chainId,
        async address(contr) {
            return await addrBook.get(contr);
        },
        async txFee(targetChainId, fromToken, targetToken) {
            const protocolFee = await data.protocolFee();
            const ffc = await data.getForeignFeeCompensation(targetChainId, fromToken, targetToken);
            return protocolFee.usdEquivalent + ffc;
        },
        async token(symbol) {
            const token = await data.getToken(symbol);
            return {
                address: token.addr,
                swap: token.swap,
                decimals: token.decimals,
                fee: token.fee,
                feeDecimals: token.feeDecimals,
                symbol: token.symbol,
            };
        },
        nativeCoin: () => nativeCoin,
        chainName: () => chainName,
        preTransfer: async (signer, tid, amt, gasArgs) => {
            const approved = await web3_1.WrappedERC20__factory.connect(tid, signer).approve(bridge, amt, gasArgs);
            return approved.hash;
        },
        getApprovedAmount: async (tid, owner) => await web3_1.WrappedERC20__factory.connect(tid, provider).allowance(owner, bridge),
        balance: (addr) => provider.getBalance(addr),
        provider: () => provider,
        validateAddress: (addr) => Promise.resolve((0, ethers_1.isAddress)(addr)),
        tokenBalance: async (tkn, addr) => web3_1.WrappedERC20__factory.connect(tkn, provider).balanceOf(addr),
        sendInstallment: async (signer, amt, cid, fs, ts, da, gasArgs) => {
            const ed = ethers_decode_error_1.ErrorDecoder.create([bridge.interface]);
            try {
                const tx = await bridge
                    .connect(signer)
                    .sendInstallment(cid, amt, fs, ts, da, { ...gasArgs });
                return {
                    tx: tx,
                    hash: tx.hash,
                };
            }
            catch (e) {
                throw await ed.decode(e);
            }
        },
    };
}
exports.web3Helper = web3Helper;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2ViMy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jaGFpbnMvd2ViMy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSxtQ0FLZ0I7QUFnQmhCLGdEQUsrQjtBQUUvQiw2REFBbUQ7QUFzQjVDLEtBQUssVUFBVSxVQUFVLENBQUMsRUFDL0IsUUFBUSxFQUNSLFdBQVcsRUFDWCxTQUFTLEVBQ1QsVUFBVSxHQUNDO0lBQ1gsTUFBTSxRQUFRLEdBQUcsZ0NBQXlCLENBQUMsT0FBTyxDQUFDLFdBQVcsRUFBRSxRQUFRLENBQUMsQ0FBQztJQUMxRSxNQUFNLFVBQVUsR0FBRyxNQUFNLFFBQVEsQ0FBQyxHQUFHLENBQUMsYUFBYSxDQUFDLENBQUM7SUFDckQsTUFBTSxTQUFTLEdBQUcsTUFBTSxRQUFRLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxDQUFDO0lBQ2xELE1BQU0sTUFBTSxHQUFHLDJCQUFvQixDQUFDLE9BQU8sQ0FBQyxVQUFVLEVBQUUsUUFBUSxDQUFDLENBQUM7SUFDbEUsTUFBTSxJQUFJLEdBQUcseUJBQWtCLENBQUMsT0FBTyxDQUFDLFNBQVMsRUFBRSxRQUFRLENBQUMsQ0FBQztJQUM3RCxPQUFPO1FBQ0wsRUFBRSxFQUFFLEtBQUssSUFBSSxFQUFFLENBQUMsQ0FBQyxNQUFNLFFBQVEsQ0FBQyxVQUFVLEVBQUUsQ0FBQyxDQUFDLE9BQU87UUFDckQsS0FBSyxDQUFDLE9BQU8sQ0FBQyxLQUFLO1lBQ2pCLE9BQU8sTUFBTSxRQUFRLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ25DLENBQUM7UUFDRCxLQUFLLENBQUMsS0FBSyxDQUFDLGFBQWEsRUFBRSxTQUFTLEVBQUUsV0FBVztZQUMvQyxNQUFNLFdBQVcsR0FBRyxNQUFNLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQTtZQUM1QyxNQUFNLEdBQUcsR0FBRyxNQUFNLElBQUksQ0FBQyx5QkFBeUIsQ0FBQyxhQUFhLEVBQUUsU0FBUyxFQUFF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