import type { BaseContract, BigNumberish, BytesLike, FunctionFragment, Result, Interface, EventFragment, AddressLike, ContractRunner, ContractMethod, Listener } from "ethers";
import type { TypedContractEvent, TypedDeferredTopicFilter, TypedEventLog, TypedLogDescription, TypedListener, TypedContractMethod } from "../../common";
export declare namespace IEmmetFeeOracle {
    type ChainStruct = {
        chainId: BigNumberish;
        domain: BigNumberish;
        txFee: BigNumberish;
        nativeCoin: BytesLike;
    };
    type ChainStructOutput = [
        chainId: bigint,
        domain: bigint,
        txFee: bigint,
        nativeCoin: string
    ] & {
        chainId: bigint;
        domain: bigint;
        txFee: bigint;
        nativeCoin: string;
    };
    type CoinFeeStruct = {
        minimum: BigNumberish;
        percentage: BigNumberish;
    };
    type CoinFeeStructOutput = [minimum: bigint, percentage: bigint] & {
        minimum: bigint;
        percentage: bigint;
    };
}
export interface EmmetFeeOracleInterface extends Interface {
    getFunction(nameOrSignature: "calculateCoinFees" | "calculateTransactionFee" | "getChainByname" | "getChainFee" | "getChainNameByDomain" | "getChainNameById" | "getCoinFee" | "getCoinPrice" | "priceOracle" | "protocolFeeDivisor" | "selfChainId" | "selfCoin" | "supportsInterface" | "updateAdmin" | "updateChain" | "updateCoinFee" | "updateProtocolFeeDivisor" | "updateTxMinimalFee"): FunctionFragment;
    getEvent(nameOrSignatureOrTopic: "AdminChanged" | "MinimalFeeChanged"): EventFragment;
    encodeFunctionData(functionFragment: "calculateCoinFees", values: [string, BigNumberish]): string;
    encodeFunctionData(functionFragment: "calculateTransactionFee", values: [string]): string;
    encodeFunctionData(functionFragment: "getChainByname", values: [string]): string;
    encodeFunctionData(functionFragment: "getChainFee", values: [BigNumberish]): string;
    encodeFunctionData(functionFragment: "getChainNameByDomain", values: [BigNumberish]): string;
    encodeFunctionData(functionFragment: "getChainNameById", values: [BigNumberish]): string;
    encodeFunctionData(functionFragment: "getCoinFee", values: [string]): string;
    encodeFunctionData(functionFragment: "getCoinPrice", values: [string]): string;
    encodeFunctionData(functionFragment: "priceOracle", values?: undefined): string;
    encodeFunctionData(functionFragment: "protocolFeeDivisor", values?: undefined): string;
    encodeFunctionData(functionFragment: "selfChainId", values?: undefined): string;
    encodeFunctionData(functionFragment: "selfCoin", values?: undefined): string;
    encodeFunctionData(functionFragment: "supportsInterface", values: [BytesLike]): string;
    encodeFunctionData(functionFragment: "updateAdmin", values: [AddressLike]): string;
    encodeFunctionData(functionFragment: "updateChain", values: [string, BigNumberish, BigNumberish, BigNumberish, string]): string;
    encodeFunctionData(functionFragment: "updateCoinFee", values: [string, IEmmetFeeOracle.CoinFeeStruct]): string;
    encodeFunctionData(functionFragment: "updateProtocolFeeDivisor", values: [BigNumberish]): string;
    encodeFunctionData(functionFragment: "updateTxMinimalFee", values: [BigNumberish]): string;
    decodeFunctionResult(functionFragment: "calculateCoinFees", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "calculateTransactionFee", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getChainByname", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getChainFee", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getChainNameByDomain", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getChainNameById", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getCoinFee", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getCoinPrice", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "priceOracle", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "protocolFeeDivisor", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "selfChainId", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "selfCoin", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "supportsInterface", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "updateAdmin", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "updateChain", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "updateCoinFee", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "updateProtocolFeeDivisor", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "updateTxMinimalFee", data: BytesLike): Result;
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
export declare namespace MinimalFeeChangedEvent {
    type InputTuple = [newFee: BigNumberish];
    type OutputTuple = [newFee: bigint];
    interface OutputObject {
        newFee: bigint;
    }
    type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
    type Filter = TypedDeferredTopicFilter<Event>;
    type Log = TypedEventLog<Event>;
    type LogDescription = TypedLogDescription<Event>;
}
export interface EmmetFeeOracle extends BaseContract {
    connect(runner?: ContractRunner | null): EmmetFeeOracle;
    waitForDeployment(): Promise<this>;
    interface: EmmetFeeOracleInterface;
    queryFilter<TCEvent extends TypedContractEvent>(event: TCEvent, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TypedEventLog<TCEvent>>>;
    queryFilter<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TypedEventLog<TCEvent>>>;
    on<TCEvent extends TypedContractEvent>(event: TCEvent, listener: TypedListener<TCEvent>): Promise<this>;
    on<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, listener: TypedListener<TCEvent>): Promise<this>;
    once<TCEvent extends TypedContractEvent>(event: TCEvent, listener: TypedListener<TCEvent>): Promise<this>;
    once<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, listener: TypedListener<TCEvent>): Promise<this>;
    listeners<TCEvent extends TypedContractEvent>(event: TCEvent): Promise<Array<TypedListener<TCEvent>>>;
    listeners(eventName?: string): Promise<Array<Listener>>;
    removeAllListeners<TCEvent extends TypedContractEvent>(event?: TCEvent): Promise<this>;
    calculateCoinFees: TypedContractMethod<[
        coinName_: string,
        amount_: BigNumberish
    ], [
        bigint
    ], "view">;
    calculateTransactionFee: TypedContractMethod<[
        destChainName_: string
    ], [
        bigint
    ], "view">;
    getChainByname: TypedContractMethod<[
        chainName_: string
    ], [
        IEmmetFeeOracle.ChainStructOutput
    ], "view">;
    getChainFee: TypedContractMethod<[
        destDomain_: BigNumberish
    ], [
        bigint
    ], "view">;
    getChainNameByDomain: TypedContractMethod<[
        destDomain_: BigNumberish
    ], [
        string
    ], "view">;
    getChainNameById: TypedContractMethod<[
        chainId_: BigNumberish
    ], [
        string
    ], "view">;
    getCoinFee: TypedContractMethod<[
        coinName_: string
    ], [
        IEmmetFeeOracle.CoinFeeStructOutput
    ], "view">;
    getCoinPrice: TypedContractMethod<[coinName: string], [bigint], "view">;
    priceOracle: TypedContractMethod<[], [string], "view">;
    protocolFeeDivisor: TypedContractMethod<[], [bigint], "view">;
    selfChainId: TypedContractMethod<[], [bigint], "view">;
    selfCoin: TypedContractMethod<[], [string], "view">;
    supportsInterface: TypedContractMethod<[
        interfaceId: BytesLike
    ], [
        boolean
    ], "view">;
    updateAdmin: TypedContractMethod<[
        newAdmin: AddressLike
    ], [
        void
    ], "nonpayable">;
    updateChain: TypedContractMethod<[
        chainName: string,
        chainId_: BigNumberish,
        domain_: BigNumberish,
        txFee_: BigNumberish,
        nativeCoin_: string
    ], [
        void
    ], "nonpayable">;
    updateCoinFee: TypedContractMethod<[
        coinName_: string,
        coinFee_: IEmmetFeeOracle.CoinFeeStruct
    ], [
        void
    ], "nonpayable">;
    updateProtocolFeeDivisor: TypedContractMethod<[
        protocolFeeDivisor_: BigNumberish
    ], [
        void
    ], "nonpayable">;
    updateTxMinimalFee: TypedContractMethod<[
        txMinimumFee_: BigNumberish
    ], [
        void
    ], "nonpayable">;
    getFunction<T extends ContractMethod = ContractMethod>(key: string | FunctionFragment): T;
    getFunction(nameOrSignature: "calculateCoinFees"): TypedContractMethod<[
        coinName_: string,
        amount_: BigNumberish
    ], [
        bigint
    ], "view">;
    getFunction(nameOrSignature: "calculateTransactionFee"): TypedContractMethod<[destChainName_: string], [bigint], "view">;
    getFunction(nameOrSignature: "getChainByname"): TypedContractMethod<[
        chainName_: string
    ], [
        IEmmetFeeOracle.ChainStructOutput
    ], "view">;
    getFunction(nameOrSignature: "getChainFee"): TypedContractMethod<[destDomain_: BigNumberish], [bigint], "view">;
    getFunction(nameOrSignature: "getChainNameByDomain"): TypedContractMethod<[destDomain_: BigNumberish], [string], "view">;
    getFunction(nameOrSignature: "getChainNameById"): TypedContractMethod<[chainId_: BigNumberish], [string], "view">;
    getFunction(nameOrSignature: "getCoinFee"): TypedContractMethod<[
        coinName_: string
    ], [
        IEmmetFeeOracle.CoinFeeStructOutput
    ], "view">;
    getFunction(nameOrSignature: "getCoinPrice"): TypedContractMethod<[coinName: string], [bigint], "view">;
    getFunction(nameOrSignature: "priceOracle"): TypedContractMethod<[], [string], "view">;
    getFunction(nameOrSignature: "protocolFeeDivisor"): TypedContractMethod<[], [bigint], "view">;
    getFunction(nameOrSignature: "selfChainId"): TypedContractMethod<[], [bigint], "view">;
    getFunction(nameOrSignature: "selfCoin"): TypedContractMethod<[], [string], "view">;
    getFunction(nameOrSignature: "supportsInterface"): TypedContractMethod<[interfaceId: BytesLike], [boolean], "view">;
    getFunction(nameOrSignature: "updateAdmin"): TypedContractMethod<[newAdmin: AddressLike], [void], "nonpayable">;
    getFunction(nameOrSignature: "updateChain"): TypedContractMethod<[
        chainName: string,
        chainId_: BigNumberish,
        domain_: BigNumberish,
        txFee_: BigNumberish,
        nativeCoin_: string
    ], [
        void
    ], "nonpayable">;
    getFunction(nameOrSignature: "updateCoinFee"): TypedContractMethod<[
        coinName_: string,
        coinFee_: IEmmetFeeOracle.CoinFeeStruct
    ], [
        void
    ], "nonpayable">;
    getFunction(nameOrSignature: "updateProtocolFeeDivisor"): TypedContractMethod<[
        protocolFeeDivisor_: BigNumberish
    ], [
        void
    ], "nonpayable">;
    getFunction(nameOrSignature: "updateTxMinimalFee"): TypedContractMethod<[txMinimumFee_: BigNumberish], [void], "nonpayable">;
    getEvent(key: "AdminChanged"): TypedContractEvent<AdminChangedEvent.InputTuple, AdminChangedEvent.OutputTuple, AdminChangedEvent.OutputObject>;
    getEvent(key: "MinimalFeeChanged"): TypedContractEvent<MinimalFeeChangedEvent.InputTuple, MinimalFeeChangedEvent.OutputTuple, MinimalFeeChangedEvent.OutputObject>;
    filters: {
        "AdminChanged(address)": TypedContractEvent<AdminChangedEvent.InputTuple, AdminChangedEvent.OutputTuple, AdminChangedEvent.OutputObject>;
        AdminChanged: TypedContractEvent<AdminChangedEvent.InputTuple, AdminChangedEvent.OutputTuple, AdminChangedEvent.OutputObject>;
        "MinimalFeeChanged(uint256)": TypedContractEvent<MinimalFeeChangedEvent.InputTuple, MinimalFeeChangedEvent.OutputTuple, MinimalFeeChangedEvent.OutputObject>;
        MinimalFeeChanged: TypedContractEvent<MinimalFeeChangedEvent.InputTuple, MinimalFeeChangedEvent.OutputTuple, MinimalFeeChangedEvent.OutputObject>;
    };
}
//# sourceMappingURL=EmmetFeeOracle.d.ts.map