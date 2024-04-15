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
                bridge: core_1.Address.parse("EQAB_H1ffzTxxowHfepvk6Vry90awbY5xAtZ8F8jQnK50-EN"),
                client: new ton_1.TonClient({
                    endpoint: "https://testnet.toncenter.com/api/v2/jsonRPC",
                }),
                nativeTokenId: BigInt(`0x${(0, crypto_1.sha256_sync)("TON").toString("hex")}`),
                oracle: core_1.Address.parse("EQAx41_27fvdX4C30RxQmzbiLeHyO090XzGHBadgGfdp5Uqd"),
                burner: core_1.Address.parse("EQBtE7sxSqbDZwuWhxxQRzSZZ3UAm8j4mhR25iWS2xfEmZ6D"),
            },
            polygonParams: {
                contract: ethers_1.ethers.getAddress("0x379388Ae42f2EeE0CD30B89541CFaf90843F8762"),
                provider: new ethers_1.JsonRpcProvider(rpcs_1.TestNetRpcUri.POLYGON),
                oracle: ethers_1.ethers.getAddress("0x95DB799744A5b36D6E7BE9AD3b451dBC5b8De673"),
            },
        };
    }
    ChainFactoryConfigs.TestNet = TestNet;
})(ChainFactoryConfigs || (exports.ChainFactoryConfigs = ChainFactoryConfigs = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlnLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2ZhY3RvcnkvY29uZmlnLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLG1DQUFpRDtBQUNqRCxpQ0FBdUM7QUFDdkMsb0NBQW9DO0FBQ3BDLGtDQUFxQztBQUNyQyx3Q0FBMEM7QUFHMUMsSUFBaUIsbUJBQW1CLENBMkJuQztBQTNCRCxXQUFpQixtQkFBbUI7SUFDbEMsU0FBZ0IsT0FBTztRQUNyQixPQUFPO1lBQ0wsU0FBUyxFQUFFO2dCQUNULE1BQU0sRUFBRSxjQUFPLENBQUMsS0FBSyxDQUNuQixrREFBa0QsQ0FDbkQ7Z0JBQ0QsTUFBTSxFQUFFLElBQUksZUFBUyxDQUFDO29CQUNwQixRQUFRLEVBQUUsOENBQThDO2lCQUN6RCxDQUFDO2dCQUNGLGFBQWEsRUFBRSxNQUFNLENBQUMsS0FBSyxJQUFBLG9CQUFXLEVBQUMsS0FBSyxDQUFDLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUM7Z0JBQ2hFLE1BQU0sRUFBRSxjQUFPLENBQUMsS0FBSyxDQUNuQixrREFBa0QsQ0FDbkQ7Z0JBQ0QsTUFBTSxFQUFFLGNBQU8sQ0FBQyxLQUFLLENBQ25CLGtEQUFrRCxDQUNuRDthQUNGO1lBQ0QsYUFBYSxFQUFFO2dCQUNiLFFBQVEsRUFBRSxlQUFNLENBQUMsVUFBVSxDQUN6Qiw0Q0FBNEMsQ0FDN0M7Z0JBQ0QsUUFBUSxFQUFFLElBQUksd0JBQWUsQ0FBQyxvQkFBYSxDQUFDLE9BQU8sQ0FBQztnQkFDcEQsTUFBTSxFQUFFLGVBQU0sQ0FBQyxVQUFVLENBQUMsNENBQTRDLENBQUM7YUFDeEU7U0FDNkIsQ0FBQztJQUNuQyxDQUFDO0lBekJlLDJCQUFPLFVBeUJ0QixDQUFBO0FBQ0gsQ0FBQyxFQTNCZ0IsbUJBQW1CLG1DQUFuQixtQkFBbUIsUUEyQm5DIn0=