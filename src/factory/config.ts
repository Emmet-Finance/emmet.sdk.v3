import { ethers, JsonRpcProvider } from "ethers";
import { TestNetRpcUri } from "./rpcs";
import { Address } from "@ton/core";
import { TonClient } from "@ton/ton";
import { sha256_sync } from "@ton/crypto";
import type { ChainParams } from "./types";

export namespace ChainFactoryConfigs {
  export function TestNet() {
    return {
      bscParams: {
        contract: ethers.getAddress(""),
        provider: new JsonRpcProvider(TestNetRpcUri.BSC),
      },
      ethParams: {
        contract: ethers.getAddress(""),
        provider: new JsonRpcProvider(TestNetRpcUri.ETH),
      },
      tonParams: {
        bridge: Address.parse(
          "EQAB_H1ffzTxxowHfepvk6Vry90awbY5xAtZ8F8jQnK50-EN",
        ),
        client: new TonClient({ apiKey: "", endpoint: "" }),
        nativeTokenId: BigInt(`0x${sha256_sync("TON").toString("hex")}`),
      },
      polygonParams: {
        contract: ethers.getAddress(""),
        provider: new JsonRpcProvider(TestNetRpcUri.ETH),
      },
    } satisfies Partial<ChainParams>;
  }
}
