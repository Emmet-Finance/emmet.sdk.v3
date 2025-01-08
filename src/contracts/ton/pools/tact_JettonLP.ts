import { 
    Cell,
    Slice, 
    Address, 
    Builder, 
    beginCell, 
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

export type StdAddress = {
    $$type: 'StdAddress';
    workchain: bigint;
    address: bigint;
}

export function storeStdAddress(src: StdAddress) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeInt(src.workchain, 8);
        b_0.storeUint(src.address, 256);
    };
}

export function loadStdAddress(slice: Slice) {
    let sc_0 = slice;
    let _workchain = sc_0.loadIntBig(8);
    let _address = sc_0.loadUintBig(256);
    return { $$type: 'StdAddress' as const, workchain: _workchain, address: _address };
}

export type VarAddress = {
    $$type: 'VarAddress';
    workchain: bigint;
    address: Slice;
}

export function storeVarAddress(src: VarAddress) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeInt(src.workchain, 32);
        b_0.storeRef(src.address.asCell());
    };
}

export function loadVarAddress(slice: Slice) {
    let sc_0 = slice;
    let _workchain = sc_0.loadIntBig(32);
    let _address = sc_0.loadRef().asSlice();
    return { $$type: 'VarAddress' as const, workchain: _workchain, address: _address };
}

export type Context = {
    $$type: 'Context';
    bounced: boolean;
    sender: Address;
    value: bigint;
    raw: Slice;
}

export function storeContext(src: Context) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeBit(src.bounced);
        b_0.storeAddress(src.sender);
        b_0.storeInt(src.value, 257);
        b_0.storeRef(src.raw.asCell());
    };
}

export function loadContext(slice: Slice) {
    let sc_0 = slice;
    let _bounced = sc_0.loadBit();
    let _sender = sc_0.loadAddress();
    let _value = sc_0.loadIntBig(257);
    let _raw = sc_0.loadRef().asSlice();
    return { $$type: 'Context' as const, bounced: _bounced, sender: _sender, value: _value, raw: _raw };
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

export type JettonData = {
    $$type: 'JettonData';
    total_supply: bigint;
    mintable: boolean;
    admin: Address;
    content: Cell;
    wallet_code: Cell;
}

export function storeJettonData(src: JettonData) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeCoins(src.total_supply);
        b_0.storeBit(src.mintable);
        b_0.storeAddress(src.admin);
        b_0.storeRef(src.content);
        b_0.storeRef(src.wallet_code);
    };
}

export function loadJettonData(slice: Slice) {
    let sc_0 = slice;
    let _total_supply = sc_0.loadCoins();
    let _mintable = sc_0.loadBit();
    let _admin = sc_0.loadAddress();
    let _content = sc_0.loadRef();
    let _wallet_code = sc_0.loadRef();
    return { $$type: 'JettonData' as const, total_supply: _total_supply, mintable: _mintable, admin: _admin, content: _content, wallet_code: _wallet_code };
}

function loadGetterTupleJettonData(source: TupleReader) {
    let _total_supply = source.readBigNumber();
    let _mintable = source.readBoolean();
    let _admin = source.readAddress();
    let _content = source.readCell();
    let _wallet_code = source.readCell();
    return { $$type: 'JettonData' as const, total_supply: _total_supply, mintable: _mintable, admin: _admin, content: _content, wallet_code: _wallet_code };
}

export type JettonWalletData = {
    $$type: 'JettonWalletData';
    balance: bigint;
    owner: Address;
    master: Address;
    code: Cell;
}

export function storeJettonWalletData(src: JettonWalletData) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeInt(src.balance, 257);
        b_0.storeAddress(src.owner);
        b_0.storeAddress(src.master);
        b_0.storeRef(src.code);
    };
}

export function loadJettonWalletData(slice: Slice) {
    let sc_0 = slice;
    let _balance = sc_0.loadIntBig(257);
    let _owner = sc_0.loadAddress();
    let _master = sc_0.loadAddress();
    let _code = sc_0.loadRef();
    return { $$type: 'JettonWalletData' as const, balance: _balance, owner: _owner, master: _master, code: _code };
}

export type TokenTransfer = {
    $$type: 'TokenTransfer';
    query_id: bigint;
    amount: bigint;
    sender: Address;
    response_destination: Address | null;
    custom_payload: Cell | null;
    forward_ton_amount: bigint;
    forward_payload: Slice;
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
    let _forward_payload = sc_0;
    return { $$type: 'TokenTransfer' as const, query_id: _query_id, amount: _amount, sender: _sender, response_destination: _response_destination, custom_payload: _custom_payload, forward_ton_amount: _forward_ton_amount, forward_payload: _forward_payload };
}

export type TokenTransferInternal = {
    $$type: 'TokenTransferInternal';
    query_id: bigint;
    amount: bigint;
    from: Address;
    response_destination: Address | null;
    forward_ton_amount: bigint;
    forward_payload: Slice;
}

export function storeTokenTransferInternal(src: TokenTransferInternal) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(395134233, 32);
        b_0.storeUint(src.query_id, 64);
        b_0.storeCoins(src.amount);
        b_0.storeAddress(src.from);
        b_0.storeAddress(src.response_destination);
        b_0.storeCoins(src.forward_ton_amount);
        b_0.storeBuilder(src.forward_payload.asBuilder());
    };
}

export function loadTokenTransferInternal(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 395134233) { throw Error('Invalid prefix'); }
    let _query_id = sc_0.loadUintBig(64);
    let _amount = sc_0.loadCoins();
    let _from = sc_0.loadAddress();
    let _response_destination = sc_0.loadMaybeAddress();
    let _forward_ton_amount = sc_0.loadCoins();
    let _forward_payload = sc_0;
    return { $$type: 'TokenTransferInternal' as const, query_id: _query_id, amount: _amount, from: _from, response_destination: _response_destination, forward_ton_amount: _forward_ton_amount, forward_payload: _forward_payload };
}

export type TokenNotification = {
    $$type: 'TokenNotification';
    query_id: bigint;
    amount: bigint;
    from: Address;
    forward_payload: Slice;
}

export function storeTokenNotification(src: TokenNotification) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1935855772, 32);
        b_0.storeUint(src.query_id, 64);
        b_0.storeCoins(src.amount);
        b_0.storeAddress(src.from);
        b_0.storeBuilder(src.forward_payload.asBuilder());
    };
}

export function loadTokenNotification(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1935855772) { throw Error('Invalid prefix'); }
    let _query_id = sc_0.loadUintBig(64);
    let _amount = sc_0.loadCoins();
    let _from = sc_0.loadAddress();
    let _forward_payload = sc_0;
    return { $$type: 'TokenNotification' as const, query_id: _query_id, amount: _amount, from: _from, forward_payload: _forward_payload };
}

export type TokenBurn = {
    $$type: 'TokenBurn';
    query_id: bigint;
    amount: bigint;
    response_destination: Address | null;
    custom_payload: Cell | null;
}

export function storeTokenBurn(src: TokenBurn) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1499400124, 32);
        b_0.storeUint(src.query_id, 64);
        b_0.storeCoins(src.amount);
        b_0.storeAddress(src.response_destination);
        if (src.custom_payload !== null && src.custom_payload !== undefined) { b_0.storeBit(true).storeRef(src.custom_payload); } else { b_0.storeBit(false); }
    };
}

export function loadTokenBurn(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1499400124) { throw Error('Invalid prefix'); }
    let _query_id = sc_0.loadUintBig(64);
    let _amount = sc_0.loadCoins();
    let _response_destination = sc_0.loadMaybeAddress();
    let _custom_payload = sc_0.loadBit() ? sc_0.loadRef() : null;
    return { $$type: 'TokenBurn' as const, query_id: _query_id, amount: _amount, response_destination: _response_destination, custom_payload: _custom_payload };
}

export type TokenBurnNotification = {
    $$type: 'TokenBurnNotification';
    query_id: bigint;
    amount: bigint;
    sender: Address;
    response_destination: Address | null;
}

export function storeTokenBurnNotification(src: TokenBurnNotification) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2078119902, 32);
        b_0.storeUint(src.query_id, 64);
        b_0.storeCoins(src.amount);
        b_0.storeAddress(src.sender);
        b_0.storeAddress(src.response_destination);
    };
}

export function loadTokenBurnNotification(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2078119902) { throw Error('Invalid prefix'); }
    let _query_id = sc_0.loadUintBig(64);
    let _amount = sc_0.loadCoins();
    let _sender = sc_0.loadAddress();
    let _response_destination = sc_0.loadMaybeAddress();
    return { $$type: 'TokenBurnNotification' as const, query_id: _query_id, amount: _amount, sender: _sender, response_destination: _response_destination };
}

export type TokenExcesses = {
    $$type: 'TokenExcesses';
    query_id: bigint;
}

export function storeTokenExcesses(src: TokenExcesses) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(3576854235, 32);
        b_0.storeUint(src.query_id, 64);
    };
}

export function loadTokenExcesses(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 3576854235) { throw Error('Invalid prefix'); }
    let _query_id = sc_0.loadUintBig(64);
    return { $$type: 'TokenExcesses' as const, query_id: _query_id };
}

export type TokenUpdateContent = {
    $$type: 'TokenUpdateContent';
    content: Cell;
}

export function storeTokenUpdateContent(src: TokenUpdateContent) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2937889386, 32);
        b_0.storeRef(src.content);
    };
}

export function loadTokenUpdateContent(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2937889386) { throw Error('Invalid prefix'); }
    let _content = sc_0.loadRef();
    return { $$type: 'TokenUpdateContent' as const, content: _content };
}

export type ProvideWalletAddress = {
    $$type: 'ProvideWalletAddress';
    query_id: bigint;
    owner_address: Address;
    include_address: boolean;
}

export function storeProvideWalletAddress(src: ProvideWalletAddress) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(745978227, 32);
        b_0.storeUint(src.query_id, 64);
        b_0.storeAddress(src.owner_address);
        b_0.storeBit(src.include_address);
    };
}

export function loadProvideWalletAddress(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 745978227) { throw Error('Invalid prefix'); }
    let _query_id = sc_0.loadUintBig(64);
    let _owner_address = sc_0.loadAddress();
    let _include_address = sc_0.loadBit();
    return { $$type: 'ProvideWalletAddress' as const, query_id: _query_id, owner_address: _owner_address, include_address: _include_address };
}

export type TakeWalletAddress = {
    $$type: 'TakeWalletAddress';
    query_id: bigint;
    wallet_address: Address;
    owner_address: Slice;
}

export function storeTakeWalletAddress(src: TakeWalletAddress) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(3513996288, 32);
        b_0.storeUint(src.query_id, 64);
        b_0.storeAddress(src.wallet_address);
        b_0.storeBuilder(src.owner_address.asBuilder());
    };
}

export function loadTakeWalletAddress(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 3513996288) { throw Error('Invalid prefix'); }
    let _query_id = sc_0.loadUintBig(64);
    let _wallet_address = sc_0.loadAddress();
    let _owner_address = sc_0;
    return { $$type: 'TakeWalletAddress' as const, query_id: _query_id, wallet_address: _wallet_address, owner_address: _owner_address };
}

export type JettonMint = {
    $$type: 'JettonMint';
    origin: Address;
    receiver: Address;
    amount: bigint;
    custom_payload: Cell | null;
    forward_ton_amount: bigint;
    forward_payload: Slice;
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
    let _forward_payload = sc_0;
    return { $$type: 'JettonMint' as const, origin: _origin, receiver: _receiver, amount: _amount, custom_payload: _custom_payload, forward_ton_amount: _forward_ton_amount, forward_payload: _forward_payload };
}

export type UpdateDeposits = {
    $$type: 'UpdateDeposits';
    amount: bigint;
    sender: Address;
    receiver: Address;
}

export function storeUpdateDeposits(src: UpdateDeposits) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(3121058093, 32);
        b_0.storeInt(src.amount, 257);
        b_0.storeAddress(src.sender);
        b_0.storeAddress(src.receiver);
    };
}

export function loadUpdateDeposits(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 3121058093) { throw Error('Invalid prefix'); }
    let _amount = sc_0.loadIntBig(257);
    let _sender = sc_0.loadAddress();
    let _receiver = sc_0.loadAddress();
    return { $$type: 'UpdateDeposits' as const, amount: _amount, sender: _sender, receiver: _receiver };
}

export type BridgeBoilerplate = {
    $$type: 'BridgeBoilerplate';
    amount: bigint;
    payload: Cell;
}

export function storeBridgeBoilerplate(src: BridgeBoilerplate) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeInt(src.amount, 257);
        b_0.storeRef(src.payload);
    };
}

export function loadBridgeBoilerplate(slice: Slice) {
    let sc_0 = slice;
    let _amount = sc_0.loadIntBig(257);
    let _payload = sc_0.loadRef();
    return { $$type: 'BridgeBoilerplate' as const, amount: _amount, payload: _payload };
}

export type Boost = {
    $$type: 'Boost';
    amount: bigint;
}

export function storeBoost(src: Boost) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(3863699873, 32);
        b_0.storeInt(src.amount, 257);
    };
}

export function loadBoost(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 3863699873) { throw Error('Invalid prefix'); }
    let _amount = sc_0.loadIntBig(257);
    return { $$type: 'Boost' as const, amount: _amount };
}

export type InternalWithdrawDeposit = {
    $$type: 'InternalWithdrawDeposit';
    amount: bigint;
    global_fee_growth: bigint;
    total_supply: bigint;
}

export function storeInternalWithdrawDeposit(src: InternalWithdrawDeposit) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(432565636, 32);
        b_0.storeInt(src.amount, 257);
        b_0.storeInt(src.global_fee_growth, 257);
        b_0.storeInt(src.total_supply, 257);
    };
}

export function loadInternalWithdrawDeposit(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 432565636) { throw Error('Invalid prefix'); }
    let _amount = sc_0.loadIntBig(257);
    let _global_fee_growth = sc_0.loadIntBig(257);
    let _total_supply = sc_0.loadIntBig(257);
    return { $$type: 'InternalWithdrawDeposit' as const, amount: _amount, global_fee_growth: _global_fee_growth, total_supply: _total_supply };
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

export type LPData = {
    $$type: 'LPData';
    apy: bigint;
    available_underlying: bigint;
    decimals: bigint;
    fee_growth_global: bigint;
    fee_decimals: bigint;
    protocol_fee: bigint;
    protocol_fee_amount: bigint;
    token_fee: bigint;
    total_supply: bigint;
}

export function storeLPData(src: LPData) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeInt(src.apy, 257);
        b_0.storeInt(src.available_underlying, 257);
        b_0.storeInt(src.decimals, 257);
        let b_1 = new Builder();
        b_1.storeInt(src.fee_growth_global, 257);
        b_1.storeInt(src.fee_decimals, 257);
        b_1.storeInt(src.protocol_fee, 257);
        let b_2 = new Builder();
        b_2.storeInt(src.protocol_fee_amount, 257);
        b_2.storeInt(src.token_fee, 257);
        b_2.storeInt(src.total_supply, 257);
        b_1.storeRef(b_2.endCell());
        b_0.storeRef(b_1.endCell());
    };
}

