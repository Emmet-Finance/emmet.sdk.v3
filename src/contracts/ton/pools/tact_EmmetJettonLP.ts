//@ts-nocheck generated code cope
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
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeStateInit(src)).endCell());
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
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeContext(src)).endCell());
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
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeSendParameters(src)).endCell());
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
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeDeploy(src)).endCell());
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
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeDeployOk(src)).endCell());
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
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeFactoryDeploy(src)).endCell());
        },
        parse: (src) => {
            return loadFactoryDeploy(src.loadRef().beginParse());
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
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeJettonData(src)).endCell());
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
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeJettonMint(src)).endCell());
        },
        parse: (src) => {
            return loadJettonMint(src.loadRef().beginParse());
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
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeJettonTransfer(src)).endCell());
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
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeJettonTransferNotification(src)).endCell());
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
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeJettonBurn(src)).endCell());
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
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeJettonExcesses(src)).endCell());
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
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeJettonInternalTransfer(src)).endCell());
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
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeJettonBurnNotification(src)).endCell());
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
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeWalletData(src)).endCell());
        },
        parse: (src) => {
            return loadWalletData(src.loadRef().beginParse());
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
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeGrantRole(src)).endCell());
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
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeRevokeRole(src)).endCell());
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
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeRenounceRole(src)).endCell());
        },
        parse: (src) => {
            return loadRenounceRole(src.loadRef().beginParse());
        }
    }
}

export type UpdateRoleAdmin = {
    $$type: 'UpdateRoleAdmin';
    role_id: bigint;
    role_admin: bigint;
}

export function storeUpdateRoleAdmin(src: UpdateRoleAdmin) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(620382153, 32);
        b_0.storeInt(src.role_id, 257);
        b_0.storeInt(src.role_admin, 257);
    };
}

export function loadUpdateRoleAdmin(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 620382153) { throw Error('Invalid prefix'); }
    let _role_id = sc_0.loadIntBig(257);
    let _role_admin = sc_0.loadIntBig(257);
    return { $$type: 'UpdateRoleAdmin' as const, role_id: _role_id, role_admin: _role_admin };
}

function loadTupleUpdateRoleAdmin(source: TupleReader) {
    let _role_id = source.readBigNumber();
    let _role_admin = source.readBigNumber();
    return { $$type: 'UpdateRoleAdmin' as const, role_id: _role_id, role_admin: _role_admin };
}

function storeTupleUpdateRoleAdmin(source: UpdateRoleAdmin) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.role_id);
    builder.writeNumber(source.role_admin);
    return builder.build();
}

function dictValueParserUpdateRoleAdmin(): DictionaryValue<UpdateRoleAdmin> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeUpdateRoleAdmin(src)).endCell());
        },
        parse: (src) => {
            return loadUpdateRoleAdmin(src.loadRef().beginParse());
        }
    }
}

export type RoleData = {
    $$type: 'RoleData';
    roles: Dictionary<Address, boolean>;
    admin_role: bigint;
}

export function storeRoleData(src: RoleData) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeDict(src.roles, Dictionary.Keys.Address(), Dictionary.Values.Bool());
        b_0.storeInt(src.admin_role, 257);
    };
}

export function loadRoleData(slice: Slice) {
    let sc_0 = slice;
    let _roles = Dictionary.load(Dictionary.Keys.Address(), Dictionary.Values.Bool(), sc_0);
    let _admin_role = sc_0.loadIntBig(257);
    return { $$type: 'RoleData' as const, roles: _roles, admin_role: _admin_role };
}

function loadTupleRoleData(source: TupleReader) {
    let _roles = Dictionary.loadDirect(Dictionary.Keys.Address(), Dictionary.Values.Bool(), source.readCellOpt());
    let _admin_role = source.readBigNumber();
    return { $$type: 'RoleData' as const, roles: _roles, admin_role: _admin_role };
}

function storeTupleRoleData(source: RoleData) {
    let builder = new TupleBuilder();
    builder.writeCell(source.roles.size > 0 ? beginCell().storeDictDirect(source.roles, Dictionary.Keys.Address(), Dictionary.Values.Bool()).endCell() : null);
    builder.writeNumber(source.admin_role);
    return builder.build();
}

function dictValueParserRoleData(): DictionaryValue<RoleData> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeRoleData(src)).endCell());
        },
        parse: (src) => {
            return loadRoleData(src.loadRef().beginParse());
        }
    }
}

export type Withdraw = {
    $$type: 'Withdraw';
    rewards: bigint;
    address: Address;
}

export function storeWithdraw(src: Withdraw) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2018736038, 32);
        b_0.storeInt(src.rewards, 257);
        b_0.storeAddress(src.address);
    };
}

export function loadWithdraw(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2018736038) { throw Error('Invalid prefix'); }
    let _rewards = sc_0.loadIntBig(257);
    let _address = sc_0.loadAddress();
    return { $$type: 'Withdraw' as const, rewards: _rewards, address: _address };
}

function loadTupleWithdraw(source: TupleReader) {
    let _rewards = source.readBigNumber();
    let _address = source.readAddress();
    return { $$type: 'Withdraw' as const, rewards: _rewards, address: _address };
}

function storeTupleWithdraw(source: Withdraw) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.rewards);
    builder.writeAddress(source.address);
    return builder.build();
}

function dictValueParserWithdraw(): DictionaryValue<Withdraw> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeWithdraw(src)).endCell());
        },
        parse: (src) => {
            return loadWithdraw(src.loadRef().beginParse());
        }
    }
}

export type ReleaseTokens = {
    $$type: 'ReleaseTokens';
    to: Address;
    amount: bigint;
}

export function storeReleaseTokens(src: ReleaseTokens) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(456227478, 32);
        b_0.storeAddress(src.to);
        b_0.storeInt(src.amount, 257);
    };
}

export function loadReleaseTokens(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 456227478) { throw Error('Invalid prefix'); }
    let _to = sc_0.loadAddress();
    let _amount = sc_0.loadIntBig(257);
    return { $$type: 'ReleaseTokens' as const, to: _to, amount: _amount };
}

function loadTupleReleaseTokens(source: TupleReader) {
    let _to = source.readAddress();
    let _amount = source.readBigNumber();
    return { $$type: 'ReleaseTokens' as const, to: _to, amount: _amount };
}

function storeTupleReleaseTokens(source: ReleaseTokens) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.to);
    builder.writeNumber(source.amount);
    return builder.build();
}

function dictValueParserReleaseTokens(): DictionaryValue<ReleaseTokens> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeReleaseTokens(src)).endCell());
        },
        parse: (src) => {
            return loadReleaseTokens(src.loadRef().beginParse());
        }
    }
}

export type SetWalletAddress = {
    $$type: 'SetWalletAddress';
    token_wallet: Address;
}

export function storeSetWalletAddress(src: SetWalletAddress) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(907419751, 32);
        b_0.storeAddress(src.token_wallet);
    };
}

export function loadSetWalletAddress(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 907419751) { throw Error('Invalid prefix'); }
    let _token_wallet = sc_0.loadAddress();
    return { $$type: 'SetWalletAddress' as const, token_wallet: _token_wallet };
}

function loadTupleSetWalletAddress(source: TupleReader) {
    let _token_wallet = source.readAddress();
    return { $$type: 'SetWalletAddress' as const, token_wallet: _token_wallet };
}

function storeTupleSetWalletAddress(source: SetWalletAddress) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.token_wallet);
    return builder.build();
}

function dictValueParserSetWalletAddress(): DictionaryValue<SetWalletAddress> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeSetWalletAddress(src)).endCell());
        },
        parse: (src) => {
            return loadSetWalletAddress(src.loadRef().beginParse());
        }
    }
}

