"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadPosition = exports.storePosition = exports.loadPoolPayload = exports.storePoolPayload = exports.loadSetWalletAddress = exports.storeSetWalletAddress = exports.loadReleaseTokens = exports.storeReleaseTokens = exports.loadWithdraw = exports.storeWithdraw = exports.loadRoleData = exports.storeRoleData = exports.loadUpdateRoleAdmin = exports.storeUpdateRoleAdmin = exports.loadRenounceRole = exports.storeRenounceRole = exports.loadRevokeRole = exports.storeRevokeRole = exports.loadGrantRole = exports.storeGrantRole = exports.loadWalletData = exports.storeWalletData = exports.loadJettonBurnNotification = exports.storeJettonBurnNotification = exports.loadJettonInternalTransfer = exports.storeJettonInternalTransfer = exports.loadJettonExcesses = exports.storeJettonExcesses = exports.loadJettonBurn = exports.storeJettonBurn = exports.loadJettonTransferNotification = exports.storeJettonTransferNotification = exports.loadJettonTransfer = exports.storeJettonTransfer = exports.loadJettonMint = exports.storeJettonMint = exports.loadJettonData = exports.storeJettonData = exports.loadFactoryDeploy = exports.storeFactoryDeploy = exports.loadDeployOk = exports.storeDeployOk = exports.loadDeploy = exports.storeDeploy = exports.loadSendParameters = exports.storeSendParameters = exports.loadContext = exports.storeContext = exports.loadStateInit = exports.storeStateInit = void 0;
exports.EmmetLPWallet = exports.loadRewardsPaid = exports.storeRewardsPaid = exports.loadWithdrawn = exports.storeWithdrawn = exports.loadLPTransfer = exports.storeLPTransfer = exports.loadStaked = exports.storeStaked = exports.loadInternalWithdrawFee = exports.storeInternalWithdrawFee = exports.loadUpdateDeposit = exports.storeUpdateDeposit = exports.loadTokenTransfer = exports.storeTokenTransfer = exports.loadRewardSplit = exports.storeRewardSplit = void 0;
//@ts-nocheck generated code
const core_1 = require("@ton/core");
function storeStateInit(src) {
    return (builder) => {
        let b_0 = builder;
        b_0.storeRef(src.code);
        b_0.storeRef(src.data);
    };
}
exports.storeStateInit = storeStateInit;
function loadStateInit(slice) {
    let sc_0 = slice;
    let _code = sc_0.loadRef();
    let _data = sc_0.loadRef();
    return { $$type: 'StateInit', code: _code, data: _data };
}
exports.loadStateInit = loadStateInit;
function loadTupleStateInit(source) {
    let _code = source.readCell();
    let _data = source.readCell();
    return { $$type: 'StateInit', code: _code, data: _data };
}
function storeTupleStateInit(source) {
    let builder = new core_1.TupleBuilder();
    builder.writeCell(source.code);
    builder.writeCell(source.data);
    return builder.build();
}
function dictValueParserStateInit() {
    return {
        serialize: (src, builder) => {
            builder.storeRef((0, core_1.beginCell)().store(storeStateInit(src)).endCell());
        },
        parse: (src) => {
            return loadStateInit(src.loadRef().beginParse());
        }
    };
}
function storeContext(src) {
    return (builder) => {
        let b_0 = builder;
        b_0.storeBit(src.bounced);
        b_0.storeAddress(src.sender);
        b_0.storeInt(src.value, 257);
        b_0.storeRef(src.raw);
    };
}
exports.storeContext = storeContext;
function loadContext(slice) {
    let sc_0 = slice;
    let _bounced = sc_0.loadBit();
    let _sender = sc_0.loadAddress();
    let _value = sc_0.loadIntBig(257);
    let _raw = sc_0.loadRef();
    return { $$type: 'Context', bounced: _bounced, sender: _sender, value: _value, raw: _raw };
}
exports.loadContext = loadContext;
function loadTupleContext(source) {
    let _bounced = source.readBoolean();
    let _sender = source.readAddress();
    let _value = source.readBigNumber();
    let _raw = source.readCell();
    return { $$type: 'Context', bounced: _bounced, sender: _sender, value: _value, raw: _raw };
}
function storeTupleContext(source) {
    let builder = new core_1.TupleBuilder();
    builder.writeBoolean(source.bounced);
    builder.writeAddress(source.sender);
    builder.writeNumber(source.value);
    builder.writeSlice(source.raw);
    return builder.build();
}
function dictValueParserContext() {
    return {
        serialize: (src, builder) => {
            builder.storeRef((0, core_1.beginCell)().store(storeContext(src)).endCell());
        },
        parse: (src) => {
            return loadContext(src.loadRef().beginParse());
        }
    };
}
function storeSendParameters(src) {
    return (builder) => {
        let b_0 = builder;
        b_0.storeBit(src.bounce);
        b_0.storeAddress(src.to);
        b_0.storeInt(src.value, 257);
        b_0.storeInt(src.mode, 257);
        if (src.body !== null && src.body !== undefined) {
            b_0.storeBit(true).storeRef(src.body);
        }
        else {
            b_0.storeBit(false);
        }
        if (src.code !== null && src.code !== undefined) {
            b_0.storeBit(true).storeRef(src.code);
        }
        else {
            b_0.storeBit(false);
        }
        if (src.data !== null && src.data !== undefined) {
            b_0.storeBit(true).storeRef(src.data);
        }
        else {
            b_0.storeBit(false);
        }
    };
}
exports.storeSendParameters = storeSendParameters;
function loadSendParameters(slice) {
    let sc_0 = slice;
    let _bounce = sc_0.loadBit();
    let _to = sc_0.loadAddress();
    let _value = sc_0.loadIntBig(257);
    let _mode = sc_0.loadIntBig(257);
    let _body = sc_0.loadBit() ? sc_0.loadRef() : null;
    let _code = sc_0.loadBit() ? sc_0.loadRef() : null;
    let _data = sc_0.loadBit() ? sc_0.loadRef() : null;
    return { $$type: 'SendParameters', bounce: _bounce, to: _to, value: _value, mode: _mode, body: _body, code: _code, data: _data };
}
exports.loadSendParameters = loadSendParameters;
function loadTupleSendParameters(source) {
    let _bounce = source.readBoolean();
    let _to = source.readAddress();
    let _value = source.readBigNumber();
    let _mode = source.readBigNumber();
    let _body = source.readCellOpt();
    let _code = source.readCellOpt();
    let _data = source.readCellOpt();
    return { $$type: 'SendParameters', bounce: _bounce, to: _to, value: _value, mode: _mode, body: _body, code: _code, data: _data };
}
function storeTupleSendParameters(source) {
    let builder = new core_1.TupleBuilder();
    builder.writeBoolean(source.bounce);
    builder.writeAddress(source.to);
    builder.writeNumber(source.value);
    builder.writeNumber(source.mode);
    builder.writeCell(source.body);
    builder.writeCell(source.code);
    builder.writeCell(source.data);
    return builder.build();
}
function dictValueParserSendParameters() {
    return {
        serialize: (src, builder) => {
            builder.storeRef((0, core_1.beginCell)().store(storeSendParameters(src)).endCell());
        },
        parse: (src) => {
            return loadSendParameters(src.loadRef().beginParse());
        }
    };
}
function storeDeploy(src) {
    return (builder) => {
        let b_0 = builder;
        b_0.storeUint(2490013878, 32);
        b_0.storeUint(src.queryId, 64);
    };
}
exports.storeDeploy = storeDeploy;
function loadDeploy(slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2490013878) {
        throw Error('Invalid prefix');
    }
    let _queryId = sc_0.loadUintBig(64);
    return { $$type: 'Deploy', queryId: _queryId };
}
exports.loadDeploy = loadDeploy;
function loadTupleDeploy(source) {
    let _queryId = source.readBigNumber();
    return { $$type: 'Deploy', queryId: _queryId };
}
function storeTupleDeploy(source) {
    let builder = new core_1.TupleBuilder();
    builder.writeNumber(source.queryId);
    return builder.build();
}
function dictValueParserDeploy() {
    return {
        serialize: (src, builder) => {
            builder.storeRef((0, core_1.beginCell)().store(storeDeploy(src)).endCell());
        },
        parse: (src) => {
            return loadDeploy(src.loadRef().beginParse());
        }
    };
}
function storeDeployOk(src) {
    return (builder) => {
        let b_0 = builder;
        b_0.storeUint(2952335191, 32);
        b_0.storeUint(src.queryId, 64);
    };
}
exports.storeDeployOk = storeDeployOk;
function loadDeployOk(slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2952335191) {
        throw Error('Invalid prefix');
    }
    let _queryId = sc_0.loadUintBig(64);
    return { $$type: 'DeployOk', queryId: _queryId };
}
exports.loadDeployOk = loadDeployOk;
function loadTupleDeployOk(source) {
    let _queryId = source.readBigNumber();
    return { $$type: 'DeployOk', queryId: _queryId };
}
function storeTupleDeployOk(source) {
    let builder = new core_1.TupleBuilder();
    builder.writeNumber(source.queryId);
    return builder.build();
}
function dictValueParserDeployOk() {
    return {
        serialize: (src, builder) => {
            builder.storeRef((0, core_1.beginCell)().store(storeDeployOk(src)).endCell());
        },
        parse: (src) => {
            return loadDeployOk(src.loadRef().beginParse());
        }
    };
}
function storeFactoryDeploy(src) {
    return (builder) => {
        let b_0 = builder;
        b_0.storeUint(1829761339, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeAddress(src.cashback);
    };
}
exports.storeFactoryDeploy = storeFactoryDeploy;
function loadFactoryDeploy(slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1829761339) {
        throw Error('Invalid prefix');
    }
    let _queryId = sc_0.loadUintBig(64);
    let _cashback = sc_0.loadAddress();
    return { $$type: 'FactoryDeploy', queryId: _queryId, cashback: _cashback };
}
exports.loadFactoryDeploy = loadFactoryDeploy;
function loadTupleFactoryDeploy(source) {
    let _queryId = source.readBigNumber();
    let _cashback = source.readAddress();
    return { $$type: 'FactoryDeploy', queryId: _queryId, cashback: _cashback };
}
function storeTupleFactoryDeploy(source) {
    let builder = new core_1.TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeAddress(source.cashback);
    return builder.build();
}
function dictValueParserFactoryDeploy() {
    return {
        serialize: (src, builder) => {
            builder.storeRef((0, core_1.beginCell)().store(storeFactoryDeploy(src)).endCell());
        },
        parse: (src) => {
            return loadFactoryDeploy(src.loadRef().beginParse());
        }
    };
}
function storeJettonData(src) {
    return (builder) => {
        let b_0 = builder;
        b_0.storeCoins(src.total_supply);
        b_0.storeBit(src.mintable);
        b_0.storeAddress(src.admin_address);
        b_0.storeRef(src.jetton_content);
        b_0.storeRef(src.jetton_wallet_code);
    };
}
exports.storeJettonData = storeJettonData;
function loadJettonData(slice) {
    let sc_0 = slice;
    let _total_supply = sc_0.loadCoins();
    let _mintable = sc_0.loadBit();
    let _admin_address = sc_0.loadAddress();
    let _jetton_content = sc_0.loadRef();
    let _jetton_wallet_code = sc_0.loadRef();
    return { $$type: 'JettonData', total_supply: _total_supply, mintable: _mintable, admin_address: _admin_address, jetton_content: _jetton_content, jetton_wallet_code: _jetton_wallet_code };
}
exports.loadJettonData = loadJettonData;
function loadTupleJettonData(source) {
    let _total_supply = source.readBigNumber();
    let _mintable = source.readBoolean();
    let _admin_address = source.readAddress();
    let _jetton_content = source.readCell();
    let _jetton_wallet_code = source.readCell();
    return { $$type: 'JettonData', total_supply: _total_supply, mintable: _mintable, admin_address: _admin_address, jetton_content: _jetton_content, jetton_wallet_code: _jetton_wallet_code };
}
function storeTupleJettonData(source) {
    let builder = new core_1.TupleBuilder();
    builder.writeNumber(source.total_supply);
    builder.writeBoolean(source.mintable);
    builder.writeAddress(source.admin_address);
    builder.writeCell(source.jetton_content);
    builder.writeCell(source.jetton_wallet_code);
    return builder.build();
}
function dictValueParserJettonData() {
    return {
        serialize: (src, builder) => {
            builder.storeRef((0, core_1.beginCell)().store(storeJettonData(src)).endCell());
        },
        parse: (src) => {
            return loadJettonData(src.loadRef().beginParse());
        }
    };
}
function storeJettonMint(src) {
    return (builder) => {
        let b_0 = builder;
        b_0.storeUint(2310479113, 32);
        b_0.storeAddress(src.origin);
        b_0.storeAddress(src.receiver);
        b_0.storeInt(src.amount, 257);
        if (src.custom_payload !== null && src.custom_payload !== undefined) {
            b_0.storeBit(true).storeRef(src.custom_payload);
        }
        else {
            b_0.storeBit(false);
        }
        b_0.storeCoins(src.forward_ton_amount);
        b_0.storeBuilder(src.forward_payload.asBuilder());
    };
}
exports.storeJettonMint = storeJettonMint;
function loadJettonMint(slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2310479113) {
        throw Error('Invalid prefix');
    }
    let _origin = sc_0.loadAddress();
    let _receiver = sc_0.loadAddress();
    let _amount = sc_0.loadIntBig(257);
    let _custom_payload = sc_0.loadBit() ? sc_0.loadRef() : null;
    let _forward_ton_amount = sc_0.loadCoins();
    let _forward_payload = sc_0.asCell();
    return { $$type: 'JettonMint', origin: _origin, receiver: _receiver, amount: _amount, custom_payload: _custom_payload, forward_ton_amount: _forward_ton_amount, forward_payload: _forward_payload };
}
exports.loadJettonMint = loadJettonMint;
function loadTupleJettonMint(source) {
    let _origin = source.readAddress();
    let _receiver = source.readAddress();
    let _amount = source.readBigNumber();
    let _custom_payload = source.readCellOpt();
    let _forward_ton_amount = source.readBigNumber();
    let _forward_payload = source.readCell();
    return { $$type: 'JettonMint', origin: _origin, receiver: _receiver, amount: _amount, custom_payload: _custom_payload, forward_ton_amount: _forward_ton_amount, forward_payload: _forward_payload };
}
function storeTupleJettonMint(source) {
    let builder = new core_1.TupleBuilder();
    builder.writeAddress(source.origin);
    builder.writeAddress(source.receiver);
    builder.writeNumber(source.amount);
    builder.writeCell(source.custom_payload);
    builder.writeNumber(source.forward_ton_amount);
    builder.writeSlice(source.forward_payload);
    return builder.build();
}
function dictValueParserJettonMint() {
    return {
        serialize: (src, builder) => {
            builder.storeRef((0, core_1.beginCell)().store(storeJettonMint(src)).endCell());
        },
        parse: (src) => {
            return loadJettonMint(src.loadRef().beginParse());
        }
    };
}
function storeJettonTransfer(src) {
    return (builder) => {
        let b_0 = builder;
        b_0.storeUint(260734629, 32);
        b_0.storeUint(src.query_id, 64);
        b_0.storeCoins(src.amount);
        b_0.storeAddress(src.destination);
        b_0.storeAddress(src.response_destination);
        if (src.custom_payload !== null && src.custom_payload !== undefined) {
            b_0.storeBit(true).storeRef(src.custom_payload);
        }
        else {
            b_0.storeBit(false);
        }
        b_0.storeCoins(src.forward_ton_amount);
        b_0.storeBuilder(src.forward_payload.asBuilder());
    };
}
exports.storeJettonTransfer = storeJettonTransfer;
function loadJettonTransfer(slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 260734629) {
        throw Error('Invalid prefix');
    }
    let _query_id = sc_0.loadUintBig(64);
    let _amount = sc_0.loadCoins();
    let _destination = sc_0.loadAddress();
    let _response_destination = sc_0.loadAddress();
    let _custom_payload = sc_0.loadBit() ? sc_0.loadRef() : null;
    let _forward_ton_amount = sc_0.loadCoins();
    let _forward_payload = sc_0.asCell();
    return { $$type: 'JettonTransfer', query_id: _query_id, amount: _amount, destination: _destination, response_destination: _response_destination, custom_payload: _custom_payload, forward_ton_amount: _forward_ton_amount, forward_payload: _forward_payload };
}
exports.loadJettonTransfer = loadJettonTransfer;
function loadTupleJettonTransfer(source) {
    let _query_id = source.readBigNumber();
    let _amount = source.readBigNumber();
    let _destination = source.readAddress();
    let _response_destination = source.readAddress();
    let _custom_payload = source.readCellOpt();
    let _forward_ton_amount = source.readBigNumber();
    let _forward_payload = source.readCell();
    return { $$type: 'JettonTransfer', query_id: _query_id, amount: _amount, destination: _destination, response_destination: _response_destination, custom_payload: _custom_payload, forward_ton_amount: _forward_ton_amount, forward_payload: _forward_payload };
}
function storeTupleJettonTransfer(source) {
    let builder = new core_1.TupleBuilder();
    builder.writeNumber(source.query_id);
    builder.writeNumber(source.amount);
    builder.writeAddress(source.destination);
    builder.writeAddress(source.response_destination);
    builder.writeCell(source.custom_payload);
    builder.writeNumber(source.forward_ton_amount);
    builder.writeSlice(source.forward_payload);
    return builder.build();
}
function dictValueParserJettonTransfer() {
    return {
        serialize: (src, builder) => {
            builder.storeRef((0, core_1.beginCell)().store(storeJettonTransfer(src)).endCell());
        },
        parse: (src) => {
            return loadJettonTransfer(src.loadRef().beginParse());
        }
    };
}
function storeJettonTransferNotification(src) {
    return (builder) => {
        let b_0 = builder;
        b_0.storeUint(1935855772, 32);
        b_0.storeUint(src.query_id, 64);
        b_0.storeCoins(src.amount);
        b_0.storeAddress(src.sender);
        b_0.storeBuilder(src.forward_payload.asBuilder());
    };
}
exports.storeJettonTransferNotification = storeJettonTransferNotification;
function loadJettonTransferNotification(slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1935855772) {
        throw Error('Invalid prefix');
    }
    let _query_id = sc_0.loadUintBig(64);
    let _amount = sc_0.loadCoins();
    let _sender = sc_0.loadAddress();
    let _forward_payload = sc_0.asCell();
    return { $$type: 'JettonTransferNotification', query_id: _query_id, amount: _amount, sender: _sender, forward_payload: _forward_payload };
}
exports.loadJettonTransferNotification = loadJettonTransferNotification;
function loadTupleJettonTransferNotification(source) {
    let _query_id = source.readBigNumber();
    let _amount = source.readBigNumber();
    let _sender = source.readAddress();
    let _forward_payload = source.readCell();
    return { $$type: 'JettonTransferNotification', query_id: _query_id, amount: _amount, sender: _sender, forward_payload: _forward_payload };
}
function storeTupleJettonTransferNotification(source) {
    let builder = new core_1.TupleBuilder();
    builder.writeNumber(source.query_id);
    builder.writeNumber(source.amount);
    builder.writeAddress(source.sender);
    builder.writeSlice(source.forward_payload);
    return builder.build();
}
function dictValueParserJettonTransferNotification() {
    return {
        serialize: (src, builder) => {
            builder.storeRef((0, core_1.beginCell)().store(storeJettonTransferNotification(src)).endCell());
        },
        parse: (src) => {
            return loadJettonTransferNotification(src.loadRef().beginParse());
        }
    };
}
function storeJettonBurn(src) {
    return (builder) => {
        let b_0 = builder;
        b_0.storeUint(1499400124, 32);
        b_0.storeUint(src.query_id, 64);
        b_0.storeCoins(src.amount);
        b_0.storeAddress(src.response_destination);
        if (src.custom_payload !== null && src.custom_payload !== undefined) {
            b_0.storeBit(true).storeRef(src.custom_payload);
        }
        else {
            b_0.storeBit(false);
        }
        b_0.storeCoins(src.forward_ton_amount);
        b_0.storeBuilder(src.forward_payload.asBuilder());
    };
}
exports.storeJettonBurn = storeJettonBurn;
function loadJettonBurn(slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1499400124) {
        throw Error('Invalid prefix');
    }
    let _query_id = sc_0.loadUintBig(64);
    let _amount = sc_0.loadCoins();
    let _response_destination = sc_0.loadAddress();
    let _custom_payload = sc_0.loadBit() ? sc_0.loadRef() : null;
    let _forward_ton_amount = sc_0.loadCoins();
    let _forward_payload = sc_0.asCell();
    return { $$type: 'JettonBurn', query_id: _query_id, amount: _amount, response_destination: _response_destination, custom_payload: _custom_payload, forward_ton_amount: _forward_ton_amount, forward_payload: _forward_payload };
}
exports.loadJettonBurn = loadJettonBurn;
function loadTupleJettonBurn(source) {
    let _query_id = source.readBigNumber();
    let _amount = source.readBigNumber();
    let _response_destination = source.readAddress();
    let _custom_payload = source.readCellOpt();
    let _forward_ton_amount = source.readBigNumber();
    let _forward_payload = source.readCell();
    return { $$type: 'JettonBurn', query_id: _query_id, amount: _amount, response_destination: _response_destination, custom_payload: _custom_payload, forward_ton_amount: _forward_ton_amount, forward_payload: _forward_payload };
}
function storeTupleJettonBurn(source) {
    let builder = new core_1.TupleBuilder();
    builder.writeNumber(source.query_id);
    builder.writeNumber(source.amount);
    builder.writeAddress(source.response_destination);
    builder.writeCell(source.custom_payload);
    builder.writeNumber(source.forward_ton_amount);
    builder.writeSlice(source.forward_payload);
    return builder.build();
}
function dictValueParserJettonBurn() {
    return {
        serialize: (src, builder) => {
            builder.storeRef((0, core_1.beginCell)().store(storeJettonBurn(src)).endCell());
        },
        parse: (src) => {
            return loadJettonBurn(src.loadRef().beginParse());
        }
    };
}
function storeJettonExcesses(src) {
    return (builder) => {
        let b_0 = builder;
        b_0.storeUint(3576854235, 32);
        b_0.storeUint(src.query_id, 64);
    };
}
exports.storeJettonExcesses = storeJettonExcesses;
function loadJettonExcesses(slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 3576854235) {
        throw Error('Invalid prefix');
    }
    let _query_id = sc_0.loadUintBig(64);
    return { $$type: 'JettonExcesses', query_id: _query_id };
}
exports.loadJettonExcesses = loadJettonExcesses;
function loadTupleJettonExcesses(source) {
    let _query_id = source.readBigNumber();
    return { $$type: 'JettonExcesses', query_id: _query_id };
}
function storeTupleJettonExcesses(source) {
    let builder = new core_1.TupleBuilder();
    builder.writeNumber(source.query_id);
    return builder.build();
}
function dictValueParserJettonExcesses() {
    return {
        serialize: (src, builder) => {
            builder.storeRef((0, core_1.beginCell)().store(storeJettonExcesses(src)).endCell());
        },
        parse: (src) => {
            return loadJettonExcesses(src.loadRef().beginParse());
        }
    };
}
function storeJettonInternalTransfer(src) {
    return (builder) => {
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
exports.storeJettonInternalTransfer = storeJettonInternalTransfer;
function loadJettonInternalTransfer(slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 395134233) {
        throw Error('Invalid prefix');
    }
    let _query_id = sc_0.loadUintBig(64);
    let _amount = sc_0.loadCoins();
    let _from = sc_0.loadAddress();
    let _response_address = sc_0.loadAddress();
    let _forward_ton_amount = sc_0.loadCoins();
    let _forward_payload = sc_0.asCell();
    return { $$type: 'JettonInternalTransfer', query_id: _query_id, amount: _amount, from: _from, response_address: _response_address, forward_ton_amount: _forward_ton_amount, forward_payload: _forward_payload };
}
exports.loadJettonInternalTransfer = loadJettonInternalTransfer;
function loadTupleJettonInternalTransfer(source) {
    let _query_id = source.readBigNumber();
    let _amount = source.readBigNumber();
    let _from = source.readAddress();
    let _response_address = source.readAddress();
    let _forward_ton_amount = source.readBigNumber();
    let _forward_payload = source.readCell();
    return { $$type: 'JettonInternalTransfer', query_id: _query_id, amount: _amount, from: _from, response_address: _response_address, forward_ton_amount: _forward_ton_amount, forward_payload: _forward_payload };
}
function storeTupleJettonInternalTransfer(source) {
    let builder = new core_1.TupleBuilder();
    builder.writeNumber(source.query_id);
    builder.writeNumber(source.amount);
    builder.writeAddress(source.from);
    builder.writeAddress(source.response_address);
    builder.writeNumber(source.forward_ton_amount);
    builder.writeSlice(source.forward_payload);
    return builder.build();
}
function dictValueParserJettonInternalTransfer() {
    return {
        serialize: (src, builder) => {
            builder.storeRef((0, core_1.beginCell)().store(storeJettonInternalTransfer(src)).endCell());
        },
        parse: (src) => {
            return loadJettonInternalTransfer(src.loadRef().beginParse());
        }
    };
}
function storeJettonBurnNotification(src) {
    return (builder) => {
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
exports.storeJettonBurnNotification = storeJettonBurnNotification;
function loadJettonBurnNotification(slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2078119902) {
        throw Error('Invalid prefix');
    }
    let _query_id = sc_0.loadUintBig(64);
    let _amount = sc_0.loadCoins();
    let _sender = sc_0.loadAddress();
    let _response_destination = sc_0.loadAddress();
    let _forward_ton_amount = sc_0.loadCoins();
    let _forward_payload = sc_0.asCell();
    return { $$type: 'JettonBurnNotification', query_id: _query_id, amount: _amount, sender: _sender, response_destination: _response_destination, forward_ton_amount: _forward_ton_amount, forward_payload: _forward_payload };
}
exports.loadJettonBurnNotification = loadJettonBurnNotification;
function loadTupleJettonBurnNotification(source) {
    let _query_id = source.readBigNumber();
    let _amount = source.readBigNumber();
    let _sender = source.readAddress();
    let _response_destination = source.readAddress();
    let _forward_ton_amount = source.readBigNumber();
    let _forward_payload = source.readCell();
    return { $$type: 'JettonBurnNotification', query_id: _query_id, amount: _amount, sender: _sender, response_destination: _response_destination, forward_ton_amount: _forward_ton_amount, forward_payload: _forward_payload };
}
function storeTupleJettonBurnNotification(source) {
    let builder = new core_1.TupleBuilder();
    builder.writeNumber(source.query_id);
    builder.writeNumber(source.amount);
    builder.writeAddress(source.sender);
    builder.writeAddress(source.response_destination);
    builder.writeNumber(source.forward_ton_amount);
    builder.writeSlice(source.forward_payload);
    return builder.build();
}
function dictValueParserJettonBurnNotification() {
    return {
        serialize: (src, builder) => {
            builder.storeRef((0, core_1.beginCell)().store(storeJettonBurnNotification(src)).endCell());
        },
        parse: (src) => {
            return loadJettonBurnNotification(src.loadRef().beginParse());
        }
    };
}
function storeWalletData(src) {
    return (builder) => {
        let b_0 = builder;
        b_0.storeCoins(src.balance);
        b_0.storeAddress(src.owner);
        b_0.storeAddress(src.jetton);
        b_0.storeRef(src.jetton_wallet_code);
    };
}
exports.storeWalletData = storeWalletData;
function loadWalletData(slice) {
    let sc_0 = slice;
    let _balance = sc_0.loadCoins();
    let _owner = sc_0.loadAddress();
    let _jetton = sc_0.loadAddress();
    let _jetton_wallet_code = sc_0.loadRef();
    return { $$type: 'WalletData', balance: _balance, owner: _owner, jetton: _jetton, jetton_wallet_code: _jetton_wallet_code };
}
exports.loadWalletData = loadWalletData;
function loadTupleWalletData(source) {
    let _balance = source.readBigNumber();
    let _owner = source.readAddress();
    let _jetton = source.readAddress();
    let _jetton_wallet_code = source.readCell();
    return { $$type: 'WalletData', balance: _balance, owner: _owner, jetton: _jetton, jetton_wallet_code: _jetton_wallet_code };
}
function storeTupleWalletData(source) {
    let builder = new core_1.TupleBuilder();
    builder.writeNumber(source.balance);
    builder.writeAddress(source.owner);
    builder.writeAddress(source.jetton);
    builder.writeCell(source.jetton_wallet_code);
    return builder.build();
}
function dictValueParserWalletData() {
    return {
        serialize: (src, builder) => {
            builder.storeRef((0, core_1.beginCell)().store(storeWalletData(src)).endCell());
        },
        parse: (src) => {
            return loadWalletData(src.loadRef().beginParse());
        }
    };
}
function storeGrantRole(src) {
    return (builder) => {
        let b_0 = builder;
        b_0.storeUint(174185305, 32);
        b_0.storeAddress(src.to);
        b_0.storeInt(src.role_id, 257);
    };
}
exports.storeGrantRole = storeGrantRole;
function loadGrantRole(slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 174185305) {
        throw Error('Invalid prefix');
    }
    let _to = sc_0.loadAddress();
    let _role_id = sc_0.loadIntBig(257);
    return { $$type: 'GrantRole', to: _to, role_id: _role_id };
}
exports.loadGrantRole = loadGrantRole;
function loadTupleGrantRole(source) {
    let _to = source.readAddress();
    let _role_id = source.readBigNumber();
    return { $$type: 'GrantRole', to: _to, role_id: _role_id };
}
function storeTupleGrantRole(source) {
    let builder = new core_1.TupleBuilder();
    builder.writeAddress(source.to);
    builder.writeNumber(source.role_id);
    return builder.build();
}
function dictValueParserGrantRole() {
    return {
        serialize: (src, builder) => {
            builder.storeRef((0, core_1.beginCell)().store(storeGrantRole(src)).endCell());
        },
        parse: (src) => {
            return loadGrantRole(src.loadRef().beginParse());
        }
    };
}
function storeRevokeRole(src) {
    return (builder) => {
        let b_0 = builder;
        b_0.storeUint(1363080030, 32);
        b_0.storeAddress(src.to);
        b_0.storeInt(src.role_id, 257);
    };
}
exports.storeRevokeRole = storeRevokeRole;
function loadRevokeRole(slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1363080030) {
        throw Error('Invalid prefix');
    }
    let _to = sc_0.loadAddress();
    let _role_id = sc_0.loadIntBig(257);
    return { $$type: 'RevokeRole', to: _to, role_id: _role_id };
}
exports.loadRevokeRole = loadRevokeRole;
function loadTupleRevokeRole(source) {
    let _to = source.readAddress();
    let _role_id = source.readBigNumber();
    return { $$type: 'RevokeRole', to: _to, role_id: _role_id };
}
function storeTupleRevokeRole(source) {
    let builder = new core_1.TupleBuilder();
    builder.writeAddress(source.to);
    builder.writeNumber(source.role_id);
    return builder.build();
}
function dictValueParserRevokeRole() {
    return {
        serialize: (src, builder) => {
            builder.storeRef((0, core_1.beginCell)().store(storeRevokeRole(src)).endCell());
        },
        parse: (src) => {
            return loadRevokeRole(src.loadRef().beginParse());
        }
    };
}
function storeRenounceRole(src) {
    return (builder) => {
        let b_0 = builder;
        b_0.storeUint(389201441, 32);
        b_0.storeInt(src.role_id, 257);
        b_0.storeAddress(src.address);
    };
}
exports.storeRenounceRole = storeRenounceRole;
function loadRenounceRole(slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 389201441) {
        throw Error('Invalid prefix');
    }
    let _role_id = sc_0.loadIntBig(257);
    let _address = sc_0.loadAddress();
    return { $$type: 'RenounceRole', role_id: _role_id, address: _address };
}
exports.loadRenounceRole = loadRenounceRole;
function loadTupleRenounceRole(source) {
    let _role_id = source.readBigNumber();
    let _address = source.readAddress();
    return { $$type: 'RenounceRole', role_id: _role_id, address: _address };
}
function storeTupleRenounceRole(source) {
    let builder = new core_1.TupleBuilder();
    builder.writeNumber(source.role_id);
    builder.writeAddress(source.address);
    return builder.build();
}
function dictValueParserRenounceRole() {
    return {
        serialize: (src, builder) => {
            builder.storeRef((0, core_1.beginCell)().store(storeRenounceRole(src)).endCell());
        },
        parse: (src) => {
            return loadRenounceRole(src.loadRef().beginParse());
        }
    };
}
function storeUpdateRoleAdmin(src) {
    return (builder) => {
        let b_0 = builder;
        b_0.storeUint(620382153, 32);
        b_0.storeInt(src.role_id, 257);
        b_0.storeInt(src.role_admin, 257);
    };
}
exports.storeUpdateRoleAdmin = storeUpdateRoleAdmin;
function loadUpdateRoleAdmin(slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 620382153) {
        throw Error('Invalid prefix');
    }
    let _role_id = sc_0.loadIntBig(257);
    let _role_admin = sc_0.loadIntBig(257);
    return { $$type: 'UpdateRoleAdmin', role_id: _role_id, role_admin: _role_admin };
}
exports.loadUpdateRoleAdmin = loadUpdateRoleAdmin;
function loadTupleUpdateRoleAdmin(source) {
    let _role_id = source.readBigNumber();
    let _role_admin = source.readBigNumber();
    return { $$type: 'UpdateRoleAdmin', role_id: _role_id, role_admin: _role_admin };
}
function storeTupleUpdateRoleAdmin(source) {
    let builder = new core_1.TupleBuilder();
    builder.writeNumber(source.role_id);
    builder.writeNumber(source.role_admin);
    return builder.build();
}
function dictValueParserUpdateRoleAdmin() {
    return {
        serialize: (src, builder) => {
            builder.storeRef((0, core_1.beginCell)().store(storeUpdateRoleAdmin(src)).endCell());
        },
        parse: (src) => {
            return loadUpdateRoleAdmin(src.loadRef().beginParse());
        }
    };
}
function storeRoleData(src) {
    return (builder) => {
        let b_0 = builder;
        b_0.storeDict(src.roles, core_1.Dictionary.Keys.Address(), core_1.Dictionary.Values.Bool());
        b_0.storeInt(src.admin_role, 257);
    };
}
exports.storeRoleData = storeRoleData;
function loadRoleData(slice) {
    let sc_0 = slice;
    let _roles = core_1.Dictionary.load(core_1.Dictionary.Keys.Address(), core_1.Dictionary.Values.Bool(), sc_0);
    let _admin_role = sc_0.loadIntBig(257);
    return { $$type: 'RoleData', roles: _roles, admin_role: _admin_role };
}
exports.loadRoleData = loadRoleData;
function loadTupleRoleData(source) {
    let _roles = core_1.Dictionary.loadDirect(core_1.Dictionary.Keys.Address(), core_1.Dictionary.Values.Bool(), source.readCellOpt());
    let _admin_role = source.readBigNumber();
    return { $$type: 'RoleData', roles: _roles, admin_role: _admin_role };
}
function storeTupleRoleData(source) {
    let builder = new core_1.TupleBuilder();
    builder.writeCell(source.roles.size > 0 ? (0, core_1.beginCell)().storeDictDirect(source.roles, core_1.Dictionary.Keys.Address(), core_1.Dictionary.Values.Bool()).endCell() : null);
    builder.writeNumber(source.admin_role);
    return builder.build();
}
function dictValueParserRoleData() {
    return {
        serialize: (src, builder) => {
            builder.storeRef((0, core_1.beginCell)().store(storeRoleData(src)).endCell());
        },
        parse: (src) => {
            return loadRoleData(src.loadRef().beginParse());
        }
    };
}
function storeWithdraw(src) {
    return (builder) => {
        let b_0 = builder;
        b_0.storeUint(2018736038, 32);
        b_0.storeInt(src.rewards, 257);
        b_0.storeAddress(src.address);
    };
}
exports.storeWithdraw = storeWithdraw;
function loadWithdraw(slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2018736038) {
        throw Error('Invalid prefix');
    }
    let _rewards = sc_0.loadIntBig(257);
    let _address = sc_0.loadAddress();
    return { $$type: 'Withdraw', rewards: _rewards, address: _address };
}
exports.loadWithdraw = loadWithdraw;
function loadTupleWithdraw(source) {
    let _rewards = source.readBigNumber();
    let _address = source.readAddress();
    return { $$type: 'Withdraw', rewards: _rewards, address: _address };
}
function storeTupleWithdraw(source) {
    let builder = new core_1.TupleBuilder();
    builder.writeNumber(source.rewards);
    builder.writeAddress(source.address);
    return builder.build();
}
function dictValueParserWithdraw() {
    return {
        serialize: (src, builder) => {
            builder.storeRef((0, core_1.beginCell)().store(storeWithdraw(src)).endCell());
        },
        parse: (src) => {
            return loadWithdraw(src.loadRef().beginParse());
        }
    };
}
function storeReleaseTokens(src) {
    return (builder) => {
        let b_0 = builder;
        b_0.storeUint(456227478, 32);
        b_0.storeAddress(src.to);
        b_0.storeInt(src.amount, 257);
    };
}
exports.storeReleaseTokens = storeReleaseTokens;
function loadReleaseTokens(slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 456227478) {
        throw Error('Invalid prefix');
    }
    let _to = sc_0.loadAddress();
    let _amount = sc_0.loadIntBig(257);
    return { $$type: 'ReleaseTokens', to: _to, amount: _amount };
}
exports.loadReleaseTokens = loadReleaseTokens;
function loadTupleReleaseTokens(source) {
    let _to = source.readAddress();
    let _amount = source.readBigNumber();
    return { $$type: 'ReleaseTokens', to: _to, amount: _amount };
}
function storeTupleReleaseTokens(source) {
    let builder = new core_1.TupleBuilder();
    builder.writeAddress(source.to);
    builder.writeNumber(source.amount);
    return builder.build();
}
function dictValueParserReleaseTokens() {
    return {
        serialize: (src, builder) => {
            builder.storeRef((0, core_1.beginCell)().store(storeReleaseTokens(src)).endCell());
        },
        parse: (src) => {
            return loadReleaseTokens(src.loadRef().beginParse());
        }
    };
}
function storeSetWalletAddress(src) {
    return (builder) => {
        let b_0 = builder;
        b_0.storeUint(907419751, 32);
        b_0.storeAddress(src.token_wallet);
    };
}
exports.storeSetWalletAddress = storeSetWalletAddress;
function loadSetWalletAddress(slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 907419751) {
        throw Error('Invalid prefix');
    }
    let _token_wallet = sc_0.loadAddress();
    return { $$type: 'SetWalletAddress', token_wallet: _token_wallet };
}
exports.loadSetWalletAddress = loadSetWalletAddress;
function loadTupleSetWalletAddress(source) {
    let _token_wallet = source.readAddress();
    return { $$type: 'SetWalletAddress', token_wallet: _token_wallet };
}
function storeTupleSetWalletAddress(source) {
    let builder = new core_1.TupleBuilder();
    builder.writeAddress(source.token_wallet);
    return builder.build();
}
function dictValueParserSetWalletAddress() {
    return {
        serialize: (src, builder) => {
            builder.storeRef((0, core_1.beginCell)().store(storeSetWalletAddress(src)).endCell());
        },
        parse: (src) => {
            return loadSetWalletAddress(src.loadRef().beginParse());
        }
    };
}
function storePoolPayload(src) {
    return (builder) => {
        let b_0 = builder;
        b_0.storeInt(src.mode, 257);
    };
}
exports.storePoolPayload = storePoolPayload;
function loadPoolPayload(slice) {
    let sc_0 = slice;
    let _mode = sc_0.loadIntBig(257);
    return { $$type: 'PoolPayload', mode: _mode };
}
exports.loadPoolPayload = loadPoolPayload;
function loadTuplePoolPayload(source) {
    let _mode = source.readBigNumber();
    return { $$type: 'PoolPayload', mode: _mode };
}
function storeTuplePoolPayload(source) {
    let builder = new core_1.TupleBuilder();
    builder.writeNumber(source.mode);
    return builder.build();
}
function dictValueParserPoolPayload() {
    return {
        serialize: (src, builder) => {
            builder.storeRef((0, core_1.beginCell)().store(storePoolPayload(src)).endCell());
        },
        parse: (src) => {
            return loadPoolPayload(src.loadRef().beginParse());
        }
    };
}
function storePosition(src) {
    return (builder) => {
        let b_0 = builder;
        b_0.storeInt(src.lastInternalFeeGrowth, 257);
        b_0.storeInt(src.rewards, 257);
    };
}
exports.storePosition = storePosition;
function loadPosition(slice) {
    let sc_0 = slice;
    let _lastInternalFeeGrowth = sc_0.loadIntBig(257);
    let _rewards = sc_0.loadIntBig(257);
    return { $$type: 'Position', lastInternalFeeGrowth: _lastInternalFeeGrowth, rewards: _rewards };
}
exports.loadPosition = loadPosition;
function loadTuplePosition(source) {
    let _lastInternalFeeGrowth = source.readBigNumber();
    let _rewards = source.readBigNumber();
    return { $$type: 'Position', lastInternalFeeGrowth: _lastInternalFeeGrowth, rewards: _rewards };
}
function storeTuplePosition(source) {
    let builder = new core_1.TupleBuilder();
    builder.writeNumber(source.lastInternalFeeGrowth);
    builder.writeNumber(source.rewards);
    return builder.build();
}
function dictValueParserPosition() {
    return {
        serialize: (src, builder) => {
            builder.storeRef((0, core_1.beginCell)().store(storePosition(src)).endCell());
        },
        parse: (src) => {
            return loadPosition(src.loadRef().beginParse());
        }
    };
}
function storeRewardSplit(src) {
    return (builder) => {
        let b_0 = builder;
        b_0.storeInt(src.protocolFeeShare, 257);
        b_0.storeInt(src.lpProvidersShare, 257);
    };
}
exports.storeRewardSplit = storeRewardSplit;
function loadRewardSplit(slice) {
    let sc_0 = slice;
    let _protocolFeeShare = sc_0.loadIntBig(257);
    let _lpProvidersShare = sc_0.loadIntBig(257);
    return { $$type: 'RewardSplit', protocolFeeShare: _protocolFeeShare, lpProvidersShare: _lpProvidersShare };
}
exports.loadRewardSplit = loadRewardSplit;
function loadTupleRewardSplit(source) {
    let _protocolFeeShare = source.readBigNumber();
    let _lpProvidersShare = source.readBigNumber();
    return { $$type: 'RewardSplit', protocolFeeShare: _protocolFeeShare, lpProvidersShare: _lpProvidersShare };
}
function storeTupleRewardSplit(source) {
    let builder = new core_1.TupleBuilder();
    builder.writeNumber(source.protocolFeeShare);
    builder.writeNumber(source.lpProvidersShare);
    return builder.build();
}
function dictValueParserRewardSplit() {
    return {
        serialize: (src, builder) => {
            builder.storeRef((0, core_1.beginCell)().store(storeRewardSplit(src)).endCell());
        },
        parse: (src) => {
            return loadRewardSplit(src.loadRef().beginParse());
        }
    };
}
function storeTokenTransfer(src) {
    return (builder) => {
        let b_0 = builder;
        b_0.storeUint(260734629, 32);
        b_0.storeUint(src.query_id, 64);
        b_0.storeCoins(src.amount);
        b_0.storeAddress(src.sender);
        b_0.storeAddress(src.response_destination);
        if (src.custom_payload !== null && src.custom_payload !== undefined) {
            b_0.storeBit(true).storeRef(src.custom_payload);
        }
        else {
            b_0.storeBit(false);
        }
        b_0.storeCoins(src.forward_ton_amount);
        b_0.storeBuilder(src.forward_payload.asBuilder());
    };
}
exports.storeTokenTransfer = storeTokenTransfer;
function loadTokenTransfer(slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 260734629) {
        throw Error('Invalid prefix');
    }
    let _query_id = sc_0.loadUintBig(64);
    let _amount = sc_0.loadCoins();
    let _sender = sc_0.loadAddress();
    let _response_destination = sc_0.loadMaybeAddress();
    let _custom_payload = sc_0.loadBit() ? sc_0.loadRef() : null;
    let _forward_ton_amount = sc_0.loadCoins();
    let _forward_payload = sc_0.asCell();
    return { $$type: 'TokenTransfer', query_id: _query_id, amount: _amount, sender: _sender, response_destination: _response_destination, custom_payload: _custom_payload, forward_ton_amount: _forward_ton_amount, forward_payload: _forward_payload };
}
exports.loadTokenTransfer = loadTokenTransfer;
function loadTupleTokenTransfer(source) {
    let _query_id = source.readBigNumber();
    let _amount = source.readBigNumber();
    let _sender = source.readAddress();
    let _response_destination = source.readAddressOpt();
    let _custom_payload = source.readCellOpt();
    let _forward_ton_amount = source.readBigNumber();
    let _forward_payload = source.readCell();
    return { $$type: 'TokenTransfer', query_id: _query_id, amount: _amount, sender: _sender, response_destination: _response_destination, custom_payload: _custom_payload, forward_ton_amount: _forward_ton_amount, forward_payload: _forward_payload };
}
function storeTupleTokenTransfer(source) {
    let builder = new core_1.TupleBuilder();
    builder.writeNumber(source.query_id);
    builder.writeNumber(source.amount);
    builder.writeAddress(source.sender);
    builder.writeAddress(source.response_destination);
    builder.writeCell(source.custom_payload);
    builder.writeNumber(source.forward_ton_amount);
    builder.writeSlice(source.forward_payload);
    return builder.build();
}
function dictValueParserTokenTransfer() {
    return {
        serialize: (src, builder) => {
            builder.storeRef((0, core_1.beginCell)().store(storeTokenTransfer(src)).endCell());
        },
        parse: (src) => {
            return loadTokenTransfer(src.loadRef().beginParse());
        }
    };
}
function storeUpdateDeposit(src) {
    return (builder) => {
        let b_0 = builder;
        b_0.storeUint(2749033543, 32);
        b_0.storeInt(src.feeGrowthGlobal, 257);
    };
}
exports.storeUpdateDeposit = storeUpdateDeposit;
function loadUpdateDeposit(slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2749033543) {
        throw Error('Invalid prefix');
    }
    let _feeGrowthGlobal = sc_0.loadIntBig(257);
    return { $$type: 'UpdateDeposit', feeGrowthGlobal: _feeGrowthGlobal };
}
exports.loadUpdateDeposit = loadUpdateDeposit;
function loadTupleUpdateDeposit(source) {
    let _feeGrowthGlobal = source.readBigNumber();
    return { $$type: 'UpdateDeposit', feeGrowthGlobal: _feeGrowthGlobal };
}
function storeTupleUpdateDeposit(source) {
    let builder = new core_1.TupleBuilder();
    builder.writeNumber(source.feeGrowthGlobal);
    return builder.build();
}
function dictValueParserUpdateDeposit() {
    return {
        serialize: (src, builder) => {
            builder.storeRef((0, core_1.beginCell)().store(storeUpdateDeposit(src)).endCell());
        },
        parse: (src) => {
            return loadUpdateDeposit(src.loadRef().beginParse());
        }
    };
}
function storeInternalWithdrawFee(src) {
    return (builder) => {
        let b_0 = builder;
        b_0.storeUint(2441921564, 32);
        b_0.storeInt(src.lastFeeGrowth, 257);
        b_0.storeAddress(src.owner);
        b_0.storeInt(src.balance, 257);
    };
}
exports.storeInternalWithdrawFee = storeInternalWithdrawFee;
function loadInternalWithdrawFee(slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2441921564) {
        throw Error('Invalid prefix');
    }
    let _lastFeeGrowth = sc_0.loadIntBig(257);
    let _owner = sc_0.loadAddress();
    let _balance = sc_0.loadIntBig(257);
    return { $$type: 'InternalWithdrawFee', lastFeeGrowth: _lastFeeGrowth, owner: _owner, balance: _balance };
}
exports.loadInternalWithdrawFee = loadInternalWithdrawFee;
function loadTupleInternalWithdrawFee(source) {
    let _lastFeeGrowth = source.readBigNumber();
    let _owner = source.readAddress();
    let _balance = source.readBigNumber();
    return { $$type: 'InternalWithdrawFee', lastFeeGrowth: _lastFeeGrowth, owner: _owner, balance: _balance };
}
function storeTupleInternalWithdrawFee(source) {
    let builder = new core_1.TupleBuilder();
    builder.writeNumber(source.lastFeeGrowth);
    builder.writeAddress(source.owner);
    builder.writeNumber(source.balance);
    return builder.build();
}
function dictValueParserInternalWithdrawFee() {
    return {
        serialize: (src, builder) => {
            builder.storeRef((0, core_1.beginCell)().store(storeInternalWithdrawFee(src)).endCell());
        },
        parse: (src) => {
            return loadInternalWithdrawFee(src.loadRef().beginParse());
        }
    };
}
function storeStaked(src) {
    return (builder) => {
        let b_0 = builder;
        b_0.storeUint(923309543, 32);
        b_0.storeInt(src.amount, 257);
        b_0.storeAddress(src.staker);
    };
}
exports.storeStaked = storeStaked;
function loadStaked(slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 923309543) {
        throw Error('Invalid prefix');
    }
    let _amount = sc_0.loadIntBig(257);
    let _staker = sc_0.loadAddress();
    return { $$type: 'Staked', amount: _amount, staker: _staker };
}
exports.loadStaked = loadStaked;
function loadTupleStaked(source) {
    let _amount = source.readBigNumber();
    let _staker = source.readAddress();
    return { $$type: 'Staked', amount: _amount, staker: _staker };
}
function storeTupleStaked(source) {
    let builder = new core_1.TupleBuilder();
    builder.writeNumber(source.amount);
    builder.writeAddress(source.staker);
    return builder.build();
}
function dictValueParserStaked() {
    return {
        serialize: (src, builder) => {
            builder.storeRef((0, core_1.beginCell)().store(storeStaked(src)).endCell());
        },
        parse: (src) => {
            return loadStaked(src.loadRef().beginParse());
        }
    };
}
function storeLPTransfer(src) {
    return (builder) => {
        let b_0 = builder;
        b_0.storeUint(4122418836, 32);
        b_0.storeInt(src.amount, 257);
        b_0.storeAddress(src.to);
    };
}
exports.storeLPTransfer = storeLPTransfer;
function loadLPTransfer(slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 4122418836) {
        throw Error('Invalid prefix');
    }
    let _amount = sc_0.loadIntBig(257);
    let _to = sc_0.loadAddress();
    return { $$type: 'LPTransfer', amount: _amount, to: _to };
}
exports.loadLPTransfer = loadLPTransfer;
function loadTupleLPTransfer(source) {
    let _amount = source.readBigNumber();
    let _to = source.readAddress();
    return { $$type: 'LPTransfer', amount: _amount, to: _to };
}
function storeTupleLPTransfer(source) {
    let builder = new core_1.TupleBuilder();
    builder.writeNumber(source.amount);
    builder.writeAddress(source.to);
    return builder.build();
}
function dictValueParserLPTransfer() {
    return {
        serialize: (src, builder) => {
            builder.storeRef((0, core_1.beginCell)().store(storeLPTransfer(src)).endCell());
        },
        parse: (src) => {
            return loadLPTransfer(src.loadRef().beginParse());
        }
    };
}
function storeWithdrawn(src) {
    return (builder) => {
        let b_0 = builder;
        b_0.storeUint(3502398954, 32);
        b_0.storeAddress(src.user);
        b_0.storeInt(src.amount, 257);
    };
}
exports.storeWithdrawn = storeWithdrawn;
function loadWithdrawn(slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 3502398954) {
        throw Error('Invalid prefix');
    }
    let _user = sc_0.loadAddress();
    let _amount = sc_0.loadIntBig(257);
    return { $$type: 'Withdrawn', user: _user, amount: _amount };
}
exports.loadWithdrawn = loadWithdrawn;
function loadTupleWithdrawn(source) {
    let _user = source.readAddress();
    let _amount = source.readBigNumber();
    return { $$type: 'Withdrawn', user: _user, amount: _amount };
}
function storeTupleWithdrawn(source) {
    let builder = new core_1.TupleBuilder();
    builder.writeAddress(source.user);
    builder.writeNumber(source.amount);
    return builder.build();
}
function dictValueParserWithdrawn() {
    return {
        serialize: (src, builder) => {
            builder.storeRef((0, core_1.beginCell)().store(storeWithdrawn(src)).endCell());
        },
        parse: (src) => {
            return loadWithdrawn(src.loadRef().beginParse());
        }
    };
}
function storeRewardsPaid(src) {
    return (builder) => {
        let b_0 = builder;
        b_0.storeUint(3897230482, 32);
        b_0.storeAddress(src.user);
        b_0.storeInt(src.amount, 257);
    };
}
exports.storeRewardsPaid = storeRewardsPaid;
function loadRewardsPaid(slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 3897230482) {
        throw Error('Invalid prefix');
    }
    let _user = sc_0.loadAddress();
    let _amount = sc_0.loadIntBig(257);
    return { $$type: 'RewardsPaid', user: _user, amount: _amount };
}
exports.loadRewardsPaid = loadRewardsPaid;
function loadTupleRewardsPaid(source) {
    let _user = source.readAddress();
    let _amount = source.readBigNumber();
    return { $$type: 'RewardsPaid', user: _user, amount: _amount };
}
function storeTupleRewardsPaid(source) {
    let builder = new core_1.TupleBuilder();
    builder.writeAddress(source.user);
    builder.writeNumber(source.amount);
    return builder.build();
}
function dictValueParserRewardsPaid() {
    return {
        serialize: (src, builder) => {
            builder.storeRef((0, core_1.beginCell)().store(storeRewardsPaid(src)).endCell());
        },
        parse: (src) => {
            return loadRewardsPaid(src.loadRef().beginParse());
        }
    };
}
function initEmmetLPWallet_init_args(src) {
    return (builder) => {
        let b_0 = builder;
        b_0.storeAddress(src.owner);
        b_0.storeAddress(src.jetton_master);
    };
}
async function EmmetLPWallet_init(owner, jetton_master) {
    const __code = core_1.Cell.fromBase64('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');
    const __system = core_1.Cell.fromBase64('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');
    let builder = (0, core_1.beginCell)();
    builder.storeRef(__system);
    builder.storeUint(0, 1);
    initEmmetLPWallet_init_args({ $$type: 'EmmetLPWallet_init_args', owner, jetton_master })(builder);
    const __data = builder.endCell();
    return { code: __code, data: __data };
}
const EmmetLPWallet_errors = {
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
    50413: { message: `AccessControl: Doesnt have the role` },
    54023: { message: `AccessControl: Doesn't have role` },
    55045: { message: `Only master can update deposit.` },
    60354: { message: `JettonWallet: Not enough balance to burn tokens` },
};
const EmmetLPWallet_types = [
    { "name": "StateInit", "header": null, "fields": [{ "name": "code", "type": { "kind": "simple", "type": "cell", "optional": false } }, { "name": "data", "type": { "kind": "simple", "type": "cell", "optional": false } }] },
    { "name": "Context", "header": null, "fields": [{ "name": "bounced", "type": { "kind": "simple", "type": "bool", "optional": false } }, { "name": "sender", "type": { "kind": "simple", "type": "address", "optional": false } }, { "name": "value", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "raw", "type": { "kind": "simple", "type": "slice", "optional": false } }] },
    { "name": "SendParameters", "header": null, "fields": [{ "name": "bounce", "type": { "kind": "simple", "type": "bool", "optional": false } }, { "name": "to", "type": { "kind": "simple", "type": "address", "optional": false } }, { "name": "value", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "mode", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "body", "type": { "kind": "simple", "type": "cell", "optional": true } }, { "name": "code", "type": { "kind": "simple", "type": "cell", "optional": true } }, { "name": "data", "type": { "kind": "simple", "type": "cell", "optional": true } }] },
    { "name": "Deploy", "header": 2490013878, "fields": [{ "name": "queryId", "type": { "kind": "simple", "type": "uint", "optional": false, "format": 64 } }] },
    { "name": "DeployOk", "header": 2952335191, "fields": [{ "name": "queryId", "type": { "kind": "simple", "type": "uint", "optional": false, "format": 64 } }] },
    { "name": "FactoryDeploy", "header": 1829761339, "fields": [{ "name": "queryId", "type": { "kind": "simple", "type": "uint", "optional": false, "format": 64 } }, { "name": "cashback", "type": { "kind": "simple", "type": "address", "optional": false } }] },
    { "name": "JettonData", "header": null, "fields": [{ "name": "total_supply", "type": { "kind": "simple", "type": "uint", "optional": false, "format": "coins" } }, { "name": "mintable", "type": { "kind": "simple", "type": "bool", "optional": false } }, { "name": "admin_address", "type": { "kind": "simple", "type": "address", "optional": false } }, { "name": "jetton_content", "type": { "kind": "simple", "type": "cell", "optional": false } }, { "name": "jetton_wallet_code", "type": { "kind": "simple", "type": "cell", "optional": false } }] },
    { "name": "JettonMint", "header": 2310479113, "fields": [{ "name": "origin", "type": { "kind": "simple", "type": "address", "optional": false } }, { "name": "receiver", "type": { "kind": "simple", "type": "address", "optional": false } }, { "name": "amount", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "custom_payload", "type": { "kind": "simple", "type": "cell", "optional": true } }, { "name": "forward_ton_amount", "type": { "kind": "simple", "type": "uint", "optional": false, "format": "coins" } }, { "name": "forward_payload", "type": { "kind": "simple", "type": "slice", "optional": false, "format": "remainder" } }] },
    { "name": "JettonTransfer", "header": 260734629, "fields": [{ "name": "query_id", "type": { "kind": "simple", "type": "uint", "optional": false, "format": 64 } }, { "name": "amount", "type": { "kind": "simple", "type": "uint", "optional": false, "format": "coins" } }, { "name": "destination", "type": { "kind": "simple", "type": "address", "optional": false } }, { "name": "response_destination", "type": { "kind": "simple", "type": "address", "optional": false } }, { "name": "custom_payload", "type": { "kind": "simple", "type": "cell", "optional": true } }, { "name": "forward_ton_amount", "type": { "kind": "simple", "type": "uint", "optional": false, "format": "coins" } }, { "name": "forward_payload", "type": { "kind": "simple", "type": "slice", "optional": false, "format": "remainder" } }] },
    { "name": "JettonTransferNotification", "header": 1935855772, "fields": [{ "name": "query_id", "type": { "kind": "simple", "type": "uint", "optional": false, "format": 64 } }, { "name": "amount", "type": { "kind": "simple", "type": "uint", "optional": false, "format": "coins" } }, { "name": "sender", "type": { "kind": "simple", "type": "address", "optional": false } }, { "name": "forward_payload", "type": { "kind": "simple", "type": "slice", "optional": false, "format": "remainder" } }] },
    { "name": "JettonBurn", "header": 1499400124, "fields": [{ "name": "query_id", "type": { "kind": "simple", "type": "uint", "optional": false, "format": 64 } }, { "name": "amount", "type": { "kind": "simple", "type": "uint", "optional": false, "format": "coins" } }, { "name": "response_destination", "type": { "kind": "simple", "type": "address", "optional": false } }, { "name": "custom_payload", "type": { "kind": "simple", "type": "cell", "optional": true } }, { "name": "forward_ton_amount", "type": { "kind": "simple", "type": "uint", "optional": false, "format": "coins" } }, { "name": "forward_payload", "type": { "kind": "simple", "type": "slice", "optional": false, "format": "remainder" } }] },
    { "name": "JettonExcesses", "header": 3576854235, "fields": [{ "name": "query_id", "type": { "kind": "simple", "type": "uint", "optional": false, "format": 64 } }] },
    { "name": "JettonInternalTransfer", "header": 395134233, "fields": [{ "name": "query_id", "type": { "kind": "simple", "type": "uint", "optional": false, "format": 64 } }, { "name": "amount", "type": { "kind": "simple", "type": "uint", "optional": false, "format": "coins" } }, { "name": "from", "type": { "kind": "simple", "type": "address", "optional": false } }, { "name": "response_address", "type": { "kind": "simple", "type": "address", "optional": false } }, { "name": "forward_ton_amount", "type": { "kind": "simple", "type": "uint", "optional": false, "format": "coins" } }, { "name": "forward_payload", "type": { "kind": "simple", "type": "slice", "optional": false, "format": "remainder" } }] },
    { "name": "JettonBurnNotification", "header": 2078119902, "fields": [{ "name": "query_id", "type": { "kind": "simple", "type": "uint", "optional": false, "format": 64 } }, { "name": "amount", "type": { "kind": "simple", "type": "uint", "optional": false, "format": "coins" } }, { "name": "sender", "type": { "kind": "simple", "type": "address", "optional": false } }, { "name": "response_destination", "type": { "kind": "simple", "type": "address", "optional": false } }, { "name": "forward_ton_amount", "type": { "kind": "simple", "type": "uint", "optional": false, "format": "coins" } }, { "name": "forward_payload", "type": { "kind": "simple", "type": "slice", "optional": false, "format": "remainder" } }] },
    { "name": "WalletData", "header": null, "fields": [{ "name": "balance", "type": { "kind": "simple", "type": "uint", "optional": false, "format": "coins" } }, { "name": "owner", "type": { "kind": "simple", "type": "address", "optional": false } }, { "name": "jetton", "type": { "kind": "simple", "type": "address", "optional": false } }, { "name": "jetton_wallet_code", "type": { "kind": "simple", "type": "cell", "optional": false } }] },
    { "name": "GrantRole", "header": 174185305, "fields": [{ "name": "to", "type": { "kind": "simple", "type": "address", "optional": false } }, { "name": "role_id", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }] },
    { "name": "RevokeRole", "header": 1363080030, "fields": [{ "name": "to", "type": { "kind": "simple", "type": "address", "optional": false } }, { "name": "role_id", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }] },
    { "name": "RenounceRole", "header": 389201441, "fields": [{ "name": "role_id", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "address", "type": { "kind": "simple", "type": "address", "optional": false } }] },
    { "name": "UpdateRoleAdmin", "header": 620382153, "fields": [{ "name": "role_id", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "role_admin", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }] },
    { "name": "RoleData", "header": null, "fields": [{ "name": "roles", "type": { "kind": "dict", "key": "address", "value": "bool" } }, { "name": "admin_role", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }] },
    { "name": "Withdraw", "header": 2018736038, "fields": [{ "name": "rewards", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "address", "type": { "kind": "simple", "type": "address", "optional": false } }] },
    { "name": "ReleaseTokens", "header": 456227478, "fields": [{ "name": "to", "type": { "kind": "simple", "type": "address", "optional": false } }, { "name": "amount", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }] },
    { "name": "SetWalletAddress", "header": 907419751, "fields": [{ "name": "token_wallet", "type": { "kind": "simple", "type": "address", "optional": false } }] },
    { "name": "PoolPayload", "header": null, "fields": [{ "name": "mode", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }] },
    { "name": "Position", "header": null, "fields": [{ "name": "lastInternalFeeGrowth", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "rewards", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }] },
    { "name": "RewardSplit", "header": null, "fields": [{ "name": "protocolFeeShare", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "lpProvidersShare", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }] },
    { "name": "TokenTransfer", "header": 260734629, "fields": [{ "name": "query_id", "type": { "kind": "simple", "type": "uint", "optional": false, "format": 64 } }, { "name": "amount", "type": { "kind": "simple", "type": "uint", "optional": false, "format": "coins" } }, { "name": "sender", "type": { "kind": "simple", "type": "address", "optional": false } }, { "name": "response_destination", "type": { "kind": "simple", "type": "address", "optional": true } }, { "name": "custom_payload", "type": { "kind": "simple", "type": "cell", "optional": true } }, { "name": "forward_ton_amount", "type": { "kind": "simple", "type": "uint", "optional": false, "format": "coins" } }, { "name": "forward_payload", "type": { "kind": "simple", "type": "slice", "optional": false, "format": "remainder" } }] },
    { "name": "UpdateDeposit", "header": 2749033543, "fields": [{ "name": "feeGrowthGlobal", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }] },
    { "name": "InternalWithdrawFee", "header": 2441921564, "fields": [{ "name": "lastFeeGrowth", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "owner", "type": { "kind": "simple", "type": "address", "optional": false } }, { "name": "balance", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }] },
    { "name": "Staked", "header": 923309543, "fields": [{ "name": "amount", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "staker", "type": { "kind": "simple", "type": "address", "optional": false } }] },
    { "name": "LPTransfer", "header": 4122418836, "fields": [{ "name": "amount", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "to", "type": { "kind": "simple", "type": "address", "optional": false } }] },
    { "name": "Withdrawn", "header": 3502398954, "fields": [{ "name": "user", "type": { "kind": "simple", "type": "address", "optional": false } }, { "name": "amount", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }] },
    { "name": "RewardsPaid", "header": 3897230482, "fields": [{ "name": "user", "type": { "kind": "simple", "type": "address", "optional": false } }, { "name": "amount", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }] },
];
const EmmetLPWallet_getters = [
    { "name": "lastInternalFeeGrowth", "arguments": [], "returnType": { "kind": "simple", "type": "int", "optional": false, "format": 257 } },
    { "name": "get_wallet_data", "arguments": [], "returnType": { "kind": "simple", "type": "WalletData", "optional": false } },
];
const EmmetLPWallet_receivers = [
    { "receiver": "internal", "message": { "kind": "typed", "type": "UpdateDeposit" } },
    { "receiver": "internal", "message": { "kind": "text", "text": "WithdrawFees" } },
    { "receiver": "internal", "message": { "kind": "typed", "type": "JettonTransfer" } },
    { "receiver": "internal", "message": { "kind": "typed", "type": "JettonBurn" } },
    { "receiver": "internal", "message": { "kind": "typed", "type": "JettonInternalTransfer" } },
];
class EmmetLPWallet {
    static async init(owner, jetton_master) {
        return await EmmetLPWallet_init(owner, jetton_master);
    }
    static async fromInit(owner, jetton_master) {
        const init = await EmmetLPWallet_init(owner, jetton_master);
        const address = (0, core_1.contractAddress)(0, init);
        return new EmmetLPWallet(address, init);
    }
    static fromAddress(address) {
        return new EmmetLPWallet(address);
    }
    constructor(address, init) {
        this.abi = {
            types: EmmetLPWallet_types,
            getters: EmmetLPWallet_getters,
            receivers: EmmetLPWallet_receivers,
            errors: EmmetLPWallet_errors,
        };
        this.address = address;
        this.init = init;
    }
    async send(provider, via, args, message) {
        let body = null;
        if (message && typeof message === 'object' && !(message instanceof core_1.Slice) && message.$$type === 'UpdateDeposit') {
            body = (0, core_1.beginCell)().store(storeUpdateDeposit(message)).endCell();
        }
        if (message === 'WithdrawFees') {
            body = (0, core_1.beginCell)().storeUint(0, 32).storeStringTail(message).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof core_1.Slice) && message.$$type === 'JettonTransfer') {
            body = (0, core_1.beginCell)().store(storeJettonTransfer(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof core_1.Slice) && message.$$type === 'JettonBurn') {
            body = (0, core_1.beginCell)().store(storeJettonBurn(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof core_1.Slice) && message.$$type === 'JettonInternalTransfer') {
            body = (0, core_1.beginCell)().store(storeJettonInternalTransfer(message)).endCell();
        }
        if (body === null) {
            throw new Error('Invalid message type');
        }
        await provider.internal(via, { ...args, body: body });
    }
    async getLastInternalFeeGrowth(provider) {
        let builder = new core_1.TupleBuilder();
        let source = (await provider.get('lastInternalFeeGrowth', builder.build())).stack;
        let result = source.readBigNumber();
        return result;
    }
    async getGetWalletData(provider) {
        let builder = new core_1.TupleBuilder();
        let source = (await provider.get('get_wallet_data', builder.build())).stack;
        const result = loadTupleWalletData(source);
        return result;
    }
}
exports.EmmetLPWallet = EmmetLPWallet;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFjdF9FbW1ldExQV2FsbGV0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2NvbnRyYWN0cy90b24vcG9vbHMvdGFjdF9FbW1ldExQV2FsbGV0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSw0QkFBNEI7QUFDNUIsb0NBb0JtQjtBQVFuQixTQUFnQixjQUFjLENBQUMsR0FBYztJQUN6QyxPQUFPLENBQUMsT0FBZ0IsRUFBRSxFQUFFO1FBQ3hCLElBQUksR0FBRyxHQUFHLE9BQU8sQ0FBQztRQUNsQixHQUFHLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUN2QixHQUFHLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUMzQixDQUFDLENBQUM7QUFDTixDQUFDO0FBTkQsd0NBTUM7QUFFRCxTQUFnQixhQUFhLENBQUMsS0FBWTtJQUN0QyxJQUFJLElBQUksR0FBRyxLQUFLLENBQUM7SUFDakIsSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO0lBQzNCLElBQUksS0FBSyxHQUFHLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztJQUMzQixPQUFPLEVBQUUsTUFBTSxFQUFFLFdBQW9CLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLENBQUM7QUFDdEUsQ0FBQztBQUxELHNDQUtDO0FBRUQsU0FBUyxrQkFBa0IsQ0FBQyxNQUFtQjtJQUMzQyxJQUFJLEtBQUssR0FBRyxNQUFNLENBQUMsUUFBUSxFQUFFLENBQUM7SUFDOUIsSUFBSSxLQUFLLEdBQUcsTUFBTSxDQUFDLFFBQVEsRUFBRSxDQUFDO0lBQzlCLE9BQU8sRUFBRSxNQUFNLEVBQUUsV0FBb0IsRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsQ0FBQztBQUN0RSxDQUFDO0FBRUQsU0FBUyxtQkFBbUIsQ0FB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QUM7SUFDN0wsRUFBQyxNQUFNLEVBQUMsU0FBUyxFQUFDLFFBQVEsRUFBQyxJQUFJLEVBQUMsUUFBUSxFQUFDLENBQUMsRUFBQyxNQUFNLEVBQUMsU0FBUyxFQUFDLE1BQU0sRUFBQyxFQUFDLE1BQU0sRUFBQyxRQUFRLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxVQUFVLEVBQUMsS0FBSyxFQUFDLEVBQUMsRUFBQyxFQUFDLE1BQU0sRUFBQyxRQUFRLEVBQUMsTUFBTSxFQUFDLEVBQUMsTUFBTSxFQUFDLFFBQVEsRUFBQyxNQUFNLEVBQUMsU0FBUyxFQUFDLFVBQVUsRUFBQyxLQUFLLEVBQUMsRUFBQyxFQUFDLEVBQUMsTUFBTSxFQUFDLE9BQU8sRUFBQyxNQUFNLEVBQUMsRUFBQyxNQUFNLEVBQUMsUUFBUSxFQUFDLE1BQU0sRUFBQyxLQUFLLEVBQUMsVUFBVSxFQUFDLEtBQUssRUFBQyxRQUFRLEVBQUMsR0FBRyxFQUFDLEVBQUMsRUFBQyxFQUFDLE1BQU0sRUFBQyxLQUFLLEVBQUMsTUFBTSxFQUFDLEVBQUMsTUFBTSxFQUFDLFFBQVEsRUFBQyxNQUFNLEVBQUMsT0FBTyxFQUFDLFVBQVUsRUFBQyxLQUFLLEVBQUMsRUFBQyxDQUFDLEVBQUM7SUFDaFcsRUFBQyxNQUFNLEVBQUMsZ0JBQWdCLEVBQUMsUUFBUSxFQUFDLElBQUksRUFBQyxRQUFRLEVBQUMsQ0FBQyxFQUFDLE1BQU0sRUFBQyxRQUFRLEVBQUMsTUFBTSxFQUFDLEVBQUMsTUFBTSxFQUFDLFFBQVEsRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLFVBQVUsRUFBQyxLQUFLLEVBQUMsRUFBQyxFQUFDLEVBQUMsTUFBTSxFQUFDLElBQUksRUFBQyxNQUFNLEVBQUMsRUFBQyxNQUFNLEVBQUMsUUFBUSxFQUFDLE1BQU0sRUFBQyxTQUFTLEVBQUMsVUFBVSxFQUFDLEtBQUssRUFBQyxFQUFDLEVBQUMsRUFBQyxNQUFNLEVBQUMsT0FBTyxFQUFDLE1BQU0sRUFBQyxFQUFDLE1BQU0sRUFBQyxRQUFRLEVBQUMsTUFBTSxFQUFDLEtBQUssRUFBQyxVQUFVLEVBQUMsS0FBSyxFQUFDLFFBQVEsRUFBQyxHQUFHLEVBQUMsRUFBQyxFQUFDLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsRUFBQyxNQUFNLEVBQUMsUUFBUSxFQUFDLE1BQU0sRUFBQyxLQUFLLEVBQUMsVUFBVSxFQUFDLEtBQUssRUFBQyxRQUFRLEVBQUMsR0FBRyxFQUFDLEVBQUMsRUFBQyxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLEVBQUMsTUFBTSxFQUFDLFFBQVEsRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLFVBQVUsRUFBQyxJQUFJLEVBQUMsRUFBQyxFQUFDLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsRUFBQyxNQUFNLEVBQUMsUUFBUSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsVUFBVSxFQUFDLElBQUksRUFBQyxFQUFDLEVBQUMsRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxFQUFDLE1BQU0sRUFBQyxRQUFRLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxVQUFVLEVBQUMsSUFBSSxFQUFDLEVBQUMsQ0FBQyxFQUFDO0lBQ25rQixFQUFDLE1BQU0sRUFBQyxRQUFRLEVBQUMsUUFBUSxFQUFDLFVBQVUsRUFBQyxRQUFRLEVBQUMsQ0FBQyxFQUFDLE1BQU0sRUFBQyxTQUFTLEVBQUMsTUFBTSxFQUFDLEVBQUMsTUFBTSxFQUFDLFFBQVEsRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLFVBQVUsRUFBQyxLQUFLLEVBQUMsUUFBUSxFQUFDLEVBQUUsRUFBQyxFQUFDLENBQUMsRUFBQztJQUN2SSxFQUFDLE1BQU0sRUFBQyxVQUFVLEVBQUMsUUFBUSxFQUFDLFVBQVUsRUFBQyxRQUFRLEVBQUMsQ0FBQyxFQUFDLE1BQU0sRUFBQyxTQUFTLEVBQUMsTUFBTSxFQUFDLEVBQUMsTUFBTSxFQUFDLFFBQVEsRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLFVBQVUsRUFBQyxLQUFLLEVBQUMsUUFBUSxFQUFDLEVBQUUsRUFBQyxFQUFDLENBQUMsRUFBQztJQUN6SSxFQUFDLE1BQU0sRUFBQyxlQUFlLEVBQUMsUUFBUSxFQUFDLFVBQVUsRUFBQyxRQUFRLEVBQUMsQ0FBQyxFQUFDLE1BQU0sRUFBQyxTQUFTLEVBQUMsTUFBTSxFQUFDLEVBQUMsTUFBTSxFQUFDLFFBQVEsRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLFVBQVUsRUFBQyxLQUFLLEVBQUMsUUFBUSxFQUFDLEVBQUUsRUFBQyxFQUFDLEVBQUMsRUFBQyxNQUFNLEVBQUMsVUFBVSxFQUFDLE1BQU0sRUFBQyxFQUFDLE1BQU0sRUFBQyxRQUFRLEVBQUMsTUFBTSxFQUFDLFNBQVMsRUFBQyxVQUFVLEVBQUMsS0FBSyxFQUFDLEVBQUMsQ0FBQyxFQUFDO0lBQzdOLEVBQUMsTUFBTSxFQUFDLFlBQVksRUFBQyxRQUFRLEVBQUMsSUFBSSxFQUFDLFFBQVEsRUFBQyxDQUFDLEVBQUMsTUFBTSxFQUFDLGNBQWMsRUFBQyxNQUFNLEVBQUMsRUFBQyxNQUFNLEVBQUMsUUFBUSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsVUFBVSxFQUFDLEtBQUssRUFBQyxRQUFRLEVBQUMsT0FBTyxFQUFDLEVBQUMsRUFBQyxFQUFDLE1BQU0sRUFBQyxVQUFVLEVBQUMsTUFBTSxFQUFDLEVBQUMsTUFBTSxFQUFDLFFBQVEsRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLFVBQVUsRUFBQyxLQUFLLEVBQUMsRUFBQyxFQUFDLEVBQUMsTUFBTSxFQUFDLGVBQWUsRUFBQyxNQUFNLEVBQUMsRUFBQyxNQUFNLEVBQUMsUUFBUSxFQUFDLE1BQU0sRUFBQyxTQUFTLEVBQUMsVUFBVSxFQUFDLEtBQUssRUFBQyxFQUFDLEVBQUMsRUFBQyxNQUFNLEVBQUMsZ0JBQWdCLEVBQUMsTUFBTSxFQUFDLEVBQUMsTUFBTSxFQUFDLFFBQVEsRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLFVBQVUsRUFBQyxLQUFLLEVBQUMsRUFBQyxFQUFDLEVBQUMsTUFBTSxFQUFDLG9CQUFvQixFQUFDLE1BQU0sRUFBQyxFQUFDLE1BQU0sRUFBQyxRQUFRLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxVQUFVLEVBQUMsS0FBSyxFQUFDLEVBQUMsQ0FBQyxFQUFDO0lBQ3ZkLEVBQUMsTUFBTSxFQUFDLFlBQVksRUFBQyxRQUFRLEVBQUMsVUFBVSxFQUFDLFFBQVEsRUFBQyxDQUFDLEVBQUMsTUFBTSxFQUFDLFFBQVEsRUFBQyxNQUFNLEVBQUMsRUFBQyxNQUFNLEVBQUMsUUFBUSxFQUFDLE1BQU0sRUFBQyxTQUFTLEVBQUMsVUFBVSxFQUFDLEtBQUssRUFBQyxFQUFDLEVBQUMsRUFBQyxNQUFNLEVBQUMsVUFBVSxFQUFDLE1BQU0sRUFBQyxFQUFDLE1BQU0sRUFBQyxRQUFRLEVBQUMsTUFBTSxFQUFDLFNBQVMsRUFBQyxVQUFVLEVBQUMsS0FBSyxFQUFDLEVBQUMsRUFBQyxFQUFDLE1BQU0sRUFBQyxRQUFRLEVBQUMsTUFBTSxFQUFDLEVBQUMsTUFBTSxFQUFDLFFBQVEsRUFBQyxNQUFNLEVBQUMsS0FBSyxFQUFDLFVBQVUsRUFBQyxLQUFLLEVBQUMsUUFBUSxFQUFDLEdBQUcsRUFBQyxFQUFDLEVBQUMsRUFBQyxNQUFNLEVBQUMsZ0JBQWdCLEVBQUMsTUFBTSxFQUFDLEVBQUMsTUFBTSxFQUFDLFFBQVEsRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLFVBQVUsRUFBQyxJQUFJLEVBQUMsRUFBQyxFQUFDLEVBQUMsTUFBTSxFQUFDLG9CQUFvQixFQUFDLE1BQU0sRUFBQyxFQUFDLE1BQU0sRUFBQyxRQUFRLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxVQUFVLEVBQUMsS0FBSyxFQUFDLFFBQVEsRUFBQyxPQUFPLEVBQUMsRUFBQyxFQUFDLEVBQUMsTUFBTSxFQUFDLGlCQUFpQixFQUFDLE1BQU0sRUFBQyxFQUFDLE1BQU0sRUFBQyxRQUFRLEVBQUMsTUFBTSxFQUFDLE9BQU8sRUFBQyxVQUFVLEVBQUMsS0FBSyxFQUFDLFFBQVEsRUFBQyxXQUFXLEVBQUMsRUFBQyxDQUFDLEVBQUM7SUFDdmtCLEVBQUMsTUFBTSxFQUFDLGdCQUFnQixFQUFDLFFBQVEsRUFBQyxTQUFTLEVBQUMsUUFBUSxFQUFDLENBQUMsRUFBQyxNQUFNLEVBQUMsVUFBVSxFQUFDLE1BQU0sRUFBQyxFQUFDLE1BQU0sRUFBQyxRQUFRLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxVQUFVLEVBQUMsS0FBSyxFQUFDLFFBQVEsRUFBQyxFQUFFLEVBQUMsRUFBQyxFQUFDLEVBQUMsTUFBTSxFQUFDLFFBQVEsRUFBQyxNQUFNLEVBQUMsRUFBQyxNQUFNLEVBQUMsUUFBUSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsVUFBVSxFQUFDLEtBQUssRUFBQyxRQUFRLEVBQUMsT0FBTyxFQUFDLEVBQUMsRUFBQyxFQUFDLE1BQU0sRUFBQyxhQUFhLEVBQUMsTUFBTSxFQUFDLEVBQUMsTUFBTSxFQUFDLFFBQVEsRUFBQyxNQUFNLEVBQUMsU0FBUyxFQUFDLFVBQVUsRUFBQyxLQUFLLEVBQUMsRUFBQyxFQUFDLEVBQUMsTUFBTSxFQUFDLHNCQUFzQixFQUFDLE1BQU0sRUFBQyxFQUFDLE1BQU0sRUFBQyxRQUFRLEVBQUMsTUFBTSxFQUFDLFNBQVMsRUFBQyxVQUFVLEVBQUMsS0FBSyxFQUFDLEVBQUMsRUFBQyxFQUFDLE1BQU0sRUFBQyxnQkFBZ0IsRUFBQyxNQUFNLEVBQUMsRUFBQyxNQUFNLEVBQUMsUUFBUSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsVUFBVSxFQUFDLElBQUksRUFBQyxFQUFDLEVBQUMsRUFBQyxNQUFNLEVBQUMsb0JBQW9CLEVBQUMsTUFBTSxFQUFDLEVBQUMsTUFBTSxFQUFDLFFBQVEsRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLFVBQVUsRUFBQyxLQUFLLEVBQUMsUUFBUSxFQUFDLE9BQU8sRUFBQyxFQUFDLEVBQUMsRUFBQyxNQUFNLEVBQUMsaUJBQWlCLEVBQUMsTUFBTSxFQUFDLEVBQUMsTUFBTSxFQUFDLFFBQVEsRUFBQyxNQUFNLEVBQUMsT0FBTyxFQUFDLFVBQVUsRUFBQyxLQUFLLEVBQUMsUUFBUSxFQUFDLFdBQVcsRUFBQyxFQUFDLENBQUMsRUFBQztJQUN4ckIsRUFBQyxNQUFNLEVBQUMsNEJBQTRCLEVBQUMsUUFBUSxFQUFDLFVBQVUsRUFBQyxRQUFRLEVBQUMsQ0FBQyxFQUFDLE1BQU0sRUFBQyxVQUFVLEVBQUMsTUFBTSxFQUFDLEVBQUMsTUFBTSxFQUFDLFFBQVEsRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLFVBQVUsRUFBQyxLQUFLLEVBQUMsUUFBUSxFQUFDLEVBQUUsRUFBQyxFQUFDLEVBQUMsRUFBQyxNQUFNLEVBQUMsUUFBUSxFQUFDLE1BQU0sRUFBQyxFQUFDLE1BQU0sRUFBQyxRQUFRLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxVQUFVLEVBQUMsS0FBSyxFQUFDLFFBQVEsRUFBQyxPQUFPLEVBQUMsRUFBQyxFQUFDLEVBQUMsTUFBTSxFQUFDLFFBQVEsRUFBQyxNQUFNLEVBQUMsRUFBQyxNQUFNLEVBQUMsUUFBUSxFQUFDLE1BQU0sRUFBQyxTQUFTLEVBQUMsVUFBVSxFQUFDLEtBQUssRUFBQyxFQUFDLEVBQUMsRUFBQyxNQUFNLEVBQUMsaUJBQWlCLEVBQUMsTUFBTSxFQUFDLEVBQUMsTUFBTSxFQUFDLFFBQVEsRUFBQyxNQUFNLEVBQUMsT0FBTyxFQUFDLFVBQVUsRUFBQyxLQUFLLEVBQUMsUUFBUSxFQUFDLFdBQVcsRUFBQyxFQUFDLENBQUMsRUFBQztJQUM3YSxFQUFDLE1BQU0sRUFBQyxZQUFZLEVBQUMsUUFBUSxFQUFDLFVBQVUsRUFBQyxRQUFRLEVBQUMsQ0FBQyxFQUFDLE1BQU0sRUFBQyxVQUFVLEVBQUMsTUFBTSxFQUFDLEVBQUMsTUFBTSxFQUFDLFFBQVEsRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLFVBQVUsRUFBQyxLQUFLLEVBQUMsUUFBUSxFQUFDLEVBQUUsRUFBQyxFQUFDLEVBQUMsRUFBQyxNQUFNLEVBQUMsUUFBUSxFQUFDLE1BQU0sRUFBQyxFQUFDLE1BQU0sRUFBQyxRQUFRLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxVQUFVLEVBQUMsS0FBSyxFQUFDLFFBQVEsRUFBQyxPQUFPLEVBQUMsRUFBQyxFQUFDLEVBQUMsTUFBTSxFQUFDLHNCQUFzQixFQUFDLE1BQU0sRUFBQyxFQUFDLE1BQU0sRUFBQyxRQUFRLEVBQUMsTUFBTSxFQUFDLFNBQVMsRUFBQyxVQUFVLEVBQUMsS0FBSyxFQUFDLEVBQUMsRUFBQyxFQUFDLE1BQU0sRUFBQyxnQkFBZ0IsRUFBQyxNQUFNLEVBQUMsRUFBQyxNQUFNLEVBQUMsUUFBUSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsVUFBVSxFQUFDLElBQUksRUFBQyxFQUFDLEVBQUMsRUFBQyxNQUFNLEVBQUMsb0JBQW9CLEVBQUMsTUFBTSxFQUFDLEVBQUMsTUFBTSxFQUFDLFFBQVEsRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLFVBQVUsRUFBQyxLQUFLLEVBQUMsUUFBUSxFQUFDLE9BQU8sRUFBQyxFQUFDLEVBQUMsRUFBQyxNQUFNLEVBQUMsaUJBQWlCLEVBQUMsTUFBTSxFQUFDLEVBQUMsTUFBTSxFQUFDLFFBQVEsRUFBQyxNQUFNLEVBQUMsT0FBTyxFQUFDLFVBQVUsRUFBQyxLQUFLLEVBQUMsUUFBUSxFQUFDLFdBQVcsRUFBQyxFQUFDLENBQUMsRUFBQztJQUNubUIsRUFBQyxNQUFNLEVBQUMsZ0JBQWdCLEVBQUMsUUFBUSxFQUFDLFVBQVUsRUFBQyxRQUFRLEVBQUMsQ0FBQyxFQUFDLE1BQU0sRUFBQyxVQUFVLEVBQUMsTUFBTSxFQUFDLEVBQUMsTUFBTSxFQUFDLFFBQVEsRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLFVBQVUsRUFBQyxLQUFLLEVBQUMsUUFBUSxFQUFDLEVBQUUsRUFBQyxFQUFDLENBQUMsRUFBQztJQUNoSixFQUFDLE1BQU0sRUFBQyx3QkFBd0IsRUFBQyxRQUFRLEVBQUMsU0FBUyxFQUFDLFFBQVEsRUFBQyxDQUFDLEVBQUMsTUFBTSxFQUFDLFVBQVUsRUFBQyxNQUFNLEVBQUMsRUFBQyxNQUFNLEVBQUMsUUFBUSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsVUFBVSxFQUFDLEtBQUssRUFBQyxRQUFRLEVBQUMsRUFBRSxFQUFDLEVBQUMsRUFBQyxFQUFDLE1BQU0sRUFBQyxRQUFRLEVBQUMsTUFBTSxFQUFDLEVBQUMsTUFBTSxFQUFDLFFBQVEsRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLFVBQVUsRUFBQyxLQUFLLEVBQUMsUUFBUSxFQUFDLE9BQU8sRUFBQyxFQUFDLEVBQUMsRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxFQUFDLE1BQU0sRUFBQyxRQUFRLEVBQUMsTUFBTSxFQUFDLFNBQVMsRUFBQyxVQUFVLEVBQUMsS0FBSyxFQUFDLEVBQUMsRUFBQyxFQUFDLE1BQU0sRUFBQyxrQkFBa0IsRUFBQyxNQUFNLEVBQUMsRUFBQyxNQUFNLEVBQUMsUUFBUSxFQUFDLE1BQU0sRUFBQyxTQUFTLEVBQUMsVUFBVSxFQUFDLEtBQUssRUFBQyxFQUFDLEVBQUMsRUFBQyxNQUFNLEVBQUMsb0JBQW9CLEVBQUMsTUFBTSxFQUFDLEVBQUMsTUFBTSxFQUFDLFFBQVEsRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLFVBQVUsRUFBQyxLQUFLLEVBQUMsUUFBUSxFQUFDLE9BQU8sRUFBQyxFQUFDLEVBQUMsRUFBQyxNQUFNLEVBQUMsaUJBQWlCLEVBQUMsTUFBTSxFQUFDLEVBQUMsTUFBTSxFQUFDLFFBQVEsRUFBQyxNQUFNLEVBQUMsT0FBTyxFQUFDLFVBQVUsRUFBQyxLQUFLLEVBQUMsUUFBUSxFQUFDLFdBQVcsRUFBQyxFQUFDLENBQUMsRUFBQztJQUNwbUIsRUFBQyxNQUFNLEVBQUMsd0JBQXdCLEVBQUMsUUFBUSxFQUFDLFVBQVUsRUFBQyxRQUFRLEVBQUMsQ0FBQyxFQUFDLE1BQU0sRUFBQyxVQUFVLEVBQUMsTUFBTSxFQUFDLEVBQUMsTUFBTSxFQUFDLFFBQVEsRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLFVBQVUsRUFBQyxLQUFLLEVBQUMsUUFBUSxFQUFDLEVBQUUsRUFBQyxFQUFDLEVBQUMsRUFBQyxNQUFNLEVBQUMsUUFBUSxFQUFDLE1BQU0sRUFBQyxFQUFDLE1BQU0sRUFBQyxRQUFRLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxVQUFVLEVBQUMsS0FBSyxFQUFDLFFBQVEsRUFBQyxPQUFPLEVBQUMsRUFBQyxFQUFDLEVBQUMsTUFBTSxFQUFDLFFBQVEsRUFBQyxNQUFNLEVBQUMsRUFBQyxNQUFNLEVBQUMsUUFBUSxFQUFDLE1BQU0sRUFBQyxTQUFTLEVBQUMsVUFBVSxFQUFDLEtBQUssRUFBQyxFQUFDLEVBQUMsRUFBQyxNQUFNLEVBQUMsc0JBQXNCLEVBQUMsTUFBTSxFQUFDLEVBQUMsTUFBTSxFQUFDLFFBQVEsRUFBQyxNQUFNLEVBQUMsU0FBUyxFQUFDLFVBQVUsRUFBQyxLQUFLLEVBQUMsRUFBQyxFQUFDLEVBQUMsTUFBTSxFQUFDLG9CQUFvQixFQUFDLE1BQU0sRUFBQyxFQUFDLE1BQU0sRUFBQyxRQUFRLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxVQUFVLEVBQUMsS0FBSyxFQUFDLFFBQVEsRUFBQyxPQUFPLEVBQUMsRUFBQyxFQUFDLEVBQUMsTUFBTSxFQUFDLGlCQUFpQixFQUFDLE1BQU0sRUFBQyxFQUFDLE1BQU0sRUFBQyxRQUFRLEVBQUMsTUFBTSxFQUFDLE9BQU8sRUFBQyxVQUFVLEVBQUMsS0FBSyxFQUFDLFFBQVEsRUFBQyxXQUFXLEVBQUMsRUFBQyxDQUFDLEVBQUM7SUFDM21CLEVBQUMsTUFBTSxFQUFDLFlBQVksRUFBQyxRQUFRLEVBQUMsSUFBSSxFQUFDLFFBQVEsRUFBQyxDQUFDLEVBQUMsTUFBTSxFQUFDLFNBQVMsRUFBQyxNQUFNLEVBQUMsRUFBQyxNQUFNLEVBQUMsUUFBUSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsVUFBVSxFQUFDLEtBQUssRUFBQyxRQUFRLEVBQUMsT0FBTyxFQUFDLEVBQUMsRUFBQyxFQUFDLE1BQU0sRUFBQyxPQUFPLEVBQUMsTUFBTSxFQUFDLEVBQUMsTUFBTSxFQUFDLFFBQVEsRUFBQyxNQUFNLEVBQUMsU0FBUyxFQUFDLFVBQVUsRUFBQyxLQUFLLEVBQUMsRUFBQyxFQUFDLEVBQUMsTUFBTSxFQUFDLFFBQVEsRUFBQyxNQUFNLEVBQUMsRUFBQyxNQUFNLEVBQUMsUUFBUSxFQUFDLE1BQU0sRUFBQyxTQUFTLEVBQUMsVUFBVSxFQUFDLEtBQUssRUFBQyxFQUFDLEVBQUMsRUFBQyxNQUFNLEVBQUMsb0JBQW9CLEVBQUMsTUFBTSxFQUFDLEVBQUMsTUFBTSxFQUFDLFFBQVEsRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLFVBQVUsRUFBQyxLQUFLLEVBQUMsRUFBQyxDQUFDLEVBQUM7SUFDelgsRUFBQyxNQUFNLEVBQUMsV0FBVyxFQUFDLFFBQVEsRUFBQyxTQUFTLEVBQUMsUUFBUSxFQUFDLENBQUMsRUFBQyxNQUFNLEVBQUMsSUFBSSxFQUFDLE1BQU0sRUFBQyxFQUFDLE1BQU0sRUFBQyxRQUFRLEVBQUMsTUFBTSxFQUFDLFNBQVMsRUFBQyxVQUFVLEVBQUMsS0FBSyxFQUFDLEVBQUMsRUFBQyxFQUFDLE1BQU0sRUFBQyxTQUFTLEVBQUMsTUFBTSxFQUFDLEVBQUMsTUFBTSxFQUFDLFFBQVEsRUFBQyxNQUFNLEVBQUMsS0FBSyxFQUFDLFVBQVUsRUFBQyxLQUFLLEVBQUMsUUFBUSxFQUFDLEdBQUcsRUFBQyxFQUFDLENBQUMsRUFBQztJQUNsTixFQUFDLE1BQU0sRUFBQyxZQUFZLEVBQUMsUUFBUSxFQUFDLFVBQVUsRUFBQyxRQUFRLEVBQUMsQ0FBQyxFQUFDLE1BQU0sRUFBQyxJQUFJLEVBQUMsTUFBTSxFQUFDLEVBQUMsTUFBTSxFQUFDLFFBQVEsRUFBQyxNQUFNLEVBQUMsU0FBUyxFQUFDLFVBQVUsRUFBQyxLQUFLLEVBQUMsRUFBQyxFQUFDLEVBQUMsTUFBTSxFQUFDLFNBQVMsRUFBQyxNQUFNLEVBQUMsRUFBQyxNQUFNLEVBQUMsUUFBUSxFQUFDLE1BQU0sRUFBQyxLQUFLLEVBQUMsVUFBVSxFQUFDLEtBQUssRUFBQyxRQUFRLEVBQUMsR0FBRyxFQUFDLEVBQUMsQ0FBQyxFQUFDO0lBQ3BOLEVBQUMsTUFBTSxFQUFDLGNBQWMsRUFBQyxRQUFRLEVBQUMsU0FBUyxFQUFDLFFBQVEsRUFBQyxDQUFDLEVBQUMsTUFBTSxFQUFDLFNBQVMsRUFBQyxNQUFNLEVBQUMsRUFBQyxNQUFNLEVBQUMsUUFBUSxFQUFDLE1BQU0sRUFBQyxLQUFLLEVBQUMsVUFBVSxFQUFDLEtBQUssRUFBQyxRQUFRLEVBQUMsR0FBRyxFQUFDLEVBQUMsRUFBQyxFQUFDLE1BQU0sRUFBQyxTQUFTLEVBQUMsTUFBTSxFQUFDLEVBQUMsTUFBTSxFQUFDLFFBQVEsRUFBQyxNQUFNLEVBQUMsU0FBUyxFQUFDLFVBQVUsRUFBQyxLQUFLLEVBQUMsRUFBQyxDQUFDLEVBQUM7SUFDMU4sRUFBQyxNQUFNLEVBQUMsaUJBQWlCLEVBQUMsUUFBUSxFQUFDLFNBQVMsRUFBQyxRQUFRLEVBQUMsQ0FBQyxFQUFDLE1BQU0sRUFBQyxTQUFTLEVBQUMsTUFBTSxFQUFDLEVBQUMsTUFBTSxFQUFDLFFBQVEsRUFBQyxNQUFNLEVBQUMsS0FBSyxFQUFDLFVBQVUsRUFBQyxLQUFLLEVBQUMsUUFBUSxFQUFDLEdBQUcsRUFBQyxFQUFDLEVBQUMsRUFBQyxNQUFNLEVBQUMsWUFBWSxFQUFDLE1BQU0sRUFBQyxFQUFDLE1BQU0sRUFBQyxRQUFRLEVBQUMsTUFBTSxFQUFDLEtBQUssRUFBQyxVQUFVLEVBQUMsS0FBSyxFQUFDLFFBQVEsRUFBQyxHQUFHLEVBQUMsRUFBQyxDQUFDLEVBQUM7SUFDek8sRUFBQyxNQUFNLEVBQUMsVUFBVSxFQUFDLFFBQVEsRUFBQyxJQUFJLEVBQUMsUUFBUSxFQUFDLENBQUMsRUFBQyxNQUFNLEVBQUMsT0FBTyxFQUFDLE1BQU0sRUFBQyxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsS0FBSyxFQUFDLFNBQVMsRUFBQyxPQUFPLEVBQUMsTUFBTSxFQUFDLEVBQUMsRUFBQyxFQUFDLE1BQU0sRUFBQyxZQUFZLEVBQUMsTUFBTSxFQUFDLEVBQUMsTUFBTSxFQUFDLFFBQVEsRUFBQyxNQUFNLEVBQUMsS0FBSyxFQUFDLFVBQVUsRUFBQyxLQUFLLEVBQUMsUUFBUSxFQUFDLEdBQUcsRUFBQyxFQUFDLENBQUMsRUFBQztJQUM3TSxFQUFDLE1BQU0sRUFBQyxVQUFVLEVBQUMsUUFBUSxFQUFDLFVBQVUsRUFBQyxRQUFRLEVBQUMsQ0FBQyxFQUFDLE1BQU0sRUFBQyxTQUFTLEVBQUMsTUFBTSxFQUFDLEVBQUMsTUFBTSxFQUFDLFFBQVEsRUFBQyxNQUFNLEVBQUMsS0FBSyxFQUFDLFVBQVUsRUFBQyxLQUFLLEVBQUMsUUFBUSxFQUFDLEdBQUcsRUFBQyxFQUFDLEVBQUMsRUFBQyxNQUFNLEVBQUMsU0FBUyxFQUFDLE1BQU0sRUFBQyxFQUFDLE1BQU0sRUFBQyxRQUFRLEVBQUMsTUFBTSxFQUFDLFNBQVMsRUFBQyxVQUFVLEVBQUMsS0FBSyxFQUFDLEVBQUMsQ0FBQyxFQUFDO0lBQ3ZOLEVBQUMsTUFBTSxFQUFDLGVBQWUsRUFBQyxRQUFRLEVBQUMsU0FBUyxFQUFDLFFBQVEsRUFBQyxDQUFDLEVBQUMsTUFBTSxFQUFDLElBQUksRUFBQyxNQUFNLEVBQUMsRUFBQyxNQUFNLEVBQUMsUUFBUSxFQUFDLE1BQU0sRUFBQyxTQUFTLEVBQUMsVUFBVSxFQUFDLEtBQUssRUFBQyxFQUFDLEVBQUMsRUFBQyxNQUFNLEVBQUMsUUFBUSxFQUFDLE1BQU0sRUFBQyxFQUFDLE1BQU0sRUFBQyxRQUFRLEVBQUMsTUFBTSxFQUFDLEtBQUssRUFBQyxVQUFVLEVBQUMsS0FBSyxFQUFDLFFBQVEsRUFBQyxHQUFHLEVBQUMsRUFBQyxDQUFDLEVBQUM7SUFDck4sRUFBQyxNQUFNLEVBQUMsa0JBQWtCLEVBQUMsUUFBUSxFQUFDLFNBQVMsRUFBQyxRQUFRLEVBQUMsQ0FBQyxFQUFDLE1BQU0sRUFBQyxjQUFjLEVBQUMsTUFBTSxFQUFDLEVBQUMsTUFBTSxFQUFDLFFBQVEsRUFBQyxNQUFNLEVBQUMsU0FBUyxFQUFDLFVBQVUsRUFBQyxLQUFLLEVBQUMsRUFBQyxDQUFDLEVBQUM7SUFDNUksRUFBQyxNQUFNLEVBQUMsYUFBYSxFQUFDLFFBQVEsRUFBQyxJQUFJLEVBQUMsUUFBUSxFQUFDLENBQUMsRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxFQUFDLE1BQU0sRUFBQyxRQUFRLEVBQUMsTUFBTSxFQUFDLEtBQUssRUFBQyxVQUFVLEVBQUMsS0FBSyxFQUFDLFFBQVEsRUFBQyxHQUFHLEVBQUMsRUFBQyxDQUFDLEVBQUM7SUFDbkksRUFBQyxNQUFNLEVBQUMsVUFBVSxFQUFDLFFBQVEsRUFBQyxJQUFJLEVBQUMsUUFBUSxFQUFDLENBQUMsRUFBQyxNQUFNLEVBQUMsdUJBQXVCLEVBQUMsTUFBTSxFQUFDLEVBQUMsTUFBTSxFQUFDLFFBQVEsRUFBQyxNQUFNLEVBQUMsS0FBSyxFQUFDLFVBQVUsRUFBQyxLQUFLLEVBQUMsUUFBUSxFQUFDLEdBQUcsRUFBQyxFQUFDLEVBQUMsRUFBQyxNQUFNLEVBQUMsU0FBUyxFQUFDLE1BQU0sRUFBQyxFQUFDLE1BQU0sRUFBQyxRQUFRLEVBQUMsTUFBTSxFQUFDLEtBQUssRUFBQyxVQUFVLEVBQUMsS0FBSyxFQUFDLFFBQVEsRUFBQyxHQUFHLEVBQUMsRUFBQyxDQUFDLEVBQUM7SUFDeE8sRUFBQyxNQUFNLEVBQUMsYUFBYSxFQUFDLFFBQVEsRUFBQyxJQUFJLEVBQUMsUUFBUSxFQUFDLENBQUMsRUFBQyxNQUFNLEVBQUMsa0JBQWtCLEVBQUMsTUFBTSxFQUFDLEVBQUMsTUFBTSxFQUFDLFFBQVEsRUFBQyxNQUFNLEVBQUMsS0FBSyxFQUFDLFVBQVUsRUFBQyxLQUFLLEVBQUMsUUFBUSxFQUFDLEdBQUcsRUFBQyxFQUFDLEVBQUMsRUFBQyxNQUFNLEVBQUMsa0JBQWtCLEVBQUMsTUFBTSxFQUFDLEVBQUMsTUFBTSxFQUFDLFFBQVEsRUFBQyxNQUFNLEVBQUMsS0FBSyxFQUFDLFVBQVUsRUFBQyxLQUFLLEVBQUMsUUFBUSxFQUFDLEdBQUcsRUFBQyxFQUFDLENBQUMsRUFBQztJQUMvTyxFQUFDLE1BQU0sRUFBQyxlQUFlLEVBQUMsUUFBUSxFQUFDLFNBQVMsRUFBQyxRQUFRLEVBQUMsQ0FBQyxFQUFDLE1BQU0sRUFBQyxVQUFVLEVBQUMsTUFBTSxFQUFDLEVBQUMsTUFBTSxFQUFDLFFBQVEsRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLFVBQVUsRUFBQyxLQUFLLEVBQUMsUUFBUSxFQUFDLEVBQUUsRUFBQyxFQUFDLEVBQUMsRUFBQyxNQUFNLEVBQUMsUUFBUSxFQUFDLE1BQU0sRUFBQyxFQUFDLE1BQU0sRUFBQyxRQUFRLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxVQUFVLEVBQUMsS0FBSyxFQUFDLFFBQVEsRUFBQyxPQUFPLEVBQUMsRUFBQyxFQUFDLEVBQUMsTUFBTSxFQUFDLFFBQVEsRUFBQyxNQUFNLEVBQUMsRUFBQyxNQUFNLEVBQUMsUUFBUSxFQUFDLE1BQU0sRUFBQyxTQUFTLEVBQUMsVUFBVSxFQUFDLEtBQUssRUFBQyxFQUFDLEVBQUMsRUFBQyxNQUFNLEVBQUMsc0JBQXNCLEVBQUMsTUFBTSxFQUFDLEVBQUMsTUFBTSxFQUFDLFFBQVEsRUFBQyxNQUFNLEVBQUMsU0FBUyxFQUFDLFVBQVUsRUFBQyxJQUFJLEVBQUMsRUFBQyxFQUFDLEVBQUMsTUFBTSxFQUFDLGdCQUFnQixFQUFDLE1BQU0sRUFBQyxFQUFDLE1BQU0sRUFBQyxRQUFRLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxVQUFVLEVBQUMsSUFBSSxFQUFDLEVBQUMsRUFBQyxFQUFDLE1BQU0sRUFBQyxvQkFBb0IsRUFBQyxNQUFNLEVBQUMsRUFBQyxNQUFNLEVBQUMsUUFBUSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsVUFBVSxFQUFDLEtBQUssRUFBQyxRQUFRLEVBQUMsT0FBTyxFQUFDLEVBQUMsRUFBQyxFQUFDLE1BQU0sRUFBQyxpQkFBaUIsRUFBQyxNQUFNLEVBQUMsRUFBQyxNQUFNLEVBQUMsUUFBUSxFQUFDLE1BQU0sRUFBQyxPQUFPLEVBQUMsVUFBVSxFQUFDLEtBQUssRUFBQyxRQUFRLEVBQUMsV0FBVyxFQUFDLEVBQUMsQ0FBQyxFQUFDO0lBQ2pyQixFQUFDLE1BQU0sRUFBQyxlQUFlLEVBQUMsUUFBUSxFQUFDLFVBQVUsRUFBQyxRQUFRLEVBQUMsQ0FBQyxFQUFDLE1BQU0sRUFBQyxpQkFBaUIsRUFBQyxNQUFNLEVBQUMsRUFBQyxNQUFNLEVBQUMsUUFBUSxFQUFDLE1BQU0sRUFBQyxLQUFLLEVBQUMsVUFBVSxFQUFDLEtBQUssRUFBQyxRQUFRLEVBQUMsR0FBRyxFQUFDLEVBQUMsQ0FBQyxFQUFDO0lBQ3RKLEVBQUMsTUFBTSxFQUFDLHFCQUFxQixFQUFDLFFBQVEsRUFBQyxVQUFVLEVBQUMsUUFBUSxFQUFDLENBQUMsRUFBQyxNQUFNLEVBQUMsZUFBZSxFQUFDLE1BQU0sRUFBQyxFQUFDLE1BQU0sRUFBQyxRQUFRLEVBQUMsTUFBTSxFQUFDLEtBQUssRUFBQyxVQUFVLEVBQUMsS0FBSyxFQUFDLFFBQVEsRUFBQyxHQUFHLEVBQUMsRUFBQyxFQUFDLEVBQUMsTUFBTSxFQUFDLE9BQU8sRUFBQyxNQUFNLEVBQUMsRUFBQyxNQUFNLEVBQUMsUUFBUSxFQUFDLE1BQU0sRUFBQyxTQUFTLEVBQUMsVUFBVSxFQUFDLEtBQUssRUFBQyxFQUFDLEVBQUMsRUFBQyxNQUFNLEVBQUMsU0FBUyxFQUFDLE1BQU0sRUFBQyxFQUFDLE1BQU0sRUFBQyxRQUFRLEVBQUMsTUFBTSxFQUFDLEtBQUssRUFBQyxVQUFVLEVBQUMsS0FBSyxFQUFDLFFBQVEsRUFBQyxHQUFHLEVBQUMsRUFBQyxDQUFDLEVBQUM7SUFDN1QsRUFBQyxNQUFNLEVBQUMsUUFBUSxFQUFDLFFBQVEsRUFBQyxTQUFTLEVBQUMsUUFBUSxFQUFDLENBQUMsRUFBQyxNQUFNLEVBQUMsUUFBUSxFQUFDLE1BQU0sRUFBQyxFQUFDLE1BQU0sRUFBQyxRQUFRLEVBQUMsTUFBTSxFQUFDLEtBQUssRUFBQyxVQUFVLEVBQUMsS0FBSyxFQUFDLFFBQVEsRUFBQyxHQUFHLEVBQUMsRUFBQyxFQUFDLEVBQUMsTUFBTSxFQUFDLFFBQVEsRUFBQyxNQUFNLEVBQUMsRUFBQyxNQUFNLEVBQUMsUUFBUSxFQUFDLE1BQU0sRUFBQyxTQUFTLEVBQUMsVUFBVSxFQUFDLEtBQUssRUFBQyxFQUFDLENBQUMsRUFBQztJQUNsTixFQUFDLE1BQU0sRUFBQyxZQUFZLEVBQUMsUUFBUSxFQUFDLFVBQVUsRUFBQyxRQUFRLEVBQUMsQ0FBQyxFQUFDLE1BQU0sRUFBQyxRQUFRLEVBQUMsTUFBTSxFQUFDLEVBQUMsTUFBTSxFQUFDLFFBQVEsRUFBQyxNQUFNLEVBQUMsS0FBSyxFQUFDLFVBQVUsRUFBQyxLQUFLLEVBQUMsUUFBUSxFQUFDLEdBQUcsRUFBQyxFQUFDLEVBQUMsRUFBQyxNQUFNLEVBQUMsSUFBSSxFQUFDLE1BQU0sRUFBQyxFQUFDLE1BQU0sRUFBQyxRQUFRLEVBQUMsTUFBTSxFQUFDLFNBQVMsRUFBQyxVQUFVLEVBQUMsS0FBSyxFQUFDLEVBQUMsQ0FBQyxFQUFDO0lBQ25OLEVBQUMsTUFBTSxFQUFDLFdBQVcsRUFBQyxRQUFRLEVBQUMsVUFBVSxFQUFDLFFBQVEsRUFBQyxDQUFDLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsRUFBQyxNQUFNLEVBQUMsUUFBUSxFQUFDLE1BQU0sRUFBQyxTQUFTLEVBQUMsVUFBVSxFQUFDLEtBQUssRUFBQyxFQUFDLEVBQUMsRUFBQyxNQUFNLEVBQUMsUUFBUSxFQUFDLE1BQU0sRUFBQyxFQUFDLE1BQU0sRUFBQyxRQUFRLEVBQUMsTUFBTSxFQUFDLEtBQUssRUFBQyxVQUFVLEVBQUMsS0FBSyxFQUFDLFFBQVEsRUFBQyxHQUFHLEVBQUMsRUFBQyxDQUFDLEVBQUM7SUFDcE4sRUFBQyxNQUFNLEVBQUMsYUFBYSxFQUFDLFFBQVEsRUFBQyxVQUFVLEVBQUMsUUFBUSxFQUFDLENBQUMsRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxFQUFDLE1BQU0sRUFBQyxRQUFRLEVBQUMsTUFBTSxFQUFDLFNBQVMsRUFBQyxVQUFVLEVBQUMsS0FBSyxFQUFDLEVBQUMsRUFBQyxFQUFDLE1BQU0sRUFBQyxRQUFRLEVBQUMsTUFBTSxFQUFDLEVBQUMsTUFBTSxFQUFDLFFBQVEsRUFBQyxNQUFNLEVBQUMsS0FBSyxFQUFDLFVBQVUsRUFBQyxLQUFLLEVBQUMsUUFBUSxFQUFDLEdBQUcsRUFBQyxFQUFDLENBQUMsRUFBQztDQUN6TixDQUFBO0FBRUQsTUFBTSxxQkFBcUIsR0FBZ0I7SUFDdkMsRUFBQyxNQUFNLEVB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