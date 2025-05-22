"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChainFactoryBuilder = ChainFactoryBuilder;
const web3_1 = require("@emmet-contracts/web3");
const types_1 = require("./types");
const explorer_utils_1 = require("../explorer-utils");
const ethers_1 = require("ethers");
const ChainInfo_1 = require("../chains/ChainInfo");
const BridgeExplorer_1 = require("@emmet-contracts/web3/dist/factories/contracts/BridgeExplorer");
const config_1 = require("./config");
function mapNonceToParams(chainParams) {
    const cToP = new Map();
    cToP.set(types_1.Chain.ARBITRUM, chainParams.arbParams);
    cToP.set(types_1.Chain.AVALANCHE, chainParams.avaxParams);
    cToP.set(types_1.Chain.BERACHAIN, chainParams.berachainParams);
    cToP.set(types_1.Chain.BSC, chainParams.bscParams);
    cToP.set(types_1.Chain.ETHEREUM, chainParams.ethParams);
    cToP.set(types_1.Chain.MANTA, chainParams.mantaParams);
    cToP.set(types_1.Chain.ONLYLAYER, chainParams.onlylayerParams);
    cToP.set(types_1.Chain.OPTIMISM, chainParams.opParams);
    cToP.set(types_1.Chain.POLYGON, chainParams.polygonParams);
    cToP.set(types_1.Chain.SONGBIRD, chainParams.songbirdParams);
    cToP.set(types_1.Chain.TON, chainParams.tonParams);
    cToP.set(types_1.Chain.TONTESTNET, chainParams.tonParams);
    return cToP;
}
async function ChainFactoryBuilder(chainParams) {
    const helpers = new Map();
    const consensusProviders = chainParams
        && chainParams.multisigParams
        && chainParams.multisigParams.rpcs
        && chainParams.multisigParams.rpcs.map((e) => new ethers_1.JsonRpcProvider(e));
    const getConsensusProvider = () => {
        const randomRpcIndex = Math.floor(Math.random() * chainParams.multisigParams.rpcs.length);
        if (consensusProviders) {
            return consensusProviders[randomRpcIndex];
        }
        console.warn(`${config_1.libName} v${config_1.version} in 'getConsensusProvider' Warning: Providers not found`);
        return undefined;
    };
    const cToP = mapNonceToParams(chainParams);
    // =============  C O N T R A C T S  =============
    // AddressBook
    const ab = web3_1.EmmetAddressBook__factory.connect(chainParams.multisigParams.ab, getConsensusProvider());
    // Explorer
    const explorerAddress = await ab.get("Explorer");
    const explorer = BridgeExplorer_1.Explorer__factory.connect(explorerAddress, getConsensusProvider());
    const inner = async (chainNonce) => {
        let helper = helpers.get(chainNonce);
        if (helper === undefined) {
            helper = await ChainInfo_1.CHAIN_INFO.get(chainNonce).constructor(cToP.get(chainNonce));
            helpers.set(chainNonce, helper);
        }
        return helper;
    };
    return {
        inner,
        async stakeLiqiduity(chain, signer, token, amount, ga) {
            const lp = await chain.address(`elp${token}`);
            const response = chain.stakeLiquidity(signer, lp, amount, ga);
            return response;
        },
        async getDestinationTokens(fc, tc, fromToken, targetToken, sourceAmount, slippage) {
            let amount = sourceAmount;
            const ccs = await fc.crossChainStrategy(await tc.id(), fromToken, targetToken);
            for (let i = 0; i < ccs.foreign.length; i++) {
                const cc = ccs.foreign[i];
                if (cc === "Mint") {
                    return sourceAmount;
                }
                if (cc === "LPRelease") {
                    const pool = await tc.address(`elp${fromToken}`);
                    const lp = await tc.getLpTokenFee(pool);
                    // Reduce the source amount by lp token fee
                    amount -= lp;
                }
                if (cc === "Swap1"
                    || cc === "Swap2"
                    || cc === "Swap3"
                    || cc === "Swap4"
                    || cc === "Swap5"
                    || cc === "Swap6") {
                    const pool = await tc.getSwapResultAmount(fromToken, targetToken, amount, slippage);
                    amount = pool;
                }
            }
            return amount;
        },
        async withdrawLiqiduity(chain, signer, token, amount, ga) {
            const lp = await chain.address(`elp${token}`);
            const response = chain.withdrawLiquidity(signer, lp, amount, ga);
            return response;
        },
        async withdrawFees(chain, signer, token, ga) {
            const lp = await chain.address(`elp${token}`);
            const response = chain.withdrawFees(signer, lp, ga);
            return response;
        },
        preTransfer: async (chain, signer, tid, spender, amt, ga) => {
            const pt = await chain.preTransfer(signer, tid, spender, amt, ga);
            return pt;
        },
        getStats: async () => {
            return await explorer.getStats();
        },
        async getTransactions(batch, offset) {
            const txs = await explorer.getTransactions(batch, offset);
            return txs.map((e) => {
                return {
                    sentAmount: e.sentAmount,
                    receivedAmount: e.receiveAmount,
                    fromChainId: e.fromChainId,
                    toChainId: e.toChainId,
                    fromToken: e.fromToken,
                    toToken: e.toToken,
                    recipient: e.recipient,
                    originalHash: e.originalHash,
                    destinationHash: e.destinationHash,
                    started: e.start,
                    finished: e.finish,
                    txHash: e.txHash,
                };
            });
        },
        async getTransaction(hash) {
            const tx = await explorer.getTransaction(hash);
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
                sentAmount: tx.sentAmount,
                receivedAmount: tx.receiveAmount,
                fromChainId: tx.fromChainId,
                toChainId: tx.toChainId,
                fromToken: tx.fromToken,
                toToken: tx.toToken,
                recipient: tx.recipient,
                originalHash: tx.originalHash,
                destinationHash: tx.destinationHash,
                started: tx.start,
                finished: tx.finish,
                txHash: tx.txHash,
            };
        },
        async getExplorerStats() {
            const tx = await explorer.getStats();
            return {
                totalTransactions: tx.totalTransactions,
                totalFees: tx.collectedFees,
                totalVolume: tx.bridgedInUSD,
                uniqueUser: tx.uniqueAccounts,
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
            return explorer.getTokenPrice(symbol);
        },
        getPriceDecimals(symbol) {
            return explorer.getPriceDecimals(symbol);
        },
        async getProtocolFeeInUSD(chain) {
            const provider = getConsensusProvider();
            const network = provider && await provider.getNetwork();
            if (network) {
                const tp = Number(await explorer.getTokenPrice(chain.nativeCoin()));
                const td = Number(await explorer.getPriceDecimals(chain.nativeCoin()));
                const pf = Number(await explorer.protocolFee(network.chainId));
                const cd = await chain.decimals();
                return Number(((pf * tp) / 10 ** (cd + td)).toFixed(2));
            }
            console.warn(`${config_1.libName} v${config_1.version} in 'getProtocolFeeInUSD' Warning: 'network' not found.`);
            return 0;
        },
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmFjdG9yeS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9mYWN0b3J5L2ZhY3RvcnkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFtQ0Esa0RBMk9DO0FBOVFELGdEQUUrQjtBQUMvQixtQ0FBbUQ7QUFRbkQsc0RBQTJFO0FBQzNFLG1DQUF5QztBQUN6QyxtREFBaUQ7QUFFakQsa0dBQWtHO0FBQ2xHLHFDQUE0QztBQUU1QyxTQUFTLGdCQUFnQixDQUFDLFdBQWlDO0lBQ3pELE1BQU0sSUFBSSxHQUFhLElBQUksR0FBRyxFQUFFLENBQUM7SUFDakMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxhQUFLLENBQUMsUUFBUSxFQUFFLFdBQVcsQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUNoRCxJQUFJLENBQUMsR0FBRyxDQUFDLGFBQUssQ0FBQyxTQUFTLEVBQUUsV0FBVyxDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBQ2xELElBQUksQ0FBQyxHQUFHLENBQUMsYUFBSyxDQUFDLFNBQVMsRUFBRSxXQUFXLENBQUMsZUFBZSxDQUFDLENBQUM7SUFDdkQsSUFBSSxDQUFDLEdBQUcsQ0FBQyxhQUFLLENBQUMsR0FBRyxFQUFFLFdBQVcsQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUMzQyxJQUFJLENBQUMsR0FBRyxDQUFDLGFBQUssQ0FBQyxRQUFRLEVBQUUsV0FBVyxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBQ2hELElBQUksQ0FBQyxHQUFHLENBQUMsYUFBSyxDQUFDLEtBQUssRUFBRSxXQUFXLENBQUMsV0FBVyxDQUFDLENBQUM7SUFDL0MsSUFBSSxDQUFDLEdBQUcsQ0FBQyxhQUFLLENBQUMsU0FBUyxFQUFFLFdBQVcsQ0FBQyxlQUFlLENBQUMsQ0FBQztJQUN2RCxJQUFJLENBQUMsR0FBRyxDQUFDLGFBQUssQ0FBQyxRQUFRLEVBQUUsV0FBVyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQy9DLElBQUksQ0FBQyxHQUFHLENBQUMsYUFBSyxDQUFDLE9BQU8s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