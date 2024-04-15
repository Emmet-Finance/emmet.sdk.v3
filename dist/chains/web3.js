"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.web3Helper = void 0;
const ethers_1 = require("ethers");
const typechain_types_1 = require("../contracts/evm/typechain-types");
function web3Helper({ provider, contract }) {
    const bridge = typechain_types_1.FTBridge__factory.connect(contract, provider);
    return {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2ViMy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jaGFpbnMvd2ViMy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSxtQ0FLZ0I7QUFVaEIsc0VBRzBDO0FBZ0IxQyxTQUFnQixVQUFVLENBQUMsRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFjO0lBQzNELE1BQU0sTUFBTSxHQUFHLG1DQUFpQixDQUFDLE9BQU8sQ0FBQyxRQUFRLEVBQUUsUUFBUSxDQUFDLENBQUM7SUFDN0QsT0FBTztRQUNMLFdBQVcsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsT0FBTyxFQUFFLEVBQUU7WUFDL0MsTUFBTSxRQUFRLEdBQUcsTUFBTSx1Q0FBcUIsQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLE1BQU0sQ0FBQyxDQUFDLE9BQU8sQ0FDdkUsUUFBUSxFQUNSLEdBQUcsRUFDSCxPQUFPLENBQ1IsQ0FBQztZQUNGLE9BQU8sUUFBUSxDQUFDLElBQUksQ0FBQztRQUN2QixDQUFDO1FBQ0QsaUJBQWlCLEVBQUUsS0FBSyxFQUFFLEdBQUcsRUFBRSxLQUFLLEVBQUUsRUFBRSxDQUN0QyxNQUFNLHVDQUFxQixDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsUUFBUSxDQUFDLENBQUMsU0FBUyxDQUMxRCxLQUFLLEVBQ0wsTUFBTSxDQUNQO1FBQ0gsT0FBTyxFQUFFLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQztRQUM1QyxRQUFRLEVBQUUsR0FBRyxFQUFFLENBQUMsUUFBUTtRQUN4QixlQUFlLEVBQUUsQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsSUFBQSxrQkFBUyxFQUFDLElBQUksQ0FBQyxDQUFDO1FBQzNELFlBQVksRUFBRSxLQUFLLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxFQUFFLENBQ2hDLHVDQUFxQixDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsUUFBUSxDQUFDLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQztRQUM5RCxlQUFlLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsT0FBTyxFQUFFLEVBQUU7WUFDM0QsTUFBTSxFQUFFLEdBQUcsTUFBTSxNQUFNLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDLGVBQWUsQ0FDckQ7Z0JBQ0UsT0FBTyxFQUFFLEdBQUc7Z0JBQ1osTUFBTSxFQUFFLEdBQUc7Z0JBQ1gsa0JBQWtCLEVBQUUsRUFBRTtnQkFDdEIsV0FBVyxFQUFFLEVBQUU7YUFDaEIsRUFDRCxFQUFFLEdBQUcsT0FBTyxFQUFFLENBQ2YsQ0FBQztZQUNGLE9BQU87Z0JBQ0wsRUFBRSxFQUFFLEVBQUU7Z0JBQ04sSUFBSSxFQUFFLEVBQUUsQ0FBQyxJQUFJO2FBQ2QsQ0FBQztRQUNKLENBQUM7S0FDRixDQUFDO0FBQ0osQ0FBQztBQXJDRCxnQ0FxQ0MifQ==