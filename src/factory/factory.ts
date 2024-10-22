import {
  EmmetAddressBook__factory,
} from "@emmet-contracts/web3";
import { Chain, type ChainFactory } from "./types";

import type {
  ChainNonce,
  ChainParams,
  HelperMap,
  ParamMap,
} from "./types";
import { ChainIDToDomain, type SupportedChainID } from "../explorer-utils";
import { JsonRpcProvider } from "ethers";
import { CHAIN_INFO } from "../chains/ChainInfo";
import { Explorer } from "@emmet-contracts/web3/dist/contracts/BridgeExplorer";
import { Explorer__factory } from "@emmet-contracts/web3/dist/factories/contracts/BridgeExplorer";
import { libName, version } from "./config";

function mapNonceToParams(chainParams: Partial<ChainParams>): ParamMap {
  const cToP: ParamMap = new Map();
  cToP.set(Chain.ARBITRUM, chainParams.arbParams);
  cToP.set(Chain.AVALANCHE, chainParams.avaxParams);
  cToP.set(Chain.BERACHAIN, chainParams.berachainParams);
  cToP.set(Chain.BSC, chainParams.bscParams);
  cToP.set(Chain.ETHEREUM, chainParams.ethParams);
  cToP.set(Chain.ONLYLAYER, chainParams.onlylayerParams);
  cToP.set(Chain.OPTIMISM, chainParams.opParams);
  cToP.set(Chain.POLYGON, chainParams.polygonParams);
  cToP.set(Chain.TON, chainParams.tonParams);
  cToP.set(Chain.TONTESTNET, chainParams.tonParams);
  return cToP;
}

export async function ChainFactoryBuilder(
  chainParams: Partial<ChainParams>,
): Promise<ChainFactory> {

  const helpers: HelperMap<ChainNonce> = new Map();

  const consensusProviders = chainParams
    && chainParams.multisigParams
    && chainParams.multisigParams!.rpcs
    && chainParams.multisigParams!.rpcs.map(
      (e) => new JsonRpcProvider(e),
    );

  const getConsensusProvider = (): JsonRpcProvider | undefined => {
    const randomRpcIndex = Math.floor(
      Math.random() * chainParams.multisigParams!.rpcs.length,
    );
    if (consensusProviders) {
      return consensusProviders![randomRpcIndex];
    }
    console.warn(
      `${libName} v${version} in 'getConsensusProvider' Warning: Providers not found`
    );

    return undefined;
  };

  const cToP = mapNonceToParams(chainParams);

  // =============  C O N T R A C T S  =============

  // AddressBook
  const ab = EmmetAddressBook__factory.connect(
    chainParams.multisigParams!.ab,
    getConsensusProvider(),
  );

  // Explorer
  const explorerAddress: string = await ab.get("Explorer");
  const explorer: Explorer = Explorer__factory.connect(
    explorerAddress,
    getConsensusProvider()
  );

  const inner = async <T extends ChainNonce>(chain: T) => {
    let helper = helpers.get(chain);
    if (helper === undefined) {
      helper = await CHAIN_INFO.get(chain)!.constructor(cToP.get(chain)!);
      helpers.set(chain, helper);
    }
    return helper!;
  };

  return {
    inner,
    async stakeLiqiduity(chain, signer, token, amount, ga) {
      const lp = await chain.address(`elp${token}`);
      const response = chain.stakeLiquidity(signer, lp, amount, ga);
      return response;
    },
    async getDestinationTokens(
      fc,
      tc,
      fromToken,
      targetToken,
      sourceAmount,
      slippage,
    ) {
      let amount = sourceAmount;
      const ccs = await fc.crossChainStrategy(
        await tc.id(),
        fromToken,
        targetToken,
      );
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
        if (
          cc === "Swap1"
          || cc === "Swap2"
          || cc === "Swap3"
          || cc === "Swap4"
          || cc === "Swap5"
          || cc === "Swap6"
        ) {
          const pool = await tc.getSwapResultAmount(
            fromToken,
            targetToken,
            amount,
            slippage,
          );
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
      const fcNonce: ChainNonce =
        ChainIDToDomain[Number(tx.fromChainId) as SupportedChainID];
      const tcNonce: ChainNonce =
        ChainIDToDomain[Number(tx.toChainId) as SupportedChainID];
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
    sendInstallment: async (
      chain,
      signer,
      amount,
      chainId,
      fromSymbol,
      tokenSymbol,
      destAddress,
      gasArgs,
    ) => {
      const dc = await inner(chainId as ChainNonce);
      const targetChainId = await dc.id();
      if (!dc) {
        throw new Error(`Unsupported destination chain id: ${chainId}`);
      }
      const isValid = await dc.validateAddress(destAddress);
      if (!isValid) {
        throw new Error(
          `Invalid destination user address for chain id: ${chainId}`,
        );
      }
      const fee = await chain.txFee(targetChainId, fromSymbol, tokenSymbol);
      
      return await chain.sendInstallment(
        signer,
        amount,
        targetChainId,
        fromSymbol,
        tokenSymbol,
        destAddress,
        fee,
        gasArgs,
      );
    },
    getTokenPrice(symbol) {
      return explorer.getTokenPrice(symbol);
    },
    getPriceDecimals(symbol) {
      return explorer.getPriceDecimals(symbol);
    },
    async getProtocolFeeInUSD(chain) {
      const provider = getConsensusProvider();
      const network = provider && await provider!.getNetwork();
      if (network) {
        const tp = Number(await explorer.getTokenPrice(chain.nativeCoin()));
        const td = Number(await explorer.getPriceDecimals(chain.nativeCoin()));
        const pf = Number(await explorer.protocolFee(network!.chainId));
        const cd = await chain.decimals();
        return Number(((pf * tp) / 10 ** (cd + td)).toFixed(2));
      }
      console.warn(`${libName} v${version} in 'getProtocolFeeInUSD' Warning: 'network' not found.`)
      return 0;
    },
  };
}