export type PoolPayload = {
    $$type: 'PoolPayload';
    mode: bigint;
}

export function storePoolPayload(src: PoolPayload) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeInt(src.mode, 257);
    };
}

export function loadPoolPayload(slice: Slice) {
    let sc_0 = slice;
    let _mode = sc_0.loadIntBig(257);
    return { $$type: 'PoolPayload' as const, mode: _mode };
}

function loadTuplePoolPayload(source: TupleReader) {
    let _mode = source.readBigNumber();
    return { $$type: 'PoolPayload' as const, mode: _mode };
}

function storeTuplePoolPayload(source: PoolPayload) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.mode);
    return builder.build();
}

function dictValueParserPoolPayload(): DictionaryValue<PoolPayload> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storePoolPayload(src)).endCell());
        },
        parse: (src) => {
            return loadPoolPayload(src.loadRef().beginParse());
        }
    }
}

export type Position = {
    $$type: 'Position';
    lastInternalFeeGrowth: bigint;
    rewards: bigint;
}

export function storePosition(src: Position) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeInt(src.lastInternalFeeGrowth, 257);
        b_0.storeInt(src.rewards, 257);
    };
}

export function loadPosition(slice: Slice) {
    let sc_0 = slice;
    let _lastInternalFeeGrowth = sc_0.loadIntBig(257);
    let _rewards = sc_0.loadIntBig(257);
    return { $$type: 'Position' as const, lastInternalFeeGrowth: _lastInternalFeeGrowth, rewards: _rewards };
}

function loadTuplePosition(source: TupleReader) {
    let _lastInternalFeeGrowth = source.readBigNumber();
    let _rewards = source.readBigNumber();
    return { $$type: 'Position' as const, lastInternalFeeGrowth: _lastInternalFeeGrowth, rewards: _rewards };
}

function storeTuplePosition(source: Position) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.lastInternalFeeGrowth);
    builder.writeNumber(source.rewards);
    return builder.build();
}

function dictValueParserPosition(): DictionaryValue<Position> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storePosition(src)).endCell());
        },
        parse: (src) => {
            return loadPosition(src.loadRef().beginParse());
        }
    }
}

export type RewardSplit = {
    $$type: 'RewardSplit';
    protocolFeeShare: bigint;
    lpProvidersShare: bigint;
}

export function storeRewardSplit(src: RewardSplit) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeInt(src.protocolFeeShare, 257);
        b_0.storeInt(src.lpProvidersShare, 257);
    };
}

export function loadRewardSplit(slice: Slice) {
    let sc_0 = slice;
    let _protocolFeeShare = sc_0.loadIntBig(257);
    let _lpProvidersShare = sc_0.loadIntBig(257);
    return { $$type: 'RewardSplit' as const, protocolFeeShare: _protocolFeeShare, lpProvidersShare: _lpProvidersShare };
}

function loadTupleRewardSplit(source: TupleReader) {
    let _protocolFeeShare = source.readBigNumber();
    let _lpProvidersShare = source.readBigNumber();
    return { $$type: 'RewardSplit' as const, protocolFeeShare: _protocolFeeShare, lpProvidersShare: _lpProvidersShare };
}

function storeTupleRewardSplit(source: RewardSplit) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.protocolFeeShare);
    builder.writeNumber(source.lpProvidersShare);
    return builder.build();
}

function dictValueParserRewardSplit(): DictionaryValue<RewardSplit> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeRewardSplit(src)).endCell());
        },
        parse: (src) => {
            return loadRewardSplit(src.loadRef().beginParse());
        }
    }
}

export type TokenTransfer = {
    $$type: 'TokenTransfer';
    query_id: bigint;
    amount: bigint;
    sender: Address;
    response_destination: Address | null;
    custom_payload: Cell | null;
    forward_ton_amount: bigint;
    forward_payload: Cell;
}

export function storeTokenTransfer(src: TokenTransfer) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(260734629, 32);
        b_0.storeUint(src.query_id, 64);
        b_0.storeCoins(src.amount);
        b_0.storeAddress(src.sender);
        b_0.storeAddress(src.response_destination);
        if (src.custom_payload !== null && src.custom_payload !== undefined) { b_0.storeBit(true).storeRef(src.custom_payload); } else { b_0.storeBit(false); }
        b_0.storeCoins(src.forward_ton_amount);
        b_0.storeBuilder(src.forward_payload.asBuilder());
    };
}

export function loadTokenTransfer(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 260734629) { throw Error('Invalid prefix'); }
    let _query_id = sc_0.loadUintBig(64);
    let _amount = sc_0.loadCoins();
    let _sender = sc_0.loadAddress();
    let _response_destination = sc_0.loadMaybeAddress();
    let _custom_payload = sc_0.loadBit() ? sc_0.loadRef() : null;
    let _forward_ton_amount = sc_0.loadCoins();
    let _forward_payload = sc_0.asCell();
    return { $$type: 'TokenTransfer' as const, query_id: _query_id, amount: _amount, sender: _sender, response_destination: _response_destination, custom_payload: _custom_payload, forward_ton_amount: _forward_ton_amount, forward_payload: _forward_payload };
}

function loadTupleTokenTransfer(source: TupleReader) {
    let _query_id = source.readBigNumber();
    let _amount = source.readBigNumber();
    let _sender = source.readAddress();
    let _response_destination = source.readAddressOpt();
    let _custom_payload = source.readCellOpt();
    let _forward_ton_amount = source.readBigNumber();
    let _forward_payload = source.readCell();
    return { $$type: 'TokenTransfer' as const, query_id: _query_id, amount: _amount, sender: _sender, response_destination: _response_destination, custom_payload: _custom_payload, forward_ton_amount: _forward_ton_amount, forward_payload: _forward_payload };
}

function storeTupleTokenTransfer(source: TokenTransfer) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.query_id);
    builder.writeNumber(source.amount);
    builder.writeAddress(source.sender);
    builder.writeAddress(source.response_destination);
    builder.writeCell(source.custom_payload);
    builder.writeNumber(source.forward_ton_amount);
    builder.writeSlice(source.forward_payload);
    return builder.build();
}

function dictValueParserTokenTransfer(): DictionaryValue<TokenTransfer> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeTokenTransfer(src)).endCell());
        },
        parse: (src) => {
            return loadTokenTransfer(src.loadRef().beginParse());
        }
    }
}

export type UpdateDeposit = {
    $$type: 'UpdateDeposit';
    feeGrowthGlobal: bigint;
    new_total_supply: bigint;
}

export function storeUpdateDeposit(src: UpdateDeposit) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2290426417, 32);
        b_0.storeInt(src.feeGrowthGlobal, 257);
        b_0.storeInt(src.new_total_supply, 257);
    };
}

export function loadUpdateDeposit(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2290426417) { throw Error('Invalid prefix'); }
    let _feeGrowthGlobal = sc_0.loadIntBig(257);
    let _new_total_supply = sc_0.loadIntBig(257);
    return { $$type: 'UpdateDeposit' as const, feeGrowthGlobal: _feeGrowthGlobal, new_total_supply: _new_total_supply };
}

function loadTupleUpdateDeposit(source: TupleReader) {
    let _feeGrowthGlobal = source.readBigNumber();
    let _new_total_supply = source.readBigNumber();
    return { $$type: 'UpdateDeposit' as const, feeGrowthGlobal: _feeGrowthGlobal, new_total_supply: _new_total_supply };
}

function storeTupleUpdateDeposit(source: UpdateDeposit) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.feeGrowthGlobal);
    builder.writeNumber(source.new_total_supply);
    return builder.build();
}

