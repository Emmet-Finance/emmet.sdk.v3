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
    | "tontestnet"
    ;

export const CHAIN_NAME_TO_INNER_ID: { [key in TChainName]: number } = {
    // Mainnets:
    arbitrum: Chain.ARBITRUM,
    avalanche: Chain.AVALANCHE,
    base: Chain.BASE,
    bsc: Chain.BSC,
    ethereum: Chain.ETHEREUM,
    optimism: Chain.OPTIMISM,
    polygon: Chain.POLYGON,
    solana: Chain.SOLANA,
    ton: Chain.TON,
    tontestnet: Chain.TONTESTNET
  };