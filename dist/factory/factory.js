"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChainFactoryBuilder = void 0;
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
    cToP.set(types_1.Chain.ONLYLAYER, chainParams.onlylayerParams);
    cToP.set(types_1.Chain.OPTIMISM, chainParams.opParams);
    cToP.set(types_1.Chain.POLYGON, chainParams.polygonParams);
    cToP.set(types_1.Chain.TON, chainParams.tonParams);
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
    const inner = async (chain) => {
        let helper = helpers.get(chain);
        if (helper === undefined) {
            helper = await ChainInfo_1.CHAIN_INFO.get(chain).constructor(cToP.get(chain));
            helpers.set(chain, helper);
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
exports.ChainFactoryBuilder = ChainFactoryBuilder;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmFjdG9yeS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9mYWN0b3J5L2ZhY3RvcnkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsZ0RBRStCO0FBQy9CLG1DQUFtRDtBQVFuRCxzREFBMkU7QUFDM0UsbUNBQXlDO0FBQ3pDLG1EQUFpRDtBQUVqRCxrR0FBa0c7QUFDbEcscUNBQTRDO0FBRTVDLFNBQVMsZ0JBQWdCLENBQUMsV0FBaUM7SUFDekQsTUFBTSxJQUFJLEdBQWEsSUFBSSxHQUFHLEVBQUUsQ0FBQztJQUNqQyxJQUFJLENBQUMsR0FBRyxDQUFDLGFBQUssQ0FBQyxRQUFRLEVBQUUsV0FBVyxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBQ2hELElBQUksQ0FBQyxHQUFHLENBQUMsYUFBSyxDQUFDLFNBQVMsRUFBRSxXQUFXLENBQUMsVUFBVSxDQUFDLENBQUM7SUFDbEQsSUFBSSxDQUFDLEdBQUcsQ0FBQyxhQUFLLENBQUMsU0FBUyxFQUFFLFdBQVcsQ0FBQyxlQUFlLENBQUMsQ0FBQztJQUN2RCxJQUFJLENBQUMsR0FBRyxDQUFDLGFBQUssQ0FBQyxHQUFHLEVBQUUsV0FBVyxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBQzNDLElBQUksQ0FBQyxHQUFHLENBQUMsYUFBSyxDQUFDLFFBQVEsRUFBRSxXQUFXLENBQUMsU0FBUyxDQUFDLENBQUM7SUFDaEQsSUFBSSxDQUFDLEdBQUcsQ0FBQyxhQUFLLENBQUMsU0FBUyxFQUFFLFdBQVcsQ0FBQyxlQUFlLENBQUMsQ0FBQztJQUN2RCxJQUFJLENBQUMsR0FBRyxDQUFDLGFBQUssQ0FBQyxRQUFRLEVBQUUsV0FBVyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQy9DLElBQUksQ0FBQyxHQUFHLENBQUMsYUFBSyxDQUFDLE9BQU8sRUFBRSxXQUFXLENBQUMsYUFBYSxDQUFDLENBQUM7SUFDbkQsSUFBSSxDQUFDLEdBQUcsQ0FBQyxhQUFLLENBQUMsR0FBRyxFQUFFLFdBQVcsQ0FB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