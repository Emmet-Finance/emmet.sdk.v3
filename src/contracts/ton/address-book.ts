//@ts-nocheck generated code
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

export type SetAddress = {
    $$type: 'SetAddress';
    key: string;
    value: Address;
}

export function storeSetAddress(src: SetAddress) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2903541553, 32);
        b_0.storeStringRefTail(src.key);
        b_0.storeAddress(src.value);
    };
}

export function loadSetAddress(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2903541553) { throw Error('Invalid prefix'); }
    let _key = sc_0.loadStringRefTail();
    let _value = sc_0.loadAddress();
    return { $$type: 'SetAddress' as const, key: _key, value: _value };
}

function loadTupleSetAddress(source: TupleReader) {
    let _key = source.readString();
    let _value = source.readAddress();
    return { $$type: 'SetAddress' as const, key: _key, value: _value };
}

function storeTupleSetAddress(source: SetAddress) {
    let builder = new TupleBuilder();
    builder.writeString(source.key);
    builder.writeAddress(source.value);
    return builder.build();
}

function dictValueParserSetAddress(): DictionaryValue<SetAddress> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeSetAddress(src)).endCell());
        },
        parse: (src) => {
            return loadSetAddress(src.loadRef().beginParse());
        }
    }
}

 type AddressBook_init_args = {
    $$type: 'AddressBook_init_args';
}

function initAddressBook_init_args(src: AddressBook_init_args) {
    return (builder: Builder) => {
        let b_0 = builder;
    };
}

async function AddressBook_init() {
    const __code = Cell.fromBase64('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');
    const __system = Cell.fromBase64('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');
    let builder = beginCell();
    builder.storeRef(__system);
    builder.storeUint(0, 1);
    initAddressBook_init_args({ $$type: 'AddressBook_init_args' })(builder);
    const __data = builder.endCell();
    return { code: __code, data: __data };
}

const AddressBook_errors: { [key: number]: { message: string } } = {
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
    2927: { message: `AccessControl: Role ID doesn't exist` },
    7947: { message: `AccessControl: BadConfirmation` },
    21733: { message: `AccessControl: Role doesn't exist` },
    50413: { message: `AccessControl: Doesnt have the role` },
    54023: { message: `AccessControl: Doesn't have role` },
}

const AddressBook_types: ABIType[] = [
    {"name":"StateInit","header":null,"fields":[{"name":"code","type":{"kind":"simple","type":"cell","optional":false}},{"name":"data","type":{"kind":"simple","type":"cell","optional":false}}]},
    {"name":"Context","header":null,"fields":[{"name":"bounced","type":{"kind":"simple","type":"bool","optional":false}},{"name":"sender","type":{"kind":"simple","type":"address","optional":false}},{"name":"value","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"raw","type":{"kind":"simple","type":"slice","optional":false}}]},
    {"name":"SendParameters","header":null,"fields":[{"name":"bounce","type":{"kind":"simple","type":"bool","optional":false}},{"name":"to","type":{"kind":"simple","type":"address","optional":false}},{"name":"value","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"mode","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"body","type":{"kind":"simple","type":"cell","optional":true}},{"name":"code","type":{"kind":"simple","type":"cell","optional":true}},{"name":"data","type":{"kind":"simple","type":"cell","optional":true}}]},
    {"name":"Deploy","header":2490013878,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"DeployOk","header":2952335191,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"FactoryDeploy","header":1829761339,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"cashback","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"GrantRole","header":174185305,"fields":[{"name":"to","type":{"kind":"simple","type":"address","optional":false}},{"name":"role_id","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"RevokeRole","header":1363080030,"fields":[{"name":"to","type":{"kind":"simple","type":"address","optional":false}},{"name":"role_id","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"RenounceRole","header":389201441,"fields":[{"name":"role_id","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"address","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"UpdateRoleAdmin","header":620382153,"fields":[{"name":"role_id","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"role_admin","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"RoleData","header":null,"fields":[{"name":"roles","type":{"kind":"dict","key":"address","value":"bool"}},{"name":"admin_role","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"SetAddress","header":2903541553,"fields":[{"name":"key","type":{"kind":"simple","type":"string","optional":false}},{"name":"value","type":{"kind":"simple","type":"address","optional":false}}]},
]

const AddressBook_getters: ABIGetter[] = [
    {"name":"get","arguments":[{"name":"key","type":{"kind":"simple","type":"string","optional":false}}],"returnType":{"kind":"simple","type":"address","optional":true}},
    {"name":"managerRole","arguments":[],"returnType":{"kind":"simple","type":"int","optional":false,"format":257}},
    {"name":"has_role","arguments":[{"name":"address","type":{"kind":"simple","type":"address","optional":false}},{"name":"role_id","type":{"kind":"simple","type":"int","optional":false,"format":257}}],"returnType":{"kind":"simple","type":"bool","optional":false}},
    {"name":"role_admin","arguments":[{"name":"role_id","type":{"kind":"simple","type":"int","optional":false,"format":257}}],"returnType":{"kind":"simple","type":"int","optional":false,"format":257}},
    {"name":"admin_role_id","arguments":[],"returnType":{"kind":"simple","type":"int","optional":false,"format":257}},
]

const AddressBook_receivers: ABIReceiver[] = [
    {"receiver":"internal","message":{"kind":"typed","type":"SetAddress"}},
    {"receiver":"internal","message":{"kind":"typed","type":"Deploy"}},
    {"receiver":"internal","message":{"kind":"typed","type":"GrantRole"}},
    {"receiver":"internal","message":{"kind":"typed","type":"RevokeRole"}},
    {"receiver":"internal","message":{"kind":"typed","type":"RenounceRole"}},
    {"receiver":"internal","message":{"kind":"typed","type":"UpdateRoleAdmin"}},
]

export class AddressBook implements Contract {
    
    static async init() {
        return await AddressBook_init();
    }
    
    static async fromInit() {
        const init = await AddressBook_init();
        const address = contractAddress(0, init);
        return new AddressBook(address, init);
    }
    
    static fromAddress(address: Address) {
        return new AddressBook(address);
    }
    
    readonly address: Address; 
    readonly init?: { code: Cell, data: Cell };
    readonly abi: ContractABI = {
        types:  AddressBook_types,
        getters: AddressBook_getters,
        receivers: AddressBook_receivers,
        errors: AddressBook_errors,
    };
    
    private constructor(address: Address, init?: { code: Cell, data: Cell }) {
        this.address = address;
        this.init = init;
    }
    
    async send(provider: ContractProvider, via: Sender, args: { value: bigint, bounce?: boolean| null | undefined }, message: SetAddress | Deploy | GrantRole | RevokeRole | RenounceRole | UpdateRoleAdmin) {
        
        let body: Cell | null = null;
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'SetAddress') {
            body = beginCell().store(storeSetAddress(message)).endCell();
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
    
    async getGet(provider: ContractProvider, key: string) {
        let builder = new TupleBuilder();
        builder.writeString(key);
        let source = (await provider.get('get', builder.build())).stack;
        let result = source.readAddressOpt();
        return result;
    }
    
    async getManagerRole(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('managerRole', builder.build())).stack;
        let result = source.readBigNumber();
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