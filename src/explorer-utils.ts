import { Chain } from "./factory/types";

export const ChainIDToDomain = {
  // Mainnets
  1: Chain.ETHEREUM,
  43114: Chain.AVALANCHE,
  10: Chain.OPTIMISM,
  42161: Chain.ARBITRUM,
  56: Chain.BSC,
  8453: Chain.BASE,
  137: Chain.POLYGON,
  65534: Chain.TON,
  // Testnets
  80002: Chain.POLYGON,
  97: Chain.BSC,
  11155111: Chain.ETHEREUM,
  65535: Chain.TON,
  728696: Chain.ONLYLAYER,
  80084: Chain.BERACHAIN,
} as const;

export type SupportedChainID = keyof typeof ChainIDToDomain;
