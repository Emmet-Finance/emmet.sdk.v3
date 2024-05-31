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
          "EQDBRFjItjqx_I-VGeVPRMvsRmCZ11Q--AlTaGWMwP21YEGI",
        ),
        client: new TonClient({
          endpoint:
            "https://testnet.toncenter.com/api/v2/jsonRPC?api_key=9e899d38874458e92addb70d6f336ccbe51e21e378af5797486ba9a9d1a3c5c3",
          apiKey:
            "9e899d38874458e92addb70d6f336ccbe51e21e378af5797486ba9a9d1a3c5c3",
        }),
        nativeTokenId: BigInt(`0x${sha256_sync("TON").toString("hex")}`),
        oracle: Address.parse(
          "EQAx41_27fvdX4C30RxQmzbiLeHyO090XzGHBadgGfdp5Uqd",
        ),
        burner: Address.parse(
          "EQBtE7sxSqbDZwuWhxxQRzSZZ3UAm8j4mhR25iWS2xfEmZ6D",
        ),
        chainName: "tonTestnet",
      },
      bscParams: {
        chainName: "bscTestnet",
        addressBook: ethers.getAddress(
          "0x3564336Ad556295A368EEa2b2CA1a7D3f43B4029",
        ),
        nativeCoin: "BNB",
        provider: new JsonRpcProvider(TestNetRpcUri.BSC)
      },
      polygonParams: {
        addressBook: ethers.getAddress(
          "0x6b30f76cece9f92d27f0e9ad78312e77709e74a5",
        ),
        provider: new JsonRpcProvider(TestNetRpcUri.POLYGON),
        // oracle: ethers.getAddress("0x95DB799744A5b36D6E7BE9AD3b451dBC5b8De673"),
        chainName: "polygon",
        nativeCoin: "MATIC",
      },
    } satisfies Partial<ChainParams>;
  }
}
