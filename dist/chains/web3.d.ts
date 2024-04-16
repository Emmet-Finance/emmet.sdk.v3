import { type ContractTransactionResponse, type Provider, type Signer } from "ethers";
import type { CalculateCoinFees, CalculateDestinationTransactionFees, ChainName, GetApprovedTokenAmount, GetBalance, GetCoinPrice, GetProvider, GetTokenBalance, NativeCoinName, PreTransfer, SendInstallment, ValidateAddress } from ".";
import type { PayableOverrides } from "../contracts/evm/typechain-types/common";
export type Web3Helper = GetBalance & GetProvider<Provider> & SendInstallment<Signer, ContractTransactionResponse, PayableOverrides> & ValidateAddress & GetTokenBalance & GetApprovedTokenAmount & PreTransfer<Signer, PayableOverrides> & CalculateCoinFees & CalculateDestinationTransactionFees & GetCoinPrice & ChainName & NativeCoinName;
export interface Web3Params {
    provider: Provider;
    contract: string;
    oracle: string;
    chainName: string;
    nativeCoin: string;
}
export declare function web3Helper({ provider, contract, oracle, chainName, nativeCoin }: Web3Params): Web3Helper;
//# sourceMappingURL=web3.d.ts.map