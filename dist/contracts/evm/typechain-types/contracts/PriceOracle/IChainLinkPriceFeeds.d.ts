import type { BaseContract, BytesLike, FunctionFragment, Result, Interface, ContractRunner, ContractMethod, Listener } from "ethers";
import type { TypedContractEvent, TypedDeferredTopicFilter, TypedEventLog, TypedListener, TypedContractMethod } from "../../common";
export interface IChainLinkPriceFeedsInterface extends Interface {
    getFunction(nameOrSignature: "getAssetPrice" | "getAssetPriceDecimals" | "getDataFeedAddress"): FunctionFragment;
    encodeFunctionData(functionFragment: "getAssetPrice", values: [string]): string;
    encodeFunctionData(functionFragment: "getAssetPriceDecimals", values: [string]): string;
    encodeFunctionData(functionFragment: "getDataFeedAddress", values: [string]): string;
    decodeFunctionResult(functionFragment: "getAssetPrice", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getAssetPriceDecimals", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getDataFeedAddress", data: BytesLike): Result;
}
export interface IChainLinkPriceFeeds extends BaseContract {
    connect(runner?: ContractRunner | null): IChainLinkPriceFeeds;
    waitForDeployment(): Promise<this>;
    interface: IChainLinkPriceFeedsInterface;
    queryFilter<TCEvent extends TypedContractEvent>(event: TCEvent, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TypedEventLog<TCEvent>>>;
    queryFilter<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TypedEventLog<TCEvent>>>;
    on<TCEvent extends TypedContractEvent>(event: TCEvent, listener: TypedListener<TCEvent>): Promise<this>;
    on<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, listener: TypedListener<TCEvent>): Promise<this>;
    once<TCEvent extends TypedContractEvent>(event: TCEvent, listener: TypedListener<TCEvent>): Promise<this>;
    once<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, listener: TypedListener<TCEvent>): Promise<this>;
    listeners<TCEvent extends TypedContractEvent>(event: TCEvent): Promise<Array<TypedListener<TCEvent>>>;
    listeners(eventName?: string): Promise<Array<Listener>>;
    removeAllListeners<TCEvent extends TypedContractEvent>(event?: TCEvent): Promise<this>;
    getAssetPrice: TypedContractMethod<[asset: string], [bigint], "view">;
    getAssetPriceDecimals: TypedContractMethod<[asset: string], [bigint], "view">;
    getDataFeedAddress: TypedContractMethod<[asset: string], [string], "view">;
    getFunction<T extends ContractMethod = ContractMethod>(key: string | FunctionFragment): T;
    getFunction(nameOrSignature: "getAssetPrice"): TypedContractMethod<[asset: string], [bigint], "view">;
    getFunction(nameOrSignature: "getAssetPriceDecimals"): TypedContractMethod<[asset: string], [bigint], "view">;
    getFunction(nameOrSignature: "getDataFeedAddress"): TypedContractMethod<[asset: string], [string], "view">;
    filters: {};
}
//# sourceMappingURL=IChainLinkPriceFeeds.d.ts.map