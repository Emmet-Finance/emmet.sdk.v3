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
        addressBook: Address.parse("EQDI0bpR2Qv-_4kuh2RT0lndPsZJATIr3SitkrT7BTUT0Mx1"),
        client: new TonClient({
          endpoint: "https://testnet-ton-node.emmet.finance/jsonRPC",
          apiKey:
            "9e899d38874458e92addb70d6f336ccbe51e21e378af5797486ba9a9d1a3c5c3",
        }),
        nativeTokenId: BigInt(`0x${sha256_sync("TON").toString("hex")}`),
        chainId: 65535n, // TON Testnet
        chainName: "tonTestnet",
      },
      bscParams: {
        chainName: "bscTestnet",
        addressBook: ethers.getAddress(
          "0x3564336Ad556295A368EEa2b2CA1a7D3f43B4029",
        ),
        nativeCoin: "BNB",
        provider: new JsonRpcProvider(TestNetRpcUri.BSC),
      },
      onlylayerParams: {
        chainName: "onlylayerTestnet",
        addressBook: ethers.getAddress(
          "0x6b30f76CecE9F92D27f0e9Ad78312E77709E74A5",
        ),
        nativeCoin: "ETH",
        provider: new JsonRpcProvider(TestNetRpcUri.ONLYLAYER),
      },
      berachainParams: {
        chainName: "berachainBarito",
        addressBook: ethers.getAddress(
          "0x6b30f76CecE9F92D27f0e9Ad78312E77709E74A5",
        ),
        nativeCoin: "BERA",
        provider: new JsonRpcProvider(TestNetRpcUri.BERACHAIN),
      },
      polygonParams: {
        addressBook: ethers.getAddress(
          "0x8d948925A0CB920c965C3296Eb4aef31EfE32ce9",
        ),
        provider: new JsonRpcProvider(TestNetRpcUri.POLYGON),
        // oracle: ethers.getAddress("0x95DB799744A5b36D6E7BE9AD3b451dBC5b8De673"),
        chainName: "polygon",
        nativeCoin: "MATIC",
      },
      ethParams: {
        addressBook: ethers.getAddress(
          "0x8b87FE2b3f3D9816432b34D5A6a30B1330594082",
        ),
        chainName: "sepolia",
        nativeCoin: "ETH",
        provider: new JsonRpcProvider(TestNetRpcUri.ETH),
      },
      multisigParams: {
        provider: new JsonRpcProvider(TestNetRpcUri.ETH),
        ab: ethers.getAddress("0x8b87FE2b3f3D9816432b34D5A6a30B1330594082"),
      },
    } satisfies Partial<ChainParams>;
  }
}