function dictValueParserUpdateDeposit(): DictionaryValue<UpdateDeposit> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeUpdateDeposit(src)).endCell());
        },
        parse: (src) => {
            return loadUpdateDeposit(src.loadRef().beginParse());
        }
    }
}

export type InternalWithdrawFee = {
    $$type: 'InternalWithdrawFee';
    lastFeeGrowth: bigint;
    owner: Address;
    balance: bigint;
}

export function storeInternalWithdrawFee(src: InternalWithdrawFee) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2441921564, 32);
        b_0.storeInt(src.lastFeeGrowth, 257);
        b_0.storeAddress(src.owner);
        b_0.storeInt(src.balance, 257);
    };
}

export function loadInternalWithdrawFee(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2441921564) { throw Error('Invalid prefix'); }
    let _lastFeeGrowth = sc_0.loadIntBig(257);
    let _owner = sc_0.loadAddress();
    let _balance = sc_0.loadIntBig(257);
    return { $$type: 'InternalWithdrawFee' as const, lastFeeGrowth: _lastFeeGrowth, owner: _owner, balance: _balance };
}

function loadTupleInternalWithdrawFee(source: TupleReader) {
    let _lastFeeGrowth = source.readBigNumber();
    let _owner = source.readAddress();
    let _balance = source.readBigNumber();
    return { $$type: 'InternalWithdrawFee' as const, lastFeeGrowth: _lastFeeGrowth, owner: _owner, balance: _balance };
}

function storeTupleInternalWithdrawFee(source: InternalWithdrawFee) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.lastFeeGrowth);
    builder.writeAddress(source.owner);
    builder.writeNumber(source.balance);
    return builder.build();
}

function dictValueParserInternalWithdrawFee(): DictionaryValue<InternalWithdrawFee> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeInternalWithdrawFee(src)).endCell());
        },
        parse: (src) => {
            return loadInternalWithdrawFee(src.loadRef().beginParse());
        }
    }
}

export type WithdrawCallback = {
    $$type: 'WithdrawCallback';
    feeGrowthGlobal: bigint;
    rewards: bigint;
}

export function storeWithdrawCallback(src: WithdrawCallback) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(167527793, 32);
        b_0.storeInt(src.feeGrowthGlobal, 257);
        b_0.storeInt(src.rewards, 257);
    };
}

export function loadWithdrawCallback(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 167527793) { throw Error('Invalid prefix'); }
    let _feeGrowthGlobal = sc_0.loadIntBig(257);
    let _rewards = sc_0.loadIntBig(257);
    return { $$type: 'WithdrawCallback' as const, feeGrowthGlobal: _feeGrowthGlobal, rewards: _rewards };
}

function loadTupleWithdrawCallback(source: TupleReader) {
    let _feeGrowthGlobal = source.readBigNumber();
    let _rewards = source.readBigNumber();
    return { $$type: 'WithdrawCallback' as const, feeGrowthGlobal: _feeGrowthGlobal, rewards: _rewards };
}

function storeTupleWithdrawCallback(source: WithdrawCallback) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.feeGrowthGlobal);
    builder.writeNumber(source.rewards);
    return builder.build();
}

function dictValueParserWithdrawCallback(): DictionaryValue<WithdrawCallback> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeWithdrawCallback(src)).endCell());
        },
        parse: (src) => {
            return loadWithdrawCallback(src.loadRef().beginParse());
        }
    }
}

export type Staked = {
    $$type: 'Staked';
    amount: bigint;
    staker: Address;
}

export function storeStaked(src: Staked) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(923309543, 32);
        b_0.storeInt(src.amount, 257);
        b_0.storeAddress(src.staker);
    };
}

export function loadStaked(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 923309543) { throw Error('Invalid prefix'); }
    let _amount = sc_0.loadIntBig(257);
    let _staker = sc_0.loadAddress();
    return { $$type: 'Staked' as const, amount: _amount, staker: _staker };
}

function loadTupleStaked(source: TupleReader) {
    let _amount = source.readBigNumber();
    let _staker = source.readAddress();
    return { $$type: 'Staked' as const, amount: _amount, staker: _staker };
}

function storeTupleStaked(source: Staked) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.amount);
    builder.writeAddress(source.staker);
    return builder.build();
}

function dictValueParserStaked(): DictionaryValue<Staked> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeStaked(src)).endCell());
        },
        parse: (src) => {
            return loadStaked(src.loadRef().beginParse());
        }
    }
}

export type LPTransfer = {
    $$type: 'LPTransfer';
    amount: bigint;
    to: Address;
}

export function storeLPTransfer(src: LPTransfer) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(4122418836, 32);
        b_0.storeInt(src.amount, 257);
        b_0.storeAddress(src.to);
    };
}

export function loadLPTransfer(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 4122418836) { throw Error('Invalid prefix'); }
    let _amount = sc_0.loadIntBig(257);
    let _to = sc_0.loadAddress();
    return { $$type: 'LPTransfer' as const, amount: _amount, to: _to };
}

function loadTupleLPTransfer(source: TupleReader) {
    let _amount = source.readBigNumber();
    let _to = source.readAddress();
    return { $$type: 'LPTransfer' as const, amount: _amount, to: _to };
}

function storeTupleLPTransfer(source: LPTransfer) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.amount);
    builder.writeAddress(source.to);
    return builder.build();
}

function dictValueParserLPTransfer(): DictionaryValue<LPTransfer> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeLPTransfer(src)).endCell());
        },
        parse: (src) => {
            return loadLPTransfer(src.loadRef().beginParse());
        }
    }
}

export type Withdrawn = {
    $$type: 'Withdrawn';
    user: Address;
    amount: bigint;
}

export function storeWithdrawn(src: Withdrawn) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(3502398954, 32);
        b_0.storeAddress(src.user);
        b_0.storeInt(src.amount, 257);
    };
}

export function loadWithdrawn(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 3502398954) { throw Error('Invalid prefix'); }
    let _user = sc_0.loadAddress();
    let _amount = sc_0.loadIntBig(257);
    return { $$type: 'Withdrawn' as const, user: _user, amount: _amount };
}

function loadTupleWithdrawn(source: TupleReader) {
    let _user = source.readAddress();
    let _amount = source.readBigNumber();
    return { $$type: 'Withdrawn' as const, user: _user, amount: _amount };
}

function storeTupleWithdrawn(source: Withdrawn) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.user);
    builder.writeNumber(source.amount);
    return builder.build();
}

function dictValueParserWithdrawn(): DictionaryValue<Withdrawn> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeWithdrawn(src)).endCell());
        },
        parse: (src) => {
            return loadWithdrawn(src.loadRef().beginParse());
        }
    }
}

export type RewardsPaid = {
    $$type: 'RewardsPaid';
    user: Address;
    amount: bigint;
}

export function storeRewardsPaid(src: RewardsPaid) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(3897230482, 32);
        b_0.storeAddress(src.user);
        b_0.storeInt(src.amount, 257);
    };
}

export function loadRewardsPaid(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 3897230482) { throw Error('Invalid prefix'); }
    let _user = sc_0.loadAddress();
    let _amount = sc_0.loadIntBig(257);
    return { $$type: 'RewardsPaid' as const, user: _user, amount: _amount };
}

function loadTupleRewardsPaid(source: TupleReader) {
    let _user = source.readAddress();
    let _amount = source.readBigNumber();
    return { $$type: 'RewardsPaid' as const, user: _user, amount: _amount };
}

function storeTupleRewardsPaid(source: RewardsPaid) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.user);
    builder.writeNumber(source.amount);
    return builder.build();
}

