import { ethers } from "ethers";
import { MainnetRPCUri, TestNetRpcUri } from "./rpcs";
import { Address } from "@ton/core";
import { sha256_sync } from "@ton/crypto";
import type { ChainParams } from "./types";

export const libName: string = "Emmet.SDK"
export const version: number = 3;

export namespace ChainFactoryConfigs {
  export function MainNet() {
    return {
      avaxParams: {
        addressBook: ethers.getAddress(
          "0xcCa50e985e4e9a2a9668fA3aA8EbC2568E6a6060",
        ),
        chainId: 43114,
        chainName: "avalanche",
        nativeCoin: "AVAX",
        rpcs: MainnetRPCUri.AVALANCHE
      },
      polygonParams: {
        addressBook: ethers.getAddress(
          "0xaCADE1aBb88C13403b22b1f7EAB70A8062bcA374",
        ),
        chainId: 137,
        chainName: "polygon",
        nativeCoin: "MATIC",
        rpcs: MainnetRPCUri.POLYGON
      },
      multisigParams: {
        rpcs: MainnetRPCUri.POLYGON,
        ab: ethers.getAddress("0xaCADE1aBb88C13403b22b1f7EAB70A8062bcA374"),
      }
    } satisfies Partial<ChainParams>;
  }
  export function TestNet() {
    return {
      tonParams: {
        addressBook: Address.parse(
          "EQDI0bpR2Qv-_4kuh2RT0lndPsZJATIr3SitkrT7BTUT0Mx1",
        ),
        rpcs: ["https://testnet-ton-node.emmet.finance/jsonRPC"],
        nativeTokenId: BigInt(`0x${sha256_sync("TON").toString("hex")}`),
        chainId: 65535n, // TON Testnet
        chainName: "tonTestnet",
        stonApiUrl: "https://api.ston.fi/",
        stonRouterAddress: "kQCas2p939ESyXM_BzFJzcIe3GD5S0tbjJDj6EBVn-SPsEkN",
        pTonAddress: "kQDwpyxrmYQlGDViPk-oqP4XK6J11I-bx7fJAlQCWmJB4m74",
      },
      bscParams: {
        chainName: "bscTestnet",
        addressBook: ethers.getAddress(
          "0x3564336Ad556295A368EEa2b2CA1a7D3f43B4029",
        ),
        nativeCoin: "BNB",
        rpcs: TestNetRpcUri.BSC,
      },
      onlylayerParams: {
        chainName: "onlylayerTestnet",
        addressBook: ethers.getAddress(
          "0x6b30f76CecE9F92D27f0e9Ad78312E77709E74A5",
        ),
        nativeCoin: "ETH",
        rpcs: TestNetRpcUri.ONLYLAYER,
      },
      berachainParams: {
        chainName: "berachainBarito",
        addressBook: ethers.getAddress(
          "0x6b30f76CecE9F92D27f0e9Ad78312E77709E74A5",
        ),
        nativeCoin: "BERA",
        rpcs: TestNetRpcUri.BERACHAIN,
      },
      polygonParams: {
        addressBook: ethers.getAddress(
          "0x8d948925A0CB920c965C3296Eb4aef31EfE32ce9",
        ),
        rpcs: TestNetRpcUri.POLYGON,
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
        rpcs: TestNetRpcUri.ETH,
      },
      multisigParams: {
        rpcs: TestNetRpcUri.ETH,
        ab: ethers.getAddress("0x8b87FE2b3f3D9816432b34D5A6a30B1330594082"),
      },
    } satisfies Partial<ChainParams>;
  }
}