export function loadLPData(slice: Slice) {
    let sc_0 = slice;
    let _apy = sc_0.loadIntBig(257);
    let _available_underlying = sc_0.loadIntBig(257);
    let _decimals = sc_0.loadIntBig(257);
    let sc_1 = sc_0.loadRef().beginParse();
    let _fee_growth_global = sc_1.loadIntBig(257);
    let _fee_decimals = sc_1.loadIntBig(257);
    let _protocol_fee = sc_1.loadIntBig(257);
    let sc_2 = sc_1.loadRef().beginParse();
    let _protocol_fee_amount = sc_2.loadIntBig(257);
    let _token_fee = sc_2.loadIntBig(257);
    let _total_supply = sc_2.loadIntBig(257);
    return { $$type: 'LPData' as const, apy: _apy, available_underlying: _available_underlying, decimals: _decimals, fee_growth_global: _fee_growth_global, fee_decimals: _fee_decimals, protocol_fee: _protocol_fee, protocol_fee_amount: _protocol_fee_amount, token_fee: _token_fee, total_supply: _total_supply };
}
function loadGetterTupleLPData(source: TupleReader) {
    let _apy = source.readBigNumber();
    let _available_underlying = source.readBigNumber();
    let _decimals = source.readBigNumber();
    let _fee_growth_global = source.readBigNumber();
    let _fee_decimals = source.readBigNumber();
    let _protocol_fee = source.readBigNumber();
    let _protocol_fee_amount = source.readBigNumber();
    let _token_fee = source.readBigNumber();
    let _total_supply = source.readBigNumber();
    return { $$type: 'LPData' as const, apy: _apy, available_underlying: _available_underlying, decimals: _decimals, fee_growth_global: _fee_growth_global, fee_decimals: _fee_decimals, protocol_fee: _protocol_fee, protocol_fee_amount: _protocol_fee_amount, token_fee: _token_fee, total_supply: _total_supply };
}

export type ReleaseTokens = {
    $$type: 'ReleaseTokens';
    to: Address;
    amount: bigint;
    body: Cell | null;
}

export function storeReleaseTokens(src: ReleaseTokens) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(169475742, 32);
        b_0.storeAddress(src.to);
        b_0.storeInt(src.amount, 257);
        if (src.body !== null && src.body !== undefined) { b_0.storeBit(true).storeRef(src.body); } else { b_0.storeBit(false); }
    };
}

export function loadReleaseTokens(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 169475742) { throw Error('Invalid prefix'); }
    let _to = sc_0.loadAddress();
    let _amount = sc_0.loadIntBig(257);
    let _body = sc_0.loadBit() ? sc_0.loadRef() : null;
    return { $$type: 'ReleaseTokens' as const, to: _to, amount: _amount, body: _body };
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

export type Position = {
    $$type: 'Position';
    balance: bigint;
    last_fee_growth: bigint;
    rewards: bigint;
}

export function storePosition(src: Position) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeInt(src.balance, 257);
        b_0.storeInt(src.last_fee_growth, 257);
        b_0.storeInt(src.rewards, 257);
    };
}

export function loadPosition(slice: Slice) {
    let sc_0 = slice;
    let _balance = sc_0.loadIntBig(257);
    let _last_fee_growth = sc_0.loadIntBig(257);
    let _rewards = sc_0.loadIntBig(257);
    return { $$type: 'Position' as const, balance: _balance, last_fee_growth: _last_fee_growth, rewards: _rewards };
}

function loadGetterTuplePosition(source: TupleReader) {
    let _balance = source.readBigNumber();
    let _last_fee_growth = source.readBigNumber();
    let _rewards = source.readBigNumber();
    return { $$type: 'Position' as const, balance: _balance, last_fee_growth: _last_fee_growth, rewards: _rewards };
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

export type CollectWithdrawData = {
    $$type: 'CollectWithdrawData';
    amount: bigint;
    wallet: Address;
}

export function storeCollectWithdrawData(src: CollectWithdrawData) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(3710151747, 32);
        b_0.storeInt(src.amount, 257);
        b_0.storeAddress(src.wallet);
    };
}

export function loadCollectWithdrawData(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 3710151747) { throw Error('Invalid prefix'); }
    let _amount = sc_0.loadIntBig(257);
    let _wallet = sc_0.loadAddress();
    return { $$type: 'CollectWithdrawData' as const, amount: _amount, wallet: _wallet };
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

export type SetAdmin = {
    $$type: 'SetAdmin';
    newAdmin: Address;
}

export function storeSetAdmin(src: SetAdmin) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2713466466, 32);
        b_0.storeAddress(src.newAdmin);
    };
}

export function loadSetAdmin(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2713466466) { throw Error('Invalid prefix'); }
    let _newAdmin = sc_0.loadAddress();
    return { $$type: 'SetAdmin' as const, newAdmin: _newAdmin };
}

export type SetBridge = {
    $$type: 'SetBridge';
    newBridge: Address;
}

export function storeSetBridge(src: SetBridge) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(4210575997, 32);
        b_0.storeAddress(src.newBridge);
    };
}

export function loadSetBridge(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 4210575997) { throw Error('Invalid prefix'); }
    let _newBridge = sc_0.loadAddress();
    return { $$type: 'SetBridge' as const, newBridge: _newBridge };
}

export type SetCFO = {
    $$type: 'SetCFO';
    newCFO: Address;
}

export function storeSetCFO(src: SetCFO) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(3542740611, 32);
        b_0.storeAddress(src.newCFO);
    };
}

export function loadSetCFO(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 3542740611) { throw Error('Invalid prefix'); }
    let _newCFO = sc_0.loadAddress();
    return { $$type: 'SetCFO' as const, newCFO: _newCFO };
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

export type UpdateFees = {
    $$type: 'UpdateFees';
    protocol_fee: bigint;
    token_fee: bigint;
}

export function storeUpdateFees(src: UpdateFees) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(139646236, 32);
        b_0.storeInt(src.protocol_fee, 257);
        b_0.storeInt(src.token_fee, 257);
    };
}

export function loadUpdateFees(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 139646236) { throw Error('Invalid prefix'); }
    let _protocol_fee = sc_0.loadIntBig(257);
    let _token_fee = sc_0.loadIntBig(257);
    return { $$type: 'UpdateFees' as const, protocol_fee: _protocol_fee, token_fee: _token_fee };
}

export type UpdateGasCost = {
    $$type: 'UpdateGasCost';
    newGasCost: bigint;
}

export function storeUpdateGasCost(src: UpdateGasCost) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(463012999, 32);
        b_0.storeInt(src.newGasCost, 257);
    };
}

export function loadUpdateGasCost(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 463012999) { throw Error('Invalid prefix'); }
    let _newGasCost = sc_0.loadIntBig(257);
    return { $$type: 'UpdateGasCost' as const, newGasCost: _newGasCost };
}

export type Withdraw = {
    $$type: 'Withdraw';
    amount: bigint;
}

export function storeWithdraw(src: Withdraw) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1616450832, 32);
        b_0.storeInt(src.amount, 257);
    };
}

export function loadWithdraw(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1616450832) { throw Error('Invalid prefix'); }
    let _amount = sc_0.loadIntBig(257);
    return { $$type: 'Withdraw' as const, amount: _amount };
}

export type WithdrawGas = {
    $$type: 'WithdrawGas';
    amount: bigint;
}

export function storeWithdrawGas(src: WithdrawGas) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(602125092, 32);
        b_0.storeInt(src.amount, 257);
    };
}

export function loadWithdrawGas(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 602125092) { throw Error('Invalid prefix'); }
    let _amount = sc_0.loadIntBig(257);
    return { $$type: 'WithdrawGas' as const, amount: _amount };
}

export type WithdrawRewards = {
    $$type: 'WithdrawRewards';
}

export function storeWithdrawRewards() {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(852627366, 32);
    };
}

export function loadWithdrawRewards(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 852627366) { throw Error('Invalid prefix'); }
    return { $$type: 'WithdrawRewards' as const };
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

export type WithdrawProtocolFee = {
    $$type: 'WithdrawProtocolFee';
}

export function storeWithdrawProtocolFee() {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(3742263588, 32);
    };
}

export function loadWithdrawProtocolFee(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 3742263588) { throw Error('Invalid prefix'); }
    return { $$type: 'WithdrawProtocolFee' as const };
}

export type WithdrawStake = {
    $$type: 'WithdrawStake';
    amount: bigint;
}

export function storeWithdrawStake(src: WithdrawStake) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1184505655, 32);
        b_0.storeInt(src.amount, 257);
    };
}

export function loadWithdrawStake(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1184505655) { throw Error('Invalid prefix'); }
    let _amount = sc_0.loadIntBig(257);
    return { $$type: 'WithdrawStake' as const, amount: _amount };
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


export type Withdrawn = {
    $$type: 'Withdrawn';
    stake: bigint;
    rewards: bigint;
    user: Address;
}

export function storeWithdrawn(src: Withdrawn) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(4071912493, 32);
        b_0.storeInt(src.stake, 257);
        b_0.storeInt(src.rewards, 257);
        b_0.storeAddress(src.user);
    };
}

export function loadWithdrawn(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 4071912493) { throw Error('Invalid prefix'); }
    let _stake = sc_0.loadIntBig(257);
    let _rewards = sc_0.loadIntBig(257);
    let _user = sc_0.loadAddress();
    return { $$type: 'Withdrawn' as const, stake: _stake, rewards: _rewards, user: _user };
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

export type LPWallet$Data = {
    $$type: 'LPWallet$Data';
    balance: bigint;
    owner: Address;
    master: Address;
}

export function storeLPWallet$Data(src: LPWallet$Data) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeCoins(src.balance);
        b_0.storeAddress(src.owner);
        b_0.storeAddress(src.master);
    };
}

export function loadLPWallet$Data(slice: Slice) {
    let sc_0 = slice;
    let _balance = sc_0.loadCoins();
    let _owner = sc_0.loadAddress();
    let _master = sc_0.loadAddress();
    return { $$type: 'LPWallet$Data' as const, balance: _balance, owner: _owner, master: _master };
}

export type ChangeOwner = {
    $$type: 'ChangeOwner';
    queryId: bigint;
    newOwner: Address;
}

export function storeChangeOwner(src: ChangeOwner) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2174598809, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeAddress(src.newOwner);
    };
}

export function loadChangeOwner(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2174598809) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    let _newOwner = sc_0.loadAddress();
    return { $$type: 'ChangeOwner' as const, queryId: _queryId, newOwner: _newOwner };
}

export type ChangeOwnerOk = {
    $$type: 'ChangeOwnerOk';
    queryId: bigint;
    newOwner: Address;
}

export function storeChangeOwnerOk(src: ChangeOwnerOk) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(846932810, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeAddress(src.newOwner);
    };
}

export function loadChangeOwnerOk(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 846932810) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    let _newOwner = sc_0.loadAddress();
    return { $$type: 'ChangeOwnerOk' as const, queryId: _queryId, newOwner: _newOwner };
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

export type JettonLP$Data = {
    $$type: 'JettonLP$Data';
    admin: Address;
    available_underlying: bigint;
    bridge: Address;
    boost_query_id: bigint;
    cfo: Address;
    content: Cell;
    decimals: bigint;
    deployed: bigint;
    deposits: Dictionary<Address, Position>;
    fee_growth_global: bigint;
    gas_cost: bigint;
    query_id: bigint;
    mintable: boolean;
    owner: Address;
    protocolFee: bigint;
    protocol_fee_amount: bigint;
    roles: Dictionary<bigint, RoleData>;
    stake_token: Address;
    tokenFee: bigint;
    token_wallet: Address;
    total_supply: bigint;
}

export function storeJettonLP$Data(src: JettonLP$Data) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeAddress(src.admin);
        b_0.storeInt(src.available_underlying, 257);
        b_0.storeAddress(src.bridge);
        let b_1 = new Builder();
        b_1.storeInt(src.boost_query_id, 257);
        b_1.storeAddress(src.cfo);
        b_1.storeRef(src.content);
        b_1.storeInt(src.decimals, 257);
        let b_2 = new Builder();
        b_2.storeInt(src.deployed, 257);
        b_2.storeDict(src.deposits, Dictionary.Keys.Address(), dictValueParserPosition());
        b_2.storeInt(src.fee_growth_global, 257);
        b_2.storeInt(src.gas_cost, 257);
        let b_3 = new Builder();
        b_3.storeInt(src.query_id, 257);
        b_3.storeBit(src.mintable);
        b_3.storeAddress(src.owner);
        b_3.storeInt(src.protocolFee, 257);
        let b_4 = new Builder();
        b_4.storeInt(src.protocol_fee_amount, 257);
        b_4.storeDict(src.roles, Dictionary.Keys.BigInt(257), dictValueParserRoleData());
        b_4.storeAddress(src.stake_token);
        b_4.storeInt(src.tokenFee, 257);
        let b_5 = new Builder();
        b_5.storeAddress(src.token_wallet);
        b_5.storeInt(src.total_supply, 257);
        b_4.storeRef(b_5.endCell());
        b_3.storeRef(b_4.endCell());
        b_2.storeRef(b_3.endCell());
        b_1.storeRef(b_2.endCell());
        b_0.storeRef(b_1.endCell());
    };
}

export function loadJettonLP$Data(slice: Slice) {
    let sc_0 = slice;
    let _admin = sc_0.loadAddress();
    let _available_underlying = sc_0.loadIntBig(257);
    let _bridge = sc_0.loadAddress();
    let sc_1 = sc_0.loadRef().beginParse();
    let _boost_query_id = sc_1.loadIntBig(257);
    let _cfo = sc_1.loadAddress();
    let _content = sc_1.loadRef();
    let _decimals = sc_1.loadIntBig(257);
    let sc_2 = sc_1.loadRef().beginParse();
    let _deployed = sc_2.loadIntBig(257);
    let _deposits = Dictionary.load(Dictionary.Keys.Address(), dictValueParserPosition(), sc_2);
    let _fee_growth_global = sc_2.loadIntBig(257);
    let _gas_cost = sc_2.loadIntBig(257);
    let sc_3 = sc_2.loadRef().beginParse();
    let _query_id = sc_3.loadIntBig(257);
    let _mintable = sc_3.loadBit();
    let _owner = sc_3.loadAddress();
    let _protocolFee = sc_3.loadIntBig(257);
    let sc_4 = sc_3.loadRef().beginParse();
    let _protocol_fee_amount = sc_4.loadIntBig(257);
    let _roles = Dictionary.load(Dictionary.Keys.BigInt(257), dictValueParserRoleData(), sc_4);
    let _stake_token = sc_4.loadAddress();
    let _tokenFee = sc_4.loadIntBig(257);
    let sc_5 = sc_4.loadRef().beginParse();
    let _token_wallet = sc_5.loadAddress();
    let _total_supply = sc_5.loadIntBig(257);
    return { $$type: 'JettonLP$Data' as const, admin: _admin, available_underlying: _available_underlying, bridge: _bridge, boost_query_id: _boost_query_id, cfo: _cfo, content: _content, decimals: _decimals, deployed: _deployed, deposits: _deposits, fee_growth_global: _fee_growth_global, gas_cost: _gas_cost, query_id: _query_id, mintable: _mintable, owner: _owner, protocolFee: _protocolFee, protocol_fee_amount: _protocol_fee_amount, roles: _roles, stake_token: _stake_token, tokenFee: _tokenFee, token_wallet: _token_wallet, total_supply: _total_supply };
}

 type JettonLP_init_args = {
    $$type: 'JettonLP_init_args';
    admin: Address;
    cfo: Address;
    bridge: Address;
    stake_token: Address;
    decimals: bigint;
    protocolFee: bigint;
    tokenFee: bigint;
    content: Cell;
}

function initJettonLP_init_args(src: JettonLP_init_args) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeAddress(src.admin);
        b_0.storeAddress(src.cfo);
        b_0.storeAddress(src.bridge);
        let b_1 = new Builder();
        b_1.storeAddress(src.stake_token);
        b_1.storeInt(src.decimals, 257);
        b_1.storeInt(src.protocolFee, 257);
        let b_2 = new Builder();
        b_2.storeInt(src.tokenFee, 257);
        b_2.storeRef(src.content);
        b_1.storeRef(b_2.endCell());
        b_0.storeRef(b_1.endCell());
    };
}

