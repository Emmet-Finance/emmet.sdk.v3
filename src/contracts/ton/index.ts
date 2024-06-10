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
        b_0.storeUint(2149660657, 32);
        b_0.storeUint(src.from_chain, 16);
        b_0.storeUint(src.target_chain, 16);
        b_0.storeCoins(src.amount);
        b_0.storeRef(src.from_token);
        b_0.storeRef(src.to_token);
        b_0.storeAddress(src.recepient);
    };
}

export function loadInstallment(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2149660657) { throw Error('Invalid prefix'); }
    let _from_chain = sc_0.loadUintBig(16);
    let _target_chain = sc_0.loadUintBig(16);
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
        b_0.storeUint(2204705010, 32);
        b_0.store(storeInstallment(src.installment));
        b_0.storeDict(src.signatures, Dictionary.Keys.BigInt(257), dictValueParserSignerAndSignature());
        b_0.storeInt(src.len, 257);
        b_0.storeUint(src.tx_hash, 256);
        let b_1 = new Builder();
        b_1.storeInt(src.id, 257);
        b_0.storeRef(b_1.endCell());
    };
}

export function loadReceiveInstallment(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2204705010) { throw Error('Invalid prefix'); }
    let _installment = loadInstallment(sc_0);
    let _signatures = Dictionary.load(Dictionary.Keys.BigInt(257), dictValueParserSignerAndSignature(), sc_0);
    let _len = sc_0.loadIntBig(257);
    let _tx_hash = sc_0.loadUintBig(256);
    let sc_1 = sc_0.loadRef().beginParse();
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
        b_0.storeUint(653813971, 32);
        b_0.storeUint(src.target_chain, 16);
        b_0.storeRef(src.to_token);
        b_0.storeRef(src.to);
        b_0.storeRef(src.from_token);
        b_0.storeCoins(src.amount);
    };
}

export function loadFreezeTon(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 653813971) { throw Error('Invalid prefix'); }
    let _target_chain = sc_0.loadUintBig(16);
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

export type AddChain = {
    $$type: 'AddChain';
    chain_id: bigint;
    chain_name: string;
}

export function storeAddChain(src: AddChain) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2751922069, 32);
        b_0.storeUint(src.chain_id, 16);
        b_0.storeStringRefTail(src.chain_name);
    };
}

export function loadAddChain(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2751922069) { throw Error('Invalid prefix'); }
    let _chain_id = sc_0.loadUintBig(16);
    let _chain_name = sc_0.loadStringRefTail();
    return { $$type: 'AddChain' as const, chain_id: _chain_id, chain_name: _chain_name };
}

function loadTupleAddChain(source: TupleReader) {
    let _chain_id = source.readBigNumber();
    let _chain_name = source.readString();
    return { $$type: 'AddChain' as const, chain_id: _chain_id, chain_name: _chain_name };
}

function storeTupleAddChain(source: AddChain) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.chain_id);
    builder.writeString(source.chain_name);
    return builder.build();
}

function dictValueParserAddChain(): DictionaryValue<AddChain> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeAddChain(src)).endCell());
        },
        parse: (src) => {
            return loadAddChain(src.loadRef().beginParse());
        }
    }
}

export type UpdateChain = {
    $$type: 'UpdateChain';
    chain_id: bigint;
    chain_name: string;
}

export function storeUpdateChain(src: UpdateChain) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1203306390, 32);
        b_0.storeUint(src.chain_id, 16);
        b_0.storeStringRefTail(src.chain_name);
    };
}

export function loadUpdateChain(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1203306390) { throw Error('Invalid prefix'); }
    let _chain_id = sc_0.loadUintBig(16);
    let _chain_name = sc_0.loadStringRefTail();
    return { $$type: 'UpdateChain' as const, chain_id: _chain_id, chain_name: _chain_name };
}

function loadTupleUpdateChain(source: TupleReader) {
    let _chain_id = source.readBigNumber();
    let _chain_name = source.readString();
    return { $$type: 'UpdateChain' as const, chain_id: _chain_id, chain_name: _chain_name };
}

function storeTupleUpdateChain(source: UpdateChain) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.chain_id);
    builder.writeString(source.chain_name);
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

export type SetChainFee = {
    $$type: 'SetChainFee';
    chain_id: bigint;
    fee: bigint;
}

export function storeSetChainFee(src: SetChainFee) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2586505758, 32);
        b_0.storeUint(src.chain_id, 16);
        b_0.storeUint(src.fee, 256);
    };
}

export function loadSetChainFee(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2586505758) { throw Error('Invalid prefix'); }
    let _chain_id = sc_0.loadUintBig(16);
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
        b_0.storeUint(src.target_chain, 16);
        b_0.storeInt(src.token_id, 257);
    };
}