function dictValueParserRewardsPaid(): DictionaryValue<RewardsPaid> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeRewardsPaid(src)).endCell());
        },
        parse: (src) => {
            return loadRewardsPaid(src.loadRef().beginParse());
        }
    }
}

 type EmmetJettonLP_init_args = {
    $$type: 'EmmetJettonLP_init_args';
    admin: Address;
    owner: Address;
    bridge: Address;
    stake_token: Address;
    decimals: bigint;
    protocolFee: bigint;
    tokenFee: bigint;
    jetton_content: Cell;
}

function initEmmetJettonLP_init_args(src: EmmetJettonLP_init_args) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeAddress(src.admin);
        b_0.storeAddress(src.owner);
        b_0.storeAddress(src.bridge);
        let b_1 = new Builder();
        b_1.storeAddress(src.stake_token);
        b_1.storeInt(src.decimals, 257);
        b_1.storeInt(src.protocolFee, 257);
        let b_2 = new Builder();
        b_2.storeInt(src.tokenFee, 257);
        b_2.storeRef(src.jetton_content);
        b_1.storeRef(b_2.endCell());
        b_0.storeRef(b_1.endCell());
    };
}

async function EmmetJettonLP_init(admin: Address, owner: Address, bridge: Address, stake_token: Address, decimals: bigint, protocolFee: bigint, tokenFee: bigint, jetton_content: Cell) {
    const __code = Cell.fromBase64('te6ccgECegEAHqIAART/APSkE/S88sgLAQIBYgIDA8LQAdDTAwFxsKMB+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiFRQUwNvBPhhAvhi2zwREBESERAPEREPDhEQDhDfVRzbPPLggsj4QwHMfwHKABERERBV4Ns8ye1UawQFAgEgBwgB9gGSMH/gcCHXScIflTAg1wsf3iCCEDYWIGe6jl4w0x8BghA2FiBnuvLggfpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgxggCB3I0IYAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABFAKxwUZ8vR/4BEB9AEREAEREYEBAc8AHsoAUAwg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxYazFAIINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WBsiBAQHPAFAFINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WE/QABgC4gQEBzwDIWCDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFhKBAQHPABOBAQHPABP0AAPIgQEBzwAUgQEBzwAUgQEBzwAEyIEBAc8AyVAEzMlQA8zJWMzJAcwCASBFRgIBIAkKAgEgCwwCASBjZAIBWA0OAgEgX2ACAWZYWQIVrxbtnm2eNnq2EsBrDwL2VhBWEFYQVhBWEFYQVhBWEFYQVhBWEFYQVhBWEFYQVhBWEFYhViFWIVYh+CgREREmEREREBElERAPESQPDhEjDg0RIg0MESEMCxEgCwoRHwoJER4JCBEdCAcRHAcGERsGBREaBQQRGQQDERgDAhEXAgERFgH4Q/goEts8XhAAclcRVxFfDzAQSBA3RlAIERUIBxEUBwYREwYFERIFCBERCAcREAcQbxBeEI0QfBBrEFoQiRB4EGcQVgT+IIIQc2LQnLqPXDDTHwGCEHNi0Jy68uCB0z/6APpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IhUEwMQI2wUM4IApO74QW8kECNfAyzHBfL0AtMHMMABjoMx2zyOgwHbPOJ/4CCCEBsxepa64wIgwAAi10nBIbCSW3/gIBITFBUABhegBgL2gVrw+EFvJBNfAyaCCvrwgKC+8vRR0aD4QW8k+ChtcMjJ0FYVUTpBMxEaERwRGhEZERsRGREYERwRGBEXERsRFxEWERwRFgoRFQoRFBEcERQKERMKERIRHBESChERChEQERwREBCvDhEcDhCtDBEcDBCrChEcCts8JlYRNBYBcjDTHwGCEBsxepa68uCB+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiAGBAQHXAFlsEts8fxgE+oIQ1TJ227qOFDDTHwGCENUydtu68uCB0z8BMTB/4CCCEJGMxBy6jr8w0x8BghCRjMQcuvLggYEBAdcA+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiAGBAQHXAFUgbBPbPH/gIIIQlGqYtrrjAiCCEHvdl9664wIgHyAhIgPqyFmCEIiFIjFQA8sfgQEBzwCBAQHPAMmCCTEtAPhD+ChWFQHbPHBZyHABywFzAcsBcAHLABLMzMn5AMhyAcsBcAHLABLKB8v/ydAg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIf1AjcAFtbds8ARESARERXjcXAKLIWYIQNwiV51ADyx+BAQHPAAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxbJyIJYwAAAAAAAAAAAAAAAAQHLZ8zJcPsADhEQDhDfVRwC8lYSVhJWElYSVhJWElYSVhJWElYSVhJWElYSVhJWElYSVhIREBEjERAPESIPDhEhDg0RIA0MER8MCxEeCwoRHQoJERwJCBEbCAcRGgcGERkGBREYBQQRFwQDERYDAhEVAgERFAERE9s8VxBfDzERERETERFePw4REg51GQFoDRETDQwREgwLERMLChESCgkREwkIERIIBxETBwYREgYFERMFBBESBAMREwMCERICARETARoD/IIAxO34QW8kECNfAxESERMREhERERMREREQERMREA8REw8OERMODRETDQwREwwLERMLChETCgkREwkIERMIBxETBwYREwYFERMFBBETBAMREwMCERMCARET2zwBERIB8vQPERAPVQ5WEts8UXGgUnKhGKABERMBBqFtcMjJ0EcbHAA2I8IAllMDqCOpBJFw4iLCAJZREqgjqQSSMXDiA/5TEwRWFgRWF0FEA1VQyFVg2zzJUoBwgEB/BANtbds8ARERyFmCEPW3HpRQA8sfgQEBzwABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLg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BhEaBgURGQUEERgEAxEXAwIRFgIBERUBERRWF1YXVhdWF1YXVhdWF1YhViFWIRCJXwkvggCpZQLHBfL0gXVtVhDy9BEQERoREA8RGQ8zAqoREBESERBePg0REQ0MERIMCxERCwoREgoJEREJCBESCAcREQcGERIGBRERBQQREgQDEREDAhESAgEREQEREts8ERAREhEQDxERDw4REA4Q31Uc2zx/QDoDnI62MNMfAYIQUT7zXrry4IH6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIAYEBAdcAWWwS4CCCEBcyviG64wKCECT6R8m64wIwcD0+PwFYDhEYDg0RFw0MERYMCxEVCwoRFAoJERMJCBESCAcREQcGERAGEF8QTlWT2zw0ArwyNTU1NRERERUREREQERQREA8REw8OERIODREVDQwRFAwLERMLChESCgkRFQkIERQIBxETBwYREgYFERUFBBEUBAMREwMCERICAREVAREU+EP4KBLbPBESVhSgIVYTXjUD/nBZyHABywFzAcsBcAHLABLMzMn5AMhyAcsBcAHLABLKB8v/ydAg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIcH+AQCL4KBUEERoEAxEbAwIBERwBERkQI8hVUNs8yQYRFwYFERUFBBEWBAMRFANZERMQRhBF2zwMERAMEL82NzgAqoIQF41FGVAHyx8Vyz9QA/oCASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFgEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxYB+gIBzxYByshxAcoBUAcBygBwAcoCUAUg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxZQA/oCcAHKaCNus5F/kyRus+KXMzMBcAHKAOMNIW6znH8BygABIG7y0IABzJUxcAHKAOLJAfsAOQAqEK4QnRCMEHsQahBZEEgQN0YUUDMFAJh/AcoAyHABygBwAcoAJG6znX8BygAEIG7y0IBQBMyWNANwAcoA4iRus51/AcoABCBu8tCAUATMljQDcAHKAOJwAcoAAn8BygACyVjMAoQREBESERBePg0REQ0MERIMCxERCwoREgoJEREJCBESCAcREQcGERIGBRERBQQREgQDEREDAhESAgEREQERElYR2zxMOwLsggDE7fhBbyQQI18DERIRExESERERExERERARExEQDxETDw4REw4NERMNDBETDAsREwsKERMKCRETCQgREwgHERMHBhETBgUREwUEERMEAxETAwIREwIBERPbPAEREgHy9A8REA9VDimBAQFWE1n0DW+hkjBt30c8APIgbpIwbZ3Q9ASBAQHXAFlsEm8C4iBu8tCAbyKBAQsBERV/cSFulVtZ9FkwmMgBzwBBM/RB4oEBAREUyFkC9ACBAQHPAMkQOgIREwIBERIBIG6VMFn0WjCUQTP0FeIOERAOEN8QzhC9EKwQmxCKCRBoEFcQRhA1RDASAqoREBESERBePg0REQ0MERIMCxERCwoREgoJEREJCBESCAcREQcGERIGBRERBQQREgQDEREDAhESAgEREQEREts8ERAREhEQDxERDw4REA4Q31Uc2zx/QEIBkDDTHwGCEBcyviG68uCBgQEB1wD6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIEmwSgR8L+EFvJBAjXwMixwXy9Ns8f0IA3NMfAYIQJPpHybry4IGBAQHXAIEBAdcAWWwSK4EBASNZ9A1voZIwbd8gbpIwbZ3Q9ASBAQHXAFlsEm8C4oFU5SFus/L0IG7y0IBvIjCBAQECyFkC9ACBAQHPAMkQPBIgbpUwWfRaMJRBM/QV4gl/AvIpDxERD149DBEQDAsREQsKERAKCRERCQgREAgHEREHBhEQBgUREQUEERAEAxERAwIREAIBEREBERCBAQEREts8AhESAgEREwFZ9A1voZIwbd8gbpIwbZ3Q9ASBAQHXAFlsEm8C4oIA0wchbrPy9CBu8tCAbyIwgQELeEEAaPhBbyQQI18DcUEz9ApvoZQB1wAwkltt4oIA0wchbrOYASBu8tCAwP+SMXDi8vQOERAOVR0ChBEQERIREF4+DRERDQwREgwLERELChESCgkREQkIERIIBxERBwYREgYFEREFBBESBAMREQMCERICARERARESVhHbPExDAuyCAMTt+EFvJBAjXwMREhETERIRERETEREREBETERAPERMPDhETDg0REw0MERMMCxETCwoREwoJERMJCBETCAcREwcGERMGBRETBQQREwQDERMDAhETAgERE9s8ARESAfL0DxEQD1UOKYEBAVYTWfQNb6GSMG3fR0QA8iBukjBtndD0BIEBAdcAWWwS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');
    const __system = Cell.fromBase64('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Cbry4IjPFsnIgljAAAAAAAAAAAAAAAABActnzMlw+wAOERAOEN9VHAFyMNMfAYIQGzF6lrry4IH6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIAYEBAdcAWWwS2zx/LQLyVhJWElYSVhJWElYSVhJWElYSVhJWElYSVhJWElYSVhJWEhEQESMREA8RIg8OESEODREgDQwRHwwLER4LChEdCgkRHAkIERsIBxEaBwYRGQYFERgFBBEXBAMRFgMCERUCAREUARET2zxXEF8PMRERERMREV4/DhESDpcuAWgNERMNDBESDAsREwsKERIKCRETCQgREggHERMHBhESBgUREwUEERIEAxETAwIREgIBERMBLwP8ggDE7fhBbyQQI18DERIRExESERERExERERARExEQDxETDw4REw4NERMNDBETDAsREwsKERMKCRETCQgREwgHERMHBhETBgUREwUEERMEAxETAwIREwIBERPbPAEREgHy9A8REA9VDlYS2zxRcaBScqEYoAEREwEGoW1wyMnQYDAxADYjwgCWUwOoI6kEkXDiIsIAllESqCOpBJIxcOID/lMTBFYWBFYXQUQDVVDIVWDbPMlSgHCAQH8EA21t2zwBERHIWYIQ9bcelFADyx+BAQHPAAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxbJyIJYwAAAAAAAAAAAAAAAAQHLZ8zJcPsADhEQDhDfEM4QvRCsEJsQihB5EGgySzMA3oIQD4p+pVAIyx8Wyz9QBPoCWCDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFgEgbpUwcAHLAY4eINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8W4iFus5V/AcoAzJRwMsoA4gH6AgHPFgAMEFdeI1USBPqCENUydtu6jhQw0x8BghDVMnbbuvLggdM/ATEwf+AgghCRjMQcuo6/MNMfAYIQkYzEHLry4IGBAQHXAPpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgBgQEB1wBVIGwT2zx/4CCCEJRqmLa64wIgghB73ZfeuuMCIDU4OkQC9IERTfhD+ChSQNs8cFnIcAHLAXMBywFwAcsAEszMyfkAyHIBywFwAcsAEsoHy//J0CDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4Ij4QW8kECNfA8cF8vQREhETERIRERETEREREBETERAPERMPDhETDg0REw0MERMMfjYE/gsREwsKERMKCRETCQgREwgHERMHBhETBgUREwUEERMEAxETAwIREwIBERMB2zyCAJzrIcMA8vRRd6FtcMjJ0FMaBFYXBFYYQUQDVVDIVWDbPMlSkHCAQH8EA21t2zwgcMhZghAJ/EVxUAPLH4EBAc8AgQEBzwDJ+EFvJBAjXwN3P0s3AeSCCJiWgH9wUARtbds8ERIXAchZghDoSwSSUAPLHwEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxaBAQHPAMnIgljAAAAAAAAAAAAAAAABActnzMlw+wAPERAPEO8Q3hDNELwQqxCaEIkQeBBnVQRLAVAw0x8BghCUapi2uvLggdM/ATHIAYIQr/kPV1jLH8s/yfhCAXBt2zx/OQE6bW0ibrOZWyBu8tCAbyIBkTLiECRwAwSAQlAj2zxLAhAw2zxsFts8fzs8ALLTHwGCEHvdl9668uCB0z/6APpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgB+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiAH6AFFVFRRDMALw+EFvJBEQERoREA8RGQ8OERgODREXDQwRFgwLERULChEUCgkREwkIERIIBxERBwYRGgYFERkFBBEYBAMRFwMCERYCAREVAREUVhdWF1YXVhdWF1YXVhdWIVYhViHbPBEQERoREA8RGQ8OERgODREXDQwRFgwLERULPUICrjVbMzM0ERARFBEQDxETDw4REg4NERENDBEUDAsREwsKERIKCRERCQgRFAgHERMHBhESBgUREQUEERQEAxETAwIREgIBEREBERRWFPhD+CgS2zwBgSYLAn4+A/xwWchwAcsBcwHLAXABywASzMzJ+QDIcgHLAXABywASygfL/8nQINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiAERFMcFARETAfL0bXDIydAhVhQEVhgEVhlBRANVUMhVYNs8yVJwcIBAfwQDbW3bPBES0//T/zAREBESERA/S0AAyIIQD4p+pVAIyx8Wyz9QBPoCWCDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFgEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxYhbrOVfwHKAMyUcDLKAOIB+gIBzxYDtg8REQ8OERAOEN8QzhC9EKwQmxCKEHkQaBBXEEYQNRAkAxETA9s8UnDIWYIQCfxFcVADyx+BAQHPAIEBAc8AyfhBbyQQI18DggiYloB/cFAEbW3bPAEREQEREgF3S0EAnshZghDQwl3qUAPLHwEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxaBAQHPAMnIgljAAAAAAAAAAAAAAAABActnzMlw+wAOERAOVR0C4AoRFAoJERMJCBESCAcREQcGERAGEF8QTlWTNjY2NhEWVhahjQhgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEJccFs48dEwIRFgIVgEIlAhEYF8hVUNs8yRJwfwRBM21t2zyUVxZfBeJDSwCqghB73ZfeUAfLHxXLP1AD+gIBINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFgH6AgHPFgS2ghCJtx0Juo8IMNs8bBbbPH/gIIIQCmHbWbqOtjDTHwGCEAph21m68uCB+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiAGBAQHXAFlsEuAgghBRPvNeukVGTlIAxtMfAYIQibcdCbry4IH6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIAfpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgBgQEB1wDSAAGR1JJtAeL6AFFVFRRDMAH2+EFvJBEQERoREA8RGQ8OERgODREXDQwRFgwLERULChEUCgkREwkIERIIBxERBwYRGgYFERkFBBEYBAMRFwMCERYCAREVAREUVhdWF1YXVhdWF1YXVhdWIVYhViEQiV8JL4IAqWUCxwXy9IF1bVYQ8vQREBEaERAPERkPRwFYDhEYDg0RFw0MERYMCxEVCwoRFAoJERMJCBESCAcREQcGERAGEF8QTlWT2zxIArwyNTU1NRERERUREREQERQREA8REw8OERIODREVDQwRFAwLERMLChESCgkRFQkIERQIBxETBwYREgYFERUFBBEUBAMREwMCERICAREVAREU+EP4KBLbPBESVhSgIVYTfkkD/nBZyHABywFzAcsBcAHLABLMzMn5AMhyAcsBcAHLABLKB8v/ydAg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIcH+AQCL4KBUEERoEAxEbAwIBERwBERkQI8hVUNs8yQYRFwYFERUFBBEWBAMRFANZERMQRhBF2zwMERAMEL9KS00AqoIQF41FGVAHyx8Vyz9QA/oCASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFgEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxYB+gIBzxYByshxAcoBUAcBygBwAcoCUAUg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxZQA/oCcAHKaCNus5F/kyRus+KXMzMBcAHKAOMNIW6znH8BygABIG7y0IABzJUxcAHKAOLJAfsATACYfwHKAMhwAcoAcAHKACRus51/AcoABCBu8tCAUATMljQDcAHKAOIkbrOdfwHKAAQgbvLQgFAEzJY0A3ABygDicAHKAAJ/AcoAAslYzAAqEK4QnRCMEHsQahBZEEgQN0YUUDMFAqoREBESERBePg0REQ0MERIMCxERCwoREgoJEREJCBESCAcREQcGERIGBRERBQQREgQDEREDAhESAgEREQEREts8ERAREhEQDxERDw4REA4Q31Uc2zx/VE8ChBEQERIREF4+DRERDQwREgwLERELChESCgkREQkIERIIBxERBwYREgYFEREFBBESBAMREQMCERICARERARESVhHbPGRQAuyCAMTt+EFvJBAjXwMREhETERIRERETEREREBETERAPERMPDhETDg0REw0MERMMCxETCwoREwoJERMJCBETCAcREwcGERMGBRETBQQREwQDERMDAhETAgERE9s8ARESAfL0DxEQD1UOKYEBAVYTWfQNb6GSMG3fYFEA8iBukjBtndD0BIEBAdcAWWwSbwLiIG7y0IBvIoEBCwERFX9xIW6VW1n0WTCYyAHPAEEz9EHigQEBERTIWQL0AIEBAc8AyRA6AhETAgEREgEgbpUwWfRaMJRBM/QV4g4REA4Q3xDOEL0QrBCbEIoJEGgQVxBGEDVEMBIDnI62MNMfAYIQUT7zXrry4IH6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIAYEBAdcAWWwS4CCCEBcyviG64wKCECT6R8m64wIwcFNWWgKqERAREhEQXj4NERENDBESDAsREQsKERIKCRERCQgREggHEREHBhESBgUREQUEERIEAxERAwIREgIBEREBERLbPBEQERIREA8REQ8OERAOEN9VHNs8f1RXAvIpDxERD149DBEQDAsREQsKERAKCRERCQgREAgHEREHBhEQBgUREQUEERAEAxERAwIREAIBEREBERCBAQEREts8AhESAgEREwFZ9A1voZIwbd8gbpIwbZ3Q9ASBAQHXAFlsEm8C4oIA0wchbrPy9CBu8tCAbyIwgQELmlUAaPhBbyQQI18DcUEz9ApvoZQB1wAwkltt4oIA0wchbrOYASBu8tCAwP+SMXDi8vQOERAOVR0BkDDTHwGCEBcyviG68uCBgQEB1wD6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIEmwSgR8L+EFvJBAjXwMixwXy9Ns8f1cChBEQERIREF4+DRERDQwREgwLERELChESCgkREQkIERIIBxERBwYREgYFEREFBBESBAMREQMCERICARERARESVhHbPGRYAuyCAMTt+EFvJBAjXwMREhETERIRERETEREREBETERAPERMPDhETDg0REw0MERMMCxETCwoREwoJERMJCBETCAcREwcGERMGBRETBQQREwQDERMDAhETAgERE9s8ARESAfL0DxEQD1UOKYEBAVYTWfQNb6GSMG3fYFkA8iBukjBtndD0BIEBAdcAWWwSbwLiIG7y0IBvIoEBCwERFXBxIW6VW1n0WTCYyAHPAEEz9EHigQEBERTIWQL0AIEBAc8AyRA6AhETAgEREgEgbpUwWfRaMJRBM/QV4g4REA4Q3xDOEL0QrBCbEIoJEGgQVxBGEDVEMBIA3NMfAYIQJPpHybry4IGBAQHXAIEBAdcAWWwSK4EBASNZ9A1voZIwbd8gbpIwbZ3Q9ASBAQHXAFlsEm8C4oFU5SFus/L0IG7y0IBvIjCBAQECyFkC9ACBAQHPAMkQPBIgbpUwWfRaMJRBM/QV4gl/AfQBERABERGBAQHPAB7KAFAMINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WGsxQCCDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFgbIgQEBzwBQBSDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFhP0AFwAuIEBAc8AyFgg10mBAQu68uCI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');
    let builder = beginCell();
    builder.storeRef(__system);
    builder.storeUint(0, 1);
    initEmmetJettonLP_init_args({ $$type: 'EmmetJettonLP_init_args', admin, owner, bridge, stake_token, decimals, protocolFee, tokenFee, jetton_content })(builder);
    const __data = builder.endCell();
    return { code: __code, data: __data };
}

