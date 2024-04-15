//@ts-nocheck
import { 
    Cell,
    Slice, 
    Address, 
    Builder, 
    beginCell, 
    ComputeError, 
    TupleItem, 
    TupleReader, 
    Dictionary, 
    contractAddress, 
    ContractProvider, 
    Sender, 
    Contract, 
    ContractABI, 
    ABIType,
    ABIGetter,
    ABIReceiver,
    TupleBuilder,
    DictionaryValue
} from '@ton/core';

export type StateInit = {
    $$type: 'StateInit';
    code: Cell;
    data: Cell;
}

export function storeStateInit(src: StateInit) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeRef(src.code);
        b_0.storeRef(src.data);
    };
}

export function loadStateInit(slice: Slice) {
    let sc_0 = slice;
    let _code = sc_0.loadRef();
    let _data = sc_0.loadRef();
    return { $$type: 'StateInit' as const, code: _code, data: _data };
}

function loadTupleStateInit(source: TupleReader) {
    let _code = source.readCell();
    let _data = source.readCell();
    return { $$type: 'StateInit' as const, code: _code, data: _data };
}

function storeTupleStateInit(source: StateInit) {
    let builder = new TupleBuilder();
    builder.writeCell(source.code);
    builder.writeCell(source.data);
    return builder.build();
}

function dictValueParserStateInit(): DictionaryValue<StateInit> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeStateInit(src)).endCell());
        },
        parse: (src) => {
            return loadStateInit(src.loadRef().beginParse());
        }
    }
}

export type Context = {
    $$type: 'Context';
    bounced: boolean;
    sender: Address;
    value: bigint;
    raw: Cell;
}

export function storeContext(src: Context) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeBit(src.bounced);
        b_0.storeAddress(src.sender);
        b_0.storeInt(src.value, 257);
        b_0.storeRef(src.raw);
    };
}

export function loadContext(slice: Slice) {
    let sc_0 = slice;
    let _bounced = sc_0.loadBit();
    let _sender = sc_0.loadAddress();
    let _value = sc_0.loadIntBig(257);
    let _raw = sc_0.loadRef();
    return { $$type: 'Context' as const, bounced: _bounced, sender: _sender, value: _value, raw: _raw };
}

function loadTupleContext(source: TupleReader) {
    let _bounced = source.readBoolean();
    let _sender = source.readAddress();
    let _value = source.readBigNumber();
    let _raw = source.readCell();
    return { $$type: 'Context' as const, bounced: _bounced, sender: _sender, value: _value, raw: _raw };
}

function storeTupleContext(source: Context) {
    let builder = new TupleBuilder();
    builder.writeBoolean(source.bounced);
    builder.writeAddress(source.sender);
    builder.writeNumber(source.value);
    builder.writeSlice(source.raw);
    return builder.build();
}

function dictValueParserContext(): DictionaryValue<Context> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeContext(src)).endCell());
        },
        parse: (src) => {
            return loadContext(src.loadRef().beginParse());
        }
    }
}

export type SendParameters = {
    $$type: 'SendParameters';
    bounce: boolean;
    to: Address;
    value: bigint;
    mode: bigint;
    body: Cell | null;
    code: Cell | null;
    data: Cell | null;
}

export function storeSendParameters(src: SendParameters) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeBit(src.bounce);
        b_0.storeAddress(src.to);
        b_0.storeInt(src.value, 257);
        b_0.storeInt(src.mode, 257);
        if (src.body !== null && src.body !== undefined) { b_0.storeBit(true).storeRef(src.body); } else { b_0.storeBit(false); }
        if (src.code !== null && src.code !== undefined) { b_0.storeBit(true).storeRef(src.code); } else { b_0.storeBit(false); }
        if (src.data !== null && src.data !== undefined) { b_0.storeBit(true).storeRef(src.data); } else { b_0.storeBit(false); }
    };
}

export function loadSendParameters(slice: Slice) {
    let sc_0 = slice;
    let _bounce = sc_0.loadBit();
    let _to = sc_0.loadAddress();
    let _value = sc_0.loadIntBig(257);
    let _mode = sc_0.loadIntBig(257);
    let _body = sc_0.loadBit() ? sc_0.loadRef() : null;
    let _code = sc_0.loadBit() ? sc_0.loadRef() : null;
    let _data = sc_0.loadBit() ? sc_0.loadRef() : null;
    return { $$type: 'SendParameters' as const, bounce: _bounce, to: _to, value: _value, mode: _mode, body: _body, code: _code, data: _data };
}

function loadTupleSendParameters(source: TupleReader) {
    let _bounce = source.readBoolean();
    let _to = source.readAddress();
    let _value = source.readBigNumber();
    let _mode = source.readBigNumber();
    let _body = source.readCellOpt();
    let _code = source.readCellOpt();
    let _data = source.readCellOpt();
    return { $$type: 'SendParameters' as const, bounce: _bounce, to: _to, value: _value, mode: _mode, body: _body, code: _code, data: _data };
}

function storeTupleSendParameters(source: SendParameters) {
    let builder = new TupleBuilder();
    builder.writeBoolean(source.bounce);
    builder.writeAddress(source.to);
    builder.writeNumber(source.value);
    builder.writeNumber(source.mode);
    builder.writeCell(source.body);
    builder.writeCell(source.code);
    builder.writeCell(source.data);
    return builder.build();
}

function dictValueParserSendParameters(): DictionaryValue<SendParameters> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeSendParameters(src)).endCell());
        },
        parse: (src) => {
            return loadSendParameters(src.loadRef().beginParse());
        }
    }
}

export type Deploy = {
    $$type: 'Deploy';
    queryId: bigint;
}

export function storeDeploy(src: Deploy) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2490013878, 32);
        b_0.storeUint(src.queryId, 64);
    };
}

export function loadDeploy(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2490013878) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    return { $$type: 'Deploy' as const, queryId: _queryId };
}

function loadTupleDeploy(source: TupleReader) {
    let _queryId = source.readBigNumber();
    return { $$type: 'Deploy' as const, queryId: _queryId };
}

