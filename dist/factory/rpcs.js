"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestNetRpcUri = exports.MainnetRPCUri = void 0;
const AL_KEY = "sXEn3HrcMdXyp-UJApfoDmDDA5KSuZKJ";
exports.MainnetRPCUri = {
    AVALANCHE: [
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
        "https://polygon-bor-rpc.publicnode.com",
        "https://1rpc.io/matic",
        // "https://rpc.ankr.com/polygon",
        // "https://polygon.drpc.org"
        // "https://polygon.blockpi.network/v1/rpc/public",
    ]
};
exports.TestNetRpcUri = {
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
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicnBjcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9mYWN0b3J5L3JwY3MudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsTUFBTSxNQUFNLEdBQVcsa0NBQWtDLENBQUM7QUFFN0MsUUFBQSxhQUFhLEdBQUc7SUFFM0IsU0FBUyxFQUFDO1FBQ1IseUNBQXlDLE1BQU0sRUFBRTtRQUNqRCw4Q0FBOEM7UUFDOUMsdUNBQXVDO1FBQ3ZDLGtDQUFrQztRQUNsQyw4Q0FBOEM7UUFDOUMscURBQXFEO1FBQ3JELDJDQUEyQztRQUMzQyw4QkFBOEI7UUFDOUIsb0RBQW9EO1FBQ3BELCtDQUErQztLQUNoRDtJQUNELEdBQUcsRUFBRTtRQUNILHdDQUF3QyxNQUFNLEVBQUU7UUFDaEQsc0JBQXNCO1FBQ3RCLDBCQUEwQjtRQUMxQixtQ0FBbUM7UUFDbkMsb0JBQW9CO1FBQ3BCLGdDQUFnQztRQUNoQyxtQ0FBbUM7UUFDbkMsa0NBQWtDO1FBQ2xDLG1DQUFtQztRQUNuQyxrQ0FBa0M7UUFDbEMsa0NBQWtDO0tBQ25DO0lBQ0QsT0FBTyxFQUFFO1FBQ1AsNENBQTRDLE1BQU0sRUFBRTtRQUNwRCx3Q0FBd0M7UUFDeEMsdUJBQXVCO1FBQ3ZCLGtDQUFrQztRQUNsQyw2QkFBNkI7UUFDN0IsbURBQW1EO0tBQ3BEO0NBRU8sQ0FBQztBQUVFLFFBQUEsYUFBYSxHQUFHO0lBQzNCLEdBQUcsRUFBRTtRQUNILG1EQUFtRDtRQUNuRCx3Q0FBd0M7UUFDeEMsd0NBQXdDO0tBQ3pDO0lBQ0QsR0FBRyxFQUFFO1FBQ0gsd0NBQXdDO1FBQ3hDLDhDQUE4QztRQUM5Qyw2Q0FBNkM7S0FDOUM7SUFDRCxPQUFPLEVBQUU7UUFDUCxzQ0FBc0M7UUFDdEMsbUNBQW1DO1FBQ25DLHVDQUF1QztRQUN2Qyw2Q0FBNkM7S0FDOUM7SUFDRCxTQUFTLEVBQUU7UUFDVCxrQ0FBa0M7UUFDbEMsb0NBQW9DO1FBQ3BDLHlCQUF5QjtRQUN6QixpQ0FBaUM7S0FDbEM7SUFDRCxTQUFTLEVBQUUsQ0FBQyx1QkFBdUIsQ0FBQztDQUM1QixDQUFDIn0=