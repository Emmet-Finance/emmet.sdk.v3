import { Chain } from "./factory/types";

export const ChainIDToDomain = {
  80002: Chain.POLYGON,
  97: Chain.BSC,
  11155111: Chain.ETHEREUM,
  65535: Chain.TON,
  728696: Chain.ONLYLAYER,
  80084: Chain.BERACHAIN,
} as const;

export type SupportedChainID = keyof typeof ChainIDToDomain;
