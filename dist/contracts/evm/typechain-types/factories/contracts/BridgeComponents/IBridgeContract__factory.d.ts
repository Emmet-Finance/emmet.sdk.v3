import { type ContractRunner } from "ethers";
import type { IBridgeContract, IBridgeContractInterface } from "../../../contracts/BridgeComponents/IBridgeContract";
export declare class IBridgeContract__factory {
    static readonly abi: readonly [{
        readonly anonymous: false;
        readonly inputs: readonly [{
            readonly indexed: false;
            readonly internalType: "uint256";
            readonly name: "amount";
            readonly type: "uint256";
        }, {
            readonly indexed: false;
            readonly internalType: "bytes32";
            readonly name: "txId";
            readonly type: "bytes32";
        }, {
            readonly indexed: false;
            readonly internalType: "uint16";
            readonly name: "fromChain";
            readonly type: "uint16";
        }, {
            readonly indexed: false;
            readonly internalType: "uint16";
            readonly name: "toChain";
            readonly type: "uint16";
        }, {
            readonly indexed: false;
            readonly internalType: "string";
            readonly name: "tokenSymbol";
            readonly type: "string";
        }, {
            readonly indexed: false;
            readonly internalType: "address";
            readonly name: "toAddress";
            readonly type: "address";
        }];
        readonly name: "ReceivedInstallment";
        readonly type: "event";
    }, {
        readonly anonymous: false;
        readonly inputs: readonly [{
            readonly indexed: false;
            readonly internalType: "uint256";
            readonly name: "amount";
            readonly type: "uint256";
        }, {
            readonly indexed: false;
            readonly internalType: "bytes32";
            readonly name: "txId";
            readonly type: "bytes32";
        }, {
            readonly indexed: false;
            readonly internalType: "uint16";
            readonly name: "fromChain";
            readonly type: "uint16";
        }, {
            readonly indexed: false;
            readonly internalType: "uint16";
            readonly name: "toChain";
            readonly type: "uint16";
        }, {
            readonly indexed: false;
            readonly internalType: "string";
            readonly name: "tokenSymbol";
            readonly type: "string";
        }, {
            readonly indexed: false;
            readonly internalType: "string";
            readonly name: "toAddress";
            readonly type: "string";
        }];
        readonly name: "SendInstallment";
        readonly type: "event";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "bytes32";
            readonly name: "txId";
            readonly type: "bytes32";
        }, {
            readonly components: readonly [{
                readonly internalType: "uint256";
                readonly name: "amount";
                readonly type: "uint256";
            }, {
                readonly internalType: "uint16";
                readonly name: "chainId";
                readonly type: "uint16";
            }, {
                readonly internalType: "string";
                readonly name: "tokenSymbol";
                readonly type: "string";
            }, {
                readonly internalType: "address payable";
                readonly name: "destinationAddress";
                readonly type: "address";
            }];
            readonly internalType: "struct BridgeStorage.InstallmentIn";
            readonly name: "params";
            readonly type: "tuple";
        }];
        readonly name: "receiveInstallment";
        readonly outputs: readonly [];
        readonly stateMutability: "payable";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly components: readonly [{
                readonly internalType: "uint256";
                readonly name: "amount";
                readonly type: "uint256";
            }, {
                readonly internalType: "uint16";
                readonly name: "chainId";
                readonly type: "uint16";
            }, {
                readonly internalType: "string";
                readonly name: "tokenSymbol";
                readonly type: "string";
            }, {
                readonly internalType: "string";
                readonly name: "destinationAddress";
                readonly type: "string";
            }];
            readonly internalType: "struct BridgeStorage.InstallmentOut";
            readonly name: "params";
            readonly type: "tuple";
        }];
        readonly name: "sendInstallment";
        readonly outputs: readonly [];
        readonly stateMutability: "payable";
        readonly type: "function";
    }];
    static createInterface(): IBridgeContractInterface;
    static connect(address: string, runner?: ContractRunner | null): IBridgeContract;
}
//# sourceMappingURL=IBridgeContract__factory.d.ts.map