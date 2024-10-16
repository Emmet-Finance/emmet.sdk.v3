import { BigNumberish } from "ethers";
import type { ChainNonce } from "../factory/types";
import { CrossChainTransaction } from "@emmet-contracts/web3/dist/contracts/consensus/Consensus";

export type ReceiveParams = {
  blockNumber: BigNumberish,
  foreignIndexOut: BigNumberish,
  value: BigNumberish,
  timestamp: BigNumberish,
  sentAmount: BigNumberish,
  receiveAmount: BigNumberish,
  fromChainId: BigNumberish,
  toChainId: BigNumberish,
  to: string,
  fromToken: string,
  toToken: string,
  data: string
}

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
  blockNumber: bigint,
  isFeeERC20: boolean,
  sentAmount: bigint,
  receiveAmount: bigint,
  toChainId: bigint,
  fromToken: string,
  toToken: string,
  to: string,
  isSuccess: boolean

}

export interface ParceCallData {
  parseCallData: (data: string) => ReceiveParams | undefined
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
  sendInstallment: (
    signer: Signer,
    amount: bigint,
    chainId: bigint,
    fromSymbol: string,
    tokenSymbol: string,
    destAddress: string,
    fee?: bigint,
    gasArgs?: GasArgs,
  ) => Promise<{ hash: string; tx: Ret }>;
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

export type AddressBookKeys =
  | "Consensus"
  | "CrossChainMessenger"
  | "EmmetData"
  | "EmmetDataAdmin"
  | "EmmetBridge"
  | "WTON" // Wrapped Token
  | "EMMET" // Token
  | "BNB/USD" // price feed
  | "MATIC/USD" // Price Feed
  | "TON/USD" // price feed
  | "Explorer"
  | `elp${string}`;

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
  preTransfer: (
    signer: Signer,
    token: string,
    spender: string,
    amount: bigint,
    gasArgs: GasArgs,
  ) => Promise<string>;
}

export interface GetProtocolFeeInUSD {
  protocolFeeInUSD: () => bigint;
  // protocolFeeInUSD: () => Promise<bigint>;
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
  getApprovedAmount: (
    token: string,
    owner: string,
    spender: string,
  ) => Promise<bigint>;
}

export interface GetTxFee {
  txFee: (
    targetChain: bigint,
    fromToken: string,
    targetToken: string,
  ) => Promise<bigint>;
}

export interface ChainName {
  chainName: () => string;
}

export interface NativeCoinName {
  nativeCoin: () => string;
}

export interface ProtocolFee {
  protocolFee: () => Promise<bigint>;
}

export interface FetchTxInfo {
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
  emmetHashFromtx: (hash: string) => Promise<string>;
}

export interface GetEstimatedTime {
  estimateTime(
    targetChain: bigint,
    fromToken: string,
    targetToken: string,
  ): Promise<bigint | undefined>;
}

export interface IsTransferFromLp {
  isTransferFromLp(
    targetChain: number,
    fromToken: string,
    targetToken: string,
  ): Promise<boolean>;
}

export interface GetBridgeAddress {
  bridge: () => Promise<string>;
}

export interface StakeLiquidity<Signer, RetTx, GasArgs> {
  stakeLiquidity: (
    signer: Signer,
    pool: string,
    amount: bigint,
    ga: GasArgs | undefined,
  ) => Promise<{ hash: string; tx: RetTx }>;
}

export interface WithdrawLiquidity<Signer, RetTx, GasArgs> {
  withdrawLiquidity: (
    signer: Signer,
    pool: string,
    amount: bigint,
    ga: GasArgs | undefined,
  ) => Promise<{ hash: string; tx: RetTx }>;
}

export interface WithdrawFees<Signer, RetTx, GasArgs> {
  withdrawFees: (
    signer: Signer,
    pool: string,
    ga: GasArgs | undefined,
  ) => Promise<{ hash: string; tx: RetTx }>;
}

export interface GetLpCurrentAPY {
  getLpCurrentAPY: (pool: string) => Promise<bigint>;
}

export interface GetLpTotalSupply {
  getLpTotalSupply: (pool: string) => Promise<bigint>;
}

export interface GetLpTokenFee {
  getLpTokenFee: (pool: string) => Promise<bigint>;
}

export interface GetLpProtocolFee {
  getLpProtocolFee: (pool: string) => Promise<bigint>;
}

export interface GetLpProtocolFeeAmount {
  getLpProtocolFeeAmount: (pool: string) => Promise<bigint>;
}

export interface GetLpProviderRewards {
  getLpProviderRewards: (pool: string, address: string) => Promise<bigint>;
}

export interface GetLpFeeGrowthGlobal {
  getLpFeeGrowthGlobal: (pool: string) => Promise<bigint>;
}

export interface GetLpFeeDecimals {
  getLpFeeDecimals: (pool: string) => Promise<bigint>;
}

export type TStrategy =
  | "None"
  | "CCTPBurn"
  | "CCTPClaim"
  | "Lock"
  | "Mint"
  | "Burn"
  | "Unlock"
  | "LPStake"
  | "LPRelease"
  | "Swap1"
  | "Swap2"
  | "Swap3"
  | "Swap4"
  | "Swap5"
  | "Swap6"
  ;

export enum EStrategy {
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
  Swap6 = 14,
};

export const strategyMap = {
  [BigInt(EStrategy.None).toString()]: "None",
  [BigInt(EStrategy.CCTPBurn).toString()]: "CCTPBurn",
  [BigInt(EStrategy.CCTPClaim).toString()]: "CCTPClaim",
  [BigInt(EStrategy.Lock).toString()]: "Lock",
  [BigInt(EStrategy.Mint).toString()]: "Mint",
  [BigInt(EStrategy.Burn).toString()]: "Burn",
  [BigInt(EStrategy.Unlock).toString()]: "Unlock",
  [BigInt(EStrategy.LPStake).toString()]: "LPStake",
  [BigInt(EStrategy.LPRelease).toString()]: "LPRelease",
  [BigInt(EStrategy.Swap1).toString()]: "Swap1",
  [BigInt(EStrategy.Swap2).toString()]: "Swap2",
  [BigInt(EStrategy.Swap3).toString()]: "Swap3",
  [BigInt(EStrategy.Swap4).toString()]: "Swap4",
  [BigInt(EStrategy.Swap5).toString()]: "Swap5",
  [BigInt(EStrategy.Swap6).toString()]: "Swap6",
} as const;

export interface GetIncomingStrategy {
  incomingStrategy: (
    fromChain: ChainNonce,
    fromSymbol: string,
    targetSymbol: string,
  ) => Promise<TStrategy[]>;
}

export interface SwapTokens<Signer, RetTx> {
  swapTokens: (
    sender: Signer,
    fromSymbol: string,
    targetSymbol: string,
    amount: bigint,
    slippage: number,
  ) => Promise<RetTx>;
}

export interface GetCrossChainStrategy {
  crossChainStrategy: (
    targetChain: bigint,
    fromSymbol: string,
    targetSymbol: string,
  ) => Promise<{
    outgoing: TStrategy[];
    incoming: TStrategy[];
    foreign: TStrategy[];
  }>;
}

export interface GetSwapResultAmount {
  getSwapResultAmount: (
    fromSymbol: string,
    targetSymbol: string,
    amount: bigint,
    slippage: number,
  ) => Promise<bigint>;
}