async function JettonLP_init(admin: Address, cfo: Address, bridge: Address, stake_token: Address, decimals: bigint, protocolFee: bigint, tokenFee: bigint, content: Cell) {
    const __code = Cell.fromBase64('te6ccgEC3AEAOlUAART/APSkE/S88sgLAQIBYgIDA8rQAdDTAwFxsKMB+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiFRQUwNvBPhhAvhi2zwRFBEWERQRExEVERMREhEUERIRERETEREREBESERAPEREPDhEQDhDfVRzbPPLggscGBwIBIAQFAgEgd3gCASCZmgTuAZIwf+BwIddJwh+VMCDXCx/eIMAAItdJwSGwklt/4CCCEOZLYaG6jpgw0x8BghDmS2GhuvLggYEBAdcAATHbPH/gIIIQI+OzJLqOmDDTHwGCECPjsyS68uCBgQEB1wABMds8f+AgghDfDmkkuuMCIIIQc2LQnLoLDA0OATjI+EMBzH8BygARFREUERMREhERERBV4Ns8ye1UCAH2AREVAREUINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WARESAYEBAc8AAREQINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WDsiBAQHPAFANINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WG8wZgQEBCQH0zwAHyIEBAc8AFvQAFIEBAc8AEoEBAc8AAciBAQHPABLKAFgg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxYTgQEBzwADyIEBAc8AFPQAUAUg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxYVgQEBzwDIUAcKAGgg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxYVgQEBzwDJUAXMyVjMyQHMyQHMyQHMAfCBKmSBAQv4QlYQWVn0C2+hkjBt3yBukjBtjhbQgQEB1wCBAQHXAIEBAdcAVSBsE28D4m6z8vSCAJCH+EIRFREXERURFBEWERQRExEXERMREhEWERIREREXEREREBEWERAPERcPDhEWDg0RFw0MERYMCxEXCwoRFgoPA/YRFBEVERQRExEVERMREhEVERIREREVEREREBEVERAPERUPDhEVDg0RFQ0MERUMCxEVCwoRFQoJERUJERUIBwZVQNs8ggCd9PgnbxBWF77y9FYQAREWcXBVIG1tbds8MBETERQRExESERMREhERERIREREQEREREA8REA9eZxIBJjDTHwGCEN8OaSS68uCBbTHbPH8TBNCOyTDTHwGCEHNi0Jy68uCB0z/6APpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IhUEwMQI2wUMDKBZoH4QlJQxwXy9AHbPH/gIIIQChn+nrrjAiCCEHvdl9664wIgghAy0g+muhUWFxgD+gkRFwkIERYIBxEXBwYRFgYFERcFBBEWBAMRFwMCERYCAREXAds8VxIREVYVvgERFgHy9Cek+EIRFBEVERQRExEUERMREhETERIBERIBERAREREQDxEQDxDvEN4QzRC8EKsQmhCJEHgQZxBWEEUQNBAjAhEWAgERFgFWFts8sUMQAUwRFBEVERQRExEUERMREhETERIRERESEREREBERERAPERAPVQ7bPBEAFlHMoAERFAEMoBETAARVDgP2MNs8ggCXPCbCAPL0CaTIghAPin6lAcsfUhDLPyb6AlYRINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WVhEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxZtAfQAK/oCbQH0AMkrqgAjWXF/BANtbds8MFYQXmcUAKwmyFmCEOhLBJJQA8sfASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFoEBAc8AyciCWMAAAAAAAAAAAAAAAAEBy2fMyXD7AAEREwEFoRESEEhwBQEqgUPtIsIA8vQRFSGg+CgBERYBEts8GQGGMNMfAYIQChn+nrry4IH6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIAYEBAdcA0gABkdSSbQHiVSBsE9s8fx0BzjDTHwGCEHvdl9668uCB0z/6APpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgBINcLAcMAjh/6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIlHLXIW3iFEMwbBTbPH8kBJ6PGzDTHwGCEDLSD6a68uCBbTEA2zwgwgCRMOMNf+AgghDVMnbbuo4UMNMfAYIQ1TJ227ry4IHTPwExMH/gIIIQugeRLbrjAiCCEGBZFRC6LS4vMAK+gV3iLPL0UTGgDKQRFREXERURFBEWERQRExEXERMREhEWERIREREXEREREBEWERAPERcPDhEWDg0RFw0MERYMCxEXCwoJERcJCAcRFwcGBREXBQQDERcDAgERFgHbPFy4GgP+cFnIcAHLAXMBywFwAcsAEszMyfkAyHIBywFwAcsAEsoHy//J0CDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4Ihwf4BA+CgjyMnQVhIFBBEfBBEgWchVUNs8yUZQBBEbBAMRGgMCAREbAREaEEYQRds8MBESERQREhERERMRERtnHADAghAXjUUZUAfLHxXLP1AD+gIBINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WASBulTBwAcsBjh4g10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxbiAfoCAc8WACAREBESERAPEREPDhEQDlUdAvQiWQARFxEYERcRFhEYERYRFREYERURFBEYERQRExEYERMREhEYERIREREYEREREBEYERAPERgPDhEYDg0RGA0MERgMCxEYCwoRGAoJERgJCBEYCAcRGAcGERgGBREYBQQRGAQDERgD2zwLpMiCEA+KfqUByx9SEMs/Ih4fAfIyVhZWFlYWVhZWFlYWVhZWFlYWVhZWFlYWVhZWFlYWVhZWFlYWVhZWFlYW+EFvJBAjXwMRFBEsERQRExErERMREhEqERIREREpEREREBEoERAPEScPDhEmDg0RJQ0MESQMCxEjCwoRIgoJESEJCBEgCAcRHwcGER4GIAGe+gJWGCDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFlYYINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WbQH0AC36Ahz0AMkRFyME/gURHQUEERwEAxEbAwIRGgIBERkBERjbPFcQXw9sUQERFgERFREYERURFBEXERQBERMBERIRGBESERERFxERAREQAQ8RGA8OERcOHQwRGAwLERcLGgkRGAkIERcIFwYRGAYFERcFFAMRGAMCERcC2zyBaFAB8vRWFds8UXGgUnLSgiEiAD4nwgCYUweogScQqQSRcOIkwgCYURSogScQqQSSMXDiAMihHaDIyVYYbrOaMBEXIG7y0IARF5JXGOJWFiehAREVAaEBERYBBqEBERYRFBEWERQFERUFERIRFBESERERExERERAREhEQDxERDw4REA4Q3xDOEKwQmxCKEHkQaBBGEDUQJBAjAfDIWYIQ9bcelFADyx+BAQHPAAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxbJyIJYwAAAAAAAAAAAAAAAAQHLZ8zJcPsAKqoAIgIRFwFxfwQDbW3bPDARExEUERMREhETERIRERESEREREBERERAPERAPVQ5nAvBUYzBSMAARGBEbERgRFxEaERcRFhEZERYRFREbERURFBEaERQRExEZERMREhEbERIREREaEREREBEZERAPERsPDhEaDg0RGQ0MERsMCxEaCwoRGQoJERsJCBEaCAcRGQcGERsGBREaBQQRGQTbPBETVhahVhdWEr0lJgLiMDIRFBEWERQRExEVERMREhEWERIREREVEREREBEWERAPERUPDhEWDg0RFQ0MERYMCxEVCwoRFgoJERUJCBEWCAcRFQcGERYGBREVBQQRFgQDERUDAhEWAgERFQERFlYV2zwsgQELVhdZ9AtvoZIwbd8nKAKSnFcRVxVXFQ4RFA5wD+MNcHCAQCrIAYIQ1TJ221jLH8s/yQQRFwQQJBAjbW3bPDAREREUERERERETEREPERIPDhERDg0REA1VLCxnAvaBOoX4QW8kECNfAxEVERcRFREUERYRFBETERcRExESERYREhERERcREREQERYREA8RFw8OERYODREXDQwRFgwLERcLChEWCgkRFwkIERYIBxEXBwYRFgYFERcFBBEWBAMRFwMCERYCAREXAREW2zwBERYBxwUBERYB8vS3KQH8IG6SMG2OFtCBAQHXAIEBAdcAgQEB1wBVIGwTbwPibpaCAIen8vDeIFYXvjAsgQELVhdZ9AtvoZIwbd8gbpIwbY4W0IEBAdcAgQEB1wCBAQHXAFUgbBNvA+IgbvLQgG8jERQRFxEUERMRFhETERIRFRESERERFxERERARFhEQKgA8ERIRFBESERERExERERAREhEQDxERDw4REA4Q31UcAv4PERUPDhEXDg0RFg0MERUMCxEXCwoRFgoJERUJCBEXCAcRFgcGERUGBREXBQQRFgQDERUDAhEXAgERFgERFVYY2zwBERYBoBEXVhmhAREVAREZoQIRGAIBERUBERZvAxERERYREREQERUREA8RFA8OERMODRESDQwREQwLERALrysBLBCvEJ4QjRB8EGsQWhBJEDhHYBAl2zw8AeDIghAPin6lAcsfAREYAcs/AREW+gJWFCDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFlYUINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WbQH0ACn6Am0B9ADJKaoAVhZZcX8EA21t2zwwZwH0MIEBC/hCLllZ9AtvoZIwbd8gbpIwbY4W0IEBAdcAgQEB1wCBAQHXAFUgbBNvA+JulYFyZfLw3oEBC/hCLllZ9AtvoZIwbd8gbpIwbY4W0IEBAdcAgQEB1wCBAQHXAFUgbBNvA+IgbvLQgG8j+EIRFREYERURFBEXERQxAe4KpBEUKqHIghAPin6lAcsfVhUByz9QC/oC+EIg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxb4QiDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFm0B9AAr+gJtAfQAySuqACNZcX8EA21t2zwwCRETCWcBsjDTHwGCELoHkS268uCBgQEB1wD6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIAfpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IhDMGwT2zx/NATSjpgw0x8BghBgWRUQuvLggYEBAdcAATHbPH/gIIIQobw2YrqOsTDTHwGCEKG8NmK68uCB+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiDHbPH/gIIIQ0ynug7rjAiCCEPr4Sn26Pj9AQQP8ERMRFhETERIRGBESERERFxERERARFhEQDxEYDw4RFw4NERYNDBEYDAsRFwsKERYKCREYCQgRFwgHERYHBhEYBgURFwUEERYEAxEYAwIRFwIBERYB2zwBERYBoCDAAOMCgSyHVhQivvL0UbuhcPhCAhEZAhEYAW8DERQRFhEUrzIzAEQwVxVXFRERERQREREQERMREA8REg8OEREODREQDRDPVStwAdARExEVERMREhEUERIRERETEREREBESERAPEREPDhEQDhDfEM4NERcNEKwQmxCKEHkQaBBXEEYQNUQwAhEXAgERFwHbPBEUERURFBETERQRExESERMREhERERIREREQEREREA8REA9VDjwC9BEUERcRFBETERYRExESERUREhERERcREREQERYREA8RFQ8OERcODREWDQwRFQwLERcLChEWCgkRFQkIERcIBxEWBwYRFQYFERcFBBEWBAMRFQMCERcCAREWAREVVhXbPIIAo1n4QhLHBfL0LIEBC1YXWfQLb6GSMG3ftjUD9CBukjBtjhbQgQEB1wCBAQHXAIEBAdcAVSBsE28D4m6OqBEUERURFBETERQRExESERMREhERERIREREQEREREA8REA9VDlYX2zzjDiyBAQtWF1n0C2+hkjBt3yBukjBtjhbQgQEB1wCBAQHXAIEBAdcAVSBsE28D4m6zNjc4AFqBAQtRHnDIVSBQI4EBAc8AgQEBzwCBAQHPAMkQPxIgbpUwWfRZMJRBM/QT4gwB/CyBAQtWF1n0C2+hkjBt3yBukjBtjhbQgQEB1wCBAQHXAIEBAdcAVSBsE28D4iBu8tCAbyMRFBEXERQRExEWERMREhEVERIREREXEREREBEWERAPERUPDhEXDg0RFg0MERUMCxEXCwoRFgoJERUJCBEXCAcRFgcGERUGBREXBTkBSpRXFVcV4w0REhEUERIRERETEREREBESERAPEREPDhEQDhDfVRw6AsgEERYEAxEVAwIRFwIBERYBERVWGNs8AREWAaARF1YaoAIBERYBERdvAxESERYREhERERUREREQERQREA8REw8OERIODRERDQwREAwQvxCuEJ0QjBB7EGoQWRBIEDdGUBRDMNs8rzwB/CyBAQtWF1n0C2+hkjBt3yBukjBtjhbQgQEB1wCBAQHXAIEBAdcAVSBsE28D4iBu8tCAbyMRFBEXERQRExEWERMREhEVERIREREXEREREBEWERAPERUPDhEXDg0RFg0MERUMCxEXCwoRFgoJERUJCBEXCAcRFgcGERUGBREXBTsC7AQRFgQDERUDAhEXAgERFgERFVYY2zwBERYBoAERFwERGaECAREVAREYbwMREREWEREREBEVERAPERQPDhETDg0REg0MEREMCxEQCxCvEJ4QjRB8EGsQWhBJEDhHYBAlECPbPAERFAEREwEREgEREQEREAEPVcGvPAGSICBu8tCAbyMxAm6Rf5ogwACTIcAAkXDi4o4rLoEBCwPIVSBQI4EBAc8AgQEBzwCBAQHPAMkQPxIgbpUwWfRZMJRBM/QT4uMNDD0AdFuBAQttIG6SMG2OHCBu8tCAbyPIVSBQI4EBAc8AgQEBzwCBAQHPAMniED8SIG6VMFn0WTCUQTP0E+IB8oIAyuYhwgDy9IEBC/hCL1lZ9AtvoZIwbd8gbpIwbY4W0IEBAdcAgQEB1wCBAQHXAFUgbBNvA+JulYFyZfLw3oIAkIf4QhEVERcRFREUERYRFBETERcRExESERYREhERERcREREQERYREA8RFw8OERYODREXDQwRFgxCAvIRFBEVERQRExEVERMREhEVERIREREVEREREBEVERAPERUPDhEVDg0RFQ0MERUMCxEVCwoRFQoJERUJERUIBwZVQNs8VhRWFFYUVhRWFFYUVhRWFFYUVhRWFFYUVhRWFFYUVhRWFFYUVhRWFFYUERQRKREUERMRKBETb0UBYjDTHwGCENMp7oO68uCB+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiDHbPH9JBP6OsTDTHwGCEPr4Sn268uCB+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiDHbPH/gIIIQNhYgZ7qOrjDTHwGCEDYWIGe68uCB+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiDHgIIIQCFLVHLrjAiCCEBuZBIe6T1BRUgLyCxEXCwoRFgoJERcJCBEWCAcRFwcGERYGBREXBQQRFgQDERcDAhEWAgERFwHbPFYWvgERFwHy9PhCERQRFhEUERMRFRETERIRFBESERERExERERAREhEQDxERDw4REA4Q3xDOEL0QrBCbEIoQeRBoEFcQRhA1RAPbPLFDApQLpBEVERYRFREUERYRFBETERYRExESERYREhERERYREREQERYREA8RFg8OERYODREWDQwRFgwLERYLVZDbPHB/gED4KC4CERsBbbdEAfjIVTCCEFlfB7xQBcsfE8s/AfoCASBulTBwAcsBjh4g10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxbiIW6zlX8BygDMlHAyygDiyRA0QTABERkBECQQI21t2zwwERMRFBETERIRExESEREREhERERAREREQDxEQD1UOZwK0ERIRJxESERERJhERERARJREQDxEkDw4RIw4NESINDBEhDAsRIAsKER8KCREeCQgRHQgHERwHBhEbBgURGgUEERkEAxEYAwIRFwIBERYBERXbPFcQXw9sUVYW2kYC/iaBAQEjWfQNb6GSMG3fIG6SMG2d0PQEgQEB1wBZbBJvAuIgbuMAIG7y0IBvIoEBC1ADf3EhbpVbWfRZMJjIAc8AQTP0QeKBAQECyFkC9ACBAQHPAMkQNxIgbpUwWfRaMJRBM/QV4gRWFFYUVhRWFFYUVhRWFFYUVhRWFFYUVhTZRwLuVhRWFFYUVhRWFFYUVhRWFFYUERQRKREUERMRKBETERIRJxESERERJhERERARJREQDxEkDw4RIw4NESINDBEhDAsRIAsKER8KCREeCQgRHQgHERwHBhEbBgURGgUEERkEAxEYAwIRFwIBERYBERXbPFcQXw9sQQHaSAH+JoEBASNZ9A1voZIwbd8gbpIwbZ3Q9ASBAQHXAFlsEm8C4oELbyFus/L0IG7y0IBvIoEBC1ADcHEhbpVbWfRZMJjIAc8AQTP0QeKBAQECyFkC9ACBAQHPAMkQNxIgbpUwWfRaMJRBM/QV4gRXFBESERMREhERERIREREQEREREFcC8hEUERURFBETERURExESERUREhERERUREREQERUREA8RFQ8OERUODREVDQwRFQwLERULChEVCgkRFQkRFQgHBlVA2zxWFFYUVhRWFFYUVhRWFFYUVhRWFFYUVhRWFFYUVhRWFFYUVhRWFFYUVhQRFBEpERQRExEoERNvSgK0ERIRJxESERERJhERERARJREQDxEkDw4RIw4NESINDBEhDAsRIAsKER8KCREeCQgRHQgHERwHBhEbBgURGgUEERkEAxEYAwIRFwIBERYBERXbPFcQXw9sUVYW1ksC/iaBAQEjWfQNb6GSMG3fIG6SMG2d0PQEgQEB1wBZbBJvAuIgbuMAIG7y0IBvIoEBC1ADf3EhbpVbWfRZMJjIAc8AQTP0QeKBAQECyFkC9ACBAQHPAMkQNxIgbpUwWfRaMJRBM/QV4gRWFFYUVhRWFFYUVhRWFFYUVhRWFFYUVhTZTALuVhRWFFYUVhRWFFYUVhRWFFYUERQRKREUERMRKBETERIRJxESERERJhERERARJREQDxEkDw4RIw4NESINDBEhDAsRIAsKER8KCREeCQgRHQgHERwHBhEbBgURGgUEERkEAxEYAwIRFwIBERYBERXbPFcQXw81M1vWTQH+JoEBASNZ9A1voZIwbd8gbpIwbZ3Q9ASBAQHXAFlsEm8C4oELbyFus/L0IG7y0IBvIoEBC1ADcHEhbpVbWfRZMJjIAc8AQTP0QeKBAQECyFkC9ACBAQHPAMkQNxIgbpUwWfRaMJRBM/QV4gRXEBETERQRExESERMREhERERIREU4AEBEQEREREFUOAvIRFBEVERQRExEVERMREhEVERIREREVEREREBEVERAPERUPDhEVDg0RFQ0MERUMCxEVCwoRFQoJERUJERUIBwZVQNs8VhRWFFYUVhRWFFYUVhRWFFYUVhRWFFYUVhRWFFYUVhRWFFYUVhRWFFYUERQRKREUERMRKBETb1MB9hEUERURFBETERURExESERUREhERERUREREQERUREA8RFQ8OERUODREVDQwRFQwLERULChEVCgkRFQkRFQgHBlVA2zwxERMRFBETERIRExESEREREhERERAREREQDxEQDxDvEN4QzRC8EKsQmhCJEHgQZxBWEEUQNEEwf28BPDDTHwGCEAhS1Ry68uCBgQEB1wCBAQHXAFlsEts8f1gEuo6VMNMfAYIQG5kEh7ry4IGBAQHXAAEx4CCCEJRqmLa6jqgw0x8BghCUapi2uvLggdM/ATHIAYIQr/kPV1jLH8s/yfhCAXBt2zx/4CCCEK8comq64wIgghAsdrlzulpbXF0CtBESEScREhERESYREREQESUREA8RJA8OESMODREiDQwRIQwLESALChEfCgkRHgkIER0IBxEcBwYRGwYFERoFBBEZBAMRGAMCERcCAREWAREV2zxXEF8PbFFWFtJUAv4mgQEBI1n0DW+hkjBt3yBukjBtndD0BIEBAdcAWWwSbwLiIG7jACBu8tCAbyKBAQtQA39xIW6VW1n0WTCYyAHPAEEz9EHigQEBAshZAvQAgQEBzwDJEDcSIG6VMFn0WjCUQTP0FeIEVhRWFFYUVhRWFFYUVhRWFFYUVhRWFFYU2VUC7lYUVhRWFFYUVhRWFFYUVhRWFBEUESkRFBETESgRExESEScREhERESYREREQESUREA8RJA8OESMODREiDQwRIQwLESALChEfCgkRHgkIER0IBxEcBwYRGwYFERoFBBEZBAMRGAMCERcCAREWAREV2zxXEF8PNVsx0lYB/iaBAQEjWfQNb6GSMG3fIG6SMG2d0PQEgQEB1wBZbBJvAuKBC28hbrPy9CBu8tCAbyKBAQtQA3BxIW6VW1n0WTCYyAHPAEEz9EHigQEBAshZAvQAgQEBzwDJEDcSIG6VMFn0WjCUQTP0FeIEVxIRExEUERMREhETERIREBERERBXAAwPERAPVQ4C7BEUERYRFBETERURExESERYREhERERUREREQERYREA8RFQ8OERYODREVDQwRFgwLERULChEWCgkRFQkIERYIBxEVBwYRFgYFERUFBBEWBAMRFQMCERYCAREVAREW2zwyNYFzC1YUVha78vQREhEUERIRERETERFeWQBOERAREhEQDxERDw4REA4Q3xDOEL0QrBCbEIoQeRBoEFcQVhA1RDASAe4RFBEVERQRExEVERMREhEVERIREREVEREREBEVERAPERUPDhEVDg0RFQ0MERUMCxEVCwoRFQoJERUJERUIBwZVQNs8OoIAg4FWFcIA8vQRExEUERMREhETERIRERESEREREBERERAPERAPEO8Q3hDNELwQq1UIf14BPG1tIm6zmVsgbvLQgG8iAZEy4hAkcAMEgEJQI9s8MGcB6DDTHwGCEK8comq68uCB1AExERQRFREUERMRFRETERIRFRESERERFRERERARFREQDxEVDw4RFQ4NERUNDBEVDAsRFQsKERUKCREVCREVCAcGVUDbPD8RExEUERMREhETERIRERESEREREBERERAPERAPVQ1/YAP8jrYw0x8BghAsdrlzuvLggdM/+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiAHSAFUgbBPgIIIQCmHbWbqOuTDTHwGCEAph21m68uCB+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiAGBAQHXAFlsEts8f+AgYWJjAt4kERMRFRETERIRFBESERERFRERERARFBEQDxEVDw4RFA4NERUNDBEUDAsRFQsKERQKCREVCQgRFAgHERUHBhEUBgURFQUEERQEAxEVAwIRFAIBERUBERSBAQERFts8AhEWAgERFwFZ9A1voZIwbd/WXwDiIG6SMG2d0PQEgQEB1wBZbBJvAuKCANFNIW6z8vQgbvLQgG8iMIEBC/hBbyQQI18DcUEz9ApvoZQB1wAwkltt4oEYKyFus5gBIG7y0IDA/5IxcOLy9BESERQREhERERMREREQERIREA8REQ8OERAOVR0AEvhCUoDHBfLghAPkgUf9+EFvJBNfA4IIXRQgvvL0+EP4KFIw2zwCjtIy+EJwA4BAA3BZyHABywFzAcsBcAHLABLMzMn5AMhyAcsBcAHLABLKB8v/ydAg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIyHABygDJ0BAl4w1/uWRlAuwRFBEWERQRExEVERMREhEWERIREREVEREREBEWERAPERUPDhEWDg0RFQ0MERYMCxEVCwoRFgoJERUJCBEWCAcRFQcGERYGBREVBQQRFgQDERUDAhEWAgERFQERFts8ERQRFhEUERMRFRETERIRFBESERERExERb2kDsIIQUT7zXrqOuTDTHwGCEFE+81668uCB+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiAGBAQHXAFlsEts8f+AgghAXMr4huuMCghAk+kfJuuMCMHBsbW4BdshVIIIQ0XNUAFAEyx8Syz8BINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WAc8WyX9VMG1t2zwwZwHi+EJwAoBABHBZyHABywFzAcsBcAHLABLMzMn5AMhyAcsBcAHLABLKB8v/ydAg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIyH8BygBQBSDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFsnQRUBmAXrIVSCCENFzVABQBMsfEss/ASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFgHPFskQI39VMG1t2zwwZwHKyHEBygFQBwHKAHABygJQBSDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFlAD+gJwAcpoI26zkX+TJG6z4pczMwFwAcoA4w0hbrOcfwHKAAEgbvLQgAHMlTFwAcoA4skB+whoAJh/AcoAyHABygBwAcoAJG6znX8BygAEIG7y0IBQBMyWNANwAcoA4iRus51/AcoABCBu8tCAUATMljQDcAHKAOJwAcoAAn8BygACyVjMASgREBESERAPEREPDhEQDhDfVRzbPGoD4hEUERYRFBETERURExESERYREhERERUREREQERYREA8RFQ8OERYODREVDQwRFgwLERULChEWCgkRFQkIERYIBxEVBwYRFgYFERUFBBEWBAMRFQMCERYCAREVAREWVhXbPNs8JIEBAVYXWfQNb6GSMG3fkHNrAf4gbpIwbZ3Q9ASBAQHXAFlsEm8C4iBu8tCAbyKBAQsBERl/cSFulVtZ9FkwmMgBzwBBM/RB4oEBAREYyFkC9ACBAQHPAMkQNQIRFwIBERYBIG6VMFn0WjCUQTP0FeIREhEUERIRERETEREREBESERAPEREPDhEQDhDfEM4QvRCsdgLsERQRFhEUERMRFRETERIRFhESERERFRERERARFhEQDxEVDw4RFg4NERUNDBEWDAsRFQsKERYKCREVCQgRFggHERUHBhEWBgURFQUEERYEAxEVAwIRFgIBERUBERbbPBEUERYRFBETERURExESERQREhERERMREW9wAZAw0x8BghAXMr4huvLggYEBAdcA+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiBJsEoEfC/hBbyQQI18DIscF8vTbPH9yANzTHwGCECT6R8m68uCBgQEB1wCBAQHXAFlsEiaBAQEjWfQNb6GSMG3fIG6SMG2d0PQEgQEB1wBZbBJvAuKBVOUhbrPy9CBu8tCAbyIwgQEBAshZAvQAgQEBzwDJEDcSIG6VMFn0WjCUQTP0FeIEfwLeJBETERURExESERQREhERERUREREQERQREA8RFQ8OERQODREVDQwRFAwLERULChEUCgkRFQkIERQIBxEVBwYRFAYFERUFBBEUBAMRFQMCERQCAREVAREUgQEBERbbPAIRFgIBERcBWfQNb6GSMG3f2nEBKBEQERIREA8REQ8OERAOEN9VHNs8cgDgIG6SMG2d0PQEgQEB1wBZbBJvAuKBFZQhbrPy9CBu8tCAbyIwgQEL+EFvJBAjXwNxQTP0Cm+hlAHXADCSW23igUKPIW6zmAEgbvLQgMD/kjFw4vL0ERIRFBESERERExERERAREhEQDxERDw4REA5VHQPiERQRFhEUERMRFRETERIRFhESERERFRERERARFhEQDxEVDw4RFg4NERUNDBEWDAsRFQsKERYKCREVCQgRFggHERUHBhEWBgURFQUEERYEAxEVAwIRFgIBERUBERZWFds82zwkgQEBVhdZ9A1voZIwbd+Qc3QC8oIAxO34QW8kECNfAxEWERcRFhEVERcRFREUERcRFBETERcRExESERcREhERERcREREQERcREA8RFw8OERcODREXDQwRFwwLERcLChEXCgkRFwkIERcIBxEXBwYRFwYFERcFBBEXBAMRFwMCERcCAREX2zwBERYB8vSCdQH+IG6SMG2d0PQEgQEB1wBZbBJvAuIgbvLQgG8igQELAREZcHEhbpVbWfRZMJjIAc8AQTP0QeKBAQERGMhZAvQAgQEBzwDJEDUCERcCAREWASBulTBZ9FowlEEz9BXiERIRFBESERERExERERAREhEQDxERDw4REA4Q3xDOEL0QrHYAPBETERQRExESERMREhERERIREREQEREREA8REA9VDgAiEJsQihB5EGgQVxBGEDVQRAMCASB+fwIBIHl6AgEge3wCGbe9m2ebZ4riC+HtijDHfQIBZo2OAgEgkZIABFYQAgFIgIECASCDhAIBIIaHAqOs1oCQa6TAgIXdeXBEEGuFhRBAgn/deWhEwYTdeXBEbZ4IigiLCIoIiYiKiImIiQiKCIkIiIiJiIiIiAiJCIgHiIiHhwiIByqO7Z4riC+HtijAx4IAnoEBAScCWfQNb6GSMG3fIG6SMG2d0PQEgQEB1wBZbBJvAuIgbpJbcOAgbvLQgG8iMIEBC1hxQTP0Cm+hlAHXADCSW23iIG6SMHDgIG7y0IACGbLpds82zxXEF8PbFGDHhQIBIIqLAAIpAhiqfNs82zxXEF8PbFHHiAIYqDvbPNs8VxBfD2xRx4kAAiMAAiECFa5E7Z5tnjZMtmTAx4wCGa1ebZ5tniuIL4e2KMDH1gEoVH7bVCIw2zxWFFYQLoEnEFR7pyiUAhemO7Z5tniuIL4e2KPHjwJfpiO2eCIoIioiKCImIigiJiIkIiYiJCIiIiQiIiIgIiIiIB4iIB6qHbZ4riC+Htijx5AAAicAZIEBASYCWfQNb6GSMG3fIG6SMG2d0PQEgQEB1wBZbBJvAuKBVOUhbrPy9CBu8tCAbyIxAhmseG2ebZ4riC+HtijAx5MCGaxd7Z5tniuIL4e2KMDH2gEQVH7bVCIw2zyUAfR6UAMgwv/yhXEBkiGo5DFcuZF/k1MgueKRf44QXKkEwgCzllMgqQTCAJFw4uKTXwRw4BEVERgRFREUERcRFBETERYRExESERgREhERERcREREQERYREA8RGA8OERcODREWDQwRGAwLERcLChEWCgkRGAkIERcIBxEWB5UC/AYRGAYFERcFBBEWBAMRGAMCERcCAREWAREY2zwRF1YYqIEnEKgBERapBFYWqQSBJxCpBFYXAaBWF3ARGJshqFYYqQQRF6QRF+QxVxYRFVYWoYEnEKgBERapBBESERUREhERERQREREQERMREA8REg8OEREODREQDRDPEL4QrZaXATLbPCDBAZIwcd4ggQFtvJIwcZaBAW0BqQTimAAgEJwQixB6EGkQWBBHEDZFQAA2+CNcvJJbcOABoYIBUYCpBCCBAW28lDCBAW3eAgEgm5wCASCgoQIBWKWmAgEgnZ4CGbEjNs82zxXEF8PbFGDHnwIBWLq7AAIuAgEgvr8CASCiowIBWMTFAhmyrLbPNs8VxBfD2xRgx6QABFYTAgFmp6gCFa8W7Z5tnjZ6tjLAx6sCAW6pqgIBILS1ApevSDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjbPBEUERURFBETERQRExESERMREhERERIREREQEREREA8REA9VDts8VxBfD2xRgx6wCk6sINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiNs8ERQRFREUERMRFBETERIRExESEREREhERERAREREQDxEQD1UO2zxs82xjgx60BIvhD+ChSkNs8MFRhoFKgVhMBuQEE2zyvAfQtgQELIln0C2+hkjBt3yBukjBtjhbQgQEB1wCBAQHXAIEBAdcAVSBsE28D4m6UMHBTAOAtgQELIln0C2+hkjBt3yBukjBtjhbQgQEB1wCBAQHXAIEBAdcAVSBsE28D4iBu8tCAbyNbLREVERcRFREUERYRFBETERcRE64C/BESERYREhERERcREREQERYREA8RFw8OERYODREXDQwRFgwLERcLChEWCgkRFwkIERYIBxEXBwYRFgYFERcFBBEWBAMRFwMCERYCAREXAREW2zwCERcCAREWAREVERcRFREUERYRFBETERURExESERQREhERERMREREQERIREK+wAvYtgQELIln0C2+hkjBt3yBukjBtjhbQgQEB1wCBAQHXAIEBAdcAVSBsE28D4m6SMHDgERQRFREUERMRFRETERIRFRESERERFRERERARFREQDxEVDw4RFQ4NERUNDBEVDAsRFQsKERUKCREVCREVCAcGVUBWFds8gQELLgKxsgBADxERDw4REA4Q3xDOEL0QrBCbEIoQeRBoEFcQRhA1EDQAyi2BAQsiWfQLb6GSMG3fIG6SMG2OFtCBAQHXAIEBAdcAgQEB1wBVIGwTbwPibpIwcOCBAQsuAln0C2+hkjBt3yBukjBtjhbQgQEB1wCBAQHXAIEBAdcAVSBsE28D4iBu8tCAbyNbAf4RGFn0C2+hkjBt3yBukjBtjhbQgQEB1wCBAQHXAIEBAdcAVSBsE28D4iBu8tCAbyMwMVLAoSDCAI5FAREWAahWFakEERQRFREUERMRFBET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ERARJREQDxEkDw4RIw4NESINDBEhDAsRIAsKER8KCREeCQgRHQgHERwHBhEbBgURGgUEERkEAxEYAwIRFwIBERYBERXbPFcQXw9sUREVERYRFdbXAESC8FJIIca2yaF+viaZY+A9GeQzaQ2YlQc6rUPMxrV04vGhAUgRFBEVERQRExEUERMREhETERIRERESEREREBERERAPERAPVQ7YAc4mgQEBI1n0DW+hkjBt3yBukjBtndD0BIEBAdcAWWwSbwLiIG7jACBu8tCAbyKBAQtQA39xIW6VW1n0WTCYyAHPAEEz9EHigQEBAshZAvQAgQEBzwDJEDcSIG6VMFn0WjCUQTP0FeIE2QL8MG2BAQsif3EhbpVbWfRZMJjIAc8AQTP0QeIRFBEXERQRExEWERMREhEVERIREREXEREREBEWERAPERUPDhEXDg0RFg0MERUMCxEXCwoRFgoJERUJCBEXCAcRFgcGERUGBREXBQQRFgQDERUDAhEXAgERFgERFds8AREWAW8C2tsARILwg11tyItwi8ZG1tuCyFPvQYL6u9So3lnCE/K1qzrn2b4A4IEBASEgbpIwbY4SIG7y0IBvIshZAvQAgQEBzwDJ4hAmVhkBIG6VMFn0WjCUQTP0FeIRFBEXERQRExEWERMREhEVERIREREUEREREBETERAPERIPDhERDg0REA0QzxC+EK0QnBCLEHoQaRBYBxA2RQQ=');
    const __system = Cell.fromBase64('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I+OzJLry4IGBAQHXAAEx2zx/4CCCEN8OaSS64wIgghBzYtCcuiElJyoB8IEqZIEBC/hCVhBZWfQLb6GSMG3fIG6SMG2OFtCBAQHXAIEBAdcAgQEB1wBVIGwTbwPibrPy9IIAkIf4QhEVERcRFREUERYRFBETERcRExESERYREhERERcREREQERYREA8RFw8OERYODREXDQwRFgwLERcLChEWCiID+gkRFwkIERYIBxEXBwYRFgYFERcFBBEWBAMRFwMCERYCAREXAds8VxIREVYVvgERFgHy9Cek+EIRFBEVERQRExEUERMREhETERIBERIBERAREREQDxEQDxDvEN4QzRC8EKsQmhCJEHgQZxBWEEUQNBAjAhEWAgERFgFWFts8wFYjAUwRFBEVERQRExEUERMREhETERIRERESEREREBERERAPERAPVQ7bPCQAFlHMoAERFAEMoBETA/YRFBEVERQRExEVERMREhEVERIREREVEREREBEVERAPERUPDhEVDg0RFQ0MERUMCxEVCwoRFQoJERUJERUIBwZVQNs8ggCd9PgnbxBWF77y9FYQAREWcXBVIG1tbds8MBETERQRExESERMREhERERIREREQEREREA8REA9xeyYABFUOASYw0x8BghDfDmkkuvLggW0x2zx/KAP2MNs8ggCXPCbCAPL0CaTIghAPin6lAcsfUhDLPyb6AlYRINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WVhEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxZtAfQAK/oCbQH0AMkrqgAjWXF/BANtbds8MFYQcXspAKwmyFmCEOhLBJJQA8sfASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFoEBAc8AyciCWMAAAAAAAAAAAAAAAAEBy2fMyXD7AAEREwEFoRESEEhwBQTQjskw0x8BghBzYtCcuvLggdM/+gD6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIVBMDECNsFDAygWaB+EJSUMcF8vQB2zx/4CCCEAoZ/p664wIgghB73ZfeuuMCIIIQMtIPprorMDhCASqBQ+0iwgDy9BEVIaD4KAERFgES2zwsAr6BXeIs8vRRMaAMpBEVERcRFREUERYRFBETERcRExESERYREhERERcREREQERYREA8RFw8OERYODREXDQwRFgwLERcLCgkRFwkIBxEXBwYFERcFBAMRFwMCAREWAds8XMgtA/5wWchwAcsBcwHLAXABywASzMzJ+QDIcgHLAXABywASygfL/8nQINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiHB/gED4KCPIydBWEgUEER8EESBZyFVQ2zzJRlAEERsEAxEaAwIBERsBERoQRhBF2zwwERIRFBESERERExERLnsvAMCCEBeNRRlQB8sfFcs/UAP6AgEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxYBIG6VMHABywGOHiDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFuIB+gIBzxYAIBEQERIREA8REQ8OERAOVR0BhjDTHwGCEAoZ/p668uCB+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiAGBAQHXANIAAZHUkm0B4lUgbBPbPH8xAvQiWQARFxEYERcRFhEYERYRFREYERURFBEYERQRExEYERMREhEYERIREREYEREREBEYERAPERgPDhEYDg0RGA0MERgMCxEYCwoRGAoJERgJCBEYCAcRGAcGERgGBREYBQQRGAQDERgD2zwLpMiCEA+KfqUByx9SEMs/IjI2AfIyVhZWFlYWVhZWFlYWVhZWFlYWVhZWFlYWVhZWFlYWVhZWFlYWVhZWFlYW+EFvJBAjXwMRFBEsERQRExErERMREhEqERIREREpEREREBEoERAPEScPDhEmDg0RJQ0MESQMCxEjCwoRIgoJESEJCBEgCAcRHwcGER4GMwT+BREdBQQRHAQDERsDAhEaAgERGQERGNs8VxBfD2xRAREWAREVERgRFREUERcRFAEREwEREhEYERIREREXEREBERABDxEYDw4RFw4dDBEYDAsRFwsaCREYCQgRFwgXBhEYBgURFwUUAxEYAwIRFwLbPIFoUAHy9FYV2zxRcaBScu6bNDUAPifCAJhTB6iBJxCpBJFw4iTCAJhRFKiBJxCpBJIxcOIAyKEdoMjJVhhus5owERcgbvLQgBEXklcY4lYWJ6EBERUBoQERFgEGoQERFhEUERYRFAURFQUREhEUERIRERETEREREBESERAPEREPDhEQDhDfEM4QrBCbEIoQeRBoEEYQNRAkECMBnvoCVhgg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxZWGCDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFm0B9AAt+gIc9ADJERc3AfDIWYIQ9bcelFADyx+BAQHPAAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxbJyIJYwAAAAAAAAAAAAAAAAQHLZ8zJcPsAKqoAIgIRFwFxfwQDbW3bPDARExEUERMREhETERIRERESEREREBERERAPERAPVQ57Ac4w0x8BghB73ZfeuvLggdM/+gD6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIASDXCwHDAI4f+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiJRy1yFt4hRDMGwU2zx/OQLwVGMwUjAAERgRGxEYERcRGhEXERYRGREWERURGxEVERQRGhEUERMRGRETERIRGxESERERGhERERARGREQDxEbDw4RGg4NERkNDBEbDAsRGgsKERkKCREbCQgRGggHERkHBhEbBgURGgUEERkE2zwRE1YWoVYXVhK9OkAC4jAyERQRFhEUERMRFRETERIRFhESERERFRERERARFhEQDxEVDw4RFg4NERUNDBEWDAsRFQsKERYKCREVCQgRFggHERUHBhEWBgURFQUEERYEAxEVAwIRFgIBERUBERZWFds8LIEBC1YXWfQLb6GSMG3fOz0C9oE6hfhBbyQQI18DERURFxEVERQRFhEUERMRFxETERIRFhESERERFxERERARFhEQDxEXDw4RFg4NERcNDBEWDAsRFwsKERYKCREXCQgRFggHERcHBhEWBgURFwUEERYEAxEXAwIRFgIBERcBERbbPAERFgHHBQERFgHy9Mc8ADwREhEUERIRERETEREREBESERAPEREPDhEQDhDfVRwB/CBukjBtjhbQgQEB1wCBAQHXAIEBAdcAVSBsE28D4m6WggCHp/Lw3iBWF74wLIEBC1YXWfQLb6GSMG3fIG6SMG2OFtCBAQHXAIEBAdcAgQEB1wBVIGwTbwPiIG7y0IBvIxEUERcRFBETERYRExESERUREhERERcREREQERYRED4C/g8RFQ8OERcODREWDQwRFQwLERcLChEWCgkRFQkIERcIBxEWBwYRFQYFERcFBBEWBAMRFQMCERcCAREWAREVVhjbPAERFgGgERdWGaEBERUBERmhAhEYAgERFQERFm8DERERFhERERARFREQDxEUDw4REw4NERINDBERDAsREAu/PwEsEK8QnhCNEHwQaxBaEEkQOEdgECXbPFECkpxXEVcVVxUOERQOcA/jDXBwgEAqyAGCENUydttYyx/LP8kEERcEECQQI21t2zwwERERFBERERERExERDxESDw4REQ4NERANVSxBewHgyIIQD4p+pQHLHwERGAHLPwERFvoCVhQg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxZWFCDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFm0B9AAp+gJtAfQAySmqAFYWWXF/BANtbds8MHsEno8bMNMfAYIQMtIPprry4IFtMQDbPCDCAJEw4w1/4CCCENUydtu6jhQw0x8BghDVMnbbuvLggdM/ATEwf+AgghC6B5EtuuMCIIIQYFkVELpDR0hTAfQwgQEL+EIuWVn0C2+hkjBt3yBukjBtjhbQgQEB1wCBAQHXAIEBAdcAVSBsE28D4m6VgXJl8vDegQEL+EIuWVn0C2+hkjBt3yBukjBtjhbQgQEB1wCBAQHXAIEBAdcAVSBsE28D4iBu8tCAbyP4QhEVERgRFREUERcRFEQD/BETERYRExESERgREhERERcREREQERYREA8RGA8OERcODREWDQwRGAwLERcLChEWCgkRGAkIERcIBxEWBwYRGAYFERcFBBEWBAMRGAMCERcCAREWAds8AREWAaAgwADjAoEsh1YUIr7y9FG7oXD4QgIRGQIRGAFvAxEUERYRFL9FRgBEMFcVVxUREREUEREREBETERAPERIPDhERDg0REA0Qz1UrcAHQERMRFRETERIRFBESERERExERERAREhEQDxERDw4REA4Q3xDODREXDRCsEJsQihB5EGgQVxBGEDVEMAIRFwIBERcB2zwRFBEVERQRExEUERMREhETERIRERESEREREBERERAPERAPVQ5RAe4KpBEUKqHIghAPin6lAcsfVhUByz9QC/oC+EIg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxb4QiDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFm0B9AAr+gJtAfQAySuqACNZcX8EA21t2zwwCRETCXsBsjDTHwGCELoHkS268uCBgQEB1wD6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIAfpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IhDMGwT2zx/SQL0ERQRFxEUERMRFhETERIRFRESERERFxERERARFhEQDxEVDw4RFw4NERYNDBEVDAsRFwsKERYKCREVCQgRFwgHERYHBhEVBgURFwUEERYEAxEVAwIRFwIBERYBERVWFds8ggCjWfhCEscF8vQsgQELVhdZ9AtvoZIwbd/GSgP0IG6SMG2OFtCBAQHXAIEBAdcAgQEB1wBVIGwTbwPibo6oERQRFREUERMRFBETERIRExESEREREhERERAREREQDxEQD1UOVhfbPOMOLIEBC1YXWfQLb6GSMG3fIG6SMG2OFtCBAQHXAIEBAdcAgQEB1wBVIGwTbwPibrNLTE4AWoEBC1EecMhVIFAjgQEBzwCBAQHPAIEBAc8AyRA/EiBulTBZ9FkwlEEz9BPiDAH8LIEBC1YXWfQLb6GSMG3fIG6SMG2OFtCBAQHXAIEBAdcAgQEB1wBVIGwTbwPiIG7y0IBvIxEUERcRFBETERYRExESERUREhERERcREREQERYREA8RFQ8OERcODREWDQwRFQwLERcLChEWCgkRFQkIERcIBxEWBwYRFQYFERcFTQLIBBEWBAMRFQMCERcCAREWAREVVhjbPAERFgGgERdWGqACAREWAREXbwMREhEWERIREREVEREREBEUERAPERMPDhESDg0REQ0MERAMEL8QrhCdEIwQexBqEFkQSBA3RlAUQzDbPL9RAUqUVxVXFeMNERIRFBESERERExERERAREhEQDxERDw4REA4Q31UcTwH8LIEBC1YXWfQLb6GSMG3fIG6SMG2OFtCBAQHXAIEBAdcAgQEB1wBVIGwTbwPiIG7y0IBvIxEUERcRFBETERYRExESERUREhERERcREREQERYREA8RFQ8OERcODREWDQwRFQwLERcLChEWCgkRFQkIERcIBxEWBwYRFQYFERcFUALsBBEWBAMRFQMCERcCAREWAREVVhjbPAERFgGgAREXAREZoQIBERUBERhvAxERERYREREQERUREA8RFA8OERMODRESDQwREQwLERALEK8QnhCNEHwQaxBaEEkQOEdgECUQI9s8AREUARETARESARERAREQAQ9Vwb9RAZIgIG7y0IBvIzECbpF/miDAAJMhwACRcOLijisugQELA8hVIFAjgQEBzwCBAQHPAIEBAc8AyRA/EiBulTBZ9FkwlEEz9BPi4w0MUgB0W4EBC20gbpIwbY4cIG7y0IBvI8hVIFAjgQEBzwCBAQHPAIEBAc8AyeIQPxIgbpUwWfRZMJRBM/QT4gTSjpgw0x8BghBgWRUQuvLggYEBAdcAATHbPH/gIIIQobw2YrqOsTDTHwGCEKG8NmK68uCB+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiDHbPH/gIIIQ0ynug7rjAiCCEPr4Sn26VFhdZAHyggDK5iHCAPL0gQEL+EIvWVn0C2+hkjBt3yBukjBtjhbQgQEB1wCBAQHXAIEBAdcAVSBsE28D4m6VgXJl8vDeggCQh/hCERURFxEVERQRFhEUERMRFxETERIRFhESERERFxERERARFhEQDxEXDw4RFg4NERcNDBEWDFUC8gsRFwsKERYKCREXCQgRFggHERcHBhEWBgURFwUEERYEAxEXAwIRFgIBERcB2zxWFr4BERcB8vT4QhEUERYRFBETERURExESERQREhERERMREREQERIREA8REQ8OERAOEN8QzhC9EKwQmxCKEHkQaBBXEEYQNUQD2zzAVgKUC6QRFREWERURFBEWERQRExEWERMREhEWERIREREWEREREBEWERAPERYPDhEWDg0RFg0MERYMCxEWC1WQ2zxwf4BA+CguAhEbAW3HVwH4yFUwghBZXwe8UAXLHxPLPwH6AgEgbpUwcAHLAY4eINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8W4iFus5V/AcoAzJRwMsoA4skQNEEwAREZARAkECNtbds8MBETERQRExESERMREhERERIREREQEREREA8REA9VDnsC8hEUERURFBETERURExESERUREhERERUREREQERUREA8RFQ8OERUODREVDQwRFQwLERULChEVCgkRFQkRFQgHBlVA2zxWFFYUVhRWFFYUVhRWFFYUVhRWFFYUVhRWFFYUVhRWFFYUVhRWFFYUVhQRFBEpERQRExEoERODWQK0ERIRJxESERERJhERERARJREQDxEkDw4RIw4NESINDBEhDAsRIAsKER8KCREeCQgRHQgHERwHBhEbBgURGgUEERkEAxEYAwIRFwIB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EGoADA8REA9VDgH2ERQRFREUERMRFRETERIRFRESERERFRERERARFREQDxEVDw4RFQ4NERUNDBEVDAsRFQsKERUKCREVCREVCAcGVUDbPDERExEUERMREhETERIRERESEREREBERERAPERAPEO8Q3hDNELwQqxCaEIkQeBBnEFYQRRA0QTB/gwE8MNMfAYIQCFLVHLry4IGBAQHXAIEBAdcAWWwS2zx/bQLsERQRFhEUERMRFRETERIRFhESERERFRERERARFhEQDxEVDw4RFg4NERUNDBEWDAsRFQsKERYKCREVCQgRFggHERUHBhEWBgURFQUEERYEAxEVAwIRFgIBERUBERbbPDI1gXMLVhRWFrvy9BESERQREhERERMREXFuAE4REBESERAPEREPDhEQDhDfEM4QvRCsEJsQihB5EGgQVxBWEDVEMBIEuo6VMNMfAYIQG5kEh7ry4IGBAQHXAAEx4CCCEJRqmLa6jqgw0x8BghCUapi2uvLggdM/ATHIAYIQr/kPV1jLH8s/yfhCAXBt2zx/4CCCEK8comq64wIgghAsdrlzunBzdHYB7hEUERURFBETERURExESERUREhERERUREREQERUREA8RFQ8OERUODREVDQwRFQwLERULChEVCgkRFQkRFQgHBlVA2zw6ggCDgVYVwgDy9BETERQRExESERMREhERERIREREQEREREA8REA8Q7xDeEM0QvBCrVQh/cQLeJBETERURExESERQREhERERUREREQERQREA8RFQ8OERQODREVDQwRFAwLERULChEUCgkRFQkIERQIBxEVBwYRFAYFERUFBBEUBAMRFQMCERQCAREVAREUgQEBERbbPAIRFgIBERcBWfQNb6GSMG3f8nIA4iBukjBtndD0BIEBAdcAWWwSbwLiggDRTSFus/L0IG7y0IBvIjCBAQv4QW8kECNfA3FBM/QKb6GUAdcAMJJbbeKBGCshbrOYASBu8tCAwP+SMXDi8vQREhEUERIRERETEREREBESERAPEREPDhEQDlUdATxtbSJus5lbIG7y0IBvIgGRMuIQJHADBIBCUCPbPDB7Aegw0x8BghCvHKJquvLggdQBMREUERURFBETERURExESERUREhERERUREREQERUREA8RFQ8OERUODREVDQwRFQwLERULChEVCgkRFQkRFQgHBlVA2zw/ERMRFBETERIRExESEREREhERERAREREQDxEQD1UNf3UAEvhCUoDHBfLghAP8jrYw0x8BghAsdrlzuvLggdM/+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiAHSAFUgbBPgIIIQCmHbWbqOuTDTHwGCEAph21m68uCB+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiAGBAQHXAFlsEts8f+Agd32BA+SBR/34QW8kE18DgghdFCC+8vT4Q/goUjDbPAKO0jL4QnADgEADcFnIcAHLAXMBywFwAcsAEszMyfkAyHIBywFwAcsAEsoHy//J0CDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjIcAHKAMnQECXjDX/MeHkBdshVIIIQ0XNUAFAEyx8Syz8BINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WAc8WyX9VMG1t2zwwewHi+EJwAoBABHBZyHABywFzAcsBcAHLABLMzMn5AMhyAcsBcAHLABLKB8v/ydAg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIyH8BygBQBSDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFsnQRUB6AXrIVSCCENFzVABQBMsfEss/ASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFgHPFskQI39VMG1t2zwwewHKyHEBygFQBwHKAHABygJQBSDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFlAD+gJwAcpoI26zkX+TJG6z4pczMwFwAcoA4w0hbrOcfwHKAAEgbvLQgAHMlTFwAcoA4skB+wh8AJh/AcoAyHABygBwAcoAJG6znX8BygAEIG7y0IBQBMyWNANwAcoA4iRus51/AcoABCBu8tCAUATMljQDcAHKAOJwAcoAAn8BygACyVjMAuwRFBEWERQRExEVERMREhEWERIREREVEREREBEWERAPERUPDhEWDg0RFQ0MERYMCxEVCwoRFgoJERUJCBEWCAcRFQcGERYGBREVBQQRFgQDERUDAhEWAgERFQERFts8ERQRFhEUERMRFRETERIRFBESERERExERg34BKBEQERIREA8REQ8OERAOEN9VHNs8fwPiERQRFhEUERMRFRETERIRFhESERERFRERERARFhEQDxEVDw4RFg4NERUNDBEWDAsRFQsKERYKCREVCQgRFggHERUHBhEWBgURFQUEERYEAxEVAwIRFgIBERUBERZWFds82zwkgQEBVhdZ9A1voZIwbd+piIAB/iBukjBtndD0BIEBAdcAWWwSbwLiIG7y0IBvIoEBCwERGX9xIW6VW1n0WTCYyAHPAEEz9EHigQEBERjIWQL0AIEBAc8AyRA1AhEXAgERFgEgbpUwWfRaMJRBM/QV4hESERQREhERERMREREQERIREA8REQ8OERAOEN8QzhC9EKyLA7CCEFE+8166jrkw0x8BghBRPvNeuvLggfpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgBgQEB1wBZbBLbPH/gIIIQFzK+IbrjAoIQJPpHybrjAjBwgoaMAuwRFBEWERQRExEVERMREhEWERIREREVEREREBEWERAPERUPDhEWDg0RFQ0MERYMCxEVCwoRFgoJERUJCBEWCAcRFQcGERYGBREVBQQRFgQDERUDAhEWAgERFQERFts8ERQRFhEUERMRFRETERIRFBESERERExERg4UC3iQRExEVERMREhEUERIREREVEREREBEUERAPERUPDhEUDg0RFQ0MERQMCxEVCwoRFAoJERUJCBEUCAcRFQcGERQGBREVBQQRFAQDERUDAhEUAgERFQERFIEBAREW2zwCERYCAREXAVn0DW+hkjBt3/aEAOAgbpIwbZ3Q9ASBAQHXAFlsEm8C4oEVlCFus/L0IG7y0IBvIjCBAQv4QW8kECNfA3FBM/QKb6GUAdcAMJJbbeKBQo8hbrOYASBu8tCAwP+SMXDi8vQREhEUERIRERETEREREBESERAPEREPDhEQDlUdASgREBESERAPEREPDhEQDhDfVRzbPIcBkDDTHwGCEBcyviG68uCBgQEB1wD6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIEmwSgR8L+EFvJBAjXwMixwXy9Ns8f4cD4hEUERYRFBETERURExESERYREhERERUREREQERYREA8RFQ8OERYODREVDQwRFgwLERULChEWCgkRFQkIERYIBxEVBwYRFgYFERUFBBEWBAMRFQMCERYCAREVAREWVhXbPNs8JIEBAVYXWfQNb6GSMG3fqYiKAvKCAMTt+EFvJBAjXwMRFhEXERYRFREXERURFBEXERQRExEXERMREhEXERIREREXEREREBEXERAPERcPDhEXDg0RFw0MERcMCxEXCwoRFwoJERcJCBEXCAcRFwcGERcGBREXBQQRFwQDERcDAhEXAgERF9s8AREWAfL0m4kAPBETERQRExESERMREhERERIREREQEREREA8REA9VDgH+IG6SMG2d0PQEgQEB1wBZbBJvAuIgbvLQgG8igQELAREZcHEhbpVbWfRZMJjIAc8AQTP0QeKBAQERGMhZAvQAgQEBzwDJEDUCERcCAREWASBulTBZ9FowlEEz9BXiERIRFBESERERExERERAREhEQDxERDw4REA4Q3xDOEL0QrIsAIhCbEIoQeRBoEFcQRhA1UEQDANzTHwGCECT6R8m68uCBgQEB1wCBAQHXAFlsEiaBAQEjWfQNb6GSMG3fIG6SMG2d0PQEgQEB1wBZbBJvAuKBVOUhbrPy9CBu8tCAbyIwgQEBAshZAvQAgQEBzwDJEDcSIG6VMFn0WjCUQTP0FeIEfwE4yPhDAcx/AcoAERURFBETERIREREQVeDbPMntVI4B9gERFQERFCDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFgEREgGBAQHPAAERECDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFg7IgQEBzwBQDSDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFhvMGYEBAY8B9M8AB8iBAQHPABb0ABSBAQHPABKBAQHPAAHIgQEBzwASygBYINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WE4EBAc8AA8iBAQHPABT0AFAFINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WFYEBAc8AyFAHkABoINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WFYEBAc8AyVAFzMlYzMkBzMkBzMkBzAIBIJK1AgEgk6MCASCUnAIBSJWaAgEglpgCGKp82zzbPFcQXw9sUeSXAAIjAhioO9s82zxXEF8PbFHkmQACIQKjrNaAkGukwICF3XlwRBBrhYUQQIJ/3XloRMGE3XlwRG2eCIoIiwiKCImIioiJiIkIigiJCIiIiYiIiIgIiQiIB4iIh4cIiAcqju2eK4gvh7YowOSbAJ6BAQEnAln0DW+hkjBt3yBukjBtndD0BIEBAdcAWWwSbwLiIG6SW3DgIG7y0IBvIjCBAQtYcUEz9ApvoZQB1wAwkltt4iBukjBw4CBu8tCAAgEgnZ8CGbLpds82zxXEF8PbFGDkngACKQIBIKCiAhWuRO2ebZ42TLZkwOShAShUfttUIjDbPFYUVhAugScQVHunKK0CGa1ebZ5tniuIL4e2KMDk8gIBIKSzAgEgpaoCAWamqAIXpju2ebZ4riC+Htij5KcAAicCX6YjtngiKCIqIigiJiIoIiYiJCImIiQiIiIkIiIiICIiIiAeIiAeqh22eK4gvh7Yo+SpAGSBAQEmAln0DW+hkjBt3yBukjBtndD0BIEBAdcAWWwSbwLigVTlIW6z8vQgbvLQgG8iMQIBIKuyAhmseG2ebZ4riC+HtijA5KwBEFR+21QiMNs8rQH0elADIML/8oVxAZIhqOQxXLmRf5NTILnikX+OEFypBMIAs5ZTIKkEwgCRcOLik18EcOARFREYERURFBEXERQRExEWERMREhEYERIREREXEREREBEWERAPERgPDhEXDg0RFg0MERgMCxEXCwoRFgoJERgJCBEXCAcRFgeuAvwGERgGBREXBQQRFgQDERgDAhEXAgERFgERGNs8ERdWGKiBJxCoAREWqQRWFqkEgScQqQRWFwGgVhdwERibIahWGKkEERekERfkMVcWERVWFqGBJxCoAREWqQQREhEVERIREREUEREREBETERAPERIPDhERDg0REA0QzxC+EK2vsQEy2zwgwQGSMHHeIIEBbbySMHGWgQFtAakE4rAANvgjXLySW3DgAaGCAVGAqQQggQFtvJQwgQFt3gAgEJwQixB6EGkQWBBHEDZFQAIZrF3tnm2eK4gvh7YowOT2Ahm3vZtnm2eK4gvh7Yow5LQABFYQAgEgttUCASC3zQIBWLjKAgFmucQCAW66vAKXr0g10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCI2zwRFBEVERQRExEUERMREhETERIRERESEREREBERERAPERAPVQ7bPFcQXw9sUYOS7AQTbPL8Ck6sINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiNs8ERQRFREUERMRFBETERIRExESEREREhERERAREREQDxEQD1UO2zxs82xjg5L0B9C2BAQsiWfQLb6GSMG3fIG6SMG2OFtCBAQHXAIEBAdcAgQEB1wBVIGwTbwPibpQwcFMA4C2BAQsiWfQLb6GSMG3fIG6SMG2OFtCBAQHXAIEBAdcAgQEB1wBVIGwTbwPiIG7y0IBvI1stERURFxEVERQRFhEUERMRFxETvgL8ERIRFhESERERFxERERARFhEQDxEXDw4RFg4NERcNDBEWDAsRFwsKERYKCREXCQgRFggHERcHBhEWBgURFwUEERYEAxEXAwIRFgIBERcBERbbPAIRFwIBERYBERURFxEVERQRFhEUERMRFRETERIRFBESERERExERERAREhEQv8MC9i2BAQsiWfQLb6GSMG3fIG6SMG2OFtCBAQHXAIEBAdcAgQEB1wBVIGwTbwPibpIwcOARFBEVERQRExEVERMREhEVERIREREVEREREBEVERAPERUPDhEVDg0RFQ0MERUMCxEVCwoRFQoJERUJERUIBwZVQFYV2zyBAQsuAsDBAMotgQELIln0C2+hkjBt3yBukjBtjhbQgQEB1wCBAQHXAIEBAdcAVSBsE28D4m6SMHDggQELLgJZ9AtvoZIwbd8gbpIwbY4W0IEBAdcAgQEB1wCBAQHXAFUgbBNvA+IgbvLQgG8jWwH+ERhZ9AtvoZIwbd8gbpIwbY4W0IEBAdcAgQEB1wCBAQHXAFUgbBNvA+IgbvLQgG8jMDFSwKEgwgCORQERFgGoVhWpBBEUERURFBETERQRExESERMREhERERIREREQEREREA8REA8Q7xDeEM0QvBCrEJoQiRB4EGcQVhBFEDRBMMIARuAwVxURExEUERMREhETERIRERESEREREBERERAPERAPVQ5wAEAPEREPDhEQDhDfEM4QvRCsEJsQihB5EGgQVxBGEDUQNAIBIMXJApe/kg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCI2zwRFBEVERQRExEUERMREhETERIRERESEREREBERERAPERAPVQ7bPFcQXw9sUY5MYBBNs8xwGG2zxwWchwAcsBcwHLAXABywASzMzJ+QDIcgHLAXABywASygfL/8nQINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiMgBDvhD+CgS2zzMAhe5nbPNs8VxBfD2xRjk7gIVrxbtnm2eNnq2MsDkywEi+EP4KFKQ2zwwVGGgUqBWEwHMANYC0PQEMG0BgTSOAYAQ9A9vofLghwGBNI4iAoAQ9BfIAcj0AMkBzHABygBAA1kg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxYBINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WyQIBIM7QAhmxIzbPNs8VxBfD2xRg5M8AAi4CAVjR0wIYqfbbPNs8VxBfD2xR5NIABFYUAhio+ts82zxXEF8PbFHk1AACIgIBINbdAgEg19sCAWLY2gIXpS22ebZ4riC+Htij5NkAAiYAD6V92omhpAADAhmz/bbPNs8VxBfD2xRg5NwAAiACASDe4wIBWN/hAhiq29s82zxXEF8PbFHk4AACJQIYqT7bPNs8VxBfD2xR5OIAAisCGbKsts82zxXEF8PbFGDk+AOE7UTQ1AH4Y9IAAY6i2zxXFRETERQRExESERMREhERERIREREQEREREA8REA9VDuD4KNcLCoMJuvLgids8CNFVBts85ejqAfb6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIAYEBAdcA+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiAHUAdCBAQHXAPpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgB1IEBAdcA1DDQgQEB1wDmAdr0BIEBAdcAgQEB1wDUMNCBAQHXANIA+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiAGBAQHXANQw0IEBAdcA9AT6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIAYEBAdcA1DDQ5wBw+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiAGBAQHXADAREhEVERIREhEUERIREhETERIBxvpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgB+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiAH6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIAdQB0OkAdPpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgBgQEB1wCBAQHXANQw0IEBAdcA1DAQWBBXEFYB7G1tggCEn1NUu/L0U5dwK/hCUyJ/IfgjUxGNCGAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAASCCcnDgFR9XFPtVhVWGStWF1PJVhJWElYWViBWEVYeViVWI1YUVhwRFBEiERQRExEaERMREhEhERLrAvwREREgEREREBEfERAPESUPDhEoDg0RGQ0MESQMCxEYCwoRFQoJERwJCBEbCAcRHgcGEScGBREXBQQRIwQDESkDAhEmAgERFgERHds8VxBfD2xRDhEWDgYRFQYNERQNDBETDAsREgsNERANEF8Q3hBNHBCLEHoQeRgQNxBWQwT27AL+ERgmgQEBI1n0DW+hkjBt3yBukjBtndD0BIEBAdcAWWwSbwLiIG7jACBu8tCAbyKBAQtQA39xIW6VW1n0WTCYyAHPAEEz9EHigQEBAshZAvQAgQEBzwDJEDcSIG6VMFn0WjCUQTP0FeIEVhRWFFYUVhRWFFYUVhRWFFYUVhRWFPXtAvxWFFYUVhRWFFYUVhRWFFYUVhRWFBEUESkRFBETESgRExESEScREhERESYREREQESUREA8RJA8OESMODREiDQwRIQwLESALChEfCgkRHgkIER0IBxEcBwYRGwYFERoFBBEZBAMRGAMCERcCAREWAREV2zxXEF8PbFERFREWERXu7wBEgvDvME++qxP+a+Fg14X87KpWIMhG561pfikVv+BhL6nLZwFMERQRFREUERMRFBETERIRExESEREREhERERAREREQDxEQD1UOERfwAv4mgQEBI1n0DW+hkjBt3yBukjBtndD0BIEBAdcAWWwSbwLiIG7jACBu8tCAbyKBAQtQA39xIW6VW1n0WTCYyAHPAEEz9EHigQEBAshZAvQAgQEBzwDJEDcSIG6VMFn0WjCUQTP0FeIEVhRWFFYUVhRWFFYUVhRWFFYUVhRWFFYU9fEC+FYUVhRWFFYUVhRWFFYUVhRWFBEUESkRFBETESgRExESEScREhERESYREREQESUREA8RJA8OESMODREiDQwRIQwLESALChEfCgkRHgkIER0IBxEcBwYRGwYFERoFBBEZBAMRGAMCERcCAREWAREV2zxXEF8PbFERFREWERXy8wBEgvBSSCHGtsmhfr4mmWPgPRnkM2kNmJUHOq1DzMa1dOLxoQFIERQRFREUERMRFBETERIRExESEREREhERERAREREQDxEQD1UO9AHOJoEBASNZ9A1voZIwbd8gbpIwbZ3Q9ASBAQHXAFlsEm8C4iBu4wAgbvLQgG8igQELUAN/cSFulVtZ9FkwmMgBzwBBM/RB4oEBAQLIWQL0AIEBAc8AyRA3EiBulTBZ9FowlEEz9BXiBPUC/DBtgQELIn9xIW6VW1n0WTCYyAHPAEEz9EHiERQRFxEUERMRFhETERIRFRESERERFxERERARFhEQDxEVDw4RFw4NERYNDBEVDAsRFwsKERYKCREVCQgRFwgHERYHBhEVBgURFwUEERYEAxEVAwIRFwIBERYBERXbPAERFgFvAvb3AESC8INdbciLcIvGRtbbgshT70GC+rvUqN5ZwhPytas659m+AOCBAQEhIG6SMG2OEiBu8tCAbyLIWQL0AIEBAc8AyeIQJlYZASBulTBZ9FowlEEz9BXiERQRFxEUERMRFhETERIRFRESERERFBERERARExEQDxESDw4REQ4NERANEM8QvhCtEJwQixB6EGkQWAcQNkUEAARWE5jIvi0=');
    let builder = beginCell();
    builder.storeRef(__system);
    builder.storeUint(0, 1);
    initJettonLP_init_args({ $$type: 'JettonLP_init_args', admin, cfo, bridge, stake_token, decimals, protocolFee, tokenFee, content })(builder);
    const __data = builder.endCell();
    return { code: __code, data: __data };
}

