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

export type JettonTransfer = {
    $$type: 'JettonTransfer';
    query_id: bigint;
    amount: bigint;
    destination: Address;
    response_destination: Address;
    custom_payload: Cell | null;
    forward_ton_amount: bigint;
    forward_payload: Cell;
}

export function storeJettonTransfer(src: JettonTransfer) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(260734629, 32);
        b_0.storeUint(src.query_id, 64);
        b_0.storeCoins(src.amount);
        b_0.storeAddress(src.destination);
        b_0.storeAddress(src.response_destination);
        if (src.custom_payload !== null && src.custom_payload !== undefined) { b_0.storeBit(true).storeRef(src.custom_payload); } else { b_0.storeBit(false); }
        b_0.storeCoins(src.forward_ton_amount);
        b_0.storeBuilder(src.forward_payload.asBuilder());
    };
}

export function loadJettonTransfer(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 260734629) { throw Error('Invalid prefix'); }
    let _query_id = sc_0.loadUintBig(64);
    let _amount = sc_0.loadCoins();
    let _destination = sc_0.loadAddress();
    let _response_destination = sc_0.loadAddress();
    let _custom_payload = sc_0.loadBit() ? sc_0.loadRef() : null;
    let _forward_ton_amount = sc_0.loadCoins();
    let _forward_payload = sc_0.asCell();
    return { $$type: 'JettonTransfer' as const, query_id: _query_id, amount: _amount, destination: _destination, response_destination: _response_destination, custom_payload: _custom_payload, forward_ton_amount: _forward_ton_amount, forward_payload: _forward_payload };
}

function loadTupleJettonTransfer(source: TupleReader) {
    let _query_id = source.readBigNumber();
    let _amount = source.readBigNumber();
    let _destination = source.readAddress();
    let _response_destination = source.readAddress();
    let _custom_payload = source.readCellOpt();
    let _forward_ton_amount = source.readBigNumber();
    let _forward_payload = source.readCell();
    return { $$type: 'JettonTransfer' as const, query_id: _query_id, amount: _amount, destination: _destination, response_destination: _response_destination, custom_payload: _custom_payload, forward_ton_amount: _forward_ton_amount, forward_payload: _forward_payload };
}

function storeTupleJettonTransfer(source: JettonTransfer) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.query_id);
    builder.writeNumber(source.amount);
    builder.writeAddress(source.destination);
    builder.writeAddress(source.response_destination);
    builder.writeCell(source.custom_payload);
    builder.writeNumber(source.forward_ton_amount);
    builder.writeSlice(source.forward_payload);
    return builder.build();
}

function dictValueParserJettonTransfer(): DictionaryValue<JettonTransfer> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeJettonTransfer(src)).endCell());
        },
        parse: (src) => {
            return loadJettonTransfer(src.loadRef().beginParse());
        }
    }
}

export type JettonTransferNotification = {
    $$type: 'JettonTransferNotification';
    query_id: bigint;
    amount: bigint;
    sender: Address;
    forward_payload: Cell;
}

export function storeJettonTransferNotification(src: JettonTransferNotification) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1935855772, 32);
        b_0.storeUint(src.query_id, 64);
        b_0.storeCoins(src.amount);
        b_0.storeAddress(src.sender);
        b_0.storeBuilder(src.forward_payload.asBuilder());
    };
}

export function loadJettonTransferNotification(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1935855772) { throw Error('Invalid prefix'); }
    let _query_id = sc_0.loadUintBig(64);
    let _amount = sc_0.loadCoins();
    let _sender = sc_0.loadAddress();
    let _forward_payload = sc_0.asCell();
    return { $$type: 'JettonTransferNotification' as const, query_id: _query_id, amount: _amount, sender: _sender, forward_payload: _forward_payload };
}

function loadTupleJettonTransferNotification(source: TupleReader) {
    let _query_id = source.readBigNumber();
    let _amount = source.readBigNumber();
    let _sender = source.readAddress();
    let _forward_payload = source.readCell();
    return { $$type: 'JettonTransferNotification' as const, query_id: _query_id, amount: _amount, sender: _sender, forward_payload: _forward_payload };
}

function storeTupleJettonTransferNotification(source: JettonTransferNotification) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.query_id);
    builder.writeNumber(source.amount);
    builder.writeAddress(source.sender);
    builder.writeSlice(source.forward_payload);
    return builder.build();
}

function dictValueParserJettonTransferNotification(): DictionaryValue<JettonTransferNotification> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeJettonTransferNotification(src)).endCell());
        },
        parse: (src) => {
            return loadJettonTransferNotification(src.loadRef().beginParse());
        }
    }
}

export type JettonBurn = {
    $$type: 'JettonBurn';
    query_id: bigint;
    amount: bigint;
    response_destination: Address;
    custom_payload: Cell | null;
    forward_ton_amount: bigint;
    forward_payload: Cell;
}

export function storeJettonBurn(src: JettonBurn) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1499400124, 32);
        b_0.storeUint(src.query_id, 64);
        b_0.storeCoins(src.amount);
        b_0.storeAddress(src.response_destination);
        if (src.custom_payload !== null && src.custom_payload !== undefined) { b_0.storeBit(true).storeRef(src.custom_payload); } else { b_0.storeBit(false); }
        b_0.storeCoins(src.forward_ton_amount);
        b_0.storeBuilder(src.forward_payload.asBuilder());
    };
}

export function loadJettonBurn(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1499400124) { throw Error('Invalid prefix'); }
    let _query_id = sc_0.loadUintBig(64);
    let _amount = sc_0.loadCoins();
    let _response_destination = sc_0.loadAddress();
    let _custom_payload = sc_0.loadBit() ? sc_0.loadRef() : null;
    let _forward_ton_amount = sc_0.loadCoins();
    let _forward_payload = sc_0.asCell();
    return { $$type: 'JettonBurn' as const, query_id: _query_id, amount: _amount, response_destination: _response_destination, custom_payload: _custom_payload, forward_ton_amount: _forward_ton_amount, forward_payload: _forward_payload };
}

function loadTupleJettonBurn(source: TupleReader) {
    let _query_id = source.readBigNumber();
    let _amount = source.readBigNumber();
    let _response_destination = source.readAddress();
    let _custom_payload = source.readCellOpt();
    let _forward_ton_amount = source.readBigNumber();
    let _forward_payload = source.readCell();
    return { $$type: 'JettonBurn' as const, query_id: _query_id, amount: _amount, response_destination: _response_destination, custom_payload: _custom_payload, forward_ton_amount: _forward_ton_amount, forward_payload: _forward_payload };
}

function storeTupleJettonBurn(source: JettonBurn) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.query_id);
    builder.writeNumber(source.amount);
    builder.writeAddress(source.response_destination);
    builder.writeCell(source.custom_payload);
    builder.writeNumber(source.forward_ton_amount);
    builder.writeSlice(source.forward_payload);
    return builder.build();
}

function dictValueParserJettonBurn(): DictionaryValue<JettonBurn> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeJettonBurn(src)).endCell());
        },
        parse: (src) => {
            return loadJettonBurn(src.loadRef().beginParse());
        }
    }
}

export type JettonExcesses = {
    $$type: 'JettonExcesses';
    query_id: bigint;
}

export function storeJettonExcesses(src: JettonExcesses) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(3576854235, 32);
        b_0.storeUint(src.query_id, 64);
    };
}

export function loadJettonExcesses(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 3576854235) { throw Error('Invalid prefix'); }
    let _query_id = sc_0.loadUintBig(64);
    return { $$type: 'JettonExcesses' as const, query_id: _query_id };
}

function loadTupleJettonExcesses(source: TupleReader) {
    let _query_id = source.readBigNumber();
    return { $$type: 'JettonExcesses' as const, query_id: _query_id };
}

function storeTupleJettonExcesses(source: JettonExcesses) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.query_id);
    return builder.build();
}

function dictValueParserJettonExcesses(): DictionaryValue<JettonExcesses> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeJettonExcesses(src)).endCell());
        },
        parse: (src) => {
            return loadJettonExcesses(src.loadRef().beginParse());
        }
    }
}

export type JettonInternalTransfer = {
    $$type: 'JettonInternalTransfer';
    query_id: bigint;
    amount: bigint;
    from: Address;
    response_address: Address;
    forward_ton_amount: bigint;
    forward_payload: Cell;
}

export function storeJettonInternalTransfer(src: JettonInternalTransfer) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(395134233, 32);
        b_0.storeUint(src.query_id, 64);
        b_0.storeCoins(src.amount);
        b_0.storeAddress(src.from);
        b_0.storeAddress(src.response_address);
        b_0.storeCoins(src.forward_ton_amount);
        b_0.storeBuilder(src.forward_payload.asBuilder());
    };
}

export function loadJettonInternalTransfer(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 395134233) { throw Error('Invalid prefix'); }
    let _query_id = sc_0.loadUintBig(64);
    let _amount = sc_0.loadCoins();
    let _from = sc_0.loadAddress();
    let _response_address = sc_0.loadAddress();
    let _forward_ton_amount = sc_0.loadCoins();
    let _forward_payload = sc_0.asCell();
    return { $$type: 'JettonInternalTransfer' as const, query_id: _query_id, amount: _amount, from: _from, response_address: _response_address, forward_ton_amount: _forward_ton_amount, forward_payload: _forward_payload };
}

function loadTupleJettonInternalTransfer(source: TupleReader) {
    let _query_id = source.readBigNumber();
    let _amount = source.readBigNumber();
    let _from = source.readAddress();
    let _response_address = source.readAddress();
    let _forward_ton_amount = source.readBigNumber();
    let _forward_payload = source.readCell();
    return { $$type: 'JettonInternalTransfer' as const, query_id: _query_id, amount: _amount, from: _from, response_address: _response_address, forward_ton_amount: _forward_ton_amount, forward_payload: _forward_payload };
}

function storeTupleJettonInternalTransfer(source: JettonInternalTransfer) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.query_id);
    builder.writeNumber(source.amount);
    builder.writeAddress(source.from);
    builder.writeAddress(source.response_address);
    builder.writeNumber(source.forward_ton_amount);
    builder.writeSlice(source.forward_payload);
    return builder.build();
}

function dictValueParserJettonInternalTransfer(): DictionaryValue<JettonInternalTransfer> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeJettonInternalTransfer(src)).endCell());
        },
        parse: (src) => {
            return loadJettonInternalTransfer(src.loadRef().beginParse());
        }
    }
}

export type JettonBurnNotification = {
    $$type: 'JettonBurnNotification';
    query_id: bigint;
    amount: bigint;
    sender: Address;
    response_destination: Address;
    forward_ton_amount: bigint;
    forward_payload: Cell;
}

export function storeJettonBurnNotification(src: JettonBurnNotification) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2078119902, 32);
        b_0.storeUint(src.query_id, 64);
        b_0.storeCoins(src.amount);
        b_0.storeAddress(src.sender);
        b_0.storeAddress(src.response_destination);
        b_0.storeCoins(src.forward_ton_amount);
        b_0.storeBuilder(src.forward_payload.asBuilder());
    };
}

export function loadJettonBurnNotification(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2078119902) { throw Error('Invalid prefix'); }
    let _query_id = sc_0.loadUintBig(64);
    let _amount = sc_0.loadCoins();
    let _sender = sc_0.loadAddress();
    let _response_destination = sc_0.loadAddress();
    let _forward_ton_amount = sc_0.loadCoins();
    let _forward_payload = sc_0.asCell();
    return { $$type: 'JettonBurnNotification' as const, query_id: _query_id, amount: _amount, sender: _sender, response_destination: _response_destination, forward_ton_amount: _forward_ton_amount, forward_payload: _forward_payload };
}

function loadTupleJettonBurnNotification(source: TupleReader) {
    let _query_id = source.readBigNumber();
    let _amount = source.readBigNumber();
    let _sender = source.readAddress();
    let _response_destination = source.readAddress();
    let _forward_ton_amount = source.readBigNumber();
    let _forward_payload = source.readCell();
    return { $$type: 'JettonBurnNotification' as const, query_id: _query_id, amount: _amount, sender: _sender, response_destination: _response_destination, forward_ton_amount: _forward_ton_amount, forward_payload: _forward_payload };
}

function storeTupleJettonBurnNotification(source: JettonBurnNotification) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.query_id);
    builder.writeNumber(source.amount);
    builder.writeAddress(source.sender);
    builder.writeAddress(source.response_destination);
    builder.writeNumber(source.forward_ton_amount);
    builder.writeSlice(source.forward_payload);
    return builder.build();
}

function dictValueParserJettonBurnNotification(): DictionaryValue<JettonBurnNotification> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeJettonBurnNotification(src)).endCell());
        },
        parse: (src) => {
            return loadJettonBurnNotification(src.loadRef().beginParse());
        }
    }
}

export type WalletData = {
    $$type: 'WalletData';
    balance: bigint;
    owner: Address;
    jetton: Address;
    jetton_wallet_code: Cell;
}

export function storeWalletData(src: WalletData) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeCoins(src.balance);
        b_0.storeAddress(src.owner);
        b_0.storeAddress(src.jetton);
        b_0.storeRef(src.jetton_wallet_code);
    };
}

export function loadWalletData(slice: Slice) {
    let sc_0 = slice;
    let _balance = sc_0.loadCoins();
    let _owner = sc_0.loadAddress();
    let _jetton = sc_0.loadAddress();
    let _jetton_wallet_code = sc_0.loadRef();
    return { $$type: 'WalletData' as const, balance: _balance, owner: _owner, jetton: _jetton, jetton_wallet_code: _jetton_wallet_code };
}

function loadTupleWalletData(source: TupleReader) {
    let _balance = source.readBigNumber();
    let _owner = source.readAddress();
    let _jetton = source.readAddress();
    let _jetton_wallet_code = source.readCell();
    return { $$type: 'WalletData' as const, balance: _balance, owner: _owner, jetton: _jetton, jetton_wallet_code: _jetton_wallet_code };
}

function storeTupleWalletData(source: WalletData) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.balance);
    builder.writeAddress(source.owner);
    builder.writeAddress(source.jetton);
    builder.writeCell(source.jetton_wallet_code);
    return builder.build();
}

function dictValueParserWalletData(): DictionaryValue<WalletData> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeWalletData(src)).endCell());
        },
        parse: (src) => {
            return loadWalletData(src.loadRef().beginParse());
        }
    }
}

export type JettonData = {
    $$type: 'JettonData';
    total_supply: bigint;
    mintable: boolean;
    admin_address: Address;
    jetton_content: Cell;
    jetton_wallet_code: Cell;
}

export function storeJettonData(src: JettonData) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeCoins(src.total_supply);
        b_0.storeBit(src.mintable);
        b_0.storeAddress(src.admin_address);
        b_0.storeRef(src.jetton_content);
        b_0.storeRef(src.jetton_wallet_code);
    };
}

export function loadJettonData(slice: Slice) {
    let sc_0 = slice;
    let _total_supply = sc_0.loadCoins();
    let _mintable = sc_0.loadBit();
    let _admin_address = sc_0.loadAddress();
    let _jetton_content = sc_0.loadRef();
    let _jetton_wallet_code = sc_0.loadRef();
    return { $$type: 'JettonData' as const, total_supply: _total_supply, mintable: _mintable, admin_address: _admin_address, jetton_content: _jetton_content, jetton_wallet_code: _jetton_wallet_code };
}

function loadTupleJettonData(source: TupleReader) {
    let _total_supply = source.readBigNumber();
    let _mintable = source.readBoolean();
    let _admin_address = source.readAddress();
    let _jetton_content = source.readCell();
    let _jetton_wallet_code = source.readCell();
    return { $$type: 'JettonData' as const, total_supply: _total_supply, mintable: _mintable, admin_address: _admin_address, jetton_content: _jetton_content, jetton_wallet_code: _jetton_wallet_code };
}

function storeTupleJettonData(source: JettonData) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.total_supply);
    builder.writeBoolean(source.mintable);
    builder.writeAddress(source.admin_address);
    builder.writeCell(source.jetton_content);
    builder.writeCell(source.jetton_wallet_code);
    return builder.build();
}

function dictValueParserJettonData(): DictionaryValue<JettonData> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeJettonData(src)).endCell());
        },
        parse: (src) => {
            return loadJettonData(src.loadRef().beginParse());
        }
    }
}

export type JettonMint = {
    $$type: 'JettonMint';
    origin: Address;
    receiver: Address;
    amount: bigint;
    custom_payload: Cell | null;
    forward_ton_amount: bigint;
    forward_payload: Cell;
}

export function storeJettonMint(src: JettonMint) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2310479113, 32);
        b_0.storeAddress(src.origin);
        b_0.storeAddress(src.receiver);
        b_0.storeInt(src.amount, 257);
        if (src.custom_payload !== null && src.custom_payload !== undefined) { b_0.storeBit(true).storeRef(src.custom_payload); } else { b_0.storeBit(false); }
        b_0.storeCoins(src.forward_ton_amount);
        b_0.storeBuilder(src.forward_payload.asBuilder());
    };
}

export function loadJettonMint(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2310479113) { throw Error('Invalid prefix'); }
    let _origin = sc_0.loadAddress();
    let _receiver = sc_0.loadAddress();
    let _amount = sc_0.loadIntBig(257);
    let _custom_payload = sc_0.loadBit() ? sc_0.loadRef() : null;
    let _forward_ton_amount = sc_0.loadCoins();
    let _forward_payload = sc_0.asCell();
    return { $$type: 'JettonMint' as const, origin: _origin, receiver: _receiver, amount: _amount, custom_payload: _custom_payload, forward_ton_amount: _forward_ton_amount, forward_payload: _forward_payload };
}

function loadTupleJettonMint(source: TupleReader) {
    let _origin = source.readAddress();
    let _receiver = source.readAddress();
    let _amount = source.readBigNumber();
    let _custom_payload = source.readCellOpt();
    let _forward_ton_amount = source.readBigNumber();
    let _forward_payload = source.readCell();
    return { $$type: 'JettonMint' as const, origin: _origin, receiver: _receiver, amount: _amount, custom_payload: _custom_payload, forward_ton_amount: _forward_ton_amount, forward_payload: _forward_payload };
}

function storeTupleJettonMint(source: JettonMint) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.origin);
    builder.writeAddress(source.receiver);
    builder.writeNumber(source.amount);
    builder.writeCell(source.custom_payload);
    builder.writeNumber(source.forward_ton_amount);
    builder.writeSlice(source.forward_payload);
    return builder.build();
}

function dictValueParserJettonMint(): DictionaryValue<JettonMint> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeJettonMint(src)).endCell());
        },
        parse: (src) => {
            return loadJettonMint(src.loadRef().beginParse());
        }
    }
}

export type UpdateAdmin = {
    $$type: 'UpdateAdmin';
    new_admin: Address;
}

export function storeUpdateAdmin(src: UpdateAdmin) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(367316568, 32);
        b_0.storeAddress(src.new_admin);
    };
}

export function loadUpdateAdmin(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 367316568) { throw Error('Invalid prefix'); }
    let _new_admin = sc_0.loadAddress();
    return { $$type: 'UpdateAdmin' as const, new_admin: _new_admin };
}

function loadTupleUpdateAdmin(source: TupleReader) {
    let _new_admin = source.readAddress();
    return { $$type: 'UpdateAdmin' as const, new_admin: _new_admin };
}

function storeTupleUpdateAdmin(source: UpdateAdmin) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.new_admin);
    return builder.build();
}

function dictValueParserUpdateAdmin(): DictionaryValue<UpdateAdmin> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeUpdateAdmin(src)).endCell());
        },
        parse: (src) => {
            return loadUpdateAdmin(src.loadRef().beginParse());
        }
    }
}

export type UpdateOwner = {
    $$type: 'UpdateOwner';
    new_owner: Address;
}

export function storeUpdateOwner(src: UpdateOwner) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(559076492, 32);
        b_0.storeAddress(src.new_owner);
    };
}

export function loadUpdateOwner(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 559076492) { throw Error('Invalid prefix'); }
    let _new_owner = sc_0.loadAddress();
    return { $$type: 'UpdateOwner' as const, new_owner: _new_owner };
}

function loadTupleUpdateOwner(source: TupleReader) {
    let _new_owner = source.readAddress();
    return { $$type: 'UpdateOwner' as const, new_owner: _new_owner };
}

function storeTupleUpdateOwner(source: UpdateOwner) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.new_owner);
    return builder.build();
}

function dictValueParserUpdateOwner(): DictionaryValue<UpdateOwner> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeUpdateOwner(src)).endCell());
        },
        parse: (src) => {
            return loadUpdateOwner(src.loadRef().beginParse());
        }
    }
}

export type GrantRole = {
    $$type: 'GrantRole';
    to: Address;
    role_id: bigint;
}

export function storeGrantRole(src: GrantRole) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(174185305, 32);
        b_0.storeAddress(src.to);
        b_0.storeInt(src.role_id, 257);
    };
}

export function loadGrantRole(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 174185305) { throw Error('Invalid prefix'); }
    let _to = sc_0.loadAddress();
    let _role_id = sc_0.loadIntBig(257);
    return { $$type: 'GrantRole' as const, to: _to, role_id: _role_id };
}

function loadTupleGrantRole(source: TupleReader) {
    let _to = source.readAddress();
    let _role_id = source.readBigNumber();
    return { $$type: 'GrantRole' as const, to: _to, role_id: _role_id };
}

function storeTupleGrantRole(source: GrantRole) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.to);
    builder.writeNumber(source.role_id);
    return builder.build();
}

function dictValueParserGrantRole(): DictionaryValue<GrantRole> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeGrantRole(src)).endCell());
        },
        parse: (src) => {
            return loadGrantRole(src.loadRef().beginParse());
        }
    }
}

export type RevokeRole = {
    $$type: 'RevokeRole';
    to: Address;
    role_id: bigint;
}

export function storeRevokeRole(src: RevokeRole) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1363080030, 32);
        b_0.storeAddress(src.to);
        b_0.storeInt(src.role_id, 257);
    };
}

export function loadRevokeRole(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1363080030) { throw Error('Invalid prefix'); }
    let _to = sc_0.loadAddress();
    let _role_id = sc_0.loadIntBig(257);
    return { $$type: 'RevokeRole' as const, to: _to, role_id: _role_id };
}

