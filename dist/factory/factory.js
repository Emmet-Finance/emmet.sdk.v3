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
exports.CHAIN_INFO.set(types_1.Chain.TON, {
    decimals: 18,
    name: "Ton",
    nonce: types_1.Chain.TON,
    constructor: async (...args) => (0, ton_1.tonHandler)(...args),
});
function ChainFactoryBuilder(chainParams) {
    const helpers = new Map();
    const cToP = mapNonceToParams(chainParams);
    const multisig = web3_1.EmmetMultisig__factory.connect(chainParams.multisigParams.address, chainParams.multisigParams?.provider);
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
        getTxCount() {
            return multisig.nonce();
        },
        async getTransactions(batch, offset) {
            const txs = await multisig.getTransactions(batch, offset);
            return txs.map((e) => {
                return {
                    nonce: e.nonce,
                    amount: e.amount,
                    fromChainId: e.fromChainId,
                    toChainId: e.toChainId,
                    fromToken: e.fromToken,
                    toToken: e.toToken,
                    recipient: e.recipient,
                    originalHash: e.originalHash,
                    destinationHash: e.destinationHash,
                };
            });
        },
        async getTransaction(nonce) {
            const emmetTx = await multisig.hashes(nonce);
            const tx = await multisig.getTransaction(emmetTx);
            const fcNonce = explorer_utils_1.ChainIDToDomain[Number(tx.fromChainId)];
            const tcNonce = explorer_utils_1.ChainIDToDomain[Number(tx.fromChainId)];
            const fcHandler = await inner(fcNonce);
            const fcInfo = await fcHandler.txInfo(tx.originalHash);
            const tcHandler = await inner(tcNonce);
            const tcInfo = await tcHandler.txInfo(tx.destinationHash);
            return {
                ...tx,
                fromChainFees: fcInfo.value,
                fromChainTimestamp: fcInfo.timestamp,
                targetChainFees: tcInfo.value,
                targetChainTimestamp: tcInfo.timestamp,
                protocolFee: await fcHandler.protocolFee()
            };
        },
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
            return await chain.sendInstallment(signer, amount, targetChainId, fromSymbol, tokenSymbol, destAddress, gasArgs);
        },
    };
}
exports.ChainFactoryBuilder = ChainFactoryBuilder;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmFjdG9yeS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9mYWN0b3J5L2ZhY3RvcnkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsZ0RBQStEO0FBQy9ELHVDQUEyQztBQUMzQyx5Q0FBNEM7QUFDNUMsbUNBQW1EO0FBU25ELHNEQUEyRTtBQUUzRSxTQUFTLGdCQUFnQixDQUFDLFdBQWlDO0lBQ3pELE1BQU0sSUFBSSxHQUFhLElBQUksR0FBRyxFQUFFLENBQUM7SUFDakMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxhQUFLLENBQUMsR0FBRyxFQUFFLFdBQVcsQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUMzQyxJQUFJLENBQUMsR0FBRyxDQUFDLGFBQUssQ0FBQyxPQUFPLEVBQUUsV0FBVyxDQUFDLGFBQWEsQ0FBQyxDQUFDO0lBQ25ELElBQUksQ0FBQyxHQUFHLENBQUMsYUFBSyxDQUFDLEdBQUcsRUFBRSxXQUFXLENBQUMsU0FBUyxDQUFDLENBQUM7SUFDM0MsSUFBSSxDQUFDLEdBQUcsQ0FBQyxhQUFLLENBQUMsUUFBUSxFQUFFLFdBQVcsQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUNoRCxPQUFPLElBQUksQ0FBQztBQUNkLENBQUM7QUFFWSxRQUFBLFVBQVUsR0FBYyxJQUFJLEdBQUcsRUFBRSxDQUFDO0FBRS9DLGtCQUFVLENBQUMsR0FBRyxDQUFDLGFBQUssQ0FBQyxPQUFPLEVBQUU7SUFDNUIsV0FBVyxFQUFFLGlCQUFVO0lBQ3ZCLFFBQVEsRUFBRSxFQUFFO0lBQ1osSUFBSSxFQUFFLFNBQVM7SUFDZixLQUFLLEVBQUUsYUFBSyxDQUFDLE9BQU87Q0FDckIsQ0FBQyxDQUFDO0FBRUgsa0JBQVUsQ0FBQyxHQUFHLENBQUMsYUFBSyxDQUFDLEdBQUcsRUFBRTtJQUN4QixXQUFXLEVBQUUsaUJBQVU7SUFDdkIsUUFBUSxFQUFFLEVBQUU7SUFDWixJQUFJLEVBQUUsS0FBSztJQUNYLEtBQUssRUFBRSxhQUFLLENBQUMsR0FB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