import { type ContractTransactionResponse, type Provider, type Signer } from "ethers";
import type { CalculateCoinFees, CalculateDestinationTransactionFees, GetApprovedTokenAmount, GetBalance, GetProvider, GetTokenBalance, PreTransfer, SendInstallment, ValidateAddress } from ".";
import type { PayableOverrides } from "../contracts/evm/typechain-types/common";
export type Web3Helper = GetBalance & GetProvider<Provider> & SendInstallment<Signer, ContractTransactionResponse, PayableOverrides> & ValidateAddress & GetTokenBalance & GetApprovedTokenAmount & PreTransfer<Signer, PayableOverrides> & CalculateCoinFees & CalculateDestinationTransactionFees;
export interface Web3Params {
    provider: Provider;
    contract: string;
    oracle: string;
}
export declare function web3Helper({ provider, contract, oracle, }: Web3Params): Web3Helper;
//# sourceMappingURL=web3.d.ts.map