"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChainFactoryBuilder = exports.CHAIN_INFO = void 0;
const web3_1 = require("@emmet-contracts/web3");
const ton_1 = require("../chains/ton");
const web3_2 = require("../chains/web3");
const types_1 = require("./types");
const explorer_utils_1 = require("../explorer-utils");
function mapNonceToParams(chainParams) {
    const cToP = new Map();
    cToP.set(types_1.Chain.TON, chainParams.tonParams);
    cToP.set(types_1.Chain.POLYGON, chainParams.polygonParams);
    cToP.set(types_1.Chain.BSC, chainParams.bscParams);
    cToP.set(types_1.Chain.ETHEREUM, chainParams.ethParams);
    return cToP;
}
exports.CHAIN_INFO = new Map();
exports.CHAIN_INFO.set(types_1.Chain.POLYGON, {
    constructor: web3_2.web3Helper,
    decimals: 18,
    name: 'Polygon',
    nonce: types_1.Chain.POLYGON,
});
exports.CHAIN_INFO.set(types_1.Chain.BSC, {
    constructor: web3_2.web3Helper,
    decimals: 18,
    name: 'BSC',
    nonce: types_1.Chain.BSC,
});
exports.CHAIN_INFO.set(types_1.Chain.ETHEREUM, {
    constructor: web3_2.web3Helper,
    decimals: 18,
    name: 'Ethereum',
    nonce: types_1.Chain.ETHEREUM,
});
exports.CHAIN_INFO.set(types_1.Chain.TON, {
    decimals: 18,
    name: 'Ton',
    nonce: types_1.Chain.TON,
    constructor: async (...args) => (0, ton_1.tonHandler)(...args),
});
async function ChainFactoryBuilder(chainParams) {
    const helpers = new Map();
    const cToP = mapNonceToParams(chainParams);
    const ab = web3_1.EmmetAddressBook__factory.connect(chainParams.multisigParams.ab, chainParams.multisigParams?.provider);
    const msig = await ab.get('EmmetMultisig');
    const mData = await ab.get('EmmetData');
    const multisig = web3_1.EmmetMultisig__factory.connect(msig, chainParams.multisigParams?.provider);
    const emmetData = web3_1.EmmetData__factory.connect(mData, chainParams.multisigParams?.provider);
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
        preTransfer: async (chain, signer, tid, spender, amt, ga) => {
            const pt = await chain.preTransfer(signer, tid, spender, amt, ga);
            return pt;
        },
        getTxCount() {
            return multisig.nonce();
        },
        async getTransactions(batch, offset) {
            const txs = await multisig.getTransactions(batch, offset);
            return txs.map((e) => {
                return {
                    nonce: e.nonce,
                    sentAmount: e.sentAmount,
                    receivedAmount: e.receivedAmount,
                    fromChainId: e.fromChainId,
                    toChainId: e.toChainId,
                    fromToken: e.fromToken,
                    toToken: e.toToken,
                    recipient: e.recipient,
                    originalHash: e.originalHash,
                    destinationHash: e.destinationHash,
                    started: e.started,
                    finished: e.finished,
                    txHash: e.txHash,
                };
            });
        },
        async getTransaction(hash) {
            const tx = await multisig.getTransaction(hash);
            const fcNonce = explorer_utils_1.ChainIDToDomain[Number(tx.fromChainId)];
            const tcNonce = explorer_utils_1.ChainIDToDomain[Number(tx.toChainId)];
            const fcHandler = await inner(fcNonce);
            const fcInfo = await fcHandler.txInfo(tx.originalHash);
            const tcHandler = await inner(tcNonce);
            const tcInfo = await tcHandler.txInfo(tx.destinationHash);
            return {
                fromChainFees: fcInfo.value,
                fromChainTimestamp: fcInfo.timestamp,
                targetChainFees: tcInfo.value,
                targetChainTimestamp: tcInfo.timestamp,
                protocolFee: await fcHandler.protocolFee(),
                nonce: tx.nonce,
                sentAmount: tx.sentAmount,
                receivedAmount: tx.receivedAmount,
                fromChainId: tx.fromChainId,
                toChainId: tx.toChainId,
                fromToken: tx.fromToken,
                toToken: tx.toToken,
                recipient: tx.recipient,
                originalHash: tx.originalHash,
                destinationHash: tx.destinationHash,
                started: tx.started,
                finished: tx.finished,
                txHash: tx.txHash,
            };
        },
        async getExplorerStats() {
            const tx = await multisig.getStats();
            return {
                totalTransactions: tx.totalTransactions,
                totalFees: tx.totalFees,
                totalVolume: tx.totalVolume,
                uniqueUser: tx.uniqueUsers,
            };
        },
        // async stakeTokenForPool(chain, signer, tokenSymbol, amount) {},
        // async withdrawTokenForPool(chain, signer, tokenSymbol, amount) {},
        sendInstallment: async (chain, signer, amount, chainId, fromSymbol, tokenSymbol, destAddress, gasArgs) => {
            const dc = await inner(chainId);
            const targetChainId = await dc.id();
            if (!dc) {
                throw new Error(`Unsupported destination chain id: ${chainId}`);
            }
            const isValid = await dc.validateAddress(destAddress);
            if (!isValid) {
                throw new Error(`Invalid destination user address for chain id: ${chainId}`);
            }
            const fee = await chain.txFee(targetChainId, fromSymbol, tokenSymbol);
            return await chain.sendInstallment(signer, amount, targetChainId, fromSymbol, tokenSymbol, destAddress, fee, gasArgs);
        },
        getTokenPrice(symbol) {
            return emmetData.getTokenPrice(symbol);
        },
        getPriceDecimals(symbol) {
            return emmetData.getPriceDecimals(symbol);
        },
    };
}
exports.ChainFactoryBuilder = ChainFactoryBuilder;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmFjdG9yeS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9mYWN0b3J5L2ZhY3RvcnkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsZ0RBSStCO0FBQy9CLHVDQUEyQztBQUMzQyx5Q0FBNEM7QUFDNUMsbUNBQW1EO0FBU25ELHNEQUEyRTtBQUUzRSxTQUFTLGdCQUFnQixDQUFDLFdBQWlDO0lBQ3pELE1BQU0sSUFBSSxHQUFhLElBQUksR0FBRyxFQUFFLENBQUM7SUFDakMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxhQUFLLENBQUMsR0FBRyxFQUFFLFdBQVcsQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUMzQyxJQUFJLENBQUMsR0FBRyxDQUFDLGFBQUssQ0FBQyxPQUFPLEVBQUUsV0FBVyxDQUFDLGFBQWEsQ0FBQyxDQUFDO0lBQ25ELElBQUksQ0FBQyxHQUFHLENBQUMsYUFBSyxDQUFDLEdBQUcsRUFBRSxXQUFXLENBQUMsU0FBUyxDQUFDLENBQUM7SUFDM0MsSUFBSSxDQUFDLEdBQUcsQ0FBQyxhQUFLLENBQUMsUUFBUSxFQUFFLFdBQVcsQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUNoRCxPQUFPLElBQUksQ0FBQztBQUNkLENBQUM7QUFFWSxRQUFBLFVBQVUsR0FBYyxJQUFJLEdBQUcsRUFBRSxDQUFDO0FBRS9DLGtCQUFVLENBQUMsR0FBRyxDQUFDLGFBQUssQ0FBQyxPQUFPLEVBQUU7SUFDNUIsV0FBVyxFQUFFLGlCQUFVO0lBQ3ZCLFFBQVEsRUFBRSxFQUFFO0lBQ1osSUFBSSxFQUFFLFNBQVM7SUFDZixLQUFLLEVBQUUsYUFBSyxDQUFDLE9BQU87Q0FDckIsQ0FBQyxDQUFDO0FBRUgsa0JBQVUsQ0FBQyxHQUFHLENBQUMsYUFBSyxDQUFDLEdBQUcsRUFBRTtJQUN4QixXQUFXLEVBQUUsaUJBQVU7SUFDdkIsUUFBUSxFQUFFLEVBQUU7SUFDWixJQUFJLEVBQUUsS0FBSztJQUNYLEtBQUssRUFBRSxhQUFLLENBQUMsR0FBRztDQUNqQixDQUFDLENBQUM7QUFFSCxrQkFBVSxDQUFDLEdBQUcsQ0FBQyxhQUFLLENBQUMsUUFBUSxFQUFFO0lBQzdCLFdBQVcsRUFBRSxpQkFBVTtJQUN2QixRQUFRLEVBQUUsRUFBRTtJQUNaLElBQUksRUFBRSxVQUFVO0lBQ2hCLEtBQUssRUFBRSxhQUFLLENBQUMsUUFBUTtDQUN0QixDQUFDLENBQUM7QUFFSCxrQkFBVSxDQUFDLEdBQUcsQ0FBQyxhQUFLLENBQUMsR0FBRyxFQUFFO0lBQ3hCLFFBQVEsRUFBRSxFQUFFO0lBQ1osSUFBSSxFQUFFLEtBQUs7SUFDWCxLQUFLLEVBQUUsYUFBSyxDQUFDLEdBQUc7SUFDaEIsV0FBVyxFQUFFLEtBQUssRUFBRSxHQUFHLElBQUksRUFBRSxFQUFFLENBQUMsSUFBQSxnQkFBVSxFQUFDLEdBQUcsSUFBSSxDQUFDO0NBQ3BELENBQUMsQ0FBQztBQUVJLEtBQUssVUFBVSxtQkFBbUIsQ0FDdkMsV0FBaUM7SUFFakMsTUFBTSxPQUFPLEdBQTBCLElBQUksR0FBRyxFQUFFLENBQUM7SUFFakQsTUFBTSxJQUFJLEdBQUcsZ0JBQWdCLENBQUMsV0FBVyxDQUFDLENBQUM7SUFDM0MsTUFBTSxFQUFFLEdBQUcsZ0NBQXlCLENBQUMsT0FBTyxDQUMxQyxXQUFXLENBQUMsY0FBZSxDQUFDLEVBQUUsRUFDOUIsV0FBVyxDQUFDLGNBQWMsRUFBRSxRQUFRLENBQ3JDLENBQUM7SUFDRixNQUFNLElBQUksR0FBRyxNQUFNLEVBQUUsQ0FBQyxHQUFHLENBQUMsZUFBZSxDQUFDLENBQUM7SUFDM0MsTUFBTSxLQUFLLEdBQUcsTUFBTSxFQUFFLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxDQUFDO0lBQ3hDLE1BQU0sUUFBUSxHQUFHLDZCQUFzQixDQUFDLE9BQU8sQ0FDN0MsSUFBSSxFQUNKLFdBQVcsQ0FBQyxjQUFjLEVBQUUsUUFBUSxDQUNyQyxDQUFDO0lBQ0YsTUFBTSxTQUFTLEdBQUcseUJBQWtCLENBQUMsT0FBTyxDQUMxQyxLQUFLLEVBQ0wsV0FBVyxDQUFDLGNBQWMsRUFBRSxRQUFRLENBQ3JDLENBQUM7SUFFRixNQUFNLEtBQUssR0FBRyxLQUFLLEVBQXdCLEtBQVEsRUFBRSxFQUFFO1FBQ3JELElBQUksTUFBTSxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDaEMsSUFBSSxNQUFNLEtBQUssU0FBUyxFQUFFLENBQUM7WUFDekIsTUFBTSxHQUFHLE1BQU0sa0JBQVUsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFFLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFFLENBQUMsQ0FBQztZQUNwRSxPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssRUFBRSxNQUFNLENBQUMsQ0FBQztRQUM3QixDQUFDO1FBQ0QsT0FBTyxNQUFPLENBQUM7SUFDakIsQ0FBQyxDQUFDO0lBRUYsT0FBTztRQUNMLEtBQUs7UUFDTCxXQUFXLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsR0FBRyxFQUFFLE9BQU8sRUFBRSxHQUFHLEVBQUUsRUFBRSxFQUFFLEVBQUU7WUFDMUQsTUFBTSxFQUFFLEdBQUcsTUFBTSxLQUFLLENBQUMsV0FBVyxDQUFDLE1BQU0sRUFBRSxHQUFHLEVBQUUsT0FBTyxFQUFFLEdBQUcsRUFBRSxFQUFFLENBQUMsQ0FBQztZQUNsRSxPQUFPLEVBQUUsQ0FBQztRQUNaLENBQUM7UUFDRCxVQUFVO1lBQ1IsT0FBTyxRQUFRLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDMUIsQ0FBQztRQUNELEtBQUssQ0FBQyxlQUFlLENBQUMsS0FBSyxFQUFFLE1BQU07WUFDakMsTUFBTSxHQUFHLEdBQUcsTUFBTSxRQUFRLENBQUMsZUFBZSxDQUFDLEtBQUssRUFBRSxNQUFNLENBQUMsQ0FBQztZQUMxRCxPQUFPLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRTtnQkFDbkIsT0FBTztvQkFDTCxLQUFLLEVBQUUsQ0FBQyxDQUFDLEtBQUs7b0JBQ2QsVUFBVSxFQUFFLENBQUMsQ0FBQyxVQUFVO29CQUN4QixjQUFjLEVBQUUsQ0FBQyxDQUFDLGNBQWM7b0JBQ2hDLFdBQVcsRUFBRSxDQUFDLENBQUMsV0FBVztvQkFDMUIsU0FBUyxFQUFFLENBQUMsQ0FBQyxTQUFTO29CQUN0QixTQUFTLEVBQUUsQ0FBQyxDQUFDLFNBQVM7b0JBQ3RCLE9BQU8sRUFBRSxDQUFDLENBQUMsT0FBTztvQkFDbEIsU0FBUyxFQUFFLENBQUMsQ0FBQyxTQUFTO29CQUN0QixZQUFZLEVBQUUsQ0FBQyxDQUFDLFlBQVk7b0JBQzVCLGVBQWUsRUFBRSxDQUFDLENBQUMsZUFBZTtvQkFDbEMsT0FBTyxFQUFFLENBQUMsQ0FBQyxPQUFPO29CQUNsQixRQUFRLEVBQUUsQ0FBQyxDQUFDLFFBQVE7b0JBQ3BCLE1BQU0sRUFBRSxDQUFDLENBQUMsTUFBTTtpQkFDakIsQ0FBQztZQUNKLENBQUMsQ0FBQyxDQUFDO1FBQ0wsQ0FBQztRQUNELEtBQUssQ0FBQyxjQUFjLENBQUMsSUFBSTtZQUN2QixNQUFNLEVBQUUsR0FBRyxNQUFNLFFBQVEsQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDL0MsTUFBTSxPQUFPLEdBQ1gsZ0NBQWUsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLFdBQVcsQ0FBcUIsQ0FBQyxDQUFDO1lBQzlELE1BQU0sT0FBTyxHQUNYLGdDQUFlLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxTQUFTLENBQXFCLENBQUMsQ0FBQztZQUM1RCxNQUFNLFNBQVMsR0FBRyxNQUFNLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUN2QyxNQUFNLE1BQU0sR0FBRyxNQUFNLFNBQVMsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLFlBQVksQ0FBQyxDQUFDO1lBQ3ZELE1BQU0sU0FBUyxHQUFHLE1BQU0sS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQ3ZDLE1BQU0sTUFBTSxHQUFHLE1BQU0sU0FBUyxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsZUFBZSxDQUFDLENBQUM7WUFDMUQsT0FBTztnQkFDTCxhQUFhLEVBQUUsTUFBTSxDQUFDLEtBQUs7Z0JBQzNCLGtCQUFrQixFQUFFLE1BQU0sQ0FBQyxTQUFTO2dCQUNwQyxlQUFlLEVBQUUsTUFBTSxDQUFDLEtBQUs7Z0JBQzdCLG9CQUFvQixFQUFFLE1BQU0sQ0FBQyxTQUFTO2dCQUN0QyxXQUFXLEVBQUUsTUFBTSxTQUFTLENBQUMsV0FBVyxFQUFFO2dCQUMxQyxLQUFLLEVBQUUsRUFBRSxDQUFDLEtBQUs7Z0JBQ2YsVUFBVSxFQUFFLEVBQUUsQ0FBQyxVQUFVO2dCQUN6QixjQUFjLEVBQUUsRUFBRSxDQUFDLGNBQWM7Z0JBQ2pDLFdBQVcsRUFBRSxFQUFFLENBQUMsV0FBVztnQkFDM0IsU0FBUyxFQUFFLEVBQUUsQ0FBQyxTQUFTO2dCQUN2QixTQUFTLEVBQUUsRUFBRSxDQUFDLFNBQVM7Z0JBQ3ZCLE9BQU8sRUFBRSxFQUFFLENBQUMsT0FBTztnQkFDbkIsU0FBUyxFQUFFLEVBQUUsQ0FBQyxTQUFTO2dCQUN2QixZQUFZLEVBQUUsRUFBRSxDQUFDLFlBQVk7Z0JBQzdCLGVBQWUsRUFBRSxFQUFFLENBQUMsZUFBZTtnQkFDbkMsT0FBTyxFQUFFLEVBQUUsQ0FBQyxPQUFPO2dCQUNuQixRQUFRLEVBQUUsRUFBRSxDQUFDLFFBQVE7Z0JBQ3JCLE1BQU0sRUFBRSxFQUFFLENBQUMsTUFBTTthQUNsQixDQUFDO1FBQ0osQ0FBQztRQUNELEtBQUssQ0FBQyxnQkFBZ0I7WUFDcEIsTUFBTSxFQUFFLEdBQUcsTUFBTSxRQUFRLENBQUMsUUFBUSxFQUFFLENBQUM7WUFDckMsT0FBTztnQkFDTCxpQkFBaUIsRUFBRSxFQUFFLENBQUMsaUJBQWlCO2dCQUN2QyxTQUFTLEVBQUUsRUFBRSxDQUFDLFNBQVM7Z0JBQ3ZCLFdBQVcsRUFBRSxFQUFFLENBQUMsV0FBVztnQkFDM0IsVUFBVSxFQUFFLEVBQUUsQ0FBQyxXQUFXO2FBQzNCLENBQUM7UUFDSixDQUFDO1FBQ0Qsa0VBQWtFO1FBQ2xFLHFFQUFxRTtRQUNyRSxlQUFlLEVBQUUsS0FBSyxFQUNwQixLQUFLLEVBQ0wsTUFBTSxFQUNOLE1BQU0sRUFDTixPQUFPLEVBQ1AsVUFBVSxFQUNWLFdBQVcsRUFDWCxXQUFXLEVBQ1gsT0FBTyxFQUNQLEVBQUU7WUFDRixNQUFNLEVBQUUsR0FBRyxNQUFNLEtBQUssQ0FBQyxPQUFxQixDQUFDLENBQUM7WUFDOUMsTUFBTSxhQUFhLEdBQUcsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUM7WUFDcEMsSUFBSSxDQUFDLEVBQUUsRUFBRSxDQUFDO2dCQUNSLE1BQU0sSUFBSSxLQUFLLENBQUMscUNBQXFDLE9BQU8sRUFBRSxDQUFDLENBQUM7WUFDbEUsQ0FBQztZQUNELE1BQU0sT0FBTyxHQUFHLE1BQU0sRUFBRSxDQUFDLGVBQWUsQ0FBQyxXQUFXLENBQUMsQ0FBQztZQUN0RCxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7Z0JBQ2IsTUFBTSxJQUFJLEtBQUssQ0FDYixrREFBa0QsT0FBTyxFQUFFLENBQzVELENBQUM7WUFDSixDQUFDO1lBQ0QsTUFBTSxHQUFHLEdBQUcsTUFBTSxLQUFLLENBQUMsS0FBSyxDQUFDLGFBQWEsRUFBRSxVQUFVLEVBQUUsV0FBVyxDQUFDLENBQUM7WUFDdEUsT0FBTyxNQUFNLEtBQUssQ0FBQyxlQUFlLENBQ2hDLE1BQU0sRUFDTixNQUFNLEVBQ04sYUFBYSxFQUNiLFVBQVUsRUFDVixXQUFXLEVBQ1gsV0FBVyxFQUNYLEdBQUcsRUFDSCxPQUFPLENBQ1IsQ0FBQztRQUNKLENBQUM7UUFDRCxhQUFhLENBQUMsTUFBTTtZQUNsQixPQUFPLFNBQVMsQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDekMsQ0FBQztRQUNELGdCQUFnQixDQUFDLE1BQU07WUFDckIsT0FBTyxTQUFTLENBQUMsZ0JBQWdCLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDNUMsQ0FBQztLQUNGLENBQUM7QUFDSixDQUFDO0FBN0lELGtEQTZJQyJ9