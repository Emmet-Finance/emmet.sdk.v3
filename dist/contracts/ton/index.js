"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadReceivedInstallment = exports.storeReceivedInstallment = exports.loadSentInstallment = exports.storeSentInstallment = exports.loadTokenType = exports.storeTokenType = exports.loadRoleData = exports.storeRoleData = exports.loadUpdateRoleAdmin = exports.storeUpdateRoleAdmin = exports.loadRenounceRole = exports.storeRenounceRole = exports.loadRevokeRole = exports.storeRevokeRole = exports.loadGrantRole = exports.storeGrantRole = exports.loadUpdateOwner = exports.storeUpdateOwner = exports.loadUpdateAdmin = exports.storeUpdateAdmin = exports.loadJettonMint = exports.storeJettonMint = exports.loadJettonData = exports.storeJettonData = exports.loadWalletData = exports.storeWalletData = exports.loadJettonBurnNotification = exports.storeJettonBurnNotification = exports.loadJettonInternalTransfer = exports.storeJettonInternalTransfer = exports.loadJettonExcesses = exports.storeJettonExcesses = exports.loadJettonBurn = exports.storeJettonBurn = exports.loadJettonTransferNotification = exports.storeJettonTransferNotification = exports.loadJettonTransfer = exports.storeJettonTransfer = exports.loadFactoryDeploy = exports.storeFactoryDeploy = exports.loadDeployOk = exports.storeDeployOk = exports.loadDeploy = exports.storeDeploy = exports.loadSendParameters = exports.storeSendParameters = exports.loadContext = exports.storeContext = exports.loadStateInit = exports.storeStateInit = void 0;
exports.loadSetIncomingStrategy = exports.storeSetIncomingStrategy = exports.loadRemoveValidator = exports.storeRemoveValidator = exports.loadAddValidator = exports.storeAddValidator = exports.loadUpdateProtocolFee = exports.storeUpdateProtocolFee = exports.loadFromTokenToTargetTokenToCrossChainStrategy = exports.storeFromTokenToTargetTokenToCrossChainStrategy = exports.loadTargetTokenToCrossChainStrategy = exports.storeTargetTokenToCrossChainStrategy = exports.loadCrossChainStrategy = exports.storeCrossChainStrategy = exports.loadSteps = exports.storeSteps = exports.loadTargetTokenToSteps = exports.storeTargetTokenToSteps = exports.loadCrossChainTokenStrategy = exports.storeCrossChainTokenStrategy = exports.loadToTokenCrossChainStrategy = exports.storeToTokenCrossChainStrategy = exports.loadStrategies = exports.storeStrategies = exports.loadRemoveMappedContract = exports.storeRemoveMappedContract = exports.loadUpdateTransferFee = exports.storeUpdateTransferFee = exports.loadUpdateBaseUri = exports.storeUpdateBaseUri = exports.loadToken = exports.storeToken = exports.loadInstallmentOut = exports.storeInstallmentOut = exports.loadIncomingTransaction = exports.storeIncomingTransaction = exports.loadOutgoingTransaction = exports.storeOutgoingTransaction = exports.loadSetChainFee = exports.storeSetChainFee = exports.loadMapContract = exports.storeMapContract = exports.loadFreezeTon = exports.storeFreezeTon = exports.loadReceiveInstallment = exports.storeReceiveInstallment = exports.loadSignerAndSignature = exports.storeSignerAndSignature = exports.loadInstallment = exports.storeInstallment = void 0;
exports.Bridge = exports.loadRemoveCrossChainStrategy = exports.storeRemoveCrossChainStrategy = exports.loadRemoveInternalStrategy = exports.storeRemoveInternalStrategy = exports.loadSetCrossChainStrategy = exports.storeSetCrossChainStrategy = void 0;
//@ts-nocheck
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
        serialize: (src, buidler) => {
            buidler.storeRef((0, core_1.beginCell)().store(storeStateInit(src)).endCell());
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
        serialize: (src, buidler) => {
            buidler.storeRef((0, core_1.beginCell)().store(storeContext(src)).endCell());
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
        serialize: (src, buidler) => {
            buidler.storeRef((0, core_1.beginCell)().store(storeSendParameters(src)).endCell());
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
        serialize: (src, buidler) => {
            buidler.storeRef((0, core_1.beginCell)().store(storeDeploy(src)).endCell());
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
        serialize: (src, buidler) => {
            buidler.storeRef((0, core_1.beginCell)().store(storeDeployOk(src)).endCell());
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
        serialize: (src, buidler) => {
            buidler.storeRef((0, core_1.beginCell)().store(storeFactoryDeploy(src)).endCell());
        },
        parse: (src) => {
            return loadFactoryDeploy(src.loadRef().beginParse());
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
        serialize: (src, buidler) => {
            buidler.storeRef((0, core_1.beginCell)().store(storeJettonTransfer(src)).endCell());
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
        serialize: (src, buidler) => {
            buidler.storeRef((0, core_1.beginCell)().store(storeJettonTransferNotification(src)).endCell());
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
        serialize: (src, buidler) => {
            buidler.storeRef((0, core_1.beginCell)().store(storeJettonBurn(src)).endCell());
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
        serialize: (src, buidler) => {
            buidler.storeRef((0, core_1.beginCell)().store(storeJettonExcesses(src)).endCell());
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
        serialize: (src, buidler) => {
            buidler.storeRef((0, core_1.beginCell)().store(storeJettonInternalTransfer(src)).endCell());
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
        serialize: (src, buidler) => {
            buidler.storeRef((0, core_1.beginCell)().store(storeJettonBurnNotification(src)).endCell());
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
        serialize: (src, buidler) => {
            buidler.storeRef((0, core_1.beginCell)().store(storeWalletData(src)).endCell());
        },
        parse: (src) => {
            return loadWalletData(src.loadRef().beginParse());
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
        serialize: (src, buidler) => {
            buidler.storeRef((0, core_1.beginCell)().store(storeJettonData(src)).endCell());
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
        serialize: (src, buidler) => {
            buidler.storeRef((0, core_1.beginCell)().store(storeJettonMint(src)).endCell());
        },
        parse: (src) => {
            return loadJettonMint(src.loadRef().beginParse());
        }
    };
}
function storeUpdateAdmin(src) {
    return (builder) => {
        let b_0 = builder;
        b_0.storeUint(367316568, 32);
        b_0.storeAddress(src.new_admin);
    };
}
exports.storeUpdateAdmin = storeUpdateAdmin;
function loadUpdateAdmin(slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 367316568) {
        throw Error('Invalid prefix');
    }
    let _new_admin = sc_0.loadAddress();
    return { $$type: 'UpdateAdmin', new_admin: _new_admin };
}
exports.loadUpdateAdmin = loadUpdateAdmin;
function loadTupleUpdateAdmin(source) {
    let _new_admin = source.readAddress();
    return { $$type: 'UpdateAdmin', new_admin: _new_admin };
}
function storeTupleUpdateAdmin(source) {
    let builder = new core_1.TupleBuilder();
    builder.writeAddress(source.new_admin);
    return builder.build();
}
function dictValueParserUpdateAdmin() {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef((0, core_1.beginCell)().store(storeUpdateAdmin(src)).endCell());
        },
        parse: (src) => {
            return loadUpdateAdmin(src.loadRef().beginParse());
        }
    };
}
function storeUpdateOwner(src) {
    return (builder) => {
        let b_0 = builder;
        b_0.storeUint(559076492, 32);
        b_0.storeAddress(src.new_owner);
    };
}
exports.storeUpdateOwner = storeUpdateOwner;
function loadUpdateOwner(slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 559076492) {
        throw Error('Invalid prefix');
    }
    let _new_owner = sc_0.loadAddress();
    return { $$type: 'UpdateOwner', new_owner: _new_owner };
}
exports.loadUpdateOwner = loadUpdateOwner;
function loadTupleUpdateOwner(source) {
    let _new_owner = source.readAddress();
    return { $$type: 'UpdateOwner', new_owner: _new_owner };
}
function storeTupleUpdateOwner(source) {
    let builder = new core_1.TupleBuilder();
    builder.writeAddress(source.new_owner);
    return builder.build();
}
function dictValueParserUpdateOwner() {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef((0, core_1.beginCell)().store(storeUpdateOwner(src)).endCell());
        },
        parse: (src) => {
            return loadUpdateOwner(src.loadRef().beginParse());
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
        serialize: (src, buidler) => {
            buidler.storeRef((0, core_1.beginCell)().store(storeGrantRole(src)).endCell());
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
        serialize: (src, buidler) => {
            buidler.storeRef((0, core_1.beginCell)().store(storeRevokeRole(src)).endCell());
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
        serialize: (src, buidler) => {
            buidler.storeRef((0, core_1.beginCell)().store(storeRenounceRole(src)).endCell());
        },
        parse: (src) => {
            return loadRenounceRole(src.loadRef().beginParse());
        }
    };
}
function storeUpdateRoleAdmin(src) {
    return (builder) => {
        let b_0 = builder;
        b_0.storeUint(4130082033, 32);
        b_0.storeInt(src.role_id, 257);
        b_0.storeAddress(src.new_admin);
    };
}
exports.storeUpdateRoleAdmin = storeUpdateRoleAdmin;
function loadUpdateRoleAdmin(slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 4130082033) {
        throw Error('Invalid prefix');
    }
    let _role_id = sc_0.loadIntBig(257);
    let _new_admin = sc_0.loadAddress();
    return { $$type: 'UpdateRoleAdmin', role_id: _role_id, new_admin: _new_admin };
}
exports.loadUpdateRoleAdmin = loadUpdateRoleAdmin;
function loadTupleUpdateRoleAdmin(source) {
    let _role_id = source.readBigNumber();
    let _new_admin = source.readAddress();
    return { $$type: 'UpdateRoleAdmin', role_id: _role_id, new_admin: _new_admin };
}
function storeTupleUpdateRoleAdmin(source) {
    let builder = new core_1.TupleBuilder();
    builder.writeNumber(source.role_id);
    builder.writeAddress(source.new_admin);
    return builder.build();
}
function dictValueParserUpdateRoleAdmin() {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef((0, core_1.beginCell)().store(storeUpdateRoleAdmin(src)).endCell());
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
        b_0.storeAddress(src.admin_role);
    };
}
exports.storeRoleData = storeRoleData;
function loadRoleData(slice) {
    let sc_0 = slice;
    let _roles = core_1.Dictionary.load(core_1.Dictionary.Keys.Address(), core_1.Dictionary.Values.Bool(), sc_0);
    let _admin_role = sc_0.loadAddress();
    return { $$type: 'RoleData', roles: _roles, admin_role: _admin_role };
}
exports.loadRoleData = loadRoleData;
function loadTupleRoleData(source) {
    let _roles = core_1.Dictionary.loadDirect(core_1.Dictionary.Keys.Address(), core_1.Dictionary.Values.Bool(), source.readCellOpt());
    let _admin_role = source.readAddress();
    return { $$type: 'RoleData', roles: _roles, admin_role: _admin_role };
}
function storeTupleRoleData(source) {
    let builder = new core_1.TupleBuilder();
    builder.writeCell(source.roles.size > 0 ? (0, core_1.beginCell)().storeDictDirect(source.roles, core_1.Dictionary.Keys.Address(), core_1.Dictionary.Values.Bool()).endCell() : null);
    builder.writeAddress(source.admin_role);
    return builder.build();
}
function dictValueParserRoleData() {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef((0, core_1.beginCell)().store(storeRoleData(src)).endCell());
        },
        parse: (src) => {
            return loadRoleData(src.loadRef().beginParse());
        }
    };
}
function storeTokenType(src) {
    return (builder) => {
        let b_0 = builder;
        b_0.storeBit(src.is_native_coin);
        b_0.storeBit(src.is_native_token);
        b_0.storeBit(src.is_wrapped_token);
    };
}
exports.storeTokenType = storeTokenType;
function loadTokenType(slice) {
    let sc_0 = slice;
    let _is_native_coin = sc_0.loadBit();
    let _is_native_token = sc_0.loadBit();
    let _is_wrapped_token = sc_0.loadBit();
    return { $$type: 'TokenType', is_native_coin: _is_native_coin, is_native_token: _is_native_token, is_wrapped_token: _is_wrapped_token };
}
exports.loadTokenType = loadTokenType;
function loadTupleTokenType(source) {
    let _is_native_coin = source.readBoolean();
    let _is_native_token = source.readBoolean();
    let _is_wrapped_token = source.readBoolean();
    return { $$type: 'TokenType', is_native_coin: _is_native_coin, is_native_token: _is_native_token, is_wrapped_token: _is_wrapped_token };
}
function storeTupleTokenType(source) {
    let builder = new core_1.TupleBuilder();
    builder.writeBoolean(source.is_native_coin);
    builder.writeBoolean(source.is_native_token);
    builder.writeBoolean(source.is_wrapped_token);
    return builder.build();
}
function dictValueParserTokenType() {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef((0, core_1.beginCell)().store(storeTokenType(src)).endCell());
        },
        parse: (src) => {
            return loadTokenType(src.loadRef().beginParse());
        }
    };
}
function storeSentInstallment(src) {
    return (builder) => {
        let b_0 = builder;
        b_0.storeUint(1717832165, 32);
        b_0.storeInt(src.tx_hash, 257);
    };
}
exports.storeSentInstallment = storeSentInstallment;
function loadSentInstallment(slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1717832165) {
        throw Error('Invalid prefix');
    }
    let _tx_hash = sc_0.loadIntBig(257);
    return { $$type: 'SentInstallment', tx_hash: _tx_hash };
}
exports.loadSentInstallment = loadSentInstallment;
function loadTupleSentInstallment(source) {
    let _tx_hash = source.readBigNumber();
    return { $$type: 'SentInstallment', tx_hash: _tx_hash };
}
function storeTupleSentInstallment(source) {
    let builder = new core_1.TupleBuilder();
    builder.writeNumber(source.tx_hash);
    return builder.build();
}
function dictValueParserSentInstallment() {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef((0, core_1.beginCell)().store(storeSentInstallment(src)).endCell());
        },
        parse: (src) => {
            return loadSentInstallment(src.loadRef().beginParse());
        }
    };
}
function storeReceivedInstallment(src) {
    return (builder) => {
        let b_0 = builder;
        b_0.storeUint(3112556170, 32);
        b_0.storeInt(src.tx_hash, 257);
    };
}
exports.storeReceivedInstallment = storeReceivedInstallment;
function loadReceivedInstallment(slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 3112556170) {
        throw Error('Invalid prefix');
    }
    let _tx_hash = sc_0.loadIntBig(257);
    return { $$type: 'ReceivedInstallment', tx_hash: _tx_hash };
}
exports.loadReceivedInstallment = loadReceivedInstallment;
function loadTupleReceivedInstallment(source) {
    let _tx_hash = source.readBigNumber();
    return { $$type: 'ReceivedInstallment', tx_hash: _tx_hash };
}
function storeTupleReceivedInstallment(source) {
    let builder = new core_1.TupleBuilder();
    builder.writeNumber(source.tx_hash);
    return builder.build();
}
function dictValueParserReceivedInstallment() {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef((0, core_1.beginCell)().store(storeReceivedInstallment(src)).endCell());
        },
        parse: (src) => {
            return loadReceivedInstallment(src.loadRef().beginParse());
        }
    };
}
function storeInstallment(src) {
    return (builder) => {
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
exports.storeInstallment = storeInstallment;
function loadInstallment(slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 4185229730) {
        throw Error('Invalid prefix');
    }
    let _from_chain = sc_0.loadUintBig(64);
    let _target_chain = sc_0.loadUintBig(64);
    let _amount = sc_0.loadCoins();
    let _from_token = sc_0.loadRef();
    let _to_token = sc_0.loadRef();
    let _recepient = sc_0.loadAddress();
    return { $$type: 'Installment', from_chain: _from_chain, target_chain: _target_chain, amount: _amount, from_token: _from_token, to_token: _to_token, recepient: _recepient };
}
exports.loadInstallment = loadInstallment;
function loadTupleInstallment(source) {
    let _from_chain = source.readBigNumber();
    let _target_chain = source.readBigNumber();
    let _amount = source.readBigNumber();
    let _from_token = source.readCell();
    let _to_token = source.readCell();
    let _recepient = source.readAddress();
    return { $$type: 'Installment', from_chain: _from_chain, target_chain: _target_chain, amount: _amount, from_token: _from_token, to_token: _to_token, recepient: _recepient };
}
function storeTupleInstallment(source) {
    let builder = new core_1.TupleBuilder();
    builder.writeNumber(source.from_chain);
    builder.writeNumber(source.target_chain);
    builder.writeNumber(source.amount);
    builder.writeCell(source.from_token);
    builder.writeCell(source.to_token);
    builder.writeAddress(source.recepient);
    return builder.build();
}
function dictValueParserInstallment() {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef((0, core_1.beginCell)().store(storeInstallment(src)).endCell());
        },
        parse: (src) => {
            return loadInstallment(src.loadRef().beginParse());
        }
    };
}
function storeSignerAndSignature(src) {
    return (builder) => {
        let b_0 = builder;
        b_0.storeRef(src.signature);
        b_0.storeUint(src.key, 256);
    };
}
exports.storeSignerAndSignature = storeSignerAndSignature;
function loadSignerAndSignature(slice) {
    let sc_0 = slice;
    let _signature = sc_0.loadRef();
    let _key = sc_0.loadUintBig(256);
    return { $$type: 'SignerAndSignature', signature: _signature, key: _key };
}
exports.loadSignerAndSignature = loadSignerAndSignature;
function loadTupleSignerAndSignature(source) {
    let _signature = source.readCell();
    let _key = source.readBigNumber();
    return { $$type: 'SignerAndSignature', signature: _signature, key: _key };
}
function storeTupleSignerAndSignature(source) {
    let builder = new core_1.TupleBuilder();
    builder.writeSlice(source.signature);
    builder.writeNumber(source.key);
    return builder.build();
}
function dictValueParserSignerAndSignature() {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef((0, core_1.beginCell)().store(storeSignerAndSignature(src)).endCell());
        },
        parse: (src) => {
            return loadSignerAndSignature(src.loadRef().beginParse());
        }
    };
}
function storeReceiveInstallment(src) {
    return (builder) => {
        let b_0 = builder;
        b_0.storeUint(1032337096, 32);
        b_0.store(storeInstallment(src.installment));
        b_0.storeDict(src.signatures, core_1.Dictionary.Keys.BigInt(257), dictValueParserSignerAndSignature());
        b_0.storeInt(src.len, 257);
        let b_1 = new core_1.Builder();
        b_1.storeUint(src.tx_hash, 256);
        b_1.storeInt(src.id, 257);
        b_0.storeRef(b_1.endCell());
    };
}
exports.storeReceiveInstallment = storeReceiveInstallment;
function loadReceiveInstallment(slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1032337096) {
        throw Error('Invalid prefix');
    }
    let _installment = loadInstallment(sc_0);
    let _signatures = core_1.Dictionary.load(core_1.Dictionary.Keys.BigInt(257), dictValueParserSignerAndSignature(), sc_0);
    let _len = sc_0.loadIntBig(257);
    let sc_1 = sc_0.loadRef().beginParse();
    let _tx_hash = sc_1.loadUintBig(256);
    let _id = sc_1.loadIntBig(257);
    return { $$type: 'ReceiveInstallment', installment: _installment, signatures: _signatures, len: _len, tx_hash: _tx_hash, id: _id };
}
exports.loadReceiveInstallment = loadReceiveInstallment;
function loadTupleReceiveInstallment(source) {
    const _installment = loadTupleInstallment(source.readTuple());
    let _signatures = core_1.Dictionary.loadDirect(core_1.Dictionary.Keys.BigInt(257), dictValueParserSignerAndSignature(), source.readCellOpt());
    let _len = source.readBigNumber();
    let _tx_hash = source.readBigNumber();
    let _id = source.readBigNumber();
    return { $$type: 'ReceiveInstallment', installment: _installment, signatures: _signatures, len: _len, tx_hash: _tx_hash, id: _id };
}
function storeTupleReceiveInstallment(source) {
    let builder = new core_1.TupleBuilder();
    builder.writeTuple(storeTupleInstallment(source.installment));
    builder.writeCell(source.signatures.size > 0 ? (0, core_1.beginCell)().storeDictDirect(source.signatures, core_1.Dictionary.Keys.BigInt(257), dictValueParserSignerAndSignature()).endCell() : null);
    builder.writeNumber(source.len);
    builder.writeNumber(source.tx_hash);
    builder.writeNumber(source.id);
    return builder.build();
}
function dictValueParserReceiveInstallment() {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef((0, core_1.beginCell)().store(storeReceiveInstallment(src)).endCell());
        },
        parse: (src) => {
            return loadReceiveInstallment(src.loadRef().beginParse());
        }
    };
}
function storeFreezeTon(src) {
    return (builder) => {
        let b_0 = builder;
        b_0.storeUint(3943853515, 32);
        b_0.storeUint(src.target_chain, 64);
        b_0.storeRef(src.to_token);
        b_0.storeRef(src.to);
        b_0.storeRef(src.from_token);
        b_0.storeCoins(src.amount);
    };
}
exports.storeFreezeTon = storeFreezeTon;
function loadFreezeTon(slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 3943853515) {
        throw Error('Invalid prefix');
    }
    let _target_chain = sc_0.loadUintBig(64);
    let _to_token = sc_0.loadRef();
    let _to = sc_0.loadRef();
    let _from_token = sc_0.loadRef();
    let _amount = sc_0.loadCoins();
    return { $$type: 'FreezeTon', target_chain: _target_chain, to_token: _to_token, to: _to, from_token: _from_token, amount: _amount };
}
exports.loadFreezeTon = loadFreezeTon;
function loadTupleFreezeTon(source) {
    let _target_chain = source.readBigNumber();
    let _to_token = source.readCell();
    let _to = source.readCell();
    let _from_token = source.readCell();
    let _amount = source.readBigNumber();
    return { $$type: 'FreezeTon', target_chain: _target_chain, to_token: _to_token, to: _to, from_token: _from_token, amount: _amount };
}
function storeTupleFreezeTon(source) {
    let builder = new core_1.TupleBuilder();
    builder.writeNumber(source.target_chain);
    builder.writeCell(source.to_token);
    builder.writeCell(source.to);
    builder.writeCell(source.from_token);
    builder.writeNumber(source.amount);
    return builder.build();
}
function dictValueParserFreezeTon() {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef((0, core_1.beginCell)().store(storeFreezeTon(src)).endCell());
        },
        parse: (src) => {
            return loadFreezeTon(src.loadRef().beginParse());
        }
    };
}
function storeMapContract(src) {
    return (builder) => {
        let b_0 = builder;
        b_0.storeUint(1261946401, 32);
        b_0.storeInt(src.token_id, 257);
        b_0.storeStringRefTail(src.token_symbol);
        b_0.storeAddress(src.contract);
        b_0.storeUint(src.decimals, 8);
        b_0.storeInt(src.fee, 257);
        let b_1 = new core_1.Builder();
        b_1.storeInt(src.fee_decimals, 257);
        b_1.storeAddress(src.swap_address);
        b_1.storeAddress(src.token_bridge_wallet_address);
        b_0.storeRef(b_1.endCell());
    };
}
exports.storeMapContract = storeMapContract;
function loadMapContract(slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1261946401) {
        throw Error('Invalid prefix');
    }
    let _token_id = sc_0.loadIntBig(257);
    let _token_symbol = sc_0.loadStringRefTail();
    let _contract = sc_0.loadAddress();
    let _decimals = sc_0.loadUintBig(8);
    let _fee = sc_0.loadIntBig(257);
    let sc_1 = sc_0.loadRef().beginParse();
    let _fee_decimals = sc_1.loadIntBig(257);
    let _swap_address = sc_1.loadAddress();
    let _token_bridge_wallet_address = sc_1.loadAddress();
    return { $$type: 'MapContract', token_id: _token_id, token_symbol: _token_symbol, contract: _contract, decimals: _decimals, fee: _fee, fee_decimals: _fee_decimals, swap_address: _swap_address, token_bridge_wallet_address: _token_bridge_wallet_address };
}
exports.loadMapContract = loadMapContract;
function loadTupleMapContract(source) {
    let _token_id = source.readBigNumber();
    let _token_symbol = source.readString();
    let _contract = source.readAddress();
    let _decimals = source.readBigNumber();
    let _fee = source.readBigNumber();
    let _fee_decimals = source.readBigNumber();
    let _swap_address = source.readAddress();
    let _token_bridge_wallet_address = source.readAddress();
    return { $$type: 'MapContract', token_id: _token_id, token_symbol: _token_symbol, contract: _contract, decimals: _decimals, fee: _fee, fee_decimals: _fee_decimals, swap_address: _swap_address, token_bridge_wallet_address: _token_bridge_wallet_address };
}
function storeTupleMapContract(source) {
    let builder = new core_1.TupleBuilder();
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
function dictValueParserMapContract() {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef((0, core_1.beginCell)().store(storeMapContract(src)).endCell());
        },
        parse: (src) => {
            return loadMapContract(src.loadRef().beginParse());
        }
    };
}
function storeSetChainFee(src) {
    return (builder) => {
        let b_0 = builder;
        b_0.storeUint(1240718718, 32);
        b_0.storeUint(src.chain_id, 64);
        b_0.storeUint(src.fee, 256);
    };
}
exports.storeSetChainFee = storeSetChainFee;
function loadSetChainFee(slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1240718718) {
        throw Error('Invalid prefix');
    }
    let _chain_id = sc_0.loadUintBig(64);
    let _fee = sc_0.loadUintBig(256);
    return { $$type: 'SetChainFee', chain_id: _chain_id, fee: _fee };
}
exports.loadSetChainFee = loadSetChainFee;
function loadTupleSetChainFee(source) {
    let _chain_id = source.readBigNumber();
    let _fee = source.readBigNumber();
    return { $$type: 'SetChainFee', chain_id: _chain_id, fee: _fee };
}
function storeTupleSetChainFee(source) {
    let builder = new core_1.TupleBuilder();
    builder.writeNumber(source.chain_id);
    builder.writeNumber(source.fee);
    return builder.build();
}
function dictValueParserSetChainFee() {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef((0, core_1.beginCell)().store(storeSetChainFee(src)).endCell());
        },
        parse: (src) => {
            return loadSetChainFee(src.loadRef().beginParse());
        }
    };
}
function storeOutgoingTransaction(src) {
    return (builder) => {
        let b_0 = builder;
        b_0.storeUint(src.id, 256);
        b_0.storeCoins(src.amount);
        b_0.storeRef(src.from_token);
        b_0.storeRef(src.to_token);
        b_0.storeRef(src.to);
        b_0.storeUint(src.target_chain_id, 64);
    };
}
exports.storeOutgoingTransaction = storeOutgoingTransaction;
function loadOutgoingTransaction(slice) {
    let sc_0 = slice;
    let _id = sc_0.loadUintBig(256);
    let _amount = sc_0.loadCoins();
    let _from_token = sc_0.loadRef();
    let _to_token = sc_0.loadRef();
    let _to = sc_0.loadRef();
    let _target_chain_id = sc_0.loadUintBig(64);
    return { $$type: 'OutgoingTransaction', id: _id, amount: _amount, from_token: _from_token, to_token: _to_token, to: _to, target_chain_id: _target_chain_id };
}
exports.loadOutgoingTransaction = loadOutgoingTransaction;
function loadTupleOutgoingTransaction(source) {
    let _id = source.readBigNumber();
    let _amount = source.readBigNumber();
    let _from_token = source.readCell();
    let _to_token = source.readCell();
    let _to = source.readCell();
    let _target_chain_id = source.readBigNumber();
    return { $$type: 'OutgoingTransaction', id: _id, amount: _amount, from_token: _from_token, to_token: _to_token, to: _to, target_chain_id: _target_chain_id };
}
function storeTupleOutgoingTransaction(source) {
    let builder = new core_1.TupleBuilder();
    builder.writeNumber(source.id);
    builder.writeNumber(source.amount);
    builder.writeCell(source.from_token);
    builder.writeCell(source.to_token);
    builder.writeCell(source.to);
    builder.writeNumber(source.target_chain_id);
    return builder.build();
}
function dictValueParserOutgoingTransaction() {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef((0, core_1.beginCell)().store(storeOutgoingTransaction(src)).endCell());
        },
        parse: (src) => {
            return loadOutgoingTransaction(src.loadRef().beginParse());
        }
    };
}
function storeIncomingTransaction(src) {
    return (builder) => {
        let b_0 = builder;
        b_0.storeUint(src.id, 256);
        b_0.storeCoins(src.amount);
        b_0.storeRef(src.from_token);
        b_0.storeRef(src.to_token);
        b_0.storeUint(src.target_chain_id, 64);
        b_0.storeAddress(src.to);
    };
}
exports.storeIncomingTransaction = storeIncomingTransaction;
function loadIncomingTransaction(slice) {
    let sc_0 = slice;
    let _id = sc_0.loadUintBig(256);
    let _amount = sc_0.loadCoins();
    let _from_token = sc_0.loadRef();
    let _to_token = sc_0.loadRef();
    let _target_chain_id = sc_0.loadUintBig(64);
    let _to = sc_0.loadAddress();
    return { $$type: 'IncomingTransaction', id: _id, amount: _amount, from_token: _from_token, to_token: _to_token, target_chain_id: _target_chain_id, to: _to };
}
exports.loadIncomingTransaction = loadIncomingTransaction;
function loadTupleIncomingTransaction(source) {
    let _id = source.readBigNumber();
    let _amount = source.readBigNumber();
    let _from_token = source.readCell();
    let _to_token = source.readCell();
    let _target_chain_id = source.readBigNumber();
    let _to = source.readAddress();
    return { $$type: 'IncomingTransaction', id: _id, amount: _amount, from_token: _from_token, to_token: _to_token, target_chain_id: _target_chain_id, to: _to };
}
function storeTupleIncomingTransaction(source) {
    let builder = new core_1.TupleBuilder();
    builder.writeNumber(source.id);
    builder.writeNumber(source.amount);
    builder.writeCell(source.from_token);
    builder.writeCell(source.to_token);
    builder.writeNumber(source.target_chain_id);
    builder.writeAddress(source.to);
    return builder.build();
}
function dictValueParserIncomingTransaction() {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef((0, core_1.beginCell)().store(storeIncomingTransaction(src)).endCell());
        },
        parse: (src) => {
            return loadIncomingTransaction(src.loadRef().beginParse());
        }
    };
}
function storeInstallmentOut(src) {
    return (builder) => {
        let b_0 = builder;
        b_0.storeUint(src.amount, 256);
        b_0.storeStringRefTail(src.to);
        b_0.storeUint(src.target_chain, 64);
        b_0.storeInt(src.token_id, 257);
    };
}
exports.storeInstallmentOut = storeInstallmentOut;
function loadInstallmentOut(slice) {
    let sc_0 = slice;
    let _amount = sc_0.loadUintBig(256);
    let _to = sc_0.loadStringRefTail();
    let _target_chain = sc_0.loadUintBig(64);
    let _token_id = sc_0.loadIntBig(257);
    return { $$type: 'InstallmentOut', amount: _amount, to: _to, target_chain: _target_chain, token_id: _token_id };
}
exports.loadInstallmentOut = loadInstallmentOut;
function loadTupleInstallmentOut(source) {
    let _amount = source.readBigNumber();
    let _to = source.readString();
    let _target_chain = source.readBigNumber();
    let _token_id = source.readBigNumber();
    return { $$type: 'InstallmentOut', amount: _amount, to: _to, target_chain: _target_chain, token_id: _token_id };
}
function storeTupleInstallmentOut(source) {
    let builder = new core_1.TupleBuilder();
    builder.writeNumber(source.amount);
    builder.writeString(source.to);
    builder.writeNumber(source.target_chain);
    builder.writeNumber(source.token_id);
    return builder.build();
}
function dictValueParserInstallmentOut() {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef((0, core_1.beginCell)().store(storeInstallmentOut(src)).endCell());
        },
        parse: (src) => {
            return loadInstallmentOut(src.loadRef().beginParse());
        }
    };
}
function storeToken(src) {
    return (builder) => {
        let b_0 = builder;
        b_0.storeStringRefTail(src.symbol);
        b_0.storeAddress(src.address);
        b_0.storeAddress(src.swap_address);
        b_0.storeUint(src.decimals, 8);
        b_0.storeInt(src.fee, 257);
        let b_1 = new core_1.Builder();
        b_1.storeInt(src.fee_decimals, 257);
        b_1.storeAddress(src.token_bridge_wallet_address);
        b_0.storeRef(b_1.endCell());
    };
}
exports.storeToken = storeToken;
function loadToken(slice) {
    let sc_0 = slice;
    let _symbol = sc_0.loadStringRefTail();
    let _address = sc_0.loadAddress();
    let _swap_address = sc_0.loadAddress();
    let _decimals = sc_0.loadUintBig(8);
    let _fee = sc_0.loadIntBig(257);
    let sc_1 = sc_0.loadRef().beginParse();
    let _fee_decimals = sc_1.loadIntBig(257);
    let _token_bridge_wallet_address = sc_1.loadAddress();
    return { $$type: 'Token', symbol: _symbol, address: _address, swap_address: _swap_address, decimals: _decimals, fee: _fee, fee_decimals: _fee_decimals, token_bridge_wallet_address: _token_bridge_wallet_address };
}
exports.loadToken = loadToken;
function loadTupleToken(source) {
    let _symbol = source.readString();
    let _address = source.readAddress();
    let _swap_address = source.readAddress();
    let _decimals = source.readBigNumber();
    let _fee = source.readBigNumber();
    let _fee_decimals = source.readBigNumber();
    let _token_bridge_wallet_address = source.readAddress();
    return { $$type: 'Token', symbol: _symbol, address: _address, swap_address: _swap_address, decimals: _decimals, fee: _fee, fee_decimals: _fee_decimals, token_bridge_wallet_address: _token_bridge_wallet_address };
}
function storeTupleToken(source) {
    let builder = new core_1.TupleBuilder();
    builder.writeString(source.symbol);
    builder.writeAddress(source.address);
    builder.writeAddress(source.swap_address);
    builder.writeNumber(source.decimals);
    builder.writeNumber(source.fee);
    builder.writeNumber(source.fee_decimals);
    builder.writeAddress(source.token_bridge_wallet_address);
    return builder.build();
}
function dictValueParserToken() {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef((0, core_1.beginCell)().store(storeToken(src)).endCell());
        },
        parse: (src) => {
            return loadToken(src.loadRef().beginParse());
        }
    };
}
function storeUpdateBaseUri(src) {
    return (builder) => {
        let b_0 = builder;
        b_0.storeUint(3032156853, 32);
        b_0.storeStringRefTail(src.new_base_uri);
    };
}
exports.storeUpdateBaseUri = storeUpdateBaseUri;
function loadUpdateBaseUri(slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 3032156853) {
        throw Error('Invalid prefix');
    }
    let _new_base_uri = sc_0.loadStringRefTail();
    return { $$type: 'UpdateBaseUri', new_base_uri: _new_base_uri };
}
exports.loadUpdateBaseUri = loadUpdateBaseUri;
function loadTupleUpdateBaseUri(source) {
    let _new_base_uri = source.readString();
    return { $$type: 'UpdateBaseUri', new_base_uri: _new_base_uri };
}
function storeTupleUpdateBaseUri(source) {
    let builder = new core_1.TupleBuilder();
    builder.writeString(source.new_base_uri);
    return builder.build();
}
function dictValueParserUpdateBaseUri() {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef((0, core_1.beginCell)().store(storeUpdateBaseUri(src)).endCell());
        },
        parse: (src) => {
            return loadUpdateBaseUri(src.loadRef().beginParse());
        }
    };
}
function storeUpdateTransferFee(src) {
    return (builder) => {
        let b_0 = builder;
        b_0.storeUint(1793030273, 32);
        b_0.storeInt(src.new_fee, 257);
    };
}
exports.storeUpdateTransferFee = storeUpdateTransferFee;
function loadUpdateTransferFee(slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1793030273) {
        throw Error('Invalid prefix');
    }
    let _new_fee = sc_0.loadIntBig(257);
    return { $$type: 'UpdateTransferFee', new_fee: _new_fee };
}
exports.loadUpdateTransferFee = loadUpdateTransferFee;
function loadTupleUpdateTransferFee(source) {
    let _new_fee = source.readBigNumber();
    return { $$type: 'UpdateTransferFee', new_fee: _new_fee };
}
function storeTupleUpdateTransferFee(source) {
    let builder = new core_1.TupleBuilder();
    builder.writeNumber(source.new_fee);
    return builder.build();
}
function dictValueParserUpdateTransferFee() {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef((0, core_1.beginCell)().store(storeUpdateTransferFee(src)).endCell());
        },
        parse: (src) => {
            return loadUpdateTransferFee(src.loadRef().beginParse());
        }
    };
}
function storeRemoveMappedContract(src) {
    return (builder) => {
        let b_0 = builder;
        b_0.storeUint(1790492737, 32);
        b_0.storeUint(src.token_id, 256);
    };
}
exports.storeRemoveMappedContract = storeRemoveMappedContract;
function loadRemoveMappedContract(slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1790492737) {
        throw Error('Invalid prefix');
    }
    let _token_id = sc_0.loadUintBig(256);
    return { $$type: 'RemoveMappedContract', token_id: _token_id };
}
exports.loadRemoveMappedContract = loadRemoveMappedContract;
function loadTupleRemoveMappedContract(source) {
    let _token_id = source.readBigNumber();
    return { $$type: 'RemoveMappedContract', token_id: _token_id };
}
function storeTupleRemoveMappedContract(source) {
    let builder = new core_1.TupleBuilder();
    builder.writeNumber(source.token_id);
    return builder.build();
}
function dictValueParserRemoveMappedContract() {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef((0, core_1.beginCell)().store(storeRemoveMappedContract(src)).endCell());
        },
        parse: (src) => {
            return loadRemoveMappedContract(src.loadRef().beginParse());
        }
    };
}
function storeStrategies(src) {
    return (builder) => {
        let b_0 = builder;
        b_0.storeDict(src.strategies, core_1.Dictionary.Keys.BigInt(257), dictValueParserSteps());
    };
}
exports.storeStrategies = storeStrategies;
function loadStrategies(slice) {
    let sc_0 = slice;
    let _strategies = core_1.Dictionary.load(core_1.Dictionary.Keys.BigInt(257), dictValueParserSteps(), sc_0);
    return { $$type: 'Strategies', strategies: _strategies };
}
exports.loadStrategies = loadStrategies;
function loadTupleStrategies(source) {
    let _strategies = core_1.Dictionary.loadDirect(core_1.Dictionary.Keys.BigInt(257), dictValueParserSteps(), source.readCellOpt());
    return { $$type: 'Strategies', strategies: _strategies };
}
function storeTupleStrategies(source) {
    let builder = new core_1.TupleBuilder();
    builder.writeCell(source.strategies.size > 0 ? (0, core_1.beginCell)().storeDictDirect(source.strategies, core_1.Dictionary.Keys.BigInt(257), dictValueParserSteps()).endCell() : null);
    return builder.build();
}
function dictValueParserStrategies() {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef((0, core_1.beginCell)().store(storeStrategies(src)).endCell());
        },
        parse: (src) => {
            return loadStrategies(src.loadRef().beginParse());
        }
    };
}
function storeToTokenCrossChainStrategy(src) {
    return (builder) => {
        let b_0 = builder;
        b_0.storeDict(src.to_token, core_1.Dictionary.Keys.BigInt(257), dictValueParserCrossChainStrategy());
    };
}
exports.storeToTokenCrossChainStrategy = storeToTokenCrossChainStrategy;
function loadToTokenCrossChainStrategy(slice) {
    let sc_0 = slice;
    let _to_token = core_1.Dictionary.load(core_1.Dictionary.Keys.BigInt(257), dictValueParserCrossChainStrategy(), sc_0);
    return { $$type: 'ToTokenCrossChainStrategy', to_token: _to_token };
}
exports.loadToTokenCrossChainStrategy = loadToTokenCrossChainStrategy;
function loadTupleToTokenCrossChainStrategy(source) {
    let _to_token = core_1.Dictionary.loadDirect(core_1.Dictionary.Keys.BigInt(257), dictValueParserCrossChainStrategy(), source.readCellOpt());
    return { $$type: 'ToTokenCrossChainStrategy', to_token: _to_token };
}
function storeTupleToTokenCrossChainStrategy(source) {
    let builder = new core_1.TupleBuilder();
    builder.writeCell(source.to_token.size > 0 ? (0, core_1.beginCell)().storeDictDirect(source.to_token, core_1.Dictionary.Keys.BigInt(257), dictValueParserCrossChainStrategy()).endCell() : null);
    return builder.build();
}
function dictValueParserToTokenCrossChainStrategy() {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef((0, core_1.beginCell)().store(storeToTokenCrossChainStrategy(src)).endCell());
        },
        parse: (src) => {
            return loadToTokenCrossChainStrategy(src.loadRef().beginParse());
        }
    };
}
function storeCrossChainTokenStrategy(src) {
    return (builder) => {
        let b_0 = builder;
        b_0.storeDict(src.from_token, core_1.Dictionary.Keys.BigInt(257), dictValueParserToTokenCrossChainStrategy());
    };
}
exports.storeCrossChainTokenStrategy = storeCrossChainTokenStrategy;
function loadCrossChainTokenStrategy(slice) {
    let sc_0 = slice;
    let _from_token = core_1.Dictionary.load(core_1.Dictionary.Keys.BigInt(257), dictValueParserToTokenCrossChainStrategy(), sc_0);
    return { $$type: 'CrossChainTokenStrategy', from_token: _from_token };
}
exports.loadCrossChainTokenStrategy = loadCrossChainTokenStrategy;
function loadTupleCrossChainTokenStrategy(source) {
    let _from_token = core_1.Dictionary.loadDirect(core_1.Dictionary.Keys.BigInt(257), dictValueParserToTokenCrossChainStrategy(), source.readCellOpt());
    return { $$type: 'CrossChainTokenStrategy', from_token: _from_token };
}
function storeTupleCrossChainTokenStrategy(source) {
    let builder = new core_1.TupleBuilder();
    builder.writeCell(source.from_token.size > 0 ? (0, core_1.beginCell)().storeDictDirect(source.from_token, core_1.Dictionary.Keys.BigInt(257), dictValueParserToTokenCrossChainStrategy()).endCell() : null);
    return builder.build();
}
function dictValueParserCrossChainTokenStrategy() {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef((0, core_1.beginCell)().store(storeCrossChainTokenStrategy(src)).endCell());
        },
        parse: (src) => {
            return loadCrossChainTokenStrategy(src.loadRef().beginParse());
        }
    };
}
function storeTargetTokenToSteps(src) {
    return (builder) => {
        let b_0 = builder;
        b_0.storeDict(src.i, core_1.Dictionary.Keys.BigInt(257), dictValueParserSteps());
    };
}
exports.storeTargetTokenToSteps = storeTargetTokenToSteps;
function loadTargetTokenToSteps(slice) {
    let sc_0 = slice;
    let _i = core_1.Dictionary.load(core_1.Dictionary.Keys.BigInt(257), dictValueParserSteps(), sc_0);
    return { $$type: 'TargetTokenToSteps', i: _i };
}
exports.loadTargetTokenToSteps = loadTargetTokenToSteps;
function loadTupleTargetTokenToSteps(source) {
    let _i = core_1.Dictionary.loadDirect(core_1.Dictionary.Keys.BigInt(257), dictValueParserSteps(), source.readCellOpt());
    return { $$type: 'TargetTokenToSteps', i: _i };
}
function storeTupleTargetTokenToSteps(source) {
    let builder = new core_1.TupleBuilder();
    builder.writeCell(source.i.size > 0 ? (0, core_1.beginCell)().storeDictDirect(source.i, core_1.Dictionary.Keys.BigInt(257), dictValueParserSteps()).endCell() : null);
    return builder.build();
}
function dictValueParserTargetTokenToSteps() {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef((0, core_1.beginCell)().store(storeTargetTokenToSteps(src)).endCell());
        },
        parse: (src) => {
            return loadTargetTokenToSteps(src.loadRef().beginParse());
        }
    };
}
function storeSteps(src) {
    return (builder) => {
        let b_0 = builder;
        b_0.storeDict(src.steps, core_1.Dictionary.Keys.BigInt(257), core_1.Dictionary.Values.BigInt(257));
        b_0.storeInt(src.size, 257);
    };
}
exports.storeSteps = storeSteps;
function loadSteps(slice) {
    let sc_0 = slice;
    let _steps = core_1.Dictionary.load(core_1.Dictionary.Keys.BigInt(257), core_1.Dictionary.Values.BigInt(257), sc_0);
    let _size = sc_0.loadIntBig(257);
    return { $$type: 'Steps', steps: _steps, size: _size };
}
exports.loadSteps = loadSteps;
function loadTupleSteps(source) {
    let _steps = core_1.Dictionary.loadDirect(core_1.Dictionary.Keys.BigInt(257), core_1.Dictionary.Values.BigInt(257), source.readCellOpt());
    let _size = source.readBigNumber();
    return { $$type: 'Steps', steps: _steps, size: _size };
}
function storeTupleSteps(source) {
    let builder = new core_1.TupleBuilder();
    builder.writeCell(source.steps.size > 0 ? (0, core_1.beginCell)().storeDictDirect(source.steps, core_1.Dictionary.Keys.BigInt(257), core_1.Dictionary.Values.BigInt(257)).endCell() : null);
    builder.writeNumber(source.size);
    return builder.build();
}
function dictValueParserSteps() {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef((0, core_1.beginCell)().store(storeSteps(src)).endCell());
        },
        parse: (src) => {
            return loadSteps(src.loadRef().beginParse());
        }
    };
}
function storeCrossChainStrategy(src) {
    return (builder) => {
        let b_0 = builder;
        b_0.store(storeSteps(src.local_steps));
        b_0.store(storeSteps(src.foreign_steps));
    };
}
exports.storeCrossChainStrategy = storeCrossChainStrategy;
function loadCrossChainStrategy(slice) {
    let sc_0 = slice;
    let _local_steps = loadSteps(sc_0);
    let _foreign_steps = loadSteps(sc_0);
    return { $$type: 'CrossChainStrategy', local_steps: _local_steps, foreign_steps: _foreign_steps };
}
exports.loadCrossChainStrategy = loadCrossChainStrategy;
function loadTupleCrossChainStrategy(source) {
    const _local_steps = loadTupleSteps(source.readTuple());
    const _foreign_steps = loadTupleSteps(source.readTuple());
    return { $$type: 'CrossChainStrategy', local_steps: _local_steps, foreign_steps: _foreign_steps };
}
function storeTupleCrossChainStrategy(source) {
    let builder = new core_1.TupleBuilder();
    builder.writeTuple(storeTupleSteps(source.local_steps));
    builder.writeTuple(storeTupleSteps(source.foreign_steps));
    return builder.build();
}
function dictValueParserCrossChainStrategy() {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef((0, core_1.beginCell)().store(storeCrossChainStrategy(src)).endCell());
        },
        parse: (src) => {
            return loadCrossChainStrategy(src.loadRef().beginParse());
        }
    };
}
function storeTargetTokenToCrossChainStrategy(src) {
    return (builder) => {
        let b_0 = builder;
        b_0.storeDict(src.i, core_1.Dictionary.Keys.BigInt(257), dictValueParserCrossChainStrategy());
    };
}
exports.storeTargetTokenToCrossChainStrategy = storeTargetTokenToCrossChainStrategy;
function loadTargetTokenToCrossChainStrategy(slice) {
    let sc_0 = slice;
    let _i = core_1.Dictionary.load(core_1.Dictionary.Keys.BigInt(257), dictValueParserCrossChainStrategy(), sc_0);
    return { $$type: 'TargetTokenToCrossChainStrategy', i: _i };
}
exports.loadTargetTokenToCrossChainStrategy = loadTargetTokenToCrossChainStrategy;
function loadTupleTargetTokenToCrossChainStrategy(source) {
    let _i = core_1.Dictionary.loadDirect(core_1.Dictionary.Keys.BigInt(257), dictValueParserCrossChainStrategy(), source.readCellOpt());
    return { $$type: 'TargetTokenToCrossChainStrategy', i: _i };
}
function storeTupleTargetTokenToCrossChainStrategy(source) {
    let builder = new core_1.TupleBuilder();
    builder.writeCell(source.i.size > 0 ? (0, core_1.beginCell)().storeDictDirect(source.i, core_1.Dictionary.Keys.BigInt(257), dictValueParserCrossChainStrategy()).endCell() : null);
    return builder.build();
}
function dictValueParserTargetTokenToCrossChainStrategy() {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef((0, core_1.beginCell)().store(storeTargetTokenToCrossChainStrategy(src)).endCell());
        },
        parse: (src) => {
            return loadTargetTokenToCrossChainStrategy(src.loadRef().beginParse());
        }
    };
}
function storeFromTokenToTargetTokenToCrossChainStrategy(src) {
    return (builder) => {
        let b_0 = builder;
        b_0.storeDict(src.i, core_1.Dictionary.Keys.BigInt(257), dictValueParserTargetTokenToCrossChainStrategy());
    };
}
exports.storeFromTokenToTargetTokenToCrossChainStrategy = storeFromTokenToTargetTokenToCrossChainStrategy;
function loadFromTokenToTargetTokenToCrossChainStrategy(slice) {
    let sc_0 = slice;
    let _i = core_1.Dictionary.load(core_1.Dictionary.Keys.BigInt(257), dictValueParserTargetTokenToCrossChainStrategy(), sc_0);
    return { $$type: 'FromTokenToTargetTokenToCrossChainStrategy', i: _i };
}
exports.loadFromTokenToTargetTokenToCrossChainStrategy = loadFromTokenToTargetTokenToCrossChainStrategy;
function loadTupleFromTokenToTargetTokenToCrossChainStrategy(source) {
    let _i = core_1.Dictionary.loadDirect(core_1.Dictionary.Keys.BigInt(257), dictValueParserTargetTokenToCrossChainStrategy(), source.readCellOpt());
    return { $$type: 'FromTokenToTargetTokenToCrossChainStrategy', i: _i };
}
function storeTupleFromTokenToTargetTokenToCrossChainStrategy(source) {
    let builder = new core_1.TupleBuilder();
    builder.writeCell(source.i.size > 0 ? (0, core_1.beginCell)().storeDictDirect(source.i, core_1.Dictionary.Keys.BigInt(257), dictValueParserTargetTokenToCrossChainStrategy()).endCell() : null);
    return builder.build();
}
function dictValueParserFromTokenToTargetTokenToCrossChainStrategy() {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef((0, core_1.beginCell)().store(storeFromTokenToTargetTokenToCrossChainStrategy(src)).endCell());
        },
        parse: (src) => {
            return loadFromTokenToTargetTokenToCrossChainStrategy(src.loadRef().beginParse());
        }
    };
}
function storeUpdateProtocolFee(src) {
    return (builder) => {
        let b_0 = builder;
        b_0.storeUint(865129320, 32);
        b_0.storeInt(src.new_fee, 257);
    };
}
exports.storeUpdateProtocolFee = storeUpdateProtocolFee;
function loadUpdateProtocolFee(slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 865129320) {
        throw Error('Invalid prefix');
    }
    let _new_fee = sc_0.loadIntBig(257);
    return { $$type: 'UpdateProtocolFee', new_fee: _new_fee };
}
exports.loadUpdateProtocolFee = loadUpdateProtocolFee;
function loadTupleUpdateProtocolFee(source) {
    let _new_fee = source.readBigNumber();
    return { $$type: 'UpdateProtocolFee', new_fee: _new_fee };
}
function storeTupleUpdateProtocolFee(source) {
    let builder = new core_1.TupleBuilder();
    builder.writeNumber(source.new_fee);
    return builder.build();
}
function dictValueParserUpdateProtocolFee() {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef((0, core_1.beginCell)().store(storeUpdateProtocolFee(src)).endCell());
        },
        parse: (src) => {
            return loadUpdateProtocolFee(src.loadRef().beginParse());
        }
    };
}
function storeAddValidator(src) {
    return (builder) => {
        let b_0 = builder;
        b_0.storeUint(2513894818, 32);
        b_0.storeInt(src.key, 257);
        b_0.storeAddress(src.address);
    };
}
exports.storeAddValidator = storeAddValidator;
function loadAddValidator(slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2513894818) {
        throw Error('Invalid prefix');
    }
    let _key = sc_0.loadIntBig(257);
    let _address = sc_0.loadAddress();
    return { $$type: 'AddValidator', key: _key, address: _address };
}
exports.loadAddValidator = loadAddValidator;
function loadTupleAddValidator(source) {
    let _key = source.readBigNumber();
    let _address = source.readAddress();
    return { $$type: 'AddValidator', key: _key, address: _address };
}
function storeTupleAddValidator(source) {
    let builder = new core_1.TupleBuilder();
    builder.writeNumber(source.key);
    builder.writeAddress(source.address);
    return builder.build();
}
function dictValueParserAddValidator() {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef((0, core_1.beginCell)().store(storeAddValidator(src)).endCell());
        },
        parse: (src) => {
            return loadAddValidator(src.loadRef().beginParse());
        }
    };
}
function storeRemoveValidator(src) {
    return (builder) => {
        let b_0 = builder;
        b_0.storeUint(3282419170, 32);
        b_0.storeInt(src.key, 257);
    };
}
exports.storeRemoveValidator = storeRemoveValidator;
function loadRemoveValidator(slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 3282419170) {
        throw Error('Invalid prefix');
    }
    let _key = sc_0.loadIntBig(257);
    return { $$type: 'RemoveValidator', key: _key };
}
exports.loadRemoveValidator = loadRemoveValidator;
function loadTupleRemoveValidator(source) {
    let _key = source.readBigNumber();
    return { $$type: 'RemoveValidator', key: _key };
}
function storeTupleRemoveValidator(source) {
    let builder = new core_1.TupleBuilder();
    builder.writeNumber(source.key);
    return builder.build();
}
function dictValueParserRemoveValidator() {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef((0, core_1.beginCell)().store(storeRemoveValidator(src)).endCell());
        },
        parse: (src) => {
            return loadRemoveValidator(src.loadRef().beginParse());
        }
    };
}
function storeSetIncomingStrategy(src) {
    return (builder) => {
        let b_0 = builder;
        b_0.storeUint(2745641556, 32);
        b_0.storeInt(src.from_token, 257);
        b_0.storeInt(src.target_token, 257);
        b_0.store(storeSteps(src.steps));
    };
}
exports.storeSetIncomingStrategy = storeSetIncomingStrategy;
function loadSetIncomingStrategy(slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2745641556) {
        throw Error('Invalid prefix');
    }
    let _from_token = sc_0.loadIntBig(257);
    let _target_token = sc_0.loadIntBig(257);
    let _steps = loadSteps(sc_0);
    return { $$type: 'SetIncomingStrategy', from_token: _from_token, target_token: _target_token, steps: _steps };
}
exports.loadSetIncomingStrategy = loadSetIncomingStrategy;
function loadTupleSetIncomingStrategy(source) {
    let _from_token = source.readBigNumber();
    let _target_token = source.readBigNumber();
    const _steps = loadTupleSteps(source.readTuple());
    return { $$type: 'SetIncomingStrategy', from_token: _from_token, target_token: _target_token, steps: _steps };
}
function storeTupleSetIncomingStrategy(source) {
    let builder = new core_1.TupleBuilder();
    builder.writeNumber(source.from_token);
    builder.writeNumber(source.target_token);
    builder.writeTuple(storeTupleSteps(source.steps));
    return builder.build();
}
function dictValueParserSetIncomingStrategy() {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef((0, core_1.beginCell)().store(storeSetIncomingStrategy(src)).endCell());
        },
        parse: (src) => {
            return loadSetIncomingStrategy(src.loadRef().beginParse());
        }
    };
}
function storeSetCrossChainStrategy(src) {
    return (builder) => {
        let b_0 = builder;
        b_0.storeUint(1825931216, 32);
        b_0.storeInt(src.target_chain, 257);
        b_0.storeInt(src.from_token, 257);
        b_0.storeInt(src.target_token, 257);
        let b_1 = new core_1.Builder();
        b_1.store(storeSteps(src.local_steps));
        b_1.store(storeSteps(src.foreign_steps));
        b_0.storeRef(b_1.endCell());
    };
}
exports.storeSetCrossChainStrategy = storeSetCrossChainStrategy;
function loadSetCrossChainStrategy(slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1825931216) {
        throw Error('Invalid prefix');
    }
    let _target_chain = sc_0.loadIntBig(257);
    let _from_token = sc_0.loadIntBig(257);
    let _target_token = sc_0.loadIntBig(257);
    let sc_1 = sc_0.loadRef().beginParse();
    let _local_steps = loadSteps(sc_1);
    let _foreign_steps = loadSteps(sc_1);
    return { $$type: 'SetCrossChainStrategy', target_chain: _target_chain, from_token: _from_token, target_token: _target_token, local_steps: _local_steps, foreign_steps: _foreign_steps };
}
exports.loadSetCrossChainStrategy = loadSetCrossChainStrategy;
function loadTupleSetCrossChainStrategy(source) {
    let _target_chain = source.readBigNumber();
    let _from_token = source.readBigNumber();
    let _target_token = source.readBigNumber();
    const _local_steps = loadTupleSteps(source.readTuple());
    const _foreign_steps = loadTupleSteps(source.readTuple());
    return { $$type: 'SetCrossChainStrategy', target_chain: _target_chain, from_token: _from_token, target_token: _target_token, local_steps: _local_steps, foreign_steps: _foreign_steps };
}
function storeTupleSetCrossChainStrategy(source) {
    let builder = new core_1.TupleBuilder();
    builder.writeNumber(source.target_chain);
    builder.writeNumber(source.from_token);
    builder.writeNumber(source.target_token);
    builder.writeTuple(storeTupleSteps(source.local_steps));
    builder.writeTuple(storeTupleSteps(source.foreign_steps));
    return builder.build();
}
function dictValueParserSetCrossChainStrategy() {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef((0, core_1.beginCell)().store(storeSetCrossChainStrategy(src)).endCell());
        },
        parse: (src) => {
            return loadSetCrossChainStrategy(src.loadRef().beginParse());
        }
    };
}
function storeRemoveInternalStrategy(src) {
    return (builder) => {
        let b_0 = builder;
        b_0.storeUint(3020212274, 32);
        b_0.storeInt(src.from_token, 257);
        b_0.storeInt(src.target_token, 257);
    };
}
exports.storeRemoveInternalStrategy = storeRemoveInternalStrategy;
function loadRemoveInternalStrategy(slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 3020212274) {
        throw Error('Invalid prefix');
    }
    let _from_token = sc_0.loadIntBig(257);
    let _target_token = sc_0.loadIntBig(257);
    return { $$type: 'RemoveInternalStrategy', from_token: _from_token, target_token: _target_token };
}
exports.loadRemoveInternalStrategy = loadRemoveInternalStrategy;
function loadTupleRemoveInternalStrategy(source) {
    let _from_token = source.readBigNumber();
    let _target_token = source.readBigNumber();
    return { $$type: 'RemoveInternalStrategy', from_token: _from_token, target_token: _target_token };
}
function storeTupleRemoveInternalStrategy(source) {
    let builder = new core_1.TupleBuilder();
    builder.writeNumber(source.from_token);
    builder.writeNumber(source.target_token);
    return builder.build();
}
function dictValueParserRemoveInternalStrategy() {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef((0, core_1.beginCell)().store(storeRemoveInternalStrategy(src)).endCell());
        },
        parse: (src) => {
            return loadRemoveInternalStrategy(src.loadRef().beginParse());
        }
    };
}
function storeRemoveCrossChainStrategy(src) {
    return (builder) => {
        let b_0 = builder;
        b_0.storeUint(207130758, 32);
        b_0.storeInt(src.target_chain, 257);
        b_0.storeInt(src.from_token, 257);
        b_0.storeInt(src.target_token, 257);
    };
}
exports.storeRemoveCrossChainStrategy = storeRemoveCrossChainStrategy;
function loadRemoveCrossChainStrategy(slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 207130758) {
        throw Error('Invalid prefix');
    }
    let _target_chain = sc_0.loadIntBig(257);
    let _from_token = sc_0.loadIntBig(257);
    let _target_token = sc_0.loadIntBig(257);
    return { $$type: 'RemoveCrossChainStrategy', target_chain: _target_chain, from_token: _from_token, target_token: _target_token };
}
exports.loadRemoveCrossChainStrategy = loadRemoveCrossChainStrategy;
function loadTupleRemoveCrossChainStrategy(source) {
    let _target_chain = source.readBigNumber();
    let _from_token = source.readBigNumber();
    let _target_token = source.readBigNumber();
    return { $$type: 'RemoveCrossChainStrategy', target_chain: _target_chain, from_token: _from_token, target_token: _target_token };
}
function storeTupleRemoveCrossChainStrategy(source) {
    let builder = new core_1.TupleBuilder();
    builder.writeNumber(source.target_chain);
    builder.writeNumber(source.from_token);
    builder.writeNumber(source.target_token);
    return builder.build();
}
function dictValueParserRemoveCrossChainStrategy() {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef((0, core_1.beginCell)().store(storeRemoveCrossChainStrategy(src)).endCell());
        },
        parse: (src) => {
            return loadRemoveCrossChainStrategy(src.loadRef().beginParse());
        }
    };
}
function initBridge_init_args(src) {
    return (builder) => {
        let b_0 = builder;
        b_0.storeInt(src.chain_nonce, 257);
        b_0.storeInt(src.native_coin, 257);
        b_0.storeAddress(src.burner);
        b_0.storeStringRefTail(src.base_uri);
        let b_1 = new core_1.Builder();
        b_1.storeInt(src.transfer_fee, 257);
        b_1.storeInt(src.protocol_fee, 257);
        b_1.storeInt(src.bootstrap_validator_key, 257);
        let b_2 = new core_1.Builder();
        b_2.storeAddress(src.bootstrap_validator_address);
        b_1.storeRef(b_2.endCell());
        b_0.storeRef(b_1.endCell());
    };
}
async function Bridge_init(chain_nonce, native_coin, burner, base_uri, transfer_fee, protocol_fee, bootstrap_validator_key, bootstrap_validator_address) {
    const __code = core_1.Cell.fromBase64('te6ccgECzgEANwcAART/APSkE/S88sgLAQIBYgIDA8rQAdDTAwFxsKMB+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiFRQUwNvBPhhAvhi2zwRFBEWERQRExEVERMREhEUERIRERETEREREBESERAPEREPDhEQDhDfVRzbPPLggrkEBQIBIAgJBO7tou37AZIwf+BwIddJwh+VMCDXCx/eIIIQc2LQnLqOuzDTHwGCEHNi0Jy68uCB0z/6APpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IhUEwMQI2wU2zx/4CCCEHvdl966jwgw2zxsFts8f+AgghDrEm3LugoLDA0BOMj4QwHMfwHKABEVERQRExESEREREFXg2zzJ7VQGAcgBERQBERWBAQHPAAEREgGBAQHPAAEREAGBAQHPAA7IgQEBzwAdgQEBzwAb9AAZ9AAX9AAFyPQAFPQAWCDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFvQAAcj0ABPKAFADBwCgINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WyFAEzxbJUAPME4EBAc8AFIEBAc8AFPQABMiBAQHPABWBAQHPAMlQA8zJWMzJAczJAcwCASB+fwIBIJmaAeIxMhEUERYRFBETERURExESERYREhERERUREREQERYREA8RFQ8OERYODREVDQwRFgwLERULChEWCgkRFQkIERYIBxEVBwYRFgYFERUFBBEWBAMRFQMCERYCAREVAREWgU1QKLPy9BEV0z+BAQFUWgBSQA4AstMfAYIQe92X3rry4IHTP/oA+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiAH6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIAfoAUVUVFEMwAfY1XwOCAIpn+EFvJBAjXwMqxwXy9BEUERYRFBETERURExESERYREhERERUREREQERYREA8RFQ8OERYODREVDQwRFgwLERULChEWCgkRFQkIERYIBxEVBwYRFgYFERUFBBEWBAMRFQMCERYCAREVAREWgU1QKLPy9BEV0z8PBHSOnDDTHwGCEOsSbcu68uCB0z/U1NT6AFVAbBXbPH/gIIIQSzfGIbqPCDDbPGwY2zx/4CCCEGq4wEG6ERITFAPqQTP0DG+hlAHXADCSW23iggDERSFus/L0ggD3tfhBbyQTXwMCIG7y0IAnoBK+8vQRFaQRFdTU1DAEERkEE1YXUDNaFRRUdUNUdUPIVVDbPMn5ABBGEDVGVoEBAQbIVVDbPMkQL1LwIG6VMFn0WjCUQTP0FeINFxcQA/qBAQFUWgBSQEEz9AxvoZQB1wAwkltt4oIAxEUhbrPy9IIA97X4QW8kE18DAiBu8tCAJ6ASvvL0ERWkERXU1NQwBBEZBBNWF1AzWhUUVHVDVHVDyFVQ2zzJ+QAQRhA1RlaBAQEGyFVQ2zzJEC9S8CBulTBZ9FowlEEz9BXiDRcXEACOyAGCEGZkCeVYyx+BAQHPAMnIgljAAAAAAAAAAAAAAAABActnzMlw+wAREhEUERIRERETEREREBESERAPEREPDhEQDhDfVRwB9BEUERkRFBETERgRExESERcREhERERYREREQERUREA8RGQ8OERgODREXDQwRFgwLERULChEZCgkRGAkIERcIBxEWBwYRFQYFERkFBBEYBAMRFwMCERYCAREVAREZgU1QKLPy9BEUpFYZAwIRFwIhVhoCAREYAREaWhUUFQHK0x8BghBLN8YhuvLggYEBAdcA1AHQAfpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgB0weBAQHXANQB0IEBAdcA+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiAEZAfBWHFYcVhxWHFYcVhxWHFYcVhxWHFYcVhxWHFYcVhxWHFYcVhxWHFYcVhwRFBExERQRExEwERMREhEvERIREREuEREREBEtERAPESwPDhErDg0RKg0MESkMCxEoCwoRJwoJESYJCBElCAcRJAcGESMGBREiBQQRIQQaBLKOlTDTHwGCEGq4wEG68uCB0/8BMds8f+AgghA9iDbIuo8uMNMfAYIQPYg2yLry4IHbPAb0BIEBAdcA1AHQ0/+BAQHXADAQKhAkECNsGts8f+AgghBJ891+uhwdHh8C+lR1Q1R1Q8hVUNs8yfkAgQEBUw0DER8BQTP0DG+hlAHXADCSW23iggDERSFus/L0ggD3tfhBbyQTXwMCIG7y0IBWH6ApoBK+8vQRFREYERURFBEWERQRExEYERMREhEWERIREREYEREREBEWERAPERgPDhEWDg0RGA0MERYMFxYC/AsRGAsKERYKCREYCQgRFggHERgHBhEWBgURGAUEERYEAxEaAwIRGQIBERcBERyBQ174QW8kE18DIr7y9BESVhKgARETARESoBESBBEXBAMRFQMCERkCAREYAREWgQEBERzIVVDbPMkQKgERFwFWFgEgbpUwWfRaMJRBM/QV4hcYABpQVsv/UAP6AszMzMs/AKQRFMgBghBmZAnlWMsfgQEBzwDJyIJYwAAAAAAAAAAAAAAAAQHLZ8zJcPsADREUDQwREwwLERILChERCgkREAkQjxDOEG0QXBBLEDpJFwZEhVAzAFT6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIMRA4EDcQNhA1EDQD/AMRIAMCER8CAREeAREd2zxXEF8PbFERFREdERURFBEcERQRExEbERMREhEaERIREREZEREREBEYERAPERcPDhEWDg0RHQ0MERwMCxEbCwoRGgoJERkJCBEYCAcRFwcGERYGBREdBQQRHAQDERsDAhEaAgERGQHbPBEUERwRFMZ8GwHQERMRGxETERIRGhESERERGRERERARGBEQDxEXDw4RFg4NERUNDBEUDAsREwsKERIKCRERCQgREAhVdxBnEFYQRUMwEFYQRgeBAQEIFhVDMMhVYNs8yQMREAMgbpUwWfRaMJRBM/QV4g0iAfBWFVYVVhVWFVYVVhVWFVYVVhVWFVYVVhVWFVYVVhVWFVYVVhVWFVYVVhURFBEqERQRExEpERMREhEoERIREREnEREREBEmERAPESUPDhEkDg0RIw0MESIMCxEhCwoRIAoJER8JCBEeCAcRHQcGERwGBREbBQQRGgQgAHLTHwGCEPl1iaK68uCB0z/TP/oA1NT6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIFhUUQzAB9hEUER4RFBETER0RExESERwREhERERsREREQERoREA8RGQ8OERgODREXDQwRFgwLERULChEeCgkRHQkIERwIBxEbBwYRGgYFERkFBBEYBAMRFwMCERYCAREVAREegU1QKLPy9FYUVhRWFFYUVhRWFFYUVhRWFFYUVhRWFC0E/I6YMNMfAYIQSfPdfrry4IHTP9P/WWwS2zx/4CCCENUydtu6jhQw0x8BghDVMnbbuvLggdM/ATEwf+AgghAzkNNouo6YMNMfAYIQM5DTaLry4IGBAQHXAAEx2zx/4CCCELS7CrW6jpUw0x8BghC0uwq1uvLggdQB0DHbPH/gICMkJSYD+AMRGQMCERgCAREXAREW2zxXEF8PbFERFREWERURFBEWERQRExEWERMREhEWERIREREWEREREBEWERAPERYPDhEWDg0RFg0MERYMCxEWCwoRFgoJERYJCBEWCAcRFgcGERYGBREWBQQRFgQDERYDAhEWAgERFgHbPIEBAW3GfCEBvCBukjBtjo0gbvLQgG8nyFVg2zzJ4hA/EgERFwEgbpUwWfRaMJRBM/QV4hETERQRExESERMREhERERIREREQEREREA8REA8Q7w0OELwQqxCaEIkQeBBnEFYQRRA0QTAiAPDIUAfPFslQB8xQBCDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFlgg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxbLB4EBAc8AAsiBAQHPAAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxbJAcwB8FYWVhZWFlYWVhZWFlYWVhZWFlYWVhZWFlYWVhZWFlYWVhZWFlYWVhZWFhEUESsRFBETESoRExESESkREhERESgREREQEScREA8RJg8OESUODREkDQwRIwwLESILChEhCgkRIAkIER8IBxEeBwYRHQYFERwFBBEbBCcB8FYVVhVWFVYVVhVWFVYVVhVWFVYVVhVWFVYVVhVWFVYVVhVWFVYVVhVWFREUESoRFBETESkRExESESgREhEREScREREQESYREA8RJQ8OESQODREjDQwRIgwLESELChEgCgkRHwkIER4IBxEdBwYRHAYFERsFBBEaBCkB8FYVVhVWFVYVVhVWFVYVVhVWFVYVVhVWFVYVVhVWFVYVVhVWFVYVVhVWFREUESoRFBETESkRExESESgREhEREScREREQESYREA8RJQ8OESQODREjDQwRIgwLESELChEgCgkRHwkIER4IBxEdBwYRHAYFERsFBBEaBCsE7oIQat94gbqOmDDTHwGCEGrfeIG68uCBgQEB1wABMds8f+AgghCV1v2iuo64MNMfAYIQldb9orry4IGBAQHXAPpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgSbBLbPH/gIIIQw6W94rrjAiCCEKOnKlS6REVGRwP+AxEaAwIRGQIBERgBERfbPFcQXw9sUREVERcRFREUERYRFBETERcRExESERYREhERERcREREQERYREA8RFw8OERYODREXDQwRFgwLERcLChEWCgkRFwkIERYIBxEXBwYRFgYFERcFBBEWBAMRFwMCERYCAREXAds8gQEBIBBKE8Z8KACWAhEXAgERGAEhbpVbWfRaMJjIAc8AQTP0QuIREhEUERIRERETEREREBESERAPEREPDhEQDhDfEM4QvRCsEJsQihB5CBBXEEYQNUQDA/wDERkDAhEYAgERFwERFts8VxBfD2xRERURFhEVERQRFhEUERMRFhETERIRFhESERERFhERERARFhEQDxEWDw4RFg4NERYNDBEWDAsRFgsKERYKCREWCQgRFggHERYHBhEWBgURFgUEERYEAxEWAwIRFgIBERYB2zwRFBEVERTGfCoAPhETERQRExESERMREhERERIREREQEREREA8REA9VDjQD/gMRGQMCERgCAREXAREW2zxXEF8PbFERFREWERURFBEWERQRExEWERMREhEWERIREREWEREREBEWERAPERYPDhEWDg0RFg0MERYMCxEWCwoRFgoJERYJCBEWCAcRFgcGERYGBREWBQQRFgQDERYDAhEWAgERFgHbPDURExEUERPGfCwAWBESERMREhERERIREREQEREREA8REA8Q7xDeEM0QvBCrEJoQiRB4EGcQVlUDA/pWFFYUVhRWFFYUVhRWFFYUVhQRFBEpERQRExEoERMREhEnERIREREmEREREBElERAPESQPDhEjDg0RIg0MESEMCxEgCwoRHwoJER4JCBEdCAcRHAcGERsGBREaBQQRGQQDERgDAhEXAgERFgERFds8VxBfD2xR2zyBZoxWEMR8LgP8gQEBVhhZ9A1voZIwbd8gbpIwbY6H0Ns8bBZvBuJu8vRWGtDS/zBWGtDS/zARH1YeVh5WHlYeVh7IVVDbPMn5ABEWERcRFhEVERYRFREUERURFBETERQRExESERMREhERERIREREQEREREA8REA8Q7xDeEM0QvBCrEJoQiRB4LzAxAFjT//oA1NTTP/pAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgWFRRDMABoghD5dYmiUAfLHxXLPxPLPwH6AszMASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFgT2EGcQVhBFEDRAEwERGQERGNs8ERQRFhEUERMRFRETERIRFBESERERExERERAREhEQDxERDw4REA4Q31UcERxWF1Yb2zwFERsFBBEYBAMRFwMCERYCAREZAREVVUCBAQEGyFVQ2zzJECtWFgEgbpUwWfRaMJRBM/QV4hEUMjM0NQCscAGORyGBAQEiWfQNb6GSMG3fIG6SMG2c0NQB0AHT/1lsEm8C4iBu8tCAbyIngQEBIln0DG+hkjBt326zmyRZ+RCBP9YB8vSkkVvi5DGCALdWMiK+8vQD7hEVERgRFREUERcRFBETERYRExESERgREhERERcREREQERYREA8RGA8OERcODREWDQwRGAwLERcLChEWCgkRGAkIERcIBxEWBwYRGAYFERcFBBEWBAMRGAMCERcCAREWAREYVhfbPHABiuRbVxVXFVcVERERFBERNjc4AFZQVsv/UAP6AszMyz8BINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WAJLIAYIQuYXWiljLH4EBAc8AyciCWMAAAAAAAAAAAAAAAAEBy2fMyXD7AA0RFA0MERMMCxESCwoREQoJERAJEM8QflVmFhUQNEEwALiBAQFUTxNZ9A1voZIwbd8gbpIwbZfQ9AQBMW8B4oE43iFus/L0IG7y0IBvIYEBAVhZ9A1voZIwbd8gbpIwbZ3Q9ASBAQHXAFlsEm8C4oFhZCFus/L0IG7y0IBvIgKSgQEBVFIAUjBBM/QMb6GUAdcAMJJbbeIgbvLQgCDABuMPERQRFhEUERMRFRETERIRFBESERERExERERAREhEQDxERDw4REA5VHTk6ACwREBETERAPERIPDhERDg0REA0Qz1UrA8owERQRFhEUERMRFRETERIRFhESERERFRERERARFhEQDxEVDw4RFg4NERUNDBEWDAsRFQsKERYKCREVCQgRFggHERUHBhEWBgURFQUEERYEAxEVAwIRFgIBERUBERbbPFYZAbrjD5g7PAL+wAKO4hEUERYRFBETERURExESERYREhERERUREREQERYREA8RFQ8OERYODREVDQwRFgwLERULChEWCgkRFQkIERYIBxEVBwYRFgYFERUFBBEWBAMRFQMCERYCAREVAREWVhdWGlYajhekERYBERUBERQBERMBERIBEREBERBV0T9AAl5WF1YagWsb+CdvEPhBbyQTXwOhUyigvPL0UwagAREUAaEREyagiBJ/cEQEbW3bPD13A7hWF1YaVhqBAQFWEQJZ9A1voZIwbd8gbpIwbY6H0Ns8bBdvB+KBECEhbrPy9CBu8tCAbydsYfhBbyQQI18DbXDIydAhEFdVUMhVYNs8yYIQCrqVAH9wUAQDbW3bPEE+dwA6AAAAAEZyb20gRW1tZXQuRmluYW5jZSBCcmlkZ2UAyIIQD4p+pVAIyx8Wyz9QBPoCWCDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFgEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxYhbrOVfwHKAMyUcDLKAOIB+gIBzxYDpIEBAVYRAln0DW+hkjBt3yBukjBtjofQ2zxsF28H4oIAv8whbrPy9CBu8tCAbycQVl8G+ChtcMjJ0BA1EEbIVVDbPMmCEATEtAB/cFAEA21t2zxBQncAAuIB9tQB0AH6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIAfpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgB0weBAQHXANQB0IEBAdcA+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiDEQJxAmECUQJEMAyIIQibcdCVAHyx9QBSDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFlADINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WgQEBzwAhbrOVfwHKAMyUcDLKAOIB+gIBzxYABBAjAfBWFVYVVhVWFVYVVhVWFVYVVhVWFVYVVhVWFVYVVhVWFVYVVhVWFVYVVhURFBEqERQRExEpERMREhEoERIREREnEREREBEmERAPESUPDhEkDg0RIw0MESIMCxEhCwoRIAoJER8JCBEeCAcRHQcGERwGBREbBQQRGgRIAfBWFlYWVhZWFlYWVhZWFlYWVhZWFlYWVhZWFlYWVhZWFlYWVhZWFlYWVhYRFBErERQRExEqERMREhEpERIREREoEREREBEnERAPESYPDhElDg0RJA0MESMMCxEiCwoRIQoJESAJCBEfCAcRHgcGER0GBREcBQQRGwRKATAw0x8BghDDpb3iuvLggYEBAdcAATHbPH9MA/yOqTDTHwGCEKOnKlS68uCBgQEB1wCBAQHXAPQEgQEB1wBZECQQI2wU2zx/4CCCEGzVf9C6jr8w0x8BghBs1X/QuvLggYEBAdcAgQEB1wCBAQHXANQB0PQEgQEB1wBZAvQEgQEB1wBZMhBHEEYQRUMAbBfbPH/gIIIQDFiQhrpPUFED/AMRGQMCERgCAREXAREW2zxXEF8PbFERFREWERURFBEWERQRExEWERMREhEWERIREREWEREREBEWERAPERYPDhEWDg0RFg0MERYMCxEWCwoRFgoJERYJCBEWCAcRFgcGERYGBREWBQQRFgQDERYDAhEWAgERFgHbPBEUERURFMZ8SQA+ERMRFBETERIRExESEREREhERERAREREQDxEQD1UONQP8AxEaAwIRGQIBERgBERfbPFcQXw9sUREVERcRFREUERYRFBETERcRExESERYREhERERcREREQERYREA8RFw8OERYODREXDQwRFgwLERcLChEWCgkRFwkIERYIBxEXBwYRFgYFERcFBBEWBAMRFwMCERYCAREXAds8MBKBAQECv3xLAKQBERUBERYgbpUwWfRaMJRBM/QU4hESpCCqAHOpBKQREhEUERIRERETEREREBESERAPEREPDhEQDhDfEM4QvRCsEJsQihB5EGgQVxBGEDUQJBAjAfBWFVYVVhVWFVYVVhVWFVYVVhVWFVYVVhVWFVYVVhVWFVYVVhVWFVYVVhURFBEqERQRExEpERMREhEoERIREREnEREREBEmERAPESUPDhEkDg0RIw0MESIMCxEhCwoRIAoJER8JCBEeCAcRHQcGERwGBREbBQQRGgRNA/4DERkDAhEYAgERFwERFts8VxBfD2xRERURFhEVERQRFhEUERMRFhETERIRFhESERERFhERERARFhEQDxEWDw4RFg4NERYNDBEWDAsRFgsKERYKCREWCQgRFggHERYHBhEWBgURFgUEERYEAxEWAwIRFgIBERYB2zwwgQEBAREVv3xOAJ5tIG6VMFn0WjCUQTP0FOIRE6UgqgBzqQSkERMRFBETERIRExESEREREhERERAREREQDxEQDxDvEN4QzRC8EKsQmhCJEHgQZxBWEEUQNBAjAfBWGFYYVhhWGFYYVhhWGFYYVhhWGFYYVhhWGFYYVhhWGFYYVhhWGFYYVhgRFBEtERQRExEsERMREhErERIREREqEREREBEpERAPESgPDhEnDg0RJg0MESUMCxEkCwoRIwoJESIJCBEhCAcRIAcGER8GBREeBQQRHQRSAfBWG1YbVhtWG1YbVhtWG1YbVhtWG1YbVhtWG1YbVhtWG1YbVhtWG1YbVhsRFBEwERQRExEvERMREhEuERIREREtEREREBEsERAPESsPDhEqDg0RKQ0MESgMCxEnCwoRJgoJESUJCBEkCAcRIwcGESIGBREhBQQRIARVBN6OpDDTHwGCEAxYkIa68uCBgQEB1wCBAQHXAIEBAdcAVSBsE9s8f+AgghC0BMgyuo6eMNMfAYIQtATIMrry4IGBAQHXAIEBAdcAWWwS2zx/4CDAACLXScEhsJJbf+AgghCUapi2uuMCIIIQCmHbWbpZWltcA/wDERwDAhEbAgERGgERGds8VxBfD2xRERURGREVERQRGBEUERMRFxETERIRFhESERERGRERERARGBEQDxEXDw4RFg4NERkNDBEYDAsRFwsKERYKCREZCQgRGAgHERcHBhEWBgURGQUEERgEAxEXAwIRFgIBERkB2zwRFBEYERS/fFMBWBETERcRExESERYREhERERUREREQERQREA8REw8OERIODRERDQwREAxVO9s8VADQVhCBAQElWfQNb6GSMG3fIG6SMG2X0PQEATFvAeIgbpQwbW8B3iBu8tCAbyECgQEBAshZAvQAgQEBzwDJQTAgbpUwWfRaMJRBM/QV4oEBAQHIAQH0AMkQPxIgbpUwWfRaMJRBM/QV4gwD/AMRHwMCER4CAREdAREc2zxXEF8PbFERFREcERURFBEbERQRExEaERMREhEZERIREREYEREREBEXERAPERYPDhEcDg0RGw0MERoMCxEZCwoRGAoJERcJCBEWCAcRHAcGERsGBREaBQQRGQQDERgDAhEXAgERFgHbPBEUERsRFL98VgF4ERMRGhETERIRGRESERERGBERERARFxEQDxEWDw4RFQ4NERQNDBETDAsREgsKEREKCREQCRCPEH5VZts8VwHuVhKBAQEoWfQNb6GSMG3fIG6SMG2X0PQEATFvAeIgbpQwbW8B3iBu8tCAbyEggQEBKFn0DW+hkjBt3yBukjBtl9D0BAExbwHiIG6UMG1vAd4gbvLQgG8hVSKBAQEGyFUwRDQC9ACBAQHPAAIC9ACBAQHPAMlDMBRYAIggbpUwWfRaMJRBM/QV4oEBAQHIAQH0AMlBMCBulTBZ9FowlEEz9BXigQEBAcgBAfQAyRA+EiBulTBZ9FowlEEz9BXiCwH0XwNWFFYUVhRWFFYUVhRWFFYUVhRWFFYUVhRWFFYUVhRWFFYUVhRWFFYUVhQRFBEpERQRExEoERMREhEnERIREREmEREREBElERAPESQPDhEjDg0RIg0MESEMCxEgCwoRHwoJER4JCBEdCAcRHAcGERsGBREaBQQRGQRdAfBWFlYWVhZWFlYWVhZWFlYWVhZWFlYWVhZWFlYWVhZWFlYWVhZWFlYWVhYRFBErERQRExEqERMREhEpERIREREoEREREBEnERAPESYPDhElDg0RJA0MESMMCxEiCwoRIQoJESAJCBEfCAcRHgcGER0GBREcBQQRGwReAVAw0x8BghCUapi2uvLggdM/ATHIAYIQr/kPV1jLH8s/yfhCAXBt2zx/YQP+jrkw0x8BghAKYdtZuvLggfpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgBgQEB1wBZbBLbPH/gIIIQUT7zXrqOuTDTHwGCEFE+81668uCB+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiAGBAQHXAFlsEts8f2JjZAIwAxEYAwIRFwIBERYBERXbPFcQXw9sUds8v3wD/AMRGgMCERkCAREYAREX2zxXEF8PbFERFREXERURFBEWERQRExEXERMREhEWERIREREXEREREBEWERAPERcPDhEWDg0RFw0MERYMCxEXCwoRFgoJERcJCBEWCAcRFwcGERYGBREXBQQRFgQDERcDAhEWAgERFwHbPBEUERYRFL98XwFIERMRFRETERIRFBESERERExERERAREhEQDxERDw4REA5VHds8YADqLoEBASNZ9A1voZIwbd8gbpIwbZfQ9AQBMW8B4oE43iFus/L0IG7y0IBvIYEBAW0gbpIwbY4SIG7y0IBvIshZAvQAgQEBzwDJ4kEwIG6VMFn0WjCUQTP0FeKBAQEByAEB9ADJED8SIG6VMFn0WjCUQTP0FeIMATptbSJus5lbIG7y0IBvIgGRMuIQJHADBIBCUCPbPHcC7BEUERYRFBETERURExESERYREhERERUREREQERYREA8RFQ8OERYODREVDQwRFgwLERULChEWCgkRFQkIERYIBxEVBwYRFgYFERUFBBEWBAMRFQMCERYCAREVAREW2zwRFBEWERQRExEVERMREhEUERIRERETERFoZQLsERQRFhEUERMRFRETERIRFhESERERFRERERARFhEQDxEVDw4RFg4NERUNDBEWDAsRFQsKERYKCREVCQgRFggHERUHBhEWBgURFQUEERYEAxEVAwIRFgIBERUBERbbPBEUERYRFBETERURExESERQREhERERMREWhpA8rgIIIQFzK+IbqOyDDTHwGCEBcyviG68uCBgQEB1wD6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIEmwSgR8L+EFvJBAjXwMixwXy9Ns8f+AgghD2LAzxuuMCwACRMOMNcGxtbgEoERAREhEQDxERDw4REA4Q31Uc2zxmAu4RFBEWERQRExEVERMREhEWERIREREVEREREBEWERAPERUPDhEWDg0RFQ0MERYMCxEVCwoRFgoJERUJCBEWCAcRFQcGERYGBREVBQQRFgQDERUDAhEWAgERFQERFlYV2zyCAIUm+EFvJBAjXwMSxwXy9CmBAQFWF41nAbxZ9A1voZIwbd8gbpIwbY4n0PQE+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiBJsEm8C4iBu8tCAbyKBAQsBERl/cSFulVtZ9FkwmMgBzwBBM/RB4oEBAREYcALeKRETERURExESERQREhERERUREREQERQREA8RFQ8OERQODREVDQwRFAwLERULChEUCgkRFQkIERQIBxEVBwYRFAYFERUFBBEUBAMRFQMCERQCAREVAREUgQEBERbbPAIRFgIBERcBWfQNb6GSMG3fwWoBKBEQERIREA8REQ8OERAOEN9VHNs8bAH6IG6SMG2OJ9D0BPpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgSbBJvAuKCANMHIW6z8vQgbvLQgG8iMIEBC/hBbyQQI18DcUEz9ApvoZQB1wAwkltt4oIA0wchbrOYASBu8tCAwP+SMXDi8vQREhEUERIRERETERFrACAREBESERAPEREPDhEQDlUdAuwRFBEWERQRExEVERMREhEWERIREREVEREREBEWERAPERUPDhEWDg0RFQ0MERYMCxEVCwoRFgoJERUJCBEWCAcRFQcGERYGBREVBQQRFgQDERUDAhEWAgERFQERFlYV2zyBbD34QW8kECNfAxLHBfL0KYEBAVYXjW8BcDDTHwGCEPYsDPG68uCBgQEB1wD6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIEmwS2zx/cQP++QEggvA6EjLdmaHztOWG/4J258U6NeX9Zxj3fF/F7YFYR63dP7qOhjDbPH/bMeAggvDvs0eWdhNuRCS9aLAWKcJumCFDoGRXlCHmEpfBaOdxkbqOhjDbPH/bMeCC8CKPzpKPrFRIYCA91HKrDgW+XbmAxClrjfONC2q+fWpPunN0dQG8WfQNb6GSMG3fIG6SMG2OJ9D0BPpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgSbBJvAuIgbvLQgG8igQELAREZcHEhbpVbWfRZMJjIAc8AQTP0QeKBAQERGHAA3shZAvQAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFskQOgIRFwIBERYBIG6VMFn0WjCUQTP0FeIREhEUERIRERETEREREBESERAPEREPDhEQDhDfEM4QvRCsEJsQigkQaBBXEEYQNUQwEgHyK4EBASNZ9A1voZIwbd8gbpIwbY4n0PQE+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiBJsEm8C4oFU5SFus/L0IG7y0IBvIjCBAQECyFkC9AABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WyRA8EnIAHiBulTBZ9FowlEEz9BXiCQHwVhRWFFYUVhRWFFYUVhRWFFYUVhRWFFYUVhRWFFYUVhRWFFYUVhRWFFYUERQRKREUERMRKBETERIRJxESERERJhERERARJREQDxEkDw4RIw4NESINDBEhDAsRIAsKER8KCREeCQgRHQgHERwHBhEbBgURGgUEERkEdgHwggDjwCiz8vRWFFYUVhRWFFYUVhRWFFYUVhRWFFYUVhRWFFYUVhRWFFYUVhRWFFYUVhQRFBEpERQRExEoERMREhEnERIREREmEREREBElERAPESQPDhEjDg0RIg0MESEMCxEgCwoRHwoJER4JCBEdCAcRHAcGERsGeQEQjoXbPH/bMeB6A3YDERgDAhEXAgERFgERFds8VxBfD2xR2zyBWgERE8IAARETAfL0+EFvJBAjXwNwgwZ/VSBtbW3bPHAREsp8dwHKyHEBygFQBwHKAHABygJQBSDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFlAD+gJwAcpoI26zkX+TJG6z4pczMwFwAcoA4w0hbrOcfwHKAAEgbvLQgAHMlTFwAcoA4skB+wB4AJh/AcoAyHABygBwAcoAJG6znX8BygAEIG7y0IBQBMyWNANwAcoA4iRus51/AcoABCBu8tCAUATMljQDcAHKAOJwAcoAAn8BygACyVjMAkQFERoFBBEZBAMRGAMCERcCAREWAREV2zxXEF8PbFHbPH84yHwB9oF0+Ciz8vRWFFYUVhRWFFYUVhRWFFYUVhRWFFYUVhRWFFYUVhRWFFYUVhRWFFYUVhQRFBEpERQRExEoERMREhEnERIREREmEREREBElERAPESQPDhEjDg0RIg0MESEMCxEgCwoRHwoJER4JCBEdCAcRHAcGERsGBREaBXsCPAQRGQQDERgDAhEXAgERFgERFds8VxBfD2xR2zxwOMh8AvKCAMTt+EFvJBAjXwMRFhEXERYRFREXERURFBEXERQRExEXERMREhEXERIREREXEREREBEXERAPERcPDhEXDg0RFw0MERcMCxEXCwoRFwoJERcJCBEXCAcRFwcGERcGBREXBQQRFwQDERcDAhEXAgERF9s8AREWAfL0hH0APBETERQRExESERMREhERERIREREQEREREA8REA9VDgIBIICBAgEgiYoCASCCgwIZtQV7Z5tniuIL4e2KMLmIAqOya0BINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiNs8ERQRFhEUERMRFRETERIRFBESERERExERERAREhEQDxERDw4REA5VHds8VxBfD2xRguYQCASCFhgDUgQEBLAJZ9A1voZIwbd8gbpIwbY4n0PQE+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiBJsEm8C4iBukltw4CBu8tCAbyIwgQELWHFBM/QKb6GUAdcAMJJbbeIgbpIwcOAgbvLQgAIZr1Ztnm2eK4gvh7YowLmHAhmt522ebZ4riC+HtijAucgAAisAAi4CASCLjAIBIJCRAmGxxHbPBEUERURFBETERQRExESERMREhERERIREREQEREREA8REA9VDts8VxBfD2xRguY0CAViOjwCagQEBKwJZ9A1voZIwbd8gbpIwbY4n0PQE+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiBJsEm8C4oFU5SFus/L0IG7y0IBvIjECGKi72zzbPFcQXw9sUbnBAhiqGds82zxXEF8PbFG5xAIBIJKTAgEglpcCGa0abZ5tniuIL4e2KMC5lAIZr0/tnm2eK4gvh7YowLmVAAIoAAItAhmsoG2ebZ4riC+HtijAucYCGa0NbZ5tniuIL4e2KMC5mAAEVhMCASCbnAIBIKytAhm3o1tnm2eK4gvh7YowuZ0CASCenwACLAIZs9f2zzbPFcQXw9sUYLmgAgEgoaIABFYRAgJ0o6QCAUimpwIXvs2zzbPFcQXw9sUYucoCF7+9s82zxXEF8PbFGLmlAARWEgIBaqipALenowTgudh6ullc9j0J2HOslQo2zQThO6xqWlbI+WZFp15b++LEcwTgQKuANwDOxymcsHVcjktlhwTgN6k73yqLLeOOp6e8CrOGTQThOy6ctWadluZ0HSzbKM3RSQIXsXtnm2eK4gvh7YowuaoCF7MbZ5tniuIL4e2KMLmrAAIlAARWFAIBIK6vAgEgtrcCA5SwsLECAViztAAPt92omhpAADACF7H7Z5tniuIL4e2KMLmyAAIjAHSpu40NWlwZnM6Ly9RbVBkd1JpazdIb1NzR1FhN1dlYW13cUZTcTFIbTMxdWdjTnVvbjFFamNudnk2gAhip49s82zxXEF8PbFG5tQAEVhACGbJNNs82zxXEF8PbFGC5uAIZszi2zzbPFcQXw9sUYLm/AAIvA4TtRNDUAfhj0gABjqLbPFcVERMRFBETERIRExESEREREhERERAREREQDxEQD1UO4Pgo1wsKgwm68uCJ2zwI0VUG2zy6u7wB9oEBAdcAgQEB1wCBAQHXANQB0IEBAdcAgQEB1wD0BPQE9ATUMND0BPQE+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiAH0BNQw0PQE0gD6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIAdQB0AGBAQHXAL0A1oEBAdcAgQEB1wD6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIAdQB0AHUAdCBAQHXAIEBAdcAgQEB1wDUMND6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIMRBIEEcQRhBFAfZtbW1tbW1tbXBwUxH4QW8kECNfAxVxgQEBAgEREAEPIG6VMFn0WjCUQTP0FOJT01YUU0dWGFYRVhFWEVYRVhFWF1YSVhJWEFYgViBWIFYgVhNWIVYUERQRGREUERMRKBETERIRFxESERERGhERERARKREQDxEhDw4RIA6+AE6BAQHXAPQE1DDQgQEB1wCBAQHXADAREhEVERIREhEUERIREhETERID/A0RHw0MER4MCxEdCwoRIgoJERwJCBEbCAcRGAcGEScGBREmBQQRJQQDESQDAhEWAgERIwERFds8VxBfD2xR+EFvJBAjXwMGERYGBBEUBAcREwcGERIGDhERDg0REA0QzxC+EK0QmxCKEFkQSBA02zxWFFYUVhRWFFYUVhRWFL/LwABEgvCimf1eaYIFskt+5qPiISeWvI23jXnRlHteXwp81OUoYgL8VhRWFFYUVhRWFFYUVhRWFFYUVhRWFFYUVhRWFBEUESkRFBETESgRExESEScREhERESYREREQESUREA8RJA8OESMODREiDQwRIQwLESALChEfCgkRHgkIER0IBxEcBwYRGwYFERoFBBEZBAMRGAMCERcCAREWAREV2zxXEF8PwcIAAnAC+GxR+EFvJBAjXwPbPFYUVhRWFFYUVhRWFFYUVhRWFFYUVhRWFFYUVhRWFFYUVhRWFFYUVhRWFBEUESkRFBETESgRExESEScREhERESYREREQESUREA8RJA8OESMODREiDQwRIQwLESALChEfCgkRHgkIER0IBxEcBwYRGwbLwwP4BREaBQQRGQQDERgDAhEXAgERFgERFds8VxBfD2xR+EFvJBAjXwPbPFYUVhRWFFYUVhRWFFYUVhRWFFYUVhRWFFYUVhRWFFYUVhRWFFYUVhRWFBEUESkRFBETESgRExESEScREhERESYREREQESUREA8RJA8OESMODREiDcTLxQBEgvBWKvNm959XIUammEE5rjk7x3nuPwg0La2s6/pjT+VX6wP0DBEhDAsRIAsKER8KCREeCQgRHQgHERwHBhEbBgURGgUEERkEAxEYAwIRFwIBERYBERXbPFcQXw9sUfhBbyQQI18D2zxWFFYUVhRWFFYUVhRWFFYUVhRWFFYUVhRWFFYUVhRWFFYUVhRWFFYUVhQRFBEpERQRExEoERPGy8cARILw4c2v0Uq4umxyEVcC01kO5yZDA/jN4HOarXYxZctkqDcD/BESEScREhERESYREREQESUREA8RJA8OESMODREiDQwRIQwLESALChEfCgkRHgkIER0IBxEcBwYRGwYFERoFBBEZBAMRGAMCERcCAREWAREV2zxXEF8PbFH4QW8kECNfA9s8VhRWFFYUVhRWFFYUVhRWFFYUVhRWFFYUVhRWFMjLyQBEgvCcZV+OcLdnywbm2lLYez5PouT6C0DZ/yyoZ/OjeYheOwL4VhRWFFYUVhRWFFYUVhQRFBEpERQRExEoERMREhEnERIREREmEREREBElERAPESQPDhEjDg0RIg0MESEMCxEgCwoRHwoJER4JCBEdCAcRHAcGERsGBREaBQQRGQQDERgDAhEXAgERFgERFds8VxBfD2xR+EFvJBAjXwPbPMrLAESC8GrWSgcdThKnHdVZ7YGQMfzfU/1AjDF2fnQTuqDhAAjAAsorgQEBI1n0DW+hkjBt3yBukjBtjifQ9AT6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIEmwSbwLiIG7jACBu8tCAbyKBAQtQA39xIW6VW1n0WTCYyAHPAEEz9EHigQEBAszNAN4wbYEBCyJ/cSFulVtZ9FkwmMgBzwBBM/RB4vhBbyQQI18DbwKBAQEhIG6SMG2OLCBu8tCAbyLIWQL0AAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxbJ4iQQPwEgbpUwWfRaMJRBM/QV4gwAbshZAvQAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFskQPBIgbpUwWfRaMJRBM/QV4gk=');
    const __system = core_1.Cell.fromBase64('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ESUREA8RJA8OESMODREiDQwRIQwLESALChEfCgkRHgkIER0IBxEcBwYRGwYAUwJEBREaBQQRGQQDERgDAhEXAgERFgERFds8VxBfD2xR2zx/OADDAKoB8FYUVhRWFFYUVhRWFFYUVhRWFFYUVhRWFFYUVhRWFFYUVhRWFFYUVhRWFBEUESkRFBETESgRExESEScREhERESYREREQESUREA8RJA8OESMODREiDQwRIQwLESALChEfCgkRHgkIER0IBxEcBwYRGwYFERoFBBEZBABVA3YDERgDAhEXAgERFgERFds8VxBfD2xR2zyBWgERE8IAARETAfL0+EFvJBAjXwNwgwZ/VSBtbW3bPHAREgDCAKoBDAFwMNMfAYIQ9iwM8bry4IGBAQHXAPpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgSbBLbPH8AVwHyK4EBASNZ9A1voZIwbd8gbpIwbY4n0PQE+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiBJsEm8C4oFU5SFus/L0IG7y0IBvIjCBAQECyFkC9AABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WyRA8EgBYAB4gbpUwWfRaMJRBM/QV4gkC7BEUERYRFBETERURExESERYREhERERUREREQERYREA8RFQ8OERYODREVDQwRFgwLERULChEWCgkRFQkIERYIBxEVBwYRFgYFERUFBBEWBAMRFQMCERYCAREVAREW2zwRFBEWERQRExEVERMREhEUERIRERETEREAYwBaASgREBESERAPEREPDhEQDhDfVRzbPABbAuwRFBEWERQRExEVERMREhEWERIREREVEREREBEWERAPERUPDhEWDg0RFQ0MERYMCxEVCwoRFgoJERUJCBEWCAcRFQcGERYGBREVBQQRFgQDERUDAhEWAgERFQERFlYV2zyBbD34QW8kECNfAxLHBfL0KYEBAVYXAGIAXAG8WfQNb6GSMG3fIG6SMG2OJ9D0BPpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgSbBJvAuIgbvLQgG8igQELAREZcHEhbpVbWfRZMJjIAc8AQTP0QeKBAQERGABhAuwRFBEWERQRExEVERMREhEWERIREREVEREREBEWERAPERUPDhEWDg0RFQ0MERYMCxEVCwoRFgoJERUJCBEWCAcRFQcGERYGBREVBQQRFgQDERUDAhEWAgERFQERFts8ERQRFhEUERMRFRETERIRFBESERERExERAGMAXgEoERAREhEQDxERDw4REA4Q31Uc2zwAXwLuERQRFhEUERMRFRETERIRFhESERERFRERERARFhEQDxEVDw4RFg4NERUNDBEWDAsRFQsKERYKCREVCQgRFggHERUHBhEWBgURFQUEERYEAxEVAwIRFgIBERUBERZWFds8ggCFJvhBbyQQI18DEscF8vQpgQEBVhcAYgBgAbxZ9A1voZIwbd8gbpIwbY4n0PQE+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiBJsEm8C4iBu8tCAbyKBAQsBERl/cSFulVtZ9FkwmMgBzwBBM/RB4oEBAREYAGEA3shZAvQAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFskQOgIRFwIBERYBIG6VMFn0WjCUQTP0FeIREhEUERIRERETEREREBESERAPEREPDhEQDhDfEM4QvRCsEJsQigkQaBBXEEYQNUQwEgCagQEBKwJZ9A1voZIwbd8gbpIwbY4n0PQE+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiBJsEm8C4oFU5SFus/L0IG7y0IBvIjEC3ikRExEVERMREhEUERIREREVEREREBEUERAPERUPDhEUDg0RFQ0MERQMCxEVCwoRFAoJERUJCBEUCAcRFQcGERQGBREVBQQRFAQDERUDAhEUAgERFQERFIEBAREW2zwCERYCAREXAVn0DW+hkjBt3wDGAGQB+iBukjBtjifQ9AT6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIEmwSbwLiggDTByFus/L0IG7y0IBvIjCBAQv4QW8kECNfA3FBM/QKb6GUAdcAMJJbbeKCANMHIW6zmAEgbvLQgMD/kjFw4vL0ERIRFBESERERExERAGUAIBEQERIREA8REQ8OERAOVR0BUDDTHwGCEJRqmLa68uCB0z8BMcgBghCv+Q9XWMsfyz/J+EIBcG3bPH8BBQHwVhZWFlYWVhZWFlYWVhZWFlYWVhZWFlYWVhZWFlYWVhZWFlYWVhZWFlYWERQRKxEUERMRKhETERIRKRESERERKBERERARJxEQDxEmDw4RJQ4NESQNDBEjDAsRIgsKESEKCREgCQgRHwgHER4HBhEdBgURHAUEERsEAGgD/AMRGgMCERkCAREYAREX2zxXEF8PbFERFREXERURFBEWERQRExEXERMREhEWERIREREXEREREBEWERAPERcPDhEWDg0RFw0MERYMCxEXCwoRFgoJERcJCBEWCAcRFwcGERYGBREXBQQRFgQDERcDAhEWAgERFwHbPBEUERYRFADKAKoAaQFIERMRFRETERIRFBESERERExERERAREhEQDxERDw4REA5VHds8AGoA6i6BAQEjWfQNb6GSMG3fIG6SMG2X0PQEATFvAeKBON4hbrPy9CBu8tCAbyGBAQFtIG6SMG2OEiBu8tCAbyLIWQL0AIEBAc8AyeJBMCBulTBZ9FowlEEz9BXigQEBAcgBAfQAyRA/EiBulTBZ9FowlEEz9BXiDAH0XwNWFFYUVhRWFFYUVhRWFFYUVhRWFFYUVhRWFFYUVhRWFFYUVhRWFFYUVhQRFBEpERQRExEoERMREhEnERIREREmEREREBElERAPESQPDhEjDg0RIg0MESEMCxEgCwoRHwoJER4JCBEdCAcRHAcGERsGBREaBQQRGQQAbAIwAxEYAwIRFwIBERYBERXbPFcQXw9sUds8AMoAqgHwVhtWG1YbVhtWG1YbVhtWG1YbVhtWG1YbVhtWG1YbVhtWG1YbVhtWG1YbERQRMBEUERMRLxETERIRLhESERERLRERERARLBEQDxErDw4RKg4NESkNDBEoDAsRJwsKESYKCRElCQgRJAgHESMHBhEiBgURIQUEESAEAG4D/AMRHwMCER4CAREdAREc2zxXEF8PbFERFREcERURFBEbERQRExEaERMREhEZERIREREYEREREBEXERAPERYPDhEcDg0RGw0MERoMCxEZCwoRGAoJERcJCBEWCAcRHAcGERsGBREaBQQRGQQDERgDAhEXAgERFgHbPBEUERsRFADKAKoAbwF4ERMRGhETERIRGRESERERGBERERARFxEQDxEWDw4RFQ4NERQNDBETDAsREgsKEREKCREQCRCPEH5VZts8AHAB7lYSgQEBKFn0DW+hkjBt3yBukjBtl9D0BAExbwHiIG6UMG1vAd4gbvLQgG8hIIEBAShZ9A1voZIwbd8gbpIwbZfQ9AQBMW8B4iBulDBtbwHeIG7y0IBvIVUigQEBBshVMEQ0AvQAgQEBzwACAvQAgQEBzwDJQzAUAHEAiCBulTBZ9FowlEEz9BXigQEBAcgBAfQAyUEwIG6VMFn0WjCUQTP0FeKBAQEByAEB9ADJED4SIG6VMFn0WjCUQTP0FeILAfBWGFYYVhhWGFYYVhhWGFYYVhhWGFYYVhhWGFYYVhhWGFYYVhhWGFYYVhgRFBEtERQRExEsERMREhErERIREREqEREREBEpERAPESgPDhEnDg0RJg0MESUMCxEkCwoRIwoJESIJCBEhCAcRIAcGER8GBREeBQQRHQQAcwP8AxEcAwIRGwIBERoBERnbPFcQXw9sUREVERkRFREUERgRFBETERcRExESERYREhERERkREREQERgREA8RFw8OERYODREZDQwRGAwLERcLChEWCgkRGQkIERgIBxEXBwYRFgYFERkFBBEYBAMRFwMCERYCAREZAds8ERQRGBEUAMoAqgB0AVgRExEXERMREhEWERIREREVEREREBEUERAPERMPDhESDg0REQ0MERAMVTvbPAB1ANBWEIEBASVZ9A1voZIwbd8gbpIwbZfQ9AQBMW8B4iBulDBtbwHeIG7y0IBvIQKBAQECyFkC9ACBAQHPAMlBMCBulTBZ9FowlEEz9BXigQEBAcgBAfQAyRA/EiBulTBZ9FowlEEz9BXiDAEwMNMfAYIQw6W94rry4IGBAQHXAAEx2zx/AHcB8FYVVhVWFVYVVhVWFVYVVhVWFVYVVhVWFVYVVhVWFVYVVhVWFVYVVhVWFREUESoRFBETESkRExESESgREhEREScREREQESYREA8RJQ8OESQODREjDQwRIgwLESELChEgCgkRHwkIER4IBxEdBwYRHAYFERsFBBEaBAB4A/4DERkDAhEYAgERFwERFts8VxBfD2xRERURFhEVERQRFhEUERMRFhETERIRFhESERERFhERERARFhEQDxEWDw4RFg4NERYNDBEWDAsRFgsKERYKCREWCQgRFggHERYHBhEWBgURFgUEERYEAxEWAwIRFgIBERYB2zwwgQEBAREVAMoAqgB5AJ5tIG6VMFn0WjCUQTP0FOIRE6UgqgBzqQSkERMRFBETERIRExESEREREhERERAREREQDxEQDxDvEN4QzRC8EKsQmhCJEHgQZxBWEEUQNBAjAfBWFlYWVhZWFlYWVhZWFlYWVhZWFlYWVhZWFlYWVhZWFlYWVhZWFlYWVhYRFBErERQRExEqERMREhEpERIREREoEREREBEnERAPESYPDhElDg0RJA0MESMMCxEiCwoRIQoJESAJCBEfCAcRHgcGER0GBREcBQQRGwQAewP8AxEaAwIRGQIBERgBERfbPFcQXw9sUREVERcRFREUERYRFBETERcRExESERYREhERERcREREQERYREA8RFw8OERYODREXDQwRFgwLERcLChEWCgkRFwkIERYIBxEXBwYRFgYFERcFBBEWBAMRFwMCERYCAREXAds8MBKBAQECAMoAqgB8AKQBERUBERYgbpUwWfRaMJRBM/QU4hESpCCqAHOpBKQREhEUERIRERETEREREBESERAPEREPDhEQDhDfEM4QvRCsEJsQihB5EGgQVxBGEDUQJBAjAfBWFVYVVhVWFVYVVhVWFVYVVhVWFVYVVhVWFVYVVhVWFVYVVhVWFVYVVhURFBEqERQRExEpERMREhEoERIREREnEREREBEmERAPESUPDhEkDg0RIw0MESIMCxEhCwoRIAoJER8JCBEeCAcRHQcGERwGBREbBQQRGgQAfgP8AxEZAwIRGAIBERcBERbbPFcQXw9sUREVERYRFREUERYRFBETERYRExESERYREhERERYREREQERYREA8RFg8OERYODREWDQwRFgwLERYLChEWCgkRFgkIERYIBxEWBwYRFgYFERYFBBEWBAMRFgMCERYCAREWAds8ERQRFREUAMQAqgB/AD4RExEUERMREhETERIRERESEREREBERERAPERAPVQ41AfBWFVYVVhVWFVYVVhVWFVYVVhVWFVYVVhVWFVYVVhVWFVYVVhVWFVYVVhURFBEqERQRExEpERMREhEoERIREREnEREREBEmERAPESUPDhEkDg0RIw0MESIMCxEhCwoRIAoJER8JCBEeCAcRHQcGERwGBREbBQQRGgQAgQP+AxEZAwIRGAIBERcBERbbPFcQXw9sUREVERYRFREUERYRFBETERYRExESERYREhERERYREREQERYREA8RFg8OERYODREWDQwRFgwLERYLChEWCgkRFgkIERYIBxEWBwYRFgYFERYFBBEWBAMRFgMCERYCAREWAds8NRETERQREwDEAKoAggBYERIRExESEREREhERERAREREQDxEQDxDvEN4QzRC8EKsQmhCJEHgQZxBWVQMB8FYVVhVWFVYVVhVWFVYVVhVWFVYVVhVWFVYVVhVWFVYVVhVWFVYVVhVWFREUESoRFBETESkRExESESgREhEREScREREQESYREA8RJQ8OESQODREjDQwRIgwLESELChEgCgkRHwkIER4IBxEdBwYRHAYFERsFBBEaBACEA/wDERkDAhEYAgERFwERFts8VxBfD2xRERURFhEVERQRFhEUERMRFhETERIRFhESERERFhERERARFhEQDxEWDw4RFg4NERYNDBEWDAsRFgsKERYKCREWCQgRFggHERYHBhEWBgURFgUEERYEAxEWAwIRFgIBERYB2zwRFBEVERQAxACqAIUAPhETERQRExESERMREhERERIREREQEREREA8REA9VDjQB8FYWVhZWFlYWVhZWFlYWVhZWFlYWVhZWFlYWVhZWFlYWVhZWFlYWVhZWFhEUESsRFBETESoRExESESkREhERESgREREQEScREA8RJg8OESUODREkDQwRIwwLESILChEhCgkRIAkIER8IBxEeBwYRHQYFERwFBBEbBACHA/4DERoDAhEZAgERGAERF9s8VxBfD2xRERURFxEVERQRFhEUERMRFxETERIRFhESERERFxERERARFhEQDxEXDw4RFg4NERcNDBEWDAsRFwsKERYKCREXCQgRFggHERcHBhEWBgURFwUEERYEAxEXAwIRFgIBERcB2zyBAQEgEEoTAMQAqgCIAJYCERcCAREYASFulVtZ9FowmMgBzwBBM/RC4hESERQREhERERMREREQERIREA8REQ8OERAOEN8QzhC9EKwQmxCKEHkIEFcQRhA1RAMB9hEUER4RFBETER0RExESERwREhERERsREREQERoREA8RGQ8OERgODREXDQwRFgwLERULChEeCgkRHQkIERwIBxEbBwYRGgYFERkFBBEYBAMRFwMCERYCAREVAREegU1QKLPy9FYUVhRWFFYUVhRWFFYUVhRWFFYUVhRWFACKA/pWFFYUVhRWFFYUVhRWFFYUVhQRFBEpERQRExEoERMREhEnERIREREmEREREBElERAPESQPDhEjDg0RIg0MESEMCxEgCwoRHwoJER4JCBEdCAcRHAcGERsGBREaBQQRGQQDERgDAhEXAgERFgERFds8VxBfD2xR2zyBZoxWEADFAKoAiwP8gQEBVhhZ9A1voZIwbd8gbpIwbY6H0Ns8bBZvBuJu8vRWGtDS/zBWGtDS/zARH1YeVh5WHlYeVh7IVVDbPMn5ABEWERcRFhEVERYRFREUERURFBETERQRExESERMREhERERIREREQEREREA8REA8Q7xDeEM0QvBCrEJoQiRB4AKEAoACMBPYQZxBWEEUQNEATAREZAREY2zwRFBEWERQRExEVERMREhEUERIRERETEREREBESERAPEREPDhEQDhDfVRwRHFYXVhvbPAURGwUEERgEAxEXAwIRFgIBERkBERVVQIEBAQbIVVDbPMkQK1YWASBulTBZ9FowlEEz9BXiERQAnwCPAI4AjQCSyAGCELmF1opYyx+BAQHPAMnIgljAAAAAAAAAAAAAAAABActnzMlw+wANERQNDBETDAsREgsKEREKCREQCRDPEH5VZhYVEDRBMABWUFbL/1AD+gLMzMs/ASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFgPuERURGBEVERQRFxEUERMRFhETERIRGBESERERFxERERARFhEQDxEYDw4RFw4NERYNDBEYDAsRFwsKERYKCREYCQgRFwgHERYHBhEYBgURFwUEERYEAxEYAwIRFwIBERYBERhWF9s8cAGK5FtXFVcVVxUREREUEREAngCRAJAALBEQERMREA8REg8OEREODREQDRDPVSsCkoEBAVRSAFIwQTP0DG+hlAHXADCSW23iIG7y0IAgwAbjDxEUERYRFBETERURExESERQREhERERMREREQERIREA8REQ8OERAOVR0AlgCSAv7AAo7iERQRFhEUERMRFRETERIRFhESERERFRERERARFhEQDxEVDw4RFg4NERUNDBEWDAsRFQsKERYKCREVCQgRFggHERUHBhEWBgURFQUEERYEAxEVAwIRFgIBERUBERZWF1YaVhqOF6QRFgERFQERFAEREwEREgEREQEREFXRAJQAkwAC4gOkgQEBVhECWfQNb6GSMG3fIG6SMG2Oh9DbPGwXbwfiggC/zCFus/L0IG7y0IBvJxBWXwb4KG1wyMnQEDUQRshVUNs8yYIQBMS0AH9wUAQDbW3bPACZAJUBDADIghCJtx0JUAfLH1AFINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WUAMg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxaBAQHPACFus5V/AcoAzJRwMsoA4gH6AgHPFgPKMBEUERYRFBETERURExESERYREhERERUREREQERYREA8RFQ8OERYODREVDQwRFgwLERULChEWCgkRFQkIERYIBxEVBwYRFgYFERUFBBEWBAMRFQMCERYCAREVAREW2zxWGQG64w8AnQCbAJcDuFYXVhpWGoEBAVYRAln0DW+hkjBt3yBukjBtjofQ2zxsF28H4oEQISFus/L0IG7y0IBvJ2xh+EFvJBAjXwNtcMjJ0CEQV1VQyFVg2zzJghAKupUAf3BQBANtbds8AJkAmAEMAMiCEA+KfqVQCMsfFss/UAT6Algg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxYBINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WIW6zlX8BygDMlHAyygDiAfoCAc8WAfbUAdAB+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiAH6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIAdMHgQEB1wDUAdCBAQHXAPpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgxECcQJhAlECQAmgAEECMCXlYXVhqBaxv4J28Q+EFvJBNfA6FTKKC88vRTBqABERQBoRETJqCIEn9wRARtbds8AJwBDAA6AAAAAEZyb20gRW1tZXQuRmluYW5jZSBCcmlkZ2UABFYTALiBAQFUTxNZ9A1voZIwbd8gbpIwbZfQ9AQBMW8B4oE43iFus/L0IG7y0IBvIYEBAVhZ9A1voZIwbd8gbpIwbZ3Q9ASBAQHXAFlsEm8C4oFhZCFus/L0IG7y0IBvIgCscAGORyGBAQEiWfQNb6GSMG3fIG6SMG2c0NQB0AHT/1lsEm8C4iBu8tCAbyIngQEBIln0DG+hkjBt326zmyRZ+RCBP9YB8vSkkVvi5DGCALdWMiK+8vQAaIIQ+XWJolAHyx8Vyz8Tyz8B+gLMzAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxYAWNP/+gDU1NM/+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiBYVFEMwAHLTHwGCEPl1iaK68uCB0z/TP/oA1NT6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIFhUUQzAB8FYVVhVWFVYVVhVWFVYVVhVWFVYVVhVWFVYVVhVWFVYVVhVWFVYVVhVWFREUESoRFBETESkRExESESgREhEREScREREQESYREA8RJQ8OESQODREjDQwRIgwLESELChEgCgkRHwkIER4IBxEdBwYRHAYFERsFBBEaBACkA/gDERkDAhEYAgERFwERFts8VxBfD2xRERURFhEVERQRFhEUERMRFhETERIRFhESERERFhERERARFhEQDxEWDw4RFg4NERYNDBEWDAsRFgsKERYKCREWCQgRFggHERYHBhEWBgURFgUEERYEAxEWAwIRFgIBERYB2zyBAQFtAMQAqgClAbwgbpIwbY6NIG7y0IBvJ8hVYNs8yeIQPxIBERcBIG6VMFn0WjCUQTP0FeIRExEUERMREhETERIRERESEREREBERERAPERAPEO8NDhC8EKsQmhCJEHgQZxBWEEUQNEEwAKkB8FYcVhxWHFYcVhxWHFYcVhxWHFYcVhxWHFYcVhxWHFYcVhxWHFYcVhxWHBEUETERFBETETARExESES8REhERES4REREQES0REA8RLA8OESsODREqDQwRKQwLESgLChEnCgkRJgkIESUIBxEkBwYRIwYFESIFBBEhBACnA/wDESADAhEfAgERHgERHds8VxBfD2xRERURHREVERQRHBEUERMRGxETERIRGhESERERGRERERARGBEQDxEXDw4RFg4NER0NDBEcDAsRGwsKERoKCREZCQgRGAgHERcHBhEWBgURHQUEERwEAxEbAwIRGgIBERkB2zwRFBEcERQAxACqAKgB0BETERsRExESERoREhERERkREREQERgREA8RFw8OERYODREVDQwRFAwLERMLChESCgkREQkIERAIVXcQZxBWEEVDMBBWEEYHgQEBCBYVQzDIVWDbPMkDERADIG6VMFn0WjCUQTP0FeINAKkA8MhQB88WyVAHzFAEINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WWCDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFssHgQEBzwACyIEBAc8AASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFskBzALyggDE7fhBbyQQI18DERYRFxEWERURFxEVERQRFxEUERMRFxETERIRFxESERERFxERERARFxEQDxEXDw4RFw4NERcNDBEXDAsRFwsKERcKCREXCQgRFwgHERcHBhEXBgURFwUEERcEAxEXAwIRFwIBERfbPAERFgHy9ACsAKsAPBETERQRExESERMREhERERIREREQEREREA8REA9VDgDUgQEBLAJZ9A1voZIwbd8gbpIwbY4n0PQE+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiBJsEm8C4iBukltw4CBu8tCAbyIwgQELWHFBM/QKb6GUAdcAMJJbbeIgbpIwcOAgbvLQgAHK0x8BghBLN8YhuvLggYEBAdcA1AHQAfpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgB0weBAQHXANQB0IEBAdcA+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiAEArgBU+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiDEQOBA3EDYQNRA0AfQRFBEZERQRExEYERMREhEXERIREREWEREREBEVERAPERkPDhEYDg0RFw0MERYMCxEVCwoRGQoJERgJCBEXCAcRFgcGERUGBREZBQQRGAQDERcDAhEWAgERFQERGYFNUCiz8vQRFKRWGQMCERcCIVYaAgERGAERGloVFACwAvpUdUNUdUPIVVDbPMn5AIEBAVMNAxEfAUEz9AxvoZQB1wAwkltt4oIAxEUhbrPy9IIA97X4QW8kE18DAiBu8tCAVh+gKaASvvL0ERURGBEVERQRFhEUERMRGBETERIRFhESERERGBERERARFhEQDxEYDw4RFg4NERgNDBEWDAC4ALEC/AsRGAsKERYKCREYCQgRFggHERgHBhEWBgURGAUEERYEAxEaAwIRGQIBERcBERyBQ174QW8kE18DIr7y9BESVhKgARETARESoBESBBEXBAMRFQMCERkCAREYAREWgQEBERzIVVDbPMkQKgERFwFWFgEgbpUwWfRaMJRBM/QV4gC4ALIApBEUyAGCEGZkCeVYyx+BAQHPAMnIgljAAAAAAAAAAAAAAAABActnzMlw+wANERQNDBETDAsREgsKEREKCREQCRCPEM4QbRBcEEsQOkkXBkSFUDMB9jVfA4IAimf4QW8kECNfAyrHBfL0ERQRFhEUERMRFRETERIRFhESERERFRERERARFhEQDxEVDw4RFg4NERUNDBEWDAsRFQsKERYKCREVCQgRFggHERUHBhEWBgURFQUEERYEAxEVAwIRFgIBERUBERaBTVAos/L0ERXTPwC0A/qBAQFUWgBSQEEz9AxvoZQB1wAwkltt4oIAxEUhbrPy9IIA97X4QW8kE18DAiBu8tCAJ6ASvvL0ERWkERXU1NQwBBEZBBNWF1AzWhUUVHVDVHVDyFVQ2zzJ+QAQRhA1RlaBAQEGyFVQ2zzJEC9S8CBulTBZ9FowlEEz9BXiDQC4ALgAtwHiMTIRFBEWERQRExEVERMREhEWERIREREVEREREBEWERAPERUPDhEWDg0RFQ0MERYMCxEVCwoRFgoJERUJCBEWCAcRFQcGERYGBREVBQQRFgQDERUDAhEWAgERFQERFoFNUCiz8vQRFdM/gQEBVFoAUkAAtgPqQTP0DG+hlAHXADCSW23iggDERSFus/L0ggD3tfhBbyQTXwMCIG7y0IAnoBK+8vQRFaQRFdTU1DAEERkEE1YXUDNaFRRUdUNUdUPIVVDbPMn5ABBGEDVGVoEBAQbIVVDbPMkQL1LwIG6VMFn0WjCUQTP0FeINALgAuAC3AI7IAYIQZmQJ5VjLH4EBAc8AyciCWMAAAAAAAAAAAAAAAAEBy2fMyXD7ABESERQREhERERMREREQERIREA8REQ8OERAOEN9VHAAaUFbL/1AD+gLMzMzLPwOE7UTQ1AH4Y9IAAY6i2zxXFRETERQRExESERMREhERERIREREQEREREA8REA9VDuD4KNcLCoMJuvLgids8CNFVBts8AMwAywC6AfZtbW1tbW1tbXBwUxH4QW8kECNfAxVxgQEBAgEREAEPIG6VMFn0WjCUQTP0FOJT01YUU0dWGFYRVhFWEVYRVhFWF1YSVhJWEFYgViBWIFYgVhNWIVYUERQRGREUERMRKBETERIRFxESERERGhERERARKREQDxEhDw4RIA4AuwP8DREfDQwRHgwLER0LChEiCgkRHAkIERsIBxEYBwYRJwYFESYFBBElBAMRJAMCERYCAREjAREV2zxXEF8PbFH4QW8kECNfAwYRFgYEERQEBxETBwYREgYOEREODREQDRDPEL4QrRCbEIoQWRBIEDTbPFYUVhRWFFYUVhRWFFYUAMoAxwC8AvxWFFYUVhRWFFYUVhRWFFYUVhRWFFYUVhRWFFYUERQRKREUERMRKBETERIRJxESERERJhERERARJREQDxEkDw4RIw4NESINDBEhDAsRIAsKER8KCREeCQgRHQgHERwHBhEbBgURGgUEERkEAxEYAwIRFwIBERYBERXbPFcQXw8AxgC9AvhsUfhBbyQQI18D2zxWFFYUVhRWFFYUVhRWFFYUVhRWFFYUVhRWFFYUVhRWFFYUVhRWFFYUVhQRFBEpERQRExEoERMREhEnERIREREmEREREBElERAPESQPDhEjDg0RIg0MESEMCxEgCwoRHwoJER4JCBEdCAcRHAcGERsGAMcAvgP4BREaBQQRGQQDERgDAhEXAgERFgERFds8VxBfD2xR+EFvJBAjXwPbPFYUVhRWFFYUVhRWFFYUVhRWFFYUVhRWFFYUVhRWFFYUVhRWFFYUVhRWFBEUESkRFBETESgRExESEScREhERESYREREQESUREA8RJA8OESMODREiDQDFAMcAvwP0DBEhDAsRIAsKER8KCREeCQgRHQgHERwHBhEbBgURGgUEERkEAxEYAwIRFwIBERYBERXbPFcQXw9sUfhBbyQQI18D2zxWFFYUVhRWFFYUVhRWFFYUVhRWFFYUVhRWFFYUVhRWFFYUVhRWFFYUVhQRFBEpERQRExEoERMAxADHAMAD/BESEScREhERESYREREQESUREA8RJA8OESMODREiDQwRIQwLESALChEfCgkRHgkIER0IBxEcBwYRGwYFERoFBBEZBAMRGAMCERcCAREWAREV2zxXEF8PbFH4QW8kECNfA9s8VhRWFFYUVhRWFFYUVhRWFFYUVhRWFFYUVhRWFADDAMcAwQL4VhRWFFYUVhRWFFYUVhQRFBEpERQRExEoERMREhEnERIREREmEREREBElERAPESQPDhEjDg0RIg0MESEMCxEgCwoRHwoJER4JCBEdCAcRHAcGERsGBREaBQQRGQQDERgDAhEXAgERFgERFds8VxBfD2xR+EFvJBAjXwPbPADCAMcARILwatZKBx1OEqcd1VntgZAx/N9T/UCMMXZ+dBO6oOEACMAARILwnGVfjnC3Z8sG5tpS2Hs+T6Lk+gtA2f8sqGfzo3mIXjsARILw4c2v0Uq4umxyEVcC01kO5yZDA/jN4HOarXYxZctkqDcARILwVirzZvefVyFGpphBOa45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');
    let builder = (0, core_1.beginCell)();
    builder.storeRef(__system);
    builder.storeUint(0, 1);
    initBridge_init_args({ $$type: 'Bridge_init_args', chain_nonce, native_coin, burner, base_uri, transfer_fee, protocol_fee, bootstrap_validator_key, bootstrap_validator_address })(builder);
    const __data = builder.endCell();
    return { code: __code, data: __data };
}
const Bridge_errors = {
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
};
const Bridge_types = [
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
];
const Bridge_getters = [
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
];
const Bridge_receivers = [
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
];
class Bridge {
    static async init(chain_nonce, native_coin, burner, base_uri, transfer_fee, protocol_fee, bootstrap_validator_key, bootstrap_validator_address) {
        return await Bridge_init(chain_nonce, native_coin, burner, base_uri, transfer_fee, protocol_fee, bootstrap_validator_key, bootstrap_validator_address);
    }
    static async fromInit(chain_nonce, native_coin, burner, base_uri, transfer_fee, protocol_fee, bootstrap_validator_key, bootstrap_validator_address) {
        const init = await Bridge_init(chain_nonce, native_coin, burner, base_uri, transfer_fee, protocol_fee, bootstrap_validator_key, bootstrap_validator_address);
        const address = (0, core_1.contractAddress)(0, init);
        return new Bridge(address, init);
    }
    static fromAddress(address) {
        return new Bridge(address);
    }
    constructor(address, init) {
        this.abi = {
            types: Bridge_types,
            getters: Bridge_getters,
            receivers: Bridge_receivers,
            errors: Bridge_errors,
        };
        this.address = address;
        this.init = init;
    }
    async send(provider, via, args, message) {
        let body = null;
        if (message && typeof message === 'object' && !(message instanceof core_1.Slice) && message.$$type === 'JettonTransferNotification') {
            body = (0, core_1.beginCell)().store(storeJettonTransferNotification(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof core_1.Slice) && message.$$type === 'JettonBurnNotification') {
            body = (0, core_1.beginCell)().store(storeJettonBurnNotification(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof core_1.Slice) && message.$$type === 'FreezeTon') {
            body = (0, core_1.beginCell)().store(storeFreezeTon(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof core_1.Slice) && message.$$type === 'MapContract') {
            body = (0, core_1.beginCell)().store(storeMapContract(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof core_1.Slice) && message.$$type === 'RemoveMappedContract') {
            body = (0, core_1.beginCell)().store(storeRemoveMappedContract(message)).endCell();
        }
        if (message === 'WithdrawFees') {
            body = (0, core_1.beginCell)().storeUint(0, 32).storeStringTail(message).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof core_1.Slice) && message.$$type === 'ReceiveInstallment') {
            body = (0, core_1.beginCell)().store(storeReceiveInstallment(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof core_1.Slice) && message.$$type === 'SetChainFee') {
            body = (0, core_1.beginCell)().store(storeSetChainFee(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof core_1.Slice) && message.$$type === 'JettonExcesses') {
            body = (0, core_1.beginCell)().store(storeJettonExcesses(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof core_1.Slice) && message.$$type === 'UpdateProtocolFee') {
            body = (0, core_1.beginCell)().store(storeUpdateProtocolFee(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof core_1.Slice) && message.$$type === 'UpdateBaseUri') {
            body = (0, core_1.beginCell)().store(storeUpdateBaseUri(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof core_1.Slice) && message.$$type === 'UpdateTransferFee') {
            body = (0, core_1.beginCell)().store(storeUpdateTransferFee(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof core_1.Slice) && message.$$type === 'AddValidator') {
            body = (0, core_1.beginCell)().store(storeAddValidator(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof core_1.Slice) && message.$$type === 'RemoveValidator') {
            body = (0, core_1.beginCell)().store(storeRemoveValidator(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof core_1.Slice) && message.$$type === 'SetIncomingStrategy') {
            body = (0, core_1.beginCell)().store(storeSetIncomingStrategy(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof core_1.Slice) && message.$$type === 'SetCrossChainStrategy') {
            body = (0, core_1.beginCell)().store(storeSetCrossChainStrategy(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof core_1.Slice) && message.$$type === 'RemoveCrossChainStrategy') {
            body = (0, core_1.beginCell)().store(storeRemoveCrossChainStrategy(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof core_1.Slice) && message.$$type === 'RemoveInternalStrategy') {
            body = (0, core_1.beginCell)().store(storeRemoveInternalStrategy(message)).endCell();
        }
        if (message === null) {
            body = new core_1.Cell();
        }
        if (message === 'Pause') {
            body = (0, core_1.beginCell)().storeUint(0, 32).storeStringTail(message).endCell();
        }
        if (message === 'Unpause') {
            body = (0, core_1.beginCell)().storeUint(0, 32).storeStringTail(message).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof core_1.Slice) && message.$$type === 'Deploy') {
            body = (0, core_1.beginCell)().store(storeDeploy(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof core_1.Slice) && message.$$type === 'GrantRole') {
            body = (0, core_1.beginCell)().store(storeGrantRole(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof core_1.Slice) && message.$$type === 'RevokeRole') {
            body = (0, core_1.beginCell)().store(storeRevokeRole(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof core_1.Slice) && message.$$type === 'RenounceRole') {
            body = (0, core_1.beginCell)().store(storeRenounceRole(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof core_1.Slice) && message.$$type === 'UpdateRoleAdmin') {
            body = (0, core_1.beginCell)().store(storeUpdateRoleAdmin(message)).endCell();
        }
        if (body === null) {
            throw new Error('Invalid message type');
        }
        await provider.internal(via, { ...args, body: body });
    }
    async getWithdrawerRoleId(provider) {
        let builder = new core_1.TupleBuilder();
        let source = (await provider.get('withdrawer_role_id', builder.build())).stack;
        let result = source.readBigNumber();
        return result;
    }
    async getPauserRoleId(provider) {
        let builder = new core_1.TupleBuilder();
        let source = (await provider.get('pauser_role_id', builder.build())).stack;
        let result = source.readBigNumber();
        return result;
    }
    async getMappingAdminRoleId(provider) {
        let builder = new core_1.TupleBuilder();
        let source = (await provider.get('mapping_admin_role_id', builder.build())).stack;
        let result = source.readBigNumber();
        return result;
    }
    async getBridgeValidatorRoleId(provider) {
        let builder = new core_1.TupleBuilder();
        let source = (await provider.get('bridge_validator_role_id', builder.build())).stack;
        let result = source.readBigNumber();
        return result;
    }
    async getManagerRoleId(provider) {
        let builder = new core_1.TupleBuilder();
        let source = (await provider.get('manager_role_id', builder.build())).stack;
        let result = source.readBigNumber();
        return result;
    }
    async getBaseUri(provider) {
        let builder = new core_1.TupleBuilder();
        let source = (await provider.get('base_uri', builder.build())).stack;
        let result = source.readString();
        return result;
    }
    async getProtocolFee(provider) {
        let builder = new core_1.TupleBuilder();
        let source = (await provider.get('protocol_fee', builder.build())).stack;
        let result = source.readBigNumber();
        return result;
    }
    async getNonce(provider) {
        let builder = new core_1.TupleBuilder();
        let source = (await provider.get('nonce', builder.build())).stack;
        let result = source.readBigNumber();
        return result;
    }
    async getNativeCoin(provider) {
        let builder = new core_1.TupleBuilder();
        let source = (await provider.get('native_coin', builder.build())).stack;
        let result = source.readBigNumber();
        return result;
    }
    async getFees(provider) {
        let builder = new core_1.TupleBuilder();
        let source = (await provider.get('fees', builder.build())).stack;
        let result = source.readBigNumber();
        return result;
    }
    async getTvl(provider) {
        let builder = new core_1.TupleBuilder();
        let source = (await provider.get('TVL', builder.build())).stack;
        let result = source.readBigNumber();
        return result;
    }
    async getChainNonce(provider) {
        let builder = new core_1.TupleBuilder();
        let source = (await provider.get('chain_nonce', builder.build())).stack;
        let result = source.readBigNumber();
        return result;
    }
    async getIncoming(provider) {
        let builder = new core_1.TupleBuilder();
        let source = (await provider.get('incoming', builder.build())).stack;
        let result = core_1.Dictionary.loadDirect(core_1.Dictionary.Keys.BigInt(257), dictValueParserIncomingTransaction(), source.readCellOpt());
        return result;
    }
    async getOutgoing(provider) {
        let builder = new core_1.TupleBuilder();
        let source = (await provider.get('outgoing', builder.build())).stack;
        let result = core_1.Dictionary.loadDirect(core_1.Dictionary.Keys.BigInt(257), dictValueParserOutgoingTransaction(), source.readCellOpt());
        return result;
    }
    async getTokens(provider) {
        let builder = new core_1.TupleBuilder();
        let source = (await provider.get('tokens', builder.build())).stack;
        let result = core_1.Dictionary.loadDirect(core_1.Dictionary.Keys.BigInt(257), dictValueParserToken(), source.readCellOpt());
        return result;
    }
    async getChainFees(provider) {
        let builder = new core_1.TupleBuilder();
        let source = (await provider.get('chain_fees', builder.build())).stack;
        let result = core_1.Dictionary.loadDirect(core_1.Dictionary.Keys.BigInt(257), core_1.Dictionary.Values.BigInt(257), source.readCellOpt());
        return result;
    }
    async getIncomingStrategy(provider) {
        let builder = new core_1.TupleBuilder();
        let source = (await provider.get('incoming_strategy', builder.build())).stack;
        let result = core_1.Dictionary.loadDirect(core_1.Dictionary.Keys.BigInt(257), dictValueParserTargetTokenToSteps(), source.readCellOpt());
        return result;
    }
    async getCrossChainStrategy(provider) {
        let builder = new core_1.TupleBuilder();
        let source = (await provider.get('cross_chain_strategy', builder.build())).stack;
        let result = core_1.Dictionary.loadDirect(core_1.Dictionary.Keys.BigInt(257), dictValueParserFromTokenToTargetTokenToCrossChainStrategy(), source.readCellOpt());
        return result;
    }
    async getHasRole(provider, address, role_id) {
        let builder = new core_1.TupleBuilder();
        builder.writeAddress(address);
        builder.writeNumber(role_id);
        let source = (await provider.get('has_role', builder.build())).stack;
        let result = source.readBoolean();
        return result;
    }
    async getRoleAdmin(provider, role_id) {
        let builder = new core_1.TupleBuilder();
        builder.writeNumber(role_id);
        let source = (await provider.get('role_admin', builder.build())).stack;
        let result = source.readAddress();
        return result;
    }
    async getAdminRoleId(provider) {
        let builder = new core_1.TupleBuilder();
        let source = (await provider.get('admin_role_id', builder.build())).stack;
        let result = source.readBigNumber();
        return result;
    }
}
exports.Bridge = Bridge;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvY29udHJhY3RzL3Rvbi9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLGFBQWE7QUFDYixvQ0FvQm1CO0FBUW5CLFNBQWdCLGNBQWMsQ0FBQyxHQUFjO0lBQ3pDLE9BQU8sQ0FBQyxPQUFnQixFQUFFLEVBQUU7UUFDeEIsSUFBSSxHQUFHLEdBQUcsT0FBTyxDQUFDO1FBQ2xCLEdBQUcsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3ZCLEdBQUcsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQzNCLENBQUMsQ0FBQztBQUNOLENBQUM7QUFORCx3Q0FNQztBQUVELFNBQWdCLGFBQWEsQ0FBQyxLQUFZO0lBQ3RDLElBQUksSUFBSSxHQUFHLEtBQUssQ0FBQztJQUNqQixJQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7SUFDM0IsSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO0lBQzNCLE9BQU8sRUFBRSxNQUFNLEVBQUUsV0FBb0IsRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsQ0FBQztBQUN0RSxDQUFDO0FBTEQsc0NBS0M7QUFFRCxTQUFTLGtCQUFrQixDQUFDLE1BQW1CO0lBQzNDLElBQUksS0FBSyxHQUFHLE1BQU0sQ0FBQyxRQUFRLEVBQUUsQ0FBQztJQUM5QixJQUFJLEtBQUssR0FBRyxNQUFNLENBQUMsUUFBUSxFQUFFLENBQUM7SUFDOUIsT0FBTyxFQUFFLE1BQU0sRUFBRSxXQUFvQixFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxDQUFDO0FBQ3RFLENBQUM7QUFFRCxTQUFTLG1CQUFtQixDQUFDLE1BQWlCO0lBQzFDLElBQUksT0FBTyxHQUFHLElBQUksbUJB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RSxTQUFTLEVBQUUsVUFBVSxFQUFFLEtBQUssRUFBRSxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxVQUFVLEVBQUUsS0FBSyxFQUFFLFFBQVEsRUFBRSxHQUFHLEVBQUUsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsVUFBVSxFQUFFLEtBQUssRUFBRSxFQUFFLENBQUMsRUFBRTtJQUM1WixFQUFFLE1BQU0sRUFBRSxnQkFBZ0IsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxDQUFDLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxNQUFNLEVBQUUsRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFFLEtBQUssRUFBRSxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsS0FBSyxFQUFFLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLFVBQVUsRUFBRSxLQUFLLEVBQUUsUUFBUSxFQUFFLEdBQUcsRUFBRSxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxVQUFVLEVBQUUsS0FBSyxFQUFFLFFBQVEsRUFBRSxHQUFHLEVBQUUsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFFLElBQUksRUFBRSxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQUUsSUFBSSxFQUFFLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxJQUFJLEVBQUUsRUFBRSxDQUFDLEVBQUU7SUFDeHFCLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsVUFBVSxFQUFFLFFBQVEsRUFBRSxDQUFDLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSxNQUFNLEVBQUUsRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFFLEtBQUssRUFBRSxRQUFRLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFFO0lBQzVKLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxRQUFRLEVBQUUsVUFBVSxFQUFFLFFBQVEsRUFBRSxDQUFDLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSxNQUFNLEVBQUUsRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFFLEtBQUssRUFBRSxRQUFRLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFFO0lBQzlKLEVBQUUsTUFBTSxFQUFFLGVBQWUsRUFBRSxRQUFRLEVBQUUsVUFBVSxFQUFFLFFBQVEsRUFBRSxDQUFDLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSxNQUFNLEVBQUUsRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFFLEtBQUssRUFBRSxRQUFRLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBRSxLQUFLLEVBQUUsRUFBRSxDQUFDLEVBQUU7SUFDL1AsRUFBRSxNQUFNLEVBQUUsZ0JBQWdCLEVBQUUsUUFBUSxFQUFFLFNBQVMsRUFBRSxRQUFRLEVBQUUsQ0FBQyxFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxLQUFLLEVBQUUsUUFBUSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQUUsS0FBSyxFQUFFLFFBQVEsRUFBRSxPQUFPLEVBQUUsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLGFBQWEsRUFBRSxNQUFNLEVBQUUsRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLEtBQUssRUFBRSxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSxFQUFFLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBRSxLQUFLLEVBQUUsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLGdCQUFnQixFQUFFLE1BQU0sRUFBRSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQUUsSUFBSSxFQUFFLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLEVBQUUsRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFFLEtBQUssRUFBRSxRQUFRLEVBQUUsT0FBTyxFQUFFLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLEVBQUUsRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsVUFBVSxFQUFFLEtBQUssRUFBRSxRQUFRLEVBQUUsV0FBVyxFQUFFLEVBQUUsQ0FBQyxFQUFFO0lBQ2p5QixFQUFFLE1BQU0sRUFBRSw0QkFBNEIsRUFBRSxRQUFRLEVBQUUsVUFBVSxFQUFFLFFBQVEsRUFBRSxDQUFDLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQUUsRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFFLEtBQUssRUFBRSxRQUFRLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsTUFBTSxFQUFFLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxLQUFLLEVBQUUsUUFBUSxFQUFFLE9BQU8sRUFBRSxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsS0FBSyxFQUFFLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLEVBQUUsRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsVUFBVSxFQUFFLEtBQUssRUFBRSxRQUFRLEVBQUUsV0FBVyxFQUFFLEVBQUUsQ0FBQyxFQUFFO0lBQzdlLEVBQUUsTUFBTSxFQUFFLFlBQVksRUFBRSxRQUFRLEVBQUUsVUFBVSxFQUFFLFFBQVEsRUFBRSxDQUFDLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQUUsRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFFLEtBQUssRUFBRSxRQUFRLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsTUFBTSxFQUFFLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxLQUFLLEVBQUUsUUFBUSxFQUFFLE9BQU8sRUFBRSxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSxFQUFFLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBRSxLQUFLLEVBQUUsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLGdCQUFnQixFQUFFLE1BQU0sRUFBRSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQUUsSUFBSSxFQUFFLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLEVBQUUsRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFFLEtBQUssRUFBRSxRQUFRLEVBQUUsT0FBTyxFQUFFLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLEVBQUUsRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsVUFBVSxFQUFFLEtBQUssRUFBRSxRQUFRLEVBQUUsV0FBVyxFQUFFLEVBQUUsQ0FBQyxFQUFFO0lBQy9yQixFQUFFLE1BQU0sRUFBRSxnQkFBZ0IsRUFBRSxRQUFRLEVBQUUsVUFBVSxFQUFFLFFBQVEsRUFBRSxDQUFDLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQUUsRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFFLEtBQUssRUFBRSxRQUFRLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFFO0lBQ3JLLEVBQUUsTUFBTSxFQUFFLHdCQUF3QixFQUFFLFFBQVEsRUFBRSxTQUFTLEVBQUUsUUFBUSxFQUFFLENBQUMsRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQUUsS0FBSyxFQUFFLFFBQVEsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxNQUFNLEVBQUUsRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFFLEtBQUssRUFBRSxRQUFRLEVBQUUsT0FBTyxFQUFFLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBRSxLQUFLLEVBQUUsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLGtCQUFrQixFQUFFLE1BQU0sRUFBRSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsS0FBSyxFQUFFLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLEVBQUUsRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFFLEtBQUssRUFBRSxRQUFRLEVBQUUsT0FBTyxFQUFFLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLEVBQUUsRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsVUFBVSxFQUFFLEtBQUssRUFBRSxRQUFRLEVBQUUsV0FBVyxFQUFFLEVBQUUsQ0FBQyxFQUFFO0lBQ2hzQixFQUFFLE1BQU0sRUFBRSx3QkFBd0IsRUFBRSxRQUFRLEVBQUUsVUFBVSxFQUFFLFFBQVEsRUFBRSxDQUFDLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQUUsRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFFLEtBQUssRUFBRSxRQUFRLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsTUFBTSxFQUFFLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxLQUFLLEVBQUUsUUFBUSxFQUFFLE9BQU8sRUFBRSxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsS0FBSyxFQUFFLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxzQkFBc0IsRUFBRSxNQUFNLEVBQUUsRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLEtBQUssRUFBRSxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSxFQUFFLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxLQUFLLEVBQUUsUUFBUSxFQUFFLE9BQU8sRUFBRSxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxFQUFFLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLFVBQVUsRUFBRSxLQUFLLEVBQUUsUUFBUSxFQUFFLFdBQVcsRUFBRSxFQUFFLENBQUMsRUFBRTtJQUN2c0IsRUFBRSxNQUFNLEVBQUUsWUFBWSxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLENBQUMsRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLE1BQU0sRUFBRSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQUUsS0FBSyxFQUFFLFFBQVEsRUFBRSxPQUFPLEVBQUUsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLEtBQUssRUFBRSxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsS0FBSyxFQUFFLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLEVBQUUsRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFFLEtBQUssRUFBRSxFQUFFLENBQUMsRUFBRTtJQUNyYixFQUFFLE1BQU0sRUFBRSxZQUFZLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsQ0FBQyxFQUFFLE1BQU0sRUFBRSxjQUFjLEVBQUUsTUFBTSxFQUFFLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxLQUFLLEVBQUUsUUFBUSxFQUFFLE9BQU8sRUFBRSxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQUUsS0FBSyxFQUFFLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxlQUFlLEVBQUUsTUFBTSxFQUFFLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBRSxLQUFLLEVBQUUsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLGdCQUFnQixFQUFFLE1BQU0sRUFBRSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQUUsS0FBSyxFQUFFLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLEVBQUUsRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFFLEtBQUssRUFBRSxFQUFFLENBQUMsRUFBRTtJQUNoaUIsRUFBRSxNQUFNLEVBQUUsWUFBWSxFQUFFLFFBQVEsRUFBRSxVQUFVLEVBQUUsUUFBUSxFQUFFLENBQUMsRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsS0FBSyxFQUFFLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBRSxLQUFLLEVBQUUsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxNQUFNLEVBQUUsRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsVUFBVSxFQUFFLEtBQUssRUFBRSxRQUFRLEVBQUUsR0FBRyxFQUFFLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLEVBQUUsRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFFLElBQUksRUFBRSxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSxFQUFFLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxLQUFLLEVBQUUsUUFBUSxFQUFFLE9BQU8sRUFBRSxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxFQUFFLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLFVBQVUsRUFBRSxLQUFLLEVBQUUsUUFBUSxFQUFFLFdBQVcsRUFBRSxFQUFFLENBQUMsRUFBRTtJQUNqcUIsRUFBRSxNQUFNLEVBQUUsYUFBYSxFQUFFLFFBQVEsRUFBRSxTQUFTLEVBQUUsUUFBUSxFQUFFLENBQUMsRUFBRSxNQUFNLEVBQUUsV0FBVyxFQUFFLE1BQU0sRUFBRSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsS0FBSyxFQUFFLEVBQUUsQ0FBQyxFQUFFO0lBQ3ZKLEVBQUUsTUFBTSxFQUFFLGFBQWEsRUFBRSxRQUFRLEVBQUUsU0FBUyxFQUFFLFFBQVEsRUFBRSxDQUFDLEVBQUUsTUFBTSxFQUFFLFdBQVcsRUFBRSxNQUFNLEVBQUUsRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLEtBQUssRUFBRSxFQUFFLENBQUMsRUFBRTtJQUN2SixFQUFFLE1BQU0sRUFBRSxXQUFXLEVBQUUsUUFBUSxFQUFFLFNBQVMsRUFBRSxRQUFRLEVBQUUsQ0FBQyxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBRSxLQUFLLEVBQUUsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSxNQUFNLEVBQUUsRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsVUFBVSxFQUFFLEtBQUssRUFBRSxRQUFRLEVBQUUsR0FBRyxFQUFFLEVBQUUsQ0FBQyxFQUFFO0lBQ3BQLEVBQUUsTUFBTSxFQUFFLFlBQVksRUFBRSxRQUFRLEVBQUUsVUFBVSxFQUFFLFFBQVEsRUFBRSxDQUFDLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLEtBQUssRUFBRSxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLE1BQU0sRUFBRSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxVQUFVLEVBQUUsS0FBSyxFQUFFLFFBQVEsRUFBRSxHQUFHLEVBQUUsRUFBRSxDQUFDLEVBQUU7SUFDdFAsRUFBRSxNQUFNLEVBQUUsY0FBYyxFQUFFLFFBQVEsRUFBRSxTQUFTLEVBQUUsUUFBUSxFQUFFLENBQUMsRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLE1BQU0sRUFBRSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxVQUFVLEVBQUUsS0FBSyxFQUFFLFFBQVEsRUFBRSxHQUFHLEVBQUUsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSxNQUFNLEVBQUUsRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLEtBQUssRUFBRSxFQUFFLENBQUMsRUFBRTtJQUM1UCxFQUFFLE1BQU0sRUFBRSxpQkFBaUIsRUFBRSxRQUFRLEVBQUUsVUFBVSxFQUFFLFFBQVEsRUFBRSxDQUFDLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSxNQUFNLEVBQUUsRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsVUFBVSxFQUFFLEtBQUssRUFBRSxRQUFRLEVBQUUsR0FBRyxFQUFFLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxXQUFXLEVBQUUsTUFBTSxFQUFFLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBRSxLQUFLLEVBQUUsRUFBRSxDQUFDLEVBQUU7SUFDbFEsRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLENBQUMsRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLFNBQVMsRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxZQUFZLEVBQUUsTUFBTSxFQUFFLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBRSxLQUFLLEVBQUUsRUFBRSxDQUFDLEVBQUU7SUFDcE8sRUFBRSxNQUFNLEVBQUUsV0FBVyxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLENBQUMsRUFBRSxNQUFNLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxFQUFFLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxLQUFLLEVBQUUsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLGlCQUFpQixFQUFFLE1BQU0sRUFBRSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQUUsS0FBSyxFQUFFLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLEVBQUUsRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFFLEtBQUssRUFBRSxFQUFFLENBQUMsRUFBRTtJQUNuVixFQUFFLE1BQU0sRUFBRSxpQkFBaUIsRUFBRSxRQUFRLEVBQUUsVUFBVSxFQUFFLFFBQVEsRUFBRSxDQUFDLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSxNQUFNLEVBQUUsRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsVUFBVSxFQUFFLEtBQUssRUFBRSxRQUFRLEVBQUUsR0FBRyxFQUFFLEVBQUUsQ0FBQyxFQUFFO0lBQ3JLLEVBQUUsTUFBTSxFQUFFLHFCQUFxQixFQUFFLFFBQVEsRUFBRSxVQUFVLEVBQUUsUUFBUSxFQUFFLENBQUMsRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLE1BQU0sRUFBRSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxVQUFVLEVBQUUsS0FBSyxFQUFFLFFBQVEsRUFBRSxHQUFHLEVBQUUsRUFBRSxDQUFDLEVBQUU7SUFDekssRUFBRSxNQUFNLEVBQUUsYUFBYSxFQUFFLFFBQVEsRUFBRSxVQUFVLEVBQUUsUUFBUSxFQUFFLENBQUMsRUFBRSxNQUFNLEVBQUUsWUFBWSxFQUFFLE1BQU0sRUFBRSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQUUsS0FBSyxFQUFFLFFBQVEsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLGNBQWMsRUFBRSxNQUFNLEVBQUUsRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFFLEtBQUssRUFBRSxRQUFRLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsTUFBTSxFQUFFLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxLQUFLLEVBQUUsUUFBUSxFQUFFLE9BQU8sRUFBRSxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsWUFBWSxFQUFFLE1BQU0sRUFBRSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQUUsS0FBSyxFQUFFLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxLQUFLLEVBQUUsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLFdBQVcsRUFBRSxNQUFNLEVBQUUsRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLEtBQUssRUFBRSxFQUFFLENBQUMsRUFBRTtJQUMxb0IsRUFBRSxNQUFNLEVBQUUsb0JBQW9CLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsQ0FBQyxFQUFFLE1BQU0sRUFBRSxXQUFXLEVBQUUsTUFBTSxFQUFFLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLFVBQVUsRUFBRSxLQUFLLEVBQUUsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFFLEtBQUssRUFBRSxRQUFRLEVBQUUsR0FBRyxFQUFFLEVBQUUsQ0FBQyxFQUFFO0lBQzFQLEVBQUUsTUFBTSxFQUFFLG9CQUFvQixFQUFFLFFBQVEsRUFBRSxVQUFVLEVBQUUsUUFBUSxFQUFFLENBQUMsRUFBRSxNQUFNLEVBQUUsYUFBYSxFQUFFLE1BQU0sRUFBRSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsTUFBTSxFQUFFLGFBQWEsRUFBRSxVQUFVLEVBQUUsS0FBSyxFQUFFLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxZQUFZLEVBQUUsTUFBTSxFQUFFLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxhQUFhLEVBQUUsS0FBSyxFQUFFLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLFVBQVUsRUFBRSxLQUFLLEVBQUUsUUFBUSxFQUFFLEdBQUcsRUFBRSxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLE1BQU0sRUFBRSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQUUsS0FBSyxFQUFFLFFBQVEsRUFBRSxHQUFHLEVBQUUsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsVUFBVSxFQUFFLEtBQUssRUFBRSxRQUFRLEVBQUUsR0FBRyxFQUFFLEVBQUUsQ0FBQyxFQUFFO0lBQ3hrQixFQUFFLE1BQU0sRUFBRSxXQUFXLEVBQUUsUUFBUSxFQUFFLFVBQVUsRUFBRSxRQUFRLEVBQUUsQ0FBQyxFQUFFLE1BQU0sRUFBRSxjQUFjLEVBQUUsTUFBTSxFQUFFLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxLQUFLLEVBQUUsUUFBUSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQUUsS0FBSyxFQUFFLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxLQUFLLEVBQUUsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLFlBQVksRUFBRSxNQUFNLEVBQUUsRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFFLEtBQUssRUFBRSxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQUUsS0FBSyxFQUFFLFFBQVEsRUFBRSxPQUFPLEVBQUUsRUFBRSxDQUFDLEVBQUU7SUFDcmhCLEVBQUUsTUFBTSxFQUFFLGFBQWEsRUFBRSxRQUFRLEVBQUUsVUFBVSxFQUFFLFFBQVEsRUFBRSxDQUFDLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQUUsRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsVUFBVSxFQUFFLEtBQUssRUFBRSxRQUFRLEVBQUUsR0FBRyxFQUFFLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxjQUFjLEVBQUUsTUFBTSxFQUFFLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLFVBQVUsRUFBRSxLQUFLLEVBQUUsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQUUsRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLEtBQUssRUFBRSxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQUUsS0FBSyxFQUFFLFFBQVEsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsVUFBVSxFQUFFLEtBQUssRUFBRSxRQUFRLEVBQUUsR0FBRyxFQUFFLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxjQUFjLEVBQUUsTUFBTSxFQUFFLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLFVBQVUsRUFBRSxLQUFLLEVBQUUsUUFBUSxFQUFFLEdBQUcsRUFBRSxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsY0FBYyxFQUFFLE1BQU0sRUFBRSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsS0FBSyxFQUFFLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSw2QkFBNkIsRUFBRSxNQUFNLEVBQUUsRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLEtBQUssRUFBRSxFQUFFLENBQUMsRUFBRTtJQUMvMUIsRUFBRSxNQUFNLEVBQUUsYUFBYSxFQUFFLFFBQVEsRUFBRSxVQUFVLEVBQUUsUUFBUSxFQUFFLENBQUMsRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQUUsS0FBSyxFQUFFLFFBQVEsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFFLEtBQUssRUFBRSxRQUFRLEVBQUUsR0FBRyxFQUFFLEVBQUUsQ0FBQyxFQUFFO0lBQ3JRLEVBQUUsTUFBTSxFQUFFLHFCQUFxQixFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLENBQUMsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQUUsS0FBSyxFQUFFLFFBQVEsRUFBRSxHQUFHLEVBQUUsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxNQUFNLEVBQUUsRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFFLEtBQUssRUFBRSxRQUFRLEVBQUUsT0FBTyxFQUFFLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxZQUFZLEVBQUUsTUFBTSxFQUFFLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxLQUFLLEVBQUUsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQUUsRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFFLEtBQUssRUFBRSxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQUUsS0FBSyxFQUFFLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLEVBQUUsRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFFLEtBQUssRUFBRSxRQUFRLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFFO0lBQzluQixFQUFFLE1BQU0sRUFBRSxxQkFBcUIsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxDQUFDLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFFLEtBQUssRUFBRSxRQUFRLEVBQUUsR0FBRyxFQUFFLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsTUFBTSxFQUFFLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxLQUFLLEVBQUUsUUFBUSxFQUFFLE9BQU8sRUFBRSxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsWUFBWSxFQUFFLE1BQU0sRUFBRSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQUUsS0FBSyxFQUFFLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxLQUFLLEVBQUUsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLGlCQUFpQixFQUFFLE1BQU0sRUFBRSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQUUsS0FBSyxFQUFFLFFBQVEsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLEtBQUssRUFBRSxFQUFFLENBQUMsRUFBRTtJQUNqb0IsRUFBRSxNQUFNLEVBQUUsZ0JBQWdCLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsQ0FBQyxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsTUFBTSxFQUFFLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxLQUFLLEVBQUUsUUFBUSxFQUFFLEdBQUcsRUFBRSxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxVQUFVLEVBQUUsS0FBSyxFQUFFLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxjQUFjLEVBQUUsTUFBTSxFQUFFLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxLQUFLLEVBQUUsUUFBUSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxVQUFVLEVBQUUsS0FBSyxFQUFFLFFBQVEsRUFBRSxHQUFHLEVBQUUsRUFBRSxDQUFDLEVBQUU7SUFDcmMsRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLENBQUMsRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxVQUFVLEVBQUUsS0FBSyxFQUFFLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUUsTUFBTSxFQUFFLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBRSxLQUFLLEVBQUUsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLGNBQWMsRUFBRSxNQUFNLEVBQUUsRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLEtBQUssRUFBRSxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQUUsS0FBSyxFQUFFLFFBQVEsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsVUFBVSxFQUFFLEtBQUssRUFBRSxRQUFRLEVBQUUsR0FBRyxFQUFFLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxjQUFjLEVBQUUsTUFBTSxFQUFFLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLFVBQVUsRUFBRSxLQUFLLEVBQUUsUUFBUSxFQUFFLEdBQUcsRUFBRSxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsNkJBQTZCLEVBQUUsTUFBTSxFQUFFLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBRSxLQUFLLEVBQUUsRUFBRSxDQUFDLEVBQUU7SUFDcnVCLEVBQUUsTUFBTSxFQUFFLGVBQWUsRUFBRSxRQUFRLEVBQUUsVUFBVSxFQUFFLFFBQVEsRUFBRSxDQUFDLEVBQUUsTUFBTSxFQUFFLGNBQWMsRUFBRSxNQUFNLEVBQUUsRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsVUFBVSxFQUFFLEtBQUssRUFBRSxFQUFFLENBQUMsRUFBRTtJQUM1SixFQUFFLE1BQU0sRUFBRSxtQkFBbUIsRUFBRSxRQUFRLEVBQUUsVUFBVSxFQUFFLFFBQVEsRUFBRSxDQUFDLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSxNQUFNLEVBQUUsRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsVUFBVSxFQUFFLEtBQUssRUFBRSxRQUFRLEVBQUUsR0FBRyxFQUFFLEVBQUUsQ0FBQyxFQUFFO0lBQ3ZLLEVBQUUsTUFBTSxFQUFFLHNCQUFzQixFQUFFLFFBQVEsRUFBRSxVQUFVLEVBQUUsUUFBUSxFQUFFLENBQUMsRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQUUsS0FBSyxFQUFFLFFBQVEsRUFBRSxHQUFHLEVBQUUsRUFBRSxDQUFDLEVBQUU7SUFDNUssRUFBRSxNQUFNLEVBQUUsWUFBWSxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLENBQUMsRUFBRSxNQUFNLEVBQUUsWUFBWSxFQUFFLE1BQU0sRUFBRSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLGFBQWEsRUFBRSxLQUFLLEVBQUUsRUFBRSxDQUFDLEVBQUU7SUFDaEssRUFBRSxNQUFNLEVBQUUsMkJBQTJCLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsQ0FBQyxFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxhQUFhLEVBQUUsS0FBSyxFQUFFLEVBQUUsQ0FBQyxFQUFFO0lBQzFMLEVBQUUsTUFBTSxFQUFFLHlCQUF5QixFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLENBQUMsRUFBRSxNQUFNLEVBQUUsWUFBWSxFQUFFLE1BQU0sRUFBRSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxPQUFPLEVBQUUsMkJBQTJCLEVBQUUsYUFBYSxFQUFFLEtBQUssRUFBRSxFQUFFLENBQUMsRUFBRTtJQUNqTSxFQUFFLE1BQU0sRUFBRSxvQkFBb0IsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxDQUFDLEVBQUUsTUFBTSxFQUFFLEdBQUcsRUFBRSxNQUFNLEVBQUUsRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxhQUFhLEVBQUUsS0FBSyxFQUFFLEVBQUUsQ0FBQyxFQUFFO0lBQy9KLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxDQUFDLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRSxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxVQUFVLEVBQUUsS0FBSyxFQUFFLFFBQVEsRUFBRSxHQUFHLEVBQUUsRUFBRSxDQUFDLEVBQUU7SUFDak8sRUFBRSxNQUFNLEVBQUUsb0JBQW9CLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsQ0FBQyxFQUFFLE1BQU0sRUFBRSxhQUFhLEVBQUUsTUFBTSxFQUFFLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLFVBQVUsRUFBRSxLQUFLLEVBQUUsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLGVBQWUsRUFBRSxNQUFNLEVBQUUsRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsVUFBVSxFQUFFLEtBQUssRUFBRSxFQUFFLENBQUMsRUFBRTtJQUN4UCxFQUFFLE1BQU0sRUFBRSxpQ0FBaUMsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxDQUFDLEVBQUUsTUFBTSxFQUFFLEdBQUcsRUFBRSxNQUFNLEVBQUUsRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsT0FBTyxFQUFFLG9CQUFvQixFQUFFLGFBQWEsRUFBRSxLQUFLLEVBQUUsRUFBRSxDQUFDLEVBQUU7SUFDekwsRUFBRSxNQUFNLEVBQUUsNENBQTRDLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsQ0FBQyxFQUFFLE1BQU0sRUFBRSxHQUFHLEVBQUUsTUFBTSxFQUFFLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLE9BQU8sRUFBRSxpQ0FBaUMsRUFBRSxhQUFhLEVBQUUsS0FBSyxFQUFFLEVBQUUsQ0FBQyxFQUFFO0lBQ2pOLEVBQUUsTUFBTSxFQUFFLG1CQUFtQixFQUFFLFFBQVEsRUFBRSxTQUFTLEVBQUUsUUFBUSxFQUFFLENBQUMsRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLE1BQU0sRUFBRSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxVQUFVLEVBQUUsS0FBSyxFQUFFLFFBQVEsRUFBRSxHQUFHLEVBQUUsRUFBRSxDQUFDLEVBQUU7SUFDdEssRUFBRSxNQUFNLEVBQUUsY0FBYyxFQUFFLFFBQVEsRUFBRSxVQUFVLEVBQUUsUUFBUSxFQUFFLENBQUMsRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxVQUFVLEVBQUUsS0FBSyxFQUFFLFFBQVEsRUFBRSxHQUFHLEVBQUUsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSxNQUFNLEVBQUUsRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLEtBQUssRUFBRSxFQUFFLENBQUMsRUFBRTtJQUN6UCxFQUFFLE1BQU0sRUFBRSxpQkFBaUIsRUFBRSxRQUFRLEVBQUUsVUFBVSxFQUFFLFFBQVEsRUFBRSxDQUFDLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsVUFBVSxFQUFFLEtBQUssRUFBRSxRQUFRLEVBQUUsR0FBRyxFQUFFLEVBQUUsQ0FBQyxFQUFFO0lBQ2pLLEVBQUUsTUFBTSxFQUFFLHFCQUFxQixFQUFFLFFBQVEsRUFBRSxVQUFVLEVBQUUsUUFBUSxFQUFFLENBQUMsRUFBRSxNQUFNLEVBQUUsWUFBWSxFQUFFLE1BQU0sRUFBRSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxVQUFVLEVBQUUsS0FBSyxFQUFFLFFBQVEsRUFBRSxHQUFHLEVBQUUsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLGNBQWMsRUFBRSxNQUFNLEVBQUUsRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsVUFBVSxFQUFFLEtBQUssRUFBRSxRQUFRLEVBQUUsR0FBRyxFQUFFLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLFVBQVUsRUFBRSxLQUFLLEVBQUUsRUFBRSxDQUFDLEVBQUU7SUFDOVcsRUFBRSxNQUFNLEVBQUUsdUJBQXVCLEVBQUUsUUFBUSxFQUFFLFVBQVUsRUFBRSxRQUFRLEVBQUUsQ0FBQyxFQUFFLE1BQU0sRUFBRSxjQUFjLEVBQUUsTUFBTSxFQUFFLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLFVBQVUsRUFBRSxLQUFLLEVBQUUsUUFBUSxFQUFFLEdBQUcsRUFBRSxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsWUFBWSxFQUFFLE1BQU0sRUFBRSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxVQUFVLEVBQUUsS0FBSyxFQUFFLFFBQVEsRUFBRSxHQUFHLEVBQUUsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLGNBQWMsRUFBRSxNQUFNLEVBQUUsRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsVUFBVSxFQUFFLEtBQUssRUFBRSxRQUFRLEVBQUUsR0FBRyxFQUFFLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxhQUFhLEVBQUUsTUFBTSxFQUFFLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLFVBQVUsRUFBRSxLQUFLLEVBQUUsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLGVBQWUsRUFBRSxNQUFNLEVBQUUsRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsVUFBVSxFQUFFLEtBQUssRUFBRSxFQUFFLENBQUMsRUFBRTtJQUNoa0IsRUFBRSxNQUFNLEVBQUUsd0JBQXdCLEVBQUUsUUFBUSxFQUFFLFVBQVUsRUFBRSxRQUFRLEVBQUUsQ0FBQyxFQUFFLE1BQU0sRUFBRSxZQUFZLEVBQUUsTUFBTSxFQUFFLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLFVBQVUsRUFBRSxLQUFLLEVBQUUsUUFBUSxFQUFFLEdBQUcsRUFBRSxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsY0FBYyxFQUFFLE1BQU0sRUFBRSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxVQUFVLEVBQUUsS0FBSyxFQUFFLFFBQVEsRUFBRSxHQUFHLEVBQUUsRUFBRSxDQUFDLEVBQUU7SUFDMVIsRUFBRSxNQUFNLEVBQUUsMEJBQTBCLEVBQUUsUUFBUSxFQUFFLFNBQVMsRUFBRSxRQUFRLEVBQUUsQ0FBQyxFQUFFLE1BQU0sRUFBRSxjQUFjLEVBQUUsTUFBTSxFQUFFLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLFVBQVUsRUFBRSxLQUFLLEVBQUUsUUFBUSxFQUFFLEdBQUcsRUFBRSxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsWUFBWSxFQUFFLE1BQU0sRUFBRSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxVQUFVLEVBQUUsS0FBSyxFQUFFLFFBQVEsRUFBRSxHQUFHLEVBQUUsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLGNBQWMsRUFBRSxNQUFNLEVBQUUsRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsVUFBVSxFQUFFLEtBQUssRUFBRSxRQUFRLEVBQUUsR0FBRyxFQUFFLEVBQUUsQ0FBQyxFQUFFO0NBQ3pZLENBQUE7QUFFRCxNQUFNLGNBQWMsR0FBZ0I7SUFDaEMsRUFBRSxNQUFNLEVBQUUsb0JBQW9CLEVBQUUsV0FBVyxFQUFFLEVBQUUsRUFBRSxZQUFZLEVBQUUsRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsVUFBVSxFQUFFLEtBQUssRUFBRSxRQUFRLEVBQUUsR0FBRyxFQUFFLEVBQUU7SUFDdEksRUFBRSxNQUFNLEVBQUUsZ0JBQWdCLEVBQUUsV0FBVyxFQUFFLEVBQUUsRUFBRSxZQUFZLEVBQUUsRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsVUFBVSxFQUFFLEtBQUssRUFBRSxRQUFRLEVBQUUsR0FBRyxFQUFFLEVBQUU7SUFDbEksRUFBRSxNQUFNLEVBQUUsdUJBQXVCLEVBQUUsV0FBVyxFQUFFLEVBQUUsRUFBRSxZQUFZLEVBQUUsRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsVUFBVSxFQUFFLEtBQUssRUFBRSxRQUFRLEVBQUUsR0FBRyxFQUFFLEVBQUU7SUFDekksRUFBRSxNQUFNLEVBQUUsMEJBQTBCLEVBQUUsV0FBVyxFQUFFLEVBQUUsRUFBRSxZQUFZLEVBQUUsRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsVUFBVSxFQUFFLEtBQUssRUFBRSxRQUFRLEVBQUUsR0FBRyxFQUFFLEVBQUU7SUFDNUksRUFBRSxNQUFNLEVBQUUsaUJBQWlCLEVBQUUsV0FBVyxFQUFFLEVBQUUsRUFB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QUFLLENBQUMsNkJBQTZCLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxPQUFPLEVBQUUsQ0FBQztRQUMvRSxDQUFDO1FBQ0QsSUFBSSxPQUFPLElBQUksT0FBTyxPQUFPLEtBQUssUUFBUSxJQUFJLENBQUMsQ0FBQyxPQUFPLFlBQVksWUFBSyxDQUFDLElBQUksT0FBTyxDQUFDLE1BQU0sS0FBSyx3QkFBd0IsRUFBRSxDQUFDO1lBQ3ZILElBQUksR0FBRyxJQUFBLGdCQUFTLEdBQUUsQ0FBQyxLQUFLLENBQUMsMkJBQTJCLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxPQUFPLEVBQUUsQ0FBQztRQUM3RSxDQUFDO1FBQ0QsSUFBSSxPQUFPLEtBQUssSUFBSSxFQUFFLENBQUM7WUFDbkIsSUFBSSxHQUFHLElBQUksV0FBSSxFQUFFLENBQUM7UUFDdEIsQ0FBQztRQUNELElBQUksT0FBTyxLQUFLLE9BQU8sRUFBRSxDQUFDO1lBQ3RCLElBQUksR0FBRyxJQUFBLGdCQUFTLEdBQUUsQ0FBQyxTQUFTLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLGVBQWUsQ0FBQyxPQUFPLENBQUMsQ0FBQyxPQUFPLEVBQUUsQ0FBQztRQUMzRSxDQUFDO1FBQ0QsSUFBSSxPQUFPLEtBQUssU0FBUyxFQUFFLENBQUM7WUFDeEIsSUFBSSxHQUFHLElBQUEsZ0JBQVMsR0FBRSxDQUFDLFNBQVMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsZUFBZSxDQUFDLE9BQU8sQ0FBQyxDQUFDLE9BQU8sRUFBRSxDQUFDO1FBQzNFLENBQUM7UUFDRCxJQUFJLE9BQU8sSUFBSSxPQUFPLE9BQU8sS0FBSyxRQUFRLElBQUksQ0FBQyxDQUFDLE9BQU8sWUFBWSxZQUFLLENBQUMsSUFBSSxPQUFPLENBQUMsTUFBTSxLQUFLLFFBQVEsRUFBRSxDQUFDO1lBQ3ZHLElBQUksR0FBRyxJQUFBLGdCQUFTLEdBQUUsQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsT0FBTyxFQUFFLENBQUM7UUFDN0Qs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