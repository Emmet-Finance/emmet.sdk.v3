import type { BaseContract, BigNumberish, BytesLike, FunctionFragment, Result, Interface, EventFragment, AddressLike, ContractRunner, ContractMethod, Listener } from "ethers";
import type { TypedContractEvent, TypedDeferredTopicFilter, TypedEventLog, TypedLogDescription, TypedListener, TypedContractMethod } from "../../common";
export declare namespace BridgeStorage {
    type InstallmentInStruct = {
        amount: BigNumberish;
        chainId: BigNumberish;
        tokenSymbol: string;
        destinationAddress: AddressLike;
    };
    type InstallmentInStructOutput = [
        amount: bigint,
        chainId: bigint,
        tokenSymbol: string,
        destinationAddress: string
    ] & {
        amount: bigint;
        chainId: bigint;
        tokenSymbol: string;
        destinationAddress: string;
    };
    type InstallmentOutStruct = {
        amount: BigNumberish;
        chainId: BigNumberish;
        tokenSymbol: string;
        destinationAddress: string;
    };
    type InstallmentOutStructOutput = [
        amount: bigint,
        chainId: bigint,
        tokenSymbol: string,
        destinationAddress: string
    ] & {
        amount: bigint;
        chainId: bigint;
        tokenSymbol: string;
        destinationAddress: string;
    };
}
export interface IBridgeContractInterface extends Interface {
    getFunction(nameOrSignature: "receiveInstallment" | "sendInstallment"): FunctionFragment;
    getEvent(nameOrSignatureOrTopic: "ReceivedInstallment" | "SendInstallment"): EventFragment;
    encodeFunctionData(functionFragment: "receiveInstallment", values: [BytesLike, BridgeStorage.InstallmentInStruct]): string;
    encodeFunctionData(functionFragment: "sendInstallment", values: [BridgeStorage.InstallmentOutStruct]): string;
    decodeFunctionResult(functionFragment: "receiveInstallment", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "sendInstallment", data: BytesLike): Result;
}
export declare namespace ReceivedInstallmentEvent {
    type InputTuple = [
        amount: BigNumberish,
        txId: BytesLike,
        fromChain: BigNumberish,
        toChain: BigNumberish,
        tokenSymbol: string,
        toAddress: AddressLike
    ];
    type OutputTuple = [
        amount: bigint,
        txId: string,
        fromChain: bigint,
        toChain: bigint,
        tokenSymbol: string,
        toAddress: string
    ];
    interface OutputObject {
        amount: bigint;
        txId: string;
        fromChain: bigint;
        toChain: bigint;
        tokenSymbol: string;
        toAddress: string;
    }
    type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
    type Filter = TypedDeferredTopicFilter<Event>;
    type Log = TypedEventLog<Event>;
    type LogDescription = TypedLogDescription<Event>;
}
export declare namespace SendInstallmentEvent {
    type InputTuple = [
        amount: BigNumberish,
        txId: BytesLike,
        fromChain: BigNumberish,
        toChain: BigNumberish,
        tokenSymbol: string,
        toAddress: string
    ];
    type OutputTuple = [
        amount: bigint,
        txId: string,
        fromChain: bigint,
        toChain: bigint,
        tokenSymbol: string,
        toAddress: string
    ];
    interface OutputObject {
        amount: bigint;
        txId: string;
        fromChain: bigint;
        toChain: bigint;
        tokenSymbol: string;
        toAddress: string;
    }
    type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
    type Filter = TypedDeferredTopicFilter<Event>;
    type Log = TypedEventLog<Event>;
    type LogDescription = TypedLogDescription<Event>;
}
export interface IBridgeContract extends BaseContract {
    connect(runner?: ContractRunner | null): IBridgeContract;
    waitForDeployment(): Promise<this>;
    interface: IBridgeContractInterface;
    queryFilter<TCEvent extends TypedContractEvent>(event: TCEvent, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TypedEventLog<TCEvent>>>;
    queryFilter<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TypedEventLog<TCEvent>>>;
    on<TCEvent extends TypedContractEvent>(event: TCEvent, listener: TypedListener<TCEvent>): Promise<this>;
    on<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, listener: TypedListener<TCEvent>): Promise<this>;
    once<TCEvent extends TypedContractEvent>(event: TCEvent, listener: TypedListener<TCEvent>): Promise<this>;
    once<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, listener: TypedListener<TCEvent>): Promise<this>;
    listeners<TCEvent extends TypedContractEvent>(event: TCEvent): Promise<Array<TypedListener<TCEvent>>>;
    listeners(eventName?: string): Promise<Array<Listener>>;
    removeAllListeners<TCEvent extends TypedContractEvent>(event?: TCEvent): Promise<this>;
    receiveInstallment: TypedContractMethod<[
        txId: BytesLike,
        params: BridgeStorage.InstallmentInStruct
    ], [
        void
    ], "payable">;
    sendInstallment: TypedContractMethod<[
        params: BridgeStorage.InstallmentOutStruct
    ], [
        void
    ], "payable">;
    getFunction<T extends ContractMethod = ContractMethod>(key: string | FunctionFragment): T;
    getFunction(nameOrSignature: "receiveInstallment"): TypedContractMethod<[
        txId: BytesLike,
        params: BridgeStorage.InstallmentInStruct
    ], [
        void
    ], "payable">;
    getFunction(nameOrSignature: "sendInstallment"): TypedContractMethod<[
        params: BridgeStorage.InstallmentOutStruct
    ], [
        void
    ], "payable">;
    getEvent(key: "ReceivedInstallment"): TypedContractEvent<ReceivedInstallmentEvent.InputTuple, ReceivedInstallmentEvent.OutputTuple, ReceivedInstallmentEvent.OutputObject>;
    getEvent(key: "SendInstallment"): TypedContractEvent<SendInstallmentEvent.InputTuple, SendInstallmentEvent.OutputTuple, SendInstallmentEvent.OutputObject>;
    filters: {
        "ReceivedInstallment(uint256,bytes32,uint16,uint16,string,address)": TypedContractEvent<ReceivedInstallmentEvent.InputTuple, ReceivedInstallmentEvent.OutputTuple, ReceivedInstallmentEvent.OutputObject>;
        ReceivedInstallment: TypedContractEvent<ReceivedInstallmentEvent.InputTuple, ReceivedInstallmentEvent.OutputTuple, ReceivedInstallmentEvent.OutputObject>;
        "SendInstallment(uint256,bytes32,uint16,uint16,string,string)": TypedContractEvent<SendInstallmentEvent.InputTuple, SendInstallmentEvent.OutputTuple, SendInstallmentEvent.OutputObject>;
        SendInstallment: TypedContractEvent<SendInstallmentEvent.InputTuple, SendInstallmentEvent.OutputTuple, SendInstallmentEvent.OutputObject>;
    };
}
//# sourceMappingURL=IBridgeContract.d.ts.map