function loadTupleRevokeRole(source: TupleReader) {
    let _to = source.readAddress();
    let _role_id = source.readBigNumber();
    return { $$type: 'RevokeRole' as const, to: _to, role_id: _role_id };
}

function storeTupleRevokeRole(source: RevokeRole) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.to);
    builder.writeNumber(source.role_id);
    return builder.build();
}

function dictValueParserRevokeRole(): DictionaryValue<RevokeRole> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeRevokeRole(src)).endCell());
        },
        parse: (src) => {
            return loadRevokeRole(src.loadRef().beginParse());
        }
    }
}

export type RenounceRole = {
    $$type: 'RenounceRole';
    role_id: bigint;
    address: Address;
}

export function storeRenounceRole(src: RenounceRole) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(389201441, 32);
        b_0.storeInt(src.role_id, 257);
        b_0.storeAddress(src.address);
    };
}

export function loadRenounceRole(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 389201441) { throw Error('Invalid prefix'); }
    let _role_id = sc_0.loadIntBig(257);
    let _address = sc_0.loadAddress();
    return { $$type: 'RenounceRole' as const, role_id: _role_id, address: _address };
}

function loadTupleRenounceRole(source: TupleReader) {
    let _role_id = source.readBigNumber();
    let _address = source.readAddress();
    return { $$type: 'RenounceRole' as const, role_id: _role_id, address: _address };
}

function storeTupleRenounceRole(source: RenounceRole) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.role_id);
    builder.writeAddress(source.address);
    return builder.build();
}

function dictValueParserRenounceRole(): DictionaryValue<RenounceRole> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeRenounceRole(src)).endCell());
        },
        parse: (src) => {
            return loadRenounceRole(src.loadRef().beginParse());
        }
    }
}

export type UpdateRoleAdmin = {
    $$type: 'UpdateRoleAdmin';
    role_id: bigint;
    new_admin: Address;
}

export function storeUpdateRoleAdmin(src: UpdateRoleAdmin) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(4130082033, 32);
        b_0.storeInt(src.role_id, 257);
        b_0.storeAddress(src.new_admin);
    };
}

export function loadUpdateRoleAdmin(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 4130082033) { throw Error('Invalid prefix'); }
    let _role_id = sc_0.loadIntBig(257);
    let _new_admin = sc_0.loadAddress();
    return { $$type: 'UpdateRoleAdmin' as const, role_id: _role_id, new_admin: _new_admin };
}

function loadTupleUpdateRoleAdmin(source: TupleReader) {
    let _role_id = source.readBigNumber();
    let _new_admin = source.readAddress();
    return { $$type: 'UpdateRoleAdmin' as const, role_id: _role_id, new_admin: _new_admin };
}

function storeTupleUpdateRoleAdmin(source: UpdateRoleAdmin) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.role_id);
    builder.writeAddress(source.new_admin);
    return builder.build();
}

function dictValueParserUpdateRoleAdmin(): DictionaryValue<UpdateRoleAdmin> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeUpdateRoleAdmin(src)).endCell());
        },
        parse: (src) => {
            return loadUpdateRoleAdmin(src.loadRef().beginParse());
        }
    }
}

export type RoleData = {
    $$type: 'RoleData';
    roles: Dictionary<Address, boolean>;
    admin_role: Address;
}

export function storeRoleData(src: RoleData) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeDict(src.roles, Dictionary.Keys.Address(), Dictionary.Values.Bool());
        b_0.storeAddress(src.admin_role);
    };
}

export function loadRoleData(slice: Slice) {
    let sc_0 = slice;
    let _roles = Dictionary.load(Dictionary.Keys.Address(), Dictionary.Values.Bool(), sc_0);
    let _admin_role = sc_0.loadAddress();
    return { $$type: 'RoleData' as const, roles: _roles, admin_role: _admin_role };
}

function loadTupleRoleData(source: TupleReader) {
    let _roles = Dictionary.loadDirect(Dictionary.Keys.Address(), Dictionary.Values.Bool(), source.readCellOpt());
    let _admin_role = source.readAddress();
    return { $$type: 'RoleData' as const, roles: _roles, admin_role: _admin_role };
}

function storeTupleRoleData(source: RoleData) {
    let builder = new TupleBuilder();
    builder.writeCell(source.roles.size > 0 ? beginCell().storeDictDirect(source.roles, Dictionary.Keys.Address(), Dictionary.Values.Bool()).endCell() : null);
    builder.writeAddress(source.admin_role);
    return builder.build();
}

function dictValueParserRoleData(): DictionaryValue<RoleData> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeRoleData(src)).endCell());
        },
        parse: (src) => {
            return loadRoleData(src.loadRef().beginParse());
        }
    }
}

export type TokenType = {
    $$type: 'TokenType';
    is_native_coin: boolean;
    is_native_token: boolean;
    is_wrapped_token: boolean;
}

export function storeTokenType(src: TokenType) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeBit(src.is_native_coin);
        b_0.storeBit(src.is_native_token);
        b_0.storeBit(src.is_wrapped_token);
    };
}

export function loadTokenType(slice: Slice) {
    let sc_0 = slice;
    let _is_native_coin = sc_0.loadBit();
    let _is_native_token = sc_0.loadBit();
    let _is_wrapped_token = sc_0.loadBit();
    return { $$type: 'TokenType' as const, is_native_coin: _is_native_coin, is_native_token: _is_native_token, is_wrapped_token: _is_wrapped_token };
}

function loadTupleTokenType(source: TupleReader) {
    let _is_native_coin = source.readBoolean();
    let _is_native_token = source.readBoolean();
    let _is_wrapped_token = source.readBoolean();
    return { $$type: 'TokenType' as const, is_native_coin: _is_native_coin, is_native_token: _is_native_token, is_wrapped_token: _is_wrapped_token };
}

function storeTupleTokenType(source: TokenType) {
    let builder = new TupleBuilder();
    builder.writeBoolean(source.is_native_coin);
    builder.writeBoolean(source.is_native_token);
    builder.writeBoolean(source.is_wrapped_token);
    return builder.build();
}

function dictValueParserTokenType(): DictionaryValue<TokenType> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeTokenType(src)).endCell());
        },
        parse: (src) => {
            return loadTokenType(src.loadRef().beginParse());
        }
    }
}

export type SentInstallment = {
    $$type: 'SentInstallment';
    tx_hash: bigint;
}

export function storeSentInstallment(src: SentInstallment) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1717832165, 32);
        b_0.storeInt(src.tx_hash, 257);
    };
}

export function loadSentInstallment(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1717832165) { throw Error('Invalid prefix'); }
    let _tx_hash = sc_0.loadIntBig(257);
    return { $$type: 'SentInstallment' as const, tx_hash: _tx_hash };
}

function loadTupleSentInstallment(source: TupleReader) {
    let _tx_hash = source.readBigNumber();
    return { $$type: 'SentInstallment' as const, tx_hash: _tx_hash };
}

function storeTupleSentInstallment(source: SentInstallment) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.tx_hash);
    return builder.build();
}

function dictValueParserSentInstallment(): DictionaryValue<SentInstallment> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeSentInstallment(src)).endCell());
        },
        parse: (src) => {
            return loadSentInstallment(src.loadRef().beginParse());
        }
    }
}

export type ReceivedInstallment = {
    $$type: 'ReceivedInstallment';
    tx_hash: bigint;
}

export function storeReceivedInstallment(src: ReceivedInstallment) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(3112556170, 32);
        b_0.storeInt(src.tx_hash, 257);
    };
}

export function loadReceivedInstallment(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 3112556170) { throw Error('Invalid prefix'); }
    let _tx_hash = sc_0.loadIntBig(257);
    return { $$type: 'ReceivedInstallment' as const, tx_hash: _tx_hash };
}

function loadTupleReceivedInstallment(source: TupleReader) {
    let _tx_hash = source.readBigNumber();
    return { $$type: 'ReceivedInstallment' as const, tx_hash: _tx_hash };
}

function storeTupleReceivedInstallment(source: ReceivedInstallment) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.tx_hash);
    return builder.build();
}

function dictValueParserReceivedInstallment(): DictionaryValue<ReceivedInstallment> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeReceivedInstallment(src)).endCell());
        },
        parse: (src) => {
            return loadReceivedInstallment(src.loadRef().beginParse());
        }
    }
}

export type Installment = {
    $$type: 'Installment';
    from_chain: bigint;
    target_chain: bigint;
    amount: bigint;
    from_token: Cell;
    to_token: Cell;
    recepient: Address;
}

export function storeInstallment(src: Installment) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(4185229730, 32);
        b_0.storeUint(src.from_chain, 64);
        b_0.storeUint(src.target_chain, 64);
        b_0.storeCoins(src.amount);
        b_0.storeRef(src.from_token);
        b_0.storeRef(src.to_token);
        b_0.storeAddress(src.recepient);
    };
}

export function loadInstallment(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 4185229730) { throw Error('Invalid prefix'); }
    let _from_chain = sc_0.loadUintBig(64);
    let _target_chain = sc_0.loadUintBig(64);
    let _amount = sc_0.loadCoins();
    let _from_token = sc_0.loadRef();
    let _to_token = sc_0.loadRef();
    let _recepient = sc_0.loadAddress();
    return { $$type: 'Installment' as const, from_chain: _from_chain, target_chain: _target_chain, amount: _amount, from_token: _from_token, to_token: _to_token, recepient: _recepient };
}

function loadTupleInstallment(source: TupleReader) {
    let _from_chain = source.readBigNumber();
    let _target_chain = source.readBigNumber();
    let _amount = source.readBigNumber();
    let _from_token = source.readCell();
    let _to_token = source.readCell();
    let _recepient = source.readAddress();
    return { $$type: 'Installment' as const, from_chain: _from_chain, target_chain: _target_chain, amount: _amount, from_token: _from_token, to_token: _to_token, recepient: _recepient };
}

function storeTupleInstallment(source: Installment) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.from_chain);
    builder.writeNumber(source.target_chain);
    builder.writeNumber(source.amount);
    builder.writeCell(source.from_token);
    builder.writeCell(source.to_token);
    builder.writeAddress(source.recepient);
    return builder.build();
}

function dictValueParserInstallment(): DictionaryValue<Installment> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeInstallment(src)).endCell());
        },
        parse: (src) => {
            return loadInstallment(src.loadRef().beginParse());
        }
    }
}

export type SignerAndSignature = {
    $$type: 'SignerAndSignature';
    signature: Cell;
    key: bigint;
}

export function storeSignerAndSignature(src: SignerAndSignature) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeRef(src.signature);
        b_0.storeUint(src.key, 256);
    };
}

export function loadSignerAndSignature(slice: Slice) {
    let sc_0 = slice;
    let _signature = sc_0.loadRef();
    let _key = sc_0.loadUintBig(256);
    return { $$type: 'SignerAndSignature' as const, signature: _signature, key: _key };
}

function loadTupleSignerAndSignature(source: TupleReader) {
    let _signature = source.readCell();
    let _key = source.readBigNumber();
    return { $$type: 'SignerAndSignature' as const, signature: _signature, key: _key };
}

function storeTupleSignerAndSignature(source: SignerAndSignature) {
    let builder = new TupleBuilder();
    builder.writeSlice(source.signature);
    builder.writeNumber(source.key);
    return builder.build();
}

function dictValueParserSignerAndSignature(): DictionaryValue<SignerAndSignature> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeSignerAndSignature(src)).endCell());
        },
        parse: (src) => {
            return loadSignerAndSignature(src.loadRef().beginParse());
        }
    }
}

export type ReceiveInstallment = {
    $$type: 'ReceiveInstallment';
    installment: Installment;
    signatures: Dictionary<bigint, SignerAndSignature>;
    len: bigint;
    tx_hash: bigint;
    id: bigint;
}

export function storeReceiveInstallment(src: ReceiveInstallment) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1032337096, 32);
        b_0.store(storeInstallment(src.installment));
        b_0.storeDict(src.signatures, Dictionary.Keys.BigInt(257), dictValueParserSignerAndSignature());
        b_0.storeInt(src.len, 257);
        let b_1 = new Builder();
        b_1.storeUint(src.tx_hash, 256);
        b_1.storeInt(src.id, 257);
        b_0.storeRef(b_1.endCell());
    };
}

export function loadReceiveInstallment(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1032337096) { throw Error('Invalid prefix'); }
    let _installment = loadInstallment(sc_0);
    let _signatures = Dictionary.load(Dictionary.Keys.BigInt(257), dictValueParserSignerAndSignature(), sc_0);
    let _len = sc_0.loadIntBig(257);
    let sc_1 = sc_0.loadRef().beginParse();
    let _tx_hash = sc_1.loadUintBig(256);
    let _id = sc_1.loadIntBig(257);
    return { $$type: 'ReceiveInstallment' as const, installment: _installment, signatures: _signatures, len: _len, tx_hash: _tx_hash, id: _id };
}

function loadTupleReceiveInstallment(source: TupleReader) {
    const _installment = loadTupleInstallment(source.readTuple());
    let _signatures = Dictionary.loadDirect(Dictionary.Keys.BigInt(257), dictValueParserSignerAndSignature(), source.readCellOpt());
    let _len = source.readBigNumber();
    let _tx_hash = source.readBigNumber();
    let _id = source.readBigNumber();
    return { $$type: 'ReceiveInstallment' as const, installment: _installment, signatures: _signatures, len: _len, tx_hash: _tx_hash, id: _id };
}

function storeTupleReceiveInstallment(source: ReceiveInstallment) {
    let builder = new TupleBuilder();
    builder.writeTuple(storeTupleInstallment(source.installment));
    builder.writeCell(source.signatures.size > 0 ? beginCell().storeDictDirect(source.signatures, Dictionary.Keys.BigInt(257), dictValueParserSignerAndSignature()).endCell() : null);
    builder.writeNumber(source.len);
    builder.writeNumber(source.tx_hash);
    builder.writeNumber(source.id);
    return builder.build();
}

function dictValueParserReceiveInstallment(): DictionaryValue<ReceiveInstallment> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeReceiveInstallment(src)).endCell());
        },
        parse: (src) => {
            return loadReceiveInstallment(src.loadRef().beginParse());
        }
    }
}

export type FreezeTon = {
    $$type: 'FreezeTon';
    target_chain: bigint;
    to_token: Cell;
    to: Cell;
    from_token: Cell;
    amount: bigint;
}

export function storeFreezeTon(src: FreezeTon) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(3943853515, 32);
        b_0.storeUint(src.target_chain, 64);
        b_0.storeRef(src.to_token);
        b_0.storeRef(src.to);
        b_0.storeRef(src.from_token);
        b_0.storeCoins(src.amount);
    };
}

export function loadFreezeTon(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 3943853515) { throw Error('Invalid prefix'); }
    let _target_chain = sc_0.loadUintBig(64);
    let _to_token = sc_0.loadRef();
    let _to = sc_0.loadRef();
    let _from_token = sc_0.loadRef();
    let _amount = sc_0.loadCoins();
    return { $$type: 'FreezeTon' as const, target_chain: _target_chain, to_token: _to_token, to: _to, from_token: _from_token, amount: _amount };
}

function loadTupleFreezeTon(source: TupleReader) {
    let _target_chain = source.readBigNumber();
    let _to_token = source.readCell();
    let _to = source.readCell();
    let _from_token = source.readCell();
    let _amount = source.readBigNumber();
    return { $$type: 'FreezeTon' as const, target_chain: _target_chain, to_token: _to_token, to: _to, from_token: _from_token, amount: _amount };
}

function storeTupleFreezeTon(source: FreezeTon) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.target_chain);
    builder.writeCell(source.to_token);
    builder.writeCell(source.to);
    builder.writeCell(source.from_token);
    builder.writeNumber(source.amount);
    return builder.build();
}

function dictValueParserFreezeTon(): DictionaryValue<FreezeTon> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeFreezeTon(src)).endCell());
        },
        parse: (src) => {
            return loadFreezeTon(src.loadRef().beginParse());
        }
    }
}

export type MapContract = {
    $$type: 'MapContract';
    token_id: bigint;
    token_symbol: string;
    contract: Address;
    decimals: bigint;
    fee: bigint;
    fee_decimals: bigint;
    swap_address: Address;
    token_bridge_wallet_address: Address;
}

export function storeMapContract(src: MapContract) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1261946401, 32);
        b_0.storeInt(src.token_id, 257);
        b_0.storeStringRefTail(src.token_symbol);
        b_0.storeAddress(src.contract);
        b_0.storeUint(src.decimals, 8);
        b_0.storeInt(src.fee, 257);
        let b_1 = new Builder();
        b_1.storeInt(src.fee_decimals, 257);
        b_1.storeAddress(src.swap_address);
        b_1.storeAddress(src.token_bridge_wallet_address);
        b_0.storeRef(b_1.endCell());
    };
}

export function loadMapContract(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1261946401) { throw Error('Invalid prefix'); }
    let _token_id = sc_0.loadIntBig(257);
    let _token_symbol = sc_0.loadStringRefTail();
    let _contract = sc_0.loadAddress();
    let _decimals = sc_0.loadUintBig(8);
    let _fee = sc_0.loadIntBig(257);
    let sc_1 = sc_0.loadRef().beginParse();
    let _fee_decimals = sc_1.loadIntBig(257);
    let _swap_address = sc_1.loadAddress();
    let _token_bridge_wallet_address = sc_1.loadAddress();
    return { $$type: 'MapContract' as const, token_id: _token_id, token_symbol: _token_symbol, contract: _contract, decimals: _decimals, fee: _fee, fee_decimals: _fee_decimals, swap_address: _swap_address, token_bridge_wallet_address: _token_bridge_wallet_address };
}

function loadTupleMapContract(source: TupleReader) {
    let _token_id = source.readBigNumber();
    let _token_symbol = source.readString();
    let _contract = source.readAddress();
    let _decimals = source.readBigNumber();
    let _fee = source.readBigNumber();
    let _fee_decimals = source.readBigNumber();
    let _swap_address = source.readAddress();
    let _token_bridge_wallet_address = source.readAddress();
    return { $$type: 'MapContract' as const, token_id: _token_id, token_symbol: _token_symbol, contract: _contract, decimals: _decimals, fee: _fee, fee_decimals: _fee_decimals, swap_address: _swap_address, token_bridge_wallet_address: _token_bridge_wallet_address };
}

function storeTupleMapContract(source: MapContract) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.token_id);
    builder.writeString(source.token_symbol);
    builder.writeAddress(source.contract);
    builder.writeNumber(source.decimals);
    builder.writeNumber(source.fee);
    builder.writeNumber(source.fee_decimals);
    builder.writeAddress(source.swap_address);
    builder.writeAddress(source.token_bridge_wallet_address);
    return builder.build();
}

function dictValueParserMapContract(): DictionaryValue<MapContract> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeMapContract(src)).endCell());
        },
        parse: (src) => {
            return loadMapContract(src.loadRef().beginParse());
        }
    }
}

export type SetChainFee = {
    $$type: 'SetChainFee';
    chain_id: bigint;
    fee: bigint;
}

export function storeSetChainFee(src: SetChainFee) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1240718718, 32);
        b_0.storeUint(src.chain_id, 64);
        b_0.storeUint(src.fee, 256);
    };
}

export function loadSetChainFee(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1240718718) { throw Error('Invalid prefix'); }
    let _chain_id = sc_0.loadUintBig(64);
    let _fee = sc_0.loadUintBig(256);
    return { $$type: 'SetChainFee' as const, chain_id: _chain_id, fee: _fee };
}

function loadTupleSetChainFee(source: TupleReader) {
    let _chain_id = source.readBigNumber();
    let _fee = source.readBigNumber();
    return { $$type: 'SetChainFee' as const, chain_id: _chain_id, fee: _fee };
}

function storeTupleSetChainFee(source: SetChainFee) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.chain_id);
    builder.writeNumber(source.fee);
    return builder.build();
}

function dictValueParserSetChainFee(): DictionaryValue<SetChainFee> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeSetChainFee(src)).endCell());
        },
        parse: (src) => {
            return loadSetChainFee(src.loadRef().beginParse());
        }
    }
}

export type OutgoingTransaction = {
    $$type: 'OutgoingTransaction';
    id: bigint;
    amount: bigint;
    from_token: Cell;
    to_token: Cell;
    to: Cell;
    target_chain_id: bigint;
}

export function storeOutgoingTransaction(src: OutgoingTransaction) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(src.id, 256);
        b_0.storeCoins(src.amount);
        b_0.storeRef(src.from_token);
        b_0.storeRef(src.to_token);
        b_0.storeRef(src.to);
        b_0.storeUint(src.target_chain_id, 64);
    };
}

export function loadOutgoingTransaction(slice: Slice) {
    let sc_0 = slice;
    let _id = sc_0.loadUintBig(256);
    let _amount = sc_0.loadCoins();
    let _from_token = sc_0.loadRef();
    let _to_token = sc_0.loadRef();
    let _to = sc_0.loadRef();
    let _target_chain_id = sc_0.loadUintBig(64);
    return { $$type: 'OutgoingTransaction' as const, id: _id, amount: _amount, from_token: _from_token, to_token: _to_token, to: _to, target_chain_id: _target_chain_id };
}

function loadTupleOutgoingTransaction(source: TupleReader) {
    let _id = source.readBigNumber();
    let _amount = source.readBigNumber();
    let _from_token = source.readCell();
    let _to_token = source.readCell();
    let _to = source.readCell();
    let _target_chain_id = source.readBigNumber();
    return { $$type: 'OutgoingTransaction' as const, id: _id, amount: _amount, from_token: _from_token, to_token: _to_token, to: _to, target_chain_id: _target_chain_id };
}

function storeTupleOutgoingTransaction(source: OutgoingTransaction) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.id);
    builder.writeNumber(source.amount);
    builder.writeCell(source.from_token);
    builder.writeCell(source.to_token);
    builder.writeCell(source.to);
    builder.writeNumber(source.target_chain_id);
    return builder.build();
}

function dictValueParserOutgoingTransaction(): DictionaryValue<OutgoingTransaction> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeOutgoingTransaction(src)).endCell());
        },
        parse: (src) => {
            return loadOutgoingTransaction(src.loadRef().beginParse());
        }
    }
}

export type IncomingTransaction = {
    $$type: 'IncomingTransaction';
    id: bigint;
    amount: bigint;
    from_token: Cell;
    to_token: Cell;
    target_chain_id: bigint;
    to: Address;
}

