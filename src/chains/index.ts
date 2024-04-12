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
export interface SendInstallment<Signer, Ret> {
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
    tokenSymbol: string,
    destAddress: string,
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