function storeTupleDeploy(source: Deploy) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    return builder.build();
}

function dictValueParserDeploy(): DictionaryValue<Deploy> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeDeploy(src)).endCell());
        },
        parse: (src) => {
            return loadDeploy(src.loadRef().beginParse());
        }
    }
}

export type DeployOk = {
    $$type: 'DeployOk';
    queryId: bigint;
}

export function storeDeployOk(src: DeployOk) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2952335191, 32);
        b_0.storeUint(src.queryId, 64);
    };
}

export function loadDeployOk(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2952335191) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    return { $$type: 'DeployOk' as const, queryId: _queryId };
}

function loadTupleDeployOk(source: TupleReader) {
    let _queryId = source.readBigNumber();
    return { $$type: 'DeployOk' as const, queryId: _queryId };
}

function storeTupleDeployOk(source: DeployOk) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    return builder.build();
}

function dictValueParserDeployOk(): DictionaryValue<DeployOk> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeDeployOk(src)).endCell());
        },
        parse: (src) => {
            return loadDeployOk(src.loadRef().beginParse());
        }
    }
}

export type FactoryDeploy = {
    $$type: 'FactoryDeploy';
    queryId: bigint;
    cashback: Address;
}

export function storeFactoryDeploy(src: FactoryDeploy) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1829761339, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeAddress(src.cashback);
    };
}

export function loadFactoryDeploy(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1829761339) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    let _cashback = sc_0.loadAddress();
    return { $$type: 'FactoryDeploy' as const, queryId: _queryId, cashback: _cashback };
}

function loadTupleFactoryDeploy(source: TupleReader) {
    let _queryId = source.readBigNumber();
    let _cashback = source.readAddress();
    return { $$type: 'FactoryDeploy' as const, queryId: _queryId, cashback: _cashback };
}

function storeTupleFactoryDeploy(source: FactoryDeploy) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeAddress(source.cashback);
    return builder.build();
}

function dictValueParserFactoryDeploy(): DictionaryValue<FactoryDeploy> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeFactoryDeploy(src)).endCell());
        },
        parse: (src) => {
            return loadFactoryDeploy(src.loadRef().beginParse());
        }
    }
}

export type ChangeOwner = {
    $$type: 'ChangeOwner';
    queryId: bigint;
    newOwner: Address;
}

export function storeChangeOwner(src: ChangeOwner) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2174598809, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeAddress(src.newOwner);
    };
}

export function loadChangeOwner(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2174598809) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    let _newOwner = sc_0.loadAddress();
    return { $$type: 'ChangeOwner' as const, queryId: _queryId, newOwner: _newOwner };
}

function loadTupleChangeOwner(source: TupleReader) {
    let _queryId = source.readBigNumber();
    let _newOwner = source.readAddress();
    return { $$type: 'ChangeOwner' as const, queryId: _queryId, newOwner: _newOwner };
}

function storeTupleChangeOwner(source: ChangeOwner) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeAddress(source.newOwner);
    return builder.build();
}

function dictValueParserChangeOwner(): DictionaryValue<ChangeOwner> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeChangeOwner(src)).endCell());
        },
        parse: (src) => {
            return loadChangeOwner(src.loadRef().beginParse());
        }
    }
}

export type ChangeOwnerOk = {
    $$type: 'ChangeOwnerOk';
    queryId: bigint;
    newOwner: Address;
}

export function storeChangeOwnerOk(src: ChangeOwnerOk) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(846932810, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeAddress(src.newOwner);
    };
}

export function loadChangeOwnerOk(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 846932810) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    let _newOwner = sc_0.loadAddress();
    return { $$type: 'ChangeOwnerOk' as const, queryId: _queryId, newOwner: _newOwner };
}

function loadTupleChangeOwnerOk(source: TupleReader) {
    let _queryId = source.readBigNumber();
    let _newOwner = source.readAddress();
    return { $$type: 'ChangeOwnerOk' as const, queryId: _queryId, newOwner: _newOwner };
}

function storeTupleChangeOwnerOk(source: ChangeOwnerOk) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeAddress(source.newOwner);
    return builder.build();
}

function dictValueParserChangeOwnerOk(): DictionaryValue<ChangeOwnerOk> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeChangeOwnerOk(src)).endCell());
        },
        parse: (src) => {
            return loadChangeOwnerOk(src.loadRef().beginParse());
        }
    }
}

export type UpdatePrice = {
    $$type: 'UpdatePrice';
    ticker: bigint;
    price_info: PriceInfo;
}

export function storeUpdatePrice(src: UpdatePrice) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(829862689, 32);
        b_0.storeInt(src.ticker, 257);
        b_0.store(storePriceInfo(src.price_info));
    };
}

export function loadUpdatePrice(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 829862689) { throw Error('Invalid prefix'); }
    let _ticker = sc_0.loadIntBig(257);
    let _price_info = loadPriceInfo(sc_0);
    return { $$type: 'UpdatePrice' as const, ticker: _ticker, price_info: _price_info };
}

function loadTupleUpdatePrice(source: TupleReader) {
    let _ticker = source.readBigNumber();
    const _price_info = loadTuplePriceInfo(source.readTuple());
    return { $$type: 'UpdatePrice' as const, ticker: _ticker, price_info: _price_info };
}

function storeTupleUpdatePrice(source: UpdatePrice) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.ticker);
    builder.writeTuple(storeTuplePriceInfo(source.price_info));
    return builder.build();
}

function dictValueParserUpdatePrice(): DictionaryValue<UpdatePrice> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeUpdatePrice(src)).endCell());
        },
        parse: (src) => {
            return loadUpdatePrice(src.loadRef().beginParse());
        }
    }
}

export type PriceInfo = {
    $$type: 'PriceInfo';
    price: bigint;
    symbol: string;
}

export function storePriceInfo(src: PriceInfo) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeCoins(src.price);
        b_0.storeStringRefTail(src.symbol);
    };
}

export function loadPriceInfo(slice: Slice) {
    let sc_0 = slice;
    let _price = sc_0.loadCoins();
    let _symbol = sc_0.loadStringRefTail();
    return { $$type: 'PriceInfo' as const, price: _price, symbol: _symbol };
}

