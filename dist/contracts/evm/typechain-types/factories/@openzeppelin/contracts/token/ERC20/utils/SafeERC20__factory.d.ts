import { ContractFactory, ContractTransactionResponse } from "ethers";
import type { Signer, ContractDeployTransaction, ContractRunner } from "ethers";
import type { NonPayableOverrides } from "../../../../../../common";
import type { SafeERC20, SafeERC20Interface } from "../../../../../../@openzeppelin/contracts/token/ERC20/utils/SafeERC20";
type SafeERC20ConstructorParams = [signer?: Signer] | ConstructorParameters<typeof ContractFactory>;
export declare class SafeERC20__factory extends ContractFactory {
    constructor(...args: SafeERC20ConstructorParams);
    getDeployTransaction(overrides?: NonPayableOverrides & {
        from?: string;
    }): Promise<ContractDeployTransaction>;
    deploy(overrides?: NonPayableOverrides & {
        from?: string;
    }): Promise<SafeERC20 & {
        deploymentTransaction(): ContractTransactionResponse;
    }>;
    connect(runner: ContractRunner | null): SafeERC20__factory;
    static readonly bytecode = "0x60566050600b82828239805160001a6073146043577f4e487b7100000000000000000000000000000000000000000000000000000000600052600060045260246000fd5b30600052607381538281f3fe73000000000000000000000000000000000000000030146080604052600080fdfea2646970667358221220dc0c1c87e408c4e55dc6229db728f4ce7c7bcde319cf505b5daf94e2df764f5264736f6c63430008140033";
    static readonly abi: readonly [{
        readonly inputs: readonly [{
            readonly internalType: "address";
            readonly name: "spender";
            readonly type: "address";
        }, {
            readonly internalType: "uint256";
            readonly name: "currentAllowance";
            readonly type: "uint256";
        }, {
            readonly internalType: "uint256";
            readonly name: "requestedDecrease";
            readonly type: "uint256";
        }];
        readonly name: "SafeERC20FailedDecreaseAllowance";
        readonly type: "error";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "address";
            readonly name: "token";
            readonly type: "address";
        }];
        readonly name: "SafeERC20FailedOperation";
        readonly type: "error";
    }];
    static createInterface(): SafeERC20Interface;
    static connect(address: string, runner?: ContractRunner | null): SafeERC20;
}
export {};
//# sourceMappingURL=SafeERC20__factory.d.ts.map