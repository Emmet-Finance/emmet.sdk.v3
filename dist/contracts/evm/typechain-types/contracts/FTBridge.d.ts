import type { BaseContract, BigNumberish, BytesLike, FunctionFragment, Result, Interface, EventFragment, AddressLike, ContractRunner, ContractMethod, Listener } from "ethers";
import type { TypedContractEvent, TypedDeferredTopicFilter, TypedEventLog, TypedLogDescription, TypedListener, TypedContractMethod } from "../common";
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
export interface FTBridgeInterface extends Interface {
    getFunction(nameOrSignature: "BRIDGE_VALIDATOR_ROLE" | "DEFAULT_ADMIN_ROLE" | "MAPPING_ADMIN_ROLE" | "PAUSER_ROLE" | "TVL" | "WITHDRAWER_ROLE" | "actionId" | "addChain" | "addValidator" | "areStringsEqual" | "fees" | "getRoleAdmin" | "grantRole" | "hasRole" | "incomming" | "mapNativeContract" | "mapWrappedContract" | "nativeChainId" | "nativeCoin" | "nativeTokens" | "outgoing" | "pause" | "paused" | "receiveInstallment" | "removeValidator" | "renounceRole" | "revokeRole" | "sendInstallment" | "supportedChains" | "supportsInterface" | "unpause" | "updateChain" | "withdrawFees" | "wrappedTokens"): FunctionFragment;
    getEvent(nameOrSignatureOrTopic: "Paused" | "ReceivedInstallment" | "RoleAdminChanged" | "RoleGranted" | "RoleRevoked" | "SendInstallment" | "Unpaused"): EventFragment;
    encodeFunctionData(functionFragment: "BRIDGE_VALIDATOR_ROLE", values?: undefined): string;
    encodeFunctionData(functionFragment: "DEFAULT_ADMIN_ROLE", values?: undefined): string;
    encodeFunctionData(functionFragment: "MAPPING_ADMIN_ROLE", values?: undefined): string;
    encodeFunctionData(functionFragment: "PAUSER_ROLE", values?: undefined): string;
    encodeFunctionData(functionFragment: "TVL", values?: undefined): string;
    encodeFunctionData(functionFragment: "WITHDRAWER_ROLE", values?: undefined): string;
    encodeFunctionData(functionFragment: "actionId", values?: undefined): string;
    encodeFunctionData(functionFragment: "addChain", values: [BigNumberish, string]): string;
    encodeFunctionData(functionFragment: "addValidator", values: [AddressLike]): string;
    encodeFunctionData(functionFragment: "areStringsEqual", values: [string, string]): string;
    encodeFunctionData(functionFragment: "fees", values?: undefined): string;
    encodeFunctionData(functionFragment: "getRoleAdmin", values: [BytesLike]): string;
    encodeFunctionData(functionFragment: "grantRole", values: [BytesLike, AddressLike]): string;
    encodeFunctionData(functionFragment: "hasRole", values: [BytesLike, AddressLike]): string;
    encodeFunctionData(functionFragment: "incomming", values: [BytesLike]): string;
    encodeFunctionData(functionFragment: "mapNativeContract", values: [string, AddressLike, BigNumberish]): string;
    encodeFunctionData(functionFragment: "mapWrappedContract", values: [string, AddressLike, BigNumberish]): string;
    encodeFunctionData(functionFragment: "nativeChainId", values?: undefined): string;
    encodeFunctionData(functionFragment: "nativeCoin", values?: undefined): string;
    encodeFunctionData(functionFragment: "nativeTokens", values: [string]): string;
    encodeFunctionData(functionFragment: "outgoing", values: [BytesLike]): string;
    encodeFunctionData(functionFragment: "pause", values?: undefined): string;
    encodeFunctionData(functionFragment: "paused", values?: undefined): string;
    encodeFunctionData(functionFragment: "receiveInstallment", values: [BytesLike, BridgeStorage.InstallmentInStruct]): string;
    encodeFunctionData(functionFragment: "removeValidator", values: [AddressLike]): string;
    encodeFunctionData(functionFragment: "renounceRole", values: [BytesLike, AddressLike]): string;
    encodeFunctionData(functionFragment: "revokeRole", values: [BytesLike, AddressLike]): string;
    encodeFunctionData(functionFragment: "sendInstallment", values: [BridgeStorage.InstallmentOutStruct]): string;
    encodeFunctionData(functionFragment: "supportedChains", values: [BigNumberish]): string;
    encodeFunctionData(functionFragment: "supportsInterface", values: [BytesLike]): string;
    encodeFunctionData(functionFragment: "unpause", values?: undefined): string;
    encodeFunctionData(functionFragment: "updateChain", values: [BigNumberish, string]): string;
    encodeFunctionData(functionFragment: "withdrawFees", values?: undefined): string;
    encodeFunctionData(functionFragment: "wrappedTokens", values: [string]): string;
    decodeFunctionResult(functionFragment: "BRIDGE_VALIDATOR_ROLE", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "DEFAULT_ADMIN_ROLE", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "MAPPING_ADMIN_ROLE", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "PAUSER_ROLE", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "TVL", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "WITHDRAWER_ROLE", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "actionId", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "addChain", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "addValidator", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "areStringsEqual", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "fees", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getRoleAdmin", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "grantRole", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "hasRole", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "incomming", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "mapNativeContract", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "mapWrappedContract", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "nativeChainId", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "nativeCoin", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "nativeTokens", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "outgoing", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "pause", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "paused", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "receiveInstallment", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "removeValidator", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "renounceRole", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "revokeRole", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "sendInstallment", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "supportedChains", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "supportsInterface", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "unpause", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "updateChain", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "withdrawFees", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "wrappedTokens", data: BytesLike): Result;
}
export declare namespace PausedEvent {
    type InputTuple = [account: AddressLike];
    type OutputTuple = [account: string];
    interface OutputObject {
        account: string;
    }
    type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
    type Filter = TypedDeferredTopicFilter<Event>;
    type Log = TypedEventLog<Event>;
    type LogDescription = TypedLogDescription<Event>;
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
export declare namespace RoleAdminChangedEvent {
    type InputTuple = [
        role: BytesLike,
        previousAdminRole: BytesLike,
        newAdminRole: BytesLike
    ];
    type OutputTuple = [
        role: string,
        previousAdminRole: string,
        newAdminRole: string
    ];
    interface OutputObject {
        role: string;
        previousAdminRole: string;
        newAdminRole: string;
    }
    type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
    type Filter = TypedDeferredTopicFilter<Event>;
    type Log = TypedEventLog<Event>;
    type LogDescription = TypedLogDescription<Event>;
}
export declare namespace RoleGrantedEvent {
    type InputTuple = [
        role: BytesLike,
        account: AddressLike,
        sender: AddressLike
    ];
    type OutputTuple = [role: string, account: string, sender: string];
    interface OutputObject {
        role: string;
        account: string;
        sender: string;
    }
    type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
    type Filter = TypedDeferredTopicFilter<Event>;
    type Log = TypedEventLog<Event>;
    type LogDescription = TypedLogDescription<Event>;
}
export declare namespace RoleRevokedEvent {
    type InputTuple = [
        role: BytesLike,
        account: AddressLike,
        sender: AddressLike
    ];
    type OutputTuple = [role: string, account: string, sender: string];
    interface OutputObject {
        role: string;
        account: string;
        sender: string;
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
export declare namespace UnpausedEvent {
    type InputTuple = [account: AddressLike];
    type OutputTuple = [account: string];
    interface OutputObject {
        account: string;
    }
    type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
    type Filter = TypedDeferredTopicFilter<Event>;
    type Log = TypedEventLog<Event>;
    type LogDescription = TypedLogDescription<Event>;
}
export interface FTBridge extends BaseContract {
    connect(runner?: ContractRunner | null): FTBridge;
    waitForDeployment(): Promise<this>;
    interface: FTBridgeInterface;
    queryFilter<TCEvent extends TypedContractEvent>(event: TCEvent, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TypedEventLog<TCEvent>>>;
    queryFilter<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TypedEventLog<TCEvent>>>;
    on<TCEvent extends TypedContractEvent>(event: TCEvent, listener: TypedListener<TCEvent>): Promise<this>;
    on<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, listener: TypedListener<TCEvent>): Promise<this>;
    once<TCEvent extends TypedContractEvent>(event: TCEvent, listener: TypedListener<TCEvent>): Promise<this>;
    once<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, listener: TypedListener<TCEvent>): Promise<this>;
    listeners<TCEvent extends TypedContractEvent>(event: TCEvent): Promise<Array<TypedListener<TCEvent>>>;
    listeners(eventName?: string): Promise<Array<Listener>>;
    removeAllListeners<TCEvent extends TypedContractEvent>(event?: TCEvent): Promise<this>;
    BRIDGE_VALIDATOR_ROLE: TypedContractMethod<[], [string], "view">;
    DEFAULT_ADMIN_ROLE: TypedContractMethod<[], [string], "view">;
    MAPPING_ADMIN_ROLE: TypedContractMethod<[], [string], "view">;
    PAUSER_ROLE: TypedContractMethod<[], [string], "view">;
    TVL: TypedContractMethod<[], [bigint], "view">;
    WITHDRAWER_ROLE: TypedContractMethod<[], [string], "view">;
    actionId: TypedContractMethod<[], [bigint], "view">;
    addChain: TypedContractMethod<[
        _chainId: BigNumberish,
        _chainName: string
    ], [
        void
    ], "nonpayable">;
    addValidator: TypedContractMethod<[
        _validator: AddressLike
    ], [
        void
    ], "nonpayable">;
    areStringsEqual: TypedContractMethod<[
        first: string,
        second: string
    ], [
        boolean
    ], "view">;
    fees: TypedContractMethod<[], [bigint], "view">;
    getRoleAdmin: TypedContractMethod<[role: BytesLike], [string], "view">;
    grantRole: TypedContractMethod<[
        role: BytesLike,
        account: AddressLike
    ], [
        void
    ], "nonpayable">;
    hasRole: TypedContractMethod<[
        role: BytesLike,
        account: AddressLike
    ], [
        boolean
    ], "view">;
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
    pause: TypedContractMethod<[], [void], "nonpayable">;
    paused: TypedContractMethod<[], [boolean], "view">;
    receiveInstallment: TypedContractMethod<[
        txId: BytesLike,
        params: BridgeStorage.InstallmentInStruct
    ], [
        void
    ], "payable">;
    removeValidator: TypedContractMethod<[
        _validator: AddressLike
    ], [
        void
    ], "nonpayable">;
    renounceRole: TypedContractMethod<[
        role: BytesLike,
        callerConfirmation: AddressLike
    ], [
        void
    ], "nonpayable">;
    revokeRole: TypedContractMethod<[
        role: BytesLike,
        account: AddressLike
    ], [
        void
    ], "nonpayable">;
    sendInstallment: TypedContractMethod<[
        params: BridgeStorage.InstallmentOutStruct
    ], [
        void
    ], "payable">;
    supportedChains: TypedContractMethod<[arg0: BigNumberish], [string], "view">;
    supportsInterface: TypedContractMethod<[
        interfaceId: BytesLike
    ], [
        boolean
    ], "view">;
    unpause: TypedContractMethod<[], [void], "nonpayable">;
    updateChain: TypedContractMethod<[
        _chainId: BigNumberish,
        _chainName: string
    ], [
        void
    ], "nonpayable">;
    withdrawFees: TypedContractMethod<[], [void], "nonpayable">;
    wrappedTokens: TypedContractMethod<[
        arg0: string
    ], [
        [string, bigint] & {
            constractAddress: string;
            decimals: bigint;
        }
    ], "view">;
    getFunction<T extends ContractMethod = ContractMethod>(key: string | FunctionFragment): T;
    getFunction(nameOrSignature: "BRIDGE_VALIDATOR_ROLE"): TypedContractMethod<[], [string], "view">;
    getFunction(nameOrSignature: "DEFAULT_ADMIN_ROLE"): TypedContractMethod<[], [string], "view">;
    getFunction(nameOrSignature: "MAPPING_ADMIN_ROLE"): TypedContractMethod<[], [string], "view">;
    getFunction(nameOrSignature: "PAUSER_ROLE"): TypedContractMethod<[], [string], "view">;
    getFunction(nameOrSignature: "TVL"): TypedContractMethod<[], [bigint], "view">;
    getFunction(nameOrSignature: "WITHDRAWER_ROLE"): TypedContractMethod<[], [string], "view">;
    getFunction(nameOrSignature: "actionId"): TypedContractMethod<[], [bigint], "view">;
    getFunction(nameOrSignature: "addChain"): TypedContractMethod<[
        _chainId: BigNumberish,
        _chainName: string
    ], [
        void
    ], "nonpayable">;
    getFunction(nameOrSignature: "addValidator"): TypedContractMethod<[_validator: AddressLike], [void], "nonpayable">;
    getFunction(nameOrSignature: "areStringsEqual"): TypedContractMethod<[first: string, second: string], [boolean], "view">;
    getFunction(nameOrSignature: "fees"): TypedContractMethod<[], [bigint], "view">;
    getFunction(nameOrSignature: "getRoleAdmin"): TypedContractMethod<[role: BytesLike], [string], "view">;
    getFunction(nameOrSignature: "grantRole"): TypedContractMethod<[
        role: BytesLike,
        account: AddressLike
    ], [
        void
    ], "nonpayable">;
    getFunction(nameOrSignature: "hasRole"): TypedContractMethod<[
        role: BytesLike,
        account: AddressLike
    ], [
        boolean
    ], "view">;
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
    getFunction(nameOrSignature: "pause"): TypedContractMethod<[], [void], "nonpayable">;
    getFunction(nameOrSignature: "paused"): TypedContractMethod<[], [boolean], "view">;
    getFunction(nameOrSignature: "receiveInstallment"): TypedContractMethod<[
        txId: BytesLike,
        params: BridgeStorage.InstallmentInStruct
    ], [
        void
    ], "payable">;
    getFunction(nameOrSignature: "removeValidator"): TypedContractMethod<[_validator: AddressLike], [void], "nonpayable">;
    getFunction(nameOrSignature: "renounceRole"): TypedContractMethod<[
        role: BytesLike,
        callerConfirmation: AddressLike
    ], [
        void
    ], "nonpayable">;
    getFunction(nameOrSignature: "revokeRole"): TypedContractMethod<[
        role: BytesLike,
        account: AddressLike
    ], [
        void
    ], "nonpayable">;
    getFunction(nameOrSignature: "sendInstallment"): TypedContractMethod<[
        params: BridgeStorage.InstallmentOutStruct
    ], [
        void
    ], "payable">;
    getFunction(nameOrSignature: "supportedChains"): TypedContractMethod<[arg0: BigNumberish], [string], "view">;
    getFunction(nameOrSignature: "supportsInterface"): TypedContractMethod<[interfaceId: BytesLike], [boolean], "view">;
    getFunction(nameOrSignature: "unpause"): TypedContractMethod<[], [void], "nonpayable">;
    getFunction(nameOrSignature: "updateChain"): TypedContractMethod<[
        _chainId: BigNumberish,
        _chainName: string
    ], [
        void
    ], "nonpayable">;
    getFunction(nameOrSignature: "withdrawFees"): TypedContractMethod<[], [void], "nonpayable">;
    getFunction(nameOrSignature: "wrappedTokens"): TypedContractMethod<[
        arg0: string
    ], [
        [string, bigint] & {
            constractAddress: string;
            decimals: bigint;
        }
    ], "view">;
    getEvent(key: "Paused"): TypedContractEvent<PausedEvent.InputTuple, PausedEvent.OutputTuple, PausedEvent.OutputObject>;
    getEvent(key: "ReceivedInstallment"): TypedContractEvent<ReceivedInstallmentEvent.InputTuple, ReceivedInstallmentEvent.OutputTuple, ReceivedInstallmentEvent.OutputObject>;
    getEvent(key: "RoleAdminChanged"): TypedContractEvent<RoleAdminChangedEvent.InputTuple, RoleAdminChangedEvent.OutputTuple, RoleAdminChangedEvent.OutputObject>;
    getEvent(key: "RoleGranted"): TypedContractEvent<RoleGrantedEvent.InputTuple, RoleGrantedEvent.OutputTuple, RoleGrantedEvent.OutputObject>;
    getEvent(key: "RoleRevoked"): TypedContractEvent<RoleRevokedEvent.InputTuple, RoleRevokedEvent.OutputTuple, RoleRevokedEvent.OutputObject>;
    getEvent(key: "SendInstallment"): TypedContractEvent<SendInstallmentEvent.InputTuple, SendInstallmentEvent.OutputTuple, SendInstallmentEvent.OutputObject>;
    getEvent(key: "Unpaused"): TypedContractEvent<UnpausedEvent.InputTuple, UnpausedEvent.OutputTuple, UnpausedEvent.OutputObject>;
    filters: {
        "Paused(address)": TypedContractEvent<PausedEvent.InputTuple, PausedEvent.OutputTuple, PausedEvent.OutputObject>;
        Paused: TypedContractEvent<PausedEvent.InputTuple, PausedEvent.OutputTuple, PausedEvent.OutputObject>;
        "ReceivedInstallment(uint256,bytes32,uint16,uint16,string,address)": TypedContractEvent<ReceivedInstallmentEvent.InputTuple, ReceivedInstallmentEvent.OutputTuple, ReceivedInstallmentEvent.OutputObject>;
        ReceivedInstallment: TypedContractEvent<ReceivedInstallmentEvent.InputTuple, ReceivedInstallmentEvent.OutputTuple, ReceivedInstallmentEvent.OutputObject>;
        "RoleAdminChanged(bytes32,bytes32,bytes32)": TypedContractEvent<RoleAdminChangedEvent.InputTuple, RoleAdminChangedEvent.OutputTuple, RoleAdminChangedEvent.OutputObject>;
        RoleAdminChanged: TypedContractEvent<RoleAdminChangedEvent.InputTuple, RoleAdminChangedEvent.OutputTuple, RoleAdminChangedEvent.OutputObject>;
        "RoleGranted(bytes32,address,address)": TypedContractEvent<RoleGrantedEvent.InputTuple, RoleGrantedEvent.OutputTuple, RoleGrantedEvent.OutputObject>;
        RoleGranted: TypedContractEvent<RoleGrantedEvent.InputTuple, RoleGrantedEvent.OutputTuple, RoleGrantedEvent.OutputObject>;
        "RoleRevoked(bytes32,address,address)": TypedContractEvent<RoleRevokedEvent.InputTuple, RoleRevokedEvent.OutputTuple, RoleRevokedEvent.OutputObject>;
        RoleRevoked: TypedContractEvent<RoleRevokedEvent.InputTuple, RoleRevokedEvent.OutputTuple, RoleRevokedEvent.OutputObject>;
        "SendInstallment(uint256,bytes32,uint16,uint16,string,string)": TypedContractEvent<SendInstallmentEvent.InputTuple, SendInstallmentEvent.OutputTuple, SendInstallmentEvent.OutputObject>;
        SendInstallment: TypedContractEvent<SendInstallmentEvent.InputTuple, SendInstallmentEvent.OutputTuple, SendInstallmentEvent.OutputObject>;
        "Unpaused(address)": TypedContractEvent<UnpausedEvent.InputTuple, UnpausedEvent.OutputTuple, UnpausedEvent.OutputObject>;
        Unpaused: TypedContractEvent<UnpausedEvent.InputTuple, UnpausedEvent.OutputTuple, UnpausedEvent.OutputObject>;
    };
}
//# sourceMappingURL=FTBridge.d.ts.map