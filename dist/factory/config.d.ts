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
            rpcs: readonly ["https://avalanche-c-chain-rpc.publicnode.com", "https://api.avax.network/ext/bc/C/rpc", "https://avalanche.public-rpc.com", "https://avalanche-c-chain-rpc.publicnode.com", "https://ava-mainnet.public.blastapi.io/ext/bc/C/rpc", "https://avax-pokt.nodies.app/ext/bc/C/rpc"];
        };
        bscParams: {
            addressBook: string;
            chainId: number;
            chainName: string;
            nativeCoin: string;
            rpcs: readonly ["https://bsc.drpc.org", "https://rpc.ankr.com/bsc", "https://bsc-dataseed.bnbchain.org", "https://bscrpc.com", "https://bsc-rpc.publicnode.com", "https://bsc-dataseed.bnbchain.org", "https://bsc-dataseed1.defibit.io", "https://bsc-dataseed1.ninicoin.io", "https://bsc-dataseed2.defibit.io", "https://bsc-dataseed3.defibit.io"];
        };
        mantaParams: {
            addressBook: string;
            chainId: number;
            chainName: string;
            nativeCoin: string;
            rpcs: readonly ["https://pacific-rpc.manta.network/http", "https://1rpc.io/manta", "https://manta.nirvanalabs.xyz/mantapublic", "https://manta-pacific.drpc.org", "https://manta-pacific-gascap.calderachain.xyz/http", "https://endpoints.omniatech.io/v1/manta-pacific/mainnet/public"];
        };
        polygonParams: {
            addressBook: string;
            chainId: number;
            chainName: string;
            nativeCoin: string;
            rpcs: readonly ["https://polygon-rpc.com", "https://rpc.therpc.io/polygon", "https://gateway.tenderly.co/public/polygon", "https://polygon-mainnet.g.alchemy.com/v2/demo", "https://polygon-pokt.nodies.app", "https://rpc.therpc.io/polygon", "https://polygon.drpc.org"];
        };
        songbirdParams: {
            addressBook: string;
            chainId: number;
            chainName: string;
            nativeCoin: string;
            rpcs: readonly ["https://rpc.ftso.au/songbird", "https://songbird-api.flare.network/ext/C/rpc", "https://rpc.au.cc/songbird", "https://rpc.ftso.au/songbird"];
        };
        tonParams: {
            addressBook: Address;
            rpcs: readonly ["https://toncenter.com/api/v2/jsonRPC?api_key=a0b875b16d9045fed8cee2ad6ee7733990afd045a6e2fbb50708186c9f6decb0"];
            nativeTokenId: bigint;
            chainId: bigint;
            chainName: string;
        };
        multisigParams: {
            rpcs: readonly ["https://polygon-rpc.com", "https://rpc.therpc.io/polygon", "https://gateway.tenderly.co/public/polygon", "https://polygon-mainnet.g.alchemy.com/v2/demo", "https://polygon-pokt.nodies.app", "https://rpc.therpc.io/polygon", "https://polygon.drpc.org"];
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