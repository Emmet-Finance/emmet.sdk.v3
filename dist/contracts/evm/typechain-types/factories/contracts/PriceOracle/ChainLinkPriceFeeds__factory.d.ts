import { ContractFactory, ContractTransactionResponse } from "ethers";
import type { Signer, ContractDeployTransaction, ContractRunner } from "ethers";
import type { NonPayableOverrides } from "../../../common";
import type { ChainLinkPriceFeeds, ChainLinkPriceFeedsInterface } from "../../../contracts/PriceOracle/ChainLinkPriceFeeds";
type ChainLinkPriceFeedsConstructorParams = [signer?: Signer] | ConstructorParameters<typeof ContractFactory>;
export declare class ChainLinkPriceFeeds__factory extends ContractFactory {
    constructor(...args: ChainLinkPriceFeedsConstructorParams);
    getDeployTransaction(overrides?: NonPayableOverrides & {
        from?: string;
    }): Promise<ContractDeployTransaction>;
    deploy(overrides?: NonPayableOverrides & {
        from?: string;
    }): Promise<ChainLinkPriceFeeds & {
        deploymentTransaction(): ContractTransactionResponse;
    }>;
    connect(runner: ContractRunner | null): ChainLinkPriceFeeds__factory;
    static readonly bytecode = "0x608060405234801561001057600080fd5b50600080546001600160a01b0319163317905561090a806100326000396000f3fe608060405234801561001057600080fd5b506004361061007d5760003560e01c80632aedd0eb1161005b5780632aedd0eb146100bd578063a076c9c6146100e3578063b0e5fb011461010e578063e2f273bd1461013357600080fd5b806312e8c6411461008257806314e9a7e7146100975780632735ff6d146100aa575b600080fd5b6100956100903660046106b4565b610146565b005b6100956100a536600461070d565b6101b3565b6100956100b836600461070d565b6102b5565b6100d06100cb3660046106b4565b61032d565b6040519081526020015b60405180910390f35b6100f66100f13660046106b4565b610366565b6040516001600160a01b0390911681526020016100da565b61012161011c3660046106b4565b61040c565b60405160ff90911681526020016100da565b61009561014136600461075b565b61043f565b61014e610495565b60018160405161015e91906107a1565b90815260405190819003602001812080546001600160a01b03191690557f0587cfe822921ad5b807a80c43a6936e6da5f84019a10a25dc579a1900b9112c906101a89083906107e9565b60405180910390a150565b6101bb610495565b60006001600160a01b03166001836040516101d691906107a1565b908152604051908190036020019020546001600160a01b0316146102395760405162461bcd60e51b815260206004820152601560248201527420b9b9b2ba1030b63932b0b23c9032bc34b9ba399760591b60448201526064015b60405180910390fd5b8060018360405161024a91906107a1565b90815260405190819003602001812080546001600160a01b03939093166001600160a01b0319909316929092179091557f6edc9948780b58433e42f3dbe45d12fce3d09f79c020d34faed3d5fbbdc6350e906102a990849084906107fc565b60405180910390a15050565b6102bd610495565b806001836040516102ce91906107a1565b90815260405190819003602001812080546001600160a01b03939093166001600160a01b0319909316929092179091557f88c8a615dff55216530aae4e5b4f37fd2d6ee9252870ecd985e2a9a23efa0362906102a990849084906107fc565b600061036060018360405161034291906107a1565b908152604051908190036020019020546001600160a01b03166104e6565b92915050565b6000806001600160a01b031660018360405161038291906107a1565b908152604051908190036020019020546001600160a01b0316036103dd5760405162461bcd60e51b81526020600482015260126024820152712ab739bab83837b93a32b21030b9b9b2ba1760711b6044820152606401610230565b6001826040516103ed91906107a1565b908152604051908190036020019020546001600160a01b031692915050565b600061036060018360405161042191906107a1565b908152604051908190036020019020546001600160a01b03166105ad565b610447610495565b600080546001600160a01b0319166001600160a01b0383169081179091556040519081527f7ce7ec0b50378fb6c0186ffb5f48325f6593fcb4ca4386f21861af3129188f5c906020016101a8565b6000546001600160a01b031633146104e45760405162461bcd60e51b81526020600482015260126024820152712ab730baba3437b934b9b2b21031b0b6361760711b6044820152606401610230565b565b6000806000836001600160a01b031663feaf968c6040518163ffffffff1660e01b815260040160a060405180830381865afa158015610529573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061054d9190610840565b5093505092505060008212156105795760405163990664bb60e01b815260048101839052602401610230565b620151806105878242610890565b11156105a6576040516319d053db60e11b815260040160405180910390fd5b5092915050565b6000816001600160a01b031663313ce5676040518163ffffffff1660e01b8152600401602060405180830381865afa1580156105ed573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061036091906108b1565b634e487b7160e01b600052604160045260246000fd5b600082601f83011261063857600080fd5b813567ffffffffffffffff8082111561065357610653610611565b604051601f8301601f19908116603f0116810190828211818310171561067b5761067b610611565b8160405283815286602085880101111561069457600080fd5b836020870160208301376000602085830101528094505050505092915050565b6000602082840312156106c657600080fd5b813567ffffffffffffffff8111156106dd57600080fd5b6106e984828501610627565b949350505050565b80356001600160a01b038116811461070857600080fd5b919050565b6000806040838503121561072057600080fd5b823567ffffffffffffffff81111561073757600080fd5b61074385828601610627565b925050610752602084016106f1565b90509250929050565b60006020828403121561076d57600080fd5b610776826106f1565b9392505050565b60005b83811015610798578181015183820152602001610780565b50506000910152565b600082516107b381846020870161077d565b9190910192915050565b600081518084526107d581602086016020860161077d565b601f01601f19169290920160200192915050565b60208152600061077660208301846107bd565b60408152600061080f60408301856107bd565b905060018060a01b03831660208301529392505050565b805169ffffffffffffffffffff8116811461070857600080fd5b600080600080600060a0868803121561085857600080fd5b61086186610826565b945060208601519350604086015192506060860151915061088460808701610826565b90509295509295909350565b8181038181111561036057634e487b7160e01b600052601160045260246000fd5b6000602082840312156108c357600080fd5b815160ff8116811461077657600080fdfea2646970667358221220f3c9fcc71d0df85cfc28d4ddcb04620e40027f2edbe5396557ad0bcafc6b3b7964736f6c63430008140033";
    static readonly abi: readonly [{
        readonly inputs: readonly [];
        readonly stateMutability: "nonpayable";
        readonly type: "constructor";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "int256";
            readonly name: "price";
            readonly type: "int256";
        }];
        readonly name: "NegativeTokenPrice";
        readonly type: "error";
    }, {
        readonly inputs: readonly [];
        readonly name: "OutdatedPrice";
        readonly type: "error";
    }, {
        readonly anonymous: false;
        readonly inputs: readonly [{
            readonly indexed: false;
            readonly internalType: "address";
            readonly name: "newAdmin";
            readonly type: "address";
        }];
        readonly name: "AdminChanged";
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
    }, {
        readonly inputs: readonly [{
            readonly internalType: "address";
            readonly name: "newAdmin";
            readonly type: "address";
        }];
        readonly name: "updateAdmin";
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
    static createInterface(): ChainLinkPriceFeedsInterface;
    static connect(address: string, runner?: ContractRunner | null): ChainLinkPriceFeeds;
}
export {};
//# sourceMappingURL=ChainLinkPriceFeeds__factory.d.ts.map