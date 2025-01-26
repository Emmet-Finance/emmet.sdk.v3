"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmmetBridge = exports.EmmetBridge_getterMapping = void 0;
exports.storeStateInit = storeStateInit;
exports.loadStateInit = loadStateInit;
exports.storeStdAddress = storeStdAddress;
exports.loadStdAddress = loadStdAddress;
exports.storeVarAddress = storeVarAddress;
exports.loadVarAddress = loadVarAddress;
exports.storeContext = storeContext;
exports.loadContext = loadContext;
exports.storeSendParameters = storeSendParameters;
exports.loadSendParameters = loadSendParameters;
exports.storeInstallment = storeInstallment;
exports.loadInstallment = loadInstallment;
exports.storeSignerAndSignature = storeSignerAndSignature;
exports.loadSignerAndSignature = loadSignerAndSignature;
exports.storeReceiveInstallment = storeReceiveInstallment;
exports.loadReceiveInstallment = loadReceiveInstallment;
exports.storeFreezeTon = storeFreezeTon;
exports.loadFreezeTon = loadFreezeTon;
exports.storeOutgoingTransaction = storeOutgoingTransaction;
exports.loadOutgoingTransaction = loadOutgoingTransaction;
exports.storeIncomingTransaction = storeIncomingTransaction;
exports.loadIncomingTransaction = loadIncomingTransaction;
exports.storeInstallmentOut = storeInstallmentOut;
exports.loadInstallmentOut = loadInstallmentOut;
exports.storeReleaseTokens = storeReleaseTokens;
exports.loadReleaseTokens = loadReleaseTokens;
exports.storeJettonBurnNotification = storeJettonBurnNotification;
exports.loadJettonBurnNotification = loadJettonBurnNotification;
exports.storeJettonMint = storeJettonMint;
exports.loadJettonMint = loadJettonMint;
exports.storeJettonTransfer = storeJettonTransfer;
exports.loadJettonTransfer = loadJettonTransfer;
exports.storeTokenTransferNotification = storeTokenTransferNotification;
exports.loadTokenTransferNotification = loadTokenTransferNotification;
exports.storeTokenExcesses = storeTokenExcesses;
exports.loadTokenExcesses = loadTokenExcesses;
exports.storeStonfiSwap = storeStonfiSwap;
exports.loadStonfiSwap = loadStonfiSwap;
exports.storeSwapAdditionalData = storeSwapAdditionalData;
exports.loadSwapAdditionalData = loadSwapAdditionalData;
exports.storeDeploy = storeDeploy;
exports.loadDeploy = loadDeploy;
exports.storeDeployOk = storeDeployOk;
exports.loadDeployOk = loadDeployOk;
exports.storeFactoryDeploy = storeFactoryDeploy;
exports.loadFactoryDeploy = loadFactoryDeploy;
exports.storeDeleteChain = storeDeleteChain;
exports.loadDeleteChain = loadDeleteChain;
exports.storeDeleteModule = storeDeleteModule;
exports.loadDeleteModule = loadDeleteModule;
exports.storeDeleteStategies = storeDeleteStategies;
exports.loadDeleteStategies = loadDeleteStategies;
exports.storeDeleteToken = storeDeleteToken;
exports.loadDeleteToken = loadDeleteToken;
exports.storeDeleteValidator = storeDeleteValidator;
exports.loadDeleteValidator = loadDeleteValidator;
exports.storePause = storePause;
exports.loadPause = loadPause;
exports.storeSetAdmin = storeSetAdmin;
exports.loadSetAdmin = loadSetAdmin;
exports.storeSetChain = storeSetChain;
exports.loadSetChain = loadSetChain;
exports.storeSetCFO = storeSetCFO;
exports.loadSetCFO = loadSetCFO;
exports.storeSetModule = storeSetModule;
exports.loadSetModule = loadSetModule;
exports.storeSetValidator = storeSetValidator;
exports.loadSetValidator = loadSetValidator;
exports.storeSetStrategies = storeSetStrategies;
exports.loadSetStrategies = loadSetStrategies;
exports.storeSetToken = storeSetToken;
exports.loadSetToken = loadSetToken;
exports.storeUnpause = storeUnpause;
exports.loadUnpause = loadUnpause;
exports.storeUpdateChainFee = storeUpdateChainFee;
exports.loadUpdateChainFee = loadUpdateChainFee;
exports.storeUpdateConsensusFee = storeUpdateConsensusFee;
exports.loadUpdateConsensusFee = loadUpdateConsensusFee;
exports.storeUpdateMinimumTxFee = storeUpdateMinimumTxFee;
exports.loadUpdateMinimumTxFee = loadUpdateMinimumTxFee;
exports.storeUpdateProtocolFee = storeUpdateProtocolFee;
exports.loadUpdateProtocolFee = loadUpdateProtocolFee;
exports.storeWithdrawGas = storeWithdrawGas;
exports.loadWithdrawGas = loadWithdrawGas;
exports.storeToken = storeToken;
exports.loadToken = loadToken;
exports.storeChain = storeChain;
exports.loadChain = loadChain;
exports.storeForeignFees = storeForeignFees;
exports.loadForeignFees = loadForeignFees;
exports.storeSteps = storeSteps;
exports.loadSteps = loadSteps;
exports.storeStrategies = storeStrategies;
exports.loadStrategies = loadStrategies;
exports.storeToTokenMap = storeToTokenMap;
exports.loadToTokenMap = loadToTokenMap;
exports.storeFromTokenMap = storeFromTokenMap;
exports.loadFromTokenMap = loadFromTokenMap;
exports.storeGrantRole = storeGrantRole;
exports.loadGrantRole = loadGrantRole;
exports.storeRenounceRole = storeRenounceRole;
exports.loadRenounceRole = loadRenounceRole;
exports.storeRevokeRole = storeRevokeRole;
exports.loadRevokeRole = loadRevokeRole;
exports.storeRoleData = storeRoleData;
exports.loadRoleData = loadRoleData;
exports.storeUpdateRoleAdmin = storeUpdateRoleAdmin;
exports.loadUpdateRoleAdmin = loadUpdateRoleAdmin;
exports.storeEmmetBridge$Data = storeEmmetBridge$Data;
exports.loadEmmetBridge$Data = loadEmmetBridge$Data;
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
    return { $$type: 'StateInit', code: _code, data: _data };
}
function storeStdAddress(src) {
    return (builder) => {
        let b_0 = builder;
        b_0.storeInt(src.workchain, 8);
        b_0.storeUint(src.address, 256);
    };
}
function loadStdAddress(slice) {
    let sc_0 = slice;
    let _workchain = sc_0.loadIntBig(8);
    let _address = sc_0.loadUintBig(256);
    return { $$type: 'StdAddress', workchain: _workchain, address: _address };
}
function storeVarAddress(src) {
    return (builder) => {
        let b_0 = builder;
        b_0.storeInt(src.workchain, 32);
        b_0.storeRef(src.address.asCell());
    };
}
function loadVarAddress(slice) {
    let sc_0 = slice;
    let _workchain = sc_0.loadIntBig(32);
    let _address = sc_0.loadRef().asSlice();
    return { $$type: 'VarAddress', workchain: _workchain, address: _address };
}
function storeContext(src) {
    return (builder) => {
        let b_0 = builder;
        b_0.storeBit(src.bounced);
        b_0.storeAddress(src.sender);
        b_0.storeInt(src.value, 257);
        b_0.storeRef(src.raw.asCell());
    };
}
function loadContext(slice) {
    let sc_0 = slice;
    let _bounced = sc_0.loadBit();
    let _sender = sc_0.loadAddress();
    let _value = sc_0.loadIntBig(257);
    let _raw = sc_0.loadRef().asSlice();
    return { $$type: 'Context', bounced: _bounced, sender: _sender, value: _value, raw: _raw };
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
    return { $$type: 'SendParameters', bounce: _bounce, to: _to, value: _value, mode: _mode, body: _body, code: _code, data: _data };
}
function storeInstallment(src) {
    return (builder) => {
        let b_0 = builder;
        b_0.storeUint(1572369283, 32);
        b_0.storeUint(src.from_chain, 64);
        b_0.storeUint(src.target_chain, 64);
        b_0.storeCoins(src.amount);
        b_0.storeInt(src.nonce, 257);
        b_0.storeRef(src.from_token);
        b_0.storeRef(src.to_token);
        b_0.storeAddress(src.recipient);
    };
}
function loadInstallment(slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1572369283) {
        throw Error('Invalid prefix');
    }
    let _from_chain = sc_0.loadUintBig(64);
    let _target_chain = sc_0.loadUintBig(64);
    let _amount = sc_0.loadCoins();
    let _nonce = sc_0.loadIntBig(257);
    let _from_token = sc_0.loadRef();
    let _to_token = sc_0.loadRef();
    let _recipient = sc_0.loadAddress();
    return { $$type: 'Installment', from_chain: _from_chain, target_chain: _target_chain, amount: _amount, nonce: _nonce, from_token: _from_token, to_token: _to_token, recipient: _recipient };
}
function storeSignerAndSignature(src) {
    return (builder) => {
        let b_0 = builder;
        b_0.storeRef(src.signature.asCell());
        b_0.storeUint(src.key, 256);
    };
}
function loadSignerAndSignature(slice) {
    let sc_0 = slice;
    let _signature = sc_0.loadRef().asSlice();
    let _key = sc_0.loadUintBig(256);
    return { $$type: 'SignerAndSignature', signature: _signature, key: _key };
}
function dictValueParserSignerAndSignature() {
    return {
        serialize: (src, builder) => {
            builder.storeRef((0, core_1.beginCell)().store(storeSignerAndSignature(src)).endCell());
        },
        parse: (src) => {
            return loadSignerAndSignature(src.loadRef().beginParse());
        }
    };
}
function storeReceiveInstallment(src) {
    return (builder) => {
        let b_0 = builder;
        b_0.storeUint(953435710, 32);
        b_0.store(storeInstallment(src.installment));
        let b_1 = new core_1.Builder();
        b_1.storeDict(src.signatures, core_1.Dictionary.Keys.BigInt(257), dictValueParserSignerAndSignature());
        b_1.storeInt(src.len, 257);
        b_1.storeUint(src.tx_hash, 256);
        b_1.storeInt(src.id, 257);
        b_0.storeRef(b_1.endCell());
    };
}
function loadReceiveInstallment(slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 953435710) {
        throw Error('Invalid prefix');
    }
    let _installment = loadInstallment(sc_0);
    let sc_1 = sc_0.loadRef().beginParse();
    let _signatures = core_1.Dictionary.load(core_1.Dictionary.Keys.BigInt(257), dictValueParserSignerAndSignature(), sc_1);
    let _len = sc_1.loadIntBig(257);
    let _tx_hash = sc_1.loadUintBig(256);
    let _id = sc_1.loadIntBig(257);
    return { $$type: 'ReceiveInstallment', installment: _installment, signatures: _signatures, len: _len, tx_hash: _tx_hash, id: _id };
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
        throw Error('Invalid prefix');
    }
    let _target_chain = sc_0.loadUintBig(64);
    let _to_token = sc_0.loadRef();
    let _to = sc_0.loadRef();
    let _from_token = sc_0.loadRef();
    let _amount = sc_0.loadCoins();
    return { $$type: 'FreezeTon', target_chain: _target_chain, to_token: _to_token, to: _to, from_token: _from_token, amount: _amount };
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
        throw Error('Invalid prefix');
    }
    let _id = sc_0.loadUintBig(256);
    let _amount = sc_0.loadCoins();
    let _from_token = sc_0.loadRef();
    let _to_token = sc_0.loadRef();
    let _to = sc_0.loadRef();
    let _target_chain_id = sc_0.loadUintBig(64);
    return { $$type: 'OutgoingTransaction', id: _id, amount: _amount, from_token: _from_token, to_token: _to_token, to: _to, target_chain_id: _target_chain_id };
}
function storeIncomingTransaction(src) {
    return (builder) => {
        let b_0 = builder;
        b_0.storeUint(1311663233, 32);
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
    if (sc_0.loadUint(32) !== 1311663233) {
        throw Error('Invalid prefix');
    }
    let _id = sc_0.loadUintBig(256);
    let _amount = sc_0.loadCoins();
    let _from_token = sc_0.loadRef();
    let _to_token = sc_0.loadRef();
    let _target_chain_id = sc_0.loadUintBig(64);
    let _to = sc_0.loadAddress();
    return { $$type: 'IncomingTransaction', id: _id, amount: _amount, from_token: _from_token, to_token: _to_token, target_chain_id: _target_chain_id, to: _to };
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
    return { $$type: 'InstallmentOut', amount: _amount, to: _to, target_chain: _target_chain, token_id: _token_id };
}
function storeReleaseTokens(src) {
    return (builder) => {
        let b_0 = builder;
        b_0.storeUint(169475742, 32);
        b_0.storeAddress(src.to);
        b_0.storeInt(src.amount, 257);
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
    if (sc_0.loadUint(32) !== 169475742) {
        throw Error('Invalid prefix');
    }
    let _to = sc_0.loadAddress();
    let _amount = sc_0.loadIntBig(257);
    let _body = sc_0.loadBit() ? sc_0.loadRef() : null;
    return { $$type: 'ReleaseTokens', to: _to, amount: _amount, body: _body };
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
        throw Error('Invalid prefix');
    }
    let _query_id = sc_0.loadUintBig(64);
    let _amount = sc_0.loadCoins();
    let _sender = sc_0.loadAddress();
    let _response_destination = sc_0.loadAddress();
    let _forward_ton_amount = sc_0.loadCoins();
    let _forward_payload = sc_0;
    return { $$type: 'JettonBurnNotification', query_id: _query_id, amount: _amount, sender: _sender, response_destination: _response_destination, forward_ton_amount: _forward_ton_amount, forward_payload: _forward_payload };
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
        throw Error('Invalid prefix');
    }
    let _origin = sc_0.loadAddress();
    let _receiver = sc_0.loadAddress();
    let _amount = sc_0.loadIntBig(257);
    let _custom_payload = sc_0.loadBit() ? sc_0.loadRef() : null;
    let _forward_ton_amount = sc_0.loadCoins();
    let _forward_payload = sc_0;
    return { $$type: 'JettonMint', origin: _origin, receiver: _receiver, amount: _amount, custom_payload: _custom_payload, forward_ton_amount: _forward_ton_amount, forward_payload: _forward_payload };
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
        if (src.forward_payload !== null && src.forward_payload !== undefined) {
            b_0.storeBit(true).storeRef(src.forward_payload);
        }
        else {
            b_0.storeBit(false);
        }
    };
}
function loadJettonTransfer(slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 260734629) {
        throw Error('Invalid prefix');
    }
    let _query_id = sc_0.loadUintBig(64);
    let _amount = sc_0.loadCoins();
    let _destination = sc_0.loadAddress();
    let _response_destination = sc_0.loadMaybeAddress();
    let _custom_payload = sc_0.loadBit() ? sc_0.loadRef() : null;
    let _forward_ton_amount = sc_0.loadCoins();
    let _forward_payload = sc_0.loadBit() ? sc_0.loadRef() : null;
    return { $$type: 'JettonTransfer', query_id: _query_id, amount: _amount, destination: _destination, response_destination: _response_destination, custom_payload: _custom_payload, forward_ton_amount: _forward_ton_amount, forward_payload: _forward_payload };
}
function storeTokenTransferNotification(src) {
    return (builder) => {
        let b_0 = builder;
        b_0.storeUint(1935855772, 32);
        b_0.storeUint(src.query_id, 64);
        b_0.storeCoins(src.amount);
        b_0.storeAddress(src.sender);
        b_0.storeBuilder(src.forward_payload.asBuilder());
    };
}
function loadTokenTransferNotification(slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1935855772) {
        throw Error('Invalid prefix');
    }
    let _query_id = sc_0.loadUintBig(64);
    let _amount = sc_0.loadCoins();
    let _sender = sc_0.loadAddress();
    let _forward_payload = sc_0;
    return { $$type: 'TokenTransferNotification', query_id: _query_id, amount: _amount, sender: _sender, forward_payload: _forward_payload };
}
function storeTokenExcesses(src) {
    return (builder) => {
        let b_0 = builder;
        b_0.storeUint(3576854235, 32);
        b_0.storeUint(src.query_id, 64);
    };
}
function loadTokenExcesses(slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 3576854235) {
        throw Error('Invalid prefix');
    }
    let _query_id = sc_0.loadUintBig(64);
    return { $$type: 'TokenExcesses', query_id: _query_id };
}
function storeStonfiSwap(src) {
    return (builder) => {
        let b_0 = builder;
        b_0.storeUint(1717886506, 32);
        b_0.storeAddress(src.otherTokenWallet);
        b_0.storeAddress(src.refundAddress);
        b_0.storeAddress(src.excessesAddress);
        b_0.storeUint(src.deadline, 64);
        let b_1 = new core_1.Builder();
        b_1.store(storeSwapAdditionalData(src.additionalData));
        b_0.storeRef(b_1.endCell());
    };
}
function loadStonfiSwap(slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1717886506) {
        throw Error('Invalid prefix');
    }
    let _otherTokenWallet = sc_0.loadAddress();
    let _refundAddress = sc_0.loadAddress();
    let _excessesAddress = sc_0.loadAddress();
    let _deadline = sc_0.loadUintBig(64);
    let sc_1 = sc_0.loadRef().beginParse();
    let _additionalData = loadSwapAdditionalData(sc_1);
    return { $$type: 'StonfiSwap', otherTokenWallet: _otherTokenWallet, refundAddress: _refundAddress, excessesAddress: _excessesAddress, deadline: _deadline, additionalData: _additionalData };
}
function storeSwapAdditionalData(src) {
    return (builder) => {
        let b_0 = builder;
        b_0.storeCoins(src.minOut);
        b_0.storeAddress(src.receiverAddress);
        b_0.storeCoins(src.fwdGas);
        if (src.customPayload !== null && src.customPayload !== undefined) {
            b_0.storeBit(true).storeRef(src.customPayload);
        }
        else {
            b_0.storeBit(false);
        }
        b_0.storeCoins(src.refundFwdGas);
        if (src.refundPayload !== null && src.refundPayload !== undefined) {
            b_0.storeBit(true).storeRef(src.refundPayload);
        }
        else {
            b_0.storeBit(false);
        }
        b_0.storeUint(src.refFee, 16);
        b_0.storeAddress(src.referralAddress);
    };
}
function loadSwapAdditionalData(slice) {
    let sc_0 = slice;
    let _minOut = sc_0.loadCoins();
    let _receiverAddress = sc_0.loadAddress();
    let _fwdGas = sc_0.loadCoins();
    let _customPayload = sc_0.loadBit() ? sc_0.loadRef() : null;
    let _refundFwdGas = sc_0.loadCoins();
    let _refundPayload = sc_0.loadBit() ? sc_0.loadRef() : null;
    let _refFee = sc_0.loadUintBig(16);
    let _referralAddress = sc_0.loadMaybeAddress();
    return { $$type: 'SwapAdditionalData', minOut: _minOut, receiverAddress: _receiverAddress, fwdGas: _fwdGas, customPayload: _customPayload, refundFwdGas: _refundFwdGas, refundPayload: _refundPayload, refFee: _refFee, referralAddress: _referralAddress };
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
        throw Error('Invalid prefix');
    }
    let _queryId = sc_0.loadUintBig(64);
    return { $$type: 'Deploy', queryId: _queryId };
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
        throw Error('Invalid prefix');
    }
    let _queryId = sc_0.loadUintBig(64);
    return { $$type: 'DeployOk', queryId: _queryId };
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
        throw Error('Invalid prefix');
    }
    let _queryId = sc_0.loadUintBig(64);
    let _cashback = sc_0.loadAddress();
    return { $$type: 'FactoryDeploy', queryId: _queryId, cashback: _cashback };
}
function storeDeleteChain(src) {
    return (builder) => {
        let b_0 = builder;
        b_0.storeUint(308842230, 32);
        b_0.storeInt(src.chain_id, 257);
    };
}
function loadDeleteChain(slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 308842230) {
        throw Error('Invalid prefix');
    }
    let _chain_id = sc_0.loadIntBig(257);
    return { $$type: 'DeleteChain', chain_id: _chain_id };
}
function storeDeleteModule(src) {
    return (builder) => {
        let b_0 = builder;
        b_0.storeUint(3720596336, 32);
        b_0.storeInt(src.step, 257);
    };
}
function loadDeleteModule(slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 3720596336) {
        throw Error('Invalid prefix');
    }
    let _step = sc_0.loadIntBig(257);
    return { $$type: 'DeleteModule', step: _step };
}
function storeDeleteStategies(src) {
    return (builder) => {
        let b_0 = builder;
        b_0.storeUint(1721311172, 32);
        b_0.storeInt(src.chain_id, 257);
        b_0.storeInt(src.from_token, 257);
        b_0.storeInt(src.to_token, 257);
    };
}
function loadDeleteStategies(slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1721311172) {
        throw Error('Invalid prefix');
    }
    let _chain_id = sc_0.loadIntBig(257);
    let _from_token = sc_0.loadIntBig(257);
    let _to_token = sc_0.loadIntBig(257);
    return { $$type: 'DeleteStategies', chain_id: _chain_id, from_token: _from_token, to_token: _to_token };
}
function storeDeleteToken(src) {
    return (builder) => {
        let b_0 = builder;
        b_0.storeUint(1711896016, 32);
        b_0.storeStringRefTail(src.symbol);
    };
}
function loadDeleteToken(slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1711896016) {
        throw Error('Invalid prefix');
    }
    let _symbol = sc_0.loadStringRefTail();
    return { $$type: 'DeleteToken', symbol: _symbol };
}
function storeDeleteValidator(src) {
    return (builder) => {
        let b_0 = builder;
        b_0.storeUint(1954510119, 32);
        b_0.storeAddress(src.candidate);
    };
}
function loadDeleteValidator(slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1954510119) {
        throw Error('Invalid prefix');
    }
    let _candidate = sc_0.loadAddress();
    return { $$type: 'DeleteValidator', candidate: _candidate };
}
function storePause() {
    return (builder) => {
        let b_0 = builder;
        b_0.storeUint(2051344601, 32);
    };
}
function loadPause(slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2051344601) {
        throw Error('Invalid prefix');
    }
    return { $$type: 'Pause' };
}
function storeSetAdmin(src) {
    return (builder) => {
        let b_0 = builder;
        b_0.storeUint(2713466466, 32);
        b_0.storeAddress(src.newAdmin);
    };
}
function loadSetAdmin(slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2713466466) {
        throw Error('Invalid prefix');
    }
    let _newAdmin = sc_0.loadAddress();
    return { $$type: 'SetAdmin', newAdmin: _newAdmin };
}
function storeSetChain(src) {
    return (builder) => {
        let b_0 = builder;
        b_0.storeUint(3430403683, 32);
        b_0.storeStringRefTail(src.name);
        b_0.storeInt(src.chain_id, 257);
    };
}
function loadSetChain(slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 3430403683) {
        throw Error('Invalid prefix');
    }
    let _name = sc_0.loadStringRefTail();
    let _chain_id = sc_0.loadIntBig(257);
    return { $$type: 'SetChain', name: _name, chain_id: _chain_id };
}
function storeSetCFO(src) {
    return (builder) => {
        let b_0 = builder;
        b_0.storeUint(3542740611, 32);
        b_0.storeAddress(src.newCFO);
    };
}
function loadSetCFO(slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 3542740611) {
        throw Error('Invalid prefix');
    }
    let _newCFO = sc_0.loadAddress();
    return { $$type: 'SetCFO', newCFO: _newCFO };
}
function storeSetModule(src) {
    return (builder) => {
        let b_0 = builder;
        b_0.storeUint(2089213538, 32);
        b_0.storeInt(src.step, 257);
        b_0.storeAddress(src.module);
    };
}
function loadSetModule(slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2089213538) {
        throw Error('Invalid prefix');
    }
    let _step = sc_0.loadIntBig(257);
    let _module = sc_0.loadAddress();
    return { $$type: 'SetModule', step: _step, module: _module };
}
function storeSetValidator(src) {
    return (builder) => {
        let b_0 = builder;
        b_0.storeUint(1653987471, 32);
        b_0.storeAddress(src.candidate);
    };
}
function loadSetValidator(slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1653987471) {
        throw Error('Invalid prefix');
    }
    let _candidate = sc_0.loadAddress();
    return { $$type: 'SetValidator', candidate: _candidate };
}
function storeSetStrategies(src) {
    return (builder) => {
        let b_0 = builder;
        b_0.storeUint(3174462983, 32);
        b_0.storeInt(src.chain_id, 257);
        b_0.storeInt(src.from_token, 257);
        b_0.storeInt(src.to_token, 257);
        let b_1 = new core_1.Builder();
        b_1.store(storeSteps(src.foreign));
        b_1.store(storeSteps(src.incomming));
        b_1.store(storeSteps(src.local));
        b_0.storeRef(b_1.endCell());
    };
}
function loadSetStrategies(slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 3174462983) {
        throw Error('Invalid prefix');
    }
    let _chain_id = sc_0.loadIntBig(257);
    let _from_token = sc_0.loadIntBig(257);
    let _to_token = sc_0.loadIntBig(257);
    let sc_1 = sc_0.loadRef().beginParse();
    let _foreign = loadSteps(sc_1);
    let _incomming = loadSteps(sc_1);
    let _local = loadSteps(sc_1);
    return { $$type: 'SetStrategies', chain_id: _chain_id, from_token: _from_token, to_token: _to_token, foreign: _foreign, incomming: _incomming, local: _local };
}
function storeSetToken(src) {
    return (builder) => {
        let b_0 = builder;
        b_0.storeUint(679330248, 32);
        b_0.storeAddress(src.address);
        b_0.storeUint(src.decimals, 8);
        b_0.storeAddress(src.emmet_lp);
        b_0.storeStringRefTail(src.symbol);
        b_0.storeAddress(src.swap_pool);
        let b_1 = new core_1.Builder();
        b_1.storeAddress(src.swap_router);
        b_1.storeAddress(src.wallet);
        b_0.storeRef(b_1.endCell());
    };
}
function loadSetToken(slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 679330248) {
        throw Error('Invalid prefix');
    }
    let _address = sc_0.loadAddress();
    let _decimals = sc_0.loadUintBig(8);
    let _emmet_lp = sc_0.loadAddress();
    let _symbol = sc_0.loadStringRefTail();
    let _swap_pool = sc_0.loadAddress();
    let sc_1 = sc_0.loadRef().beginParse();
    let _swap_router = sc_1.loadAddress();
    let _wallet = sc_1.loadAddress();
    return { $$type: 'SetToken', address: _address, decimals: _decimals, emmet_lp: _emmet_lp, symbol: _symbol, swap_pool: _swap_pool, swap_router: _swap_router, wallet: _wallet };
}
function storeUnpause() {
    return (builder) => {
        let b_0 = builder;
        b_0.storeUint(2378902809, 32);
    };
}
function loadUnpause(slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2378902809) {
        throw Error('Invalid prefix');
    }
    return { $$type: 'Unpause' };
}
function storeUpdateChainFee(src) {
    return (builder) => {
        let b_0 = builder;
        b_0.storeUint(1453661226, 32);
        b_0.storeInt(src.chain_id, 257);
        b_0.storeUint(src.strategy_step, 8);
        b_0.storeInt(src.gas_amount, 257);
    };
}
function loadUpdateChainFee(slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1453661226) {
        throw Error('Invalid prefix');
    }
    let _chain_id = sc_0.loadIntBig(257);
    let _strategy_step = sc_0.loadUintBig(8);
    let _gas_amount = sc_0.loadIntBig(257);
    return { $$type: 'UpdateChainFee', chain_id: _chain_id, strategy_step: _strategy_step, gas_amount: _gas_amount };
}
function storeUpdateConsensusFee(src) {
    return (builder) => {
        let b_0 = builder;
        b_0.storeUint(4061306702, 32);
        b_0.storeInt(src.amount, 257);
    };
}
function loadUpdateConsensusFee(slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 4061306702) {
        throw Error('Invalid prefix');
    }
    let _amount = sc_0.loadIntBig(257);
    return { $$type: 'UpdateConsensusFee', amount: _amount };
}
function storeUpdateMinimumTxFee(src) {
    return (builder) => {
        let b_0 = builder;
        b_0.storeUint(2996339999, 32);
        b_0.storeInt(src.amount, 257);
    };
}
function loadUpdateMinimumTxFee(slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2996339999) {
        throw Error('Invalid prefix');
    }
    let _amount = sc_0.loadIntBig(257);
    return { $$type: 'UpdateMinimumTxFee', amount: _amount };
}
function storeUpdateProtocolFee(src) {
    return (builder) => {
        let b_0 = builder;
        b_0.storeUint(2604971543, 32);
        b_0.storeInt(src.amount, 257);
    };
}
function loadUpdateProtocolFee(slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2604971543) {
        throw Error('Invalid prefix');
    }
    let _amount = sc_0.loadIntBig(257);
    return { $$type: 'UpdateProtocolFee', amount: _amount };
}
function storeWithdrawGas(src) {
    return (builder) => {
        let b_0 = builder;
        b_0.storeUint(602125092, 32);
        b_0.storeInt(src.amount, 257);
    };
}
function loadWithdrawGas(slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 602125092) {
        throw Error('Invalid prefix');
    }
    let _amount = sc_0.loadIntBig(257);
    return { $$type: 'WithdrawGas', amount: _amount };
}
function storeToken(src) {
    return (builder) => {
        let b_0 = builder;
        b_0.storeAddress(src.address);
        b_0.storeUint(src.decimals, 8);
        b_0.storeAddress(src.emmet_lp);
        b_0.storeStringRefTail(src.symbol);
        b_0.storeAddress(src.swap_pool);
        let b_1 = new core_1.Builder();
        b_1.storeAddress(src.swap_router);
        b_1.storeAddress(src.wallet);
        b_0.storeRef(b_1.endCell());
    };
}
function loadToken(slice) {
    let sc_0 = slice;
    let _address = sc_0.loadAddress();
    let _decimals = sc_0.loadUintBig(8);
    let _emmet_lp = sc_0.loadAddress();
    let _symbol = sc_0.loadStringRefTail();
    let _swap_pool = sc_0.loadAddress();
    let sc_1 = sc_0.loadRef().beginParse();
    let _swap_router = sc_1.loadAddress();
    let _wallet = sc_1.loadAddress();
    return { $$type: 'Token', address: _address, decimals: _decimals, emmet_lp: _emmet_lp, symbol: _symbol, swap_pool: _swap_pool, swap_router: _swap_router, wallet: _wallet };
}
function loadGetterTupleToken(source) {
    let _address = source.readAddress();
    let _decimals = source.readBigNumber();
    let _emmet_lp = source.readAddress();
    let _symbol = source.readString();
    let _swap_pool = source.readAddress();
    let _swap_router = source.readAddress();
    let _wallet = source.readAddress();
    return { $$type: 'Token', address: _address, decimals: _decimals, emmet_lp: _emmet_lp, symbol: _symbol, swap_pool: _swap_pool, swap_router: _swap_router, wallet: _wallet };
}
function dictValueParserToken() {
    return {
        serialize: (src, builder) => {
            builder.storeRef((0, core_1.beginCell)().store(storeToken(src)).endCell());
        },
        parse: (src) => {
            return loadToken(src.loadRef().beginParse());
        }
    };
}
function storeChain(src) {
    return (builder) => {
        let b_0 = builder;
        b_0.storeStringRefTail(src.name);
        b_0.storeInt(src.chain_id, 257);
    };
}
function loadChain(slice) {
    let sc_0 = slice;
    let _name = sc_0.loadStringRefTail();
    let _chain_id = sc_0.loadIntBig(257);
    return { $$type: 'Chain', name: _name, chain_id: _chain_id };
}
function loadGetterTupleChain(source) {
    let _name = source.readString();
    let _chain_id = source.readBigNumber();
    return { $$type: 'Chain', name: _name, chain_id: _chain_id };
}
function dictValueParserChain() {
    return {
        serialize: (src, builder) => {
            builder.storeRef((0, core_1.beginCell)().store(storeChain(src)).endCell());
        },
        parse: (src) => {
            return loadChain(src.loadRef().beginParse());
        }
    };
}
function storeForeignFees(src) {
    return (builder) => {
        let b_0 = builder;
        b_0.storeDict(src.i, core_1.Dictionary.Keys.BigInt(257), core_1.Dictionary.Values.BigInt(257));
    };
}
function loadForeignFees(slice) {
    let sc_0 = slice;
    let _i = core_1.Dictionary.load(core_1.Dictionary.Keys.BigInt(257), core_1.Dictionary.Values.BigInt(257), sc_0);
    return { $$type: 'ForeignFees', i: _i };
}
function dictValueParserForeignFees() {
    return {
        serialize: (src, builder) => {
            builder.storeRef((0, core_1.beginCell)().store(storeForeignFees(src)).endCell());
        },
        parse: (src) => {
            return loadForeignFees(src.loadRef().beginParse());
        }
    };
}
function storeSteps(src) {
    return (builder) => {
        let b_0 = builder;
        b_0.storeDict(src.path, core_1.Dictionary.Keys.BigInt(257), core_1.Dictionary.Values.BigInt(257));
        b_0.storeInt(src.size, 257);
    };
}
function loadSteps(slice) {
    let sc_0 = slice;
    let _path = core_1.Dictionary.load(core_1.Dictionary.Keys.BigInt(257), core_1.Dictionary.Values.BigInt(257), sc_0);
    let _size = sc_0.loadIntBig(257);
    return { $$type: 'Steps', path: _path, size: _size };
}
function loadGetterTupleSteps(source) {
    let _path = core_1.Dictionary.loadDirect(core_1.Dictionary.Keys.BigInt(257), core_1.Dictionary.Values.BigInt(257), source.readCellOpt());
    let _size = source.readBigNumber();
    return { $$type: 'Steps', path: _path, size: _size };
}
function storeStrategies(src) {
    return (builder) => {
        let b_0 = builder;
        b_0.store(storeSteps(src.foreign));
        b_0.store(storeSteps(src.incomming));
        b_0.store(storeSteps(src.local));
    };
}
function loadStrategies(slice) {
    let sc_0 = slice;
    let _foreign = loadSteps(sc_0);
    let _incomming = loadSteps(sc_0);
    let _local = loadSteps(sc_0);
    return { $$type: 'Strategies', foreign: _foreign, incomming: _incomming, local: _local };
}
function loadGetterTupleStrategies(source) {
    const _foreign = loadGetterTupleSteps(source);
    const _incomming = loadGetterTupleSteps(source);
    const _local = loadGetterTupleSteps(source);
    return { $$type: 'Strategies', foreign: _foreign, incomming: _incomming, local: _local };
}
function dictValueParserStrategies() {
    return {
        serialize: (src, builder) => {
            builder.storeRef((0, core_1.beginCell)().store(storeStrategies(src)).endCell());
        },
        parse: (src) => {
            return loadStrategies(src.loadRef().beginParse());
        }
    };
}
function storeToTokenMap(src) {
    return (builder) => {
        let b_0 = builder;
        b_0.storeDict(src.i, core_1.Dictionary.Keys.BigInt(257), dictValueParserStrategies());
    };
}
function loadToTokenMap(slice) {
    let sc_0 = slice;
    let _i = core_1.Dictionary.load(core_1.Dictionary.Keys.BigInt(257), dictValueParserStrategies(), sc_0);
    return { $$type: 'ToTokenMap', i: _i };
}
function dictValueParserToTokenMap() {
    return {
        serialize: (src, builder) => {
            builder.storeRef((0, core_1.beginCell)().store(storeToTokenMap(src)).endCell());
        },
        parse: (src) => {
            return loadToTokenMap(src.loadRef().beginParse());
        }
    };
}
function storeFromTokenMap(src) {
    return (builder) => {
        let b_0 = builder;
        b_0.storeDict(src.i, core_1.Dictionary.Keys.BigInt(257), dictValueParserToTokenMap());
    };
}
function loadFromTokenMap(slice) {
    let sc_0 = slice;
    let _i = core_1.Dictionary.load(core_1.Dictionary.Keys.BigInt(257), dictValueParserToTokenMap(), sc_0);
    return { $$type: 'FromTokenMap', i: _i };
}
function dictValueParserFromTokenMap() {
    return {
        serialize: (src, builder) => {
            builder.storeRef((0, core_1.beginCell)().store(storeFromTokenMap(src)).endCell());
        },
        parse: (src) => {
            return loadFromTokenMap(src.loadRef().beginParse());
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
function loadGrantRole(slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 174185305) {
        throw Error('Invalid prefix');
    }
    let _to = sc_0.loadAddress();
    let _role_id = sc_0.loadIntBig(257);
    return { $$type: 'GrantRole', to: _to, role_id: _role_id };
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
        throw Error('Invalid prefix');
    }
    let _role_id = sc_0.loadIntBig(257);
    let _address = sc_0.loadAddress();
    return { $$type: 'RenounceRole', role_id: _role_id, address: _address };
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
        throw Error('Invalid prefix');
    }
    let _to = sc_0.loadAddress();
    let _role_id = sc_0.loadIntBig(257);
    return { $$type: 'RevokeRole', to: _to, role_id: _role_id };
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
    return { $$type: 'RoleData', roles: _roles, admin_role: _admin_role };
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
        throw Error('Invalid prefix');
    }
    let _role_id = sc_0.loadIntBig(257);
    let _role_admin = sc_0.loadIntBig(257);
    return { $$type: 'UpdateRoleAdmin', role_id: _role_id, role_admin: _role_admin };
}
function storeEmmetBridge$Data(src) {
    return (builder) => {
        let b_0 = builder;
        b_0.storeAddress(src.admin);
        b_0.storeAddress(src.cfo);
        b_0.storeDict(src.chains, core_1.Dictionary.Keys.BigInt(257), dictValueParserChain());
        b_0.storeInt(src.chainId, 257);
        let b_1 = new core_1.Builder();
        b_1.storeInt(src.consensus_fee, 257);
        b_1.storeDict(src.foreign_fees, core_1.Dictionary.Keys.BigInt(257), dictValueParserForeignFees());
        b_1.storeDict(src.incomming_txs, core_1.Dictionary.Keys.BigInt(257), core_1.Dictionary.Values.Bool());
        b_1.storeDict(src.locked, core_1.Dictionary.Keys.BigInt(257), core_1.Dictionary.Values.BigInt(257));
        b_1.storeInt(src.min_tx_fee, 257);
        let b_2 = new core_1.Builder();
        b_2.storeDict(src.modules, core_1.Dictionary.Keys.BigInt(257), core_1.Dictionary.Values.Address());
        b_2.storeInt(src.nonce, 257);
        b_2.storeBit(src.paused);
        b_2.storeInt(src.protocol_fee, 257);
        b_2.storeDict(src.roles, core_1.Dictionary.Keys.BigInt(257), dictValueParserRoleData());
        b_2.storeDict(src.token_strategies, core_1.Dictionary.Keys.BigInt(257), dictValueParserFromTokenMap());
        b_2.storeInt(src.threshold, 257);
        let b_3 = new core_1.Builder();
        b_3.storeDict(src.tokens, core_1.Dictionary.Keys.BigInt(257), dictValueParserToken());
        b_3.storeInt(src.TVL, 257);
        b_3.storeDict(src.validators, core_1.Dictionary.Keys.BigInt(257), core_1.Dictionary.Values.Address());
        b_3.storeInt(src.validator_count, 257);
        b_2.storeRef(b_3.endCell());
        b_1.storeRef(b_2.endCell());
        b_0.storeRef(b_1.endCell());
    };
}
function loadEmmetBridge$Data(slice) {
    let sc_0 = slice;
    let _admin = sc_0.loadAddress();
    let _cfo = sc_0.loadAddress();
    let _chains = core_1.Dictionary.load(core_1.Dictionary.Keys.BigInt(257), dictValueParserChain(), sc_0);
    let _chainId = sc_0.loadIntBig(257);
    let sc_1 = sc_0.loadRef().beginParse();
    let _consensus_fee = sc_1.loadIntBig(257);
    let _foreign_fees = core_1.Dictionary.load(core_1.Dictionary.Keys.BigInt(257), dictValueParserForeignFees(), sc_1);
    let _incomming_txs = core_1.Dictionary.load(core_1.Dictionary.Keys.BigInt(257), core_1.Dictionary.Values.Bool(), sc_1);
    let _locked = core_1.Dictionary.load(core_1.Dictionary.Keys.BigInt(257), core_1.Dictionary.Values.BigInt(257), sc_1);
    let _min_tx_fee = sc_1.loadIntBig(257);
    let sc_2 = sc_1.loadRef().beginParse();
    let _modules = core_1.Dictionary.load(core_1.Dictionary.Keys.BigInt(257), core_1.Dictionary.Values.Address(), sc_2);
    let _nonce = sc_2.loadIntBig(257);
    let _paused = sc_2.loadBit();
    let _protocol_fee = sc_2.loadIntBig(257);
    let _roles = core_1.Dictionary.load(core_1.Dictionary.Keys.BigInt(257), dictValueParserRoleData(), sc_2);
    let _token_strategies = core_1.Dictionary.load(core_1.Dictionary.Keys.BigInt(257), dictValueParserFromTokenMap(), sc_2);
    let _threshold = sc_2.loadIntBig(257);
    let sc_3 = sc_2.loadRef().beginParse();
    let _tokens = core_1.Dictionary.load(core_1.Dictionary.Keys.BigInt(257), dictValueParserToken(), sc_3);
    let _TVL = sc_3.loadIntBig(257);
    let _validators = core_1.Dictionary.load(core_1.Dictionary.Keys.BigInt(257), core_1.Dictionary.Values.Address(), sc_3);
    let _validator_count = sc_3.loadIntBig(257);
    return { $$type: 'EmmetBridge$Data', admin: _admin, cfo: _cfo, chains: _chains, chainId: _chainId, consensus_fee: _consensus_fee, foreign_fees: _foreign_fees, incomming_txs: _incomming_txs, locked: _locked, min_tx_fee: _min_tx_fee, modules: _modules, nonce: _nonce, paused: _paused, protocol_fee: _protocol_fee, roles: _roles, token_strategies: _token_strategies, threshold: _threshold, tokens: _tokens, TVL: _TVL, validators: _validators, validator_count: _validator_count };
}
function initEmmetBridge_init_args(src) {
    return (builder) => {
        let b_0 = builder;
        b_0.storeAddress(src.admin);
        b_0.storeAddress(src.cfo);
        b_0.storeAddress(src.validator);
    };
}
async function EmmetBridge_init(admin, cfo, validator) {
    const __code = core_1.Cell.fromBase64('te6ccgICASAAAQAAUj8AAAEU/wD0pBP0vPLICwABAgFiAAIAAwPu0AHQ0wMBcbCjAfpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IhUUFMDbwT4YQL4Yts8ERMRFRETERIRFBESERERExERERAREhEQDxERDw4REA5VHds88uCCyPhDAcx/AcoAERQRExESEREREFXg2zzJ7VQBBgAsAC0CASAABAAFAgEgAAYABwIBIAAaABsCASAAzgDPAgEgAAgACQIBIAAKAAsCASAAEgATAgFIAAwADQIBIAAOAA8CaKmM2zwRExEWERMREhEVERIREREUEREREBETERAPERIPDhERDg0REA0QzxC+VSrbPGzGbIYBBgDUAgFYANUA1gIZr0/tnm2eK4gvh7YgwAEGANgCASAAEAARAhiou9s82zxXEF8PbEEBBgEXAgN6oADZANoCAVgAFAAVAgEgABYAFwJUqR/bPBETERQRExESERMREhERERIREREQEREREA8REA9VDts8VxBfD2xBAQYA3QJyqWfbPBETERYRExESERUREhERERQREREQERMREA8REg8OEREODREQDRDPEL5VKts8VxJXEF8PbCIyAQYA3gIBWAAYABkCAVgA5QDmAhel07Z5tniuIL4e2IMBBgDfAk+mU7Z4IiYiKCImIiQiJiIkIiIiJCIiIiAiIiIgHiIgHqodtnjZztjPAQYA4AIBIAAcAB0CASAAIAAhAgEgAB4AHwIDeyAA7gDvAhmyA/bPNs8VxBfD2xBgAQYA6QIBIADqAOsCASAAIgAjAgEgAP0A/gIBSAAkACUCAVgAKgArABCqvu1E0NIAAQIBIAAmACcCF6fBtnm2eK4gvh7YgwEGAPICAVgAKAApAlm6bbPBETERQRExESERMREhERERIREREQEREREA8REA9VDts8VxJXEF8PbCIygBBgDzAnG+vbPBETERYRExESERUREhERERQREREQERMREA8REg8OEREODREQDRDPEL5VKts8VxJXEF8PbCIygBBgD0AhirvNs82zxXEF8PbEEBBgEfAmyrt9s8ERMRFhETERIRFRESERERFBERERARExEQDxESDw4REQ4NERANEM8QvlUq2zxXEF8PbEEBBgD1BPABkjB/4HAh10nCH5UwINcLH94gghDVMnbbuo4UMNMfAYIQ1TJ227ry4IHTPwExMH/gIIIQONRGPrqPKjDTHwGCEDjURj668uCB2zwH1AHQ9ASBAQHXANP/gQEB1wAwEEtsG9s8f+AgghDrEm3LuuMCIIIQe92X3roALgAvADAAMQH0AREUARETINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WARERINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WH/QAHYEBAc8AC8iBAQHPABr0ABj0ABb0ABSBAQHPAALI9ACBAQHPABLKABKBAQHPABL0ABIANgB+0x8BghBduHODuvLggdM/0z/6AIEBAdcA1NT6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIFxYVFEMwA/IyERMRHRETERIRHBESERERGxERERARGhEQDxEZDw4RGA4NERcNDBEWDAsRFQsKERQKCREdCQgRHAgHERsHBhEaBgURGQUEERgEAxEXAwIRFgIBERUBERTbPIEe+Smz8vRWHQFWHQFWHQERHVYcVhxWHMhVYNs8yfkAADcAOAA5ATgw0x8BghDrEm3LuvLggdM/1NTU+gBVQGwV2zx/AFEE0o8IMNs8bBbbPH/gIIIQc2LQnLqOuDDTHwGCEHNi0Jy68uCB0z/6APpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IhUEwMQI2wU4CDAACLXScEhsJhbMvgnbxACf+AgghASaI72ugAyADMANAA1ALLTHwGCEHvdl9668uCB0z/6APpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgB+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiAH6AFFVFRRDMAHyNV8DERMRFRETERIRFBESERERFRERERARFBEQDxEVDw4RFA4NERUNDBEUDAsRFQsKERQKCREVCQgRFAgHERUHBhEUBgURFQUEERQEAxEVAwIRFAIBERUBERSBHvkps/L0gTxuyMnQVhcB+QEB+QG98vQRFdM/IVYSugBXAtwxMhETERURExESERQREhERERUREREQERQREA8RFQ8OERQODREVDQwRFAwLERULChEUCgkRFQkIERQIBxEVBwYRFAYFERUFBBEUBAMRFQMCERQCAREVAREUgR75KbPy9MjJ0FYWAfkBAfkBuuMPfwBdAF4E6o6YMNMfAYIQEmiO9rry4IGBAQHXAAEx2zx/4CCCEN3Dy3C6jpgw0x8BghDdw8twuvLggYEBAdcAATHbPH/gIIIQZpkfxLqOpDDTHwGCEGaZH8S68uCBgQEB1wCBAQHXAIEBAdcAVSBsE9s8f+AgghBmCXXQugBxAHIAcwB0AEj0ABOBAQHPAAPI9AAUgQEBzwAV9AATgQEBzwDJWMzJWMzJAcwC0iYREhEUERIRERETEREREBEUERAPERMPDhEUDg0REw0MERQMCxETCwoRFAoJERMJCBEUCAcREwcGERQGBRETBQQRFAQDERMDAhEUAgEREwERFIEBAREU2zwCERYCAREVAVn0DW+hkjBt3wEfADoAcoIQXbhzg1AIyx8Wyz8Uyz9Y+gKBAQHPAMzMASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFgHEggDiAxEVIboBERUB8vSBNXcRGlYUgQEBLwJxQTP0DG+hlAHXADCSW23iIG6SMHCVIG7y0IDiswERGwHy9BESERQREhERERMREREQERIREA8REQ8OERAOVR0BERkBVhkBERYAOwDUIG6SMG2d0PQEgQEB1wBZbBJvAuKBHughbrPy9CBu8tCAbyIwgQEL+EFvJBAjXwNxQTP0Cm+hlAHXADCSW23igT11IW6zmAEgbvLQgMD/kjFw4vL0ERERExERERAREhEQDxERDw4REA5VHQH6cCGBAQH0hW+lIJESlTFtMm0B4pCOTiBukjBtnNDUAdAB0/9ZbBJvAuIgbvLQgG8iJ4EBASJZ9AxvoZIwbd9us5klWfkQkwGkAd6RW+KBAQEjAln0eG+lIJQC1DBYlTFtMm0B4ugQI18DgV2XMia+8vRWF9DT/zBWF9DT/zAAPAL6ERURFhEVERQRFREUERMRFBETERIRExESEREREhERERAREREQDxEQDxDvEN4QzRC8EKsQmhCJEHgQZxBWEEUQNBAjAhEdAlYbVhjbPB2BAQEBERh/cSFulVtZ9FowmMgBzwBBM/RC4gURGQUEERcEAxEVAwIRFAIBERgBERMAPQA+AcgRFREYERURFBEXERQRExEWERMREhEYERIREREXEREREBEWERAPERgPDhEXDg0RFg0MERgMCxEXCwoRFgoJERgJCBEXCAcRFgcGERgGBREXBQQRFgQDERgDAhEXAgERFgERGFYXAD8BgshVUNs8yciCWMAAAAAAAAAAAAAAAAEBy2fMyXD7AAwREwwLERILChERCgkREAkQjxB+EFwQSxA6SYcQVgNQVUQUAFAC5oEBAVRJFFn0DW+hkjBt3yBukjBtl9D0BAExbwHiIG6YXwNtcFRxASHjDltsIoEfkwHDAPL0gQEBVFEAWfSEb6UgllAj1wAwWJZsIW0ybQHikIroXwNXFFcUVxQREBETERAPERIPDhERDg0REA0QzxC+VSoA+ABAA/IRExEWERMREhEVERIREREUEREREBEWERAPERUPDhEUDg0RFg0MERUMCxEUCwoRFgoJERUJCBEUCAcRFgcGERUGBREUBQQRFgQDERUDAhEUAgERFgERFVYVggCZXCHCApMBwQuSMXDi8vRWFcAG4w+BAQEgVhYDERgBAEEAQgBDArxXFVYXgvAaQhn+XmDWOvKjzH3Ob+xptFxrVxhJemFI58IyrIe9irqOs4IAlqz4QW8kE18DLKcDvvL0ERIRExESEREREhERERAREREQDxEQD1UOERRWF1YXVhrbPOMNAEQARQLOVhXABI7fERXACI6zggCWrPhBbyQTXwMsqgC+8vQREhETERIRERESEREREBERERAPERAPVQ4RFFYXVhdWGts8jiOBH5Py8BETERQRExESERMREhERERIREREQEREREA8REA9VDuLjDQBKAEsAtEEz9HhvpSCWUCPXADBYlmwhbTJtAeIRFREXERURFBEWERQRExEVERMREhEUERIRERETEREREBESERAPEREPDhEQDhDfEM4QvRCsEJsQihB5EGgQVxBGEDUQNASOgQEBVEcUWfQNb6GSMG3fIG6SMG2Oh9DbPGwXbwfiIG7y0IBvJ2xhf3NWEKoAbXCIVhJRWRBZBBA6UKLIVWDbPMkUE0EwbW0A4QBGAEcATwKQggCWrPhBbyQTXwMsc6kEvvL0ERIRExESEREREhERERAREREQDxEQD1UOERRWFlYZiH9zJIIB5GCgEDRBMEADBG1t2zwwE6ECAEkAvwA6AAAAAEVtbWV0QnJpZGdlOiBUb2tlbiBVTkxPQ0sB7IIQD4p+pVAIyx8Wyz9QBPoCWCDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFgEgbpUwcAHLAY4eINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLg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ERERExERERAREhEQDxERDw4REA5VHQH4ERXUMCBujhswVxMRERETEREREBESERAPEREPDhEQDhDfVRzgIG7y0IDQ0z8hVhK6jhtbVxMRERETEREREBESERAPEREPDhEQDhDfVRzg1NTUMCLQ0/8wIdDT/zARExEYERMREhEXERIREREWEREREBEVERAPERQPDhEYDgBfAXgNERcNDBEWDAsRFQsKERQKCREYCQgRFwgHERYHBhEVBgURFAUEERgEAxEXAwIRFgIBERUBERpWFFYWVhwAYAP+gQEBVhVAFFn0DW+hkjBt3yBukjBtn9DUAdABgQEB1wBZbBJvAuKBQ/EBbrPy9IEBASYCWfQNb6GSMG3fIG6SMG2Oh9DbPGwXbwfigUWZAW6z8vSBAQElAln0DW+hkjBt3yBukjBtjofQ2zxsF28H4oIAq6EBbrPy9COBAQFWFwDhAOEAYQTuWfQNb6GSMG3fIG6SMG2Oh9DbPGwXbwfigV3PASBu8tCAbydsYfhBbyQQI18DxwXy9BETERURExESERQREhERERMREREQERIREA8REQ8OERAOVR1mERtWGts8BBEXBAMRFQMpAwIRGQIBERcBERVaFRTIVVDbPMkA4QBiAGMAZAG4ERMRFxETERIRFhESERERFRERERARFBEQDxEXDw4RFg4NERUNDBEUDAsRFwsKERYKCREVCQgRFAgHERcHBhEWBgURFQUEERQEAxEXAwIRFgIBERUBERRWF1YXVhcAZQAsghBjxJ9XUAfLHxXL/1AD+gLMzMzLPwB8yIJYwAAAAAAAAAAAAAAAAQHLZ8zJcPsADhETDg0REg0MEREMCxEQCxCvEJ4QjRB8EGsQWhBJEDhHFVBiExQD/IEBAVRJFFn0DW+hkjBt3yBukjBtl9D0BAExbwHiIG6YXwNtcFRxASHjDmxCggCIzQHDAPL0ERQRFREUERMRFBETERIRExESEREREhERERAREREQDxEQDxDvEN4QzRC8EKsQmhCJEHgQZxBWEEUQNEEwAREYAVYXAREX2zwKpAD4APYAZgF+gQEBIFYXWVn0hG+lIJZQI9cAMFiWbCFtMm0B4pCK6Fs6VxRXFFcUERARExEQDxESDw4REQ4NERANEM8QvlUqAGcD5hETERYRExESERUREhERERQREREQERYREA8RFQ8OERQODREWDQwRFQwLERQLChEWChApCBEUCAcRFgcQJgURFAUEERYEECMCERQCAREWAREUVhSCAJlcIcICkwHBC5IxcOLy9FYUwAPjD4EBASBWGAMRGAEAaABpAGoBulcUVheC8BpCGf5eYNY68qPMfc5v7Gm0XGtXGEl6YUjnwjKsh72Kuo4yggCWrPhBbyQTXwNWGlYXoC2gvvL0ERIRExESEREREhERERAREREQDxEQD1UOVhgToALjDgBrAdJWFMAFjjpXFIIAlqz4QW8kE18DLKcDVhcBoL7y9BESERMREhERERIREREQEREREA8REA9VDlYXVhlbggDPOvLwjqYRFMAHjh6CAIjN8vAREhETERIRERESEREREBERERAPERAPVQ7jDeIAbACwQTP0eG+lIJZQI9cAMFiWbCFtMm0B4hEVERcRFREUERYRFBETERURExESERQREhERERMREREQERIREA8REQ8OERAOEN8QzhDNEKwQmxCKEHkQaBBXEEYQNQDiggCWrPhBbyQTXwMsqgBWFwGgvvL0ERIRExESEREREhERERAREREQDxEQD1UOVhdWGYEBAVRfAFJAQTP0DG+hlAHXADCSW23iIG6RMJYgbvLQgKDigQEBIAQREARDMCFulVtZ9FowmMgBzwBBM/RC4gwCuFYXgvAaQhn+XmDWOvKjzH3Ob+xptFxrVxhJemFI58IyrIe9irqOs4IAlqz4QW8kE18DLKcDVhcBoL7y9BESERMREhERERIREREQEREREA8REA9VDlYXVhnbPOMNAG0AbgLkgQEBVEYTWfQNb6GSMG3fIG6SMG2Oh9DbPGwXbwfiICBu8tCAbydsYQEgbvLQgG8nEEZfBo0IYAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABCLHBbPy5UTIghAPin6lAcsfUtDLP1AD+gIiAOEAbwFeggCWrPhBbyQTXwNWGlYXoC2gvvL0ERIRExESEREREhERERAREREQDxEQD1UOVhgAcAGuINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WWCDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFm0B9AAt+gJtAfQAyS2qAAJzWX9ENG1t2zwwAL8CsiSBAQGC8BpCGf5eYNY68qPMfc5v7Gm0XGtXGEl6YUjnwjKsh72KWfQNb6GSMG3fIG6SMG2Oh9DbPGwXbwfiIG7y0IBvJxBGXwYtqwASoHNYf0EzbW1t2zwwAOEAvwLuERMRFBETERIRFBESERERFBERERARFBEQDxEUDw4RFA4NERQNDBEUDAsRFAsKERQKCREUCREUCAcGVUDbPFYUVhKBAQEiWfQNb6GSMG3fIG6SMG2f0NQB0AGBAQHXAFlsEm8C4m6zmwEREoEBAfRaMBERkTDiERQAxQB1A/ARExEUERMREhEUERIREREUEREREBEUERAPERQPDhEUDg0RFA0MERQMCxEUCwoRFAoJERQJERQIBwZVQNs8VhTbPBEUyAGCEN3Dy3BYyx+BAQHPAMnIgljAAAAAAAAAAAAAAAABActnzMlw+wAREhETERIRERESEREAxQB2AHcD1BETERYRExESERUREhERERQREREQERYREA8RFQ8OERQODREWDQwRFQwLERQLChEWCgkRFQkIERQIBxEWBwYRFQYFERQFBBEWBAMRFQMCERQCAREWAREV2zxWFFYXVhfbPAIRFAIBERYBERUAxQB4AHkEzI6VMNMfAYIQZgl10Lry4IHUAdAx2zx/4CCCEHR/dSe6jrEw0x8BghB0f3UnuvLggfpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4Igx2zx/4CCCEHpFCNm64wIgghChvDZiugB7AHwAfQB+AILIAYIQEmiO9ljLH4EBAc8AyciCWMAAAAAAAAAAAAAAAAEBy2fMyXD7ABESERMREhERERIREREQEREREA8REA9VDgHwERMRFBETERIRFBESERERFBERERARFBEQDxEUDw4RFA4NERQNDBEUDAsRFAsKERQKCREUCREUCAcGVUBWFIIAmVwhwgKTAcELkjFw4vL0KoEBAVYWWfQMb6GSMG3fbrOeAREUAQqBAQH0WjAJEROSVxTiERIRExESAMwAGBEQEREREA8REA9VDgG8KIEBASRZ9A1voZIwbd8gbpIwbZfQ9AQBMW8B4iBukl8E4CAgbvLQgG8hASBu8tCAbyGBAQEkWfQNb6GSMG3fIG6SMG2X0PQEATFvAeIgbpJfBeAgbvLQgG8hgQEBbQB6AJjIVSCCEGaZH8RQBMsfEoEBAc8AgQEBzwCBAQHPAMnIgljAAAAAAAAAAAAAAAABActnzMlw+wAREBETERAPERIPDhERDg0REA0Qz1UrAO4gbpIwbY4oIG7y0IBvJshVUEZUAvQAgQEBzwBAFAL0AIEBAc8AAgL0AIEBAc8AyeJBMBQgbpUwWfRaMJRBM/QV4oEBAQHIAQH0AMlBMCBulTBZ9FowlEEz9BXigQEBAcgBAfQAyRA4EiBulTBZ9FowlEEz9BXiBQPeERMRFBETERIRFBESERERFBERERARFBEQDxEUDw4RFA4NERQNDBEUDAsRFAsKERQKCREUCREUCAcGVUDbPFYU+QIkgQEBIln0DW+hkjBt3yBukjBtjofQ2zxsF28H4m6zmVAEgQEB9FowA5Ew4hEUAMUA4QB/BPQRExEUERMREhEUERIREREUEREREBEUERAPERQPDhEUDg0RFA0MERQMCxEUCwoRFAoJERQJERQIBwZVQNs8VhQg2zz5AiOBAQEiWfQMb6GSMG3fIiFukltwkscF4pFb4w1WE1YTVhNWE1YTVhNWE1YTVhNWE1YTVhNWEwDFARkAgACBAXww0x8BghB6RQjZuvLggW0xMNs8KLOSfzneyItlBhdXNlZIzxbJyIJYwAAAAAAAAAAAAAAAAQHLZ8zJcPsAfwDFBNyOsTDTHwGCEKG8NmK68uCB+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiDHbPH/gIIIQzHfOY7qOnTDTHwGCEMx3zmO68uCB1AHQAYEBAdcAWWwS2zx/4CCCENMp7oO64wIgghB8ht5iugCGAIcAiACJAIbIAYIQZgl10FjLH8hYzxbJAczJyIJYwAAAAAAAAAAAAAAAAQHLZ8zJcPsAERIRExESEREREhERERAREREQDxEQD1UOAfxQA4EBAfRaMAGlERMRFBETERIRFBESERERFBERERARFBEQDxEUDw4RFA4NERQNDBEUDAsRFAsKERQKCREUCQgRFAgHERQHBhEUBgURFAUEERQEAxEUAwIRFAI0I6oAc6kEBFYTVhNWE1YTVhNWE1YTVhNWE1YTVhNWE1YTVhMAggLcVhNWE1YTVhNWE1YTVhMRExEnERMREhEmERIRERElEREREBEkERAPESMPDhEiDg0RIQ0MESAMCxEfCwoRHgoJER0JCBEcCAcRGwcGERoGBREZBQQRGAQDERcDAhEWAgERFQERFNs8VxBfD2xBVhUBHwCEAvhWE1YTVhNWE1YTVhMRExEnERMREhEmERIRERElEREREBEkERAPESMPDhEiDg0RIQ0MESAMCxEfCwoRHgoJER0JCBEcCAcRGwcGERoGBREZBQQRGAQDERcDAhEWAgERFQERFNs8VxBfD2xBERQRFREUERMRFBETERIRExESAR8AgwD6EREREhERERAREREQDxEQD1UOKIEBASNZ9A1voZIwbd8gbpIwbZ3Q9ASBAQHXAFlsEm8C4oELbyFus/L0IG7y0IBvIoEBC1ADcHEhbpVbWfRZMJjIAc8AQTP0QeKBAQECyFkC9ACBAQHPAMkQORIgbpUwWfRaMJRBM/QV4gYB2iiBAQEjWfQNb6GSMG3fIG6SMG2d0PQEgQEB1wBZbBJvAuKBC28hbrPy9CBu8tCAbyKBAQtQA3BxIW6VW1n0WTCYyAHPAEEz9EHigQEBAshZAvQAgQEBzwDJEDkSIG6VMFn0WjCUQTP0FeIGERQAhQC2yAGCEHR/dSdYyx8BINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WyciCWMAAAAAAAAAAAAAAAAEBy2fMyXD7ABESERMREhERERIREREQEREREA8REA9VDgLuERMRFBETERIRFBESERERFBERERARFBEQDxEUDw4RFA4NERQNDBEUDAsRFAsKERQKCREUCREUCAcGVUDbPFYTVhNWE1YTVhNWE1YTVhNWE1YTVhNWE1YTVhNWE1YTVhNWE1YTVhMRExEnERMREhEmERIRERElEREAxQCKArgRExEVERMREhEUERIREREVEREREBEUERAPERUPDhEUDg0RFQ0MERQMCxEVCwoRFAoJERUJCBEUCAcRFQcGERQGBREVBQQRFAQDERUDAhEUAgERFQERFNs8VhVWFQDFAI8BYjDTHwGCENMp7oO68uCB+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiDHbPH8AkASsjrgw0x8BghB8ht5iuvLggYEBAdcA+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiBJsEts8f+AgghC9NnYHuo8IMNs8bBnbPH/gIIIQKH3ByLoAlgCXAJgAmQKcERARJBEQDxEjDw4RIg4NESENDBEgDAsRHwsKER4KCREdCQgRHAgHERsHBhEaBgURGQUEERgEAxEXAwIRFgIBERUBERTbPFcQXw9sQVYVARcAiwL+KIEBASNZ9A1voZIwbd8gbpIwbZ3Q9ASBAQHXAFlsEm8C4iBu4wAgbvLQgG8igQELUAN/cSFulVtZ9FkwmMgBzwBBM/RB4oEBAQLIWQL0AIEBAc8AyRA5EiBulTBZ9FowlEEz9BXiBlYTVhNWE1YTVhNWE1YTVhNWE1YTVhNWEwEWAIwC3lYTVhNWE1YTVhNWE1YTVhMRExEnERMREhEmERIRERElEREREBEkERAPESMPDhEiDg0RIQ0MESAMCxEfCwoRHgoJER0JCBEcCAcRGwcGERoGBREZBQQRGAQDERcDAhEWAgERFQERFNs8VxBfD2wxAQEXAI0B3iiBAQEjWfQNb6GSMG3fIG6SMG2d0PQEgQEB1wBZbBJvAuKBC28hbrPy9CBu8tCAbyKBAQtQA3BxIW6VW1n0WTCYyAHPAEEz9EHigQEBAshZAvQAgQEBzwDJEDkSIG6VMFn0WjCUQTP0FeIGVxNWEwCOAKrIAYIQobw2YljLHwEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxbJyIJYwAAAAAAAAAAAAAAAAQHLZ8zJcPsAEREREhERERAREREQDxEQD1UOAOqBAQFRIchZyFjPFslYzIEBAc8AyQMRFAMgbpUwWfRaMJRBM/QV4hERAREVAREUyFmCEMx3zmNQA8sfyFjPFskBzIEBAc8AyciCWMAAAAAAAAAAAAAAAAEBy2fMyXD7ABERERMREREQERIREA8REQ8OERAOVR0C7hETERQRExESERQREhERERQREREQERQREA8RFA8OERQODREUDQwRFAwLERQLChEUCgkRFAkRFAgHBlVA2zxWE1YTVhNWE1YTVhNWE1YTVhNWE1YTVhNWE1YTVhNWE1YTVhNWE1YTERMRJxETERIRJhESERERJRERAMUAkQKcERARJBEQDxEjDw4RIg4NESENDBEgDAsRHwsKER4KCREdCQgRHAgHERsHBhEaBgURGQUEERgEAxEXAwIRFgIBERUBERTbPFcQXw9sQVYVAQ8AkgL+KIEBASNZ9A1voZIwbd8gbpIwbZ3Q9ASBAQHXAFlsEm8C4iBu4wAgbvLQgG8igQELUAN/cSFulVtZ9FkwmMgBzwBBM/RB4oEBAQLIWQL0AIEBAc8AyRA5EiBulTBZ9FowlEEz9BXiBlYTVhNWE1YTVhNWE1YTVhNWE1YTVhNWEwEWAJMC3FYTVhNWE1YTVhNWE1YTVhMRExEnERMREhEmERIRERElEREREBEkERAPESMPDhEiDg0RIQ0MESAMCxEfCwoRHgoJER0JCBEcCAcRGwcGERoGBREZBQQRGAQDERcDAhEWAgERFQERFNs8VxBfDzRbAQ8AlAHeKIEBASNZ9A1voZIwbd8gbpIwbZ3Q9ASBAQHXAFlsEm8C4oELbyFus/L0IG7y0IBvIoEBC1ADcHEhbpVbWfRZMJjIAc8AQTP0QeKBAQECyFkC9ACBAQHPAMkQORIgbpUwWfRaMJRBM/QV4gZXElYTAJUAqsgBghDTKe6DWMsfASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFsnIgljAAAAAAAAAAAAAAAABActnzMlw+wAREhETERIREBERERAPERAPVQ4DyBETERURExESERQREhERERUREREQERQREA8RFQ8OERQODREVDQwRFAwLERULChEUCgkRFQkIERQIBxEVBwYRFAYFERUFBBEUBAMRFQMCERQCAREVAREU2zxWFVYV2zwBERUBERQAxQCaAJsAiNMfAYIQvTZ2B7ry4IGBAQHXAIEBAdcAgQEB1wDUAdD0BIEBAdcAWQL0BIEBAdcAWQL0BIEBAdcAWTIQaRBoEGcQRUMAA/ARExEcERMREhEbERIREREaEREREBEZERAPERgPDhEXDg0RFg0MERUMCxEUCwoRHAoJERsJCBEaCAcRGQcGERgGBREXBQQRFgQDERUDAhEUAgERHAERG9s8VhpWGlYaVhpWGlYaVhpWI1Yj2zwIERoIBxEZBwYRGAYAxQCdAJ4Eno8IMNs8bBfbPH/gIIIQYpXYj7qOsTDTHwGCEGKV2I+68uCB+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiDHbPH/gIIIQjcstGboAoQCiAKMApAHqERMRFRETERIRFBESERERFRERERARFBEQDxEVDw4RFA4NERUNDBEUDAsRFQsKERQKCREVCQgRFAgHERUHBhEUBgURFQUEERQEAxEVAwIRFAIBERUBERRWFYIAmVwhwgKTAcELkjFw4vL0ECqBAQECAREWAREVAJwAvshZghB8ht5iUAPLH4EBAc8AASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFsnIgljAAAAAAAAAAAAAAAABActnzMlw+wARERETEREREBESERAPEREPDhEQDlUdAHIgbpUwWfRaMJRBM/QU4hERERMREREQERIREA8REQ8OERAOEN8QzhC9EKwQmwoQeRBoEFcQRhA1RAMB4i6BAQEqWfQNb6GSMG3fIG6SMG2X0PQEATFvAeIgbpIwbZcgbvLQgG8h4m1VUVVAgQEBBshVUEZUAvQAgQEBzwBAFAL0AIEBAc8AAgL0AIEBAc8AyUEwFCBulTBZ9FowlEEz9BXigQEBAcgBAfQAyUEwAJ8BnAURFwUEERYEAxEVAwIRFAIBERwBERvIVYDbPMnIgljAAAAAAAAAAAAAAAABActnzMlw+wAKERMKCRESCQgREQgHERAHEG8QXhBNEDxLqQCgAFQgbpUwWfRaMJRBM/QV4oEBAQHIAQH0AMkQOBIgbpUwWfRaMJRBM/QV4gUAeoIQvTZ2B1AKyx8YgQEBzwAWgQEBzwAUgQEBzwDIWgL0AIEBAc8AQAMC9ACBAQHPAEADAvQAgQEBzwDJAcwB7NMfAYIQKH3ByLry4IH6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIAdMH+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiAHUAdAB+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiAHUAdAA4wLMERMRGhETERIRGRESERERGBERERARFxEQDxEWDw4RFQ4NERQNDBEaDAsRGQsKERgKCREXCQgRFggHERUHBhEUBgURGgUEERkEAxEYAwIRFwIBERYBERXbPFYUVhtWG1YbVhtWG1YbAMUApQP2ERMRFBETERIRFBESERERFBERERARFBEQDxEUDw4RFA4NERQNDBEUDAsRFAsKERQKCREUCREUCAcGVUDbPFYU2zxWE1YTVhNWE1YTVhNWE1YTVhNWE1YTVhNWE1YTVhNWE1YTVhNWE1YTERMRJxETERIRJhESERERJRERAMUBEgCqBP6OvzDTHwGCEI3LLRm68uCBbTEw2zwoknA53siLhVbnBhdXNlZIzxbJyIJYwAAAAAAAAAAAAAAAAQHLZ8zJcPsAf+AgghBWpRwquo6hMNMfAYIQVqUcKrry4IGBAQHXANMHgQEB1wBVIGwT2zx/4CCCEPISn0664wIgghCymIUfAMUArQCuAK8C6IEBAST5AhBoXjQQN0h4yFVg2zzJEDYSIG6VMFn0WjCUQTP0FeIDBhEUBgURGgUEERkEAxEYAwIRFwIBERYBERXIVWDbPMnIgljAAAAAAAAAAAAAAAABActnzMlw+wAMERMMCxESCwoREQoJERAJEI8QflVmAKYApwHWUHYg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxYUywdYINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WyFjPFskBzAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxbIUAMAqAHoghAofcHIUAjLH1AGINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WFMsHWCDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFshYzxbJAcwBINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WyFgAqQCAINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFskBzACAINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WWCDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFskBzAKcERARJBEQDxEjDw4RIg4NESENDBEgDAsRHwsKER4KCREdCQgRHAgHERsHBhEaBgURGQUEERgEAxEXAwIRFgIBERUBERTbPFcQXw9sQVYVAR8AqwLSKIEBASNZ9A1voZIwbd8gbpIwbZ3Q9ASBAQHXAFlsEm8C4iBu4wAgbvLQgG8igQELUAN/cSFulVtZ9FkwmMgBzwBBM/RB4oEBAQLIWQL0AIEBAc8AyRA5EiBulTBZ9FowlEEz9BXiBhEUARYArAC2yAGCEGKV2I9Yyx8BINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WyciCWMAAAAAAAAAAAAAAAAEBy2fMyXD7ABESERMREhERERIREREQEREREA8REA9VDgK8ERMRFhETERIRFRESERERFBERERARFhEQDxEVDw4RFA4NERYNDBEVDAsRFAsKERYKCREVCQgRFAgHERYHBhEVBgURFAUEERYEAxEVAwIRFAIBERYBERXbPFYUVhdWFwC4ALABMDDTHwGCEPISn0668uCBgQEB1wABMds8fwCyBNS6jpgw0x8BghCymIUfuvLggYEBAdcAATHbPH/gIIIQm0S2F7qOmDDTHwGCEJtEthe68uCBgQEB1wABMds8f+AgghAj47Mkuo6YMNMfAYIQI+OzJLry4IGBAQHXAAEx2zx/4CCCEJRqmLa6ALQAtQC2ALcB1lYRgQEBJFn0DW+hkjBt3yBukjBtl9D0BAExbwHiIG6SMG2XIG7y0IBvIeKBAQFUEyIhbpVbWfRaMJjIAc8AQTP0QuKBAQEByAEB9ADJAxERAxIgbpUwWfRaMJRBM/QV4g4CERQCAREWAREVALEAkshVIIIQVqUcKlAEyx8SgQEBzwDLB4EBAc8AyciCWMAAAAAAAAAAAAAAAAEBy2fMyXD7ABEQERMREA8REg8OEREODREQDRDPVSsC7BETERQRExESERQREhERERQREREQERQREA8RFA8OERQODREUDQwRFAwLERQLChEUCgkRFAkRFAgHBlVA2zxWFFcQggD2L1YQwv/y9BEUyAGCEPISn05Yyx+BAQHPAMnIgljAAAAAAAAAAAAAAAABActnzMlw+wAAuACzADAREhETERIRERESEREREBERERAPERAPVQ4C9BETERQRExESERQREhERERQREREQERQREA8RFA8OERQODREUDQwRFAwLERQLChEUCgkRFAkRFAgHBlVA2zxWFDyCAO8OLML/8vQRFMgBghCymIUfWMsfgQEBzwDJyIJYwAAAAAAAAAAAAAAAAQHLZ8zJcPsAERIRExESALgAzAL0ERMRFBETERIRFBESERERFBERERARFBEQDxEUDw4RFA4NERQNDBEUDAsRFAsKERQKCREUCREUCAcGVUDbPFYUOIIAvA4owv/y9BEUyAGCEJtEthdYyx+BAQHPAMnIgljAAAAAAAAAAAAAAAABActnzMlw+wAREhETERIAuADMA+YRExEUERMREhEUERIREREUEREREBEUERAPERQPDhEUDg0RFA0MERQMCxEUCwoRFAoJERQJERQIBwZVQNs8MvgnbxBWFL6SVhOU+CdvEOJWEgGAQHBVIG1tbds8MPgnbxARFMgBghAj47MkWMsfgQEBzwDJALgAvwC5BPSOqDDTHwGCEJRqmLa68uCB0z8BMcgBghCv+Q9XWMsfyz/J+EIBcG3bPH/gIIIQCmHbWbqOuTDTHwGCEAph21m68uCB+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiAGBAQHXAFlsEts8f+AgghBRPvNeuuMCIAC7ALwAvQC+AtImERIRFBESERERExERERARFBEQDxETDw4RFA4NERMNDBEUDAsREwsKERQKCRETCQgRFAgHERMHBhEUBgUREwUEERQEAxETAwIRFAIBERMBERSBAQERFNs8AhEWAgERFQFZ9A1voZIwbd8BDwC6AJDIgljAAAAAAAAAAAAAAAABActnzMlw+wAREhETERIRERESEREREBERERAPERAPEO8Q3hDNELwQqxCaEIkQeBBnEFYQRRA0QwAA1iBukjBtndD0BIEBAdcAWWwSbwLiggDRTSFus/L0IG7y0IBvIjCBAQv4QW8kECNfA3FBM/QKb6GUAdcAMJJbbeKBGCshbrOYASBu8tCAwP+SMXDi8vQRERETEREREBESERAPEREPDhEQDlUdATxtbSJus5lbIG7y0IBvIgGRMuIQJHADBIBCUCPbPDAAvwL0ERMRFRETERIRFBESERERFRERERARFBEQDxEVDw4RFA4NERUNDBEUDAsRFQsKERQKCREVCQgRFAgHERUHBhEUBgURFQUEERQEAxEVAwIRFAIBERUBERTbPBETERURExESERQREhERERMREREQERIREA8REQ8OERAOEN8AxQDBAXIw0x8BghBRPvNeuvLggfpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgBgQEB1wBZbBLbPH8AxAK6ghAXMr4huo7IMNMfAYIQFzK+Ibry4IGBAQHXAPpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgSbBKBHwv4QW8kECNfAyLHBfL02zx/4IIQJPpHybrjAjBwAMgAyQHKyHEBygFQBwHKAHABygJQBSDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFlAD+gJwAcpoI26zkX+TJG6z4pczMwFwAcoA4w0hbrOcfwHKAAEgbvLQgAHMlTFwAcoA4skB+wgAwACYfwHKAMhwAcoAcAHKACRus51/AcoABCBu8tCAUATMljQDcAHKAOIkbrOdfwHKAAQgbvLQgFAEzJY0A3ABygDicAHKAAJ/AcoAAslYzAEIVRzbPADCA9YRExEVERMREhEUERIREREVEREREBEUERAPERUPDhEUDg0RFQ0MERQMCxEVCwoRFAoJERUJCBEUCAcRFQcGERQGBREVBQQRFAQDERUDAhEUAgERFQERFFYV2zzbPCaBAQFWF1n0DW+hkjBt3wDXAMoAwwH+IG6SMG2d0PQEgQEB1wBZbBJvAuIgbvLQgG8igQELAREXf3EhbpVbWfRZMJjIAc8AQTP0QeKBAQERFshZAvQAgQEBzwDJEDcCERUCAREWASBulTBZ9FowlEEz9BXiERERExERERAREhEQDxERDw4REA4Q3xDOEL0QrBCbEIoQeQDNAvQRExEVERMREhEUERIREREVEREREBEUERAPERUPDhEUDg0RFQ0MERQMCxEVCwoRFAoJERUJCBEUCAcRFQcGERQGBREVBQQRFAQDERUDAhEUAgERFQERFNs8ERMRFRETERIRFBESERERExERERAREhEQDxERDw4REA4Q3wDFAMYC0iYREhEUERIRERETEREREBEUERAPERMPDhEUDg0REw0MERQMCxETCwoRFAoJERMJCBEUCAcREwcGERQGBRETBQQRFAQDERMDAhEUAgEREwERFIEBAREU2zwCERYCAREVAVn0DW+hkjBt3wEXAMcBCFUc2zwAyADUIG6SMG2d0PQEgQEB1wBZbBJvAuKBFZQhbrPy9CBu8tCAbyIwgQEL+EFvJBAjXwNxQTP0Cm+hlAHXADCSW23igUKPIW6zmAEgbvLQgMD/kjFw4vL0ERERExERERAREhEQDxERDw4REA5VHQPWERMRFRETERIRFBESERERFRERERARFBEQDxEVDw4RFA4NERUNDBEUDAsRFQsKERQKCREVCQgRFAgHERUHBhEUBgURFQUEERQEAxEVAwIRFAIBERUBERRWFds82zwmgQEBVhdZ9A1voZIwbd8A1wDKAMsA3NMfAYIQJPpHybry4IGBAQHXAIEBAdcAWWwSKIEBASNZ9A1voZIwbd8gbpIwbZ3Q9ASBAQHXAFlsEm8C4oFU5SFus/L0IG7y0IBvIjCBAQECyFkC9ACBAQHPAMkQORIgbpUwWfRaMJRBM/QV4gZ/AvKCAMTt+EFvJBAjXwMRFREWERURFBEWERQRExEWERMREhEWERIREREWEREREBEWERAPERYPDhEWDg0RFg0MERYMCxEWCwoRFgoJERYJCBEWCAcRFgcGERYGBREWBQQRFgQDERYDAhEWAgERFts8AREVAfL0ERIRExESANIAzAH+IG6SMG2d0PQEgQEB1wBZbBJvAuIgbvLQgG8igQELAREXcHEhbpVbWfRZMJjIAc8AQTP0QeKBAQERFshZAvQAgQEBzwDJEDcCERUCAREWASBulTBZ9FowlEEz9BXiERERExERERAREhEQDxERDw4REA4Q3xDOEL0QrBCbEIoQeQDNACQRERESEREREBERERAPERAPVQ4AEhBoEFcGEDVEAwIBIADQANECGbdXm2ebZ4riC+HtiDABBgEPApuya0BINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiNs8ERMRFRETERIRFBESERERExERERAREhEQDxERDw4REA4Q31Uc2zxXEF8PbEGABBgDSAnOwkbbPBETERYRExESERUREhERERQREREQERMREA8REg8OEREODREQDRDPEL5VKts8VxJXEF8PbCIygAQYA0wCigQEBKQJZ9A1voZIwbd8gbpIwbZ3Q9ASBAQHXAFlsEm8C4iBukltwjicgbvLQgG8iMIEBC1hxQTP0Cm+hlAHXADCSW23iIG6SMHDgIG7y0IDiAViBAQFUSRRZ9A1voZIwbd8gbpIwbZfQ9AQBMW8B4iBumF8DbXBUcQEh4w5fBAD4AVSBAQFUSRRZ9A1voZIwbd8gbpIwbZfQ9AQBMW8B4iBumF8DbXBUcQEh4w4A+AJboTts8ERMRFRETERIRFBESERERExERERAREhEQDxERDw4REA5VHds8VxBfD2xBgEGAPwCU6BHbPBETERQRExESERMREhERERIREREQEREREA8REA9VDts8VxBfD2xBgEGANcAZIEBASgCWfQNb6GSMG3fIG6SMG2d0PQEgQEB1wBZbBJvAuKBVOUhbrPy9CBu8tCAbyIxAAIoAlOtds8ERMRFBETERIRExESEREREhERERAREREQDxEQD1UO2zxXEF8PbEGABBgDcAlOrNs8ERMRFBETERIRExESEREREhERERAREREQDxEQD1UO2zxXEF8PbEGABBgDbAESBAQFTDlAzQTP0DG+hlAHXADCSW23iIG6SMHCVIG7y0IDiAEKBAQEvAnFBM/QMb6GUAdcAMJJbbeIgbpIwcJUgbvLQgOIAeoEBASMCWfQMb6GSMG3fIG6OJTCNCGAAAAAA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');
    const __system = core_1.Cell.fromBase64('te6cckICASIAAQAAUksAAAEBwAABAQWhp0sAAgEU/wD0pBP0vPLICwADAgFiAAQApwPu0AHQ0wMBcbCjAfpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IhUUFMDbwT4YQL4Yts8ERMRFRETERIRFBESERERExERERAREhEQDxERDw4REA5VHds88uCCyPhDAcx/AcoAERQRExESEREREFXg2zzJ7VQBCgAFAKUE8AGSMH/gcCHXScIflTAg1wsf3iCCENUydtu6jhQw0x8BghDVMnbbuvLggdM/ATEwf+AgghA41EY+uo8qMNMfAYIQONRGPrry4IHbPAfUAdD0BIEBAdcA0/+BAQHXADAQS2wb2zx/4CCCEOsSbcu64wIgghB73ZfeugAGAAcAIgApAH7THwGCEF24c4O68uCB0z/TP/oAgQEB1wDU1PpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgXFhUUQzAD8jIRExEdERMREhEcERIREREbEREREBEaERAPERkPDhEYDg0RFw0MERYMCxEVCwoRFAoJER0JCBEcCAcRGwcGERoGBREZBQQRGAQDERcDAhEWAgERFQERFNs8gR75KbPy9FYdAVYdAVYdAREdVhxWHFYcyFVg2zzJ+QAACAAKAAsC0iYREhEUERIRERETEREREBEUERAPERMPDhEUDg0REw0MERQMCxETCwoRFAoJERMJCBEUCAcREwcGERQGBRETBQQRFAQDERMDAhEUAgEREwERFIEBAREU2zwCERYCAREVAVn0DW+hkjBt3wEcAAkA1CBukjBtndD0BIEBAdcAWWwSbwLigR7oIW6z8vQgbvLQgG8iMIEBC/hBbyQQI18DcUEz9ApvoZQB1wAwkltt4oE9dSFus5gBIG7y0IDA/5IxcOLy9BERERMREREQERIREA8REQ8OERAOVR0AcoIQXbhzg1AIyx8Wyz8Uyz9Y+gKBAQHPAMzMASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFgHEggDiAxEVIboBERUB8vSBNXcRGlYUgQEBLwJxQTP0DG+hlAHXADCSW23iIG6SMHCVIG7y0IDiswERGwHy9BESERQREhERERMREREQERIREA8REQ8OERAOVR0BERkBVhkBERYADAH6cCGBAQH0hW+lIJESlTFtMm0B4pCOTiBukjBtnNDUAdAB0/9ZbBJvAuIgbvLQgG8iJ4EBASJZ9AxvoZIwbd9us5klWfkQkwGkAd6RW+KBAQEjAln0eG+lIJQC1DBYlTFtMm0B4ugQI18DgV2XMia+8vRWF9DT/zBWF9DT/zAADQL6ERURFhEVERQRFREUERMRFBETERIRExESEREREhERERAREREQDxEQDxDvEN4QzRC8EKsQmhCJEHgQZxBWEEUQNBAjAhEdAlYbVhjbPB2BAQEBERh/cSFulVtZ9FowmMgBzwBBM/RC4gURGQUEERcEAxEVAwIRFAIBERgBERMADgAgAcgRFREYERURFBEXERQRExEWERMREhEYERIREREXEREREBEWERAPERgPDhEXDg0RFg0MERgMCxEXCwoRFgoJERgJCBEXCAcRFgcGERgGBREXBQQRFgQDERgDAhEXAgERFgERGFYXAA8C5oEBAVRJFFn0DW+hkjBt3yBukjBtl9D0BAExbwHiIG6YXwNtcFRxASHjDltsIoEfkwHDAPL0gQEBVFEAWfSEb6UgllAj1wAwWJZsIW0ybQHikIroXwNXFFcUVxQREBETERAPERIPDhERDg0REA0QzxC+VSoA+QAQA/IRExEWERMREhEVERIREREUEREREBEWERAPERUPDhEUDg0RFg0MERUMCxEUCwoRFgoJERUJCBEUCAcRFgcGERUGBREUBQQRFgQDERUDAhEUAgERFgERFVYVggCZXCHCApMBwQuSMXDi8vRWFcAG4w+BAQEgVhYDERgBABEAGAAfArxXFVYXgvAaQhn+XmDWOvKjzH3Ob+xptFxrVxhJemFI58IyrIe9irqOs4IAlqz4QW8kE18DLKcDvvL0ERIRExESEREREhERERAREREQDxEQD1UOERRWF1YXVhrbPOMNABIAFgSOgQEBVEcUWfQNb6GSMG3fIG6SMG2Oh9DbPGwXbwfiIG7y0IBvJ2xhf3NWEKoAbXCIVhJRWRBZBBA6UKLIVWDbPMkUE0EwbW0AzwATABQAHgA6AAAAAEVtbWV0QnJpZGdlOiBUb2tlbiBVTkxPQ0sB7IIQD4p+pVAIyx8Wyz9QBPoCWCDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFgEgbpUwcAHLAY4eINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8W4iFus5V/AcoAzJRwMsoA4gH6AiFus5RwMsoA4w0AFQAKfwHKAMwCkIIAlqz4QW8kE18DLHOpBL7y9BESERMREhERERIREREQEREREA8REA9VDhEUVhZWGYh/cySCAeRgoBA0QTBAAwRtbds8MBOhAgAXAJMANgAAAABFbW1ldEJyaWRnZTogVE9OIFVOTE9DSwLOVhXABI7fERXACI6zggCWrPhBbyQTXwMsqgC+8vQREhETERIRERESEREREBERERAPERAPVQ4RFFYXVhdWGts8jiOBH5Py8BETERQRExESERMREhERERIREREQEREREA8REA9VDuLjDQAZABoC9IEBAVRHFFn0DW+hkjBt3yBukjBtjofQ2zxsF28H4iBu8tCAbycQRl8Gcy+qAMjJXjESyFUgghAKGf6eUATLH1gg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxaBAQHPACFus5V/AcoAzJRwMsoA4skTfwRQM21tAM8AHgHAVxWCAL89VhiC8BpCGf5eYNY68qPMfc5v7Gm0XGtXGEl6YUjnwjKsh72KvfL0ggCWrPhBbyQTXwMsqgC+8vQREhETERIRERESEREREBERERAPERAPVQ4RFFYXVhdWGts8ABsE9IEBAVRHFFn0DW+hkjBt3yBukjBtjofQ2zxsF28H4iBu8tCAbydfBshvAAFvjG1vjI0EUVtbWV0QnJpZGdlOiBNSU5Ug2zxzVhCqAPgobQRvIgHJkyFus5YBbyJZzMnoMdAQRkcwFlYTEEUQNAHIVVDbPMlBMH9QRG1tAM8AHAAdAB4AuiDXSiHXSZcgwgAiwgCxjkoDbyKAfyLPMasCoQWrAlFVtgggwgCcIKoCFdcYUDPPFkAU3llvAlNBocIAmcgBbwJQRKGqAo4SMTPCAJnUMNAg10oh10mScCDi4uhfAwDIghCJtx0JUAfLH1AFINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WUAMg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxaBAQHPACFus5V/AcoAzJRwMsoA4gH6AgHPFgEG2zwwAJMAtEEz9HhvpSCWUCPXADBYlmwhbTJtAeIRFREXERURFBEWERQRExEVERMREhEUERIRERETEREREBESERAPEREPDhEQDhDfEM4QvRCsEJsQihB5EGgQVxBGEDUQNAGCyFVQ2zzJyIJYwAAAAAAAAAAAAAAAAQHLZ8zJcPsADBETDAsREgsKEREKCREQCRCPEH4QXBBLEDpJhxBWA1BVRBQAIQBoghBOLmSBUAfLHxXL/1AD+gLMzMs/ASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFgE4MNMfAYIQ6xJty7ry4IHTP9TU1PoAVUBsFds8fwAjA+ARExEYERMREhEXERIREREWEREREBEVERAPERQPDhEYDg0RFw0MERYMCxEVCwoRFAoJERgJCBEXCAcRFgcGERUGBREUBQQRGAQDERcDAhEWAgERFQERFIEe+Smz8vRWFdCDB9s8VhjQgwfbPIIA05IiACQAJAAlAAbXATAB/oLwGkIZ/l5g1jryo8x9zm/sabRca1cYSXphSOfCMqyHvYq68vQRExEVERMREhEUERIREREVEREREBEUERAPERUPDhEUDg0RFQ0MERQMCxEVCwoRFAoJERUJCBEUCAcRFQcGERQGBREVBQQRFAQDERUDAhEUAgERFQERFFYaVhYAJgP2VhaBAQFWFUAUWfQNb6GSMG3fIG6SMG2f0NQB0AGBAQHXAFlsEm8C4oFD8QFus/L0gQEBJgJZ9A1voZIwbd8gbpIwbY6H0Ns8bBdvB+KBRZkBbrPy9IEBASUCWfQNb6GSMG3fIG6SMG2Oh9DbPGwXbwfiggCroQFus/L0AM8AzwAnA/wRExEVERMREhEUERIRERETEREREBESERAPEREPDhEQDlUdVhpZVhfbPAQRFAQDERYDKQMCERkCAREWAREYWhUUyFVQ2zzJyIJYwAAAAAAAAAAAAAAAAQHLZ8zJcPsADhETDg0REg0MEREMCxEQCxCvEJ4QjRB8EGsQWhBJEDgAOABFACgACkcVQ2QBBNKPCDDbPGwW2zx/4CCCEHNi0Jy6jrgw0x8BghBzYtCcuvLggdM/+gD6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIVBMDECNsFOAgwAAi10nBIbCYWzL4J28QAn/gIIIQEmiO9roAKgArADIARwCy0x8BghB73ZfeuvLggdM/+gD6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIAfpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgB+gBRVRUUQzAB8jVfAxETERURExESERQREhERERUREREQERQREA8RFQ8OERQODREVDQwRFAwLERULChEUCgkRFQkIERQIBxEVBwYRFAYFERUFBBEUBAMRFQMCERQCAREVAREUgR75KbPy9IE8bsjJ0FYXAfkBAfkBvfL0ERXTPyFWEroALALcjurU1NQwItDT/zAh0NP/MBETERgRExESERcREhERERYREREQERUREA8RFA8OERgODREXDQwRFgwLERULChEUCgkRGAkIERcIBxEWBwYRFQYFERQFBBEYBAMRFwMCERYCAREVAREaVhRWFlYc4w0ALQAxA/6BAQFWFUAUWfQNb6GSMG3fIG6SMG2f0NQB0AGBAQHXAFlsEm8C4oFD8QFus/L0gQEBJgJZ9A1voZIwbd8gbpIwbY6H0Ns8bBdvB+KBRZkBbrPy9IEBASUCWfQNb6GSMG3fIG6SMG2Oh9DbPGwXbwfiggCroQFus/L0I4EBAVYXAM8AzwAuAvxZ9A1voZIwbd8gbpIwbY6H0Ns8bBdvB+IgbvLQgG8nXwaBV3qNCGAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQixwWz8vQRFBEVERQRExEUERMREhETERIRERESEREREBERERAPERAPEO8Q3hDNELwQqxCaEIkAzwAvA/4QeBBnEFYQRRA0QTAhAREXAREc2zyCAJas+EFvJBNfAy6rABOgEr7y9IF+N/hBbyQQI18DAREWAccFAREVAfL0CKQEERcEAxEVA1IDAhEZAgERFwERFVoVFMhVUNs8yciCWMAAAAAAAAAAAAAAAAEBy2fMyXD7AA0REw0MERIMAPcARQAwADoLERELChEQChCfEI4QfRBsEFsQShBZSBYFUDNHFwA2W1cTERERExERERAREhEQDxERDw4REA4Q31UcAtwxMhETERURExESERQREhERERUREREQERQREA8RFQ8OERQODREVDQwRFAwLERULChEUCgkRFQkIERQIBxEVBwYRFAYFERUFBBEUBAMRFQMCERQCAREVAREUgR75KbPy9MjJ0FYWAfkBAfkBuuMPfwAzADQANFcUVxQRERETEREREBESERAPEREPDhEQDlUdAfgRFdQwIG6OGzBXExERERMREREQERIREA8REQ8OERAOEN9VHOAgbvLQgNDTPyFWErqOG1tXExERERMREREQERIREA8REQ8OERAOEN9VHODU1NQwItDT/zAh0NP/MBETERgRExESERcREhERERYREREQERUREA8RFA8OERgOADUBeA0RFw0MERYMCxEVCwoRFAoJERgJCBEXCAcRFgcGERUGBREUBQQRGAQDERcDAhEWAgERFQERGlYUVhZWHAA2A/6BAQFWFUAUWfQNb6GSMG3fIG6SMG2f0NQB0AGBAQHXAFlsEm8C4oFD8QFus/L0gQEBJgJZ9A1voZIwbd8gbpIwbY6H0Ns8bBdvB+KBRZkBbrPy9IEBASUCWfQNb6GSMG3fIG6SMG2Oh9DbPGwXbwfiggCroQFus/L0I4EBAVYXAM8AzwA3BO5Z9A1voZIwbd8gbpIwbY6H0Ns8bBdvB+KBXc8BIG7y0IBvJ2xh+EFvJBAjXwPHBfL0ERMRFRETERIRFBESERERExERERAREhEQDxERDw4REA5VHWYRG1Ya2zwEERcEAxEVAykDAhEZAgERFwERFVoVFMhVUNs8yQDPADgARQBGAbgRExEXERMREhEWERIREREVEREREBEUERAPERcPDhEWDg0RFQ0MERQMCxEXCwoRFgoJERUJCBEUCAcRFwcGERYGBREVBQQRFAQDERcDAhEWAgERFQERFFYXVhdWFwA5A/yBAQFUSRRZ9A1voZIwbd8gbpIwbZfQ9AQBMW8B4iBumF8DbXBUcQEh4w5sQoIAiM0BwwDy9BEUERURFBETERQRExESERMREhERERIREREQEREREA8REA8Q7xDeEM0QvBCrEJoQiRB4EGcQVhBFEDRBMAERGAFWFwERF9s8CqQA+QD3ADoBfoEBASBWF1lZ9IRvpSCWUCPXADBYlmwhbTJtAeKQiuhbOlcUVxRXFBEQERMREA8REg8OEREODREQDRDPEL5VKgA7A+YRExEWERMREhEVERIREREUEREREBEWERAPERUPDhEUDg0RFg0MERUMCxEUCwoRFgoQKQgRFAgHERYHECYFERQFBBEWBBAjAhEUAgERFgERFFYUggCZXCHCApMBwQuSMXDi8vRWFMAD4w+BAQEgVhgDERgBADwAPgBEAbpXFFYXgvAaQhn+XmDWOvKjzH3Ob+xptFxrVxhJemFI58IyrIe9irqOMoIAlqz4QW8kE18DVhpWF6AtoL7y9BESERMREhERERIREREQEREREA8REA9VDlYYE6AC4w4APQDiggCWrPhBbyQTXwMsqgBWFwGgvvL0ERIRExESEREREhERERAREREQDxEQD1UOVhdWGYEBAVRfAFJAQTP0DG+hlAHXADCSW23iIG6RMJYgbvLQgKDigQEBIAQREARDMCFulVtZ9FowmMgBzwBBM/RC4gwB0lYUwAWOOlcUggCWrPhBbyQTXwMspwNWFwGgvvL0ERIRExESEREREhERERAREREQDxEQD1UOVhdWGVuCAM868vCOphEUwAeOHoIAiM3y8BESERMREhERERIREREQEREREA8REA9VDuMN4gA/ArhWF4LwGkIZ/l5g1jryo8x9zm/sabRca1cYSXphSOfCMqyHvYq6jrOCAJas+EFvJBNfAyynA1YXAaC+8vQREhETERIRERESEREREBERERAPERAPVQ5WF1YZ2zzjDQBAAEIC5IEBAVRGE1n0DW+hkjBt3yBukjBtjofQ2zxsF28H4iAgbvLQgG8nbGEBIG7y0IBvJxBGXwaNCGAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQixwWz8uVEyIIQD4p+pQHLH1LQyz9QA/oCIgDPAEEBriDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFlgg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxZtAfQALfoCbQH0AMktqgACc1l/RDRtbds8MACTAV6CAJas+EFvJBNfA1YaVhegLaC+8vQREhETERIRERESEREREBERERAPERAPVQ5WGABDArIkgQEBgvAaQhn+XmDWOvKjzH3Ob+xptFxrVxhJemFI58IyrIe9iln0DW+hkjBt3yBukjBtjofQ2zxsF28H4iBu8tCAbycQRl8GLasAEqBzWH9BM21tbds8MADPAJMAsEEz9HhvpSCWUCPXADBYlmwhbTJtAeIRFREXERURFBEWERQRExEVERMREhEUERIRERETEREREBESERAPEREPDhEQDhDfEM4QzRCsEJsQihB5EGgQVxBGEDUALIIQY8SfV1AHyx8Vy/9QA/oCzMzMyz8AfMiCWMAAAAAAAAAAAAAAAAEBy2fMyXD7AA4REw4NERINDBERDAsREAsQrxCeEI0QfBBrEFoQSRA4RxVQYhMUBOqOmDDTHwGCEBJojva68uCBgQEB1wABMds8f+AgghDdw8twuo6YMNMfAYIQ3cPLcLry4IGBAQHXAAEx2zx/4CCCEGaZH8S6jqQw0x8BghBmmR/EuvLggYEBAdcAgQEB1wCBAQHXAFUgbBPbPH/gIIIQZgl10LoASABKAE0AUQLuERMRFBETERIRFBESERERFBERERARFBEQDxEUDw4RFA4NERQNDBEUDAsRFAsKERQKCREUCREUCAcGVUDbPFYUVhKBAQEiWfQNb6GSMG3fIG6SMG2f0NQB0AGBAQHXAFlsEm8C4m6zmwEREoEBAfRaMBERkTDiERQAmwBJAILIAYIQEmiO9ljLH4EBAc8AyciCWMAAAAAAAAAAAAAAAAEBy2fMyXD7ABESERMREhERERIREREQEREREA8REA9VDgPwERMRFBETERIRFBESERERFBERERARFBEQDxEUDw4RFA4NERQNDBEUDAsRFAsKERQKCREUCREUCAcGVUDbPFYU2zwRFMgBghDdw8twWMsfgQEBzwDJyIJYwAAAAAAAAAAAAAAAAQHLZ8zJcPsAERIRExESEREREhERAJsASwBMAfARExEUERMREhEUERIREREUEREREBEUERAPERQPDhEUDg0RFA0MERQMCxEUCwoRFAoJERQJERQIBwZVQFYUggCZXCHCApMBwQuSMXDi8vQqgQEBVhZZ9AxvoZIwbd9us54BERQBCoEBAfRaMAkRE5JXFOIREhETERIAoQAYERAREREQDxEQD1UOA9QRExEWERMREhEVERIREREUEREREBEWERAPERUPDhEUDg0RFg0MERUMCxEUCwoRFgoJERUJCBEUCAcRFgcGERUGBREUBQQRFgQDERUDAhEUAgERFgERFds8VhRWF1YX2zwCERQCAREWAREVAJsATgBQAbwogQEBJFn0DW+hkjBt3yBukjBtl9D0BAExbwHiIG6SXwTgICBu8tCAbyEBIG7y0IBvIYEBASRZ9A1voZIwbd8gbpIwbZfQ9AQBMW8B4iBukl8F4CBu8tCAbyGBAQFtAE8A7iBukjBtjiggbvLQgG8myFVQRlQC9ACBAQHPAEAUAvQAgQEBzwACAvQAgQEBzwDJ4kEwFCBulTBZ9FowlEEz9BXigQEBAcgBAfQAyUEwIG6VMFn0WjCUQTP0FeKBAQEByAEB9ADJEDgSIG6VMFn0WjCUQTP0FeIFAJjIVSCCEGaZH8RQBMsfEoEBAc8AgQEBzwCBAQHPAMnIgljAAAAAAAAAAAAAAAABActnzMlw+wAREBETERAPERIPDhERDg0REA0Qz1UrBMyOlTDTHwGCEGYJddC68uCB1AHQMds8f+AgghB0f3Unuo6xMNMfAYIQdH91J7ry4IH6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIMds8f+AgghB6RQjZuuMCIIIQobw2YroAUgBUAFsAXAPeERMRFBETERIRFBESERERFBERERARFBEQDxEUDw4RFA4NERQNDBEUDAsRFAsKERQKCREUCREUCAcGVUDbPFYU+QIkgQEBIln0DW+hkjBt3yBukjBtjofQ2zxsF28H4m6zmVAEgQEB9FowA5Ew4hEUAJsAzwBTAIbIAYIQZgl10FjLH8hYzxbJAczJyIJYwAAAAAAAAAAAAAAAAQHLZ8zJcPsAERIRExESEREREhERERAREREQDxEQD1UOBPQRExEUERMREhEUERIREREUEREREBEUERAPERQPDhEUDg0RFA0MERQMCxEUCwoRFAoJERQJERQIBwZVQNs8VhQg2zz5AiOBAQEiWfQMb6GSMG3fIiFukltwkscF4pFb4w1WE1YTVhNWE1YTVhNWE1YTVhNWE1YTVhNWEwCbARYAVQBYAfxQA4EBAfRaMAGlERMRFBETERIRFBESERERFBERERARFBEQDxEUDw4RFA4NERQNDBEUDAsRFAsKERQKCREUCQgRFAgHERQHBhEUBgURFAUEERQEAxEUAwIRFAI0I6oAc6kEBFYTVhNWE1YTVhNWE1YTVhNWE1YTVhNWE1YTVhMAVgL4VhNWE1YTVhNWE1YTERMRJxETERIRJhESERERJRERERARJBEQDxEjDw4RIg4NESENDBEgDAsRHwsKER4KCREdCQgRHAgHERsHBhEaBgURGQUEERgEAxEXAwIRFgIBERUBERTbPFcQXw9sQREUERURFBETERQRExESERMREgEcAFcA+hERERIREREQEREREA8REA9VDiiBAQEjWfQNb6GSMG3fIG6SMG2d0PQEgQEB1wBZbBJvAuKBC28hbrPy9CBu8tCAbyKBAQtQA3BxIW6VW1n0WTCYyAHPAEEz9EHigQEBAshZAvQAgQEBzwDJEDkSIG6VMFn0WjCUQTP0FeIGAtxWE1YTVhNWE1YTVhNWExETEScRExESESYREhERESUREREQESQREA8RIw8OESIODREhDQwRIAwLER8LChEeCgkRHQkIERwIBxEbBwYRGgYFERkFBBEYBAMRFwMCERYCAREVAREU2zxXEF8PbEFWFQEcAFkB2iiBAQEjWfQNb6GSMG3fIG6SMG2d0PQEgQEB1wBZbBJvAuKBC28hbrPy9CBu8tCAbyKBAQtQA3BxIW6VW1n0WTCYyAHPAEEz9EHigQEBAshZAvQAgQEBzwDJEDkSIG6VMFn0WjCUQTP0FeIGERQAWgC2yAGCEHR/dSdYyx8BINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WyciCWMAAAAAAAAAAAAAAAAEBy2fMyXD7ABESERMREhERERIREREQEREREA8REA9VDgF8MNMfAYIQekUI2bry4IFtMTDbPCizkn853siLZQYXVzZWSM8WyciCWMAAAAAAAAAAAAAAAAEBy2fMyXD7AH8AmwTcjrEw0x8BghChvDZiuvLggfpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4Igx2zx/4CCCEMx3zmO6jp0w0x8BghDMd85juvLggdQB0AGBAQHXAFlsEts8f+AgghDTKe6DuuMCIIIQfIbeYroAXQBjAGUAbALuERMRFBETERIRFBESERERFBERERARFBEQDxEUDw4RFA4NERQNDBEUDAsRFAsKERQKCREUCREUCAcGVUDbPFYTVhNWE1YTVhNWE1YTVhNWE1YTVhNWE1YTVhNWE1YTVhNWE1YTVhMRExEnERMREhEmERIRERElEREAmwBeApwREBEkERAPESMPDhEiDg0RIQ0MESAMCxEfCwoRHgoJER0JCBEcCAcRGwcGERoGBREZBQQRGAQDERcDAhEWAgERFQERFNs8VxBfD2xBVhUBHwBfAv4ogQEBI1n0DW+hkjBt3yBukjBtndD0BIEBAdcAWWwSbwLiIG7jACBu8tCAbyKBAQtQA39xIW6VW1n0WTCYyAHPAEEz9EHigQEBAshZAvQAgQEBzwDJEDkSIG6VMFn0WjCUQTP0FeIGVhNWE1YTVhNWE1YTVhNWE1YTVhNWE1YTAR4AYALeVhNWE1YTVhNWE1YTVhNWExETEScRExESESYREhERESUREREQESQREA8RIw8OESIODREhDQwRIAwLER8LChEeCgkRHQkIERwIBxEbBwYRGgYFERkFBBEYBAMRFwMCERYCAREVAREU2zxXEF8PbDEBAR8AYQHeKIEBASNZ9A1voZIwbd8gbpIwbZ3Q9ASBAQHXAFlsEm8C4oELbyFus/L0IG7y0IBvIoEBC1ADcHEhbpVbWfRZMJjIAc8AQTP0QeKBAQECyFkC9ACBAQHPAMkQORIgbpUwWfRaMJRBM/QV4gZXE1YTAGIAqsgBghChvDZiWMsfASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFsnIgljAAAAAAAAAAAAAAAABActnzMlw+wARERESEREREBERERAPERAPVQ4CuBETERURExESERQREhERERUREREQERQREA8RFQ8OERQODREVDQwRFAwLERULChEUCgkRFQkIERQIBxEVBwYRFAYFERUFBBEUBAMRFQMCERQCAREVAREU2zxWFVYVAJsAZADqgQEBUSHIWchYzxbJWMyBAQHPAMkDERQDIG6VMFn0WjCUQTP0FeIREQERFQERFMhZghDMd85jUAPLH8hYzxbJAcyBAQHPAMnIgljAAAAAAAAAAAAAAAABActnzMlw+wARERETEREREBESERAPEREPDhEQDlUdAWIw0x8BghDTKe6DuvLggfpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4Igx2zx/AGYC7hETERQRExESERQREhERERQREREQERQREA8RFA8OERQODREUDQwRFAwLERQLChEUCgkRFAkRFAgHBlVA2zxWE1YTVhNWE1YTVhNWE1YTVhNWE1YTVhNWE1YTVhNWE1YTVhNWE1YTERMRJxETERIRJhESERERJRERAJsAZwKcERARJBEQDxEjDw4RIg4NESENDBEgDAsRHwsKER4KCREdCQgRHAgHERsHBhEaBgURGQUEERgEAxEXAwIRFgIBERUBERTbPFcQXw9sQVYVARIAaAL+KIEBASNZ9A1voZIwbd8gbpIwbZ3Q9ASBAQHXAFlsEm8C4iBu4wAgbvLQgG8igQELUAN/cSFulVtZ9FkwmMgBzwBBM/RB4oEBAQLIWQL0AIEBAc8AyRA5EiBulTBZ9FowlEEz9BXiBlYTVhNWE1YTVhNWE1YTVhNWE1YTVhNWEwEeAGkC3FYTVhNWE1YTVhNWE1YTVhMRExEnERMREhEmERIRERElEREREBEkERAPESMPDhEiDg0RIQ0MESAMCxEfCwoRHgoJER0JCBEcCAcRGwcGERoGBREZBQQRGAQDERcDAhEWAgERFQERFNs8VxBfDzRbARIAagHeKIEBASNZ9A1voZIwbd8gbpIwbZ3Q9ASBAQHXAFlsEm8C4oELbyFus/L0IG7y0IBvIoEBC1ADcHEhbpVbWfRZMJjIAc8AQTP0QeKBAQECyFkC9ACBAQHPAMkQORIgbpUwWfRaMJRBM/QV4gZXElYTAGsAqsgBghDTKe6DWMsfASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFsnIgljAAAAAAAAAAAAAAAABActnzMlw+wAREhETERIREBERERAPERAPVQ4ErI64MNMfAYIQfIbeYrry4IGBAQHXAPpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgSbBLbPH/gIIIQvTZ2B7qPCDDbPGwZ2zx/4CCCECh9wci6AG0AcQByAHcDyBETERURExESERQREhERERUREREQERQREA8RFQ8OERQODREVDQwRFAwLERULChEUCgkRFQkIERQIBxEVBwYRFAYFERUFBBEUBAMRFQMCERQCAREVAREU2zxWFVYV2zwBERUBERQAmwBuAHAB6hETERURExESERQREhERERUREREQERQREA8RFQ8OERQODREVDQwRFAwLERULChEUCgkRFQkIERQIBxEVBwYRFAYFERUFBBEUBAMRFQMCERQCAREVAREUVhWCAJlcIcICkwHBC5IxcOLy9BAqgQEBAgERFgERFQBvAHIgbpUwWfRaMJRBM/QU4hERERMREREQERIREA8REQ8OERAOEN8QzhC9EKwQmwoQeRBoEFcQRhA1RAMAvshZghB8ht5iUAPLH4EBAc8AASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFsnIgljAAAAAAAAAAAAAAAABActnzMlw+wARERETEREREBESERAPEREPDhEQDlUdAIjTHwGCEL02dge68uCBgQEB1wCBAQHXAIEBAdcA1AHQ9ASBAQHXAFkC9ASBAQHXAFkC9ASBAQHXAFkyEGkQaBBnEEVDAAPwERMRHBETERIRGxESERERGhERERARGREQDxEYDw4RFw4NERYNDBEVDAsRFAsKERwKCREbCQgRGggHERkHBhEYBgURFwUEERYEAxEVAwIRFAIBERwBERvbPFYaVhpWGlYaVhpWGlYaViNWI9s8CBEaCAcRGQcGERgGAJsAcwB1AeIugQEBKln0DW+hkjBt3yBukjBtl9D0BAExbwHiIG6SMG2XIG7y0IBvIeJtVVFVQIEBAQbIVVBGVAL0AIEBAc8AQBQC9ACBAQHPAAIC9ACBAQHPAMlBMBQgbpUwWfRaMJRBM/QV4oEBAQHIAQH0AMlBMAB0AFQgbpUwWfRaMJRBM/QV4oEBAQHIAQH0AMkQOBIgbpUwWfRaMJRBM/QV4gUBnAURFwUEERYEAxEVAwIRFAIBERwBERvIVYDbPMnIgljAAAAAAAAAAAAAAAABActnzMlw+wAKERMKCRESCQgREQgHERAHEG8QXhBNEDxLqQB2AHqCEL02dgdQCssfGIEBAc8AFoEBAc8AFIEBAc8AyFoC9ACBAQHPAEADAvQAgQEBzwBAAwL0AIEBAc8AyQHMBJ6PCDDbPGwX2zx/4CCCEGKV2I+6jrEw0x8BghBildiPuvLggfpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4Igx2zx/4CCCEI3LLRm6AHgAeQB/AIMB7NMfAYIQKH3ByLry4IH6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIAdMH+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiAHUAdAB+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiAHUAdAA0ALMERMRGhETERIRGRESERERGBERERARFxEQDxEWDw4RFQ4NERQNDBEaDAsRGQsKERgKCREXCQgRFggHERUHBhEUBgURGgUEERkEAxEYAwIRFwIBERYBERXbPFYUVhtWG1YbVhtWG1YbAJsAegLogQEBJPkCEGheNBA3SHjIVWDbPMkQNhIgbpUwWfRaMJRBM/QV4gMGERQGBREaBQQRGQQDERgDAhEXAgERFgERFchVYNs8yciCWMAAAAAAAAAAAAAAAAEBy2fMyXD7AAwREwwLERILChERCgkREAkQjxB+VWYAewB9AdZQdiDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFhTLB1gg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxbIWM8WyQHMASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFshQAwB8AIAg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxYBINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WyQHMAeiCECh9wchQCMsfUAYg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxYUywdYINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WyFjPFskBzAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxbIWAB+AIAg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxZYINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WyQHMA/YRExEUERMREhEUERIREREUEREREBEUERAPERQPDhEUDg0RFA0MERQMCxEUCwoRFAoJERQJERQIBwZVQNs8VhTbPFYTVhNWE1YTVhNWE1YTVhNWE1YTVhNWE1YTVhNWE1YTVhNWE1YTVhMRExEnERMREhEmERIRERElEREAmwEVAIACnBEQESQREA8RIw8OESIODREhDQwRIAwLER8LChEeCgkRHQkIERwIBxEbBwYRGgYFERkFBBEYBAMRFwMCERYCAREVAREU2zxXEF8PbEFWFQEcAIEC0iiBAQEjWfQNb6GSMG3fIG6SMG2d0PQEgQEB1wBZbBJvAuIgbuMAIG7y0IBvIoEBC1ADf3EhbpVbWfRZMJjIAc8AQTP0QeKBAQECyFkC9ACBAQHPAMkQORIgbpUwWfRaMJRBM/QV4gYRFAEeAIIAtsgBghBildiPWMsfASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFsnIgljAAAAAAAAAAAAAAAABActnzMlw+wAREhETERIRERESEREREBERERAPERAPVQ4E/o6/MNMfAYIQjcstGbry4IFtMTDbPCiScDneyIuFVucGF1c2VkjPFsnIgljAAAAAAAAAAAAAAAABActnzMlw+wB/4CCCEFalHCq6jqEw0x8BghBWpRwquvLggYEBAdcA0weBAQHXAFUgbBPbPH/gIIIQ8hKfTrrjAiCCELKYhR8AmwCEAIcAigK8ERMRFhETERIRFRESERERFBERERARFhEQDxEVDw4RFA4NERYNDBEVDAsRFAsKERYKCREVCQgRFAgHERYHBhEVBgURFAUEERYEAxEVAwIRFAIBERYBERXbPFYUVhdWFwCOAIUB1lYRgQEBJFn0DW+hkjBt3yBukjBtl9D0BAExbwHiIG6SMG2XIG7y0IBvIeKBAQFUEyIhbpVbWfRaMJjIAc8AQTP0QuKBAQEByAEB9ADJAxERAxIgbpUwWfRaMJRBM/QV4g4CERQCAREWAREVAIYAkshVIIIQVqUcKlAEyx8SgQEBzwDLB4EBAc8AyciCWMAAAAAAAAAAAAAAAAEBy2fMyXD7ABEQERMREA8REg8OEREODREQDRDPVSsBMDDTHwGCEPISn0668uCBgQEB1wABMds8fwCIAuwRExEUERMREhEUERIREREUEREREBEUERAPERQPDhEUDg0RFA0MERQMCxEUCwoRFAoJERQJERQIBwZVQNs8VhRXEIIA9i9WEML/8vQRFMgBghDyEp9OWMsfgQEBzwDJyIJYwAAAAAAAAAAAAAAAAQHLZ8zJcPsAAI4AiQAwERIRExESEREREhERERAREREQDxEQD1UOBNS6jpgw0x8BghCymIUfuvLggYEBAdcAATHbPH/gIIIQm0S2F7qOmDDTHwGCEJtEthe68uCBgQEB1wABMds8f+AgghAj47Mkuo6YMNMfAYIQI+OzJLry4IGBAQHXAAEx2zx/4CCCEJRqmLa6AIsAjACNAJEC9BETERQRExESERQREhERERQREREQERQREA8RFA8OERQODREUDQwRFAwLERQLChEUCgkRFAkRFAgHBlVA2zxWFDyCAO8OLML/8vQRFMgBghCymIUfWMsfgQEBzwDJyIJYwAAAAAAAAAAAAAAAAQHLZ8zJcPsAERIRExESAI4AoQL0ERMRFBETERIRFBESERERFBERERARFBEQDxEUDw4RFA4NERQNDBEUDAsRFAsKERQKCREUCREUCAcGVUDbPFYUOIIAvA4owv/y9BEUyAGCEJtEthdYyx+BAQHPAMnIgljAAAAAAAAAAAAAAAABActnzMlw+wAREhETERIAjgChA+YRExEUERMREhEUERIREREUEREREBEUERAPERQPDhEUDg0RFA0MERQMCxEUCwoRFAoJERQJERQIBwZVQNs8MvgnbxBWFL6SVhOU+CdvEOJWEgGAQHBVIG1tbds8MPgnbxARFMgBghAj47MkWMsfgQEBzwDJAI4AkwCQAtImERIRFBESERERExERERARFBEQDxETDw4RFA4NERMNDBEUDAsREwsKERQKCRETCQgRFAgHERMHBhEUBgUREwUEERQEAxETAwIRFAIBERMBERSBAQERFNs8AhEWAgERFQFZ9A1voZIwbd8BEgCPANYgbpIwbZ3Q9ASBAQHXAFlsEm8C4oIA0U0hbrPy9CBu8tCAbyIwgQEL+EFvJBAjXwNxQTP0Cm+hlAHXADCSW23igRgrIW6zmAEgbvLQgMD/kjFw4vL0ERERExERERAREhEQDxERDw4REA5VHQCQyIJYwAAAAAAAAAAAAAAAAQHLZ8zJcPsAERIRExESEREREhERERAREREQDxEQDxDvEN4QzRC8EKsQmhCJEHgQZxBWEEUQNEMABPSOqDDTHwGCEJRqmLa68uCB0z8BMcgBghCv+Q9XWMsfyz/J+EIBcG3bPH/gIIIQCmHbWbqOuTDTHwGCEAph21m68uCB+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiAGBAQHXAFlsEts8f+AgghBRPvNeuuMCIACSAJUAmQCeATxtbSJus5lbIG7y0IBvIgGRMuIQJHADBIBCUCPbPDAAkwHKyHEBygFQBwHKAHABygJQBSDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFlAD+gJwAcpoI26zkX+TJG6z4pczMwFwAcoA4w0hbrOcfwHKAAEgbvLQgAHMlTFwAcoA4skB+wgAlACYfwHKAMhwAcoAcAHKACRus51/AcoABCBu8tCAUATMljQDcAHKAOIkbrOdfwHKAAQgbvLQgFAEzJY0A3ABygDicAHKAAJ/AcoAAslYzAL0ERMRFRETERIRFBESERERFRERERARFBEQDxEVDw4RFA4NERUNDBEUDAsRFQsKERQKCREVCQgRFAgHERUHBhEUBgURFQUEERQEAxEVAwIRFAIBERUBERTbPBETERURExESERQREhERERMREREQERIREA8REQ8OERAOEN8AmwCWAQhVHNs8AJcD1hETERURExESERQREhERERUREREQERQREA8RFQ8OERQODREVDQwRFAwLERULChEUCgkRFQkIERQIBxEVBwYRFAYFERUFBBEUBAMRFQMCERQCAREVAREUVhXbPNs8JoEBAVYXWfQNb6GSMG3fALgAoACYAf4gbpIwbZ3Q9ASBAQHXAFlsEm8C4iBu8tCAbyKBAQsBERd/cSFulVtZ9FkwmMgBzwBBM/RB4oEBAREWyFkC9ACBAQHPAMkQNwIRFQIBERYBIG6VMFn0WjCUQTP0FeIRERETEREREBESERAPEREPDhEQDhDfEM4QvRCsEJsQihB5AKMBcjDTHwGCEFE+81668uCB+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiAGBAQHXAFlsEts8fwCaAvQRExEVERMREhEUERIREREVEREREBEUERAPERUPDhEUDg0RFQ0MERQMCxEVCwoRFAoJERUJCBEUCAcRFQcGERQGBREVBQQRFAQDERUDAhEUAgERFQERFNs8ERMRFRETERIRFBESERERExERERAREhEQDxERDw4REA4Q3wCbAJ0C0iYREhEUERIRERETEREREBEUERAPERMPDhEUDg0REw0MERQMCxETCwoRFAoJERMJCBEUCAcREwcGERQGBRETBQQRFAQDERMDAhEUAgEREwERFIEBAREU2zwCERYCAREVAVn0DW+hkjBt3wEfAJwA1CBukjBtndD0BIEBAdcAWWwSbwLigRWUIW6z8vQgbvLQgG8iMIEBC/hBbyQQI18DcUEz9ApvoZQB1wAwkltt4oFCjyFus5gBIG7y0IDA/5IxcOLy9BERERMREREQERIREA8REQ8OERAOVR0BCFUc2zwAnwK6ghAXMr4huo7IMNMfAYIQFzK+Ibry4IGBAQHXAPpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgSbBKBHwv4QW8kECNfAyLHBfL02zx/4IIQJPpHybrjAjBwAJ8ApAPWERMRFRETERIRFBESERERFRERERARFBEQDxEVDw4RFA4NERUNDBEUDAsRFQsKERQKCREVCQgRFAgHERUHBhEUBgURFQUEERQEAxEVAwIRFAIBERUBERRWFds82zwmgQEBVhdZ9A1voZIwbd8AuACgAKIC8oIAxO34QW8kECNfAxEVERYRFREUERYRFBETERYRExESERYREhERERYREREQERYREA8RFg8OERYODREWDQwRFgwLERYLChEWCgkRFgkIERYIBxEWBwYRFgYFERYFBBEWBAMRFgMCERYCAREW2zwBERUB8vQREhETERIArAChACQRERESEREREBERERAPERAPVQ4B/iBukjBtndD0BIEBAdcAWWwSbwLiIG7y0IBvIoEBCwERF3BxIW6VW1n0WTCYyAHPAEEz9EHigQEBERbIWQL0AIEBAc8AyRA3AhEVAgERFgEgbpUwWfRaMJRBM/QV4hERERMREREQERIREA8REQ8OERAOEN8QzhC9EKwQmxCKEHkAowASEGgQVwYQNUQDANzTHwGCECT6R8m68uCBgQEB1wCBAQHXAFlsEiiBAQEjWfQNb6GSMG3fIG6SMG2d0PQEgQEB1wBZbBJvAuKBVOUhbrPy9CBu8tCAbyIwgQEBAshZAvQAgQEBzwDJEDkSIG6VMFn0WjCUQTP0FeIGfwH0AREUARETINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WARERINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WH/QAHYEBAc8AC8iBAQHPABr0ABj0ABb0ABSBAQHPAALI9ACBAQHPABLKABKBAQHPABL0ABIApgBI9AATgQEBzwADyPQAFIEBAc8AFfQAE4EBAc8AyVjMyVjMyQHMAgEgAKgA2AIBIACpALACASAAqgCvAgEgAKsArQKbsmtASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjbPBETERURExESERQREhERERMREREQERIREA8REQ8OERAOEN9VHNs8VxBfD2xBgAQoArACigQEBKQJZ9A1voZIwbd8gbpIwbZ3Q9ASBAQHXAFlsEm8C4iBukltwjicgbvLQgG8iMIEBC1hxQTP0Cm+hlAHXADCSW23iIG6SMHDgIG7y0IDiAnOwkbbPBETERYRExESERUREhERERQREREQERMREA8REg8OEREODREQDRDPEL5VKts8VxJXEF8PbCIygAQoArgFYgQEBVEkUWfQNb6GSMG3fIG6SMG2X0PQEATFvAeIgbphfA21wVHEBIeMOXwQA+QIZt1ebZ5tniuIL4e2IMAEKARICASAAsQDDAgEgALIAuQIBSACzALUCaKmM2zwRExEWERMREhEVERIREREUEREREBETERAPERIPDhERDg0REA0QzxC+VSrbPGzGbIYBCgC0AVSBAQFUSRRZ9A1voZIwbd8gbpIwbZfQ9AQBMW8B4iBumF8DbXBUcQEh4w4A+QIBWAC2ALcCW6E7bPBETERURExESERQREhERERMREREQERIREA8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');
    let builder = (0, core_1.beginCell)();
    builder.storeRef(__system);
    builder.storeUint(0, 1);
    initEmmetBridge_init_args({ $$type: 'EmmetBridge_init_args', admin, cfo, validator })(builder);
    const __data = builder.endCell();
    return { code: __code, data: __data };
}
const EmmetBridge_errors = {
    2: { message: `Stack underflow` },
    3: { message: `Stack overflow` },
    4: { message: `Integer overflow` },
    5: { message: `Integer out of expected range` },
    6: { message: `Invalid opcode` },
    7: { message: `Type check error` },
    8: { message: `Cell overflow` },
    9: { message: `Cell underflow` },
    10: { message: `Dictionary error` },
    11: { message: `'Unknown' error` },
    12: { message: `Fatal error` },
    13: { message: `Out of gas error` },
    14: { message: `Virtualization error` },
    32: { message: `Action list is invalid` },
    33: { message: `Action list is too long` },
    34: { message: `Action is invalid or not supported` },
    35: { message: `Invalid source address in outbound message` },
    36: { message: `Invalid destination address in outbound message` },
    37: { message: `Not enough TON` },
    38: { message: `Not enough extra-currencies` },
    39: { message: `Outbound message does not fit into a cell after rewriting` },
    40: { message: `Cannot process a message` },
    41: { message: `Library reference is null` },
    42: { message: `Library change action error` },
    43: { message: `Exceeded maximum number of cells in the library or the maximum depth of the Merkle tree` },
    50: { message: `Account state size exceeded limits` },
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
    1348: { message: `EmmetBridge: Wallet for Jetton not set` },
    2927: { message: `AccessControl: Role ID doesn't exist` },
    5524: { message: `AccessControl: Role ADMIN is undefined` },
    6187: { message: `AccessControl: Doesn't have the CFO role` },
    7912: { message: `AccessControl: Role VALIDATOR is undefined` },
    7929: { message: `EmmetBridge: The contract is paused` },
    7947: { message: `AccessControl: BadConfirmation` },
    8083: { message: `EmmetBridge: unsupported incoming strategy` },
    10858: { message: `AccessControl: Doesn't have the BRIDGE role` },
    12450: { message: `AccessControl: Role BRIDGE is undefined` },
    13687: { message: `EmmetBridge: Previously processed TX` },
    15470: { message: `EmmetBridge: Burned with no bridge instructions` },
    15733: { message: `AccessControl: Doesn't have the VALIDATOR role` },
    17039: { message: `AccessControl: Doesn't have the ADMIN role` },
    17393: { message: `EmmetBridge: unsupported chain` },
    17817: { message: `EmmetBridge: unsupported from_token` },
    21733: { message: `AccessControl: Role doesn't exist` },
    22394: { message: `EmmetBridge: JettonWallet not set` },
    23959: { message: `EmmetBridge: BFT threshold not reached.` },
    24015: { message: `EmmetBridge: Invalid Sender` },
    27930: { message: `Validator already exists` },
    32311: { message: `EmmetBridge: Unauthorised Burn notification` },
    35021: { message: `EmmetBridge: unsupported outgoing strategy` },
    38572: { message: `EmmetBridge: Insufficient fee` },
    39260: { message: `EmmetBridge: Unsupported step` },
    43937: { message: `EmmetBridge: unsupported to_token` },
    48142: { message: `Negative protocol fee prohibited` },
    48957: { message: `EmmetBridge: Cannot MINT Toncoin` },
    50413: { message: `AccessControl: Doesnt have the role` },
    53050: { message: `EmmetBridge: Unsupported flow. Instead burn & notify the bridge!` },
    53581: { message: `AccessControl: Role CFO is undefined` },
    54162: { message: `EmmetBridge: in FreezeTon from_token must be TON` },
    57859: { message: `EmmetBridge: Installment hash mismatch` },
    61198: { message: `Negative TX fee prohibited` },
    63023: { message: `EmmetBridge: Negative consensus fee prohibited` },
};
const EmmetBridge_types = [
    { "name": "StateInit", "header": null, "fields": [{ "name": "code", "type": { "kind": "simple", "type": "cell", "optional": false } }, { "name": "data", "type": { "kind": "simple", "type": "cell", "optional": false } }] },
    { "name": "StdAddress", "header": null, "fields": [{ "name": "workchain", "type": { "kind": "simple", "type": "int", "optional": false, "format": 8 } }, { "name": "address", "type": { "kind": "simple", "type": "uint", "optional": false, "format": 256 } }] },
    { "name": "VarAddress", "header": null, "fields": [{ "name": "workchain", "type": { "kind": "simple", "type": "int", "optional": false, "format": 32 } }, { "name": "address", "type": { "kind": "simple", "type": "slice", "optional": false } }] },
    { "name": "Context", "header": null, "fields": [{ "name": "bounced", "type": { "kind": "simple", "type": "bool", "optional": false } }, { "name": "sender", "type": { "kind": "simple", "type": "address", "optional": false } }, { "name": "value", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "raw", "type": { "kind": "simple", "type": "slice", "optional": false } }] },
    { "name": "SendParameters", "header": null, "fields": [{ "name": "bounce", "type": { "kind": "simple", "type": "bool", "optional": false } }, { "name": "to", "type": { "kind": "simple", "type": "address", "optional": false } }, { "name": "value", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "mode", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "body", "type": { "kind": "simple", "type": "cell", "optional": true } }, { "name": "code", "type": { "kind": "simple", "type": "cell", "optional": true } }, { "name": "data", "type": { "kind": "simple", "type": "cell", "optional": true } }] },
    { "name": "Installment", "header": 1572369283, "fields": [{ "name": "from_chain", "type": { "kind": "simple", "type": "uint", "optional": false, "format": 64 } }, { "name": "target_chain", "type": { "kind": "simple", "type": "uint", "optional": false, "format": 64 } }, { "name": "amount", "type": { "kind": "simple", "type": "uint", "optional": false, "format": "coins" } }, { "name": "nonce", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "from_token", "type": { "kind": "simple", "type": "cell", "optional": false } }, { "name": "to_token", "type": { "kind": "simple", "type": "cell", "optional": false } }, { "name": "recipient", "type": { "kind": "simple", "type": "address", "optional": false } }] },
    { "name": "SignerAndSignature", "header": null, "fields": [{ "name": "signature", "type": { "kind": "simple", "type": "slice", "optional": false } }, { "name": "key", "type": { "kind": "simple", "type": "uint", "optional": false, "format": 256 } }] },
    { "name": "ReceiveInstallment", "header": 953435710, "fields": [{ "name": "installment", "type": { "kind": "simple", "type": "Installment", "optional": false } }, { "name": "signatures", "type": { "kind": "dict", "key": "int", "value": "SignerAndSignature", "valueFormat": "ref" } }, { "name": "len", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "tx_hash", "type": { "kind": "simple", "type": "uint", "optional": false, "format": 256 } }, { "name": "id", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }] },
    { "name": "FreezeTon", "header": 3943853515, "fields": [{ "name": "target_chain", "type": { "kind": "simple", "type": "uint", "optional": false, "format": 64 } }, { "name": "to_token", "type": { "kind": "simple", "type": "cell", "optional": false } }, { "name": "to", "type": { "kind": "simple", "type": "cell", "optional": false } }, { "name": "from_token", "type": { "kind": "simple", "type": "cell", "optional": false } }, { "name": "amount", "type": { "kind": "simple", "type": "uint", "optional": false, "format": "coins" } }] },
    { "name": "OutgoingTransaction", "header": 1673830231, "fields": [{ "name": "id", "type": { "kind": "simple", "type": "uint", "optional": false, "format": 256 } }, { "name": "amount", "type": { "kind": "simple", "type": "uint", "optional": false, "format": "coins" } }, { "name": "from_token", "type": { "kind": "simple", "type": "cell", "optional": false } }, { "name": "to_token", "type": { "kind": "simple", "type": "cell", "optional": false } }, { "name": "to", "type": { "kind": "simple", "type": "cell", "optional": false } }, { "name": "target_chain_id", "type": { "kind": "simple", "type": "uint", "optional": false, "format": 64 } }] },
    { "name": "IncomingTransaction", "header": 1311663233, "fields": [{ "name": "id", "type": { "kind": "simple", "type": "uint", "optional": false, "format": 256 } }, { "name": "amount", "type": { "kind": "simple", "type": "uint", "optional": false, "format": "coins" } }, { "name": "from_token", "type": { "kind": "simple", "type": "cell", "optional": false } }, { "name": "to_token", "type": { "kind": "simple", "type": "cell", "optional": false } }, { "name": "target_chain_id", "type": { "kind": "simple", "type": "uint", "optional": false, "format": 64 } }, { "name": "to", "type": { "kind": "simple", "type": "address", "optional": false } }] },
    { "name": "InstallmentOut", "header": null, "fields": [{ "name": "amount", "type": { "kind": "simple", "type": "uint", "optional": false, "format": 256 } }, { "name": "to", "type": { "kind": "simple", "type": "string", "optional": false } }, { "name": "target_chain", "type": { "kind": "simple", "type": "uint", "optional": false, "format": 64 } }, { "name": "token_id", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }] },
    { "name": "ReleaseTokens", "header": 169475742, "fields": [{ "name": "to", "type": { "kind": "simple", "type": "address", "optional": false } }, { "name": "amount", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "body", "type": { "kind": "simple", "type": "cell", "optional": true } }] },
    { "name": "JettonBurnNotification", "header": 2078119902, "fields": [{ "name": "query_id", "type": { "kind": "simple", "type": "uint", "optional": false, "format": 64 } }, { "name": "amount", "type": { "kind": "simple", "type": "uint", "optional": false, "format": "coins" } }, { "name": "sender", "type": { "kind": "simple", "type": "address", "optional": false } }, { "name": "response_destination", "type": { "kind": "simple", "type": "address", "optional": false } }, { "name": "forward_ton_amount", "type": { "kind": "simple", "type": "uint", "optional": false, "format": "coins" } }, { "name": "forward_payload", "type": { "kind": "simple", "type": "slice", "optional": false, "format": "remainder" } }] },
    { "name": "JettonMint", "header": 2310479113, "fields": [{ "name": "origin", "type": { "kind": "simple", "type": "address", "optional": false } }, { "name": "receiver", "type": { "kind": "simple", "type": "address", "optional": false } }, { "name": "amount", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "custom_payload", "type": { "kind": "simple", "type": "cell", "optional": true } }, { "name": "forward_ton_amount", "type": { "kind": "simple", "type": "uint", "optional": false, "format": "coins" } }, { "name": "forward_payload", "type": { "kind": "simple", "type": "slice", "optional": false, "format": "remainder" } }] },
    { "name": "JettonTransfer", "header": 260734629, "fields": [{ "name": "query_id", "type": { "kind": "simple", "type": "uint", "optional": false, "format": 64 } }, { "name": "amount", "type": { "kind": "simple", "type": "uint", "optional": false, "format": "coins" } }, { "name": "destination", "type": { "kind": "simple", "type": "address", "optional": false } }, { "name": "response_destination", "type": { "kind": "simple", "type": "address", "optional": true } }, { "name": "custom_payload", "type": { "kind": "simple", "type": "cell", "optional": true } }, { "name": "forward_ton_amount", "type": { "kind": "simple", "type": "uint", "optional": false, "format": "coins" } }, { "name": "forward_payload", "type": { "kind": "simple", "type": "cell", "optional": true } }] },
    { "name": "TokenTransferNotification", "header": 1935855772, "fields": [{ "name": "query_id", "type": { "kind": "simple", "type": "uint", "optional": false, "format": 64 } }, { "name": "amount", "type": { "kind": "simple", "type": "uint", "optional": false, "format": "coins" } }, { "name": "sender", "type": { "kind": "simple", "type": "address", "optional": false } }, { "name": "forward_payload", "type": { "kind": "simple", "type": "slice", "optional": false, "format": "remainder" } }] },
    { "name": "TokenExcesses", "header": 3576854235, "fields": [{ "name": "query_id", "type": { "kind": "simple", "type": "uint", "optional": false, "format": 64 } }] },
    { "name": "StonfiSwap", "header": 1717886506, "fields": [{ "name": "otherTokenWallet", "type": { "kind": "simple", "type": "address", "optional": false } }, { "name": "refundAddress", "type": { "kind": "simple", "type": "address", "optional": false } }, { "name": "excessesAddress", "type": { "kind": "simple", "type": "address", "optional": false } }, { "name": "deadline", "type": { "kind": "simple", "type": "uint", "optional": false, "format": 64 } }, { "name": "additionalData", "type": { "kind": "simple", "type": "SwapAdditionalData", "optional": false } }] },
    { "name": "SwapAdditionalData", "header": null, "fields": [{ "name": "minOut", "type": { "kind": "simple", "type": "uint", "optional": false, "format": "coins" } }, { "name": "receiverAddress", "type": { "kind": "simple", "type": "address", "optional": false } }, { "name": "fwdGas", "type": { "kind": "simple", "type": "uint", "optional": false, "format": "coins" } }, { "name": "customPayload", "type": { "kind": "simple", "type": "cell", "optional": true } }, { "name": "refundFwdGas", "type": { "kind": "simple", "type": "uint", "optional": false, "format": "coins" } }, { "name": "refundPayload", "type": { "kind": "simple", "type": "cell", "optional": true } }, { "name": "refFee", "type": { "kind": "simple", "type": "uint", "optional": false, "format": 16 } }, { "name": "referralAddress", "type": { "kind": "simple", "type": "address", "optional": true } }] },
    { "name": "Deploy", "header": 2490013878, "fields": [{ "name": "queryId", "type": { "kind": "simple", "type": "uint", "optional": false, "format": 64 } }] },
    { "name": "DeployOk", "header": 2952335191, "fields": [{ "name": "queryId", "type": { "kind": "simple", "type": "uint", "optional": false, "format": 64 } }] },
    { "name": "FactoryDeploy", "header": 1829761339, "fields": [{ "name": "queryId", "type": { "kind": "simple", "type": "uint", "optional": false, "format": 64 } }, { "name": "cashback", "type": { "kind": "simple", "type": "address", "optional": false } }] },
    { "name": "DeleteChain", "header": 308842230, "fields": [{ "name": "chain_id", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }] },
    { "name": "DeleteModule", "header": 3720596336, "fields": [{ "name": "step", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }] },
    { "name": "DeleteStategies", "header": 1721311172, "fields": [{ "name": "chain_id", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "from_token", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "to_token", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }] },
    { "name": "DeleteToken", "header": 1711896016, "fields": [{ "name": "symbol", "type": { "kind": "simple", "type": "string", "optional": false } }] },
    { "name": "DeleteValidator", "header": 1954510119, "fields": [{ "name": "candidate", "type": { "kind": "simple", "type": "address", "optional": false } }] },
    { "name": "Pause", "header": 2051344601, "fields": [] },
    { "name": "SetAdmin", "header": 2713466466, "fields": [{ "name": "newAdmin", "type": { "kind": "simple", "type": "address", "optional": false } }] },
    { "name": "SetChain", "header": 3430403683, "fields": [{ "name": "name", "type": { "kind": "simple", "type": "string", "optional": false } }, { "name": "chain_id", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }] },
    { "name": "SetCFO", "header": 3542740611, "fields": [{ "name": "newCFO", "type": { "kind": "simple", "type": "address", "optional": false } }] },
    { "name": "SetModule", "header": 2089213538, "fields": [{ "name": "step", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "module", "type": { "kind": "simple", "type": "address", "optional": false } }] },
    { "name": "SetValidator", "header": 1653987471, "fields": [{ "name": "candidate", "type": { "kind": "simple", "type": "address", "optional": false } }] },
    { "name": "SetStrategies", "header": 3174462983, "fields": [{ "name": "chain_id", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "from_token", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "to_token", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "foreign", "type": { "kind": "simple", "type": "Steps", "optional": false } }, { "name": "incomming", "type": { "kind": "simple", "type": "Steps", "optional": false } }, { "name": "local", "type": { "kind": "simple", "type": "Steps", "optional": false } }] },
    { "name": "SetToken", "header": 679330248, "fields": [{ "name": "address", "type": { "kind": "simple", "type": "address", "optional": false } }, { "name": "decimals", "type": { "kind": "simple", "type": "uint", "optional": false, "format": 8 } }, { "name": "emmet_lp", "type": { "kind": "simple", "type": "address", "optional": false } }, { "name": "symbol", "type": { "kind": "simple", "type": "string", "optional": false } }, { "name": "swap_pool", "type": { "kind": "simple", "type": "address", "optional": false } }, { "name": "swap_router", "type": { "kind": "simple", "type": "address", "optional": false } }, { "name": "wallet", "type": { "kind": "simple", "type": "address", "optional": false } }] },
    { "name": "Unpause", "header": 2378902809, "fields": [] },
    { "name": "UpdateChainFee", "header": 1453661226, "fields": [{ "name": "chain_id", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "strategy_step", "type": { "kind": "simple", "type": "uint", "optional": false, "format": 8 } }, { "name": "gas_amount", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }] },
    { "name": "UpdateConsensusFee", "header": 4061306702, "fields": [{ "name": "amount", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }] },
    { "name": "UpdateMinimumTxFee", "header": 2996339999, "fields": [{ "name": "amount", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }] },
    { "name": "UpdateProtocolFee", "header": 2604971543, "fields": [{ "name": "amount", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }] },
    { "name": "WithdrawGas", "header": 602125092, "fields": [{ "name": "amount", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }] },
    { "name": "Token", "header": null, "fields": [{ "name": "address", "type": { "kind": "simple", "type": "address", "optional": false } }, { "name": "decimals", "type": { "kind": "simple", "type": "uint", "optional": false, "format": 8 } }, { "name": "emmet_lp", "type": { "kind": "simple", "type": "address", "optional": false } }, { "name": "symbol", "type": { "kind": "simple", "type": "string", "optional": false } }, { "name": "swap_pool", "type": { "kind": "simple", "type": "address", "optional": false } }, { "name": "swap_router", "type": { "kind": "simple", "type": "address", "optional": false } }, { "name": "wallet", "type": { "kind": "simple", "type": "address", "optional": false } }] },
    { "name": "Chain", "header": null, "fields": [{ "name": "name", "type": { "kind": "simple", "type": "string", "optional": false } }, { "name": "chain_id", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }] },
    { "name": "ForeignFees", "header": null, "fields": [{ "name": "i", "type": { "kind": "dict", "key": "int", "value": "int" } }] },
    { "name": "Steps", "header": null, "fields": [{ "name": "path", "type": { "kind": "dict", "key": "int", "value": "int" } }, { "name": "size", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }] },
    { "name": "Strategies", "header": null, "fields": [{ "name": "foreign", "type": { "kind": "simple", "type": "Steps", "optional": false } }, { "name": "incomming", "type": { "kind": "simple", "type": "Steps", "optional": false } }, { "name": "local", "type": { "kind": "simple", "type": "Steps", "optional": false } }] },
    { "name": "ToTokenMap", "header": null, "fields": [{ "name": "i", "type": { "kind": "dict", "key": "int", "value": "Strategies", "valueFormat": "ref" } }] },
    { "name": "FromTokenMap", "header": null, "fields": [{ "name": "i", "type": { "kind": "dict", "key": "int", "value": "ToTokenMap", "valueFormat": "ref" } }] },
    { "name": "GrantRole", "header": 174185305, "fields": [{ "name": "to", "type": { "kind": "simple", "type": "address", "optional": false } }, { "name": "role_id", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }] },
    { "name": "RenounceRole", "header": 389201441, "fields": [{ "name": "role_id", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "address", "type": { "kind": "simple", "type": "address", "optional": false } }] },
    { "name": "RevokeRole", "header": 1363080030, "fields": [{ "name": "to", "type": { "kind": "simple", "type": "address", "optional": false } }, { "name": "role_id", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }] },
    { "name": "RoleData", "header": null, "fields": [{ "name": "roles", "type": { "kind": "dict", "key": "address", "value": "bool" } }, { "name": "admin_role", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }] },
    { "name": "UpdateRoleAdmin", "header": 620382153, "fields": [{ "name": "role_id", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "role_admin", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }] },
    { "name": "EmmetBridge$Data", "header": null, "fields": [{ "name": "admin", "type": { "kind": "simple", "type": "address", "optional": false } }, { "name": "cfo", "type": { "kind": "simple", "type": "address", "optional": false } }, { "name": "chains", "type": { "kind": "dict", "key": "int", "value": "Chain", "valueFormat": "ref" } }, { "name": "chainId", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "consensus_fee", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "foreign_fees", "type": { "kind": "dict", "key": "int", "value": "ForeignFees", "valueFormat": "ref" } }, { "name": "incomming_txs", "type": { "kind": "dict", "key": "int", "value": "bool" } }, { "name": "locked", "type": { "kind": "dict", "key": "int", "value": "int" } }, { "name": "min_tx_fee", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "modules", "type": { "kind": "dict", "key": "int", "value": "address" } }, { "name": "nonce", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "paused", "type": { "kind": "simple", "type": "bool", "optional": false } }, { "name": "protocol_fee", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "roles", "type": { "kind": "dict", "key": "int", "value": "RoleData", "valueFormat": "ref" } }, { "name": "token_strategies", "type": { "kind": "dict", "key": "int", "value": "FromTokenMap", "valueFormat": "ref" } }, { "name": "threshold", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "tokens", "type": { "kind": "dict", "key": "int", "value": "Token", "valueFormat": "ref" } }, { "name": "TVL", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "validators", "type": { "kind": "dict", "key": "int", "value": "address" } }, { "name": "validator_count", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }] },
];
const EmmetBridge_getters = [
    { "name": "estimate_fee", "arguments": [{ "name": "chain_id", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "from_token", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "to_token", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }], "returnType": { "kind": "simple", "type": "int", "optional": false, "format": 257 } },
    { "name": "get_admin", "arguments": [], "returnType": { "kind": "simple", "type": "address", "optional": false } },
    { "name": "get_cfo", "arguments": [], "returnType": { "kind": "simple", "type": "address", "optional": false } },
    { "name": "get_chain", "arguments": [{ "name": "chain_id", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }], "returnType": { "kind": "simple", "type": "Chain", "optional": false } },
    { "name": "get_min_tx_fee", "arguments": [], "returnType": { "kind": "simple", "type": "int", "optional": false, "format": 257 } },
    { "name": "get_module", "arguments": [{ "name": "step", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }], "returnType": { "kind": "simple", "type": "address", "optional": false } },
    { "name": "get_nonce", "arguments": [], "returnType": { "kind": "simple", "type": "int", "optional": false, "format": 257 } },
    { "name": "get_chain_id", "arguments": [], "returnType": { "kind": "simple", "type": "int", "optional": false, "format": 257 } },
    { "name": "get_consensus_fee", "arguments": [], "returnType": { "kind": "simple", "type": "int", "optional": false, "format": 257 } },
    { "name": "get_locked", "arguments": [{ "name": "token", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }], "returnType": { "kind": "simple", "type": "int", "optional": false, "format": 257 } },
    { "name": "get_paused", "arguments": [], "returnType": { "kind": "simple", "type": "bool", "optional": false } },
    { "name": "get_protocol_fee", "arguments": [], "returnType": { "kind": "simple", "type": "int", "optional": false, "format": 257 } },
    { "name": "get_step_fee", "arguments": [{ "name": "chain_id", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "step", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }], "returnType": { "kind": "simple", "type": "int", "optional": false, "format": 257 } },
    { "name": "get_threshold", "arguments": [], "returnType": { "kind": "simple", "type": "int", "optional": false, "format": 257 } },
    { "name": "get_token", "arguments": [{ "name": "key", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }], "returnType": { "kind": "simple", "type": "Token", "optional": false } },
    { "name": "get_tvl", "arguments": [], "returnType": { "kind": "simple", "type": "int", "optional": false, "format": 257 } },
    { "name": "get_validator", "arguments": [{ "name": "index", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }], "returnType": { "kind": "simple", "type": "address", "optional": false } },
    { "name": "get_validator_count", "arguments": [], "returnType": { "kind": "simple", "type": "int", "optional": false, "format": 257 } },
    { "name": "is_processed", "arguments": [{ "name": "hash", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }], "returnType": { "kind": "simple", "type": "bool", "optional": false } },
    { "name": "is_validator", "arguments": [{ "name": "address", "type": { "kind": "simple", "type": "address", "optional": false } }], "returnType": { "kind": "simple", "type": "bool", "optional": false } },
    { "name": "admin_role_id", "arguments": [], "returnType": { "kind": "simple", "type": "int", "optional": false, "format": 257 } },
    { "name": "bridge_role_id", "arguments": [], "returnType": { "kind": "simple", "type": "int", "optional": false, "format": 257 } },
    { "name": "cfo_role_id", "arguments": [], "returnType": { "kind": "simple", "type": "int", "optional": false, "format": 257 } },
    { "name": "has_role", "arguments": [{ "name": "address", "type": { "kind": "simple", "type": "address", "optional": false } }, { "name": "role_id", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }], "returnType": { "kind": "simple", "type": "bool", "optional": false } },
    { "name": "role_admin", "arguments": [{ "name": "role_id", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }], "returnType": { "kind": "simple", "type": "int", "optional": false, "format": 257 } },
    { "name": "validator_role_id", "arguments": [], "returnType": { "kind": "simple", "type": "int", "optional": false, "format": 257 } },
    { "name": "get_foreign_strategies", "arguments": [{ "name": "chain_id", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "from_token", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "to_token", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }], "returnType": { "kind": "simple", "type": "Steps", "optional": false } },
    { "name": "get_incoming_strategies", "arguments": [{ "name": "chain_id", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "from_token", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "to_token", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }], "returnType": { "kind": "simple", "type": "Steps", "optional": false } },
    { "name": "get_local_strategies", "arguments": [{ "name": "chain_id", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "from_token", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "to_token", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }], "returnType": { "kind": "simple", "type": "Steps", "optional": false } },
    { "name": "get_strategies", "arguments": [{ "name": "chain_id", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "from_token", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "to_token", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }], "returnType": { "kind": "simple", "type": "Strategies", "optional": false } },
];
exports.EmmetBridge_getterMapping = {
    'estimate_fee': 'getEstimateFee',
    'get_admin': 'getGetAdmin',
    'get_cfo': 'getGetCfo',
    'get_chain': 'getGetChain',
    'get_min_tx_fee': 'getGetMinTxFee',
    'get_module': 'getGetModule',
    'get_nonce': 'getGetNonce',
    'get_chain_id': 'getGetChainId',
    'get_consensus_fee': 'getGetConsensusFee',
    'get_locked': 'getGetLocked',
    'get_paused': 'getGetPaused',
    'get_protocol_fee': 'getGetProtocolFee',
    'get_step_fee': 'getGetStepFee',
    'get_threshold': 'getGetThreshold',
    'get_token': 'getGetToken',
    'get_tvl': 'getGetTvl',
    'get_validator': 'getGetValidator',
    'get_validator_count': 'getGetValidatorCount',
    'is_processed': 'getIsProcessed',
    'is_validator': 'getIsValidator',
    'admin_role_id': 'getAdminRoleId',
    'bridge_role_id': 'getBridgeRoleId',
    'cfo_role_id': 'getCfoRoleId',
    'has_role': 'getHasRole',
    'role_admin': 'getRoleAdmin',
    'validator_role_id': 'getValidatorRoleId',
    'get_foreign_strategies': 'getGetForeignStrategies',
    'get_incoming_strategies': 'getGetIncomingStrategies',
    'get_local_strategies': 'getGetLocalStrategies',
    'get_strategies': 'getGetStrategies',
};
const EmmetBridge_receivers = [
    { "receiver": "internal", "message": { "kind": "typed", "type": "TokenExcesses" } },
    { "receiver": "internal", "message": { "kind": "typed", "type": "ReceiveInstallment" } },
    { "receiver": "internal", "message": { "kind": "typed", "type": "FreezeTon" } },
    { "receiver": "internal", "message": { "kind": "typed", "type": "JettonBurnNotification" } },
    { "receiver": "internal", "message": { "kind": "typed", "type": "TokenTransferNotification" } },
    { "receiver": "internal", "message": { "kind": "empty" } },
    { "receiver": "internal", "message": { "kind": "typed", "type": "DeleteChain" } },
    { "receiver": "internal", "message": { "kind": "typed", "type": "DeleteModule" } },
    { "receiver": "internal", "message": { "kind": "typed", "type": "DeleteStategies" } },
    { "receiver": "internal", "message": { "kind": "typed", "type": "DeleteToken" } },
    { "receiver": "internal", "message": { "kind": "typed", "type": "DeleteValidator" } },
    { "receiver": "internal", "message": { "kind": "typed", "type": "Pause" } },
    { "receiver": "internal", "message": { "kind": "typed", "type": "SetAdmin" } },
    { "receiver": "internal", "message": { "kind": "typed", "type": "SetChain" } },
    { "receiver": "internal", "message": { "kind": "typed", "type": "SetCFO" } },
    { "receiver": "internal", "message": { "kind": "typed", "type": "SetModule" } },
    { "receiver": "internal", "message": { "kind": "typed", "type": "SetStrategies" } },
    { "receiver": "internal", "message": { "kind": "typed", "type": "SetToken" } },
    { "receiver": "internal", "message": { "kind": "typed", "type": "SetValidator" } },
    { "receiver": "internal", "message": { "kind": "typed", "type": "Unpause" } },
    { "receiver": "internal", "message": { "kind": "typed", "type": "UpdateChainFee" } },
    { "receiver": "internal", "message": { "kind": "typed", "type": "UpdateConsensusFee" } },
    { "receiver": "internal", "message": { "kind": "typed", "type": "UpdateMinimumTxFee" } },
    { "receiver": "internal", "message": { "kind": "typed", "type": "UpdateProtocolFee" } },
    { "receiver": "internal", "message": { "kind": "typed", "type": "WithdrawGas" } },
    { "receiver": "internal", "message": { "kind": "typed", "type": "Deploy" } },
    { "receiver": "internal", "message": { "kind": "typed", "type": "GrantRole" } },
    { "receiver": "internal", "message": { "kind": "typed", "type": "RevokeRole" } },
    { "receiver": "internal", "message": { "kind": "typed", "type": "RenounceRole" } },
    { "receiver": "internal", "message": { "kind": "typed", "type": "UpdateRoleAdmin" } },
];
class EmmetBridge {
    static async init(admin, cfo, validator) {
        return await EmmetBridge_init(admin, cfo, validator);
    }
    static async fromInit(admin, cfo, validator) {
        const init = await EmmetBridge_init(admin, cfo, validator);
        const address = (0, core_1.contractAddress)(0, init);
        return new EmmetBridge(address, init);
    }
    static fromAddress(address) {
        return new EmmetBridge(address);
    }
    constructor(address, init) {
        this.abi = {
            types: EmmetBridge_types,
            getters: EmmetBridge_getters,
            receivers: EmmetBridge_receivers,
            errors: EmmetBridge_errors,
        };
        this.address = address;
        this.init = init;
    }
    async send(provider, via, args, message) {
        let body = null;
        if (message && typeof message === 'object' && !(message instanceof core_1.Slice) && message.$$type === 'TokenExcesses') {
            body = (0, core_1.beginCell)().store(storeTokenExcesses(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof core_1.Slice) && message.$$type === 'ReceiveInstallment') {
            body = (0, core_1.beginCell)().store(storeReceiveInstallment(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof core_1.Slice) && message.$$type === 'FreezeTon') {
            body = (0, core_1.beginCell)().store(storeFreezeTon(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof core_1.Slice) && message.$$type === 'JettonBurnNotification') {
            body = (0, core_1.beginCell)().store(storeJettonBurnNotification(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof core_1.Slice) && message.$$type === 'TokenTransferNotification') {
            body = (0, core_1.beginCell)().store(storeTokenTransferNotification(message)).endCell();
        }
        if (message === null) {
            body = new core_1.Cell();
        }
        if (message && typeof message === 'object' && !(message instanceof core_1.Slice) && message.$$type === 'DeleteChain') {
            body = (0, core_1.beginCell)().store(storeDeleteChain(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof core_1.Slice) && message.$$type === 'DeleteModule') {
            body = (0, core_1.beginCell)().store(storeDeleteModule(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof core_1.Slice) && message.$$type === 'DeleteStategies') {
            body = (0, core_1.beginCell)().store(storeDeleteStategies(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof core_1.Slice) && message.$$type === 'DeleteToken') {
            body = (0, core_1.beginCell)().store(storeDeleteToken(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof core_1.Slice) && message.$$type === 'DeleteValidator') {
            body = (0, core_1.beginCell)().store(storeDeleteValidator(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof core_1.Slice) && message.$$type === 'Pause') {
            body = (0, core_1.beginCell)().store(storePause()).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof core_1.Slice) && message.$$type === 'SetAdmin') {
            body = (0, core_1.beginCell)().store(storeSetAdmin(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof core_1.Slice) && message.$$type === 'SetChain') {
            body = (0, core_1.beginCell)().store(storeSetChain(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof core_1.Slice) && message.$$type === 'SetCFO') {
            body = (0, core_1.beginCell)().store(storeSetCFO(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof core_1.Slice) && message.$$type === 'SetModule') {
            body = (0, core_1.beginCell)().store(storeSetModule(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof core_1.Slice) && message.$$type === 'SetStrategies') {
            body = (0, core_1.beginCell)().store(storeSetStrategies(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof core_1.Slice) && message.$$type === 'SetToken') {
            body = (0, core_1.beginCell)().store(storeSetToken(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof core_1.Slice) && message.$$type === 'SetValidator') {
            body = (0, core_1.beginCell)().store(storeSetValidator(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof core_1.Slice) && message.$$type === 'Unpause') {
            body = (0, core_1.beginCell)().store(storeUnpause()).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof core_1.Slice) && message.$$type === 'UpdateChainFee') {
            body = (0, core_1.beginCell)().store(storeUpdateChainFee(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof core_1.Slice) && message.$$type === 'UpdateConsensusFee') {
            body = (0, core_1.beginCell)().store(storeUpdateConsensusFee(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof core_1.Slice) && message.$$type === 'UpdateMinimumTxFee') {
            body = (0, core_1.beginCell)().store(storeUpdateMinimumTxFee(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof core_1.Slice) && message.$$type === 'UpdateProtocolFee') {
            body = (0, core_1.beginCell)().store(storeUpdateProtocolFee(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof core_1.Slice) && message.$$type === 'WithdrawGas') {
            body = (0, core_1.beginCell)().store(storeWithdrawGas(message)).endCell();
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
    async getEstimateFee(provider, chain_id, from_token, to_token) {
        let builder = new core_1.TupleBuilder();
        builder.writeNumber(chain_id);
        builder.writeNumber(from_token);
        builder.writeNumber(to_token);
        let source = (await provider.get('estimate_fee', builder.build())).stack;
        let result = source.readBigNumber();
        return result;
    }
    async getGetAdmin(provider) {
        let builder = new core_1.TupleBuilder();
        let source = (await provider.get('get_admin', builder.build())).stack;
        let result = source.readAddress();
        return result;
    }
    async getGetCfo(provider) {
        let builder = new core_1.TupleBuilder();
        let source = (await provider.get('get_cfo', builder.build())).stack;
        let result = source.readAddress();
        return result;
    }
    async getGetChain(provider, chain_id) {
        let builder = new core_1.TupleBuilder();
        builder.writeNumber(chain_id);
        let source = (await provider.get('get_chain', builder.build())).stack;
        const result = loadGetterTupleChain(source);
        return result;
    }
    async getGetMinTxFee(provider) {
        let builder = new core_1.TupleBuilder();
        let source = (await provider.get('get_min_tx_fee', builder.build())).stack;
        let result = source.readBigNumber();
        return result;
    }
    async getGetModule(provider, step) {
        let builder = new core_1.TupleBuilder();
        builder.writeNumber(step);
        let source = (await provider.get('get_module', builder.build())).stack;
        let result = source.readAddress();
        return result;
    }
    async getGetNonce(provider) {
        let builder = new core_1.TupleBuilder();
        let source = (await provider.get('get_nonce', builder.build())).stack;
        let result = source.readBigNumber();
        return result;
    }
    async getGetChainId(provider) {
        let builder = new core_1.TupleBuilder();
        let source = (await provider.get('get_chain_id', builder.build())).stack;
        let result = source.readBigNumber();
        return result;
    }
    async getGetConsensusFee(provider) {
        let builder = new core_1.TupleBuilder();
        let source = (await provider.get('get_consensus_fee', builder.build())).stack;
        let result = source.readBigNumber();
        return result;
    }
    async getGetLocked(provider, token) {
        let builder = new core_1.TupleBuilder();
        builder.writeNumber(token);
        let source = (await provider.get('get_locked', builder.build())).stack;
        let result = source.readBigNumber();
        return result;
    }
    async getGetPaused(provider) {
        let builder = new core_1.TupleBuilder();
        let source = (await provider.get('get_paused', builder.build())).stack;
        let result = source.readBoolean();
        return result;
    }
    async getGetProtocolFee(provider) {
        let builder = new core_1.TupleBuilder();
        let source = (await provider.get('get_protocol_fee', builder.build())).stack;
        let result = source.readBigNumber();
        return result;
    }
    async getGetStepFee(provider, chain_id, step) {
        let builder = new core_1.TupleBuilder();
        builder.writeNumber(chain_id);
        builder.writeNumber(step);
        let source = (await provider.get('get_step_fee', builder.build())).stack;
        let result = source.readBigNumber();
        return result;
    }
    async getGetThreshold(provider) {
        let builder = new core_1.TupleBuilder();
        let source = (await provider.get('get_threshold', builder.build())).stack;
        let result = source.readBigNumber();
        return result;
    }
    async getGetToken(provider, key) {
        let builder = new core_1.TupleBuilder();
        builder.writeNumber(key);
        let source = (await provider.get('get_token', builder.build())).stack;
        const result = loadGetterTupleToken(source);
        return result;
    }
    async getGetTvl(provider) {
        let builder = new core_1.TupleBuilder();
        let source = (await provider.get('get_tvl', builder.build())).stack;
        let result = source.readBigNumber();
        return result;
    }
    async getGetValidator(provider, index) {
        let builder = new core_1.TupleBuilder();
        builder.writeNumber(index);
        let source = (await provider.get('get_validator', builder.build())).stack;
        let result = source.readAddress();
        return result;
    }
    async getGetValidatorCount(provider) {
        let builder = new core_1.TupleBuilder();
        let source = (await provider.get('get_validator_count', builder.build())).stack;
        let result = source.readBigNumber();
        return result;
    }
    async getIsProcessed(provider, hash) {
        let builder = new core_1.TupleBuilder();
        builder.writeNumber(hash);
        let source = (await provider.get('is_processed', builder.build())).stack;
        let result = source.readBoolean();
        return result;
    }
    async getIsValidator(provider, address) {
        let builder = new core_1.TupleBuilder();
        builder.writeAddress(address);
        let source = (await provider.get('is_validator', builder.build())).stack;
        let result = source.readBoolean();
        return result;
    }
    async getAdminRoleId(provider) {
        let builder = new core_1.TupleBuilder();
        let source = (await provider.get('admin_role_id', builder.build())).stack;
        let result = source.readBigNumber();
        return result;
    }
    async getBridgeRoleId(provider) {
        let builder = new core_1.TupleBuilder();
        let source = (await provider.get('bridge_role_id', builder.build())).stack;
        let result = source.readBigNumber();
        return result;
    }
    async getCfoRoleId(provider) {
        let builder = new core_1.TupleBuilder();
        let source = (await provider.get('cfo_role_id', builder.build())).stack;
        let result = source.readBigNumber();
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
        let result = source.readBigNumber();
        return result;
    }
    async getValidatorRoleId(provider) {
        let builder = new core_1.TupleBuilder();
        let source = (await provider.get('validator_role_id', builder.build())).stack;
        let result = source.readBigNumber();
        return result;
    }
    async getGetForeignStrategies(provider, chain_id, from_token, to_token) {
        let builder = new core_1.TupleBuilder();
        builder.writeNumber(chain_id);
        builder.writeNumber(from_token);
        builder.writeNumber(to_token);
        let source = (await provider.get('get_foreign_strategies', builder.build())).stack;
        const result = loadGetterTupleSteps(source);
        return result;
    }
    async getGetIncomingStrategies(provider, chain_id, from_token, to_token) {
        let builder = new core_1.TupleBuilder();
        builder.writeNumber(chain_id);
        builder.writeNumber(from_token);
        builder.writeNumber(to_token);
        let source = (await provider.get('get_incoming_strategies', builder.build())).stack;
        const result = loadGetterTupleSteps(source);
        return result;
    }
    async getGetLocalStrategies(provider, chain_id, from_token, to_token) {
        let builder = new core_1.TupleBuilder();
        builder.writeNumber(chain_id);
        builder.writeNumber(from_token);
        builder.writeNumber(to_token);
        let source = (await provider.get('get_local_strategies', builder.build())).stack;
        const result = loadGetterTupleSteps(source);
        return result;
    }
    async getGetStrategies(provider, chain_id, from_token, to_token) {
        let builder = new core_1.TupleBuilder();
        builder.writeNumber(chain_id);
        builder.writeNumber(from_token);
        builder.writeNumber(to_token);
        let source = (await provider.get('get_strategies', builder.build())).stack;
        const result = loadGetterTupleStrategies(source);
        return result;
    }
}
exports.EmmetBridge = EmmetBridge;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvY29udHJhY3RzL3Rvbi9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUEwQkEsd0NBTUM7QUFFRCxzQ0FLQztBQVFELDBDQU1DO0FBRUQsd0NBS0M7QUFRRCwwQ0FNQztBQUVELHdDQUtDO0FBVUQsb0NBUUM7QUFFRCxrQ0FPQztBQWFELGtEQVdDO0FBRUQsZ0RBVUM7QUFhRCw0Q0FZQztBQUVELDBDQVdDO0FBUUQsMERBTUM7QUFFRCx3REFLQztBQXNCRCwwREFZQztBQUVELHdEQVVDO0FBV0Qsd0NBVUM7QUFFRCxzQ0FTQztBQVlELDREQVdDO0FBRUQsMERBVUM7QUFZRCw0REFXQztBQUVELDBEQVVDO0FBVUQsa0RBUUM7QUFFRCxnREFPQztBQVNELGdEQVFDO0FBRUQsOENBT0M7QUFZRCxrRUFXQztBQUVELGdFQVVDO0FBWUQsMENBV0M7QUFFRCx3Q0FVQztBQWFELGtEQVlDO0FBRUQsZ0RBV0M7QUFVRCx3RUFTQztBQUVELHNFQVFDO0FBT0QsZ0RBTUM7QUFFRCw4Q0FLQztBQVdELDBDQVlDO0FBRUQsd0NBVUM7QUFjRCwwREFZQztBQUVELHdEQVdDO0FBT0Qsa0NBTUM7QUFFRCxnQ0FLQztBQU9ELHNDQU1DO0FBRUQsb0NBS0M7QUFRRCxnREFPQztBQUVELDhDQU1DO0FBT0QsNENBTUM7QUFFRCwwQ0FLQztBQU9ELDhDQU1DO0FBRUQsNENBS0M7QUFTRCxvREFRQztBQUVELGtEQU9DO0FBT0QsNENBTUM7QUFFRCwwQ0FLQztBQU9ELG9EQU1DO0FBRUQsa0RBS0M7QUFNRCxnQ0FLQztBQUVELDhCQUlDO0FBT0Qsc0NBTUM7QUFFRCxvQ0FLQztBQVFELHNDQU9DO0FBRUQsb0NBTUM7QUFPRCxrQ0FNQztBQUVELGdDQUtDO0FBUUQsd0NBT0M7QUFFRCxzQ0FNQztBQU9ELDhDQU1DO0FBRUQsNENBS0M7QUFZRCxnREFhQztBQUVELDhDQVdDO0FBYUQs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QUE7QUFFRCxNQUFNLGlCQUFpQixHQUFjO0lBQ25DLEVBQUMsTUFBTSxFQUFDLFdBQVcsRUFBQyxRQUFRLEVBQUMsSUFBSSxFQUFDLFFBQVEsRUFBQyxDQUFDLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsRUFBQyxNQUFNLEVBQUMsUUFBUSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsVUFBVSxFQUFDLEtBQUssRUFBQyxFQUFDLEVBQUMsRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxFQUFDLE1BQU0sRUFBQyxRQUFRLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxVQUFVLEVBQUMsS0FBSyxFQUFDLEVBQUMsQ0FBQyxFQUFDO0lBQzdMLEVBQUMsTUFBTSxFQUFDLFlBQVksRUFBQyxRQUFRLEVBQUMsSUFBSSxFQUFDLFFBQVEsRUFBQyxDQUFDLEVBQUMsTUFBTSxFQUFDLFdBQVcsRUFBQyxNQUFNLEVBQUMsRUFBQyxNQUFNLEVBQUMsUUFBUSxFQUFDLE1BQU0sRUFBQyxLQUFLLEVBQUMsVUFBVSxFQUFDLEtBQUssRUFBQyxRQUFRLEVBQUMsQ0FBQyxFQUFDLEVBQUMsRUFBQyxFQUFDLE1BQU0sRUFBQyxTQUFTLEVBQUMsTUFBTSxFQUFDLEVBQUMsTUFBTSxFQUFDLFFBQVEsRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLFVBQVUsRUFBQyxLQUFLLEVBQUMsUUFBUSxFQUFDLEdBQUcsRUFBQyxFQUFDLENBQUMsRUFBQztJQUM3TixFQUFDLE1BQU0sRUFBQyxZQUFZLEVBQUMsUUFBUSxFQUFDLElBQUksRUFBQyxRQUFRLEVBQUMsQ0FBQyxFQUFDLE1BQU0sRUFBQyxXQUFXLEVBQUMsTUFBTSxFQUFDLEVBQUMsTUFBTSxFQUFDLFFBQVEsRUFBQyxNQUFNLEVBQUMsS0FBSyxFQUFDLFVBQVUsRUFBQyxLQUFLLEVBQUMsUUFBUSxFQUFDLEVBQUUsRUFBQyxFQUFDLEVBQUMsRUFBQyxNQUFNLEVBQUMsU0FBUyxFQUFDLE1BQU0sRUFBQyxFQUFDLE1BQU0sRUFBQyxRQUFRLEVBQUMsTUFBTSxFQUFDLE9BQU8sRUFBQyxVQUFVLEVBQUMsS0FBSyxFQUFDLEVBQUMsQ0FBQyxFQUFDO0lBQ2xOLEVBQUMsTUFBTSxFQUFDLFNBQVMsRUFBQyxRQUFRLEVBQUMsSUFBSSxFQUFDLFFBQVEsRUFBQyxDQUFDLEVBQUMsTUFBTSxFQUFDLFNBQVMsRUFBQyxNQUFNLEVBQUMsRUFBQyxNQUFNLEVBQUMsUUFBUSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsVUFBVSxFQUFDLEtBQUssRUFBQyxFQUFDLEVBQUMsRUFBQyxNQUFNLEVBQUMsUUFBUSxFQUFDLE1BQU0sRUFBQyxFQUFDLE1BQU0sRUFBQyxRQUFRLEVBQUMsTUFBTSxFQUFDLFNBQVMsRUFBQyxVQUFVLEVBQUMsS0FBSyxFQUFDLEVBQUMsRUFBQyxFQUFDLE1BQU0sRUFBQyxPQUFPLEVBQUMsTUFBTSxFQUFDLEVBQUMsTUFBTSxFQUFDLFFBQVEsRUFBQyxNQUFNLEVBQUMsS0FBSyxFQUFDLFVBQVUsRUFBQyxLQUFLLEVBQUMsUUFBUSxFQUFDLEdBQUcsRUFBQyxFQUFDLEVBQUMsRUFBQyxNQUFNLEVBQUMsS0FBSyxFQUFDLE1BQU0sRUFBQyxFQUFDLE1BQU0sRUFBQyxRQUFRLEVBQUMsTUFBTSxFQUFDLE9BQU8sRUFBQyxVQUFVLEVBQUMsS0FBSyxFQUFDLEVBQUMsQ0FBQyxFQUFDO0lBQ2hXLEVBQUMsTUFBTSxFQUFDLGdCQUFnQixFQUFDLFFBQVEsRUFBQyxJQUFJLEVBQUMsUUFBUSxFQUFDLENBQUMsRUFBQyxNQUFNLEVBQUMsUUFBUSxFQUFDLE1BQU0sRUFBQyxFQUFDLE1BQU0sRUFBQyxRQUFRLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxVQUFVLEVBQUMsS0FBSyxFQUFDLEVBQUMsRUFBQyxFQUFDLE1BQU0sRUFBQyxJQUFJLEVBQUMsTUFBTSxFQUFDLEVBQUMsTUFBTSxFQUFDLFFBQVEsRUFBQyxNQUFNLEVBQUMsU0FBUyxFQUFDLFVBQVUsRUFBQyxLQUFLLEVBQUMsRUFBQyxFQUFDLEVBQUMsTUFBTSxFQUFDLE9BQU8sRUFBQyxNQUFNLEVBQUMsRUFBQyxNQUFNLEVBQUMsUUFBUSxFQUFDLE1BQU0sRUFBQyxLQUFLLEVBQUMsVUFBVSxFQUFDLEtBQUssRUFBQyxRQUFRLEVBQUMsR0FBRyxFQUFDLEVBQUMsRUFBQyxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLEVBQUMsTUFBTSxFQUFDLFFBQVEsRUFBQyxNQUFNLEVBQUMsS0FBSyxFQUFDLFVBQVUsRUFBQyxLQUFLLEVBQUMsUUFBUSxFQUFDLEdBQUcsRUFBQyxFQUFDLEVBQUMsRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxFQUFDLE1BQU0sRUFBQyxRQUFRLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxVQUFVLEVBQUMsSUFBSSxFQUFDLEVBQUMsRUFBQyxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLEVBQUMsTUFBTSxFQUFDLFFBQVEsRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLFVBQVUsRUFBQyxJQUFJLEVBQUMsRUFBQyxFQUFDLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsRUFBQyxNQUFNLEVBQUMsUUFBUSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsVUFBVSxFQUFDLElBQUksRUFBQyxFQUFDLENBQUMsRUFBQztJQUNua0IsRUFBQyxNQUFNLEVBQUMsYUFBYSxFQUFDLFFBQVEsRUFBQyxVQUFVLEVBQUMsUUFBUSxFQUFDLENBQUMsRUFBQyxNQUFNLEVBQUMsWUFBWSxFQUFDLE1BQU0sRUFBQyxFQUFDLE1BQU0sRUFBQyxRQUFRLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxVQUFVLEVBQUMsS0FBSyxFQUFDLFFBQVEsRUFBQyxFQUFFLEVBQUMsRUFBQyxFQUFDLEVBQUMsTUFBTSxFQUFDLGNBQWMsRUFBQyxNQUFNLEVBQUMsRUFBQyxNQUFNLEVBQUMsUUFBUSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsVUFBVSxFQUFDLEtBQUssRUFBQyxRQUFRLEVBQUMsRUFBRSxFQUFDLEVBQUMsRUFBQyxFQUFDLE1BQU0sRUFBQyxRQUFRLEVBQUMsTUFBTSxFQUFDLEVBQUMsTUFBTSxFQUFDLFFBQVEsRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLFVBQVUsRUFBQyxLQUFLLEVBQUMsUUFBUSxFQUFDLE9BQU8sRUFBQyxFQUFDLEVBQUMsRUFBQyxNQUFNLEVBQUMsT0FBTyxFQUFDLE1BQU0sRUFBQyxFQUFDLE1BQU0sRUFBQyxRQUFRLEVBQUMsTUFBTSxFQUFDLEtBQUssRUFBQyxVQUFVLEVBQUMsS0FBSyxFQUFDLFFBQVEsRUFBQyxHQUFHLEVBQUMsRUFBQyxFQUFDLEVBQUMsTUFBTSxFQUFDLFlBQVksRUFBQyxNQUFNLEVBQUMsRUFBQyxNQUFNLEVBQUMsUUFBUSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsVUFBVSxFQUFDLEtBQUssRUFBQyxFQUFDLEVBQUMsRUFBQyxNQUFNLEVBQUMsVUFBVSxFQUFDLE1BQU0sRUFBQyxFQUFDLE1BQU0sRUFBQyxRQUFRLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxVQUFVLEVBQUMsS0FBSyxFQUFDLEVBQUMsRUFBQyxFQUFDLE1BQU0sRUFBQyxXQUFXLEVBQUMsTUFBTSxFQUFDLEVBQUMsTUFBTSxFQUFDLFFBQVEsRUFBQyxNQUFNLEVBQUMsU0FBUyxFQUFDLFVBQVUsRUFBQyxLQUFLLEVBQUMsRUFBQyxDQUFDLEVBQUM7SUFDcm9CLEVBQUMsTUFBTSxFQUFDLG9CQUFvQixFQUFDLFFBQVEsRUFBQyxJQUFJLEVBQUMsUUFBUSxFQUFDLENBQUMsRUFBQyxNQUFNLEVBQUMsV0FBVyxFQUFDLE1BQU0sRUFBQyxFQUFDLE1BQU0sRUFBQyxRQUFRLEVBQUMsTUFBTSxFQUFDLE9BQU8sRUFBQyxVQUFVLEVBQUMsS0FBSyxFQUFDLEVBQUMsRUFBQyxFQUFDLE1BQU0sRUFBQyxLQUFLLEVBQUMsTUFBTSxFQUFDLEVBQUMsTUFBTSxFQUFDLFFBQVEsRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLFVBQVUsRUFBQyxLQUFLLEVBQUMsUUFBUSxFQUFDLEdBQUcsRUFBQyxFQUFDLENBQUMsRUFBQztJQUN4TixFQUFDLE1BQU0sRUFBQyxvQkFBb0IsRUFBQyxRQUFRLEVBQUMsU0FBUyxFQUFDLFFBQVEsRUFBQyxDQUFDLEVBQUMsTUFBTSxFQUFDLGFBQWEsRUFBQyxNQUFNLEVBQUMsRUFBQyxNQUFNLEVBQUMsUUFBUSxFQUFDLE1BQU0sRUFBQyxhQUFhLEVBQUMsVUFBVSxFQUFDLEtBQUssRUFBQyxFQUFDLEVBQUMsRUFBQyxNQUFNLEVBQUMsWUFBWSxFQUFDLE1BQU0sRUFBQyxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsS0FBSyxFQUFDLEtBQUssRUFBQyxPQUFPLEVBQUMsb0JBQW9CLEVBQUMsYUFBYSxFQUFDLEtBQUssRUFBQyxFQUFDLEVBQUMsRUFBQyxNQUFNLEVBQUMsS0FBSyxFQUFDLE1BQU0sRUFBQyxFQUFDLE1BQU0sRUFBQyxRQUFRLEVBQUMsTUFBTSxFQUFDLEtBQUssRUFBQyxVQUFVLEVBQUMsS0FBSyxFQUFDLFFBQVEsRUFBQyxHQUFHLEVBQUMsRUFBQyxFQUFDLEVBQUMsTUFBTSxFQUFDLFNBQVMsRUFBQyxNQUFNLEVBQUMsRUFBQyxNQUFNLEVBQUMsUUFBUSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsVUFBVSxFQUFDLEtBQUssRUFBQyxRQUFRLEVBQUMsR0FBRyxFQUFDLEVBQUMsRUFBQyxFQUFDLE1BQU0sRUFBQyxJQUFJLEVBQUMsTUFBTSxFQUFDLEVBQUMsTUFBTSxFQUFDLFFBQVEsRUFBQyxNQUFNLEVBQUMsS0FBSyxFQUFDLFVBQVUsRUFBQyxLQUFLLEVBQUMsUUFBUSxFQUFDLEdBQUcsRUFBQyxFQUFDLENBQUMsRUFBQztJQUN4ZixFQUFDLE1BQU0sRUFBQyxXQUFXLEVBQUMsUUFBUSxFQUFDLFVBQVUsRUFBQyxRQUFRLEVBQUMsQ0FBQyxFQUFDLE1BQU0sRUFBQyxjQUFjLEVBQUMsTUFBTSxFQUFDLEVBQUMsTUFBTSxFQUFDLFFBQVEsRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLFVBQVUsRUFBQyxLQUFLLEVBQUMsUUFBUSxFQUFDLEVBQUUsRUFBQyxFQUFDLEVBQUMsRUFBQyxNQUFNLEVBQUMsVUFBVSxFQUFDLE1BQU0sRUFBQyxFQUFDLE1BQU0sRUFBQyxRQUFRLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxVQUFVLEVBQUMsS0FBSyxFQUFDLEVBQUMsRUFBQyxFQUFDLE1BQU0sRUFBQyxJQUFJLEVBQUMsTUFBTSxFQUFDLEVBQUMsTUFBTSxFQUFDLFFBQVEsRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLFVBQVUsRUFBQyxLQUFLLEVBQUMsRUFBQyxFQUFDLEVBQUMsTUFBTSxFQUFDLFlBQVksRUFBQyxNQUFNLEVBQUMsRUFBQyxNQUFNLEVBQUMsUUFBUSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsVUFBVSxFQUFDLEtBQUssRUFBQyxFQUFDLEVBQUMsRUFBQyxNQUFNLEVBQUMsUUFBUSxFQUFDLE1BQU0sRUFBQyxFQUFDLE1BQU0sRUFBQyxRQUFRLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxVQUFVLEVBQUMsS0FBSyxFQUFDLFFBQVEsRUFBQyxPQUFPLEVBQUMsRUFBQyxDQUFDLEVBQUM7SUFDMWMsRUFBQyxNQUFNLEVBQUMscUJBQXFCLEVBQUMsUUFBUSxFQUFDLFVBQVUsRUFBQyxRQUFRLEVBQUMsQ0FBQyxFQUFDLE1BQU0sRUFBQyxJQUFJLEVBQUMsTUFBTSxFQUFDLEVBQUMsTUFBTSxFQUFDLFFBQVEsRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLFVBQVUsRUFBQyxLQUFLLEVBQUMsUUFBUSxFQUFDLEdBQUcsRUFBQyxFQUFDLEVBQUMsRUFBQyxNQUFNLEVBQUMsUUFBUSxFQUFDLE1BQU0sRUFBQyxFQUFDLE1BQU0sRUFBQyxRQUFRLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxVQUFVLEVBQUMsS0FBSyxFQUFDLFFBQVEsRUFBQyxPQUFPLEVBQUMsRUFBQyxFQUFDLEVBQUMsTUFBTSxFQUFDLFlBQVksRUFBQyxNQUFNLEVBQUMsRUFBQyxNQUFNLEVBQUMsUUFBUSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsVUFBVSxFQUFDLEtBQUssRUFBQyxFQUFDLEVBQUMsRUFBQyxNQUFNLEVBQUMsVUFBVSxFQUFDLE1BQU0sRUFBQyxFQUFDLE1BQU0sRUFBQyxRQUFRLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxVQUFVLEVBQUMsS0FBSyxFQUFDLEVBQUMsRUFBQyxFQUFDLE1BQU0sRUFBQyxJQUFJLEVBQUMsTUFBTSxFQUFDLEVBQUMsTUFBTSxFQUFDLFFBQVEsRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLFVBQVUsRUFBQyxLQUFLLEVBQUMsRUFBQyxFQUFDLEVBQUMsTUFBTSxFQUFDLGlCQUFpQixFQUFDLE1BQU0sRUFBQyxFQUFDLE1BQU0sRUFBQyxRQUFRLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxVQUFVLEVBQUMsS0FBSyxFQUFDLFFBQVEsRUFBQyxFQUFFLEVBQUMsRUFBQyxDQUFDLEVBQUM7SUFDMWlCLEVBQUMsTUFBTSxFQUFDLHFCQUFxQixFQUFDLFFBQVEsRUFBQyxVQUFVLEVBQUMsUUFBUSxFQUFDLENBQUMsRUFBQyxNQUFNLEVBQUMsSUFBSSxFQUFDLE1BQU0sRUFBQyxFQUFDLE1BQU0sRUFBQyxRQUFRLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxVQUFVLEVBQUMsS0FBSyxFQUFDLFFBQVEsRUFBQyxHQUFHLEVBQUMsRUFBQyxFQUFDLEVBQUMsTUFBTSxFQUFDLFFBQVEsRUFBQyxNQUFNLEVBQUMsRUFBQyxNQUFNLEVBQUMsUUFBUSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsVUFBVSxFQUFDLEtBQUssRUFBQyxRQUFRLEVBQUMsT0FBTyxFQUFDLEVBQUMsRUFBQyxFQUFDLE1BQU0sRUFBQyxZQUFZLEVBQUMsTUFBTSxFQUFDLEVBQUMsTUFBTSxFQUFDLFFBQVEsRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLFVBQVUsRUFBQyxLQUFLLEVBQUMsRUFBQyxFQUFDLEVBQUMsTUFBTSxFQUFDLFVBQVUsRUFBQyxNQUFNLEVBQUMsRUFBQyxNQUFNLEVBQUMsUUFBUSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsVUFBVSxFQUFDLEtBQUssRUFBQyxFQUFDLEVBQUMsRUFBQyxNQUFNLEVBQUMsaUJBQWlCLEVBQUMsTUFBTSxFQUFDLEVBQUMsTUFBTSxFQUFDLFFBQVEsRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLFVBQVUsRUFBQyxLQUFLLEVBQUMsUUFBUSxFQUFDLEVBQUUsRUFBQyxFQUFDLEVBQUMsRUFBQyxNQUFNLEVBQUMsSUFBSSxFQUFDLE1BQU0sRUFBQyxFQUFDLE1BQU0sRUFBQyxRQUFRLEVBQUMsTUFBTSxFQUFDLFNBQVMsRUFBQyxVQUFVLEVBQUMsS0FBSyxFQUFDLEVBQUMsQ0FBQyxFQUFDO0lBQzdpQixFQUFDLE1BQU0sRUFBQyxnQkFBZ0IsRUFBQyxRQUFRLEVBQUMsSUFBSSxFQUFDLFFBQVEsRUFBQyxDQUFDLEVBQUMsTUFBTSxFQUFDLFFBQVEsRUFBQyxNQUFNLEVBQUMsRUFBQyxNQUFNLEVBQUMsUUFBUSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsVUFBVSxFQUFDLEtBQUssRUFBQyxRQUFRLEVBQUMsR0FBRyxFQUFDLEVBQUMsRUFBQyxFQUFDLE1BQU0sRUFBQyxJQUFJLEVBQUMsTUFBTSxFQUFDLEVBQUMsTUFBTSxFQUFDLFFBQVEsRUFBQyxNQUFNLEVBQUMsUUFBUSxFQUFDLFVBQVUsRUFBQyxLQUFLLEVBQUMsRUFBQyxFQUFDLEVBQUMsTUFBTSxFQUFDLGNBQWMsRUFBQyxNQUFNLEVBQUMsRUFBQyxNQUFNLEVBQUMsUUFBUSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsVUFBVSxFQUFDLEtBQUssRUFBQyxRQUFRLEVBQUMsRUFBRSxFQUFDLEVBQUMsRUFBQyxFQUFDLE1BQU0sRUFBQyxVQUFVLEVBQUMsTUFBTSxFQUFDLEVBQUMsTUFBTSxFQUFDLFFBQVEsRUFBQyxNQUFNLEVBQUMsS0FBSyxFQUFDLFVBQVUsRUFBQyxLQUFLLEVBQUMsUUFBUSxFQUFDLEdBQUcsRUFBQyxFQUFDLENBQUMsRUFBQztJQUNyWSxFQUFDLE1BQU0sRUFBQyxlQUFlLEVBQUMsUUFBUSxFQUFDLFNBQVMsRUFBQyxRQUFRLEVBQUMsQ0FBQyxFQUFDLE1BQU0sRUFBQyxJQUFJLEVBQUMsTUFBTSxFQUFDLEVBQUMsTUFBTSxFQUFDLFFBQVEsRUFBQyxNQUFNLEVBQUMsU0FBUyxFQUFDLFVBQVUsRUFBQyxLQUFLLEVBQUMsRUFBQyxFQUFDLEVBQUMsTUFBTSxFQUFDLFFBQVEsRUFBQyxNQUFNLEVBQUMsRUFBQyxNQUFNLEVBQUMsUUFBUSxFQUFDLE1BQU0sRUFBQyxLQUFLLEVBQUMsVUFBVSxFQUFDLEtBQUssRUFBQyxRQUFRLEVBQUMsR0FBRyxFQUFDLEVBQUMsRUFBQyxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLEVBQUMsTUFBTSxFQUFDLFFBQVEsRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLFVBQVUsRUFBQyxJQUFJLEVBQUMsRUFBQyxDQUFDLEVBQUM7SUFDNVIsRUFBQyxNQUFNLEVBQUMsd0JBQXdCLEVBQUMsUUFBUSxFQUFDLFVBQVUsRUFBQyxRQUFRLEVBQUMsQ0FBQyxFQUFDLE1BQU0sRUFBQyxVQUFVLEVBQUMsTUFBTSxFQUFDLEVBQUMsTUFBTSxFQUFDLFFBQVEsRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLFVBQVUsRUFBQyxLQUFLLEVBQUMsUUFBUSxFQUFDLEVBQUUsRUFBQyxFQUFDLEVBQUMsRUFBQyxNQUFNLEVBQUMsUUFBUSxFQUFDLE1BQU0sRUFBQyxFQUFDLE1BQU0sRUFBQyxRQUFRLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxVQUFVLEVBQUMsS0FBSyxFQUFDLFFBQVEsRUFBQyxPQUFPLEVBQUMsRUFBQyxFQUFDLEVBQUMsTUFBTSxFQUFDLFFBQVEsRUFBQyxNQUFNLEVBQUMsRUFBQyxNQUFNLEVBQUMsUUFBUSxFQUFDLE1BQU0sRUFBQyxTQUFTLEVBQUMsVUFBVSxFQUFDLEtBQUssRUFBQyxFQUFDLEVBQUMsRUFBQyxNQUFNLEVBQUMsc0JBQXNCLEVBQUMsTUFBTSxFQUFDLEVBQUMsTUFBTSxFQUFDLFFBQVEsRUFBQyxNQUFNLEVBQUMsU0FBUyxFQUFDLFVBQVUsRUFBQyxLQUFLLEVBQUMsRUFBQyxFQUFDLEVBQUMsTUFBTSxFQUFDLG9CQUFvQixFQUFDLE1BQU0sRUFBQyxFQUFDLE1BQU0sRUFBQyxRQUFRLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxVQUFVLEVBQUMsS0FBSyxFQUFDLFFBQVEsRUFBQyxPQUFPLEVBQUMsRUFBQyxFQUFDLEVBQUMsTUFBTSxFQUFDLGlCQUFpQixFQUFDLE1BQU0sRUFBQyxFQUFDLE1BQU0sRUFBQyxRQUFRLEVBQUMsTUFBTSxFQUFDLE9BQU8sRUFBQyxVQUFVLEVBQUMsS0FBSyxFQUFDLFFBQVEsRUFBQyxXQUFXLEVBQUMsRUFBQyxDQUFDLEVBQUM7SUFDM21CLEVBQUMsTUFBTSxFQUFDLFlBQVksRUFBQyxRQUFRLEVBQUMsVUFBVSxFQUFDLFFBQVEsRUFBQyxDQUFDLEVBQUMsTUFBTSxFQUFDLFFBQVEsRUFBQyxNQUFNLEVBQUMsRUFBQyxNQUFNLEVBQUMsUUFBUSxFQUFDLE1BQU0sRUFBQyxTQUFTLEVBQUMsVUFBVSxFQUFDLEtBQUssRUFBQyxFQUFDLEVBQUMsRUFBQyxNQUFNLEVBQUMsVUFBVSxFQUFDLE1BQU0sRUFBQyxFQUFDLE1BQU0sRUFBQyxRQUFRLEVBQUMsTUFBTSxFQUFDLFNBQVMsRUFBQyxVQUFVLEVBQUMsS0FBSyxFQUFDLEVBQUMsRUFBQyxFQUFDLE1BQU0sRUFBQyxRQUFRLEVBQUMsTUFBTSxFQUFDLEVBQUMsTUFBTSxFQUFDLFFBQVEsRUFBQyxNQUFNLEVBQUMsS0FBSyxFQUFDLFVBQVUsRUFBQyxLQUFLLEVBQUMsUUFBUSxFQUFDLEdBQUcsRUFBQyxFQUFDLEVBQUMsRUFBQyxNQUFNLEVBQUMsZ0JBQWdCLEVBQUMsTUFBTSxFQUFDLEVBQUMsTUFBTSxFQUFDLFFBQVEsRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLFVBQVUsRUFBQyxJQUFJLEVBQUMsRUFBQyxFQUFDLEVBQUMsTUFBTSxFQUFDLG9CQUFvQixFQUFDLE1BQU0sRUFBQyxFQUFDLE1BQU0sRUFBQyxRQUFRLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxVQUFVLEVBQUMsS0FBSyxFQUFDLFFBQVEsRUFBQyxPQUFPLEVBQUMsRUFBQyxFQUFDLEVBQUMsTUFBTSxFQUFDLGlCQUFpQixFQUFDLE1BQU0sRUFBQyxFQUFDLE1BQU0sRUFBQyxRQUFRLEVBQUMsTUFBTSxFQUFDLE9BQU8sRUFBQyxVQUFVLEVBQUMsS0FBSyxFQUFDLFFBQVEsRUFBQyxXQUFXLEVBQUMsRUFBQyxDQUFDLEVBQUM7SUFDdmtCLEVBQUMsTUFBTSxFQUFDLGdCQUFnQixFQUFDLFFBQVEsRUFBQyxTQUFTLEVBQUMsUUFBUSxFQUFDLENBQUMsRUFBQyxNQUFNLEVBQUMsVUFBVSxFQUFDLE1BQU0sRUFBQyxFQUFDLE1BQU0sRUFBQyxRQUFRLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxVQUFVLEVBQUMsS0FBSyxFQUFDLFFBQVEsRUFBQyxFQUFFLEVBQUMsRUFBQyxFQUFDLEVBQUMsTUFBTSxFQUFDLFFBQVEsRUFBQyxNQUFNLEVBQUMsRUFBQyxNQUFNLEVBQUMsUUFBUSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsVUFBVSxFQUFDLEtBQUssRUFBQyxRQUFRLEVBQUMsT0FBTyxFQUFDLEVBQUMsRUFBQyxFQUFDLE1BQU0sRUFBQyxhQUFhLEVBQUMsTUFBTSxFQUFDLEVBQUMsTUFBTSxFQUFDLFFBQVEsRUFBQyxNQUFNLEVBQUMsU0FBUyxFQUFDLFVBQVUsRUFBQyxLQUFLLEVBQUMsRUFBQyxFQUFDLEVBQUMsTUFBTSxFQUFDLHNCQUFzQixFQUFDLE1BQU0sRUFBQyxFQUFDLE1BQU0sRUFBQyxRQUFRLEVBQUMsTUFBTSxFQUFDLFNBQVMsRUFBQyxVQUFVLEVBQUMsSUFBSSxFQUFDLEVBQUMsRUFBQyxFQUFDLE1BQU0sRUFBQyxnQkFBZ0IsRUFBQyxNQUFNLEVBQUMsRUFBQyxNQUFNLEVBQUMsUUFBUSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsVUFBVSxFQUFDLElBQUksRUFBQyxFQUFDLEVBQUMsRUFBQyxNQUFNLEVBQUMsb0JBQW9CLEVBQUMsTUFBTSxFQUFDLEVBQUMsTUFBTSxFQUFDLFFBQVEsRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLFVBQVUsRUFBQyxLQUFLLEVBQUMsUUFBUSxFQUFDLE9BQU8sRUFBQyxFQUFDLEVBQUMsRUFBQyxNQUFNLEVBQUMsaUJBQWlCLEVBQUMsTUFBTSxFQUFDLEVBQUMsTUFBTSxFQUFDLFFBQVEsRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLFVBQVUsRUFBQyxJQUFJLEVBQUMsRUFBQyxDQUFDLEVBQUM7SUFDaHFCLEVBQUMsTUFBTSxFQUFDLDJCQUEyQixFQUFDLFFBQVEsRUFBQyxVQUFVLEVBQUMsUUFBUSxFQUFDLENBQUMsRUFBQyxNQUFNLEVBQUMsVUFBVSxFQUFDLE1BQU0sRUFBQyxFQUFDLE1BQU0sRUFBQyxRQUFRLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxVQUFVLEVBQUMsS0FBSyxFQUFDLFFBQVEsRUFBQyxFQUFFLEVBQUMsRUFBQyxFQUFDLEVBQUMsTUFBTSxFQUFDLFFBQVEsRUFBQyxNQUFNLEVBQUMsRUFBQyxNQUFNLEVBQUMsUUFBUSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsVUFBVSxFQUFDLEtBQUssRUFBQyxRQUFRLEVBQUMsT0FBTyxFQUFDLEVBQUMsRUFBQyxFQUFDLE1BQU0sRUFBQyxRQUFRLEVBQUMsTUFBTSxFQUFDLEVBQUMsTUFBTSxFQUFDLFFBQVEsRUFBQyxNQUFNLEVBQUMsU0FBUyxFQUFDLFVBQVUsRUFBQyxLQUFLLEVBQUMsRUFBQyxFQUFDLEVBQUMsTUFBTSxFQUFDLGlCQUFpQixFQUFDLE1BQU0sRUFBQyxFQUFDLE1BQU0sRUFBQyxRQUFRLEVBQUMsTUFBTSxFQUFDLE9BQU8sRUFBQyxVQUFVLEVBQUMsS0FBSyxFQUFDLFFBQVEsRUFBQyxXQUFXLEVBQUMsRUFBQyxDQUFDLEVBQUM7SUFDNWEsRUFBQyxNQUFNLEVBQUMsZUFBZSxFQUFDLFFBQVEsRUFBQyxVQUFVLEVBQUMsUUFBUSxFQUFDLENBQUMsRUFBQyxNQUFNLEVBQUMsVUFBVSxFQUFDLE1BQU0sRUFBQyxFQUFDLE1BQU0sRUFBQyxRQUFRLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxVQUFVLEVBQUMsS0FBSyxFQUFDLFFBQVEsRUFBQyxFQUFFLEVBQUMsRUFBQyxDQUFDLEVBQUM7SUFDL0ksRUFBQyxNQUFNLEVBQUMsWUFBWSxFQUFDLFFBQVEsRUFBQyxVQUFVLEVBQUMsUUFBUSxFQUFDLENBQUMsRUFBQyxNQUFNLEVBQUMsa0JBQWtCLEVBQUMsTUFBTSxFQUFDLEVBQUMsTUFBTSxFQUFDLFFBQVEsRUFBQyxNQUFNLEVBQUMsU0FBUyxFQUFDLFVBQVUsRUFBQyxLQUFLLEVBQUMsRUFBQyxFQUFDLEVBQUMsTUFBTSxFQUFDLGVBQWUsRUFBQyxNQUFNLEVBQUMsRUFBQyxNQUFNLEVBQUMsUUFBUSxFQUFDLE1BQU0sRUFBQyxTQUFTLEVBQUMsVUFBVSxFQUFDLEtBQUssRUFBQyxFQUFDLEVBQUMsRUFBQyxNQUFNLEVBQUMsaUJBQWlCLEVBQUMsTUFBTSxFQUFDLEVBQUMsTUFBTSxFQUFDLFFBQVEsRUFBQyxNQUFNLEVBQUMsU0FBUyxFQUFDLFVBQVUsRUFBQyxLQUFLLEVBQUMsRUFBQyxFQUFDLEVBQUMsTUFBTSxFQUFDLFVBQVUsRUFBQyxNQUFNLEVBQUMsRUFBQyxNQUFNLEVBQUMsUUFBUSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsVUFBVSxFQUFDLEtBQUssRUFBQyxRQUFRLEVBQUMsRUFBRSxFQUFDLEVBQUMsRUFBQyxFQUFDLE1BQU0sRUFBQyxnQkFBZ0IsRUFBQyxNQUFNLEVBQUMsRUFBQyxNQUFNLEVBQUMsUUFBUSxFQUFDLE1BQU0sRUFBQyxvQkFBb0IsRUFBQyxVQUFVLEVBQUMsS0FBSyxFQUFDLEVBQUMsQ0FBQyxFQUFDO0lBQzdlLEVBQUMsTUFBTSxFQUFDLG9CQUFvQixFQUFDLFFBQVEsRUFBQyxJQUFJLEVBQUMsUUFBUSxFQUFDLENBQUMsRUFBQyxNQUFNLEVBQUMsUUFBUSxFQUFDLE1BQU0sRUFBQyxFQUFDLE1BQU0sRUFBQyxRQUFRLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxVQUFVLEVBQUMsS0FBSyxFQUFDLFFBQVEsRUFBQyxPQUFPLEVBQUMsRUFBQyxFQUFDLEVBQUMsTUFBTSxFQUFDLGlCQUFpQixFQUFDLE1BQU0sRUFBQyxFQUFDLE1BQU0sRUFBQyxRQUFRLEVBQUMsTUFBTSxFQUFDLFNBQVMsRUFBQyxVQUFVLEVBQUMsS0FBSyxFQUFDLEVBQUMsRUFBQyxFQUFDLE1BQU0sRUFBQyxRQUFRLEVBQUMsTUFBTSxFQUFDLEVBQUMsTUFBTSxFQUFDLFFBQVEsRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLFVBQVUsRUFBQyxLQUFLLEVBQUMsUUFBUSxFQUFDLE9BQU8sRUFBQyxFQUFDLEVBQUMsRUFBQyxNQUFNLEVBQUMsZUFBZSxFQUFDLE1BQU0sRUFBQyxFQUFDLE1BQU0sRUFBQyxRQUFRLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxVQUFVLEVBQUMsSUFBSSxFQUFDLEVBQUMsRUFBQyxFQUFDLE1BQU0sRUFBQyxjQUFjLEVBQUMsTUFBTSxFQUFDLEVBQUMsTUFBTSxFQUFDLFFBQVEsRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLFVBQVUsRUFBQyxLQUFLLEVBQUMsUUFBUSxFQUFDLE9BQU8sRUFBQyxFQUFDLEVBQUMsRUFBQyxNQUFNLEVBQUMsZUFBZSxFQUFDLE1BQU0sRUFBQyxFQUFDLE1BQU0sRUFBQyxRQUFRLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxVQUFVLEVBQUMsSUFBSSxFQUFDLEVBQUMsRUFBQyxFQUFDLE1BQU0sRUFBQyxRQUFRLEVBQUMsTUFBTSxFQUFDLEVBQUMsTUFBTSxFQUFDLFFBQVEsRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLFVBQVUsRUFBQyxLQUFLLEVBQUMsUUFBUSxFQUFDLEVBQUUsRUFBQyxFQUFDLEVBQUMsRUFBQyxNQUFNLEVBQUMsaUJBQWlCLEVBQUMsTUFBTSxFQUFDLEVBQUMsTUFBTSxFQUFDLFFBQVEsRUFBQyxNQUFNLEVBQUMsU0FBUyxFQUFDLFVBQVUsRUFBQyxJQUFJLEVBQUMsRUFBQyxDQUFDLEVBQUM7SUFDOXVCLEVBQUMsTUFBTSxFQUFDLFFBQVEsRUFBQyxRQUFRLEVBQUMsVUFBVSxFQUFDLFFBQVEsRUFBQyxDQUFDLEVBQUMsTUFBTSxFQUFDLFNBQVMsRUFBQyxNQUFNLEVBQUMsRUFBQyxNQUFNLEVBQUMsUUFBUSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsVUFBVSxFQUFDLEtBQUssRUFBQyxRQUFRLEVBQUMsRUFBRSxFQUFDLEVBQUMsQ0FBQyxFQUFDO0lBQ3ZJLEVBQUMsTUFBTSxFQUFDLFVBQVUsRUFBQyxRQUFRLEVBQUMsVUFBVSxFQUFDLFFBQVEsRUFBQyxDQUFDLEVBQUMsTUFBTSxFQUFDLFNBQVMsRUFBQyxNQUFNLEVBQUMsRUFBQyxNQUFNLEVBQUMsUUFBUSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsVUFBVSxFQUFDLEtBQUssRUFBQyxRQUFRLEVBQUMsRUFBRSxFQUFDLEVBQUMsQ0FBQyxFQUFDO0lBQ3pJLEVBQUMsTUFBTSxFQUFDLGVBQWUsRUFBQyxRQUFRLEVBQUMsVUFBVSxFQUFDLFFBQVEsRUFBQyxDQUFDLEVBQUMsTUFBTSxFQUFDLFNBQVMsRUFBQyxNQUFNLEVBQUMsRUFBQyxNQUFNLEVBQUMsUUFBUSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsVUFBVSxFQUFDLEtBQUssRUFBQyxRQUFRLEVBQUMsRUFBRSxFQUFDLEVBQUMsRUFBQyxFQUFDLE1BQU0sRUFBQyxVQUFVLEVBQUMsTUFBTSxFQUFDLEVBQUMsTUFBTSxFQUFDLFFBQVEsRUFBQyxNQUFNLEVBQUMsU0FBUyxFQUFDLFVBQVUsRUFBQyxLQUFLLEVBQUMsRUFBQyxDQUFDLEVBQUM7SUFDN04sRUFBQyxNQUFNLEVBQUMsYUFBYSxFQUFDLFFBQVEsRUFBQyxTQUFTLEVBQUMsUUFBUSxFQUFDLENBQUMsRUFBQyxNQUFNLEVBQUMsVUFBVSxFQUFDLE1BQU0sRUFBQyxFQUFDLE1BQU0sRUFBQyxRQUFRLEVBQUMsTUFBTSxFQUFDLEtBQUssRUFBQyxVQUFVLEVBQUMsS0FBSyxFQUFDLFFBQVEsRUFBQyxHQUFHLEVBQUMsRUFBQyxDQUFDLEVBQUM7SUFDNUksRUFBQyxNQUFNLEVBQUMsY0FBYyxFQUFDLFFBQVEsRUFBQyxVQUFVLEVBQUMsUUFBUSxFQUFDLENBQUMsRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxFQUFDLE1BQU0sRUFBQyxRQUFRLEVBQUMsTUFBTSxFQUFDLEtBQUssRUFBQyxVQUFVLEVBQUMsS0FBSyxFQUFDLFFBQVEsRUFBQyxHQUFHLEVBQUMsRUFBQyxDQUFDLEVBQUM7SUFDMUksRUFBQyxNQUFNLEVBQUMsaUJBQWlCLEVBQUMsUUFBUSxFQUFDLFVBQVUsRUFBQyxRQUFRLEVBQUMsQ0FBQyxFQUFDLE1BQU0sRUFBQyxVQUFVLEVBQUMsTUFBTSxFQUFDLEVBQUMsTUFBTSxFQUFDLFFBQVEsRUFBQyxNQUFNLEVBQUMsS0FBSyxFQUFDLFVBQVUsRUFBQyxLQUFLLEVBQUMsUUFBUSxFQUFDLEdBQUcsRUFBQyxFQUFDLEVBQUMsRUFBQyxNQUFNLEVBQUMsWUFBWSxFQUFDLE1BQU0sRUFBQyxFQUFDLE1BQU0sRUFBQyxRQUFRLEVBQUMsTUFBTSxFQUFDLEtBQUssRUFBQyxVQUFVLEVBQUMsS0FBSyxFQUFDLFFBQVEsRUFBQyxHQUFHLEVBQUMsRUFBQyxFQUFDLEVBQUMsTUFBTSxFQUFDLFVBQVUsRUFBQyxNQUFNLEVBQUMsRUFBQyxNQUFNLEVBQUMsUUFBUSxFQUFDLE1BQU0sRUFBQyxLQUFLLEVBQUMsVUFBVSxFQUFDLEtBQUssRUFBQyxRQUFRLEVBQUMsR0FBRyxFQUFDLEVBQUMsQ0FBQyxFQUFDO0lBQ25VLEVBQUMsTUFBTSxFQUFDLGFBQWEsRUFBQyxRQUFRLEVBQUMsVUFBVSxFQUFDLFFBQVEsRUFBQyxDQUFDLEVBQUMsTUFBTSxFQUFDLFFBQVEsRUFBQyxNQUFNLEVBQUMsRUFBQyxNQUFNLEVBQUMsUUFBUSxFQUFDLE1BQU0sRUFBQyxRQUFRLEVBQUMsVUFBVSxFQUFDLEtBQUssRUFBQyxFQUFDLENBQUMsRUFBQztJQUNqSSxFQUFDLE1BQU0sRUFBQyxpQkFBaUIsRUFBQyxRQUFRLEVBQUMsVUFBVSxFQUFDLFFBQVEsRUFBQyxDQUFDLEVBQUMsTUFBTSxFQUFDLFdBQVcsRUFBQyxNQUFNLEVBQUMsRUFBQyxNQUFNLEVBQUMsUUFBUSxFQUFDLE1BQU0sRUFBQyxTQUFTLEVBQUMsVUFBVSxFQUFDLEtBQUssRUFBQyxFQUFDLENBQUMsRUFBQztJQUN6SSxFQUFDLE1BQU0sRUFBQyxPQUFPLEVBQUMsUUFBUSxFQUFDLFVBQVUsRUFBQyxRQUFRLEVBQUMsRUFBRSxFQUFDO0lBQ2hELEVBQUMsTUFBTSxFQUFDLFVBQVUsRUFBQyxRQUFRLEVBQUMsVUFBVSxFQUFDLFFBQVEsRUFBQyxDQUFDLEVBQUMsTUFBTSxFQUFDLFVBQVUsRUFBQyxNQUFNLEVBQUMsRUFBQyxNQUFNLEVBQUMsUUFBUSxFQUFDLE1BQU0sRUFBQyxTQUFTLEVBQUMsVUFBVSxFQUFDLEtBQUssRUFBQyxFQUFDLENBQUMsRUFBQztJQUNqSSxFQUFDLE1BQU0sRUFBQyxVQUFVLEVBQUMsUUFBUSxFQUFDLFVBQVUsRUFBQyxRQUFRLEVBQUMsQ0FBQyxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLEVBQUMsTUFBTSxFQUFDLFFBQVEsRUFBQyxNQUFNLEVBQUMsUUFBUSxFQUFDLFVBQVUsRUFBQyxLQUFLLEVBQUMsRUFBQyxFQUFDLEVBQUMsTUFBTSxFQUFDLFVBQVUsRUFBQyxNQUFNLEVBQUMsRUFBQyxNQUFNLEVBQUMsUUFBUSxFQUFDLE1BQU0sRUFBQyxLQUFLLEVBQUMsVUFBVSxFQUFDLEtBQUssRUFBQyxRQUFRLEVBQUMsR0FBRyxFQUFDLEVBQUMsQ0FBQyxFQUFDO0lBQ3BOLEVBQUMsTUFBTSxFQUFDLFFBQVEsRUFBQyxRQUFRLEVBQUMsVUFBVSxFQUFDLFFBQVEsRUFBQyxDQUFDLEVBQUMsTUFBTSxFQUFDLFFBQVEsRUFBQyxNQUFNLEVBQUMsRUFBQyxNQUFNLEVBQUMsUUFBUSxFQUFDLE1BQU0sRUFBQyxTQUFTLEVBQUMsVUFBVSxFQUFDLEtBQUssRUFBQyxFQUFDLENBQUMsRUFBQztJQUM3SCxFQUFDLE1BQU0sRUFBQyxXQUFXLEVBQUMsUUFBUSxFQUFDLFVBQVUsRUFBQyxRQUFRLEVBQUMsQ0FBQyxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLEVBQUMsTUFBTSxFQUFDLFFBQVEsRUFBQyxNQUFNLEVBQUMsS0FBSyxFQUFDLFVBQVUsRUFBQyxLQUFLLEVBQUMsUUFBUSxFQUFDLEdBQUcsRUFBQyxFQUFDLEVBQUMsRUFBQyxNQUFNLEVBQUMsUUFBUSxFQUFDLE1BQU0sRUFBQyxFQUFDLE1BQU0sRUFBQyxRQUFRLEVBQUMsTUFBTSxFQUFDLFNBQVMsRUFBQyxVQUFVLEVBQUMsS0FBSyxFQUFDLEVBQUMsQ0FBQyxFQUFDO0lBQ3BOLEVBQUMsTUFBTSxFQUFDLGNBQWMsRUFBQyxRQUFRLEVBQUMsVUFBVSxFQUFDLFFBQVEsRUFBQyxDQUFDLEVBQUMsTUFBTSxFQUFDLFdBQVcsRUFBQyxNQUFNLEVBQUMsRUFBQyxNQUFNLEVBQUMsUUFBUSxFQUFDLE1BQU0sRUFBQyxTQUFTLEVBQUMsVUFBVSxFQUFDLEtBQUssRUFBQyxFQUFDLENBQUMsRUFBQztJQUN0SSxFQUFDLE1BQU0sRUFBQyxlQUFlLEVBQUMsUUFBUSxFQUFDLFVBQVUsRUFBQyxRQUFRLEVBQUMsQ0FBQyxFQUFDLE1BQU0sRUFBQyxVQUFVLEVBQUMsTUFBTSxFQUFDLEVBQUMsTUFBTSxFQUFDLFFBQVEsRUFBQyxNQUFNLEVBQUMsS0FBSyxFQUFDLFVBQVUsRUFBQyxLQUFLLEVBQUMsUUFBUSxFQUFDLEdBQUcsRUFBQyxFQUFDLEVBQUMsRUFBQyxNQUFNLEVBQUMsWUFBWSxFQUFDLE1BQU0sRUFBQyxFQUFDLE1BQU0sRUFBQyxRQUFRLEVBQUMsTUFBTSxFQUFDLEtBQUssRUFBQyxVQUFVLEVBQUMsS0FBSyxFQUFDLFFBQVEsRUFBQyxHQUFHLEVBQUMsRUFBQyxFQUFDLEVBQUMsTUFBTSxFQUFDLFVBQVUsRUFBQyxNQUFNLEVBQUMsRUFBQyxNQUFNLEVBQUMsUUFBUSxFQUFDLE1BQU0sRUFBQyxLQUFLLEVBQUMsVUFBVSxFQUFDLEtBQUssRUFBQyxRQUFRLEVBQUMsR0FBRyxFQUFDLEVBQUMsRUFBQyxFQUFDLE1BQU0sRUFBQyxTQUFTLEVBQUMsTUFBTSxFQUFDLEVBQUMsTUFBTSxFQUFDLFFBQVEsRUFBQyxNQUFNLEVBQUMsT0FBTyxFQUFDLFVBQVUsRUFBQyxLQUFLLEVBQUMsRUFBQyxFQUFDLEVBQUMsTUFBTSxFQUFDLFdBQVcsRUFBQyxNQUFNLEVBQUMsRUFBQyxNQUFNLEVBQUMsUUFBUSxFQUFDLE1BQU0sRUFBQyxPQUFPLEVBQUMsVUFBVSxFQUFDLEtBQUssRUFBQyxFQUFDLEVBQUMsRUFBQyxNQUFNLEVBQUMsT0FBTyxFQUFDLE1BQU0sRUFBQyxFQUFDLE1BQU0sRUFBQyxRQUFRLEVBQUMsTUFBTSxFQUFDLE9BQU8sRUFBQyxVQUFVLEVBQUMsS0FBSyxFQUFDLEVBQUMsQ0FBQyxFQUFDO0lBQ3JpQixFQUFDLE1BQU0sRUFBQyxVQUFVLEVBQUMsUUFBUSxFQUFDLFNBQVMsRUFBQyxRQUFRLEVBQUMsQ0FBQyxFQUFDLE1BQU0sRUFBQyxTQUFTLEVBQUMsTUFBTSxFQUFDLEVBQUMsTUFBTSxFQUFDLFFBQVEsRUFBQyxNQUFNLEVBQUMsU0FBUyxFQUFDLFVBQVUsRUFBQyxLQUFLLEVBQUMsRUFBQyxFQUFDLEVBQUMsTUFBTSxFQUFDLFVBQVUsRUFBQyxNQUFNLEVBQUMsRUFBQyxNQUFNLEVBQUMsUUFBUSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsVUFBVSxFQUFDLEtBQUssRUFBQyxRQUFRLEVBQUMsQ0FBQyxFQUFDLEVBQUMsRUFBQyxFQUFDLE1BQU0sRUFBQyxVQUFVLEVBQUMsTUFBTSxFQUFDLEVBQUMsTUFBTSxFQUFDLFFBQVEsRUFBQyxNQUFNLEVBQUMsU0FBUyxFQUFDLFVBQVUsRUFBQyxLQUFLLEVBQUMsRUFBQyxFQUFDLEVBQUMsTUFBTSxFQUFDLFFBQVEsRUFBQyxNQUFNLEVBQUMsRUFBQyxNQUFNLEVBQUMsUUFBUSxFQUFDLE1BQU0sRUFBQyxRQUFRLEVBQUMsVUFBVSxFQUFDLEtBQUssRUFBQyxFQUFDLEVBQUMsRUFBQyxNQUFNLEVBQUMsV0FBVyxFQUFDLE1BQU0sRUFBQyxFQUFDLE1BQU0sRUFBQyxRQUFRLEVBQUMsTUFBTSxFQUFDLFNBQVMsRUFBQyxVQUFVLEVBQUMsS0FBSyxFQUFDLEVBQUMsRUFBQyxFQUFDLE1BQU0sRUFBQyxhQUFhLEVBQUMsTUFBTSxFQUFDLEVBQUMsTUFBTSxFQUFDLFFBQVEsRUFBQyxNQUFNLEVBQUMsU0FBUyxFQUFDLFVBQVUsRUFBQyxLQUFLLEVBQUMsRUFBQyxFQUFDLEVBQUMsTUFBTSxFQUFDLFFBQVEsRUFBQyxNQUFNLEVBQUMsRUFBQyxNQUFNLEVBQUMsUUFBUSxFQUFDLE1BQU0sRUFBQyxTQUFTLEVBQUMsVUFBVSxFQUFDLEtBQUssRUFBQyxFQUFDLENBQUMsRUFBQztJQUNobUIsRUFBQyxNQUFNLEVBQUMsU0FBUyxFQUFDLFFBQVEsRUFBQyxVQUFVLEVBQUMsUUFBUSxFQUFDLEVBQUUsRUFBQztJQUNsRCxFQUFDLE1BQU0sRUFBQyxnQkFBZ0IsRUFBQyxRQUFRLEVBQUMsVUFBVSxFQUFDLFFBQVEsRUFBQyxDQUFDLEVBQUMsTUFBTSxFQUFDLFVBQVUsRUFBQyxNQUFNLEVBQUMsRUFBQyxNQUFNLEVBQUMsUUFBUSxFQUFDLE1BQU0sRUFBQyxLQUFLLEVBQUMsVUFBVSxFQUFDLEtBQUssRUFBQyxRQUFRLEVBQUMsR0FBRyxFQUFDLEVBQUMsRUFBQyxFQUFDLE1BQU0sRUFBQyxlQUFlLEVBQUMsTUFBTSxFQUFDLEVBQUMsTUFBTSxFQUFDLFFBQVEsRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLFVBQVUsRUFBQyxLQUFLLEVBQUMsUUFBUSxFQUFDLENBQUMsRUFBQyxFQUFDLEVBQUMsRUFBQyxNQUFNLEVBQUMsWUFBWSxFQUFDLE1BQU0sRUFBQyxFQUFDLE1BQU0sRUFBQyxRQUFRLEVBQUMsTUFBTSxFQUFDLEtBQUssRUFBQyxVQUFVLEVBQUMsS0FBSyxFQUFDLFFBQVEsRUFBQyxHQUFHLEVBQUMsRUFBQyxDQUFDLEVBQUM7SUFDdFUsRUFBQyxNQUFNLEVBQUMsb0JBQW9CLEVBQUMsUUFBUSxFQUFDLFVBQVUsRUFBQyxRQUFRLEVBQUMsQ0FBQyxFQUFDLE1BQU0sRUFBQyxRQUFRLEVBQUMsTUFBTSxFQUFDLEVBQUMsTUFBTSxFQUFDLFFBQVEsRUFBQyxNQUFNLEVBQUMsS0FBSyxFQUFDLFVBQVUsRUFBQyxLQUFLLEVBQUMsUUFBUSxFQUFDLEdBQUcsRUFBQyxFQUFDLENBQUMsRUFBQztJQUNsSixFQUFDLE1BQU0sRUFBQyxvQkFBb0IsRUFBQyxRQUFRLEVBQUMsVUFBVSxFQUFDLFFBQVEsRUFBQyxDQUFDLEVBQUMsTUFBTSxFQUFDLFFBQVEsRUFBQyxNQUFNLEVBQUMsRUFBQyxNQUFNLEVBQUMsUUFBUSxFQUFDLE1BQU0sRUFBQyxLQUFLLEVBQUMsVUFBVSxFQUFDLEtBQUssRUFBQyxRQUFRLEVBQUMsR0FBRyxFQUFDLEVBQUMsQ0FBQyxFQUFDO0lBQ2xKLEVBQUMsTUFBTSxFQUFDLG1CQUFtQixFQUFDLFFBQVEsRUFBQyxVQUFVLEVBQUMsUUFBUSxFQUFDLENBQUMsRUFBQyxNQUFNLEVBQUMsUUFBUSxFQUFDLE1BQU0sRUFBQyxFQUFDLE1BQU0sRUFBQyxRQUFRLEVBQUMsTUFBTSxFQUFDLEtBQUssRUFBQyxVQUFVLEVBQUMsS0FBSyxFQUFDLFFBQVEsRUFBQyxHQUFHLEVBQUMsRUFBQyxDQUFDLEVBQUM7SUFDakosRUFBQyxNQUFNLEVBQUMsYUFBYSxFQUFDLFFBQVEsRUFBQyxTQUFTLEVBQUMsUUFBUSxFQUFDLENBQUMsRUFBQyxNQUFNLEVBQUMsUUFBUSxFQUFDLE1BQU0sRUFBQyxFQUFDLE1BQU0sRUFBQyxRQUFRLEVBQUMsTUFBTSxFQUFDLEtBQUssRUFBQyxVQUFVLEVBQUMsS0FBSyxFQUFDLFFBQVEsRUFBQyxHQUFHLEVBQUMsRUFBQyxDQUFDLEVBQUM7SUFDMUksRUFBQyxNQUFNLEVBQUMsT0FBTyxFQUFDLFFBQVEsRUFBQyxJQUFJLEVBQUMsUUFBUSxFQUFDLENBQUMsRUFBQyxNQUFNLEVBQUMsU0FBUyxFQUFDLE1BQU0sRUFBQyxFQUFDLE1BQU0sRUFBQyxRQUFRLEVBQUMsTUFBTSxFQUFDLFNBQVMsRUFBQyxVQUFVLEVBQUMsS0FBSyxFQUFDLEVBQUMsRUFBQyxFQUFDLE1BQU0sRUFBQyxVQUFVLEVBQUMsTUFBTSxFQUFDLEVBQUMsTUFBTSxFQUFDLFFBQVEsRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLFVBQVUsRUFBQyxLQUFLLEVBQUMsUUFBUSxFQUFDLENBQUMsRUFBQyxFQUFDLEVBQUMsRUFBQyxNQUFNLEVBQUMsVUFBVSxFQUFDLE1BQU0sRUFBQyxFQUFDLE1BQU0sRUFBQyxRQUFRLEVBQUMsTUFBTSxFQUFDLFNBQVMsRUFBQyxVQUFVLEVBQUMsS0FBSyxFQUFDLEVBQUMsRUFBQyxFQUFDLE1BQU0sRUFBQyxRQUFRLEVBQUMsTUFBTSxFQUFDLEVBQUMsTUFBTSxFQUFDLFFBQVEsRUFBQyxNQUFNLEVBQUMsUUFBUSxFQUFDLFVBQVUsRUFBQyxLQUFLLEVBQUMsRUFBQyxFQUFDLEVBQUMsTUFBTSxFQUFDLFdBQVcsRUFBQyxNQUFNLEVBQUMsRUFBQyxNQUFNLEVBQUMsUUFBUSxFQUFDLE1BQU0sRUFBQyxTQUFTLEVBQUMsVUFBVSxFQUFDLEtBQUssRUFBQyxFQUFDLEVBQUMsRUFBQyxNQUFNLEVBQUMsYUFBYSxFQUFDLE1BQU0sRUFBQyxFQUFDLE1BQU0sRUFBQyxRQUFRLEVBQUMsTUFBTSxFQUFDLFNBQVMsRUFBQyxVQUFVLEVBQUMsS0FBSyxFQUFDLEVBQUMsRUFBQyxFQUFDLE1BQU0sRUFBQyxRQUFRLEVBQUMsTUFBTSxFQUFDLEVBQUMsTUFBTSxFQUFDLFFBQVEsRUFBQyxNQUFNLEVBQUMsU0FBUyxFQUFDLFVBQVUsRUFBQyxLQUFLLEVBQUMsRUFBQyxDQUFDLEVBQUM7SUFDeGxCLEVBQUMsTUFBTSxFQUFDLE9BQU8sRUFBQyxRQUFRLEVBQUMsSUFBSSxFQUFDLFFBQVEsRUFBQyxDQUFDLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsRUFBQyxNQUFNLEVBQUMsUUFBUSxFQUFDLE1BQU0sRUFBQyxRQUFRLEVBQUMsVUFBVSxFQUFDLEtBQUssRUFBQyxFQUFDLEVBQUMsRUFBQyxNQUFNLEVBQUMsVUFBVSxFQUFDLE1BQU0sRUFBQyxFQUFDLE1BQU0sRUFBQyxRQUFRLEVBQUMsTUFBTSxFQUFDLEtBQUssRUFBQyxVQUFVLEVBQUMsS0FBSyxFQUFDLFFBQVEsRUFBQyxHQUFHLEVBQUMsRUFBQyxDQUFDLEVBQUM7SUFDM00sRUFBQyxNQUFNLEVBQUMsYUFBYSxFQUFDLFFBQVEsRUFBQyxJQUFJLEVBQUMsUUFBUSxFQUFDLENBQUMsRUFBQyxNQUFNLEVBQUMsR0FBRyxFQUFDLE1BQU0sRUFBQyxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsS0FBSyxFQUFDLEtBQUssRUFBQyxPQUFPLEVBQUMsS0FBSyxFQUFDLEVBQUMsQ0FBQyxFQUFDO0lBQzdHLEVBQUMsTUFBTSxFQUFDLE9BQU8sRUFBQyxRQUFRLEVBQUMsSUFBSSxFQUFDLFFBQVEsRUFBQyxDQUFDLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLEtBQUssRUFBQyxLQUFLLEVBQUMsT0FBTyxFQUFDLEtBQUssRUFBQyxFQUFDLEVBQUMsRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxFQUFDLE1BQU0sRUFBQyxRQUFRLEVBQUMsTUFBTSxFQUFDLEtBQUssRUFBQyxVQUFVLEVBQUMsS0FBSyxFQUFDLFFBQVEsRUFBQyxHQUFHLEVBQUMsRUFBQyxDQUFDLEVBQUM7SUFDOUwsRUFBQyxNQUFNLEVBQUMsWUFBWSxFQUFDLFFBQVEsRUFBQyxJQUFJLEVBQUMsUUFBUSxFQUFDLENBQUMsRUFBQyxNQUFNLEVBQUMsU0FBUyxFQUFDLE1BQU0sRUFBQyxFQUFDLE1BQU0sRUFBQyxRQUFRLEVBQUMsTUFBTSxFQUFDLE9BQU8sRUFBQyxVQUFVLEVBQUMsS0FBSyxFQUFDLEVBQUMsRUFBQyxFQUFDLE1BQU0sRUFBQyxXQUFXLEVBQUMsTUFBTSxFQUFDLEVBQUMsTUFBTSxFQUFDLFFBQVEsRUFBQyxNQUFNLEVBQUMsT0FBTyxFQUFDLFVBQVUsRUFBQyxLQUFLLEVBQUMsRUFBQyxFQUFDLEVBQUMsTUFBTSxFQUFDLE9BQU8sRUFBQyxNQUFNLEVBQUMsRUFBQyxNQUFNLEVBQUMsUUFBUSxFQUFDLE1BQU0sRUFBQyxPQUFPLEVBQUMsVUFBVSxFQUFDLEtBQUssRUFBQyxFQUFDLENBQUMsRUFBQztJQUNsUixFQUFDLE1BQU0sRUFBQyxZQUFZLEVBQUMsUUFBUSxFQUFDLElBQUksRUFBQyxRQUFRLEVBQUMsQ0FBQyxFQUFDLE1BQU0sRUFBQyxHQUFHLEVBQUMsTUFBTSxFQUFDLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxLQUFLLEVBQUMsS0FBSyxFQUFDLE9BQU8sRUFBQyxZQUFZLEVBQUMsYUFBYSxFQUFDLEtBQUssRUFBQyxFQUFDLENBQUMsRUFBQztJQUN2SSxFQUFDLE1BQU0sRUFBQyxjQUFjLEVBQUMsUUFBUSxFQUFDLElBQUksRUFBQyxRQUFRLEVBQUMsQ0FBQyxFQUFDLE1BQU0sRUFBQyxHQUFHLEVBQUMsTUFBTSxFQUFDLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxLQUFLLEVBQUMsS0FBSyxFQUFDLE9BQU8sRUFBQyxZQUFZLEVBQUMsYUFBYSxFQUFDLEtBQUssRUFBQyxFQUFDLENBQUMsRUFBQztJQUN6SSxFQUFDLE1BQU0sRUFBQyxXQUFXLEVBQUMsUUFBUSxFQUFDLFNBQVMsRUFBQyxRQUFRLEVBQUMsQ0FBQyxFQUFDLE1BQU0sRUFBQyxJQUFJLEVBQUMsTUFBTSxFQUFDLEVBQUMsTUFBTSxFQUFDLFFBQVEsRUFBQyxNQUFNLEVBQUMsU0FBUyxFQUFDLFVBQVUsRUFBQyxLQUFLLEVBQUMsRUFBQyxFQUFDLEVBQUMsTUFBTSxFQUFDLFNBQVMsRUFBQyxNQUFNLEVBQUMsRUFBQyxNQUFNLEVBQUMsUUFBUSxFQUFDLE1BQU0sRUFBQyxLQUFLLEVBQUMsVUFBVSxFQUFDLEtBQUssRUFBQyxRQUFRLEVBQUMsR0FBRyxFQUFDLEVBQUMsQ0FBQyxFQUFDO0lBQ2xOLEVBQUMsTUFBTSxFQUFDLGNBQWMsRUFBQyxRQUFRLEVBQUMsU0FBUyxFQUFDLFFBQVEsRUFBQyxDQUFDLEVBQUMsTUFBTSxFQUFDLFNBQVMsRUFBQyxNQUFNLEVBQUMsRUFBQyxNQUFNLEVBQUMsUUFBUSxFQUFDLE1BQU0sRUFBQyxLQUFLLEVBQUMsVUFBVSxFQUFDLEtBQUssRUFBQyxRQUFRLEVBQUMsR0FBRyxFQUFDLEVBQUMsRUFBQyxFQUFDLE1BQU0sRUFBQyxTQUFTLEVBQUMsTUFBTSxFQUFDLEVBQUMsTUFBTSxFQUFDLFFBQVEsRUFBQyxNQUFNLEVBQUMsU0FBUyxFQUFDLFVBQVUsRUFBQyxLQUFLLEVBQUMsRUFBQyxDQUFDLEVBQUM7SUFDMU4sRUFBQyxNQUFNLEVBQUMsWUFBWSxFQUFDLFFBQVEsRUFBQyxVQUFVLEVBQUMsUUFBUSxFQUFDLENBQUMsRUFBQyxNQUFNLEVBQUMsSUFBSSxFQUFDLE1BQU0sRUFBQyxFQUFDLE1BQU0sRUFBQyxRQUFRLEVBQUMsTUFBTSxFQUFDLFNBQVMsRUFBQyxVQUFVLEVBQUMsS0FBSyxFQUFDLEVBQUMsRUFBQyxFQUFDLE1BQU0sRUFBQyxTQUFTLEVBQUMsTUFBTSxFQUFDLEVBQUMsTUFBTSxFQUFDLFFBQVEsRUFBQyxNQUFNLEVBQUMsS0FBSyxFQUFDLFVBQVUsRUFBQyxLQUFLLEVBQUMsUUFBUSxFQUFDLEdBQUcsRUFBQyxFQUFDLENBQUMsRUFBQztJQUNwTixFQUFDLE1BQU0sRUFBQyxVQUFVLEVBQUMsUUFBUSxFQUFDLElBQUksRUFBQyxRQUFRLEVBQUMsQ0FBQyxFQUFDLE1BQU0sRUFBQyxPQUFPLEVBQUMsTUFBTSxFQUFDLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxLQUFLLEVBQUMsU0FBUyxFQUFDLE9BQU8sRUFBQyxNQUFNLEVBQUMsRUFBQyxFQUFDLEVBQUMsTUFBTSxFQUFDLFlBQVksRUFBQyxNQUFNLEVBQUMsRUFBQyxNQUFNLEVBQUMsUUFBUSxFQUFDLE1BQU0sRUFBQyxLQUFLLEVBQUMsVUFBVSxFQUFDLEtBQUssRUFBQyxRQUFRLEVBQUMsR0FBRyxFQUFDLEVBQUMsQ0FBQyxFQUFDO0lBQzdNLEVBQUMsTUFBTSxFQUFDLGlCQUFpQixFQUFDLFFBQVEsRUFBQyxTQUFTLEVBQUMsUUFBUSxFQUFDLENBQUMsRUFBQyxNQUFNLEVBQUMsU0FBUyxFQUFDLE1BQU0sRUFBQyxFQUFDLE1BQU0sRUFBQyxRQUFRLEVBQUMsTUFBTSxFQUFDLEtBQUssRUFBQyxVQUFVLEVBQUMsS0FBSyxFQUFDLFFBQVEsRUFBQyxHQUFHLEVBQUMsRUFBQyxFQUFDLEVBQUMsTUFBTSxFQUFDLFlBQVksRUFBQyxNQUFNLEVBQUMsRUFBQyxNQUFNLEVBQUMsUUFBUSxFQUFDLE1BQU0sRUFBQyxLQUFLLEVBQUMsVUFBVSxFQUFDLEtBQUssRUFBQyxRQUFRLEVBQUMsR0FBRyxFQUFDLEVBQUMsQ0FBQyxFQUFDO0lBQ3pPLEVBQUMsTUFBTSxFQUFDLGtCQUFrQixFQUFDLFFBQVEsRUFBQyxJQUFJLEVBQUMsUUFBUSxFQUFDLENBQUMsRUFBQyxNQUFNLEVBQUMsT0FBTyxFQUFDLE1BQU0sRUFBQyxFQUFDLE1BQU0sRUFBQyxRQUFRLEVBQUMsTUFBTSxFQUFDLFNBQVMsRUFBQyxVQUFVLEVBQUMsS0FBSyxFQUFDLEVBQUMsRUFBQyxFQUFDLE1BQU0sRUFBQyxLQUFLLEVBQUMsTUFBTSxFQUFDLEVBQUMsTUFBTSxFQUFDLFFBQVEsRUFBQyxNQUFNLEVBQUMsU0FBUyxFQUFDLFVBQVUsRUFBQyxLQUFLLEVBQUMsRUFBQyxFQUFDLEVBQUMsTUFBTSxFQUFDLFFBQVEsRUFBQyxNQUFNLEVBQUMsRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLEtBQUssRUFBQyxLQUFLLEVBQUMsT0FBTyxFQUFDLE9BQU8sRUFBQyxhQUFhLEVBQUMsS0FBSyxFQUFDLEVBQUMsRUFBQyxFQUFDLE1BQU0sRUFBQyxTQUFTLEVBQUMsTUFBTSxFQUFDLEVBQUMsTUFBTSxFQUFDLFFBQVEsRUFBQyxNQUFNLEVBQUMsS0FBSyxFQUFDLFVBQVUsRUFBQyxLQUFLLEVBQUMsUUFBUSxFQUFDLEdBQUcsRUFBQyxFQUFDLEVBQUMsRUFBQyxNQUFNLEVBQUMsZUFBZSxFQUFDLE1BQU0sRUFBQyxFQUFDLE1BQU0sRUFBQyxRQUFRLEVBQUMsTUFBTSxFQUFDLEtBQUssRUFBQyxVQUFVLEVBQUMsS0FBSyxFQUFDLFFBQVEsRUFBQyxHQUFHLEVBQUMsRUFBQyxFQUFDLEVBQUMsTUFBTSxFQUFDLGNBQWMsRUFBQyxNQUFNLEVBQUMsRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLEtBQUssRUFBQyxLQUFLLEVBQUMsT0FBTyxFQUFDLGFBQWEsRUFBQyxhQUFhLEVBQUMsS0FBSyxFQUFDLEVBQUMsRUFBQyxFQUFDLE1BQU0sRUFBQyxlQUFlLEVBQUMsTUFBTSxFQUFDLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxLQUFLLEVBQUMsS0FBSyxFQUFDLE9BQU8sRUFBQyxNQUFNLEVBQUMsRUFBQyxFQUFDLEVBQUMsTUFBTSxFQUFDLFFBQVEsRUFBQyxNQUFNLEVBQUMsRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLEtBQUssRUFBQyxLQUFLLEVBQUMsT0FBTyxFQUFDLEtBQUssRUFBQyxFQUFDLEVBQUMsRUFBQyxNQUFNLEVBQUMsWUFBWSxFQUFDLE1BQU0sRUFBQyxFQUFDLE1BQU0sRUFBQyxRQUFRLEVBQUMsTUFBTSxFQUFDLEtBQUssRUFBQyxVQUFVLEVBQUMsS0FBSyxFQUFDLFFBQVEsRUFBQyxHQUFHLEVBQUMsRUFBQyxFQUFDLEVBQUMsTUFBTSxFQUFDLFNBQVMsRUFBQyxNQUFNLEVBQUMsRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLEtBQUssRUFBQyxLQUFLLEVBQUMsT0FBTyxFQUFDLFNBQVMsRUFBQyxFQUFDLEVBQUMsRUFBQyxNQUFNLEVBQUMsT0FBTyxFQUFDLE1BQU0sRUFBQyxFQUFDLE1BQU0sRUFBQyxRQUFRLEVBQUMsTUFBTSxFQUFDLEtBQUssRUFBQyxVQUFVLEVBQUMsS0FBSyxFQUFDLFFBQVEsRUFBQyxHQUFHLEVBQUMsRUFBQyxFQUFDLEVBQUMsTUFBTSxFQUFDLFFBQVEsRUFBQyxNQUFNLEVBQUMsRUFBQyxNQUFNLEVBQUMsUUFBUSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsVUFBVSxFQUFDLEtBQUssRUFBQyxFQUFDLEVBQUMsRUFBQyxNQUFNLEVBQUMsY0FBYyxFQUFDLE1BQU0sRUFBQyxFQUFDLE1BQU0sRUFBQyxRQUFRLEVBQUMsTUFBTSxFQUFDLEtBQUssRUFBQyxVQUFVLEVBQUMsS0FBSyxFQUFDLFFBQVEsRUFBQyxHQUFHLEVBQUMsRUFBQyxFQUFDLEVBQUMsTUFBTSxFQUFDLE9BQU8sRUFBQyxNQUFNLEVBQUMsRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLEtBQUssRUFBQyxLQUFLLEVBQUMsT0FBTyxFQUFDLFVBQVUsRUFBQyxhQUFhLEVBQUMsS0FBSyxFQUFDLEVBQUMsRUFBQyxFQUFDLE1BQU0sRUFBQyxrQkFBa0IsRUFBQyxNQUFNLEVBQUMsRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLEtBQUssRUFBQyxLQUFLLEVBQUMsT0FBTyxFQUFDLGNBQWMsRUFBQyxhQUFhLEVBQUMsS0FBSyxFQUFDLEVBQUMsRUFBQyxFQUFDLE1BQU0sRUFBQyxXQUFXLEVBQUMsTUFBTSxFQUFDLEVBQUMsTUFBTSxFQUFDLFFBQVEsRUFBQyxNQUFNLEVBQUMsS0FBSyxFQUFDLFVBQVUsRUFBQyxLQUFLLEVBQUMsUUFBUSxFQUFDLEdBQUcsRUFBQyxFQUFDLEVBQUMsRUFBQyxNQUFNLEVBQUMsUUFBUSxFQUFDLE1BQU0sRUFBQyxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsS0FBSyxFQUFDLEtBQUssRUFBQyxPQUFPLEVBQUMsT0FBTyxFQUFDLGFBQWEsRUFBQyxLQUFLLEVBQUMsRUFBQyxFQUFDLEVBQUMsTUFBTSxFQUFDLEtBQUssRUFBQyxNQUFNLEVBQUMsRUFBQyxNQUFNLEVBQUMsUUFBUSxFQUFDLE1BQU0sRUFBQyxLQUFLLEVBQUMsVUFBVSxFQUFDLEtBQUssRUFBQyxRQUFRLEVBQUMsR0FBRyxFQUFDLEVBQUMsRUFBQyxFQUFDLE1BQU0sRUFBQyxZQUFZLEVBQUMsTUFBTSxFQUFDLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxLQUFLLEVBQUMsS0FBSyxFQUFDLE9BQU8sRUFBQyxTQUFTLEVBQUMsRUFBQyxFQUFDLEVBQUMsTUFBTSxFQUFDLGlCQUFpQixFQUFDLE1BQU0sRUFBQyxFQUFDLE1BQU0sRUFBQyxRQUFRLEVBQUMsTUFBTSxFQUFDLEtBQUssRUFBQyxVQUFVLEVBQUMsS0FBSyxFQUFDLFFBQVEsRUFBQyxHQUFHLEVBQUMsRUFBQyxDQUFDLEVBQUM7Q0FDNXRELENBQUE7QUFFRCxNQUFNLG1CQUFtQixHQUFnQjtJQUN2QyxFQUFDLE1BQU0sRUFBQyxjQUFjLEVBQUMsV0FBVyxFQUFDLENBQUMsRUFBQyxNQUFNLEVBQUMsVUFBVSxFQUFDLE1BQU0sRUFBQyxFQUFDLE1BQU0sRUFBQyxRQUFRLEVBQUMsTUFBTSxFQUFDLEtBQUssRUFBQyxVQUFVLEVBQUMsS0FBSyxFQUFDLFFBQVEsRUFBQyxHQUFHLEVBQUMsRUFBQyxFQUFDLEVBQUMsTUFBTSxFQUFDLFlBQVksRUFBQyxNQUFNLEVBQUMsRUFBQyxNQUFNLEVBQUMsUUFBUSxFQUFDLE1BQU0sRUFBQyxLQUFLLEVBQUMsVUFBVSxFQUFDLEtBQUssRUFBQyxRQUFRLEVBQUMsR0FBRyxFQUFDLEVBQUMsRUFBQyxFQUFDLE1BQU0sRUFBQyxVQUFVLEVBQUMsTUFBTSxFQUFDLEVBQUMsTUFBTSxFQUFDLFFBQVEsRUFBQyxNQUFNLEVBQUMsS0FBSyxFQUFDLFVBQVUsRUFBQyxLQUFLLEVBQUMsUUFBUSxFQUFDLEdBQUcsRUFBQyxFQUFDLENBQUMsRUFBQyxZQUFZLEVBQUMsRUFBQyxNQUFNLEVBQUMsUUFBUSxFQUFDLE1BQU0sRUFBQyxLQUFLLEVBQUMsVUFBVSxFQUFDLEtBQUssRUFBQyxRQUFRLEVBQUMsR0FBRyxFQUFDLEVBQUM7SUFDelgsRUFBQyxNQUFNLEVBQUMsV0FBVyxFQUFDLFdBQVcsRUFBQyxFQUFFLEVBQUMsWUFBWSxFQUFDLEVBQUMsTUFBTSxFQUFDLFFBQVEsRUFBQyxNQUFNLEVBQUMsU0FBUyxFQUFDLFVBQVUsRUFBQyxLQUFLLEVBQUMsRUFBQztJQUNwRyxFQUFDLE1BQU0sRUFBQyxTQUFTLEVBQUMsV0FBVyxFQUFDLEVBQUUsRUFBQyxZQUFZLEVBQUMsRUFBQyxNQUFNLEVBQUMsUUFBUSxF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RUFBQyxVQUFVLEVBQUMsTUFBTSxFQUFDLEVBQUMsTUFBTSxFQUFDLFFBQVEsRUFBQyxNQUFNLEVBQUMsS0FBSyxFQUFDLFVBQVUsRUFBQyxLQUFLLEVBQUMsUUFBUSxFQUFDLEdBQUcsRUFBQyxFQUFDLEVBQUMsRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxFQUFDLE1BQU0sRUFBQyxRQUFRLEVBQUMsTUFBTSxFQUFDLEtBQUssRUFBQyxVQUFVLEVBQUMsS0FBSyxFQUFDLFFBQVEsRUFBQyxHQUFHLEVBQUMsRUFBQyxDQUFDLEVBQUMsWUFBWSxFQUFDLEVBQUMsTUFBTSxFQUFDLFFBQVEsRUFBQyxNQUFNLEVBQUMsS0FBSyxFQUFDLFVBQVUsRUFBQyxLQUFLLEVBQUMsUUFBUSxFQUFDLEdBQUcsRUFBQyxFQUFDO0lBQzNSLEVBQUMsTUFBTSxFQUFDLGVBQWUsRUFBQyxXQUFXLEVBQUMsRUFBRSxFQUFDLFlBQVksRUFBQyxFQUFDLE1BQU0sRUFBQyxRQUFRLEVBQUMsTUFBTSxFQUFDLEtBQUssRUFBQyxVQUFVLEVBQUMsS0FBSyxFQUFDLFFBQVEsRUFBQyxHQUFHLEVBQUMsRUFBQztJQUNqSCxFQUFDLE1BQU0sRUFBQyxXQUFXLEVBQUMsV0FBVyxFQUFDLENBQUMsRUFBQyxNQUFNLEVBQUMsS0FBSyxFQUFDLE1BQU0sRUFBQyxFQUFDLE1BQU0sRUFBQyxRQUFRLEVBQUMsTUFBTSxFQUFDLEtBQUssRUFBQyxVQUFVLEVBQUMsS0FBSyxFQUFDLFFBQVEsRUFBQyxHQUFHLEVBQUMsRUFBQyxDQUFDLEVBQUMsWUFBWSxFQUFDLEVBQUMsTUFBTSxFQUFDLFFBQVEsRUFBQyxNQUFNLEVBQUMsT0FBTyxFQUFDLFVBQVUsRUFBQyxLQUFLLEVBQUMsRUFBQztJQUNwTCxFQUFDLE1BQU0sRUFBQyxTQUFTLEVBQUMsV0FBVyxFQUFDLEVBQUUsRUFBQyxZQUFZLEVBQUMsRUFBQyxNQUFNLEVBQUMsUUFBUSxFQUFDLE1BQU0sRUFBQyxLQUFLLEVBQUMsVUFBVSxFQUFDLEtBQUssRUFBQyxRQUFRLEVBQUMsR0FBRyxFQUFDLEVBQUM7SUFDM0csRUFBQyxNQUFNLEVBQUMsZUFBZSxFQUFDLFdBQVcsRUFBQyxDQUFDLEVBQUMsTUFBTSxFQUFDLE9BQU8sRUFBQyxNQUFNLEVBQUMsRUFBQyxNQUFNLEVBQUMsUUFBUSxFQUFDLE1BQU0sRUFBQyxLQUFLLEVBQUMsVUFBVSxFQUFDLEtBQUssRUFBQyxRQUFRLEVBQUMsR0FBRyxFQUFDLEVBQUMsQ0FBQyxFQUFDLFlBQVksRUFBQyxFQUFDLE1BQU0sRUFBQyxRQUFRLEVBQUMsTUFBTSxFQUFDLFNBQVMsRUFBQyxVQUFVLEVBQUMsS0FBSyxFQUFDLEVBQUM7SUFDNUwsRUFBQyxNQUFNLEVBQUMscUJBQXFCLEVBQUMsV0FBVyxFQUFDLEVBQUUsRUFBQyxZQUFZLEVBQUMsRUFBQyxNQUFNLEVBQUMsUUFBUSxFQUFDLE1BQU0sRUFBQyxLQUFLLEVBQUMsVUFBVSxFQUFDLEtBQUssRUFBQyxRQUFRLEVBQUMsR0FBRyxFQUFDLEVBQUM7SUFDdkgsRUFBQyxNQUFNLEVBQUMsY0FBYyxFQUFDLFdBQVcsRUFBQyxDQUFDLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsRUFBQyxNQUFNLEVBQUMsUUFBUSxFQUFDLE1BQU0sRUFBQyxLQUFLLEVBQUMsVUFBVSxFQUFDLEtBQUssRUFBQyxRQUFRLEVBQUMsR0FBRyxFQUFDLEVBQUMsQ0FBQyxFQUFDLFlBQVksRUFBQyxFQUFDLE1BQU0sRUFBQyxRQUFRLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxVQUFVLEVBQUMsS0FBSyxFQUFDLEVBQUM7SUFDdkwsRUFBQyxNQUFNLEVBQUMsY0FBYyxFQUFDLFdBQVcsRUFBQyxDQUFDLEVBQUMsTUFBTSxFQUFDLFNBQVMsRUFBQyxNQUFNLEVBQUMsRUFBQyxNQUFNLEVBQUMsUUFBUSxFQUFDLE1BQU0sRUFBQyxTQUFTLEVBQUMsVUFBVSxFQUFDLEtBQUssRUFBQyxFQUFDLENBQUMsRUFBQyxZQUFZLEVBQUMsRUFBQyxNQUFNLEVBQUMsUUFBUSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsVUFBVSxFQUFDLEtBQUssRUFBQyxFQUFDO0lBQ2pMLEVBQUMsTUFBTSxFQUFDLGVBQWUsRUFBQyxXQUFXLEVBQUMsRUFBRSxFQUFDLFlBQVksRUFBQyxFQUFDLE1BQU0sRUFBQyxRQUFRLEVBQUMsTUFBTSxFQUFDLEtBQUssRUFBQyxVQUFVLEVBQUMsS0FBSyxFQUFDLFFBQVEsRUFBQyxHQUFHLEVBQUMsRUFBQztJQUNqSCxFQUFDLE1BQU0sRUFBQyxnQkFBZ0IsRUFBQyxXQUFXLEVBQUMsRUFBRSxFQUFDLFlBQVksRUFBQyxFQUFDLE1BQU0sRUFBQyxRQUFRLEVBQUMsTUFBTSxFQUFDLEtBQUssRUFBQyxVQUFVLEVBQUMsS0FBSyxFQUFDLFFBQVEsRUFBQyxHQUFHLEVBQUMsRUFBQztJQUNsSCxFQUFDLE1BQU0sRUFBQyxhQUFhLEVBQUMsV0FBVyxFQUFDLEVBQUUsRUFBQyxZQUFZLEVBQUMsRUFBQyxNQUFNLEVBQUMsUUFBUSxFQUFDLE1BQU0sRUFBQyxLQUFLLEVBQUMsVUFBVSxFQUFDLEtBQUssRUFBQyxRQUFRLEVBQUMsR0FBRyxFQUFDLEVBQUM7SUFDL0csRUFBQyxNQUFNLEVBQUMsVUFBVSxFQUFDLFdBQVcsRUFBQyxDQUFDLEVBQUMsTUFBTSxFQUFDLFNBQVMsRUFBQyxNQUFNLEVBQUMsRUFBQyxNQUFNLEVBQUMsUUFBUSxFQUFDLE1BQU0sRUFBQyxTQUFTLEVBQUMsVUFBVSxFQUFDLEtBQUssRUFBQyxFQUFDLEVBQUMsRUFBQyxNQUFNLEVBQUMsU0FBUyxFQUFDLE1BQU0sRUFBQyxFQUFDLE1BQU0sRUFBQyxRQUFRLEVBQUMsTUFBTSxFQUFDLEtBQUssRUFBQyxVQUFVLEVBQUMsS0FBSyxFQUFDLFFBQVEsRUFBQyxHQUFHLEVBQUMsRUFBQyxDQUFDLEVBQUMsWUFBWSxFQUFDLEVBQUMsTUFBTSxFQUFDLFFBQVEsRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLFVBQVUsRUFBQyxLQUFLLEVBQUMsRUFBQztJQUNwUSxFQUFDLE1BQU0sRUFBQyxZQUFZLEVBQUMsV0FBVyxFQUFDLENBQUMsRUFBQyxNQUFNLEVBQUMsU0FBUyxFQUFDLE1BQU0sRUFBQyxFQUFDLE1BQU0sRUFBQyxRQUFRLEVBQUMsTUFBTSxFQUFDLEtBQUssRUFBQyxVQUFVLEVBQUMsS0FBSyxFQUFDLFFBQVEsRUFBQyxHQUFHLEVBQUMsRUFBQyxDQUFDLEVBQUMsWUFBWSxFQUFDLEVBQUMsTUFBTSxFQUFDLFFBQVEsRUFBQyxNQUFNLEVBQUMsS0FBSyxFQUFDLFVBQVUsRUFBQyxLQUFLLEVBQUMsUUFBUSxFQUFDLEdBQUcsRUFBQyxFQUFDO0lBQ3BNLEVBQUMsTUFBTSxFQUFDLG1CQUFtQixFQUFDLFdBQVcsRUFBQyxFQUFFLEVBQUMsWUFBWSxFQUFDLEVBQUMsTUFBTSxFQUFDLFFBQVEsRUFBQyxNQUFNLEVBQUMsS0FBSyxFQUFDLFVBQVUsRUFBQyxLQUFLLEVBQUMsUUFBUSxFQUFDLEdBQUcsRUFBQyxFQUFDO0lBQ3JILEVBQUMsTUFBTSxFQUFDLHdCQUF3QixFQUFDLFdBQVcsRUFBQyxDQUFDLEVBQUMsTUFBTSxFQUFDLFVBQVUsRUFBQyxNQUFNLEVBQUMsRUFBQyxNQUFNLEVBQUMsUUFBUSxFQUFDLE1BQU0sRUFBQyxLQUFLLEVBQUMsVUFBVSxFQUFDLEtBQUssRUFBQyxRQUFRLEVBQUMsR0FBRyxFQUFDLEVBQUMsRUFBQyxFQUFDLE1BQU0sRUFBQyxZQUFZLEVBQUMsTUFBTSxFQUFDLEVBQUMsTUFBTSxFQUFDLFFBQVEsRUFBQyxNQUFNLEVBQUMsS0FBSyxFQUFDLFVBQVUsRUFBQyxLQUFLLEVBQUMsUUFBUSxFQUFDLEdBQUcsRUFBQyxFQUFDLEVBQUMsRUFBQyxNQUFNLEVBQUMsVUFBVSxFQUFDLE1BQU0sRUFBQyxFQUFDLE1BQU0sRUFBQyxRQUFRLEVBQUMsTUFBTSxFQUFDLEtBQUssRUFBQyxVQUFVLEVBQUMsS0FBSyxFQUFDLFFBQVEsRUFBQyxHQUFHLEVBQUMsRUFBQyxDQUFDLEVBQUMsWUFBWSxFQUFDLEVBQUMsTUFBTSxFQUFDLFFBQVEsRUFBQyxNQUFNLEVBQUMsT0FBTyxFQUFDLFVBQVUsRUFBQyxLQUFLLEVBQUMsRUFBQztJQUN4WCxFQUFDLE1BQU0sRUFBQyx5QkFBeUIsRUFBQyxXQUFXLEVBQUMsQ0FBQyxFQUFDLE1BQU0sRUFBQyxVQUFVLEVBQUMsTUFBTSxFQUFDLEVBQUMsTUFBTSxFQUFDLFFBQVEsRUFBQyxNQUFNLEVBQUMsS0FBSyxFQUFDLFVBQVUsRUFBQyxLQUFLLEVBQUMsUUFBUSxFQUFDLEdBQUcsRUFBQyxFQUFDLEVBQUMsRUFBQyxNQUFNLEVBQUMsWUFBWSxFQUFDLE1BQU0sRUFBQyxFQUFDLE1BQU0sRUFBQyxRQUFRLEVBQUMsTUFBTSxFQUFDLEtBQUssRUFBQyxVQUFVLEVBQUMsS0FBSyxFQUFDLFFBQVEsRUFBQyxHQUFHLEVBQUMsRUFBQyxFQUFDLEVBQUMsTUFBTSxFQUFDLFVBQVUsRUFBQyxNQUFNLEVBQUMsRUFBQyxNQUFNLEVBQUMsUUFBUSxFQUFDLE1BQU0sRUFBQyxLQUFLLEVBQUMsVUFBVSxFQUFDLEtBQUssRUFBQyxRQUFRLEVBQUMsR0FBRyxFQUFDLEVBQUMsQ0FBQyxFQUFDLFlBQVksRUFBQyxFQUFDLE1BQU0sRUFBQyxRQUFRLEVBQUMsTUFBTSxFQUFDLE9BQU8sRUFBQyxVQUFVLEVBQUMsS0FBSyxFQUFDLEVBQUM7SUFDelgsRUFBQyxNQUFNLEVBQUMsc0JBQXNCLEVBQUMsV0FBVyxFQUFDLENBQUMsRUFBQyxNQUFNLEVBQUMsVUFBVSxFQUFDLE1BQU0sRUFBQyxFQUFDLE1BQU0sRUFBQyxRQUFRLEVBQUMsTUFBTSxFQUFDLEtBQUssRUFBQyxVQUFVLEVBQUMsS0FBSyxFQUFDLFFBQVEsRUFBQyxHQUFHLEVBQUMsRUFBQyxFQUFDLEVBQUMsTUFBTSxFQUFDLFlBQVksRUFBQyxNQUFNLEVBQUMsRUFBQyxNQUFNLEVBQUMsUUFBUSxFQUFDLE1BQU0sRUFBQyxLQUFLLEVBQUMsVUFBVSxFQUFDLEtBQUssRUFBQyxRQUFRLEVBQUMsR0FBRyxFQUFDLEVBQUMsRUFBQyxFQUFDLE1BQU0sRUFBQyxVQUFVLEVBQUMsTUFBTSxFQUFDLEVBQUMsTUFBTSxFQUFDLFFB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