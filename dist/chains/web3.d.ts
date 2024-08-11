import { type ContractTransactionResponse, type Overrides, type Provider, type Signer } from "ethers";
import type { AddressBook, ChainID, ChainName, Decimals, FetchTxInfo, GetApprovedTokenAmount, GetBalance, GetBridgeAddress, GetLpCurrentAPY, GetEmmetHashFromTx, GetEstimatedTime, GetProtocolFeeInUSD, GetProvider, GetTokenBalance, GetLpTotalSupply, GetTxFee, NativeCoinName, PreTransfer, ProtocolFee, SendInstallment, StakeLiquidity, TokenInfo, ValidateAddress, WithdrawLiquidity, GetLpTokenFee, GetLpProtocolFee, GetLpProtocolFeeAmount, WithdrawFees, GetLpProviderRewards, GetLpFeeGrowthGlobal, GetLpFeeDecimals, IsTransferFromLp } from ".";
import type { PayableOverrides } from "@emmet-contracts/web3/dist/common";
export type Web3Helper = GetBalance & GetProvider<Provider> & SendInstallment<Signer, ContractTransactionResponse, PayableOverrides> & ValidateAddress & GetTokenBalance & GetApprovedTokenAmount & PreTransfer<Signer, PayableOverrides> & ChainName & NativeCoinName & AddressBook & TokenInfo & ChainID & GetTxFee & FetchTxInfo & ProtocolFee & GetEmmetHashFromTx & GetEstimatedTime & GetBridgeAddress & GetProtocolFeeInUSD & Decimals & StakeLiquidity<Signer, ContractTransactionResponse, Overrides> & WithdrawLiquidity<Signer, ContractTransactionResponse, Overrides> & WithdrawFees<Signer, ContractTransactionResponse, Overrides> & GetLpCurrentAPY & GetLpTotalSupply & GetLpTokenFee & GetLpProtocolFee & GetLpProtocolFeeAmount & GetLpProviderRewards & GetLpFeeGrowthGlobal & GetLpFeeDecimals & IsTransferFromLp;
export interface Web3Params {
    rpcs: readonly string[];
    addressBook: string;
    chainName: string;
    nativeCoin: string;
}
export declare function web3Helper({ rpcs, addressBook, chainName, nativeCoin, }: Web3Params): Promise<Web3Helper>;
//# sourceMappingURL=web3.d.ts.map