export function storeIncomingTransaction(src: IncomingTransaction) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(src.id, 256);
        b_0.storeCoins(src.amount);
        b_0.storeRef(src.from_token);
        b_0.storeRef(src.to_token);
        b_0.storeUint(src.target_chain_id, 64);
        b_0.storeAddress(src.to);
    };
}

export function loadIncomingTransaction(slice: Slice) {
    let sc_0 = slice;
    let _id = sc_0.loadUintBig(256);
    let _amount = sc_0.loadCoins();
    let _from_token = sc_0.loadRef();
    let _to_token = sc_0.loadRef();
    let _target_chain_id = sc_0.loadUintBig(64);
    let _to = sc_0.loadAddress();
    return { $$type: 'IncomingTransaction' as const, id: _id, amount: _amount, from_token: _from_token, to_token: _to_token, target_chain_id: _target_chain_id, to: _to };
}

function loadTupleIncomingTransaction(source: TupleReader) {
    let _id = source.readBigNumber();
    let _amount = source.readBigNumber();
    let _from_token = source.readCell();
    let _to_token = source.readCell();
    let _target_chain_id = source.readBigNumber();
    let _to = source.readAddress();
    return { $$type: 'IncomingTransaction' as const, id: _id, amount: _amount, from_token: _from_token, to_token: _to_token, target_chain_id: _target_chain_id, to: _to };
}

function storeTupleIncomingTransaction(source: IncomingTransaction) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.id);
    builder.writeNumber(source.amount);
    builder.writeCell(source.from_token);
    builder.writeCell(source.to_token);
    builder.writeNumber(source.target_chain_id);
    builder.writeAddress(source.to);
    return builder.build();
}

function dictValueParserIncomingTransaction(): DictionaryValue<IncomingTransaction> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeIncomingTransaction(src)).endCell());
        },
        parse: (src) => {
            return loadIncomingTransaction(src.loadRef().beginParse());
        }
    }
}

export type InstallmentOut = {
    $$type: 'InstallmentOut';
    amount: bigint;
    to: string;
    target_chain: bigint;
    token_id: bigint;
}

export function storeInstallmentOut(src: InstallmentOut) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(src.amount, 256);
        b_0.storeStringRefTail(src.to);
        b_0.storeUint(src.target_chain, 64);
        b_0.storeInt(src.token_id, 257);
    };
}

export function loadInstallmentOut(slice: Slice) {
    let sc_0 = slice;
    let _amount = sc_0.loadUintBig(256);
    let _to = sc_0.loadStringRefTail();
    let _target_chain = sc_0.loadUintBig(64);
    let _token_id = sc_0.loadIntBig(257);
    return { $$type: 'InstallmentOut' as const, amount: _amount, to: _to, target_chain: _target_chain, token_id: _token_id };
}

function loadTupleInstallmentOut(source: TupleReader) {
    let _amount = source.readBigNumber();
    let _to = source.readString();
    let _target_chain = source.readBigNumber();
    let _token_id = source.readBigNumber();
    return { $$type: 'InstallmentOut' as const, amount: _amount, to: _to, target_chain: _target_chain, token_id: _token_id };
}

function storeTupleInstallmentOut(source: InstallmentOut) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.amount);
    builder.writeString(source.to);
    builder.writeNumber(source.target_chain);
    builder.writeNumber(source.token_id);
    return builder.build();
}

function dictValueParserInstallmentOut(): DictionaryValue<InstallmentOut> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeInstallmentOut(src)).endCell());
        },
        parse: (src) => {
            return loadInstallmentOut(src.loadRef().beginParse());
        }
    }
}

export type Token = {
    $$type: 'Token';
    symbol: string;
    address: Address;
    swap_address: Address;
    decimals: bigint;
    fee: bigint;
    fee_decimals: bigint;
    token_bridge_wallet_address: Address;
}

export function storeToken(src: Token) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeStringRefTail(src.symbol);
        b_0.storeAddress(src.address);
        b_0.storeAddress(src.swap_address);
        b_0.storeUint(src.decimals, 8);
        b_0.storeInt(src.fee, 257);
        let b_1 = new Builder();
        b_1.storeInt(src.fee_decimals, 257);
        b_1.storeAddress(src.token_bridge_wallet_address);
        b_0.storeRef(b_1.endCell());
    };
}

export function loadToken(slice: Slice) {
    let sc_0 = slice;
    let _symbol = sc_0.loadStringRefTail();
    let _address = sc_0.loadAddress();
    let _swap_address = sc_0.loadAddress();
    let _decimals = sc_0.loadUintBig(8);
    let _fee = sc_0.loadIntBig(257);
    let sc_1 = sc_0.loadRef().beginParse();
    let _fee_decimals = sc_1.loadIntBig(257);
    let _token_bridge_wallet_address = sc_1.loadAddress();
    return { $$type: 'Token' as const, symbol: _symbol, address: _address, swap_address: _swap_address, decimals: _decimals, fee: _fee, fee_decimals: _fee_decimals, token_bridge_wallet_address: _token_bridge_wallet_address };
}

function loadTupleToken(source: TupleReader) {
    let _symbol = source.readString();
    let _address = source.readAddress();
    let _swap_address = source.readAddress();
    let _decimals = source.readBigNumber();
    let _fee = source.readBigNumber();
    let _fee_decimals = source.readBigNumber();
    let _token_bridge_wallet_address = source.readAddress();
    return { $$type: 'Token' as const, symbol: _symbol, address: _address, swap_address: _swap_address, decimals: _decimals, fee: _fee, fee_decimals: _fee_decimals, token_bridge_wallet_address: _token_bridge_wallet_address };
}

function storeTupleToken(source: Token) {
    let builder = new TupleBuilder();
    builder.writeString(source.symbol);
    builder.writeAddress(source.address);
    builder.writeAddress(source.swap_address);
    builder.writeNumber(source.decimals);
    builder.writeNumber(source.fee);
    builder.writeNumber(source.fee_decimals);
    builder.writeAddress(source.token_bridge_wallet_address);
    return builder.build();
}

function dictValueParserToken(): DictionaryValue<Token> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeToken(src)).endCell());
        },
        parse: (src) => {
            return loadToken(src.loadRef().beginParse());
        }
    }
}

export type UpdateBaseUri = {
    $$type: 'UpdateBaseUri';
    new_base_uri: string;
}

export function storeUpdateBaseUri(src: UpdateBaseUri) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(3032156853, 32);
        b_0.storeStringRefTail(src.new_base_uri);
    };
}

export function loadUpdateBaseUri(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 3032156853) { throw Error('Invalid prefix'); }
    let _new_base_uri = sc_0.loadStringRefTail();
    return { $$type: 'UpdateBaseUri' as const, new_base_uri: _new_base_uri };
}

function loadTupleUpdateBaseUri(source: TupleReader) {
    let _new_base_uri = source.readString();
    return { $$type: 'UpdateBaseUri' as const, new_base_uri: _new_base_uri };
}

function storeTupleUpdateBaseUri(source: UpdateBaseUri) {
    let builder = new TupleBuilder();
    builder.writeString(source.new_base_uri);
    return builder.build();
}

function dictValueParserUpdateBaseUri(): DictionaryValue<UpdateBaseUri> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeUpdateBaseUri(src)).endCell());
        },
        parse: (src) => {
            return loadUpdateBaseUri(src.loadRef().beginParse());
        }
    }
}

export type UpdateTransferFee = {
    $$type: 'UpdateTransferFee';
    new_fee: bigint;
}

export function storeUpdateTransferFee(src: UpdateTransferFee) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1793030273, 32);
        b_0.storeInt(src.new_fee, 257);
    };
}

export function loadUpdateTransferFee(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1793030273) { throw Error('Invalid prefix'); }
    let _new_fee = sc_0.loadIntBig(257);
    return { $$type: 'UpdateTransferFee' as const, new_fee: _new_fee };
}

function loadTupleUpdateTransferFee(source: TupleReader) {
    let _new_fee = source.readBigNumber();
    return { $$type: 'UpdateTransferFee' as const, new_fee: _new_fee };
}

function storeTupleUpdateTransferFee(source: UpdateTransferFee) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.new_fee);
    return builder.build();
}

function dictValueParserUpdateTransferFee(): DictionaryValue<UpdateTransferFee> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeUpdateTransferFee(src)).endCell());
        },
        parse: (src) => {
            return loadUpdateTransferFee(src.loadRef().beginParse());
        }
    }
}

export type RemoveMappedContract = {
    $$type: 'RemoveMappedContract';
    token_id: bigint;
}

export function storeRemoveMappedContract(src: RemoveMappedContract) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1790492737, 32);
        b_0.storeUint(src.token_id, 256);
    };
}

export function loadRemoveMappedContract(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1790492737) { throw Error('Invalid prefix'); }
    let _token_id = sc_0.loadUintBig(256);
    return { $$type: 'RemoveMappedContract' as const, token_id: _token_id };
}

function loadTupleRemoveMappedContract(source: TupleReader) {
    let _token_id = source.readBigNumber();
    return { $$type: 'RemoveMappedContract' as const, token_id: _token_id };
}

function storeTupleRemoveMappedContract(source: RemoveMappedContract) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.token_id);
    return builder.build();
}

function dictValueParserRemoveMappedContract(): DictionaryValue<RemoveMappedContract> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeRemoveMappedContract(src)).endCell());
        },
        parse: (src) => {
            return loadRemoveMappedContract(src.loadRef().beginParse());
        }
    }
}

export type Strategies = {
    $$type: 'Strategies';
    strategies: Dictionary<bigint, Steps>;
}

export function storeStrategies(src: Strategies) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeDict(src.strategies, Dictionary.Keys.BigInt(257), dictValueParserSteps());
    };
}

export function loadStrategies(slice: Slice) {
    let sc_0 = slice;
    let _strategies = Dictionary.load(Dictionary.Keys.BigInt(257), dictValueParserSteps(), sc_0);
    return { $$type: 'Strategies' as const, strategies: _strategies };
}

function loadTupleStrategies(source: TupleReader) {
    let _strategies = Dictionary.loadDirect(Dictionary.Keys.BigInt(257), dictValueParserSteps(), source.readCellOpt());
    return { $$type: 'Strategies' as const, strategies: _strategies };
}

function storeTupleStrategies(source: Strategies) {
    let builder = new TupleBuilder();
    builder.writeCell(source.strategies.size > 0 ? beginCell().storeDictDirect(source.strategies, Dictionary.Keys.BigInt(257), dictValueParserSteps()).endCell() : null);
    return builder.build();
}

function dictValueParserStrategies(): DictionaryValue<Strategies> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeStrategies(src)).endCell());
        },
        parse: (src) => {
            return loadStrategies(src.loadRef().beginParse());
        }
    }
}

export type ToTokenCrossChainStrategy = {
    $$type: 'ToTokenCrossChainStrategy';
    to_token: Dictionary<bigint, CrossChainStrategy>;
}

export function storeToTokenCrossChainStrategy(src: ToTokenCrossChainStrategy) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeDict(src.to_token, Dictionary.Keys.BigInt(257), dictValueParserCrossChainStrategy());
    };
}

export function loadToTokenCrossChainStrategy(slice: Slice) {
    let sc_0 = slice;
    let _to_token = Dictionary.load(Dictionary.Keys.BigInt(257), dictValueParserCrossChainStrategy(), sc_0);
    return { $$type: 'ToTokenCrossChainStrategy' as const, to_token: _to_token };
}

function loadTupleToTokenCrossChainStrategy(source: TupleReader) {
    let _to_token = Dictionary.loadDirect(Dictionary.Keys.BigInt(257), dictValueParserCrossChainStrategy(), source.readCellOpt());
    return { $$type: 'ToTokenCrossChainStrategy' as const, to_token: _to_token };
}

function storeTupleToTokenCrossChainStrategy(source: ToTokenCrossChainStrategy) {
    let builder = new TupleBuilder();
    builder.writeCell(source.to_token.size > 0 ? beginCell().storeDictDirect(source.to_token, Dictionary.Keys.BigInt(257), dictValueParserCrossChainStrategy()).endCell() : null);
    return builder.build();
}

function dictValueParserToTokenCrossChainStrategy(): DictionaryValue<ToTokenCrossChainStrategy> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeToTokenCrossChainStrategy(src)).endCell());
        },
        parse: (src) => {
            return loadToTokenCrossChainStrategy(src.loadRef().beginParse());
        }
    }
}

export type CrossChainTokenStrategy = {
    $$type: 'CrossChainTokenStrategy';
    from_token: Dictionary<bigint, ToTokenCrossChainStrategy>;
}

export function storeCrossChainTokenStrategy(src: CrossChainTokenStrategy) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeDict(src.from_token, Dictionary.Keys.BigInt(257), dictValueParserToTokenCrossChainStrategy());
    };
}

export function loadCrossChainTokenStrategy(slice: Slice) {
    let sc_0 = slice;
    let _from_token = Dictionary.load(Dictionary.Keys.BigInt(257), dictValueParserToTokenCrossChainStrategy(), sc_0);
    return { $$type: 'CrossChainTokenStrategy' as const, from_token: _from_token };
}

function loadTupleCrossChainTokenStrategy(source: TupleReader) {
    let _from_token = Dictionary.loadDirect(Dictionary.Keys.BigInt(257), dictValueParserToTokenCrossChainStrategy(), source.readCellOpt());
    return { $$type: 'CrossChainTokenStrategy' as const, from_token: _from_token };
}

function storeTupleCrossChainTokenStrategy(source: CrossChainTokenStrategy) {
    let builder = new TupleBuilder();
    builder.writeCell(source.from_token.size > 0 ? beginCell().storeDictDirect(source.from_token, Dictionary.Keys.BigInt(257), dictValueParserToTokenCrossChainStrategy()).endCell() : null);
    return builder.build();
}

function dictValueParserCrossChainTokenStrategy(): DictionaryValue<CrossChainTokenStrategy> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeCrossChainTokenStrategy(src)).endCell());
        },
        parse: (src) => {
            return loadCrossChainTokenStrategy(src.loadRef().beginParse());
        }
    }
}

export type TargetTokenToSteps = {
    $$type: 'TargetTokenToSteps';
    i: Dictionary<bigint, Steps>;
}

export function storeTargetTokenToSteps(src: TargetTokenToSteps) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeDict(src.i, Dictionary.Keys.BigInt(257), dictValueParserSteps());
    };
}

export function loadTargetTokenToSteps(slice: Slice) {
    let sc_0 = slice;
    let _i = Dictionary.load(Dictionary.Keys.BigInt(257), dictValueParserSteps(), sc_0);
    return { $$type: 'TargetTokenToSteps' as const, i: _i };
}

function loadTupleTargetTokenToSteps(source: TupleReader) {
    let _i = Dictionary.loadDirect(Dictionary.Keys.BigInt(257), dictValueParserSteps(), source.readCellOpt());
    return { $$type: 'TargetTokenToSteps' as const, i: _i };
}

function storeTupleTargetTokenToSteps(source: TargetTokenToSteps) {
    let builder = new TupleBuilder();
    builder.writeCell(source.i.size > 0 ? beginCell().storeDictDirect(source.i, Dictionary.Keys.BigInt(257), dictValueParserSteps()).endCell() : null);
    return builder.build();
}

function dictValueParserTargetTokenToSteps(): DictionaryValue<TargetTokenToSteps> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeTargetTokenToSteps(src)).endCell());
        },
        parse: (src) => {
            return loadTargetTokenToSteps(src.loadRef().beginParse());
        }
    }
}

export type Steps = {
    $$type: 'Steps';
    steps: Dictionary<bigint, bigint>;
    size: bigint;
}

export function storeSteps(src: Steps) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeDict(src.steps, Dictionary.Keys.BigInt(257), Dictionary.Values.BigInt(257));
        b_0.storeInt(src.size, 257);
    };
}

export function loadSteps(slice: Slice) {
    let sc_0 = slice;
    let _steps = Dictionary.load(Dictionary.Keys.BigInt(257), Dictionary.Values.BigInt(257), sc_0);
    let _size = sc_0.loadIntBig(257);
    return { $$type: 'Steps' as const, steps: _steps, size: _size };
}

function loadTupleSteps(source: TupleReader) {
    let _steps = Dictionary.loadDirect(Dictionary.Keys.BigInt(257), Dictionary.Values.BigInt(257), source.readCellOpt());
    let _size = source.readBigNumber();
    return { $$type: 'Steps' as const, steps: _steps, size: _size };
}

function storeTupleSteps(source: Steps) {
    let builder = new TupleBuilder();
    builder.writeCell(source.steps.size > 0 ? beginCell().storeDictDirect(source.steps, Dictionary.Keys.BigInt(257), Dictionary.Values.BigInt(257)).endCell() : null);
    builder.writeNumber(source.size);
    return builder.build();
}

function dictValueParserSteps(): DictionaryValue<Steps> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeSteps(src)).endCell());
        },
        parse: (src) => {
            return loadSteps(src.loadRef().beginParse());
        }
    }
}

export type CrossChainStrategy = {
    $$type: 'CrossChainStrategy';
    local_steps: Steps;
    foreign_steps: Steps;
}

export function storeCrossChainStrategy(src: CrossChainStrategy) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.store(storeSteps(src.local_steps));
        b_0.store(storeSteps(src.foreign_steps));
    };
}

export function loadCrossChainStrategy(slice: Slice) {
    let sc_0 = slice;
    let _local_steps = loadSteps(sc_0);
    let _foreign_steps = loadSteps(sc_0);
    return { $$type: 'CrossChainStrategy' as const, local_steps: _local_steps, foreign_steps: _foreign_steps };
}

function loadTupleCrossChainStrategy(source: TupleReader) {
    const _local_steps = loadTupleSteps(source.readTuple());
    const _foreign_steps = loadTupleSteps(source.readTuple());
    return { $$type: 'CrossChainStrategy' as const, local_steps: _local_steps, foreign_steps: _foreign_steps };
}

function storeTupleCrossChainStrategy(source: CrossChainStrategy) {
    let builder = new TupleBuilder();
    builder.writeTuple(storeTupleSteps(source.local_steps));
    builder.writeTuple(storeTupleSteps(source.foreign_steps));
    return builder.build();
}

function dictValueParserCrossChainStrategy(): DictionaryValue<CrossChainStrategy> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeCrossChainStrategy(src)).endCell());
        },
        parse: (src) => {
            return loadCrossChainStrategy(src.loadRef().beginParse());
        }
    }
}

export type TargetTokenToCrossChainStrategy = {
    $$type: 'TargetTokenToCrossChainStrategy';
    i: Dictionary<bigint, CrossChainStrategy>;
}

export function storeTargetTokenToCrossChainStrategy(src: TargetTokenToCrossChainStrategy) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeDict(src.i, Dictionary.Keys.BigInt(257), dictValueParserCrossChainStrategy());
    };
}

export function loadTargetTokenToCrossChainStrategy(slice: Slice) {
    let sc_0 = slice;
    let _i = Dictionary.load(Dictionary.Keys.BigInt(257), dictValueParserCrossChainStrategy(), sc_0);
    return { $$type: 'TargetTokenToCrossChainStrategy' as const, i: _i };
}

function loadTupleTargetTokenToCrossChainStrategy(source: TupleReader) {
    let _i = Dictionary.loadDirect(Dictionary.Keys.BigInt(257), dictValueParserCrossChainStrategy(), source.readCellOpt());
    return { $$type: 'TargetTokenToCrossChainStrategy' as const, i: _i };
}

function storeTupleTargetTokenToCrossChainStrategy(source: TargetTokenToCrossChainStrategy) {
    let builder = new TupleBuilder();
    builder.writeCell(source.i.size > 0 ? beginCell().storeDictDirect(source.i, Dictionary.Keys.BigInt(257), dictValueParserCrossChainStrategy()).endCell() : null);
    return builder.build();
}

function dictValueParserTargetTokenToCrossChainStrategy(): DictionaryValue<TargetTokenToCrossChainStrategy> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeTargetTokenToCrossChainStrategy(src)).endCell());
        },
        parse: (src) => {
            return loadTargetTokenToCrossChainStrategy(src.loadRef().beginParse());
        }
    }
}

export type FromTokenToTargetTokenToCrossChainStrategy = {
    $$type: 'FromTokenToTargetTokenToCrossChainStrategy';
    i: Dictionary<bigint, TargetTokenToCrossChainStrategy>;
}

export function storeFromTokenToTargetTokenToCrossChainStrategy(src: FromTokenToTargetTokenToCrossChainStrategy) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeDict(src.i, Dictionary.Keys.BigInt(257), dictValueParserTargetTokenToCrossChainStrategy());
    };
}

export function loadFromTokenToTargetTokenToCrossChainStrategy(slice: Slice) {
    let sc_0 = slice;
    let _i = Dictionary.load(Dictionary.Keys.BigInt(257), dictValueParserTargetTokenToCrossChainStrategy(), sc_0);
    return { $$type: 'FromTokenToTargetTokenToCrossChainStrategy' as const, i: _i };
}

function loadTupleFromTokenToTargetTokenToCrossChainStrategy(source: TupleReader) {
    let _i = Dictionary.loadDirect(Dictionary.Keys.BigInt(257), dictValueParserTargetTokenToCrossChainStrategy(), source.readCellOpt());
    return { $$type: 'FromTokenToTargetTokenToCrossChainStrategy' as const, i: _i };
}

function storeTupleFromTokenToTargetTokenToCrossChainStrategy(source: FromTokenToTargetTokenToCrossChainStrategy) {
    let builder = new TupleBuilder();
    builder.writeCell(source.i.size > 0 ? beginCell().storeDictDirect(source.i, Dictionary.Keys.BigInt(257), dictValueParserTargetTokenToCrossChainStrategy()).endCell() : null);
    return builder.build();
}

function dictValueParserFromTokenToTargetTokenToCrossChainStrategy(): DictionaryValue<FromTokenToTargetTokenToCrossChainStrategy> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeFromTokenToTargetTokenToCrossChainStrategy(src)).endCell());
        },
        parse: (src) => {
            return loadFromTokenToTargetTokenToCrossChainStrategy(src.loadRef().beginParse());
        }
    }
}

export type UpdateProtocolFee = {
    $$type: 'UpdateProtocolFee';
    new_fee: bigint;
}

