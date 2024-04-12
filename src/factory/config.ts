import { ethers, JsonRpcProvider } from "ethers";
import { TestNetRpcUri } from "./rpcs";
import { Address } from "@ton/core";
import { TonClient } from "@ton/ton";
import { sha256_sync } from "@ton/crypto";
import type { ChainParams } from "./types";

export namespace ChainFactoryConfigs {
  export function TestNet() {
    return {
      tonParams: {
        bridge: Address.parse(
          "EQAB_H1ffzTxxowHfepvk6Vry90awbY5xAtZ8F8jQnK50-EN"
        ),
        client: new TonClient({
          endpoint: "https://testnet.toncenter.com/api/v2/jsonRPC",
        }),
        nativeTokenId: BigInt(`0x${sha256_sync("TON").toString("hex")}`),
      },
      polygonParams: {
        contract: ethers.getAddress(
          "0x379388Ae42f2EeE0CD30B89541CFaf90843F8762"
        ),
        provider: new JsonRpcProvider(TestNetRpcUri.POLYGON),
      },
    } satisfies Partial<ChainParams>;
  }
}