function loadTuplePriceInfo(source: TupleReader) {
    let _price = source.readBigNumber();
    let _symbol = source.readString();
    return { $$type: 'PriceInfo' as const, price: _price, symbol: _symbol };
}

function storeTuplePriceInfo(source: PriceInfo) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.price);
    builder.writeString(source.symbol);
    return builder.build();
}

function dictValueParserPriceInfo(): DictionaryValue<PriceInfo> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storePriceInfo(src)).endCell());
        },
        parse: (src) => {
            return loadPriceInfo(src.loadRef().beginParse());
        }
    }
}

export type QueryPrice = {
    $$type: 'QueryPrice';
    from_ticker: bigint;
    to_ticker: bigint;
    carry_forward: Cell | null;
}

export function storeQueryPrice(src: QueryPrice) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(3062051732, 32);
        b_0.storeInt(src.from_ticker, 257);
        b_0.storeInt(src.to_ticker, 257);
        if (src.carry_forward !== null && src.carry_forward !== undefined) { b_0.storeBit(true).storeRef(src.carry_forward); } else { b_0.storeBit(false); }
    };
}

export function loadQueryPrice(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 3062051732) { throw Error('Invalid prefix'); }
    let _from_ticker = sc_0.loadIntBig(257);
    let _to_ticker = sc_0.loadIntBig(257);
    let _carry_forward = sc_0.loadBit() ? sc_0.loadRef() : null;
    return { $$type: 'QueryPrice' as const, from_ticker: _from_ticker, to_ticker: _to_ticker, carry_forward: _carry_forward };
}

function loadTupleQueryPrice(source: TupleReader) {
    let _from_ticker = source.readBigNumber();
    let _to_ticker = source.readBigNumber();
    let _carry_forward = source.readCellOpt();
    return { $$type: 'QueryPrice' as const, from_ticker: _from_ticker, to_ticker: _to_ticker, carry_forward: _carry_forward };
}

function storeTupleQueryPrice(source: QueryPrice) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.from_ticker);
    builder.writeNumber(source.to_ticker);
    builder.writeSlice(source.carry_forward);
    return builder.build();
}

function dictValueParserQueryPrice(): DictionaryValue<QueryPrice> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeQueryPrice(src)).endCell());
        },
        parse: (src) => {
            return loadQueryPrice(src.loadRef().beginParse());
        }
    }
}

export type ReplyFromOracle = {
    $$type: 'ReplyFromOracle';
    from_price_info: PriceInfo;
    to_price_info: PriceInfo;
    carry_forward: Cell | null;
}

export function storeReplyFromOracle(src: ReplyFromOracle) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(465494203, 32);
        b_0.store(storePriceInfo(src.from_price_info));
        b_0.store(storePriceInfo(src.to_price_info));
        if (src.carry_forward !== null && src.carry_forward !== undefined) { b_0.storeBit(true).storeRef(src.carry_forward); } else { b_0.storeBit(false); }
    };
}

export function loadReplyFromOracle(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 465494203) { throw Error('Invalid prefix'); }
    let _from_price_info = loadPriceInfo(sc_0);
    let _to_price_info = loadPriceInfo(sc_0);
    let _carry_forward = sc_0.loadBit() ? sc_0.loadRef() : null;
    return { $$type: 'ReplyFromOracle' as const, from_price_info: _from_price_info, to_price_info: _to_price_info, carry_forward: _carry_forward };
}

function loadTupleReplyFromOracle(source: TupleReader) {
    const _from_price_info = loadTuplePriceInfo(source.readTuple());
    const _to_price_info = loadTuplePriceInfo(source.readTuple());
    let _carry_forward = source.readCellOpt();
    return { $$type: 'ReplyFromOracle' as const, from_price_info: _from_price_info, to_price_info: _to_price_info, carry_forward: _carry_forward };
}

function storeTupleReplyFromOracle(source: ReplyFromOracle) {
    let builder = new TupleBuilder();
    builder.writeTuple(storeTuplePriceInfo(source.from_price_info));
    builder.writeTuple(storeTuplePriceInfo(source.to_price_info));
    builder.writeSlice(source.carry_forward);
    return builder.build();
}

function dictValueParserReplyFromOracle(): DictionaryValue<ReplyFromOracle> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeReplyFromOracle(src)).endCell());
        },
        parse: (src) => {
            return loadReplyFromOracle(src.loadRef().beginParse());
        }
    }
}

export type ChainName = {
    $$type: 'ChainName';
    name: string;
}

export function storeChainName(src: ChainName) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeStringRefTail(src.name);
    };
}

export function loadChainName(slice: Slice) {
    let sc_0 = slice;
    let _name = sc_0.loadStringRefTail();
    return { $$type: 'ChainName' as const, name: _name };
}

function loadTupleChainName(source: TupleReader) {
    let _name = source.readString();
    return { $$type: 'ChainName' as const, name: _name };
}

function storeTupleChainName(source: ChainName) {
    let builder = new TupleBuilder();
    builder.writeString(source.name);
    return builder.build();
}

function dictValueParserChainName(): DictionaryValue<ChainName> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeChainName(src)).endCell());
        },
        parse: (src) => {
            return loadChainName(src.loadRef().beginParse());
        }
    }
}

export type CoinFee = {
    $$type: 'CoinFee';
    minimum: bigint;
    percentage: bigint;
}

export function storeCoinFee(src: CoinFee) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeInt(src.minimum, 257);
        b_0.storeInt(src.percentage, 257);
    };
}

export function loadCoinFee(slice: Slice) {
    let sc_0 = slice;
    let _minimum = sc_0.loadIntBig(257);
    let _percentage = sc_0.loadIntBig(257);
    return { $$type: 'CoinFee' as const, minimum: _minimum, percentage: _percentage };
}

function loadTupleCoinFee(source: TupleReader) {
    let _minimum = source.readBigNumber();
    let _percentage = source.readBigNumber();
    return { $$type: 'CoinFee' as const, minimum: _minimum, percentage: _percentage };
}

