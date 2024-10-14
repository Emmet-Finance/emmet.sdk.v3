"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CHAIN_INFO = void 0;
const types_1 = require("../factory/types");
const ton_1 = require("./ton");
const web3_1 = require("./web3");
exports.CHAIN_INFO = new Map();
exports.CHAIN_INFO.set(types_1.Chain.ARBITRUM, {
    constructor: web3_1.web3Helper,
    decimals: 18,
    name: "Arbitrum",
    nonce: types_1.Chain.ARBITRUM
});
exports.CHAIN_INFO.set(types_1.Chain.AVALANCHE, {
    constructor: web3_1.web3Helper,
    decimals: 18,
    name: "Avalanche",
    nonce: types_1.Chain.AVALANCHE
});
exports.CHAIN_INFO.set(types_1.Chain.BERACHAIN, {
    constructor: web3_1.web3Helper,
    decimals: 18,
    name: "Berachain",
    nonce: types_1.Chain.BERACHAIN,
});
exports.CHAIN_INFO.set(types_1.Chain.BASE, {
    constructor: web3_1.web3Helper,
    decimals: 18,
    name: "BASE",
    nonce: types_1.Chain.BASE
});
exports.CHAIN_INFO.set(types_1.Chain.BSC, {
    constructor: web3_1.web3Helper,
    decimals: 18,
    name: "BSC",
    nonce: types_1.Chain.BSC,
});
exports.CHAIN_INFO.set(types_1.Chain.ETHEREUM, {
    constructor: web3_1.web3Helper,
    decimals: 18,
    name: "Ethereum",
    nonce: types_1.Chain.ETHEREUM,
});
exports.CHAIN_INFO.set(types_1.Chain.ONLYLAYER, {
    constructor: web3_1.web3Helper,
    decimals: 18,
    name: "Only Layer",
    nonce: types_1.Chain.ONLYLAYER,
});
exports.CHAIN_INFO.set(types_1.Chain.OPTIMISM, {
    constructor: web3_1.web3Helper,
    decimals: 18,
    name: "Optimism",
    nonce: types_1.Chain.OPTIMISM
});
exports.CHAIN_INFO.set(types_1.Chain.POLYGON, {
    constructor: web3_1.web3Helper,
    decimals: 18,
    name: "Polygon",
    nonce: types_1.Chain.POLYGON,
});
exports.CHAIN_INFO.set(types_1.Chain.TON, {
    decimals: 18,
    name: "Ton",
    nonce: types_1.Chain.TON,
    constructor: async (...args) => (0, ton_1.tonHandler)(...args),
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ2hhaW5JbmZvLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2NoYWlucy9DaGFpbkluZm8udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsNENBQW9EO0FBQ3BELCtCQUFtQztBQUNuQyxpQ0FBb0M7QUFFdkIsUUFBQSxVQUFVLEdBQWMsSUFBSSxHQUFHLEVBQUUsQ0FBQztBQUUvQyxrQkFBVSxDQUFDLEdBQUcsQ0FBQyxhQUFLLENBQUMsUUFBUSxFQUFFO0lBQzdCLFdBQVcsRUFBRSxpQkFBVTtJQUN2QixRQUFRLEVBQUUsRUFBRTtJQUNaLElBQUksRUFBRSxVQUFVO0lBQ2hCLEtBQUssRUFBRSxhQUFLLENBQUMsUUFBUTtDQUN0QixDQUFDLENBQUM7QUFFSCxrQkFBVSxDQUFDLEdBQUcsQ0FBQyxhQUFLLENBQUMsU0FBUyxFQUFFO0lBQzlCLFdBQVcsRUFBRSxpQkFBVTtJQUN2QixRQUFRLEVBQUUsRUFBRTtJQUNaLElBQUksRUFBRSxXQUFXO0lBQ2pCLEtBQUssRUFBRSxhQUFLLENBQUMsU0FBUztDQUN2QixDQUFDLENBQUM7QUFFSCxrQkFBVSxDQUFDLEdBQUcsQ0FBQyxhQUFLLENBQUMsU0FBUyxFQUFFO0lBQzlCLFdBQVcsRUFBRSxpQkFBVTtJQUN2QixRQUFRLEVBQUUsRUFBRTtJQUNaLElBQUksRUFBRSxXQUFXO0lBQ2pCLEtBQUssRUFBRSxhQUFLLENBQUMsU0FBUztDQUN2QixDQUFDLENBQUM7QUFFSCxrQkFBVSxDQUFDLEdBQUcsQ0FBQyxhQUFLLENBQUMsSUFBSSxFQUFFO0lBQ3pCLFdBQVcsRUFBRSxpQkFBVTtJQUN2QixRQUFRLEVBQUUsRUFBRTtJQUNaLElBQUksRUFBRSxNQUFNO0lBQ1osS0FBSyxFQUFFLGFBQUssQ0FBQyxJQUFJO0NBQ2xCLENBQUMsQ0FBQztBQUVILGtCQUFVLENBQUMsR0FBRyxDQUFDLGFBQUssQ0FBQyxHQUFHLEVBQUU7SUFDeEIsV0FBVyxFQUFFLGlCQUFVO0lBQ3ZCLFFBQVEsRUFBRSxFQUFFO0lBQ1osSUFBSSxFQUFFLEtBQUs7SUFDWCxLQUFLLEVBQUUsYUFBSyxDQUFDLEdBQUc7Q0FDakIsQ0FBQyxDQUFDO0FBRUgsa0JBQVUsQ0FBQyxHQUFHLENBQUMsYUFBSyxDQUFDLFFBQVEsRUFBRTtJQUM3QixXQUFXLEVBQUUsaUJBQVU7SUFDdkIsUUFBUSxFQUFFLEVBQUU7SUFDWixJQUFJLEVBQUUsVUFBVTtJQUNoQixLQUFLLEVBQUUsYUFBSyxDQUFDLFFBQVE7Q0FDdEIsQ0FBQyxDQUFDO0FBRUgsa0JBQVUsQ0FBQyxHQUFHLENBQUMsYUFBSyxDQUFDLFNBQVMsRUFBRTtJQUM5QixXQUFXLEVBQUUsaUJBQVU7SUFDdkIsUUFBUSxFQUFFLEVBQUU7SUFDWixJQUFJLEVBQUUsWUFBWTtJQUNsQixLQUFLLEVBQUUsYUFBSyxDQUFDLFNBQVM7Q0FDdkIsQ0FBQyxDQUFDO0FBRUgsa0JBQVUsQ0FBQyxHQUFHLENBQUMsYUFBSyxDQUFDLFFBQVEsRUFBRTtJQUM3QixXQUFXLEVBQUUsaUJBQVU7SUFDdkIsUUFBUSxFQUFFLEVBQUU7SUFDWixJQUFJLEVBQUUsVUFBVTtJQUNoQixLQUFLLEVBQUUsYUFBSyxDQUFDLFFBQVE7Q0FDdEIsQ0FBQyxDQUFDO0FBRUgsa0JBQVUsQ0FBQyxHQUFHLENBQUMsYUFBSyxDQUFDLE9BQU8sRUFBRTtJQUM1QixXQUFXLEVBQUUsaUJBQVU7SUFDdkIsUUFBUSxFQUFFLEVBQUU7SUFDWixJQUFJLEVBQUUsU0FBUztJQUNmLEtBQUssRUFBRSxhQUFLLENBQUMsT0FBTztDQUNyQixDQUFDLENBQUM7QUFFSCxrQkFBVSxDQUFDLEdBQUcsQ0FBQyxhQUFLLENBQUMsR0FBRyxFQUFFO0lBQ3hCLFFBQVEsRUFBRSxFQUFFO0lBQ1osSUFBSSxFQUFFLEtBQUs7SUFDWCxLQUFLLEVBQUUsYUFBSyxDQUFDLEdBQUc7SUFDaEIsV0FBVyxFQUFFLEtBQUssRUFBRSxHQUFHLElBQUksRUFBRSxFQUFFLENBQUMsSUFBQSxnQkFBVSxFQUFDLEdBQUcsSUFBSSxDQUFDO0NBQ3BELENBQUMsQ0FBQyJ9