export function storeUpdateProtocolFee(src: UpdateProtocolFee) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(865129320, 32);
        b_0.storeInt(src.new_fee, 257);
    };
}

export function loadUpdateProtocolFee(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 865129320) { throw Error('Invalid prefix'); }
    let _new_fee = sc_0.loadIntBig(257);
    return { $$type: 'UpdateProtocolFee' as const, new_fee: _new_fee };
}

function loadTupleUpdateProtocolFee(source: TupleReader) {
    let _new_fee = source.readBigNumber();
    return { $$type: 'UpdateProtocolFee' as const, new_fee: _new_fee };
}

function storeTupleUpdateProtocolFee(source: UpdateProtocolFee) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.new_fee);
    return builder.build();
}

function dictValueParserUpdateProtocolFee(): DictionaryValue<UpdateProtocolFee> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeUpdateProtocolFee(src)).endCell());
        },
        parse: (src) => {
            return loadUpdateProtocolFee(src.loadRef().beginParse());
        }
    }
}

export type AddValidator = {
    $$type: 'AddValidator';
    key: bigint;
    address: Address;
}

export function storeAddValidator(src: AddValidator) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2513894818, 32);
        b_0.storeInt(src.key, 257);
        b_0.storeAddress(src.address);
    };
}

export function loadAddValidator(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2513894818) { throw Error('Invalid prefix'); }
    let _key = sc_0.loadIntBig(257);
    let _address = sc_0.loadAddress();
    return { $$type: 'AddValidator' as const, key: _key, address: _address };
}

function loadTupleAddValidator(source: TupleReader) {
    let _key = source.readBigNumber();
    let _address = source.readAddress();
    return { $$type: 'AddValidator' as const, key: _key, address: _address };
}

function storeTupleAddValidator(source: AddValidator) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.key);
    builder.writeAddress(source.address);
    return builder.build();
}

function dictValueParserAddValidator(): DictionaryValue<AddValidator> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeAddValidator(src)).endCell());
        },
        parse: (src) => {
            return loadAddValidator(src.loadRef().beginParse());
        }
    }
}

export type RemoveValidator = {
    $$type: 'RemoveValidator';
    key: bigint;
}

export function storeRemoveValidator(src: RemoveValidator) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(3282419170, 32);
        b_0.storeInt(src.key, 257);
    };
}

export function loadRemoveValidator(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 3282419170) { throw Error('Invalid prefix'); }
    let _key = sc_0.loadIntBig(257);
    return { $$type: 'RemoveValidator' as const, key: _key };
}

function loadTupleRemoveValidator(source: TupleReader) {
    let _key = source.readBigNumber();
    return { $$type: 'RemoveValidator' as const, key: _key };
}

function storeTupleRemoveValidator(source: RemoveValidator) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.key);
    return builder.build();
}

function dictValueParserRemoveValidator(): DictionaryValue<RemoveValidator> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeRemoveValidator(src)).endCell());
        },
        parse: (src) => {
            return loadRemoveValidator(src.loadRef().beginParse());
        }
    }
}

export type SetIncomingStrategy = {
    $$type: 'SetIncomingStrategy';
    from_token: bigint;
    target_token: bigint;
    steps: Steps;
}

export function storeSetIncomingStrategy(src: SetIncomingStrategy) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2745641556, 32);
        b_0.storeInt(src.from_token, 257);
        b_0.storeInt(src.target_token, 257);
        b_0.store(storeSteps(src.steps));
    };
}

export function loadSetIncomingStrategy(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2745641556) { throw Error('Invalid prefix'); }
    let _from_token = sc_0.loadIntBig(257);
    let _target_token = sc_0.loadIntBig(257);
    let _steps = loadSteps(sc_0);
    return { $$type: 'SetIncomingStrategy' as const, from_token: _from_token, target_token: _target_token, steps: _steps };
}

function loadTupleSetIncomingStrategy(source: TupleReader) {
    let _from_token = source.readBigNumber();
    let _target_token = source.readBigNumber();
    const _steps = loadTupleSteps(source.readTuple());
    return { $$type: 'SetIncomingStrategy' as const, from_token: _from_token, target_token: _target_token, steps: _steps };
}

function storeTupleSetIncomingStrategy(source: SetIncomingStrategy) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.from_token);
    builder.writeNumber(source.target_token);
    builder.writeTuple(storeTupleSteps(source.steps));
    return builder.build();
}

function dictValueParserSetIncomingStrategy(): DictionaryValue<SetIncomingStrategy> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeSetIncomingStrategy(src)).endCell());
        },
        parse: (src) => {
            return loadSetIncomingStrategy(src.loadRef().beginParse());
        }
    }
}

export type SetCrossChainStrategy = {
    $$type: 'SetCrossChainStrategy';
    target_chain: bigint;
    from_token: bigint;
    target_token: bigint;
    local_steps: Steps;
    foreign_steps: Steps;
}

export function storeSetCrossChainStrategy(src: SetCrossChainStrategy) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1825931216, 32);
        b_0.storeInt(src.target_chain, 257);
        b_0.storeInt(src.from_token, 257);
        b_0.storeInt(src.target_token, 257);
        let b_1 = new Builder();
        b_1.store(storeSteps(src.local_steps));
        b_1.store(storeSteps(src.foreign_steps));
        b_0.storeRef(b_1.endCell());
    };
}

export function loadSetCrossChainStrategy(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1825931216) { throw Error('Invalid prefix'); }
    let _target_chain = sc_0.loadIntBig(257);
    let _from_token = sc_0.loadIntBig(257);
    let _target_token = sc_0.loadIntBig(257);
    let sc_1 = sc_0.loadRef().beginParse();
    let _local_steps = loadSteps(sc_1);
    let _foreign_steps = loadSteps(sc_1);
    return { $$type: 'SetCrossChainStrategy' as const, target_chain: _target_chain, from_token: _from_token, target_token: _target_token, local_steps: _local_steps, foreign_steps: _foreign_steps };
}

function loadTupleSetCrossChainStrategy(source: TupleReader) {
    let _target_chain = source.readBigNumber();
    let _from_token = source.readBigNumber();
    let _target_token = source.readBigNumber();
    const _local_steps = loadTupleSteps(source.readTuple());
    const _foreign_steps = loadTupleSteps(source.readTuple());
    return { $$type: 'SetCrossChainStrategy' as const, target_chain: _target_chain, from_token: _from_token, target_token: _target_token, local_steps: _local_steps, foreign_steps: _foreign_steps };
}

function storeTupleSetCrossChainStrategy(source: SetCrossChainStrategy) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.target_chain);
    builder.writeNumber(source.from_token);
    builder.writeNumber(source.target_token);
    builder.writeTuple(storeTupleSteps(source.local_steps));
    builder.writeTuple(storeTupleSteps(source.foreign_steps));
    return builder.build();
}

function dictValueParserSetCrossChainStrategy(): DictionaryValue<SetCrossChainStrategy> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeSetCrossChainStrategy(src)).endCell());
        },
        parse: (src) => {
            return loadSetCrossChainStrategy(src.loadRef().beginParse());
        }
    }
}

export type RemoveInternalStrategy = {
    $$type: 'RemoveInternalStrategy';
    from_token: bigint;
    target_token: bigint;
}

export function storeRemoveInternalStrategy(src: RemoveInternalStrategy) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(3020212274, 32);
        b_0.storeInt(src.from_token, 257);
        b_0.storeInt(src.target_token, 257);
    };
}

export function loadRemoveInternalStrategy(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 3020212274) { throw Error('Invalid prefix'); }
    let _from_token = sc_0.loadIntBig(257);
    let _target_token = sc_0.loadIntBig(257);
    return { $$type: 'RemoveInternalStrategy' as const, from_token: _from_token, target_token: _target_token };
}

function loadTupleRemoveInternalStrategy(source: TupleReader) {
    let _from_token = source.readBigNumber();
    let _target_token = source.readBigNumber();
    return { $$type: 'RemoveInternalStrategy' as const, from_token: _from_token, target_token: _target_token };
}

function storeTupleRemoveInternalStrategy(source: RemoveInternalStrategy) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.from_token);
    builder.writeNumber(source.target_token);
    return builder.build();
}

function dictValueParserRemoveInternalStrategy(): DictionaryValue<RemoveInternalStrategy> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeRemoveInternalStrategy(src)).endCell());
        },
        parse: (src) => {
            return loadRemoveInternalStrategy(src.loadRef().beginParse());
        }
    }
}

export type RemoveCrossChainStrategy = {
    $$type: 'RemoveCrossChainStrategy';
    target_chain: bigint;
    from_token: bigint;
    target_token: bigint;
}

export function storeRemoveCrossChainStrategy(src: RemoveCrossChainStrategy) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(207130758, 32);
        b_0.storeInt(src.target_chain, 257);
        b_0.storeInt(src.from_token, 257);
        b_0.storeInt(src.target_token, 257);
    };
}

export function loadRemoveCrossChainStrategy(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 207130758) { throw Error('Invalid prefix'); }
    let _target_chain = sc_0.loadIntBig(257);
    let _from_token = sc_0.loadIntBig(257);
    let _target_token = sc_0.loadIntBig(257);
    return { $$type: 'RemoveCrossChainStrategy' as const, target_chain: _target_chain, from_token: _from_token, target_token: _target_token };
}

function loadTupleRemoveCrossChainStrategy(source: TupleReader) {
    let _target_chain = source.readBigNumber();
    let _from_token = source.readBigNumber();
    let _target_token = source.readBigNumber();
    return { $$type: 'RemoveCrossChainStrategy' as const, target_chain: _target_chain, from_token: _from_token, target_token: _target_token };
}

function storeTupleRemoveCrossChainStrategy(source: RemoveCrossChainStrategy) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.target_chain);
    builder.writeNumber(source.from_token);
    builder.writeNumber(source.target_token);
    return builder.build();
}

function dictValueParserRemoveCrossChainStrategy(): DictionaryValue<RemoveCrossChainStrategy> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeRemoveCrossChainStrategy(src)).endCell());
        },
        parse: (src) => {
            return loadRemoveCrossChainStrategy(src.loadRef().beginParse());
        }
    }
}

type Bridge_init_args = {
    $$type: 'Bridge_init_args';
    chain_nonce: bigint;
    native_coin: bigint;
    burner: Address;
    base_uri: string;
    transfer_fee: bigint;
    protocol_fee: bigint;
    bootstrap_validator_key: bigint;
    bootstrap_validator_address: Address;
}

function initBridge_init_args(src: Bridge_init_args) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeInt(src.chain_nonce, 257);
        b_0.storeInt(src.native_coin, 257);
        b_0.storeAddress(src.burner);
        b_0.storeStringRefTail(src.base_uri);
        let b_1 = new Builder();
        b_1.storeInt(src.transfer_fee, 257);
        b_1.storeInt(src.protocol_fee, 257);
        b_1.storeInt(src.bootstrap_validator_key, 257);
        let b_2 = new Builder();
        b_2.storeAddress(src.bootstrap_validator_address);
        b_1.storeRef(b_2.endCell());
        b_0.storeRef(b_1.endCell());
    };
}

