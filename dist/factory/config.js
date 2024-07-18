"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChainFactoryConfigs = void 0;
const ethers_1 = require("ethers");
const rpcs_1 = require("./rpcs");
const core_1 = require("@ton/core");
const ton_1 = require("@ton/ton");
const crypto_1 = require("@ton/crypto");
var ChainFactoryConfigs;
(function (ChainFactoryConfigs) {
    function TestNet() {
        return {
            tonParams: {
                bridge: core_1.Address.parse("kQD6Kjw_WiGJ1SFhHWa7vxbHDR8A694Te6Vl5xYKfubm5EyS"),
                client: new ton_1.TonClient({
                    endpoint: "https://testnet-ton-node.emmet.finance/jsonRPC",
                    apiKey: "9e899d38874458e92addb70d6f336ccbe51e21e378af5797486ba9a9d1a3c5c3",
                }),
                nativeTokenId: BigInt(`0x${(0, crypto_1.sha256_sync)("TON").toString("hex")}`),
                oracle: core_1.Address.parse("EQAx41_27fvdX4C30RxQmzbiLeHyO090XzGHBadgGfdp5Uqd"),
                chainId: 65535n, // TON Testnet
                burner: core_1.Address.parse("EQBtE7sxSqbDZwuWhxxQRzSZZ3UAm8j4mhR25iWS2xfEmZ6D"),
                chainName: "tonTestnet",
            },
            bscParams: {
                chainName: "bscTestnet",
                addressBook: ethers_1.ethers.getAddress("0x3564336Ad556295A368EEa2b2CA1a7D3f43B4029"),
                nativeCoin: "BNB",
                provider: new ethers_1.JsonRpcProvider(rpcs_1.TestNetRpcUri.BSC),
            },
            onlylayerParams: {
                chainName: "onlylayerTestnet",
                addressBook: ethers_1.ethers.getAddress("0x6b30f76CecE9F92D27f0e9Ad78312E77709E74A5"),
                nativeCoin: "ETH",
                provider: new ethers_1.JsonRpcProvider(rpcs_1.TestNetRpcUri.ONLYLAYER),
            },
            berachainParams: {
                chainName: "berachainBarito",
                addressBook: ethers_1.ethers.getAddress("0x6b30f76CecE9F92D27f0e9Ad78312E77709E74A5"),
                nativeCoin: "BERA",
                provider: new ethers_1.JsonRpcProvider(rpcs_1.TestNetRpcUri.BERACHAIN),
            },
            polygonParams: {
                addressBook: ethers_1.ethers.getAddress("0x8d948925A0CB920c965C3296Eb4aef31EfE32ce9"),
                provider: new ethers_1.JsonRpcProvider(rpcs_1.TestNetRpcUri.POLYGON),
                // oracle: ethers.getAddress("0x95DB799744A5b36D6E7BE9AD3b451dBC5b8De673"),
                chainName: "polygon",
                nativeCoin: "MATIC",
            },
            ethParams: {
                addressBook: ethers_1.ethers.getAddress("0x8b87FE2b3f3D9816432b34D5A6a30B1330594082"),
                chainName: "sepolia",
                nativeCoin: "ETH",
                provider: new ethers_1.JsonRpcProvider(rpcs_1.TestNetRpcUri.ETH),
            },
            multisigParams: {
                provider: new ethers_1.JsonRpcProvider(rpcs_1.TestNetRpcUri.ETH),
                ab: ethers_1.ethers.getAddress("0x8b87FE2b3f3D9816432b34D5A6a30B1330594082"),
            },
        };
    }
    ChainFactoryConfigs.TestNet = TestNet;
})(ChainFactoryConfigs || (exports.ChainFactoryConfigs = ChainFactoryConfigs = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlnLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2ZhY3RvcnkvY29uZmlnLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLG1DQUFpRDtBQUNqRCxpQ0FBdUM7QUFDdkMsb0NBQW9DO0FBQ3BDLGtDQUFxQztBQUNyQyx3Q0FBMEM7QUFHMUMsSUFBaUIsbUJBQW1CLENBcUVuQztBQXJFRCxXQUFpQixtQkFBbUI7SUFDbEMsU0FBZ0IsT0FBTztRQUNyQixPQUFPO1lBQ0wsU0FBUyxFQUFFO2dCQUNULE1BQU0sRUFBRSxjQUFPLENBQUMsS0FBSyxDQUNuQixrREFBa0QsQ0FDbkQ7Z0JBQ0QsTUFBTSxFQUFFLElBQUksZUFBUyxDQUFDO29CQUNwQixRQUFRLEVBQUUsZ0RBQWdEO29CQUMxRCxNQUFNLEVBQ0osa0VBQWtFO2lCQUNyRSxDQUFDO2dCQUNGLGFBQWEsRUFBRSxNQUFNLENBQUMsS0FBSyxJQUFBLG9CQUFXLEVBQUMsS0FBSyxDQUFDLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUM7Z0JBQ2hFLE1BQU0sRUFBRSxjQUFPLENBQUMsS0FBSyxDQUNuQixrREFBa0QsQ0FDbkQ7Z0JBQ0QsT0FBTyxFQUFFLE1BQU0sRUFBRSxjQUFjO2dCQUMvQixNQUFNLEVBQUUsY0FBTyxDQUFDLEtBQUssQ0FDbkIsa0RBQWtELENBQ25EO2dCQUNELFNBQVMsRUFBRSxZQUFZO2FBQ3hCO1lBQ0QsU0FBUyxFQUFFO2dCQUNULFNBQVMsRUFBRSxZQUFZO2dCQUN2QixXQUFXLEVBQUUsZUFBTSxDQUFDLFVBQVUsQ0FDNUIsNENBQTRDLENBQzdDO2dCQUNELFVBQVUsRUFBRSxLQUFLO2dCQUNqQixRQUFRLEVBQUUsSUFBSSx3QkFBZSxDQUFDLG9CQUFhLENBQUMsR0FBRyxDQUFDO2FBQ2pEO1lBQ0QsZUFBZSxFQUFFO2dCQUNmLFNBQVMsRUFBRSxrQkFBa0I7Z0JBQzdCLFdBQVcsRUFBRSxlQUFNLENBQUMsVUFBVSxDQUM1Qiw0Q0FBNEMsQ0FDN0M7Z0JBQ0QsVUFBVSxFQUFFLEtBQUs7Z0JBQ2pCLFFBQVEsRUFBRSxJQUFJLHdCQUFlLENBQUMsb0JBQWEsQ0FBQyxTQUFTLENBQUM7YUFDdkQ7WUFDRCxlQUFlLEVBQUU7Z0JBQ2YsU0FBUyxFQUFFLGlCQUFpQjtnQkFDNUIsV0FBVyxFQUFFLGVBQU0sQ0FBQyxVQUFVLENBQzVCLDRDQUE0QyxDQUM3QztnQkFDRCxVQUFVLEVBQUUsTUFBTTtnQkFDbEIsUUFBUSxFQUFFLElBQUksd0JBQWUsQ0FBQyxvQkFBYSxDQUFDLFNBQVMsQ0FBQzthQUN2RDtZQUNELGFBQWEsRUFBRTtnQkFDYixXQUFXLEVBQUUsZUFBTSxDQUFDLFVBQVUsQ0FDNUIsNENBQTRDLENBQzdDO2dCQUNELFFBQVEsRUFBRSxJQUFJLHdCQUFlLENBQUMsb0JBQWEsQ0FBQyxPQUFPLENBQUM7Z0JBQ3BELDJFQUEyRTtnQkFDM0UsU0FBUyxFQUFFLFNBQVM7Z0JBQ3BCLFVBQVUsRUFBRSxPQUFPO2FBQ3BCO1lBQ0QsU0FBUyxFQUFFO2dCQUNULFdBQVcsRUFBRSxlQUFNLENBQUMsVUFBVSxDQUM1Qiw0Q0FBNEMsQ0FDN0M7Z0JBQ0QsU0FBUyxFQUFFLFNBQVM7Z0JBQ3BCLFVBQVUsRUFBRSxLQUFLO2dCQUNqQixRQUFRLEVBQUUsSUFBSSx3QkFBZSxDQUFDLG9CQUFhLENBQUMsR0FBRyxDQUFDO2FBQ2pEO1lBQ0QsY0FBYyxFQUFFO2dCQUNkLFFBQVEsRUFBRSxJQUFJLHdCQUFlLENBQUMsb0JBQWEsQ0FBQyxHQUFHLENBQUM7Z0JBQ2hELEVBQUUsRUFBRSxlQUFNLENBQUMsVUFBVSxDQUFDLDRDQUE0QyxDQUFDO2FBQ3BFO1NBQzZCLENBQUM7SUFDbkMsQ0FBQztJQW5FZSwyQkFBTyxVQW1FdEIsQ0FBQTtBQUNILENBQUMsRUFyRWdCLG1CQUFtQixtQ0FBbkIsbUJBQW1CLFFBcUVuQyJ9