import { type ContractRunner } from "ethers";
import type { IEmmetFeeOracle, IEmmetFeeOracleInterface } from "../../../contracts/PriceOracle/IEmmetFeeOracle";
export declare class IEmmetFeeOracle__factory {
    static readonly abi: readonly [{
        readonly inputs: readonly [{
            readonly internalType: "string";
            readonly name: "coinName_";
            readonly type: "string";
        }, {
            readonly internalType: "uint256";
            readonly name: "amount_";
            readonly type: "uint256";
        }];
        readonly name: "calculateCoinFees";
        readonly outputs: readonly [{
            readonly internalType: "uint256";
            readonly name: "";
            readonly type: "uint256";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "string";
            readonly name: "destChainName_";
            readonly type: "string";
        }];
        readonly name: "calculateTransactionFee";
        readonly outputs: readonly [{
            readonly internalType: "uint256";
            readonly name: "";
            readonly type: "uint256";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "string";
            readonly name: "chainName_";
            readonly type: "string";
        }];
        readonly name: "getChainByname";
        readonly outputs: readonly [{
            readonly components: readonly [{
                readonly internalType: "uint64";
                readonly name: "chainId";
                readonly type: "uint64";
            }, {
                readonly internalType: "uint64";
                readonly name: "domain";
                readonly type: "uint64";
            }, {
                readonly internalType: "uint64";
                readonly name: "txFee";
                readonly type: "uint64";
            }, {
                readonly internalType: "bytes14";
                readonly name: "nativeCoin";
                readonly type: "bytes14";
            }];
            readonly internalType: "struct IEmmetFeeOracle.Chain";
            readonly name: "";
            readonly type: "tuple";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "uint64";
            readonly name: "destDomain_";
            readonly type: "uint64";
        }];
        readonly name: "getChainFee";
        readonly outputs: readonly [{
            readonly internalType: "uint64";
            readonly name: "";
            readonly type: "uint64";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "uint64";
            readonly name: "destDomain_";
            readonly type: "uint64";
        }];
        readonly name: "getChainNameByDomain";
        readonly outputs: readonly [{
            readonly internalType: "string";
            readonly name: "";
            readonly type: "string";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "uint64";
            readonly name: "chainId_";
            readonly type: "uint64";
        }];
        readonly name: "getChainNameById";
        readonly outputs: readonly [{
            readonly internalType: "string";
            readonly name: "";
            readonly type: "string";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "string";
            readonly name: "coinName_";
            readonly type: "string";
        }];
        readonly name: "getCoinFee";
        readonly outputs: readonly [{
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
            readonly name: "";
            readonly type: "tuple";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "string";
            readonly name: "coinName";
            readonly type: "string";
        }];
        readonly name: "getCoinPrice";
        readonly outputs: readonly [{
            readonly internalType: "uint256";
            readonly name: "";
            readonly type: "uint256";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly inputs: readonly [];
        readonly name: "selfCoin";
        readonly outputs: readonly [{
            readonly internalType: "string";
            readonly name: "";
            readonly type: "string";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }];
    static createInterface(): IEmmetFeeOracleInterface;
    static connect(address: string, runner?: ContractRunner | null): IEmmetFeeOracle;
}
//# sourceMappingURL=IEmmetFeeOracle__factory.d.ts.map