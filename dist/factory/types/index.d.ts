import type { Web3Helper, Web3Params } from "../../chains/web3";
import type { TonHelper, TonParams } from "../../chains/ton";
import type { PreTransfer, SendInstallment } from "../../chains";
import type { JsonRpcProvider } from "ethers";
export type EvmMeta = [Web3Helper, Web3Params];
export type TonMeta = [TonHelper, TonParams];
type MetaMapAssert = {
    [idx in (typeof Chain)[keyof typeof Chain]]: unknown;
};
export type MetaMap = {
    0: EvmMeta;
    7: EvmMeta;
    4: EvmMeta;
    65535: TonMeta;
} & MetaMapAssert;
export declare namespace Chain {
    const POLYGON = 7;
    const BSC = 4;
    const ETHEREUM = 0;
    const TON = 65535;
}
export type ChainNonce = keyof MetaMap;
export type ParamMap = {
    set<T extends ChainNonce>(k: T, v: InferChainParam<T> | undefined): void;
    get<T extends ChainNonce>(k: T): InferChainParam<T> | undefined;
};
export type InferChainParam<K extends ChainNonce> = MetaMap[K][1];
export type InferChainH<K extends ChainNonce> = MetaMap[K][0];
export type InferSigner<K> = K extends SendInstallment<infer S, unknown, unknown> ? S : never;
export type InferRet<K> = K extends SendInstallment<unknown, infer R, unknown> ? R : never;
export interface ChainParams {
    bscParams: Web3Params;
    ethParams: Web3Params;
    polygonParams: Web3Params;
    tonParams: TonParams;
    multisigParams: {
        provider: JsonRpcProvider;
        address: string;
    };
}
export interface ChainData<T extends ChainNonce> {
    name: string;
    nonce: number;
    decimals: number;
    constructor: (p: InferChainParam<T>) => Promise<InferChainH<T>>;
}
export type ChainInfo = {
    set<T extends ChainNonce>(k: T, v: ChainData<T> | undefined): void;
    get<T extends ChainNonce>(k: T): ChainData<T> | undefined;
} & Map<ChainNonce, ChainData<ChainNonce>>;
export type HelperMap<K extends ChainNonce> = Map<K, InferChainH<K> | undefined>;
export interface ChainFactory {
    inner: <T extends ChainNonce>(chain: T) => Promise<InferChainH<T>>;
    sendInstallment: <Signer, RetTx, GasArgs>(chain: SendInstallment<Signer, RetTx, GasArgs>, signer: Signer, amount: bigint, chainId: number, fromSymbol: string, tokenSymbol: string, destAddress: string, gasArgs?: GasArgs) => Promise<{
        hash: string;
        tx: RetTx;
    }>;
    preTransfer: <Signer, GasArgs>(chain: PreTransfer<Signer, GasArgs>, signer: Signer, tid: string, amount: bigint, gasArgs: GasArgs) => Promise<string>;
    getTransactions: (batch: bigint | number, offset: bigint | number) => Promise<Transaction[]>;
}
export interface Transaction {
    nonce: bigint;
    amount: bigint;
    fromChainId: bigint;
    toChainId: bigint;
    fromToken: string;
    toToken: string;
    recipient: string;
    originalHash: string;
    destinationHash: string;
}
export {};
//# sourceMappingURL=index.d.ts.map