const JettonLP_errors: { [key: number]: { message: string } } = {
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
    2927: { message: `AccessControl: Role ID doesn't exist` },
    4429: { message: `Invalid sender` },
    5524: { message: `AccessControl: Role ADMIN is undefined` },
    6187: { message: `AccessControl: Doesn't have the CFO role` },
    7947: { message: `AccessControl: BadConfirmation` },
    10852: { message: `Boost: no deposit to convert to rewards` },
    10858: { message: `AccessControl: Doesn't have the BRIDGE role` },
    11399: { message: `Insufficient LP balance to withdraw rewards` },
    12450: { message: `AccessControl: Role BRIDGE is undefined` },
    14981: { message: `LPWallet: Invalid sender` },
    15100: { message: `TokenBurn: Invalid balance` },
    17039: { message: `AccessControl: Doesn't have the ADMIN role` },
    17389: { message: `Deposit amount must be greater than zero.` },
    18429: { message: `LPWallet: Insufficient gas` },
    21733: { message: `AccessControl: Role doesn't exist` },
    24034: { message: `LPWallet: Can't Mint Anymore` },
    26241: { message: `TokenNotification: Unauthorised call` },
    26704: { message: `ReleaseTokens: Unauthorized release tokens call.` },
    29285: { message: `The caller has no staking position to withdraw` },
    29451: { message: `Protocol fee cannot exceed token fee.` },
    33665: { message: `Gas cost must be positive.` },
    33951: { message: `Protocol fee cannot exceed the token fee.` },
    34727: { message: `TokenBurnNotification: Missing staker position` },
    36999: { message: `Insufficient staker's balance to withdraw the amount.` },
    38716: { message: `WithdrawProtocolFee: No protocol fee to withdraw` },
    40436: { message: `WithdrawGas: Insufficient TON balance` },
    41817: { message: `UpdateDeposit must originate from the LP wallet.` },
    42708: { message: `Invalid sender!` },
    50413: { message: `AccessControl: Doesnt have the role` },
    51942: { message: `Withdraw amount must be greater than zero.` },
    53581: { message: `AccessControl: Role CFO is undefined` },
    59055: { message: `TokenTransfer: Insufficient TON value` },
    60960: { message: `TokenTransferInternal: Invalid balance` },
    61410: { message: `TokenTransfer: Invalid balance` },
}

