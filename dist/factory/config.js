"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChainFactoryConfigs = void 0;
const ethers_1 = require("ethers");
const rpcs_1 = require("./rpcs");
const core_1 = require("@ton/core");
const crypto_1 = require("@ton/crypto");
var ChainFactoryConfigs;
(function (ChainFactoryConfigs) {
    function MainNet() {
        return {
            avaxParams: {
                chainName: "avalanche",
                addressBook: ethers_1.ethers.getAddress("0xcCa50e985e4e9a2a9668fA3aA8EbC2568E6a6060"),
                nativeCoin: "AVAX",
                rpcs: rpcs_1.MainnetRPCUri.AVALANCHE
            },
            polygonParams: {
                chainName: "polygon",
                addressBook: ethers_1.ethers.getAddress("0xaCADE1aBb88C13403b22b1f7EAB70A8062bcA374"),
                nativeCoin: "MATIC",
                rpcs: rpcs_1.MainnetRPCUri.POLYGON
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlnLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2ZhY3RvcnkvY29uZmlnLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLG1DQUFnQztBQUNoQyxpQ0FBc0Q7QUFDdEQsb0NBQW9DO0FBQ3BDLHdDQUEwQztBQUcxQyxJQUFpQixtQkFBbUIsQ0FrRm5DO0FBbEZELFdBQWlCLG1CQUFtQjtJQUNsQyxTQUFnQixPQUFPO1FBQ3JCLE9BQU87WUFDTCxVQUFVLEVBQUU7Z0JBQ1YsU0FBUyxFQUFFLFdBQVc7Z0JBQ3RCLFdBQVcsRUFBRSxlQUFNLENBQUMsVUFBVSxDQUM1Qiw0Q0FBNEMsQ0FDN0M7Z0JBQ0QsVUFBVSxFQUFFLE1BQU07Z0JBQ2xCLElBQUksRUFBRSxvQkFBYSxDQUFDLFNBQVM7YUFDOUI7WUFDRCxhQUFhLEVBQUU7Z0JBQ2IsU0FBUyxFQUFFLFNBQVM7Z0JBQ3BCLFdBQVcsRUFBRSxlQUFNLENBQUMsVUFBVSxDQUM1Qiw0Q0FBNEMsQ0FDN0M7Z0JBQ0QsVUFBVSxFQUFFLE9BQU87Z0JBQ25CLElBQUksRUFBRSxvQkFBYSxDQUFDLE9BQU87YUFDNUI7U0FDNkIsQ0FBQztJQUNuQyxDQUFDO0lBbkJlLDJCQUFPLFVBbUJ0QixDQUFBO0lBQ0QsU0FBZ0IsT0FBTztRQUNyQixPQUFPO1lBQ0wsU0FBUyxFQUFFO2dCQUNULFdBQVcsRUFBRSxjQUFPLENBQUMsS0FBSyxDQUN4QixrREFBa0QsQ0FDbkQ7Z0JBQ0QsSUFBSSxFQUFFLENBQUMsZ0RBQWdELENBQUM7Z0JBQ3hELGFBQWEsRUFBRSxNQUFNLENBQUMsS0FBSyxJQUFBLG9CQUFXLEVBQUMsS0FBSyxDQUFDLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUM7Z0JBQ2hFLE9BQU8sRUFBRSxNQUFNLEVBQUUsY0FBYztnQkFDL0IsU0FBUyxFQUFFLFlBQVk7Z0JBQ3ZCLFVBQVUsRUFBRSxzQkFBc0I7Z0JBQ2xDLGlCQUFpQixFQUFFLGtEQUFrRDtnQkFDckUsV0FBVyxFQUFFLGtEQUFrRDthQUNoRTtZQUNELFNBQVMsRUFBRTtnQkFDVCxTQUFTLEVBQUUsWUFBWTtnQkFDdkIsV0FBVyxFQUFFLGVBQU0sQ0FBQyxVQUFVLENBQzVCLDRDQUE0QyxDQUM3QztnQkFDRCxVQUFVLEVBQUUsS0FBSztnQkFDakIsSUFBSSxFQUFFLG9CQUFhLENBQUMsR0FBRzthQUN4QjtZQUNELGVBQWUsRUFBRTtnQkFDZixTQUFTLEVBQUUsa0JBQWtCO2dCQUM3QixXQUFXLEVBQUUsZUFBTSxDQUFDLFVBQVUsQ0FDNUIsNENBQTRDLENBQzdDO2dCQUNELFVBQVUsRUFBRSxLQUFLO2dCQUNqQixJQUFJLEVBQUUsb0JBQWEsQ0FBQyxTQUFTO2FBQzlCO1lBQ0QsZUFBZSxFQUFFO2dCQUNmLFNBQVMsRUFBRSxpQkFBaUI7Z0JBQzVCLFdBQVcsRUFBRSxlQUFNLENBQUMsVUFBVSxDQUM1Qiw0Q0FBNEMsQ0FDN0M7Z0JBQ0QsVUFBVSxFQUFFLE1BQU07Z0JBQ2xCLElBQUksRUFBRSxvQkFBYSxDQUFDLFNBQVM7YUFDOUI7WUFDRCxhQUFhLEVBQUU7Z0JBQ2IsV0FBVyxFQUFFLGVBQU0sQ0FBQyxVQUFVLENBQzVCLDRDQUE0QyxDQUM3QztnQkFDRCxJQUFJLEVBQUUsb0JBQWEsQ0FBQyxPQUFPO2dCQUMzQiwyRUFBMkU7Z0JBQzNFLFNBQVMsRUFBRSxTQUFTO2dCQUNwQixVQUFVLEVBQUUsT0FBTzthQUNwQjtZQUNELFNBQVMsRUFBRTtnQkFDVCxXQUFXLEVBQUUsZUFBTSxDQUFDLFVBQVUsQ0FDNUIsNENBQTRDLENBQzdDO2dCQUNELFNBQVMsRUFBRSxTQUFTO2dCQUNwQixVQUFVLEVBQUUsS0FBSztnQkFDakIsSUFBSSxFQUFFLG9CQUFhLENBQUMsR0FBRzthQUN4QjtZQUNELGNBQWMsRUFBRTtnQkFDZCxJQUFJLEVBQUUsb0JBQWEsQ0FBQyxHQUFHO2dCQUN2QixFQUFFLEVBQUUsZUFBTSxDQUFDLFVBQVUsQ0FBQyw0Q0FBNEMsQ0FBQzthQUNwRTtTQUM2QixDQUFDO0lBQ25DLENBQUM7SUE1RGUsMkJBQU8sVUE0RHRCLENBQUE7QUFDSCxDQUFDLEVBbEZnQixtQkFBbUIsbUNBQW5CLG1CQUFtQixRQWtGbkMifQ==