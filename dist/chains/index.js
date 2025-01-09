"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.strategyMap = exports.EStrategy = void 0;
var EStrategy;
(function (EStrategy) {
    EStrategy[EStrategy["None"] = 0] = "None";
    EStrategy[EStrategy["CCTPBurn"] = 1] = "CCTPBurn";
    EStrategy[EStrategy["CCTPClaim"] = 2] = "CCTPClaim";
    EStrategy[EStrategy["Lock"] = 3] = "Lock";
    EStrategy[EStrategy["Mint"] = 4] = "Mint";
    EStrategy[EStrategy["Burn"] = 5] = "Burn";
    EStrategy[EStrategy["Unlock"] = 6] = "Unlock";
    EStrategy[EStrategy["LPStake"] = 7] = "LPStake";
    EStrategy[EStrategy["LPRelease"] = 8] = "LPRelease";
    EStrategy[EStrategy["Swap1"] = 9] = "Swap1";
    EStrategy[EStrategy["Swap2"] = 10] = "Swap2";
    EStrategy[EStrategy["Swap3"] = 11] = "Swap3";
    EStrategy[EStrategy["Swap4"] = 12] = "Swap4";
    EStrategy[EStrategy["Swap5"] = 13] = "Swap5";
    EStrategy[EStrategy["Swap6"] = 14] = "Swap6";
})(EStrategy || (exports.EStrategy = EStrategy = {}));
;
exports.strategyMap = {
    [BigInt(EStrategy.None).toString()]: "None",
    [BigInt(EStrategy.CCTPBurn).toString()]: "CCTPBurn",
    [BigInt(EStrategy.CCTPClaim).toString()]: "CCTPClaim",
    [BigInt(EStrategy.Lock).toString()]: "Lock",
    [BigInt(EStrategy.Mint).toString()]: "Mint",
    [BigInt(EStrategy.Burn).toString()]: "Burn",
    [BigInt(EStrategy.Unlock).toString()]: "Unlock",
    [BigInt(EStrategy.LPStake).toString()]: "LPStake",
    [BigInt(EStrategy.LPRelease).toString()]: "LPRelease",
    [BigInt(EStrategy.Swap1).toString()]: "Swap1",
    [BigInt(EStrategy.Swap2).toString()]: "Swap2",
    [BigInt(EStrategy.Swap3).toString()]: "Swap3",
    [BigInt(EStrategy.Swap4).toString()]: "Swap4",
    [BigInt(EStrategy.Swap5).toString()]: "Swap5",
    [BigInt(EStrategy.Swap6).toString()]: "Swap6",
};
__exportStar(require("./ChainInfo"), exports);
__exportStar(require("./getConsensus"), exports);
__exportStar(require("./ton"), exports);
__exportStar(require("./web3"), exports);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvY2hhaW5zL2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBNmVBLElBQVksU0FnQlg7QUFoQkQsV0FBWSxTQUFTO0lBQ25CLHlDQUFRLENBQUE7SUFDUixpREFBWSxDQUFBO0lBQ1osbURBQWEsQ0FBQTtJQUNiLHlDQUFRLENBQUE7SUFDUix5Q0FBUSxDQUFBO0lBQ1IseUNBQVEsQ0FBQTtJQUNSLDZDQUFVLENBQUE7SUFDViwrQ0FBVyxDQUFBO0lBQ1gsbURBQWEsQ0FBQTtJQUNiLDJDQUFTLENBQUE7SUFDVCw0Q0FBVSxDQUFBO0lBQ1YsNENBQVUsQ0FBQTtJQUNWLDRDQUFVLENBQUE7SUFDViw0Q0FBVSxDQUFBO0lBQ1YsNENBQVUsQ0FBQTtBQUNaLENBQUMsRUFoQlcsU0FBUyx5QkFBVCxTQUFTLFFBZ0JwQjtBQUFBLENBQUM7QUFFVyxRQUFBLFdBQVcsR0FBRztJQUN6QixDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUMsRUFBRSxNQUFNO0lBQzNDLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxFQUFFLFVBQVU7SUFDbkQsQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFDLEVBQUUsV0FBVztJQUNyRCxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUMsRUFBRSxNQUFNO0lBQzNDLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxFQUFFLE1BQU07SUFDM0MsQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFDLEVBQUUsTUFBTTtJQUMzQyxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUMsRUFBRSxRQUFRO0lBQy9DLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxFQUFFLFNBQVM7SUFDakQsQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFDLEVBQUUsV0FBVztJQUNyRCxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUMsRUFBRSxPQUFPO0lBQzdDLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxFQUFFLE9BQU87SUFDN0MsQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFDLEVBQUUsT0FBTztJQUM3QyxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUMsRUFBRSxPQUFPO0lBQzdDLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxFQUFFLE9BQU87SUFDN0MsQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFDLEVBQUUsT0FBTztDQUNyQyxDQUFDO0FBMEVYLDhDQUEyQjtBQUMzQixpREFBK0I7QUFDL0Isd0NBQXNCO0FBQ3RCLHlDQUF1QiJ9