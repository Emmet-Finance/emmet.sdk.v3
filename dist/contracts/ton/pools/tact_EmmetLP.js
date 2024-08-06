"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadPosition = exports.storePosition = exports.loadPoolPayload = exports.storePoolPayload = exports.loadSetWalletAddress = exports.storeSetWalletAddress = exports.loadReleaseTokens = exports.storeReleaseTokens = exports.loadWithdraw = exports.storeWithdraw = exports.loadRoleData = exports.storeRoleData = exports.loadUpdateRoleAdmin = exports.storeUpdateRoleAdmin = exports.loadRenounceRole = exports.storeRenounceRole = exports.loadRevokeRole = exports.storeRevokeRole = exports.loadGrantRole = exports.storeGrantRole = exports.loadWalletData = exports.storeWalletData = exports.loadJettonBurnNotification = exports.storeJettonBurnNotification = exports.loadJettonInternalTransfer = exports.storeJettonInternalTransfer = exports.loadJettonExcesses = exports.storeJettonExcesses = exports.loadJettonBurn = exports.storeJettonBurn = exports.loadJettonTransferNotification = exports.storeJettonTransferNotification = exports.loadJettonTransfer = exports.storeJettonTransfer = exports.loadJettonMint = exports.storeJettonMint = exports.loadJettonData = exports.storeJettonData = exports.loadFactoryDeploy = exports.storeFactoryDeploy = exports.loadDeployOk = exports.storeDeployOk = exports.loadDeploy = exports.storeDeploy = exports.loadSendParameters = exports.storeSendParameters = exports.loadContext = exports.storeContext = exports.loadStateInit = exports.storeStateInit = void 0;
exports.EmmetLP = exports.loadRewardsPaid = exports.storeRewardsPaid = exports.loadWithdrawn = exports.storeWithdrawn = exports.loadLPTransfer = exports.storeLPTransfer = exports.loadStaked = exports.storeStaked = exports.loadInternalWithdrawFee = exports.storeInternalWithdrawFee = exports.loadUpdateDeposit = exports.storeUpdateDeposit = exports.loadTokenTransfer = exports.storeTokenTransfer = exports.loadRewardSplit = exports.storeRewardSplit = void 0;
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
        serialize: (src, builder) => {
            builder.storeRef((0, core_1.beginCell)().store(storeFactoryDeploy(src)).endCell());
        },
        parse: (src) => {
            return loadFactoryDeploy(src.loadRef().beginParse());
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
        serialize: (src, builder) => {
            builder.storeRef((0, core_1.beginCell)().store(storeJettonMint(src)).endCell());
        },
        parse: (src) => {
            return loadJettonMint(src.loadRef().beginParse());
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
        serialize: (src, builder) => {
            builder.storeRef((0, core_1.beginCell)().store(storeWalletData(src)).endCell());
        },
        parse: (src) => {
            return loadWalletData(src.loadRef().beginParse());
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
exports.storeGrantRole = storeGrantRole;
function loadGrantRole(slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 174185305) {
        throw Error("Invalid prefix");
    }
    let _to = sc_0.loadAddress();
    let _role_id = sc_0.loadIntBig(257);
    return { $$type: "GrantRole", to: _to, role_id: _role_id };
}
exports.loadGrantRole = loadGrantRole;
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
exports.storeRevokeRole = storeRevokeRole;
function loadRevokeRole(slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1363080030) {
        throw Error("Invalid prefix");
    }
    let _to = sc_0.loadAddress();
    let _role_id = sc_0.loadIntBig(257);
    return { $$type: "RevokeRole", to: _to, role_id: _role_id };
}
exports.loadRevokeRole = loadRevokeRole;
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
exports.storeRenounceRole = storeRenounceRole;
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
exports.loadRenounceRole = loadRenounceRole;
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
exports.storeUpdateRoleAdmin = storeUpdateRoleAdmin;
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
exports.loadUpdateRoleAdmin = loadUpdateRoleAdmin;
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
exports.storeRoleData = storeRoleData;
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
exports.loadRoleData = loadRoleData;
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
        throw Error("Invalid prefix");
    }
    let _rewards = sc_0.loadIntBig(257);
    let _address = sc_0.loadAddress();
    return { $$type: "Withdraw", rewards: _rewards, address: _address };
}
exports.loadWithdraw = loadWithdraw;
function loadTupleWithdraw(source) {
    let _rewards = source.readBigNumber();
    let _address = source.readAddress();
    return { $$type: "Withdraw", rewards: _rewards, address: _address };
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
        },
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
        throw Error("Invalid prefix");
    }
    let _to = sc_0.loadAddress();
    let _amount = sc_0.loadIntBig(257);
    return { $$type: "ReleaseTokens", to: _to, amount: _amount };
}
exports.loadReleaseTokens = loadReleaseTokens;
function loadTupleReleaseTokens(source) {
    let _to = source.readAddress();
    let _amount = source.readBigNumber();
    return { $$type: "ReleaseTokens", to: _to, amount: _amount };
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
        },
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
        throw Error("Invalid prefix");
    }
    let _token_wallet = sc_0.loadAddress();
    return { $$type: "SetWalletAddress", token_wallet: _token_wallet };
}
exports.loadSetWalletAddress = loadSetWalletAddress;
function loadTupleSetWalletAddress(source) {
    let _token_wallet = source.readAddress();
    return { $$type: "SetWalletAddress", token_wallet: _token_wallet };
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
        },
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
    return { $$type: "PoolPayload", mode: _mode };
}
exports.loadPoolPayload = loadPoolPayload;
function loadTuplePoolPayload(source) {
    let _mode = source.readBigNumber();
    return { $$type: "PoolPayload", mode: _mode };
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
        },
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
    return {
        $$type: "Position",
        lastInternalFeeGrowth: _lastInternalFeeGrowth,
        rewards: _rewards,
    };
}
exports.loadPosition = loadPosition;
function loadTuplePosition(source) {
    let _lastInternalFeeGrowth = source.readBigNumber();
    let _rewards = source.readBigNumber();
    return {
        $$type: "Position",
        lastInternalFeeGrowth: _lastInternalFeeGrowth,
        rewards: _rewards,
    };
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
        },
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
    return {
        $$type: "RewardSplit",
        protocolFeeShare: _protocolFeeShare,
        lpProvidersShare: _lpProvidersShare,
    };
}
exports.loadRewardSplit = loadRewardSplit;
function loadTupleRewardSplit(source) {
    let _protocolFeeShare = source.readBigNumber();
    let _lpProvidersShare = source.readBigNumber();
    return {
        $$type: "RewardSplit",
        protocolFeeShare: _protocolFeeShare,
        lpProvidersShare: _lpProvidersShare,
    };
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
exports.storeTokenTransfer = storeTokenTransfer;
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
exports.loadTokenTransfer = loadTokenTransfer;
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
        throw Error("Invalid prefix");
    }
    let _feeGrowthGlobal = sc_0.loadIntBig(257);
    return {
        $$type: "UpdateDeposit",
        feeGrowthGlobal: _feeGrowthGlobal,
    };
}
exports.loadUpdateDeposit = loadUpdateDeposit;
function loadTupleUpdateDeposit(source) {
    let _feeGrowthGlobal = source.readBigNumber();
    return {
        $$type: "UpdateDeposit",
        feeGrowthGlobal: _feeGrowthGlobal,
    };
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
        },
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
        throw Error("Invalid prefix");
    }
    let _lastFeeGrowth = sc_0.loadIntBig(257);
    let _owner = sc_0.loadAddress();
    let _balance = sc_0.loadIntBig(257);
    return {
        $$type: "InternalWithdrawFee",
        lastFeeGrowth: _lastFeeGrowth,
        owner: _owner,
        balance: _balance,
    };
}
exports.loadInternalWithdrawFee = loadInternalWithdrawFee;
function loadTupleInternalWithdrawFee(source) {
    let _lastFeeGrowth = source.readBigNumber();
    let _owner = source.readAddress();
    let _balance = source.readBigNumber();
    return {
        $$type: "InternalWithdrawFee",
        lastFeeGrowth: _lastFeeGrowth,
        owner: _owner,
        balance: _balance,
    };
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
        },
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
        throw Error("Invalid prefix");
    }
    let _amount = sc_0.loadIntBig(257);
    let _staker = sc_0.loadAddress();
    return { $$type: "Staked", amount: _amount, staker: _staker };
}
exports.loadStaked = loadStaked;
function loadTupleStaked(source) {
    let _amount = source.readBigNumber();
    let _staker = source.readAddress();
    return { $$type: "Staked", amount: _amount, staker: _staker };
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
        },
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
        throw Error("Invalid prefix");
    }
    let _amount = sc_0.loadIntBig(257);
    let _to = sc_0.loadAddress();
    return { $$type: "LPTransfer", amount: _amount, to: _to };
}
exports.loadLPTransfer = loadLPTransfer;
function loadTupleLPTransfer(source) {
    let _amount = source.readBigNumber();
    let _to = source.readAddress();
    return { $$type: "LPTransfer", amount: _amount, to: _to };
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
        },
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
        throw Error("Invalid prefix");
    }
    let _user = sc_0.loadAddress();
    let _amount = sc_0.loadIntBig(257);
    return { $$type: "Withdrawn", user: _user, amount: _amount };
}
exports.loadWithdrawn = loadWithdrawn;
function loadTupleWithdrawn(source) {
    let _user = source.readAddress();
    let _amount = source.readBigNumber();
    return { $$type: "Withdrawn", user: _user, amount: _amount };
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
        },
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
        throw Error("Invalid prefix");
    }
    let _user = sc_0.loadAddress();
    let _amount = sc_0.loadIntBig(257);
    return { $$type: "RewardsPaid", user: _user, amount: _amount };
}
exports.loadRewardsPaid = loadRewardsPaid;
function loadTupleRewardsPaid(source) {
    let _user = source.readAddress();
    let _amount = source.readBigNumber();
    return { $$type: "RewardsPaid", user: _user, amount: _amount };
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
        },
    };
}
function initEmmetLP_init_args(src) {
    return (builder) => {
        let b_0 = builder;
        b_0.storeAddress(src.admin);
        b_0.storeAddress(src.owner);
        b_0.storeAddress(src.bridge);
        let b_1 = new core_1.Builder();
        b_1.storeAddress(src.stake_token);
        b_1.storeInt(src.decimals, 257);
        b_1.storeInt(src.protocolFee, 257);
        let b_2 = new core_1.Builder();
        b_2.storeInt(src.tokenFee, 257);
        b_2.storeRef(src.jetton_content);
        b_1.storeRef(b_2.endCell());
        b_0.storeRef(b_1.endCell());
    };
}
async function EmmetLP_init(admin, owner, bridge, stake_token, decimals, protocolFee, tokenFee, jetton_content) {
    const __code = core_1.Cell.fromBase64("te6ccgECeQEAHigAART/APSkE/S88sgLAQIBYgIDA8LQAdDTAwFxsKMB+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiFRQUwNvBPhhAvhi2zwREBESERAPEREPDhEQDhDfVRzbPPLggsj4QwHMfwHKABERERBV4Ns8ye1Uag4PAgEgBAUCASBERQIBIAYHAgEgCAkCASBiYwIBWAoLAgEgXl8CAWZXWAIVrxbtnm2eNnq2EsBqDAL2VhBWEFYQVhBWEFYQVhBWEFYQVhBWEFYQVhBWEFYQVhBWEFYhViFWIVYh+CgREREmEREREBElERAPESQPDhEjDg0RIg0MESEMCxEgCwoRHwoJER4JCBEdCAcRHAcGERsGBREaBQQRGQQDERgDAhEXAgERFgH4Q/goEts8XQ0AclcRVxFfDzAQSBA3RlAIERUIBxEUBwYREwYFERIFCBERCAcREAcQbxBeEI0QfBBrEFoQiRB4EGcQVgH2AZIwf+BwIddJwh+VMCDXCx/eIIIQNhYgZ7qOXjDTHwGCEDYWIGe68uCB+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiDGCAIHcjQhgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEUArHBRny9H/gEAH0AREQARERgQEBzwAeygBQDCDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFhrMUAgg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxYGyIEBAc8AUAUg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxYT9AAeBP4gghBzYtCcuo9nMNMfAYIQc2LQnLry4IHTP/oA+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiFQTAxAjbBQzggCk7vhBbyQQI18DLMcF8vQCyAHPFsnQgQEB1wABAdHAAY6DMds8joMB2zzif+AgghAbMXqWuuMCIMAAERITFAAGF6AGAvKBWvD4QW8kE18DJoIK+vCAoL7y9FHRoPhBbyT4KG1wyMnQVhVROkEzERoRHBEaERkRGxEZERgRHBEYERcRGxEXERYRHBEWChEVChEUERwRFAoREwoREhEcERIKEREKERARHBEQEK8OERwOEK0MERwMEKsKERwK2zwmMhUBcjDTHwGCEBsxepa68uCB+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiAGBAQHXAFlsEts8fxcD/CLXScEhsJJbf+AgghDVMnbbuo4UMNMfAYIQ1TJ227ry4IHTPwExMH/gIIIQkYzEHLqOvzDTHwGCEJGMxBy68uCBgQEB1wD6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIAYEBAdcAVSBsE9s8f+AgghCUapi2uuMCIB8gIQPeyAGCEKPa7EdYyx+BAQHPAMmCCTEtAPhD+ChWFQHbPHBZyHABywFzAcsBcAHLABLMzMn5AMhyAcsBcAHLABLKB8v/ydAg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIf1AjcAFtbds8ARESARERXTUWAKLIWYIQNwiV51ADyx+BAQHPAAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxbJyIJYwAAAAAAAAAAAAAAAAQHLZ8zJcPsADhEQDhDfVRwC8lYSVhJWElYSVhJWElYSVhJWElYSVhJWElYSVhJWElYSVhIREBEjERAPESIPDhEhDg0RIA0MER8MCxEeCwoRHQoJERwJCBEbCAcRGgcGERkGBREYBQQRFwQDERYDAhEVAgERFAERE9s8VxBfDzERERETERFePw4REg50GAFoDRETDQwREgwLERMLChESCgkREwkIERIIBxETBwYREgYFERMFBBESBAMREwMCERICARETARkD/IIAxO34QW8kECNfAxESERMREhERERMREREQERMREA8REw8OERMODRETDQwREwwLERMLChETCgkREwkIERMIBxETBwYREwYFERMFBBETBAMREwMCERMCARET2zwBERIB8vQPERAPVQ5WEts8UXGgUnKhGKABERMBBqFtcMjJ0EYaGwA2I8IAllMDqCOpBJFw4iLCAJZREqgjqQSSMXDiA/5TEwRWFgRWF0FEA1VQyFVg2zzJUoBwgEB/BANtbds8ARERyFmCEPW3HpRQA8sfgQEBzwABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WyciCWMAAAAAAAAAAAAAAAAEBy2fMyXD7AA4REA4Q3xDOEL0QrBCbEIoQeRBoHDUdAN6CEA+KfqVQCMsfFss/UAT6Algg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxYB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VhDy9BEQERoREA8RGQ8xAVgOERgODREXDQwRFgwLERULChEUCgkREwkIERIIBxERBwYREAYQXxBOVZPbPDICvDI1NTU1ERERFRERERARFBEQDxETDw4REg4NERUNDBEUDAsREwsKERIKCREVCQgRFAgHERMHBhESBgURFQUEERQEAxETAwIREgIBERUBERT4Q/goEts8ERJWFKAhVhNdMwP+cFnIcAHLAXMBywFwAcsAEszMyfkAyHIBywFwAcsAEsoHy//J0CDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4Ihwf4BAIvgoFQQRGgQDERsDAgERHAERGRAjyFVQ2zzJBhEXBgURFQUEERYEAxEUA1kRExBGEEXbPAwREAwQvzQ1NgCqghAXjUUZUAfLHxXLP1AD+gIBINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFgH6AgHPFgHKyHEBygFQBwHKAHABygJQBSDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFlAD+gJwAcpoI26zkX+TJG6z4pczMwFwAcoA4w0hbrOcfwHKAAEgbvLQgAHMlTFwAcoA4skB+wA3ACoQrhCdEIwQexBqEFkQSBA3RhRQMwUAmH8BygDIcAHKAHABygAkbrOdfwHKAAQgbvLQgFAEzJY0A3ABygDiJG6znX8BygAEIG7y0IBQBMyWNANwAcoA4nABygACfwHKAALJWMwCqhEQERIREF4+DRERDQwREgwLERELChESCgkREQkIERIIBxERBwYREgYFEREFBBESBAMREQMCERICARERARES2zwREBESERAPEREPDhEQDhDfVRzbPH8+OwKqERAREhEQXj4NERENDBESDAsREQsKERIKCRERCQgREggHEREHBhESBgUREQUEERIEAxERAwIREgIBEREBERLbPBEQERIREA8REQ8OERAOEN9VHNs8fz5AArqCEBcyviG6jsgw0x8BghAXMr4huvLggYEBAdcA+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiBJsEoEfC/hBbyQQI18DIscF8vTbPH/gghAk+kfJuuMCMHBAQQKEERAREhEQXj4NERENDBESDAsREQsKERIKCRERCQgREggHEREHBhESBgUREQUEERIEAxERAwIREgIBEREBERJWEds8SzwC7IIAxO34QW8kECNfAxESERMREhERERMREREQERMREA8REw8OERMODRETDQwREwwLERMLChETCgkREwkIERMIBxETBwYREwYFERMFBBETBAMREwMCERMCARET2zwBERIB8vQPERAPVQ4pgQEBVhNZ9A1voZIwbd9GPQDyIG6SMG2d0PQEgQEB1wBZbBJvAuIgbvLQgG8igQELAREVf3EhbpVbWfRZMJjIAc8AQTP0QeKBAQERFMhZAvQAgQEBzwDJEDoCERMCARESASBulTBZ9FowlEEz9BXiDhEQDhDfEM4QvRCsEJsQigkQaBBXEEYQNUQwEgLyKQ8REQ9ePQwREAwLERELChEQCgkREQkIERAIBxERBwYREAYFEREFBBEQBAMREQMCERACARERAREQgQEBERLbPAIREgIBERMBWfQNb6GSMG3fIG6SMG2d0PQEgQEB1wBZbBJvAuKCANMHIW6z8vQgbvLQgG8iMIEBC3c/AGj4QW8kECNfA3FBM/QKb6GUAdcAMJJbbeKCANMHIW6zmAEgbvLQgMD/kjFw4vL0DhEQDlUdAoQREBESERBePg0REQ0MERIMCxERCwoREgoJEREJCBESCAcREQcGERIGBRERBQQREgQDEREDAhESAgEREQERElYR2zxLQgDc0x8BghAk+kfJuvLggYEBAdcAgQEB1wBZbBIrgQEBI1n0DW+hkjBt3yBukjBtndD0BIEBAdcAWWwSbwLigVTlIW6z8vQgbvLQgG8iMIEBAQLIWQL0AIEBAc8AyRA8EiBulTBZ9FowlEEz9BXiCX8C7IIAxO34QW8kECNfAxESERMREhERERMREREQERMREA8REw8OERMODRETDQwREwwLERMLChETCgkREwkIERMIBxETBwYREwYFERMFBBETBAMREwMCERMCARET2zwBERIB8vQPERAPVQ4pgQEBVhNZ9A1voZIwbd9GQwDyIG6SMG2d0PQEgQEB1wBZbBJvAuIgbvLQgG8igQELAREVcHEhbpVbWfRZMJjIAc8AQTP0QeKBAQERFMhZAvQAgQEBzwDJEDoCERMCARESASBulTBZ9FowlEEz9BXiDhEQDhDfEM4QvRCsEJsQigkQaBBXEEYQNUQwEgJxuJrQEg10mBAQu68uCIINcLCi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");
    const __system = core_1.Cell.fromBase64("te6cckECmwEAJXEAAQHAAQIBIAJ2AQW/9ewDART/APSkE/S88sgLBAIBYgU4A8LQAdDTAwFxsKMB+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiFRQUwNvBPhhAvhi2zwREBESERAPEREPDhEQDhDfVRzbPPLggsj4QwHMfwHKABERERBV4Ns8ye1UZwY2AfYBkjB/4HAh10nCH5UwINcLH94gghA2FiBnuo5eMNMfAYIQNhYgZ7ry4IH6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIMYIAgdyNCGAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAARQCscFGfL0f+AHBP4gghBzYtCcuo9nMNMfAYIQc2LQnLry4IHTP/oA+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiFQTAxAjbBQzggCk7vhBbyQQI18DLMcF8vQCyAHPFsnQgQEB1wABAdHAAY6DMds8joMB2zzif+AgghAbMXqWuuMCIMAACAkMFAAGF6AGAvKBWvD4QW8kE18DJoIK+vCAoL7y9FHRoPhBbyT4KG1wyMnQVhVROkEzERoRHBEaERkRGxEZERgRHBEYERcRGxEXERYRHBEWChEVChEUERwRFAoREwoREhEcERIKEREKERARHBEQEK8OERwOEK0MERwMEKsKERwK2zwmJgoD3sgBghCj2uxHWMsfgQEBzwDJggkxLQD4Q/goVhUB2zxwWchwAcsBcwHLAXABywASzMzJ+QDIcgHLAXABywASygfL/8nQINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiH9QI3ABbW3bPAEREgEREZmNCwCiyFmCEDcIledQA8sfgQEBzwABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WyciCWMAAAAAAAAAAAAAAAAEBy2fMyXD7AA4REA4Q31UcAXIw0x8BghAbMXqWuvLggfpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgBgQEB1wBZbBLbPH8NAvJWElYSVhJWElYSVhJWElYSVhJWElYSVhJWElYSVhJWElYSERARIxEQDxEiDw4RIQ4NESANDBEfDAsRHgsKER0KCREcCQgRGwgHERoHBhEZBgURGAUEERcEAxEWAwIRFQIBERQBERPbPFcQXw8xERERExERXj8OERIOcA4BaA0REw0MERIMCxETCwoREgoJERMJCBESCAcREwcGERIGBRETBQQREgQDERMDAhESAgEREwEPA/yCAMTt+EFvJBAjXwMREhETERIRERETEREREBETERAPERMPDhETDg0REw0MERMMCxETCwoREwoJERMJCBETCAcREwcGERMGBRETBQQREwQDERMDAhETAgERE9s8ARESAfL0DxEQD1UOVhLbPFFxoFJyoRigARETAQahbXDIydA7EBEANiPCAJZTA6gjqQSRcOIiwgCWURKoI6kEkjFw4gP+UxMEVhYEVhdBRANVUMhVYNs8yVKAcIBAfwQDbW3bPAEREchZghD1tx6UUAPLH4EBAc8AASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFsnIgljAAAAAAAAAAAAAAAABActnzMlw+wAOERAOEN8QzhC9EKwQmxCKEHkQaBKNEwDeghAPin6lUAjLHxbLP1AE+gJYINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WASBulTBwAcsBjh4g10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxbiIW6zlX8BygDMlHAyygDiAfoCAc8WAAwQV14jVRID/CLXScEhsJJbf+AgghDVMnbbuo4UMNMfAYIQ1TJ227ry4IHTPwExMH/gIIIQkYzEHLqOvzDTHwGCEJGMxBy68uCBgQEB1wD6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIAYEBAdcAVSBsE9s8f+AgghCUapi2uuMCIBUYGgL0gRFN+EP4KFJA2zxwWchwAcsBcwHLAXABywASzMzJ+QDIcgHLAXABywASygfL/8nQINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiPhBbyQQI18DxwXy9BESERMREhERERMREREQERMREA8REw8OERMODRETDQwREwyZFgTECxETCwoREwoJERMJCBETCAcREwcGERMGBRETBQQREwQDERMDAhETAgEREwHbPIIAnOshwwDy9FF3oW1wyMnQUxoEVhcEVhhBRANVUMhVYNs8yVKQcIBAfwQDbW3bPBESFwFSH40XAMLIWYIQ6EsEklADyx8BINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WgQEBzwDJyIJYwAAAAAAAAAAAAAAAAQHLZ8zJcPsADxEQDxDvEN4QzRC8EKsQmhCJEHgQZ1UEAVAw0x8BghCUapi2uvLggdM/ATHIAYIQr/kPV1jLH8s/yfhCAXBt2zx/GQE6bW0ibrOZWyBu8tCAbyIBkTLiECRwAwSAQlAj2zyNBEiCEHvdl966jwgw2zxsFts8f+AgghCJtx0JuuMCIIIQCmHbWbobHCIpALLTHwGCEHvdl9668uCB0z/6APpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgB+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiAH6AFFVFRRDMALw+EFvJBEQERoREA8RGQ8OERgODREXDQwRFgwLERULChEUCgkREwkIERIIBxERBwYRGgYFERkFBBEYBAMRFwMCERYCAREVAREUVhdWF1YXVhdWF1YXVhdWIVYhViHbPBEQERoREA8RGQ8OERgODREXDQwRFgwLERULHSECrl8DNDVbERARExEQDxESDw4REQ4NERMNDBESDAsREQsKERMKCRESCQgREQgHERMHBhESBgUREQUEERMEAxESAwIREQIBERMBERJWEvhD+CgS2zwBgSYLApkeA/BwWchwAcsBcwHLAXABywASzMzJ+QDIcgHLAXABywASygfL/8nQINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiAERFccFAREUAfL0bXDIydAhVhQEVhYEVhdBRANVUMhVYNs8yVJwcIBAfwQDbW3bPAEREAEREQEfjSAAyIIQD4p+pVAIyx8Wyz9QBPoCWCDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFgEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxYhbrOVfwHKAMyUcDLKAOIB+gIBzxYAyMhZghDQwl3qUAPLHwEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxaBAQHPAMnIgljAAAAAAAAAAAAAAAABActnzMlw+wANERANEM8QvhCtEJwQixB6EGkQWBBHEDZFMwQC4AoRFAoJERMJCBESCAcREQcGERAGEF8QTlWTNjY2NhEWVhahjQhgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEJccFs48dEwIRFgIVgEIlAhEYF8hVUNs8yRJwfwRBM21t2zyUVxZfBeKDjQIQMNs8bBbbPH8jJADG0x8BghCJtx0JuvLggfpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgB+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiAGBAQHXANIAAZHUkm0B4voAUVUVFEMwAfb4QW8kERARGhEQDxEZDw4RGA4NERcNDBEWDAsRFQsKERQKCRETCQgREggHEREHBhEaBgURGQUEERgEAxEXAwIRFgIBERUBERRWF1YXVhdWF1YXVhdWF1YhViFWIRCJXwkvggCpZQLHBfL0gXVtVhDy9BEQERoREA8RGQ8lAVgOERgODREXDQwRFgwLERULChEUCgkREwkIERIIBxERBwYREAYQXxBOVZPbPCYCvDI1NTU1ERERFRERERARFBEQDxETDw4REg4NERUNDBEUDAsREwsKERIKCREVCQgRFAgHERMHBhESBgURFQUEERQEAxETAwIREgIBERUBERT4Q/goEts8ERJWFKAhVhOZJwP+cFnIcAHLAXMBywFwAcsAEszMyfkAyHIBywFwAcsAEsoHy//J0CDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4Ihwf4BAIvgoFQQRGgQDERsDAgERHAERGRAjyFVQ2zzJBhEXBgURFQUEERYEAxEUA1kRExBGEEXbPAwREAwQv4CNKAAqEK4QnRCMEHsQahBZEEgQN0YUUDMFA/aOtjDTHwGCEAph21m68uCB+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiAGBAQHXAFlsEuAgghBRPvNeuo62MNMfAYIQUT7zXrry4IH6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIAYEBAdcAWWwS4CAqLjECqhEQERIREF4+DRERDQwREgwLERELChESCgkREQkIERIIBxERBwYREgYFEREFBBESBAMREQMCERICARERARES2zwREBESERAPEREPDhEQDhDfVRzbPH8vKwKEERAREhEQXj4NERENDBESDAsREQsKERIKCRERCQgREggHEREHBhESBgUREQUEERIEAxERAwIREgIBEREBERJWEds8PywC7IIAxO34QW8kECNfAxESERMREhERERMREREQERMREA8REw8OERMODRETDQwREwwLERMLChETCgkREwkIERMIBxETBwYREwYFERMFBBETBAMREwMCERMCARET2zwBERIB8vQPERAPVQ4pgQEBVhNZ9A1voZIwbd87LQDyIG6SMG2d0PQEgQEB1wBZbBJvAuIgbvLQgG8igQELAREVf3EhbpVbWfRZMJjIAc8AQTP0QeKBAQERFMhZAvQAgQEBzwDJEDoCERMCARESASBulTBZ9FowlEEz9BXiDhEQDhDfEM4QvRCsEJsQigkQaBBXEEYQNUQwEgKqERAREhEQXj4NERENDBESDAsREQsKERIKCRERCQgREggHEREHBhESBgUREQUEERIEAxERAwIREgIBEREBERLbPBEQERIREA8REQ8OERAOEN9VHNs8fy8yAvIpDxERD149DBEQDAsREQsKERAKCRERCQgREAgHEREHBhEQBgUREQUEERAEAxERAwIREAIBEREBERCBAQEREts8AhESAgEREwFZ9A1voZIwbd8gbpIwbZ3Q9ASBAQHXAFlsEm8C4oIA0wchbrPy9CBu8tCAbyIwgQELczAAaPhBbyQQI18DcUEz9ApvoZQB1wAwkltt4oIA0wchbrOYASBu8tCAwP+SMXDi8vQOERAOVR0CuoIQFzK+IbqOyDDTHwGCEBcyviG68uCBgQEB1wD6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIEmwSgR8L+EFvJBAjXwMixwXy9Ns8f+CCECT6R8m64wIwcDI1AoQREBESERBePg0REQ0MERIMCxERCwoREgoJEREJCBESCAcREQcGERIGBRERBQQREgQDEREDAhESAgEREQERElYR2zw/MwLsggDE7fhBbyQQI18DERIRExESERERExERERARExEQDxETDw4REw4NERMNDBETDAsREwsKERMKCRETCQgREwgHERMHBhETBgUREwUEERMEAxETAwIREwIBERPbPAEREgHy9A8REA9VDimBAQFWE1n0DW+hkjBt3zs0APIgbpIwbZ3Q9ASBAQHXAFlsEm8C4iBu8tCAbyKBAQsBERVwcSFulVtZ9FkwmMgBzwBBM/RB4oEBAREUyFkC9ACBAQHPAMkQOgIREwIBERIBIG6VMFn0WjCUQTP0FeIOERAOEN8QzhC9EKwQmxCKCRBoEFcQRhA1RDASANzTHwGCECT6R8m68uCBgQEB1wCBAQHXAFlsEiuBAQEj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");
    let builder = (0, core_1.beginCell)();
    builder.storeRef(__system);
    builder.storeUint(0, 1);
    initEmmetLP_init_args({
        $$type: "EmmetLP_init_args",
        admin,
        owner,
        bridge,
        stake_token,
        decimals,
        protocolFee,
        tokenFee,
        jetton_content,
    })(builder);
    const __data = builder.endCell();
    return { code: __code, data: __data };
}
const EmmetLP_errors = {
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
    2296: {
        message: `JettonWallet: Only Jetton master or Jetton wallet can call this function`,
    },
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
    29133: {
        message: `JettonWallet: Not allow negative balance after internal transfer`,
    },
    30061: { message: `JettonMaster: Jetton is not mintable` },
    33244: { message: `Wallet already set` },
    37185: { message: `Not enough funds to transfer` },
    40171: { message: `No rewards to withdraw. Try later.` },
    42222: { message: `Only Allowed Wallet Can Send Notification` },
    43365: { message: `JettonMaster: Sender is not a Jetton owner` },
    46518: {
        message: `APY: totalSupply and rewards are not on the same decimal scale`,
    },
    47048: { message: `JettonWallet: Only owner can burn tokens` },
    50413: { message: `AccessControl: Doesnt have the role` },
    54023: { message: `AccessControl: Doesn't have role` },
    55045: { message: `Only master can update deposit.` },
    60354: { message: `JettonWallet: Not enough balance to burn tokens` },
};
const EmmetLP_types = [
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
        name: "Withdraw",
        header: 2018736038,
        fields: [
            {
                name: "rewards",
                type: { kind: "simple", type: "int", optional: false, format: 257 },
            },
            {
                name: "address",
                type: { kind: "simple", type: "address", optional: false },
            },
        ],
    },
    {
        name: "ReleaseTokens",
        header: 456227478,
        fields: [
            {
                name: "to",
                type: { kind: "simple", type: "address", optional: false },
            },
            {
                name: "amount",
                type: { kind: "simple", type: "int", optional: false, format: 257 },
            },
        ],
    },
    {
        name: "SetWalletAddress",
        header: 907419751,
        fields: [
            {
                name: "token_wallet",
                type: { kind: "simple", type: "address", optional: false },
            },
        ],
    },
    {
        name: "PoolPayload",
        header: null,
        fields: [
            {
                name: "mode",
                type: { kind: "simple", type: "int", optional: false, format: 257 },
            },
        ],
    },
    {
        name: "Position",
        header: null,
        fields: [
            {
                name: "lastInternalFeeGrowth",
                type: { kind: "simple", type: "int", optional: false, format: 257 },
            },
            {
                name: "rewards",
                type: { kind: "simple", type: "int", optional: false, format: 257 },
            },
        ],
    },
    {
        name: "RewardSplit",
        header: null,
        fields: [
            {
                name: "protocolFeeShare",
                type: { kind: "simple", type: "int", optional: false, format: 257 },
            },
            {
                name: "lpProvidersShare",
                type: { kind: "simple", type: "int", optional: false, format: 257 },
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
        name: "UpdateDeposit",
        header: 2749033543,
        fields: [
            {
                name: "feeGrowthGlobal",
                type: { kind: "simple", type: "int", optional: false, format: 257 },
            },
        ],
    },
    {
        name: "InternalWithdrawFee",
        header: 2441921564,
        fields: [
            {
                name: "lastFeeGrowth",
                type: { kind: "simple", type: "int", optional: false, format: 257 },
            },
            {
                name: "owner",
                type: { kind: "simple", type: "address", optional: false },
            },
            {
                name: "balance",
                type: { kind: "simple", type: "int", optional: false, format: 257 },
            },
        ],
    },
    {
        name: "Staked",
        header: 923309543,
        fields: [
            {
                name: "amount",
                type: { kind: "simple", type: "int", optional: false, format: 257 },
            },
            {
                name: "staker",
                type: { kind: "simple", type: "address", optional: false },
            },
        ],
    },
    {
        name: "LPTransfer",
        header: 4122418836,
        fields: [
            {
                name: "amount",
                type: { kind: "simple", type: "int", optional: false, format: 257 },
            },
            {
                name: "to",
                type: { kind: "simple", type: "address", optional: false },
            },
        ],
    },
    {
        name: "Withdrawn",
        header: 3502398954,
        fields: [
            {
                name: "user",
                type: { kind: "simple", type: "address", optional: false },
            },
            {
                name: "amount",
                type: { kind: "simple", type: "int", optional: false, format: 257 },
            },
        ],
    },
    {
        name: "RewardsPaid",
        header: 3897230482,
        fields: [
            {
                name: "user",
                type: { kind: "simple", type: "address", optional: false },
            },
            {
                name: "amount",
                type: { kind: "simple", type: "int", optional: false, format: 257 },
            },
        ],
    },
];
const EmmetLP_getters = [
    {
        name: "feeGrowthGlobal",
        arguments: [],
        returnType: { kind: "simple", type: "int", optional: false, format: 257 },
    },
    {
        name: "protocolFeeAmount",
        arguments: [],
        returnType: { kind: "simple", type: "int", optional: false, format: 257 },
    },
    {
        name: "currentAPY",
        arguments: [],
        returnType: { kind: "simple", type: "int", optional: false, format: 257 },
    },
    {
        name: "rewards",
        arguments: [
            {
                name: "lastInternalFeeGrowth",
                type: { kind: "simple", type: "int", optional: false, format: 257 },
            },
            {
                name: "balance",
                type: { kind: "simple", type: "int", optional: false, format: 257 },
            },
        ],
        returnType: { kind: "simple", type: "int", optional: false, format: 257 },
    },
    {
        name: "bridge_role_id",
        arguments: [],
        returnType: { kind: "simple", type: "int", optional: false, format: 257 },
    },
    {
        name: "protocolFee",
        arguments: [],
        returnType: { kind: "simple", type: "int", optional: false, format: 257 },
    },
    {
        name: "tokenFee",
        arguments: [],
        returnType: { kind: "simple", type: "int", optional: false, format: 257 },
    },
    {
        name: "stakeToken",
        arguments: [],
        returnType: { kind: "simple", type: "address", optional: false },
    },
    {
        name: "decimals",
        arguments: [],
        returnType: { kind: "simple", type: "int", optional: false, format: 257 },
    },
    {
        name: "get_jetton_data",
        arguments: [],
        returnType: { kind: "simple", type: "JettonData", optional: false },
    },
    {
        name: "get_wallet_address",
        arguments: [
            {
                name: "owner_address",
                type: { kind: "simple", type: "address", optional: false },
            },
        ],
        returnType: { kind: "simple", type: "address", optional: false },
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
const EmmetLP_receivers = [
    {
        receiver: "internal",
        message: { kind: "typed", type: "SetWalletAddress" },
    },
    {
        receiver: "internal",
        message: { kind: "typed", type: "JettonTransferNotification" },
    },
    { receiver: "internal", message: { kind: "typed", type: "ReleaseTokens" } },
    { receiver: "internal", message: { kind: "empty" } },
    { receiver: "internal", message: { kind: "typed", type: "JettonExcesses" } },
    {
        receiver: "internal",
        message: { kind: "typed", type: "InternalWithdrawFee" },
    },
    { receiver: "internal", message: { kind: "typed", type: "Deploy" } },
    {
        receiver: "internal",
        message: { kind: "typed", type: "JettonBurnNotification" },
    },
    { receiver: "internal", message: { kind: "typed", type: "JettonMint" } },
    { receiver: "internal", message: { kind: "typed", type: "GrantRole" } },
    { receiver: "internal", message: { kind: "typed", type: "RevokeRole" } },
    { receiver: "internal", message: { kind: "typed", type: "RenounceRole" } },
    { receiver: "internal", message: { kind: "typed", type: "UpdateRoleAdmin" } },
];
class EmmetLP {
    static async init(admin, owner, bridge, stake_token, decimals, protocolFee, tokenFee, jetton_content) {
        return await EmmetLP_init(admin, owner, bridge, stake_token, decimals, protocolFee, tokenFee, jetton_content);
    }
    static async fromInit(admin, owner, bridge, stake_token, decimals, protocolFee, tokenFee, jetton_content) {
        const init = await EmmetLP_init(admin, owner, bridge, stake_token, decimals, protocolFee, tokenFee, jetton_content);
        const address = (0, core_1.contractAddress)(0, init);
        return new EmmetLP(address, init);
    }
    static fromAddress(address) {
        return new EmmetLP(address);
    }
    constructor(address, init) {
        this.abi = {
            types: EmmetLP_types,
            getters: EmmetLP_getters,
            receivers: EmmetLP_receivers,
            errors: EmmetLP_errors,
        };
        this.address = address;
        this.init = init;
    }
    async send(provider, via, args, message) {
        let body = null;
        if (message &&
            typeof message === "object" &&
            !(message instanceof core_1.Slice) &&
            message.$$type === "SetWalletAddress") {
            body = (0, core_1.beginCell)().store(storeSetWalletAddress(message)).endCell();
        }
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
            message.$$type === "ReleaseTokens") {
            body = (0, core_1.beginCell)().store(storeReleaseTokens(message)).endCell();
        }
        if (message === null) {
            body = new core_1.Cell();
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
            message.$$type === "InternalWithdrawFee") {
            body = (0, core_1.beginCell)().store(storeInternalWithdrawFee(message)).endCell();
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
            message.$$type === "JettonBurnNotification") {
            body = (0, core_1.beginCell)().store(storeJettonBurnNotification(message)).endCell();
        }
        if (message &&
            typeof message === "object" &&
            !(message instanceof core_1.Slice) &&
            message.$$type === "JettonMint") {
            body = (0, core_1.beginCell)().store(storeJettonMint(message)).endCell();
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
    async getFeeGrowthGlobal(provider) {
        let builder = new core_1.TupleBuilder();
        let source = (await provider.get("feeGrowthGlobal", builder.build())).stack;
        let result = source.readBigNumber();
        return result;
    }
    async getProtocolFeeAmount(provider) {
        let builder = new core_1.TupleBuilder();
        let source = (await provider.get("protocolFeeAmount", builder.build()))
            .stack;
        let result = source.readBigNumber();
        return result;
    }
    async getCurrentApy(provider) {
        let builder = new core_1.TupleBuilder();
        let source = (await provider.get("currentAPY", builder.build())).stack;
        let result = source.readBigNumber();
        return result;
    }
    async getRewards(provider, lastInternalFeeGrowth, balance) {
        let builder = new core_1.TupleBuilder();
        builder.writeNumber(lastInternalFeeGrowth);
        builder.writeNumber(balance);
        let source = (await provider.get("rewards", builder.build())).stack;
        let result = source.readBigNumber();
        return result;
    }
    async getBridgeRoleId(provider) {
        let builder = new core_1.TupleBuilder();
        let source = (await provider.get("bridge_role_id", builder.build())).stack;
        let result = source.readBigNumber();
        return result;
    }
    async getProtocolFee(provider) {
        let builder = new core_1.TupleBuilder();
        let source = (await provider.get("protocolFee", builder.build())).stack;
        let result = source.readBigNumber();
        return result;
    }
    async getTokenFee(provider) {
        let builder = new core_1.TupleBuilder();
        let source = (await provider.get("tokenFee", builder.build())).stack;
        let result = source.readBigNumber();
        return result;
    }
    async getStakeToken(provider) {
        let builder = new core_1.TupleBuilder();
        let source = (await provider.get("stakeToken", builder.build())).stack;
        let result = source.readAddress();
        return result;
    }
    async getDecimals(provider) {
        let builder = new core_1.TupleBuilder();
        let source = (await provider.get("decimals", builder.build())).stack;
        let result = source.readBigNumber();
        return result;
    }
    async getGetJettonData(provider) {
        let builder = new core_1.TupleBuilder();
        let source = (await provider.get("get_jetton_data", builder.build())).stack;
        const result = loadTupleJettonData(source);
        return result;
    }
    async getGetWalletAddress(provider, owner_address) {
        let builder = new core_1.TupleBuilder();
        builder.writeAddress(owner_address);
        let source = (await provider.get("get_wallet_address", builder.build()))
            .stack;
        let result = source.readAddress();
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
exports.EmmetLP = EmmetLP;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFjdF9FbW1ldExQLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2NvbnRyYWN0cy90b24vcG9vbHMvdGFjdF9FbW1ldExQLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSw0QkFBNEI7QUFDNUIsb0NBb0JtQjtBQVFuQixTQUFnQixjQUFjLENBQUMsR0FBYztJQUMzQyxPQUFPLENBQUMsT0FBZ0IsRUFBRSxFQUFFO1FBQzFCLElBQUksR0FBRyxHQUFHLE9BQU8sQ0FBQztRQUNsQixHQUFHLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUN2QixHQUFHLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUN6QixDQUFDLENBQUM7QUFDSixDQUFDO0FBTkQsd0NBTUM7QUFFRCxTQUFnQixhQUFhLENBQUMsS0FBWTtJQUN4QyxJQUFJLElBQUksR0FBRyxLQUFLLENBQUM7SUFDakIsSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO0lBQzNCLElBQUksS0FBSyxHQUFHLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztJQUMzQixPQUFPLEVBQUUsTUFBTSxFQUFFLFdBQW9CLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLENBQUM7QUFDcEUsQ0FBQztBQUxELHNDQUtDO0FBRUQsU0FBUyxrQkFBa0IsQ0FBQyxNQUFtQjtJQUM3QyxJQUFJLEtBQUssR0FBRyxNQUFNLENBQUMsUUFBUSxFQUFFLENBQUM7SUFDOUIsSUFBSSxLQUFLLEdBQUcsTUFBTSxDQUFDLFFBQVEsRUFBRSxDQUFDO0lBQzlCLE9BQU8sRUFBRSxNQUFNLEVBQUUsV0FBb0IsRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsQ0FBQztBQUNwRSxDQUFDO0FBRUQsU0FBUyxtQkFBbUIsQ0FBQyxNQUFpQjtJQUM1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