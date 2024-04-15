import type { BaseContract, BytesLike, FunctionFragment, Result, Interface, EventFragment, AddressLike, ContractRunner, ContractMethod, Listener } from "ethers";
import type { TypedContractEvent, TypedDeferredTopicFilter, TypedEventLog, TypedLogDescription, TypedListener, TypedContractMethod } from "../../common";
export interface ChainLinkPriceFeedsInterface extends Interface {
    getFunction(nameOrSignature: "addDataFeed" | "deleteDataFeed" | "getAssetPrice" | "getAssetPriceDecimals" | "getDataFeedAddress" | "updateAdmin" | "updateDataFeed"): FunctionFragment;
    getEvent(nameOrSignatureOrTopic: "AdminChanged" | "AssetDataFeedCreated" | "AssetDataFeedDeleted" | "AssetDataFeedUpdated"): EventFragment;
    encodeFunctionData(functionFragment: "addDataFeed", values: [string, AddressLike]): string;
    encodeFunctionData(functionFragment: "deleteDataFeed", values: [string]): string;
    encodeFunctionData(functionFragment: "getAssetPrice", values: [string]): string;
    encodeFunctionData(functionFragment: "getAssetPriceDecimals", values: [string]): string;
    encodeFunctionData(functionFragment: "getDataFeedAddress", values: [string]): string;
    encodeFunctionData(functionFragment: "updateAdmin", values: [AddressLike]): string;
    encodeFunctionData(functionFragment: "updateDataFeed", values: [string, AddressLike]): string;
    decodeFunctionResult(functionFragment: "addDataFeed", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "deleteDataFeed", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getAssetPrice", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getAssetPriceDecimals", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getDataFeedAddress", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "updateAdmin", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "updateDataFeed", data: BytesLike): Result;
}
export declare namespace AdminChangedEvent {
    type InputTuple = [newAdmin: AddressLike];
    type OutputTuple = [newAdmin: string];
    interface OutputObject {
        newAdmin: string;
    }
    type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
    type Filter = TypedDeferredTopicFilter<Event>;
    type Log = TypedEventLog<Event>;
    type LogDescription = TypedLogDescription<Event>;
}
export declare namespace AssetDataFeedCreatedEvent {
    type InputTuple = [asset: string, dataFeed: AddressLike];
    type OutputTuple = [asset: string, dataFeed: string];
    interface OutputObject {
        asset: string;
        dataFeed: string;
    }
    type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
    type Filter = TypedDeferredTopicFilter<Event>;
    type Log = TypedEventLog<Event>;
    type LogDescription = TypedLogDescription<Event>;
}
export declare namespace AssetDataFeedDeletedEvent {
    type InputTuple = [asset: string];
    type OutputTuple = [asset: string];
    interface OutputObject {
        asset: string;
    }
    type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
    type Filter = TypedDeferredTopicFilter<Event>;
    type Log = TypedEventLog<Event>;
    type LogDescription = TypedLogDescription<Event>;
}
export declare namespace AssetDataFeedUpdatedEvent {
    type InputTuple = [asset: string, dataFeed: AddressLike];
    type OutputTuple = [asset: string, dataFeed: string];
    interface OutputObject {
        asset: string;
        dataFeed: string;
    }
    type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
    type Filter = TypedDeferredTopicFilter<Event>;
    type Log = TypedEventLog<Event>;
    type LogDescription = TypedLogDescription<Event>;
}
export interface ChainLinkPriceFeeds extends BaseContract {
    connect(runner?: ContractRunner | null): ChainLinkPriceFeeds;
    waitForDeployment(): Promise<this>;
    interface: ChainLinkPriceFeedsInterface;
    queryFilter<TCEvent extends TypedContractEvent>(event: TCEvent, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TypedEventLog<TCEvent>>>;
    queryFilter<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TypedEventLog<TCEvent>>>;
    on<TCEvent extends TypedContractEvent>(event: TCEvent, listener: TypedListener<TCEvent>): Promise<this>;
    on<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, listener: TypedListener<TCEvent>): Promise<this>;
    once<TCEvent extends TypedContractEvent>(event: TCEvent, listener: TypedListener<TCEvent>): Promise<this>;
    once<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, listener: TypedListener<TCEvent>): Promise<this>;
    listeners<TCEvent extends TypedContractEvent>(event: TCEvent): Promise<Array<TypedListener<TCEvent>>>;
    listeners(eventName?: string): Promise<Array<Listener>>;
    removeAllListeners<TCEvent extends TypedContractEvent>(event?: TCEvent): Promise<this>;
    addDataFeed: TypedContractMethod<[
        asset: string,
        dataFeed: AddressLike
    ], [
        void
    ], "nonpayable">;
    deleteDataFeed: TypedContractMethod<[asset: string], [void], "nonpayable">;
    getAssetPrice: TypedContractMethod<[asset: string], [bigint], "view">;
    getAssetPriceDecimals: TypedContractMethod<[asset: string], [bigint], "view">;
    getDataFeedAddress: TypedContractMethod<[asset: string], [string], "view">;
    updateAdmin: TypedContractMethod<[
        newAdmin: AddressLike
    ], [
        void
    ], "nonpayable">;
    updateDataFeed: TypedContractMethod<[
        asset: string,
        dataFeed: AddressLike
    ], [
        void
    ], "nonpayable">;
    getFunction<T extends ContractMethod = ContractMethod>(key: string | FunctionFragment): T;
    getFunction(nameOrSignature: "addDataFeed"): TypedContractMethod<[
        asset: string,
        dataFeed: AddressLike
    ], [
        void
    ], "nonpayable">;
    getFunction(nameOrSignature: "deleteDataFeed"): TypedContractMethod<[asset: string], [void], "nonpayable">;
    getFunction(nameOrSignature: "getAssetPrice"): TypedContractMethod<[asset: string], [bigint], "view">;
    getFunction(nameOrSignature: "getAssetPriceDecimals"): TypedContractMethod<[asset: string], [bigint], "view">;
    getFunction(nameOrSignature: "getDataFeedAddress"): TypedContractMethod<[asset: string], [string], "view">;
    getFunction(nameOrSignature: "updateAdmin"): TypedContractMethod<[newAdmin: AddressLike], [void], "nonpayable">;
    getFunction(nameOrSignature: "updateDataFeed"): TypedContractMethod<[
        asset: string,
        dataFeed: AddressLike
    ], [
        void
    ], "nonpayable">;
    getEvent(key: "AdminChanged"): TypedContractEvent<AdminChangedEvent.InputTuple, AdminChangedEvent.OutputTuple, AdminChangedEvent.OutputObject>;
    getEvent(key: "AssetDataFeedCreated"): TypedContractEvent<AssetDataFeedCreatedEvent.InputTuple, AssetDataFeedCreatedEvent.OutputTuple, AssetDataFeedCreatedEvent.OutputObject>;
    getEvent(key: "AssetDataFeedDeleted"): TypedContractEvent<AssetDataFeedDeletedEvent.InputTuple, AssetDataFeedDeletedEvent.OutputTuple, AssetDataFeedDeletedEvent.OutputObject>;
    getEvent(key: "AssetDataFeedUpdated"): TypedContractEvent<AssetDataFeedUpdatedEvent.InputTuple, AssetDataFeedUpdatedEvent.OutputTuple, AssetDataFeedUpdatedEvent.OutputObject>;
    filters: {
        "AdminChanged(address)": TypedContractEvent<AdminChangedEvent.InputTuple, AdminChangedEvent.OutputTuple, AdminChangedEvent.OutputObject>;
        AdminChanged: TypedContractEvent<AdminChangedEvent.InputTuple, AdminChangedEvent.OutputTuple, AdminChangedEvent.OutputObject>;
        "AssetDataFeedCreated(string,address)": TypedContractEvent<AssetDataFeedCreatedEvent.InputTuple, AssetDataFeedCreatedEvent.OutputTuple, AssetDataFeedCreatedEvent.OutputObject>;
        AssetDataFeedCreated: TypedContractEvent<AssetDataFeedCreatedEvent.InputTuple, AssetDataFeedCreatedEvent.OutputTuple, AssetDataFeedCreatedEvent.OutputObject>;
        "AssetDataFeedDeleted(string)": TypedContractEvent<AssetDataFeedDeletedEvent.InputTuple, AssetDataFeedDeletedEvent.OutputTuple, AssetDataFeedDeletedEvent.OutputObject>;
        AssetDataFeedDeleted: TypedContractEvent<AssetDataFeedDeletedEvent.InputTuple, AssetDataFeedDeletedEvent.OutputTuple, AssetDataFeedDeletedEvent.OutputObject>;
        "AssetDataFeedUpdated(string,address)": TypedContractEvent<AssetDataFeedUpdatedEvent.InputTuple, AssetDataFeedUpdatedEvent.OutputTuple, AssetDataFeedUpdatedEvent.OutputObject>;
        AssetDataFeedUpdated: TypedContractEvent<AssetDataFeedUpdatedEvent.InputTuple, AssetDataFeedUpdatedEvent.OutputTuple, AssetDataFeedUpdatedEvent.OutputObject>;
    };
}
//# sourceMappingURL=ChainLinkPriceFeeds.d.ts.map