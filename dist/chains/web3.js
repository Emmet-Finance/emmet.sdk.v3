"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.web3Helper = void 0;
const ethers_1 = require("ethers");
const typechain_types_1 = require("../contracts/evm/typechain-types");
const web3_1 = require("@emmet-contracts/web3");
async function web3Helper({ provider, addressBook, chainName, nativeCoin, }) {
    const addrBook = web3_1.EmmetAddressBook__factory.connect(addressBook, provider);
    const bridgeAddr = await addrBook.get("EmmetBridge");
    const emmetData = await addrBook.get("EmmetData");
    const bridge = typechain_types_1.FTBridge__factory.connect(bridgeAddr, provider);
    const data = web3_1.EmmetData__factory.connect(emmetData, provider);
    return {
        async address(contr) {
            return await addrBook.get(contr);
        },
        async token(symbol) {
            const token = await data.getToken(symbol);
            return {
                address: token.addr,
                swap: token.swap,
                decimals: token.decimals,
                fee: token.fee,
                feeDecimals: token.feeDecimals,
                symbol: token.symbol
            };
        },
        nativeCoin: () => nativeCoin,
        chainName: () => chainName,
        preTransfer: async (signer, tid, amt, gasArgs) => {
            const approved = await typechain_types_1.WrappedERC20__factory.connect(tid, signer).approve(bridge, amt, gasArgs);
            return approved.hash;
        },
        getApprovedAmount: async (tid, owner) => await typechain_types_1.WrappedERC20__factory.connect(tid, provider).allowance(owner, bridge),
        balance: (addr) => provider.getBalance(addr),
        provider: () => provider,
        validateAddress: (addr) => Promise.resolve((0, ethers_1.isAddress)(addr)),
        tokenBalance: async (tkn, addr) => typechain_types_1.WrappedERC20__factory.connect(tkn, provider).balanceOf(addr),
        sendInstallment: async (signer, amt, cid, ts, da, gasArgs) => {
            const tx = await bridge.connect(signer).sendInstallment({
                chainId: cid,
                amount: amt,
                destinationAddress: da,
                tokenSymbol: ts,
            }, { ...gasArgs });
            return {
                tx: tx,
                hash: tx.hash,
            };
        },
    };
}
exports.web3Helper = web3Helper;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2ViMy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jaGFpbnMvd2ViMy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSxtQ0FLZ0I7QUFjaEIsc0VBRzBDO0FBRTFDLGdEQUFzRjtBQW9CL0UsS0FBSyxVQUFVLFVBQVUsQ0FBQyxFQUMvQixRQUFRLEVBQ1IsV0FBVyxFQUNYLFNBQVMsRUFDVCxVQUFVLEdBQ0M7SUFDWCxNQUFNLFFBQVEsR0FBRyxnQ0FBeUIsQ0FBQyxPQUFPLENBQUMsV0FBVyxFQUFFLFFBQVEsQ0FBQyxDQUFDO0lBQzFFLE1BQU0sVUFBVSxHQUFHLE1BQU0sUUFBUSxDQUFDLEdBQUcsQ0FBQyxhQUFhLENBQUMsQ0FBQztJQUNyRCxNQUFNLFNBQVMsR0FBRyxNQUFNLFFBQVEsQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDLENBQUM7SUFDbEQsTUFBTSxNQUFNLEdBQUcsbUNBQWlCLENBQUMsT0FBTyxDQUFDLFVBQVUsRUFBRSxRQUFRLENBQUMsQ0FBQztJQUMvRCxNQUFNLElBQUksR0FBRyx5QkFBa0IsQ0FBQyxPQUFPLENBQUMsU0FBUyxFQUFFLFFBQVEsQ0FBQyxDQUFDO0lBQzdELE9BQU87UUFDTCxLQUFLLENBQUMsT0FBTyxDQUFDLEtBQUs7WUFDakIsT0FBTyxNQUFNLFFBQVEsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDbkMsQ0FBQztRQUNELEtBQUssQ0FBQyxLQUFLLENBQUMsTUFBTTtZQUNoQixNQUFNLEtBQUssR0FBRyxNQUFNLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUE7WUFDekMsT0FBTztnQkFDTCxPQUFPLEVBQUUsS0FBSyxDQUFDLElBQUk7Z0JBQ25CLElBQUksRUFBRSxLQUFLLENBQUMsSUFBSTtnQkFDaEIsUUFBUSxFQUFFLEtBQUssQ0FBQyxRQUFRO2dCQUN4QixHQUFHLEVBQUUsS0FBSyxDQUFDLEdBQUc7Z0JBQ2QsV0FBVyxFQUFFLEtBQUssQ0FBQyxXQUFXO2dCQUM5QixNQUFNLEVBQUUsS0FBSyxDQUFDLE1BQU07YUFDckIsQ0FBQTtRQUNILENBQUM7UUFDRCxVQUFVLEVBQUUsR0FBRyxFQUFFLENBQUMsVUFBVTtRQUM1QixTQUFTLEVBQUUsR0FBRyxFQUFFLENBQUMsU0FBUztRQUMxQixXQUFXLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLE9BQU8sRUFBRSxFQUFFO1lBQy9DLE1BQU0sUUFBUSxHQUFHLE1BQU0sdUNBQXFCLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxNQUFNLENBQUMsQ0FBQyxPQUFPLENBQ3ZFLE1BQU0sRUFDTixHQUFHLEVBQ0gsT0FBTyxDQUNSLENBQUM7WUFDRixPQUFPLFFBQVEsQ0FBQyxJQUFJLENBQUM7UUFDdkIsQ0FBQztRQUVELGlCQUFpQixFQUFFLEtBQUssRUFBRSxHQUFHLEVBQUUsS0FBSyxFQUFFLEVBQUUsQ0FDdEMsTUFBTSx1Q0FBcUIsQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLFFBQVEsQ0FBQyxDQUFDLFNBQVMsQ0FDMUQsS0FBSyxFQUNMLE1BQU0sQ0FDUDtRQUNILE9BQU8sRUFBRSxDQUFDLElBQUksRUFBRSxFQUFFLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUM7UUFDNUMsUUFBUSxFQUFFLEdBQUcsRUFBRSxDQUFDLFFBQVE7UUFDeEIsZUFBZSxFQUFFLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLElBQUEsa0JBQVMsRUFBQyxJQUFJLENBQUMsQ0FBQztRQUMzRCxZQUFZLEVBQUUsS0FBSyxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsRUFBRSxDQUNoQyx1Q0FBcUIsQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLFFBQVEsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUM7UUFDOUQsZUFBZSxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLE9BQU8sRUFBRSxFQUFFO1lBQzNELE1BQU0sRUFBRSxHQUFHLE1BQU0sTUFBTSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQyxlQUFlLENBQ3JEO2dCQUNFLE9BQU8sRUFBRSxHQUFHO2dCQUNaLE1BQU0sRUFBRSxHQUFHO2dCQUNYLGtCQUFrQixFQUFFLEVBQUU7Z0JBQ3RCLFdBQVcsRUFBRSxFQUFFO2FBRWhCLEVBQ0QsRUFBRSxHQUFHLE9BQU8sRUFBRSxDQUNmLENBQUM7WUFDRixPQUFPO2dCQUNMLEVBQUUsRUFBRSxFQUFFO2dCQUNOLElBQUksRUFBRSxFQUFFLENBQUMsSUFBSTthQUNkLENBQUM7UUFDSixDQUFDO0tBQ0YsQ0FBQztBQUNKLENBQUM7QUFoRUQsZ0NBZ0VDIn0=