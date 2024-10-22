import { Address, type Sender, TonClient } from "@ton/ton";
import { type ChainID, type ChainName, type Decimals, type FetchTxInfo, type GetBalance, type GetBridgeAddress, type GetEmmetHashFromTx, type GetEstimatedTime, type GetProvider, type GetTokenBalance, type GetTxFee, type NativeCoinName, type ProtocolFee, type SendInstallment, type TokenInfo, type ValidateAddress, type AddressBook, type StakeLiquidity, type GetLpCurrentAPY, type GetLpProtocolFee, type GetLpProtocolFeeAmount, type GetLpTokenFee, type GetLpTotalSupply, type WithdrawFees, type WithdrawLiquidity, type GetLpFeeDecimals, type GetLpFeeGrowthGlobal, type GetLpProviderRewards, type IsTransferFromLp, type GetProtocolFeeInUSD, type GetSwapResultAmount, type GetCrossChainStrategy, type SwapTokens } from ".";
export type TonGasArgs = {
    value: bigint;
    bounce?: boolean | null | undefined;
};
export type TonHelper = GetBalance & GetProvider<TonClient> & SendInstallment<Sender, string, TonGasArgs> & ValidateAddress & GetTokenBalance & GetTxFee & ChainName & NativeCoinName & ChainID & FetchTxInfo & ProtocolFee & GetEmmetHashFromTx & TokenInfo & GetEstimatedTime & GetBridgeAddress & Decimals & AddressBook & StakeLiquidity<Sender, string, {
    value: bigint;
    bounce?: boolean;
}> & WithdrawLiquidity<Sender, string, {
    value: bigint;
    bounce?: boolean;
}> & WithdrawFees<Sender, string, {
    value: bigint;
    bounce?: boolean;
}> & GetLpCurrentAPY & GetLpTotalSupply & GetLpTokenFee & GetLpProtocolFee & GetLpProtocolFeeAmount & GetLpProviderRewards & GetLpFeeGrowthGlobal & GetLpFeeDecimals & IsTransferFromLp & GetSwapResultAmount & GetProtocolFeeInUSD & GetCrossChainStrategy & SwapTokens<Sender, undefined>;
export interface TonParams {
    rpcs: readonly string[];
    nativeTokenId: bigint;
    chainName: string;
    chainId: bigint;
    addressBook: Address;
    stonApiUrl: string;
    stonRouterAddress: string;
    pTonAddress: string;
}
/**
 *
 * @param ms number of milliseconds to wait
 * @returns halts the program execution for the `ms` milliseconds
 */
export declare const sleep: (ms: number) => Promise<unknown>;
export declare function tonHandler({ rpcs, nativeTokenId, chainName, chainId, stonApiUrl, addressBook, stonRouterAddress, pTonAddress, }: TonParams): Promise<TonHelper>;
export declare function raise(msg: string): never;
export declare function assertNotNull<T>(t: T | null | undefined): t is T;
//# sourceMappingURL=ton.d.ts.map