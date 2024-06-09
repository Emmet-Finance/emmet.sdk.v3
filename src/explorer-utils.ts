import { Chain } from "./factory/types";

export const ChainIDToDomain = {
  80002: Chain.POLYGON,
  97: Chain.BSC,
  11155111: Chain.ETHEREUM,
  65535: Chain.TON,
} as const;

export type SupportedChainID = keyof typeof ChainIDToDomain;
