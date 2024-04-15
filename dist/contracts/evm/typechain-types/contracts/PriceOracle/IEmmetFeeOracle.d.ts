import type { BaseContract, BigNumberish, BytesLike, FunctionFragment, Result, Interface, ContractRunner, ContractMethod, Listener } from "ethers";
import type { TypedContractEvent, TypedDeferredTopicFilter, TypedEventLog, TypedListener, TypedContractMethod } from "../../common";
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
export interface IEmmetFeeOracleInterface extends Interface {
    getFunction(nameOrSignature: "calculateCoinFees" | "calculateTransactionFee" | "getChainByname" | "getChainFee" | "getChainNameByDomain" | "getChainNameById" | "getCoinFee" | "getCoinPrice" | "selfCoin"): FunctionFragment;
    encodeFunctionData(functionFragment: "calculateCoinFees", values: [string, BigNumberish]): string;
    encodeFunctionData(functionFragment: "calculateTransactionFee", values: [string]): string;
    encodeFunctionData(functionFragment: "getChainByname", values: [string]): string;
    encodeFunctionData(functionFragment: "getChainFee", values: [BigNumberish]): string;
    encodeFunctionData(functionFragment: "getChainNameByDomain", values: [BigNumberish]): string;
    encodeFunctionData(functionFragment: "getChainNameById", values: [BigNumberish]): string;
    encodeFunctionData(functionFragment: "getCoinFee", values: [string]): string;
    encodeFunctionData(functionFragment: "getCoinPrice", values: [string]): string;
    encodeFunctionData(functionFragment: "selfCoin", values?: undefined): string;
    decodeFunctionResult(functionFragment: "calculateCoinFees", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "calculateTransactionFee", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getChainByname", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getChainFee", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getChainNameByDomain", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getChainNameById", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getCoinFee", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getCoinPrice", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "selfCoin", data: BytesLike): Result;
}
export interface IEmmetFeeOracle extends BaseContract {
    connect(runner?: ContractRunner | null): IEmmetFeeOracle;
    waitForDeployment(): Promise<this>;
    interface: IEmmetFeeOracleInterface;
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
    selfCoin: TypedContractMethod<[], [string], "view">;
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
    getFunction(nameOrSignature: "selfCoin"): TypedContractMethod<[], [string], "view">;
    filters: {};
}
//# sourceMappingURL=IEmmetFeeOracle.d.ts.map