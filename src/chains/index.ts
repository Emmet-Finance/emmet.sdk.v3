export interface GetBalance {
  balance: (addr: string) => Promise<bigint>;
}

export interface GetProvider<T> {
  provider: () => T;
}

export interface SendInstallment<Signer, Ret> {
  sendInstallment: (
    signer: Signer,
    amount: bigint,
    chainId: number,
    tokenSymbol: string,
    destAddress: string,
  ) => Promise<{ hash: string; tx: Ret }>;
}

export interface GetTokenBalance {
  tokenBalance: (token: string, address: string) => Promise<bigint>;
}

export interface ValidateAddress {
  validateAddress: (addr: string) => Promise<boolean>;
}
