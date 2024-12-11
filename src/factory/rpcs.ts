const AL_KEY: string = "sXEn3HrcMdXyp-UJApfoDmDDA5KSuZKJ";

export const MainnetRPCUri = {

  AVALANCHE:[
    `https://avax-mainnet.g.alchemy.com/v2/${AL_KEY}`,
    "https://avalanche-c-chain-rpc.publicnode.com",
    "https://api.avax.network/ext/bc/C/rpc",
    "https://avalanche.public-rpc.com",
    "https://avalanche-c-chain-rpc.publicnode.com",
    "https://ava-mainnet.public.blastapi.io/ext/bc/C/rpc",
    "https://avax-pokt.nodies.app/ext/bc/C/rpc",
    // "https://avax.meowrpc.com",
    //"https://avalanche.blockpi.network/v1/rpc/public",
    // "https://avax-pokt.nodies.app/ext/bc/C/rpc",
  ],
  BSC: [
    `https://bnb-mainnet.g.alchemy.com/v2/${AL_KEY}`,
    "https://bsc.drpc.org",
    "https://rpc.ankr.com/bsc",
    "https://bsc-dataseed.bnbchain.org",
    "https://bscrpc.com",
    "https://bsc-rpc.publicnode.com",
    "https://bsc-dataseed.bnbchain.org",
    "https://bsc-dataseed1.defibit.io",
    "https://bsc-dataseed1.ninicoin.io",
    "https://bsc-dataseed2.defibit.io",
    "https://bsc-dataseed3.defibit.io"
  ],
  POLYGON: [
    `https://polygon-mainnet.g.alchemy.com/v2/${AL_KEY}`,
    "https://solitary-maximum-friday.matic.quiknode.pro/08a337d30e47f0883134773e941aa12a9069c079",
    "https://polygon-rpc.com",
    "https://polygon-mainnet.g.allthatnode.com/full/evm/e95e54a182194638b7ba5f4598270b44",
    // "https://polygon-bor-rpc.publicnode.com",
    // "https://1rpc.io/matic",
    // "https://rpc.ankr.com/polygon",
    // "https://polygon.drpc.org"
    // "https://polygon.blockpi.network/v1/rpc/public",
  ],
  TON: [
    "https://toncenter.com/api/v2/jsonRPC?api_key=a0b875b16d9045fed8cee2ad6ee7733990afd045a6e2fbb50708186c9f6decb0",
    "https://go.getblock.io/9cbe9ae971fb4d6e93cd2003075c63e0",
    "https://ton-mainnet.core.chainstack.com/5100b867ed6644ea5e9c5e689baaf6fb/api/v2",
  ],

} as const;

export const TestNetRpcUri = {
  BSC: [
    "https://bsc-testnet.blockpi.network/v1/rpc/public",
    "https://bsc-testnet.public.blastapi.io",
    "https://bsc-testnet-rpc.publicnode.com",
  ],
  ETH: [
    "https://eth-sepolia.public.blastapi.io",
    "https://eth-sepolia.api.onfinality.io/public",
    "https://ethereum-sepolia-rpc.publicnode.com",
  ],
  POLYGON: [
    "https://rpc-amoy.polygon.technology/",
    "https://rpc.ankr.com/polygon_amoy",
    "https://polygon-amoy.gateway.tatum.io",
    "https://polygon-amoy-bor-rpc.publicnode.com",
  ],
  BERACHAIN: [
    "https://bartio.rpc.berachain.com",
    "https://bera-testnet.nodeinfra.com",
    "https://bartio.drpc.org",
    "https://bartio.rpc.b-harvest.io",
  ],
  ONLYLAYER: ["https://onlylayer.org"],
} as const;
