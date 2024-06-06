import { Address, type Sender, type TonClient } from "@ton/ton";
import type { ChainID, ChainName, GetBalance, GetProvider, GetTokenBalance, GetTxFee, NativeCoinName, SendInstallment, ValidateAddress } from ".";
export type TonGasArgs = {
    value: bigint;
    bounce?: boolean | null | undefined;
};
export type TonHelper = GetBalance & GetProvider<TonClient> & SendInstallment<Sender, string, TonGasArgs> & ValidateAddress & GetTokenBalance & GetTxFee & ChainName & NativeCoinName & ChainID;
export interface TonParams {
    client: TonClient;
    bridge: Address;
    nativeTokenId: bigint;
    oracle: Address;
    burner: Address;
    chainName: string;
    chainId: bigint;
}
export declare function tonHandler({ client, bridge, nativeTokenId, oracle, burner, chainName, chainId, }: TonParams): TonHelper;
//# sourceMappingURL=ton.d.ts.map