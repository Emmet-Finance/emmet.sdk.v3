import { BigNumberish } from "ethers";
import type { ChainNonce } from "../factory/types";
import { CrossChainTransaction } from "@emmet-contracts/web3/dist/contracts/consensus/Consensus";
export type ReceiveParams = {
    blockNumber: BigNumberish;
    foreignIndexOut: BigNumberish;
    value: BigNumberish;
    timestamp: BigNumberish;
    sentAmount: BigNumberish;
    receiveAmount: BigNumberish;
    fromChainId: BigNumberish;
    toChainId: BigNumberish;
    to: string;
    fromToken: string;
    toToken: string;
    data: string;
};
/**
 * Represents an interface for getting the balance of an address.
 *
 * @interface GetBalance
 */
export interface GetBalance {
    /**
     * Retrieves the balance of the specified address.
     * @param addr - The address for which to retrieve the balance.
     * @returns A Promise that resolves to the balance of the address as a bigint.
     */
    balance: (addr: string) => Promise<bigint>;
}
export type TLPData = {
    "$$type": string;
    apy: bigint;
    available_underlying: bigint;
    decimals: bigint;
    fee_growth_global: bigint;
    fee_decimals: bigint;
    protocol_fee: bigint;
    protocol_fee_amount: bigint;
    token_fee: bigint;
    total_supply: bigint;
};
export type TLPPosition = {
    "$$type": string;
    balance: bigint;
    last_fee_growth: bigint;
    rewards: bigint;
};
export interface ILiquidityPool<Signer, RetTx, GasArgs> {
    /**
     * Fetches a LP data in a single request
     * @param poolName the name of the liquidity pool
     * @returns see type `TLPData`
     */
    getLpData: (poolName: string) => Promise<TLPData>;
    /**
     * Fetches the number of asset units available as staker rewards
     * @param poolName the name of the liquidity pool
     * @param staker the Address of the depositor
     * @returns The number of available tokens
     */
    getRewards: (poolName: string, staker: string) => Promise<bigint>;
    /**
     * Fetches the `staker`'s position if any
     * @param poolName the name of the liquidity pool
     * @param staker the Address of the depositor
     * @returns see type `TLPPosition`
     */
    getPosition: (poolName: string, staker: string) => Promise<TLPPosition>;
    /**
     * Stakes the underlying asset
     * @param poolName the name of the liquidity pool
     * @param signer the relevant chain signer
     * @param amount the number of staked asset units
     * @param ga gas arguments
     * @returns \{ hash: string; tx: RetTx }
     */
    stakeToken: (poolName: string, signer: Signer, amount: bigint, gasArgs: GasArgs | undefined) => Promise<RetTx | undefined>;
    stakeCoin: (signer: Signer, amount: bigint) => Promise<RetTx | undefined>;
}
export interface StakeLiquidity<Signer, RetTx, GasArgs> {
    /**
     * Stakes the underlying asset
     *
     * DEPRECATED (to be removed) - replaced by stakeJetton | stakeTon
     *
     * @param signer the relevant chain signer
     * @param pool The address of the Liquidity Pool
     * @param amount the number of staked asset units
     * @param ga gas arguments
     * @returns \{ hash: string; tx: RetTx }
     */
    stakeLiquidity: (signer: Signer, pool: string, amount: bigint, ga: GasArgs | undefined) => Promise<{
        hash: string;
        tx: RetTx;
    }>;
}
export interface WithdrawLiquidity<Signer, RetTx, GasArgs> {
    /**
     * Unstakes the underlying asset
     * @param signer the relevant chain signer
     * @param pool The address of the Liquidity Pool
     * @param amount the number of unstaked asset units
     * @param ga gas arguments
     * @returns \{ hash: string; tx: RetTx }
     */
    withdrawLiquidity: (signer: Signer, pool: string, amount: bigint, ga: GasArgs | undefined) => Promise<{
        hash: string;
        tx: RetTx;
    }>;
}
export interface WithdrawFees<Signer, RetTx, GasArgs> {
    /**
     * Sends the earned rewards to the staker
     * @param signer the relevant chain signer
     * @param pool The address of the Liquidity Pool
     * @param ga gas arguments
     * @returns \{ hash: string; tx: RetTx;}
     */
    withdrawFees: (signer: Signer, pool: string, ga: GasArgs | undefined) => Promise<{
        hash: string;
        tx: RetTx;
    }>;
}
/**
 * Represents a generic interface for getting a provider.
 * @template T The type of the provider.
 */
