import { Address } from "@ton/core";
export declare const libName: string;
export declare const version: number;
export declare namespace ChainFactoryConfigs {
    function MainNet(): {
        avaxParams: {
            addressBook: string;
            chainId: number;
            chainName: string;
            nativeCoin: string;
            rpcs: readonly [`https://avax-mainnet.g.alchemy.com/v2/${string}`, "https://avalanche-c-chain-rpc.publicnode.com", "https://api.avax.network/ext/bc/C/rpc", "https://avalanche.public-rpc.com", "https://avalanche-c-chain-rpc.publicnode.com", "https://ava-mainnet.public.blastapi.io/ext/bc/C/rpc", "https://avax-pokt.nodies.app/ext/bc/C/rpc"];
        };
        bscParams: {
            addressBook: string;
            chainId: number;
            chainName: string;
            nativeCoin: string;
            rpcs: readonly [`https://bnb-mainnet.g.alchemy.com/v2/${string}`, "https://bsc.drpc.org", "https://rpc.ankr.com/bsc", "https://bsc-dataseed.bnbchain.org", "https://bscrpc.com", "https://bsc-rpc.publicnode.com", "https://bsc-dataseed.bnbchain.org", "https://bsc-dataseed1.defibit.io", "https://bsc-dataseed1.ninicoin.io", "https://bsc-dataseed2.defibit.io", "https://bsc-dataseed3.defibit.io"];
        };
        polygonParams: {
            addressBook: string;
            chainId: number;
            chainName: string;
            nativeCoin: string;
            rpcs: readonly [`https://polygon-mainnet.g.alchemy.com/v2/${string}`, "https://solitary-maximum-friday.matic.quiknode.pro/08a337d30e47f0883134773e941aa12a9069c079", "https://polygon-rpc.com"];
        };
        tonParams: {
            addressBook: Address;
            rpcs: string[];
            nativeTokenId: bigint;
            chainId: bigint;
            chainName: string;
            stonApiUrl: string;
            stonRouterAddress: string;
            pTonAddress: string;
        };
        multisigParams: {
            rpcs: readonly [`https://polygon-mainnet.g.alchemy.com/v2/${string}`, "https://solitary-maximum-friday.matic.quiknode.pro/08a337d30e47f0883134773e941aa12a9069c079", "https://polygon-rpc.com"];
            ab: string;
        };
    };
    function TestNet(): {
        tonParams: {
            addressBook: Address;
            rpcs: string[];
            nativeTokenId: bigint;
            chainId: bigint;
            chainName: string;
            stonApiUrl: string;
            stonRouterAddress: string;
            pTonAddress: string;
        };
        bscParams: {
            chainName: string;
            addressBook: string;
            nativeCoin: string;
            rpcs: readonly ["https://bsc-testnet.blockpi.network/v1/rpc/public", "https://bsc-testnet.public.blastapi.io", "https://bsc-testnet-rpc.publicnode.com"];
        };
        onlylayerParams: {
            chainName: string;
            addressBook: string;
            nativeCoin: string;
            rpcs: readonly ["https://onlylayer.org"];
        };
        berachainParams: {
            chainName: string;
            addressBook: string;
            nativeCoin: string;
            rpcs: readonly ["https://bartio.rpc.berachain.com", "https://bera-testnet.nodeinfra.com", "https://bartio.drpc.org", "https://bartio.rpc.b-harvest.io"];
        };
        polygonParams: {
            addressBook: string;
            rpcs: readonly ["https://rpc-amoy.polygon.technology/", "https://rpc.ankr.com/polygon_amoy", "https://polygon-amoy.gateway.tatum.io", "https://polygon-amoy-bor-rpc.publicnode.com"];
            chainName: string;
            nativeCoin: string;
        };
        ethParams: {
            addressBook: string;
            chainName: string;
            nativeCoin: string;
            rpcs: readonly ["https://eth-sepolia.public.blastapi.io", "https://eth-sepolia.api.onfinality.io/public", "https://ethereum-sepolia-rpc.publicnode.com"];
        };
        multisigParams: {
            rpcs: readonly ["https://eth-sepolia.public.blastapi.io", "https://eth-sepolia.api.onfinality.io/public", "https://ethereum-sepolia-rpc.publicnode.com"];
            ab: string;
        };
    };
}
//# sourceMappingURL=config.d.ts.map