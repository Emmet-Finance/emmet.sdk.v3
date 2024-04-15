import { type ContractRunner } from "ethers";
import type { IERC20MinterBurner, IERC20MinterBurnerInterface } from "../../../contracts/BridgeComponents/IERC20MinterBurner";
export declare class IERC20MinterBurner__factory {
    static readonly abi: readonly [{
        readonly inputs: readonly [{
            readonly internalType: "address";
            readonly name: "from";
            readonly type: "address";
        }, {
            readonly internalType: "uint256";
            readonly name: "value";
            readonly type: "uint256";
        }];
        readonly name: "burnFrom";
        readonly outputs: readonly [];
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "address";
            readonly name: "to";
            readonly type: "address";
        }, {
            readonly internalType: "uint256";
            readonly name: "amount";
            readonly type: "uint256";
        }];
        readonly name: "mint";
        readonly outputs: readonly [];
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }];
    static createInterface(): IERC20MinterBurnerInterface;
    static connect(address: string, runner?: ContractRunner | null): IERC20MinterBurner;
}
//# sourceMappingURL=IERC20MinterBurner__factory.d.ts.map