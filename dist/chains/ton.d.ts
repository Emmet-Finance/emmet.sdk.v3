import { Address, type Sender, TonClient } from "@ton/ton";
import { type ChainID, type ChainName, type Decimals, type FetchTxInfo, type GetBalance, type GetBridgeAddress, type GetEmmetHashFromTx, type GetEstimatedTime, type GetProvider, type GetTokenBalance, type GetTxFee, type NativeCoinName, type ProtocolFee, type SendInstallment, type TokenInfo, type ValidateAddress, type AddressBook, type StakeLiquidity, type WithdrawFees, type WithdrawLiquidity, type IsTransferFromLp, type GetProtocolFeeInUSD, type GetCrossChainStrategy, type GetTokenAddress, ILiquidityPool } from ".";
export type TonGasArgs = {
    value: bigint;
    bounce?: boolean | null | undefined;
};
export type TonHelper = AddressBook & ChainID & ChainName & Decimals & GetBridgeAddress & GetBalance & GetCrossChainStrategy & GetEmmetHashFromTx & GetEstimatedTime & GetProtocolFeeInUSD & GetProvider<TonClient> & GetTokenAddress & GetTokenBalance & GetTxFee & NativeCoinName & ProtocolFee & TokenInfo & ValidateAddress & FetchTxInfo & SendInstallment<Sender, string, TonGasArgs> & ILiquidityPool<Sender, string, {
    value: bigint;
    bounce?: boolean;
}> & StakeLiquidity<Sender, string, {
    value: bigint;
    bounce?: boolean;
}> & WithdrawLiquidity<Sender, string, {
    value: bigint;
    bounce?: boolean;
}> & WithdrawFees<Sender, string, {
    value: bigint;
    bounce?: boolean;
}> & IsTransferFromLp;
export interface TonParams {
    rpcs: readonly string[];
    nativeTokenId: bigint;
    chainName: string;
    chainId: bigint;
    addressBook: Address;
}
/**
 * Holds the code execution for a number of `ms` milliseconds
 * @param ms number of milliseconds to wait
 * @returns halts the program execution for the `ms` milliseconds
 */
export declare const sleep: (ms: number) => Promise<unknown>;
export declare function tonHandler({ rpcs, nativeTokenId, chainName, chainId, addressBook, }: TonParams): Promise<TonHelper>;
export declare function raise(msg: string): never;
export declare function assertNotNull<T>(t: T | null | undefined): t is T;
//# sourceMappingURL=ton.d.ts.map