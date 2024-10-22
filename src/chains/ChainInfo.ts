import { Chain, ChainInfo } from "../factory/types";
import { tonHandler } from "./ton";
import { web3Helper } from "./web3";

export const CHAIN_INFO: ChainInfo = new Map();

CHAIN_INFO.set(Chain.ARBITRUM, {
  constructor: web3Helper,
  decimals: 18,
  name: "Arbitrum",
  nonce: Chain.ARBITRUM
});

CHAIN_INFO.set(Chain.AVALANCHE, {
  constructor: web3Helper,
  decimals: 18,
  name: "Avalanche",
  nonce: Chain.AVALANCHE
});

CHAIN_INFO.set(Chain.BERACHAIN, {
  constructor: web3Helper,
  decimals: 18,
  name: "Berachain",
  nonce: Chain.BERACHAIN,
});

CHAIN_INFO.set(Chain.BASE, {
  constructor: web3Helper,
  decimals: 18,
  name: "BASE",
  nonce: Chain.BASE
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

CHAIN_INFO.set(Chain.ONLYLAYER, {
  constructor: web3Helper,
  decimals: 18,
  name: "Only Layer",
  nonce: Chain.ONLYLAYER,
});

CHAIN_INFO.set(Chain.OPTIMISM, {
  constructor: web3Helper,
  decimals: 18,
  name: "Optimism",
  nonce: Chain.OPTIMISM
});

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
  constructor: async (...args) => tonHandler(...args),
});

CHAIN_INFO.set(Chain.TONTESTNET, {
  decimals: 18,
  name: "Ton",
  nonce: Chain.TONTESTNET,
  constructor: async (...args) => tonHandler(...args),
});