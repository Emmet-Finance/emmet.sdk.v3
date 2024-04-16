"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.web3Helper = void 0;
const ethers_1 = require("ethers");
const typechain_types_1 = require("../contracts/evm/typechain-types");
const PriceOracle_1 = require("../contracts/evm/typechain-types/factories/contracts/PriceOracle");
function web3Helper({ provider, contract, oracle, chainName, nativeCoin }) {
    const bridge = typechain_types_1.FTBridge__factory.connect(contract, provider);
    const orac = PriceOracle_1.IEmmetFeeOracle__factory.connect(oracle, provider);
    return {
        nativeCoin: () => nativeCoin,
        chainName: () => chainName,
        getCoinPrice: (c) => orac.getCoinPrice(c),
        calculateCoinFees: (coinName, amt) => orac.calculateCoinFees(coinName, amt),
        calculateTransactionFees: async (destChain) => orac.calculateTransactionFee(destChain),
        preTransfer: async (signer, tid, amt, gasArgs) => {
            const approved = await typechain_types_1.WrappedERC20__factory.connect(tid, signer).approve(contract, amt, gasArgs);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2ViMy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jaGFpbnMvd2ViMy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSxtQ0FLZ0I7QUFlaEIsc0VBRzBDO0FBRTFDLGtHQUE0RztBQXFCNUcsU0FBZ0IsVUFBVSxDQUFDLEVBQ3pCLFFBQVEsRUFDUixRQUFRLEVBQ1IsTUFBTSxFQUNOLFNBQVMsRUFBQyxVQUFVLEVBQ1Q7SUFDWCxNQUFNLE1BQU0sR0FBRyxtQ0FBaUIsQ0FBQyxPQUFPLENBQUMsUUFBUSxFQUFFLFFBQVEsQ0FBQyxDQUFDO0lBQzdELE1BQU0sSUFBSSxHQUFHLHNDQUF3QixDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQUUsUUFBUSxDQUFDLENBQUM7SUFDaEUsT0FBTztRQUNMLFVBQVUsRUFBRSxHQUFHLEVBQUUsQ0FBQyxVQUFVO1FBQzVCLFNBQVMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxTQUFTO1FBQzFCLFlBQVksRUFBRSxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUM7UUFDekMsaUJBQWlCLEVBQUUsQ0FBQyxRQUFRLEVBQUUsR0FBRyxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsUUFBUSxFQUFFLEdBQUcsQ0FBQztRQUMzRSx3QkFBd0IsRUFBRSxLQUFLLEVBQUUsU0FBUyxFQUFFLEVBQUUsQ0FDNUMsSUFBSSxDQUFDLHVCQUF1QixDQUFDLFNBQVMsQ0FBQztRQUN6QyxXQUFXLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLE9BQU8sRUFBRSxFQUFFO1lBQy9DLE1BQU0sUUFBUSxHQUFHLE1BQU0sdUNBQXFCLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxNQUFNLENBQUMsQ0FBQyxPQUFPLENBQ3ZFLFFBQVEsRUFDUixHQUFHLEVBQ0gsT0FBTyxDQUNSLENBQUM7WUFDRixPQUFPLFFBQVEsQ0FBQyxJQUFJLENBQUM7UUFDdkIsQ0FBQztRQUNELGlCQUFpQixFQUFFLEtBQUssRUFBRSxHQUFHLEVBQUUsS0FBSyxFQUFFLEVBQUUsQ0FDdEMsTUFBTSx1Q0FBcUIsQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLFFBQVEsQ0FBQyxDQUFDLFNBQVMsQ0FDMUQsS0FBSyxFQUNMLE1BQU0sQ0FDUDtRQUNILE9BQU8sRUFBRSxDQUFDLElBQUksRUFBRSxFQUFFLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUM7UUFDNUMsUUFBUSxFQUFFLEdBQUcsRUFBRSxDQUFDLFFBQVE7UUFDeEIsZUFBZSxFQUFFLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLElBQUEsa0JBQVMsRUFBQyxJQUFJLENBQUMsQ0FBQztRQUMzRCxZQUFZLEVBQUUsS0FBSyxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsRUFBRSxDQUNoQyx1Q0FBcUIsQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLFFBQVEsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUM7UUFDOUQsZUFBZSxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLE9BQU8sRUFBRSxFQUFFO1lBQzNELE1BQU0sRUFBRSxHQUFHLE1BQU0sTUFBTSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQyxlQUFlLENBQ3JEO2dCQUNFLE9BQU8sRUFBRSxHQUFHO2dCQUNaLE1BQU0sRUFBRSxHQUFHO2dCQUNYLGtCQUFrQixFQUFFLEVBQUU7Z0JBQ3RCLFdBQVcsRUFBRSxFQUFFO2FBQ2hCLEVBQ0QsRUFBRSxHQUFHLE9BQU8sRUFBRSxDQUNmLENBQUM7WUFDRixPQUFPO2dCQUNMLEVBQUUsRUFBRSxFQUFFO2dCQUNOLElBQUksRUFBRSxFQUFFLENBQUMsSUFBSTthQUNkLENBQUM7UUFDSixDQUFDO0tBQ0YsQ0FBQztBQUNKLENBQUM7QUFqREQsZ0NBaURDIn0=