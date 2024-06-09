import { EmmetMultisig__factory } from "@emmet-contracts/web3";
import { tonHandler } from "../chains/ton";
import { web3Helper } from "../chains/web3";
import { Chain, type ChainFactory } from "./types";

import type {
  ChainInfo,
  ChainNonce,
  ChainParams,
  HelperMap,
  ParamMap,
} from "./types";

function mapNonceToParams(chainParams: Partial<ChainParams>): ParamMap {
  const cToP: ParamMap = new Map();
  cToP.set(Chain.TON, chainParams.tonParams);
  cToP.set(Chain.POLYGON, chainParams.polygonParams);
  cToP.set(Chain.BSC, chainParams.bscParams);
  cToP.set(Chain.ETHEREUM, chainParams.ethParams);
  return cToP;
}

export const CHAIN_INFO: ChainInfo = new Map();

CHAIN_INFO.set(Chain.POLYGON, {
  constructor: web3Helper,
  decimals: 18,
  name: "Polygon",
  nonce: Chain.POLYGON,
});

CHAIN_INFO.set(Chain.BSC, {
  constructor: web3Helper,
  decimals: 18,
  name: "BSC",
  nonce: Chain.BSC,
});

CHAIN_INFO.set(Chain.ETHEREUM, {
  constructor: web3Helper,
  decimals: 18,
  name: "Ethereum",
  nonce: Chain.ETHEREUM,
});

CHAIN_INFO.set(Chain.TON, {
  decimals: 18,
  name: "Ton",
  nonce: Chain.TON,
  constructor: async (...args) => tonHandler(...args),
});

export function ChainFactoryBuilder(
  chainParams: Partial<ChainParams>,
): ChainFactory {
  const helpers: HelperMap<ChainNonce> = new Map();

  const cToP = mapNonceToParams(chainParams);
  const multisig = EmmetMultisig__factory.connect(chainParams.multisigParams!.address, chainParams.multisigParams?.provider);

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
    preTransfer: async (chain, signer, tid, amt, ga) => {
      const pt = await chain.preTransfer(signer, tid, amt, ga);
      return pt;
    },
    getTxCount() {
      return multisig.nonce()
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
      return await chain.sendInstallment(
        signer,
        amount,
        targetChainId,
        fromSymbol,
        tokenSymbol,
        destAddress,
        gasArgs,
      );
    },
  };
}