function storeTupleCoinFee(source: CoinFee) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.minimum);
    builder.writeNumber(source.percentage);
    return builder.build();
}

function dictValueParserCoinFee(): DictionaryValue<CoinFee> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeCoinFee(src)).endCell());
        },
        parse: (src) => {
            return loadCoinFee(src.loadRef().beginParse());
        }
    }
}

export type Chain = {
    $$type: 'Chain';
    name: string;
    chain_id: bigint;
    domain: bigint;
    tx_fee: bigint;
    native_coin: NativeCoin;
}

export function storeChain(src: Chain) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeStringRefTail(src.name);
        b_0.storeInt(src.chain_id, 257);
        b_0.storeInt(src.domain, 257);
        b_0.storeInt(src.tx_fee, 257);
        let b_1 = new Builder();
        b_1.store(storeNativeCoin(src.native_coin));
        b_0.storeRef(b_1.endCell());
    };
}

export function loadChain(slice: Slice) {
    let sc_0 = slice;
    let _name = sc_0.loadStringRefTail();
    let _chain_id = sc_0.loadIntBig(257);
    let _domain = sc_0.loadIntBig(257);
    let _tx_fee = sc_0.loadIntBig(257);
    let sc_1 = sc_0.loadRef().beginParse();
    let _native_coin = loadNativeCoin(sc_1);
    return { $$type: 'Chain' as const, name: _name, chain_id: _chain_id, domain: _domain, tx_fee: _tx_fee, native_coin: _native_coin };
}

function loadTupleChain(source: TupleReader) {
    let _name = source.readString();
    let _chain_id = source.readBigNumber();
    let _domain = source.readBigNumber();
    let _tx_fee = source.readBigNumber();
    const _native_coin = loadTupleNativeCoin(source.readTuple());
    return { $$type: 'Chain' as const, name: _name, chain_id: _chain_id, domain: _domain, tx_fee: _tx_fee, native_coin: _native_coin };
}

function storeTupleChain(source: Chain) {
    let builder = new TupleBuilder();
    builder.writeString(source.name);
    builder.writeNumber(source.chain_id);
    builder.writeNumber(source.domain);
    builder.writeNumber(source.tx_fee);
    builder.writeTuple(storeTupleNativeCoin(source.native_coin));
    return builder.build();
}

function dictValueParserChain(): DictionaryValue<Chain> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeChain(src)).endCell());
        },
        parse: (src) => {
            return loadChain(src.loadRef().beginParse());
        }
    }
}

export type NativeCoin = {
    $$type: 'NativeCoin';
    symbol: string;
    id: bigint;
}

export function storeNativeCoin(src: NativeCoin) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeStringRefTail(src.symbol);
        b_0.storeInt(src.id, 257);
    };
}

export function loadNativeCoin(slice: Slice) {
    let sc_0 = slice;
    let _symbol = sc_0.loadStringRefTail();
    let _id = sc_0.loadIntBig(257);
    return { $$type: 'NativeCoin' as const, symbol: _symbol, id: _id };
}

function loadTupleNativeCoin(source: TupleReader) {
    let _symbol = source.readString();
    let _id = source.readBigNumber();
    return { $$type: 'NativeCoin' as const, symbol: _symbol, id: _id };
}

function storeTupleNativeCoin(source: NativeCoin) {
    let builder = new TupleBuilder();
    builder.writeString(source.symbol);
    builder.writeNumber(source.id);
    return builder.build();
}

function dictValueParserNativeCoin(): DictionaryValue<NativeCoin> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeNativeCoin(src)).endCell());
        },
        parse: (src) => {
            return loadNativeCoin(src.loadRef().beginParse());
        }
    }
}

export type UpdateChain = {
    $$type: 'UpdateChain';
    name: string;
    chain_id: bigint;
    domain: bigint;
    tx_fee: bigint;
    native_coin: NativeCoin;
}

export function storeUpdateChain(src: UpdateChain) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2002495400, 32);
        b_0.storeStringRefTail(src.name);
        b_0.storeInt(src.chain_id, 257);
        b_0.storeInt(src.domain, 257);
        b_0.storeInt(src.tx_fee, 257);
        let b_1 = new Builder();
        b_1.store(storeNativeCoin(src.native_coin));
        b_0.storeRef(b_1.endCell());
    };
}

export function loadUpdateChain(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2002495400) { throw Error('Invalid prefix'); }
    let _name = sc_0.loadStringRefTail();
    let _chain_id = sc_0.loadIntBig(257);
    let _domain = sc_0.loadIntBig(257);
    let _tx_fee = sc_0.loadIntBig(257);
    let sc_1 = sc_0.loadRef().beginParse();
    let _native_coin = loadNativeCoin(sc_1);
    return { $$type: 'UpdateChain' as const, name: _name, chain_id: _chain_id, domain: _domain, tx_fee: _tx_fee, native_coin: _native_coin };
}

function loadTupleUpdateChain(source: TupleReader) {
    let _name = source.readString();
    let _chain_id = source.readBigNumber();
    let _domain = source.readBigNumber();
    let _tx_fee = source.readBigNumber();
    const _native_coin = loadTupleNativeCoin(source.readTuple());
    return { $$type: 'UpdateChain' as const, name: _name, chain_id: _chain_id, domain: _domain, tx_fee: _tx_fee, native_coin: _native_coin };
}

function storeTupleUpdateChain(source: UpdateChain) {
    let builder = new TupleBuilder();
    builder.writeString(source.name);
    builder.writeNumber(source.chain_id);
    builder.writeNumber(source.domain);
    builder.writeNumber(source.tx_fee);
    builder.writeTuple(storeTupleNativeCoin(source.native_coin));
    return builder.build();
}

function dictValueParserUpdateChain(): DictionaryValue<UpdateChain> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeUpdateChain(src)).endCell());
        },
        parse: (src) => {
            return loadUpdateChain(src.loadRef().beginParse());
        }
    }
}

export type UpdateCoinFee = {
    $$type: 'UpdateCoinFee';
    coin_name: string;
    fee: CoinFee;
}

