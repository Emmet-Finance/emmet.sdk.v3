import { ethers } from "ethers";
import { Address } from "@ton/core";
import { TonClient } from "@ton/ton";
export declare namespace ChainFactoryConfigs {
    function TestNet(): {
        tonParams: {
            bridge: Address;
            client: TonClient;
            nativeTokenId: bigint;
            oracle: Address;
            burner: Address;
            chainName: string;
        };
        polygonParams: {
            contract: string;
            provider: ethers.JsonRpcProvider;
            oracle: string;
            chainName: string;
            nativeCoin: string;
        };
    };
}
//# sourceMappingURL=config.d.ts.map