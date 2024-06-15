import { type ContractTransactionResponse, type Provider, type Signer } from 'ethers';
import type { AddressBook, ChainID, ChainName, FetchTxInfo, GetApprovedTokenAmount, GetBalance, GetBridgeAddress, GetEmmetHashFromTx, GetEstimatedTime, GetProvider, GetTokenBalance, GetTxFee, NativeCoinName, PreTransfer, ProtocolFee, SendInstallment, TokenInfo, ValidateAddress } from '.';
import type { PayableOverrides } from '@emmet-contracts/web3/dist/common';
export type Web3Helper = GetBalance & GetProvider<Provider> & SendInstallment<Signer, ContractTransactionResponse, PayableOverrides> & ValidateAddress & GetTokenBalance & GetApprovedTokenAmount & PreTransfer<Signer, PayableOverrides> & ChainName & NativeCoinName & AddressBook & TokenInfo & ChainID & GetTxFee & FetchTxInfo & ProtocolFee & GetEmmetHashFromTx & GetEstimatedTime & GetBridgeAddress;
export interface Web3Params {
    provider: Provider;
    addressBook: string;
    chainName: string;
    nativeCoin: string;
}
export declare function web3Helper({ provider, addressBook, chainName, nativeCoin, }: Web3Params): Promise<Web3Helper>;
//# sourceMappingURL=web3.d.ts.map