export function loadInstallmentOut(slice: Slice) {
    let sc_0 = slice;
    let _amount = sc_0.loadUintBig(256);
    let _to = sc_0.loadStringRefTail();
    let _target_chain = sc_0.loadUintBig(16);
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
    const __code = Cell.fromBase64('te6ccgEC5AEAQAYAART/APSkE/S88sgLAQIBYgIDA9LQAdDTAwFxsKMB+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiFRQUwNvBPhhAvhi2zwRFREXERURFBEWERQRExEVERMREhEUERIRERETEREREBESERAPEREPDhEQDlUd2zzy4ILOBAUCASAICQTu7aLt+wGSMH/gcCHXScIflTAg1wsf3iCCEHNi0Jy6jrsw0x8BghBzYtCcuvLggdM/+gD6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIVBMDECNsFNs8f+AgghB73Zfeuo8IMNs8bBbbPH/gIIIQJvho07oKCwwNATzI+EMBzH8BygARFhEVERQRExESEREREFXg2zzJ7VQGAdABERUBERaBAQHPAAEREwGBAQHPAAEREQGBAQHPAA/IgQEBzwAegQEBzwAc9AAa9AAY9AAGyPQAFfQAE/QAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFgHI9AAS9AATygBQAwcAniDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFshQBM8WyVADzBOBAQHPABSBAQHPAATI9AAVgQEBzwAVgQEBzwDJWMzJAczJAczJAcwCASCQkQIBIKusAfYxMhEVERcRFREUERYRFBETERcRExESERYREhERERcREREQERYREA8RFw8OERYODREXDQwRFgwLERcLChEWCgkRFwkIERYIBxEXBwYRFgYFERcFBBEWBAMRFwMCERYCAREXAREWgU1QKLPy9BEX0w8RFREWERURFBEWERQOALLTHwGCEHvdl9668uCB0z/6APpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgB+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiAH6AFFVFRRDMAHsNV8DggCKZ/hBbyQQI18DKscF8vQRFREXERURFBEWERQRExEXERMREhEWERIREREXEREREBEWERAPERcPDhEWDg0RFw0MERYMCxEXCwoRFgoJERcJCBEWCAcRFwcGERYGBREXBQQRFgQDERcDAhEWAgERFwERFhEEdI6cMNMfAYIQJvho07ry4IHTD9TU1PoAVUBsFds8f+AgghBLN8Yhuo8IMNs8bBjbPH/gIIIQpAb/lboUFRYXAvoRExEWERMREhEWERIREREWEREREBEWERAPERYPDhEWDg0RFg0MERYMCxEWCwoRFgoJERYJCBEWCAcRFgcGERYGBREWBQQRFgQDERYDAhEWAgERFgERGFYXVhfbPIEBAVRZAFYZAUEz9AxvoZQB1wAwkltt4oIAxEUhbrPy9EMPA+SCAPe1+EFvJBNfAwIgbvLQgCagEr7y9BEVpBEY1NTUMAQRGQQTVhoDAhEZAgFaFRRUdUNUdUPIVVDbPMn5ABBGEDVGVoEBAQbIVVDbPMkQL1LwIG6VMFn0WjCUQTP0FeINyAGCEGZkCeVYyx+BAQHPAMkaGhAAaMiCWMAAAAAAAAAAAAAAAAEBy2fMyXD7ABERERQREREQERMREA8REg8OEREODREQDRDPVSsB9IFNUCiz8vQRF9MPgQEBVFoAUkBBM/QMb6GUAdcAMJJbbeKCAMRFIW6z8vSCAPe1+EFvJBNfAwIgbvLQgCegEr7y9BEWpBEW1NTUMFYZA1YZVEUDWhUUERcRGxEXERYRGhEWERURGREVERQRGBEUERMRGxETERIRGhESEgT+ERERGRERERARGBEQDxEbDw4RGg4NERkNDBEYDAsRGwsKERoKCREZCQgRGAgHERsHBhEaBgURGQUEERgEAxEbAwIRHQIBERwBERrbPFYXVhdWG1YeVh5WHchVUNs8yfkABBEYBAMRFwMCERoCAREcAREbgQEBERrIVVDbPMkQLEMaGhMAzAERFQFWFwEgbpUwWfRaMJRBM/QV4hEVyAGCEGZkCeVYyx+BAQHPAMnIgljAAAAAAAAAAAAAAAABActnzMlw+wAPERUPDhEUDg0REw0MERIMCxERCwoREAoQ7xCOEH0QbFVVEDVEFAH2ERURGhEVERQRGREUERMRGBETERIRFxESERERFhERERARGhEQDxEZDw4RGA4NERcNDBEWDAsRGgsKERkKCREYCQgRFwgHERYHBhEaBgURGQUEERgEAxEXAwIRFgIBERoBERmBTVAos/L0ERWkVhkDAhEXAiFWGgIBER0BGAHK0x8BghBLN8YhuvLggYEBAdcA1AHQAfpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgB0weBAQHXANQB0IEBAdcA+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiAEcAfBWHVYdVh1WHVYdVh1WHVYdVh1WHVYdVh1WHVYdVh1WHVYdVh1WHVYdVh1WHREVETMRFREUETIRFBETETERExESETAREhERES8REREQES4REA8RLQ8OESwODRErDQwRKgwLESkLChEoCgkRJwkIESYIBxElBwYRJAYdBNCOmTDTHwGCEKQG/5W68uCB0w/UAdASbBLbPH/gIIIQarjAQbqOlTDTHwGCEGq4wEG68uCB0/8BMds8f+AgghBHuP+Wuo6ZMNMfAYIQR7j/lrry4IHTD9QB0BJsEts8f+AgghCDaSDyuh8gISIC+BEaWhUUVHVDVHVDyFVQ2zzJ+QCBAQFTDQMRHwFBM/QMb6GUAdcAMJJbbeKCAMRFIW6z8vSCAPe1+EFvJBNfAwIgbvLQgFYfoCmgEr7y9BEWER0RFhEVERcRFREUER0RFBETERcRExESER0REhERERcREREQER0REA8RFw8aGQL4DhEdDg0RFw0MER0MCxEXCwoRHQoJERcJCBEdCAcRFwcGER0GBREXBQQRHQQDERoDAhEZAgERGAERHIFDXvhBbyQTXwMivvL0ERNWE6ABERQBEROgERMEERYEAxEcAwIRGQIBERgBEReBAQERHMhVUNs8yRArAREXAVYWARobABpQVsv/UAP6AszMzMs/AMwgbpUwWfRaMJRBM/QV4hEUyAGCEGZkCeVYyx+BAQHPAMnIgljAAAAAAAAAAAAAAAABActnzMlw+wAOERUODREUDQwREwwLERILChERCgkREAkQzxB+EG0QXBBLEDpJF1CDUAYFRBQAVPpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgxEDgQNxA2EDUQNAL4BREjBQQRIgQDESEDAhEgAgERHwERHts8VxBfD2xhERYRHhEWERURHREVERQRHBEUERMRGxETERIRGhESERERGRERERARGBEQDxEXDw4RHg4NER0NDBEcDAsRGwsKERoKCREZCQgRGAgHERcHBhEeBgURHQUEERwEAxEbA9seAvwCERoCAREZAds8ERURHREVERQRHBEUERMRGxETERIRGhESERERGRERERARGBEQDxEXDw4RFg4NERUNDBEUDAsREwsKERIKCRERCQgREAhVdxBnEFYQRUMwEFYQRgeBAQEIFhVDMMhVYNs8yQMREQMgbpUwWfRaMJRBM/QV4g6OKQHwVhdWF1YXVhdWF1YXVhdWF1YXVhdWF1YXVhdWF1YXVhdWF1YXVhdWF1YXVhcRFREtERURFBEsERQRExErERMREhEqERIREREpEREREBEoERAPEScPDhEmDg0RJQ0MESQMCxEjCwoRIgoJESEJCBEgCAcRHwcGER4GIwHwVhZWFlYWVhZWFlYWVhZWFlYWVhZWFlYWVhZWFlYWVhZWFlYWVhZWFlYWVhYRFREsERURFBErERQRExEqERMREhEpERIREREoEREREBEnERAPESYPDhElDg0RJA0MESMMCxEiCwoRIQoJESAJCBEfCAcRHgcGER0GJwHwVhdWF1YXVhdWF1YXVhdWF1YXVhdWF1YXVhdWF1YXVhdWF1YXVhdWF1YXVhcRFREtERURFBEsERQRExErERMREhEqERIREREpEREREBEoERAPEScPDhEmDg0RJQ0MESQMCxEjCwoRIgoJESEJCBEgCAcRHwcGER4GKgTyjyww0x8BghCDaSDyuvLggds8BvQEgQEB1wDT/9QB0IEBAdcAMBoUQzBsGts8f+AgghCaKvIeuo6YMNMfAYIQmiryHrry4IHTD9P/WWwS2zx/4CCCENUydtu6jhQw0x8BghDVMnbbuvLggdM/ATEwf+AgghAzkNNoui8wMTIC+AURHQUEERwEAxEbAwIRGgIBERkBERjbPFcQXw9sYREWERgRFhEVERcRFREUERgRFBETERcRExESERgREhERERcREREQERgREA8RFw8OERgODREXDQwRGAwLERcLChEYCgkRFwkIERgIBxEXBwYRGAYFERcFBBEYBAMRFwPbJAJ0AhEYAgERFwHbPBEVERcRFREUERYRFBETERURExESERQREhERERMREREQERIREA8REQ8OERAOVR3bPI4lAcgRFBEXERQRExEWERMREhEVERIREREXEREREBEWERAPERUPDhEXDg0RFg0MERUMCxEXCwoRFgoJERUJCBEXCAcRFgcGERUGBREXBQQRFgQDERUDAhEXAgERFgERFYIA3pYRGFYXJgH+gQEBLQJZ9A1voZIwbd8gbpIwbZfQ1AHQMW8B4m6zswERGQHy9IEBAREWyAHIAc8WyQHMyRA7AhEWAgERFwEgbpUwWfRaMJRBM/QV4hESERUREhERERQREREQERMREA8REg8OEREODREQDRDPEL4QrRCcCxB6EGkQWBBHEDZFBC4C+AURHAUEERsEAxEaAwIRGQIBERgBERfbPFcQXw9sYREWERcRFhEVERcRFREUERcRFBETERcRExESERcREhERERcREREQERcREA8RFw8OERcODREXDQwRFwwLERcLChEXCgkRFwkIERcIBxEXBwYRFwYFERcFBBEXBAMRFwPbKALoAhEXAgERFwHbPIEBAW0gbpIwbY6NIG7y0IBvJ8hVYNs8yeIDERADEgERGAEgbpUwWfRaMJRBM/QV4hEUERURFBETERQRExESERMREhERERIREREQEREREA8REA8ODxDNELwQqxCaEIkQeBBnEFYQRRA0QTCOKQDwyFAHzxbJUAfMUAQg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxZYINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WyweBAQHPAALIgQEBzwABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WyQHMAvgFER0FBBEcBAMRGwMCERoCAREZAREY2zxXEF8PbGERFhEYERYRFREXERURFBEYERQRExEXERMREhEYERIREREXEREREBEYERAPERcPDhEYDg0RFw0MERgMCxEXCwoRGAoJERcJCBEYCAcRFwcGERgGBREXBQQRGAQDERcD2ysCdAIRGAIBERcB2zwRFREXERURFBEWERQRExEVERMREhEUERIRERETEREREBESERAPEREPDhEQDlUd2zyOLAHGERQRFxEUERMRFhETERIRFRESERERFxERERARFhEQDxEVDw4RFw4NERYNDBEVDAsRFwsKERYKCREVCQgRFwgHERYHBhEVBgURFwUEERYEAxEVAwIRFwIBERYBERWBZOgRGFYXLQH8gQEBLQJZ9A1voZIwbd8gbpIwbZfQ1AHQMW8B4m6zAREZAfL0gQEBERbIAcgBzxbJAczJEDsCERYCAREXASBulTBZ9FowlEEz9BXiERIRFRESERERFBERERARExEQDxESDw4REQ4NERANEM8QvhCtEJwLEHoQaRBYEEcQNkUELgAEQBMActMfAYIQgCE38bry4IHTD9MP+gDU1PpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgWFRRDMAH2ERURHxEVERQRHhEUERMRHRETERIRHBESERERGxERERARGhEQDxEZDw4RGA4NERcNDBEWDAsRHwsKER4KCREdCQgRHAgHERsHBhEaBgURGQUEERgEAxEXAwIRFgIBER8BER6BTVAos/L0VhVWFVYVVhVWFVYVVhVWFVYVPwHwVhdWF1YXVhdWF1YXVhdWF1YXVhdWF1YXVhdWF1YXVhdWF1YXVhdWF1YXVhcRFREtERURFBEsERQRExErERMREhEqERIREREpEREREBEoERAPEScPDhEmDg0RJQ0MESQMCxEjCwoRIgoJESEJCBEgCAcRHwcGER4GMwTMjpgw0x8BghAzkNNouvLggYEBAdcAATHbPH/gIIIQtLsKtbqOlTDTHwGCELS7CrW68uCB1AHQMds8f+AgghBq33iBuo6YMNMfAYIQat94gbry4IGBAQHXAAEx2zx/4CCCEJXW/aK6NTY3OAL4BREdBQQRHAQDERsDAhEaAgERGQERGNs8VxBfD2xhERYRGBEWERURFxEVERQRGBEUERMRFxETERIRGBESERERFxERERARGBEQDxEXDw4RGA4NERcNDBEYDAsRFwsKERgKCREXCQgRGAgHERcHBhEYBgURFwUEERgEAxEXA9s0AcQCERgCAREXAds8gQEBIBBKEwIRGQIBERgBIW6VW1n0WjCYyAHPAEEz9ELiERMRFRETERIRFBESERERExERERAREhEQDxERDw4REA4Q3xDOEL0QrBCbEIoQeQgQVxBGEDVEA44B8FYWVhZWFlYWVhZWFlYWVhZWFlYWVhZWFlYWVhZWFlYWVhZWFlYWVhZWFlYWERURLBEVERQRKxEUERMRKhETERIRKRESERERKBERERARJxEQDxEmDw4RJQ4NESQNDBEjDAsRIgsKESEKCREgCQgRHwgHER4HBhEdBjkB8FYWVhZWFlYWVhZWFlYWVhZWFlYWVhZWFlYWVhZWFlYWVhZWFlYWVhZWFlYWERURLBEVERQRKxEUERMRKhETERIRKRESERERKBERERARJxEQDxEmDw4RJQ4NESQNDBEjDAsRIgsKESEKCREgCQgRHwgHER4HBhEdBjsB8FYWVhZWFlYWVhZWFlYWVhZWFlYWVhZWFlYWVhZWFlYWVhZWFlYWVhZWFlYWERURLBEVERQRKxEUERMRKhETERIRKRESERERKBERERARJxEQDxEmDw4RJQ4NESQNDBEjDAsRIgsKESEKCREgCQgRHwgHER4HBhEdBj0E4I64MNMfAYIQldb9orry4IGBAQHXAPpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgSbBLbPH/gIIIQw6W94rqOmDDTHwGCEMOlveK68uCBgQEB1wABMds8f+AgghCjpypUuuMCIIIQbNV/0LpYWVpbAvgFERwFBBEbBAMRGgMCERkCAREYAREX2zxXEF8PbGERFhEXERYRFREXERURFBEXERQRExEXERMREhEXERIREREXEREREBEXERAPERcPDhEXDg0RFw0MERcMCxEXCwoRFwoJERcJCBEXCAcRFwcGERcGBREXBQQRFwQDERcD2zoBagIRFwIBERcB2zwRFREWERURFBEVERQRExEUERMREhETERIRERESEREREBERERAPERAPVQ40jgL4BREcBQQRGwQDERoDAhEZAgERGAERF9s8VxBfD2xhERYRFxEWERURFxEVERQRFxEUERMRFxETERIRFxESERERFxERERARFxEQDxEXDw4RFw4NERcNDBEXDAsRFwsKERcKCREXCQgRFwgHERcHBhEXBgURFwUEERcEAxEXA9s8AYYCERcCAREXAds8NREUERURFBETERQRExESERMREhERERIREREQEREREA8REA8Q7xDeEM0QvBCrEJoQiRB4EGcQVlUDjgL4BREcBQQRGwQDERoDAhEZAgERGAERF9s8VxBfD2xhERYRFxEWERURFxEVERQRFxEUERMRFxETERIRFxESERERFxERERARFxEQDxEXDw4RFw4NERcNDBEXDAsRFwsKERcKCREXCQgRFwgHERcHBhEXBgURFwUEERcEAxEXA9s+AWoCERcCAREXAds8ERURFhEVERQRFREUERMRFBETERIRExESEREREhERERAREREQDxEQD1UONY4C/FYVVhVWFVYVVhVWFVYVVhVWFVYVVhVWFVYVERURKxEVERQRKhEUERMRKRETERIRKBESERERJxERERARJhEQDxElDw4RJA4NESMNDBEiDAsRIQsKESAKCREfCQgRHggHER0HBhEcBgURGwUEERoEAxEZAwIRGAIBERcBERbbPNlAA/pXEF8PbGHbPIFmjFYRgQEBViJZ9A1voZIwbd8gbpIwbY6H0Ns8bBZvBuJu8vRWGtDS/zBWGtDS/zARFREXERURFBEWERQRExEXERMREhEWERIREREXEREREBEWERAPERcPDhEWDg0RFw0MERYMCxEXCwoRFgoJERcJCBEWCI5BQgBY0//6ANTU0z/6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIFhUUQzAD/AcRFwcGERYGBREXBQQRFgQDERcDAhEWAgERFwERFlYdViDbPBEfVh5WHlYeVh5WHshVUNs8yfkAERURGBEVERQRFxEUERMRFhETERIRFRESERERFBERERARExEQDxESDw4REQ4NERANEM8QvhCtEJwQixB6EGkQWBBHEDZFQENERQH0gXyhAsIAEvL0ERURFhEVERQRFhEUERMRFhETERIRFhESERERFhERERARFhEQDxEWDw4RFg4NERYNDBEWDAsRFgsKERYKCREWCREWCAcGVUCCAKbAEReBAQEtAln0DW+hkjBt3yBukjBtl9DUAdAxbwHibrMBERcB8vRGAGiCEIAhN/FQB8sfFcsPE8sPAfoCzMwBINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WBPgDER8DAgERGQERH9s8ERURFxEVERQRFhEUERMRFRETERIRFBESERERExERERAREhEQDxERDw4REA5VHQERHAFWHFYb2zwFERsFBBEYBAMRFwMCERYCAREZAREaVUCBAQEGyFVQ2zzJECxWGAEgbpUwWfRaMJRBM/QV4hEWR0hJSgBIERQRFREUERMRFBETERIRExESEREREhERERAREREQDxEQD1UOAKxwAY5HIYEBASJZ9A1voZIwbd8gbpIwbZzQ1AHQAdP/WWwSbwLiIG7y0IBvIieBAQEiWfQMb6GSMG3fbrObJFn5EIE/1gHy9KSRW+LkMYIAt1YyIr7y9APuERYRGREWERURGBEVERQRFxEUERMRGRETERIRGBESERERFxERERARGREQDxEYDw4RFw4NERkNDBEYDAsRFwsKERkKCREYCQgRFwgHERkHBhEYBgURFwUEERkEAxEYAwIRFwIBERkBERhWF9s8cAGK5FtXFlcWVxZLTE0AVlBWy/9QA/oCzMzLPwEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxYAmsgBghC5hdaKWMsfgQEBzwDJyIJYwAAAAAAAAAAAAAAAAQHLZ8zJcPsADhEVDg0RFA0MERMMCxESCwoREQoOERAOEI8QflVmECZFE0FEALqBAQFWEEATWfQNb6GSMG3fIG6SMG2X0PQEATFvAeKBON4hbrPy9CBu8tCAbyGBAQFYWfQNb6GSMG3fIG6SMG2d0PQEgQEB1wBZbBJvAuKBYWQhbrPy9CBu8tCAbyIC5IEBAVRSAFIwQTP0DG+hlAHXADCSW23iIG7y0IAgwAaOocACjhukAREXAREWAREVAREUARETARESARERAREQVdHjDeMNERURFxEVERQRFhEUERMRFRETERIRFBESERERExERERAREhEQDxERDw4REA5VHU5PAEAREhEVERIREREUEREREBETERAPERIPDhERDg0REA1VLAHQERURFxEVERQRFhEUERMRFxETERIRFhESERERFxERERARFhEQDxEXDw4RFg4NERcNDBEWDAsRFwsKERYKCREXCQgRFggHERcHBhEWBgURFwUEERYEAxEXAwIRFgIBERcBERZWGlYaVhpQA9YwERURFxEVERQRFhEUERMRFxETERIRFhESERERFxERERARFhEQDxEXDw4RFg4NERcNDBEWDAsRFwsKERYKCREXCQgRFggHERcHBhEWBgURFwUEERYEAxEXAwIRFgIBERcBERbbPFYZAbrjD6pSUwOkgQEBVhICWfQNb6GSMG3fIG6SMG2Oh9DbPGwXbwfiggC/zCFus/L0IG7y0IBvJxBWXwb4KG1wyMnQEDUQRshVUNs8yYIQBMS0AH9wUAQDbW3bPFVRiQDIghCJtx0JUAfLH1AFINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WUAMg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxaBAQHPACFus5V/AcoAzJRwMsoA4gH6AgHPFgJeVhpWGoFrG/gnbxD4QW8kE18DoVMooLzy9FMGoAERFQGhERQmoIgSf3BEBG1t2zxUiQO4VhpWGlYagQEBVhICWfQNb6GSMG3fIG6SMG2Oh9DbPGwXbwfigRAhIW6z8vQgbvLQgG8nbGH4QW8kECNfA21wyMnQIRBXVVDIVWDbPMmCEAq6lQB/cFAEA21t2zxVVokAOgAAAABGcm9tIEVtbWV0LkZpbmFuY2UgQnJpZGdlAfbUAdAB+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiAH6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIAdMHgQEB1wDUAdCBAQHXAPpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgxECcQJhAlECRXAMiCEA+KfqVQCMsfFss/UAT6Algg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxYBINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WIW6zlX8BygDMlHAyygDiAfoCAc8WAAQQIwHwVhdWF1YXVhdWF1YXVhdWF1YXVhdWF1YXVhdWF1YXVhdWF1YXVhdWF1YXVhcRFREtERURFBEsERQRExErERMREhEqERIREREpEREREBEoERAPEScPDhEmDg0RJQ0MESQMCxEjCwoRIgoJESEJCBEgCAcRHwcGER4GXAHwVhZWFlYWVhZWFlYWVhZWFlYWVhZWFlYWVhZWFlYWVhZWFlYWVhZWFlYWVhYRFREsERURFBErERQRExEqERMREhEpERIREREoEREREBEnERAPESYPDhElDg0RJA0MESMMCxEiCwoRIQoJESAJCBEfCAcRHgcGER0GXgFSMNMfAYIQo6cqVLry4IGBAQHXAIEBAdcA9ASBAQHXAFkQJBAjbBTbPH9gBP6OvzDTHwGCEGzVf9C68uCBgQEB1wCBAQHXAIEBAdcA1AHQ9ASBAQHXAFkC9ASBAQHXAFkyEEcQRhBFQwBsF9s8f+AgghAMWJCGuo6kMNMfAYIQDFiQhrry4IGBAQHXAIEBAdcAgQEB1wBVIGwT2zx/4CCCELQEyDK64wIgwAAiZGVmZwL4BREdBQQRHAQDERsDAhEaAgERGQERGNs8VxBfD2xhERYRGBEWERURFxEVERQRGBEUERMRFxETERIRGBESERERFxERERARGBEQDxEXDw4RGA4NERcNDBEYDAsRFwsKERgKCREXCQgRGAgHERcHBhEYBgURFwUEERgEAxEXA9RdAdACERgCAREXAds8MBKBAQECAREXAREWIG6VMFn0WjCUQTP0FOIRFKQgqgBzqQSkERMRFRETERIRFBESERERExERERAREhEQDxERDw4REA4Q3xDOEL0QrBCbEIoQeRBoEFcQRhA1ECQQI44C+AURHAUEERsEAxEaAwIRGQIBERgBERfbPFcQXw9sYREWERcRFhEVERcRFREUERcRFBETERcRExESERcREhERERcREREQERcREA8RFw8OERcODREXDQwRFwwLERcLChEXCgkRFwkIERcIBxEXBwYRFwYFERcFBBEXBAMRFwPUXwHMAhEXAgERFwHbPDCBAQEBERZtIG6VMFn0WjCUQTP0FOIRFKUgqgBzqQSkERQRFREUERMRFBETERIRExESEREREhERERAREREQDxEQDxDvEN4QzRC8EKsQmhCJEHgQZxBWEEUQNBAjjgHwVhlWGVYZVhlWGVYZVhlWGVYZVhlWGVYZVhlWGVYZVhlWGVYZVhlWGVYZVhkRFREvERURFBEuERQRExEtERMREhEsERIRERErEREREBEqERAPESkPDhEoDg0RJw0MESYMCxElCwoRJAoJESMJCBEiCAcRIQcGESAGYQL4BREfBQQRHgQDER0DAhEcAgERGwERGts8VxBfD2xhERYRGhEWERURGREVERQRGBEUERMRFxETERIRGhESERERGRERERARGBEQDxEXDw4RGg4NERkNDBEYDAsRFwsKERoKCREZCQgRGAgHERcHBhEaBgURGQUEERgEAxEXA9RiAoQCERoCAREZAds8ERURGREVERQRGBEUERMRFxETERIRFhESERERFRERERARFBEQDxETDw4REg4NERENDBEQDFU72zyOYwDUVhGBAQElWfQNb6GSMG3fIG6SMG2X0PQEATFvAeIgbpQwbW8B3iBu8tCAbyECgQEBAshZAvQAgQEBzwDJQTAgbpUwWfRaMJRBM/QV4oEBAQHIAQH0AMkDERADEiBulTBZ9FowlEEz9BXiDQHwVhxWHFYcVhxWHFYcVhxWHFYcVhxWHFYcVhxWHFYcVhxWHFYcVhxWHFYcVhwRFREyERURFBExERQRExEwERMREhEvERIREREuEREREBEtERAPESwPDhErDg0RKg0MESkMCxEoCwoRJwoJESYJCBElCAcRJAcGESMGaAH0XwNWFVYVVhVWFVYVVhVWFVYVVhVWFVYVVhVWFVYVVhVWFVYVVhVWFVYVVhVWFREVESsRFREUESoRFBETESkRExESESgREhEREScREREQESYREA8RJQ8OESQODREjDQwRIgwLESELChEgCgkRHwkIER4IBxEdBwYRHAZsATww0x8BghC0BMgyuvLggYEBAdcAgQEB1wBZbBLbPH9tA/7XScEhsJJbf+AgghCUapi2uo6oMNMfAYIQlGqYtrry4IHTPwExyAGCEK/5D1dYyx/LP8n4QgFwbds8f+AgghAKYdtZuo65MNMfAYIQCmHbWbry4IH6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIAYEBAdcAWWwS2zx/cXJzAvgFESIFBBEhBAMRIAMCER8CAREeAREd2zxXEF8PbGERFhEdERYRFREcERURFBEbERQRExEaERMREhEZERIREREYEREREBEXERAPER0PDhEcDg0RGw0MERoMCxEZCwoRGAoJERcJCBEdCAcRHAcGERsGBREaBQQRGQQDERgD1GkCpAIRFwIBER0B2zwRFREcERURFBEbERQRExEaERMREhEZERIREREYEREREBEXERAPERYPDhEVDg0RFA0MERMMCxESCwoREQoJERAJEI8QflVm2zyOagHuVhOBAQEoWfQNb6GSMG3fIG6SMG2X0PQEATFvAeIgbpQwbW8B3iBu8tCAbyEggQEBKFn0DW+hkjBt3yBukjBtl9D0BAExbwHiIG6UMG1vAd4gbvLQgG8hVSKBAQEGyFUwRDQC9ACBAQHPAAIC9ACBAQHPAMlDMBRrAIggbpUwWfRaMJRBM/QV4oEBAQHIAQH0AMlBMCBulTBZ9FowlEEz9BXigQEBAcgBAfQAyRA/EiBulTBZ9FowlEEz9BXiDAJABREbBQQRGgQDERkDAhEYAgERFwERFts8VxBfD2xh2zzUjgHwVhdWF1YXVhdWF1YXVhdWF1YXVhdWF1YXVhdWF1YXVhdWF1YXVhdWF1YXVhcRFREtERURFBEsERQRExErERMREhEqERIREREpEREREBEoERAPEScPDhEmDg0RJQ0MESQMCxEjCwoRIgoJESEJCBEgCAcRHwcGER4GbgL4BREdBQQRHAQDERsDAhEaAgERGQERGNs8VxBfD2xhERYRGBEWERURFxEVERQRGBEUERMRFxETERIRGBESERERFxERERARGBEQDxEXDw4RGA4NERcNDBEYDAsRFwsKERgKCREXCQgRGAgHERcHBhEYBgURFwUEERgEAxEXA9RvAnQCERgCAREXAds8ERURFxEVERQRFhEUERMRFRETERIRFBESERERExERERAREhEQDxERDw4REA5VHds8jnAA7i+BAQEjWfQNb6GSMG3fIG6SMG2X0PQEATFvAeKBON4hbrPy9CBu8tCAbyGBAQFtIG6SMG2OEiBu8tCAbyLIWQL0AIEBAc8AyeJBMCBulTBZ9FowlEEz9BXigQEBAcgBAfQAyQMREAMSIG6VMFn0WjCUQTP0FeINATptbSJus5lbIG7y0IBvIgGRMuIQJHADBIBCUCPbPIkC7BEVERcRFREUERYRFBETERcRExESERYREhERERcREREQERYREA8RFw8OERYODREXDQwRFgwLERcLChEWCgkRFwkIERYIBxEXBwYRFgYFERcFBBEWBAMRFwMCERYCAREXAREW2zwRFREXERURFBEWERQRExEVERN7dAS24CCCEFE+8166jrkw0x8BghBRPvNeuvLggfpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgBgQEB1wBZbBLbPH/gIIIQFzK+IbrjAiCCEPYsDPG64wLAAHd4eXoBQBESERQREhERERMREREQERIREA8REQ8OERAOEN9VHNs8dQL2ERURFxEVERQRFhEUERMRFxETERIRFhESERERFxERERARFhEQDxEXDw4RFg4NERcNDBEWDAsRFwsKERYKCREXCQgRFggHERcHBhEWBgURFwUEERYEAxEXAwIRFgIBERcBERZWF9s8ggCFJvhBbyQQI18DEscF8vQpgQEBn3YBwFYZWfQNb6GSMG3fIG6SMG2OJ9D0BPpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgSbBJvAuIgbvLQgG8igQELAREZf3EhbpVbWfRZMJjIAc8AQTP0QeKBAQERGIEC7BEVERcRFREUERYRFBETERcRExESERYREhERERcREREQERYREA8RFw8OERYODREXDQwRFgwLERcLChEWCgkRFwkIERYIBxEXBwYRFgYFERcFBBEWBAMRFwMCERYCAREXAREW2zwRFREXERURFBEWERQRExEVERN7fAGQMNMfAYIQFzK+Ibry4IGBAQHXAPpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgSbBKBHwv4QW8kECNfAyLHBfL02zx/fwFwMNMfAYIQ9iwM8bry4IGBAQHXAPpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgSbBLbPH+CAQqRMOMNcIQC6ikRFBEWERQRExEVERMREhEWERIREREVEREREBEWERAPERUPDhEWDg0RFQ0MERYMCxEVCwoRFgoJERUJCBEWCAcRFQcGERYGBREVBQQRFgQDERUDAhEWAgERFQERFoEBAREW2zwCERgCAREXAVn0DW+hkjBt39d9AUAREhEUERIRERETEREREBESERAPEREPDhEQDhDfVRzbPH8B+iBukjBtjifQ9AT6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIEmwSbwLiggDTByFus/L0IG7y0IBvIjCBAQv4QW8kECNfA3FBM/QKb6GUAdcAMJJbbeKCANMHIW6zmAEgbvLQgMD/kjFw4vL0ERMRFRETERIRFBESfgAsERERExERERAREhEQDxERDw4REA5VHQL0ERURFxEVERQRFhEUERMRFxETERIRFhESERERFxERERARFhEQDxEXDw4RFg4NERcNDBEWDAsRFwsKERYKCREXCQgRFggHERcHBhEWBgURFwUEERYEAxEXAwIRFgIBERcBERZWF9s8gWw9+EFvJBAjXwMSxwXy9CmBAQGfgAHAVhlZ9A1voZIwbd8gbpIwbY4n0PQE+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiBJsEm8C4iBu8tCAbyKBAQsBERlwcSFulVtZ9FkwmMgBzwBBM/RB4oEBAREYgQDqyFkC9AABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WyRA6AhEXAgERGAEgbpUwWfRaMJRBM/QV4hETERURExESERQREhERERMREREQERIREA8REQ8OERAOEN8QzhC9EKwQmxCKCRBoEFcQRhA1RDASAfIrgQEBI1n0DW+hkjBt3yBukjBtjifQ9AT6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIEmwSbwLigVTlIW6z8vQgbvLQgG8iMIEBAQLIWQL0AAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxbJEDwSgwAeIG6VMFn0WjCUQTP0FeIJA/75ASCC8DoSMt2ZofO05Yb/gnbnxTo15f1nGPd8X8XtgVhHrd0/uo6GMNs8f9sx4CCC8O+zR5Z2E25EJL1osBYpwm6YIUOgZFeUIeYSl8Fo53GRuo6GMNs8f9sx4ILwIo/Oko+sVEhgID3UcqsOBb5duYDEKWuN840Lar59ak+6hYaHAfBWFVYVVhVWFVYVVhVWFVYVVhVWFVYVVhVWFVYVVhVWFVYVVhVWFVYVVhVWFREVESsRFREUESoRFBETESkRExESESgREhEREScREREQESYREA8RJQ8OESQODREjDQwRIgwLESELChEgCgkRHwkIER4IBxEdBwYRHAaIAfCCAOPAKLPy9FYVVhVWFVYVVhVWFVYVVhVWFVYVVhVWFVYVVhVWFVYVVhVWFVYVVhVWFVYVERURKxEVERQRKhEUERMRKRETERIRKBESERERJxERERARJhEQDxElDw4RJA4NESMNDBEiDAsRIQsKESAKCREfCQgRHgiLARCOhds8f9sx4IwDhgURGwUEERoEAxEZAwIRGAIBERcBERbbPFcQXw9sYds8gVoBERTCAAERFAHy9PhBbyQQI18DcIMGf1UgbW1t2zxwERPgjokByshxAcoBUAcBygBwAcoCUAUg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxZQA/oCcAHKaCNus5F/kyRus+KXMzMBcAHKAOMNIW6znH8BygABIG7y0IABzJUxcAHKAOLJAfsAigCYfwHKAMhwAcoAcAHKACRus51/AcoABCBu8tCAUATMljQDcAHKAOIkbrOdfwHKAAQgbvLQgFAEzJY0A3ABygDicAHKAAJ/AcoAAslYzAJUBxEdBwYRHAYFERsFBBEaBAMRGQMCERgCAREXAREW2zxXEF8PbGHbPH843o4B9oF0+Ciz8vRWFVYVVhVWFVYVVhVWFVYVVhVWFVYVVhVWFVYVVhVWFVYVVhVWFVYVVhVWFREVESsRFREUESoRFBETESkRExESESgREhEREScREREQESYREA8RJQ8OESQODREjDQwRIgwLESELChEgCgkRHwkIER4IBxEdB40CTAYRHAYFERsFBBEaBAMRGQMCERgCAREXAREW2zxXEF8PbGHbPHA43o4C8oIAxO34QW8kECNfAxEXERgRFxEWERgRFhEVERgRFREUERgRFBETERgRExESERgREhERERgREREQERgREA8RGA8OERgODREYDQwRGAwLERgLChEYCgkRGAkIERgIBxEYBwYRGAYFERgFBBEYBAMRGAMCERgCAREY2zyWjwBUAREXAfL0ERQRFREUERMRFBETERIRExESEREREhERERAR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');
    const __system = Cell.fromBase64('te6cckICASsAAQAAT8IAAAEBwAABAgEgAQMAAgIBWADkAAMBBbd8sAAEART/APSkE/S88sgLAAUCAWIARAAGAgEgACsABwIBIAAWAAgCASAADQAJAgEgAAsACgIZszi2zzbPFcQXw9sYYADOAOACGbJNNs82zxXEF8PbGGAAzgAMAARWEAIBIAASAA4CAVgAEQAPAhip49s82zxXEF8PbGEAzgAQAARWEQB0qbuNDVpcGZzOi8vUW1SOWZrUXdHNXRBRmpvRTNITE5MSmNNeUU4d1Q4Y292OGdVYUV1S2dkMkpUQ4AIDlLAAFQATAhex+2ebZ4riC+HtjDAAzgAUAAIjAA+33aiaGkAAMAIBIAApABcCASAAJwAYAgEgACMAGQIBIAAcABoCGKq52zzbPFcQXw9sYQDOABsAAisCASAAHgAdALenowTgudh6ullc9j0J2HOslQo2zQThO6xqWlbI+WZFp15b++LEcwTgQKuANwDOxymcsHVcjktlhwTgN6k73yqLLeOOp6e8CrOGTQThOy6ctWadluZ0HSzbKM3RSQIBagAhAB8CF7MbZ5tniuIL4e2MMADOACAABFYVAhexe2ebZ4riC+HtjDAAzgAiAAIlAgJ0ACYAJAIXv72zzbPFcQXw9sYYAM4AJQAEVhMCF77Ns82zxXEF8PbGGADOANgCGbPX9s82zxXEF8PbGGAAzgAoAARWEgIZt6NbZ5tniuIL4e2MMADOACoAAi0CASAAOwAsAgEgADYALQIBIAAxAC4CASAAMAAvAhmtDW2ebZ4riC+HtjDAAM4AnQIZrKBtnm2eK4gvh7YwwADOANoCASAANAAyAhmvT+2ebZ4riC+HtjDAAM4AMwACLgIZrRptnm2eK4gvh7YwwADOADUAAigCASAAOgA3AgFYADkAOAIYqhnbPNs8VxBfD2xhAM4A2wIYqLvbPNs8VxBfD2xhAM4A3AJtscR2zwRFREWERURFBEVERQRExEUERMREhETERIRERESEREREBERERAPERAPVQ7bPFcQXw9sYYADOAGcCASAAPgA8Ahm1BXtnm2eK4gvh7YwwAM4APQACLwIBIABDAD8CASAAQQBAAhmt522ebZ4riC+HtjDAAM4A2QIZr1Ztnm2eK4gvh7YwwADOAEIAAiwCs7JrQEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCI2zwRFREXERURFBEWERQRExEVERMREhEUERIRERETEREREBESERAPEREPDhEQDhDfVRzbPFcQXw9sYYADOALwD0tAB0NMDAXGwowH6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIVFBTA28E+GEC+GLbPBEVERcRFREUERYRFBETERURExESERQREhERERMREREQERIREA8REQ8OERAOVR3bPPLgggDOAEgARQE8yPhDAcx/AcoAERYRFREUERMREhERERBV4Ns8ye1UAEYB0AERFQERFoEBAc8AARETAYEBAc8AARERAYEBAc8AD8iBAQHPAB6BAQHPABz0ABr0ABj0AAbI9AAV9AAT9AABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WAcj0ABL0ABPKAFADAEcAniDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFshQBM8WyVADzBOBAQHPABSBAQHPAATI9AAVgQEBzwAVgQEBzwDJWMzJAczJAczJAcwE7u2i7fsBkjB/4HAh10nCH5UwINcLH94gghBzYtCcuo67MNMfAYIQc2LQnLry4IHTP/oA+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiFQTAxAjbBTbPH/gIIIQe92X3rqPCDDbPGwW2zx/4CCCECb4aNO6AMcBJgDDAEkEdI6cMNMfAYIQJvho07ry4IHTD9TU1PoAVUBsFds8f+AgghBLN8Yhuo8IMNs8bBjbPH/gIIIQpAb/lboAvwC9ALYASgTQjpkw0x8BghCkBv+VuvLggdMP1AHQEmwS2zx/4CCCEGq4wEG6jpUw0x8BghBquMBBuvLggdP/ATHbPH/gIIIQR7j/lrqOmTDTHwGCEEe4/5a68uCB0w/UAdASbBLbPH/gIIIQg2kg8roAsACtAKgASwTyjyww0x8BghCDaSDyuvLggds8BvQEgQEB1wDT/9QB0IEBAdcAMBoUQzBsGts8f+AgghCaKvIeuo6YMNMfAYIQmiryHrry4IHTD9P/WWwS2zx/4CCCENUydtu6jhQw0x8BghDVMnbbuvLggdM/ATEwf+AgghAzkNNougCnAI4AiwBMBMyOmDDTHwGCEDOQ02i68uCBgQEB1wABMds8f+AgghC0uwq1uo6VMNMfAYIQtLsKtbry4IHUAdAx2zx/4CCCEGrfeIG6jpgw0x8BghBq33iBuvLggYEBAdcAATHbPH/gIIIQldb9oroAiACFAIIATQTgjrgw0x8BghCV1v2iuvLggYEBAdcA+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiBJsEts8f+AgghDDpb3iuo6YMNMfAYIQw6W94rry4IGBAQHXAAEx2zx/4CCCEKOnKlS64wIgghBs1X/QugB/AHwAdwBOBP6OvzDTHwGCEGzVf9C68uCBgQEB1wCBAQHXAIEBAdcA1AHQ9ASBAQHXAFkC9ASBAQHXAFkyEEcQRhBFQwBsF9s8f+AgghAMWJCGuo6kMNMfAYIQDFiQhrry4IGBAQHXAIEBAdcAgQEB1wBVIGwT2zx/4CCCELQEyDK64wIgwAAiAHIAcABrAE8D/tdJwSGwklt/4CCCEJRqmLa6jqgw0x8BghCUapi2uvLggdM/ATHIAYIQr/kPV1jLH8s/yfhCAXBt2zx/4CCCEAph21m6jrkw0x8BghAKYdtZuvLggfpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgBgQEB1wBZbBLbPH8BGwBiAFAEtuAgghBRPvNeuo65MNMfAYIQUT7zXrry4IH6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIAYEBAdcAWWwS2zx/4CCCEBcyviG64wIgghD2LAzxuuMCwAAAXgBdAFoAUQEKkTDjDXAAUgP++QEggvA6EjLdmaHztOWG/4J258U6NeX9Zxj3fF/F7YFYR63dP7qOhjDbPH/bMeAggvDvs0eWdhNuRCS9aLAWKcJumCFDoGRXlCHmEpfBaOdxkbqOhjDbPH/bMeCC8CKPzpKPrFRIYCA91HKrDgW+XbmAxClrjfONC2q+fWpPugBYAFYAUwEQjoXbPH/bMeAAVAH2gXT4KLPy9FYVVhVWFVYVVhVWFVYVVhVWFVYVVhVWFVYVVhVWFVYVVhVWFVYVVhVWFVYVERURKxEVERQRKhEUERMRKRETERIRKBESERERJxERERARJhEQDxElDw4RJA4NESMNDBEiDAsRIQsKESAKCREfCQgRHggHER0HAFUCTAYRHAYFERsFBBEaBAMRGQMCERgCAREXAREW2zxXEF8PbGHbPHA4ANkAugHwggDjwCiz8vRWFVYVVhVWFVYVVhVWFVYVVhVWFVYVVhVWFVYVVhVWFVYVVhVWFVYVVhVWFREVESsRFREUESoRFBETESkRExESESgREhEREScREREQESYREA8RJQ8OESQODREjDQwRIgwLESELChEgCgkRHwkIER4IAFcCVAcRHQcGERwGBREbBQQRGgQDERkDAhEYAgERFwERFts8VxBfD2xh2zx/OADZALoB8FYVVhVWFVYVVhVWFVYVVhVWFVYVVhVWFVYVVhVWFVYVVhVWFVYVVhVWFVYVERURKxEVERQRKhEUERMRKRETERIRKBESERERJxERERARJhEQDxElDw4RJA4NESMNDBEiDAsRIQsKESAKCREfCQgRHggHER0HBhEcBgBZA4YFERsFBBEaBAMRGQMCERgCAREXAREW2zxXEF8PbGHbPIFaAREUwgABERQB8vT4QW8kECNfA3CDBn9VIG1tbds8cBETANgAugEiAXAw0x8BghD2LAzxuvLggYEBAdcA+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiBJsEts8fwBbAfIrgQEBI1n0DW+hkjBt3yBukjBtjifQ9AT6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIEmwSbwLigVTlIW6z8vQgbvLQgG8iMIEBAQLIWQL0AAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxbJEDwSAFwAHiBulTBZ9FowlEEz9BXiCQGQMNMfAYIQFzK+Ibry4IGBAQHXAPpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgSbBKBHwv4QW8kECNfAyLHBfL02zx/AGAC7BEVERcRFREUERYRFBETERcRExESERYREhERERcREREQERYREA8RFw8OERYODREXDQwRFgwLERcLChEWCgkRFwkIERYIBxEXBwYRFgYFERcFBBEWBAMRFwMCERYCAREXAREW2zwRFREXERURFBEWERQRExEVERMAaABfAUAREhEUERIRERETEREREBESERAPEREPDhEQDhDfVRzbPABgAvQRFREXERURFBEWERQRExEXERMREhEWERIREREXEREREBEWERAPERcPDhEWDg0RFw0MERYMCxEXCwoRFgoJERcJCBEWCAcRFwcGERYGBREXBQQRFgQDERcDAhEWAgERFwERFlYX2zyBbD34QW8kECNfAxLHBfL0KYEBAQBnAGEBwFYZWfQNb6GSMG3fIG6SMG2OJ9D0BPpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgSbBJvAuIgbvLQgG8igQELAREZcHEhbpVbWfRZMJjIAc8AQTP0QeKBAQERGABmAuwRFREXERURFBEWERQRExEXERMREhEWERIREREXEREREBEWERAPERcPDhEWDg0RFw0MERYMCxEXCwoRFgoJERcJCBEWCAcRFwcGERYGBREXBQQRFgQDERcDAhEWAgERFwERFts8ERURFxEVERQRFhEUERMRFRETAGgAYwFAERIRFBESERERExERERAREhEQDxERDw4REA4Q31Uc2zwAZAL2ERURFxEVERQRFhEUERMRFxETERIRFhESERERFxERERARFhEQDxEXDw4RFg4NERcNDBEWDAsRFwsKERYKCREXCQgRFggHERcHBhEWBgURFwUEERYEAxEXAwIRFgIBERcBERZWF9s8ggCFJvhBbyQQI18DEscF8vQpgQEBAGcAZQHAVhlZ9A1voZIwbd8gbpIwbY4n0PQE+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiBJsEm8C4iBu8tCAbyKBAQsBERl/cSFulVtZ9FkwmMgBzwBBM/RB4oEBAREYAGYA6shZAvQAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFskQOgIRFwIBERgBIG6VMFn0WjCUQTP0FeIRExEVERMREhEUERIRERETEREREBESERAPEREPDhEQDhDfEM4QvRCsEJsQigkQaBBXEEYQNUQwEgCagQEBKwJZ9A1voZIwbd8gbpIwbY4n0PQE+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiBJsEm8C4oFU5SFus/L0IG7y0IBvIjEC6ikRFBEWERQRExEVERMREhEWERIREREVEREREBEWERAPERUPDhEWDg0RFQ0MERYMCxEVCwoRFgoJERUJCBEWCAcRFQcGERYGBREVBQQRFgQDERUDAhEWAgERFQERFoEBAREW2zwCERgCAREXAVn0DW+hkjBt3wDcAGkB+iBukjBtjifQ9AT6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIEmwSbwLiggDTByFus/L0IG7y0IBvIjCBAQv4QW8kECNfA3FBM/QKb6GUAdcAMJJbbeKCANMHIW6zmAEgbvLQgMD/kjFw4vL0ERMRFRETERIRFBESAGoALBERERMREREQERIREA8REQ8OERAOVR0BPDDTHwGCELQEyDK68uCBgQEB1wCBAQHXAFlsEts8fwBsAfBWF1YXVhdWF1YXVhdWF1YXVhdWF1YXVhdWF1YXVhdWF1YXVhdWF1YXVhdWFxEVES0RFREUESwRFBETESsRExESESoREhERESkREREQESgREA8RJw8OESYODRElDQwRJAwLESMLChEiCgkRIQkIESAIBxEfBwYRHgYAbQL4BREdBQQRHAQDERsDAhEaAgERGQERGNs8VxBfD2xhERYRGBEWERURFxEVERQRGBEUERMRFxETERIRGBESERERFxERERARGBEQDxEXDw4RGA4NERcNDBEYDAsRFwsKERgKCREXCQgRGAgHERcHBhEYBgURFwUEERgEAxEXAwDgAG4CdAIRGAIBERcB2zwRFREXERURFBEWERQRExEVERMREhEUERIRERETEREREBESERAPEREPDhEQDlUd2zwAugBvAO4vgQEBI1n0DW+hkjBt3yBukjBtl9D0BAExbwHigTjeIW6z8vQgbvLQgG8hgQEBbSBukjBtjhIgbvLQgG8iyFkC9ACBAQHPAMniQTAgbpUwWfRaMJRBM/QV4oEBAQHIAQH0AMkDERADEiBulTBZ9FowlEEz9BXiDQH0XwNWFVYVVhVWFVYVVhVWFVYVVhVWFVYVVhVWFVYVVhVWFVYVVhVWFVYVVhVWFREVESsRFREUESoRFBETESkRExESESgREhEREScREREQESYREA8RJQ8OESQODREjDQwRIgwLESELChEgCgkRHwkIER4IBxEdBwYRHAYAcQJABREbBQQRGgQDERkDAhEYAgERFwERFts8VxBfD2xh2zwA4AC6AfBWHFYcVhxWHFYcVhxWHFYcVhxWHFYcVhxWHFYcVhxWHFYcVhxWHFYcVhxWHBEVETIRFREUETERFBETETARExESES8REhERES4REREQES0REA8RLA8OESsODREqDQwRKQwLESgLChEnCgkRJgkIESUIBxEkBwYRIwYAcwL4BREiBQQRIQQDESADAhEfAgERHgERHds8VxBfD2xhERYRHREWERURHBEVERQRGxEUERMRGhETERIRGRESERERGBERERARFxEQDxEdDw4RHA4NERsNDBEaDAsRGQsKERgKCREXCQgRHQgHERwHBhEbBgURGgUEERkEAxEYAwDgAHQCpAIRFwIBER0B2zwRFREcERURFBEbERQRExEaERMREhEZERIREREYEREREBEXERAPERYPDhEVDg0RFA0MERMMCxESCwoREQoJERAJEI8QflVm2zwAugB1Ae5WE4EBAShZ9A1voZIwbd8gbpIwbZfQ9AQBMW8B4iBulDBtbwHeIG7y0IBvISCBAQEoWfQNb6GSMG3fIG6SMG2X0PQEATFvAeIgbpQwbW8B3iBu8tCAbyFVIoEBAQbIVTBENAL0AIEBAc8AAgL0AIEBAc8AyUMwFAB2AIggbpUwWfRaMJRBM/QV4oEBAQHIAQH0AMlBMCBulTBZ9FowlEEz9BXigQEBAcgBAfQAyRA/EiBulTBZ9FowlEEz9BXiDAFSMNMfAYIQo6cqVLry4IGBAQHXAIEBAdcA9ASBAQHXAFkQJBAjbBTbPH8AeAHwVhlWGVYZVhlWGVYZVhlWGVYZVhlWGVYZVhlWGVYZVhlWGVYZVhlWGVYZVhkRFREvERURFBEuERQRExEtERMREhEsERIRERErEREREBEqERAPESkPDhEoDg0RJw0MESYMCxElCwoRJAoJESMJCBEiCAcRIQcGESAGAHkC+AURHwUEER4EAxEdAwIRHAIBERsBERrbPFcQXw9sYREWERoRFhEVERkRFREUERgRFBETERcRExESERoREhERERkREREQERgREA8RFw8OERoODREZDQwRGAwLERcLChEaCgkRGQkIERgIBxEXBwYRGgYFERkFBBEYBAMRFwMA4AB6AoQCERoCAREZAds8ERURGREVERQRGBEUERMRFxETERIRFhESERERFRERERARFBEQDxETDw4REg4NERENDBEQDFU72zwAugB7ANRWEYEBASVZ9A1voZIwbd8gbpIwbZfQ9AQBMW8B4iBulDBtbwHeIG7y0IBvIQKBAQECyFkC9ACBAQHPAMlBMCBulTBZ9FowlEEz9BXigQEBAcgBAfQAyQMREAMSIG6VMFn0WjCUQTP0FeINAfBWFlYWVhZWFlYWVhZWFlYWVhZWFlYWVhZWFlYWVhZWFlYWVhZWFlYWVhZWFhEVESwRFREUESsRFBETESoRExESESkREhERESgREREQEScREA8RJg8OESUODREkDQwRIwwLESILChEhCgkRIAkIER8IBxEeBwYRHQYAfQL4BREcBQQRGwQDERoDAhEZAgERGAERF9s8VxBfD2xhERYRFxEWERURFxEVERQRFxEUERMRFxETERIRFxESERERFxERERARFxEQDxEXDw4RFw4NERcNDBEXDAsRFwsKERcKCREXCQgRFwgHERcHBhEXBgURFwUEERcEAxEXAwDgAH4BzAIRFwIBERcB2zwwgQEBAREWbSBulTBZ9FowlEEz9BTiERSlIKoAc6kEpBEUERURFBETERQRExESERMREhERERIREREQEREREA8REA8Q7xDeEM0QvBCrEJoQiRB4EGcQVhBFEDQQIwC6AfBWF1YXVhdWF1YXVhdWF1YXVhdWF1YXVhdWF1YXVhdWF1YXVhdWF1YXVhdWFxEVES0RFREUESwRFBETESsRExESESoREhERESkREREQESgREA8RJw8OESYODRElDQwRJAwLESMLChEiCgkRIQkIESAIBxEfBwYRHgYAgAL4BREdBQQRHAQDERsDAhEaAgERGQERGNs8VxBfD2xhERYRGBEWERURFxEVERQRGBEUERMRFxETERIRGBESERERFxERERARGBEQDxEXDw4RGA4NERcNDBEYDAsRFwsKERgKCREXCQgRGAgHERcHBhEYBgURFwUEERgEAxEXAwDgAIEB0AIRGAIBERcB2zwwEoEBAQIBERcBERYgbpUwWfRaMJRBM/QU4hEUpCCqAHOpBKQRExEVERMREhEUERIRERETEREREBESERAPEREPDhEQDhDfEM4QvRCsEJsQihB5EGgQVxBGEDUQJBAjALoB8FYWVhZWFlYWVhZWFlYWVhZWFlYWVhZWFlYWVhZWFlYWVhZWFlYWVhZWFlYWERURLBEVERQRKxEUERMRKhETERIRKRESERERKBERERARJxEQDxEmDw4RJQ4NESQNDBEjDAsRIgsKESEKCREgCQgRHwgHER4HBhEdBgCDAvgFERwFBBEbBAMRGgMCERkCAREYAREX2zxXEF8PbGERFhEXERYRFREXERURFBEXERQRExEXERMREhEXERIREREXEREREBEXERAPERcPDhEXDg0RFw0MERcMCxEXCwoRFwoJERcJCBEXCAcRFwcGERcGBREXBQQRFwQDERcDANoAhAFqAhEXAgERFwHbPBEVERYRFREUERURFBETERQRExESERMREhERERIREREQEREREA8REA9VDjUAugHwVhZWFlYWVhZWFlYWVhZWFlYWVhZWFlYWVhZWFlYWVhZWFlYWVhZWFlYWVhYRFREsERURFBErERQRExEqERMREhEpERIREREoEREREBEnERAPESYPDhElDg0RJA0MESMMCxEiCwoRIQoJESAJCBEfCAcRHgcGER0GAIYC+AURHAUEERsEAxEaAwIRGQIBERgBERfbPFcQXw9sYREWERcRFhEVERcRFREUERcRFBETERcRExESERcREhERERcREREQERcREA8RFw8OERcODREXDQwRFwwLERcLChEXCgkRFwkIERcIBxEXBwYRFwYFERcFBBEXBAMRFwMA2gCHAYYCERcCAREXAds8NREUERURFBETERQRExESERMREhERERIREREQEREREA8REA8Q7xDeEM0QvBCrEJoQiRB4EGcQVlUDALoB8FYWVhZWFlYWVhZWFlYWVhZWFlYWVhZWFlYWVhZWFlYWVhZWFlYWVhZWFlYWERURLBEVERQRKxEUERMRKhETERIRKRESERERKBERERARJxEQDxEmDw4RJQ4NESQNDBEjDAsRIgsKESEKCREgCQgRHwgHER4HBhEdBgCJAvgFERwFBBEbBAMRGgMCERkCAREYAREX2zxXEF8PbGERFhEXERYRFREXERURFBEXERQRExEXERMREhEXERIREREXEREREBEXERAPERcPDhEXDg0RFw0MERcMCxEXCwoRFwoJERcJCBEXCAcRFwcGERcGBREXBQQRFwQDERcDANoAigFqAhEXAgERFwHbPBEVERYRFREUERURFBETERQRExESERMREhERERIREREQEREREA8REA9VDjQAugHwVhdWF1YXVhdWF1YXVhdWF1YXVhdWF1YXVhdWF1YXVhdWF1YXVhdWF1YXVhcRFREtERURFBEsERQRExErERMREhEqERIREREpEREREBEoERAPEScPDhEmDg0RJQ0MESQMCxEjCwoRIgoJESEJCBEgCAcRHwcGER4GAIwC+AURHQUEERwEAxEbAwIRGgIBERkBERjbPFcQXw9sYREWERgRFhEVERcRFREUERgRFBETERcRExESERgREhERERcREREQERgREA8RFw8OERgODREXDQwRGAwLERcLChEYCgkRFwkIERgIBxEXBwYRGAYFERcFBBEYBAMRFwMA2gCNAcQCERgCAREXAds8gQEBIBBKEwIRGQIBERgBIW6VW1n0WjCYyAHPAEEz9ELiERMRFRETERIRFBESERERExERERAREhEQDxERDw4REA4Q3xDOEL0QrBCbEIoQeQgQVxBGEDVEAwC6AfYRFREfERURFBEeERQRExEdERMREhEcERIREREbEREREBEaERAPERkPDhEYDg0RFw0MERYMCxEfCwoRHgoJER0JCBEcCAcRGwcGERoGBREZBQQRGAQDERcDAhEWAgERHwERHoFNUCiz8vRWFVYVVhVWFVYVVhVWFVYVVhUAjwL8VhVWFVYVVhVWFVYVVhVWFVYVVhVWFVYVVhURFRErERURFBEqERQRExEpERMREhEoERIREREnEREREBEmERAPESUPDhEkDg0RIw0MESIMCxEhCwoRIAoJER8JCBEeCAcRHQcGERwGBREbBQQRGgQDERkDAhEYAgERFwERFts8ANsAkAP6VxBfD2xh2zyBZoxWEYEBAVYiWfQNb6GSMG3fIG6SMG2Oh9DbPGwWbwbibvL0VhrQ0v8wVhrQ0v8wERURFxEVERQRFhEUERMRFxETERIRFhESERERFxERERARFhEQDxEXDw4RFg4NERcNDBEWDAsRFwsKERYKCREXCQgRFggAugCmAJED/AcRFwcGERYGBREXBQQRFgQDERcDAhEWAgERFwERFlYdViDbPBEfVh5WHlYeVh5WHshVUNs8yfkAERURGBEVERQRFxEUERMRFhETERIRFRESERERFBERERARExEQDxESDw4REQ4NERANEM8QvhCtEJwQixB6EGkQWBBHEDZFQADMAKUAkgT4AxEfAwIBERkBER/bPBEVERcRFREUERYRFBETERURExESERQREhERERMREREQERIREA8REQ8OERAOVR0BERwBVhxWG9s8BREbBQQRGAQDERcDAhEWAgERGQERGlVAgQEBBshVUNs8yRAsVhgBIG6VMFn0WjCUQTP0FeIRFgCkAJUAlACTAJrIAYIQuYXWiljLH4EBAc8AyciCWMAAAAAAAAAAAAAAAAEBy2fMyXD7AA4RFQ4NERQNDBETDAsREgsKEREKDhEQDhCPEH5VZhAmRRNBRABWUFbL/1AD+gLMzMs/ASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFgPuERYRGREWERURGBEVERQRFxEUERMRGRETERIRGBESERERFxERERARGREQDxEYDw4RFw4NERkNDBEYDAsRFwsKERkKCREYCQgRFwgHERkHBhEYBgURFwUEERkEAxEYAwIRFwIBERkBERhWF9s8cAGK5FtXFlcWVxYAowCXAJYAQBESERUREhERERQREREQERMREA8REg8OEREODREQDVUsAuSBAQFUUgBSMEEz9AxvoZQB1wAwkltt4iBu8tCAIMAGjqHAAo4bpAERFwERFgERFQERFAEREwEREgEREQEREFXR4w3jDREVERcRFREUERYRFBETERURExESERQREhERERMREREQERIREA8REQ8OERAOVR0AngCYA9YwERURFxEVERQRFhEUERMRFxETERIRFhESERERFxERERARFhEQDxEXDw4RFg4NERcNDBEWDAsRFwsKERYKCREXCQgRFggHERcHBhEWBgURFwUEERYEAxEXAwIRFgIBERcBERbbPFYZAbrjDwCdAJsAmQO4VhpWGlYagQEBVhICWfQNb6GSMG3fIG6SMG2Oh9DbPGwXbwfigRAhIW6z8vQgbvLQgG8nbGH4QW8kECNfA21wyMnQIRBXVVDIVWDbPMmCEAq6lQB/cFAEA21t2zwAoQCaASIAyIIQD4p+pVAIyx8Wyz9QBPoCWCDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFgEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxYhbrOVfwHKAMyUcDLKAOIB+gIBzxYCXlYaVhqBaxv4J28Q+EFvJBNfA6FTKKC88vRTBqABERUBoREUJqCIEn9wRARtbds8AJwBIgA6AAAAAEZyb20gRW1tZXQuRmluYW5jZSBCcmlkZ2UABFYUAdARFREXERURFBEWERQRExEXERMREhEWERIREREXEREREBEWERAPERcPDhEWDg0RFw0MERYMCxEXCwoRFgoJERcJCBEWCAcRFwcGERYGBREXBQQRFgQDERcDAhEWAgERFwERFlYaVhpWGgCfA6SBAQFWEgJZ9A1voZIwbd8gbpIwbY6H0Ns8bBdvB+KCAL/MIW6z8vQgbvLQgG8nEFZfBvgobXDIydAQNRBGyFVQ2zzJghAExLQAf3BQBANtbds8AKEAoAEiAMiCEIm3HQlQB8sfUAUg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxZQAyDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFoEBAc8AIW6zlX8BygDMlHAyygDiAfoCAc8WAfbUAdAB+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiAH6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIAdMHgQEB1wDUAdCBAQHXAPpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgxECcQJhAlECQAogAEECMAuoEBAVYQQBNZ9A1voZIwbd8gbpIwbZfQ9AQBMW8B4oE43iFus/L0IG7y0IBvIYEBAVhZ9A1voZIwbd8gbpIwbZ3Q9ASBAQHXAFlsEm8C4oFhZCFus/L0IG7y0IBvIgCscAGORyGBAQEiWfQNb6GSMG3fIG6SMG2c0NQB0AHT/1lsEm8C4iBu8tCAbyIngQEBIln0DG+hkjBt326zmyRZ+RCBP9YB8vSkkVvi5DGCALdWMiK+8vQAaIIQgCE38VAHyx8Vyw8Tyw8B+gLMzAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxYAWNP/+gDU1NM/+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiBYVFEMwAHLTHwGCEIAhN/G68uCB0w/TD/oA1NT6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIFhUUQzAB8FYXVhdWF1YXVhdWF1YXVhdWF1YXVhdWF1YXVhdWF1YXVhdWF1YXVhdWF1YXERURLREVERQRLBEUERMRKxETERIRKhESERERKRERERARKBEQDxEnDw4RJg4NESUNDBEkDAsRIwsKESIKCREhCQgRIAgHER8HBhEeBgCpAvgFER0FBBEcBAMRGwMCERoCAREZAREY2zxXEF8PbGERFhEYERYRFREXERURFBEYERQRExEXERMREhEYERIREREXEREREBEYERAPERcPDhEYDg0RFw0MERgMCxEXCwoRGAoJERcJCBEYCAcRFwcGERgGBREXBQQRGAQDERcDANoAqgJ0AhEYAgERFwHbPBEVERcRFREUERYRFBETERURExESERQREhERERMREREQERIREA8REQ8OERAOVR3bPAC6AKsBxhEUERcRFBETERYRExESERUREhERERcREREQERYREA8RFQ8OERcODREWDQwRFQwLERcLChEWCgkRFQkIERcIBxEWBwYRFQYFERcFBBEWBAMRFQMCERcCAREWAREVgWToERhWFwCsAfyBAQEtAln0DW+hkjBt3yBukjBtl9DUAdAxbwHibrMBERkB8vSBAQERFsgByAHPFskBzMkQOwIRFgIBERcBIG6VMFn0WjCUQTP0FeIREhEVERIREREUEREREBETERAPERIPDhERDg0REA0QzxC+EK0QnAsQehBpEFgQRxA2RQQAtQHwVhZWFlYWVhZWFlYWVhZWFlYWVhZWFlYWVhZWFlYWVhZWFlYWVhZWFlYWVhYRFREsERURFBErERQRExEqERMREhEpERIREREoEREREBEnERAPESYPDhElDg0RJA0MESMMCxEiCwoRIQoJESAJCBEfCAcRHgcGER0GAK4C+AURHAUEERsEAxEaAwIRGQIBERgBERfbPFcQXw9sYREWERcRFhEVERcRFREUERcRFBETERcRExESERcREhERERcREREQERcREA8RFw8OERcODREXDQwRFwwLERcLChEXCgkRFwkIERcIBxEXBwYRFwYFERcFBBEXBAMRFwMA2gCvAugCERcCAREXAds8gQEBbSBukjBtjo0gbvLQgG8nyFVg2zzJ4gMREAMSAREYASBulTBZ9FowlEEz9BXiERQRFREUERMRFBETERIRExESEREREhERERAREREQDxEQDw4PEM0QvBCrEJoQiRB4EGcQVhBFEDRBMAC6ALkB8FYXVhdWF1YXVhdWF1YXVhdWF1YXVhdWF1YXVhdWF1YXVhdWF1YXVhdWF1YXERURLREVERQRLBEUERMRKxETERIRKhESERERKRERERARKBEQDxEnDw4RJg4NESUNDBEkDAsRIwsKESIKCREhCQgRIAgHER8HBhEeBgCxAvgFER0FBBEcBAMRGwMCERoCAREZAREY2zxXEF8PbGERFhEYERYRFREXERURFBEYERQRExEXERMREhEYERIREREXEREREBEYERAPERcPDhEYDg0RFw0MERgMCxEXCwoRGAoJERcJCBEYCAcRFwcGERgGBREXBQQRGAQDERcDANoAsgJ0AhEYAgERFwHbPBEVERcRFREUERYRFBETERURExESERQREhERERMREREQERIREA8REQ8OERAOVR3bPAC6ALMByBEUERcRFBETERYRExESERUREhERERcREREQERYREA8RFQ8OERcODREWDQwRFQwLERcLChEWCgkRFQkIERcIBxEWBwYRFQYFERcFBBEWBAMRFQMCERcCAREWAREVggDelhEYVhcAtAH+gQEBLQJZ9A1voZIwbd8gbpIwbZfQ1AHQMW8B4m6zswERGQHy9IEBAREWyAHIAc8WyQHMyRA7AhEWAgERFwEgbpUwWfRaMJRBM/QV4hESERUREhERERQREREQERMREA8REg8OEREODREQDRDPEL4QrRCcCxB6EGkQWBBHEDZFBAC1AARAEwHwVh1WHVYdVh1WHVYdVh1WHVYdVh1WHVYdVh1WHVYdVh1WHVYdVh1WHVYdVh0RFREzERURFBEyERQRExExERMREhEwERIREREvEREREBEuERAPES0PDhEsDg0RKw0MESoMCxEpCwoRKAoJEScJCBEmCAcRJQcGESQGALcC+AURIwUEESIEAxEhAwIRIAIBER8BER7bPFcQXw9sYREWER4RFhEVER0RFREUERwRFBETERsRExESERoREhERERkREREQERgREA8RFw8OER4ODREdDQwRHAwLERsLChEaCgkRGQkIERgIBxEXBwYRHgYFER0FBBEcBAMRGwMA2gC4AvwCERoCAREZAds8ERURHREVERQRHBEUERMRGxETERIRGhESERERGRERERARGBEQDxEXDw4RFg4NERUNDBEUDAsREwsKERIKCRERCQgREAhVdxBnEFYQRUMwEFYQRgeBAQEIFhVDMMhVYNs8yQMREQMgbpUwWfRaMJRBM/QV4g4AugC5APDIUAfPFslQB8xQBCDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFlgg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxbLB4EBAc8AAsiBAQHPAAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxbJAcwC8oIAxO34QW8kECNfAxEXERgRFxEWERgRFhEVERgRFREUERgRFBETERgRExESERgREhERERgREREQERgREA8RGA8OERgODREYDQwRGAwLERgLChEYCgkRGAkIERgIBxEYBwYRGAYFERgFBBEYBAMRGAMCERgCAREY2zwAvAC7AFQBERcB8vQRFBEVERQRExEUERMREhETERIRERESEREREBERERAPERAPVQ4A1IEBASwCWfQNb6GSMG3fIG6SMG2OJ9D0BPpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgSbBJvAuIgbpJbcOAgbvLQgG8iMIEBC1hxQTP0Cm+hlAHXADCSW23iIG6SMHDgIG7y0IABytMfAYIQSzfGIbry4IGBAQHXANQB0AH6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIAdMHgQEB1wDUAdCBAQHXAPpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgBAL4AVPpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgxEDgQNxA2EDUQNAH2ERURGhEVERQRGREUERMRGBETERIRFxESERERFhERERARGhEQDxEZDw4RGA4NERcNDBEWDAsRGgsKERkKCREYCQgRFwgHERYHBhEaBgURGQUEERgEAxEXAwIRFgIBERoBERmBTVAos/L0ERWkVhkDAhEXAiFWGgIBER0BAMAC+BEaWhUUVHVDVHVDyFVQ2zzJ+QCBAQFTDQMRHwFBM/QMb6GUAdcAMJJbbeKCAMRFIW6z8vSCAPe1+EFvJBNfAwIgbvLQgFYfoCmgEr7y9BEWER0RFhEVERcRFREUER0RFBETERcRExESER0REhERERcREREQER0REA8RFw8AywDBAvgOER0ODREXDQwRHQwLERcLChEdCgkRFwkIER0IBxEXBwYRHQYFERcFBBEdBAMRGgMCERkCAREYAREcgUNe+EFvJBNfAyK+8vQRE1YToAERFAERE6AREwQRFgQDERwDAhEZAgERGAERF4EBAREcyFVQ2zzJECsBERcBVhYBAMsAwgDMIG6VMFn0WjCUQTP0FeIRFMgBghBmZAnlWMsfgQEBzwDJyIJYwAAAAAAAAAAAAAAAAQHLZ8zJcPsADhEVDg0RFA0MERMMCxESCwoREQoJERAJEM8QfhBtEFwQSxA6SRdQg1AGBUQUAew1XwOCAIpn+EFvJBAjXwMqxwXy9BEVERcRFREUERYRFBETERcRExESERYREhERERcREREQERYREA8RFw8OERYODREXDQwRFgwLERcLChEWCgkRFwkIERYIBxEXBwYRFgYFERcFBBEWBAMRFwMCERYCAREXAREWAMQB9IFNUCiz8vQRF9MPgQEBVFoAUkBBM/QMb6GUAdcAMJJbbeKCAMRFIW6z8vSCAPe1+EFvJBNfAwIgbvLQgCegEr7y9BEWpBEW1NTUMFYZA1YZVEUDWhUUERcRGxEXERYRGhEWERURGREVERQRGBEUERMRGxETERIRGhESAMUE/hERERkREREQERgREA8RGw8OERoODREZDQwRGAwLERsLChEaCgkRGQkIERgIBxEbBwYRGgYFERkFBBEYBAMRGwMCER0CAREcAREa2zxWF1YXVhtWHlYeVh3IVVDbPMn5AAQRGAQDERcDAhEaAgERHAERG4EBAREayFVQ2zzJECwAzADLAMsAxgDMAREVAVYXASBulTBZ9FowlEEz9BXiERXIAYIQZmQJ5VjLH4EBAc8AyciCWMAAAAAAAAAAAAAAAAEBy2fMyXD7AA8RFQ8OERQODRETDQwREgwLERELChEQChDvEI4QfRBsVVUQNUQUAfYxMhEVERcRFREUERYRFBETERcRExESERYREhERERcREREQERYREA8RFw8OERYODREXDQwRFgwLERcLChEWCgkRFwkIERYIBxEXBwYRFgYFERcFBBEWBAMRFwMCERYCAREXAREWgU1QKLPy9BEX0w8RFREWERURFBEWERQAyAL6ERMRFhETERIRFhESERERFhERERARFhEQDxEWDw4RFg4NERYNDBEWDAsRFgsKERYKCREWCQgRFggHERYHBhEWBgURFgUEERYEAxEWAwIRFgIBERYBERhWF1YX2zyBAQFUWQBWGQFBM/QMb6GUAdcAMJJbbeKCAMRFIW6z8vQAzADJA+SCAPe1+EFvJBNfAwIgbvLQgCagEr7y9BEVpBEY1NTUMAQRGQQTVhoDAhEZAgFaFRRUdUNUdUPIVVDbPMn5ABBGEDVGVoEBAQbIVVDbPMkQL1LwIG6VMFn0WjCUQTP0FeINyAGCEGZkCeVYyx+BAQHPAMkAywDLAMoAaMiCWMAAAAAAAAAAAAAAAAEBy2fMyXD7ABERERQREREQERMREA8REg8OEREODREQDRDPVSsAGlBWy/9QA/oCzMzMyz8B9IF8oQLCABLy9BEVERYRFREUERYRFBETERYRExESERYREhERERYREREQERYREA8RFg8OERYODREWDQwRFgwLERYLChEWCgkRFgkRFggHBlVAggCmwBEXgQEBLQJZ9A1voZIwbd8gbpIwbZfQ1AHQMW8B4m6zAREXAfL0AM0ASBEUERURFBETERQRExESERMREhERERIREREQEREREA8REA9VDgOQ7UTQ1AH4Y9IAAY6o2zxXFhEUERURFBETERQRExESERMREhERERIREREQEREREA8REA9VDuD4KNcLCoMJuvLgids8CNFVBts8AOIA4QDPAe5tbW1tbW1tbW1wcFMR+EFvJBAjXwMVcYEBAQIBEREBERAgbpUwWfRaMJRBM/QU4lPjVhVTR1YZVhJWElYSVhJWElYSVhlWE1YTVhFWIlYiViJWIlYUViNWFREVERoRFREUESoRFBETERgRExESERsREhERESsREQDQAvwREBEjERAPESIPDhEhDg0RIA0MER8MCxEeCwoRJAoJER0JCBEcCAcRGQcGESkGBREoBQQRJwQDESYDAhEXAgERJQERFts8VxBfD2xh+EFvJBAjXwMGERcGBBEVBAcRFAcGERMGDxESDw4REQ4NERANEM8QvhCtEKwQmxCKEFkA4ADRAvgQSBBFEDTbPFYVVhVWFVYVVhVWFVYVVhVWFVYVVhVWFVYVVhVWFVYVVhVWFVYVVhVWFVYVERURKxEVERQRKhEUERMRKRETERIRKBESERERJxERERARJhEQDxElDw4RJA4NESMNDBEiDAsRIQsKESAKCREfCQgRHggHER0HAN0A0gP4BhEcBgURGwUEERoEAxEZAwIRGAIBERcBERbbPFcQXw9sYfhBbyQQI18D2zxWFVYVVhVWFVYVVhVWFVYVVhVWFVYVVhVWFVYVVhVWFVYVVhVWFVYVVhVWFREVESsRFREUESoRFBETESkRExESESgREhEREScREREQESYREADcAN0A0wP4DxElDw4RJA4NESMNDBEiDAsRIQsKESAKCREfCQgRHggHER0HBhEcBgURGwUEERoEAxEZAwIRGAIBERcBERbbPFcQXw9sYfhBbyQQI18D2zxWFVYVVhVWFVYVVhVWFVYVVhVWFVYVVhVWFVYVVhVWFVYVVhVWFVYVVhVWFQDbAN0A1AP8ERURKxEVERQRKhEUERMRKRETERIRKBESERERJxERERARJhEQDxElDw4RJA4NESMNDBEiDAsRIQsK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');
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
    25832: { message: `Previously unsupported chain. Use Add instead.` },
    26252: { message: `Transaction already submitted` },
    27419: { message: `Insufficient Funds` },
    27709: { message: `AccessControl: Sender Cannot Revoke this Role. Not a Role Admin` },
    27831: { message: `Only owner can call this function` },
    27954: { message: `JettonMaster: Only Admin can set new owner.` },
    29133: { message: `JettonWallet: Not allow negative balance after internal transfer` },
    29944: { message: `Pausable: Contract is already unpaused` },
    30061: { message: `JettonMaster: Jetton is not mintable` },
    31905: { message: `The amount must be 0 < amount < 2^256` },
    33124: { message: `Unsupported to chain for cross chain token strategy storage` },
    34086: { message: `AccessControl: Sender Cannot Grant this Role. Not a Role Admin` },
    35431: { message: `Only Burner Can Call this Method` },
    35462: { message: `JettonMaster: Only Admin can set new admin.` },
    37185: { message: `Not enough funds to transfer` },
    42526: { message: `Unsupported target_token for cross chain token strategy storage` },
    42688: { message: `Unsupported chain ID` },
    43365: { message: `JettonMaster: Sender is not a Jetton owner` },
    46934: { message: `Threshold not reached.` },
    47048: { message: `JettonWallet: Only owner can burn tokens` },
    49100: { message: `Invalid wrapped token id provided` },
    50157: { message: `Previously Processed Transaction.` },
    50245: { message: `Fees not configured for this chain` },
    50413: { message: `AccessControl: Doesnt have the role` },
    54023: { message: `AccessControl: Doesn't have role` },
    56982: { message: `Overwriting an existing chain. Use Update instead.` },
    58304: { message: `Pausable: Contract is already paused` },
    59332: { message: `Target chainId cannot equal native or zero` },
    60354: { message: `JettonWallet: Not enough balance to burn tokens` },
    63413: { message: `Insufficient fee coverage.` },
}