export function storeUpdateCoinFee(src: UpdateCoinFee) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(3565914173, 32);
        b_0.storeStringRefTail(src.coin_name);
        b_0.store(storeCoinFee(src.fee));
    };
}

export function loadUpdateCoinFee(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 3565914173) { throw Error('Invalid prefix'); }
    let _coin_name = sc_0.loadStringRefTail();
    let _fee = loadCoinFee(sc_0);
    return { $$type: 'UpdateCoinFee' as const, coin_name: _coin_name, fee: _fee };
}

function loadTupleUpdateCoinFee(source: TupleReader) {
    let _coin_name = source.readString();
    const _fee = loadTupleCoinFee(source.readTuple());
    return { $$type: 'UpdateCoinFee' as const, coin_name: _coin_name, fee: _fee };
}

function storeTupleUpdateCoinFee(source: UpdateCoinFee) {
    let builder = new TupleBuilder();
    builder.writeString(source.coin_name);
    builder.writeTuple(storeTupleCoinFee(source.fee));
    return builder.build();
}

function dictValueParserUpdateCoinFee(): DictionaryValue<UpdateCoinFee> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeUpdateCoinFee(src)).endCell());
        },
        parse: (src) => {
            return loadUpdateCoinFee(src.loadRef().beginParse());
        }
    }
}

export type UpdateProtocolFeeDivisor = {
    $$type: 'UpdateProtocolFeeDivisor';
    protocol_fee_divisor: bigint;
}

export function storeUpdateProtocolFeeDivisor(src: UpdateProtocolFeeDivisor) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(3330714625, 32);
        b_0.storeInt(src.protocol_fee_divisor, 257);
    };
}

export function loadUpdateProtocolFeeDivisor(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 3330714625) { throw Error('Invalid prefix'); }
    let _protocol_fee_divisor = sc_0.loadIntBig(257);
    return { $$type: 'UpdateProtocolFeeDivisor' as const, protocol_fee_divisor: _protocol_fee_divisor };
}

function loadTupleUpdateProtocolFeeDivisor(source: TupleReader) {
    let _protocol_fee_divisor = source.readBigNumber();
    return { $$type: 'UpdateProtocolFeeDivisor' as const, protocol_fee_divisor: _protocol_fee_divisor };
}

function storeTupleUpdateProtocolFeeDivisor(source: UpdateProtocolFeeDivisor) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.protocol_fee_divisor);
    return builder.build();
}

function dictValueParserUpdateProtocolFeeDivisor(): DictionaryValue<UpdateProtocolFeeDivisor> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeUpdateProtocolFeeDivisor(src)).endCell());
        },
        parse: (src) => {
            return loadUpdateProtocolFeeDivisor(src.loadRef().beginParse());
        }
    }
}

export type UpdateTxMinimalFee = {
    $$type: 'UpdateTxMinimalFee';
    min_protocol_fee: bigint;
}

export function storeUpdateTxMinimalFee(src: UpdateTxMinimalFee) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(3440292900, 32);
        b_0.storeInt(src.min_protocol_fee, 257);
    };
}

export function loadUpdateTxMinimalFee(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 3440292900) { throw Error('Invalid prefix'); }
    let _min_protocol_fee = sc_0.loadIntBig(257);
    return { $$type: 'UpdateTxMinimalFee' as const, min_protocol_fee: _min_protocol_fee };
}

function loadTupleUpdateTxMinimalFee(source: TupleReader) {
    let _min_protocol_fee = source.readBigNumber();
    return { $$type: 'UpdateTxMinimalFee' as const, min_protocol_fee: _min_protocol_fee };
}

function storeTupleUpdateTxMinimalFee(source: UpdateTxMinimalFee) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.min_protocol_fee);
    return builder.build();
}

function dictValueParserUpdateTxMinimalFee(): DictionaryValue<UpdateTxMinimalFee> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeUpdateTxMinimalFee(src)).endCell());
        },
        parse: (src) => {
            return loadUpdateTxMinimalFee(src.loadRef().beginParse());
        }
    }
}

 type Oracle_init_args = {
    $$type: 'Oracle_init_args';
    init_price_fee: Dictionary<bigint, PriceInfo>;
    owner: Address;
    cid: bigint;
    min_protocol_fee: bigint;
}

function initOracle_init_args(src: Oracle_init_args) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeDict(src.init_price_fee, Dictionary.Keys.BigInt(257), dictValueParserPriceInfo());
        b_0.storeAddress(src.owner);
        b_0.storeInt(src.cid, 257);
        b_0.storeInt(src.min_protocol_fee, 257);
    };
}

