import { Chain } from "./index";

export type TChainName = "arbitrum"
    | "avalanche"
    | "base"
    | "bsc"
    | "ethereum"
    | "optimism"
    | "polygon"
    | "solana"
    | "ton"
    ;

export const CHAIN_NAME_TO_INNER_ID: { [key in TChainName]: number } = {
    // Mainnets:
    arbitrum: Chain.ARBITRUM,
    avalanche: Chain.AVALANCHE,
    base: Chain.BASE,
    ethereum: Chain.ETHEREUM,
    optimism: Chain.OPTIMISM,
    polygon: Chain.POLYGON,
    ton: Chain.TON,
    solana: Chain.SOLANA,
    bsc: Chain.BSC
  };