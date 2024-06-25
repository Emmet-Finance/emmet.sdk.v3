import { ethers } from 'ethers';
import { Address } from '@ton/core';
import { TonClient } from '@ton/ton';
export declare namespace ChainFactoryConfigs {
    function TestNet(): {
        tonParams: {
            bridge: Address;
            client: TonClient;
            nativeTokenId: bigint;
            oracle: Address;
            chainId: bigint;
            burner: Address;
            chainName: string;
        };
        bscParams: {
            chainName: string;
            addressBook: string;
            nativeCoin: string;
            provider: ethers.JsonRpcProvider;
        };
        polygonParams: {
            addressBook: string;
            provider: ethers.JsonRpcProvider;
            chainName: string;
            nativeCoin: string;
        };
        ethParams: {
            addressBook: string;
            chainName: string;
            nativeCoin: string;
            provider: ethers.JsonRpcProvider;
        };
        multisigParams: {
            provider: ethers.JsonRpcProvider;
            ab: string;
        };
    };
}
//# sourceMappingURL=config.d.ts.map