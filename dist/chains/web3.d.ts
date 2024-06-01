import { type ContractTransactionResponse, type Provider, type Signer } from "ethers";
import type { AddressBook, ChainID, ChainName, GetApprovedTokenAmount, GetBalance, GetProvider, GetTokenBalance, NativeCoinName, PreTransfer, SendInstallment, TokenInfo, ValidateAddress } from ".";
import type { PayableOverrides } from "@emmet-contracts/web3/dist/common";
export type Web3Helper = GetBalance & GetProvider<Provider> & SendInstallment<Signer, ContractTransactionResponse, PayableOverrides> & ValidateAddress & GetTokenBalance & GetApprovedTokenAmount & PreTransfer<Signer, PayableOverrides> & ChainName & NativeCoinName & AddressBook & TokenInfo & ChainID;
export interface Web3Params {
    provider: Provider;
    addressBook: string;
    chainName: string;
    nativeCoin: string;
}
export declare function web3Helper({ provider, addressBook, chainName, nativeCoin, }: Web3Params): Promise<Web3Helper>;
//# sourceMappingURL=web3.d.ts.map