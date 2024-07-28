import { Address, type Sender, type TonClient } from "@ton/ton";
import type { ChainID, ChainName, Decimals, FetchTxInfo, GetBalance, GetBridgeAddress, GetEmmetHashFromTx, GetEstimatedTime, GetProvider, GetTokenBalance, GetTxFee, NativeCoinName, ProtocolFee, SendInstallment, TokenInfo, ValidateAddress } from ".";
export type TonGasArgs = {
    value: bigint;
    bounce?: boolean | null | undefined;
};
export type TonHelper = GetBalance & GetProvider<TonClient> & SendInstallment<Sender, string, TonGasArgs> & ValidateAddress & GetTokenBalance & GetTxFee & ChainName & NativeCoinName & ChainID & FetchTxInfo & ProtocolFee & GetEmmetHashFromTx & TokenInfo & GetEstimatedTime & GetBridgeAddress & Decimals;
export interface TonParams {
    client: TonClient;
    nativeTokenId: bigint;
    chainName: string;
    chainId: bigint;
    addressBook: Address;
}
export declare function tonHandler({ client, nativeTokenId, chainName, chainId, addressBook, }: TonParams): Promise<TonHelper>;
export declare function raise(msg: string): never;
export declare function assertNotNull<T>(t: T | null | undefined): t is T;
//# sourceMappingURL=ton.d.ts.map