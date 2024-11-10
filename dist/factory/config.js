"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChainFactoryConfigs = exports.version = exports.libName = void 0;
const ethers_1 = require("ethers");
const rpcs_1 = require("./rpcs");
const core_1 = require("@ton/core");
const crypto_1 = require("@ton/crypto");
exports.libName = "Emmet.SDK";
exports.version = 3;
var ChainFactoryConfigs;
(function (ChainFactoryConfigs) {
    function MainNet() {
        return {
            avaxParams: {
                addressBook: ethers_1.ethers.getAddress("0xcCa50e985e4e9a2a9668fA3aA8EbC2568E6a6060"),
                chainId: 43114,
                chainName: "avalanche",
                nativeCoin: "AVAX",
                rpcs: rpcs_1.MainnetRPCUri.AVALANCHE
            },
            bscParams: {
                addressBook: ethers_1.ethers.getAddress("0xE5A2Ecb9995d42A1CC545F9fab101517866b3C9e"),
                chainId: 56,
                chainName: "bsc",
                nativeCoin: "BNB",
                rpcs: rpcs_1.MainnetRPCUri.BSC
            },
            polygonParams: {
                addressBook: ethers_1.ethers.getAddress("0xaCADE1aBb88C13403b22b1f7EAB70A8062bcA374"),
                chainId: 137,
                chainName: "polygon",
                nativeCoin: "MATIC",
                rpcs: rpcs_1.MainnetRPCUri.POLYGON
            },
            tonParams: {
                addressBook: core_1.Address.parse("EQB_pf7BP7jobq2QEbhVsXxU4pGsQVdqx-X5F8YU4jGlyCIQ"),
                rpcs: [
                    "https://toncenter.com/api/v2/jsonRPC?api_key=a0b875b16d9045fed8cee2ad6ee7733990afd045a6e2fbb50708186c9f6decb0",
                ],
                nativeTokenId: BigInt(`0x${(0, crypto_1.sha256_sync)("TON").toString("hex")}`),
                chainId: 65534n, // TON Mainnet
                chainName: "ton",
                stonApiUrl: "https://api.ston.fi/",
                stonRouterAddress: "EQBjM7B2PKa82IPKrUFbMFaKeQDFGTMRnrvY1TmptC7Kxz7B",
                pTonAddress: "EQBnGWMCf3-FZZq1W4IWcWiGAc3PHuZ0_H-7sad2oY00o83S"
            },
            multisigParams: {
                rpcs: rpcs_1.MainnetRPCUri.POLYGON,
                ab: ethers_1.ethers.getAddress("0xaCADE1aBb88C13403b22b1f7EAB70A8062bcA374"),
            }
        };
    }
    ChainFactoryConfigs.MainNet = MainNet;
    function TestNet() {
        return {
            tonParams: {
                addressBook: core_1.Address.parse("EQDI0bpR2Qv-_4kuh2RT0lndPsZJATIr3SitkrT7BTUT0Mx1"),
                rpcs: ["https://testnet-ton-node.emmet.finance/jsonRPC"],
                nativeTokenId: BigInt(`0x${(0, crypto_1.sha256_sync)("TON").toString("hex")}`),
                chainId: 65535n, // TON Testnet
                chainName: "tonTestnet",
                stonApiUrl: "https://api.ston.fi/",
                stonRouterAddress: "kQCas2p939ESyXM_BzFJzcIe3GD5S0tbjJDj6EBVn-SPsEkN",
                pTonAddress: "kQDwpyxrmYQlGDViPk-oqP4XK6J11I-bx7fJAlQCWmJB4m74",
            },
            bscParams: {
                chainName: "bscTestnet",
                addressBook: ethers_1.ethers.getAddress("0x3564336Ad556295A368EEa2b2CA1a7D3f43B4029"),
                nativeCoin: "BNB",
                rpcs: rpcs_1.TestNetRpcUri.BSC,
            },
            onlylayerParams: {
                chainName: "onlylayerTestnet",
                addressBook: ethers_1.ethers.getAddress("0x6b30f76CecE9F92D27f0e9Ad78312E77709E74A5"),
                nativeCoin: "ETH",
                rpcs: rpcs_1.TestNetRpcUri.ONLYLAYER,
            },
            berachainParams: {
                chainName: "berachainBarito",
                addressBook: ethers_1.ethers.getAddress("0x6b30f76CecE9F92D27f0e9Ad78312E77709E74A5"),
                nativeCoin: "BERA",
                rpcs: rpcs_1.TestNetRpcUri.BERACHAIN,
            },
            polygonParams: {
                addressBook: ethers_1.ethers.getAddress("0x8d948925A0CB920c965C3296Eb4aef31EfE32ce9"),
                rpcs: rpcs_1.TestNetRpcUri.POLYGON,
                // oracle: ethers.getAddress("0x95DB799744A5b36D6E7BE9AD3b451dBC5b8De673"),
                chainName: "polygon",
                nativeCoin: "MATIC",
            },
            ethParams: {
                addressBook: ethers_1.ethers.getAddress("0x8b87FE2b3f3D9816432b34D5A6a30B1330594082"),
                chainName: "sepolia",
                nativeCoin: "ETH",
                rpcs: rpcs_1.TestNetRpcUri.ETH,
            },
            multisigParams: {
                rpcs: rpcs_1.TestNetRpcUri.ETH,
                ab: ethers_1.ethers.getAddress("0x8b87FE2b3f3D9816432b34D5A6a30B1330594082"),
            },
        };
    }
    ChainFactoryConfigs.TestNet = TestNet;
})(ChainFactoryConfigs || (exports.ChainFactoryConfigs = ChainFactoryConfigs = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlnLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2ZhY3RvcnkvY29uZmlnLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLG1DQUFnQztBQUNoQyxpQ0FBc0Q7QUFDdEQsb0NBQW9DO0FBQ3BDLHdDQUEwQztBQUc3QixRQUFBLE9BQU8sR0FBVyxXQUFXLENBQUE7QUFDN0IsUUFBQSxPQUFPLEdBQVcsQ0FBQyxDQUFDO0FBRWpDLElBQWlCLG1CQUFtQixDQTZHbkM7QUE3R0QsV0FBaUIsbUJBQW1CO0lBQ2xDLFNBQWdCLE9BQU87UUFDckIsT0FBTztZQUNMLFVBQVUsRUFBRTtnQkFDVixXQUFXLEVBQUUsZUFBTSxDQUFDLFVBQVUsQ0FDNUIsNENBQTRDLENBQzdDO2dCQUNELE9BQU8sRUFBRSxLQUFLO2dCQUNkLFNBQVMsRUFBRSxXQUFXO2dCQUN0QixVQUFVLEVBQUUsTUFBTTtnQkFDbEIsSUFBSSxFQUFFLG9CQUFhLENBQUMsU0FBUzthQUM5QjtZQUNELFNBQVMsRUFBRTtnQkFDVCxXQUFXLEVBQUUsZUFBTSxDQUFDLFVBQVUsQ0FDNUIsNENBQTRDLENBQzdDO2dCQUNELE9BQU8sRUFBRSxFQUFFO2dCQUNYLFNBQVMsRUFBQyxLQUFLO2dCQUNmLFVBQVUsRUFBRSxLQUFLO2dCQUNqQixJQUFJLEVBQUUsb0JBQWEsQ0FBQyxHQUFHO2FBQ3hCO1lBQ0QsYUFBYSxFQUFFO2dCQUNiLFdBQVcsRUFBRSxlQUFNLENBQUMsVUFBVSxDQUM1Qiw0Q0FBNEMsQ0FDN0M7Z0JBQ0QsT0FBTyxFQUFFLEdBQUc7Z0JBQ1osU0FBUyxFQUFFLFNBQVM7Z0JBQ3BCLFVBQVUsRUFBRSxPQUFPO2dCQUNuQixJQUFJLEVBQUUsb0JBQWEsQ0FBQyxPQUFPO2FBQzVCO1lBQ0QsU0FBUyxFQUFDO2dCQUNSLFdBQVcsRUFBRSxjQUFPLENBQUMsS0FBSyxDQUFDLGtEQUFrRCxDQUFDO2dCQUM5RSxJQUFJLEVBQUU7b0JBQ0osK0dBQStHO2lC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