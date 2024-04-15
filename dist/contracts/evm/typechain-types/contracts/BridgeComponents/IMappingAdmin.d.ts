import type { BaseContract, BigNumberish, BytesLike, FunctionFragment, Result, Interface, AddressLike, ContractRunner, ContractMethod, Listener } from "ethers";
import type { TypedContractEvent, TypedDeferredTopicFilter, TypedEventLog, TypedListener, TypedContractMethod } from "../../common";
export interface IMappingAdminInterface extends Interface {
    getFunction(nameOrSignature: "addChain" | "mapNativeContract" | "mapWrappedContract" | "updateChain"): FunctionFragment;
    encodeFunctionData(functionFragment: "addChain", values: [BigNumberish, string]): string;
    encodeFunctionData(functionFragment: "mapNativeContract", values: [string, AddressLike, BigNumberish]): string;
    encodeFunctionData(functionFragment: "mapWrappedContract", values: [string, AddressLike, BigNumberish]): string;
    encodeFunctionData(functionFragment: "updateChain", values: [BigNumberish, string]): string;
    decodeFunctionResult(functionFragment: "addChain", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "mapNativeContract", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "mapWrappedContract", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "updateChain", data: BytesLike): Result;
}
export interface IMappingAdmin extends BaseContract {
    connect(runner?: ContractRunner | null): IMappingAdmin;
    waitForDeployment(): Promise<this>;
    interface: IMappingAdminInterface;
    queryFilter<TCEvent extends TypedContractEvent>(event: TCEvent, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TypedEventLog<TCEvent>>>;
    queryFilter<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TypedEventLog<TCEvent>>>;
    on<TCEvent extends TypedContractEvent>(event: TCEvent, listener: TypedListener<TCEvent>): Promise<this>;
    on<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, listener: TypedListener<TCEvent>): Promise<this>;
    once<TCEvent extends TypedContractEvent>(event: TCEvent, listener: TypedListener<TCEvent>): Promise<this>;
    once<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, listener: TypedListener<TCEvent>): Promise<this>;
    listeners<TCEvent extends TypedContractEvent>(event: TCEvent): Promise<Array<TypedListener<TCEvent>>>;
    listeners(eventName?: string): Promise<Array<Listener>>;
    removeAllListeners<TCEvent extends TypedContractEvent>(event?: TCEvent): Promise<this>;
    addChain: TypedContractMethod<[
        _chainId: BigNumberish,
        _chainName: string
    ], [
        void
    ], "nonpayable">;
    mapNativeContract: TypedContractMethod<[
        _symbol: string,
        _contract: AddressLike,
        _decimals: BigNumberish
    ], [
        void
    ], "nonpayable">;
    mapWrappedContract: TypedContractMethod<[
        _symbol: string,
        _contract: AddressLike,
        _decimals: BigNumberish
    ], [
        void
    ], "nonpayable">;
    updateChain: TypedContractMethod<[
        _chainId: BigNumberish,
        _chainName: string
    ], [
        void
    ], "nonpayable">;
    getFunction<T extends ContractMethod = ContractMethod>(key: string | FunctionFragment): T;
    getFunction(nameOrSignature: "addChain"): TypedContractMethod<[
        _chainId: BigNumberish,
        _chainName: string
    ], [
        void
    ], "nonpayable">;
    getFunction(nameOrSignature: "mapNativeContract"): TypedContractMethod<[
        _symbol: string,
        _contract: AddressLike,
        _decimals: BigNumberish
    ], [
        void
    ], "nonpayable">;
    getFunction(nameOrSignature: "mapWrappedContract"): TypedContractMethod<[
        _symbol: string,
        _contract: AddressLike,
        _decimals: BigNumberish
    ], [
        void
    ], "nonpayable">;
    getFunction(nameOrSignature: "updateChain"): TypedContractMethod<[
        _chainId: BigNumberish,
        _chainName: string
    ], [
        void
    ], "nonpayable">;
    filters: {};
}
//# sourceMappingURL=IMappingAdmin.d.ts.map