const Bridge_types: ABIType[] = [
    {"name":"StateInit","header":null,"fields":[{"name":"code","type":{"kind":"simple","type":"cell","optional":false}},{"name":"data","type":{"kind":"simple","type":"cell","optional":false}}]},
    {"name":"Context","header":null,"fields":[{"name":"bounced","type":{"kind":"simple","type":"bool","optional":false}},{"name":"sender","type":{"kind":"simple","type":"address","optional":false}},{"name":"value","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"raw","type":{"kind":"simple","type":"slice","optional":false}}]},
    {"name":"SendParameters","header":null,"fields":[{"name":"bounce","type":{"kind":"simple","type":"bool","optional":false}},{"name":"to","type":{"kind":"simple","type":"address","optional":false}},{"name":"value","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"mode","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"body","type":{"kind":"simple","type":"cell","optional":true}},{"name":"code","type":{"kind":"simple","type":"cell","optional":true}},{"name":"data","type":{"kind":"simple","type":"cell","optional":true}}]},
    {"name":"Deploy","header":2490013878,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"DeployOk","header":2952335191,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"FactoryDeploy","header":1829761339,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"cashback","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"JettonTransfer","header":260734629,"fields":[{"name":"query_id","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"destination","type":{"kind":"simple","type":"address","optional":false}},{"name":"response_destination","type":{"kind":"simple","type":"address","optional":false}},{"name":"custom_payload","type":{"kind":"simple","type":"cell","optional":true}},{"name":"forward_ton_amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"forward_payload","type":{"kind":"simple","type":"slice","optional":false,"format":"remainder"}}]},
    {"name":"JettonTransferNotification","header":1935855772,"fields":[{"name":"query_id","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"sender","type":{"kind":"simple","type":"address","optional":false}},{"name":"forward_payload","type":{"kind":"simple","type":"slice","optional":false,"format":"remainder"}}]},
    {"name":"JettonBurn","header":1499400124,"fields":[{"name":"query_id","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"response_destination","type":{"kind":"simple","type":"address","optional":false}},{"name":"custom_payload","type":{"kind":"simple","type":"cell","optional":true}},{"name":"forward_ton_amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"forward_payload","type":{"kind":"simple","type":"slice","optional":false,"format":"remainder"}}]},
    {"name":"JettonExcesses","header":3576854235,"fields":[{"name":"query_id","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"JettonInternalTransfer","header":395134233,"fields":[{"name":"query_id","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"from","type":{"kind":"simple","type":"address","optional":false}},{"name":"response_address","type":{"kind":"simple","type":"address","optional":false}},{"name":"forward_ton_amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"forward_payload","type":{"kind":"simple","type":"slice","optional":false,"format":"remainder"}}]},
    {"name":"JettonBurnNotification","header":2078119902,"fields":[{"name":"query_id","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"sender","type":{"kind":"simple","type":"address","optional":false}},{"name":"response_destination","type":{"kind":"simple","type":"address","optional":false}},{"name":"forward_ton_amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"forward_payload","type":{"kind":"simple","type":"slice","optional":false,"format":"remainder"}}]},
    {"name":"WalletData","header":null,"fields":[{"name":"balance","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"owner","type":{"kind":"simple","type":"address","optional":false}},{"name":"jetton","type":{"kind":"simple","type":"address","optional":false}},{"name":"jetton_wallet_code","type":{"kind":"simple","type":"cell","optional":false}}]},
    {"name":"JettonData","header":null,"fields":[{"name":"total_supply","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"mintable","type":{"kind":"simple","type":"bool","optional":false}},{"name":"admin_address","type":{"kind":"simple","type":"address","optional":false}},{"name":"jetton_content","type":{"kind":"simple","type":"cell","optional":false}},{"name":"jetton_wallet_code","type":{"kind":"simple","type":"cell","optional":false}}]},
    {"name":"JettonMint","header":2310479113,"fields":[{"name":"origin","type":{"kind":"simple","type":"address","optional":false}},{"name":"receiver","type":{"kind":"simple","type":"address","optional":false}},{"name":"amount","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"custom_payload","type":{"kind":"simple","type":"cell","optional":true}},{"name":"forward_ton_amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"forward_payload","type":{"kind":"simple","type":"slice","optional":false,"format":"remainder"}}]},
    {"name":"UpdateAdmin","header":367316568,"fields":[{"name":"new_admin","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"UpdateOwner","header":559076492,"fields":[{"name":"new_owner","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"GrantRole","header":174185305,"fields":[{"name":"to","type":{"kind":"simple","type":"address","optional":false}},{"name":"role_id","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"RevokeRole","header":1363080030,"fields":[{"name":"to","type":{"kind":"simple","type":"address","optional":false}},{"name":"role_id","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"RenounceRole","header":389201441,"fields":[{"name":"role_id","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"address","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"UpdateRoleAdmin","header":4130082033,"fields":[{"name":"role_id","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"new_admin","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"RoleData","header":null,"fields":[{"name":"roles","type":{"kind":"dict","key":"address","value":"bool"}},{"name":"admin_role","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"TokenType","header":null,"fields":[{"name":"is_native_coin","type":{"kind":"simple","type":"bool","optional":false}},{"name":"is_native_token","type":{"kind":"simple","type":"bool","optional":false}},{"name":"is_wrapped_token","type":{"kind":"simple","type":"bool","optional":false}}]},
    {"name":"SentInstallment","header":1717832165,"fields":[{"name":"tx_hash","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"ReceivedInstallment","header":3112556170,"fields":[{"name":"tx_hash","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"Installment","header":2149660657,"fields":[{"name":"from_chain","type":{"kind":"simple","type":"uint","optional":false,"format":16}},{"name":"target_chain","type":{"kind":"simple","type":"uint","optional":false,"format":16}},{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"from_token","type":{"kind":"simple","type":"cell","optional":false}},{"name":"to_token","type":{"kind":"simple","type":"cell","optional":false}},{"name":"recepient","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"SignerAndSignature","header":null,"fields":[{"name":"signature","type":{"kind":"simple","type":"slice","optional":false}},{"name":"key","type":{"kind":"simple","type":"uint","optional":false,"format":256}}]},
    {"name":"ReceiveInstallment","header":2204705010,"fields":[{"name":"installment","type":{"kind":"simple","type":"Installment","optional":false}},{"name":"signatures","type":{"kind":"dict","key":"int","value":"SignerAndSignature","valueFormat":"ref"}},{"name":"len","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"tx_hash","type":{"kind":"simple","type":"uint","optional":false,"format":256}},{"name":"id","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"FreezeTon","header":653813971,"fields":[{"name":"target_chain","type":{"kind":"simple","type":"uint","optional":false,"format":16}},{"name":"to_token","type":{"kind":"simple","type":"cell","optional":false}},{"name":"to","type":{"kind":"simple","type":"cell","optional":false}},{"name":"from_token","type":{"kind":"simple","type":"cell","optional":false}},{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}}]},
    {"name":"MapContract","header":1261946401,"fields":[{"name":"token_id","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"token_symbol","type":{"kind":"simple","type":"string","optional":false}},{"name":"contract","type":{"kind":"simple","type":"address","optional":false}},{"name":"decimals","type":{"kind":"simple","type":"uint","optional":false,"format":8}},{"name":"fee","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"fee_decimals","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"swap_address","type":{"kind":"simple","type":"address","optional":false}},{"name":"token_bridge_wallet_address","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"AddChain","header":2751922069,"fields":[{"name":"chain_id","type":{"kind":"simple","type":"uint","optional":false,"format":16}},{"name":"chain_name","type":{"kind":"simple","type":"string","optional":false}}]},
    {"name":"UpdateChain","header":1203306390,"fields":[{"name":"chain_id","type":{"kind":"simple","type":"uint","optional":false,"format":16}},{"name":"chain_name","type":{"kind":"simple","type":"string","optional":false}}]},
    {"name":"SetChainFee","header":2586505758,"fields":[{"name":"chain_id","type":{"kind":"simple","type":"uint","optional":false,"format":16}},{"name":"fee","type":{"kind":"simple","type":"uint","optional":false,"format":256}}]},
    {"name":"OutgoingTransaction","header":null,"fields":[{"name":"id","type":{"kind":"simple","type":"uint","optional":false,"format":256}},{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"from_token","type":{"kind":"simple","type":"cell","optional":false}},{"name":"to_token","type":{"kind":"simple","type":"cell","optional":false}},{"name":"to","type":{"kind":"simple","type":"cell","optional":false}},{"name":"target_chain_id","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"IncomingTransaction","header":null,"fields":[{"name":"id","type":{"kind":"simple","type":"uint","optional":false,"format":256}},{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"from_token","type":{"kind":"simple","type":"cell","optional":false}},{"name":"to_token","type":{"kind":"simple","type":"cell","optional":false}},{"name":"target_chain_id","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"to","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"InstallmentOut","header":null,"fields":[{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":256}},{"name":"to","type":{"kind":"simple","type":"string","optional":false}},{"name":"target_chain","type":{"kind":"simple","type":"uint","optional":false,"format":16}},{"name":"token_id","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"Token","header":null,"fields":[{"name":"symbol","type":{"kind":"simple","type":"string","optional":false}},{"name":"address","type":{"kind":"simple","type":"address","optional":false}},{"name":"swap_address","type":{"kind":"simple","type":"address","optional":false}},{"name":"decimals","type":{"kind":"simple","type":"uint","optional":false,"format":8}},{"name":"fee","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"fee_decimals","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"token_bridge_wallet_address","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"ChainName","header":null,"fields":[{"name":"name","type":{"kind":"simple","type":"string","optional":false}}]},
    {"name":"UpdateBaseUri","header":3032156853,"fields":[{"name":"new_base_uri","type":{"kind":"simple","type":"string","optional":false}}]},
    {"name":"UpdateTransferFee","header":1793030273,"fields":[{"name":"new_fee","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"RemoveMappedContract","header":1790492737,"fields":[{"name":"token_id","type":{"kind":"simple","type":"uint","optional":false,"format":256}}]},
    {"name":"Strategies","header":null,"fields":[{"name":"strategies","type":{"kind":"dict","key":"int","value":"Steps","valueFormat":"ref"}}]},
    {"name":"ToTokenCrossChainStrategy","header":null,"fields":[{"name":"to_token","type":{"kind":"dict","key":"int","value":"CrossChainStrategy","valueFormat":"ref"}}]},
    {"name":"CrossChainTokenStrategy","header":null,"fields":[{"name":"from_token","type":{"kind":"dict","key":"int","value":"ToTokenCrossChainStrategy","valueFormat":"ref"}}]},
    {"name":"TargetTokenToSteps","header":null,"fields":[{"name":"i","type":{"kind":"dict","key":"int","value":"Steps","valueFormat":"ref"}}]},
    {"name":"Steps","header":null,"fields":[{"name":"steps","type":{"kind":"dict","key":"int","value":"int"}},{"name":"size","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"CrossChainStrategy","header":null,"fields":[{"name":"local_steps","type":{"kind":"simple","type":"Steps","optional":false}},{"name":"foreign_steps","type":{"kind":"simple","type":"Steps","optional":false}}]},
    {"name":"TargetTokenToCrossChainStrategy","header":null,"fields":[{"name":"i","type":{"kind":"dict","key":"int","value":"CrossChainStrategy","valueFormat":"ref"}}]},
    {"name":"FromTokenToTargetTokenToCrossChainStrategy","header":null,"fields":[{"name":"i","type":{"kind":"dict","key":"int","value":"TargetTokenToCrossChainStrategy","valueFormat":"ref"}}]},
    {"name":"UpdateProtocolFee","header":865129320,"fields":[{"name":"new_fee","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"AddValidator","header":2513894818,"fields":[{"name":"key","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"address","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"RemoveValidator","header":3282419170,"fields":[{"name":"key","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"SetIncomingStrategy","header":2745641556,"fields":[{"name":"from_token","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"target_token","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"steps","type":{"kind":"simple","type":"Steps","optional":false}}]},
    {"name":"SetCrossChainStrategy","header":1825931216,"fields":[{"name":"target_chain","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"from_token","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"target_token","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"local_steps","type":{"kind":"simple","type":"Steps","optional":false}},{"name":"foreign_steps","type":{"kind":"simple","type":"Steps","optional":false}}]},
    {"name":"RemoveInternalStrategy","header":3020212274,"fields":[{"name":"from_token","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"target_token","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"RemoveCrossChainStrategy","header":207130758,"fields":[{"name":"target_chain","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"from_token","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"target_token","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
]

const Bridge_getters: ABIGetter[] = [
    {"name":"withdrawer_role_id","arguments":[],"returnType":{"kind":"simple","type":"int","optional":false,"format":257}},
    {"name":"pauser_role_id","arguments":[],"returnType":{"kind":"simple","type":"int","optional":false,"format":257}},
    {"name":"mapping_admin_role_id","arguments":[],"returnType":{"kind":"simple","type":"int","optional":false,"format":257}},
    {"name":"bridge_validator_role_id","arguments":[],"returnType":{"kind":"simple","type":"int","optional":false,"format":257}},
    {"name":"manager_role_id","arguments":[],"returnType":{"kind":"simple","type":"int","optional":false,"format":257}},
    {"name":"base_uri","arguments":[],"returnType":{"kind":"simple","type":"string","optional":false}},
    {"name":"protocol_fee","arguments":[],"returnType":{"kind":"simple","type":"int","optional":false,"format":257}},
    {"name":"nonce","arguments":[],"returnType":{"kind":"simple","type":"int","optional":false,"format":257}},
    {"name":"native_coin","arguments":[],"returnType":{"kind":"simple","type":"int","optional":false,"format":257}},
    {"name":"fees","arguments":[],"returnType":{"kind":"simple","type":"int","optional":false,"format":257}},
    {"name":"TVL","arguments":[],"returnType":{"kind":"simple","type":"int","optional":false,"format":257}},
    {"name":"chain_nonce","arguments":[],"returnType":{"kind":"simple","type":"int","optional":false,"format":257}},
    {"name":"incoming","arguments":[],"returnType":{"kind":"dict","key":"int","value":"IncomingTransaction","valueFormat":"ref"}},
    {"name":"outgoing","arguments":[],"returnType":{"kind":"dict","key":"int","value":"OutgoingTransaction","valueFormat":"ref"}},
    {"name":"tokens","arguments":[],"returnType":{"kind":"dict","key":"int","value":"Token","valueFormat":"ref"}},
    {"name":"supported_chains","arguments":[],"returnType":{"kind":"dict","key":"int","value":"ChainName","valueFormat":"ref"}},
    {"name":"chain_fees","arguments":[],"returnType":{"kind":"dict","key":"int","value":"int"}},
    {"name":"incoming_strategy","arguments":[],"returnType":{"kind":"dict","key":"int","value":"TargetTokenToSteps","valueFormat":"ref"}},
    {"name":"cross_chain_strategy","arguments":[],"returnType":{"kind":"dict","key":"int","value":"FromTokenToTargetTokenToCrossChainStrategy","valueFormat":"ref"}},
    {"name":"has_role","arguments":[{"name":"address","type":{"kind":"simple","type":"address","optional":false}},{"name":"role_id","type":{"kind":"simple","type":"int","optional":false,"format":257}}],"returnType":{"kind":"simple","type":"bool","optional":false}},
    {"name":"role_admin","arguments":[{"name":"role_id","type":{"kind":"simple","type":"int","optional":false,"format":257}}],"returnType":{"kind":"simple","type":"address","optional":false}},
    {"name":"admin_role_id","arguments":[],"returnType":{"kind":"simple","type":"int","optional":false,"format":257}},
]

const Bridge_receivers: ABIReceiver[] = [
    {"receiver":"internal","message":{"kind":"typed","type":"JettonTransferNotification"}},
    {"receiver":"internal","message":{"kind":"typed","type":"JettonBurnNotification"}},
    {"receiver":"internal","message":{"kind":"typed","type":"FreezeTon"}},
    {"receiver":"internal","message":{"kind":"typed","type":"MapContract"}},
    {"receiver":"internal","message":{"kind":"typed","type":"AddChain"}},
    {"receiver":"internal","message":{"kind":"typed","type":"RemoveMappedContract"}},
    {"receiver":"internal","message":{"kind":"typed","type":"UpdateChain"}},
    {"receiver":"internal","message":{"kind":"text","text":"WithdrawFees"}},
    {"receiver":"internal","message":{"kind":"typed","type":"ReceiveInstallment"}},
    {"receiver":"internal","message":{"kind":"typed","type":"SetChainFee"}},
    {"receiver":"internal","message":{"kind":"typed","type":"JettonExcesses"}},
    {"receiver":"internal","message":{"kind":"typed","type":"UpdateProtocolFee"}},
    {"receiver":"internal","message":{"kind":"typed","type":"UpdateBaseUri"}},
    {"receiver":"internal","message":{"kind":"typed","type":"UpdateTransferFee"}},
    {"receiver":"internal","message":{"kind":"typed","type":"AddValidator"}},
    {"receiver":"internal","message":{"kind":"typed","type":"RemoveValidator"}},
    {"receiver":"internal","message":{"kind":"typed","type":"SetIncomingStrategy"}},
    {"receiver":"internal","message":{"kind":"typed","type":"SetCrossChainStrategy"}},
    {"receiver":"internal","message":{"kind":"typed","type":"RemoveCrossChainStrategy"}},
    {"receiver":"internal","message":{"kind":"typed","type":"RemoveInternalStrategy"}},
    {"receiver":"internal","message":{"kind":"empty"}},
    {"receiver":"internal","message":{"kind":"text","text":"Pause"}},
    {"receiver":"internal","message":{"kind":"text","text":"Unpause"}},
    {"receiver":"internal","message":{"kind":"typed","type":"Deploy"}},
    {"receiver":"internal","message":{"kind":"typed","type":"GrantRole"}},
    {"receiver":"internal","message":{"kind":"typed","type":"RevokeRole"}},
    {"receiver":"internal","message":{"kind":"typed","type":"RenounceRole"}},
    {"receiver":"internal","message":{"kind":"typed","type":"UpdateRoleAdmin"}},
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
        types:  Bridge_types,
        getters: Bridge_getters,
        receivers: Bridge_receivers,
        errors: Bridge_errors,
    };
    
    private constructor(address: Address, init?: { code: Cell, data: Cell }) {
        this.address = address;
        this.init = init;
    }
    
    async send(provider: ContractProvider, via: Sender, args: { value: bigint, bounce?: boolean| null | undefined }, message: JettonTransferNotification | JettonBurnNotification | FreezeTon | MapContract | AddChain | RemoveMappedContract | UpdateChain | 'WithdrawFees' | ReceiveInstallment | SetChainFee | JettonExcesses | UpdateProtocolFee | UpdateBaseUri | UpdateTransferFee | AddValidator | RemoveValidator | SetIncomingStrategy | SetCrossChainStrategy | RemoveCrossChainStrategy | RemoveInternalStrategy | null | 'Pause' | 'Unpause' | Deploy | GrantRole | RevokeRole | RenounceRole | UpdateRoleAdmin) {
        
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
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'AddChain') {
            body = beginCell().store(storeAddChain(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'RemoveMappedContract') {
            body = beginCell().store(storeRemoveMappedContract(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'UpdateChain') {
            body = beginCell().store(storeUpdateChain(message)).endCell();
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
    
    async getSupportedChains(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('supported_chains', builder.build())).stack;
        let result = Dictionary.loadDirect(Dictionary.Keys.BigInt(257), dictValueParserChainName(), source.readCellOpt());
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