const EmmetJettonLP_errors: { [key: number]: { message: string } } = {
    2: { message: `Stack underflow` },
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
    1237: { message: `APY: rewards == 0` },
    2296: { message: `JettonWallet: Only Jetton master or Jetton wallet can call this function` },
    2927: { message: `AccessControl: Role ID doesn't exist` },
    4429: { message: `Invalid sender` },
    7947: { message: `AccessControl: BadConfirmation` },
    9739: { message: `Sender is not a Jetton wallet` },
    13105: { message: `JettonWallet: Not enough jettons to transfer` },
    14033: { message: `APY: totalSupply == 0` },
    18603: { message: `Only master can withdraw fees` },
    21733: { message: `AccessControl: Role doesn't exist` },
    23280: { message: `Not Enough Value Paid.` },
    27831: { message: `Only owner can call this function` },
    29133: { message: `JettonWallet: Not allow negative balance after internal transfer` },
    30061: { message: `JettonMaster: Jetton is not mintable` },
    33244: { message: `Wallet already set` },
    37185: { message: `Not enough funds to transfer` },
    40171: { message: `No rewards to withdraw. Try later.` },
    42222: { message: `Only Allowed Wallet Can Send Notification` },
    43365: { message: `JettonMaster: Sender is not a Jetton owner` },
    46518: { message: `APY: totalSupply and rewards are not on the same decimal scale` },
    47048: { message: `JettonWallet: Only owner can burn tokens` },
    48990: { message: `Only Master can call this endpoint` },
    50413: { message: `AccessControl: Doesnt have the role` },
    54023: { message: `AccessControl: Doesn't have role` },
    55045: { message: `Only master can update deposit.` },
    60354: { message: `JettonWallet: Not enough balance to burn tokens` },
}

