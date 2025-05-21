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
                addressBook: ethers_1.ethers.getAddress("0x072C8752Ba7e79617A6a64Db6a5756eBc4fFc503"),
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
            mantaParams: {
                addressBook: ethers_1.ethers.getAddress("0x03C81f858B294c8499195A1371FE7A58B522f2D8"),
                chainId: 169,
                chainName: "manta",
                nativeCoin: "MANTA",
                rpcs: rpcs_1.MainnetRPCUri.MANTA
            },
            polygonParams: {
                addressBook: ethers_1.ethers.getAddress("0x9485A5992766b14898149272D18Ae41e3Ffc36Bc"),
                chainId: 137,
                chainName: "polygon",
                nativeCoin: "MATIC",
                rpcs: rpcs_1.MainnetRPCUri.POLYGON
            },
            songbirdParams: {
                addressBook: "0x4f5617EAECA9A55A68b0c1Daf750fB751d3FF3b9",
                chainId: 19,
                chainName: "songbird",
                nativeCoin: "SGB",
                rpcs: rpcs_1.MainnetRPCUri.SONGBIRD
            },
            tonParams: {
                addressBook: core_1.Address.parse("EQB_pf7BP7jobq2QEbhVsXxU4pGsQVdqx-X5F8YU4jGlyCIQ"),
                rpcs: rpcs_1.MainnetRPCUri.TON,
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlnLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2ZhY3RvcnkvY29uZmlnLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLG1DQUFnQztBQUNoQyxpQ0FBc0Q7QUFDdEQsb0NBQW9DO0FBQ3BDLHdDQUEwQztBQUc3QixRQUFBLE9BQU8sR0FBVyxXQUFXLENBQUE7QUFDN0IsUUFBQSxPQUFPLEdBQVcsQ0FBQyxDQUFDO0FBRWpDLElBQWlCLG1CQUFtQixDQTJIbkM7QUEzSEQsV0FBaUIsbUJBQW1CO0lBQ2xDLFNBQWdCLE9BQU87UUFDckIsT0FBTztZQUNMLFVBQVUsRUFBRTtnQkFDVixXQUFXLEVBQUUsZUFBTSxDQUFDLFVBQVUsQ0FDNUIsNENBQTRDLENBQzdDO2dCQUNELE9BQU8sRUFBRSxLQUFLO2dCQUNkLFNBQVMsRUFBRSxXQUFXO2dCQUN0QixVQUFVLEVBQUUsTUFBTTtnQkFDbEIsSUFBSSxFQUFFLG9CQUFhLENBQUMsU0FBUzthQUM5QjtZQUNELFNBQVMsRUFBRTtnQkFDVCxXQUFXLEVBQUUsZUFBTSxDQUFDLFVBQVUsQ0FDNUIsNENBQTRDLENBQzdDO2dCQUNELE9BQU8sRUFBRSxFQUFFO2dCQUNYLFNBQVMsRUFBQyxLQUFLO2dCQUNmLFVBQVUsRUFBRSxLQUFLO2dCQUNqQixJQUFJLEVBQUUsb0JBQWEsQ0FBQyxHQUFHO2FBQ3hCO1lBQ0QsV0FBVyxFQUFFO2dCQUNYLFdBQVcsRUFBRSxlQUFNLENBQUMsVUFBVSxDQUM1Qiw0Q0FBNEMsQ0FDN0M7Z0JBQ0QsT0FBTyxFQUFFLEdBQUc7Z0JBQ1osU0FBUyxFQUFFLE9BQU87Z0JBQ2xCLFVBQVUsRUFBRSxPQUFPO2dCQUNuQixJQUFJLEVBQUUsb0JBQWEsQ0FBQyxLQUFLO2FBQzFCO1lBQ0QsYUFBYSxFQUFFO2dCQUNiLFdBQVcsRUFBRSxlQUFNLENBQUMsVUFBVSxDQUM1Qiw0Q0FBNEMsQ0FDN0M7Z0JBQ0QsT0FBTyxFQUFFLEdBQUc7Z0JBQ1osU0FB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