async function Oracle_init(init_price_fee: Dictionary<bigint, PriceInfo>, owner: Address, cid: bigint, min_protocol_fee: bigint) {
    const __code = Cell.fromBase64('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');
    const __system = Cell.fromBase64('te6cckECPwEACdsAAQHAAQEFoNIfAgEU/wD0pBP0vPLICwMCAWIoBAIBIBcFAgEgDwYCAUgLBwIBWAoIAhCqsNs82zxssTwJAAIhAHSpu40NWlwZnM6Ly9RbVkxcmdQRGROZVFGd3FiVXFnWFpNZks3VG1YbkpacGRVUVQza1cyWXB2TjNlgAgFiDQwAD6V92omhpAADAg+kXbZ5tnjZYzwOAAIlAgEgFBACAVgSEQDdrejBOC52Hq6WVz2PQnYc6yVCjbNBOE7rGpaVsj5ZkWnXlv74sRzBOBAq4A3AM7HKZywdVyOS2WHBOE7Lpy1Zp2W5nQdLNsozdFJBOHlzv9XzQvQWci1WhV2C2KVBOCBnOrTzivzpKFgOsLcTI9lAAhGv9e2ebZ42WMA8EwACIAIVt/g7Z4qhW2eNljA8FQH2+QKBAQEkAln0DW+hkjBt3yBukjBtji7Q1AHQAYEBAdcAgQEB1wCBAQHXANQB0NQB0AGBAQHXAFkyECYQJRAkQwBsFm8G4oIA8iAhbrPy9CBu8tCAbyYxbCIygQEBVEMTWfQNb6GSMG3fIG6SMG2b0PoA1AHQEmwSbwLiFgCuggClRSFus/L0IoEBAStZ9A1voZIwbd8gbpIwbZvQ+gDUAdASbBJvAuKBd5YhbrPy9AEgbvLQgG8iMAEgbvLQgG8iMFmoIaClAakEUwqpBFMGvJIwJd+gAgEgJhgCASAbGQIRtxobZ5tnjZYwPBoAAiYCASAhHAIBIB8dAhGutu2ebZ42WMA8HgACJAIRrNbtnm2eNljAPCAAAiICASAkIgIRrKptnm2eNljAPCMAAigCEa6O7Z5tnjZYwDwlAAIqAhW62J2zxVGts8bLGDwnAKAB+QKBAQEmAln0DW+hkjBt3yBukjBtjhDQgQEB1wCBAQHXAFlsEm8C4oIA8nchbrPy9CBu8tCAbyISqCCCCA9CQKkEIryYMYIID0JAqQTgMAN60AHQ0wMBcbCjAfpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IhUUFMDbwT4YQL4Yts8VRrbPPLggjwqKQDKyPhDAcx/AcoAVaBQuiDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFhiBAQHPAMhQB88WyVAGzBSBAQHPAALIgQEBzwD0ABKBAQHPABL0ABL0AAPI9AAS9ADJWMzJAczJ7VQExAGSMH/gcCHXScIflTAg1wsf3iCCEDF2syG64wIgghC2gzOUuo6pMNMfAYIQtoMzlLry4IGBAQHXAIEBAdcA0gABk9QB0JFt4kMwbBPbPH/gIIIQd1unqLrjAiCCENSLiD26OjUyKwTGjqQw0x8BghDUi4g9uvLggdQB0AGBAQHXAIEBAdcAWRAjbBPbPH/gIIIQxoasAbqOnzDTHwGCEMaGrAG68uCBgQEB1wABMVWg2zw5EJpVB3/gIIIQzQ60JLrjAiCCEJRqmLa6LzsuLALQjqgw0x8BghCUapi2uvLggdM/ATHIAYIQr/kPV1jLH8s/yfhCAXBt2zx/4IIQgZ2+mbqOsdMfAYIQgZ2+mbry4IHTP/pAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgSbBLgMHA3LQKyEKxeOBB7EGwQWxBMEDtMvNs8OlGryFmCEDJ7K0pQA8sfyz8BINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WyRCKEHkQaBBXEEYQNUQw+EIBf23bPH87NwFSMNMfAYIQzQ60JLry4IGBAQHXAAExVaDbPDQQmhCJEHgQZxBWEEVVAn87A/QQrRCcEIsQfRBsEFsQTRA8S9zbPAv5AoIA6lEtgggPQkC58vQjgQEBIln0DW+hkjBt3yBukjBtjhDQgQEB1wCBAQHXAFlsEm8C4iBujiQwDYEBAQ3IWQKBAQHPAIEBAc8AyUzQIG6VMFn0WjCUQTP0FeLjDhB6EGkQWDsxMAAQEEcQNkUTUEIAfiBu8tCAbyJRH72SMH+SLb3ijiUNgQEBDchZAoEBAc8AgQEBzwDJTNAgbpUwWfRaMJRBM/QV4hCakzA7O+IQmgF4MNMfAYIQd1unqLry4IHUAdABgQEB1wCBAQHXAIEBAdcA1AHQ1AHQAYEBAdcAWTIQJhAlECRDAGwW2zx/MwLoChEQChCfEI4QfRBsEFsEERAEED9O3Ns8K/kCgQEBLQNWEwNWEwMCERMCARESARERyFVQyFAGzxbJUAbME4EBAc8AgQEBzwCBAQHPAMhayFjPFslYzIEBAc8AyQHMyRAjTNAgbpUwWfRaMJRBM/QV4oEBASk7NACOyAHIAc8WyQHMyRA0QeAgbpUwWfRaMJRBM/QV4oEBAQjIAcgBzxbJAczJEDpI0CBulTBZ9FowlEEz9BXiEEoQOUhwFhBFQwMByoEBAVREFFn0DW+hkjBt3yBukjBtm9D6ANQB0BJsEm8C4oIAxnghbrPy9IEBAVREE1n0DW+hkjBt3yBukjBtm9D6ANQB0BJsEm8C4oF3liFus/L0ASBu8tCAbyICIG7y0IBvIkEENgGCyFVAghAbvuC7UAbLH0BDWfoCyFjPFskBzAJZ+gLIWM8WyQHMIW6zm38BygDIWM8WyQHMlHAyygDiyfhCAX9t2zw3ATptbSJus5lbIG7y0IBvIgGRMuIQJHADBIBCUCPbPDgByshxAcoBUAcBygBwAcoCUAUg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxZQA/oCcAHKaCNus5F/kyRus+KXMzMBcAHKAOMNIW6znH8BygABIG7y0IABzJUxcAHKAOLJAfsAOQCYfwHKAMhwAcoAcAHKACRus51/AcoABCBu8tCAUATMljQDcAHKAOIkbrOdfwHKAAQgbvLQgFAEzJY0A3ABygDicAHKAAJ/AcoAAslYzAHIMNMfAYIQMXazIbry4IGBAQHXAPoA1AHQEhAjbBMQrRCcEIsQfRBsEFsQTRA8S9zbPA2BAQENyFlZ+gLIWM8WyQHMyRA9TLAgbpUwWfRaMJRBM/QV4hB6EGkQWBBHEDZFQEMwfzsAEvhCUrDHBfLghAHW7UTQ1AH4Y9IAAY5T+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiAGBAQHXANQB0AGBAQHXANQB0IEBAdcA9ASBAQHXAPQE9ATUMND0BPQEMBB7EHoQeRB4bBvg+CjXCwqDCbry4Ik9AWj0BPpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgBgQEB1wCBAQHXAFUwBNFVAts8PgBmcYs1RPToFBWC8BpCGf5eYNY68qPMfc5v7Gm0XGtXGEl6YUjnwjKsh72KRENtbW1YBG0B+iBCJA==');
    let builder = beginCell();
    builder.storeRef(__system);
    builder.storeUint(0, 1);
    initOracle_init_args({ $$type: 'Oracle_init_args', init_price_fee, owner, cid, min_protocol_fee })(builder);
    const __data = builder.endCell();
    return { code: __code, data: __data };
}

