import { BigNumberish, JsonRpcSigner, type ContractTransactionResponse, type Overrides, type Provider, type Signer } from "ethers";
import type { AddressBook, ChainID, ChainName, Decimals, FetchTxInfo, GetApprovedTokenAmount, GetBalance, GetBridgeAddress, GetLpCurrentAPY, GetEmmetHashFromTx, GetEstimatedTime, GetProtocolFeeInUSD, GetProvider, GetTokenBalance, GetLpTotalSupply, GetTxFee, NativeCoinName, PreTransfer, ProtocolFee, SendInstallment, StakeLiquidity, TokenInfo, ValidateAddress, WithdrawLiquidity, GetLpTokenFee, GetLpProtocolFee, GetLpProtocolFeeAmount, WithdrawFees, GetLpFeeGrowthGlobal, GetLpFeeDecimals, IsTransferFromLp, GetCrossChainStrategy, GetSwapResultAmount, ReadConsensus, ParceCallData, GetTokenAddress, ILiquidityPool } from ".";
import type { PayableOverrides } from "@emmet-contracts/web3/dist/common";
export type Web3Helper = GetBalance & GetProvider<Provider> & ValidateAddress & GetTokenBalance & GetApprovedTokenAmount & ChainName & NativeCoinName & AddressBook & TokenInfo & ChainID & GetTxFee & FetchTxInfo & ReadConsensus & ProtocolFee & GetEmmetHashFromTx & GetEstimatedTime & GetBridgeAddress & GetProtocolFeeInUSD & Decimals & GetLpCurrentAPY & GetLpTotalSupply & GetLpTokenFee & GetLpProtocolFee & GetLpProtocolFeeAmount & GetLpFeeGrowthGlobal & GetLpFeeDecimals & IsTransferFromLp & GetCrossChainStrategy & ParceCallData & GetTokenAddress & GetSwapResultAmount & ILiquidityPool<Signer | JsonRpcSigner, ContractTransactionResponse, Overrides> & PreTransfer<Signer | JsonRpcSigner, PayableOverrides> & SendInstallment<Signer | JsonRpcSigner, ContractTransactionResponse, PayableOverrides> & StakeLiquidity<Signer | JsonRpcSigner, ContractTransactionResponse, Overrides> & WithdrawLiquidity<Signer | JsonRpcSigner, ContractTransactionResponse, Overrides> & WithdrawFees<Signer | JsonRpcSigner, ContractTransactionResponse, Overrides>;
export interface Web3Params {
    addressBook: string;
    chainId?: BigNumberish;
    chainName: string;
    nativeCoin: string;
    rpcs: readonly string[];
}
//# sourceMappingURL=web3helper.d.ts.map