const JettonLP_types: ABIType[] = [
    {"name":"StateInit","header":null,"fields":[{"name":"code","type":{"kind":"simple","type":"cell","optional":false}},{"name":"data","type":{"kind":"simple","type":"cell","optional":false}}]},
    {"name":"StdAddress","header":null,"fields":[{"name":"workchain","type":{"kind":"simple","type":"int","optional":false,"format":8}},{"name":"address","type":{"kind":"simple","type":"uint","optional":false,"format":256}}]},
    {"name":"VarAddress","header":null,"fields":[{"name":"workchain","type":{"kind":"simple","type":"int","optional":false,"format":32}},{"name":"address","type":{"kind":"simple","type":"slice","optional":false}}]},
    {"name":"Context","header":null,"fields":[{"name":"bounced","type":{"kind":"simple","type":"bool","optional":false}},{"name":"sender","type":{"kind":"simple","type":"address","optional":false}},{"name":"value","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"raw","type":{"kind":"simple","type":"slice","optional":false}}]},
    {"name":"SendParameters","header":null,"fields":[{"name":"bounce","type":{"kind":"simple","type":"bool","optional":false}},{"name":"to","type":{"kind":"simple","type":"address","optional":false}},{"name":"value","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"mode","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"body","type":{"kind":"simple","type":"cell","optional":true}},{"name":"code","type":{"kind":"simple","type":"cell","optional":true}},{"name":"data","type":{"kind":"simple","type":"cell","optional":true}}]},
    {"name":"JettonData","header":null,"fields":[{"name":"total_supply","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"mintable","type":{"kind":"simple","type":"bool","optional":false}},{"name":"admin","type":{"kind":"simple","type":"address","optional":false}},{"name":"content","type":{"kind":"simple","type":"cell","optional":false}},{"name":"wallet_code","type":{"kind":"simple","type":"cell","optional":false}}]},
    {"name":"JettonWalletData","header":null,"fields":[{"name":"balance","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"owner","type":{"kind":"simple","type":"address","optional":false}},{"name":"master","type":{"kind":"simple","type":"address","optional":false}},{"name":"code","type":{"kind":"simple","type":"cell","optional":false}}]},
    {"name":"TokenTransfer","header":260734629,"fields":[{"name":"query_id","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"sender","type":{"kind":"simple","type":"address","optional":false}},{"name":"response_destination","type":{"kind":"simple","type":"address","optional":true}},{"name":"custom_payload","type":{"kind":"simple","type":"cell","optional":true}},{"name":"forward_ton_amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"forward_payload","type":{"kind":"simple","type":"slice","optional":false,"format":"remainder"}}]},
    {"name":"TokenTransferInternal","header":395134233,"fields":[{"name":"query_id","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"from","type":{"kind":"simple","type":"address","optional":false}},{"name":"response_destination","type":{"kind":"simple","type":"address","optional":true}},{"name":"forward_ton_amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"forward_payload","type":{"kind":"simple","type":"slice","optional":false,"format":"remainder"}}]},
    {"name":"TokenNotification","header":1935855772,"fields":[{"name":"query_id","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"from","type":{"kind":"simple","type":"address","optional":false}},{"name":"forward_payload","type":{"kind":"simple","type":"slice","optional":false,"format":"remainder"}}]},
    {"name":"TokenBurn","header":1499400124,"fields":[{"name":"query_id","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"response_destination","type":{"kind":"simple","type":"address","optional":true}},{"name":"custom_payload","type":{"kind":"simple","type":"cell","optional":true}}]},
    {"name":"TokenBurnNotification","header":2078119902,"fields":[{"name":"query_id","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"sender","type":{"kind":"simple","type":"address","optional":false}},{"name":"response_destination","type":{"kind":"simple","type":"address","optional":true}}]},
    {"name":"TokenExcesses","header":3576854235,"fields":[{"name":"query_id","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"TokenUpdateContent","header":2937889386,"fields":[{"name":"content","type":{"kind":"simple","type":"cell","optional":false}}]},
    {"name":"ProvideWalletAddress","header":745978227,"fields":[{"name":"query_id","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"owner_address","type":{"kind":"simple","type":"address","optional":false}},{"name":"include_address","type":{"kind":"simple","type":"bool","optional":false}}]},
    {"name":"TakeWalletAddress","header":3513996288,"fields":[{"name":"query_id","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"wallet_address","type":{"kind":"simple","type":"address","optional":false}},{"name":"owner_address","type":{"kind":"simple","type":"slice","optional":false,"format":"remainder"}}]},
    {"name":"JettonMint","header":2310479113,"fields":[{"name":"origin","type":{"kind":"simple","type":"address","optional":false}},{"name":"receiver","type":{"kind":"simple","type":"address","optional":false}},{"name":"amount","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"custom_payload","type":{"kind":"simple","type":"cell","optional":true}},{"name":"forward_ton_amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"forward_payload","type":{"kind":"simple","type":"slice","optional":false,"format":"remainder"}}]},
    {"name":"UpdateDeposits","header":3121058093,"fields":[{"name":"amount","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"sender","type":{"kind":"simple","type":"address","optional":false}},{"name":"receiver","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"BridgeBoilerplate","header":null,"fields":[{"name":"amount","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"payload","type":{"kind":"simple","type":"cell","optional":false}}]},
    {"name":"Boost","header":3863699873,"fields":[{"name":"amount","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"InternalWithdrawDeposit","header":432565636,"fields":[{"name":"amount","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"global_fee_growth","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"total_supply","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"InternalWithdrawFee","header":2441921564,"fields":[{"name":"lastFeeGrowth","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"owner","type":{"kind":"simple","type":"address","optional":false}},{"name":"balance","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"LPData","header":null,"fields":[{"name":"apy","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"available_underlying","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"decimals","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"fee_growth_global","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"fee_decimals","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"protocol_fee","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"protocol_fee_amount","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"token_fee","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"total_supply","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"ReleaseTokens","header":169475742,"fields":[{"name":"to","type":{"kind":"simple","type":"address","optional":false}},{"name":"amount","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"body","type":{"kind":"simple","type":"cell","optional":true}}]},
    {"name":"PoolPayload","header":null,"fields":[{"name":"mode","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"Position","header":null,"fields":[{"name":"balance","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"last_fee_growth","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"rewards","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"CollectWithdrawData","header":3710151747,"fields":[{"name":"amount","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"wallet","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"RewardSplit","header":null,"fields":[{"name":"protocolFeeShare","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"lpProvidersShare","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"SetAdmin","header":2713466466,"fields":[{"name":"newAdmin","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"SetBridge","header":4210575997,"fields":[{"name":"newBridge","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"SetCFO","header":3542740611,"fields":[{"name":"newCFO","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"SetWalletAddress","header":907419751,"fields":[{"name":"token_wallet","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"UpdateFees","header":139646236,"fields":[{"name":"protocol_fee","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"token_fee","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"UpdateGasCost","header":463012999,"fields":[{"name":"newGasCost","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"Withdraw","header":1616450832,"fields":[{"name":"amount","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"WithdrawGas","header":602125092,"fields":[{"name":"amount","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"WithdrawRewards","header":852627366,"fields":[]},
    {"name":"WithdrawCallback","header":167527793,"fields":[{"name":"feeGrowthGlobal","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"rewards","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"WithdrawProtocolFee","header":3742263588,"fields":[]},
    {"name":"WithdrawStake","header":1184505655,"fields":[{"name":"amount","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"Staked","header":923309543,"fields":[{"name":"amount","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"staker","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"LPTransfer","header":4122418836,"fields":[{"name":"amount","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"to","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"RewardsPaid","header":3897230482,"fields":[{"name":"user","type":{"kind":"simple","type":"address","optional":false}},{"name":"amount","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"Withdrawn","header":4071912493,"fields":[{"name":"stake","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"rewards","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"user","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"Deploy","header":2490013878,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"DeployOk","header":2952335191,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"FactoryDeploy","header":1829761339,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"cashback","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"LPWallet$Data","header":null,"fields":[{"name":"balance","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"owner","type":{"kind":"simple","type":"address","optional":false}},{"name":"master","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"ChangeOwner","header":2174598809,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"newOwner","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"ChangeOwnerOk","header":846932810,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"newOwner","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"GrantRole","header":174185305,"fields":[{"name":"to","type":{"kind":"simple","type":"address","optional":false}},{"name":"role_id","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"RenounceRole","header":389201441,"fields":[{"name":"role_id","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"address","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"RevokeRole","header":1363080030,"fields":[{"name":"to","type":{"kind":"simple","type":"address","optional":false}},{"name":"role_id","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"RoleData","header":null,"fields":[{"name":"roles","type":{"kind":"dict","key":"address","value":"bool"}},{"name":"admin_role","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"UpdateRoleAdmin","header":620382153,"fields":[{"name":"role_id","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"role_admin","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"JettonLP$Data","header":null,"fields":[{"name":"admin","type":{"kind":"simple","type":"address","optional":false}},{"name":"available_underlying","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"bridge","type":{"kind":"simple","type":"address","optional":false}},{"name":"boost_query_id","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"cfo","type":{"kind":"simple","type":"address","optional":false}},{"name":"content","type":{"kind":"simple","type":"cell","optional":false}},{"name":"decimals","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"deployed","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"deposits","type":{"kind":"dict","key":"address","value":"Position","valueFormat":"ref"}},{"name":"fee_growth_global","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"gas_cost","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"query_id","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"mintable","type":{"kind":"simple","type":"bool","optional":false}},{"name":"owner","type":{"kind":"simple","type":"address","optional":false}},{"name":"protocolFee","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"protocol_fee_amount","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"roles","type":{"kind":"dict","key":"int","value":"RoleData","valueFormat":"ref"}},{"name":"stake_token","type":{"kind":"simple","type":"address","optional":false}},{"name":"tokenFee","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"token_wallet","type":{"kind":"simple","type":"address","optional":false}},{"name":"total_supply","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
]

const JettonLP_getters: ABIGetter[] = [
    {"name":"underlying","arguments":[],"returnType":{"kind":"simple","type":"address","optional":false}},
    {"name":"currentAPY","arguments":[],"returnType":{"kind":"simple","type":"int","optional":false,"format":257}},
    {"name":"decimals","arguments":[],"returnType":{"kind":"simple","type":"int","optional":false,"format":257}},
    {"name":"feeGrowthGlobal","arguments":[],"returnType":{"kind":"simple","type":"int","optional":false,"format":257}},
    {"name":"get_admin","arguments":[],"returnType":{"kind":"simple","type":"address","optional":false}},
    {"name":"get_available_underlying","arguments":[],"returnType":{"kind":"simple","type":"int","optional":false,"format":257}},
    {"name":"get_cfo","arguments":[],"returnType":{"kind":"simple","type":"address","optional":false}},
    {"name":"get_data","arguments":[],"returnType":{"kind":"simple","type":"LPData","optional":false}},
    {"name":"get_query_id","arguments":[],"returnType":{"kind":"simple","type":"int","optional":false,"format":257}},
    {"name":"get_position","arguments":[{"name":"staker","type":{"kind":"simple","type":"address","optional":false}}],"returnType":{"kind":"simple","type":"Position","optional":false}},
    {"name":"get_total_supply","arguments":[],"returnType":{"kind":"simple","type":"int","optional":false,"format":257}},
    {"name":"get_underlying_wallet","arguments":[],"returnType":{"kind":"simple","type":"address","optional":false}},
    {"name":"protocolFee","arguments":[],"returnType":{"kind":"simple","type":"int","optional":false,"format":257}},
    {"name":"protocolFeeAmount","arguments":[],"returnType":{"kind":"simple","type":"int","optional":false,"format":257}},
    {"name":"rewards","arguments":[{"name":"staker","type":{"kind":"simple","type":"address","optional":false}}],"returnType":{"kind":"simple","type":"int","optional":false,"format":257}},
    {"name":"tokenFee","arguments":[],"returnType":{"kind":"simple","type":"int","optional":false,"format":257}},
    {"name":"get_jetton_data","arguments":[],"returnType":{"kind":"simple","type":"JettonData","optional":false}},
    {"name":"get_wallet_address","arguments":[{"name":"owner","type":{"kind":"simple","type":"address","optional":false}}],"returnType":{"kind":"simple","type":"address","optional":false}},
    {"name":"owner","arguments":[],"returnType":{"kind":"simple","type":"address","optional":false}},
    {"name":"admin_role_id","arguments":[],"returnType":{"kind":"simple","type":"int","optional":false,"format":257}},
    {"name":"bridge_role_id","arguments":[],"returnType":{"kind":"simple","type":"int","optional":false,"format":257}},
    {"name":"cfo_role_id","arguments":[],"returnType":{"kind":"simple","type":"int","optional":false,"format":257}},
    {"name":"has_role","arguments":[{"name":"address","type":{"kind":"simple","type":"address","optional":false}},{"name":"role_id","type":{"kind":"simple","type":"int","optional":false,"format":257}}],"returnType":{"kind":"simple","type":"bool","optional":false}},
    {"name":"role_admin","arguments":[{"name":"role_id","type":{"kind":"simple","type":"int","optional":false,"format":257}}],"returnType":{"kind":"simple","type":"int","optional":false,"format":257}},
]

export const JettonLP_getterMapping: { [key: string]: string } = {
    'underlying': 'getUnderlying',
    'currentAPY': 'getCurrentApy',
    'decimals': 'getDecimals',
    'feeGrowthGlobal': 'getFeeGrowthGlobal',
    'get_admin': 'getGetAdmin',
    'get_available_underlying': 'getGetAvailableUnderlying',
    'get_cfo': 'getGetCfo',
    'get_data': 'getGetData',
    'get_query_id': 'getGetQueryId',
    'get_position': 'getGetPosition',
    'get_total_supply': 'getGetTotalSupply',
    'get_underlying_wallet': 'getGetUnderlyingWallet',
    'protocolFee': 'getProtocolFee',
    'protocolFeeAmount': 'getProtocolFeeAmount',
    'rewards': 'getRewards',
    'tokenFee': 'getTokenFee',
    'get_jetton_data': 'getGetJettonData',
    'get_wallet_address': 'getGetWalletAddress',
    'owner': 'getOwner',
    'admin_role_id': 'getAdminRoleId',
    'bridge_role_id': 'getBridgeRoleId',
    'cfo_role_id': 'getCfoRoleId',
    'has_role': 'getHasRole',
    'role_admin': 'getRoleAdmin',
}

const JettonLP_receivers: ABIReceiver[] = [
    {"receiver":"internal","message":{"kind":"empty"}},
    {"receiver":"internal","message":{"kind":"typed","type":"Boost"}},
    {"receiver":"internal","message":{"kind":"typed","type":"WithdrawGas"}},
    {"receiver":"internal","message":{"kind":"typed","type":"WithdrawProtocolFee"}},
    {"receiver":"internal","message":{"kind":"typed","type":"TokenNotification"}},
    {"receiver":"internal","message":{"kind":"typed","type":"ReleaseTokens"}},
    {"receiver":"internal","message":{"kind":"typed","type":"TokenBurnNotification"}},
    {"receiver":"internal","message":{"kind":"typed","type":"WithdrawRewards"}},
    {"receiver":"internal","message":{"kind":"typed","type":"TokenExcesses"}},
    {"receiver":"internal","message":{"kind":"typed","type":"UpdateDeposits"}},
    {"receiver":"internal","message":{"kind":"typed","type":"Withdraw"}},
    {"receiver":"internal","message":{"kind":"typed","type":"SetAdmin"}},
    {"receiver":"internal","message":{"kind":"typed","type":"SetCFO"}},
    {"receiver":"internal","message":{"kind":"typed","type":"SetBridge"}},
    {"receiver":"internal","message":{"kind":"typed","type":"SetWalletAddress"}},
    {"receiver":"internal","message":{"kind":"typed","type":"UpdateFees"}},
    {"receiver":"internal","message":{"kind":"typed","type":"UpdateGasCost"}},
    {"receiver":"internal","message":{"kind":"typed","type":"Deploy"}},
    {"receiver":"internal","message":{"kind":"typed","type":"TokenUpdateContent"}},
    {"receiver":"internal","message":{"kind":"typed","type":"ProvideWalletAddress"}},
    {"receiver":"internal","message":{"kind":"typed","type":"GrantRole"}},
    {"receiver":"internal","message":{"kind":"typed","type":"RevokeRole"}},
    {"receiver":"internal","message":{"kind":"typed","type":"RenounceRole"}},
    {"receiver":"internal","message":{"kind":"typed","type":"UpdateRoleAdmin"}},
]

export class JettonLP implements Contract {
    
    static async init(admin: Address, cfo: Address, bridge: Address, stake_token: Address, decimals: bigint, protocolFee: bigint, tokenFee: bigint, content: Cell) {
        return await JettonLP_init(admin, cfo, bridge, stake_token, decimals, protocolFee, tokenFee, content);
    }
    
    static async fromInit(admin: Address, cfo: Address, bridge: Address, stake_token: Address, decimals: bigint, protocolFee: bigint, tokenFee: bigint, content: Cell) {
        const init = await JettonLP_init(admin, cfo, bridge, stake_token, decimals, protocolFee, tokenFee, content);
        const address = contractAddress(0, init);
        return new JettonLP(address, init);
    }
    
    static fromAddress(address: Address) {
        return new JettonLP(address);
    }
    
    readonly address: Address; 
    readonly init?: { code: Cell, data: Cell };
    readonly abi: ContractABI = {
        types:  JettonLP_types,
        getters: JettonLP_getters,
        receivers: JettonLP_receivers,
        errors: JettonLP_errors,
    };
    
    private constructor(address: Address, init?: { code: Cell, data: Cell }) {
        this.address = address;
        this.init = init;
    }
    
    async send(provider: ContractProvider, via: Sender, args: { value: bigint, bounce?: boolean| null | undefined }, message: null | Boost | WithdrawGas | WithdrawProtocolFee | TokenNotification | ReleaseTokens | TokenBurnNotification | WithdrawRewards | TokenExcesses | UpdateDeposits | Withdraw | SetAdmin | SetCFO | SetBridge | SetWalletAddress | UpdateFees | UpdateGasCost | Deploy | TokenUpdateContent | ProvideWalletAddress | GrantRole | RevokeRole | RenounceRole | UpdateRoleAdmin) {
        
        let body: Cell | null = null;
        if (message === null) {
            body = new Cell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'Boost') {
            body = beginCell().store(storeBoost(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'WithdrawGas') {
            body = beginCell().store(storeWithdrawGas(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'WithdrawProtocolFee') {
            body = beginCell().store(storeWithdrawProtocolFee()).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'TokenNotification') {
            body = beginCell().store(storeTokenNotification(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'ReleaseTokens') {
            body = beginCell().store(storeReleaseTokens(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'TokenBurnNotification') {
            body = beginCell().store(storeTokenBurnNotification(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'WithdrawRewards') {
            body = beginCell().store(storeWithdrawRewards()).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'TokenExcesses') {
            body = beginCell().store(storeTokenExcesses(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'UpdateDeposits') {
            body = beginCell().store(storeUpdateDeposits(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'Withdraw') {
            body = beginCell().store(storeWithdraw(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'SetAdmin') {
            body = beginCell().store(storeSetAdmin(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'SetCFO') {
            body = beginCell().store(storeSetCFO(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'SetBridge') {
            body = beginCell().store(storeSetBridge(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'SetWalletAddress') {
            body = beginCell().store(storeSetWalletAddress(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'UpdateFees') {
            body = beginCell().store(storeUpdateFees(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'UpdateGasCost') {
            body = beginCell().store(storeUpdateGasCost(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'Deploy') {
            body = beginCell().store(storeDeploy(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'TokenUpdateContent') {
            body = beginCell().store(storeTokenUpdateContent(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'ProvideWalletAddress') {
            body = beginCell().store(storeProvideWalletAddress(message)).endCell();
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
    
    async getUnderlying(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('underlying', builder.build())).stack;
        let result = source.readAddress();
        return result;
    }
    
    async getCurrentApy(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('currentAPY', builder.build())).stack;
        let result = source.readBigNumber();
        return result;
    }
    
    async getDecimals(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('decimals', builder.build())).stack;
        let result = source.readBigNumber();
        return result;
    }
    
    async getFeeGrowthGlobal(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('feeGrowthGlobal', builder.build())).stack;
        let result = source.readBigNumber();
        return result;
    }
    
    async getGetAdmin(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('get_admin', builder.build())).stack;
        let result = source.readAddress();
        return result;
    }
    
    async getGetAvailableUnderlying(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('get_available_underlying', builder.build())).stack;
        let result = source.readBigNumber();
        return result;
    }
    
    async getGetCfo(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('get_cfo', builder.build())).stack;
        let result = source.readAddress();
        return result;
    }
    
    async getGetData(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('get_data', builder.build())).stack;
        const result = loadGetterTupleLPData(source);
        return result;
    }
    
    async getGetQueryId(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('get_query_id', builder.build())).stack;
        let result = source.readBigNumber();
        return result;
    }
    
    async getGetPosition(provider: ContractProvider, staker: Address) {
        let builder = new TupleBuilder();
        builder.writeAddress(staker);
        let source = (await provider.get('get_position', builder.build())).stack;
        const result = loadGetterTuplePosition(source);
        return result;
    }
    
    async getGetTotalSupply(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('get_total_supply', builder.build())).stack;
        let result = source.readBigNumber();
        return result;
    }
    
    async getGetUnderlyingWallet(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('get_underlying_wallet', builder.build())).stack;
        let result = source.readAddress();
        return result;
    }
    
    async getProtocolFee(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('protocolFee', builder.build())).stack;
        let result = source.readBigNumber();
        return result;
    }
    
    async getProtocolFeeAmount(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('protocolFeeAmount', builder.build())).stack;
        let result = source.readBigNumber();
        return result;
    }
    
    async getRewards(provider: ContractProvider, staker: Address) {
        let builder = new TupleBuilder();
        builder.writeAddress(staker);
        let source = (await provider.get('rewards', builder.build())).stack;
        let result = source.readBigNumber();
        return result;
    }
    
    async getTokenFee(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('tokenFee', builder.build())).stack;
        let result = source.readBigNumber();
        return result;
    }
    
    async getGetJettonData(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('get_jetton_data', builder.build())).stack;
        const result = loadGetterTupleJettonData(source);
        return result;
    }
    
    async getGetWalletAddress(provider: ContractProvider, owner: Address) {
        let builder = new TupleBuilder();
        builder.writeAddress(owner);
        let source = (await provider.get('get_wallet_address', builder.build())).stack;
        let result = source.readAddress();
        return result;
    }
    
    async getOwner(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('owner', builder.build())).stack;
        let result = source.readAddress();
        return result;
    }
    
    async getAdminRoleId(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('admin_role_id', builder.build())).stack;
        let result = source.readBigNumber();
        return result;
    }
    
    async getBridgeRoleId(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('bridge_role_id', builder.build())).stack;
        let result = source.readBigNumber();
        return result;
    }
    
    async getCfoRoleId(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('cfo_role_id', builder.build())).stack;
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
    
}