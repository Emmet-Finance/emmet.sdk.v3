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
exports.Chain = void 0;
var Chain;
(function (Chain) {
    Chain.ETHEREUM = 0;
    Chain.AVALANCHE = 1;
    Chain.OPTIMISM = 2;
    Chain.ARBITRUM = 3;
    Chain.SOLANA = 5;
    Chain.BASE = 6;
    Chain.POLYGON = 7;
    // CCTP Unsupported
    Chain.SONGBIRD = 19;
    Chain.BSC = 56;
    Chain.TON = 65534;
    Chain.TONTESTNET = 65535;
    Chain.ONLYLAYER = 728696;
    Chain.BERACHAIN = 80084;
})(Chain || (exports.Chain = Chain = {}));
__exportStar(require("./constants"), exports);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvZmFjdG9yeS90eXBlcy9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQXlDQSxJQUFpQixLQUFLLENBZXJCO0FBZkQsV0FBaUIsS0FBSztJQUNQLGNBQVEsR0FBRyxDQUFDLENBQUM7SUFDYixlQUFTLEdBQUcsQ0FBQyxDQUFDO0lBQ2QsY0FBUSxHQUFHLENBQUMsQ0FBQztJQUNiLGNBQVEsR0FBRyxDQUFDLENBQUM7SUFDYixZQUFNLEdBQUcsQ0FBQyxDQUFDO0lBQ1gsVUFBSSxHQUFHLENBQUMsQ0FBQztJQUNULGFBQU8sR0FBRyxDQUFDLENBQUM7SUFDekIsbUJBQW1CO0lBQ04sY0FBUSxHQUFHLEVBQUUsQ0FBQztJQUNkLFNBQUcsR0FBRyxFQUFFLENBQUM7SUFDVCxTQUFHLEdBQUcsS0FBSyxDQUFDO0lBQ1osZ0JBQVUsR0FBRyxLQUFLLENBQUM7SUFDbkIsZUFBUyxHQUFHLE1BQU0sQ0FBQztJQUNuQixlQUFTLEdBQUcsS0FBSyxDQUFDO0FBQ2pDLENBQUMsRUFmZ0IsS0FBSyxxQkFBTCxLQUFLLFFBZXJCO0FBc0xELDhDQUE0QiJ9