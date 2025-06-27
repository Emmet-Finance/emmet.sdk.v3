export const MainnetRPCUri = {

  AVALANCHE:[
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
  MANTA: [
    "https://pacific-rpc.manta.network/http",
    "https://1rpc.io/manta",
    "https://manta.nirvanalabs.xyz/mantapublic",
    "https://manta-pacific.drpc.org",
    "https://manta-pacific-gascap.calderachain.xyz/http",
    "https://endpoints.omniatech.io/v1/manta-pacific/mainnet/public",
  ],
  POLYGON: [
    "https://polygon-rpc.com",
    "https://gateway.tenderly.co/public/polygon",
    "https://polygon-pokt.nodies.app",
    "https://polygon.drpc.org",
    // "https://polygon-bor-rpc.publicnode.com",
    // "https://1rpc.io/matic",
    // "https://rpc.ankr.com/polygon",
    // "https://polygon.blockpi.network/v1/rpc/public",
  ],
  SONGBIRD: [
    "https://rpc.ftso.au/songbird",
    "https://songbird-api.flare.network/ext/C/rpc",
    "https://rpc.au.cc/songbird",
    "https://rpc.ftso.au/songbird",
  ],
  TON: [
    "https://toncenter.com/api/v2/jsonRPC?api_key=a0b875b16d9045fed8cee2ad6ee7733990afd045a6e2fbb50708186c9f6decb0",
    // "https://ton-mainnet.core.chainstack.com/5100b867ed6644ea5e9c5e689baaf6fb/api/v2/",
    // "https://go.getblock.io/9cbe9ae971fb4d6e93cd2003075c63e0",
    // "https://go.getblock.io/690db4c466e7410e9a6746f873ae9fa2",
    // "https://go.getblock.io/685d2dcf891741da97c007a54972bede",
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
