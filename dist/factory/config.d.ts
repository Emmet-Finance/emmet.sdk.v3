import { Address } from "@ton/core";
export declare namespace ChainFactoryConfigs {
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
            rpcs: readonly ["https://bsc-testnet.blockpi.network/v1/rpc/public"];
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
            rpcs: readonly ["https://bartio.rpc.berachain.com"];
        };
        polygonParams: {
            addressBook: string;
            rpcs: readonly ["https://bsc-testnet.blockpi.network/v1/rpc/public"];
            chainName: string;
            nativeCoin: string;
        };
        ethParams: {
            addressBook: string;
            chainName: string;
            nativeCoin: string;
            rpcs: readonly ["https://eth-sepolia.public.blastapi.io"];
        };
        multisigParams: {
            rpcs: readonly ["https://eth-sepolia.public.blastapi.io"];
            ab: string;
        };
    };
}
//# sourceMappingURL=config.d.ts.map