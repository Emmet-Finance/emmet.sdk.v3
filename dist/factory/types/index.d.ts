import type { Web3Helper, Web3Params } from "../../chains/web3";
import type { TonHelper, TonParams } from "../../chains/ton";
import type { AddressBook, ChainID, Decimals, GetCrossChainStrategy, GetLpTokenFee, GetSwapResultAmount, GetTxFee, NativeCoinName, PreTransfer, ProtocolFee, SendInstallment, StakeLiquidity, WithdrawFees, WithdrawLiquidity } from "../../chains";
export type EvmMeta = [Web3Helper, Web3Params];
export type TonMeta = [TonHelper, TonParams];
type MetaMapAssert = {
    [idx in (typeof Chain)[keyof typeof Chain]]: unknown;
};
export type MetaMap = {
    0: EvmMeta;
    1: EvmMeta;
    2: EvmMeta;
    3: EvmMeta;
    4: EvmMeta;
    5: EvmMeta;
    6: EvmMeta;
    7: EvmMeta;
    65534: TonMeta;
    65535: TonMeta;
    728696: EvmMeta;
    80084: EvmMeta;
} & MetaMapAssert;
export declare namespace Chain {
    const ETHEREUM = 0;
    const AVALANCHE = 1;
    const OPTIMISM = 2;
    const ARBITRUM = 3;
    const BSC = 4;
    const SOLANA = 5;
    const BASE = 6;
    const POLYGON = 7;
    const TON = 65534;
    const TONTESTNET = 65535;
    const ONLYLAYER = 728696;
    const BERACHAIN = 80084;
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
    ethParams: Web3Params;
    avaxParams: Web3Params;
    opParams: Web3Params;
    arbParams: Web3Params;
    bscParams: Web3Params;
    baseParams: Web3Params;
    polygonParams: Web3Params;
    tonParams: TonParams;
    onlylayerParams: Web3Params;
    berachainParams: Web3Params;
    multisigParams: {
        rpcs: readonly string[];
        ab: string;
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
    stakeLiqiduity: <Signer, RetTx, GasArgs>(chain: StakeLiquidity<Signer, RetTx, GasArgs> & AddressBook, signer: Signer, token: string, amount: bigint, ga: GasArgs | undefined) => Promise<{
        hash: string;
        tx: RetTx;
    }>;
    withdrawLiqiduity: <Signer, RetTx, GasArgs>(chain: WithdrawLiquidity<Signer, RetTx, GasArgs> & AddressBook, signer: Signer, token: string, amount: bigint, ga: GasArgs | undefined) => Promise<{
        hash: string;
        tx: RetTx;
    }>;
    withdrawFees: <Signer, RetTx, GasArgs>(chain: WithdrawFees<Signer, RetTx, GasArgs> & AddressBook, signer: Signer, token: string, ga: GasArgs | undefined) => Promise<{
        hash: string;
        tx: RetTx;
    }>;
    inner: <T extends ChainNonce>(chain: T) => Promise<InferChainH<T>>;
    sendInstallment: <Signer, RetTx, GasArgs>(chain: SendInstallment<Signer, RetTx, GasArgs> & GetTxFee, signer: Signer, amount: bigint, chainId: number, fromSymbol: string, tokenSymbol: string, destAddress: string, gasArgs?: GasArgs) => Promise<{
        hash: string;
        tx: RetTx;
    }>;
    preTransfer: <Signer, GasArgs>(chain: PreTransfer<Signer, GasArgs>, signer: Signer, tid: string, spender: string, amount: bigint, gasArgs: GasArgs) => Promise<string>;
    getTransactions: (batch: bigint | number, offset: bigint | number) => Promise<Transaction[]>;
    getTransaction: (hash: string) => Promise<DetailedTx>;
    getExplorerStats: () => Promise<ExplorerMeta>;
    getStats: () => Promise<[bigint, bigint, bigint, bigint] & {
        bridgedInUSD: bigint;
        collectedFees: bigint;
        totalTransactions: bigint;
        uniqueAccounts: bigint;
    }>;
    getTokenPrice: (symbol: string) => Promise<bigint>;
    getPriceDecimals: (symbol: string) => Promise<bigint>;
    getProtocolFeeInUSD: (chain: ProtocolFee & NativeCoinName & Decimals) => Promise<number>;
    getDestinationTokens: (fromChain: GetCrossChainStrategy & GetLpTokenFee & AddressBook & GetSwapResultAmount, targetChainId: ChainID & GetSwapResultAmount & AddressBook & GetLpTokenFee, fromToken: string, targetToken: string, sourceAmount: bigint, slippage: number) => Promise<bigint>;
}
export interface Transaction {
    txHash: string;
    sentAmount: bigint;
    receivedAmount: bigint;
    fromChainId: bigint;
    toChainId: bigint;
    fromToken: string;
    toToken: string;
    recipient: string;
    originalHash: string;
    destinationHash: string;
    started: bigint;
    finished: bigint;
}
export type DetailedTx = Transaction & {
    fromChainTimestamp: bigint;
    targetChainTimestamp: bigint;
    fromChainFees: bigint;
    targetChainFees: bigint;
    protocolFee: bigint;
};
export interface ExplorerMeta {
    totalTransactions: bigint;
    totalFees: bigint;
    totalVolume: bigint;
    uniqueUser: bigint;
}
export * from "./constants";
//# sourceMappingURL=index.d.ts.map