export interface GetProvider<T> {
    /**
     * Gets the provider.
     * @returns The provider.
     */
    provider: () => Promise<T>;
}
export interface ChainID {
    id: () => Promise<bigint>;
}
export type SendParams = {
    blockNumber: bigint;
    isFeeERC20: boolean;
    sentAmount: bigint;
    receiveAmount: bigint;
    toChainId: bigint;
    fromToken: string;
    toToken: string;
    to: string;
    isSuccess: boolean;
};
export interface ParceCallData {
    parseCallData: (data: string) => ReceiveParams | undefined;
}
/**
 * Represents a function that sends an installment.
 * @template Signer The type of the signer.
 * @template Ret The type of the return value.
 */
export interface SendInstallment<Signer, Ret, GasArgs> {
    /**
     * Sends a fungible token installment.
     * @param signer The signer of the txn.
     * @param amount The amount of the installment.
     * @param chainId The ID of the destination chain.
     * @param tokenSymbol The symbol of the token.
     * @param destAddress The destination address.
     * @returns A promise that resolves to an object containing the hash and transaction of the installment.
     */
    sendInstallment: (signer: Signer, amount: bigint, chainId: bigint, fromSymbol: string, tokenSymbol: string, destAddress: string, fee?: bigint, gasArgs?: GasArgs) => Promise<{
        hash: string;
        tx: Ret;
    }>;
}
/**
 * Represents an interface for getting the token balance.
 *
 * @remarks
 * This interface provides a contract for retrieving the balance of a token.
 */
export interface GetTokenBalance {
    /**
     * Retrieves the balance of a token for a given address.
     * @param token - The token address
     * @param address - The address to check the balance for.
     * @returns A Promise that resolves to the balance as a bigint.
     */
    tokenBalance: (token: string, address: string) => Promise<bigint>;
}
export type AddressBookKeys = "Consensus" | "CrossChainMessenger" | "EmmetData" | "EmmetDataAdmin" | "EmmetBridge" | "BNB/USD" | "MATIC/USD" | "TON/USD" | "Explorer" | `elp${string}` | "Bolgur" | "GrabClub" | "EMMET" | "TON" | "USDC" | "USDT";
export interface AddressBook {
    address: (contr: AddressBookKeys) => Promise<string>;
}
export interface TokenInfo {
    token: (symbol: string) => Promise<{
        token: string;
        priceFeed: string;
        decimals: bigint;
    }>;
}
/**
 * Represents an interface for validating addresses.
 */
export interface ValidateAddress {
    /**
     * Validates the given address.
     * @param addr - The address to validate.
     * @returns A promise that resolves to a boolean indicating whether the address is valid or not.
     */
    validateAddress: (addr: string) => Promise<boolean>;
}
/**
 * Represents a pre-transfer function that can be used to perform additional operations before transferring tokens.
 * @template Signer The type of the signer.
 */
export interface PreTransfer<Signer, GasArgs> {
    /**
     * Performs pre-transfer operations.
     * @param signer The signer object.
     * @param token The token to be transferred.
     * @param amount The amount of tokens to be transferred.
     * @returns A promise that resolves to a string which is the hash of the transaction.
     */
    preTransfer: (signer: Signer, token: string, spender: string, amount: bigint, gasArgs: GasArgs) => Promise<string>;
}
export interface GetProtocolFeeInUSD {
    protocolFeeInUSD: () => bigint;
}
export interface Decimals {
    decimals: (pool?: string) => Promise<number>;
}
/**
 * Represents an interface for getting the approved token amount for a particular user.
 */