async function Bridge_init(chain_nonce: bigint, native_coin: bigint, burner: Address, base_uri: string, transfer_fee: bigint, protocol_fee: bigint, bootstrap_validator_key: bigint, bootstrap_validator_address: Address) {
    const __code = Cell.fromBase64('te6ccgECzgEANwcAART/APSkE/S88sgLAQIBYgIDA8rQAdDTAwFxsKMB+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiFRQUwNvBPhhAvhi2zwRFBEWERQRExEVERMREhEUERIRERETEREREBESERAPEREPDhEQDhDfVRzbPPLggrkEBQIBIAgJBO7tou37AZIwf+BwIddJwh+VMCDXCx/eIIIQc2LQnLqOuzDTHwGCEHNi0Jy68uCB0z/6APpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IhUEwMQI2wU2zx/4CCCEHvdl966jwgw2zxsFts8f+AgghDrEm3LugoLDA0BOMj4QwHMfwHKABEVERQRExESEREREFXg2zzJ7VQGAcgBERQBERWBAQHPAAEREgGBAQHPAAEREAGBAQHPAA7IgQEBzwAdgQEBzwAb9AAZ9AAX9AAFyPQAFPQAWCDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFvQAAcj0ABPKAFADBwCgINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WyFAEzxbJUAPME4EBAc8AFIEBAc8AFPQABMiBAQHPABWBAQHPAMlQA8zJWMzJAczJAcwCASB+fwIBIJmaAeIxMhEUERYRFBETERURExESERYREhERERUREREQERYREA8RFQ8OERYODREVDQwRFgwLERULChEWCgkRFQkIERYIBxEVBwYRFgYFERUFBBEWBAMRFQMCERYCAREVAREWgU1QKLPy9BEV0z+BAQFUWgBSQA4AstMfAYIQe92X3rry4IHTP/oA+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiAH6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIAfoAUVUVFEMwAfY1XwOCAIpn+EFvJBAjXwMqxwXy9BEUERYRFBETERURExESERYREhERERUREREQERYREA8RFQ8OERYODREVDQwRFgwLERULChEWCgkRFQkIERYIBxEVBwYRFgYFERUFBBEWBAMRFQMCERYCAREVAREWgU1QKLPy9BEV0z8PBHSOnDDTHwGCEOsSbcu68uCB0z/U1NT6AFVAbBXbPH/gIIIQSzfGIbqPCDDbPGwY2zx/4CCCEGq4wEG6ERITFAPqQTP0DG+hlAHXADCSW23iggDERSFus/L0ggD3tfhBbyQTXwMCIG7y0IAnoBK+8vQRFaQRFdTU1DAEERkEE1YXUDNaFRRUdUNUdUPIVVDbPMn5ABBGEDVGVoEBAQbIVVDbPMkQL1LwIG6VMFn0WjCUQTP0FeINFxcQA/qBAQFUWgBSQEEz9AxvoZQB1wAwkltt4oIAxEUhbrPy9IIA97X4QW8kE18DAiBu8tCAJ6ASvvL0ERWkERXU1NQwBBEZBBNWF1AzWhUUVHVDVHVDyFVQ2zzJ+QAQRhA1RlaBAQEGyFVQ2zzJEC9S8CBulTBZ9FowlEEz9BXiDRcXEACOyAGCEGZkCeVYyx+BAQHPAMnIgljAAAAAAAAAAAAAAAABActnzMlw+wAREhEUERIRERETEREREBESERAPEREPDhEQDhDfVRwB9BEUERkRFBETERgRExESERcREhERERYREREQERUREA8RGQ8OERgODREXDQwRFgwLERULChEZCgkRGAkIERcIBxEWBwYRFQYFERkFBBEYBAMRFwMCERYCAREVAREZgU1QKLPy9BEUpFYZAwIRFwIhVhoCAREYAREaWhUUFQHK0x8BghBLN8YhuvLggYEBAdcA1AHQAfpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgB0weBAQHXANQB0IEBAdcA+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiAEZAfBWHFYcVhxWHFYcVhxWHFYcVhxWHFYcVhxWHFYcVhxWHFYcVhxWHFYcVhwRFBExERQRExEwERMREhEvERIREREuEREREBEtERAPESwPDhErDg0RKg0MESkMCxEoCwoRJwoJESYJCBElCAcRJAcGESMGBREiBQQRIQQaBLKOlTDTHwGCEGq4wEG68uCB0/8BMds8f+AgghA9iDbIuo8uMNMfAYIQPYg2yLry4IHbPAb0BIEBAdcA1AHQ0/+BAQHXADAQKhAkECNsGts8f+AgghBJ891+uhwdHh8C+lR1Q1R1Q8hVUNs8yfkAgQEBUw0DER8BQTP0DG+hlAHXADCSW23iggDERSFus/L0ggD3tfhBbyQTXwMCIG7y0IBWH6ApoBK+8vQRFREYERURFBEWERQRExEYERMREhEWERIREREYEREREBEWERAPERgPDhEWDg0RGA0MERYMFxYC/AsRGAsKERYKCREYCQgRFggHERgHBhEWBgURGAUEERYEAxEaAwIRGQIBERcBERyBQ174QW8kE18DIr7y9BESVhKgARETARESoBESBBEXBAMRFQMCERkCAREYAREWgQEBERzIVVDbPMkQKgERFwFWFgEgbpUwWfRaMJRBM/QV4hcYABpQVsv/UAP6AszMzMs/AKQRFMgBghBmZAnlWMsfgQEBzwDJyIJYwAAAAAAAAAAAAAAAAQHLZ8zJcPsADREUDQwREwwLERILChERCgkREAkQjxDOEG0QXBBLEDpJFwZEhVAzAFT6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIMRA4EDcQNhA1EDQD/AMRIAMCER8CAREeAREd2zxXEF8PbFERFREdERURFBEcERQRExEbERMREhEaERIREREZEREREBEYERAPERcPDhEWDg0RHQ0MERwMCxEbCwoRGgoJERkJCBEYCAcRFwcGERYGBREdBQQRHAQDERsDAhEaAgERGQHbPBEUERwRFMZ8GwHQERMRGxETERIRGhESERERGRERERARGBEQDxEXDw4RFg4NERUNDBEUDAsREwsKERIKCRERCQgREAhVdxBnEFYQRUMwEFYQRgeBAQEIFhVDMMhVYNs8yQMREAMgbpUwWfRaMJRBM/QV4g0iAfBWFVYVVhVWFVYVVhVWFVYVVhVWFVYVVhVWFVYVVhVWFVYVVhVWFVYVVhURFBEqERQRExEpERMREhEoERIREREnEREREBEmERAPESUPDhEkDg0RIw0MESIMCxEhCwoRIAoJER8JCBEeCAcRHQcGERwGBREbBQQRGgQgAHLTHwGCEPl1iaK68uCB0z/TP/oA1NT6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIFhUUQzAB9hEUER4RFBETER0RExESERwREhERERsREREQERoREA8RGQ8OERgODREXDQwRFgwLERULChEeCgkRHQkIERwIBxEbBwYRGgYFERkFBBEYBAMRFwMCERYCAREVAREegU1QKLPy9FYUVhRWFFYUVhRWFFYUVhRWFFYUVhRWFC0E/I6YMNMfAYIQSfPdfrry4IHTP9P/WWwS2zx/4CCCENUydtu6jhQw0x8BghDVMnbbuvLggdM/ATEwf+AgghAzkNNouo6YMNMfAYIQM5DTaLry4IGBAQHXAAEx2zx/4CCCELS7CrW6jpUw0x8BghC0uwq1uvLggdQB0DHbPH/gICMkJSYD+AMRGQMCERgCAREXAREW2zxXEF8PbFERFREWERURFBEWERQRExEWERMREhEWERIREREWEREREBEWERAPERYPDhEWDg0RFg0MERYMCxEWCwoRFgoJERYJCBEWCAcRFgcGERYGBREWBQQRFgQDERYDAhEWAgERFgHbPIEBAW3GfCEBvCBukjBtjo0gbvLQgG8nyFVg2zzJ4hA/EgERFwEgbpUwWfRaMJRBM/QV4hETERQRExESERMREhERERIREREQEREREA8REA8Q7w0OELwQqxCaEIkQeBBnEFYQRRA0QTAiAPDIUAfPFslQB8xQBCDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFlgg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxbLB4EBAc8AAsiBAQHPAAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxbJAcwB8FYWVhZWFlYWVhZWFlYWVhZWFlYWVhZWFlYWVhZWFlYWVhZWFlYWVhZWFhEUESsRFBETESoRExESESkREhERESgREREQEScREA8RJg8OESUODREkDQwRIwwLESILChEhCgkRIAkIER8IBxEeBwYRHQYFERwFBBEbBCcB8FYVVhVWFVYVVhVWFVYVVhVWFVYVVhVWFVYVVhVWFVYVVhVWFVYVVhVWFREUESoRFBETESkRExESESgREhEREScREREQESYREA8RJQ8OESQODREjDQwRIgwLESELChEgCgkRHwkIER4IBxEdBwYRHAYFERsFBBEaBCkB8FYVVhVWFVYVVhVWFVYVVhVWFVYVVhVWFVYVVhVWFVYVVhVWFVYVVhVWFREUESoRFBETESkRExESESgREhEREScREREQESYREA8RJQ8OESQODREjDQwRIgwLESELChEgCgkRHwkIER4IBxEdBwYRHAYFERsFBBEaBCsE7oIQat94gbqOmDDTHwGCEGrfeIG68uCBgQEB1wABMds8f+AgghCV1v2iuo64MNMfAYIQldb9orry4IGBAQHXAPpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgSbBLbPH/gIIIQw6W94rrjAiCCEKOnKlS6REVGRwP+AxEaAwIRGQIBERgBERfbPFcQXw9sUREVERcRFREUERYRFBETERcRExESERYREhERERcREREQERYREA8RFw8OERYODREXDQwRFgwLERcLChEWCgkRFwkIERYIBxEXBwYRFgYFERcFBBEWBAMRFwMCERYCAREXAds8gQEBIBBKE8Z8KACWAhEXAgERGAEhbpVbWfRaMJjIAc8AQTP0QuIREhEUERIRERETEREREBESERAPEREPDhEQDhDfEM4QvRCsEJsQihB5CBBXEEYQNUQDA/wDERkDAhEYAgERFwERFts8VxBfD2xRERURFhEVERQRFhEUERMRFhETERIRFhESERERFhERERARFhEQDxEWDw4RFg4NERYNDBEWDAsRFgsKERYKCREWCQgRFggHERYHBhEWBgURFgUEERYEAxEWAwIRFgIBERYB2zwRFBEVERTGfCoAPhETERQRExESERMREhERERIREREQEREREA8REA9VDjQD/gMRGQMCERgCAREXAREW2zxXEF8PbFERFREWERURFBEWERQRExEWERMREhEWERIREREWEREREBEWERAPERYPDhEWDg0RFg0MERYMCxEWCwoRFgoJERYJCBEWCAcRFgcGERYGBREWBQQRFgQDERYDAhEWAgERFgHbPDURExEUERPGfCwAWBESERMREhERERIREREQEREREA8REA8Q7xDeEM0QvBCrEJoQiRB4EGcQVlUDA/pWFFYUVhRWFFYUVhRWFFYUVhQRFBEpERQRExEoERMREhEnERIREREmEREREBElERAPESQPDhEjDg0RIg0MESEMCxEgCwoRHwoJER4JCBEdCAcRHAcGERsGBREaBQQRGQQDERgDAhEXAgERFgERFds8VxBfD2xR2zyBZoxWEMR8LgP8gQEBVhhZ9A1voZIwbd8gbpIwbY6H0Ns8bBZvBuJu8vRWGtDS/zBWGtDS/zARH1YeVh5WHlYeVh7IVVDbPMn5ABEWERcRFhEVERYRFREUERURFBETERQRExESERMREhERERIREREQEREREA8REA8Q7xDeEM0QvBCrEJoQiRB4LzAxAFjT//oA1NTTP/pAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgWFRRDMABoghD5dYmiUAfLHxXLPxPLPwH6AszMASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFgT2EGcQVhBFEDRAEwERGQERGNs8ERQRFhEUERMRFRETERIRFBESERERExERERAREhEQDxERDw4REA4Q31UcERxWF1Yb2zwFERsFBBEYBAMRFwMCERYCAREZAREVVUCBAQEGyFVQ2zzJECtWFgEgbpUwWfRaMJRBM/QV4hEUMjM0NQCscAGORyGBAQEiWfQNb6GSMG3fIG6SMG2c0NQB0AHT/1lsEm8C4iBu8tCAbyIngQEBIln0DG+hkjBt326zmyRZ+RCBP9YB8vSkkVvi5DGCALdWMiK+8vQD7hEVERgRFREUERcRFBETERYRExESERgREhERERcREREQERYREA8RGA8OERcODREWDQwRGAwLERcLChEWCgkRGAkIERcIBxEWBwYRGAYFERcFBBEWBAMRGAMCERcCAREWAREYVhfbPHABiuRbVxVXFVcVERERFBERNjc4AFZQVsv/UAP6AszMyz8BINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WAJLIAYIQuYXWiljLH4EBAc8AyciCWMAAAAAAAAAAAAAAAAEBy2fMyXD7AA0RFA0MERMMCxESCwoREQoJERAJEM8QflVmFhUQNEEwALiBAQFUTxNZ9A1voZIwbd8gbpIwbZfQ9AQBMW8B4oE43iFus/L0IG7y0IBvIYEBAVhZ9A1voZIwbd8gbpIwbZ3Q9ASBAQHXAFlsEm8C4oFhZCFus/L0IG7y0IBvIgKSgQEBVFIAUjBBM/QMb6GUAdcAMJJbbeIgbvLQgCDABuMPERQRFhEUERMRFRETERIRFBESERERExERERAREhEQDxERDw4REA5VHTk6ACwREBETERAPERIPDhERDg0REA0Qz1UrA8owERQRFhEUERMRFRETERIRFhESERERFRERERARFhEQDxEVDw4RFg4NERUNDBEWDAsRFQsKERYKCREVCQgRFggHERUHBhEWBgURFQUEERYEAxEVAwIRFgIBERUBERbbPFYZAbrjD5g7PAL+wAKO4hEUERYRFBETERURExESERYREhERERUREREQERYREA8RFQ8OERYODREVDQwRFgwLERULChEWCgkRFQkIERYIBxEVBwYRFgYFERUFBBEWBAMRFQMCERYCAREVAREWVhdWGlYajhekERYBERUBERQBERMBERIBEREBERBV0T9AAl5WF1YagWsb+CdvEPhBbyQTXwOhUyigvPL0UwagAREUAaEREyagiBJ/cEQEbW3bPD13A7hWF1YaVhqBAQFWEQJZ9A1voZIwbd8gbpIwbY6H0Ns8bBdvB+KBECEhbrPy9CBu8tCAbydsYfhBbyQQI18DbXDIydAhEFdVUMhVYNs8yYIQCrqVAH9wUAQDbW3bPEE+dwA6AAAAAEZyb20gRW1tZXQuRmluYW5jZSBCcmlkZ2UAyIIQD4p+pVAIyx8Wyz9QBPoCWCDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFgEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxYhbrOVfwHKAMyUcDLKAOIB+gIBzxYDpIEBAVYRAln0DW+hkjBt3yBukjBtjofQ2zxsF28H4oIAv8whbrPy9CBu8tCAbycQVl8G+ChtcMjJ0BA1EEbIVVDbPMmCEATEtAB/cFAEA21t2zxBQncAAuIB9tQB0AH6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIAfpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgB0weBAQHXANQB0IEBAdcA+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiDEQJxAmECUQJEMAyIIQibcdCVAHyx9QBSDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFlADINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WgQEBzwAhbrOVfwHKAMyUcDLKAOIB+gIBzxYABBAjAfBWFVYVVhVWFVYVVhVWFVYVVhVWFVYVVhVWFVYVVhVWFVYVVhVWFVYVVhURFBEqERQRExEpERMREhEoERIREREnEREREBEmERAPESUPDhEkDg0RIw0MESIMCxEhCwoRIAoJER8JCBEeCAcRHQcGERwGBREbBQQRGgRIAfBWFlYWVhZWFlYWVhZWFlYWVhZWFlYWVhZWFlYWVhZWFlYWVhZWFlYWVhYRFBErERQRExEqERMREhEpERIREREoEREREBEnERAPESYPDhElDg0RJA0MESMMCxEiCwoRIQoJESAJCBEfCAcRHgcGER0GBREcBQQRGwRKATAw0x8BghDDpb3iuvLggYEBAdcAATHbPH9MA/yOqTDTHwGCEKOnKlS68uCBgQEB1wCBAQHXAPQEgQEB1wBZECQQI2wU2zx/4CCCEGzVf9C6jr8w0x8BghBs1X/QuvLggYEBAdcAgQEB1wCBAQHXANQB0PQEgQEB1wBZAvQEgQEB1wBZMhBHEEYQRUMAbBfbPH/gIIIQDFiQhrpPUFED/AMRGQMCERgCAREXAREW2zxXEF8PbFERFREWERURFBEWERQRExEWERMREhEWERIREREWEREREBEWERAPERYPDhEWDg0RFg0MERYMCxEWCwoRFgoJERYJCBEWCAcRFgcGERYGBREWBQQRFgQDERYDAhEWAgERFgHbPBEUERURFMZ8SQA+ERMRFBETERIRExESEREREhERERAREREQDxEQD1UONQP8AxEaAwIRGQIBERgBERfbPFcQXw9sUREVERcRFREUERYRFBETERcRExESERYREhERERcREREQERYREA8RFw8OERYODREXDQwRFgwLERcLChEWCgkRFwkIERYIBxEXBwYRFgYFERcFBBEWBAMRFwMCERYCAREXAds8MBKBAQECv3xLAKQBERUBERYgbpUwWfRaMJRBM/QU4hESpCCqAHOpBKQREhEUERIRERETEREREBESERAPEREPDhEQDhDfEM4QvRCsEJsQihB5EGgQVxBGEDUQJBAjAfBWFVYVVhVWFVYVVhVWFVYVVhVWFVYVVhVWFVYVVhVWFVYVVhVWFVYVVhURFBEqERQRExEpERMREhEoERIREREnEREREBEmERAPESUPDhEkDg0RIw0MESIMCxEhCwoRIAoJER8JCBEeCAcRHQcGERwGBREbBQQRGgRNA/4DERkDAhEYAgERFwERFts8VxBfD2xRERURFhEVERQRFhEUERMRFhETERIRFhESERERFhERERARFhEQDxEWDw4RFg4NERYNDBEWDAsRFgsKERYKCREWCQgRFggHERYHBhEWBgURFgUEERYEAxEWAwIRFgIBERYB2zwwgQEBAREVv3xOAJ5tIG6VMFn0WjCUQTP0FOIRE6UgqgBzqQSkERMRFBETERIRExESEREREhERERAREREQDxEQDxDvEN4QzRC8EKsQmhCJEHgQZxBWEEUQNBAjAfBWGFYYVhhWGFYYVhhWGFYYVhhWGFYYVhhWGFYYVhhWGFYYVhhWGFYYVhgRFBEtERQRExEsERMREhErERIREREqEREREBEpERAPESgPDhEnDg0RJg0MESUMCxEkCwoRIwoJESIJCBEhCAcRIAcGER8GBREeBQQRHQRSAfBWG1YbVhtWG1YbVhtWG1YbVhtWG1YbVhtWG1YbVhtWG1YbVhtWG1YbVhsRFBEwERQRExEvERMREhEuERIREREtEREREBEsERAPESsPDhEqDg0RKQ0MESgMCxEnCwoRJgoJESUJCBEkCAcRIwcGESIGBREhBQQRIARVBN6OpDDTHwGCEAxYkIa68uCBgQEB1wCBAQHXAIEBAdcAVSBsE9s8f+AgghC0BMgyuo6eMNMfAYIQtATIMrry4IGBAQHXAIEBAdcAWWwS2zx/4CDAACLXScEhsJJbf+AgghCUapi2uuMCIIIQCmHbWbpZWltcA/wDERwDAhEbAgERGgERGds8VxBfD2xRERURGREVERQRGBEUERMRFxETERIRFhESERERGRERERARGBEQDxEXDw4RFg4NERkNDBEYDAsRFwsKERYKCREZCQgRGAgHERcHBhEWBgURGQUEERgEAxEXAwIRFgIBERkB2zwRFBEYERS/fFMBWBETERcRExESERYREhERERUREREQERQREA8REw8OERIODRERDQwREAxVO9s8VADQVhCBAQElWfQNb6GSMG3fIG6SMG2X0PQEATFvAeIgbpQwbW8B3iBu8tCAbyECgQEBAshZAvQAgQEBzwDJQTAgbpUwWfRaMJRBM/QV4oEBAQHIAQH0AMkQPxIgbpUwWfRaMJRBM/QV4gwD/AMRHwMCER4CAREdAREc2zxXEF8PbFERFREcERURFBEbERQRExEaERMREhEZERIREREYEREREBEXERAPERYPDhEcDg0RGw0MERoMCxEZCwoRGAoJERcJCBEWCAcRHAcGERsGBREaBQQRGQQDERgDAhEXAgERFgHbPBEUERsRFL98VgF4ERMRGhETERIRGRESERERGBERERARFxEQDxEWDw4RFQ4NERQNDBETDAsREgsKEREKCREQCRCPEH5VZts8VwHuVhKBAQEoWfQNb6GSMG3fIG6SMG2X0PQEATFvAeIgbpQwbW8B3iBu8tCAbyEggQEBKFn0DW+hkjBt3yBukjBtl9D0BAExbwHiIG6UMG1vAd4gbvLQgG8hVSKBAQEGyFUwRDQC9ACBAQHPAAIC9ACBAQHPAMlDMBRYAIggbpUwWfRaMJRBM/QV4oEBAQHIAQH0AMlBMCBulTBZ9FowlEEz9BXigQEBAcgBAfQAyRA+EiBulTBZ9FowlEEz9BXiCwH0XwNWFFYUVhRWFFYUVhRWFFYUVhRWFFYUVhRWFFYUVhRWFFYUVhRWFFYUVhQRFBEpERQRExEoERMREhEnERIREREmEREREBElERAPESQPDhEjDg0RIg0MESEMCxEgCwoRHwoJER4JCBEdCAcRHAcGERsGBREaBQQRGQRdAfBWFlYWVhZWFlYWVhZWFlYWVhZWFlYWVhZWFlYWVhZWFlYWVhZWFlYWVhYRFBErERQRExEqERMREhEpERIREREoEREREBEnERAPESYPDhElDg0RJA0MESMMCxEiCwoRIQoJESAJCBEfCAcRHgcGER0GBREcBQQRGwReAVAw0x8BghCUapi2uvLggdM/ATHIAYIQr/kPV1jLH8s/yfhCAXBt2zx/YQP+jrkw0x8BghAKYdtZuvLggfpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgBgQEB1wBZbBLbPH/gIIIQUT7zXrqOuTDTHwGCEFE+81668uCB+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiAGBAQHXAFlsEts8f2JjZAIwAxEYAwIRFwIBERYBERXbPFcQXw9sUds8v3wD/AMRGgMCERkCAREYAREX2zxXEF8PbFERFREXERURFBEWERQRExEXERMREhEWERIREREXEREREBEWERAPERcPDhEWDg0RFw0MERYMCxEXCwoRFgoJERcJCBEWCAcRFwcGERYGBREXBQQRFgQDERcDAhEWAgERFwHbPBEUERYRFL98XwFIERMRFRETERIRFBESERERExERERAREhEQDxERDw4REA5VHds8YADqLoEBASNZ9A1voZIwbd8gbpIwbZfQ9AQBMW8B4oE43iFus/L0IG7y0IBvIYEBAW0gbpIwbY4SIG7y0IBvIshZAvQAgQEBzwDJ4kEwIG6VMFn0WjCUQTP0FeKBAQEByAEB9ADJED8SIG6VMFn0WjCUQTP0FeIMATptbSJus5lbIG7y0IBvIgGRMuIQJHADBIBCUCPbPHcC7BEUERYRFBETERURExESERYREhERERUREREQERYREA8RFQ8OERYODREVDQwRFgwLERULChEWCgkRFQkIERYIBxEVBwYRFgYFERUFBBEWBAMRFQMCERYCAREVAREW2zwRFBEWERQRExEVERMREhEUERIRERETERFoZQLsERQRFhEUERMRFRETERIRFhESERERFRERERARFhEQDxEVDw4RFg4NERUNDBEWDAsRFQsKERYKCREVCQgRFggHERUHBhEWBgURFQUEERYEAxEVAwIRFgIBERUBERbbPBEUERYRFBETERURExESERQREhERERMREWhpA8rgIIIQFzK+IbqOyDDTHwGCEBcyviG68uCBgQEB1wD6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIEmwSgR8L+EFvJBAjXwMixwXy9Ns8f+AgghD2LAzxuuMCwACRMOMNcGxtbgEoERAREhEQDxERDw4REA4Q31Uc2zxmAu4RFBEWERQRExEVERMREhEWERIREREVEREREBEWERAPERUPDhEWDg0RFQ0MERYMCxEVCwoRFgoJERUJCBEWCAcRFQcGERYGBREVBQQRFgQDERUDAhEWAgERFQERFlYV2zyCAIUm+EFvJBAjXwMSxwXy9CmBAQFWF41nAbxZ9A1voZIwbd8gbpIwbY4n0PQE+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiBJsEm8C4iBu8tCAbyKBAQsBERl/cSFulVtZ9FkwmMgBzwBBM/RB4oEBAREYcALeKRETERURExESERQREhERERUREREQERQREA8RFQ8OERQODREVDQwRFAwLERULChEUCgkRFQkIERQIBxEVBwYRFAYFERUFBBEUBAMRFQMCERQCAREVAREUgQEBERbbPAIRFgIBERcBWfQNb6GSMG3fwWoBKBEQERIREA8REQ8OERAOEN9VHNs8bAH6IG6SMG2OJ9D0BPpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgSbBJvAuKCANMHIW6z8vQgbvLQgG8iMIEBC/hBbyQQI18DcUEz9ApvoZQB1wAwkltt4oIA0wchbrOYASBu8tCAwP+SMXDi8vQREhEUERIRERETERFrACAREBESERAPEREPDhEQDlUdAuwRFBEWERQRExEVERMREhEWERIREREVEREREBEWERAPERUPDhEWDg0RFQ0MERYMCxEVCwoRFgoJERUJCBEWCAcRFQcGERYGBREVBQQRFgQDERUDAhEWAgERFQERFlYV2zyBbD34QW8kECNfAxLHBfL0KYEBAVYXjW8BcDDTHwGCEPYsDPG68uCBgQEB1wD6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIEmwS2zx/cQP++QEggvA6EjLdmaHztOWG/4J258U6NeX9Zxj3fF/F7YFYR63dP7qOhjDbPH/bMeAggvDvs0eWdhNuRCS9aLAWKcJumCFDoGRXlCHmEpfBaOdxkbqOhjDbPH/bMeCC8CKPzpKPrFRIYCA91HKrDgW+XbmAxClrjfONC2q+fWpPunN0dQG8WfQNb6GSMG3fIG6SMG2OJ9D0BPpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgSbBJvAuIgbvLQgG8igQELAREZcHEhbpVbWfRZMJjIAc8AQTP0QeKBAQERGHAA3shZAvQAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFskQOgIRFwIBERYBIG6VMFn0WjCUQTP0FeIREhEUERIRERETEREREBESERAPEREPDhEQDhDfEM4QvRCsEJsQigkQaBBXEEYQNUQwEgHyK4EBASNZ9A1voZIwbd8gbpIwbY4n0PQE+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiBJsEm8C4oFU5SFus/L0IG7y0IBvIjCBAQECyFkC9AABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WyRA8EnIAHiBulTBZ9FowlEEz9BXiCQHwVhRWFFYUVhRWFFYUVhRWFFYUVhRWFFYUVhRWFFYUVhRWFFYUVhRWFFYUERQRKREUERMRKBETERIRJxESERERJhERERARJREQDxEkDw4RIw4NESINDBEhDAsRIAsKER8KCREeCQgRHQgHERwHBhEbBgURGgUEERkEdgHwggDjwCiz8vRWFFYUVhRWFFYUVhRWFFYUVhRWFFYUVhRWFFYUVhRWFFYUVhRWFFYUVhQRFBEpERQRExEoERMREhEnERIREREmEREREBElERAPESQPDhEjDg0RIg0MESEMCxEgCwoRHwoJER4JCBEdCAcRHAcGERsGeQEQjoXbPH/bMeB6A3YDERgDAhEXAgERFgERFds8VxBfD2xR2zyBWgERE8IAARETAfL0+EFvJBAjXwNwgwZ/VSBtbW3bPHAREsp8dwHKyHEBygFQBwHKAHABygJQBSDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFlAD+gJwAcpoI26zkX+TJG6z4pczMwFwAcoA4w0hbrOcfwHKAAEgbvLQgAHMlTFwAcoA4skB+wB4AJh/AcoAyHABygBwAcoAJG6znX8BygAEIG7y0IBQBMyWNANwAcoA4iRus51/AcoABCBu8tCAUATMljQDcAHKAOJwAcoAAn8BygACyVjMAkQFERoFBBEZBAMRGAMCERcCAREWAREV2zxXEF8PbFHbPH84yHwB9oF0+Ciz8vRWFFYUVhRWFFYUVhRWFFYUVhRWFFYUVhRWFFYUVhRWFFYUVhRWFFYUVhQRFBEpERQRExEoERMREhEnERIREREmEREREBElERAPESQPDhEjDg0RIg0MESEMCxEgCwoRHwoJER4JCBEdCAcRHAcGERsGBREaBXsCPAQRGQQDERgDAhEXAgERFgERFds8VxBfD2xR2zxwOMh8AvKCAMTt+EFvJBAjXwMRFhEXERYRFREXERURFBEXERQRExEXERMREhEXERIREREXEREREBEXERAPERcPDhEXDg0RFw0MERcMCxEXCwoRFwoJERcJCBEXCAcRFwcGERcGBREXBQQRFwQDERcDAhEXAgERF9s8AREWAfL0hH0APBETERQRExESERMREhERERIREREQEREREA8REA9VDgIBIICBAgEgiYoCASCCgwIZtQV7Z5tniuIL4e2KMLmIAqOya0BINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiNs8ERQRFhEUERMRFRETERIRFBESERERExERERAREhEQDxERDw4REA5VHds8VxBfD2xRguYQCASCFhgDUgQEBLAJZ9A1voZIwbd8gbpIwbY4n0PQE+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiBJsEm8C4iBukltw4CBu8tCAbyIwgQELWHFBM/QKb6GUAdcAMJJbbeIgbpIwcOAgbvLQgAIZr1Ztnm2eK4gvh7YowLmHAhmt522ebZ4riC+HtijAucgAAisAAi4CASCLjAIBIJCRAmGxxHbPBEUERURFBETERQRExESERMREhERERIREREQEREREA8REA9VDts8VxBfD2xRguY0CAViOjwCagQEBKwJZ9A1voZIwbd8gbpIwbY4n0PQE+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiBJsEm8C4oFU5SFus/L0IG7y0IBvIjECGKi72zzbPFcQXw9sUbnBAhiqGds82zxXEF8PbFG5xAIBIJKTAgEglpcCGa0abZ5tniuIL4e2KMC5lAIZr0/tnm2eK4gvh7YowLmVAAIoAAItAhmsoG2ebZ4riC+HtijAucYCGa0NbZ5tniuIL4e2KMC5mAAEVhMCASCbnAIBIKytAhm3o1tnm2eK4gvh7YowuZ0CASCenwACLAIZs9f2zzbPFcQXw9sUYLmgAgEgoaIABFYRAgJ0o6QCAUimpwIXvs2zzbPFcQXw9sUYucoCF7+9s82zxXEF8PbFGLmlAARWEgIBaqipALenowTgudh6ullc9j0J2HOslQo2zQThO6xqWlbI+WZFp15b++LEcwTgQKuANwDOxymcsHVcjktlhwTgN6k73yqLLeOOp6e8CrOGTQThOy6ctWadluZ0HSzbKM3RSQIXsXtnm2eK4gvh7YowuaoCF7MbZ5tniuIL4e2KMLmrAAIlAARWFAIBIK6vAgEgtrcCA5SwsLECAViztAAPt92omhpAADACF7H7Z5tniuIL4e2KMLmyAAIjAHSpu40NWlwZnM6Ly9RbVBkd1JpazdIb1NzR1FhN1dlYW13cUZTcTFIbTMxdWdjTnVvbjFFamNudnk2gAhip49s82zxXEF8PbFG5tQAEVhACGbJNNs82zxXEF8PbFGC5uAIZszi2zzbPFcQXw9sUYLm/AAIvA4TtRNDUAfhj0gABjqLbPFcVERMRFBETERIRExESEREREhERERAREREQDxEQD1UO4Pgo1wsKgwm68uCJ2zwI0VUG2zy6u7wB9oEBAdcAgQEB1wCBAQHXANQB0IEBAdcAgQEB1wD0BPQE9ATUMND0BPQE+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiAH0BNQw0PQE0gD6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIAdQB0AGBAQHXAL0A1oEBAdcAgQEB1wD6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIAdQB0AHUAdCBAQHXAIEBAdcAgQEB1wDUMND6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIMRBIEEcQRhBFAfZtbW1tbW1tbXBwUxH4QW8kECNfAxVxgQEBAgEREAEPIG6VMFn0WjCUQTP0FOJT01YUU0dWGFYRVhFWEVYRVhFWF1YSVhJWEFYgViBWIFYgVhNWIVYUERQRGREUERMRKBETERIRFxESERERGhERERARKREQDxEhDw4RIA6+AE6BAQHXAPQE1DDQgQEB1wCBAQHXADAREhEVERIREhEUERIREhETERID/A0RHw0MER4MCxEdCwoRIgoJERwJCBEbCAcRGAcGEScGBREmBQQRJQQDESQDAhEWAgERIwERFds8VxBfD2xR+EFvJBAjXwMGERYGBBEUBAcREwcGERIGDhERDg0REA0QzxC+EK0QmxCKEFkQSBA02zxWFFYUVhRWFFYUVhRWFL/LwABEgvCimf1eaYIFskt+5qPiISeWvI23jXnRlHteXwp81OUoYgL8VhRWFFYUVhRWFFYUVhRWFFYUVhRWFFYUVhRWFBEUESkRFBETESgRExESEScREhERESYREREQESUREA8RJA8OESMODREiDQwRIQwLESALChEfCgkRHgkIER0IBxEcBwYRGwYFERoFBBEZBAMRGAMCERcCAREWAREV2zxXEF8PwcIAAnAC+GxR+EFvJBAjXwPbPFYUVhRWFFYUVhRWFFYUVhRWFFYUVhRWFFYUVhRWFFYUVhRWFFYUVhRWFBEUESkRFBETESgRExESEScREhERESYREREQESUREA8RJA8OESMODREiDQwRIQwLESALChEfCgkRHgkIER0IBxEcBwYRGwbLwwP4BREaBQQRGQQDERgDAhEXAgERFgERFds8VxBfD2xR+EFvJBAjXwPbPFYUVhRWFFYUVhRWFFYUVhRWFFYUVhRWFFYUVhRWFFYUVhRWFFYUVhRWFBEUESkRFBETESgRExESEScREhERESYREREQESUREA8RJA8OESMODREiDcTLxQBEgvBWKvNm959XIUammEE5rjk7x3nuPwg0La2s6/pjT+VX6wP0DBEhDAsRIAsKER8KCREeCQgRHQgHERwHBhEbBgURGgUEERkEAxEYAwIRFwIBERYBERXbPFcQXw9sUfhBbyQQI18D2zxWFFYUVhRWFFYUVhRWFFYUVhRWFFYUVhRWFFYUVhRWFFYUVhRWFFYUVhQRFBEpERQRExEoERPGy8cARILw4c2v0Uq4umxyEVcC01kO5yZDA/jN4HOarXYxZctkqDcD/BESEScREhERESYREREQESUREA8RJA8OESMODREiDQwRIQwLESALChEfCgkRHgkIER0IBxEcBwYRGwYFERoFBBEZBAMRGAMCERcCAREWAREV2zxXEF8PbFH4QW8kECNfA9s8VhRWFFYUVhRWFFYUVhRWFFYUVhRWFFYUVhRWFMjLyQBEgvCcZV+OcLdnywbm2lLYez5PouT6C0DZ/yyoZ/OjeYheOwL4VhRWFFYUVhRWFFYUVhQRFBEpERQRExEoERMREhEnERIREREmEREREBElERAPESQPDhEjDg0RIg0MESEMCxEgCwoRHwoJER4JCBEdCAcRHAcGERsGBREaBQQRGQQDERgDAhEXAgERFgERFds8VxBfD2xR+EFvJBAjXwPbPMrLAESC8GrWSgcdThKnHdVZ7YGQMfzfU/1AjDF2fnQTuqDhAAjAAsorgQEBI1n0DW+hkjBt3yBukjBtjifQ9AT6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIEmwSbwLiIG7jACBu8tCAbyKBAQtQA39xIW6VW1n0WTCYyAHPAEEz9EHigQEBAszNAN4wbYEBCyJ/cSFulVtZ9FkwmMgBzwBBM/RB4vhBbyQQI18DbwKBAQEhIG6SMG2OLCBu8tCAbyLIWQL0AAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxbJ4iQQPwEgbpUwWfRaMJRBM/QV4gwAbshZAvQAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFskQPBIgbpUwWfRaMJRBM/QV4gk=');
    const __system = Cell.fromBase64('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ESUREA8RJA8OESMODREiDQwRIQwLESALChEfCgkRHgkIER0IBxEcBwYRGwYAUwJEBREaBQQRGQQDERgDAhEXAgERFgERFds8VxBfD2xR2zx/OADDAKoB8FYUVhRWFFYUVhRWFFYUVhRWFFYUVhRWFFYUVhRWFFYUVhRWFFYUVhRWFBEUESkRFBETESgRExESEScREhERESYREREQESUREA8RJA8OESMODREiDQwRIQwLESALChEfCgkRHgkIER0IBxEcBwYRGwYFERoFBBEZBABVA3YDERgDAhEXAgERFgERFds8VxBfD2xR2zyBWgERE8IAARETAfL0+EFvJBAjXwNwgwZ/VSBtbW3bPHAREgDCAKoBDAFwMNMfAYIQ9iwM8bry4IGBAQHXAPpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgSbBLbPH8AVwHyK4EBASNZ9A1voZIwbd8gbpIwbY4n0PQE+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiBJsEm8C4oFU5SFus/L0IG7y0IBvIjCBAQECyFkC9AABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WyRA8EgBYAB4gbpUwWfRaMJRBM/QV4gkC7BEUERYRFBETERURExESERYREhERERUREREQERYREA8RFQ8OERYODREVDQwRFgwLERULChEWCgkRFQkIERYIBxEVBwYRFgYFERUFBBEWBAMRFQMCERYCAREVAREW2zwRFBEWERQRExEVERMREhEUERIRERETEREAYwBaASgREBESERAPEREPDhEQDhDfVRzbPABbAuwRFBEWERQRExEVERMREhEWERIREREVEREREBEWERAPERUPDhEWDg0RFQ0MERYMCxEVCwoRFgoJERUJCBEWCAcRFQcGERYGBREVBQQRFgQDERUDAhEWAgERFQERFlYV2zyBbD34QW8kECNfAxLHBfL0KYEBAVYXAGIAXAG8WfQNb6GSMG3fIG6SMG2OJ9D0BPpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgSbBJvAuIgbvLQgG8igQELAREZcHEhbpVbWfRZMJjIAc8AQTP0QeKBAQERGABhAuwRFBEWERQRExEVERMREhEWERIREREVEREREBEWERAPERUPDhEWDg0RFQ0MERYMCxEVCwoRFgoJERUJCBEWCAcRFQcGERYGBREVBQQRFgQDERUDAhEWAgERFQERFts8ERQRFhEUERMRFRETERIRFBESERERExERAGMAXgEoERAREhEQDxERDw4REA4Q31Uc2zwAXwLuERQRFhEUERMRFRETERIRFhESERERFRERERARFhEQDxEVDw4RFg4NERUNDBEWDAsRFQsKERYKCREVCQgRFggHERUHBhEWBgURFQUEERYEAxEVAwIRFgIBERUBERZWFds8ggCFJvhBbyQQI18DEscF8vQpgQEBVhcAYgBgAbxZ9A1voZIwbd8gbpIwbY4n0PQE+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiBJsEm8C4iBu8tCAbyKBAQsBERl/cSFulVtZ9FkwmMgBzwBBM/RB4oEBAREYAGEA3shZAvQAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFskQOgIRFwIBERYBIG6VMFn0WjCUQTP0FeIREhEUERIRERETEREREBESERAPEREPDhEQDhDfEM4QvRCsEJsQigkQaBBXEEYQNUQwEgCagQEBKwJZ9A1voZIwbd8gbpIwbY4n0PQE+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiBJsEm8C4oFU5SFus/L0IG7y0IBvIjEC3ikRExEVERMREhEUERIREREVEREREBEUERAPERUPDhEUDg0RFQ0MERQMCxEVCwoRFAoJERUJCBEUCAcRFQcGERQGBREVBQQRFAQDERUDAhEUAgERFQERFIEBAREW2zwCERYCAREXAVn0DW+hkjBt3wDGAGQB+iBukjBtjifQ9AT6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIEmwSbwLiggDTByFus/L0IG7y0IBvIjCBAQv4QW8kECNfA3FBM/QKb6GUAdcAMJJbbeKCANMHIW6zmAEgbvLQgMD/kjFw4vL0ERIRFBESERERExERAGUAIBEQERIREA8REQ8OERAOVR0BUDDTHwGCEJRqmLa68uCB0z8BMcgBghCv+Q9XWMsfyz/J+EIBcG3bPH8BBQHwVhZWFlYWVhZWFlYWVhZWFlYWVhZWFlYWVhZWFlYWVhZWFlYWVhZWFlYWERQRKxEUERMRKhETERIRKRESERERKBERERARJxEQDxEmDw4RJQ4NESQNDBEjDAsRIgsKESEKCREgCQgRHwgHER4HBhEdBgURHAUEERsEAGgD/AMRGgMCERkCAREYAREX2zxXEF8PbFERFREXERURFBEWERQRExEXERMREhEWERIREREXEREREBEWERAPERcPDhEWDg0RFw0MERYMCxEXCwoRFgoJERcJCBEWCAcRFwcGERYGBREXBQQRFgQDERcDAhEWAgERFwHbPBEUERYRFADKAKoAaQFIERMRFRETERIRFBESERERExERERAREhEQDxERDw4REA5VHds8AGoA6i6BAQEjWfQNb6GSMG3fIG6SMG2X0PQEATFvAeKBON4hbrPy9CBu8tCAbyGBAQFtIG6SMG2OEiBu8tCAbyLIWQL0AIEBAc8AyeJBMCBulTBZ9FowlEEz9BXigQEBAcgBAfQAyRA/EiBulTBZ9FowlEEz9BXiDAH0XwNWFFYUVhRWFFYUVhRWFFYUVhRWFFYUVhRWFFYUVhRWFFYUVhRWFFYUVhQRFBEpERQRExEoERMREhEnERIREREmEREREBElERAPESQPDhEjDg0RIg0MESEMCxEgCwoRHwoJER4JCBEdCAcRHAcGERsGBREaBQQRGQQAbAIwAxEYAwIRFwIBERYBERXbPFcQXw9sUds8AMoAqgHwVhtWG1YbVhtWG1YbVhtWG1YbVhtWG1YbVhtWG1YbVhtWG1YbVhtWG1YbERQRMBEUERMRLxETERIRLhESERERLRERERARLBEQDxErDw4RKg4NESkNDBEoDAsRJwsKESYKCRElCQgRJAgHESMHBhEiBgURIQUEESAEAG4D/AMRHwMCER4CAREdAREc2zxXEF8PbFERFREcERURFBEbERQRExEaERMREhEZERIREREYEREREBEXERAPERYPDhEcDg0RGw0MERoMCxEZCwoRGAoJERcJCBEWCAcRHAcGERsGBREaBQQRGQQDERgDAhEXAgERFgHbPBEUERsRFADKAKoAbwF4ERMRGhETERIRGRESERERGBERERARFxEQDxEWDw4RFQ4NERQNDBETDAsREgsKEREKCREQCRCPEH5VZts8AHAB7lYSgQEBKFn0DW+hkjBt3yBukjBtl9D0BAExbwHiIG6UMG1vAd4gbvLQgG8hIIEBAShZ9A1voZIwbd8gbpIwbZfQ9AQBMW8B4iBulDBtbwHeIG7y0IBvIVUigQEBBshVMEQ0AvQAgQEBzwACAvQAgQEBzwDJQzAUAHEAiCBulTBZ9FowlEEz9BXigQEBAcgBAfQAyUEwIG6VMFn0WjCUQTP0FeKBAQEByAEB9ADJED4SIG6VMFn0WjCUQTP0FeILAfBWGFYYVhhWGFYYVhhWGFYYVhhWGFYYVhhWGFYYVhhWGFYYVhhWGFYYVhgRFBEtERQRExEsERMREhErERIREREqEREREBEpERAPESgPDhEnDg0RJg0MESUMCxEkCwoRIwoJESIJCBEhCAcRIAcGER8GBREeBQQRHQQAcwP8AxEcAwIRGwIBERoBERnbPFcQXw9sUREVERkRFREUERgRFBETERcRExESERYREhERERkREREQERgREA8RFw8OERYODREZDQwRGAwLERcLChEWCgkRGQkIERgIBxEXBwYRFgYFERkFBBEYBAMRFwMCERYCAREZAds8ERQRGBEUAMoAqgB0AVgRExEXERMREhEWERIREREVEREREBEUERAPERMPDhESDg0REQ0MERAMVTvbPAB1ANBWEIEBASVZ9A1voZIwbd8gbpIwbZfQ9AQBMW8B4iBulDBtbwHeIG7y0IBvIQKBAQECyFkC9ACBAQHPAMlBMCBulTBZ9FowlEEz9BXigQEBAcgBAfQAyRA/EiBulTBZ9FowlEEz9BXiDAEwMNMfAYIQw6W94rry4IGBAQHXAAEx2zx/AHcB8FYVVhVWFVYVVhVWFVYVVhVWFVYVVhVWFVYVVhVWFVYVVhVWFVYVVhVWFREUESoRFBETESkRExESESgREhEREScREREQESYREA8RJQ8OESQODREjDQwRIgwLESELChEgCgkRHwkIER4IBxEdBwYRHAYFERsFBBEaBAB4A/4DERkDAhEYAgERFwERFts8VxBfD2xRERURFhEVERQRFhEUERMRFhETERIRFhESERERFhERERARFhEQDxEWDw4RFg4NERYNDBEWDAsRFgsKERYKCREWCQgRFggHERYHBhEWBgURFgUEERYEAxEWAwIRFgIBERYB2zwwgQEBAREVAMoAqgB5AJ5tIG6VMFn0WjCUQTP0FOIRE6UgqgBzqQSkERMRFBETERIRExESEREREhERERAREREQDxEQDxDvEN4QzRC8EKsQmhCJEHgQZxBWEEUQNBAjAfBWFlYWVhZWFlYWVhZWFlYWVhZWFlYWVhZWFlYWVhZWFlYWVhZWFlYWVhYRFBErERQRExEqERMREhEpERIREREoEREREBEnERAPESYPDhElDg0RJA0MESMMCxEiCwoRIQoJESAJCBEfCAcRHgcGER0GBREcBQQRGwQAewP8AxEaAwIRGQIBERgBERfbPFcQXw9sUREVERcRFREUERYRFBETERcRExESERYREhERERcREREQERYREA8RFw8OERYODREXDQwRFgwLERcLChEWCgkRFwkIERYIBxEXBwYRFgYFERcFBBEWBAMRFwMCERYCAREXAds8MBKBAQECAMoAqgB8AKQBERUBERYgbpUwWfRaMJRBM/QU4hESpCCqAHOpBKQREhEUERIRERETEREREBESERAPEREPDhEQDhDfEM4QvRCsEJsQihB5EGgQVxBGEDUQJBAjAfBWFVYVVhVWFVYVVhVWFVYVVhVWFVYVVhVWFVYVVhVWFVYVVhVWFVYVVhURFBEqERQRExEpERMREhEoERIREREnEREREBEmERAPESUPDhEkDg0RIw0MESIMCxEhCwoRIAoJER8JCBEeCAcRHQcGERwGBREbBQQRGgQAfgP8AxEZAwIRGAIBERcBERbbPFcQXw9sUREVERYRFREUERYRFBETERYRExESERYREhERERYREREQERYREA8RFg8OERYODREWDQwRFgwLERYLChEWCgkRFgkIERYIBxEWBwYRFgYFERYFBBEWBAMRFgMCERYCAREWAds8ERQRFREUAMQAqgB/AD4RExEUERMREhETERIRERESEREREBERERAPERAPVQ41AfBWFVYVVhVWFVYVVhVWFVYVVhVWFVYVVhVWFVYVVhVWFVYVVhVWFVYVVhURFBEqERQRExEpERMREhEoERIREREnEREREBEmERAPESUPDhEkDg0RIw0MESIMCxEhCwoRIAoJER8JCBEeCAcRHQcGERwGBREbBQQRGgQAgQP+AxEZAwIRGAIBERcBERbbPFcQXw9sUREVERYRFREUERYRFBETERYRExESERYREhERERYREREQERYREA8RFg8OERYODREWDQwRFgwLERYLChEWCgkRFgkIERYIBxEWBwYRFgYFERYFBBEWBAMRFgMCERYCAREWAds8NRETERQREwDEAKoAggBYERIRExESEREREhERERAREREQDxEQDxDvEN4QzRC8EKsQmhCJEHgQZxBWVQMB8FYVVhVWFVYVVhVWFVYVVhVWFVYVVhVWFVYVVhVWFVYVVhVWFVYVVhVWFREUESoRFBETESkRExESESgREhEREScREREQESYREA8RJQ8OESQODREjDQwRIgwLESELChEgCgkRHwkIER4IBxEdBwYRHAYFERsFBBEaBACEA/wDERkDAhEYAgERFwERFts8VxBfD2xRERURFhEVERQRFhEUERMRFhETERIRFhESERERFhERERARFhEQDxEWDw4RFg4NERYNDBEWDAsRFgsKERYKCREWCQgRFggHERYHBhEWBgURFgUEERYEAxEWAwIRFgIBERYB2zwRFBEVERQAxACqAIUAPhETERQRExESERMREhERERIREREQEREREA8REA9VDjQB8FYWVhZWFlYWVhZWFlYWVhZWFlYWVhZWFlYWVhZWFlYWVhZWFlYWVhZWFhEUESsRFBETESoRExESESkREhERESgREREQEScREA8RJg8OESUODREkDQwRIwwLESILChEhCgkRIAkIER8IBxEeBwYRHQYFERwFBBEbBACHA/4DERoDAhEZAgERGAERF9s8VxBfD2xRERURFxEVERQRFhEUERMRFxETERIRFhESERERFxERERARFhEQDxEXDw4RFg4NERcNDBEWDAsRFwsKERYKCREXCQgRFggHERcHBhEWBgURFwUEERYEAxEXAwIRFgIBERcB2zyBAQEgEEoTAMQAqgCIAJYCERcCAREYASFulVtZ9FowmMgBzwBBM/RC4hESERQREhERERMREREQERIREA8REQ8OERAOEN8QzhC9EKwQmxCKEHkIEFcQRhA1RAMB9hEUER4RFBETER0RExESERwREhERERsREREQERoREA8RGQ8OERgODREXDQwRFgwLERULChEeCgkRHQkIERwIBxEbBwYRGgYFERkFBBEYBAMRFwMCERYCAREVAREegU1QKLPy9FYUVhRWFFYUVhRWFFYUVhRWFFYUVhRWFACKA/pWFFYUVhRWFFYUVhRWFFYUVhQRFBEpERQRExEoERMREhEnERIREREmEREREBElERAPESQPDhEjDg0RIg0MESEMCxEgCwoRHwoJER4JCBEdCAcRHAcGERsGBREaBQQRGQQDERgDAhEXAgERFgERFds8VxBfD2xR2zyBZoxWEADFAKoAiwP8gQEBVhhZ9A1voZIwbd8gbpIwbY6H0Ns8bBZvBuJu8vRWGtDS/zBWGtDS/zARH1YeVh5WHlYeVh7IVVDbPMn5ABEWERcRFhEVERYRFREUERURFBETERQRExESERMREhERERIREREQEREREA8REA8Q7xDeEM0QvBCrEJoQiRB4AKEAoACMBPYQZxBWEEUQNEATAREZAREY2zwRFBEWERQRExEVERMREhEUERIRERETEREREBESERAPEREPDhEQDhDfVRwRHFYXVhvbPAURGwUEERgEAxEXAwIRFgIBERkBERVVQIEBAQbIVVDbPMkQK1YWASBulTBZ9FowlEEz9BXiERQAnwCPAI4AjQCSyAGCELmF1opYyx+BAQHPAMnIgljAAAAAAAAAAAAAAAABActnzMlw+wANERQNDBETDAsREgsKEREKCREQCRDPEH5VZhYVEDRBMABWUFbL/1AD+gLMzMs/ASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFgPuERURGBEVERQRFxEUERMRFhETERIRGBESERERFxERERARFhEQDxEYDw4RFw4NERYNDBEYDAsRFwsKERYKCREYCQgRFwgHERYHBhEYBgURFwUEERYEAxEYAwIRFwIBERYBERhWF9s8cAGK5FtXFVcVVxUREREUEREAngCRAJAALBEQERMREA8REg8OEREODREQDRDPVSsCkoEBAVRSAFIwQTP0DG+hlAHXADCSW23iIG7y0IAgwAbjDxEUERYRFBETERURExESERQREhERERMREREQERIREA8REQ8OERAOVR0AlgCSAv7AAo7iERQRFhEUERMRFRETERIRFhESERERFRERERARFhEQDxEVDw4RFg4NERUNDBEWDAsRFQsKERYKCREVCQgRFggHERUHBhEWBgURFQUEERYEAxEVAwIRFgIBERUBERZWF1YaVhqOF6QRFgERFQERFAEREwEREgEREQEREFXRAJQAkwAC4gOkgQEBVhECWfQNb6GSMG3fIG6SMG2Oh9DbPGwXbwfiggC/zCFus/L0IG7y0IBvJxBWXwb4KG1wyMnQEDUQRshVUNs8yYIQBMS0AH9wUAQDbW3bPACZAJUBDADIghCJtx0JUAfLH1AFINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WUAMg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxaBAQHPACFus5V/AcoAzJRwMsoA4gH6AgHPFgPKMBEUERYRFBETERURExESERYREhERERUREREQERYREA8RFQ8OERYODREVDQwRFgwLERULChEWCgkRFQkIERYIBxEVBwYRFgYFERUFBBEWBAMRFQMCERYCAREVAREW2zxWGQG64w8AnQCbAJcDuFYXVhpWGoEBAVYRAln0DW+hkjBt3yBukjBtjofQ2zxsF28H4oEQISFus/L0IG7y0IBvJ2xh+EFvJBAjXwNtcMjJ0CEQV1VQyFVg2zzJghAKupUAf3BQBANtbds8AJkAmAEMAMiCEA+KfqVQCMsfFss/UAT6Algg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxYBINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WIW6zlX8BygDMlHAyygDiAfoCAc8WAfbUAdAB+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiAH6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIAdMHgQEB1wDUAdCBAQHXAPpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgxECcQJhAlECQAmgAEECMCXlYXVhqBaxv4J28Q+EFvJBNfA6FTKKC88vRTBqABERQBoRETJqCIEn9wRARtbds8AJwBDAA6AAAAAEZyb20gRW1tZXQuRmluYW5jZSBCcmlkZ2UABFYTALiBAQFUTxNZ9A1voZIwbd8gbpIwbZfQ9AQBMW8B4oE43iFus/L0IG7y0IBvIYEBAVhZ9A1voZIwbd8gbpIwbZ3Q9ASBAQHXAFlsEm8C4oFhZCFus/L0IG7y0IBvIgCscAGORyGBAQEiWfQNb6GSMG3fIG6SMG2c0NQB0AHT/1lsEm8C4iBu8tCAbyIngQEBIln0DG+hkjBt326zmyRZ+RCBP9YB8vSkkVvi5DGCALdWMiK+8vQAaIIQ+XWJolAHyx8Vyz8Tyz8B+gLMzAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxYAWNP/+gDU1NM/+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiBYVFEMwAHLTHwGCEPl1iaK68uCB0z/TP/oA1NT6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIFhUUQzAB8FYVVhVWFVYVVhVWFVYVVhVWFVYVVhVWFVYVVhVWFVYVVhVWFVYVVhVWFREUESoRFBETESkRExESESgREhEREScREREQESYREA8RJQ8OESQODREjDQwRIgwLESELChEgCgkRHwkIER4IBxEdBwYRHAYFERsFBBEaBACkA/gDERkDAhEYAgERFwERFts8VxBfD2xRERURFhEVERQRFhEUERMRFhETERIRFhESERERFhERERARFhEQDxEWDw4RFg4NERYNDBEWDAsRFgsKERYKCREWCQgRFggHERYHBhEWBgURFgUEERYEAxEWAwIRFgIBERYB2zyBAQFtAMQAqgClAbwgbpIwbY6NIG7y0IBvJ8hVYNs8yeIQPxIBERcBIG6VMFn0WjCUQTP0FeIRExEUERMREhETERIRERESEREREBERERAPERAPEO8NDhC8EKsQmhCJEHgQZxBWEEUQNEEwAKkB8FYcVhxWHFYcVhxWHFYcVhxWHFYcVhxWHFYcVhxWHFYcVhxWHFYcVhxWHBEUETERFBETETARExESES8REhERES4REREQES0REA8RLA8OESsODREqDQwRKQwLESgLChEnCgkRJgkIESUIBxEkBwYRIwYFESIFBBEhBACnA/wDESADAhEfAgERHgERHds8VxBfD2xRERURHREVERQRHBEUERMRGxETERIRGhESERERGRERERARGBEQDxEXDw4RFg4NER0NDBEcDAsRGwsKERoKCREZCQgRGAgHERcHBhEWBgURHQUEERwEAxEbAwIRGgIBERkB2zwRFBEcERQAxACqAKgB0BETERsRExESERoREhERERkREREQERgREA8RFw8OERYODREVDQwRFAwLERMLChESCgkREQkIERAIVXcQZxBWEEVDMBBWEEYHgQEBCBYVQzDIVWDbPMkDERADIG6VMFn0WjCUQTP0FeINAKkA8MhQB88WyVAHzFAEINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WWCDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFssHgQEBzwACyIEBAc8AASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFskBzALyggDE7fhBbyQQI18DERYRFxEWERURFxEVERQRFxEUERMRFxETERIRFxESERERFxERERARFxEQDxEXDw4RFw4NERcNDBEXDAsRFwsKERcKCREXCQgRFwgHERcHBhEXBgURFwUEERcEAxEXAwIRFwIBERfbPAERFgHy9ACsAKsAPBETERQRExESERMREhERERIREREQEREREA8REA9VDgDUgQEBLAJZ9A1voZIwbd8gbpIwbY4n0PQE+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiBJsEm8C4iBukltw4CBu8tCAbyIwgQELWHFBM/QKb6GUAdcAMJJbbeIgbpIwcOAgbvLQgAHK0x8BghBLN8YhuvLggYEBAdcA1AHQAfpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgB0weBAQHXANQB0IEBAdcA+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiAEArgBU+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiDEQOBA3EDYQNRA0AfQRFBEZERQRExEYERMREhEXERIREREWEREREBEVERAPERkPDhEYDg0RFw0MERYMCxEVCwoRGQoJERgJCBEXCAcRFgcGERUGBREZBQQRGAQDERcDAhEWAgERFQERGYFNUCiz8vQRFKRWGQMCERcCIVYaAgERGAERGloVFACwAvpUdUNUdUPIVVDbPMn5AIEBAVMNAxEfAUEz9AxvoZQB1wAwkltt4oIAxEUhbrPy9IIA97X4QW8kE18DAiBu8tCAVh+gKaASvvL0ERURGBEVERQRFhEUERMRGBETERIRFhESERERGBERERARFhEQDxEYDw4RFg4NERgNDBEWDAC4ALEC/AsRGAsKERYKCREYCQgRFggHERgHBhEWBgURGAUEERYEAxEaAwIRGQIBERcBERyBQ174QW8kE18DIr7y9BESVhKgARETARESoBESBBEXBAMRFQMCERkCAREYAREWgQEBERzIVVDbPMkQKgERFwFWFgEgbpUwWfRaMJRBM/QV4gC4ALIApBEUyAGCEGZkCeVYyx+BAQHPAMnIgljAAAAAAAAAAAAAAAABActnzMlw+wANERQNDBETDAsREgsKEREKCREQCRCPEM4QbRBcEEsQOkkXBkSFUDMB9jVfA4IAimf4QW8kECNfAyrHBfL0ERQRFhEUERMRFRETERIRFhESERERFRERERARFhEQDxEVDw4RFg4NERUNDBEWDAsRFQsKERYKCREVCQgRFggHERUHBhEWBgURFQUEERYEAxEVAwIRFgIBERUBERaBTVAos/L0ERXTPwC0A/qBAQFUWgBSQEEz9AxvoZQB1wAwkltt4oIAxEUhbrPy9IIA97X4QW8kE18DAiBu8tCAJ6ASvvL0ERWkERXU1NQwBBEZBBNWF1AzWhUUVHVDVHVDyFVQ2zzJ+QAQRhA1RlaBAQEGyFVQ2zzJEC9S8CBulTBZ9FowlEEz9BXiDQC4ALgAtwHiMTIRFBEWERQRExEVERMREhEWERIREREVEREREBEWERAPERUPDhEWDg0RFQ0MERYMCxEVCwoRFgoJERUJCBEWCAcRFQcGERYGBREVBQQRFgQDERUDAhEWAgERFQERFoFNUCiz8vQRFdM/gQEBVFoAUkAAtgPqQTP0DG+hlAHXADCSW23iggDERSFus/L0ggD3tfhBbyQTXwMCIG7y0IAnoBK+8vQRFaQRFdTU1DAEERkEE1YXUDNaFRRUdUNUdUPIVVDbPMn5ABBGEDVGVoEBAQbIVVDbPMkQL1LwIG6VMFn0WjCUQTP0FeINALgAuAC3AI7IAYIQZmQJ5VjLH4EBAc8AyciCWMAAAAAAAAAAAAAAAAEBy2fMyXD7ABESERQREhERERMREREQERIREA8REQ8OERAOEN9VHAAaUFbL/1AD+gLMzMzLPwOE7UTQ1AH4Y9IAAY6i2zxXFRETERQRExESERMREhERERIREREQEREREA8REA9VDuD4KNcLCoMJuvLgids8CNFVBts8AMwAywC6AfZtbW1tbW1tbXBwUxH4QW8kECNfAxVxgQEBAgEREAEPIG6VMFn0WjCUQTP0FOJT01YUU0dWGFYRVhFWEVYRVhFWF1YSVhJWEFYgViBWIFYgVhNWIVYUERQRGREUERMRKBETERIRFxESERERGhERERARKREQDxEhDw4RIA4AuwP8DREfDQwRHgwLER0LChEiCgkRHAkIERsIBxEYBwYRJwYFESYFBBElBAMRJAMCERYCAREjAREV2zxXEF8PbFH4QW8kECNfAwYRFgYEERQEBxETBwYREgYOEREODREQDRDPEL4QrRCbEIoQWRBIEDTbPFYUVhRWFFYUVhRWFFYUAMoAxwC8AvxWFFYUVhRWFFYUVhRWFFYUVhRWFFYUVhRWFFYUERQRKREUERMRKBETERIRJxESERERJhERERARJREQDxEkDw4RIw4NESINDBEhDAsRIAsKER8KCREeCQgRHQgHERwHBhEbBgURGgUEERkEAxEYAwIRFwIBERYBERXbPFcQXw8AxgC9AvhsUfhBbyQQI18D2zxWFFYUVhRWFFYUVhRWFFYUVhRWFFYUVhRWFFYUVhRWFFYUVhRWFFYUVhQRFBEpERQRExEoERMREhEnERIREREmEREREBElERAPESQPDhEjDg0RIg0MESEMCxEgCwoRHwoJER4JCBEdCAcRHAcGERsGAMcAvgP4BREaBQQRGQQDERgDAhEXAgERFgERFds8VxBfD2xR+EFvJBAjXwPbPFYUVhRWFFYUVhRWFFYUVhRWFFYUVhRWFFYUVhRWFFYUVhRWFFYUVhRWFBEUESkRFBETESgRExESEScREhERESYREREQESUREA8RJA8OESMODREiDQDFAMcAvwP0DBEhDAsRIAsKER8KCREeCQgRHQgHERwHBhEbBgURGgUEERkEAxEYAwIRFwIBERYBERXbPFcQXw9sUfhBbyQQI18D2zxWFFYUVhRWFFYUVhRWFFYUVhRWFFYUVhRWFFYUVhRWFFYUVhRWFFYUVhQRFBEpERQRExEoERMAxADHAMAD/BESEScREhERESYREREQESUREA8RJA8OESMODREiDQwRIQwLESALChEfCgkRHgkIER0IBxEcBwYRGwYFERoFBBEZBAMRGAMCERcCAREWAREV2zxXEF8PbFH4QW8kECNfA9s8VhRWFFYUVhRWFFYUVhRWFFYUVhRWFFYUVhRWFADDAMcAwQL4VhRWFFYUVhRWFFYUVhQRFBEpERQRExEoERMREhEnERIREREmEREREBElERAPESQPDhEjDg0RIg0MESEMCxEgCwoRHwoJER4JCBEdCAcRHAcGERsGBREaBQQRGQQDERgDAhEXAgERFgERFds8VxBfD2xR+EFvJBAjXwPbPADCAMcARILwatZKBx1OEqcd1VntgZAx/N9T/UCMMXZ+dBO6oOEACMAARILwnGVfjnC3Z8sG5tpS2Hs+T6Lk+gtA2f8sqGfzo3mIXjsARILw4c2v0Uq4umxyEVcC01kO5yZDA/jN4HOarXYxZctkqDcARILwVirzZvefVyFGpphBOa45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');
    let builder = beginCell();
    builder.storeRef(__system);
    builder.storeUint(0, 1);
    initBridge_init_args({ $$type: 'Bridge_init_args', chain_nonce, native_coin, burner, base_uri, transfer_fee, protocol_fee, bootstrap_validator_key, bootstrap_validator_address })(builder);
    const __data = builder.endCell();
    return { code: __code, data: __data };
}

