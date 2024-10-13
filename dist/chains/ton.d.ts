import { Address, type Sender, TonClient } from "@ton/ton";
import type { ChainID, ChainName, Decimals, FetchTxInfo, GetBalance, GetBridgeAddress, GetEmmetHashFromTx, GetEstimatedTime, GetProvider, GetTokenBalance, GetTxFee, NativeCoinName, ProtocolFee, SendInstallment, TokenInfo, ValidateAddress, AddressBook, StakeLiquidity, GetLpCurrentAPY, GetLpProtocolFee, GetLpProtocolFeeAmount, GetLpTokenFee, GetLpTotalSupply, WithdrawFees, WithdrawLiquidity, GetLpFeeDecimals, GetLpFeeGrowthGlobal, GetLpProviderRewards, IsTransferFromLp, GetSwapResultAmount, GetIncomingStrategy, GetCrossChainStrategy, SwapTokens } from ".";
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
}> & GetLpCurrentAPY & GetLpTotalSupply & GetLpTokenFee & GetLpProtocolFee & GetLpProtocolFeeAmount & GetLpProviderRewards & GetLpFeeGrowthGlobal & GetLpFeeDecimals & IsTransferFromLp & GetSwapResultAmount & GetIncomingStrategy & GetCrossChainStrategy & SwapTokens<Sender, undefined>;
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
export declare function tonHandler({ rpcs, nativeTokenId, chainName, chainId, stonApiUrl, addressBook, stonRouterAddress, pTonAddress, }: TonParams): Promise<TonHelper>;
//# sourceMappingURL=ton.d.ts.map