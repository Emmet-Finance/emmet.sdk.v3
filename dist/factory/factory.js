"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChainFactoryBuilder = exports.CHAIN_INFO = void 0;
const ton_1 = require("../chains/ton");
const web3_1 = require("../chains/web3");
const types_1 = require("./types");
function mapNonceToParams(chainParams) {
    const cToP = new Map();
    cToP.set(types_1.Chain.TON, chainParams.tonParams);
    cToP.set(types_1.Chain.POLYGON, chainParams.polygonParams);
    cToP.set(types_1.Chain.BSC, chainParams.bscParams);
    return cToP;
}
exports.CHAIN_INFO = new Map();
exports.CHAIN_INFO.set(types_1.Chain.POLYGON, {
    constructor: web3_1.web3Helper,
    decimals: 18,
    name: "Polygon",
    nonce: types_1.Chain.POLYGON,
});
exports.CHAIN_INFO.set(types_1.Chain.BSC, {
    constructor: web3_1.web3Helper,
    decimals: 18,
    name: "BSC",
    nonce: types_1.Chain.BSC
});
exports.CHAIN_INFO.set(types_1.Chain.TON, {
    decimals: 18,
    name: "Ton",
    nonce: types_1.Chain.TON,
    constructor: async (...args) => (0, ton_1.tonHandler)(...args),
});
function ChainFactoryBuilder(chainParams) {
    const helpers = new Map();
    const cToP = mapNonceToParams(chainParams);
    const inner = async (chain) => {
        let helper = helpers.get(chain);
        if (helper === undefined) {
            helper = await exports.CHAIN_INFO.get(chain).constructor(cToP.get(chain));
            helpers.set(chain, helper);
        }
        return helper;
    };
    return {
        inner,
        preTransfer: async (chain, signer, tid, amt, ga) => {
            const pt = await chain.preTransfer(signer, tid, amt, ga);
            return pt;
        },
        sendInstallment: async (chain, signer, amount, chainId, tokenSymbol, destAddress, gasArgs) => {
            const dc = await inner(chainId);
            if (!dc) {
                throw new Error(`Unsupported destination chain id: ${chainId}`);
            }
            const isValid = await dc.validateAddress(destAddress);
            if (!isValid) {
                throw new Error(`Invalid destination user address for chain id: ${chainId}`);
            }
            return await chain.sendInstallment(signer, amount, chainId, tokenSymbol, destAddress, gasArgs);
        },
    };
}
exports.ChainFactoryBuilder = ChainFactoryBuilder;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmFjdG9yeS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9mYWN0b3J5L2ZhY3RvcnkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsdUNBQTJDO0FBQzNDLHlDQUE0QztBQUM1QyxtQ0FBbUQ7QUFVbkQsU0FBUyxnQkFBZ0IsQ0FBQyxXQUFpQztJQUN6RCxNQUFNLElBQUksR0FBYSxJQUFJLEdBQUcsRUFBRSxDQUFDO0lBQ2pDLElBQUksQ0FBQyxHQUFHLENBQUMsYUFBSyxDQUFDLEdBQUcsRUFBRSxXQUFXLENBQUMsU0FBUyxDQUFDLENBQUM7SUFDM0MsSUFBSSxDQUFDLEdBQUcsQ0FBQyxhQUFLLENBQUMsT0FBTyxFQUFFLFdBQVcsQ0FBQyxhQUFhLENBQUMsQ0FBQztJQUNuRCxJQUFJLENBQUMsR0FBRyxDQUFDLGFBQUssQ0FBQyxHQUFHLEVBQUUsV0FBVyxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBQzNDLE9BQU8sSUFBSSxDQUFDO0FBQ2QsQ0FBQztBQUVZLFFBQUEsVUFBVSxHQUFjLElBQUksR0FBRyxFQUFFLENBQUM7QUFFL0Msa0JBQVUsQ0FBQyxHQUFHLENBQUMsYUFBSyxDQUFDLE9BQU8sRUFBRTtJQUM1QixXQUFXLEVBQUUsaUJBQVU7SUFDdkIsUUFBUSxFQUFFLEVBQUU7SUFDWixJQUFJLEVBQUUsU0FBUztJQUNmLEtBQUssRUFBRSxhQUFLLENBQUMsT0FBTztDQUNyQixDQUFDLENBQUM7QUFFSCxrQkFBVSxDQUFDLEdBQUcsQ0FBQyxhQUFLLENBQUMsR0FBRyxFQUFFO0lBQ3hCLFdBQVcsRUFBRSxpQkFBVTtJQUN2QixRQUFRLEVBQUUsRUFBRTtJQUNaLElBQUksRUFBRSxLQUFLO0lBQ1gsS0FBSyxFQUFFLGFBQUssQ0FBQyxHQUFHO0NBQ2pCLENBQUMsQ0FBQztBQUVILGtCQUFVLENBQUMsR0FBRyxDQUFDLGFBQUssQ0FBQyxHQUFHLEVBQUU7SUFDeEIsUUFBUSxFQUFFLEVBQUU7SUFDWixJQUFJLEVBQUUsS0FBSztJQUNYLEtBQUssRUFBRSxhQUFLLENBQUMsR0FBRztJQUNoQixXQUFXLEVBQUUsS0FBSyxFQUFFLEdBQUcsSUFBSSxFQUFFLEVBQUUsQ0FBQyxJQUFBLGdCQUFVLEVBQUMsR0FBRyxJQUFJLENBQUM7Q0FDcEQsQ0FBQyxDQUFDO0FBRUgsU0FBZ0IsbUJBQW1CLENBQ2pDLFdBQWlDO0lBRWpDLE1BQU0sT0FBTyxHQUEwQixJQUFJLEdBQUcsRUFBRSxDQUFDO0lBRWpELE1BQU0sSUFBSSxHQUFHLGdCQUFnQixDQUFDLFdBQVcsQ0FBQyxDQUFDO0lBRTNDLE1BQU0sS0FBSyxHQUFHLEtBQUssRUFBd0IsS0FBUSxFQUFFLEVBQUU7UUFDckQsSUFBSSxNQUFNLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNoQyxJQUFJLE1BQU0sS0FBSyxTQUFTLEVBQUUsQ0FBQztZQUN6QixNQUFNLEdBQUcsTUFBTSxrQkFBVSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUUsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUUsQ0FBQyxDQUFDO1lBQ3BFLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBQzdCLENBQUM7UUFDRCxPQUFPLE1BQU8sQ0FBQztJQUNqQixDQUFDLENBQUM7SUFFRixPQUFPO1FBQ0wsS0FBSztRQUNMLFdBQVcsRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFDLE1BQU0sRUFBRyxHQUFHLEVBQUUsR0FBRyxFQUFFLEVBQUUsRUFBRSxFQUFFO1lBQ2pELE1BQU0sRUFBRSxHQUFHLE1BQU0sS0FBSyxDQUFDLFdBQVcsQ0FBQyxNQUFNLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxFQUFFLENBQUMsQ0FBQTtZQUN4RCxPQUFPLEVBQUUsQ0FBQTtRQUNYLENBQUM7UUFDRCxlQUFlLEVBQUUsS0FBSyxFQUNwQixLQUFLLEVBQ0wsTUFBTSxFQUNOLE1BQU0sRUFDTixPQUFPLEVBQ1AsV0FBVyxFQUNYLFdBQVcsRUFDWCxPQUFPLEVBQ1AsRUFBRTtZQUNGLE1BQU0sRUFBRSxHQUFHLE1BQU0sS0FBSyxDQUFDLE9BQXFCLENBQUMsQ0FBQztZQUM5QyxJQUFJLENBQUMsRUFBRSxFQUFFLENBQUM7Z0JBQ1IsTUFBTSxJQUFJLEtBQUssQ0FBQyxxQ0FBcUMsT0FBTyxFQUFFLENBQUMsQ0FBQztZQUNsRSxDQUFDO1lBQ0QsTUFBTSxPQUFPLEdBQUcsTUFBTSxFQUFFLENBQUMsZUFBZSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1lBQ3RELElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztnQkFDYixNQUFNLElBQUksS0FBSyxDQUNiLGtEQUFrRCxPQUFPLEVBQUUsQ0FDNUQsQ0FBQztZQUNKLENBQUM7WUFDRCxPQUFPLE1BQU0sS0FBSyxDQUFDLGVBQWUsQ0FDaEMsTUFBTSxFQUNOLE1BQU0sRUFDTixPQUFPLEVBQ1AsV0FBVyxFQUNYLFdBQVcsRUFDWCxPQUFPLENBQ1IsQ0FBQztRQUNKLENBQUM7S0FDRixDQUFDO0FBQ0osQ0FBQztBQW5ERCxrREFtREMifQ==