const Bridge_errors: { [key: number]: { message: string } } = {
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
    2296: { message: `JettonWallet: Only Jetton master or Jetton wallet can call this function` },
    2927: { message: `AccessControl: Role ID doesn't exist` },
    4129: { message: `Invalid native token id provided` },
    6936: { message: `Unsupported from_token for cross chain token strategy storage` },
    7947: { message: `AccessControl: BadConfirmation` },
    9739: { message: `Sender is not a Jetton wallet` },
    13105: { message: `JettonWallet: Not enough jettons to transfer` },
    14558: { message: `Unsupported incoming token strategy for from_token` },
    16342: { message: `Invalid Signature Provided` },
    17246: { message: `Insufficient funds Provided` },
    17773: { message: `JettonMaster: Mint can only be performed by owner` },
    19792: { message: `Contract is paused` },
    21733: { message: `AccessControl: Role doesn't exist` },
    23041: { message: `No fees to withdraw` },
    24932: { message: `Unsupported incoming token strategy for from_token to target_token` },
    26252: { message: `Transaction already submitted` },
    27419: { message: `Insufficient Funds` },
    27709: { message: `AccessControl: Sender Cannot Revoke this Role. Not a Role Admin` },
    27831: { message: `Only owner can call this function` },
    27954: { message: `JettonMaster: Only Admin can set new owner.` },
    29133: { message: `JettonWallet: Not allow negative balance after internal transfer` },
    29944: { message: `Pausable: Contract is already unpaused` },
    30061: { message: `JettonMaster: Jetton is not mintable` },
    33124: { message: `Unsupported to chain for cross chain token strategy storage` },
    34086: { message: `AccessControl: Sender Cannot Grant this Role. Not a Role Admin` },
    35431: { message: `Only Burner Can Call this Method` },
    35462: { message: `JettonMaster: Only Admin can set new admin.` },
    37185: { message: `Not enough funds to transfer` },
    42526: { message: `Unsupported target_token for cross chain token strategy storage` },
    43365: { message: `JettonMaster: Sender is not a Jetton owner` },
    46934: { message: `Threshold not reached.` },
    47048: { message: `JettonWallet: Only owner can burn tokens` },
    49100: { message: `Invalid wrapped token id provided` },
    50157: { message: `Previously Processed Transaction.` },
    50245: { message: `Fees not configured for this chain` },
    50413: { message: `AccessControl: Doesnt have the role` },
    54023: { message: `AccessControl: Doesn't have role` },
    58304: { message: `Pausable: Contract is already paused` },
    59332: { message: `Target chainId cannot equal native or zero` },
    60354: { message: `JettonWallet: Not enough balance to burn tokens` },
    63413: { message: `Insufficient fee coverage.` },
}

