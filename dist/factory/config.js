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
                bridge: core_1.Address.parse("EQDBRFjItjqx_I-VGeVPRMvsRmCZ11Q--AlTaGWMwP21YEGI"),
                client: new ton_1.TonClient({
                    endpoint: "https://testnet.toncenter.com/api/v2/jsonRPC?api_key=9e899d38874458e92addb70d6f336ccbe51e21e378af5797486ba9a9d1a3c5c3",
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
            polygonParams: {
                addressBook: ethers_1.ethers.getAddress("0xEA844fAF9a240Ac9911c1bd2204cd1536f7859b6"),
                provider: new ethers_1.JsonRpcProvider(rpcs_1.TestNetRpcUri.POLYGON),
                // oracle: ethers.getAddress("0x95DB799744A5b36D6E7BE9AD3b451dBC5b8De673"),
                chainName: "polygon",
                nativeCoin: "MATIC",
            },
            ethParams: {
                addressBook: ethers_1.ethers.getAddress("0x0F416Ea0661BfD7Ffb5b79259Bd98Bd4496a5558"),
                chainName: "sepolia",
                nativeCoin: "ETH",
                provider: new ethers_1.JsonRpcProvider(rpcs_1.TestNetRpcUri.ETH),
            },
            multisigParams: {
                provider: new ethers_1.JsonRpcProvider(rpcs_1.TestNetRpcUri.ETH),
                address: ethers_1.ethers.getAddress("0xcc102b74015F765B619D574283023739153f4cc5"),
            },
        };
    }
    ChainFactoryConfigs.TestNet = TestNet;
})(ChainFactoryConfigs || (exports.ChainFactoryConfigs = ChainFactoryConfigs = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlnLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2ZhY3RvcnkvY29uZmlnLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLG1DQUFpRDtBQUNqRCxpQ0FBdUM7QUFDdkMsb0NBQW9DO0FBQ3BDLGtDQUFxQztBQUNyQyx3Q0FBMEM7QUFHMUMsSUFBaUIsbUJBQW1CLENBd0RuQztBQXhERCxXQUFpQixtQkFBbUI7SUFDbEMsU0FBZ0IsT0FBTztRQUNyQixPQUFPO1lBQ0wsU0FBUyxFQUFFO2dCQUNULE1BQU0sRUFBRSxjQUFPLENBQUMsS0FBSyxDQUNuQixrREFBa0QsQ0FDbkQ7Z0JBQ0QsTUFBTSxFQUFFLElBQUksZUFBUyxDQUFDO29CQUNwQixRQUFRLEVBQ04sdUhBQXVIO29CQUN6SCxNQUFNLEVBQ0osa0VBQWtFO2lCQUNyRSxDQUFDO2dCQUNGLGFBQWEsRUFBRSxNQUFNLENBQUMsS0FBSyxJQUFBLG9CQUFXLEVBQUMsS0FBSyxDQUFDLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUM7Z0JBQ2hFLE1BQU0sRUFBRSxjQUFPLENBQUMsS0FBSyxDQUNuQixrREFBa0QsQ0FDbkQ7Z0JBQ0QsT0FBTyxFQUFFLE1BQU0sRUFBRSxjQUFjO2dCQUMvQixNQUFNLEVBQUUsY0FBTyxDQUFDLEtBQUssQ0FDbkIsa0RBQWtELENBQ25EO2dCQUNELFNBQVMsRUFBRSxZQUFZO2FBQ3hCO1lBQ0QsU0FBUyxFQUFFO2dCQUNULFNBQVMsRUFBRSxZQUFZO2dCQUN2QixXQUFXLEVBQUUsZUFBTSxDQUFDLFVBQVUsQ0FDNUIsNENBQTRDLENBQzdDO2dCQUNELFVBQVUsRUFBRSxLQUFLO2dCQUNqQixRQUFRLEVBQUUsSUFBSSx3QkFBZSxDQUFDLG9CQUFhLENBQUMsR0FBRyxDQUFDO2FBQ2pEO1lBQ0QsYUFBYSxFQUFFO2dCQUNiLFdBQVcsRUFBRSxlQUFNLENBQUMsVUFBVSxDQUM1Qiw0Q0FBNEMsQ0FDN0M7Z0JBQ0QsUUFBUSxFQUFFLElBQUksd0JBQWUsQ0FBQyxvQkFBYSxDQUFDLE9BQU8sQ0FBQztnQkFDcEQsMkVBQTJFO2dCQUMzRSxTQUFTLEVBQUUsU0FBUztnQkFDcEIsVUFBVSxFQUFFLE9BQU87YUFDcEI7WUFDRCxTQUFTLEVBQUU7Z0JBQ1QsV0FBVyxFQUFFLGVBQU0sQ0FBQyxVQUFVLENBQzVCLDRDQUE0QyxDQUM3QztnQkFDRCxTQUFTLEVBQUUsU0FBUztnQkFDcEIsVUFBVSxFQUFFLEtBQUs7Z0JBQ2pCLFFBQVEsRUFBRSxJQUFJLHdCQUFlLENBQUMsb0JBQWEsQ0FBQyxHQUFHLENBQUM7YUFDakQ7WUFDRCxjQUFjLEVBQUU7Z0JBQ2QsUUFBUSxFQUFFLElBQUksd0JBQWUsQ0FBQyxvQkFBYSxDQUFDLEdBQUcsQ0FBQztnQkFDaEQsT0FBTyxFQUFFLGVBQU0sQ0FBQyxVQUFVLENBQ3hCLDRDQUE0QyxDQUM3QzthQUNGO1NBQzZCLENBQUM7SUFDbkMsQ0FBQztJQXREZSwyQkFBTyxVQXNEdEIsQ0FBQTtBQUNILENBQUMsRUF4RGdCLG1CQUFtQixtQ0FBbkIsbUJBQW1CLFFBd0RuQyJ9