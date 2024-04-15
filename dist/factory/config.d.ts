import { ethers } from "ethers";
import { Address } from "@ton/core";
import { TonClient } from "@ton/ton";
export declare namespace ChainFactoryConfigs {
    function TestNet(): {
        tonParams: {
            bridge: Address;
            client: TonClient;
            nativeTokenId: bigint;
        };
        polygonParams: {
            contract: string;
            provider: ethers.JsonRpcProvider;
        };
    };
}
//# sourceMappingURL=config.d.ts.map