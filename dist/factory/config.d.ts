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
            rpcs: readonly ["https://bsc-testnet.blockpi.network/v1/rpc/public", "https://api.zan.top/node/v1/bsc/testnet/public", "https://bsc-testnet.public.blastapi.io", "https://bsc-testnet-rpc.publicnode.com"];
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
            rpcs: readonly ["https://bsc-testnet.blockpi.network/v1/rpc/public", "https://api.zan.top/node/v1/bsc/testnet/public", "https://bsc-testnet.public.blastapi.io", "https://bsc-testnet-rpc.publicnode.com"];
            chainName: string;
            nativeCoin: string;
        };
        ethParams: {
            addressBook: string;
            chainName: string;
            nativeCoin: string;
            rpcs: readonly ["https://eth-sepolia.public.blastapi.io", "https://eth-sepolia.api.onfinality.io/public", "https://gateway.tenderly.co/public/sepolia", "https://ethereum-sepolia-rpc.publicnode.com"];
        };
        multisigParams: {
            rpcs: readonly ["https://eth-sepolia.public.blastapi.io", "https://eth-sepolia.api.onfinality.io/public", "https://gateway.tenderly.co/public/sepolia", "https://ethereum-sepolia-rpc.publicnode.com"];
            ab: string;
        };
    };
}
//# sourceMappingURL=config.d.ts.map