const EmmetJettonLP_types: ABIType[] = [
    {"name":"StateInit","header":null,"fields":[{"name":"code","type":{"kind":"simple","type":"cell","optional":false}},{"name":"data","type":{"kind":"simple","type":"cell","optional":false}}]},
    {"name":"Context","header":null,"fields":[{"name":"bounced","type":{"kind":"simple","type":"bool","optional":false}},{"name":"sender","type":{"kind":"simple","type":"address","optional":false}},{"name":"value","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"raw","type":{"kind":"simple","type":"slice","optional":false}}]},
    {"name":"SendParameters","header":null,"fields":[{"name":"bounce","type":{"kind":"simple","type":"bool","optional":false}},{"name":"to","type":{"kind":"simple","type":"address","optional":false}},{"name":"value","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"mode","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"body","type":{"kind":"simple","type":"cell","optional":true}},{"name":"code","type":{"kind":"simple","type":"cell","optional":true}},{"name":"data","type":{"kind":"simple","type":"cell","optional":true}}]},
    {"name":"Deploy","header":2490013878,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"DeployOk","header":2952335191,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"FactoryDeploy","header":1829761339,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"cashback","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"JettonData","header":null,"fields":[{"name":"total_supply","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"mintable","type":{"kind":"simple","type":"bool","optional":false}},{"name":"admin_address","type":{"kind":"simple","type":"address","optional":false}},{"name":"jetton_content","type":{"kind":"simple","type":"cell","optional":false}},{"name":"jetton_wallet_code","type":{"kind":"simple","type":"cell","optional":false}}]},
    {"name":"JettonMint","header":2310479113,"fields":[{"name":"origin","type":{"kind":"simple","type":"address","optional":false}},{"name":"receiver","type":{"kind":"simple","type":"address","optional":false}},{"name":"amount","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"custom_payload","type":{"kind":"simple","type":"cell","optional":true}},{"name":"forward_ton_amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"forward_payload","type":{"kind":"simple","type":"slice","optional":false,"format":"remainder"}}]},
    {"name":"JettonTransfer","header":260734629,"fields":[{"name":"query_id","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"destination","type":{"kind":"simple","type":"address","optional":false}},{"name":"response_destination","type":{"kind":"simple","type":"address","optional":false}},{"name":"custom_payload","type":{"kind":"simple","type":"cell","optional":true}},{"name":"forward_ton_amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"forward_payload","type":{"kind":"simple","type":"slice","optional":false,"format":"remainder"}}]},
    {"name":"JettonTransferNotification","header":1935855772,"fields":[{"name":"query_id","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"sender","type":{"kind":"simple","type":"address","optional":false}},{"name":"forward_payload","type":{"kind":"simple","type":"slice","optional":false,"format":"remainder"}}]},
    {"name":"JettonBurn","header":1499400124,"fields":[{"name":"query_id","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"response_destination","type":{"kind":"simple","type":"address","optional":false}},{"name":"custom_payload","type":{"kind":"simple","type":"cell","optional":true}},{"name":"forward_ton_amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"forward_payload","type":{"kind":"simple","type":"slice","optional":false,"format":"remainder"}}]},
    {"name":"JettonExcesses","header":3576854235,"fields":[{"name":"query_id","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"JettonInternalTransfer","header":395134233,"fields":[{"name":"query_id","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"from","type":{"kind":"simple","type":"address","optional":false}},{"name":"response_address","type":{"kind":"simple","type":"address","optional":false}},{"name":"forward_ton_amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"forward_payload","type":{"kind":"simple","type":"slice","optional":false,"format":"remainder"}}]},
    {"name":"JettonBurnNotification","header":2078119902,"fields":[{"name":"query_id","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"sender","type":{"kind":"simple","type":"address","optional":false}},{"name":"response_destination","type":{"kind":"simple","type":"address","optional":false}},{"name":"forward_ton_amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"forward_payload","type":{"kind":"simple","type":"slice","optional":false,"format":"remainder"}}]},
    {"name":"WalletData","header":null,"fields":[{"name":"balance","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"owner","type":{"kind":"simple","type":"address","optional":false}},{"name":"jetton","type":{"kind":"simple","type":"address","optional":false}},{"name":"jetton_wallet_code","type":{"kind":"simple","type":"cell","optional":false}}]},
    {"name":"GrantRole","header":174185305,"fields":[{"name":"to","type":{"kind":"simple","type":"address","optional":false}},{"name":"role_id","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"RevokeRole","header":1363080030,"fields":[{"name":"to","type":{"kind":"simple","type":"address","optional":false}},{"name":"role_id","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"RenounceRole","header":389201441,"fields":[{"name":"role_id","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"address","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"UpdateRoleAdmin","header":620382153,"fields":[{"name":"role_id","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"role_admin","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"RoleData","header":null,"fields":[{"name":"roles","type":{"kind":"dict","key":"address","value":"bool"}},{"name":"admin_role","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"Withdraw","header":2018736038,"fields":[{"name":"rewards","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"address","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"ReleaseTokens","header":456227478,"fields":[{"name":"to","type":{"kind":"simple","type":"address","optional":false}},{"name":"amount","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"SetWalletAddress","header":907419751,"fields":[{"name":"token_wallet","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"PoolPayload","header":null,"fields":[{"name":"mode","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"Position","header":null,"fields":[{"name":"lastInternalFeeGrowth","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"rewards","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"RewardSplit","header":null,"fields":[{"name":"protocolFeeShare","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"lpProvidersShare","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"TokenTransfer","header":260734629,"fields":[{"name":"query_id","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"sender","type":{"kind":"simple","type":"address","optional":false}},{"name":"response_destination","type":{"kind":"simple","type":"address","optional":true}},{"name":"custom_payload","type":{"kind":"simple","type":"cell","optional":true}},{"name":"forward_ton_amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"forward_payload","type":{"kind":"simple","type":"slice","optional":false,"format":"remainder"}}]},
    {"name":"UpdateDeposit","header":2290426417,"fields":[{"name":"feeGrowthGlobal","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"new_total_supply","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"InternalWithdrawFee","header":2441921564,"fields":[{"name":"lastFeeGrowth","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"owner","type":{"kind":"simple","type":"address","optional":false}},{"name":"balance","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"WithdrawCallback","header":167527793,"fields":[{"name":"feeGrowthGlobal","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"rewards","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"Staked","header":923309543,"fields":[{"name":"amount","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"staker","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"LPTransfer","header":4122418836,"fields":[{"name":"amount","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"to","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"Withdrawn","header":3502398954,"fields":[{"name":"user","type":{"kind":"simple","type":"address","optional":false}},{"name":"amount","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"RewardsPaid","header":3897230482,"fields":[{"name":"user","type":{"kind":"simple","type":"address","optional":false}},{"name":"amount","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
]

const EmmetJettonLP_getters: ABIGetter[] = [
    {"name":"feeGrowthGlobal","arguments":[],"returnType":{"kind":"simple","type":"int","optional":false,"format":257}},
    {"name":"protocolFeeAmount","arguments":[],"returnType":{"kind":"simple","type":"int","optional":false,"format":257}},
    {"name":"currentAPY","arguments":[],"returnType":{"kind":"simple","type":"int","optional":false,"format":257}},
    {"name":"rewards","arguments":[{"name":"lastInternalFeeGrowth","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"balance","type":{"kind":"simple","type":"int","optional":false,"format":257}}],"returnType":{"kind":"simple","type":"int","optional":false,"format":257}},
    {"name":"bridge_role_id","arguments":[],"returnType":{"kind":"simple","type":"int","optional":false,"format":257}},
    {"name":"protocolFee","arguments":[],"returnType":{"kind":"simple","type":"int","optional":false,"format":257}},
    {"name":"tokenFee","arguments":[],"returnType":{"kind":"simple","type":"int","optional":false,"format":257}},
    {"name":"stakeToken","arguments":[],"returnType":{"kind":"simple","type":"address","optional":false}},
    {"name":"decimals","arguments":[],"returnType":{"kind":"simple","type":"int","optional":false,"format":257}},
    {"name":"get_jetton_data","arguments":[],"returnType":{"kind":"simple","type":"JettonData","optional":false}},
    {"name":"get_wallet_address","arguments":[{"name":"owner_address","type":{"kind":"simple","type":"address","optional":false}}],"returnType":{"kind":"simple","type":"address","optional":false}},
    {"name":"has_role","arguments":[{"name":"address","type":{"kind":"simple","type":"address","optional":false}},{"name":"role_id","type":{"kind":"simple","type":"int","optional":false,"format":257}}],"returnType":{"kind":"simple","type":"bool","optional":false}},
    {"name":"role_admin","arguments":[{"name":"role_id","type":{"kind":"simple","type":"int","optional":false,"format":257}}],"returnType":{"kind":"simple","type":"int","optional":false,"format":257}},
    {"name":"admin_role_id","arguments":[],"returnType":{"kind":"simple","type":"int","optional":false,"format":257}},
]

const EmmetJettonLP_receivers: ABIReceiver[] = [
    {"receiver":"internal","message":{"kind":"typed","type":"SetWalletAddress"}},
    {"receiver":"internal","message":{"kind":"typed","type":"JettonTransferNotification"}},
    {"receiver":"internal","message":{"kind":"typed","type":"ReleaseTokens"}},
    {"receiver":"internal","message":{"kind":"empty"}},
    {"receiver":"internal","message":{"kind":"typed","type":"JettonExcesses"}},
    {"receiver":"internal","message":{"kind":"typed","type":"InternalWithdrawFee"}},
    {"receiver":"internal","message":{"kind":"typed","type":"Deploy"}},
    {"receiver":"internal","message":{"kind":"typed","type":"JettonBurnNotification"}},
    {"receiver":"internal","message":{"kind":"typed","type":"JettonMint"}},
    {"receiver":"internal","message":{"kind":"typed","type":"GrantRole"}},
    {"receiver":"internal","message":{"kind":"typed","type":"RevokeRole"}},
    {"receiver":"internal","message":{"kind":"typed","type":"RenounceRole"}},
    {"receiver":"internal","message":{"kind":"typed","type":"UpdateRoleAdmin"}},
]

export class EmmetJettonLP implements Contract {
    
    static async init(admin: Address, owner: Address, bridge: Address, stake_token: Address, decimals: bigint, protocolFee: bigint, tokenFee: bigint, jetton_content: Cell) {
        return await EmmetJettonLP_init(admin, owner, bridge, stake_token, decimals, protocolFee, tokenFee, jetton_content);
    }
    
    static async fromInit(admin: Address, owner: Address, bridge: Address, stake_token: Address, decimals: bigint, protocolFee: bigint, tokenFee: bigint, jetton_content: Cell) {
        const init = await EmmetJettonLP_init(admin, owner, bridge, stake_token, decimals, protocolFee, tokenFee, jetton_content);
        const address = contractAddress(0, init);
        return new EmmetJettonLP(address, init);
    }
    
    static fromAddress(address: Address) {
        return new EmmetJettonLP(address);
    }
    
    readonly address: Address; 
    readonly init?: { code: Cell, data: Cell };
    readonly abi: ContractABI = {
        types:  EmmetJettonLP_types,
        getters: EmmetJettonLP_getters,
        receivers: EmmetJettonLP_receivers,
        errors: EmmetJettonLP_errors,
    };
    
    private constructor(address: Address, init?: { code: Cell, data: Cell }) {
        this.address = address;
        this.init = init;
    }
    
    async send(provider: ContractProvider, via: Sender, args: { value: bigint, bounce?: boolean| null | undefined }, message: SetWalletAddress | JettonTransferNotification | ReleaseTokens | null | JettonExcesses | InternalWithdrawFee | Deploy | JettonBurnNotification | JettonMint | GrantRole | RevokeRole | RenounceRole | UpdateRoleAdmin) {
        
        let body: Cell | null = null;
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'SetWalletAddress') {
            body = beginCell().store(storeSetWalletAddress(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'JettonTransferNotification') {
            body = beginCell().store(storeJettonTransferNotification(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'ReleaseTokens') {
            body = beginCell().store(storeReleaseTokens(message)).endCell();
        }
        if (message === null) {
            body = new Cell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'JettonExcesses') {
            body = beginCell().store(storeJettonExcesses(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'InternalWithdrawFee') {
            body = beginCell().store(storeInternalWithdrawFee(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'Deploy') {
            body = beginCell().store(storeDeploy(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'JettonBurnNotification') {
            body = beginCell().store(storeJettonBurnNotification(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'JettonMint') {
            body = beginCell().store(storeJettonMint(message)).endCell();
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
    
    async getFeeGrowthGlobal(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('feeGrowthGlobal', builder.build())).stack;
        let result = source.readBigNumber();
        return result;
    }
    
    async getProtocolFeeAmount(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('protocolFeeAmount', builder.build())).stack;
        let result = source.readBigNumber();
        return result;
    }
    
    async getCurrentApy(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('currentAPY', builder.build())).stack;
        let result = source.readBigNumber();
        return result;
    }
    
    async getRewards(provider: ContractProvider, lastInternalFeeGrowth: bigint, balance: bigint) {
        let builder = new TupleBuilder();
        builder.writeNumber(lastInternalFeeGrowth);
        builder.writeNumber(balance);
        let source = (await provider.get('rewards', builder.build())).stack;
        let result = source.readBigNumber();
        return result;
    }
    
    async getBridgeRoleId(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('bridge_role_id', builder.build())).stack;
        let result = source.readBigNumber();
        return result;
    }
    
    async getProtocolFee(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('protocolFee', builder.build())).stack;
        let result = source.readBigNumber();
        return result;
    }
    
    async getTokenFee(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('tokenFee', builder.build())).stack;
        let result = source.readBigNumber();
        return result;
    }
    
    async getStakeToken(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('stakeToken', builder.build())).stack;
        let result = source.readAddress();
        return result;
    }
    
    async getDecimals(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('decimals', builder.build())).stack;
        let result = source.readBigNumber();
        return result;
    }
    
    async getGetJettonData(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('get_jetton_data', builder.build())).stack;
        const result = loadTupleJettonData(source);
        return result;
    }
    
    async getGetWalletAddress(provider: ContractProvider, owner_address: Address) {
        let builder = new TupleBuilder();
        builder.writeAddress(owner_address);
        let source = (await provider.get('get_wallet_address', builder.build())).stack;
        let result = source.readAddress();
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
        let result = source.readBigNumber();
        return result;
    }
    
    async getAdminRoleId(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('admin_role_id', builder.build())).stack;
        let result = source.readBigNumber();
        return result;
    }
    
}