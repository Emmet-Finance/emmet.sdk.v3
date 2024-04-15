import { type ContractRunner } from "ethers";
import type { IMappingAdmin, IMappingAdminInterface } from "../../../contracts/BridgeComponents/IMappingAdmin";
export declare class IMappingAdmin__factory {
    static readonly abi: readonly [{
        readonly inputs: readonly [{
            readonly internalType: "uint16";
            readonly name: "_chainId";
            readonly type: "uint16";
        }, {
            readonly internalType: "string";
            readonly name: "_chainName";
            readonly type: "string";
        }];
        readonly name: "addChain";
        readonly outputs: readonly [];
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "string";
            readonly name: "_symbol";
            readonly type: "string";
        }, {
            readonly internalType: "address";
            readonly name: "_contract";
            readonly type: "address";
        }, {
            readonly internalType: "uint8";
            readonly name: "_decimals";
            readonly type: "uint8";
        }];
        readonly name: "mapNativeContract";
        readonly outputs: readonly [];
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "string";
            readonly name: "_symbol";
            readonly type: "string";
        }, {
            readonly internalType: "address";
            readonly name: "_contract";
            readonly type: "address";
        }, {
            readonly internalType: "uint8";
            readonly name: "_decimals";
            readonly type: "uint8";
        }];
        readonly name: "mapWrappedContract";
        readonly outputs: readonly [];
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "uint16";
            readonly name: "_chainId";
            readonly type: "uint16";
        }, {
            readonly internalType: "string";
            readonly name: "_chainName";
            readonly type: "string";
        }];
        readonly name: "updateChain";
        readonly outputs: readonly [];
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }];
    static createInterface(): IMappingAdminInterface;
    static connect(address: string, runner?: ContractRunner | null): IMappingAdmin;
}
//# sourceMappingURL=IMappingAdmin__factory.d.ts.map