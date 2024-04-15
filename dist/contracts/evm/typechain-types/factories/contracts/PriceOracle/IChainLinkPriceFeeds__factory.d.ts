import { type ContractRunner } from "ethers";
import type { IChainLinkPriceFeeds, IChainLinkPriceFeedsInterface } from "../../../contracts/PriceOracle/IChainLinkPriceFeeds";
export declare class IChainLinkPriceFeeds__factory {
    static readonly abi: readonly [{
        readonly inputs: readonly [{
            readonly internalType: "string";
            readonly name: "asset";
            readonly type: "string";
        }];
        readonly name: "getAssetPrice";
        readonly outputs: readonly [{
            readonly internalType: "int256";
            readonly name: "";
            readonly type: "int256";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "string";
            readonly name: "asset";
            readonly type: "string";
        }];
        readonly name: "getAssetPriceDecimals";
        readonly outputs: readonly [{
            readonly internalType: "uint8";
            readonly name: "";
            readonly type: "uint8";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "string";
            readonly name: "asset";
            readonly type: "string";
        }];
        readonly name: "getDataFeedAddress";
        readonly outputs: readonly [{
            readonly internalType: "address";
            readonly name: "";
            readonly type: "address";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }];
    static createInterface(): IChainLinkPriceFeedsInterface;
    static connect(address: string, runner?: ContractRunner | null): IChainLinkPriceFeeds;
}
//# sourceMappingURL=IChainLinkPriceFeeds__factory.d.ts.map