const Oracle_errors: { [key: number]: { message: string } } = {
    2: { message: `Stack undeflow` },
    3: { message: `Stack overflow` },
    4: { message: `Integer overflow` },
    5: { message: `Integer out of expected range` },
    6: { message: `Invalid opcode` },
    7: { message: `Type check error` },
    8: { message: `Cell overflow` },
    9: { message: `Cell underflow` },
    10: { message: `Dictionary error` },
    13: { message: `Out of gas error` },
    32: { message: `Method ID not found` },
    34: { message: `Action is invalid or not supported` },
    37: { message: `Not enough TON` },
    38: { message: `Not enough extra-currencies` },
    128: { message: `Null reference exception` },
    129: { message: `Invalid serialization prefix` },
    130: { message: `Invalid incoming message` },
    131: { message: `Constraints error` },
    132: { message: `Access denied` },
    133: { message: `Contract stopped` },
    134: { message: `Invalid argument` },
    135: { message: `Code of a contract was not found` },
    136: { message: `Invalid address` },
    137: { message: `Masterchain support is not enabled for this contract` },
    30614: { message: `No Data for _to_ ticker id` },
    42309: { message: `No Data for destination coin id` },
    50808: { message: `No Data for _from_ ticker id` },
    59985: { message: `Value Exceeds One Hundred Percent` },
    61984: { message: `No Chain Data found for this chain name` },
    62071: { message: `No Coin Fee found for this coin name` },
}

