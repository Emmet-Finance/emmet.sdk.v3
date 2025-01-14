"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Bridge = void 0;
exports.storeStateInit = storeStateInit;
exports.loadStateInit = loadStateInit;
exports.storeContext = storeContext;
exports.loadContext = loadContext;
exports.storeSendParameters = storeSendParameters;
exports.loadSendParameters = loadSendParameters;
exports.storeDeploy = storeDeploy;
exports.loadDeploy = loadDeploy;
exports.storeDeployOk = storeDeployOk;
exports.loadDeployOk = loadDeployOk;
exports.storeFactoryDeploy = storeFactoryDeploy;
exports.loadFactoryDeploy = loadFactoryDeploy;
exports.storeJettonTransfer = storeJettonTransfer;
exports.loadJettonTransfer = loadJettonTransfer;
exports.storeJettonTransferNotification = storeJettonTransferNotification;
exports.loadJettonTransferNotification = loadJettonTransferNotification;
exports.storeJettonBurn = storeJettonBurn;
exports.loadJettonBurn = loadJettonBurn;
exports.storeJettonExcesses = storeJettonExcesses;
exports.loadJettonExcesses = loadJettonExcesses;
exports.storeJettonInternalTransfer = storeJettonInternalTransfer;
exports.loadJettonInternalTransfer = loadJettonInternalTransfer;
exports.storeJettonBurnNotification = storeJettonBurnNotification;
exports.loadJettonBurnNotification = loadJettonBurnNotification;
exports.storeWalletData = storeWalletData;
exports.loadWalletData = loadWalletData;
exports.storeJettonData = storeJettonData;
exports.loadJettonData = loadJettonData;
exports.storeJettonMint = storeJettonMint;
exports.loadJettonMint = loadJettonMint;
exports.storeUpdateAdmin = storeUpdateAdmin;
exports.loadUpdateAdmin = loadUpdateAdmin;
exports.storeUpdateOwner = storeUpdateOwner;
exports.loadUpdateOwner = loadUpdateOwner;
exports.storeGrantRole = storeGrantRole;
exports.loadGrantRole = loadGrantRole;
exports.storeRevokeRole = storeRevokeRole;
exports.loadRevokeRole = loadRevokeRole;
exports.storeRenounceRole = storeRenounceRole;
exports.loadRenounceRole = loadRenounceRole;
exports.storeUpdateRoleAdmin = storeUpdateRoleAdmin;
exports.loadUpdateRoleAdmin = loadUpdateRoleAdmin;
exports.storeRoleData = storeRoleData;
exports.loadRoleData = loadRoleData;
exports.storeTokenType = storeTokenType;
exports.loadTokenType = loadTokenType;
exports.storeTokenTransfer = storeTokenTransfer;
exports.loadTokenTransfer = loadTokenTransfer;
exports.storeInstallment = storeInstallment;
exports.loadInstallment = loadInstallment;
exports.storeSignerAndSignature = storeSignerAndSignature;
exports.loadSignerAndSignature = loadSignerAndSignature;
exports.storeReceiveInstallment = storeReceiveInstallment;
exports.loadReceiveInstallment = loadReceiveInstallment;
exports.storeFreezeTon = storeFreezeTon;
exports.loadFreezeTon = loadFreezeTon;
exports.storeMapContract = storeMapContract;
exports.loadMapContract = loadMapContract;
exports.storeSetChainFee = storeSetChainFee;
exports.loadSetChainFee = loadSetChainFee;
exports.storeOutgoingTransaction = storeOutgoingTransaction;
exports.loadOutgoingTransaction = loadOutgoingTransaction;
exports.storeIncomingTransaction = storeIncomingTransaction;
exports.loadIncomingTransaction = loadIncomingTransaction;
exports.storeInstallmentOut = storeInstallmentOut;
exports.loadInstallmentOut = loadInstallmentOut;
exports.storeToken = storeToken;
exports.loadToken = loadToken;
exports.storeUpdateBaseUri = storeUpdateBaseUri;
exports.loadUpdateBaseUri = loadUpdateBaseUri;
exports.storeUpdateTransferFee = storeUpdateTransferFee;
exports.loadUpdateTransferFee = loadUpdateTransferFee;
exports.storeRemoveMappedContract = storeRemoveMappedContract;
exports.loadRemoveMappedContract = loadRemoveMappedContract;
exports.storeReleaseTokens = storeReleaseTokens;
exports.loadReleaseTokens = loadReleaseTokens;
exports.storeUniqueReceiveInstallment = storeUniqueReceiveInstallment;
exports.loadUniqueReceiveInstallment = loadUniqueReceiveInstallment;
exports.storeStrategies = storeStrategies;
exports.loadStrategies = loadStrategies;
exports.storeToTokenCrossChainStrategy = storeToTokenCrossChainStrategy;
exports.loadToTokenCrossChainStrategy = loadToTokenCrossChainStrategy;
exports.storeCrossChainTokenStrategy = storeCrossChainTokenStrategy;
exports.loadCrossChainTokenStrategy = loadCrossChainTokenStrategy;
exports.storeFromTokenToTargetTokenToSteps = storeFromTokenToTargetTokenToSteps;
exports.loadFromTokenToTargetTokenToSteps = loadFromTokenToTargetTokenToSteps;
exports.storeTargetTokenToSteps = storeTargetTokenToSteps;
exports.loadTargetTokenToSteps = loadTargetTokenToSteps;
exports.storeSteps = storeSteps;
exports.loadSteps = loadSteps;
exports.storeCrossChainStrategy = storeCrossChainStrategy;
exports.loadCrossChainStrategy = loadCrossChainStrategy;
exports.storeTargetTokenToCrossChainStrategy = storeTargetTokenToCrossChainStrategy;
exports.loadTargetTokenToCrossChainStrategy = loadTargetTokenToCrossChainStrategy;
exports.storeFromTokenToTargetTokenToCrossChainStrategy = storeFromTokenToTargetTokenToCrossChainStrategy;
exports.loadFromTokenToTargetTokenToCrossChainStrategy = loadFromTokenToTargetTokenToCrossChainStrategy;
exports.storeUpdateProtocolFee = storeUpdateProtocolFee;
exports.loadUpdateProtocolFee = loadUpdateProtocolFee;
exports.storeAddValidator = storeAddValidator;
exports.loadAddValidator = loadAddValidator;
exports.storeRemoveValidator = storeRemoveValidator;
exports.loadRemoveValidator = loadRemoveValidator;
exports.storeSetIncomingStrategy = storeSetIncomingStrategy;
exports.loadSetIncomingStrategy = loadSetIncomingStrategy;
exports.storeSetCrossChainStrategy = storeSetCrossChainStrategy;
exports.loadSetCrossChainStrategy = loadSetCrossChainStrategy;
exports.storeRemoveInternalStrategy = storeRemoveInternalStrategy;
exports.loadRemoveInternalStrategy = loadRemoveInternalStrategy;
exports.storeRemoveCrossChainStrategy = storeRemoveCrossChainStrategy;
exports.loadRemoveCrossChainStrategy = loadRemoveCrossChainStrategy;
//@ts-nocheck generated code cope
const core_1 = require("@ton/core");
function storeStateInit(src) {
    return (builder) => {
        let b_0 = builder;
        b_0.storeRef(src.code);
        b_0.storeRef(src.data);
    };
}
function loadStateInit(slice) {
    let sc_0 = slice;
    let _code = sc_0.loadRef();
    let _data = sc_0.loadRef();
    return { $$type: "StateInit", code: _code, data: _data };
}
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
        serialize: (src, builder) => {
            builder.storeRef((0, core_1.beginCell)().store(storeStateInit(src)).endCell());
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
        serialize: (src, builder) => {
            builder.storeRef((0, core_1.beginCell)().store(storeContext(src)).endCell());
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
        serialize: (src, builder) => {
            builder.storeRef((0, core_1.beginCell)().store(storeSendParameters(src)).endCell());
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
function loadDeploy(slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2490013878) {
        throw Error("Invalid prefix");
    }
    let _queryId = sc_0.loadUintBig(64);
    return { $$type: "Deploy", queryId: _queryId };
}
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
        serialize: (src, builder) => {
            builder.storeRef((0, core_1.beginCell)().store(storeDeploy(src)).endCell());
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
function loadDeployOk(slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2952335191) {
        throw Error("Invalid prefix");
    }
    let _queryId = sc_0.loadUintBig(64);
    return { $$type: "DeployOk", queryId: _queryId };
}
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
        serialize: (src, builder) => {
            builder.storeRef((0, core_1.beginCell)().store(storeDeployOk(src)).endCell());
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
        serialize: (src, builder) => {
            builder.storeRef((0, core_1.beginCell)().store(storeFactoryDeploy(src)).endCell());
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
        serialize: (src, builder) => {
            builder.storeRef((0, core_1.beginCell)().store(storeJettonTransfer(src)).endCell());
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
        serialize: (src, builder) => {
            builder.storeRef((0, core_1.beginCell)().store(storeJettonTransferNotification(src)).endCell());
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
        serialize: (src, builder) => {
            builder.storeRef((0, core_1.beginCell)().store(storeJettonBurn(src)).endCell());
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
function loadJettonExcesses(slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 3576854235) {
        throw Error("Invalid prefix");
    }
    let _query_id = sc_0.loadUintBig(64);
    return { $$type: "JettonExcesses", query_id: _query_id };
}
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
        serialize: (src, builder) => {
            builder.storeRef((0, core_1.beginCell)().store(storeJettonExcesses(src)).endCell());
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
        serialize: (src, builder) => {
            builder.storeRef((0, core_1.beginCell)().store(storeJettonInternalTransfer(src)).endCell());
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
        serialize: (src, builder) => {
            builder.storeRef((0, core_1.beginCell)().store(storeJettonBurnNotification(src)).endCell());
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
        serialize: (src, builder) => {
            builder.storeRef((0, core_1.beginCell)().store(storeWalletData(src)).endCell());
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
        serialize: (src, builder) => {
            builder.storeRef((0, core_1.beginCell)().store(storeJettonData(src)).endCell());
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
        serialize: (src, builder) => {
            builder.storeRef((0, core_1.beginCell)().store(storeJettonMint(src)).endCell());
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
function loadUpdateAdmin(slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 367316568) {
        throw Error("Invalid prefix");
    }
    let _new_admin = sc_0.loadAddress();
    return { $$type: "UpdateAdmin", new_admin: _new_admin };
}
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
        serialize: (src, builder) => {
            builder.storeRef((0, core_1.beginCell)().store(storeUpdateAdmin(src)).endCell());
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
function loadUpdateOwner(slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 559076492) {
        throw Error("Invalid prefix");
    }
    let _new_owner = sc_0.loadAddress();
    return { $$type: "UpdateOwner", new_owner: _new_owner };
}
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
        serialize: (src, builder) => {
            builder.storeRef((0, core_1.beginCell)().store(storeUpdateOwner(src)).endCell());
        },
        parse: (src) => {
            return loadUpdateOwner(src.loadRef().beginParse());
        },
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
function loadGrantRole(slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 174185305) {
        throw Error("Invalid prefix");
    }
    let _to = sc_0.loadAddress();
    let _role_id = sc_0.loadIntBig(257);
    return { $$type: "GrantRole", to: _to, role_id: _role_id };
}
function loadTupleGrantRole(source) {
    let _to = source.readAddress();
    let _role_id = source.readBigNumber();
    return { $$type: "GrantRole", to: _to, role_id: _role_id };
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
        },
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
function loadRevokeRole(slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1363080030) {
        throw Error("Invalid prefix");
    }
    let _to = sc_0.loadAddress();
    let _role_id = sc_0.loadIntBig(257);
    return { $$type: "RevokeRole", to: _to, role_id: _role_id };
}
function loadTupleRevokeRole(source) {
    let _to = source.readAddress();
    let _role_id = source.readBigNumber();
    return { $$type: "RevokeRole", to: _to, role_id: _role_id };
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
        },
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
function loadRenounceRole(slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 389201441) {
        throw Error("Invalid prefix");
    }
    let _role_id = sc_0.loadIntBig(257);
    let _address = sc_0.loadAddress();
    return {
        $$type: "RenounceRole",
        role_id: _role_id,
        address: _address,
    };
}
function loadTupleRenounceRole(source) {
    let _role_id = source.readBigNumber();
    let _address = source.readAddress();
    return {
        $$type: "RenounceRole",
        role_id: _role_id,
        address: _address,
    };
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
        },
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
function loadUpdateRoleAdmin(slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 620382153) {
        throw Error("Invalid prefix");
    }
    let _role_id = sc_0.loadIntBig(257);
    let _role_admin = sc_0.loadIntBig(257);
    return {
        $$type: "UpdateRoleAdmin",
        role_id: _role_id,
        role_admin: _role_admin,
    };
}
function loadTupleUpdateRoleAdmin(source) {
    let _role_id = source.readBigNumber();
    let _role_admin = source.readBigNumber();
    return {
        $$type: "UpdateRoleAdmin",
        role_id: _role_id,
        role_admin: _role_admin,
    };
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
        },
    };
}
function storeRoleData(src) {
    return (builder) => {
        let b_0 = builder;
        b_0.storeDict(src.roles, core_1.Dictionary.Keys.Address(), core_1.Dictionary.Values.Bool());
        b_0.storeInt(src.admin_role, 257);
    };
}
function loadRoleData(slice) {
    let sc_0 = slice;
    let _roles = core_1.Dictionary.load(core_1.Dictionary.Keys.Address(), core_1.Dictionary.Values.Bool(), sc_0);
    let _admin_role = sc_0.loadIntBig(257);
    return {
        $$type: "RoleData",
        roles: _roles,
        admin_role: _admin_role,
    };
}
function loadTupleRoleData(source) {
    let _roles = core_1.Dictionary.loadDirect(core_1.Dictionary.Keys.Address(), core_1.Dictionary.Values.Bool(), source.readCellOpt());
    let _admin_role = source.readBigNumber();
    return {
        $$type: "RoleData",
        roles: _roles,
        admin_role: _admin_role,
    };
}
function storeTupleRoleData(source) {
    let builder = new core_1.TupleBuilder();
    builder.writeCell(source.roles.size > 0
        ? (0, core_1.beginCell)()
            .storeDictDirect(source.roles, core_1.Dictionary.Keys.Address(), core_1.Dictionary.Values.Bool())
            .endCell()
        : null);
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
        serialize: (src, builder) => {
            builder.storeRef((0, core_1.beginCell)().store(storeTokenType(src)).endCell());
        },
        parse: (src) => {
            return loadTokenType(src.loadRef().beginParse());
        },
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
function loadTokenTransfer(slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 260734629) {
        throw Error("Invalid prefix");
    }
    let _query_id = sc_0.loadUintBig(64);
    let _amount = sc_0.loadCoins();
    let _sender = sc_0.loadAddress();
    let _response_destination = sc_0.loadMaybeAddress();
    let _custom_payload = sc_0.loadBit() ? sc_0.loadRef() : null;
    let _forward_ton_amount = sc_0.loadCoins();
    let _forward_payload = sc_0.asCell();
    return {
        $$type: "TokenTransfer",
        query_id: _query_id,
        amount: _amount,
        sender: _sender,
        response_destination: _response_destination,
        custom_payload: _custom_payload,
        forward_ton_amount: _forward_ton_amount,
        forward_payload: _forward_payload,
    };
}
function loadTupleTokenTransfer(source) {
    let _query_id = source.readBigNumber();
    let _amount = source.readBigNumber();
    let _sender = source.readAddress();
    let _response_destination = source.readAddressOpt();
    let _custom_payload = source.readCellOpt();
    let _forward_ton_amount = source.readBigNumber();
    let _forward_payload = source.readCell();
    return {
        $$type: "TokenTransfer",
        query_id: _query_id,
        amount: _amount,
        sender: _sender,
        response_destination: _response_destination,
        custom_payload: _custom_payload,
        forward_ton_amount: _forward_ton_amount,
        forward_payload: _forward_payload,
    };
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
        },
    };
}
function storeInstallment(src) {
    return (builder) => {
        let b_0 = builder;
        b_0.storeUint(2305391280, 32);
        b_0.storeUint(src.from_chain, 64);
        b_0.storeUint(src.target_chain, 64);
        b_0.storeCoins(src.amount);
        b_0.storeInt(src.nonce, 257);
        b_0.storeRef(src.from_token);
        b_0.storeRef(src.to_token);
        b_0.storeAddress(src.recepient);
    };
}
function loadInstallment(slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2305391280) {
        throw Error("Invalid prefix");
    }
    let _from_chain = sc_0.loadUintBig(64);
    let _target_chain = sc_0.loadUintBig(64);
    let _amount = sc_0.loadCoins();
    let _nonce = sc_0.loadIntBig(257);
    let _from_token = sc_0.loadRef();
    let _to_token = sc_0.loadRef();
    let _recepient = sc_0.loadAddress();
    return {
        $$type: "Installment",
        from_chain: _from_chain,
        target_chain: _target_chain,
        amount: _amount,
        nonce: _nonce,
        from_token: _from_token,
        to_token: _to_token,
        recepient: _recepient,
    };
}
function loadTupleInstallment(source) {
    let _from_chain = source.readBigNumber();
    let _target_chain = source.readBigNumber();
    let _amount = source.readBigNumber();
    let _nonce = source.readBigNumber();
    let _from_token = source.readCell();
    let _to_token = source.readCell();
    let _recepient = source.readAddress();
    return {
        $$type: "Installment",
        from_chain: _from_chain,
        target_chain: _target_chain,
        amount: _amount,
        nonce: _nonce,
        from_token: _from_token,
        to_token: _to_token,
        recepient: _recepient,
    };
}
function storeTupleInstallment(source) {
    let builder = new core_1.TupleBuilder();
    builder.writeNumber(source.from_chain);
    builder.writeNumber(source.target_chain);
    builder.writeNumber(source.amount);
    builder.writeNumber(source.nonce);
    builder.writeCell(source.from_token);
    builder.writeCell(source.to_token);
    builder.writeAddress(source.recepient);
    return builder.build();
}
function dictValueParserInstallment() {
    return {
        serialize: (src, builder) => {
            builder.storeRef((0, core_1.beginCell)().store(storeInstallment(src)).endCell());
        },
        parse: (src) => {
            return loadInstallment(src.loadRef().beginParse());
        },
    };
}
function storeSignerAndSignature(src) {
    return (builder) => {
        let b_0 = builder;
        b_0.storeRef(src.signature);
        b_0.storeUint(src.key, 256);
    };
}
function loadSignerAndSignature(slice) {
    let sc_0 = slice;
    let _signature = sc_0.loadRef();
    let _key = sc_0.loadUintBig(256);
    return {
        $$type: "SignerAndSignature",
        signature: _signature,
        key: _key,
    };
}
function loadTupleSignerAndSignature(source) {
    let _signature = source.readCell();
    let _key = source.readBigNumber();
    return {
        $$type: "SignerAndSignature",
        signature: _signature,
        key: _key,
    };
}
function storeTupleSignerAndSignature(source) {
    let builder = new core_1.TupleBuilder();
    builder.writeSlice(source.signature);
    builder.writeNumber(source.key);
    return builder.build();
}
function dictValueParserSignerAndSignature() {
    return {
        serialize: (src, builder) => {
            builder.storeRef((0, core_1.beginCell)().store(storeSignerAndSignature(src)).endCell());
        },
        parse: (src) => {
            return loadSignerAndSignature(src.loadRef().beginParse());
        },
    };
}
function storeReceiveInstallment(src) {
    return (builder) => {
        let b_0 = builder;
        b_0.storeUint(387504523, 32);
        b_0.store(storeInstallment(src.installment));
        b_0.storeDict(src.signatures, core_1.Dictionary.Keys.BigInt(257), dictValueParserSignerAndSignature());
        let b_1 = new core_1.Builder();
        b_1.storeInt(src.len, 257);
        b_1.storeUint(src.tx_hash, 256);
        b_1.storeInt(src.id, 257);
        b_0.storeRef(b_1.endCell());
    };
}
function loadReceiveInstallment(slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 387504523) {
        throw Error("Invalid prefix");
    }
    let _installment = loadInstallment(sc_0);
    let _signatures = core_1.Dictionary.load(core_1.Dictionary.Keys.BigInt(257), dictValueParserSignerAndSignature(), sc_0);
    let sc_1 = sc_0.loadRef().beginParse();
    let _len = sc_1.loadIntBig(257);
    let _tx_hash = sc_1.loadUintBig(256);
    let _id = sc_1.loadIntBig(257);
    return {
        $$type: "ReceiveInstallment",
        installment: _installment,
        signatures: _signatures,
        len: _len,
        tx_hash: _tx_hash,
        id: _id,
    };
}
function loadTupleReceiveInstallment(source) {
    const _installment = loadTupleInstallment(source.readTuple());
    let _signatures = core_1.Dictionary.loadDirect(core_1.Dictionary.Keys.BigInt(257), dictValueParserSignerAndSignature(), source.readCellOpt());
    let _len = source.readBigNumber();
    let _tx_hash = source.readBigNumber();
    let _id = source.readBigNumber();
    return {
        $$type: "ReceiveInstallment",
        installment: _installment,
        signatures: _signatures,
        len: _len,
        tx_hash: _tx_hash,
        id: _id,
    };
}
function storeTupleReceiveInstallment(source) {
    let builder = new core_1.TupleBuilder();
    builder.writeTuple(storeTupleInstallment(source.installment));
    builder.writeCell(source.signatures.size > 0
        ? (0, core_1.beginCell)()
            .storeDictDirect(source.signatures, core_1.Dictionary.Keys.BigInt(257), dictValueParserSignerAndSignature())
            .endCell()
        : null);
    builder.writeNumber(source.len);
    builder.writeNumber(source.tx_hash);
    builder.writeNumber(source.id);
    return builder.build();
}
function dictValueParserReceiveInstallment() {
    return {
        serialize: (src, builder) => {
            builder.storeRef((0, core_1.beginCell)().store(storeReceiveInstallment(src)).endCell());
        },
        parse: (src) => {
            return loadReceiveInstallment(src.loadRef().beginParse());
        },
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
function loadFreezeTon(slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 3943853515) {
        throw Error("Invalid prefix");
    }
    let _target_chain = sc_0.loadUintBig(64);
    let _to_token = sc_0.loadRef();
    let _to = sc_0.loadRef();
    let _from_token = sc_0.loadRef();
    let _amount = sc_0.loadCoins();
    return {
        $$type: "FreezeTon",
        target_chain: _target_chain,
        to_token: _to_token,
        to: _to,
        from_token: _from_token,
        amount: _amount,
    };
}
function loadTupleFreezeTon(source) {
    let _target_chain = source.readBigNumber();
    let _to_token = source.readCell();
    let _to = source.readCell();
    let _from_token = source.readCell();
    let _amount = source.readBigNumber();
    return {
        $$type: "FreezeTon",
        target_chain: _target_chain,
        to_token: _to_token,
        to: _to,
        from_token: _from_token,
        amount: _amount,
    };
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
        serialize: (src, builder) => {
            builder.storeRef((0, core_1.beginCell)().store(storeFreezeTon(src)).endCell());
        },
        parse: (src) => {
            return loadFreezeTon(src.loadRef().beginParse());
        },
    };
}
function storeMapContract(src) {
    return (builder) => {
        let b_0 = builder;
        b_0.storeUint(4200416724, 32);
        b_0.storeInt(src.token_id, 257);
        b_0.storeStringRefTail(src.token_symbol);
        b_0.storeAddress(src.contract);
        b_0.storeUint(src.decimals, 8);
        b_0.storeInt(src.fee, 257);
        let b_1 = new core_1.Builder();
        b_1.storeInt(src.fee_decimals, 257);
        b_1.storeAddress(src.swap_address);
        b_1.storeAddress(src.token_bridge_wallet_address);
        let b_2 = new core_1.Builder();
        b_2.storeAddress(src.liquidity_pool_master_address);
        b_2.storeAddress(src.ston_fi_target_token_wallet_for_ston_fi_router);
        b_1.storeRef(b_2.endCell());
        b_0.storeRef(b_1.endCell());
    };
}
function loadMapContract(slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 4200416724) {
        throw Error("Invalid prefix");
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
    let sc_2 = sc_1.loadRef().beginParse();
    let _liquidity_pool_master_address = sc_2.loadMaybeAddress();
    let _ston_fi_target_token_wallet_for_ston_fi_router = sc_2.loadAddress();
    return {
        $$type: "MapContract",
        token_id: _token_id,
        token_symbol: _token_symbol,
        contract: _contract,
        decimals: _decimals,
        fee: _fee,
        fee_decimals: _fee_decimals,
        swap_address: _swap_address,
        token_bridge_wallet_address: _token_bridge_wallet_address,
        liquidity_pool_master_address: _liquidity_pool_master_address,
        ston_fi_target_token_wallet_for_ston_fi_router: _ston_fi_target_token_wallet_for_ston_fi_router,
    };
}
function loadTupleMapContract(source) {
    let _token_id = source.readBigNumber();
    let _token_symbol = source.readString();
    let _contract = source.readAddress();
    let _decimals = source.readBigNumber();
    let _fee = source.readBigNumber();
    let _fee_decimals = source.readBigNumber();
    let _swap_address = source.readAddress();
    let _token_bridge_wallet_address = source.readAddress();
    let _liquidity_pool_master_address = source.readAddressOpt();
    let _ston_fi_target_token_wallet_for_ston_fi_router = source.readAddress();
    return {
        $$type: "MapContract",
        token_id: _token_id,
        token_symbol: _token_symbol,
        contract: _contract,
        decimals: _decimals,
        fee: _fee,
        fee_decimals: _fee_decimals,
        swap_address: _swap_address,
        token_bridge_wallet_address: _token_bridge_wallet_address,
        liquidity_pool_master_address: _liquidity_pool_master_address,
        ston_fi_target_token_wallet_for_ston_fi_router: _ston_fi_target_token_wallet_for_ston_fi_router,
    };
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
    builder.writeAddress(source.liquidity_pool_master_address);
    builder.writeAddress(source.ston_fi_target_token_wallet_for_ston_fi_router);
    return builder.build();
}
function dictValueParserMapContract() {
    return {
        serialize: (src, builder) => {
            builder.storeRef((0, core_1.beginCell)().store(storeMapContract(src)).endCell());
        },
        parse: (src) => {
            return loadMapContract(src.loadRef().beginParse());
        },
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
function loadSetChainFee(slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1240718718) {
        throw Error("Invalid prefix");
    }
    let _chain_id = sc_0.loadUintBig(64);
    let _fee = sc_0.loadUintBig(256);
    return { $$type: "SetChainFee", chain_id: _chain_id, fee: _fee };
}
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
        serialize: (src, builder) => {
            builder.storeRef((0, core_1.beginCell)().store(storeSetChainFee(src)).endCell());
        },
        parse: (src) => {
            return loadSetChainFee(src.loadRef().beginParse());
        },
    };
}
function storeOutgoingTransaction(src) {
    return (builder) => {
        let b_0 = builder;
        b_0.storeUint(1673830231, 32);
        b_0.storeUint(src.id, 256);
        b_0.storeCoins(src.amount);
        b_0.storeRef(src.from_token);
        b_0.storeRef(src.to_token);
        b_0.storeRef(src.to);
        b_0.storeUint(src.target_chain_id, 64);
    };
}
function loadOutgoingTransaction(slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1673830231) {
        throw Error("Invalid prefix");
    }
    let _id = sc_0.loadUintBig(256);
    let _amount = sc_0.loadCoins();
    let _from_token = sc_0.loadRef();
    let _to_token = sc_0.loadRef();
    let _to = sc_0.loadRef();
    let _target_chain_id = sc_0.loadUintBig(64);
    return {
        $$type: "OutgoingTransaction",
        id: _id,
        amount: _amount,
        from_token: _from_token,
        to_token: _to_token,
        to: _to,
        target_chain_id: _target_chain_id,
    };
}
function loadTupleOutgoingTransaction(source) {
    let _id = source.readBigNumber();
    let _amount = source.readBigNumber();
    let _from_token = source.readCell();
    let _to_token = source.readCell();
    let _to = source.readCell();
    let _target_chain_id = source.readBigNumber();
    return {
        $$type: "OutgoingTransaction",
        id: _id,
        amount: _amount,
        from_token: _from_token,
        to_token: _to_token,
        to: _to,
        target_chain_id: _target_chain_id,
    };
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
        serialize: (src, builder) => {
            builder.storeRef((0, core_1.beginCell)().store(storeOutgoingTransaction(src)).endCell());
        },
        parse: (src) => {
            return loadOutgoingTransaction(src.loadRef().beginParse());
        },
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
function loadIncomingTransaction(slice) {
    let sc_0 = slice;
    let _id = sc_0.loadUintBig(256);
    let _amount = sc_0.loadCoins();
    let _from_token = sc_0.loadRef();
    let _to_token = sc_0.loadRef();
    let _target_chain_id = sc_0.loadUintBig(64);
    let _to = sc_0.loadAddress();
    return {
        $$type: "IncomingTransaction",
        id: _id,
        amount: _amount,
        from_token: _from_token,
        to_token: _to_token,
        target_chain_id: _target_chain_id,
        to: _to,
    };
}
function loadTupleIncomingTransaction(source) {
    let _id = source.readBigNumber();
    let _amount = source.readBigNumber();
    let _from_token = source.readCell();
    let _to_token = source.readCell();
    let _target_chain_id = source.readBigNumber();
    let _to = source.readAddress();
    return {
        $$type: "IncomingTransaction",
        id: _id,
        amount: _amount,
        from_token: _from_token,
        to_token: _to_token,
        target_chain_id: _target_chain_id,
        to: _to,
    };
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
        serialize: (src, builder) => {
            builder.storeRef((0, core_1.beginCell)().store(storeIncomingTransaction(src)).endCell());
        },
        parse: (src) => {
            return loadIncomingTransaction(src.loadRef().beginParse());
        },
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
function loadInstallmentOut(slice) {
    let sc_0 = slice;
    let _amount = sc_0.loadUintBig(256);
    let _to = sc_0.loadStringRefTail();
    let _target_chain = sc_0.loadUintBig(64);
    let _token_id = sc_0.loadIntBig(257);
    return {
        $$type: "InstallmentOut",
        amount: _amount,
        to: _to,
        target_chain: _target_chain,
        token_id: _token_id,
    };
}
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
        serialize: (src, builder) => {
            builder.storeRef((0, core_1.beginCell)().store(storeInstallmentOut(src)).endCell());
        },
        parse: (src) => {
            return loadInstallmentOut(src.loadRef().beginParse());
        },
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
        b_1.storeAddress(src.liquidity_pool_master_address);
        let b_2 = new core_1.Builder();
        b_2.storeAddress(src.ston_fi_target_token_wallet_for_ston_fi_router);
        b_1.storeRef(b_2.endCell());
        b_0.storeRef(b_1.endCell());
    };
}
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
    let _liquidity_pool_master_address = sc_1.loadMaybeAddress();
    let sc_2 = sc_1.loadRef().beginParse();
    let _ston_fi_target_token_wallet_for_ston_fi_router = sc_2.loadMaybeAddress();
    return {
        $$type: "Token",
        symbol: _symbol,
        address: _address,
        swap_address: _swap_address,
        decimals: _decimals,
        fee: _fee,
        fee_decimals: _fee_decimals,
        token_bridge_wallet_address: _token_bridge_wallet_address,
        liquidity_pool_master_address: _liquidity_pool_master_address,
        ston_fi_target_token_wallet_for_ston_fi_router: _ston_fi_target_token_wallet_for_ston_fi_router,
    };
}
function loadTupleToken(source) {
    let _symbol = source.readString();
    let _address = source.readAddress();
    let _swap_address = source.readAddress();
    let _decimals = source.readBigNumber();
    let _fee = source.readBigNumber();
    let _fee_decimals = source.readBigNumber();
    let _token_bridge_wallet_address = source.readAddress();
    let _liquidity_pool_master_address = source.readAddressOpt();
    let _ston_fi_target_token_wallet_for_ston_fi_router = source.readAddressOpt();
    return {
        $$type: "Token",
        symbol: _symbol,
        address: _address,
        swap_address: _swap_address,
        decimals: _decimals,
        fee: _fee,
        fee_decimals: _fee_decimals,
        token_bridge_wallet_address: _token_bridge_wallet_address,
        liquidity_pool_master_address: _liquidity_pool_master_address,
        ston_fi_target_token_wallet_for_ston_fi_router: _ston_fi_target_token_wallet_for_ston_fi_router,
    };
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
    builder.writeAddress(source.liquidity_pool_master_address);
    builder.writeAddress(source.ston_fi_target_token_wallet_for_ston_fi_router);
    return builder.build();
}
function dictValueParserToken() {
    return {
        serialize: (src, builder) => {
            builder.storeRef((0, core_1.beginCell)().store(storeToken(src)).endCell());
        },
        parse: (src) => {
            return loadToken(src.loadRef().beginParse());
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
function loadUpdateBaseUri(slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 3032156853) {
        throw Error("Invalid prefix");
    }
    let _new_base_uri = sc_0.loadStringRefTail();
    return { $$type: "UpdateBaseUri", new_base_uri: _new_base_uri };
}
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
        serialize: (src, builder) => {
            builder.storeRef((0, core_1.beginCell)().store(storeUpdateBaseUri(src)).endCell());
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
function loadUpdateTransferFee(slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1793030273) {
        throw Error("Invalid prefix");
    }
    let _new_fee = sc_0.loadIntBig(257);
    return { $$type: "UpdateTransferFee", new_fee: _new_fee };
}
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
        serialize: (src, builder) => {
            builder.storeRef((0, core_1.beginCell)().store(storeUpdateTransferFee(src)).endCell());
        },
        parse: (src) => {
            return loadUpdateTransferFee(src.loadRef().beginParse());
        },
    };
}
function storeRemoveMappedContract(src) {
    return (builder) => {
        let b_0 = builder;
        b_0.storeUint(1790492737, 32);
        b_0.storeUint(src.token_id, 256);
    };
}
function loadRemoveMappedContract(slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1790492737) {
        throw Error("Invalid prefix");
    }
    let _token_id = sc_0.loadUintBig(256);
    return { $$type: "RemoveMappedContract", token_id: _token_id };
}
function loadTupleRemoveMappedContract(source) {
    let _token_id = source.readBigNumber();
    return { $$type: "RemoveMappedContract", token_id: _token_id };
}
function storeTupleRemoveMappedContract(source) {
    let builder = new core_1.TupleBuilder();
    builder.writeNumber(source.token_id);
    return builder.build();
}
function dictValueParserRemoveMappedContract() {
    return {
        serialize: (src, builder) => {
            builder.storeRef((0, core_1.beginCell)().store(storeRemoveMappedContract(src)).endCell());
        },
        parse: (src) => {
            return loadRemoveMappedContract(src.loadRef().beginParse());
        },
    };
}
function storeReleaseTokens(src) {
    return (builder) => {
        let b_0 = builder;
        b_0.storeUint(2408663073, 32);
        b_0.storeAddress(src.to);
        b_0.storeCoins(src.amount);
        if (src.body !== null && src.body !== undefined) {
            b_0.storeBit(true).storeRef(src.body);
        }
        else {
            b_0.storeBit(false);
        }
    };
}
function loadReleaseTokens(slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2408663073) {
        throw Error("Invalid prefix");
    }
    let _to = sc_0.loadAddress();
    let _amount = sc_0.loadCoins();
    let _body = sc_0.loadBit() ? sc_0.loadRef() : null;
    return {
        $$type: "ReleaseTokens",
        to: _to,
        amount: _amount,
        body: _body,
    };
}
function loadTupleReleaseTokens(source) {
    let _to = source.readAddress();
    let _amount = source.readBigNumber();
    let _body = source.readCellOpt();
    return {
        $$type: "ReleaseTokens",
        to: _to,
        amount: _amount,
        body: _body,
    };
}
function storeTupleReleaseTokens(source) {
    let builder = new core_1.TupleBuilder();
    builder.writeAddress(source.to);
    builder.writeNumber(source.amount);
    builder.writeCell(source.body);
    return builder.build();
}
function dictValueParserReleaseTokens() {
    return {
        serialize: (src, builder) => {
            builder.storeRef((0, core_1.beginCell)().store(storeReleaseTokens(src)).endCell());
        },
        parse: (src) => {
            return loadReleaseTokens(src.loadRef().beginParse());
        },
    };
}
function storeUniqueReceiveInstallment(src) {
    return (builder) => {
        let b_0 = builder;
        b_0.storeUint(952014607, 32);
        b_0.store(storeReceiveInstallment(src.ri));
    };
}
function loadUniqueReceiveInstallment(slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 952014607) {
        throw Error("Invalid prefix");
    }
    let _ri = loadReceiveInstallment(sc_0);
    return { $$type: "UniqueReceiveInstallment", ri: _ri };
}
function loadTupleUniqueReceiveInstallment(source) {
    const _ri = loadTupleReceiveInstallment(source.readTuple());
    return { $$type: "UniqueReceiveInstallment", ri: _ri };
}
function storeTupleUniqueReceiveInstallment(source) {
    let builder = new core_1.TupleBuilder();
    builder.writeTuple(storeTupleReceiveInstallment(source.ri));
    return builder.build();
}
function dictValueParserUniqueReceiveInstallment() {
    return {
        serialize: (src, builder) => {
            builder.storeRef((0, core_1.beginCell)().store(storeUniqueReceiveInstallment(src)).endCell());
        },
        parse: (src) => {
            return loadUniqueReceiveInstallment(src.loadRef().beginParse());
        },
    };
}
function storeStrategies(src) {
    return (builder) => {
        let b_0 = builder;
        b_0.storeDict(src.strategies, core_1.Dictionary.Keys.BigInt(257), dictValueParserSteps());
    };
}
function loadStrategies(slice) {
    let sc_0 = slice;
    let _strategies = core_1.Dictionary.load(core_1.Dictionary.Keys.BigInt(257), dictValueParserSteps(), sc_0);
    return { $$type: "Strategies", strategies: _strategies };
}
function loadTupleStrategies(source) {
    let _strategies = core_1.Dictionary.loadDirect(core_1.Dictionary.Keys.BigInt(257), dictValueParserSteps(), source.readCellOpt());
    return { $$type: "Strategies", strategies: _strategies };
}
function storeTupleStrategies(source) {
    let builder = new core_1.TupleBuilder();
    builder.writeCell(source.strategies.size > 0
        ? (0, core_1.beginCell)()
            .storeDictDirect(source.strategies, core_1.Dictionary.Keys.BigInt(257), dictValueParserSteps())
            .endCell()
        : null);
    return builder.build();
}
function dictValueParserStrategies() {
    return {
        serialize: (src, builder) => {
            builder.storeRef((0, core_1.beginCell)().store(storeStrategies(src)).endCell());
        },
        parse: (src) => {
            return loadStrategies(src.loadRef().beginParse());
        },
    };
}
function storeToTokenCrossChainStrategy(src) {
    return (builder) => {
        let b_0 = builder;
        b_0.storeDict(src.to_token, core_1.Dictionary.Keys.BigInt(257), dictValueParserCrossChainStrategy());
    };
}
function loadToTokenCrossChainStrategy(slice) {
    let sc_0 = slice;
    let _to_token = core_1.Dictionary.load(core_1.Dictionary.Keys.BigInt(257), dictValueParserCrossChainStrategy(), sc_0);
    return { $$type: "ToTokenCrossChainStrategy", to_token: _to_token };
}
function loadTupleToTokenCrossChainStrategy(source) {
    let _to_token = core_1.Dictionary.loadDirect(core_1.Dictionary.Keys.BigInt(257), dictValueParserCrossChainStrategy(), source.readCellOpt());
    return { $$type: "ToTokenCrossChainStrategy", to_token: _to_token };
}
function storeTupleToTokenCrossChainStrategy(source) {
    let builder = new core_1.TupleBuilder();
    builder.writeCell(source.to_token.size > 0
        ? (0, core_1.beginCell)()
            .storeDictDirect(source.to_token, core_1.Dictionary.Keys.BigInt(257), dictValueParserCrossChainStrategy())
            .endCell()
        : null);
    return builder.build();
}
function dictValueParserToTokenCrossChainStrategy() {
    return {
        serialize: (src, builder) => {
            builder.storeRef((0, core_1.beginCell)().store(storeToTokenCrossChainStrategy(src)).endCell());
        },
        parse: (src) => {
            return loadToTokenCrossChainStrategy(src.loadRef().beginParse());
        },
    };
}
function storeCrossChainTokenStrategy(src) {
    return (builder) => {
        let b_0 = builder;
        b_0.storeDict(src.from_token, core_1.Dictionary.Keys.BigInt(257), dictValueParserToTokenCrossChainStrategy());
    };
}
function loadCrossChainTokenStrategy(slice) {
    let sc_0 = slice;
    let _from_token = core_1.Dictionary.load(core_1.Dictionary.Keys.BigInt(257), dictValueParserToTokenCrossChainStrategy(), sc_0);
    return {
        $$type: "CrossChainTokenStrategy",
        from_token: _from_token,
    };
}
function loadTupleCrossChainTokenStrategy(source) {
    let _from_token = core_1.Dictionary.loadDirect(core_1.Dictionary.Keys.BigInt(257), dictValueParserToTokenCrossChainStrategy(), source.readCellOpt());
    return {
        $$type: "CrossChainTokenStrategy",
        from_token: _from_token,
    };
}
function storeTupleCrossChainTokenStrategy(source) {
    let builder = new core_1.TupleBuilder();
    builder.writeCell(source.from_token.size > 0
        ? (0, core_1.beginCell)()
            .storeDictDirect(source.from_token, core_1.Dictionary.Keys.BigInt(257), dictValueParserToTokenCrossChainStrategy())
            .endCell()
        : null);
    return builder.build();
}
function dictValueParserCrossChainTokenStrategy() {
    return {
        serialize: (src, builder) => {
            builder.storeRef((0, core_1.beginCell)().store(storeCrossChainTokenStrategy(src)).endCell());
        },
        parse: (src) => {
            return loadCrossChainTokenStrategy(src.loadRef().beginParse());
        },
    };
}
function storeFromTokenToTargetTokenToSteps(src) {
    return (builder) => {
        let b_0 = builder;
        b_0.storeDict(src.i, core_1.Dictionary.Keys.BigInt(257), dictValueParserTargetTokenToSteps());
    };
}
function loadFromTokenToTargetTokenToSteps(slice) {
    let sc_0 = slice;
    let _i = core_1.Dictionary.load(core_1.Dictionary.Keys.BigInt(257), dictValueParserTargetTokenToSteps(), sc_0);
    return { $$type: "FromTokenToTargetTokenToSteps", i: _i };
}
function loadTupleFromTokenToTargetTokenToSteps(source) {
    let _i = core_1.Dictionary.loadDirect(core_1.Dictionary.Keys.BigInt(257), dictValueParserTargetTokenToSteps(), source.readCellOpt());
    return { $$type: "FromTokenToTargetTokenToSteps", i: _i };
}
function storeTupleFromTokenToTargetTokenToSteps(source) {
    let builder = new core_1.TupleBuilder();
    builder.writeCell(source.i.size > 0
        ? (0, core_1.beginCell)()
            .storeDictDirect(source.i, core_1.Dictionary.Keys.BigInt(257), dictValueParserTargetTokenToSteps())
            .endCell()
        : null);
    return builder.build();
}
function dictValueParserFromTokenToTargetTokenToSteps() {
    return {
        serialize: (src, builder) => {
            builder.storeRef((0, core_1.beginCell)().store(storeFromTokenToTargetTokenToSteps(src)).endCell());
        },
        parse: (src) => {
            return loadFromTokenToTargetTokenToSteps(src.loadRef().beginParse());
        },
    };
}
function storeTargetTokenToSteps(src) {
    return (builder) => {
        let b_0 = builder;
        b_0.storeDict(src.i, core_1.Dictionary.Keys.BigInt(257), dictValueParserSteps());
    };
}
function loadTargetTokenToSteps(slice) {
    let sc_0 = slice;
    let _i = core_1.Dictionary.load(core_1.Dictionary.Keys.BigInt(257), dictValueParserSteps(), sc_0);
    return { $$type: "TargetTokenToSteps", i: _i };
}
function loadTupleTargetTokenToSteps(source) {
    let _i = core_1.Dictionary.loadDirect(core_1.Dictionary.Keys.BigInt(257), dictValueParserSteps(), source.readCellOpt());
    return { $$type: "TargetTokenToSteps", i: _i };
}
function storeTupleTargetTokenToSteps(source) {
    let builder = new core_1.TupleBuilder();
    builder.writeCell(source.i.size > 0
        ? (0, core_1.beginCell)()
            .storeDictDirect(source.i, core_1.Dictionary.Keys.BigInt(257), dictValueParserSteps())
            .endCell()
        : null);
    return builder.build();
}
function dictValueParserTargetTokenToSteps() {
    return {
        serialize: (src, builder) => {
            builder.storeRef((0, core_1.beginCell)().store(storeTargetTokenToSteps(src)).endCell());
        },
        parse: (src) => {
            return loadTargetTokenToSteps(src.loadRef().beginParse());
        },
    };
}
function storeSteps(src) {
    return (builder) => {
        let b_0 = builder;
        b_0.storeDict(src.steps, core_1.Dictionary.Keys.BigInt(257), core_1.Dictionary.Values.BigInt(257));
        b_0.storeInt(src.size, 257);
    };
}
function loadSteps(slice) {
    let sc_0 = slice;
    let _steps = core_1.Dictionary.load(core_1.Dictionary.Keys.BigInt(257), core_1.Dictionary.Values.BigInt(257), sc_0);
    let _size = sc_0.loadIntBig(257);
    return { $$type: "Steps", steps: _steps, size: _size };
}
function loadTupleSteps(source) {
    let _steps = core_1.Dictionary.loadDirect(core_1.Dictionary.Keys.BigInt(257), core_1.Dictionary.Values.BigInt(257), source.readCellOpt());
    let _size = source.readBigNumber();
    return { $$type: "Steps", steps: _steps, size: _size };
}
function storeTupleSteps(source) {
    let builder = new core_1.TupleBuilder();
    builder.writeCell(source.steps.size > 0
        ? (0, core_1.beginCell)()
            .storeDictDirect(source.steps, core_1.Dictionary.Keys.BigInt(257), core_1.Dictionary.Values.BigInt(257))
            .endCell()
        : null);
    builder.writeNumber(source.size);
    return builder.build();
}
function dictValueParserSteps() {
    return {
        serialize: (src, builder) => {
            builder.storeRef((0, core_1.beginCell)().store(storeSteps(src)).endCell());
        },
        parse: (src) => {
            return loadSteps(src.loadRef().beginParse());
        },
    };
}
function storeCrossChainStrategy(src) {
    return (builder) => {
        let b_0 = builder;
        b_0.store(storeSteps(src.local_steps));
        b_0.store(storeSteps(src.foreign_steps));
    };
}
function loadCrossChainStrategy(slice) {
    let sc_0 = slice;
    let _local_steps = loadSteps(sc_0);
    let _foreign_steps = loadSteps(sc_0);
    return {
        $$type: "CrossChainStrategy",
        local_steps: _local_steps,
        foreign_steps: _foreign_steps,
    };
}
function loadTupleCrossChainStrategy(source) {
    const _local_steps = loadTupleSteps(source.readTuple());
    const _foreign_steps = loadTupleSteps(source.readTuple());
    return {
        $$type: "CrossChainStrategy",
        local_steps: _local_steps,
        foreign_steps: _foreign_steps,
    };
}
function storeTupleCrossChainStrategy(source) {
    let builder = new core_1.TupleBuilder();
    builder.writeTuple(storeTupleSteps(source.local_steps));
    builder.writeTuple(storeTupleSteps(source.foreign_steps));
    return builder.build();
}
function dictValueParserCrossChainStrategy() {
    return {
        serialize: (src, builder) => {
            builder.storeRef((0, core_1.beginCell)().store(storeCrossChainStrategy(src)).endCell());
        },
        parse: (src) => {
            return loadCrossChainStrategy(src.loadRef().beginParse());
        },
    };
}
function storeTargetTokenToCrossChainStrategy(src) {
    return (builder) => {
        let b_0 = builder;
        b_0.storeDict(src.i, core_1.Dictionary.Keys.BigInt(257), dictValueParserCrossChainStrategy());
    };
}
function loadTargetTokenToCrossChainStrategy(slice) {
    let sc_0 = slice;
    let _i = core_1.Dictionary.load(core_1.Dictionary.Keys.BigInt(257), dictValueParserCrossChainStrategy(), sc_0);
    return { $$type: "TargetTokenToCrossChainStrategy", i: _i };
}
function loadTupleTargetTokenToCrossChainStrategy(source) {
    let _i = core_1.Dictionary.loadDirect(core_1.Dictionary.Keys.BigInt(257), dictValueParserCrossChainStrategy(), source.readCellOpt());
    return { $$type: "TargetTokenToCrossChainStrategy", i: _i };
}
function storeTupleTargetTokenToCrossChainStrategy(source) {
    let builder = new core_1.TupleBuilder();
    builder.writeCell(source.i.size > 0
        ? (0, core_1.beginCell)()
            .storeDictDirect(source.i, core_1.Dictionary.Keys.BigInt(257), dictValueParserCrossChainStrategy())
            .endCell()
        : null);
    return builder.build();
}
function dictValueParserTargetTokenToCrossChainStrategy() {
    return {
        serialize: (src, builder) => {
            builder.storeRef((0, core_1.beginCell)().store(storeTargetTokenToCrossChainStrategy(src)).endCell());
        },
        parse: (src) => {
            return loadTargetTokenToCrossChainStrategy(src.loadRef().beginParse());
        },
    };
}
function storeFromTokenToTargetTokenToCrossChainStrategy(src) {
    return (builder) => {
        let b_0 = builder;
        b_0.storeDict(src.i, core_1.Dictionary.Keys.BigInt(257), dictValueParserTargetTokenToCrossChainStrategy());
    };
}
function loadFromTokenToTargetTokenToCrossChainStrategy(slice) {
    let sc_0 = slice;
    let _i = core_1.Dictionary.load(core_1.Dictionary.Keys.BigInt(257), dictValueParserTargetTokenToCrossChainStrategy(), sc_0);
    return {
        $$type: "FromTokenToTargetTokenToCrossChainStrategy",
        i: _i,
    };
}
function loadTupleFromTokenToTargetTokenToCrossChainStrategy(source) {
    let _i = core_1.Dictionary.loadDirect(core_1.Dictionary.Keys.BigInt(257), dictValueParserTargetTokenToCrossChainStrategy(), source.readCellOpt());
    return {
        $$type: "FromTokenToTargetTokenToCrossChainStrategy",
        i: _i,
    };
}
function storeTupleFromTokenToTargetTokenToCrossChainStrategy(source) {
    let builder = new core_1.TupleBuilder();
    builder.writeCell(source.i.size > 0
        ? (0, core_1.beginCell)()
            .storeDictDirect(source.i, core_1.Dictionary.Keys.BigInt(257), dictValueParserTargetTokenToCrossChainStrategy())
            .endCell()
        : null);
    return builder.build();
}
function dictValueParserFromTokenToTargetTokenToCrossChainStrategy() {
    return {
        serialize: (src, builder) => {
            builder.storeRef((0, core_1.beginCell)()
                .store(storeFromTokenToTargetTokenToCrossChainStrategy(src))
                .endCell());
        },
        parse: (src) => {
            return loadFromTokenToTargetTokenToCrossChainStrategy(src.loadRef().beginParse());
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
function loadUpdateProtocolFee(slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 865129320) {
        throw Error("Invalid prefix");
    }
    let _new_fee = sc_0.loadIntBig(257);
    return { $$type: "UpdateProtocolFee", new_fee: _new_fee };
}
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
        serialize: (src, builder) => {
            builder.storeRef((0, core_1.beginCell)().store(storeUpdateProtocolFee(src)).endCell());
        },
        parse: (src) => {
            return loadUpdateProtocolFee(src.loadRef().beginParse());
        },
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
function loadAddValidator(slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2513894818) {
        throw Error("Invalid prefix");
    }
    let _key = sc_0.loadIntBig(257);
    let _address = sc_0.loadAddress();
    return { $$type: "AddValidator", key: _key, address: _address };
}
function loadTupleAddValidator(source) {
    let _key = source.readBigNumber();
    let _address = source.readAddress();
    return { $$type: "AddValidator", key: _key, address: _address };
}
function storeTupleAddValidator(source) {
    let builder = new core_1.TupleBuilder();
    builder.writeNumber(source.key);
    builder.writeAddress(source.address);
    return builder.build();
}
function dictValueParserAddValidator() {
    return {
        serialize: (src, builder) => {
            builder.storeRef((0, core_1.beginCell)().store(storeAddValidator(src)).endCell());
        },
        parse: (src) => {
            return loadAddValidator(src.loadRef().beginParse());
        },
    };
}
function storeRemoveValidator(src) {
    return (builder) => {
        let b_0 = builder;
        b_0.storeUint(3282419170, 32);
        b_0.storeInt(src.key, 257);
    };
}
function loadRemoveValidator(slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 3282419170) {
        throw Error("Invalid prefix");
    }
    let _key = sc_0.loadIntBig(257);
    return { $$type: "RemoveValidator", key: _key };
}
function loadTupleRemoveValidator(source) {
    let _key = source.readBigNumber();
    return { $$type: "RemoveValidator", key: _key };
}
function storeTupleRemoveValidator(source) {
    let builder = new core_1.TupleBuilder();
    builder.writeNumber(source.key);
    return builder.build();
}
function dictValueParserRemoveValidator() {
    return {
        serialize: (src, builder) => {
            builder.storeRef((0, core_1.beginCell)().store(storeRemoveValidator(src)).endCell());
        },
        parse: (src) => {
            return loadRemoveValidator(src.loadRef().beginParse());
        },
    };
}
function storeSetIncomingStrategy(src) {
    return (builder) => {
        let b_0 = builder;
        b_0.storeUint(1894737173, 32);
        b_0.storeInt(src.from_chain, 257);
        b_0.storeInt(src.from_token, 257);
        b_0.storeInt(src.target_token, 257);
        let b_1 = new core_1.Builder();
        b_1.store(storeSteps(src.steps));
        b_0.storeRef(b_1.endCell());
    };
}
function loadSetIncomingStrategy(slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1894737173) {
        throw Error("Invalid prefix");
    }
    let _from_chain = sc_0.loadIntBig(257);
    let _from_token = sc_0.loadIntBig(257);
    let _target_token = sc_0.loadIntBig(257);
    let sc_1 = sc_0.loadRef().beginParse();
    let _steps = loadSteps(sc_1);
    return {
        $$type: "SetIncomingStrategy",
        from_chain: _from_chain,
        from_token: _from_token,
        target_token: _target_token,
        steps: _steps,
    };
}
function loadTupleSetIncomingStrategy(source) {
    let _from_chain = source.readBigNumber();
    let _from_token = source.readBigNumber();
    let _target_token = source.readBigNumber();
    const _steps = loadTupleSteps(source.readTuple());
    return {
        $$type: "SetIncomingStrategy",
        from_chain: _from_chain,
        from_token: _from_token,
        target_token: _target_token,
        steps: _steps,
    };
}
function storeTupleSetIncomingStrategy(source) {
    let builder = new core_1.TupleBuilder();
    builder.writeNumber(source.from_chain);
    builder.writeNumber(source.from_token);
    builder.writeNumber(source.target_token);
    builder.writeTuple(storeTupleSteps(source.steps));
    return builder.build();
}
function dictValueParserSetIncomingStrategy() {
    return {
        serialize: (src, builder) => {
            builder.storeRef((0, core_1.beginCell)().store(storeSetIncomingStrategy(src)).endCell());
        },
        parse: (src) => {
            return loadSetIncomingStrategy(src.loadRef().beginParse());
        },
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
function loadSetCrossChainStrategy(slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1825931216) {
        throw Error("Invalid prefix");
    }
    let _target_chain = sc_0.loadIntBig(257);
    let _from_token = sc_0.loadIntBig(257);
    let _target_token = sc_0.loadIntBig(257);
    let sc_1 = sc_0.loadRef().beginParse();
    let _local_steps = loadSteps(sc_1);
    let _foreign_steps = loadSteps(sc_1);
    return {
        $$type: "SetCrossChainStrategy",
        target_chain: _target_chain,
        from_token: _from_token,
        target_token: _target_token,
        local_steps: _local_steps,
        foreign_steps: _foreign_steps,
    };
}
function loadTupleSetCrossChainStrategy(source) {
    let _target_chain = source.readBigNumber();
    let _from_token = source.readBigNumber();
    let _target_token = source.readBigNumber();
    const _local_steps = loadTupleSteps(source.readTuple());
    const _foreign_steps = loadTupleSteps(source.readTuple());
    return {
        $$type: "SetCrossChainStrategy",
        target_chain: _target_chain,
        from_token: _from_token,
        target_token: _target_token,
        local_steps: _local_steps,
        foreign_steps: _foreign_steps,
    };
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
        serialize: (src, builder) => {
            builder.storeRef((0, core_1.beginCell)().store(storeSetCrossChainStrategy(src)).endCell());
        },
        parse: (src) => {
            return loadSetCrossChainStrategy(src.loadRef().beginParse());
        },
    };
}
function storeRemoveInternalStrategy(src) {
    return (builder) => {
        let b_0 = builder;
        b_0.storeUint(1891525520, 32);
        b_0.storeInt(src.from_chain, 257);
        b_0.storeInt(src.from_token, 257);
        b_0.storeInt(src.target_token, 257);
    };
}
function loadRemoveInternalStrategy(slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1891525520) {
        throw Error("Invalid prefix");
    }
    let _from_chain = sc_0.loadIntBig(257);
    let _from_token = sc_0.loadIntBig(257);
    let _target_token = sc_0.loadIntBig(257);
    return {
        $$type: "RemoveInternalStrategy",
        from_chain: _from_chain,
        from_token: _from_token,
        target_token: _target_token,
    };
}
function loadTupleRemoveInternalStrategy(source) {
    let _from_chain = source.readBigNumber();
    let _from_token = source.readBigNumber();
    let _target_token = source.readBigNumber();
    return {
        $$type: "RemoveInternalStrategy",
        from_chain: _from_chain,
        from_token: _from_token,
        target_token: _target_token,
    };
}
function storeTupleRemoveInternalStrategy(source) {
    let builder = new core_1.TupleBuilder();
    builder.writeNumber(source.from_chain);
    builder.writeNumber(source.from_token);
    builder.writeNumber(source.target_token);
    return builder.build();
}
function dictValueParserRemoveInternalStrategy() {
    return {
        serialize: (src, builder) => {
            builder.storeRef((0, core_1.beginCell)().store(storeRemoveInternalStrategy(src)).endCell());
        },
        parse: (src) => {
            return loadRemoveInternalStrategy(src.loadRef().beginParse());
        },
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
function loadRemoveCrossChainStrategy(slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 207130758) {
        throw Error("Invalid prefix");
    }
    let _target_chain = sc_0.loadIntBig(257);
    let _from_token = sc_0.loadIntBig(257);
    let _target_token = sc_0.loadIntBig(257);
    return {
        $$type: "RemoveCrossChainStrategy",
        target_chain: _target_chain,
        from_token: _from_token,
        target_token: _target_token,
    };
}
function loadTupleRemoveCrossChainStrategy(source) {
    let _target_chain = source.readBigNumber();
    let _from_token = source.readBigNumber();
    let _target_token = source.readBigNumber();
    return {
        $$type: "RemoveCrossChainStrategy",
        target_chain: _target_chain,
        from_token: _from_token,
        target_token: _target_token,
    };
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
        serialize: (src, builder) => {
            builder.storeRef((0, core_1.beginCell)().store(storeRemoveCrossChainStrategy(src)).endCell());
        },
        parse: (src) => {
            return loadRemoveCrossChainStrategy(src.loadRef().beginParse());
        },
    };
}
function initBridge_init_args(src) {
    return (builder) => {
        let b_0 = builder;
        b_0.storeInt(src.chain_nonce, 257);
        b_0.storeInt(src.native_coin, 257);
        b_0.storeStringRefTail(src.base_uri);
        b_0.storeInt(src.transfer_fee, 257);
        let b_1 = new core_1.Builder();
        b_1.storeInt(src.protocol_fee, 257);
        b_1.storeInt(src.bootstrap_validator_key, 257);
        b_1.storeAddress(src.bootstrap_validator_address);
        let b_2 = new core_1.Builder();
        b_2.storeAddress(src.ton_liquidity_pool);
        b_1.storeRef(b_2.endCell());
        b_0.storeRef(b_1.endCell());
    };
}
async function Bridge_init(chain_nonce, native_coin, base_uri, transfer_fee, protocol_fee, bootstrap_validator_key, bootstrap_validator_address, ton_liquidity_pool) {
    const __code = core_1.Cell.fromBase64("te6ccgEC2AEAPo8AART/APSkE/S88sgLAQIBYgIDA+LQAdDTAwFxsKMB+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiFRQUwNvBPhhAvhi2zwREhEUERIRERETEREREBESERAPEREPDhEQDhDfVRzbPPLggsj4QwHMfwHKABETERIREREQVeDbPMntVMEEBQIBIIyNBO7tou37AZIwf+BwIddJwh+VMCDXCx/eIIIQc2LQnLqOuzDTHwGCEHNi0Jy68uCB0z/6APpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IhUEwMQI2wU2zx/4CCCEHvdl966jwgw2zxsFts8f+AgghDrEm3LugYHCAkB8gEREgERE4EBAc8AAREQAYEBAc8AHoEBAc8ADMiBAQHPABuBAQHPABn0ABf0ABX0AFADINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WAcj0ABL0ABLKAMhQA88WyVjMEoEBAc8AEoEBAc8AA8j0ABSBAQHPABQXAfYxMhESERQREhERERMREREQERQREA8REw8OERQODRETDQwRFAwLERMLChEUCgkREwkIERQIBxETBwYRFAYFERMFBBEUBAMREwMCERQCARETAREUgU1QKLPy9BET0z+BAQFUWgBSQEEz9AxvoZQB1wAwkltt4oIAxEUhbrMKALLTHwGCEHvdl9668uCB0z/6APpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgB+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiAH6AFFVFRRDMAH2NV8DERIRFBESERERExERERARFBEQDxETDw4RFA4NERMNDBEUDAsREwsKERQKCRETCQgRFAgHERMHBhEUBgUREwUEERQEAxETAwIRFAIBERMBERSBTVAos/L0ERPTP4EBAVRaAFJAQTP0DG+hlAHXADCSW23iggDERSFuFQR0jpww0x8BghDrEm3LuvLggdM/1NTU+gBVQGwV2zx/4CCCEPpdRdS6jwgw2zxsGts8f+AgghBquMBBuhgZGhsC9PL0ggD3tfhBbyQTXwMCIG7y0IAooBK+8vQRE6QRE9TU1DAi0NP/MFYRgQEBIln0DW+hkjBt3yBukjBtjofQ2zxsGW8J4oEzjyFus/L0IG7y0IBvKRAoXwiC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gQEBzwAByIEBAc8AWCDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFlADKQGSIG6VMFn0WjCUQTP0FeIRERESEREREBERERAPERAPEO8NDhC8EKsQmhCJEHgQZxBWEEUQNEEwcIBA+EFvJBAjXwN/QTNtbW3bPIkAtCBulTBwAcsBjh4g10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxbiyFggbpUwcAHLAY4eINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8W4skBzMkBzAPUXw9sMRETER4RExESER0REhERERwREREQERsREA8RGg8OERkODREYDQwRFwwLERYLChEVCgkRFAkIER4IBxEdBwYRHAYFERsFBBEaBAMRGQMCERgCAREXAds8gU1QKLPy9PhD+ChWGds8XIg1KwHWcFnIcAHLAXMBywFwAcsAEszMyfkAyHIBywFwAcsAEsoHy//J0CDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgKERgKCREXCQgRFggHESAHBhEfBgURHgUEER0EAxEcAwIRGwIBERoBERksArjIVaCCEBcY2YtQDMsfBxBqEFkQSEoTUJjbPPQAAsiBAQHPAMv/EoEBAc8AyQHMyRA/cFqAQAIBERMBERJ/BkVV2zwHERIHBhERBgUREAUQTxA+TRtQykiXRWRQAzaJAH7THwGCEIlperC68uCB0z/TP/oAgQEB1wDU1PpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgXFhUUQzAC9BESER0REhERERwREREQERsREA8RGg8OERkODREYDQwRFwwLERYLChEVCgkRFAkIERMIBxEdBwYRHAYFERsFBBEaBAMRGQMCERgCAREXAREWgVrfERjbPPhBbyQQI18DxwUBERgB8vSCAMXiVhQvuvL0VhvQ0/8wVhvQMzQC9FYUVhRWFFYUVhRWFFYUVhRWFFYUVhRWFFYUVhRWFFYUVhRWFFYUERIRJxESERERJhERERARJREQDxEkDw4RIw4NESINDBEhDAsRIAsKER8KCREeCQgRHQgHERwHBhEbBgURGgUEERkEAxEYAwIRFwIBERYBERXbPFcQxzEE2oIQM5DTaLqOmDDTHwGCEDOQ02i68uCBgQEB1wABMds8f+AgghC0uwq1uo6VMNMfAYIQtLsKtbry4IHUAdAx2zx/4CCCEGrfeIG6jpgw0x8BghBq33iBuvLggYEBAdcAATHbPH/gIIIQldb9orpPUFFSAvZfD2wxERMRFRETERIRFBESERERFRERERARFBEQDxEVDw4RFA4NERUNDBEUDAsRFQsKERQKCREVCQgRFAgHERUHBhEUBgURFQUEERQEAxEVAwIRFAIBERUB2zyBAQEgEEoTAhEVAgERFgEhbpVbWfRaMJjIAc8AQTP0QuKIMgFwERAREhEQDxERDw4REA4Q3xDOEL0QrBCbEIoQeQgQVxBGEDVEA3CAQPhBbyQQI18Df0EzbW1t2zyJAZD4Q/goWNs8cFnIcAHLAXMBywFwAcsAEszMyfkAyHIBywFwAcsAEsoHy//J0CDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4Ig1A/7T/zBWFgFWFgFWFgERIVYgViBWIMhVYNs8yfkAERMRFRETERIRFBESERERExERERAREhEQDxERDw4REA4Q3xDOEL0QrBCbEIoQeRBoEFcQRhA1ECQDERgDAgERGgERGds8ERIRFRESERERFBERERARExEQDxESDw4REQ4NERANNjc4AKIC0PQEMG0BgW9fAYAQ9A9vofLghwGBb18iAoAQ9BfIAcj0AMkBzHABygBAA1kg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxaBAQHPAMkAcoIQiWl6sFAIyx8Wyz8Uyz9Y+gKBAQHPAMzMASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFgCYcAGOPSGBAQEiWfQNb6GSMG3fIG6SMG2c0NQB0AHT/1lsEm8C4iBu8tCAbyIxJ4EBASJZ9AxvoZIwbd8xbrORpN7kMYIAt1YyI77y9AEeEM9VKxIBERcBERtWGFYXOQP6ERQRFxEUERMRFhETERIRFRESERERFxERERARFhEQDxEVDw4RFw4NERYNDBEVDAsRFwsKERYKCREVCQgRFwgHERYHBhEVBgURFwUEERYEAxEVAwIRFwIBERYBERVWF9s8cAGK5FtXE1cTVxMPERIPDhERDg0REA1VLAURFAU6OzwB8oEBAVYQQBRZ9A1voZIwbd8gbpIwbZfQ9AQBMW8B4oIAh2khbrPy9CBu8tCAbyGBAQFYWfQNb6GSMG3fIG6SMG2X0PQEATFvAeKBON4hbrPy9CBu8tCAbyGBAQFYWfQNb6GSMG3fIG6SMG2d0PQEgQEB1wBZbBJvAuI9AnqBAQFUUgBSMEEz9AxvoZQB1wAwkltt4iBu8tCAIMAN4w8REhEUERIRERETEREREBESERAPEREPDhEQDlUdPj8BlAQREwQDERcDAhEWAgERGAERFchVUNs8yciCWMAAAAAAAAAAAAAAAAEBy2fMyXD7AAwREgwLERELChEQChCfEI4QfRBsVVVFBEATTgAgggDpDiFus/L0IG7y0IBvIgPGMBESERQREhERERMREREQERQREA8REw8OERQODRETDQwRFAwLERMLChEUCgkREwkIERQIBxETBwYRFAYFERMFBBEUBAMREwMCERQCARETAREU2zxWGAG6johWFlYWVhnbPOMOpEhAA5AgwASPQcAHjymBAQEhpFMTVSBBM/QMb6GUAdcAMJJbbeIgbrOXIG7y0IDACJIwcOLjD44RpBEUARETARESARERAREQVdHi4w1CQ0QD9lYWVhZWGYEBAVYRAln0DW+hkjBt3yBukjBtjofQ2zxsGW8J4oEQISFus/L0IG7y0IBvKRAoXwhtcMiNCJVbmxvY2tlZCBmcm9tIEVtbWV0LmZpbmFuY2UgQnJpZGdlgzxbJ0FMVBQdVMFVQyFVg2zzJJ39wUAQDbW3bPEtBiQDeghAPin6lUAjLHxbLP1AE+gJYINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WASBulTBwAcsBjh4g10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxbiIW6zlX8BygDMlHAyygDiAfoCAc8WAbAREhEUERIRERETEREREBEUERAPERMPDhEUDg0REw0MERQMCxETCwoRFAoJERMJCBEUCAcREwcGERQGBRETBQQRFAQDERMDAhEUAgEREwERFFYWVhZWGds8RQGwERIRFBESERERExERERARFBEQDxETDw4RFA4NERMNDBEUDAsREwsKERQKCRETCQgRFAgHERMHBhEUBgUREwUEERQEAxETAwIRFAIBERMBERRWFlYWVhnbPEgBrjAREhEUERIRERETEREREBEUERAPERMPDhEUDg0REw0MERQMCxETCwoRFAoJERMJCBEUCAcREwcGERQGBRETBQQRFAQDERMDAhEUAgEREwERFFYWVhZWGUoCwIEBAVYRAln0DW+hkjBt3yBukjBtjofQ2zxsGW8J4oEQISFus/L0IG7y0IBvKVB4XweBWTQhbrPy9IIA9FwibrPy9AEgbvLQgAEgbvLQgMiCCfODXQHLH3AByz8j+gL4KEtGAdwg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxZxAcsAyIIQJZOFYQHLKVADINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8W+Cgg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxb4KEcBwCDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFshw+gIlINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WcPoCcAHLAHD6AnABywBwAcsPcAHLAMkBzMlYzMlDMEkCgoEBAVYRAln0DW+hkjBt3yBukjBtjofQ2zxsGW8J4oEQISFus/L0IG7y0IBvKRhfCIFZNCFus/L0IG7y0IDIyUMwS0kBlMhVIIIQj5FIIVAEyx9YINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WAfoCIW6zlX8BygDMlHAyygDiyYBAf3BQBANtbds8iQOkgQEBVhECWfQNb6GSMG3fIG6SMG2Oh9DbPGwZbwniggC/zCFus/L0IG7y0IBvKRB4Xwj4KG1wyMnQEDUQRshVUNs8yYIQBMS0AH9wUAQDbW3bPEtMiQHm1AHQAfpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgB+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiAHTB4EBAdcA1AHQgQEB1wD6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIAU0AyIIQibcdCVAHyx9QBSDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFlADINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WgQEBzwAhbrOVfwHKAMyUcDLKAOIB+gIBzxYA0iDXCwHDAI4f+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiJRy1yFt4gHUMNAg1wsBwwCOH/pAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IiUctchbeIxEEkQSBBHEEYQRQBWUFbL/1AD+gLMzMs/ASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFgL0VhNWE1YTVhNWE1YTVhNWE1YTVhNWE1YTVhNWE1YTVhNWE1YTVhMREhEmERIRERElEREREBEkERAPESMPDhEiDg0RIQ0MESAMCxEfCwoRHgoJER0JCBEcCAcRGwcGERoGBREZBQQRGAQDERcDAhEWAgERFQERFNs8VxDHUwL0VhNWE1YTVhNWE1YTVhNWE1YTVhNWE1YTVhNWE1YTVhNWE1YTVhMREhEmERIRERElEREREBEkERAPESMPDhEiDg0RIQ0MESAMCxEfCwoRHgoJER0JCBEcCAcRGwcGERoGBREZBQQRGAQDERcDAhEWAgERFQERFNs8VxDHVAL0VhNWE1YTVhNWE1YTVhNWE1YTVhNWE1YTVhNWE1YTVhNWE1YTVhMREhEmERIRERElEREREBEkERAPESMPDhEiDg0RIQ0MESAMCxEfCwoRHgoJER0JCBEcCAcRGwcGERoGBREZBQQRGAQDERcDAhEWAgERFQERFNs8VxDHVQTgjrgw0x8BghCV1v2iuvLggYEBAdcA+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiBJsEts8f+AgghDDpb3iuo6YMNMfAYIQw6W94rry4IGBAQHXAAEx2zx/4CCCEHDvZRW64wIgghBs1X/QulZXWFkC5l8PbDERExEUERMREhEUERIREREUEREREBEUERAPERQPDhEUDg0RFA0MERQMCxEUCwoRFAoJERQJCBEUCAcRFAcGERQGBREUBQQRFAQDERQDAhEUAgERFAHbPBESERMREhERERIREREQEREREA8REA9VDjWIcQL+Xw9sMRETERQRExESERQREhERERQREREQERQREA8RFA8OERQODREUDQwRFAwLERQLChEUCgkRFAkIERQIBxEUBwYRFAYFERQFBBEUBAMRFAMCERQCAREUAds8NhERERIREREQEREREA8REA8Q7xDeEM0QvBCrEJoQiRB4EGdVBIhxAuZfD2wxERMRFBETERIRFBESERERFBERERARFBEQDxEUDw4RFA4NERQNDBEUDAsRFAsKERQKCREUCQgRFAgHERQHBhEUBgURFAUEERQEAxEUAwIRFAIBERQB2zwREhETERIRERESEREREBERERAPERAPVQ42iHEC9FYUVhRWFFYUVhRWFFYUVhRWFFYUVhRWFFYUVhRWFFYUVhRWFFYUERIRJxESERERJhERERARJREQDxEkDw4RIw4NESINDBEhDAsRIAsKER8KCREeCQgRHQgHERwHBhEbBgURGgUEERkEAxEYAwIRFwIBERYBERXbPFcQx1oC9FYTVhNWE1YTVhNWE1YTVhNWE1YTVhNWE1YTVhNWE1YTVhNWE1YTERIRJhESERERJRERERARJBEQDxEjDw4RIg4NESENDBEgDAsRHwsKER4KCREdCQgRHAgHERsHBhEaBgURGQUEERgEAxEXAwIRFgIBERUBERTbPFcQx1wBaDDTHwGCEHDvZRW68uCBgQEB1wCBAQHXAIEBAdcA1AHQ9ASBAQHXAFkyECUQJEMAbBXbPH9eBP6OvzDTHwGCEGzVf9C68uCBgQEB1wCBAQHXAIEBAdcA1AHQ9ASBAQHXAFkC9ASBAQHXAFkyEEcQRhBFQwBsF9s8f+AgghAMWJCGuo6kMNMfAYIQDFiQhrry4IGBAQHXAIEBAdcAgQEB1wBVIGwT2zx/4CCCEHC+Y5C64wIgwAAiY2RlZgL6Xw9sMRETERURExESERQREhERERUREREQERQREA8RFQ8OERQODREVDQwRFAwLERULChEUCgkRFQkIERQIBxEVBwYRFAYFERUFBBEUBAMRFQMCERQCAREVAds8MYEBAQIBERMBERQgbpUwWfRaMJRBM/QU4hERpCCqAHOpBKSIWwF0ERAREhEQDxERDw4REA4Q3xDOEL0QrBCbEIoQeRBoEFcQRhA1QQQDcIBA+EFvJBAjXwN/QTNtbW3bPIkC9F8PbDERExEUERMREhEUERIREREUEREREBEUERAPERQPDhEUDg0RFA0MERQMCxEUCwoRFAoJERQJCBEUCAcRFAcGERQGBREUBQQRFAQDERQDAhEUAgERFAHbPDESgQEBARETbSBulTBZ9FowlEEz9BTiAaUgqgBzqQSkiF0BShERERIREREQEREREA8REA9VDnCAQPhBbyQQI18Df0EzbW1t2zyJAvRWF1YXVhdWF1YXVhdWF1YXVhdWF1YXVhdWF1YXVhdWF1YXVhdWFxESESoREhERESkREREQESgREA8RJw8OESYODRElDQwRJAwLESMLChEiCgkRIQkIESAIBxEfBwYRHgYFER0FBBEcBAMRGwMCERoCAREZAREY2zxXEMdfAvhfD2wxERMRGBETERIRFxESERERFhERERARFREQDxEUDw4RGA4NERcNDBEWDAsRFQsKERQKCREYCQgRFwgHERYHBhEVBgURFAUEERgEAxEXAwIRFgIBERUB2zwREhEXERIREREWEREREBEVERAPERQPDhETDg0REg0MEREMiGACOgsREAsQr1VJ2zxwgED4QW8kECNfA39BM21tbds8YYkB9FYRgQEBJln0DW+hkjBt3yBukjBtl9D0BAExbwHiIG6UMG1vAd4gbvLQgG8hIIEBASZZ9A1voZIwbd8gbpIwbZfQ9AQBMW8B4iBulDBtbwHeIG7y0IBvIQOBAQEDyFkC9ACBAQHPAMkUIG6VMFn0WjCUQTP0FeKBAQEBYgBkyAEB9ADJQTAgbpUwWfRaMJRBM/QV4oEBAQHIAQH0AMkQPxIgbpUwWfRaMJRBM/QV4gwC9FYZVhlWGVYZVhlWGVYZVhlWGVYZVhlWGVYZVhlWGVYZVhlWGVYZERIRLBESERERKxERERARKhEQDxEpDw4RKA4NEScNDBEmDAsRJQsKESQKCREjCQgRIggHESEHBhEgBgURHwUEER4EAxEdAwIRHAIBERsBERrbPFcQx2cC9FYVVhVWFVYVVhVWFVYVVhVWFVYVVhVWFVYVVhVWFVYVVhVWFVYVERIRKBESERERJxERERARJhEQDxElDw4RJA4NESMNDBEiDAsRIQsKESAKCREfCQgRHggHER0HBhEcBgURGwUEERoEAxEZAwIRGAIBERcBERbbPFcQx2sBSDDTHwGCEHC+Y5C68uCBgQEB1wCBAQHXAIEBAdcAVSBsE9s8f24D/NdJwSGwklt/4CCCEJRqmLa6jqgw0x8BghCUapi2uvLggdM/ATHIAYIQr/kPV1jLH8s/yfhCAXBt2zx/4CCCEAph21m6jrYw0x8BghAKYdtZuvLggfpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgBgQEB1wBZbBLgIHN0dQL4Xw9sMRETERoRExESERkREhERERgREREQERcREA8RFg8OERUODREUDQwRGgwLERkLChEYCgkRFwkIERYIBxEVBwYRFAYFERoFBBEZBAMRGAMCERcCAREWAds8ERIRGRESERERGBERERARFxEQDxEWDw4RFQ4NERQNDBETDIhoAk4LERIL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gQEBzwDJEDwSIG6VMFn0WjCUQTP0FeIJfwEKkTDjDXCAAvApERERExERXj8OERIODRETDQwREgwLERMLChESCgkREwkIERIIBxETBwYREgYFERMFBBESBAMREwMCERICARETARESgQEBERTbPAIRFAIBERUBWfQNb6GSMG3fIG6SMG2d0PQEgQEB1wBZbBJvAuKCANMHIW6z8vTWfQCSIG7y0IBvIjCBAQv4QW8kECNfA3FBM/QKb6GUAdcAMJJbbeKCANMHIW6zmAEgbvLQgMD/kjFw4vL0ERAREhEQDxERDw4REA5VHQPyERIRFBESERERExERERARFBEQDxETDw4RFA4NERMNDBEUDAsREwsKERQKCRETCQgRFAgHERMHBhEUBgUREwUEERQEAxETAwIRFAIBERMBERRWE9s82zwpgQEBVhVZ9A1voZIwbd8gbpIwbZ3Q9ASBAQHXAFlsEm8C4pyIfwDeIG7y0IBvIoEBCwERF3BxIW6VW1n0WTCYyAHPAEEz9EHigQEBERbIWQL0AIEBAc8AyRA6AhEVAgERFAEgbpUwWfRaMJRBM/QV4hEQERIREA8REQ8OERAOEN8QzhC9EKwQmxCKCRBoEFcQRhA1RDASA/75ASCC8DoSMt2ZofO05Yb/gnbnxTo15f1nGPd8X8XtgVhHrd0/uo6GMNs8f9sx4CCC8O+zR5Z2E25EJL1osBYpwm6YIUOgZFeUIeYSl8Fo53GRuo6GMNs8f9sx4ILwIo/Oko+sVEhgID3UcqsOBb5duYDEKWuN840Lar59ak+6gYKDAvRWElYSVhJWElYSVhJWElYSVhJWElYSVhJWElYSVhJWElYSVhJWEhESESUREhERESQREREQESMREA8RIg8OESEODREgDQwRHwwLER4LChEdCgkRHAkIERsIBxEaBwYRGQYFERgFBBEXBAMRFgMCERUCAREUARET2zxXEMqEAfCCAOPAKLPy9FYSVhJWElYSVhJWElYSVhJWElYSVhJWElYSVhJWElYSVhJWElYSERIRJRESERERJBERERARIxEQDxEiDw4RIQ4NESANDBEfDAsRHgsKER0KCREcCQgRGwgHERoHBhEZBgURGAUEERcEAxEWAwIRFQKFARCOhds8f9sx4IYCUl8PbDHbPIFaARERwgABEREB8vT4QW8kECNfA3CDBn9VIG1t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0FYSVhJWElYSVhJWElYSERIRJRESERERJBERERARIxEQDxEiDw4RIQ4NESANDBEfDAsRHgsKER0KCREcCQgRGwgHERoHBhEZBgURGAUEERcEAxEWAwIRFQIBERQBERPbPFcQXw9sMVYU0dIARILwB8+ZABPAtjytXqtP1eEWCMGmj0gwtwEPOdXS0hiMcu8C/iuBAQEjWfQNb6GSMG3fIG6SMG2d0PQEgQEB1wBZbBJvAuIgbuMAIG7y0IBvIoEBC1ADf3EhbpVbWfRZMJjIAc8AQTP0QeKBAQECyFkC9ACBAQHPAMkQPBIgbpUwWfRaMJRBM/QV4glWElYSVhJWElYSVhJWElYSVhJWElYSVhLV0wL8VhJWElYSVhJWElYSVhIREhElERIREREkEREREBEjERAPESIPDhEhDg0RIA0MER8MCxEeCwoRHQoJERwJCBEbCAcRGgcGERkGBREYBQQRFwQDERYDAhEVAgERFAERE9s8VxBfD2wxERMRFBETERIRExESEREREhERERAREREQ1tQB2g8REA9VDiuBAQEjWfQNb6GSMG3fIG6SMG2d0PQEgQEB1wBZbBJvAuIgbuMAIG7y0IBvIoEBC1ADf3EhbpVbWfRZMJjIAc8AQTP0QeKBAQECyFkC9ACBAQHPAMkQPBIgbpUwWfRaMJRBM/QV4gnVAuwwbYEBCyJ/cSFulVtZ9FkwmMgBzwBBM/RB4hESERUREhERERQREREQERMREA8RFQ8OERQODRETDQwRFQwLERQLChETCgkRFQkIERQIBxETBwYRFQYFERQFBBETBAMRFQMCERQCARETAREV2zwBERYBbwKBAQEh1tcAAnAAqCBukjBtjhIgbvLQgG8iyFkC9ACBAQHPAMniECtWFgEgbpUwWfRaMJRBM/QV4hESERUREhERERQREREQERMREA8REg8OEREODREQDRDPEL4QrQxVKA==");
    const __system = core_1.Cell.fromBase64("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ERIRLxESERERLhERERARLREQDxEsDw4RKw4NESoNDBEpDAsRKAsKEScKCREmCQgRJQgHESQHBhEjBgURIgUEESEEAxEgAwIRHwIBER4BER3bPFcQAR4AZAL4Xw9sMRETER0RExESERwREhERERsREREQERoREA8RGQ8OERgODREXDQwRFgwLERULChEUCgkRHQkIERwIBxEbBwYRGgYFERkFBBEYBAMRFwMCERYCAREVAds8ERIRHBESERERGxERERARGhEQDxEZDw4RGA4NERcNDBEWDADMAGUC0AsRFQsKERQKCRETCQgREggHEREHBhEQBhBfEE4QPUy6EIkQeBBnEDUQNBB4EGhJmYEBAQoQOBA3EDUQNMhVgNs8yQMREAMgbpUwWfRaMJRBM/QV4g1wgED4QW8kECNfA39BM21tbds8AGkAzgSujpUw0x8BghBquMBBuvLggdP/ATHbPH/gIIIQFxjZi7qPLDDTHwGCEBcY2Yu68uCB2zwH9ATUAdCBAQHXANP/gQEB1wAwEDsQNGwb2zx/4CCCEDi+lw+6AGcAcQBsAHAC9FYTVhNWE1YTVhNWE1YTVhNWE1YTVhNWE1YTVhNWE1YTVhNWE1YTERIRJhESERERJRERERARJBEQDxEjDw4RIg4NESENDBEgDAsRHwsKER4KCREdCQgRHAgHERsHBhEaBgURGQUEERgEAxEXAwIRFgIBERUBERTbPFcQAR4AaAP0Xw9sMRETERQRExESERQREhERERQREREQERQREA8RFA8OERQODREUDQwRFAwLERQLChEUCgkRFAkIERQIBxEUBwYRFAYFERQFBBEUBAMRFAMCERQCAREUAds8gQEBbSBukjBtjo0gbvLQgG8pyFWA2zzJ4hA/EgERFQEAzABpAGsB8shQCc8WyVAJzFAGINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WUAQg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxYSyweBAQHPAAHIgQEBzwBYINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WUAMAagC0IG6VMHABywGOHiDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFuLIWCBulTBwAcsBjh4g10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxbiyQHMyQHMAZIgbpUwWfRaMJRBM/QV4hERERIREREQEREREA8REA8Q7w0OELwQqxCaEIkQeBBnEFYQRRA0QTBwgED4QW8kECNfA39BM21tbds8AM4C9FYdVh1WHVYdVh1WHVYdVh1WHVYdVh1WHVYdVh1WHVYdVh1WHVYdERIRMBESERERLxERERARLhEQDxEtDw4RLA4NESsNDBEqDAsRKQsKESgKCREnCQgRJggHESUHBhEkBgURIwUEESIEAxEhAwIRIAIBER8BER7bPFcQARcAbQPUXw9sMRETER4RExESER0REhERERwREREQERsREA8RGg8OERkODREYDQwRFwwLERYLChEVCgkRFAkIER4IBxEdBwYRHAYFERsFBBEaBAMRGQMCERgCAREXAds8gU1QKLPy9PhD+ChWGds8XADMAHQAbgHWcFnIcAHLAXMBywFwAcsAEszMyfkAyHIBywFwAcsAEsoHy//J0CDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgKERgKCREXCQgRFggHESAHBhEfBgURHgUEER0EAxEcAwIRGwIBERoBERkAbwK4yFWgghAXGNmLUAzLHwcQahBZEEhKE1CY2zz0AALIgQEBzwDL/xKBAQHPAMkBzMkQP3BagEACARETARESfwZFVds8BxESBwYREQYFERAFEE8QPk0bUMpIl0VkUAMAdgDOBP6POTDTHwGCEDi+lw+68uCB0x8BghAXGNmLuvLggds8B/QE1AHQgQEB1wDT/4EBAdcAMBA7EDRsG9s8f+AgghBJ891+uo6YMNMfAYIQSfPdfrry4IHTP9P/WWwS2zx/4CCCENUydtu6jhQw0x8BghDVMnbbuvLggdM/ATEwf+AgAHEAcgCPAJIAftMfAYIQiWl6sLry4IHTP9M/+gCBAQHXANTU+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiBcWFRRDMAL0ERIRHRESERERHBERERARGxEQDxEaDw4RGQ4NERgNDBEXDAsRFgsKERUKCREUCQgREwgHER0HBhEcBgURGwUEERoEAxEZAwIRGAIBERcBERaBWt8RGNs8+EFvJBAjXwPHBQERGAHy9IIAxeJWFC+68vRWG9DT/zBWG9AAcwB1AZD4Q/goWNs8cFnIcAHLAXMBywFwAcsAEszMyfkAyHIBywFwAcsAEsoH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+gIhbrOVfwHKAMyUcDLKAOLJgEB/cFAEA21t2zwAzgGuMBESERQREhERERMREREQERQREA8REw8OERQODRETDQwRFAwLERMLChEUCgkREwkIERQIBxETBwYRFAYFERMFBBEUBAMREwMCERQCARETAREUVhZWFlYZAIkDpIEBAVYRAln0DW+hkjBt3yBukjBtjofQ2zxsGW8J4oIAv8whbrPy9CBu8tCAbykQeF8I+ChtcMjJ0BA1EEbIVVDbPMmCEATEtAB/cFAEA21t2zwAigCMAM4B5tQB0AH6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIAfpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgB0weBAQHXANQB0IEBAdcA+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiAEAiwDSINcLAcMAjh/6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIlHLXIW3iAdQw0CDXCwHDAI4f+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiJRy1yFt4jEQSRBIEEcQRhBFAMiCEIm3HQlQB8sfUAUg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxZQAyDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFoEBAc8AIW6zlX8BygDMlHAyygDiAfoCAc8WAZQEERMEAxEXAwIRFgIBERgBERXIVVDbPMnIgljAAAAAAAAAAAAAAAABActnzMlw+wAMERIMCxERCwoREAoQnxCOEH0QbFVVRQRAEwCOAFZQVsv/UAP6AszMyz8BINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WAvRWFFYUVhRWFFYUVhRWFFYUVhRWFFYUVhRWFFYUVhRWFFYUVhRWFBESEScREhERESYREREQESUREA8RJA8OESMODREiDQwRIQwLESALChEfCgkRHgkIER0IBxEcBwYRGwYFERoFBBEZBAMRGAMCERcCAREWAREV2zxXEAEeAJAC9l8PbDERExEVERMREhEUERIREREVEREREBEUERAPERUPDhEUDg0RFQ0MERQMCxEVCwoRFAoJERUJCBEUCAcRFQcGERQGBREVBQQRFAQDERUDAhEUAgERFQHbPIEBASAQShMCERUCAREWASFulVtZ9FowmMgBzwBBM/RC4gDMAJEBcBEQERIREA8REQ8OERAOEN8QzhC9EKwQmxCKEHkIEFcQRhA1RANwgED4QW8kECNfA39BM21tbds8AM4E2oIQM5DTaLqOmDDTHwGCEDOQ02i68uCBgQEB1wABMds8f+AgghC0uwq1uo6VMNMfAYIQtLsKtbry4IHUAdAx2zx/4CCCEGrfeIG6jpgw0x8BghBq33iBuvLggYEBAdcAATHbPH/gIIIQldb9oroAkwCVAJcAmQL0VhNWE1YTVhNWE1YTVhNWE1YTVhNWE1YTVhNWE1YTVhNWE1YTVhMREhEmERIRERElEREREBEkERAPESMPDhEiDg0RIQ0MESAMCxEfCwoRHgoJER0JCBEcCAcRGwcGERoGBREZBQQRGAQDERcDAhEWAgERFQERFNs8VxABHgCUAuZfD2wxERMRFBETERIRFBESERERFBERERARFBEQDxEUDw4RFA4NERQNDBEUDAsRFAsKERQKCREUCQgRFAgHERQHBhEUBgURFAUEERQEAxEUAwIRFAIBERQB2zwREhETERIRERESEREREBERERAPERAPVQ41AMwAtQL0VhNWE1YTVhNWE1YTVhNWE1YTVhNWE1YTVhNWE1YTVhNWE1YTVhMREhEmERIRERElEREREBEkERAPESMPDhEiDg0RIQ0MESAMCxEfCwoRHgoJER0JCBEcCAcRGwcGERoGBREZBQQRGAQDERcDAhEWAgERFQERFNs8VxABHgCWAv5fD2wxERMRFBETERIRFBESERERFBERERARFBEQDxEUDw4RFA4NERQNDBEUDAsRFAsKERQKCREUCQgRFAgHERQHBhEUBgURFAUEERQEAxEUAwIRFAIBERQB2zw2EREREhERERAREREQDxEQDxDvEN4QzRC8EKsQmhCJEHgQZ1UEAMwAtQL0VhNWE1YTVhNWE1YTVhNWE1YTVhNWE1YTVhNWE1YTVhNWE1YTVhMREhEmERIRERElEREREBEkERAPESMPDhEiDg0RIQ0MESAMCxEfCwoRHgoJER0JCBEcCAcRGwcGERoGBREZBQQRGAQDERcDAhEWAgERFQERFNs8VxABHgCYAuZfD2wxERMRFBETERIRFBESERERFBERERARFBEQDxEUDw4RFA4NERQNDBEUDAsRFAsKERQKCREUCQgRFAgHERQHBhEUBgURFAUEERQEAxEUAwIRFAIBERQB2zwREhETERIRERESEREREBERERAPERAPVQ42AMwAtQTgjrgw0x8BghCV1v2iuvLggYEBAdcA+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiBJsEts8f+AgghDDpb3iuo6YMNMfAYIQw6W94rry4IGBAQHXAAEx2zx/4CCCEHDvZRW64wIgghBs1X/QugCaAJ0AoACmAvRWFFYUVhRWFFYUVhRWFFYUVhRWFFYUVhRWFFYUVhRWFFYUVhRWFBESEScREhERESYREREQESUREA8RJA8OESMODREiDQwRIQwLESALChEfCgkRHgkIER0IBxEcBwYRGwYFERoFBBEZBAMRGAMCERcCAREWAREV2zxXEAEeAJsC+l8PbDERExEVERMREhEUERIREREVEREREBEUERAPERUPDhEUDg0RFQ0MERQMCxEVCwoRFAoJERUJCBEUCAcRFQcGERQGBREVBQQRFAQDERUDAhEUAgERFQHbPDGBAQECARETAREUIG6VMFn0WjCUQTP0FOIREaQgqgBzqQSkAMwAnAF0ERAREhEQDxERDw4REA4Q3xDOEL0QrBCbEIoQeRBoEFcQRhA1QQQDcIBA+EFvJBAjXwN/QTNtbW3bPADOAvRWE1YTVhNWE1YTVhNWE1YTVhNWE1YTVhNWE1YTVhNWE1YTVhNWExESESYREhERESUREREQESQREA8RIw8OESIODREhDQwRIAwLER8LChEeCgkRHQkIERwIBxEbBwYRGgYFERkFBBEYBAMRFwMCERYCAREVAREU2zxXEAEeAJ4C9F8PbDERExEUERMREhEUERIREREUEREREBEUERAPERQPDhEUDg0RFA0MERQMCxEUCwoRFAoJERQJCBEUCAcRFAcGERQGBREUBQQRFAQDERQDAhEUAgERFAHbPDESgQEBARETbSBulTBZ9FowlEEz9BTiAaUgqgBzqQSkAMwAnwFKEREREhERERAREREQDxEQD1UOcIBA+EFvJBAjXwN/QTNtbW3bPADOAWgw0x8BghBw72UVuvLggYEBAdcAgQEB1wCBAQHXANQB0PQEgQEB1wBZMhAlECRDAGwV2zx/AKEC9FYXVhdWF1YXVhdWF1YXVhdWF1YXVhdWF1YXVhdWF1YXVhdWF1YXERIRKhESERERKRERERARKBEQDxEnDw4RJg4NESUNDBEkDAsRIwsKESIKCREhCQgRIAgHER8HBhEeBgURHQUEERwEAxEbAwIRGgIBERkBERjbPFcQAR4AogL4Xw9sMRETERgRExESERcREhERERYREREQERUREA8RFA8OERgODREXDQwRFgwLERULChEUCgkRGAkIERcIBxEWBwYRFQYFERQFBBEYBAMRFwMCERYCAREVAds8ERIRFxESERERFhERERARFREQDxEUDw4REw4NERINDBERDADMAKMCOgsREAsQr1VJ2zxwgED4QW8kECNfA39BM21tbds8AKQAzgH0VhGBAQEmWfQNb6GSMG3fIG6SMG2X0PQEATFvAeIgbpQwbW8B3iBu8tCAbyEggQEBJln0DW+hkjBt3yBukjBtl9D0BAExbwHiIG6UMG1vAd4gbvLQgG8hA4EBAQPIWQL0AIEBAc8AyRQgbpUwWfRaMJRBM/QV4oEBAQEApQBkyAEB9ADJQTAgbpUwWfRaMJRBM/QV4oEBAQHIAQH0AMkQPxIgbpUwWfRaMJRBM/QV4gwE/o6/MNMfAYIQbNV/0Lry4IGBAQHXAIEBAdcAgQEB1wDUAdD0BIEBAdcAWQL0BIEBAdcAWTIQRxBGEEVDAGwX2zx/4CCCEAxYkIa6jqQw0x8BghAMWJCGuvLggYEBAdcAgQEB1wCBAQHXAFUgbBPbPH/gIIIQcL5jkLrjAiDAACIApwCsALAAtgL0VhlWGVYZVhlWGVYZVhlWGVYZVhlWGVYZVhlWGVYZVhlWGVYZVhkREhEsERIRERErEREREBEqERAPESkPDhEoDg0RJw0MESYMCxElCwoRJAoJESMJCBEiCAcRIQcGESAGBREfBQQRHgQDER0DAhEcAgERGwERGts8VxABHgCoAvhfD2wxERMRGhETERIRGRESERERGBERERARFxEQDxEWDw4RFQ4NERQNDBEaDAsRGQsKERgKCREXCQgRFggHERUHBhEUBgURGgUEERkEAxEYAwIRFwIBERYB2zwREhEZERIREREYEREREBEXERAPERYPDhEVDg0RFA0MERMMAMwAqQJOCxESCwoREQoJERAJEI8QflVm2zxwgED4QW8kECNfA39BM21tbds8AKoAzgHuVhKBAQEoWfQNb6GSMG3fIG6SMG2X0PQEATFvAeIgbpQw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ElYSVhJWEhESESUREhERESQREREQESMREA8RIg8OESEODREgDQwRHwwLER4LChEdCgkRHAkIERsIBxEaBwYRGQYFERgFBBEXBAMRFgMCERUCAREUARET2zxXEAEQAMYCUl8PbDHbPIFaARERwgABEREB8vT4QW8kECNfA3CDBn9VIG1tbds8cBEQAMwAzgHwggDjwCiz8vRWElYSVhJWElYSVhJWElYSVhJWElYSVhJWElYSVhJWElYSVhJWEhESESUREhERESQREREQESMREA8RIg8OESEODREgDQwRHwwLER4LChEdCgkRHAkIERsIBxEaBwYRGQYFERgFBBEXBAMRFgMCERUCAMgDSgERFAERE9s8VxBfD2wx2zx/OHCAQPhBbyQQI18Df0EzbW1t2zwBHgDMAM4BEI6F2zx/2zHgAMoB9oF0+Ciz8vRWElYSVhJWElYSVhJWElYSVhJWElYSVhJWElYSVhJWElYSVhJWEhESESUREhERESQREREQESMREA8RIg8OESEODREgDQwRHwwLER4LChEdCgkRHAkIERsIBxEaBwYRGQYFERgFBBEXBAMRFgMCERUCAREUAQDLA0IRE9s8VxBfD2wx2zxwOHCAQPhBbyQQI18Df0EzbW1t2zwBHgDMAM4C8oIAxO34QW8kECNfAxEUERURFBETERURExESERUREhERERUREREQERUREA8RFQ8OERUODREVDQwRFQwLERULChEVCgkRFQkIERUIBxEVBwYRFQYFERUFBBEVBAMRFQMCERUCAREV2zwBERQB8vQRERESEREREBERERAA1wDNAAwPERAPVQ4ByshxAcoBUAcBygBwAcoCUAUg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxZQA/oCcAHKaCNus5F/kyRus+KXMzMBcAHKAOMNIW6znH8BygABIG7y0IABzJUxcAHKAOLJAfsAAM8AmH8BygDIcAHKAHABygAkbrOdfwHKAAQgbvLQgFAEzJY0A3ABygDiJG6znX8BygAEIG7y0IBQBMyWNANwAcoA4nABygACfwHKAALJWMwB8gEREgERE4EBAc8AAREQAYEBAc8AHoEBAc8ADMiBAQHPABuBAQHPABn0ABf0ABX0AFADINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WAcj0ABL0ABLK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ElYSVhJWElYSVhJWElYSVhIBGwESAtxWElYSVhJWElYSVhJWEhESESUREhERESQREREQESMREA8RIg8OESEODREgDQwRHwwLER4LChEdCgkRHAkIERsIBxEaBwYRGQYFERgFBBEXBAMRFgMCERUCAREUARET2zxXEF8PbDH4QW8kECNfAwEcARMC/iuBAQEjWfQNb6GSMG3fIG6SMG2d0PQEgQEB1wBZbBJvAuIgbuMAIG7y0IBvIoEBC1ADf3EhbpVbWfRZMJjIAc8AQTP0QeKBAQECyFkC9ACBAQHPAMkQPBIgbpUwWfRaMJRBM/QV4glWElYSVhJWElYSVhJWElYSVhJWElYSVhIBGwEUAtxWElYSVhJWElYSVhJWEhESESUREhERESQREREQESMREA8RIg8OESEODREgDQwRHwwLER4LChEdCgkRHAkIERsIBxEaBwYRGQYFERgFBBEXBAMRFgMCERUCAREUARET2zxXEF8PbDH4QW8kECNfAwEXARUC/iuBAQEjWfQNb6GSMG3fIG6SMG2d0PQEgQEB1wBZbBJvAuIgbuMAIG7y0IBvIoEBC1ADf3EhbpVbWfRZMJjIAc8AQTP0QeKBAQECyFkC9ACBAQHPAMkQPBIgbpUwWfRaMJRBM/QV4glWElYSVhJWElYSVhJWElYSVhJWElYSVhIBGwEWAtBWElYSVhJWElYSVhJWEhESESUREhERESQREREQESMREA8RIg8OESEODREgDQwRHwwLER4LChEdCgkRHAkIERsIBxEaBwYRGQYFERgFBBEXBAMRFgMCERUCAREUARET2zxXEF8PbDFWFAEXARgARILwB8+ZABPAtjytXqtP1eEWCMGmj0gwtwEPOdXS0hiMcu8C/iuBAQEjWfQNb6GSMG3fIG6SMG2d0PQEgQEB1wBZbBJvAuIgbuMAIG7y0IBvIoEBC1ADf3EhbpVbWfRZMJjIAc8AQTP0QeKBAQECyFkC9ACBAQHPAMkQPBIgbpUwWfRaMJRBM/QV4glWElYSVhJWElYSVhJWElYSVhJWElYSVhIBGwEZAvxWElYSVhJWElYSVhJWEhESESUREhERESQREREQESMREA8RIg8OESEODREgDQwRHwwLER4LChEdCgkRHAkIERsIBxEaBwYRGQYFERgFBBEXBAMRFgMCERUCAREUARET2zxXEF8PbDERExEUERMREhETERIRERESEREREBERERABHAEaAdoPERAPVQ4rgQEBI1n0DW+hkjBt3yBukjBtndD0BIEBAdcAWWwSbwLiIG7jACBu8tCAbyKBAQtQA39xIW6VW1n0WTCYyAHPAEEz9EHigQEBAshZAvQAgQEBzwDJEDwSIG6VMFn0WjCUQTP0FeIJARsC7DBtgQELIn9xIW6VW1n0WTCYyAHPAEEz9EHiERIRFRESERERFBERERARExEQDxEVDw4RFA4NERMNDBEVDAsRFAsKERMKCREVCQgRFAgHERMHBhEVBgURFAUEERMEAxEVAwIRFAIBERMBERXbPAERFgFvAoEBASEBHAEdAAJwAKggbpIwbY4SIG7y0IBvIshZAvQAgQEBzwDJ4hArVhYBIG6VMFn0WjCUQTP0FeIREhEVERIREREUEREREBETERAPERIPDhERDg0REA0QzxC+EK0MVSgARILwopn9XmmCBbJLfuaj4iEnlryNt4150ZR7Xl8KfNTlKGLkc6JV");
    let builder = (0, core_1.beginCell)();
    builder.storeRef(__system);
    builder.storeUint(0, 1);
    initBridge_init_args({
        $$type: "Bridge_init_args",
        chain_nonce,
        native_coin,
        base_uri,
        transfer_fee,
        protocol_fee,
        bootstrap_validator_key,
        bootstrap_validator_address,
        ton_liquidity_pool,
    })(builder);
    const __data = builder.endCell();
    return { code: __code, data: __data };
}
const Bridge_errors = {
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
    2296: {
        message: `JettonWallet: Only Jetton master or Jetton wallet can call this function`,
    },
    2927: { message: `AccessControl: Role ID doesn't exist` },
    4129: { message: `Invalid native token id provided` },
    6936: {
        message: `Unsupported from_token for cross chain token strategy storage`,
    },
    7947: { message: `AccessControl: BadConfirmation` },
    9739: { message: `Sender is not a Jetton wallet` },
    11647: { message: `Unsupported incoming token strategy for from_chain_id` },
    13105: { message: `JettonWallet: Not enough jettons to transfer` },
    13199: { message: `Invalid token sent` },
    14558: { message: `Unsupported incoming token strategy for from_token` },
    17246: { message: `Insufficient funds Provided` },
    17773: { message: `JettonMaster: Mint can only be performed by owner` },
    19792: { message: `Contract is paused` },
    21733: { message: `AccessControl: Role doesn't exist` },
    22836: { message: `Target token does not have a liquidity pool configured` },
    23041: { message: `No fees to withdraw` },
    23263: { message: `Invalid Sender` },
    27831: { message: `Only owner can call this function` },
    27954: { message: `JettonMaster: Only Admin can set new owner.` },
    29133: {
        message: `JettonWallet: Not allow negative balance after internal transfer`,
    },
    29944: { message: `Pausable: Contract is already unpaused` },
    30061: { message: `JettonMaster: Jetton is not mintable` },
    31212: { message: `Unsupported incoming token strategy for from token` },
    33124: {
        message: `Unsupported to chain for cross chain token strategy storage`,
    },
    34665: { message: `Unsupported incoming token strategy for from chain id` },
    35462: { message: `JettonMaster: Only Admin can set new admin.` },
    37185: { message: `Not enough funds to transfer` },
    42526: {
        message: `Unsupported target_token for cross chain token strategy storage`,
    },
    43365: { message: `JettonMaster: Sender is not a Jetton owner` },
    44880: { message: `Transaction already processed.` },
    46934: { message: `Threshold not reached.` },
    47048: { message: `JettonWallet: Only owner can burn tokens` },
    49100: { message: `Invalid wrapped token id provided` },
    49236: { message: `Pool master is null for this _from_ token` },
    49646: { message: `Invalid Burn Notification Sender` },
    50245: { message: `Fees not configured for this chain` },
    50413: { message: `AccessControl: Doesnt have the role` },
    50658: { message: `Wrong chainId` },
    54023: { message: `AccessControl: Doesn't have role` },
    58304: { message: `Pausable: Contract is already paused` },
    59332: { message: `Target chainId cannot equal native or zero` },
    59662: {
        message: `Unsupported incoming token strategy for from_token -> target_token`,
    },
    60354: { message: `JettonWallet: Not enough balance to burn tokens` },
    60744: { message: `Incorrect Token Specified in arguments` },
    62556: { message: `Target token does not have ston.fi swapping configured` },
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
        name: "GrantRole",
        header: 174185305,
        fields: [
            {
                name: "to",
                type: { kind: "simple", type: "address", optional: false },
            },
            {
                name: "role_id",
                type: { kind: "simple", type: "int", optional: false, format: 257 },
            },
        ],
    },
    {
        name: "RevokeRole",
        header: 1363080030,
        fields: [
            {
                name: "to",
                type: { kind: "simple", type: "address", optional: false },
            },
            {
                name: "role_id",
                type: { kind: "simple", type: "int", optional: false, format: 257 },
            },
        ],
    },
    {
        name: "RenounceRole",
        header: 389201441,
        fields: [
            {
                name: "role_id",
                type: { kind: "simple", type: "int", optional: false, format: 257 },
            },
            {
                name: "address",
                type: { kind: "simple", type: "address", optional: false },
            },
        ],
    },
    {
        name: "UpdateRoleAdmin",
        header: 620382153,
        fields: [
            {
                name: "role_id",
                type: { kind: "simple", type: "int", optional: false, format: 257 },
            },
            {
                name: "role_admin",
                type: { kind: "simple", type: "int", optional: false, format: 257 },
            },
        ],
    },
    {
        name: "RoleData",
        header: null,
        fields: [
            { name: "roles", type: { kind: "dict", key: "address", value: "bool" } },
            {
                name: "admin_role",
                type: { kind: "simple", type: "int", optional: false, format: 257 },
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
        name: "TokenTransfer",
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
                name: "sender",
                type: { kind: "simple", type: "address", optional: false },
            },
            {
                name: "response_destination",
                type: { kind: "simple", type: "address", optional: true },
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
        name: "Installment",
        header: 2305391280,
        fields: [
            {
                name: "from_chain",
                type: { kind: "simple", type: "uint", optional: false, format: 64 },
            },
            {
                name: "target_chain",
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
                name: "nonce",
                type: { kind: "simple", type: "int", optional: false, format: 257 },
            },
            {
                name: "from_token",
                type: { kind: "simple", type: "cell", optional: false },
            },
            {
                name: "to_token",
                type: { kind: "simple", type: "cell", optional: false },
            },
            {
                name: "recepient",
                type: { kind: "simple", type: "address", optional: false },
            },
        ],
    },
    {
        name: "SignerAndSignature",
        header: null,
        fields: [
            {
                name: "signature",
                type: { kind: "simple", type: "slice", optional: false },
            },
            {
                name: "key",
                type: { kind: "simple", type: "uint", optional: false, format: 256 },
            },
        ],
    },
    {
        name: "ReceiveInstallment",
        header: 387504523,
        fields: [
            {
                name: "installment",
                type: { kind: "simple", type: "Installment", optional: false },
            },
            {
                name: "signatures",
                type: {
                    kind: "dict",
                    key: "int",
                    value: "SignerAndSignature",
                    valueFormat: "ref",
                },
            },
            {
                name: "len",
                type: { kind: "simple", type: "int", optional: false, format: 257 },
            },
            {
                name: "tx_hash",
                type: { kind: "simple", type: "uint", optional: false, format: 256 },
            },
            {
                name: "id",
                type: { kind: "simple", type: "int", optional: false, format: 257 },
            },
        ],
    },
    {
        name: "FreezeTon",
        header: 3943853515,
        fields: [
            {
                name: "target_chain",
                type: { kind: "simple", type: "uint", optional: false, format: 64 },
            },
            {
                name: "to_token",
                type: { kind: "simple", type: "cell", optional: false },
            },
            { name: "to", type: { kind: "simple", type: "cell", optional: false } },
            {
                name: "from_token",
                type: { kind: "simple", type: "cell", optional: false },
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
        ],
    },
    {
        name: "MapContract",
        header: 4200416724,
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
            {
                name: "fee",
                type: { kind: "simple", type: "int", optional: false, format: 257 },
            },
            {
                name: "fee_decimals",
                type: { kind: "simple", type: "int", optional: false, format: 257 },
            },
            {
                name: "swap_address",
                type: { kind: "simple", type: "address", optional: false },
            },
            {
                name: "token_bridge_wallet_address",
                type: { kind: "simple", type: "address", optional: false },
            },
            {
                name: "liquidity_pool_master_address",
                type: { kind: "simple", type: "address", optional: true },
            },
            {
                name: "ston_fi_target_token_wallet_for_ston_fi_router",
                type: { kind: "simple", type: "address", optional: false },
            },
        ],
    },
    {
        name: "SetChainFee",
        header: 1240718718,
        fields: [
            {
                name: "chain_id",
                type: { kind: "simple", type: "uint", optional: false, format: 64 },
            },
            {
                name: "fee",
                type: { kind: "simple", type: "uint", optional: false, format: 256 },
            },
        ],
    },
    {
        name: "OutgoingTransaction",
        header: 1673830231,
        fields: [
            {
                name: "id",
                type: { kind: "simple", type: "uint", optional: false, format: 256 },
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
                name: "from_token",
                type: { kind: "simple", type: "cell", optional: false },
            },
            {
                name: "to_token",
                type: { kind: "simple", type: "cell", optional: false },
            },
            { name: "to", type: { kind: "simple", type: "cell", optional: false } },
            {
                name: "target_chain_id",
                type: { kind: "simple", type: "uint", optional: false, format: 64 },
            },
        ],
    },
    {
        name: "IncomingTransaction",
        header: null,
        fields: [
            {
                name: "id",
                type: { kind: "simple", type: "uint", optional: false, format: 256 },
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
                name: "from_token",
                type: { kind: "simple", type: "cell", optional: false },
            },
            {
                name: "to_token",
                type: { kind: "simple", type: "cell", optional: false },
            },
            {
                name: "target_chain_id",
                type: { kind: "simple", type: "uint", optional: false, format: 64 },
            },
            {
                name: "to",
                type: { kind: "simple", type: "address", optional: false },
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
                type: { kind: "simple", type: "uint", optional: false, format: 64 },
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
                name: "symbol",
                type: { kind: "simple", type: "string", optional: false },
            },
            {
                name: "address",
                type: { kind: "simple", type: "address", optional: false },
            },
            {
                name: "swap_address",
                type: { kind: "simple", type: "address", optional: false },
            },
            {
                name: "decimals",
                type: { kind: "simple", type: "uint", optional: false, format: 8 },
            },
            {
                name: "fee",
                type: { kind: "simple", type: "int", optional: false, format: 257 },
            },
            {
                name: "fee_decimals",
                type: { kind: "simple", type: "int", optional: false, format: 257 },
            },
            {
                name: "token_bridge_wallet_address",
                type: { kind: "simple", type: "address", optional: false },
            },
            {
                name: "liquidity_pool_master_address",
                type: { kind: "simple", type: "address", optional: true },
            },
            {
                name: "ston_fi_target_token_wallet_for_ston_fi_router",
                type: { kind: "simple", type: "address", optional: true },
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
        name: "RemoveMappedContract",
        header: 1790492737,
        fields: [
            {
                name: "token_id",
                type: { kind: "simple", type: "uint", optional: false, format: 256 },
            },
        ],
    },
    {
        name: "ReleaseTokens",
        header: 2408663073,
        fields: [
            {
                name: "to",
                type: { kind: "simple", type: "address", optional: false },
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
            { name: "body", type: { kind: "simple", type: "cell", optional: true } },
        ],
    },
    {
        name: "UniqueReceiveInstallment",
        header: 952014607,
        fields: [
            {
                name: "ri",
                type: { kind: "simple", type: "ReceiveInstallment", optional: false },
            },
        ],
    },
    {
        name: "Strategies",
        header: null,
        fields: [
            {
                name: "strategies",
                type: { kind: "dict", key: "int", value: "Steps", valueFormat: "ref" },
            },
        ],
    },
    {
        name: "ToTokenCrossChainStrategy",
        header: null,
        fields: [
            {
                name: "to_token",
                type: {
                    kind: "dict",
                    key: "int",
                    value: "CrossChainStrategy",
                    valueFormat: "ref",
                },
            },
        ],
    },
    {
        name: "CrossChainTokenStrategy",
        header: null,
        fields: [
            {
                name: "from_token",
                type: {
                    kind: "dict",
                    key: "int",
                    value: "ToTokenCrossChainStrategy",
                    valueFormat: "ref",
                },
            },
        ],
    },
    {
        name: "FromTokenToTargetTokenToSteps",
        header: null,
        fields: [
            {
                name: "i",
                type: {
                    kind: "dict",
                    key: "int",
                    value: "TargetTokenToSteps",
                    valueFormat: "ref",
                },
            },
        ],
    },
    {
        name: "TargetTokenToSteps",
        header: null,
        fields: [
            {
                name: "i",
                type: { kind: "dict", key: "int", value: "Steps", valueFormat: "ref" },
            },
        ],
    },
    {
        name: "Steps",
        header: null,
        fields: [
            { name: "steps", type: { kind: "dict", key: "int", value: "int" } },
            {
                name: "size",
                type: { kind: "simple", type: "int", optional: false, format: 257 },
            },
        ],
    },
    {
        name: "CrossChainStrategy",
        header: null,
        fields: [
            {
                name: "local_steps",
                type: { kind: "simple", type: "Steps", optional: false },
            },
            {
                name: "foreign_steps",
                type: { kind: "simple", type: "Steps", optional: false },
            },
        ],
    },
    {
        name: "TargetTokenToCrossChainStrategy",
        header: null,
        fields: [
            {
                name: "i",
                type: {
                    kind: "dict",
                    key: "int",
                    value: "CrossChainStrategy",
                    valueFormat: "ref",
                },
            },
        ],
    },
    {
        name: "FromTokenToTargetTokenToCrossChainStrategy",
        header: null,
        fields: [
            {
                name: "i",
                type: {
                    kind: "dict",
                    key: "int",
                    value: "TargetTokenToCrossChainStrategy",
                    valueFormat: "ref",
                },
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
    {
        name: "AddValidator",
        header: 2513894818,
        fields: [
            {
                name: "key",
                type: { kind: "simple", type: "int", optional: false, format: 257 },
            },
            {
                name: "address",
                type: { kind: "simple", type: "address", optional: false },
            },
        ],
    },
    {
        name: "RemoveValidator",
        header: 3282419170,
        fields: [
            {
                name: "key",
                type: { kind: "simple", type: "int", optional: false, format: 257 },
            },
        ],
    },
    {
        name: "SetIncomingStrategy",
        header: 1894737173,
        fields: [
            {
                name: "from_chain",
                type: { kind: "simple", type: "int", optional: false, format: 257 },
            },
            {
                name: "from_token",
                type: { kind: "simple", type: "int", optional: false, format: 257 },
            },
            {
                name: "target_token",
                type: { kind: "simple", type: "int", optional: false, format: 257 },
            },
            {
                name: "steps",
                type: { kind: "simple", type: "Steps", optional: false },
            },
        ],
    },
    {
        name: "SetCrossChainStrategy",
        header: 1825931216,
        fields: [
            {
                name: "target_chain",
                type: { kind: "simple", type: "int", optional: false, format: 257 },
            },
            {
                name: "from_token",
                type: { kind: "simple", type: "int", optional: false, format: 257 },
            },
            {
                name: "target_token",
                type: { kind: "simple", type: "int", optional: false, format: 257 },
            },
            {
                name: "local_steps",
                type: { kind: "simple", type: "Steps", optional: false },
            },
            {
                name: "foreign_steps",
                type: { kind: "simple", type: "Steps", optional: false },
            },
        ],
    },
    {
        name: "RemoveInternalStrategy",
        header: 1891525520,
        fields: [
            {
                name: "from_chain",
                type: { kind: "simple", type: "int", optional: false, format: 257 },
            },
            {
                name: "from_token",
                type: { kind: "simple", type: "int", optional: false, format: 257 },
            },
            {
                name: "target_token",
                type: { kind: "simple", type: "int", optional: false, format: 257 },
            },
        ],
    },
    {
        name: "RemoveCrossChainStrategy",
        header: 207130758,
        fields: [
            {
                name: "target_chain",
                type: { kind: "simple", type: "int", optional: false, format: 257 },
            },
            {
                name: "from_token",
                type: { kind: "simple", type: "int", optional: false, format: 257 },
            },
            {
                name: "target_token",
                type: { kind: "simple", type: "int", optional: false, format: 257 },
            },
        ],
    },
];
const Bridge_getters = [
    {
        name: "manager_role_id",
        arguments: [],
        returnType: { kind: "simple", type: "int", optional: false, format: 257 },
    },
    {
        name: "signer_role_id",
        arguments: [],
        returnType: { kind: "simple", type: "int", optional: false, format: 257 },
    },
    {
        name: "cfo_role_id",
        arguments: [],
        returnType: { kind: "simple", type: "int", optional: false, format: 257 },
    },
    {
        name: "validators",
        arguments: [],
        returnType: { kind: "dict", key: "int", value: "address" },
    },
    {
        name: "validators_count",
        arguments: [],
        returnType: { kind: "simple", type: "int", optional: false, format: 257 },
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
        name: "tokens",
        arguments: [],
        returnType: {
            kind: "dict",
            key: "int",
            value: "Token",
            valueFormat: "ref",
        },
    },
    {
        name: "chain_fees",
        arguments: [],
        returnType: { kind: "dict", key: "int", value: "int" },
    },
    {
        name: "incoming_strategy",
        arguments: [],
        returnType: {
            kind: "dict",
            key: "int",
            value: "FromTokenToTargetTokenToSteps",
            valueFormat: "ref",
        },
    },
    {
        name: "cross_chain_strategy",
        arguments: [],
        returnType: {
            kind: "dict",
            key: "int",
            value: "FromTokenToTargetTokenToCrossChainStrategy",
            valueFormat: "ref",
        },
    },
    {
        name: "has_role",
        arguments: [
            {
                name: "address",
                type: { kind: "simple", type: "address", optional: false },
            },
            {
                name: "role_id",
                type: { kind: "simple", type: "int", optional: false, format: 257 },
            },
        ],
        returnType: { kind: "simple", type: "bool", optional: false },
    },
    {
        name: "role_admin",
        arguments: [
            {
                name: "role_id",
                type: { kind: "simple", type: "int", optional: false, format: 257 },
            },
        ],
        returnType: { kind: "simple", type: "int", optional: false, format: 257 },
    },
    {
        name: "admin_role_id",
        arguments: [],
        returnType: { kind: "simple", type: "int", optional: false, format: 257 },
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
    { receiver: "internal", message: { kind: "typed", type: "MapContract" } },
    {
        receiver: "internal",
        message: { kind: "typed", type: "RemoveMappedContract" },
    },
    { receiver: "internal", message: { kind: "text", text: "WithdrawFees" } },
    {
        receiver: "internal",
        message: { kind: "typed", type: "ReceiveInstallment" },
    },
    {
        receiver: "internal",
        message: { kind: "typed", type: "UniqueReceiveInstallment" },
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
    { receiver: "internal", message: { kind: "typed", type: "AddValidator" } },
    { receiver: "internal", message: { kind: "typed", type: "RemoveValidator" } },
    {
        receiver: "internal",
        message: { kind: "typed", type: "SetIncomingStrategy" },
    },
    {
        receiver: "internal",
        message: { kind: "typed", type: "SetCrossChainStrategy" },
    },
    {
        receiver: "internal",
        message: { kind: "typed", type: "RemoveCrossChainStrategy" },
    },
    {
        receiver: "internal",
        message: { kind: "typed", type: "RemoveInternalStrategy" },
    },
    { receiver: "internal", message: { kind: "empty" } },
    { receiver: "internal", message: { kind: "text", text: "Pause" } },
    { receiver: "internal", message: { kind: "text", text: "Unpause" } },
    { receiver: "internal", message: { kind: "typed", type: "Deploy" } },
    { receiver: "internal", message: { kind: "typed", type: "GrantRole" } },
    { receiver: "internal", message: { kind: "typed", type: "RevokeRole" } },
    { receiver: "internal", message: { kind: "typed", type: "RenounceRole" } },
    { receiver: "internal", message: { kind: "typed", type: "UpdateRoleAdmin" } },
];
class Bridge {
    static async init(chain_nonce, native_coin, base_uri, transfer_fee, protocol_fee, bootstrap_validator_key, bootstrap_validator_address, ton_liquidity_pool) {
        return await Bridge_init(chain_nonce, native_coin, base_uri, transfer_fee, protocol_fee, bootstrap_validator_key, bootstrap_validator_address, ton_liquidity_pool);
    }
    static async fromInit(chain_nonce, native_coin, base_uri, transfer_fee, protocol_fee, bootstrap_validator_key, bootstrap_validator_address, ton_liquidity_pool) {
        const init = await Bridge_init(chain_nonce, native_coin, base_uri, transfer_fee, protocol_fee, bootstrap_validator_key, bootstrap_validator_address, ton_liquidity_pool);
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
            message.$$type === "MapContract") {
            body = (0, core_1.beginCell)().store(storeMapContract(message)).endCell();
        }
        if (message &&
            typeof message === "object" &&
            !(message instanceof core_1.Slice) &&
            message.$$type === "RemoveMappedContract") {
            body = (0, core_1.beginCell)().store(storeRemoveMappedContract(message)).endCell();
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
            message.$$type === "UniqueReceiveInstallment") {
            body = (0, core_1.beginCell)()
                .store(storeUniqueReceiveInstallment(message))
                .endCell();
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
        if (message &&
            typeof message === "object" &&
            !(message instanceof core_1.Slice) &&
            message.$$type === "AddValidator") {
            body = (0, core_1.beginCell)().store(storeAddValidator(message)).endCell();
        }
        if (message &&
            typeof message === "object" &&
            !(message instanceof core_1.Slice) &&
            message.$$type === "RemoveValidator") {
            body = (0, core_1.beginCell)().store(storeRemoveValidator(message)).endCell();
        }
        if (message &&
            typeof message === "object" &&
            !(message instanceof core_1.Slice) &&
            message.$$type === "SetIncomingStrategy") {
            body = (0, core_1.beginCell)().store(storeSetIncomingStrategy(message)).endCell();
        }
        if (message &&
            typeof message === "object" &&
            !(message instanceof core_1.Slice) &&
            message.$$type === "SetCrossChainStrategy") {
            body = (0, core_1.beginCell)().store(storeSetCrossChainStrategy(message)).endCell();
        }
        if (message &&
            typeof message === "object" &&
            !(message instanceof core_1.Slice) &&
            message.$$type === "RemoveCrossChainStrategy") {
            body = (0, core_1.beginCell)()
                .store(storeRemoveCrossChainStrategy(message))
                .endCell();
        }
        if (message &&
            typeof message === "object" &&
            !(message instanceof core_1.Slice) &&
            message.$$type === "RemoveInternalStrategy") {
            body = (0, core_1.beginCell)().store(storeRemoveInternalStrategy(message)).endCell();
        }
        if (message === null) {
            body = new core_1.Cell();
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
            message.$$type === "Deploy") {
            body = (0, core_1.beginCell)().store(storeDeploy(message)).endCell();
        }
        if (message &&
            typeof message === "object" &&
            !(message instanceof core_1.Slice) &&
            message.$$type === "GrantRole") {
            body = (0, core_1.beginCell)().store(storeGrantRole(message)).endCell();
        }
        if (message &&
            typeof message === "object" &&
            !(message instanceof core_1.Slice) &&
            message.$$type === "RevokeRole") {
            body = (0, core_1.beginCell)().store(storeRevokeRole(message)).endCell();
        }
        if (message &&
            typeof message === "object" &&
            !(message instanceof core_1.Slice) &&
            message.$$type === "RenounceRole") {
            body = (0, core_1.beginCell)().store(storeRenounceRole(message)).endCell();
        }
        if (message &&
            typeof message === "object" &&
            !(message instanceof core_1.Slice) &&
            message.$$type === "UpdateRoleAdmin") {
            body = (0, core_1.beginCell)().store(storeUpdateRoleAdmin(message)).endCell();
        }
        if (body === null) {
            throw new Error("Invalid message type");
        }
        await provider.internal(via, { ...args, body: body });
    }
    async getManagerRoleId(provider) {
        let builder = new core_1.TupleBuilder();
        let source = (await provider.get("manager_role_id", builder.build())).stack;
        let result = source.readBigNumber();
        return result;
    }
    async getSignerRoleId(provider) {
        let builder = new core_1.TupleBuilder();
        let source = (await provider.get("signer_role_id", builder.build())).stack;
        let result = source.readBigNumber();
        return result;
    }
    async getCfoRoleId(provider) {
        let builder = new core_1.TupleBuilder();
        let source = (await provider.get("cfo_role_id", builder.build())).stack;
        let result = source.readBigNumber();
        return result;
    }
    async getValidators(provider) {
        let builder = new core_1.TupleBuilder();
        let source = (await provider.get("validators", builder.build())).stack;
        let result = core_1.Dictionary.loadDirect(core_1.Dictionary.Keys.BigInt(257), core_1.Dictionary.Values.Address(), source.readCellOpt());
        return result;
    }
    async getValidatorsCount(provider) {
        let builder = new core_1.TupleBuilder();
        let source = (await provider.get("validators_count", builder.build()))
            .stack;
        let result = source.readBigNumber();
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
    async getTokens(provider) {
        let builder = new core_1.TupleBuilder();
        let source = (await provider.get("tokens", builder.build())).stack;
        let result = core_1.Dictionary.loadDirect(core_1.Dictionary.Keys.BigInt(257), dictValueParserToken(), source.readCellOpt());
        return result;
    }
    async getChainFees(provider) {
        let builder = new core_1.TupleBuilder();
        let source = (await provider.get("chain_fees", builder.build())).stack;
        let result = core_1.Dictionary.loadDirect(core_1.Dictionary.Keys.BigInt(257), core_1.Dictionary.Values.BigInt(257), source.readCellOpt());
        return result;
    }
    async getIncomingStrategy(provider) {
        let builder = new core_1.TupleBuilder();
        let source = (await provider.get("incoming_strategy", builder.build()))
            .stack;
        let result = core_1.Dictionary.loadDirect(core_1.Dictionary.Keys.BigInt(257), dictValueParserFromTokenToTargetTokenToSteps(), source.readCellOpt());
        return result;
    }
    async getCrossChainStrategy(provider) {
        let builder = new core_1.TupleBuilder();
        let source = (await provider.get("cross_chain_strategy", builder.build()))
            .stack;
        let result = core_1.Dictionary.loadDirect(core_1.Dictionary.Keys.BigInt(257), dictValueParserFromTokenToTargetTokenToCrossChainStrategy(), source.readCellOpt());
        return result;
    }
    async getHasRole(provider, address, role_id) {
        let builder = new core_1.TupleBuilder();
        builder.writeAddress(address);
        builder.writeNumber(role_id);
        let source = (await provider.get("has_role", builder.build())).stack;
        let result = source.readBoolean();
        return result;
    }
    async getRoleAdmin(provider, role_id) {
        let builder = new core_1.TupleBuilder();
        builder.writeNumber(role_id);
        let source = (await provider.get("role_admin", builder.build())).stack;
        let result = source.readBigNumber();
        return result;
    }
    async getAdminRoleId(provider) {
        let builder = new core_1.TupleBuilder();
        let source = (await provider.get("admin_role_id", builder.build())).stack;
        let result = source.readBigNumber();
        return result;
    }
}
exports.Bridge = Bridge;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvY29udHJhY3RzL3Rvbi9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUE2QkEsd0NBTUM7QUFFRCxzQ0FLQztBQWtDRCxvQ0FRQztBQUVELGtDQWFDO0FBK0NELGtEQXVCQztBQUVELGdEQW1CQztBQWtERCxrQ0FNQztBQUVELGdDQU9DO0FBNkJELHNDQU1DO0FBRUQsb0NBT0M7QUE4QkQsZ0RBT0M7QUFFRCw4Q0FZQztBQXlDRCxrREFnQkM7QUFFRCxnREFzQkM7QUFxREQsMEVBV0M7QUFFRCx3RUFnQkM7QUFrREQsMENBZUM7QUFFRCx3Q0FvQkM7QUErQ0Qsa0RBTUM7QUFFRCxnREFPQztBQWtDRCxrRUFXQztBQUVELGdFQW9CQztBQXNERCxrRUFXQztBQUVELGdFQW9CQztBQW9ERCwwQ0FRQztBQUVELHdDQWFDO0FBNkNELDBDQVNDO0FBRUQsd0NBZUM7QUFpREQsMENBZUM7QUFFRCx3Q0FvQkM7QUErQ0QsNENBTUM7QUFFRCwwQ0FPQztBQTZCRCw0Q0FNQztBQUVELDBDQU9DO0FBOEJELHdDQU9DO0FBRUQsc0NBUUM7QUFnQ0QsMENBT0M7QUFFRCx3Q0FRQztBQWdDRCw4Q0FPQztBQUVELDRDQVlDO0FBb0NELG9EQU9DO0FBRUQsa0RBWUM7QUFvQ0Qsc0NBVUM7QUFFRCxvQ0FhQztBQW1ERCx3Q0FPQztBQUVELHNDQVdDO0FBNENELGdEQWdCQztBQUVELDhDQXNCQztBQXdERCw0Q0FZQztBQUVELDBDQXNCQztBQW1ERCwwREFNQztBQUVELHdEQVNDO0FBeUNELDBEQWdCQztBQUVELHdEQXVCQztBQWdFRCx3Q0FVQztBQUVELHNDQWtCQztBQXFERCw0Q0FtQkM7QUFFRCwwQ0ErQkM7QUE2REQsNENBT0M7QUFFRCwwQ0FRQztBQW9DRCw0REFXQztBQUVELDBEQW9CQztBQXNERCw0REFVQztBQUVELDBEQWlCQztBQW9ERCxrREFRQztBQUVELGdEQWFD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