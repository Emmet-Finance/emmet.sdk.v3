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
          "EQAB_H1ffzTxxowHfepvk6Vry90awbY5xAtZ8F8jQnK50-EN",
        ),
        client: new TonClient({
          endpoint: "https://testnet.toncenter.com/api/v2/jsonRPC",
        }),
        nativeTokenId: BigInt(`0x${sha256_sync("TON").toString("hex")}`),
        oracle: Address.parse(
          "EQAx41_27fvdX4C30RxQmzbiLeHyO090XzGHBadgGfdp5Uqd",
        ),
        burner: Address.parse(
          "EQBtE7sxSqbDZwuWhxxQRzSZZ3UAm8j4mhR25iWS2xfEmZ6D",
        ),
      },
      polygonParams: {
        contract: ethers.getAddress(
          "0x379388Ae42f2EeE0CD30B89541CFaf90843F8762",
        ),
        provider: new JsonRpcProvider(TestNetRpcUri.POLYGON),
        oracle: ethers.getAddress("0x95DB799744A5b36D6E7BE9AD3b451dBC5b8De673"),
      },
    } satisfies Partial<ChainParams>;
  }
}
