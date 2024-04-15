import { Address, type Sender, type TonClient } from "@ton/ton";
import type { GetBalance, GetProvider, GetTokenBalance, SendInstallment, ValidateAddress } from ".";
export type TonGasArgs = {
    value: bigint;
    bounce?: boolean | null | undefined;
};
export type TonHelper = GetBalance & GetProvider<TonClient> & SendInstallment<Sender, undefined, TonGasArgs> & ValidateAddress & GetTokenBalance;
export interface TonParams {
    client: TonClient;
    bridge: Address;
    nativeTokenId: bigint;
}
export declare function tonHandler({ client, bridge, nativeTokenId, }: TonParams): TonHelper;
//# sourceMappingURL=ton.d.ts.map