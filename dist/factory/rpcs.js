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
        "https://solitary-maximum-friday.matic.quiknode.pro/08a337d30e47f0883134773e941aa12a9069c079",
        "https://polygon-rpc.com",
        // "https://polygon-mainnet.g.allthatnode.com/full/evm/e95e54a182194638b7ba5f4598270b44",
        // "https://polygon-bor-rpc.publicnode.com",
        // "https://1rpc.io/matic",
        // "https://rpc.ankr.com/polygon",
        // "https://polygon.drpc.org"
        // "https://polygon.blockpi.network/v1/rpc/public",
    ],
    TON: [
        "https://toncenter.com/api/v2/jsonRPC?api_key=a0b875b16d9045fed8cee2ad6ee7733990afd045a6e2fbb50708186c9f6decb0",
        // "https://ton-mainnet.core.chainstack.com/5100b867ed6644ea5e9c5e689baaf6fb/api/v2/",
        // "https://go.getblock.io/9cbe9ae971fb4d6e93cd2003075c63e0",
        // "https://go.getblock.io/690db4c466e7410e9a6746f873ae9fa2",
        // "https://go.getblock.io/685d2dcf891741da97c007a54972bede",
    ],
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicnBjcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9mYWN0b3J5L3JwY3MudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsTUFBTSxNQUFNLEdBQVcsa0NBQWtDLENBQUM7QUFFN0MsUUFBQSxhQUFhLEdBQUc7SUFFM0IsU0FBUyxFQUFDO1FBQ1IseUNBQXlDLE1BQU0sRUFBRTtRQUNqRCw4Q0FBOEM7UUFDOUMsdUNBQXVDO1FBQ3ZDLGtDQUFrQztRQUNsQyw4Q0FBOEM7UUFDOUMscURBQXFEO1FBQ3JELDJDQUEyQztRQUMzQyw4QkFBOEI7UUFDOUIsb0RBQW9EO1FBQ3BELCtDQUErQztLQUNoRDtJQUNELEdBQUcsRUFBRTtRQUNILHdDQUF3QyxNQUFNLEVBQUU7UUFDaEQsc0JBQXNCO1FBQ3RCLDBCQUEwQjtRQUMxQixtQ0FBbUM7UUFDbkMsb0JBQW9CO1FBQ3BCLGdDQUFnQztRQUNoQyxtQ0FBbUM7UUFDbkMsa0NBQWtDO1FBQ2xDLG1DQUFtQztRQUNuQyxrQ0FBa0M7UUFDbEMsa0NBQWtDO0tBQ25DO0lBQ0QsT0FBTyxFQUFFO1FBQ1AsNENBQTRDLE1BQU0sRUFBRTtRQUNwRCw2RkFBNkY7UUFDN0YseUJBQXlCO1FBQ3pCLHlGQUF5RjtRQUN6Riw0Q0FBNEM7UUFDNUMsMkJBQTJCO1FBQzNCLGtDQUFrQztRQUNsQyw2QkFBNkI7UUFDN0IsbURBQW1EO0tBQ3BEO0lBQ0QsR0FBRyxFQUFFO1FBQ0gsK0dBQStHO1FBQy9HLHNGQUFzRjtRQUN0Riw2REFBNkQ7UUFDN0QsNkRBQTZEO1FBQzdELDZEQUE2RDtLQUM5RDtDQUVPLENBQUM7QUFFRSxRQUFBLGFBQWEsR0FBRztJQUMzQixHQUFHLEVBQUU7UUFDSCxtREFBbUQ7UUFDbkQsd0NBQXdDO1FBQ3hDLHdDQUF3QztLQUN6QztJQUNELEdBQUcsRUFBRTtRQUNILHdDQUF3QztRQUN4Qyw4Q0FBOEM7UUFDOUMsNkNBQTZDO0tBQzlDO0lBQ0QsT0FBTyxFQUFFO1FBQ1Asc0NBQXNDO1FBQ3RDLG1DQUFtQztRQUNuQyx1Q0FBdUM7UUFDdkMsNkNBQTZDO0tBQzlDO0lBQ0QsU0FBUyxFQUFFO1FBQ1Qsa0NBQWtDO1FBQ2xDLG9DQUFvQztRQUNwQyx5QkFBeUI7UUFDekIsaUNBQWlDO0tBQ2xDO0lBQ0QsU0FBUyxFQUFFLENBQUMsdUJBQXVCLENBQUM7Q0FDNUIsQ0FBQyJ9