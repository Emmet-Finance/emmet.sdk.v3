import type { BaseContract, BigNumberish, BytesLike, FunctionFragment, Result, Interface, ContractRunner, ContractMethod, Listener } from "ethers";
import type { TypedContractEvent, TypedDeferredTopicFilter, TypedEventLog, TypedListener, TypedContractMethod } from "../../common";
export interface BridgeUtilsInterface extends Interface {
    getFunction(nameOrSignature: "TVL" | "actionId" | "areStringsEqual" | "fees" | "incomming" | "nativeChainId" | "nativeCoin" | "nativeTokens" | "outgoing" | "supportedChains" | "wrappedTokens"): FunctionFragment;
    encodeFunctionData(functionFragment: "TVL", values?: undefined): string;
    encodeFunctionData(functionFragment: "actionId", values?: undefined): string;
    encodeFunctionData(functionFragment: "areStringsEqual", values: [string, string]): string;
    encodeFunctionData(functionFragment: "fees", values?: undefined): string;
    encodeFunctionData(functionFragment: "incomming", values: [BytesLike]): string;
    encodeFunctionData(functionFragment: "nativeChainId", values?: undefined): string;
    encodeFunctionData(functionFragment: "nativeCoin", values?: undefined): string;
    encodeFunctionData(functionFragment: "nativeTokens", values: [string]): string;
    encodeFunctionData(functionFragment: "outgoing", values: [BytesLike]): string;
    encodeFunctionData(functionFragment: "supportedChains", values: [BigNumberish]): string;
    encodeFunctionData(functionFragment: "wrappedTokens", values: [string]): string;
    decodeFunctionResult(functionFragment: "TVL", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "actionId", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "areStringsEqual", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "fees", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "incomming", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "nativeChainId", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "nativeCoin", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "nativeTokens", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "outgoing", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "supportedChains", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "wrappedTokens", data: BytesLike): Result;
}
export interface BridgeUtils extends BaseContract {
    connect(runner?: ContractRunner | null): BridgeUtils;
    waitForDeployment(): Promise<this>;
    interface: BridgeUtilsInterface;
    queryFilter<TCEvent extends TypedContractEvent>(event: TCEvent, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TypedEventLog<TCEvent>>>;
    queryFilter<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TypedEventLog<TCEvent>>>;
    on<TCEvent extends TypedContractEvent>(event: TCEvent, listener: TypedListener<TCEvent>): Promise<this>;
    on<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, listener: TypedListener<TCEvent>): Promise<this>;
    once<TCEvent extends TypedContractEvent>(event: TCEvent, listener: TypedListener<TCEvent>): Promise<this>;
    once<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, listener: TypedListener<TCEvent>): Promise<this>;
    listeners<TCEvent extends TypedContractEvent>(event: TCEvent): Promise<Array<TypedListener<TCEvent>>>;
    listeners(eventName?: string): Promise<Array<Listener>>;
    removeAllListeners<TCEvent extends TypedContractEvent>(event?: TCEvent): Promise<this>;
    TVL: TypedContractMethod<[], [bigint], "view">;
    actionId: TypedContractMethod<[], [bigint], "view">;
    areStringsEqual: TypedContractMethod<[
        first: string,
        second: string
    ], [
        boolean
    ], "view">;
    fees: TypedContractMethod<[], [bigint], "view">;
    incomming: TypedContractMethod<[
        arg0: BytesLike
    ], [
        [
            bigint,
            bigint,
            string,
            string
        ] & {
            amount: bigint;
            chainId: bigint;
            tokenSymbol: string;
            destinationAddress: string;
        }
    ], "view">;
    nativeChainId: TypedContractMethod<[], [bigint], "view">;
    nativeCoin: TypedContractMethod<[], [string], "view">;
    nativeTokens: TypedContractMethod<[
        arg0: string
    ], [
        [string, bigint] & {
            constractAddress: string;
            decimals: bigint;
        }
    ], "view">;
    outgoing: TypedContractMethod<[
        arg0: BytesLike
    ], [
        [
            bigint,
            bigint,
            string,
            string
        ] & {
            amount: bigint;
            chainId: bigint;
            tokenSymbol: string;
            destinationAddress: string;
        }
    ], "view">;
    supportedChains: TypedContractMethod<[arg0: BigNumberish], [string], "view">;
    wrappedTokens: TypedContractMethod<[
        arg0: string
    ], [
        [string, bigint] & {
            constractAddress: string;
            decimals: bigint;
        }
    ], "view">;
    getFunction<T extends ContractMethod = ContractMethod>(key: string | FunctionFragment): T;
    getFunction(nameOrSignature: "TVL"): TypedContractMethod<[], [bigint], "view">;
    getFunction(nameOrSignature: "actionId"): TypedContractMethod<[], [bigint], "view">;
    getFunction(nameOrSignature: "areStringsEqual"): TypedContractMethod<[first: string, second: string], [boolean], "view">;
    getFunction(nameOrSignature: "fees"): TypedContractMethod<[], [bigint], "view">;
    getFunction(nameOrSignature: "incomming"): TypedContractMethod<[
        arg0: BytesLike
    ], [
        [
            bigint,
            bigint,
            string,
            string
        ] & {
            amount: bigint;
            chainId: bigint;
            tokenSymbol: string;
            destinationAddress: string;
        }
    ], "view">;
    getFunction(nameOrSignature: "nativeChainId"): TypedContractMethod<[], [bigint], "view">;
    getFunction(nameOrSignature: "nativeCoin"): TypedContractMethod<[], [string], "view">;
    getFunction(nameOrSignature: "nativeTokens"): TypedContractMethod<[
        arg0: string
    ], [
        [string, bigint] & {
            constractAddress: string;
            decimals: bigint;
        }
    ], "view">;
    getFunction(nameOrSignature: "outgoing"): TypedContractMethod<[
        arg0: BytesLike
    ], [
        [
            bigint,
            bigint,
            string,
            string
        ] & {
            amount: bigint;
            chainId: bigint;
            tokenSymbol: string;
            destinationAddress: string;
        }
    ], "view">;
    getFunction(nameOrSignature: "supportedChains"): TypedContractMethod<[arg0: BigNumberish], [string], "view">;
    getFunction(nameOrSignature: "wrappedTokens"): TypedContractMethod<[
        arg0: string
    ], [
        [string, bigint] & {
            constractAddress: string;
            decimals: bigint;
        }
    ], "view">;
    filters: {};
}
//# sourceMappingURL=BridgeUtils.d.ts.map