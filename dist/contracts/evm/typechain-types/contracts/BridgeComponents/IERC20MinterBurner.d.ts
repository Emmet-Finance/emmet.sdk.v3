import type { BaseContract, BigNumberish, BytesLike, FunctionFragment, Result, Interface, AddressLike, ContractRunner, ContractMethod, Listener } from "ethers";
import type { TypedContractEvent, TypedDeferredTopicFilter, TypedEventLog, TypedListener, TypedContractMethod } from "../../common";
export interface IERC20MinterBurnerInterface extends Interface {
    getFunction(nameOrSignature: "burnFrom" | "mint"): FunctionFragment;
    encodeFunctionData(functionFragment: "burnFrom", values: [AddressLike, BigNumberish]): string;
    encodeFunctionData(functionFragment: "mint", values: [AddressLike, BigNumberish]): string;
    decodeFunctionResult(functionFragment: "burnFrom", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "mint", data: BytesLike): Result;
}
export interface IERC20MinterBurner extends BaseContract {
    connect(runner?: ContractRunner | null): IERC20MinterBurner;
    waitForDeployment(): Promise<this>;
    interface: IERC20MinterBurnerInterface;
    queryFilter<TCEvent extends TypedContractEvent>(event: TCEvent, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TypedEventLog<TCEvent>>>;
    queryFilter<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TypedEventLog<TCEvent>>>;
    on<TCEvent extends TypedContractEvent>(event: TCEvent, listener: TypedListener<TCEvent>): Promise<this>;
    on<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, listener: TypedListener<TCEvent>): Promise<this>;
    once<TCEvent extends TypedContractEvent>(event: TCEvent, listener: TypedListener<TCEvent>): Promise<this>;
    once<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, listener: TypedListener<TCEvent>): Promise<this>;
    listeners<TCEvent extends TypedContractEvent>(event: TCEvent): Promise<Array<TypedListener<TCEvent>>>;
    listeners(eventName?: string): Promise<Array<Listener>>;
    removeAllListeners<TCEvent extends TypedContractEvent>(event?: TCEvent): Promise<this>;
    burnFrom: TypedContractMethod<[
        from: AddressLike,
        value: BigNumberish
    ], [
        void
    ], "nonpayable">;
    mint: TypedContractMethod<[
        to: AddressLike,
        amount: BigNumberish
    ], [
        void
    ], "nonpayable">;
    getFunction<T extends ContractMethod = ContractMethod>(key: string | FunctionFragment): T;
    getFunction(nameOrSignature: "burnFrom"): TypedContractMethod<[
        from: AddressLike,
        value: BigNumberish
    ], [
        void
    ], "nonpayable">;
    getFunction(nameOrSignature: "mint"): TypedContractMethod<[
        to: AddressLike,
        amount: BigNumberish
    ], [
        void
    ], "nonpayable">;
    filters: {};
}
//# sourceMappingURL=IERC20MinterBurner.d.ts.map