const Oracle_types: ABIType[] = [
    {"name":"StateInit","header":null,"fields":[{"name":"code","type":{"kind":"simple","type":"cell","optional":false}},{"name":"data","type":{"kind":"simple","type":"cell","optional":false}}]},
    {"name":"Context","header":null,"fields":[{"name":"bounced","type":{"kind":"simple","type":"bool","optional":false}},{"name":"sender","type":{"kind":"simple","type":"address","optional":false}},{"name":"value","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"raw","type":{"kind":"simple","type":"slice","optional":false}}]},
    {"name":"SendParameters","header":null,"fields":[{"name":"bounce","type":{"kind":"simple","type":"bool","optional":false}},{"name":"to","type":{"kind":"simple","type":"address","optional":false}},{"name":"value","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"mode","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"body","type":{"kind":"simple","type":"cell","optional":true}},{"name":"code","type":{"kind":"simple","type":"cell","optional":true}},{"name":"data","type":{"kind":"simple","type":"cell","optional":true}}]},
    {"name":"Deploy","header":2490013878,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"DeployOk","header":2952335191,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"FactoryDeploy","header":1829761339,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"cashback","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"ChangeOwner","header":2174598809,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"newOwner","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"ChangeOwnerOk","header":846932810,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"newOwner","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"UpdatePrice","header":829862689,"fields":[{"name":"ticker","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"price_info","type":{"kind":"simple","type":"PriceInfo","optional":false}}]},
    {"name":"PriceInfo","header":null,"fields":[{"name":"price","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"symbol","type":{"kind":"simple","type":"string","optional":false}}]},
    {"name":"QueryPrice","header":3062051732,"fields":[{"name":"from_ticker","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"to_ticker","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"carry_forward","type":{"kind":"simple","type":"slice","optional":true}}]},
    {"name":"ReplyFromOracle","header":465494203,"fields":[{"name":"from_price_info","type":{"kind":"simple","type":"PriceInfo","optional":false}},{"name":"to_price_info","type":{"kind":"simple","type":"PriceInfo","optional":false}},{"name":"carry_forward","type":{"kind":"simple","type":"slice","optional":true}}]},
    {"name":"ChainName","header":null,"fields":[{"name":"name","type":{"kind":"simple","type":"string","optional":false}}]},
    {"name":"CoinFee","header":null,"fields":[{"name":"minimum","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"percentage","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"Chain","header":null,"fields":[{"name":"name","type":{"kind":"simple","type":"string","optional":false}},{"name":"chain_id","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"domain","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"tx_fee","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"native_coin","type":{"kind":"simple","type":"NativeCoin","optional":false}}]},
    {"name":"NativeCoin","header":null,"fields":[{"name":"symbol","type":{"kind":"simple","type":"string","optional":false}},{"name":"id","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"UpdateChain","header":2002495400,"fields":[{"name":"name","type":{"kind":"simple","type":"string","optional":false}},{"name":"chain_id","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"domain","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"tx_fee","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"native_coin","type":{"kind":"simple","type":"NativeCoin","optional":false}}]},
    {"name":"UpdateCoinFee","header":3565914173,"fields":[{"name":"coin_name","type":{"kind":"simple","type":"string","optional":false}},{"name":"fee","type":{"kind":"simple","type":"CoinFee","optional":false}}]},
    {"name":"UpdateProtocolFeeDivisor","header":3330714625,"fields":[{"name":"protocol_fee_divisor","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"UpdateTxMinimalFee","header":3440292900,"fields":[{"name":"min_protocol_fee","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
]

const Oracle_getters: ABIGetter[] = [
    {"name":"price_feed","arguments":[],"returnType":{"kind":"dict","key":"int","value":"PriceInfo","valueFormat":"ref"}},
    {"name":"self_chain_id","arguments":[],"returnType":{"kind":"simple","type":"int","optional":false,"format":257}},
    {"name":"self_coin","arguments":[],"returnType":{"kind":"simple","type":"string","optional":false}},
    {"name":"chain_id_to_name","arguments":[],"returnType":{"kind":"dict","key":"int","value":"ChainName","valueFormat":"ref"}},
    {"name":"chain_data","arguments":[],"returnType":{"kind":"dict","key":"int","value":"Chain","valueFormat":"ref"}},
    {"name":"domain_to_chain_name","arguments":[],"returnType":{"kind":"dict","key":"int","value":"ChainName","valueFormat":"ref"}},
    {"name":"minimum_protocol_fee","arguments":[],"returnType":{"kind":"simple","type":"int","optional":false,"format":257}},
    {"name":"calculateCoinFees","arguments":[{"name":"coin_name","type":{"kind":"simple","type":"string","optional":false}},{"name":"amt","type":{"kind":"simple","type":"int","optional":false,"format":257}}],"returnType":{"kind":"simple","type":"int","optional":false,"format":257}},
    {"name":"calculateTransactionFees","arguments":[{"name":"chain_name","type":{"kind":"simple","type":"string","optional":false}}],"returnType":{"kind":"simple","type":"int","optional":false,"format":257}},
    {"name":"owner","arguments":[],"returnType":{"kind":"simple","type":"address","optional":false}},
]

const Oracle_receivers: ABIReceiver[] = [
    {"receiver":"internal","message":{"kind":"typed","type":"UpdatePrice"}},
    {"receiver":"internal","message":{"kind":"typed","type":"QueryPrice"}},
    {"receiver":"internal","message":{"kind":"typed","type":"UpdateChain"}},
    {"receiver":"internal","message":{"kind":"typed","type":"UpdateCoinFee"}},
    {"receiver":"internal","message":{"kind":"typed","type":"UpdateProtocolFeeDivisor"}},
    {"receiver":"internal","message":{"kind":"typed","type":"UpdateTxMinimalFee"}},
    {"receiver":"internal","message":{"kind":"typed","type":"Deploy"}},
    {"receiver":"internal","message":{"kind":"typed","type":"ChangeOwner"}},
]

export class Oracle implements Contract {
    
    static async init(init_price_fee: Dictionary<bigint, PriceInfo>, owner: Address, cid: bigint, min_protocol_fee: bigint) {
        return await Oracle_init(init_price_fee, owner, cid, min_protocol_fee);
    }
    
    static async fromInit(init_price_fee: Dictionary<bigint, PriceInfo>, owner: Address, cid: bigint, min_protocol_fee: bigint) {
        const init = await Oracle_init(init_price_fee, owner, cid, min_protocol_fee);
        const address = contractAddress(0, init);
        return new Oracle(address, init);
    }
    
    static fromAddress(address: Address) {
        return new Oracle(address);
    }
    
    readonly address: Address; 
    readonly init?: { code: Cell, data: Cell };
    readonly abi: ContractABI = {
        types:  Oracle_types,
        getters: Oracle_getters,
        receivers: Oracle_receivers,
        errors: Oracle_errors,
    };
    
    private constructor(address: Address, init?: { code: Cell, data: Cell }) {
        this.address = address;
        this.init = init;
    }
    
    async send(provider: ContractProvider, via: Sender, args: { value: bigint, bounce?: boolean| null | undefined }, message: UpdatePrice | QueryPrice | UpdateChain | UpdateCoinFee | UpdateProtocolFeeDivisor | UpdateTxMinimalFee | Deploy | ChangeOwner) {
        
        let body: Cell | null = null;
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'UpdatePrice') {
            body = beginCell().store(storeUpdatePrice(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'QueryPrice') {
            body = beginCell().store(storeQueryPrice(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'UpdateChain') {
            body = beginCell().store(storeUpdateChain(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'UpdateCoinFee') {
            body = beginCell().store(storeUpdateCoinFee(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'UpdateProtocolFeeDivisor') {
            body = beginCell().store(storeUpdateProtocolFeeDivisor(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'UpdateTxMinimalFee') {
            body = beginCell().store(storeUpdateTxMinimalFee(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'Deploy') {
            body = beginCell().store(storeDeploy(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'ChangeOwner') {
            body = beginCell().store(storeChangeOwner(message)).endCell();
        }
        if (body === null) { throw new Error('Invalid message type'); }
        
        await provider.internal(via, { ...args, body: body });
        
    }
    
    async getPriceFeed(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('price_feed', builder.build())).stack;
        let result = Dictionary.loadDirect(Dictionary.Keys.BigInt(257), dictValueParserPriceInfo(), source.readCellOpt());
        return result;
    }
    
    async getSelfChainId(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('self_chain_id', builder.build())).stack;
        let result = source.readBigNumber();
        return result;
    }
    
    async getSelfCoin(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('self_coin', builder.build())).stack;
        let result = source.readString();
        return result;
    }
    
    async getChainIdToName(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('chain_id_to_name', builder.build())).stack;
        let result = Dictionary.loadDirect(Dictionary.Keys.BigInt(257), dictValueParserChainName(), source.readCellOpt());
        return result;
    }
    
    async getChainData(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('chain_data', builder.build())).stack;
        let result = Dictionary.loadDirect(Dictionary.Keys.BigInt(257), dictValueParserChain(), source.readCellOpt());
        return result;
    }
    
    async getDomainToChainName(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('domain_to_chain_name', builder.build())).stack;
        let result = Dictionary.loadDirect(Dictionary.Keys.BigInt(257), dictValueParserChainName(), source.readCellOpt());
        return result;
    }
    
    async getMinimumProtocolFee(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('minimum_protocol_fee', builder.build())).stack;
        let result = source.readBigNumber();
        return result;
    }
    
    async getCalculateCoinFees(provider: ContractProvider, coin_name: string, amt: bigint) {
        let builder = new TupleBuilder();
        builder.writeString(coin_name);
        builder.writeNumber(amt);
        let source = (await provider.get('calculateCoinFees', builder.build())).stack;
        let result = source.readBigNumber();
        return result;
    }
    
    async getCalculateTransactionFees(provider: ContractProvider, chain_name: string) {
        let builder = new TupleBuilder();
        builder.writeString(chain_name);
        let source = (await provider.get('calculateTransactionFees', builder.build())).stack;
        let result = source.readBigNumber();
        return result;
    }
    
    async getOwner(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('owner', builder.build())).stack;
        let result = source.readAddress();
        return result;
    }
    
}