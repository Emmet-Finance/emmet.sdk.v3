import { Address, type Sender, type TonClient } from "@ton/ton";
import type { CalculateCoinFees, CalculateDestinationTransactionFees, ChainName, GetBalance, GetCoinPrice, GetProvider, GetTokenBalance, NativeCoinName, SendInstallment, ValidateAddress } from ".";
export type TonGasArgs = {
    value: bigint;
    bounce?: boolean | null | undefined;
};
export type TonHelper = GetBalance & GetProvider<TonClient> & SendInstallment<Sender, string, TonGasArgs> & ValidateAddress & GetTokenBalance & CalculateCoinFees & CalculateDestinationTransactionFees & GetCoinPrice & ChainName & NativeCoinName;
export interface TonParams {
    client: TonClient;
    bridge: Address;
    nativeTokenId: bigint;
    oracle: Address;
    burner: Address;
    chainName: string;
}
export declare function tonHandler({ client, bridge, nativeTokenId, oracle, burner, chainName, }: TonParams): TonHelper;
//# sourceMappingURL=ton.d.ts.map