"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadGrantPauserRole = exports.storeGrantPauserRole = exports.loadGrantMappingAdminRole = exports.storeGrantMappingAdminRole = exports.loadGrantBridgeValidatorRole = exports.storeGrantBridgeValidatorRole = exports.loadRevokeWithdrawerRole = exports.storeRevokeWithdrawerRole = exports.loadRevokePauserRole = exports.storeRevokePauserRole = exports.loadRevokeMappingAdminRole = exports.storeRevokeMappingAdminRole = exports.loadRevokeBridgeValidatorRole = exports.storeRevokeBridgeValidatorRole = exports.loadUpdateBridgeAdmin = exports.storeUpdateBridgeAdmin = exports.loadUpdateOwner = exports.storeUpdateOwner = exports.loadUpdateAdmin = exports.storeUpdateAdmin = exports.loadJettonMint = exports.storeJettonMint = exports.loadJettonData = exports.storeJettonData = exports.loadWalletData = exports.storeWalletData = exports.loadJettonBurnNotification = exports.storeJettonBurnNotification = exports.loadJettonInternalTransfer = exports.storeJettonInternalTransfer = exports.loadJettonExcesses = exports.storeJettonExcesses = exports.loadJettonBurn = exports.storeJettonBurn = exports.loadJettonTransferNotification = exports.storeJettonTransferNotification = exports.loadJettonTransfer = exports.storeJettonTransfer = exports.loadFactoryDeploy = exports.storeFactoryDeploy = exports.loadDeployOk = exports.storeDeployOk = exports.loadDeploy = exports.storeDeploy = exports.loadSendParameters = exports.storeSendParameters = exports.loadContext = exports.storeContext = exports.loadStateInit = exports.storeStateInit = void 0;
exports.Bridge = exports.loadUpdateProtocolFee = exports.storeUpdateProtocolFee = exports.loadRemoveWrappedMappedContract = exports.storeRemoveWrappedMappedContract = exports.loadRemoveNativeMappedContract = exports.storeRemoveNativeMappedContract = exports.loadUpdateTransferFee = exports.storeUpdateTransferFee = exports.loadUpdateBaseUri = exports.storeUpdateBaseUri = exports.loadTokenSymbol = exports.storeTokenSymbol = exports.loadChainName = exports.storeChainName = exports.loadToken = exports.storeToken = exports.loadInstallmentOut = exports.storeInstallmentOut = exports.loadInstallmentIn = exports.storeInstallmentIn = exports.loadSetChainFee = exports.storeSetChainFee = exports.loadReceiveInstallment = exports.storeReceiveInstallment = exports.loadUpdateChain = exports.storeUpdateChain = exports.loadAddChain = exports.storeAddChain = exports.loadMapWrappedContract = exports.storeMapWrappedContract = exports.loadMapNativeContract = exports.storeMapNativeContract = exports.loadFreezeTon = exports.storeFreezeTon = exports.loadReceivedInstallment = exports.storeReceivedInstallment = exports.loadSendInstallment = exports.storeSendInstallment = exports.loadTokenType = exports.storeTokenType = exports.loadGrantWithdrawerRole = exports.storeGrantWithdrawerRole = void 0;
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
    return { $$type: "StateInit", code: _code, data: _data };
}
exports.loadStateInit = loadStateInit;
function loadTupleStateInit(source) {
    let _code = source.readCell();
    let _data = source.readCell();
    return { $$type: "StateInit", code: _code, data: _data };
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
        },
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
    return {
        $$type: "Context",
        bounced: _bounced,
        sender: _sender,
        value: _value,
        raw: _raw,
    };
}
exports.loadContext = loadContext;
function loadTupleContext(source) {
    let _bounced = source.readBoolean();
    let _sender = source.readAddress();
    let _value = source.readBigNumber();
    let _raw = source.readCell();
    return {
        $$type: "Context",
        bounced: _bounced,
        sender: _sender,
        value: _value,
        raw: _raw,
    };
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
        },
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
    return {
        $$type: "SendParameters",
        bounce: _bounce,
        to: _to,
        value: _value,
        mode: _mode,
        body: _body,
        code: _code,
        data: _data,
    };
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
    return {
        $$type: "SendParameters",
        bounce: _bounce,
        to: _to,
        value: _value,
        mode: _mode,
        body: _body,
        code: _code,
        data: _data,
    };
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
        },
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
        throw Error("Invalid prefix");
    }
    let _queryId = sc_0.loadUintBig(64);
    return { $$type: "Deploy", queryId: _queryId };
}
exports.loadDeploy = loadDeploy;
function loadTupleDeploy(source) {
    let _queryId = source.readBigNumber();
    return { $$type: "Deploy", queryId: _queryId };
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
        },
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
        throw Error("Invalid prefix");
    }
    let _queryId = sc_0.loadUintBig(64);
    return { $$type: "DeployOk", queryId: _queryId };
}
exports.loadDeployOk = loadDeployOk;
function loadTupleDeployOk(source) {
    let _queryId = source.readBigNumber();
    return { $$type: "DeployOk", queryId: _queryId };
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
        },
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
        throw Error("Invalid prefix");
    }
    let _queryId = sc_0.loadUintBig(64);
    let _cashback = sc_0.loadAddress();
    return {
        $$type: "FactoryDeploy",
        queryId: _queryId,
        cashback: _cashback,
    };
}
exports.loadFactoryDeploy = loadFactoryDeploy;
function loadTupleFactoryDeploy(source) {
    let _queryId = source.readBigNumber();
    let _cashback = source.readAddress();
    return {
        $$type: "FactoryDeploy",
        queryId: _queryId,
        cashback: _cashback,
    };
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
        },
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
        throw Error("Invalid prefix");
    }
    let _query_id = sc_0.loadUintBig(64);
    let _amount = sc_0.loadCoins();
    let _destination = sc_0.loadAddress();
    let _response_destination = sc_0.loadAddress();
    let _custom_payload = sc_0.loadBit() ? sc_0.loadRef() : null;
    let _forward_ton_amount = sc_0.loadCoins();
    let _forward_payload = sc_0.asCell();
    return {
        $$type: "JettonTransfer",
        query_id: _query_id,
        amount: _amount,
        destination: _destination,
        response_destination: _response_destination,
        custom_payload: _custom_payload,
        forward_ton_amount: _forward_ton_amount,
        forward_payload: _forward_payload,
    };
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
    return {
        $$type: "JettonTransfer",
        query_id: _query_id,
        amount: _amount,
        destination: _destination,
        response_destination: _response_destination,
        custom_payload: _custom_payload,
        forward_ton_amount: _forward_ton_amount,
        forward_payload: _forward_payload,
    };
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
        },
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
        throw Error("Invalid prefix");
    }
    let _query_id = sc_0.loadUintBig(64);
    let _amount = sc_0.loadCoins();
    let _sender = sc_0.loadAddress();
    let _forward_payload = sc_0.asCell();
    return {
        $$type: "JettonTransferNotification",
        query_id: _query_id,
        amount: _amount,
        sender: _sender,
        forward_payload: _forward_payload,
    };
}
exports.loadJettonTransferNotification = loadJettonTransferNotification;
function loadTupleJettonTransferNotification(source) {
    let _query_id = source.readBigNumber();
    let _amount = source.readBigNumber();
    let _sender = source.readAddress();
    let _forward_payload = source.readCell();
    return {
        $$type: "JettonTransferNotification",
        query_id: _query_id,
        amount: _amount,
        sender: _sender,
        forward_payload: _forward_payload,
    };
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
        },
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
        throw Error("Invalid prefix");
    }
    let _query_id = sc_0.loadUintBig(64);
    let _amount = sc_0.loadCoins();
    let _response_destination = sc_0.loadAddress();
    let _custom_payload = sc_0.loadBit() ? sc_0.loadRef() : null;
    let _forward_ton_amount = sc_0.loadCoins();
    let _forward_payload = sc_0.asCell();
    return {
        $$type: "JettonBurn",
        query_id: _query_id,
        amount: _amount,
        response_destination: _response_destination,
        custom_payload: _custom_payload,
        forward_ton_amount: _forward_ton_amount,
        forward_payload: _forward_payload,
    };
}
exports.loadJettonBurn = loadJettonBurn;
function loadTupleJettonBurn(source) {
    let _query_id = source.readBigNumber();
    let _amount = source.readBigNumber();
    let _response_destination = source.readAddress();
    let _custom_payload = source.readCellOpt();
    let _forward_ton_amount = source.readBigNumber();
    let _forward_payload = source.readCell();
    return {
        $$type: "JettonBurn",
        query_id: _query_id,
        amount: _amount,
        response_destination: _response_destination,
        custom_payload: _custom_payload,
        forward_ton_amount: _forward_ton_amount,
        forward_payload: _forward_payload,
    };
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
        },
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
        throw Error("Invalid prefix");
    }
    let _query_id = sc_0.loadUintBig(64);
    return { $$type: "JettonExcesses", query_id: _query_id };
}
exports.loadJettonExcesses = loadJettonExcesses;
function loadTupleJettonExcesses(source) {
    let _query_id = source.readBigNumber();
    return { $$type: "JettonExcesses", query_id: _query_id };
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
        },
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
        throw Error("Invalid prefix");
    }
    let _query_id = sc_0.loadUintBig(64);
    let _amount = sc_0.loadCoins();
    let _from = sc_0.loadAddress();
    let _response_address = sc_0.loadAddress();
    let _forward_ton_amount = sc_0.loadCoins();
    let _forward_payload = sc_0.asCell();
    return {
        $$type: "JettonInternalTransfer",
        query_id: _query_id,
        amount: _amount,
        from: _from,
        response_address: _response_address,
        forward_ton_amount: _forward_ton_amount,
        forward_payload: _forward_payload,
    };
}
exports.loadJettonInternalTransfer = loadJettonInternalTransfer;
function loadTupleJettonInternalTransfer(source) {
    let _query_id = source.readBigNumber();
    let _amount = source.readBigNumber();
    let _from = source.readAddress();
    let _response_address = source.readAddress();
    let _forward_ton_amount = source.readBigNumber();
    let _forward_payload = source.readCell();
    return {
        $$type: "JettonInternalTransfer",
        query_id: _query_id,
        amount: _amount,
        from: _from,
        response_address: _response_address,
        forward_ton_amount: _forward_ton_amount,
        forward_payload: _forward_payload,
    };
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
        },
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
        throw Error("Invalid prefix");
    }
    let _query_id = sc_0.loadUintBig(64);
    let _amount = sc_0.loadCoins();
    let _sender = sc_0.loadAddress();
    let _response_destination = sc_0.loadAddress();
    let _forward_ton_amount = sc_0.loadCoins();
    let _forward_payload = sc_0.asCell();
    return {
        $$type: "JettonBurnNotification",
        query_id: _query_id,
        amount: _amount,
        sender: _sender,
        response_destination: _response_destination,
        forward_ton_amount: _forward_ton_amount,
        forward_payload: _forward_payload,
    };
}
exports.loadJettonBurnNotification = loadJettonBurnNotification;
function loadTupleJettonBurnNotification(source) {
    let _query_id = source.readBigNumber();
    let _amount = source.readBigNumber();
    let _sender = source.readAddress();
    let _response_destination = source.readAddress();
    let _forward_ton_amount = source.readBigNumber();
    let _forward_payload = source.readCell();
    return {
        $$type: "JettonBurnNotification",
        query_id: _query_id,
        amount: _amount,
        sender: _sender,
        response_destination: _response_destination,
        forward_ton_amount: _forward_ton_amount,
        forward_payload: _forward_payload,
    };
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
        },
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
    return {
        $$type: "WalletData",
        balance: _balance,
        owner: _owner,
        jetton: _jetton,
        jetton_wallet_code: _jetton_wallet_code,
    };
}
exports.loadWalletData = loadWalletData;
function loadTupleWalletData(source) {
    let _balance = source.readBigNumber();
    let _owner = source.readAddress();
    let _jetton = source.readAddress();
    let _jetton_wallet_code = source.readCell();
    return {
        $$type: "WalletData",
        balance: _balance,
        owner: _owner,
        jetton: _jetton,
        jetton_wallet_code: _jetton_wallet_code,
    };
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
        },
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
    return {
        $$type: "JettonData",
        total_supply: _total_supply,
        mintable: _mintable,
        admin_address: _admin_address,
        jetton_content: _jetton_content,
        jetton_wallet_code: _jetton_wallet_code,
    };
}
exports.loadJettonData = loadJettonData;
function loadTupleJettonData(source) {
    let _total_supply = source.readBigNumber();
    let _mintable = source.readBoolean();
    let _admin_address = source.readAddress();
    let _jetton_content = source.readCell();
    let _jetton_wallet_code = source.readCell();
    return {
        $$type: "JettonData",
        total_supply: _total_supply,
        mintable: _mintable,
        admin_address: _admin_address,
        jetton_content: _jetton_content,
        jetton_wallet_code: _jetton_wallet_code,
    };
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
        },
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
        throw Error("Invalid prefix");
    }
    let _origin = sc_0.loadAddress();
    let _receiver = sc_0.loadAddress();
    let _amount = sc_0.loadIntBig(257);
    let _custom_payload = sc_0.loadBit() ? sc_0.loadRef() : null;
    let _forward_ton_amount = sc_0.loadCoins();
    let _forward_payload = sc_0.asCell();
    return {
        $$type: "JettonMint",
        origin: _origin,
        receiver: _receiver,
        amount: _amount,
        custom_payload: _custom_payload,
        forward_ton_amount: _forward_ton_amount,
        forward_payload: _forward_payload,
    };
}
exports.loadJettonMint = loadJettonMint;
function loadTupleJettonMint(source) {
    let _origin = source.readAddress();
    let _receiver = source.readAddress();
    let _amount = source.readBigNumber();
    let _custom_payload = source.readCellOpt();
    let _forward_ton_amount = source.readBigNumber();
    let _forward_payload = source.readCell();
    return {
        $$type: "JettonMint",
        origin: _origin,
        receiver: _receiver,
        amount: _amount,
        custom_payload: _custom_payload,
        forward_ton_amount: _forward_ton_amount,
        forward_payload: _forward_payload,
    };
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
        },
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
        throw Error("Invalid prefix");
    }
    let _new_admin = sc_0.loadAddress();
    return { $$type: "UpdateAdmin", new_admin: _new_admin };
}
exports.loadUpdateAdmin = loadUpdateAdmin;
function loadTupleUpdateAdmin(source) {
    let _new_admin = source.readAddress();
    return { $$type: "UpdateAdmin", new_admin: _new_admin };
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
        },
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
        throw Error("Invalid prefix");
    }
    let _new_owner = sc_0.loadAddress();
    return { $$type: "UpdateOwner", new_owner: _new_owner };
}
exports.loadUpdateOwner = loadUpdateOwner;
function loadTupleUpdateOwner(source) {
    let _new_owner = source.readAddress();
    return { $$type: "UpdateOwner", new_owner: _new_owner };
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
        },
    };
}
function storeUpdateBridgeAdmin(src) {
    return (builder) => {
        let b_0 = builder;
        b_0.storeUint(3847367118, 32);
        b_0.storeAddress(src.new_admin);
    };
}
exports.storeUpdateBridgeAdmin = storeUpdateBridgeAdmin;
function loadUpdateBridgeAdmin(slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 3847367118) {
        throw Error("Invalid prefix");
    }
    let _new_admin = sc_0.loadAddress();
    return { $$type: "UpdateBridgeAdmin", new_admin: _new_admin };
}
exports.loadUpdateBridgeAdmin = loadUpdateBridgeAdmin;
function loadTupleUpdateBridgeAdmin(source) {
    let _new_admin = source.readAddress();
    return { $$type: "UpdateBridgeAdmin", new_admin: _new_admin };
}
function storeTupleUpdateBridgeAdmin(source) {
    let builder = new core_1.TupleBuilder();
    builder.writeAddress(source.new_admin);
    return builder.build();
}
function dictValueParserUpdateBridgeAdmin() {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef((0, core_1.beginCell)().store(storeUpdateBridgeAdmin(src)).endCell());
        },
        parse: (src) => {
            return loadUpdateBridgeAdmin(src.loadRef().beginParse());
        },
    };
}
function storeRevokeBridgeValidatorRole(src) {
    return (builder) => {
        let b_0 = builder;
        b_0.storeUint(1297781476, 32);
        b_0.storeAddress(src.address_to_be_revoked);
    };
}
exports.storeRevokeBridgeValidatorRole = storeRevokeBridgeValidatorRole;
function loadRevokeBridgeValidatorRole(slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1297781476) {
        throw Error("Invalid prefix");
    }
    let _address_to_be_revoked = sc_0.loadAddress();
    return {
        $$type: "RevokeBridgeValidatorRole",
        address_to_be_revoked: _address_to_be_revoked,
    };
}
exports.loadRevokeBridgeValidatorRole = loadRevokeBridgeValidatorRole;
function loadTupleRevokeBridgeValidatorRole(source) {
    let _address_to_be_revoked = source.readAddress();
    return {
        $$type: "RevokeBridgeValidatorRole",
        address_to_be_revoked: _address_to_be_revoked,
    };
}
function storeTupleRevokeBridgeValidatorRole(source) {
    let builder = new core_1.TupleBuilder();
    builder.writeAddress(source.address_to_be_revoked);
    return builder.build();
}
function dictValueParserRevokeBridgeValidatorRole() {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef((0, core_1.beginCell)().store(storeRevokeBridgeValidatorRole(src)).endCell());
        },
        parse: (src) => {
            return loadRevokeBridgeValidatorRole(src.loadRef().beginParse());
        },
    };
}
function storeRevokeMappingAdminRole(src) {
    return (builder) => {
        let b_0 = builder;
        b_0.storeUint(749574624, 32);
        b_0.storeAddress(src.address_to_be_revoked);
    };
}
exports.storeRevokeMappingAdminRole = storeRevokeMappingAdminRole;
function loadRevokeMappingAdminRole(slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 749574624) {
        throw Error("Invalid prefix");
    }
    let _address_to_be_revoked = sc_0.loadAddress();
    return {
        $$type: "RevokeMappingAdminRole",
        address_to_be_revoked: _address_to_be_revoked,
    };
}
exports.loadRevokeMappingAdminRole = loadRevokeMappingAdminRole;
function loadTupleRevokeMappingAdminRole(source) {
    let _address_to_be_revoked = source.readAddress();
    return {
        $$type: "RevokeMappingAdminRole",
        address_to_be_revoked: _address_to_be_revoked,
    };
}
function storeTupleRevokeMappingAdminRole(source) {
    let builder = new core_1.TupleBuilder();
    builder.writeAddress(source.address_to_be_revoked);
    return builder.build();
}
function dictValueParserRevokeMappingAdminRole() {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef((0, core_1.beginCell)().store(storeRevokeMappingAdminRole(src)).endCell());
        },
        parse: (src) => {
            return loadRevokeMappingAdminRole(src.loadRef().beginParse());
        },
    };
}
function storeRevokePauserRole(src) {
    return (builder) => {
        let b_0 = builder;
        b_0.storeUint(3801506133, 32);
        b_0.storeAddress(src.address_to_be_revoked);
    };
}
exports.storeRevokePauserRole = storeRevokePauserRole;
function loadRevokePauserRole(slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 3801506133) {
        throw Error("Invalid prefix");
    }
    let _address_to_be_revoked = sc_0.loadAddress();
    return {
        $$type: "RevokePauserRole",
        address_to_be_revoked: _address_to_be_revoked,
    };
}
exports.loadRevokePauserRole = loadRevokePauserRole;
function loadTupleRevokePauserRole(source) {
    let _address_to_be_revoked = source.readAddress();
    return {
        $$type: "RevokePauserRole",
        address_to_be_revoked: _address_to_be_revoked,
    };
}
function storeTupleRevokePauserRole(source) {
    let builder = new core_1.TupleBuilder();
    builder.writeAddress(source.address_to_be_revoked);
    return builder.build();
}
function dictValueParserRevokePauserRole() {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef((0, core_1.beginCell)().store(storeRevokePauserRole(src)).endCell());
        },
        parse: (src) => {
            return loadRevokePauserRole(src.loadRef().beginParse());
        },
    };
}
function storeRevokeWithdrawerRole(src) {
    return (builder) => {
        let b_0 = builder;
        b_0.storeUint(3011775919, 32);
        b_0.storeAddress(src.address_to_be_revoked);
    };
}
exports.storeRevokeWithdrawerRole = storeRevokeWithdrawerRole;
function loadRevokeWithdrawerRole(slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 3011775919) {
        throw Error("Invalid prefix");
    }
    let _address_to_be_revoked = sc_0.loadAddress();
    return {
        $$type: "RevokeWithdrawerRole",
        address_to_be_revoked: _address_to_be_revoked,
    };
}
exports.loadRevokeWithdrawerRole = loadRevokeWithdrawerRole;
function loadTupleRevokeWithdrawerRole(source) {
    let _address_to_be_revoked = source.readAddress();
    return {
        $$type: "RevokeWithdrawerRole",
        address_to_be_revoked: _address_to_be_revoked,
    };
}
function storeTupleRevokeWithdrawerRole(source) {
    let builder = new core_1.TupleBuilder();
    builder.writeAddress(source.address_to_be_revoked);
    return builder.build();
}
function dictValueParserRevokeWithdrawerRole() {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef((0, core_1.beginCell)().store(storeRevokeWithdrawerRole(src)).endCell());
        },
        parse: (src) => {
            return loadRevokeWithdrawerRole(src.loadRef().beginParse());
        },
    };
}
function storeGrantBridgeValidatorRole(src) {
    return (builder) => {
        let b_0 = builder;
        b_0.storeUint(1023274182, 32);
        b_0.storeAddress(src.address);
    };
}
exports.storeGrantBridgeValidatorRole = storeGrantBridgeValidatorRole;
function loadGrantBridgeValidatorRole(slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1023274182) {
        throw Error("Invalid prefix");
    }
    let _address = sc_0.loadAddress();
    return { $$type: "GrantBridgeValidatorRole", address: _address };
}
exports.loadGrantBridgeValidatorRole = loadGrantBridgeValidatorRole;
function loadTupleGrantBridgeValidatorRole(source) {
    let _address = source.readAddress();
    return { $$type: "GrantBridgeValidatorRole", address: _address };
}
function storeTupleGrantBridgeValidatorRole(source) {
    let builder = new core_1.TupleBuilder();
    builder.writeAddress(source.address);
    return builder.build();
}
function dictValueParserGrantBridgeValidatorRole() {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef((0, core_1.beginCell)().store(storeGrantBridgeValidatorRole(src)).endCell());
        },
        parse: (src) => {
            return loadGrantBridgeValidatorRole(src.loadRef().beginParse());
        },
    };
}
function storeGrantMappingAdminRole(src) {
    return (builder) => {
        let b_0 = builder;
        b_0.storeUint(3374741213, 32);
        b_0.storeAddress(src.address);
    };
}
exports.storeGrantMappingAdminRole = storeGrantMappingAdminRole;
function loadGrantMappingAdminRole(slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 3374741213) {
        throw Error("Invalid prefix");
    }
    let _address = sc_0.loadAddress();
    return { $$type: "GrantMappingAdminRole", address: _address };
}
exports.loadGrantMappingAdminRole = loadGrantMappingAdminRole;
function loadTupleGrantMappingAdminRole(source) {
    let _address = source.readAddress();
    return { $$type: "GrantMappingAdminRole", address: _address };
}
function storeTupleGrantMappingAdminRole(source) {
    let builder = new core_1.TupleBuilder();
    builder.writeAddress(source.address);
    return builder.build();
}
function dictValueParserGrantMappingAdminRole() {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef((0, core_1.beginCell)().store(storeGrantMappingAdminRole(src)).endCell());
        },
        parse: (src) => {
            return loadGrantMappingAdminRole(src.loadRef().beginParse());
        },
    };
}
function storeGrantPauserRole(src) {
    return (builder) => {
        let b_0 = builder;
        b_0.storeUint(835048487, 32);
        b_0.storeAddress(src.address);
    };
}
exports.storeGrantPauserRole = storeGrantPauserRole;
function loadGrantPauserRole(slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 835048487) {
        throw Error("Invalid prefix");
    }
    let _address = sc_0.loadAddress();
    return { $$type: "GrantPauserRole", address: _address };
}
exports.loadGrantPauserRole = loadGrantPauserRole;
function loadTupleGrantPauserRole(source) {
    let _address = source.readAddress();
    return { $$type: "GrantPauserRole", address: _address };
}
function storeTupleGrantPauserRole(source) {
    let builder = new core_1.TupleBuilder();
    builder.writeAddress(source.address);
    return builder.build();
}
function dictValueParserGrantPauserRole() {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef((0, core_1.beginCell)().store(storeGrantPauserRole(src)).endCell());
        },
        parse: (src) => {
            return loadGrantPauserRole(src.loadRef().beginParse());
        },
    };
}
function storeGrantWithdrawerRole(src) {
    return (builder) => {
        let b_0 = builder;
        b_0.storeUint(1198756930, 32);
        b_0.storeAddress(src.address);
    };
}
exports.storeGrantWithdrawerRole = storeGrantWithdrawerRole;
function loadGrantWithdrawerRole(slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1198756930) {
        throw Error("Invalid prefix");
    }
    let _address = sc_0.loadAddress();
    return { $$type: "GrantWithdrawerRole", address: _address };
}
exports.loadGrantWithdrawerRole = loadGrantWithdrawerRole;
function loadTupleGrantWithdrawerRole(source) {
    let _address = source.readAddress();
    return { $$type: "GrantWithdrawerRole", address: _address };
}
function storeTupleGrantWithdrawerRole(source) {
    let builder = new core_1.TupleBuilder();
    builder.writeAddress(source.address);
    return builder.build();
}
function dictValueParserGrantWithdrawerRole() {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef((0, core_1.beginCell)().store(storeGrantWithdrawerRole(src)).endCell());
        },
        parse: (src) => {
            return loadGrantWithdrawerRole(src.loadRef().beginParse());
        },
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
    return {
        $$type: "TokenType",
        is_native_coin: _is_native_coin,
        is_native_token: _is_native_token,
        is_wrapped_token: _is_wrapped_token,
    };
}
exports.loadTokenType = loadTokenType;
function loadTupleTokenType(source) {
    let _is_native_coin = source.readBoolean();
    let _is_native_token = source.readBoolean();
    let _is_wrapped_token = source.readBoolean();
    return {
        $$type: "TokenType",
        is_native_coin: _is_native_coin,
        is_native_token: _is_native_token,
        is_wrapped_token: _is_wrapped_token,
    };
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
        },
    };
}
function storeSendInstallment(src) {
    return (builder) => {
        let b_0 = builder;
        b_0.storeUint(3788443406, 32);
        b_0.storeInt(src.amount, 257);
        b_0.storeInt(src.tx_id, 257);
        b_0.storeInt(src.native_chain_nonce, 257);
        let b_1 = new core_1.Builder();
        b_1.storeInt(src.target_chain, 257);
        b_1.storeInt(src.token_id, 257);
        b_1.storeRef(src.destination_address);
        b_0.storeRef(b_1.endCell());
    };
}
exports.storeSendInstallment = storeSendInstallment;
function loadSendInstallment(slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 3788443406) {
        throw Error("Invalid prefix");
    }
    let _amount = sc_0.loadIntBig(257);
    let _tx_id = sc_0.loadIntBig(257);
    let _native_chain_nonce = sc_0.loadIntBig(257);
    let sc_1 = sc_0.loadRef().beginParse();
    let _target_chain = sc_1.loadIntBig(257);
    let _token_id = sc_1.loadIntBig(257);
    let _destination_address = sc_1.loadRef();
    return {
        $$type: "SendInstallment",
        amount: _amount,
        tx_id: _tx_id,
        native_chain_nonce: _native_chain_nonce,
        target_chain: _target_chain,
        token_id: _token_id,
        destination_address: _destination_address,
    };
}
exports.loadSendInstallment = loadSendInstallment;
function loadTupleSendInstallment(source) {
    let _amount = source.readBigNumber();
    let _tx_id = source.readBigNumber();
    let _native_chain_nonce = source.readBigNumber();
    let _target_chain = source.readBigNumber();
    let _token_id = source.readBigNumber();
    let _destination_address = source.readCell();
    return {
        $$type: "SendInstallment",
        amount: _amount,
        tx_id: _tx_id,
        native_chain_nonce: _native_chain_nonce,
        target_chain: _target_chain,
        token_id: _token_id,
        destination_address: _destination_address,
    };
}
function storeTupleSendInstallment(source) {
    let builder = new core_1.TupleBuilder();
    builder.writeNumber(source.amount);
    builder.writeNumber(source.tx_id);
    builder.writeNumber(source.native_chain_nonce);
    builder.writeNumber(source.target_chain);
    builder.writeNumber(source.token_id);
    builder.writeCell(source.destination_address);
    return builder.build();
}
function dictValueParserSendInstallment() {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef((0, core_1.beginCell)().store(storeSendInstallment(src)).endCell());
        },
        parse: (src) => {
            return loadSendInstallment(src.loadRef().beginParse());
        },
    };
}
function storeReceivedInstallment(src) {
    return (builder) => {
        let b_0 = builder;
        b_0.storeUint(1727060366, 32);
        b_0.storeInt(src.amount, 257);
        b_0.storeInt(src.tx_id, 257);
        b_0.storeInt(src.chain_nonce, 257);
        let b_1 = new core_1.Builder();
        b_1.storeInt(src.native_chain_nonce, 257);
        b_1.storeInt(src.token_id, 257);
        b_1.storeAddress(src.destination_address);
        b_0.storeRef(b_1.endCell());
    };
}
exports.storeReceivedInstallment = storeReceivedInstallment;
function loadReceivedInstallment(slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1727060366) {
        throw Error("Invalid prefix");
    }
    let _amount = sc_0.loadIntBig(257);
    let _tx_id = sc_0.loadIntBig(257);
    let _chain_nonce = sc_0.loadIntBig(257);
    let sc_1 = sc_0.loadRef().beginParse();
    let _native_chain_nonce = sc_1.loadIntBig(257);
    let _token_id = sc_1.loadIntBig(257);
    let _destination_address = sc_1.loadAddress();
    return {
        $$type: "ReceivedInstallment",
        amount: _amount,
        tx_id: _tx_id,
        chain_nonce: _chain_nonce,
        native_chain_nonce: _native_chain_nonce,
        token_id: _token_id,
        destination_address: _destination_address,
    };
}
exports.loadReceivedInstallment = loadReceivedInstallment;
function loadTupleReceivedInstallment(source) {
    let _amount = source.readBigNumber();
    let _tx_id = source.readBigNumber();
    let _chain_nonce = source.readBigNumber();
    let _native_chain_nonce = source.readBigNumber();
    let _token_id = source.readBigNumber();
    let _destination_address = source.readAddress();
    return {
        $$type: "ReceivedInstallment",
        amount: _amount,
        tx_id: _tx_id,
        chain_nonce: _chain_nonce,
        native_chain_nonce: _native_chain_nonce,
        token_id: _token_id,
        destination_address: _destination_address,
    };
}
function storeTupleReceivedInstallment(source) {
    let builder = new core_1.TupleBuilder();
    builder.writeNumber(source.amount);
    builder.writeNumber(source.tx_id);
    builder.writeNumber(source.chain_nonce);
    builder.writeNumber(source.native_chain_nonce);
    builder.writeNumber(source.token_id);
    builder.writeAddress(source.destination_address);
    return builder.build();
}
function dictValueParserReceivedInstallment() {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef((0, core_1.beginCell)().store(storeReceivedInstallment(src)).endCell());
        },
        parse: (src) => {
            return loadReceivedInstallment(src.loadRef().beginParse());
        },
    };
}
function storeFreezeTon(src) {
    return (builder) => {
        let b_0 = builder;
        b_0.storeUint(1454467380, 32);
        b_0.storeInt(src.target_chain, 257);
        b_0.storeInt(src.token_id, 257);
        b_0.storeRef(src.to);
        b_0.storeInt(src.amount, 257);
    };
}
exports.storeFreezeTon = storeFreezeTon;
function loadFreezeTon(slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1454467380) {
        throw Error("Invalid prefix");
    }
    let _target_chain = sc_0.loadIntBig(257);
    let _token_id = sc_0.loadIntBig(257);
    let _to = sc_0.loadRef();
    let _amount = sc_0.loadIntBig(257);
    return {
        $$type: "FreezeTon",
        target_chain: _target_chain,
        token_id: _token_id,
        to: _to,
        amount: _amount,
    };
}
exports.loadFreezeTon = loadFreezeTon;
function loadTupleFreezeTon(source) {
    let _target_chain = source.readBigNumber();
    let _token_id = source.readBigNumber();
    let _to = source.readCell();
    let _amount = source.readBigNumber();
    return {
        $$type: "FreezeTon",
        target_chain: _target_chain,
        token_id: _token_id,
        to: _to,
        amount: _amount,
    };
}
function storeTupleFreezeTon(source) {
    let builder = new core_1.TupleBuilder();
    builder.writeNumber(source.target_chain);
    builder.writeNumber(source.token_id);
    builder.writeCell(source.to);
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
        },
    };
}
function storeMapNativeContract(src) {
    return (builder) => {
        let b_0 = builder;
        b_0.storeUint(184326790, 32);
        b_0.storeInt(src.token_id, 257);
        b_0.storeStringRefTail(src.token_symbol);
        b_0.storeAddress(src.contract);
        b_0.storeUint(src.decimals, 8);
    };
}
exports.storeMapNativeContract = storeMapNativeContract;
function loadMapNativeContract(slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 184326790) {
        throw Error("Invalid prefix");
    }
    let _token_id = sc_0.loadIntBig(257);
    let _token_symbol = sc_0.loadStringRefTail();
    let _contract = sc_0.loadAddress();
    let _decimals = sc_0.loadUintBig(8);
    return {
        $$type: "MapNativeContract",
        token_id: _token_id,
        token_symbol: _token_symbol,
        contract: _contract,
        decimals: _decimals,
    };
}
exports.loadMapNativeContract = loadMapNativeContract;
function loadTupleMapNativeContract(source) {
    let _token_id = source.readBigNumber();
    let _token_symbol = source.readString();
    let _contract = source.readAddress();
    let _decimals = source.readBigNumber();
    return {
        $$type: "MapNativeContract",
        token_id: _token_id,
        token_symbol: _token_symbol,
        contract: _contract,
        decimals: _decimals,
    };
}
function storeTupleMapNativeContract(source) {
    let builder = new core_1.TupleBuilder();
    builder.writeNumber(source.token_id);
    builder.writeString(source.token_symbol);
    builder.writeAddress(source.contract);
    builder.writeNumber(source.decimals);
    return builder.build();
}
function dictValueParserMapNativeContract() {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef((0, core_1.beginCell)().store(storeMapNativeContract(src)).endCell());
        },
        parse: (src) => {
            return loadMapNativeContract(src.loadRef().beginParse());
        },
    };
}
function storeMapWrappedContract(src) {
    return (builder) => {
        let b_0 = builder;
        b_0.storeUint(989046332, 32);
        b_0.storeInt(src.token_id, 257);
        b_0.storeStringRefTail(src.token_symbol);
        b_0.storeAddress(src.contract);
        b_0.storeUint(src.decimals, 8);
    };
}
exports.storeMapWrappedContract = storeMapWrappedContract;
function loadMapWrappedContract(slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 989046332) {
        throw Error("Invalid prefix");
    }
    let _token_id = sc_0.loadIntBig(257);
    let _token_symbol = sc_0.loadStringRefTail();
    let _contract = sc_0.loadAddress();
    let _decimals = sc_0.loadUintBig(8);
    return {
        $$type: "MapWrappedContract",
        token_id: _token_id,
        token_symbol: _token_symbol,
        contract: _contract,
        decimals: _decimals,
    };
}
exports.loadMapWrappedContract = loadMapWrappedContract;
function loadTupleMapWrappedContract(source) {
    let _token_id = source.readBigNumber();
    let _token_symbol = source.readString();
    let _contract = source.readAddress();
    let _decimals = source.readBigNumber();
    return {
        $$type: "MapWrappedContract",
        token_id: _token_id,
        token_symbol: _token_symbol,
        contract: _contract,
        decimals: _decimals,
    };
}
function storeTupleMapWrappedContract(source) {
    let builder = new core_1.TupleBuilder();
    builder.writeNumber(source.token_id);
    builder.writeString(source.token_symbol);
    builder.writeAddress(source.contract);
    builder.writeNumber(source.decimals);
    return builder.build();
}
function dictValueParserMapWrappedContract() {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef((0, core_1.beginCell)().store(storeMapWrappedContract(src)).endCell());
        },
        parse: (src) => {
            return loadMapWrappedContract(src.loadRef().beginParse());
        },
    };
}
function storeAddChain(src) {
    return (builder) => {
        let b_0 = builder;
        b_0.storeUint(2751922069, 32);
        b_0.storeUint(src.chain_id, 16);
        b_0.storeStringRefTail(src.chain_name);
    };
}
exports.storeAddChain = storeAddChain;
function loadAddChain(slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2751922069) {
        throw Error("Invalid prefix");
    }
    let _chain_id = sc_0.loadUintBig(16);
    let _chain_name = sc_0.loadStringRefTail();
    return {
        $$type: "AddChain",
        chain_id: _chain_id,
        chain_name: _chain_name,
    };
}
exports.loadAddChain = loadAddChain;
function loadTupleAddChain(source) {
    let _chain_id = source.readBigNumber();
    let _chain_name = source.readString();
    return {
        $$type: "AddChain",
        chain_id: _chain_id,
        chain_name: _chain_name,
    };
}
function storeTupleAddChain(source) {
    let builder = new core_1.TupleBuilder();
    builder.writeNumber(source.chain_id);
    builder.writeString(source.chain_name);
    return builder.build();
}
function dictValueParserAddChain() {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef((0, core_1.beginCell)().store(storeAddChain(src)).endCell());
        },
        parse: (src) => {
            return loadAddChain(src.loadRef().beginParse());
        },
    };
}
function storeUpdateChain(src) {
    return (builder) => {
        let b_0 = builder;
        b_0.storeUint(1203306390, 32);
        b_0.storeUint(src.chain_id, 16);
        b_0.storeStringRefTail(src.chain_name);
    };
}
exports.storeUpdateChain = storeUpdateChain;
function loadUpdateChain(slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1203306390) {
        throw Error("Invalid prefix");
    }
    let _chain_id = sc_0.loadUintBig(16);
    let _chain_name = sc_0.loadStringRefTail();
    return {
        $$type: "UpdateChain",
        chain_id: _chain_id,
        chain_name: _chain_name,
    };
}
exports.loadUpdateChain = loadUpdateChain;
function loadTupleUpdateChain(source) {
    let _chain_id = source.readBigNumber();
    let _chain_name = source.readString();
    return {
        $$type: "UpdateChain",
        chain_id: _chain_id,
        chain_name: _chain_name,
    };
}
function storeTupleUpdateChain(source) {
    let builder = new core_1.TupleBuilder();
    builder.writeNumber(source.chain_id);
    builder.writeString(source.chain_name);
    return builder.build();
}
function dictValueParserUpdateChain() {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef((0, core_1.beginCell)().store(storeUpdateChain(src)).endCell());
        },
        parse: (src) => {
            return loadUpdateChain(src.loadRef().beginParse());
        },
    };
}
function storeReceiveInstallment(src) {
    return (builder) => {
        let b_0 = builder;
        b_0.storeUint(882722431, 32);
        b_0.storeInt(src.tx_id, 257);
        let b_1 = new core_1.Builder();
        b_1.store(storeInstallmentIn(src.installment));
        b_0.storeRef(b_1.endCell());
    };
}
exports.storeReceiveInstallment = storeReceiveInstallment;
function loadReceiveInstallment(slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 882722431) {
        throw Error("Invalid prefix");
    }
    let _tx_id = sc_0.loadIntBig(257);
    let sc_1 = sc_0.loadRef().beginParse();
    let _installment = loadInstallmentIn(sc_1);
    return {
        $$type: "ReceiveInstallment",
        tx_id: _tx_id,
        installment: _installment,
    };
}
exports.loadReceiveInstallment = loadReceiveInstallment;
function loadTupleReceiveInstallment(source) {
    let _tx_id = source.readBigNumber();
    const _installment = loadTupleInstallmentIn(source.readTuple());
    return {
        $$type: "ReceiveInstallment",
        tx_id: _tx_id,
        installment: _installment,
    };
}
function storeTupleReceiveInstallment(source) {
    let builder = new core_1.TupleBuilder();
    builder.writeNumber(source.tx_id);
    builder.writeTuple(storeTupleInstallmentIn(source.installment));
    return builder.build();
}
function dictValueParserReceiveInstallment() {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef((0, core_1.beginCell)().store(storeReceiveInstallment(src)).endCell());
        },
        parse: (src) => {
            return loadReceiveInstallment(src.loadRef().beginParse());
        },
    };
}
function storeSetChainFee(src) {
    return (builder) => {
        let b_0 = builder;
        b_0.storeUint(2586505758, 32);
        b_0.storeUint(src.chain_id, 16);
        b_0.storeUint(src.fee, 256);
    };
}
exports.storeSetChainFee = storeSetChainFee;
function loadSetChainFee(slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2586505758) {
        throw Error("Invalid prefix");
    }
    let _chain_id = sc_0.loadUintBig(16);
    let _fee = sc_0.loadUintBig(256);
    return { $$type: "SetChainFee", chain_id: _chain_id, fee: _fee };
}
exports.loadSetChainFee = loadSetChainFee;
function loadTupleSetChainFee(source) {
    let _chain_id = source.readBigNumber();
    let _fee = source.readBigNumber();
    return { $$type: "SetChainFee", chain_id: _chain_id, fee: _fee };
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
        },
    };
}
function storeInstallmentIn(src) {
    return (builder) => {
        let b_0 = builder;
        b_0.storeUint(src.amount, 256);
        b_0.storeAddress(src.to);
        b_0.storeUint(src.chain_id, 16);
        b_0.storeUint(src.token_id, 256);
    };
}
exports.storeInstallmentIn = storeInstallmentIn;
function loadInstallmentIn(slice) {
    let sc_0 = slice;
    let _amount = sc_0.loadUintBig(256);
    let _to = sc_0.loadAddress();
    let _chain_id = sc_0.loadUintBig(16);
    let _token_id = sc_0.loadUintBig(256);
    return {
        $$type: "InstallmentIn",
        amount: _amount,
        to: _to,
        chain_id: _chain_id,
        token_id: _token_id,
    };
}
exports.loadInstallmentIn = loadInstallmentIn;
function loadTupleInstallmentIn(source) {
    let _amount = source.readBigNumber();
    let _to = source.readAddress();
    let _chain_id = source.readBigNumber();
    let _token_id = source.readBigNumber();
    return {
        $$type: "InstallmentIn",
        amount: _amount,
        to: _to,
        chain_id: _chain_id,
        token_id: _token_id,
    };
}
function storeTupleInstallmentIn(source) {
    let builder = new core_1.TupleBuilder();
    builder.writeNumber(source.amount);
    builder.writeAddress(source.to);
    builder.writeNumber(source.chain_id);
    builder.writeNumber(source.token_id);
    return builder.build();
}
function dictValueParserInstallmentIn() {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef((0, core_1.beginCell)().store(storeInstallmentIn(src)).endCell());
        },
        parse: (src) => {
            return loadInstallmentIn(src.loadRef().beginParse());
        },
    };
}
function storeInstallmentOut(src) {
    return (builder) => {
        let b_0 = builder;
        b_0.storeUint(src.amount, 256);
        b_0.storeStringRefTail(src.to);
        b_0.storeUint(src.target_chain, 16);
        b_0.storeInt(src.token_id, 257);
    };
}
exports.storeInstallmentOut = storeInstallmentOut;
function loadInstallmentOut(slice) {
    let sc_0 = slice;
    let _amount = sc_0.loadUintBig(256);
    let _to = sc_0.loadStringRefTail();
    let _target_chain = sc_0.loadUintBig(16);
    let _token_id = sc_0.loadIntBig(257);
    return {
        $$type: "InstallmentOut",
        amount: _amount,
        to: _to,
        target_chain: _target_chain,
        token_id: _token_id,
    };
}
exports.loadInstallmentOut = loadInstallmentOut;
function loadTupleInstallmentOut(source) {
    let _amount = source.readBigNumber();
    let _to = source.readString();
    let _target_chain = source.readBigNumber();
    let _token_id = source.readBigNumber();
    return {
        $$type: "InstallmentOut",
        amount: _amount,
        to: _to,
        target_chain: _target_chain,
        token_id: _token_id,
    };
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
        },
    };
}
function storeToken(src) {
    return (builder) => {
        let b_0 = builder;
        b_0.storeAddress(src.address);
        b_0.storeUint(src.decimals, 8);
    };
}
exports.storeToken = storeToken;
function loadToken(slice) {
    let sc_0 = slice;
    let _address = sc_0.loadAddress();
    let _decimals = sc_0.loadUintBig(8);
    return { $$type: "Token", address: _address, decimals: _decimals };
}
exports.loadToken = loadToken;
function loadTupleToken(source) {
    let _address = source.readAddress();
    let _decimals = source.readBigNumber();
    return { $$type: "Token", address: _address, decimals: _decimals };
}
function storeTupleToken(source) {
    let builder = new core_1.TupleBuilder();
    builder.writeAddress(source.address);
    builder.writeNumber(source.decimals);
    return builder.build();
}
function dictValueParserToken() {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef((0, core_1.beginCell)().store(storeToken(src)).endCell());
        },
        parse: (src) => {
            return loadToken(src.loadRef().beginParse());
        },
    };
}
function storeChainName(src) {
    return (builder) => {
        let b_0 = builder;
        b_0.storeStringRefTail(src.name);
    };
}
exports.storeChainName = storeChainName;
function loadChainName(slice) {
    let sc_0 = slice;
    let _name = sc_0.loadStringRefTail();
    return { $$type: "ChainName", name: _name };
}
exports.loadChainName = loadChainName;
function loadTupleChainName(source) {
    let _name = source.readString();
    return { $$type: "ChainName", name: _name };
}
function storeTupleChainName(source) {
    let builder = new core_1.TupleBuilder();
    builder.writeString(source.name);
    return builder.build();
}
function dictValueParserChainName() {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef((0, core_1.beginCell)().store(storeChainName(src)).endCell());
        },
        parse: (src) => {
            return loadChainName(src.loadRef().beginParse());
        },
    };
}
function storeTokenSymbol(src) {
    return (builder) => {
        let b_0 = builder;
        b_0.storeStringRefTail(src.symbol);
    };
}
exports.storeTokenSymbol = storeTokenSymbol;
function loadTokenSymbol(slice) {
    let sc_0 = slice;
    let _symbol = sc_0.loadStringRefTail();
    return { $$type: "TokenSymbol", symbol: _symbol };
}
exports.loadTokenSymbol = loadTokenSymbol;
function loadTupleTokenSymbol(source) {
    let _symbol = source.readString();
    return { $$type: "TokenSymbol", symbol: _symbol };
}
function storeTupleTokenSymbol(source) {
    let builder = new core_1.TupleBuilder();
    builder.writeString(source.symbol);
    return builder.build();
}
function dictValueParserTokenSymbol() {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef((0, core_1.beginCell)().store(storeTokenSymbol(src)).endCell());
        },
        parse: (src) => {
            return loadTokenSymbol(src.loadRef().beginParse());
        },
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
        throw Error("Invalid prefix");
    }
    let _new_base_uri = sc_0.loadStringRefTail();
    return { $$type: "UpdateBaseUri", new_base_uri: _new_base_uri };
}
exports.loadUpdateBaseUri = loadUpdateBaseUri;
function loadTupleUpdateBaseUri(source) {
    let _new_base_uri = source.readString();
    return { $$type: "UpdateBaseUri", new_base_uri: _new_base_uri };
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
        },
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
        throw Error("Invalid prefix");
    }
    let _new_fee = sc_0.loadIntBig(257);
    return { $$type: "UpdateTransferFee", new_fee: _new_fee };
}
exports.loadUpdateTransferFee = loadUpdateTransferFee;
function loadTupleUpdateTransferFee(source) {
    let _new_fee = source.readBigNumber();
    return { $$type: "UpdateTransferFee", new_fee: _new_fee };
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
        },
    };
}
function storeRemoveNativeMappedContract(src) {
    return (builder) => {
        let b_0 = builder;
        b_0.storeUint(3180152699, 32);
        b_0.storeUint(src.token_id, 256);
    };
}
exports.storeRemoveNativeMappedContract = storeRemoveNativeMappedContract;
function loadRemoveNativeMappedContract(slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 3180152699) {
        throw Error("Invalid prefix");
    }
    let _token_id = sc_0.loadUintBig(256);
    return { $$type: "RemoveNativeMappedContract", token_id: _token_id };
}
exports.loadRemoveNativeMappedContract = loadRemoveNativeMappedContract;
function loadTupleRemoveNativeMappedContract(source) {
    let _token_id = source.readBigNumber();
    return { $$type: "RemoveNativeMappedContract", token_id: _token_id };
}
function storeTupleRemoveNativeMappedContract(source) {
    let builder = new core_1.TupleBuilder();
    builder.writeNumber(source.token_id);
    return builder.build();
}
function dictValueParserRemoveNativeMappedContract() {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef((0, core_1.beginCell)().store(storeRemoveNativeMappedContract(src)).endCell());
        },
        parse: (src) => {
            return loadRemoveNativeMappedContract(src.loadRef().beginParse());
        },
    };
}
function storeRemoveWrappedMappedContract(src) {
    return (builder) => {
        let b_0 = builder;
        b_0.storeUint(3150919874, 32);
        b_0.storeUint(src.token_id, 256);
    };
}
exports.storeRemoveWrappedMappedContract = storeRemoveWrappedMappedContract;
function loadRemoveWrappedMappedContract(slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 3150919874) {
        throw Error("Invalid prefix");
    }
    let _token_id = sc_0.loadUintBig(256);
    return {
        $$type: "RemoveWrappedMappedContract",
        token_id: _token_id,
    };
}
exports.loadRemoveWrappedMappedContract = loadRemoveWrappedMappedContract;
function loadTupleRemoveWrappedMappedContract(source) {
    let _token_id = source.readBigNumber();
    return {
        $$type: "RemoveWrappedMappedContract",
        token_id: _token_id,
    };
}
function storeTupleRemoveWrappedMappedContract(source) {
    let builder = new core_1.TupleBuilder();
    builder.writeNumber(source.token_id);
    return builder.build();
}
function dictValueParserRemoveWrappedMappedContract() {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef((0, core_1.beginCell)().store(storeRemoveWrappedMappedContract(src)).endCell());
        },
        parse: (src) => {
            return loadRemoveWrappedMappedContract(src.loadRef().beginParse());
        },
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
        throw Error("Invalid prefix");
    }
    let _new_fee = sc_0.loadIntBig(257);
    return { $$type: "UpdateProtocolFee", new_fee: _new_fee };
}
exports.loadUpdateProtocolFee = loadUpdateProtocolFee;
function loadTupleUpdateProtocolFee(source) {
    let _new_fee = source.readBigNumber();
    return { $$type: "UpdateProtocolFee", new_fee: _new_fee };
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
        },
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
        b_0.storeRef(b_1.endCell());
    };
}
async function Bridge_init(chain_nonce, native_coin, burner, base_uri, transfer_fee, protocol_fee) {
    const __code = core_1.Cell.fromBase64("te6ccgECyAEAMLEAART/APSkE/S88sgLAQIBYgIDA+LQAdDTAwFxsKMB+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiFRQUwNvBPhhAvhi2zwRFhEYERYRFREXERURFBEWERQRExEVERMREhEUERIRERETEREREBESERAPEREPDhEQDhDfVRzbPPLggrkEBQIBIHd4BO7tou37AZIwf+BwIddJwh+VMCDXCx/eIIIQc2LQnLqOuzDTHwGCEHNi0Jy68uCB0z/6APpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IhUEwMQI2wU2zx/4CCCEHvdl966jwgw2zxsFts8f+AgghBWsWk0ugYHCAkBQMj4QwHMfwHKABEXERYRFREUERMREhERERBV4Ns8ye1UEQHsMTIRFhEYERYRFREXERURFBEYERQRExEXERMREhEYERIREREXEREREBEYERAPERcPDhEYDg0RFw0MERgMCxEXCwoRGAoJERcJCBEYCAcRFwcGERgGBREXBQQRGAQDERcDAhEYAgERFwERGIEIRyXAAPL0ERfTDwoAstMfAYIQe92X3rry4IHTP/oA+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiAH6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIAfoAUVUVFEMwAfQ1XwOCAIpn+EFvJBAjXwMnxwXy9BEWERgRFhEVERcRFREUERgRFBETERcRExESERgREhERERcREREQERgREA8RFw8OERgODREXDQwRGAwLERcLChEYCgkRFwkIERgIBxEXBwYRGAYFERcFBBEYBAMRFwMCERgCAREXAQ4E/I6lMNMfAYIQVrFpNLry4IGBAQHXAIEBAdcA1IEBAdcAVTBsFNs8f+AgghAK/JqGuo7AMNMfAYIQCvyahrry4IGBAQHXANQB0AH6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIAdMHVTBsFNs8f+AgghA686Y8uuMCIBMUFRYC7hEWERcRFhEVERcRFREUERcRFBETERcRExESERcREhERERcREREQERcREA8RFw8OERcODREXDQwRFwwLERcLChEXCgkRFwkIERcIBxEXBwYRFwYFERcFBBEXBAMRFwMCERcCAREXAREYVhlWGNs8gQEBVFYAVhoBPwsB/EEz9AxvoZQB1wAwkltt4oIAxEUhbrPy9IIA97X4QW8kE18DAiBu8tCAI6ASvvL0ERakERjT/9QwERYRGREWERURGREVERQRGREUERMRGRETERIRGRESERERGRERERARGREQDxEZDw4RGQ4NERkNDBEZDAsRGQsKERkKCREZCQwD/AgRGQgHERkHBhEZBgURGQUEERkEAxEZAwIRGQIBERkBERdWGNs8BBEYBAMRGwMCVhMCAREbAREaEEUQNEATyFVQ2zzJyIJYwAAAAAAAAAAAAAAAAQHLZ8zJcPsAERIRFhESERERFRERERARFBEQDxETDw4REg4NERENDBEQDBccDQAEVTsB/BEYgQhHJcAA8vQRF9MPgQEBVFcAUkBBM/QMb6GUAdcAMJJbbeKCAMRFIW6z8vSCAPe1+EFvJBNfAwIgbvLQgFYboBK+8vQRF6QRF9QB0NP/MAHUMBEWERgRFhEVERcRFREUERgRFBETERcRExESERgREhERERcREREQERgREA8E0g8RFw8OERgODREXDQwRGAwLERcLChEYCgkRFwkIERgIBxEXBwYRGAYFERcFBBEYBAMRFwMCERgCAREXAREZVhpWGds8VhjbPDADERkDAhEaAlYWAlYTAgERGQERGhBFEDRAE8hVUNs8yT8XHBAAesiCWMAAAAAAAAAAAAAAAAEBy2fMyXD7ABESERYREhERERUREREQERQREA8REw8OERIODRERDQwREAxVOxMB7AERFgERF4EBAc8AAREUAYEBAc8AARESAYEBAc8AERDIgQEBzwAfgQEBzwAd9AAb9AAZ9AAHyPQAFvQAFPQAAsj0APQAEvQAAsj0ABT0AFAEINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WFPQAFMoAUAUSAIog10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxbIyFAHzxbJUAbMFoEBAc8AFoEBAc8AyVADzMkBzMlQA8zJAczJAcwC8hEWERoRFhEVERkRFREUERgRFBETERcRExESERoREhERERkREREQERgREA8RFw8OERoODREZDQwRGAwLERcLChEaCgkRGQkIERgIBxEXBwYRGgYFERkFBBEYBAMRFwMCERoCAREZAREYgQhHJcAA8vQRFqQRFlYX2zwXGAHQERYRGhEWERURGREVERQRGBEUERMRFxETERIRGhESERERGRERERARGBEQDxEXDw4RGg4NERkNDBEYDAsRFwsKERoKCREZCQgRGAgHERcHBhEaBgURGQUEERgEAxEXAwIRGgIBERkBERgeAYAw0x8BghA686Y8uvLggYEBAdcA1AHQAfpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgB0wdVMGwU2zx/IATWghCkBv+Vuo6ZMNMfAYIQpAb/lbry4IHTD9QB0BJsEts8f+AgghC9jUd7uo6VMNMfAYIQvY1He7ry4IHT/wEx2zx/4CCCELvPOMK6jpUw0x8BghC7zzjCuvLggdP/ATHbPH/gIIIQR7j/lrojJCUmBEyCAOfEIVYVvZMhwwCRcOLy9MhvAAFvjG1vjFYU2zzbPIsS2Ns8AUhJSRkB+oEBAVRXAFYbAUEz9AxvoZQB1wAwkltt4oIAxEUhbrPy9IIA97X4QW8kE18DAiBu8tCAVhygJKASvvL0ERYRFxEWERURFxEVERQRFxEUERMRFxETERIRFxESERERFxERERARFxEQDxEXDw4RFw4NERcNDBEXDAsRFwsKERcKGwQW2zzbPIsS2Ns8VhdISUkaAjDbPNs8byIByZMhbrOWAW8iWczJ6DHQ+QJISQL8CREXCREXCAcGVUBWGYFDXvhBbyQTXwMivvL0ERRWFKABERUBERSgERQEERoEAxEZAwIRFwJWEgIBERwBERkQRRA0QBPIVVDbPMnIgljAAAAAAAAAAAAAAAABActnzMlw+wAREREWEREREBEVERAPERQPDhETDg0REg0MEREMHB0AWoIQ4c8PDlAHyx8VgQEBzwATgQEBzwCBAQHPAAHIgQEBzwASgQEBzwASzMkBzAAyCxEQCxCvEJ4QjRB8EGsQWhBJEDhHFUNjFAH6gXFYgQEL+EFvJBAjXwMsWXFBM/QKb6GUAdcAMJJbbeJus44mgQEL+EFvJBAjXwMsWXFBM/QKb6GUAdcAMJJbbeJ/IW6SW3CRuuKRcOLy9BEWERoRFhEVERkRFREUERgRFBETERcRExESERYREhERERUREREQERQREA8REw8fAOYOERIODRERDQwREAwQv1U6AoEBAQLIWVkg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxbLB8kCERMCVhMBIG6VMFn0WjCUQTP0FeKBAQECyAHIAc8WyQHMyQMREQMBERIBIG6VMFn0WjCUQTP0FeIOAdARFhEaERYRFREZERURFBEYERQRExEXERMREhEaERIREREZEREREBEYERAPERcPDhEaDg0RGQ0MERgMCxEXCwoRGgoJERkJCBEYCAcRFwcGERoGBREZBQQRGAQDERcDAhEaAgERGQERGCEB+oFxWIEBC/hBbyQQI18DLFlxQTP0Cm+hlAHXADCSW23ibrOOJoEBC/hBbyQQI18DLFlxQTP0Cm+hlAHXADCSW23ifyFukltwkbrikXDi8vQRFhEaERYRFREZERURFBEYERQRExEXERMREhEWERIREREVEREREBEUERAPERMPIgDiDhESDg0REQ0MERAMEL9VOgKBAQECyFlZINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WywfJAhERAlYRASBulTBZ9FowlEEz9BXigQEBAsgByAHPFskBzMkQPwEREAEgbpUwWfRaMJRBM/QV4gwB0BEWERgRFhEVERcRFREUERgRFBETERcRExESERgREhERERcREREQERgREA8RFw8OERgODREXDQwRGAwLERcLChEYCgkRFwkIERgIBxEXBwYRGAYFERcFBBEYBAMRFwMCERgCAREXAREYJwGaERYRFxEWERURFxEVERQRFxEUERMRFxETERIRFxESERERFxERERARFxEQDxEXDw4RFw4NERcNDBEXDAsRFwsKERcKCREXCREXCAcGVUArAZoRFhEXERYRFREXERURFBEXERQRExEXERMREhEXERIREREXEREREBEXERAPERcPDhEXDg0RFw0MERcMCxEXCwoRFwoJERcJERcIBwZVQC4E9I6ZMNMfAYIQR7j/lrry4IHTD9QB0BJsEts8f+AgghA0nUZ/uo7IMNMfAYIQNJ1Gf7ry4IGBAQHXANQB0NP/+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiAHTD9P/VTA0EEVVAmwV2zx/4CCCEJoq8h664wIgMTIzNAH6gXFYgQEL+EFvJBAjXwMsWXFBM/QKb6GUAdcAMJJbbeJus44mgQEL+EFvJBAjXwMsWXFBM/QKb6GUAdcAMJJbbeJ/IW6SW3CRuuKRcOLy9BEWERgRFhEVERcRFREUERYRFBETERURExESERQREhERERMREREQERIREA8REQ8oARAOERAOVR3bPCkB1BEVERgRFREUERcRFBETERYRExESERgREhERERcREREQERYREA8RGA8OERcODREWDQwRGAwLERcLChEWCgkRGAkIERcIBxEWBwYRGAYFERcFBBEWBAMRGAMCERcCAREWAREYggDelhEYVhcqAf6BAQEtAln0DW+hkjBt3yBukjBtl9DUAdAxbwHibrOzAREZAfL0gQEBERnIAcgBzxbJAczJEDsCERkCAREXASBulTBZ9FowlEEz9BXiERMRFhETERIRFRESERERFBERERARExEQDxESDw4REQ4NERANEM8QvhCtEJwLEHoQaRBYOQGmgXFYgQEL+EFvJBAjXwMsWXFBM/QKb6GUAdcAMJJbbeJus44mgQEL+EFvJBAjXwMsWXFBM/QKb6GUAdcAMJJbbeJ/IW6SW3CRuuKRcOLy9IEBAW0sAfggbpIwbY4rIG7y0IBvIshZWSDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFssHyeICERECVhkBIG6VMFn0WjCUQTP0FeKBAQFtIG6SMG2OESBu8tCAbyHIAcgBzxbJAczJ4gMREAMSAREZASBulTBZ9FowlEEz9BXiLQB+ERURFhEVERQRFREUERMRFBETERIRExESEREREhERERAREREQDxEQDw4QzRC8EKsQmhCJEHgQZxBWEEUQNEEwAaaBcViBAQv4QW8kECNfAyxZcUEz9ApvoZQB1wAwkltt4m6zjiaBAQv4QW8kECNfAyxZcUEz9ApvoZQB1wAwkltt4n8hbpJbcJG64pFw4vL0gQEBbS8B/CBukjBtjisgbvLQgG8iyFlZINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WywfJ4hAvVhkBIG6VMFn0WjCUQTP0FeKBAQFtIG6SMG2OESBu8tCAbyHIAcgBzxbJAczJ4hA+EgERGQEgbpUwWfRaMJRBM/QV4hEVERYRFTAAchEUERURFBETERQRExESERMREhERERIREREQEREREA8REA8Q7xDeDBCrEJoQiRB4EGcQVhBFEDRBMAHQERYRGBEWERURFxEVERQRGBEUERMRFxETERIRGBESERERFxERERARGBEQDxEXDw4RGA4NERcNDBEYDAsRFwsKERgKCREXCQgRGAgHERcHBhEYBgURFwUEERgEAxEXAwIRGAIBERcBERg1AeARFhEbERYRFREaERURFBEZERQRExEYERMREhEXERIREREbEREREBEaERAPERkPDhEYDg0RFw0MERsMCxEaCwoRGQoJERgJCBEXCAcRGwcGERoGBREZBQQRGAQDERcDAhEbAgERGgERGYEIRyXAAPL0PQEwMNMfAYIQmiryHrry4IHTD9P/WWwS2zx/OgT+ghDVMnbbuo4UMNMfAYIQ1TJ227ry4IHTPwExMH/gIIIQM5DTaLqOmDDTHwGCEDOQ02i68uCBgQEB1wABMds8f+AgghC0uwq1uo6VMNMfAYIQtLsKtbry4IHUAdAx2zx/4CCCEGrfeIG64wIgwAAi10nBIbCSW3/gIIIQlGqYtlpbXF0B+oFxWIEBC/hBbyQQI18DLFlxQTP0Cm+hlAHXADCSW23ibrOOJoEBC/hBbyQQI18DLFlxQTP0Cm+hlAHXADCSW23ifyFukltwkbrikXDi8vQRFhEYERYRFREXERURFBEWERQRExEVERMREhEUERIRERETEREREBESERAPEREPNgEQDhEQDlUd2zw3AdIRFREYERURFBEXERQRExEWERMREhEYERIREREXEREREBEWERAPERgPDhEXDg0RFg0MERgMCxEXCwoRFgoJERgJCBEXCAcRFgcGERgGBREXBQQRFgQDERgDAhEXAgERFgERGIFk6BEYVhc4AfyBAQEtAln0DW+hkjBt3yBukjBtl9DUAdAxbwHibrMBERkB8vSBAQERGcgByAHPFskBzMkQOwIRGQIBERcBIG6VMFn0WjCUQTP0FeIRExEWERMREhEVERIREREUEREREBETERAPERIPDhERDg0REA0QzxC+EK0QnAsQehBpEFg5ABAQRxA2RQRAEwHQERYRGBEWERURFxEVERQRGBEUERMRFxETERIRGBESERERFxERERARGBEQDxEXDw4RGA4NERcNDBEYDAsRFwsKERgKCREXCQgRGAgHERcHBhEYBgURFwUEERgEAxEXAwIRGAIBERcBERg7AfiBcViBAQv4QW8kECNfAyxZcUEz9ApvoZQB1wAwkltt4m6zjiaBAQv4QW8kECNfAyxZcUEz9ApvoZQB1wAwkltt4n8hbpJbcJG64pFw4vL0gQEBIBBHEwIRGQIBERoBIW6VW1n0WjCYyAHPAEEz9ELiERQRFhEUERMRFRETPABiERIRFBESERERExERERAREhEQDxERDw4REA4Q3xDOEL0QrBCbEIoQeRBoEFcQRkQ1EgGigU27gQEL+EFvJBAjXwMtWXFBM/QKb6GUAdcAMJJbbeJus44mgQEL+EFvJBAjXwMtWXFBM/QKb6GUAdcAMJJbbeJ/IW6SW3CRuuKRcOLy9FYYPgKoggDD7YEBAVYUQBNZ9A1voZIwbd8gbpIwbY4t0NP/+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiAHTD9P/VTBsFG8E4m7y9FYXVhvbPFYZP0AB9IF8oQLCABLy9BEWERcRFhEVERcRFREUERcRFBETERcRExESERcREhERERcREREQERcREA8RFw8OERcODREXDQwRFwwLERcLChEXCgkRFwkRFwgHBlVAggCmwBEYgQEBLQJZ9A1voZIwbd8gbpIwbZfQ1AHQMW8B4m6zQQTaIFYXuiCzjkFWEYEBASNZ9A1voZIwbd8gbpIwbY4o0PpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgB0wdZbBJvAuJus5Fw4iGzkiCzkXDikjJw4w0SIrOSIbORcOKSILORcOLjAALjAEJDREUAYAERGAHy9BEVERYRFREUERURFBETERQRExESERMREhERERIREREQEREREA8REA9VDgCEgQEBVhFAFFn0DW+hkjBt3yBukjBtjijQ+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiAHTB1lsEm8C4m6zAv4wERYRGBEWERURFxEVERQRGBEUERMRFxETERIRGBESERERFxERERARGBEQDxEXDw4RGA4NERcNDBEYDAsRFwsKERgKCREXCQgRGAgHERcHBhEYBgURFwUEERgEAxEXAwIRGAIBERcBERhWG9s8ERYRGBEWERURFxEVERQRFhEURkcB2BEWERgRFhEVERcRFREUERgRFBETERcRExESERgREhERERcREREQERgREA8RFw8OERgODREXDQwRGAwLERcLChEYCgkRFwkIERgIBxEXBwYRGAYFERcFBBEYBAMRFwMCERgCAREXAREYVh1WGk4E/OMAj3ZWG1YYVhuBAQFWEQJZ9A1voZIwbd8gbpIwbY4o0PpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgB0wdZbBJvAuKCAL/MIW6z8vQgbvLQgG8iMPgobXDIydAQNRBGyFVQ2zzJghA7msoAf3BQBANtbds83oEBAVBRdVIEZshvAAFvjG1vjCTbPCHbPNs8+EP4KMhxAcoHA28iAcmTIW6zlgFvIlnMyegxUAPMyVRKM0lISUoARhETERURExESERQREhERERMREREQERIREA8REQ8OERAOVR1/AN7IIcEAmIAtAcsHAaMB3iGCODJ8snNBGdO3qaoduY4gcCBxjhQEeqkMpjAlqBKgBKoHAqQhwABFMOYwM6oCzwGOK28AcI4RI3qpCBJvjAGkA3qpBCDAABTmMyKlA5xTAm+BpjBYywcCpVnkMDHiydAAuiDXSiHXSZcgwgAiwgCxjkoDbyKAfyLPMasCoQWrAlFVtgggwgCcIKoCFdcYUDPPFkAU3llvAlNBocIAmcgBbwJQRKGqAo4SMTPCAJnUMNAg10oh10mScCDi4uhfAwLm2zxccFnIcAHLAXMBywFwAcsAEszMyfkAyHIBywFwAcsAEsoHy//J0CDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IiBAQEhechZWSDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFssHyQMREwNBUEtMAY4D0PQEMG0hgT35AYAQ9A9vofLghwGBPfkiAoAQ9BcCggDPmwGAEPQPb6Hy4IcSggDPmwECgBD0F8gByPQAyQHMcAHKAFUgBE0BRCBulTBZ9FowlEEz9BXighA7msoAWRERf4AQUFIUE21Z2zx1AIBaINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WWCDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFszJAr6Baxv4J28Q+EFvJBNfA6FTJaC88vRTA6ABERYBoREVI6CIEn9wRARtbds8ERYRGBEWERURFxEVERQRFhEUERMRFRETERIRFBESERERExERERAREhEQDxERDw4REA5VHU91ADoAAAAARnJvbSBFbW1ldC5GaW5hbmNlIEJyaWRnZQL+ERYRFxEWERURFxEVERQRFxEUERMRFxETERIRFxESERERFxERERARFxEQDxEXDw4RFw4NERcNDBEXDAsRFwsKERcKCREXCREXCAcGVUBWHFYZVhzbPBEWERcRFhEVERYRFREUERURFBETERQRExESERMREhERERIREREQEREREFNUAMiCEIm3HQlQB8sfUAUg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxZQAyDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFoEBAc8AIW6zlX8BygDMlHAyygDiAfoCAc8WAvZWGFYdVh1WHchVMFA0y/8BINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8Wyw/L/8kCERMCVhoBIG6VMFn0WjCUQTP0FeIEERcEAxEYAwIRGgJWEgIBERoBERzIVVDbPMnIgljAAAAAAAAAAAAAAAABActnzMlw+wBYWQKugQEBVhMCWfQNb6GSMG3fIG6SMG2OKND6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIAdMHWWwSbwLigRAhIW6z8vQgbvLQgG8iMPhD+ChY2zxcVVYADA8REA9VDgDaAtD0BDBtAYIAz5sBgBD0D2+h8uCHAYIAz5siAoAQ9BfIAcj0AMkBzHABygBAA1kg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxYBINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WyQLScFnIcAHLAXMBywFwAcsAEszMyfkAyHIBywFwAcsAEsoHy//J0CDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4Ij4QW8kECNfA21wyMnQIV41VVDIVWDbPMkCghAdzWUAfwVQNHBQI9s8V3UAyIIQD4p+pVAIyx8Wyz9QBPoCWCDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFgEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxYhbrOVfwHKAMyUcDLKAOIB+gIBzxYAlIIQZvDZjlAHyx8VgQEBzwATgQEBzwCBAQHPAAHIgQEBzwASgQEBzwBYINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WyQHMAE4REREWEREREBEVERAPERQPDhETDg0REg0PEREPCxEQCxCvVUkQNFgBmhEWERcRFhEVERcRFREUERcRFBETERcRExESERcREhERERcREREQERcREA8RFw8OERcODREXDQwRFwwLERcLChEXCgkRFwkRFwgHBlVAXgGaERYRFxEWERURFxEVERQRFxEUERMRFxETERIRFxESERERFxERERARFxEQDxEXDw4RFw4NERcNDBEXDAsRFwsKERcKCREXCREXCAcGVUBgATAw0x8BghBq33iBuvLggYEBAdcAATHbPH9iBPS6jqgw0x8BghCUapi2uvLggdM/ATHIAYIQr/kPV1jLH8s/yfhCAXBt2zx/4CCCEOVSKc66jrEw0x8BghDlUinOuvLggfpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4Igx2zx/4CCCEE1akuS64wIgghAsrZngumVmZ2gB/oFxWIEBC/hBbyQQI18DLFlxQTP0Cm+hlAHXADCSW23ibrOOJoEBC/hBbyQQI18DLFlxQTP0Cm+hlAHXADCSW23ifyFukltwkbrikXDi8vQRFhEXERYRFREWERURFBEVERQRExEUERMREhETERIRERESEREREBERERAPERAPVQ5fAAIxAfyBcViBAQv4QW8kECNfAyxZcUEz9ApvoZQB1wAwkltt4m6zjiaBAQv4QW8kECNfAyxZcUEz9ApvoZQB1wAwkltt4n8hbpJbcJG64pFw4vL0MhEVERYRFREUERURFBETERQRExESERMREhERERIREREQEREREA8REA8Q7xDeEM1hACgQvBCrEJoQiRB4EGcQVhBFEDRDAAGaERYRFxEWERURFxEVERQRFxEUERMRFxETERIRFxESERERFxERERARFxEQDxEXDw4RFw4NERcNDBEXDAsRFwsKERcKCREXCREXCAcGVUBjAf6BcViBAQv4QW8kECNfAyxZcUEz9ApvoZQB1wAwkltt4m6zjiaBAQv4QW8kECNfAyxZcUEz9ApvoZQB1wAwkltt4n8hbpJbcJG64pFw4vL0ERYRFxEWERURFhEVERQRFREUERMRFBETERIRExESEREREhERERAREREQDxEQD1UOZAACMgE6bW0ibrOZWyBu8tCAbyIBkTLiECRwAwSAQlAj2zx1AewRFhEXERYRFREXERURFBEXERQRExEXERMREhEXERIREREXEREREBEXERAPERcPDhEXDg0RFw0MERcMCxEXCwoRFwoJERcJERcIBwZVQIEZJvhBbyQQI18DKMcF8vQ2ERURFhEVERQRFREUERMRFBETERIRExESaQFiMNMfAYIQTVqS5Lry4IH6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIMds8f2oE9o6xMNMfAYIQLK2Z4Lry4IH6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIMds8f+AgghDilmFVuo6xMNMfAYIQ4pZhVbry4IH6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIMds8f+AgghCzhA2vuuMCIGtsbW4ASBERERIREREQEREREA8REA8Q7xDeEM0QvBCrEJoQiRB4EGdVBAHwERYRFxEWERURFxEVERQRFxEUERMRFxETERIRFxESERERFxERERARFxEQDxEXDw4RFw4NERcNDBEXDAsRFwsKERcKCREXCREXCAcGVUCBGSb4QW8kECNfAyjHBfL0GoEBCwERGG1xIW6VW1n0WTCYyAHPAEEz9EHiwwHwERYRFxEWERURFxEVERQRFxEUERMRFxETERIRFxESERERFxERERARFxEQDxEXDw4RFw4NERcNDBEXDAsRFwsKERcKCREXCREXCAcGVUCBGSb4QW8kECNfAyjHBfL0GYEBCwERGG1xIW6VW1n0WTCYyAHPAEEz9EHixAHwERYRFxEWERURFxEVERQRFxEUERMRFxETERIRFxESERERFxERERARFxEQDxEXDw4RFw4NERcNDBEXDAsRFwsKERcKCREXCREXCAcGVUCBGSb4QW8kECNfAyjHBfL0GIEBCwERGG1xIW6VW1n0WTCYyAHPAEEz9EHixQFiMNMfAYIQs4QNr7ry4IH6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIMds8f28D/oIQPP3sxrqOsTDTHwGCEDz97Ma68uCB+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiDHbPH/gIIIQySZ23bqOsTDTHwGCEMkmdt268uCB+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiDHbPH/gIIIQMcXUJ7q/wHAB8BEWERcRFhEVERcRFREUERcRFBETERcRExESERcREhERERcREREQERcREA8RFw8OERcODREXDQwRFwwLERcLChEXCgkRFwkRFwgHBlVAgRkm+EFvJBAjXwMoxwXy9BeBAQsBERhtcSFulVtZ9FkwmMgBzwBBM/RB4scD7o6xMNMfAYIQMcXUJ7ry4IH6QAEg10mBAQu68uCIINcLCiCBBP+6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ERcRFBEUERYRFBEUERURFAHwERYRFxEWERURFxEVERQRFxEUERMRFxETERIRFxESERERFxERERARFxEQDxEXDw4RFw4NERcNDBEXDAsRFwsKERcKCREXCREXCAcGVUCBGSb4QW8kECNfAyjHBfL0GoEBCwERGH9xIW6VW1n0WTCYyAHPAEEz9EHiwwHwERYRFxEWERURFxEVERQRFxEUERMRFxETERIRFxESERERFxERERARFxEQDxEXDw4RFw4NERcNDBEXDAsRFwsKERcKCREXCREXCAcGVUCBGSb4QW8kECNfAyjHBfL0GYEBCwERGH9xIW6VW1n0WTCYyAHPAEEz9EHixAHwERYRFxEWERURFxEVERQRFxEUERMRFxETERIRFxESERERFxERERARFxEQDxEXDw4RFw4NERcNDBEXDAsRFwsKERcKCREXCREXCAcGVUCBGSb4QW8kECNfAyjHBfL0GIEBCwERGH9xIW6VW1n0WTCYyAHPAEEz9EHixQEE2zzGAIARFREWERURFBEVERQRExEUERMREhETERIRERESEREREBERERAPERAPEO8Q3hDNELwKCxCJEHgQZxBWEEUQNEEwAIARFREWERURFBEVERQRExEUERMREhETERIRERESEREREBERERAPERAPEO8Q3hDNELwQqwkKEHgQZxBWEEUQNEEwAIARFREWERURFBEVERQRExEUERMREhETERIRERESEREREBERERAPERAPEO8Q3hDNELwQqxCaCAkQZxBWEEUQNEEwAfARFhEXERYRFREXERURFBEXERQRExEXERMREhEXERIREREXEREREBEXERAPERcPDhEXDg0RFw0MERcMCxEXCwoRFwoJERcJERcIBwZVQIEZJvhBbyQQI18DKMcF8vQXgQELAREYf3EhbpVbWfRZMJjIAc8AQTP0QeLHAIARFREWERURFBEVERQRExEUERMREhETERIRERESEREREBERERAPERAPEO8Q3hDNELwQqxCaEIkHCBBWEEUQNEEw");
    const __system = core_1.Cell.fromBase64("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lAHXADCSW23ibrOOJoEBC/hBbyQQI18DKllxQTP0Cm+hlAHXADCSW23ifyFukltwkbrikXDi8vSBWgFWFcIA8vT4QW8kECNfAwERFX9ZcG1tbds8cBEUf9sxAQQBYjDTHwGCELOEDa+68uCB+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiDHbPH8AWwHwERYRFxEWERURFxEVERQRFxEUERMRFxETERIRFxESERERFxERERARFxEQDxEXDw4RFw4NERcNDBEXDAsRFwsKERcKCREXCREXCAcGVUCBGSb4QW8kECNfAyjHBfL0F4EBCwERGG1xIW6VW1n0WTCYyAHPAEEz9EHiALwB8BEWERcRFhEVERcRFREUERcRFBETERcRExESERcREhERERcREREQERcREA8RFw8OERcODREXDQwRFwwLERcLChEXCgkRFwkRFwgHBlVAgRkm+EFvJBAjXwMoxwXy9BiBAQsBERhtcSFulVtZ9FkwmMgBzwBBM/RB4gC+AfARFhEXERYRFREXERURFBEXERQRExEXERMREhEXERIREREXEREREBEXERAPERcPDhEXDg0RFw0MERcMCxEXCwoRFwoJERcJERcIBwZVQIEZJvhBbyQQI18DKMcF8vQZgQELAREYbXEhbpVbWfRZMJjIAc8AQTP0QeIAwAFiMNMfAYIQTVqS5Lry4IH6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIMds8fwBfAfARFhEXERYRFREXERURFBEXERQRExEXERMREhEXERIREREXEREREBEXERAPERcPDhEXDg0RFw0MERcMCxEXCwoRFwoJERcJERcIBwZVQIEZJvhBbyQQI18DKMcF8vQagQELAREYbXEhbpVbWfRZMJjIAc8AQTP0QeIAwgHsERYRFxEWERURFxEVERQRFxEUERMRFxETERIRFxESERERFxERERARFxEQDxEXDw4RFw4NERcNDBEXDAsRFwsKERcKCREXCREXCAcGVUCBGSb4QW8kECNfAyjHBfL0NhEVERYRFREUERURFBETERQRExESERMREgBhAEgRERESEREREBERERAPERAPEO8Q3hDNELwQqxCaEIkQeBBnVQQBMDDTHwGCEGrfeIG68uCBgQEB1wABMds8fwBjAZoRFhEXERYRFREXERURFBEXERQRExEXERMREhEXERIREREXEREREBEXERAPERcPDhEXDg0RFw0MERcMCxEXCwoRFwoJERcJERcIBwZVQABkAf6BcViBAQv4QW8kECNfAyxZcUEz9ApvoZQB1wAwkltt4m6zjiaBAQv4QW8kECNfAyxZcUEz9ApvoZQB1wAwkltt4n8hbpJbcJG64pFw4vL0ERYRFxEWERURFhEVERQRFREUERMRFBETERIRExESEREREhERERAREREQDxEQD1UOAGUAAjIBmhEWERcRFhEVERcRFREUERcRFBETERcRExESERcREhERERcREREQERcREA8RFw8OERcODREXDQwRFwwLERcLChEXCgkRFwkRFwgHBlVAAGcB/IFxWIEBC/hBbyQQI18DLFlxQTP0Cm+hlAHXADCSW23ibrOOJoEBC/hBbyQQI18DLFlxQTP0Cm+hlAHXADCSW23ifyFukltwkbrikXDi8vQyERURFhEVERQRFREUERMRFBETERIRExESEREREhERERAREREQDxEQDxDvEN4QzQBoACgQvBCrEJoQiRB4EGcQVhBFEDRDAAGaERYRFxEWERURFxEVERQRFxEUERMRFxETERIRFxESERERFxERERARFxEQDxEXDw4RFw4NERcNDBEXDAsRFwsKERcKCREXCREXCAcGVUAAagH+gXFYgQEL+EFvJBAjXwMsWXFBM/QKb6GUAdcAMJJbbeJus44mgQEL+EFvJBAjXwMsWXFBM/QKb6GUAdcAMJJbbeJ/IW6SW3CRuuKRcOLy9BEWERcRFhEVERYRFREUERURFBETERQRExESERMREhERERIREREQEREREA8REA9VDgBrAAIxATAw0x8BghCaKvIeuvLggdMP0/9ZbBLbPH8AbQHQERYRGBEWERURFxEVERQRGBEUERMRFxETERIRGBESERERFxERERARGBEQDxEXDw4RGA4NERcNDBEYDAsRFwsKERgKCREXCQgRGAgHERcHBhEYBgURFwUEERgEAxEXAwIRGAIBERcBERgAbgH4gXFYgQEL+EFvJBAjXwMsWXFBM/QKb6GUAdcAMJJbbeJus44mgQEL+EFvJBAjXwMsWXFBM/QKb6GUAdcAMJJbbeJ/IW6SW3CRuuKRcOLy9IEBASAQRxMCERkCAREaASFulVtZ9FowmMgBzwBBM/RC4hEUERYRFBETERUREwBvAGIREhEUERIRERETEREREBESERAPEREPDhEQDhDfEM4QvRCsEJsQihB5EGgQVxBGRDUSAeARFhEbERYRFREaERURFBEZERQRExEYERMREhEXERIREREbEREREBEaERAPERkPDhEYDg0RFw0MERsMCxEaCwoRGQoJERgJCBEXCAcRGwcGERoGBREZBQQRGAQDERcDAhEbAgERGgERGYEIRyXAAPL0AHEBooFNu4EBC/hBbyQQI18DLVlxQTP0Cm+hlAHXADCSW23ibrOOJoEBC/hBbyQQI18DLVlxQTP0Cm+hlAHXADCSW23ifyFukltwkbrikXDi8vRWGAByAqiCAMPtgQEBVhRAE1n0DW+hkjBt3yBukjBtji3Q0//6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIAdMP0/9VMGwUbwTibvL0VhdWG9s8VhkAtgBzBNogVhe6ILOOQVYRgQEBI1n0DW+hkjBt3yBukjBtjijQ+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiAHTB1lsEm8C4m6zkXDiIbOSILORcOKSMnDjDRIis5Ihs5Fw4pIgs5Fw4uMAAuMAAIgAgQB+AHQE/OMAj3ZWG1YYVhuBAQFWEQJZ9A1voZIwbd8gbpIwbY4o0PpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgB0wdZbBJvAuKCAL/MIW6z8vQgbvLQgG8iMPgobXDIydAQNRBGyFVQ2zzJghA7msoAf3BQBANtbds83oEBAQB5AHgBBAB1AvZWGFYdVh1WHchVMFA0y/8BINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8Wyw/L/8kCERMCVhoBIG6VMFn0WjCUQTP0FeIEERcEAxEYAwIRGgJWEgIBERoBERzIVVDbPMnIgljAAAAAAAAAAAAAAAABActnzMlw+wAAdwB2AE4REREWEREREBEVERAPERQPDhETDg0REg0PEREPCxEQCxCvVUkQNFgAlIIQZvDZjlAHyx8VgQEBzwATgQEBzwCBAQHPAAHIgQEBzwASgQEBzwBYINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WyQHMAMiCEIm3HQlQB8sfUAUg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxZQAyDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFoEBAc8AIW6zlX8BygDMlHAyygDiAfoCAc8WAv4RFhEXERYRFREXERURFBEXERQRExEXERMREhEXERIREREXEREREBEXERAPERcPDhEXDg0RFw0MERcMCxEXCwoRFwoJERcJERcIBwZVQFYcVhlWHNs8ERYRFxEWERURFhEVERQRFREUERMRFBETERIRExESEREREhERERAREREQAHsAegAMDxEQD1UOAq6BAQFWEwJZ9A1voZIwbd8gbpIwbY4o0PpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgB0wdZbBJvAuKBECEhbrPy9CBu8tCAbyIw+EP4KFjbPFwBBwB8AtJwWchwAcsBcwHLAXABywASzMzJ+QDIcgHLAXABywASygfL/8nQINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiPhBbyQQI18DbXDIydAhXjVVUMhVYNs8yQKCEB3NZQB/BVA0cFAj2zwAfQEEAMiCEA+KfqVQCMsfFss/UAT6Algg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxYBINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WIW6zlX8BygDMlHAyygDiAfoCAc8WAdgRFhEYERYRFREXERURFBEYERQRExEXERMREhEYERIREREXEREREBEYERAPERcPDhEYDg0RFw0MERgMCxEXCwoRGAoJERcJCBEYCAcRFwcGERgGBREXBQQRGAQDERcDAhEYAgERFwERGFYdVhoAfwK+gWsb+CdvEPhBbyQTXwOhUyWgvPL0UwOgAREWAaERFSOgiBJ/cEQEbW3bPBEWERgRFhEVERcRFREUERYRFBETERURExESERQREhERERMREREQERIREA8REQ8OERAOVR0AgAEEADoAAAAARnJvbSBFbW1ldC5GaW5hbmNlIEJyaWRnZQL+MBEWERgRFhEVERcRFREUERgRFBETERcRExESERgREhERERcREREQERgREA8RFw8OERgODREXDQwRGAwLERcLChEYCgkRFwkIERgIBxEXBwYRGAYFERcFBBEYBAMRFwMCERgCAREXAREYVhvbPBEWERgRFhEVERcRFREUERYRFACDAIIARhETERURExESERQREhERERMREREQERIREA8REQ8OERAOVR1/BGbIbwABb4xtb4wk2zwh2zzbPPhD+CjIcQHKBwNvIgHJkyFus5YBbyJZzMnoMVADzMlUSjMAtAC1ALQAhALm2zxccFnIcAHLAXMBywFwAcsAEszMyfkAyHIBywFwAcsAEsoHy//J0CDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IiBAQEhechZWSDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFssHyQMREwNBUACGAIUBRCBulTBZ9FowlEEz9BXighA7msoAWRERf4AQUFIUE21Z2zwBBAGOA9D0BDBtIYE9+QGAEPQPb6Hy4IcBgT35IgKAEPQXAoIAz5sBgBD0D2+h8uCHEoIAz5sBAoAQ9BfIAcj0AMkBzHABygBVIAQAhwCAWiDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFlgg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxbMyQCEgQEBVhFAFFn0DW+hkjBt3yBukjBtjijQ+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiAHTB1lsEm8C4m6zAdARFhEYERYRFREXERURFBEYERQRExEXERMREhEYERIREREXEREREBEYERAPERcPDhEYDg0RFw0MERgMCxEXCwoRGAoJERcJCBEYCAcRFwcGERgGBREXBQQRGAQDERcDAhEYAgERFwERGACKAfqBcViBAQv4QW8kECNfAyxZcUEz9ApvoZQB1wAwkltt4m6zjiaBAQv4QW8kECNfAyxZcUEz9ApvoZQB1wAwkltt4n8hbpJbcJG64pFw4vL0ERYRGBEWERURFxEVERQRFhEUERMRFRETERIRFBESERERExERERAREhEQDxERDwCLARAOERAOVR3bPACMAdIRFREYERURFBEXERQRExEWERMREhEYERIREREXEREREBEWERAPERgPDhEXDg0RFg0MERgMCxEXCwoRFgoJERgJCBEXCAcRFgcGERgGBREXBQQRFgQDERgDAhEXAgERFgERGIFk6BEYVhcAjQH8gQEBLQJZ9A1voZIwbd8gbpIwbZfQ1AHQMW8B4m6zAREZAfL0gQEBERnIAcgBzxbJAczJEDsCERkCAREXASBulTBZ9FowlEEz9BXiERMRFhETERIRFRESERERFBERERARExEQDxESDw4REQ4NERANEM8QvhCtEJwLEHoQaRBYAJsBmhEWERcRFhEVERcRFREUERcRFBETERcRExESERcREhERERcREREQERcREA8RFw8OERcODREXDQwRFwwLERcLChEXCgkRFwkRFwgHBlVAAI8BpoFxWIEBC/hBbyQQI18DLFlxQTP0Cm+hlAHXADCSW23ibrOOJoEBC/hBbyQQI18DLFlxQTP0Cm+hlAHXADCSW23ifyFukltwkbrikXDi8vSBAQFtAJAB/CBukjBtjisgbvLQgG8iyFlZINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WywfJ4hAvVhkBIG6VMFn0WjCUQTP0FeKBAQFtIG6SMG2OESBu8tCAbyHIAcgBzxbJAczJ4hA+EgERGQEgbpUwWfRaMJRBM/QV4hEVERYRFQCRAHIRFBEVERQRExEUERMREhETERIRERESEREREBERERAPERAPEO8Q3gwQqxCaEIkQeBBnEFYQRRA0QTABmhEWERcRFhEVERcRFREUERcRFBETERcRExESERcREhERERcREREQERcREA8RFw8OERcODREXDQwRFwwLERcLChEXCgkRFwkRFwgHBlVAAJMBpoFxWIEBC/hBbyQQI18DLFlxQTP0Cm+hlAHXADCSW23ibrOOJoEBC/hBbyQQI18DLFlxQTP0Cm+hlAHXADCSW23ifyFukltwkbrikXDi8vSBAQFtAJQB+CBukjBtjisgbvLQgG8iyFlZINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WywfJ4gIREQJWGQEgbpUwWfRaMJRBM/QV4oEBAW0gbpIwbY4RIG7y0IBvIcgByAHPFskBzMniAxEQAxIBERkBIG6VMFn0WjCUQTP0FeIAlQB+ERURFhEVERQRFREUERMRFBETERIRExESEREREhERERAREREQDxEQDw4QzRC8EKsQmhCJEHgQZxBWEEUQNEEwAdARFhEYERYRFREXERURFBEYERQRExEXERMREhEYERIREREXEREREBEYERAPERcPDhEYDg0RFw0MERgMCxEXCwoRGAoJERcJCBEYCAcRFwcGERgGBREXBQQRGAQDERcDAhEYAgERFwERGACXAfqBcViBAQv4QW8kECNfAyxZcUEz9ApvoZQB1wAwkltt4m6zjiaBAQv4QW8kECNfAyxZcUEz9ApvoZQB1wAwkltt4n8hbpJbcJG64pFw4vL0ERYRGBEWERURFxEVERQRFhEUERMRFRETERIRFBESERERExERERAREhEQDxERDwCYARAOERAOVR3bPACZAdQRFREYERURFBEXERQRExEWERMREhEYERIREREXEREREBEWERAPERgPDhEXDg0RFg0MERgMCxEXCwoRFgoJERgJCBEXCAcRFgcGERgGBREXBQQRFgQDERgDAhEXAgERFgERGIIA3pYRGFYXAJoB/oEBAS0CWfQNb6GSMG3fIG6SMG2X0NQB0DFvAeJus7MBERkB8vSBAQERGcgByAHPFskBzMkQOwIRGQIBERcBIG6VMFn0WjCUQTP0FeIRExEWERMREhEVERIREREUEREREBETERAPERIPDhERDg0REA0QzxC+EK0QnAsQehBpEFgAmwAQEEcQNkUEQBMBgDDTHwGCEDrzpjy68uCBgQEB1wDUAdAB+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiAHTB1UwbBTbPH8AnQHQERYRGhEWERURGREVERQRGBEUERMRFxETERIRGhESERERGRERERARGBEQDxEXDw4RGg4NERkNDBEYDAsRFwsKERoKCREZCQgRGAgHERcHBhEaBgURGQUEERgEAxEXAwIRGgIBERkBERgAngH6gXFYgQEL+EFvJBAjXwMsWXFBM/QKb6GUAdcAMJJbbeJus44mgQEL+EFvJBAjXwMsWXFBM/QKb6GUAdcAMJJbbeJ/IW6SW3CRuuKRcOLy9BEWERoRFhEVERkRFREUERgRFBETERcRExESERYREhERERUREREQERQREA8REw8AnwDiDhESDg0REQ0MERAMEL9VOgKBAQECyFlZINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WywfJAhERAlYRASBulTBZ9FowlEEz9BXigQEBAsgByAHPFskBzMkQPwEREAEgbpUwWfRaMJRBM/QV4gwB0BEWERoRFhEVERkRFREUERgRFBETERcRExESERoREhERERkREREQERgREA8RFw8OERoODREZDQwRGAwLERcLChEaCgkRGQkIERgIBxEXBwYRGgYFERkFBBEYBAMRFwMCERoCAREZAREYAKEB+oFxWIEBC/hBbyQQI18DLFlxQTP0Cm+hlAHXADCSW23ibrOOJoEBC/hBbyQQI18DLFlxQTP0Cm+hlAHXADCSW23ifyFukltwkbrikXDi8vQRFhEaERYRFREZERURFBEYERQRExEXERMREhEWERIREREVEREREBEUERAPERMPAKIA5g4REg4NERENDBEQDBC/VToCgQEBAshZWSDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFssHyQIREwJWEwEgbpUwWfRaMJRBM/QV4oEBAQLIAcgBzxbJAczJAxERAwEREgEgbpUwWfRaMJRBM/QV4g4C8hEWERoRFhEVERkRFREUERgRFBETERcRExESERoREhERERkREREQERgREA8RFw8OERoODREZDQwRGAwLERcLChEaCgkRGQkIERgIBxEXBwYRGgYFERkFBBEYBAMRFwMCERoCAREZAREYgQhHJcAA8vQRFqQRFlYX2zwAsQCkAfqBAQFUVwBWGwFBM/QMb6GUAdcAMJJbbeKCAMRFIW6z8vSCAPe1+EFvJBNfAwIgbvLQgFYcoCSgEr7y9BEWERcRFhEVERcRFREUERcRFBETERcRExESERcREhERERcREREQERcREA8RFw8OERcODREXDQwRFwwLERcLChEXCgClAvwJERcJERcIBwZVQFYZgUNe+EFvJBNfAyK+8vQRFFYUoAERFQERFKARFAQRGgQDERkDAhEXAlYSAgERHAERGRBFEDRAE8hVUNs8yciCWMAAAAAAAAAAAAAAAAEBy2fMyXD7ABERERYREREQERUREA8RFA8OERMODRESDQwREQwAsACmADILERALEK8QnhCNEHwQaxBaEEkQOEcVQ2MUAfQ1XwOCAIpn+EFvJBAjXwMnxwXy9BEWERgRFhEVERcRFREUERgRFBETERcRExESERgREhERERcREREQERgREA8RFw8OERgODREXDQwRGAwLERcLChEYCgkRFwkIERgIBxEXBwYRGAYFERcFBBEYBAMRFwMCERgCAREXAQCoAfwRGIEIRyXAAPL0ERfTD4EBAVRXAFJAQTP0DG+hlAHXADCSW23iggDERSFus/L0ggD3tfhBbyQTXwMCIG7y0IBWG6ASvvL0ERekERfUAdDT/zAB1DARFhEYERYRFREXERURFBEYERQRExEXERMREhEYERIREREXEREREBEYERAAqQTSDxEXDw4RGA4NERcNDBEYDAsRFwsKERgKCREXCQgRGAgHERcHBhEYBgURFwUEERgEAxEXAwIRGAIBERcBERlWGlYZ2zxWGNs8MAMRGQMCERoCVhYCVhMCAREZAREaEEUQNEATyFVQ2zzJALYAsQCwAKoAesiCWMAAAAAAAAAAAAAAAAEBy2fMyXD7ABESERYREhERERUREREQERQREA8REw8OERIODRERDQwREAxVOxMB7DEyERYRGBEWERURFxEVERQRGBEUERMRFxETERIRGBESERERFxERERARGBEQDxEXDw4RGA4NERcNDBEYDAsRFwsKERgKCREXCQgRGAgHERcHBhEYBgURFwUEERgEAxEXAwIRGAIBERcBERiBCEclwADy9BEX0w8ArALuERYRFxEWERURFxEVERQRFxEUERMRFxETERIRFxESERERFxERERARFxEQDxEXDw4RFw4NERcNDBEXDAsRFwsKERcKCREXCQgRFwgHERcHBhEXBgURFwUEERcEAxEXAwIRFwIBERcBERhWGVYY2zyBAQFUVgBWGgEAtgCtAfxBM/QMb6GUAdcAMJJbbeKCAMRFIW6z8vSCAPe1+EFvJBNfAwIgbvLQgCOgEr7y9BEWpBEY0//UMBEWERkRFhEVERkRFREUERkRFBETERkRExESERkREhERERkREREQERkREA8RGQ8OERkODREZDQwRGQwLERkLChEZCgkRGQkArgP8CBEZCAcRGQcGERkGBREZBQQRGQQDERkDAhEZAgERGQERF1YY2zwEERgEAxEbAwJWEwIBERsBERoQRRA0QBPIVVDbPMnIgljAAAAAAAAAAAAAAAABActnzMlw+wAREhEWERIREREVEREREBEUERAPERMPDhESDg0REQ0MERAMALEAsACvAARVOwBaghDhzw8OUAfLHxWBAQHPABOBAQHPAIEBAc8AAciBAQHPABKBAQHPABLMyQHMBEyCAOfEIVYVvZMhwwCRcOLy9MhvAAFvjG1vjFYU2zzbPIsS2Ns8AQC1ALQAtACyBBbbPNs8ixLY2zxWFwC1ALQAtACzAjDbPNs8byIByZMhbrOWAW8iWczJ6DHQ+QIAtQC0ALog10oh10mXIMIAIsIAsY5KA28igH8izzGrAqEFqwJRVbYIIMIAnCCqAhXXGFAzzxZAFN5ZbwJTQaHCAJnIAW8CUEShqgKOEjEzwgCZ1DDQINdKIddJknAg4uLoXwMA3sghwQCYgC0BywcBowHeIYI4Mnyyc0EZ07epqh25jiBwIHGOFAR6qQymMCWoEqAEqgcCpCHAAEUw5jAzqgLPAY4rbwBwjhEjeqkIEm+MAaQDeqkEIMAAFOYzIqUDnFMCb4GmMFjLBwKlWeQwMeLJ0AH0gXyhAsIAEvL0ERYRFxEWERURFxEVERQRFxEUERMRFxETERIRFxESERERFxERERARFxEQDxEXDw4RFw4NERcNDBEXDAsRFwsKERcKCREXCREXCAcGVUCCAKbAERiBAQEtAln0DW+hkjBt3yBukjBtl9DUAdAxbwHibrMAtwBgAREYAfL0ERURFhEVERQRFREUERMRFBETERIRExESEREREhERERAREREQDxEQD1UOA5ztRNDUAfhj0gABjq7bPFcXERURFhEVERQRFREUERMRFBETERIRExESEREREhERERAREREQDxEQD1UO4Pgo1wsKgwm68uCJ2zwG0VUE2zwAxADDALkE6G1tbW1tbW1tbW1tbXBwUxH4QW8kECNfA/hBbyQQI18DBREXBQMRFQMCERQCBRETBRERERIREREQEREREA8REA8Q7xDeEM0QvBCrEJoQiRcYEEUQNBAj2zz4QW8kECNfA9s8+EFvJBAjXwPbPPhBbyQQI18DAMEAvwC9ALoBBNs8ALsB8BEWERcRFhEVERcRFREUERcRFBETERcRExESERcREhERERcREREQERcREA8RFw8OERcODREXDQwRFwwLERcLChEXCgkRFwkRFwgHBlVAgRkm+EFvJBAjXwMoxwXy9BeBAQsBERh/cSFulVtZ9FkwmMgBzwBBM/RB4gC8AIARFREWERURFBEVERQRExEUERMREhETERIRERESEREREBERERAPERAPEO8Q3hDNELwQqxCaEIkHCBBWEEUQNEEwAfARFhEXERYRFREXERURFBEXERQRExEXERMREhEXERIREREXEREREBEXERAPERcPDhEXDg0RFw0MERcMCxEXCwoRFwoJERcJERcIBwZVQIEZJvhBbyQQI18DKMcF8vQYgQELAREYf3EhbpVbWfRZMJjIAc8AQTP0QeIAvgCAERURFhEVERQRFREUERMRFBETERIRExESEREREhERERAREREQDxEQDxDvEN4QzRC8EKsQmggJEGcQVhBFEDRBMAHwERYRFxEWERURFxEVERQRFxEUERMRFxETERIRFxESERERFxERERARFxEQDxEXDw4RFw4NERcNDBEXDAsRFwsKERcKCREXCREXCAcGVUCBGSb4QW8kECNfAyjHBfL0GYEBCwERGH9xIW6VW1n0WTCYyAHPAEEz9EHiAMAAgBEVERYRFREUERURFBETERQRExESERMREhERERIREREQEREREA8REA8Q7xDeEM0QvBCrCQoQeBBnEFYQRRA0QTAB8BEWERcRFhEVERcRFREUERcRFBETERcRExESERcREhERERcREREQERcREA8RFw8OERcODREXDQwRFwwLERcLChEXCgkRFwkRFwgHBlVAgRkm+EFvJBAjXwMoxwXy9BqBAQsBERh/cSFulVtZ9FkwmMgBzwBBM/RB4gDCAIARFREWERURFBEVERQRExEUERMREhETERIRERESEREREBERERAPERAPEO8Q3hDNELwKCxCJEHgQZxBWEEUQNEEwAIiBAQHXAIEBAdcA+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiAHUAdAB1AHQgQEB1wCBAQHXADAQJhAlECQQIwG+gQEB1wCBAQHXAIEBAdcA1AHQgQEB1wCBAQHXAPQE9AT0BNQw0PQE9AT0BNQw0PQE9AT0BNQw0PQE9AT6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIAfQE0gAAxQCI+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiAHUMNDUAdABgQEB1wCBAQHXADARFBEXERQRFBEWERQRFBEVERQBBbXzcADHART/APSkE/S88sgLAMgCAWIA0QDJAgEgAM8AygIBIADOAMsCAUgAzQDMAHWybuNDVpcGZzOi8vUW1RWnVTS3FYUUFYSFZpWmFHWkRjTDF6S2VjdUVxbjJEMkdMTW95aXVxcXNSY4IAARsK+7UTQ0gABgALm7vRgnBc7D1dLK57HoTsOdZKhRtmgnCd1jUtK2R8syLTry398WI5gnAgVcAbgGdjlM5YOq5HJbLDgnAb1J3vlUWW8cdT094FWcMmgnCdl05as07LczoOlm2UZuikgCEb/YFtnm2eNhpADiANABLFRyEFR1Q1QXYfhDURLbPGwyMBA2RUABBwN60AHQ0wMB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");
    let builder = (0, core_1.beginCell)();
    builder.storeRef(__system);
    builder.storeUint(0, 1);
    initBridge_init_args({
        $$type: "Bridge_init_args",
        chain_nonce,
        native_coin,
        burner,
        base_uri,
        transfer_fee,
        protocol_fee,
    })(builder);
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
    2119: { message: `contract is currently paused.` },
    2296: {
        message: `JettonWallet: Only Jetton master or Jetton wallet can call this function`,
    },
    4129: { message: `Invalid native token id provided` },
    5109: { message: `sender does not have withdrawer role` },
    6438: { message: `sender does not have admin role` },
    9739: { message: `Sender is not a Jetton wallet` },
    13105: { message: `JettonWallet: Not enough jettons to transfer` },
    17246: { message: `Insufficient funds Provided` },
    17773: { message: `JettonMaster: Mint can only be performed by owner` },
    19899: { message: `sender is not a bridge validator` },
    23041: { message: `No fees to withdraw` },
    25832: { message: `Previously unsupported chain. Use Add instead.` },
    27419: { message: `Insufficient Funds` },
    27831: { message: `Only owner can call this function` },
    27954: { message: `JettonMaster: Only Admin can set new owner.` },
    29016: { message: `sender does not have mapping admin role` },
    29133: {
        message: `JettonWallet: Not allow negative balance after internal transfer`,
    },
    30061: { message: `JettonMaster: Jetton is not mintable` },
    31905: { message: `The amount must be 0 < amount < 2^256` },
    35431: { message: `Only Burner Can Call this Method` },
    35462: { message: `JettonMaster: Only Admin can set new admin.` },
    37185: { message: `Not enough funds to transfer` },
    42688: { message: `Unsupported chain ID` },
    43365: { message: `JettonMaster: Sender is not a Jetton owner` },
    47048: { message: `JettonWallet: Only owner can burn tokens` },
    48104: { message: `sender does not have pauser role` },
    49100: { message: `Invalid wrapped token id provided` },
    50157: { message: `Previously Processed Transaction.` },
    50245: { message: `Fees not configured for this chain` },
    56982: { message: `Overwriting an existing chain. Use Update instead.` },
    59332: { message: `Target chainId cannot equal native or zero` },
    60354: { message: `JettonWallet: Not enough balance to burn tokens` },
    63413: { message: `Insufficient fee coverage.` },
};
const Bridge_types = [
    {
        name: "StateInit",
        header: null,
        fields: [
            { name: "code", type: { kind: "simple", type: "cell", optional: false } },
            { name: "data", type: { kind: "simple", type: "cell", optional: false } },
        ],
    },
    {
        name: "Context",
        header: null,
        fields: [
            {
                name: "bounced",
                type: { kind: "simple", type: "bool", optional: false },
            },
            {
                name: "sender",
                type: { kind: "simple", type: "address", optional: false },
            },
            {
                name: "value",
                type: { kind: "simple", type: "int", optional: false, format: 257 },
            },
            { name: "raw", type: { kind: "simple", type: "slice", optional: false } },
        ],
    },
    {
        name: "SendParameters",
        header: null,
        fields: [
            {
                name: "bounce",
                type: { kind: "simple", type: "bool", optional: false },
            },
            {
                name: "to",
                type: { kind: "simple", type: "address", optional: false },
            },
            {
                name: "value",
                type: { kind: "simple", type: "int", optional: false, format: 257 },
            },
            {
                name: "mode",
                type: { kind: "simple", type: "int", optional: false, format: 257 },
            },
            { name: "body", type: { kind: "simple", type: "cell", optional: true } },
            { name: "code", type: { kind: "simple", type: "cell", optional: true } },
            { name: "data", type: { kind: "simple", type: "cell", optional: true } },
        ],
    },
    {
        name: "Deploy",
        header: 2490013878,
        fields: [
            {
                name: "queryId",
                type: { kind: "simple", type: "uint", optional: false, format: 64 },
            },
        ],
    },
    {
        name: "DeployOk",
        header: 2952335191,
        fields: [
            {
                name: "queryId",
                type: { kind: "simple", type: "uint", optional: false, format: 64 },
            },
        ],
    },
    {
        name: "FactoryDeploy",
        header: 1829761339,
        fields: [
            {
                name: "queryId",
                type: { kind: "simple", type: "uint", optional: false, format: 64 },
            },
            {
                name: "cashback",
                type: { kind: "simple", type: "address", optional: false },
            },
        ],
    },
    {
        name: "JettonTransfer",
        header: 260734629,
        fields: [
            {
                name: "query_id",
                type: { kind: "simple", type: "uint", optional: false, format: 64 },
            },
            {
                name: "amount",
                type: {
                    kind: "simple",
                    type: "uint",
                    optional: false,
                    format: "coins",
                },
            },
            {
                name: "destination",
                type: { kind: "simple", type: "address", optional: false },
            },
            {
                name: "response_destination",
                type: { kind: "simple", type: "address", optional: false },
            },
            {
                name: "custom_payload",
                type: { kind: "simple", type: "cell", optional: true },
            },
            {
                name: "forward_ton_amount",
                type: {
                    kind: "simple",
                    type: "uint",
                    optional: false,
                    format: "coins",
                },
            },
            {
                name: "forward_payload",
                type: {
                    kind: "simple",
                    type: "slice",
                    optional: false,
                    format: "remainder",
                },
            },
        ],
    },
    {
        name: "JettonTransferNotification",
        header: 1935855772,
        fields: [
            {
                name: "query_id",
                type: { kind: "simple", type: "uint", optional: false, format: 64 },
            },
            {
                name: "amount",
                type: {
                    kind: "simple",
                    type: "uint",
                    optional: false,
                    format: "coins",
                },
            },
            {
                name: "sender",
                type: { kind: "simple", type: "address", optional: false },
            },
            {
                name: "forward_payload",
                type: {
                    kind: "simple",
                    type: "slice",
                    optional: false,
                    format: "remainder",
                },
            },
        ],
    },
    {
        name: "JettonBurn",
        header: 1499400124,
        fields: [
            {
                name: "query_id",
                type: { kind: "simple", type: "uint", optional: false, format: 64 },
            },
            {
                name: "amount",
                type: {
                    kind: "simple",
                    type: "uint",
                    optional: false,
                    format: "coins",
                },
            },
            {
                name: "response_destination",
                type: { kind: "simple", type: "address", optional: false },
            },
            {
                name: "custom_payload",
                type: { kind: "simple", type: "cell", optional: true },
            },
            {
                name: "forward_ton_amount",
                type: {
                    kind: "simple",
                    type: "uint",
                    optional: false,
                    format: "coins",
                },
            },
            {
                name: "forward_payload",
                type: {
                    kind: "simple",
                    type: "slice",
                    optional: false,
                    format: "remainder",
                },
            },
        ],
    },
    {
        name: "JettonExcesses",
        header: 3576854235,
        fields: [
            {
                name: "query_id",
                type: { kind: "simple", type: "uint", optional: false, format: 64 },
            },
        ],
    },
    {
        name: "JettonInternalTransfer",
        header: 395134233,
        fields: [
            {
                name: "query_id",
                type: { kind: "simple", type: "uint", optional: false, format: 64 },
            },
            {
                name: "amount",
                type: {
                    kind: "simple",
                    type: "uint",
                    optional: false,
                    format: "coins",
                },
            },
            {
                name: "from",
                type: { kind: "simple", type: "address", optional: false },
            },
            {
                name: "response_address",
                type: { kind: "simple", type: "address", optional: false },
            },
            {
                name: "forward_ton_amount",
                type: {
                    kind: "simple",
                    type: "uint",
                    optional: false,
                    format: "coins",
                },
            },
            {
                name: "forward_payload",
                type: {
                    kind: "simple",
                    type: "slice",
                    optional: false,
                    format: "remainder",
                },
            },
        ],
    },
    {
        name: "JettonBurnNotification",
        header: 2078119902,
        fields: [
            {
                name: "query_id",
                type: { kind: "simple", type: "uint", optional: false, format: 64 },
            },
            {
                name: "amount",
                type: {
                    kind: "simple",
                    type: "uint",
                    optional: false,
                    format: "coins",
                },
            },
            {
                name: "sender",
                type: { kind: "simple", type: "address", optional: false },
            },
            {
                name: "response_destination",
                type: { kind: "simple", type: "address", optional: false },
            },
            {
                name: "forward_ton_amount",
                type: {
                    kind: "simple",
                    type: "uint",
                    optional: false,
                    format: "coins",
                },
            },
            {
                name: "forward_payload",
                type: {
                    kind: "simple",
                    type: "slice",
                    optional: false,
                    format: "remainder",
                },
            },
        ],
    },
    {
        name: "WalletData",
        header: null,
        fields: [
            {
                name: "balance",
                type: {
                    kind: "simple",
                    type: "uint",
                    optional: false,
                    format: "coins",
                },
            },
            {
                name: "owner",
                type: { kind: "simple", type: "address", optional: false },
            },
            {
                name: "jetton",
                type: { kind: "simple", type: "address", optional: false },
            },
            {
                name: "jetton_wallet_code",
                type: { kind: "simple", type: "cell", optional: false },
            },
        ],
    },
    {
        name: "JettonData",
        header: null,
        fields: [
            {
                name: "total_supply",
                type: {
                    kind: "simple",
                    type: "uint",
                    optional: false,
                    format: "coins",
                },
            },
            {
                name: "mintable",
                type: { kind: "simple", type: "bool", optional: false },
            },
            {
                name: "admin_address",
                type: { kind: "simple", type: "address", optional: false },
            },
            {
                name: "jetton_content",
                type: { kind: "simple", type: "cell", optional: false },
            },
            {
                name: "jetton_wallet_code",
                type: { kind: "simple", type: "cell", optional: false },
            },
        ],
    },
    {
        name: "JettonMint",
        header: 2310479113,
        fields: [
            {
                name: "origin",
                type: { kind: "simple", type: "address", optional: false },
            },
            {
                name: "receiver",
                type: { kind: "simple", type: "address", optional: false },
            },
            {
                name: "amount",
                type: { kind: "simple", type: "int", optional: false, format: 257 },
            },
            {
                name: "custom_payload",
                type: { kind: "simple", type: "cell", optional: true },
            },
            {
                name: "forward_ton_amount",
                type: {
                    kind: "simple",
                    type: "uint",
                    optional: false,
                    format: "coins",
                },
            },
            {
                name: "forward_payload",
                type: {
                    kind: "simple",
                    type: "slice",
                    optional: false,
                    format: "remainder",
                },
            },
        ],
    },
    {
        name: "UpdateAdmin",
        header: 367316568,
        fields: [
            {
                name: "new_admin",
                type: { kind: "simple", type: "address", optional: false },
            },
        ],
    },
    {
        name: "UpdateOwner",
        header: 559076492,
        fields: [
            {
                name: "new_owner",
                type: { kind: "simple", type: "address", optional: false },
            },
        ],
    },
    {
        name: "UpdateBridgeAdmin",
        header: 3847367118,
        fields: [
            {
                name: "new_admin",
                type: { kind: "simple", type: "address", optional: false },
            },
        ],
    },
    {
        name: "RevokeBridgeValidatorRole",
        header: 1297781476,
        fields: [
            {
                name: "address_to_be_revoked",
                type: { kind: "simple", type: "address", optional: false },
            },
        ],
    },
    {
        name: "RevokeMappingAdminRole",
        header: 749574624,
        fields: [
            {
                name: "address_to_be_revoked",
                type: { kind: "simple", type: "address", optional: false },
            },
        ],
    },
    {
        name: "RevokePauserRole",
        header: 3801506133,
        fields: [
            {
                name: "address_to_be_revoked",
                type: { kind: "simple", type: "address", optional: false },
            },
        ],
    },
    {
        name: "RevokeWithdrawerRole",
        header: 3011775919,
        fields: [
            {
                name: "address_to_be_revoked",
                type: { kind: "simple", type: "address", optional: false },
            },
        ],
    },
    {
        name: "GrantBridgeValidatorRole",
        header: 1023274182,
        fields: [
            {
                name: "address",
                type: { kind: "simple", type: "address", optional: false },
            },
        ],
    },
    {
        name: "GrantMappingAdminRole",
        header: 3374741213,
        fields: [
            {
                name: "address",
                type: { kind: "simple", type: "address", optional: false },
            },
        ],
    },
    {
        name: "GrantPauserRole",
        header: 835048487,
        fields: [
            {
                name: "address",
                type: { kind: "simple", type: "address", optional: false },
            },
        ],
    },
    {
        name: "GrantWithdrawerRole",
        header: 1198756930,
        fields: [
            {
                name: "address",
                type: { kind: "simple", type: "address", optional: false },
            },
        ],
    },
    {
        name: "TokenType",
        header: null,
        fields: [
            {
                name: "is_native_coin",
                type: { kind: "simple", type: "bool", optional: false },
            },
            {
                name: "is_native_token",
                type: { kind: "simple", type: "bool", optional: false },
            },
            {
                name: "is_wrapped_token",
                type: { kind: "simple", type: "bool", optional: false },
            },
        ],
    },
    {
        name: "SendInstallment",
        header: 3788443406,
        fields: [
            {
                name: "amount",
                type: { kind: "simple", type: "int", optional: false, format: 257 },
            },
            {
                name: "tx_id",
                type: { kind: "simple", type: "int", optional: false, format: 257 },
            },
            {
                name: "native_chain_nonce",
                type: { kind: "simple", type: "int", optional: false, format: 257 },
            },
            {
                name: "target_chain",
                type: { kind: "simple", type: "int", optional: false, format: 257 },
            },
            {
                name: "token_id",
                type: { kind: "simple", type: "int", optional: false, format: 257 },
            },
            {
                name: "destination_address",
                type: { kind: "simple", type: "cell", optional: false },
            },
        ],
    },
    {
        name: "ReceivedInstallment",
        header: 1727060366,
        fields: [
            {
                name: "amount",
                type: { kind: "simple", type: "int", optional: false, format: 257 },
            },
            {
                name: "tx_id",
                type: { kind: "simple", type: "int", optional: false, format: 257 },
            },
            {
                name: "chain_nonce",
                type: { kind: "simple", type: "int", optional: false, format: 257 },
            },
            {
                name: "native_chain_nonce",
                type: { kind: "simple", type: "int", optional: false, format: 257 },
            },
            {
                name: "token_id",
                type: { kind: "simple", type: "int", optional: false, format: 257 },
            },
            {
                name: "destination_address",
                type: { kind: "simple", type: "address", optional: false },
            },
        ],
    },
    {
        name: "FreezeTon",
        header: 1454467380,
        fields: [
            {
                name: "target_chain",
                type: { kind: "simple", type: "int", optional: false, format: 257 },
            },
            {
                name: "token_id",
                type: { kind: "simple", type: "int", optional: false, format: 257 },
            },
            { name: "to", type: { kind: "simple", type: "cell", optional: false } },
            {
                name: "amount",
                type: { kind: "simple", type: "int", optional: false, format: 257 },
            },
        ],
    },
    {
        name: "MapNativeContract",
        header: 184326790,
        fields: [
            {
                name: "token_id",
                type: { kind: "simple", type: "int", optional: false, format: 257 },
            },
            {
                name: "token_symbol",
                type: { kind: "simple", type: "string", optional: false },
            },
            {
                name: "contract",
                type: { kind: "simple", type: "address", optional: false },
            },
            {
                name: "decimals",
                type: { kind: "simple", type: "uint", optional: false, format: 8 },
            },
        ],
    },
    {
        name: "MapWrappedContract",
        header: 989046332,
        fields: [
            {
                name: "token_id",
                type: { kind: "simple", type: "int", optional: false, format: 257 },
            },
            {
                name: "token_symbol",
                type: { kind: "simple", type: "string", optional: false },
            },
            {
                name: "contract",
                type: { kind: "simple", type: "address", optional: false },
            },
            {
                name: "decimals",
                type: { kind: "simple", type: "uint", optional: false, format: 8 },
            },
        ],
    },
    {
        name: "AddChain",
        header: 2751922069,
        fields: [
            {
                name: "chain_id",
                type: { kind: "simple", type: "uint", optional: false, format: 16 },
            },
            {
                name: "chain_name",
                type: { kind: "simple", type: "string", optional: false },
            },
        ],
    },
    {
        name: "UpdateChain",
        header: 1203306390,
        fields: [
            {
                name: "chain_id",
                type: { kind: "simple", type: "uint", optional: false, format: 16 },
            },
            {
                name: "chain_name",
                type: { kind: "simple", type: "string", optional: false },
            },
        ],
    },
    {
        name: "ReceiveInstallment",
        header: 882722431,
        fields: [
            {
                name: "tx_id",
                type: { kind: "simple", type: "int", optional: false, format: 257 },
            },
            {
                name: "installment",
                type: { kind: "simple", type: "InstallmentIn", optional: false },
            },
        ],
    },
    {
        name: "SetChainFee",
        header: 2586505758,
        fields: [
            {
                name: "chain_id",
                type: { kind: "simple", type: "uint", optional: false, format: 16 },
            },
            {
                name: "fee",
                type: { kind: "simple", type: "uint", optional: false, format: 256 },
            },
        ],
    },
    {
        name: "InstallmentIn",
        header: null,
        fields: [
            {
                name: "amount",
                type: { kind: "simple", type: "uint", optional: false, format: 256 },
            },
            {
                name: "to",
                type: { kind: "simple", type: "address", optional: false },
            },
            {
                name: "chain_id",
                type: { kind: "simple", type: "uint", optional: false, format: 16 },
            },
            {
                name: "token_id",
                type: { kind: "simple", type: "uint", optional: false, format: 256 },
            },
        ],
    },
    {
        name: "InstallmentOut",
        header: null,
        fields: [
            {
                name: "amount",
                type: { kind: "simple", type: "uint", optional: false, format: 256 },
            },
            { name: "to", type: { kind: "simple", type: "string", optional: false } },
            {
                name: "target_chain",
                type: { kind: "simple", type: "uint", optional: false, format: 16 },
            },
            {
                name: "token_id",
                type: { kind: "simple", type: "int", optional: false, format: 257 },
            },
        ],
    },
    {
        name: "Token",
        header: null,
        fields: [
            {
                name: "address",
                type: { kind: "simple", type: "address", optional: false },
            },
            {
                name: "decimals",
                type: { kind: "simple", type: "uint", optional: false, format: 8 },
            },
        ],
    },
    {
        name: "ChainName",
        header: null,
        fields: [
            {
                name: "name",
                type: { kind: "simple", type: "string", optional: false },
            },
        ],
    },
    {
        name: "TokenSymbol",
        header: null,
        fields: [
            {
                name: "symbol",
                type: { kind: "simple", type: "string", optional: false },
            },
        ],
    },
    {
        name: "UpdateBaseUri",
        header: 3032156853,
        fields: [
            {
                name: "new_base_uri",
                type: { kind: "simple", type: "string", optional: false },
            },
        ],
    },
    {
        name: "UpdateTransferFee",
        header: 1793030273,
        fields: [
            {
                name: "new_fee",
                type: { kind: "simple", type: "int", optional: false, format: 257 },
            },
        ],
    },
    {
        name: "RemoveNativeMappedContract",
        header: 3180152699,
        fields: [
            {
                name: "token_id",
                type: { kind: "simple", type: "uint", optional: false, format: 256 },
            },
        ],
    },
    {
        name: "RemoveWrappedMappedContract",
        header: 3150919874,
        fields: [
            {
                name: "token_id",
                type: { kind: "simple", type: "uint", optional: false, format: 256 },
            },
        ],
    },
    {
        name: "UpdateProtocolFee",
        header: 865129320,
        fields: [
            {
                name: "new_fee",
                type: { kind: "simple", type: "int", optional: false, format: 257 },
            },
        ],
    },
];
const Bridge_getters = [
    {
        name: "is_paused",
        arguments: [],
        returnType: { kind: "simple", type: "bool", optional: false },
    },
    {
        name: "bridge_validator_role",
        arguments: [],
        returnType: { kind: "dict", key: "address", value: "bool" },
    },
    {
        name: "mapping_admin_role",
        arguments: [],
        returnType: { kind: "dict", key: "address", value: "bool" },
    },
    {
        name: "pauser_role",
        arguments: [],
        returnType: { kind: "dict", key: "address", value: "bool" },
    },
    {
        name: "withdrawer_role",
        arguments: [],
        returnType: { kind: "dict", key: "address", value: "bool" },
    },
    {
        name: "default_admin_role",
        arguments: [],
        returnType: { kind: "simple", type: "address", optional: false },
    },
    {
        name: "base_uri",
        arguments: [],
        returnType: { kind: "simple", type: "string", optional: false },
    },
    {
        name: "protocol_fee",
        arguments: [],
        returnType: { kind: "simple", type: "int", optional: false, format: 257 },
    },
    {
        name: "nonce",
        arguments: [],
        returnType: { kind: "simple", type: "int", optional: false, format: 257 },
    },
    {
        name: "native_coin",
        arguments: [],
        returnType: { kind: "simple", type: "int", optional: false, format: 257 },
    },
    {
        name: "fees",
        arguments: [],
        returnType: { kind: "simple", type: "int", optional: false, format: 257 },
    },
    {
        name: "TVL",
        arguments: [],
        returnType: { kind: "simple", type: "int", optional: false, format: 257 },
    },
    {
        name: "chain_nonce",
        arguments: [],
        returnType: { kind: "simple", type: "int", optional: false, format: 257 },
    },
    {
        name: "incoming",
        arguments: [],
        returnType: {
            kind: "dict",
            key: "int",
            value: "InstallmentIn",
            valueFormat: "ref",
        },
    },
    {
        name: "outgoing",
        arguments: [],
        returnType: {
            kind: "dict",
            key: "int",
            value: "InstallmentOut",
            valueFormat: "ref",
        },
    },
    {
        name: "native_tokens",
        arguments: [],
        returnType: {
            kind: "dict",
            key: "int",
            value: "Token",
            valueFormat: "ref",
        },
    },
    {
        name: "native_token_id_to_symbol",
        arguments: [],
        returnType: {
            kind: "dict",
            key: "int",
            value: "TokenSymbol",
            valueFormat: "ref",
        },
    },
    {
        name: "wrapped_tokens",
        arguments: [],
        returnType: {
            kind: "dict",
            key: "int",
            value: "Token",
            valueFormat: "ref",
        },
    },
    {
        name: "supported_chains",
        arguments: [],
        returnType: {
            kind: "dict",
            key: "int",
            value: "ChainName",
            valueFormat: "ref",
        },
    },
    {
        name: "wrapped_token_id_to_symbol",
        arguments: [],
        returnType: {
            kind: "dict",
            key: "int",
            value: "TokenSymbol",
            valueFormat: "ref",
        },
    },
    {
        name: "chain_fees",
        arguments: [],
        returnType: { kind: "dict", key: "int", value: "int" },
    },
];
const Bridge_receivers = [
    {
        receiver: "internal",
        message: { kind: "typed", type: "JettonTransferNotification" },
    },
    {
        receiver: "internal",
        message: { kind: "typed", type: "JettonBurnNotification" },
    },
    { receiver: "internal", message: { kind: "typed", type: "FreezeTon" } },
    {
        receiver: "internal",
        message: { kind: "typed", type: "MapNativeContract" },
    },
    {
        receiver: "internal",
        message: { kind: "typed", type: "MapWrappedContract" },
    },
    { receiver: "internal", message: { kind: "typed", type: "AddChain" } },
    {
        receiver: "internal",
        message: { kind: "typed", type: "RemoveNativeMappedContract" },
    },
    {
        receiver: "internal",
        message: { kind: "typed", type: "RemoveWrappedMappedContract" },
    },
    { receiver: "internal", message: { kind: "typed", type: "UpdateChain" } },
    { receiver: "internal", message: { kind: "text", text: "WithdrawFees" } },
    {
        receiver: "internal",
        message: { kind: "typed", type: "ReceiveInstallment" },
    },
    { receiver: "internal", message: { kind: "typed", type: "SetChainFee" } },
    { receiver: "internal", message: { kind: "typed", type: "JettonExcesses" } },
    {
        receiver: "internal",
        message: { kind: "typed", type: "UpdateProtocolFee" },
    },
    { receiver: "internal", message: { kind: "typed", type: "UpdateBaseUri" } },
    {
        receiver: "internal",
        message: { kind: "typed", type: "UpdateTransferFee" },
    },
    { receiver: "internal", message: { kind: "empty" } },
    { receiver: "internal", message: { kind: "typed", type: "Deploy" } },
    { receiver: "internal", message: { kind: "text", text: "Pause" } },
    { receiver: "internal", message: { kind: "text", text: "Unpause" } },
    {
        receiver: "internal",
        message: { kind: "typed", type: "UpdateBridgeAdmin" },
    },
    {
        receiver: "internal",
        message: { kind: "typed", type: "RevokeBridgeValidatorRole" },
    },
    {
        receiver: "internal",
        message: { kind: "typed", type: "RevokeMappingAdminRole" },
    },
    {
        receiver: "internal",
        message: { kind: "typed", type: "RevokePauserRole" },
    },
    {
        receiver: "internal",
        message: { kind: "typed", type: "RevokeWithdrawerRole" },
    },
    {
        receiver: "internal",
        message: { kind: "typed", type: "GrantBridgeValidatorRole" },
    },
    {
        receiver: "internal",
        message: { kind: "typed", type: "GrantMappingAdminRole" },
    },
    { receiver: "internal", message: { kind: "typed", type: "GrantPauserRole" } },
    {
        receiver: "internal",
        message: { kind: "typed", type: "GrantWithdrawerRole" },
    },
];
class Bridge {
    static async init(chain_nonce, native_coin, burner, base_uri, transfer_fee, protocol_fee) {
        return await Bridge_init(chain_nonce, native_coin, burner, base_uri, transfer_fee, protocol_fee);
    }
    static async fromInit(chain_nonce, native_coin, burner, base_uri, transfer_fee, protocol_fee) {
        const init = await Bridge_init(chain_nonce, native_coin, burner, base_uri, transfer_fee, protocol_fee);
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
        if (message &&
            typeof message === "object" &&
            !(message instanceof core_1.Slice) &&
            message.$$type === "JettonTransferNotification") {
            body = (0, core_1.beginCell)()
                .store(storeJettonTransferNotification(message))
                .endCell();
        }
        if (message &&
            typeof message === "object" &&
            !(message instanceof core_1.Slice) &&
            message.$$type === "JettonBurnNotification") {
            body = (0, core_1.beginCell)().store(storeJettonBurnNotification(message)).endCell();
        }
        if (message &&
            typeof message === "object" &&
            !(message instanceof core_1.Slice) &&
            message.$$type === "FreezeTon") {
            body = (0, core_1.beginCell)().store(storeFreezeTon(message)).endCell();
        }
        if (message &&
            typeof message === "object" &&
            !(message instanceof core_1.Slice) &&
            message.$$type === "MapNativeContract") {
            body = (0, core_1.beginCell)().store(storeMapNativeContract(message)).endCell();
        }
        if (message &&
            typeof message === "object" &&
            !(message instanceof core_1.Slice) &&
            message.$$type === "MapWrappedContract") {
            body = (0, core_1.beginCell)().store(storeMapWrappedContract(message)).endCell();
        }
        if (message &&
            typeof message === "object" &&
            !(message instanceof core_1.Slice) &&
            message.$$type === "AddChain") {
            body = (0, core_1.beginCell)().store(storeAddChain(message)).endCell();
        }
        if (message &&
            typeof message === "object" &&
            !(message instanceof core_1.Slice) &&
            message.$$type === "RemoveNativeMappedContract") {
            body = (0, core_1.beginCell)()
                .store(storeRemoveNativeMappedContract(message))
                .endCell();
        }
        if (message &&
            typeof message === "object" &&
            !(message instanceof core_1.Slice) &&
            message.$$type === "RemoveWrappedMappedContract") {
            body = (0, core_1.beginCell)()
                .store(storeRemoveWrappedMappedContract(message))
                .endCell();
        }
        if (message &&
            typeof message === "object" &&
            !(message instanceof core_1.Slice) &&
            message.$$type === "UpdateChain") {
            body = (0, core_1.beginCell)().store(storeUpdateChain(message)).endCell();
        }
        if (message === "WithdrawFees") {
            body = (0, core_1.beginCell)().storeUint(0, 32).storeStringTail(message).endCell();
        }
        if (message &&
            typeof message === "object" &&
            !(message instanceof core_1.Slice) &&
            message.$$type === "ReceiveInstallment") {
            body = (0, core_1.beginCell)().store(storeReceiveInstallment(message)).endCell();
        }
        if (message &&
            typeof message === "object" &&
            !(message instanceof core_1.Slice) &&
            message.$$type === "SetChainFee") {
            body = (0, core_1.beginCell)().store(storeSetChainFee(message)).endCell();
        }
        if (message &&
            typeof message === "object" &&
            !(message instanceof core_1.Slice) &&
            message.$$type === "JettonExcesses") {
            body = (0, core_1.beginCell)().store(storeJettonExcesses(message)).endCell();
        }
        if (message &&
            typeof message === "object" &&
            !(message instanceof core_1.Slice) &&
            message.$$type === "UpdateProtocolFee") {
            body = (0, core_1.beginCell)().store(storeUpdateProtocolFee(message)).endCell();
        }
        if (message &&
            typeof message === "object" &&
            !(message instanceof core_1.Slice) &&
            message.$$type === "UpdateBaseUri") {
            body = (0, core_1.beginCell)().store(storeUpdateBaseUri(message)).endCell();
        }
        if (message &&
            typeof message === "object" &&
            !(message instanceof core_1.Slice) &&
            message.$$type === "UpdateTransferFee") {
            body = (0, core_1.beginCell)().store(storeUpdateTransferFee(message)).endCell();
        }
        if (message === null) {
            body = new core_1.Cell();
        }
        if (message &&
            typeof message === "object" &&
            !(message instanceof core_1.Slice) &&
            message.$$type === "Deploy") {
            body = (0, core_1.beginCell)().store(storeDeploy(message)).endCell();
        }
        if (message === "Pause") {
            body = (0, core_1.beginCell)().storeUint(0, 32).storeStringTail(message).endCell();
        }
        if (message === "Unpause") {
            body = (0, core_1.beginCell)().storeUint(0, 32).storeStringTail(message).endCell();
        }
        if (message &&
            typeof message === "object" &&
            !(message instanceof core_1.Slice) &&
            message.$$type === "UpdateBridgeAdmin") {
            body = (0, core_1.beginCell)().store(storeUpdateBridgeAdmin(message)).endCell();
        }
        if (message &&
            typeof message === "object" &&
            !(message instanceof core_1.Slice) &&
            message.$$type === "RevokeBridgeValidatorRole") {
            body = (0, core_1.beginCell)()
                .store(storeRevokeBridgeValidatorRole(message))
                .endCell();
        }
        if (message &&
            typeof message === "object" &&
            !(message instanceof core_1.Slice) &&
            message.$$type === "RevokeMappingAdminRole") {
            body = (0, core_1.beginCell)().store(storeRevokeMappingAdminRole(message)).endCell();
        }
        if (message &&
            typeof message === "object" &&
            !(message instanceof core_1.Slice) &&
            message.$$type === "RevokePauserRole") {
            body = (0, core_1.beginCell)().store(storeRevokePauserRole(message)).endCell();
        }
        if (message &&
            typeof message === "object" &&
            !(message instanceof core_1.Slice) &&
            message.$$type === "RevokeWithdrawerRole") {
            body = (0, core_1.beginCell)().store(storeRevokeWithdrawerRole(message)).endCell();
        }
        if (message &&
            typeof message === "object" &&
            !(message instanceof core_1.Slice) &&
            message.$$type === "GrantBridgeValidatorRole") {
            body = (0, core_1.beginCell)()
                .store(storeGrantBridgeValidatorRole(message))
                .endCell();
        }
        if (message &&
            typeof message === "object" &&
            !(message instanceof core_1.Slice) &&
            message.$$type === "GrantMappingAdminRole") {
            body = (0, core_1.beginCell)().store(storeGrantMappingAdminRole(message)).endCell();
        }
        if (message &&
            typeof message === "object" &&
            !(message instanceof core_1.Slice) &&
            message.$$type === "GrantPauserRole") {
            body = (0, core_1.beginCell)().store(storeGrantPauserRole(message)).endCell();
        }
        if (message &&
            typeof message === "object" &&
            !(message instanceof core_1.Slice) &&
            message.$$type === "GrantWithdrawerRole") {
            body = (0, core_1.beginCell)().store(storeGrantWithdrawerRole(message)).endCell();
        }
        if (body === null) {
            throw new Error("Invalid message type");
        }
        await provider.internal(via, { ...args, body: body });
    }
    async getIsPaused(provider) {
        let builder = new core_1.TupleBuilder();
        let source = (await provider.get("is_paused", builder.build())).stack;
        let result = source.readBoolean();
        return result;
    }
    async getBridgeValidatorRole(provider) {
        let builder = new core_1.TupleBuilder();
        let source = (await provider.get("bridge_validator_role", builder.build()))
            .stack;
        let result = core_1.Dictionary.loadDirect(core_1.Dictionary.Keys.Address(), core_1.Dictionary.Values.Bool(), source.readCellOpt());
        return result;
    }
    async getMappingAdminRole(provider) {
        let builder = new core_1.TupleBuilder();
        let source = (await provider.get("mapping_admin_role", builder.build()))
            .stack;
        let result = core_1.Dictionary.loadDirect(core_1.Dictionary.Keys.Address(), core_1.Dictionary.Values.Bool(), source.readCellOpt());
        return result;
    }
    async getPauserRole(provider) {
        let builder = new core_1.TupleBuilder();
        let source = (await provider.get("pauser_role", builder.build())).stack;
        let result = core_1.Dictionary.loadDirect(core_1.Dictionary.Keys.Address(), core_1.Dictionary.Values.Bool(), source.readCellOpt());
        return result;
    }
    async getWithdrawerRole(provider) {
        let builder = new core_1.TupleBuilder();
        let source = (await provider.get("withdrawer_role", builder.build())).stack;
        let result = core_1.Dictionary.loadDirect(core_1.Dictionary.Keys.Address(), core_1.Dictionary.Values.Bool(), source.readCellOpt());
        return result;
    }
    async getDefaultAdminRole(provider) {
        let builder = new core_1.TupleBuilder();
        let source = (await provider.get("default_admin_role", builder.build()))
            .stack;
        let result = source.readAddress();
        return result;
    }
    async getBaseUri(provider) {
        let builder = new core_1.TupleBuilder();
        let source = (await provider.get("base_uri", builder.build())).stack;
        let result = source.readString();
        return result;
    }
    async getProtocolFee(provider) {
        let builder = new core_1.TupleBuilder();
        let source = (await provider.get("protocol_fee", builder.build())).stack;
        let result = source.readBigNumber();
        return result;
    }
    async getNonce(provider) {
        let builder = new core_1.TupleBuilder();
        let source = (await provider.get("nonce", builder.build())).stack;
        let result = source.readBigNumber();
        return result;
    }
    async getNativeCoin(provider) {
        let builder = new core_1.TupleBuilder();
        let source = (await provider.get("native_coin", builder.build())).stack;
        let result = source.readBigNumber();
        return result;
    }
    async getFees(provider) {
        let builder = new core_1.TupleBuilder();
        let source = (await provider.get("fees", builder.build())).stack;
        let result = source.readBigNumber();
        return result;
    }
    async getTvl(provider) {
        let builder = new core_1.TupleBuilder();
        let source = (await provider.get("TVL", builder.build())).stack;
        let result = source.readBigNumber();
        return result;
    }
    async getChainNonce(provider) {
        let builder = new core_1.TupleBuilder();
        let source = (await provider.get("chain_nonce", builder.build())).stack;
        let result = source.readBigNumber();
        return result;
    }
    async getIncoming(provider) {
        let builder = new core_1.TupleBuilder();
        let source = (await provider.get("incoming", builder.build())).stack;
        let result = core_1.Dictionary.loadDirect(core_1.Dictionary.Keys.BigInt(257), dictValueParserInstallmentIn(), source.readCellOpt());
        return result;
    }
    async getOutgoing(provider) {
        let builder = new core_1.TupleBuilder();
        let source = (await provider.get("outgoing", builder.build())).stack;
        let result = core_1.Dictionary.loadDirect(core_1.Dictionary.Keys.BigInt(257), dictValueParserInstallmentOut(), source.readCellOpt());
        return result;
    }
    async getNativeTokens(provider) {
        let builder = new core_1.TupleBuilder();
        let source = (await provider.get("native_tokens", builder.build())).stack;
        let result = core_1.Dictionary.loadDirect(core_1.Dictionary.Keys.BigInt(257), dictValueParserToken(), source.readCellOpt());
        return result;
    }
    async getNativeTokenIdToSymbol(provider) {
        let builder = new core_1.TupleBuilder();
        let source = (await provider.get("native_token_id_to_symbol", builder.build())).stack;
        let result = core_1.Dictionary.loadDirect(core_1.Dictionary.Keys.BigInt(257), dictValueParserTokenSymbol(), source.readCellOpt());
        return result;
    }
    async getWrappedTokens(provider) {
        let builder = new core_1.TupleBuilder();
        let source = (await provider.get("wrapped_tokens", builder.build())).stack;
        let result = core_1.Dictionary.loadDirect(core_1.Dictionary.Keys.BigInt(257), dictValueParserToken(), source.readCellOpt());
        return result;
    }
    async getSupportedChains(provider) {
        let builder = new core_1.TupleBuilder();
        let source = (await provider.get("supported_chains", builder.build()))
            .stack;
        let result = core_1.Dictionary.loadDirect(core_1.Dictionary.Keys.BigInt(257), dictValueParserChainName(), source.readCellOpt());
        return result;
    }
    async getWrappedTokenIdToSymbol(provider) {
        let builder = new core_1.TupleBuilder();
        let source = (await provider.get("wrapped_token_id_to_symbol", builder.build())).stack;
        let result = core_1.Dictionary.loadDirect(core_1.Dictionary.Keys.BigInt(257), dictValueParserTokenSymbol(), source.readCellOpt());
        return result;
    }
    async getChainFees(provider) {
        let builder = new core_1.TupleBuilder();
        let source = (await provider.get("chain_fees", builder.build())).stack;
        let result = core_1.Dictionary.loadDirect(core_1.Dictionary.Keys.BigInt(257), core_1.Dictionary.Values.BigInt(257), source.readCellOpt());
        return result;
    }
}
exports.Bridge = Bridge;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvY29udHJhY3RzL3Rvbi9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsYUFBYTtBQUNiLG9DQW9CbUI7QUFRbkIsU0FBZ0IsY0FBYyxDQUFDLEdBQWM7SUFDM0MsT0FBTyxDQUFDLE9BQWdCLEVBQUUsRUFBRTtRQUMxQixJQUFJLEdBQUcsR0FBRyxPQUFPLENBQUM7UUFDbEIsR0FBRyxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDdkIsR0FBRyxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDekIsQ0FBQyxDQUFDO0FBQ0osQ0FBQztBQU5ELHdDQU1DO0FBRUQsU0FBZ0IsYUFBYSxDQUFDLEtBQVk7SUFDeEMsSUFBSSxJQUFJLEdBQUcsS0FBSyxDQUFDO0lBQ2pCLElBQUksS0FBSyxHQUFHLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztJQUMzQixJQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7SUFDM0IsT0FBTyxFQUFFLE1BQU0sRUFBRSxXQUFvQixFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxDQUFDO0FBQ3BFLENBQUM7QUFMRCxzQ0FLQztBQUVELFNBQVMsa0JBQWtCLENBQUMsTUFBbUI7SUFDN0MsSUFBSSxLQUFLLEdBQUcsTUFBTSxDQUFDLFFBQVEsRUFBRSxDQUFDO0lBQzlCLElBQUksS0FBSyxHQUFHLE1BQU0sQ0FBQyxRQUFRLEVBQUUsQ0FBQztJQUM5QixPQUFPLEVBQUUsTUFBTSxFQUFFLFdBQW9CLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLENBQUM7QUFDcEUsQ0FBQztBQUVELFNBQVMsbUJBQW1CLENBQUMsTUFBaUI7SUFDNUMsSUFBSSxPQUFPLEdBQUcsSUFBSSxtQkFB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