export interface GetApprovedTokenAmount {
    /**
     * Retrieves the approved amount of a token for a given owner.
     * @param token - The token to retrieve the approved amount for.
     * @param owner - The owner of the token.
     * @returns A Promise that resolves to the approved amount as a bigint.
     */
    getApprovedAmount: (token: string, owner: string, spender: string) => Promise<bigint>;
}
export interface GetTxFee {
    /**
     * Fetches the gas + protocol fee estimation
     * @param targetChain Destination EIP-155-like chain ID
     * @param fromToken The deposited token name
     * @param targetToken The expected token name
     * @returns The gas + protocol fee estimation
     */
    txFee: (targetChain: bigint, fromToken: string, targetToken: string) => Promise<bigint>;
}
export interface ChainName {
    /**
     * Fetches the chain name
     * @returns The chain name
     */
    chainName: () => string;
}
export interface NativeCoinName {
    /**
     * Fetches the native coin name
     * @returns The native coin name
     */
    nativeCoin: () => string;
}
export interface ProtocolFee {
    /**
     * Fetches the current Emmet.Community fee
     * @returns The current Emmet.Community fee
     */
    protocolFee: () => Promise<bigint>;
}
export interface FetchTxInfo {
    /**
     * Fetches the transaction data
     * @param hash The bridge TX hash
     * @returns \{timestamp: bigint; value: bigint;}
     */
    txInfo: (hash: string) => Promise<TxInfo>;
}
export interface ReadConsensus {
    findTransactionByFromHash: (hash: string) => Promise<CrossChainTransaction.CCTStructOutput | undefined>;
    getConsensusTransaction: (hash: string) => Promise<CrossChainTransaction.CCTStructOutput | undefined>;
}
export interface TxInfo {
    timestamp: bigint;
    value: bigint;
}
export interface GetEmmetHashFromTx {
    /**
     * Finds the bridge hash by the transaction hash
     * @param hash a chain transaction hash
     * @returns the bridge hash
     */
    emmetHashFromtx: (hash: string) => Promise<string>;
}
export interface GetEstimatedTime {
    /**
     * Fetches the transaction time estimation
     * @param targetChain Destination EIP-155-like chain ID
     * @param fromToken The deposited token name
     * @param targetToken The expected token name
     * @returns The transaction time estimation
     */
    estimateTime(targetChain: bigint, fromToken: string, targetToken: string): Promise<bigint | undefined>;
}
export interface IsTransferFromLp {
    isTransferFromLp(targetChain: number, fromToken: string, targetToken: string): Promise<boolean>;
}
export interface GetBridgeAddress {
    /**
     * Fetches the bridge address
     * @returns The bridge address
     */
    bridge: () => Promise<string>;
}
export interface GetLpCurrentAPY {
    /**
     * Fetches the most recent APY
     * @param pool The address of the Liquidity Pool
     * @returns % with 4 decimals, ex.: 1000n means 10.00% APY
     */
    getLpCurrentAPY: (pool: string) => Promise<bigint>;
}
export interface GetLpTotalSupply {
    /**
     * Fetches the number of minted LP tokens
     * @param pool The address of the Liquidity Pool
     * @returns the number of minted LP tokens
     */
    getLpTotalSupply: (pool: string) => Promise<bigint>;
}
export interface GetLpTokenFee {
    /**
     * Fetches the current token fee % an LP user pays
     * @param pool The address of the Liquidity Pool
     * @returns % with 4 decimals, ex.: 300n means 3.00%
     */
    getLpTokenFee: (pool: string) => Promise<bigint>;
}
export interface GetLpProtocolFee {
    /**
     * Fetches the Emmmet.Community fee share of the amount
     * @param pool The address of the Liquidity Pool
     * @returns % with 4 decimals, ex.: 100n means 1.00%
     */
    getLpProtocolFee: (pool: string) => Promise<bigint>;
}
export interface GetLpProtocolFeeAmount {
    /**
     * Fetches the Emmet.Community fee amount of tokens
     * @param pool The address of the Liquidity Pool
     * @returns the number of the tokens avalable as Emmet.Community fee
     */
    getLpProtocolFeeAmount: (pool: string) => Promise<bigint>;
}
export interface GetLpFeeGrowthGlobal {
    /**
     * Fetches the total earned unwithdrawn rewards
     * @param pool The address of the Liquidity Pool
     * @returns The total earned unwithdrawn rewards
     */
    getLpFeeGrowthGlobal: (pool: string) => Promise<bigint>;
}
export interface GetLpFeeDecimals {
    /**
     * Fetches the number of the underlying & LP asset's decimal points
     * @param pool The address of the Liquidity Pool
     * @returns The number of the underlying & LP asset's decimal points
     */
    getLpFeeDecimals: (pool: string) => Promise<bigint>;
}
export type TStrategy = "None" | "CCTPBurn" | "CCTPClaim" | "Lock" | "Mint" | "Burn" | "Unlock" | "LPStake" | "LPRelease" | "Swap1" | "Swap2" | "Swap3" | "Swap4" | "Swap5" | "Swap6";
export declare enum EStrategy {
    None = 0,
    CCTPBurn = 1,
    CCTPClaim = 2,
    Lock = 3,
    Mint = 4,
    Burn = 5,
    Unlock = 6,
    LPStake = 7,
    LPRelease = 8,
    Swap1 = 9,
    Swap2 = 10,
    Swap3 = 11,
    Swap4 = 12,
    Swap5 = 13,
    Swap6 = 14
}
export declare const strategyMap: {
    readonly [x: string]: "None" | "CCTPBurn" | "CCTPClaim" | "Lock" | "Mint" | "Burn" | "Unlock" | "LPStake" | "LPRelease" | "Swap1" | "Swap2" | "Swap3" | "Swap4" | "Swap5" | "Swap6";
};
export interface GetIncomingStrategy {
    /**
     * Fetches the incoming strategy steps
     * @param targetChain Destination EIP-155-like chain ID
     * @param fromToken The deposited token name
     * @param targetToken The expected token name
     * @returns The incoming strategy steps
     */
    incomingStrategy: (fromChain: ChainNonce, fromSymbol: string, targetSymbol: string) => Promise<TStrategy[]>;
}
export interface SwapTokens<Signer, RetTx> {
    swapTokens: (sender: Signer, fromSymbol: string, targetSymbol: string, amount: bigint, slippage: number) => Promise<RetTx>;
}
export interface GetCrossChainStrategy {
    /**
     * Fetches the cross-chain strategies' steps
     * @param targetChain Destination EIP-155-like chain ID
     * @param fromToken The deposited token name
     * @param targetToken The expected token name
     * @returns The cross-chain strategies' steps
     */
    crossChainStrategy: (targetChain: bigint, fromSymbol: string, targetSymbol: string) => Promise<{
        outgoing: TStrategy[];
        incoming: TStrategy[];
        foreign: TStrategy[];
    }>;
}
export interface GetSwapResultAmount {
    /**
     * Fetches the swap output token amount
     * @param fromSymbol
     * @param targetSymbol
     * @param amount
     * @param slippage
     * @returns The swap output token amount
     */
    getSwapResultAmount: (fromSymbol: string, targetSymbol: string, amount: bigint, slippage: number) => Promise<bigint>;
}
export interface GetTokenAddress {
    /**
     * Fetches the token address by the `symbol`
     * @param symbol a short token identifier, ex. USDT
     * @returns The token address
     */
    getTokenAddress: (symbol: string) => Promise<string>;
}
export * from "./ChainInfo";
export * from "./getConsensus";
export * from "./ton";
export * from "./web3";
export * from "./web3helper";
//# sourceMappingURL=index.d.ts.map