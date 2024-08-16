export const TestNetRpcUri = {
  BSC: [
    "https://bsc-testnet.blockpi.network/v1/rpc/public",
    "https://bsc-testnet.public.blastapi.io",
    "https://bsc-testnet-rpc.publicnode.com",
  ],
  ETH: [
    "https://eth-sepolia.public.blastapi.io",
    "https://eth-sepolia.api.onfinality.io/public",
    "https://gateway.tenderly.co/public/sepolia",
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