const Bridge_types: ABIType[] = [
    { "name": "StateInit", "header": null, "fields": [{ "name": "code", "type": { "kind": "simple", "type": "cell", "optional": false } }, { "name": "data", "type": { "kind": "simple", "type": "cell", "optional": false } }] },
    { "name": "Context", "header": null, "fields": [{ "name": "bounced", "type": { "kind": "simple", "type": "bool", "optional": false } }, { "name": "sender", "type": { "kind": "simple", "type": "address", "optional": false } }, { "name": "value", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "raw", "type": { "kind": "simple", "type": "slice", "optional": false } }] },
    { "name": "SendParameters", "header": null, "fields": [{ "name": "bounce", "type": { "kind": "simple", "type": "bool", "optional": false } }, { "name": "to", "type": { "kind": "simple", "type": "address", "optional": false } }, { "name": "value", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "mode", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "body", "type": { "kind": "simple", "type": "cell", "optional": true } }, { "name": "code", "type": { "kind": "simple", "type": "cell", "optional": true } }, { "name": "data", "type": { "kind": "simple", "type": "cell", "optional": true } }] },
    { "name": "Deploy", "header": 2490013878, "fields": [{ "name": "queryId", "type": { "kind": "simple", "type": "uint", "optional": false, "format": 64 } }] },
    { "name": "DeployOk", "header": 2952335191, "fields": [{ "name": "queryId", "type": { "kind": "simple", "type": "uint", "optional": false, "format": 64 } }] },
    { "name": "FactoryDeploy", "header": 1829761339, "fields": [{ "name": "queryId", "type": { "kind": "simple", "type": "uint", "optional": false, "format": 64 } }, { "name": "cashback", "type": { "kind": "simple", "type": "address", "optional": false } }] },
    { "name": "JettonTransfer", "header": 260734629, "fields": [{ "name": "query_id", "type": { "kind": "simple", "type": "uint", "optional": false, "format": 64 } }, { "name": "amount", "type": { "kind": "simple", "type": "uint", "optional": false, "format": "coins" } }, { "name": "destination", "type": { "kind": "simple", "type": "address", "optional": false } }, { "name": "response_destination", "type": { "kind": "simple", "type": "address", "optional": false } }, { "name": "custom_payload", "type": { "kind": "simple", "type": "cell", "optional": true } }, { "name": "forward_ton_amount", "type": { "kind": "simple", "type": "uint", "optional": false, "format": "coins" } }, { "name": "forward_payload", "type": { "kind": "simple", "type": "slice", "optional": false, "format": "remainder" } }] },
    { "name": "JettonTransferNotification", "header": 1935855772, "fields": [{ "name": "query_id", "type": { "kind": "simple", "type": "uint", "optional": false, "format": 64 } }, { "name": "amount", "type": { "kind": "simple", "type": "uint", "optional": false, "format": "coins" } }, { "name": "sender", "type": { "kind": "simple", "type": "address", "optional": false } }, { "name": "forward_payload", "type": { "kind": "simple", "type": "slice", "optional": false, "format": "remainder" } }] },
    { "name": "JettonBurn", "header": 1499400124, "fields": [{ "name": "query_id", "type": { "kind": "simple", "type": "uint", "optional": false, "format": 64 } }, { "name": "amount", "type": { "kind": "simple", "type": "uint", "optional": false, "format": "coins" } }, { "name": "response_destination", "type": { "kind": "simple", "type": "address", "optional": false } }, { "name": "custom_payload", "type": { "kind": "simple", "type": "cell", "optional": true } }, { "name": "forward_ton_amount", "type": { "kind": "simple", "type": "uint", "optional": false, "format": "coins" } }, { "name": "forward_payload", "type": { "kind": "simple", "type": "slice", "optional": false, "format": "remainder" } }] },
    { "name": "JettonExcesses", "header": 3576854235, "fields": [{ "name": "query_id", "type": { "kind": "simple", "type": "uint", "optional": false, "format": 64 } }] },
    { "name": "JettonInternalTransfer", "header": 395134233, "fields": [{ "name": "query_id", "type": { "kind": "simple", "type": "uint", "optional": false, "format": 64 } }, { "name": "amount", "type": { "kind": "simple", "type": "uint", "optional": false, "format": "coins" } }, { "name": "from", "type": { "kind": "simple", "type": "address", "optional": false } }, { "name": "response_address", "type": { "kind": "simple", "type": "address", "optional": false } }, { "name": "forward_ton_amount", "type": { "kind": "simple", "type": "uint", "optional": false, "format": "coins" } }, { "name": "forward_payload", "type": { "kind": "simple", "type": "slice", "optional": false, "format": "remainder" } }] },
    { "name": "JettonBurnNotification", "header": 2078119902, "fields": [{ "name": "query_id", "type": { "kind": "simple", "type": "uint", "optional": false, "format": 64 } }, { "name": "amount", "type": { "kind": "simple", "type": "uint", "optional": false, "format": "coins" } }, { "name": "sender", "type": { "kind": "simple", "type": "address", "optional": false } }, { "name": "response_destination", "type": { "kind": "simple", "type": "address", "optional": false } }, { "name": "forward_ton_amount", "type": { "kind": "simple", "type": "uint", "optional": false, "format": "coins" } }, { "name": "forward_payload", "type": { "kind": "simple", "type": "slice", "optional": false, "format": "remainder" } }] },
    { "name": "WalletData", "header": null, "fields": [{ "name": "balance", "type": { "kind": "simple", "type": "uint", "optional": false, "format": "coins" } }, { "name": "owner", "type": { "kind": "simple", "type": "address", "optional": false } }, { "name": "jetton", "type": { "kind": "simple", "type": "address", "optional": false } }, { "name": "jetton_wallet_code", "type": { "kind": "simple", "type": "cell", "optional": false } }] },
    { "name": "JettonData", "header": null, "fields": [{ "name": "total_supply", "type": { "kind": "simple", "type": "uint", "optional": false, "format": "coins" } }, { "name": "mintable", "type": { "kind": "simple", "type": "bool", "optional": false } }, { "name": "admin_address", "type": { "kind": "simple", "type": "address", "optional": false } }, { "name": "jetton_content", "type": { "kind": "simple", "type": "cell", "optional": false } }, { "name": "jetton_wallet_code", "type": { "kind": "simple", "type": "cell", "optional": false } }] },
    { "name": "JettonMint", "header": 2310479113, "fields": [{ "name": "origin", "type": { "kind": "simple", "type": "address", "optional": false } }, { "name": "receiver", "type": { "kind": "simple", "type": "address", "optional": false } }, { "name": "amount", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "custom_payload", "type": { "kind": "simple", "type": "cell", "optional": true } }, { "name": "forward_ton_amount", "type": { "kind": "simple", "type": "uint", "optional": false, "format": "coins" } }, { "name": "forward_payload", "type": { "kind": "simple", "type": "slice", "optional": false, "format": "remainder" } }] },
    { "name": "UpdateAdmin", "header": 367316568, "fields": [{ "name": "new_admin", "type": { "kind": "simple", "type": "address", "optional": false } }] },
    { "name": "UpdateOwner", "header": 559076492, "fields": [{ "name": "new_owner", "type": { "kind": "simple", "type": "address", "optional": false } }] },
    { "name": "GrantRole", "header": 174185305, "fields": [{ "name": "to", "type": { "kind": "simple", "type": "address", "optional": false } }, { "name": "role_id", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }] },
    { "name": "RevokeRole", "header": 1363080030, "fields": [{ "name": "to", "type": { "kind": "simple", "type": "address", "optional": false } }, { "name": "role_id", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }] },
    { "name": "RenounceRole", "header": 389201441, "fields": [{ "name": "role_id", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "address", "type": { "kind": "simple", "type": "address", "optional": false } }] },
    { "name": "UpdateRoleAdmin", "header": 4130082033, "fields": [{ "name": "role_id", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "new_admin", "type": { "kind": "simple", "type": "address", "optional": false } }] },
    { "name": "RoleData", "header": null, "fields": [{ "name": "roles", "type": { "kind": "dict", "key": "address", "value": "bool" } }, { "name": "admin_role", "type": { "kind": "simple", "type": "address", "optional": false } }] },
    { "name": "TokenType", "header": null, "fields": [{ "name": "is_native_coin", "type": { "kind": "simple", "type": "bool", "optional": false } }, { "name": "is_native_token", "type": { "kind": "simple", "type": "bool", "optional": false } }, { "name": "is_wrapped_token", "type": { "kind": "simple", "type": "bool", "optional": false } }] },
    { "name": "SentInstallment", "header": 1717832165, "fields": [{ "name": "tx_hash", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }] },
    { "name": "ReceivedInstallment", "header": 3112556170, "fields": [{ "name": "tx_hash", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }] },
    { "name": "Installment", "header": 4185229730, "fields": [{ "name": "from_chain", "type": { "kind": "simple", "type": "uint", "optional": false, "format": 64 } }, { "name": "target_chain", "type": { "kind": "simple", "type": "uint", "optional": false, "format": 64 } }, { "name": "amount", "type": { "kind": "simple", "type": "uint", "optional": false, "format": "coins" } }, { "name": "from_token", "type": { "kind": "simple", "type": "cell", "optional": false } }, { "name": "to_token", "type": { "kind": "simple", "type": "cell", "optional": false } }, { "name": "recepient", "type": { "kind": "simple", "type": "address", "optional": false } }] },
    { "name": "SignerAndSignature", "header": null, "fields": [{ "name": "signature", "type": { "kind": "simple", "type": "slice", "optional": false } }, { "name": "key", "type": { "kind": "simple", "type": "uint", "optional": false, "format": 256 } }] },
    { "name": "ReceiveInstallment", "header": 1032337096, "fields": [{ "name": "installment", "type": { "kind": "simple", "type": "Installment", "optional": false } }, { "name": "signatures", "type": { "kind": "dict", "key": "int", "value": "SignerAndSignature", "valueFormat": "ref" } }, { "name": "len", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "tx_hash", "type": { "kind": "simple", "type": "uint", "optional": false, "format": 256 } }, { "name": "id", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }] },
    { "name": "FreezeTon", "header": 3943853515, "fields": [{ "name": "target_chain", "type": { "kind": "simple", "type": "uint", "optional": false, "format": 64 } }, { "name": "to_token", "type": { "kind": "simple", "type": "cell", "optional": false } }, { "name": "to", "type": { "kind": "simple", "type": "cell", "optional": false } }, { "name": "from_token", "type": { "kind": "simple", "type": "cell", "optional": false } }, { "name": "amount", "type": { "kind": "simple", "type": "uint", "optional": false, "format": "coins" } }] },
    { "name": "MapContract", "header": 1261946401, "fields": [{ "name": "token_id", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "token_symbol", "type": { "kind": "simple", "type": "string", "optional": false } }, { "name": "contract", "type": { "kind": "simple", "type": "address", "optional": false } }, { "name": "decimals", "type": { "kind": "simple", "type": "uint", "optional": false, "format": 8 } }, { "name": "fee", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "fee_decimals", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "swap_address", "type": { "kind": "simple", "type": "address", "optional": false } }, { "name": "token_bridge_wallet_address", "type": { "kind": "simple", "type": "address", "optional": false } }] },
    { "name": "SetChainFee", "header": 1240718718, "fields": [{ "name": "chain_id", "type": { "kind": "simple", "type": "uint", "optional": false, "format": 64 } }, { "name": "fee", "type": { "kind": "simple", "type": "uint", "optional": false, "format": 256 } }] },
    { "name": "OutgoingTransaction", "header": null, "fields": [{ "name": "id", "type": { "kind": "simple", "type": "uint", "optional": false, "format": 256 } }, { "name": "amount", "type": { "kind": "simple", "type": "uint", "optional": false, "format": "coins" } }, { "name": "from_token", "type": { "kind": "simple", "type": "cell", "optional": false } }, { "name": "to_token", "type": { "kind": "simple", "type": "cell", "optional": false } }, { "name": "to", "type": { "kind": "simple", "type": "cell", "optional": false } }, { "name": "target_chain_id", "type": { "kind": "simple", "type": "uint", "optional": false, "format": 64 } }] },
    { "name": "IncomingTransaction", "header": null, "fields": [{ "name": "id", "type": { "kind": "simple", "type": "uint", "optional": false, "format": 256 } }, { "name": "amount", "type": { "kind": "simple", "type": "uint", "optional": false, "format": "coins" } }, { "name": "from_token", "type": { "kind": "simple", "type": "cell", "optional": false } }, { "name": "to_token", "type": { "kind": "simple", "type": "cell", "optional": false } }, { "name": "target_chain_id", "type": { "kind": "simple", "type": "uint", "optional": false, "format": 64 } }, { "name": "to", "type": { "kind": "simple", "type": "address", "optional": false } }] },
    { "name": "InstallmentOut", "header": null, "fields": [{ "name": "amount", "type": { "kind": "simple", "type": "uint", "optional": false, "format": 256 } }, { "name": "to", "type": { "kind": "simple", "type": "string", "optional": false } }, { "name": "target_chain", "type": { "kind": "simple", "type": "uint", "optional": false, "format": 64 } }, { "name": "token_id", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }] },
    { "name": "Token", "header": null, "fields": [{ "name": "symbol", "type": { "kind": "simple", "type": "string", "optional": false } }, { "name": "address", "type": { "kind": "simple", "type": "address", "optional": false } }, { "name": "swap_address", "type": { "kind": "simple", "type": "address", "optional": false } }, { "name": "decimals", "type": { "kind": "simple", "type": "uint", "optional": false, "format": 8 } }, { "name": "fee", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "fee_decimals", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "token_bridge_wallet_address", "type": { "kind": "simple", "type": "address", "optional": false } }] },
    { "name": "UpdateBaseUri", "header": 3032156853, "fields": [{ "name": "new_base_uri", "type": { "kind": "simple", "type": "string", "optional": false } }] },
    { "name": "UpdateTransferFee", "header": 1793030273, "fields": [{ "name": "new_fee", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }] },
    { "name": "RemoveMappedContract", "header": 1790492737, "fields": [{ "name": "token_id", "type": { "kind": "simple", "type": "uint", "optional": false, "format": 256 } }] },
    { "name": "Strategies", "header": null, "fields": [{ "name": "strategies", "type": { "kind": "dict", "key": "int", "value": "Steps", "valueFormat": "ref" } }] },
    { "name": "ToTokenCrossChainStrategy", "header": null, "fields": [{ "name": "to_token", "type": { "kind": "dict", "key": "int", "value": "CrossChainStrategy", "valueFormat": "ref" } }] },
    { "name": "CrossChainTokenStrategy", "header": null, "fields": [{ "name": "from_token", "type": { "kind": "dict", "key": "int", "value": "ToTokenCrossChainStrategy", "valueFormat": "ref" } }] },
    { "name": "TargetTokenToSteps", "header": null, "fields": [{ "name": "i", "type": { "kind": "dict", "key": "int", "value": "Steps", "valueFormat": "ref" } }] },
    { "name": "Steps", "header": null, "fields": [{ "name": "steps", "type": { "kind": "dict", "key": "int", "value": "int" } }, { "name": "size", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }] },
    { "name": "CrossChainStrategy", "header": null, "fields": [{ "name": "local_steps", "type": { "kind": "simple", "type": "Steps", "optional": false } }, { "name": "foreign_steps", "type": { "kind": "simple", "type": "Steps", "optional": false } }] },
    { "name": "TargetTokenToCrossChainStrategy", "header": null, "fields": [{ "name": "i", "type": { "kind": "dict", "key": "int", "value": "CrossChainStrategy", "valueFormat": "ref" } }] },
    { "name": "FromTokenToTargetTokenToCrossChainStrategy", "header": null, "fields": [{ "name": "i", "type": { "kind": "dict", "key": "int", "value": "TargetTokenToCrossChainStrategy", "valueFormat": "ref" } }] },
    { "name": "UpdateProtocolFee", "header": 865129320, "fields": [{ "name": "new_fee", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }] },
    { "name": "AddValidator", "header": 2513894818, "fields": [{ "name": "key", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "address", "type": { "kind": "simple", "type": "address", "optional": false } }] },
    { "name": "RemoveValidator", "header": 3282419170, "fields": [{ "name": "key", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }] },
    { "name": "SetIncomingStrategy", "header": 2745641556, "fields": [{ "name": "from_token", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "target_token", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "steps", "type": { "kind": "simple", "type": "Steps", "optional": false } }] },
    { "name": "SetCrossChainStrategy", "header": 1825931216, "fields": [{ "name": "target_chain", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "from_token", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "target_token", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "local_steps", "type": { "kind": "simple", "type": "Steps", "optional": false } }, { "name": "foreign_steps", "type": { "kind": "simple", "type": "Steps", "optional": false } }] },
    { "name": "RemoveInternalStrategy", "header": 3020212274, "fields": [{ "name": "from_token", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "target_token", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }] },
    { "name": "RemoveCrossChainStrategy", "header": 207130758, "fields": [{ "name": "target_chain", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "from_token", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "target_token", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }] },
]

