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
    cToP.set(types_1.Chain.ONLYLAYER, chainParams.onlylayerParams);
    cToP.set(types_1.Chain.BERACHAIN, chainParams.berachainParams);
    return cToP;
}
exports.CHAIN_INFO = new Map();
exports.CHAIN_INFO.set(types_1.Chain.POLYGON, {
    constructor: web3_2.web3Helper,
    decimals: 18,
    name: "Polygon",
    nonce: types_1.Chain.POLYGON,
});
exports.CHAIN_INFO.set(types_1.Chain.BSC, {
    constructor: web3_2.web3Helper,
    decimals: 18,
    name: "BSC",
    nonce: types_1.Chain.BSC,
});
exports.CHAIN_INFO.set(types_1.Chain.ETHEREUM, {
    constructor: web3_2.web3Helper,
    decimals: 18,
    name: "Ethereum",
    nonce: types_1.Chain.ETHEREUM,
});
exports.CHAIN_INFO.set(types_1.Chain.ONLYLAYER, {
    constructor: web3_2.web3Helper,
    decimals: 18,
    name: "Only Layer",
    nonce: types_1.Chain.ONLYLAYER,
});
exports.CHAIN_INFO.set(types_1.Chain.BERACHAIN, {
    constructor: web3_2.web3Helper,
    decimals: 18,
    name: "Berachain",
    nonce: types_1.Chain.BERACHAIN,
});
exports.CHAIN_INFO.set(types_1.Chain.TON, {
    decimals: 18,
    name: "Ton",
    nonce: types_1.Chain.TON,
    constructor: async (...args) => (0, ton_1.tonHandler)(...args),
});
async function ChainFactoryBuilder(chainParams) {
    const helpers = new Map();
    const cToP = mapNonceToParams(chainParams);
    const ab = web3_1.EmmetAddressBook__factory.connect(chainParams.multisigParams.ab, chainParams.multisigParams?.provider);
    const msig = await ab.get("EmmetMultisig");
    const mData = await ab.get("EmmetData");
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
        async getProtocolFeeInUSD(chain) {
            const tp = Number(await emmetData.getTokenPrice(chain.nativeCoin()));
            const td = Number(await emmetData.getPriceDecimals(chain.nativeCoin()));
            const pf = Number(await chain.protocolFee());
            const cd = chain.decimals();
            return Number(((pf * tp) / 10 ** (cd + td)).toFixed(2));
        },
    };
}
exports.ChainFactoryBuilder = ChainFactoryBuilder;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmFjdG9yeS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9mYWN0b3J5L2ZhY3RvcnkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsZ0RBSStCO0FBQy9CLHVDQUEyQztBQUMzQyx5Q0FBNEM7QUFDNUMsbUNBQW1EO0FBU25ELHNEQUEyRTtBQUUzRSxTQUFTLGdCQUFnQixDQUFDLFdBQWlDO0lBQ3pELE1BQU0sSUFBSSxHQUFhLElBQUksR0FBRyxFQUFFLENBQUM7SUFDakMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxhQUFLLENBQUMsR0FBRyxFQUFFLFdBQVcsQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUMzQyxJQUFJLENBQUMsR0FBRyxDQUFDLGFBQUssQ0FBQyxPQUFPLEVBQUUsV0FBVyxDQUFDLGFBQWEsQ0FBQyxDQUFDO0lBQ25ELElBQUksQ0FBQyxHQUFHLENBQUMsYUFBSyxDQUFDLEdBQUcsRUFBRSxXQUFXLENBQUMsU0FBUyxDQUFDLENBQUM7SUFDM0MsSUFBSSxDQUFDLEdBQUcsQ0FBQyxhQUFLLENBQUMsUUFBUSxFQUFFLFdBQVcsQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUNoRCxJQUFJLENBQUMsR0FBRyxDQUFDLGFBQUssQ0FBQyxTQUFTLEVBQUUsV0FBVyxDQUFDLGVBQWUsQ0FBQyxDQUFDO0lBQ3ZELElBQUksQ0FBQyxHQUFHLENBQUMsYUFBSyxDQUFDLFNBQVMsRUFBRSxXQUFXLENBQUMsZUFBZSxDQUFDLENBQUM7SUFDdkQsT0FBTyxJQUFJLENBQUM7QUFDZCxDQUFDO0FBRVksUUFBQSxVQUFVLEdBQWMsSUFBSSxHQUFHLEVBQUUsQ0FBQztBQUUvQyxrQkFBVSxDQUFDLEdBQUcsQ0FBQyxhQUFLLENBQUMsT0FBTyxFQUFFO0lBQzVCLFdBQVcsRUFBRSxpQkFBVTtJQUN2QixRQUFRLEVBQUUsRUFBRTtJQUNaLElBQUksRUFBRSxTQUFTO0lBQ2YsS0FBSyxFQUFFLGFBQUssQ0FBQyxPQUFPO0NBQ3JCLENBQUMs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