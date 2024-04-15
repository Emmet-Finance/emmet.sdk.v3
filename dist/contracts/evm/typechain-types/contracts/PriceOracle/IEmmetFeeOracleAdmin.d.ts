import type { BaseContract, BigNumberish, BytesLike, FunctionFragment, Result, Interface, ContractRunner, ContractMethod, Listener } from "ethers";
import type { TypedContractEvent, TypedDeferredTopicFilter, TypedEventLog, TypedListener, TypedContractMethod } from "../../common";
export declare namespace IEmmetFeeOracle {
    type CoinFeeStruct = {
        minimum: BigNumberish;
        percentage: BigNumberish;
    };
    type CoinFeeStructOutput = [minimum: bigint, percentage: bigint] & {
        minimum: bigint;
        percentage: bigint;
    };
}
export interface IEmmetFeeOracleAdminInterface extends Interface {
    getFunction(nameOrSignature: "updateChain" | "updateCoinFee" | "updateProtocolFeeDivisor"): FunctionFragment;
    encodeFunctionData(functionFragment: "updateChain", values: [string, BigNumberish, BigNumberish, BigNumberish, string]): string;
    encodeFunctionData(functionFragment: "updateCoinFee", values: [string, IEmmetFeeOracle.CoinFeeStruct]): string;
    encodeFunctionData(functionFragment: "updateProtocolFeeDivisor", values: [BigNumberish]): string;
    decodeFunctionResult(functionFragment: "updateChain", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "updateCoinFee", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "updateProtocolFeeDivisor", data: BytesLike): Result;
}
export interface IEmmetFeeOracleAdmin extends BaseContract {
    connect(runner?: ContractRunner | null): IEmmetFeeOracleAdmin;
    waitForDeployment(): Promise<this>;
    interface: IEmmetFeeOracleAdminInterface;
    queryFilter<TCEvent extends TypedContractEvent>(event: TCEvent, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TypedEventLog<TCEvent>>>;
    queryFilter<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TypedEventLog<TCEvent>>>;
    on<TCEvent extends TypedContractEvent>(event: TCEvent, listener: TypedListener<TCEvent>): Promise<this>;
    on<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, listener: TypedListener<TCEvent>): Promise<this>;
    once<TCEvent extends TypedContractEvent>(event: TCEvent, listener: TypedListener<TCEvent>): Promise<this>;
    once<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, listener: TypedListener<TCEvent>): Promise<this>;
    listeners<TCEvent extends TypedContractEvent>(event: TCEvent): Promise<Array<TypedListener<TCEvent>>>;
    listeners(eventName?: string): Promise<Array<Listener>>;
    removeAllListeners<TCEvent extends TypedContractEvent>(event?: TCEvent): Promise<this>;
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
    getFunction<T extends ContractMethod = ContractMethod>(key: string | FunctionFragment): T;
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
    filters: {};
}
//# sourceMappingURL=IEmmetFeeOracleAdmin.d.ts.map