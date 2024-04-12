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
  return cToP;
}

export const CHAIN_INFO: ChainInfo = new Map();

CHAIN_INFO.set(Chain.POLYGON, {
  constructor: web3Helper,
  decimals: 18,
  name: "Polygon",
  nonce: Chain.POLYGON,
});

CHAIN_INFO.set(Chain.TON, {
  decimals: 18,
  name: "Ton",
  nonce: Chain.TON,
  constructor: tonHandler,
});

export function ChainFactoryBuilder(
  chainParams: Partial<ChainParams>
): ChainFactory {
  const helpers: HelperMap<ChainNonce> = new Map();

  const cToP = mapNonceToParams(chainParams);

  const inner = async <T extends ChainNonce>(chain: T) => {
    let helper = helpers.get(chain);
    if (helper === undefined) {
      helper = CHAIN_INFO.get(chain)!.constructor(cToP.get(chain)!);
      helpers.set(chain, helper);
    }
    return helper!;
  };

  return {
    inner,
    preTransfer: async (chain,signer,  tid, amt, ga) => {
      const pt = await chain.preTransfer(signer, tid, amt, ga)
      return pt
    },
    sendInstallment: async (
      chain,
      signer,
      amount,
      chainId,
      tokenSymbol,
      destAddress,
      gasArgs
    ) => {
      const dc = await inner(chainId as ChainNonce);
      if (!dc) {
        throw new Error(`Unsupported destination chain id: ${chainId}`);
      }
      const isValid = await dc.validateAddress(destAddress);
      if (!isValid) {
        throw new Error(
          `Invalid destination user address for chain id: ${chainId}`
        );
      }
      return await chain.sendInstallment(
        signer,
        amount,
        chainId,
        tokenSymbol,
        destAddress,
        gasArgs
      );
    },
  };
}
