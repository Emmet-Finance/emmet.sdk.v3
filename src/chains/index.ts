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
  provider: () => T;
}

export interface ChainID {
  id: () => Promise<bigint>;
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
  | "GasFees"
  | "EmmetTokenVault"
  | "EmmetData"
  | "CCTPHelper"
  | "HashHelper"
  | "SignatureVerifier"
  | "LiquidityPoolHelper"
  | "EmmetBridge"
  | "AddressStorageHelper"
  | "WTON" // Wrapped Token
  | "EMMET" // Token
  | "BERA/USD" // price feed
  | "BNB/USD" // price feed
  | "MATIC/USD" // Price Feed
  | "TON/USD" // price feed
  | "EmmetMultisig"
  | `elp${string}`;

export interface AddressBook {
  address: (contr: AddressBookKeys) => Promise<string>;
}

export interface TokenInfo {
  token: (symbol: string) => Promise<{
    address: string;
    swap?: string;
    decimals: bigint;
    symbol: string;
    fee: bigint;
    feeDecimals: bigint;
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
  protocolFeeInUSD: () => Promise<bigint>;
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

export interface IsTransferFomLp {
  isTransferFromLp(
    targetChain: bigint,
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
