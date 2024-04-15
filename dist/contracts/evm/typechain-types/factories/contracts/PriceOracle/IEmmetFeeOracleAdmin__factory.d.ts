import { type ContractRunner } from "ethers";
import type { IEmmetFeeOracleAdmin, IEmmetFeeOracleAdminInterface } from "../../../contracts/PriceOracle/IEmmetFeeOracleAdmin";
export declare class IEmmetFeeOracleAdmin__factory {
    static readonly abi: readonly [{
        readonly inputs: readonly [{
            readonly internalType: "string";
            readonly name: "chainName";
            readonly type: "string";
        }, {
            readonly internalType: "uint64";
            readonly name: "chainId_";
            readonly type: "uint64";
        }, {
            readonly internalType: "uint64";
            readonly name: "domain_";
            readonly type: "uint64";
        }, {
            readonly internalType: "uint64";
            readonly name: "txFee_";
            readonly type: "uint64";
        }, {
            readonly internalType: "string";
            readonly name: "nativeCoin_";
            readonly type: "string";
        }];
        readonly name: "updateChain";
        readonly outputs: readonly [];
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "string";
            readonly name: "coinName_";
            readonly type: "string";
        }, {
            readonly components: readonly [{
                readonly internalType: "uint128";
                readonly name: "minimum";
                readonly type: "uint128";
            }, {
                readonly internalType: "uint128";
                readonly name: "percentage";
                readonly type: "uint128";
            }];
            readonly internalType: "struct IEmmetFeeOracle.CoinFee";
            readonly name: "coinFee_";
            readonly type: "tuple";
        }];
        readonly name: "updateCoinFee";
        readonly outputs: readonly [];
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "uint256";
            readonly name: "protocolFeeDivisor_";
            readonly type: "uint256";
        }];
        readonly name: "updateProtocolFeeDivisor";
        readonly outputs: readonly [];
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }];
    static createInterface(): IEmmetFeeOracleAdminInterface;
    static connect(address: string, runner?: ContractRunner | null): IEmmetFeeOracleAdmin;
}
//# sourceMappingURL=IEmmetFeeOracleAdmin__factory.d.ts.map