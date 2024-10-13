"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChainFactoryBuilder = void 0;
const web3_1 = require("@emmet-contracts/web3");
const types_1 = require("./types");
const explorer_utils_1 = require("../explorer-utils");
const ethers_1 = require("ethers");
const ChainInfo_1 = require("../chains/ChainInfo");
const BridgeExplorer_1 = require("@emmet-contracts/web3/dist/factories/contracts/BridgeExplorer");
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
async function ChainFactoryBuilder(chainParams) {
    const helpers = new Map();
    const multisigProviders = chainParams.multisigParams.rpcs.map((e) => new ethers_1.JsonRpcProvider(e));
    const getMultisigProvider = () => {
        const randomRpcIndex = Math.floor(Math.random() * chainParams.multisigParams.rpcs.length);
        return multisigProviders[randomRpcIndex];
    };
    const cToP = mapNonceToParams(chainParams);
    // =============  C O N T R A C T S  =============
    // AddressBook
    const ab = web3_1.EmmetAddressBook__factory.connect(chainParams.multisigParams.ab, getMultisigProvider());
    // Consensus
    const consensusAddress = await ab.get("Consensus");
    const consensus = web3_1.Consensus__factory.connect(consensusAddress, getMultisigProvider());
    // EmmetData
    // const dataAddress: string = await ab.get("EmmetData");
    // const emmetData: EmmetData = EmmetData__factory.connect(
    //   dataAddress,
    //   getMultisigProvider()
    // );
    // Explorer
    const explorerAddress = await ab.get("Explorer");
    const explorer = BridgeExplorer_1.Explorer__factory.connect(explorerAddress, getMultisigProvider());
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
            const tx = await consensus.getStats();
            return {
                totalTransactions: tx.txCount,
                // TODO: implement in the contract
                totalFees: 0n, //tx.totalFees,
                totalVolume: 0n, // tx.totalVolume,
                uniqueUser: 0n, // tx.uniqueUsers,
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
            const provider = getMultisigProvider();
            const network = await provider.getNetwork();
            const tp = Number(await explorer.getTokenPrice(chain.nativeCoin()));
            const td = Number(await explorer.getPriceDecimals(chain.nativeCoin()));
            const pf = Number(await explorer.protocolFee(network.chainId));
            const cd = await chain.decimals();
            return Number(((pf * tp) / 10 ** (cd + td)).toFixed(2));
        },
    };
}
exports.ChainFactoryBuilder = ChainFactoryBuilder;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmFjdG9yeS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9mYWN0b3J5L2ZhY3RvcnkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsZ0RBTStCO0FBQy9CLG1DQUFtRDtBQVFuRCxzREFBMkU7QUFDM0UsbUNBQXlDO0FBQ3pDLG1EQUFpRDtBQUVqRCxrR0FBa0c7QUFFbEcsU0FBUyxnQkFBZ0IsQ0FBQyxXQUFpQztJQUN6RCxNQUFNLElBQUksR0FBYSxJQUFJLEdBQUcsRUFBRSxDQUFDO0lBQ2pDLElBQUksQ0FBQyxHQUFHLENBQUMsYUFBSyxDQUFDLEdBQUcsRUFBRSxXQUFXLENBQUMsU0FBUyxDQUFDLENBQUM7SUFDM0MsSUFBSSxDQUFDLEdBQUcsQ0FBQyxhQUFLLENBQUMsT0FBTyxFQUFFLFdBQVcsQ0FBQyxhQUFhLENBQUMsQ0FBQztJQUNuRCxJQUFJLENBQUMsR0FBRyxDQUFDLGFBQUssQ0FBQyxHQUFHLEVBQUUsV0FBVyxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBQzNDLElBQUksQ0FBQyxHQUFHLENBQUMsYUFBSyxDQUFDLFFBQVEsRUFBRSxXQUFXLENBQUMsU0FBUyxDQUFDLENBQUM7SUFDaEQsSUFBSSxDQUFDLEdBQUcsQ0FBQyxhQUFLLENBQUMsU0FBUyxFQUFFLFdBQVcsQ0FBQyxlQUFlLENBQUMsQ0FBQztJQUN2RCxJQUFJLENBQUMsR0FBRyxDQUFDLGFBQUssQ0FBQyxTQUFTLEVBQUUsV0FBVyxDQUFDLGVBQWUsQ0FBQyxDQUFDO0lBQ3ZELE9BQU8sSUFBSSxDQUFDO0FBQ2QsQ0FBQztBQUVNLEtBQUssVUFBVSxtQkFBbUIsQ0FDdkMsV0FBaUM7SUFHakMsTUFBTSxPQUFPLEdBQTBCLElBQUksR0FBRyxFQUFFLENBQUM7SUFFakQsTUFBTSxpQkFBaUIsR0FBRyxXQUFXLENBQUMsY0FBZSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQzVELENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxJQUFJLHdCQUFlLENB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