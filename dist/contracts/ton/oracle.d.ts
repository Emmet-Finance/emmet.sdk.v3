import { Cell, Slice, Address, Builder, Dictionary, ContractProvider, Sender, Contract, ContractABI } from '@ton/core';
export type StateInit = {
    $$type: 'StateInit';
    code: Cell;
    data: Cell;
};
export declare function storeStateInit(src: StateInit): (builder: Builder) => void;
export declare function loadStateInit(slice: Slice): {
    $$type: "StateInit";
    code: Cell;
    data: Cell;
};
export type Context = {
    $$type: 'Context';
    bounced: boolean;
    sender: Address;
    value: bigint;
    raw: Cell;
};
export declare function storeContext(src: Context): (builder: Builder) => void;
export declare function loadContext(slice: Slice): {
    $$type: "Context";
    bounced: boolean;
    sender: Address;
    value: bigint;
    raw: Cell;
};
export type SendParameters = {
    $$type: 'SendParameters';
    bounce: boolean;
    to: Address;
    value: bigint;
    mode: bigint;
    body: Cell | null;
    code: Cell | null;
    data: Cell | null;
};
export declare function storeSendParameters(src: SendParameters): (builder: Builder) => void;
export declare function loadSendParameters(slice: Slice): {
    $$type: "SendParameters";
    bounce: boolean;
    to: Address;
    value: bigint;
    mode: bigint;
    body: Cell | null;
    code: Cell | null;
    data: Cell | null;
};
export type Deploy = {
    $$type: 'Deploy';
    queryId: bigint;
};
export declare function storeDeploy(src: Deploy): (builder: Builder) => void;
export declare function loadDeploy(slice: Slice): {
    $$type: "Deploy";
    queryId: bigint;
};
export type DeployOk = {
    $$type: 'DeployOk';
    queryId: bigint;
};
export declare function storeDeployOk(src: DeployOk): (builder: Builder) => void;
export declare function loadDeployOk(slice: Slice): {
    $$type: "DeployOk";
    queryId: bigint;
};
export type FactoryDeploy = {
    $$type: 'FactoryDeploy';
    queryId: bigint;
    cashback: Address;
};
export declare function storeFactoryDeploy(src: FactoryDeploy): (builder: Builder) => void;
export declare function loadFactoryDeploy(slice: Slice): {
    $$type: "FactoryDeploy";
    queryId: bigint;
    cashback: Address;
};
export type ChangeOwner = {
    $$type: 'ChangeOwner';
    queryId: bigint;
    newOwner: Address;
};
export declare function storeChangeOwner(src: ChangeOwner): (builder: Builder) => void;
export declare function loadChangeOwner(slice: Slice): {
    $$type: "ChangeOwner";
    queryId: bigint;
    newOwner: Address;
};
export type ChangeOwnerOk = {
    $$type: 'ChangeOwnerOk';
    queryId: bigint;
    newOwner: Address;
};
export declare function storeChangeOwnerOk(src: ChangeOwnerOk): (builder: Builder) => void;
export declare function loadChangeOwnerOk(slice: Slice): {
    $$type: "ChangeOwnerOk";
    queryId: bigint;
    newOwner: Address;
};
export type UpdatePrice = {
    $$type: 'UpdatePrice';
    ticker: bigint;
    price_info: PriceInfo;
};
export declare function storeUpdatePrice(src: UpdatePrice): (builder: Builder) => void;
export declare function loadUpdatePrice(slice: Slice): {
    $$type: "UpdatePrice";
    ticker: bigint;
    price_info: {
        $$type: "PriceInfo";
        price: bigint;
        symbol: string;
    };
};
export type PriceInfo = {
    $$type: 'PriceInfo';
    price: bigint;
    symbol: string;
};
export declare function storePriceInfo(src: PriceInfo): (builder: Builder) => void;
export declare function loadPriceInfo(slice: Slice): {
    $$type: "PriceInfo";
    price: bigint;
    symbol: string;
};
export type QueryPrice = {
    $$type: 'QueryPrice';
    from_ticker: bigint;
    to_ticker: bigint;
    carry_forward: Cell | null;
};
export declare function storeQueryPrice(src: QueryPrice): (builder: Builder) => void;
export declare function loadQueryPrice(slice: Slice): {
    $$type: "QueryPrice";
    from_ticker: bigint;
    to_ticker: bigint;
    carry_forward: Cell | null;
};
export type ReplyFromOracle = {
    $$type: 'ReplyFromOracle';
    from_price_info: PriceInfo;
    to_price_info: PriceInfo;
    carry_forward: Cell | null;
};
export declare function storeReplyFromOracle(src: ReplyFromOracle): (builder: Builder) => void;
export declare function loadReplyFromOracle(slice: Slice): {
    $$type: "ReplyFromOracle";
    from_price_info: {
        $$type: "PriceInfo";
        price: bigint;
        symbol: string;
    };
    to_price_info: {
        $$type: "PriceInfo";
        price: bigint;
        symbol: string;
    };
    carry_forward: Cell | null;
};
export type ChainName = {
    $$type: 'ChainName';
    name: string;
};
export declare function storeChainName(src: ChainName): (builder: Builder) => void;
export declare function loadChainName(slice: Slice): {
    $$type: "ChainName";
    name: string;
};
export type CoinFee = {
    $$type: 'CoinFee';
    minimum: bigint;
    percentage: bigint;
};
export declare function storeCoinFee(src: CoinFee): (builder: Builder) => void;
export declare function loadCoinFee(slice: Slice): {
    $$type: "CoinFee";
    minimum: bigint;
    percentage: bigint;
};
export type Chain = {
    $$type: 'Chain';
    name: string;
    chain_id: bigint;
    domain: bigint;
    tx_fee: bigint;
    native_coin: NativeCoin;
};
export declare function storeChain(src: Chain): (builder: Builder) => void;
export declare function loadChain(slice: Slice): {
    $$type: "Chain";
    name: string;
    chain_id: bigint;
    domain: bigint;
    tx_fee: bigint;
    native_coin: {
        $$type: "NativeCoin";
        symbol: string;
        id: bigint;
    };
};
export type NativeCoin = {
    $$type: 'NativeCoin';
    symbol: string;
    id: bigint;
};
export declare function storeNativeCoin(src: NativeCoin): (builder: Builder) => void;
export declare function loadNativeCoin(slice: Slice): {
    $$type: "NativeCoin";
    symbol: string;
    id: bigint;
};
export type UpdateChain = {
    $$type: 'UpdateChain';
    name: string;
    chain_id: bigint;
    domain: bigint;
    tx_fee: bigint;
    native_coin: NativeCoin;
};
export declare function storeUpdateChain(src: UpdateChain): (builder: Builder) => void;
export declare function loadUpdateChain(slice: Slice): {
    $$type: "UpdateChain";
    name: string;
    chain_id: bigint;
    domain: bigint;
    tx_fee: bigint;
    native_coin: {
        $$type: "NativeCoin";
        symbol: string;
        id: bigint;
    };
};
export type UpdateCoinFee = {
    $$type: 'UpdateCoinFee';
    coin_name: string;
    fee: CoinFee;
};
export declare function storeUpdateCoinFee(src: UpdateCoinFee): (builder: Builder) => void;
export declare function loadUpdateCoinFee(slice: Slice): {
    $$type: "UpdateCoinFee";
    coin_name: string;
    fee: {
        $$type: "CoinFee";
        minimum: bigint;
        percentage: bigint;
    };
};
export type UpdateProtocolFeeDivisor = {
    $$type: 'UpdateProtocolFeeDivisor';
    protocol_fee_divisor: bigint;
};
export declare function storeUpdateProtocolFeeDivisor(src: UpdateProtocolFeeDivisor): (builder: Builder) => void;
export declare function loadUpdateProtocolFeeDivisor(slice: Slice): {
    $$type: "UpdateProtocolFeeDivisor";
    protocol_fee_divisor: bigint;
};
export type UpdateTxMinimalFee = {
    $$type: 'UpdateTxMinimalFee';
    min_protocol_fee: bigint;
};
export declare function storeUpdateTxMinimalFee(src: UpdateTxMinimalFee): (builder: Builder) => void;
export declare function loadUpdateTxMinimalFee(slice: Slice): {
    $$type: "UpdateTxMinimalFee";
    min_protocol_fee: bigint;
};
export declare class Oracle implements Contract {
    static init(init_price_fee: Dictionary<bigint, PriceInfo>, owner: Address, cid: bigint, min_protocol_fee: bigint): Promise<{
        code: Cell;
        data: Cell;
    }>;
    static fromInit(init_price_fee: Dictionary<bigint, PriceInfo>, owner: Address, cid: bigint, min_protocol_fee: bigint): Promise<Oracle>;
    static fromAddress(address: Address): Oracle;
    readonly address: Address;
    readonly init?: {
        code: Cell;
        data: Cell;
    };
    readonly abi: ContractABI;
    private constructor();
    send(provider: ContractProvider, via: Sender, args: {
        value: bigint;
        bounce?: boolean | null | undefined;
    }, message: UpdatePrice | QueryPrice | UpdateChain | UpdateCoinFee | UpdateProtocolFeeDivisor | UpdateTxMinimalFee | Deploy | ChangeOwner): Promise<void>;
    getPriceFeed(provider: ContractProvider): Promise<Dictionary<bigint, PriceInfo>>;
    getSelfChainId(provider: ContractProvider): Promise<bigint>;
    getSelfCoin(provider: ContractProvider): Promise<string>;
    getChainIdToName(provider: ContractProvider): Promise<Dictionary<bigint, ChainName>>;
    getChainData(provider: ContractProvider): Promise<Dictionary<bigint, Chain>>;
    getDomainToChainName(provider: ContractProvider): Promise<Dictionary<bigint, ChainName>>;
    getMinimumProtocolFee(provider: ContractProvider): Promise<bigint>;
    getCalculateCoinFees(provider: ContractProvider, coin_name: string, amt: bigint): Promise<bigint>;
    getCalculateTransactionFees(provider: ContractProvider, chain_name: string): Promise<bigint>;
    getOwner(provider: ContractProvider): Promise<Address>;
}
//# sourceMappingURL=oracle.d.ts.map