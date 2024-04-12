import type { Web3Helper, Web3Params } from "../../chains/web3";
import type { TonHelper, TonParams } from "../../chains/ton";

export type EvmMeta = [Web3Helper, Web3Params];
export type TonMeta = [TonHelper, TonParams];

type MetaMapAssert = { [idx in (typeof Chain)[keyof typeof Chain]]: unknown };

export type MetaMap = {
  7: EvmMeta;
  65535: TonMeta;
} & MetaMapAssert;

export namespace Chain {
  export const POLYGON = 7;
  export const TON = 65535;
}

export type ChainNonce = keyof MetaMap;

export type ParamMap = {
  set<T extends ChainNonce>(k: T, v: InferChainParam<T> | undefined): void;
  get<T extends ChainNonce>(k: T): InferChainParam<T> | undefined;
};

export type InferChainParam<K extends ChainNonce> = MetaMap[K][1];
export type InferChainH<K extends ChainNonce> = MetaMap[K][0];

export interface ChainParams {
  bscParams: Web3Params;
  ethParams: Web3Params;
  polygonParams: Web3Params;
  tonParams: TonParams;
}

export interface ChainData<T extends ChainNonce> {
  name: string;
  nonce: number;
  decimals: number;
  constructor: (p: InferChainParam<T>) => InferChainH<T>;
}

export type ChainInfo = {
  set<T extends ChainNonce>(k: T, v: ChainData<T> | undefined): void;
  get<T extends ChainNonce>(k: T): ChainData<T> | undefined;
} & Map<ChainNonce, ChainData<ChainNonce>>;

export type HelperMap<K extends ChainNonce> = Map<
  K,
  InferChainH<K> | undefined
>;

export interface ChainFactory {
  inner: <T extends ChainNonce>(chain: T) => Promise<InferChainH<T>>;
}
