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
        };
        polygonParams: {
            contract: string;
            provider: ethers.JsonRpcProvider;
            oracle: string;
        };
    };
}
//# sourceMappingURL=config.d.ts.map