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
            },
            polygonParams: {
                contract: ethers_1.ethers.getAddress("0x379388Ae42f2EeE0CD30B89541CFaf90843F8762"),
                provider: new ethers_1.JsonRpcProvider(rpcs_1.TestNetRpcUri.POLYGON),
            },
        };
    }
    ChainFactoryConfigs.TestNet = TestNet;
})(ChainFactoryConfigs || (exports.ChainFactoryConfigs = ChainFactoryConfigs = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlnLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2ZhY3RvcnkvY29uZmlnLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLG1DQUFpRDtBQUNqRCxpQ0FBdUM7QUFDdkMsb0NBQW9DO0FBQ3BDLGtDQUFxQztBQUNyQyx3Q0FBMEM7QUFHMUMsSUFBaUIsbUJBQW1CLENBb0JuQztBQXBCRCxXQUFpQixtQkFBbUI7SUFDbEMsU0FBZ0IsT0FBTztRQUNyQixPQUFPO1lBQ0wsU0FBUyxFQUFFO2dCQUNULE1BQU0sRUFBRSxjQUFPLENBQUMsS0FBSyxDQUNuQixrREFBa0QsQ0FDbkQ7Z0JBQ0QsTUFBTSxFQUFFLElBQUksZUFBUyxDQUFDO29CQUNwQixRQUFRLEVBQUUsOENBQThDO2lCQUN6RCxDQUFDO2dCQUNGLGFBQWEsRUFBRSxNQUFNLENBQUMsS0FBSyxJQUFBLG9CQUFXLEVBQUMsS0FBSyxDQUFDLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUM7YUFDakU7WUFDRCxhQUFhLEVBQUU7Z0JBQ2IsUUFBUSxFQUFFLGVBQU0sQ0FBQyxVQUFVLENBQ3pCLDRDQUE0QyxDQUM3QztnQkFDRCxRQUFRLEVBQUUsSUFBSSx3QkFBZSxDQUFDLG9CQUFhLENBQUMsT0FBTyxDQUFDO2FBQ3JEO1NBQzZCLENBQUM7SUFDbkMsQ0FBQztJQWxCZSwyQkFBTyxVQWtCdEIsQ0FBQTtBQUNILENBQUMsRUFwQmdCLG1CQUFtQixtQ0FBbkIsbUJBQW1CLFFBb0JuQyJ9