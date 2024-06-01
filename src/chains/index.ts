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
    chainId: number,
    fromSymbol: string,
    tokenSymbol: string,
    destAddress: string,
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
  | "TON/USD" // price feed
  | "BNB/USD" // price feed
  | "MATIC/USD" // Price Feed
  | "EmmetMultisig";

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
    amount: bigint,
    gasArgs: GasArgs,
  ) => Promise<string>;
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
  getApprovedAmount: (token: string, owner: string) => Promise<bigint>;
}
export interface CalculateCoinFees {
  calculateCoinFees: (coin_name: string, amt: bigint) => Promise<bigint>;
}

export interface CalculateDestinationTransactionFees {
  calculateTransactionFees: (chain_name: string) => Promise<bigint>;
}

export interface GetCoinPrice {
  getCoinPrice: (coin_name: string) => Promise<bigint>;
}

export interface ChainName {
  chainName: () => string;
}

export interface NativeCoinName {
  nativeCoin: () => string;
}
