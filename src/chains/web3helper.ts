import {
    BigNumberish,
    JsonRpcSigner,
    type ContractTransactionResponse,
    type Overrides,
    type Provider,
} from "ethers";
import type {
    AddressBook,
    ChainID,
    ChainName,
    Decimals,
    FetchTxInfo,
    GetApprovedTokenAmount,
    GetBalance,
    GetBridgeAddress,
    GetLpCurrentAPY,
    GetEmmetHashFromTx,
    GetEstimatedTime,
    GetProtocolFeeInUSD,
    GetProvider,
    GetTokenBalance,
    GetLpTotalSupply,
    GetTxFee,
    NativeCoinName,
    PreTransfer,
    ProtocolFee,
    SendInstallment,
    StakeLiquidity,
    TokenInfo,
    ValidateAddress,
    WithdrawLiquidity,
    GetLpFeeDecimals,
    IsTransferFromLp,
    GetCrossChainStrategy,
    GetSwapResultAmount,
    ReadConsensus,
    ParceCallData,
    GetTokenAddress,
    ILiquidityPool,
} from ".";
import type {
    PayableOverrides
} from "@emmet-contracts/web3/dist/common";

export type Web3Helper = GetBalance &
    GetProvider<Provider> &
    ValidateAddress &
    GetTokenBalance &
    GetApprovedTokenAmount &
    ChainName &
    NativeCoinName &
    AddressBook &
    TokenInfo &
    ChainID &
    GetTxFee &
    FetchTxInfo &
    ReadConsensus &
    ProtocolFee &
    GetEmmetHashFromTx &
    GetEstimatedTime &
    GetBridgeAddress &
    GetProtocolFeeInUSD &
    Decimals &
    GetLpCurrentAPY &
    GetLpTotalSupply &
    GetLpFeeDecimals &
    IsTransferFromLp &
    GetCrossChainStrategy &
    ParceCallData &
    GetTokenAddress &
    GetSwapResultAmount &
    ILiquidityPool<JsonRpcSigner, ContractTransactionResponse, Overrides> &
    PreTransfer<JsonRpcSigner, PayableOverrides> &
    SendInstallment<JsonRpcSigner, ContractTransactionResponse, PayableOverrides> &
    StakeLiquidity<JsonRpcSigner, ContractTransactionResponse, Overrides> &
    WithdrawLiquidity<JsonRpcSigner, ContractTransactionResponse, Overrides>
    ;

export interface Web3Params {
    addressBook: string;
    chainId?: BigNumberish,
    chainName: string;
    nativeCoin: string;
    rpcs: readonly string[];
}