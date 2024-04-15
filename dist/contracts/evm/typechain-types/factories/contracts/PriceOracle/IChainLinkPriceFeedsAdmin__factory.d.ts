import { type ContractRunner } from "ethers";
import type { IChainLinkPriceFeedsAdmin, IChainLinkPriceFeedsAdminInterface } from "../../../contracts/PriceOracle/IChainLinkPriceFeedsAdmin";
export declare class IChainLinkPriceFeedsAdmin__factory {
    static readonly abi: readonly [{
        readonly anonymous: false;
        readonly inputs: readonly [{
            readonly indexed: false;
            readonly internalType: "string";
            readonly name: "asset";
            readonly type: "string";
        }, {
            readonly indexed: false;
            readonly internalType: "address";
            readonly name: "dataFeed";
            readonly type: "address";
        }];
        readonly name: "AssetDataFeedCreated";
        readonly type: "event";
    }, {
        readonly anonymous: false;
        readonly inputs: readonly [{
            readonly indexed: false;
            readonly internalType: "string";
            readonly name: "asset";
            readonly type: "string";
        }];
        readonly name: "AssetDataFeedDeleted";
        readonly type: "event";
    }, {
        readonly anonymous: false;
        readonly inputs: readonly [{
            readonly indexed: false;
            readonly internalType: "string";
            readonly name: "asset";
            readonly type: "string";
        }, {
            readonly indexed: false;
            readonly internalType: "address";
            readonly name: "dataFeed";
            readonly type: "address";
        }];
        readonly name: "AssetDataFeedUpdated";
        readonly type: "event";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "string";
            readonly name: "asset";
            readonly type: "string";
        }, {
            readonly internalType: "address";
            readonly name: "dataFeed";
            readonly type: "address";
        }];
        readonly name: "addDataFeed";
        readonly outputs: readonly [];
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "string";
            readonly name: "asset";
            readonly type: "string";
        }];
        readonly name: "deleteDataFeed";
        readonly outputs: readonly [];
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "string";
            readonly name: "asset";
            readonly type: "string";
        }, {
            readonly internalType: "address";
            readonly name: "dataFeed";
            readonly type: "address";
        }];
        readonly name: "updateDataFeed";
        readonly outputs: readonly [];
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }];
    static createInterface(): IChainLinkPriceFeedsAdminInterface;
    static connect(address: string, runner?: ContractRunner | null): IChainLinkPriceFeedsAdmin;
}
//# sourceMappingURL=IChainLinkPriceFeedsAdmin__factory.d.ts.map