const Bridge_getters: ABIGetter[] = [
    { "name": "withdrawer_role_id", "arguments": [], "returnType": { "kind": "simple", "type": "int", "optional": false, "format": 257 } },
    { "name": "pauser_role_id", "arguments": [], "returnType": { "kind": "simple", "type": "int", "optional": false, "format": 257 } },
    { "name": "mapping_admin_role_id", "arguments": [], "returnType": { "kind": "simple", "type": "int", "optional": false, "format": 257 } },
    { "name": "bridge_validator_role_id", "arguments": [], "returnType": { "kind": "simple", "type": "int", "optional": false, "format": 257 } },
    { "name": "manager_role_id", "arguments": [], "returnType": { "kind": "simple", "type": "int", "optional": false, "format": 257 } },
    { "name": "base_uri", "arguments": [], "returnType": { "kind": "simple", "type": "string", "optional": false } },
    { "name": "protocol_fee", "arguments": [], "returnType": { "kind": "simple", "type": "int", "optional": false, "format": 257 } },
    { "name": "nonce", "arguments": [], "returnType": { "kind": "simple", "type": "int", "optional": false, "format": 257 } },
    { "name": "native_coin", "arguments": [], "returnType": { "kind": "simple", "type": "int", "optional": false, "format": 257 } },
    { "name": "fees", "arguments": [], "returnType": { "kind": "simple", "type": "int", "optional": false, "format": 257 } },
    { "name": "TVL", "arguments": [], "returnType": { "kind": "simple", "type": "int", "optional": false, "format": 257 } },
    { "name": "chain_nonce", "arguments": [], "returnType": { "kind": "simple", "type": "int", "optional": false, "format": 257 } },
    { "name": "incoming", "arguments": [], "returnType": { "kind": "dict", "key": "int", "value": "IncomingTransaction", "valueFormat": "ref" } },
    { "name": "outgoing", "arguments": [], "returnType": { "kind": "dict", "key": "int", "value": "OutgoingTransaction", "valueFormat": "ref" } },
    { "name": "tokens", "arguments": [], "returnType": { "kind": "dict", "key": "int", "value": "Token", "valueFormat": "ref" } },
    { "name": "chain_fees", "arguments": [], "returnType": { "kind": "dict", "key": "int", "value": "int" } },
    { "name": "incoming_strategy", "arguments": [], "returnType": { "kind": "dict", "key": "int", "value": "TargetTokenToSteps", "valueFormat": "ref" } },
    { "name": "cross_chain_strategy", "arguments": [], "returnType": { "kind": "dict", "key": "int", "value": "FromTokenToTargetTokenToCrossChainStrategy", "valueFormat": "ref" } },
    { "name": "has_role", "arguments": [{ "name": "address", "type": { "kind": "simple", "type": "address", "optional": false } }, { "name": "role_id", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }], "returnType": { "kind": "simple", "type": "bool", "optional": false } },
    { "name": "role_admin", "arguments": [{ "name": "role_id", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }], "returnType": { "kind": "simple", "type": "address", "optional": false } },
    { "name": "admin_role_id", "arguments": [], "returnType": { "kind": "simple", "type": "int", "optional": false, "format": 257 } },
]

const Bridge_receivers: ABIReceiver[] = [
    { "receiver": "internal", "message": { "kind": "typed", "type": "JettonTransferNotification" } },
    { "receiver": "internal", "message": { "kind": "typed", "type": "JettonBurnNotification" } },
    { "receiver": "internal", "message": { "kind": "typed", "type": "FreezeTon" } },
    { "receiver": "internal", "message": { "kind": "typed", "type": "MapContract" } },
    { "receiver": "internal", "message": { "kind": "typed", "type": "RemoveMappedContract" } },
    { "receiver": "internal", "message": { "kind": "text", "text": "WithdrawFees" } },
    { "receiver": "internal", "message": { "kind": "typed", "type": "ReceiveInstallment" } },
    { "receiver": "internal", "message": { "kind": "typed", "type": "SetChainFee" } },
    { "receiver": "internal", "message": { "kind": "typed", "type": "JettonExcesses" } },
    { "receiver": "internal", "message": { "kind": "typed", "type": "UpdateProtocolFee" } },
    { "receiver": "internal", "message": { "kind": "typed", "type": "UpdateBaseUri" } },
    { "receiver": "internal", "message": { "kind": "typed", "type": "UpdateTransferFee" } },
    { "receiver": "internal", "message": { "kind": "typed", "type": "AddValidator" } },
    { "receiver": "internal", "message": { "kind": "typed", "type": "RemoveValidator" } },
    { "receiver": "internal", "message": { "kind": "typed", "type": "SetIncomingStrategy" } },
    { "receiver": "internal", "message": { "kind": "typed", "type": "SetCrossChainStrategy" } },
    { "receiver": "internal", "message": { "kind": "typed", "type": "RemoveCrossChainStrategy" } },
    { "receiver": "internal", "message": { "kind": "typed", "type": "RemoveInternalStrategy" } },
    { "receiver": "internal", "message": { "kind": "empty" } },
    { "receiver": "internal", "message": { "kind": "text", "text": "Pause" } },
    { "receiver": "internal", "message": { "kind": "text", "text": "Unpause" } },
    { "receiver": "internal", "message": { "kind": "typed", "type": "Deploy" } },
    { "receiver": "internal", "message": { "kind": "typed", "type": "GrantRole" } },
    { "receiver": "internal", "message": { "kind": "typed", "type": "RevokeRole" } },
    { "receiver": "internal", "message": { "kind": "typed", "type": "RenounceRole" } },
    { "receiver": "internal", "message": { "kind": "typed", "type": "UpdateRoleAdmin" } },
]

export class Bridge implements Contract {

    static async init(chain_nonce: bigint, native_coin: bigint, burner: Address, base_uri: string, transfer_fee: bigint, protocol_fee: bigint, bootstrap_validator_key: bigint, bootstrap_validator_address: Address) {
        return await Bridge_init(chain_nonce, native_coin, burner, base_uri, transfer_fee, protocol_fee, bootstrap_validator_key, bootstrap_validator_address);
    }

    static async fromInit(chain_nonce: bigint, native_coin: bigint, burner: Address, base_uri: string, transfer_fee: bigint, protocol_fee: bigint, bootstrap_validator_key: bigint, bootstrap_validator_address: Address) {
        const init = await Bridge_init(chain_nonce, native_coin, burner, base_uri, transfer_fee, protocol_fee, bootstrap_validator_key, bootstrap_validator_address);
        const address = contractAddress(0, init);
        return new Bridge(address, init);
    }

    static fromAddress(address: Address) {
        return new Bridge(address);
    }

    readonly address: Address;
    readonly init?: { code: Cell, data: Cell };
    readonly abi: ContractABI = {
        types: Bridge_types,
        getters: Bridge_getters,
        receivers: Bridge_receivers,
        errors: Bridge_errors,
    };

    private constructor(address: Address, init?: { code: Cell, data: Cell }) {
        this.address = address;
        this.init = init;
    }

    async send(provider: ContractProvider, via: Sender, args: { value: bigint, bounce?: boolean | null | undefined }, message: JettonTransferNotification | JettonBurnNotification | FreezeTon | MapContract | RemoveMappedContract | 'WithdrawFees' | ReceiveInstallment | SetChainFee | JettonExcesses | UpdateProtocolFee | UpdateBaseUri | UpdateTransferFee | AddValidator | RemoveValidator | SetIncomingStrategy | SetCrossChainStrategy | RemoveCrossChainStrategy | RemoveInternalStrategy | null | 'Pause' | 'Unpause' | Deploy | GrantRole | RevokeRole | RenounceRole | UpdateRoleAdmin) {

        let body: Cell | null = null;
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'JettonTransferNotification') {
            body = beginCell().store(storeJettonTransferNotification(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'JettonBurnNotification') {
            body = beginCell().store(storeJettonBurnNotification(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'FreezeTon') {
            body = beginCell().store(storeFreezeTon(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'MapContract') {
            body = beginCell().store(storeMapContract(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'RemoveMappedContract') {
            body = beginCell().store(storeRemoveMappedContract(message)).endCell();
        }
        if (message === 'WithdrawFees') {
            body = beginCell().storeUint(0, 32).storeStringTail(message).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'ReceiveInstallment') {
            body = beginCell().store(storeReceiveInstallment(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'SetChainFee') {
            body = beginCell().store(storeSetChainFee(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'JettonExcesses') {
            body = beginCell().store(storeJettonExcesses(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'UpdateProtocolFee') {
            body = beginCell().store(storeUpdateProtocolFee(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'UpdateBaseUri') {
            body = beginCell().store(storeUpdateBaseUri(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'UpdateTransferFee') {
            body = beginCell().store(storeUpdateTransferFee(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'AddValidator') {
            body = beginCell().store(storeAddValidator(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'RemoveValidator') {
            body = beginCell().store(storeRemoveValidator(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'SetIncomingStrategy') {
            body = beginCell().store(storeSetIncomingStrategy(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'SetCrossChainStrategy') {
            body = beginCell().store(storeSetCrossChainStrategy(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'RemoveCrossChainStrategy') {
            body = beginCell().store(storeRemoveCrossChainStrategy(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'RemoveInternalStrategy') {
            body = beginCell().store(storeRemoveInternalStrategy(message)).endCell();
        }
        if (message === null) {
            body = new Cell();
        }
        if (message === 'Pause') {
            body = beginCell().storeUint(0, 32).storeStringTail(message).endCell();
        }
        if (message === 'Unpause') {
            body = beginCell().storeUint(0, 32).storeStringTail(message).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'Deploy') {
            body = beginCell().store(storeDeploy(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'GrantRole') {
            body = beginCell().store(storeGrantRole(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'RevokeRole') {
            body = beginCell().store(storeRevokeRole(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'RenounceRole') {
            body = beginCell().store(storeRenounceRole(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'UpdateRoleAdmin') {
            body = beginCell().store(storeUpdateRoleAdmin(message)).endCell();
        }
        if (body === null) { throw new Error('Invalid message type'); }

        await provider.internal(via, { ...args, body: body });

    }

    async getWithdrawerRoleId(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('withdrawer_role_id', builder.build())).stack;
        let result = source.readBigNumber();
        return result;
    }

    async getPauserRoleId(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('pauser_role_id', builder.build())).stack;
        let result = source.readBigNumber();
        return result;
    }

    async getMappingAdminRoleId(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('mapping_admin_role_id', builder.build())).stack;
        let result = source.readBigNumber();
        return result;
    }

    async getBridgeValidatorRoleId(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('bridge_validator_role_id', builder.build())).stack;
        let result = source.readBigNumber();
        return result;
    }

    async getManagerRoleId(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('manager_role_id', builder.build())).stack;
        let result = source.readBigNumber();
        return result;
    }

    async getBaseUri(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('base_uri', builder.build())).stack;
        let result = source.readString();
        return result;
    }

    async getProtocolFee(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('protocol_fee', builder.build())).stack;
        let result = source.readBigNumber();
        return result;
    }

    async getNonce(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('nonce', builder.build())).stack;
        let result = source.readBigNumber();
        return result;
    }

    async getNativeCoin(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('native_coin', builder.build())).stack;
        let result = source.readBigNumber();
        return result;
    }

    async getFees(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('fees', builder.build())).stack;
        let result = source.readBigNumber();
        return result;
    }

    async getTvl(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('TVL', builder.build())).stack;
        let result = source.readBigNumber();
        return result;
    }

    async getChainNonce(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('chain_nonce', builder.build())).stack;
        let result = source.readBigNumber();
        return result;
    }

    async getIncoming(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('incoming', builder.build())).stack;
        let result = Dictionary.loadDirect(Dictionary.Keys.BigInt(257), dictValueParserIncomingTransaction(), source.readCellOpt());
        return result;
    }

    async getOutgoing(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('outgoing', builder.build())).stack;
        let result = Dictionary.loadDirect(Dictionary.Keys.BigInt(257), dictValueParserOutgoingTransaction(), source.readCellOpt());
        return result;
    }

    async getTokens(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('tokens', builder.build())).stack;
        let result = Dictionary.loadDirect(Dictionary.Keys.BigInt(257), dictValueParserToken(), source.readCellOpt());
        return result;
    }

    async getChainFees(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('chain_fees', builder.build())).stack;
        let result = Dictionary.loadDirect(Dictionary.Keys.BigInt(257), Dictionary.Values.BigInt(257), source.readCellOpt());
        return result;
    }

    async getIncomingStrategy(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('incoming_strategy', builder.build())).stack;
        let result = Dictionary.loadDirect(Dictionary.Keys.BigInt(257), dictValueParserTargetTokenToSteps(), source.readCellOpt());
        return result;
    }

    async getCrossChainStrategy(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('cross_chain_strategy', builder.build())).stack;
        let result = Dictionary.loadDirect(Dictionary.Keys.BigInt(257), dictValueParserFromTokenToTargetTokenToCrossChainStrategy(), source.readCellOpt());
        return result;
    }

    async getHasRole(provider: ContractProvider, address: Address, role_id: bigint) {
        let builder = new TupleBuilder();
        builder.writeAddress(address);
        builder.writeNumber(role_id);
        let source = (await provider.get('has_role', builder.build())).stack;
        let result = source.readBoolean();
        return result;
    }

    async getRoleAdmin(provider: ContractProvider, role_id: bigint) {
        let builder = new TupleBuilder();
        builder.writeNumber(role_id);
        let source = (await provider.get('role_admin', builder.build())).stack;
        let result = source.readAddress();
        return result;
    }

    async getAdminRoleId(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('admin_role_id', builder.build())).stack;
        let result = source.readBigNumber();
        return result;
    }

}