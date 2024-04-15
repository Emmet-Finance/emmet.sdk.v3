import { Address, type Sender, type TonClient } from "@ton/ton";
import type { CalculateCoinFees, CalculateDestinationTransactionFees, GetBalance, GetProvider, GetTokenBalance, SendInstallment, ValidateAddress } from ".";
export type TonGasArgs = {
    value: bigint;
    bounce?: boolean | null | undefined;
};
export type TonHelper = GetBalance & GetProvider<TonClient> & SendInstallment<Sender, undefined, TonGasArgs> & ValidateAddress & GetTokenBalance & CalculateCoinFees & CalculateDestinationTransactionFees;
export interface TonParams {
    client: TonClient;
    bridge: Address;
    nativeTokenId: bigint;
    oracle: Address;
    burner: Address;
}
export declare function tonHandler({ client, bridge, nativeTokenId, oracle, burner, }: TonParams): TonHelper;
//# sourceMappingURL=ton.d.ts.map