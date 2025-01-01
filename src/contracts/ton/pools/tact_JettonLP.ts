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
        b_1.storeAddress(src.cfo);
        b_1.storeRef(src.content);
        b_1.storeInt(src.decimals, 257);
        b_1.storeInt(src.deployed, 257);
        b_1.storeDict(src.deposits, Dictionary.Keys.Address(), dictValueParserPosition());
        let b_2 = new Builder();
        b_2.storeInt(src.fee_growth_global, 257);
        b_2.storeInt(src.gas_cost, 257);
        b_2.storeInt(src.query_id, 257);
        b_2.storeBit(src.mintable);
        let b_3 = new Builder();
        b_3.storeAddress(src.owner);
        b_3.storeInt(src.protocolFee, 257);
        b_3.storeInt(src.protocol_fee_amount, 257);
        b_3.storeDict(src.roles, Dictionary.Keys.BigInt(257), dictValueParserRoleData());
        let b_4 = new Builder();
        b_4.storeAddress(src.stake_token);
        b_4.storeInt(src.tokenFee, 257);
        b_4.storeAddress(src.token_wallet);
        let b_5 = new Builder();
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
    let _cfo = sc_1.loadAddress();
    let _content = sc_1.loadRef();
    let _decimals = sc_1.loadIntBig(257);
    let _deployed = sc_1.loadIntBig(257);
    let _deposits = Dictionary.load(Dictionary.Keys.Address(), dictValueParserPosition(), sc_1);
    let sc_2 = sc_1.loadRef().beginParse();
    let _fee_growth_global = sc_2.loadIntBig(257);
    let _gas_cost = sc_2.loadIntBig(257);
    let _query_id = sc_2.loadIntBig(257);
    let _mintable = sc_2.loadBit();
    let sc_3 = sc_2.loadRef().beginParse();
    let _owner = sc_3.loadAddress();
    let _protocolFee = sc_3.loadIntBig(257);
    let _protocol_fee_amount = sc_3.loadIntBig(257);
    let _roles = Dictionary.load(Dictionary.Keys.BigInt(257), dictValueParserRoleData(), sc_3);
    let sc_4 = sc_3.loadRef().beginParse();
    let _stake_token = sc_4.loadAddress();
    let _tokenFee = sc_4.loadIntBig(257);
    let _token_wallet = sc_4.loadAddress();
    let sc_5 = sc_4.loadRef().beginParse();
    let _total_supply = sc_5.loadIntBig(257);
    return { $$type: 'JettonLP$Data' as const, admin: _admin, available_underlying: _available_underlying, bridge: _bridge, cfo: _cfo, content: _content, decimals: _decimals, deployed: _deployed, deposits: _deposits, fee_growth_global: _fee_growth_global, gas_cost: _gas_cost, query_id: _query_id, mintable: _mintable, owner: _owner, protocolFee: _protocolFee, protocol_fee_amount: _protocol_fee_amount, roles: _roles, stake_token: _stake_token, tokenFee: _tokenFee, token_wallet: _token_wallet, total_supply: _total_supply };
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
    const __code = Cell.fromBase64('te6ccgECzQEANlgAART/APSkE/S88sgLAQIBYgIDA+7QAdDTAwFxsKMB+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiFRQUwNvBPhhAvhi2zwRExEVERMREhEUERIRERETEREREBESERAPEREPDhEQDlUd2zzy4ILI+EMBzH8BygARFBETERIREREQVeDbPMntVLkEBQIBIAgJBJwBkjB/4HAh10nCH5UwINcLH94gghAj47Mkuo6VMNMfAYIQI+OzJLry4IGBAQHXAAEx4CCCEHNi0Jy64wIgghAKGf6euuMCIIIQe92X3roKCwwNAfQBERQBERMg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxYBEREBgQEBzwBQDyDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFshQDiDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFhzMGoEBAc8AGIEBAQYB5M8AFvQABMiBAQHPABOBAQHPAIEBAc8AygDIUAMg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxYTgQEBzwATgQEBzwAT9ADIUAUg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxYVgQEBzwBQBgcAaiDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFgTIgQEBzwDJUATMyQHMyQHMyVjMyQHMAgEgbm8CASCLjALkERMRFBETERIRFBESERERFBERERARFBEQDxEUDw4RFA4NERQNDBEUDAsRFAsKERQKCREUCREUCAcGVUDbPIIAnfT4J28QVha+8vRWEAERFXFwVSBtbW3bPDAREhETERIRERESEREREBERERAPERAPVQ5/VF4CqjDTHwGCEHNi0Jy68uCB0z/6APpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IhUEwMQI2wUMyLXScIHlgLTBzDAAZIycOKOgzHbPI6DAds84n8ODwGGMNMfAYIQChn+nrry4IH6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIAYEBAdcA0gABkdSSbQHiVSBsE9s8fxcE/o7nMNMfAYIQe92X3rry4IHTP/oA+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiAEg1wsBwwCOH/pAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IiUctchbeIUQzBsFNs8f+AgghAy0g+muuMCIIIQugeRLbrjAiAdHh8gABZRzKABERMBDKAREgLEgUPtIsIA8vQRFCGg+CgRFBEWERQBERMBERIRFhESARERAREQERYREB8OERYOHQwRFgwbChEWChkIERYIFwYRFgYVBBEWBBMCERYCVhUBVhcB2zwsgQELVhZZ9AtvoZIwbd8QEQKygUjsLPL0UTGgDKQRFBEWERQRExEVERMREhEWERIREREVEREREBEWERAPERUPDhEWDg0RFQ0MERYMCxEVCwoJERUJCAcRFQcGBREVBQQDERUDAgERFgHbPFyqEgKSIG6SMG2OFtCBAQHXAIEBAdcAgQEB1wBVIGwTbwPibo6mERMRFRETERIRFBESERERExERERAREhEQDxERDw4REA4Q31Uc2zzjDjEVA/5wWchwAcsBcwHLAXABywASzMzJ+QDIcgHLAXABywASygfL/8nQINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiHB/gED4KCPIydBWEgUEER8EER5ZyFVQ2zzJRlAEERkEAxEaAwIBERkBERoQRhBF2zwwERERExERERAREhEQE14UAMCCEBeNRRlQB8sfFcs/UAP6AgEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxYBIG6VMHABywGOHiDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFuIB+gIBzxYAFA8REQ8OERAOVR0B+CyBAQtWFln0C2+hkjBt3yBukjBtjhbQgQEB1wCBAQHXAIEBAdcAVSBsE28D4iBu8tCAbyMRGBKgERMRFRETERIRFBESERERFRERERARFBEQDxEVDw4RFA4NERUNDBEUDAsRFQsKERQKCREVCQgRFAgHERUHBhEUBgURFQUWArIEERQEAxEVAwIRFAIBERUBERRWFts8AREYAaACERQCAREVAW8DERERFRERERARFBEQDxETDw4REg4NERENDBEQDBC/EK4QnRCMEHsQahBZEEgQN0ZQQUDbPKEzAvQiWQARFhEXERYRFREXERURFBEXERQRExEXERMREhEXERIREREXEREREBEXERAPERcPDhEXDg0RFw0MERcMCxEXCwoRFwoJERcJCBEXCAcRFwcGERcGBREXBQQRFwQDERcD2zwLpG1wDdAjA1YZA1YaUCMBERABVhBVUBgZAfIyVhVWFVYVVhVWFVYVVhVWFVYVVhVWFVYVVhVWFVYVVhVWFVYVVhVWFfhBbyQQI18DERMRKhETERIRKRESERERKBERERARJxEQDxEmDw4RJQ4NESQNDBEjDAsRIgsKESEKCREgCQgRHwgHER4HBhEdBgURHAUEERsEGgLuyFVg2zzJUjBwgEB/BANtbds8MAERFchZghD1tx6UUAPLH4EBAc8AASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFsnIgljAAAAAAAAAAAAAAAABActnzMlw+wAREhETERIRERESEREREBERERAPERAPVQ4rXgT6AxEaAwIRGQIBERgBERfbPFcQXw9sQQERFQERFBEXERQRExEWERMBERIBERERFxERERARFhEQHw4RFw4NERYNHAsRFwsKERYKGQgRFwgHERYHFgURFwUEERYEEwIRFwIBERYB2zyBaFAB8vRWFds8UXGgUnKhHaDIyVYWbrPEehscAD4nwgCYUweogScQqQSRcOIkwgCYURSogScQqQSSMXDiAKCaMBEVIG7y0IARFZJXFuIBERYBBqEBERQRExEVERMREhEUERIRERETEREREBESERAPEREPDhEQDhDfEM4QXRCsEJsQihB5EGgQRhA1ECQQIwL2VCMgUkAAERcRGREXERYRGBEWERURGREVERQRGBEUERMRGRETERIRGBESERERGRERERARGBEQDxEZDw4RGA4NERkNDBEYDAsRGQsKERgKCREZCQgRGAgHERkHBhEYBgURGQUEERgE2zwRElYUoQmkbXDIydADERcDVhgDJCUDlDDTHwGCEDLSD6a68uCBbTEA2zwgwgCPLgqkERMqofhC+EJtyMnQLxBfAVYYVVDIVWDbPMlxfyRDEy4CBANtbds8MAkREgmRMOJ/ISteAbIw0x8BghC6B5EtuvLggYEBAdcA+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiAH6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIQzBsE9s8fywE4IIQYFkVELqOmDDTHwGCEGBZFRC68uCBgQEB1wABMds8f+AgghChvDZiuo6xMNMfAYIQobw2Yrry4IH6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIMds8f+AgghDTKe6DuuMCIIIQ+vhKfbo1Njc4AfQwgQEL+EIuWVn0C2+hkjBt3yBukjBtjhbQgQEB1wCBAQHXAIEBAdcAVSBsE28D4m6VgXJl8vDegQEL+EIuWVn0C2+hkjBt3yBukjBtjhbQgQEB1wCBAQHXAIEBAdcAVSBsE28D4iBu8tCAbyP4QhEUERcRFBETERYREyIC/hESERUREhERERcREREQERYREA8RFQ8OERcODREWDQwRFQwLERcLChEWCgkRFQkIERcIBxEWBwYRFQYFERcFBBEWBAMRFQMCERcCAREWAds8AREWAaAgwACOHTBXE1cUERARExEQDxESDw4REQ4NERANEM9VKxJw4IEsh1YTIr6hIwHa8vRRu6Fw+EICERYCERgBbwMRExEVERMREhEUERIRERETEREREBESERAPEREPDhEQDhDfEM4QzRCsEJsQihB5EGgQVxBGEDVEMAERFgHbPBETERQRExESERMREhERERIREREQEREREA8REA9VDjMC1jAyERMRFRETERIRFBESERERFRERERARFBEQDxEVDw4RFA4NERUNDBEUDAsRFQsKERQKCREVCQgRFAgHERUHBhEUBgURFQUEERQEAxEVAwIRFAIBERUBERRWFds8LIEBC1YXWfQLb6GSMG3fJicDolYZQTNWGVVQyFVg2zzJcX8jQxMtAgQDbW3bPDBwcIBAVhbIAYIQ1TJ221jLH8s/yQQRGAQQJBAjbW3bPDARERETEREHERIHDxERDw4REA5VHSteXgLu+EFvJBAjXwMRExEVERMREhEUERIREREVEREREBEUERAPERUPDhEUDg0RFQ0MERQMCxEVCwoRFAoJERUJCBEUCAcRFQcGERQGBREVBQQRFAQDERUDAhEUAgERFQERFIERTREW2zwBERUBxwUBERUB8vQRERETERGpKAH6IG6SMG2OFtCBAQHXAIEBAdcAgQEB1wBVIGwTbwPibpaCAIen8vDeggC+pyFWFr7y9IExelYTVha+8vQsgQELVhdZ9AtvoZIwbd8gbpIwbY4W0IEBAdcAgQEB1wCBAQHXAFUgbBNvA+IgbvLQgG8jA1YXoREXEqERExEVERMpACAREBESERAPEREPDhEQDlUdAv4REhEUERIREREVEREREBEUERAPERUPDhEUDg0RFQ0MERQMCxEVCwoRFAoJERUJCBEUCAcRFQcGERQGBREVBQQRFAQDERUDAhEUAgERFQERFlYX2zwBERUBoAIRFgIBERUBbwMREREVEREREBEUERAPERMPDhESDg0REQ0MERAMoSoBLBC/EK4QnRCMEHsQahBZEEgQN0ZQ2zwzAN6CEA+KfqVQCMsfFss/UAT6Algg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxYBIG6VMHABywGOHiDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFuIhbrOVfwHKAMyUcDLKAOIB+gIBzxYC6BETERYRExESERUREhERERQREREQERYREA8RFQ8OERQODREWDQwRFQwLERQLChEWCgkRFQkIERQIBxEWBwYRFQYFERQFBBEWBAMRFQMCERQCAREWAREVVhXbPIIAo1n4QhLHBfL0LIEBC1YYWfQLb6GSMG3fqC0C/iBukjBtjhbQgQEB1wCBAQHXAIEBAdcAVSBsE28D4iBu8tCAbyMRExEWERMREhEVERIREREUEREREBEWERAPERUPDhEUDg0RFg0MERUMCxEUCwoRFgoJERUJCBEUCAcRFgcGERUGBREUBQQRFgQDERUDAhEUAgERFgERFVYZ2zyhLgP6AREWAaARFFYXoQIBERYBERRvAxERERUREREQERQREA8REw8OERIODRERDQwREAwQvxCuEJ0QjBB7EGoQWRBIEDdGUBAkECMBERcB2zwsgQELVhZZ9AtvoZIwbd8gbpIwbY4W0IEBAdcAgQEB1wCBAQHXAFUgbBNvA+Ju4w8zLzABTBETERURExESERQREhERERMREREQERIREA8REQ8OERAOEN9VHNs8MQH4LIEBC1YWWfQLb6GSMG3fIG6SMG2OFtCBAQHXAIEBAdcAgQEB1wBVIGwTbwPiIG7y0IBvIxETERYRExESERUREhERERQREREQERYREA8RFQ8OERQODREWDQwRFQwLERQLChEWCgkRFQkIERQIBxEWBwYRFQYFERQFBBEWBDIAWoEBC1EecMhVIFAjgQEBzwCBAQHPAIEBAc8AyRA/EiBulTBZ9FkwlEEz9BPiDAKuAxEVAwIRFAIBERYBERVWF9s8AREWAaABERQBERigAgERFQERF28DERARFREQDxEUDw4REw4NERIN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WTCYyAHPAEEz9EHigQEBAshZAvQAgQEBzwDJEDcSIG6VMFn0WjCUQTP0FeIEVxEREhETERIRERESEREPERAPVQ4C9BETERURExESERQREhERERUREREQERQREA8RFQ8OERQODREVDQwRFAwLERULChEUCgkRFQkIERQIBxEVBwYRFAYFERUFBBEUBAMRFQMCERQCAREVAREU2zwyNYFzC1YUVhS78vQRERETEREREBESERAPEREPDhEQDhDfVE8ALhDOEL0QrBCbEIoQeRBoEFcQVhA1RDASAv4w0x8BghAbmQSHuvLggYEBAdcAATERExEUERMREhEUERIREREUEREREBEUERAPERQPDhEUDg0RFA0MERQMCxEUCwoRFAoJERQJERQIBwZVQNs8OoIAg4FWFMIA8vQREhETERIRERESEREREBERERAPERAPEO8Q3hDNELwQq1UIVFUBPG1tIm6zmVsgbvLQgG8iAZEy4hAkcAMEgEJQI9s8MF4B0DDTHwGCEK8comq68uCB1AExERMRFBETERIRFBESERERFBERERARFBEQDxEUDw4RFA4NERQNDBEUDAsRFAsKERQKCREUCREUCAcGVUDbPD8REhETERIRERESEREREBERERAPERAPVQ1/VwP8jrYw0x8BghAsdrlzuvLggdM/+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiAHSAFUgbBPgIIIQCmHbWbqOuTDTHwGCEAph21m68uCB+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiAGBAQHXAFlsEts8f+AgWFlaAtIkERIRFBESERERExERERARFBEQDxETDw4RFA4NERMNDBEUDAsREwsKERQKCRETCQgRFAgHERMHBhEUBgUREwUEERQEAxETAwIRFAIBERMBERSBAQERFNs8AhEWAgERFQFZ9A1voZIwbd/IVgACfwDWIG6SMG2d0PQEgQEB1wBZbBJvAuKCANFNIW6z8vQgbvLQgG8iMIEBC/hBbyQQI18DcUEz9ApvoZQB1wAwkltt4oEYKyFus5gBIG7y0IDA/5IxcOLy9BERERMREREQERIREA8REQ8OERAOVR0AEvhCUoDHBfLghAPkgV2P+EFvJBNfA4IIXRQgvvL0+EP4KFIw2zwCjtIy+EJwA4BAA3BZyHABywFzAcsBcAHLABLMzMn5AMhyAcsBcAHLABLKB8v/ydAg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIyHABygDJ0BAl4w1/q1tcAvQRExEVERMREhEUERIREREVEREREBEUERAPERUPDhEUDg0RFQ0MERQMCxEVCwoRFAoJERUJCBEUCAcRFQcGERQGBREVBQQRFAQDERUDAhEUAgERFQERFNs8ERMRFRETERIRFBESERERExERERAREhEQDxERDw4REA4Q32ZgA7CCEFE+8166jrkw0x8BghBRPvNeuvLggfpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgBgQEB1wBZbBLbPH/gIIIQFzK+IbrjAoIQJPpHybrjAjBwY2RlAXbIVSCCENFzVABQBMsfEss/ASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFgHPFsl/VTBtbds8MF4B4vhCcAKAQARwWchwAcsBcwHLAXABywASzMzJ+QDIcgHLAXABywASygfL/8nQINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiMh/AcoAUAUg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxbJ0EVAXQF6yFUgghDRc1QAUATLHxLLPwEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxYBzxbJECN/VTBtbds8MF4ByshxAcoBUAcBygBwAcoCUAUg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxZQA/oCcAHKaCNus5F/kyRus+KXMzMBcAHKAOMNIW6znH8BygABIG7y0IABzJUxcAHKAOLJAfsIXwCYfwHKAMhwAcoAcAHKACRus51/AcoABCBu8tCAUATMljQDcAHKAOIkbrOdfwHKAAQgbvLQgFAEzJY0A3ABygDicAHKAAJ/AcoAAslYzAEIVRzbPGED1hETERURExESERQREhERERUREREQERQREA8RFQ8OERQODREVDQwRFAwLERULChEUCgkRFQkIERQIBxEVBwYRFAYFERUFBBEUBAMRFQMCERQCAREVAREUVhXbPNs8JIEBAVYXWfQNb6GSMG3fgWpiAf4gbpIwbZ3Q9ASBAQHXAFlsEm8C4iBu8tCAbyKBAQsBERd/cSFulVtZ9FkwmMgBzwBBM/RB4oEBAREWyFkC9ACBAQHPAMkQNQIRFQIBERYBIG6VMFn0WjCUQTP0FeIRERETEREREBESERAPEREPDhEQDhDfEM4QvRCsEJsQihB5bQL0ERMRFRETERIRFBESERERFRERERARFBEQDxEVDw4RFA4NERUNDBEUDAsRFQsKERQKCREVCQgRFAgHERUHBhEUBgURFQUEERQEAxEVAwIRFAIBERUBERTbPBETERURExESERQREhERERMREREQERIREA8REQ8OERAOEN9mZwGQMNMfAYIQFzK+Ibry4IGBAQHXAPpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgSbBKBHwv4QW8kECNfAyLHBfL02zx/aQDc0x8BghAk+kfJuvLggYEBAdcAgQEB1wBZbBImgQEBI1n0DW+hkjBt3yBukjBtndD0BIEBAdcAWWwSbwLigVTlIW6z8vQgbvLQgG8iMIEBAQLIWQL0AIEBAc8AyRA3EiBulTBZ9FowlEEz9BXiBH8C0iQREhEUERIRERETEREREBEUERAPERMPDhEUDg0REw0MERQMCxETCwoRFAoJERMJCBEUCAcREwcGERQGBRETBQQRFAQDERMDAhEUAgEREwERFIEBAREU2zwCERYCAREVAVn0DW+hkjBt38toAQhVHNs8aQDUIG6SMG2d0PQEgQEB1wBZbBJvAuKBFZQhbrPy9CBu8tCAbyIwgQEL+EFvJBAjXwNxQTP0Cm+hlAHXADCSW23igUKPIW6zmAEgbvLQgMD/kjFw4vL0ERERExERERAREhEQDxERDw4REA5VHQPWERMRFRETERIRFBESERERFRERERARFBEQDxEVDw4RFA4NERUNDBEUDAsRFQsKERQKCREVCQgRFAgHERUHBhEUBgURFQUEERQEAxEVAwIRFAIBERUBERRWFds82zwkgQEBVhdZ9A1voZIwbd+BamsC8oIAxO34QW8kECNfAxEVERYRFREUERYRFBETERYRExESERYREhERERYREREQERYREA8RFg8OERYODREWDQwRFgwLERYLChEWCgkRFgkIERYIBxEWBwYRFgYFERYFBBEWBAMRFgMCERYCAREW2zwBERUB8vQREhETERJ6bAH+IG6SMG2d0PQEgQEB1wBZbBJvAuIgbvLQgG8igQELAREXcHEhbpVbWfRZMJjIAc8AQTP0QeKBAQERFshZAvQAgQEBzwDJEDUCERUCAREWASBulTBZ9FowlEEz9BXiERERExERERAREhEQDxERDw4REA4Q3xDOEL0QrBCbEIoQeW0AJBERERIREREQEREREA8REA9VDgAWEGgQVxBGEDVQRAMCASBwcQIBIHJzAgFId3gCASB7fAIBIHR1Ahm3vZtnm2eK4gvh7YgwuXYCAWZ+fwIBIIKDAARWEAIZrh3tnm2eK4gvh7YgwLl5Apus1oCQa6TAgIXdeXBEEGuFhRBAgn/deWhEwYTdeXBEbZ4IiYiKiImIiQiKCIkIiIiJiIiIiAiJCIgHiIiHhwiIBwhvqo5tniuIL4e2IMC5egACIQCegQEBJwJZ9A1voZIwbd8gbpIwbZ3Q9ASBAQHXAFlsEm8C4iBukltw4CBu8tCAbyIwgQELWHFBM/QKb6GUAdcAMJJbbeIgbpIwcOAgbvLQgAIZsul2zzbPFcQXw9sQYLl9AhmyrzbPNs8VxBfD2xBgucgAAikCF6Y7tnm2eK4gvh7Yg7mAAlOmI7Z4IiYiKCImIiQiJiIkIiIiJCIiIiAiIiIgHiIgHqodtniuIL4e2IO5gQACJwBkgQEBJgJZ9A1voZIwbd8gbpIwbZ3Q9ASBAQHXAFlsEm8C4oFU5SFus/L0IG7y0IBvIjECGax4bZ5tniuIL4e2IMC5hAIZrF3tnm2eK4gvh7YgwLnLARBUfttUIjDbPIUC8npQAyDC//KFcQGSIajkMRETERcRExESERYREhERERUREREQERQREA8RFw8OERYODREVDQwRFAwLERcLChEWCgkRFQkIERQIBxEXBwYRFgYFERUFBBEUBAMRFwMCERYCAREVAREUVhRWFlYY2zwRExEUERMREhETERKGhwBKgTbRIsIA8vQgwgDy5NWCALW2USOpBMIAlVipBMIAkzAxcOLy9AL8EREREhERERAREREQDxEQD1UOERfbPBEWVheogScQqAERFakEVhWpBIEnEKkEVhYBoFYWcBEXmyGoVhepBBEWpBEW5DFXFREUVhWhgScQqAERFakEERERFBERERARExEQDxESDw4REQ4NERANEM8QvhCtEJwQixB6EGkQWBBHiIkBMts8IMEBkjBx3iCBAW28kjBxloEBbQGpBOKKAAwQNkVAQTAANvgjXLySW3DgAaGCAVGAqQQggQFtvJQwgQFt3gIBII2OAgEgkpMCAViXmAIBII+QAhmxIzbPNs8VxBfD2xBguZECAVisrQACLgIBILCxAgEglJUCAVi2twIZsqy2zzbPFcQXw9sQYLmWAARWEgIBZpmaAhWvFu2ebZ42erYqwLmdAgFum5wCASCmpwKLr0g10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCI2zwRExEUERMREhETERIRERESEREREBERERAPERAPVQ7bPFcQXw9sQYLmeAoerCDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjbPBETERQRExESERMREhERERIREREQEREREA8REA9VDts8bPNsU4LmfASL4Q/goUpDbPDBUYaBSoFYTAasBBNs8oQH0LYEBCyJZ9AtvoZIwbd8gbpIwbY4W0IEBAdcAgQEB1wCBAQHXAFUgbBNvA+JulDBwUwDgLYEBCyJZ9AtvoZIwbd8gbpIwbY4W0IEBAdcAgQEB1wCBAQHXAFUgbBNvA+IgbvLQgG8jWy0RFBEWERQRExEVERMREhEWERKgAvwREREVEREREBEWERAPERUPDhEWDg0RFQ0MERYMCxEVCwoRFgoJERUJCBEWCAcRFQcGERYGBREVBQQRFgQDERUDAhEWAgERFQERFts8AhEVAgERFgERFBEWERQRExEVERMREhEUERIRERETEREREBESERAPEREPDhEQDhDfEM6hogLuLYEBCyJZ9AtvoZIwbd8gbpIwbY4W0IEBAdcAgQEB1wCBAQHXAFUgbBNvA+JukjBw4BETERQRExESERQREhERERQREREQERQREA8RFA8OERQODREUDQwRFAwLERQLChEUCgkRFAkRFAgHBlVAVhTbPIEBCy4CERejpAAoEL0QrBCbEIoQeRBoEFcQRhA1EDQAyi2BAQsiWfQLb6GSMG3fIG6SMG2OFtCBAQHXAIEBAdcAgQEB1wBVIGwTbwPibpIwcOCBAQsuAln0C2+hkjBt3yBukjBtjhbQgQEB1wCBAQHXAIEBAdcAVSBsE28D4iBu8tCAbyNbAfZZ9AtvoZIwbd8gbpIwbY4W0IEBAdcAgQEB1wCBAQHXAFUgbBNvA+IgbvLQgG8jMDFSwKEgwgCOPwERFQGoVhSpBBETERQRExESERMREhERERIREREQEREREA8REA8Q7xDeEM0QvBCrEJoQiRB4EGcQVhBFEDRBMOAwVxSlADIREhETERIRERESEREREBERERAPERAPVQ5wAou/kg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCI2zwRExEUERMREhETERIRERESEREREBERERAPERAPVQ7bPFcQXw9sQYuagCF7mds82zxXEF8PbEGLnEAQTbPKkBhts8cFnIcAHLAXMBywFwAcsAEszMyfkAyHIBywFwAcsAEsoHy//J0CDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IiqAQ74Q/goEts8qwDWAtD0BDBtAYE0jgGAEPQPb6Hy4IcBgTSOIgKAEPQXyAHI9ADJAcxwAcoAQANZINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFskCGKn22zzbPFcQXw9sQbmuAhio+ts82zxXEF8PbEG5rwAEVhMAAiICAWKyswIZs/22zzbPFcQXw9sQYLm1AhelLbZ5tniuIL4e2IO5tAAPpX3aiaGkAAMAAiYAAiACGKrb2zzbPFcQXw9sQbm4AhipPts82zxXEF8PbEG5ugACJQN47UTQ1AH4Y9IAAY6c2zxXFBESERMREhERERIREREQEREREA8REA9VDuD4KNcLCoMJuvLgids8CNFVBts8u7y9AAIrAfb6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIAYEBAdcA+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiAHUAdD6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIAdSBAQHXAIEBAdcA9ATUMNCBAQG+Acb6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIAfpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgB+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiAHUAdDAAfJtbYIAhJ9TVLvy9FR5ePhCcCB/IfgjUxGNCGAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAASCCcnDgFR8Wy1WE1YXKlYVVHuPVhFWFVYeVhBWHFYjViFWE1YbERMRIBETERIRGRESERERHxERERARHhEQwQHK1wCBAQHXAIEBAdcA0gDUMND6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIAYEBAdcAgQEB1wD0BNQw0PpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgBgQEB1wC/AHb6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIAdQw0IEBAdcAMBERERQRERERERMRERERERIREQB0+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiAGBAQHXAIEBAdcA1DDQgQEB1wDUMBBYEFcQVgLqDxEjDw4RJg4NERgNDBEiDAsRFwsKERQKCREbCQgRGggHER0HBhElBgURFgUEESEEAxEnAwIRJAIBERUBERzbPFcQXw9sQQ0RFQ0GERQGDBETDAsREgsREBERERAMERAMEF8QXhBNHBCLEHoQeRA3EFZDBBEXy8IC/iaBAQEjWfQNb6GSMG3fIG6SMG2d0PQEgQEB1wBZbBJvAuIgbuMAIG7y0IBvIoEBC1ADf3EhbpVbWfRZMJjIAc8AQTP0QeKBAQECyFkC9ACBAQHPAMkQNxIgbpUwWfRaMJRBM/QV4gRWE1YTVhNWE1YTVhNWE1YTVhNWE1YTVhPKwwL0VhNWE1YTVhNWE1YTVhNWExETEScRExESESYREhERESUREREQESQREA8RIw8OESIODREhDQwRIAwLER8LChEeCgkRHQkIERwIBxEbBwYRGgYFERkFBBEYBAMRFwMCERYCAREVAREU2zxXEF8PbEERFBEVERQRExEUERPExQBEgvDvME++qxP+a+Fg14X87KpWIMhG561pfikVv+BhL6nLZwE0ERIRExESEREREhERERAREREQDxEQD1UOERbGAv4mgQEBI1n0DW+hkjBt3yBukjBtndD0BIEBAdcAWWwSbwLiIG7jACBu8tCAbyKBAQtQA39xIW6VW1n0WTCYyAHPAEEz9EHigQEBAshZAvQAgQEBzwDJEDcSIG6VMFn0WjCUQTP0FeIEVhNWE1YTVhNWE1YTVhNWE1YTVhNWE1YTyscC9FYTVhNWE1YTVhNWE1YTVhMRExEnERMREhEmERIRERElEREREBEkERAPESMPDhEiDg0RIQ0MESAMCxEfCwoRHgoJER0JCBEcCAcRGwcGERoGBREZBQQRGAQDERcDAhEWAgERFQERFNs8VxBfD2xBERQRFREUERMRFBETyMkARILwUkghxrbJoX6+Jplj4D0Z5DNpDZiVBzqtQ8zGtXTi8aEB/hESERMREhERERIREREQEREREA8REA9VDiaBAQEjWfQNb6GSMG3fIG6SMG2d0PQEgQEB1wBZbBJvAuIgbuMAIG7y0IBvIoEBC1ADf3EhbpVbWfRZMJjIAc8AQTP0QeKBAQECyFkC9ACBAQHPAMkQNxIgbpUwWfRaMJRBM/QV4gTKAvgwbYEBCyJ/cSFulVtZ9FkwmMgBzwBBM/RB4hETERYRExESERUREhERERQREREQERYREA8RFQ8OERQODREWDQwRFQwLERQLChEWCgkRFQkIERQIBxEWBwYRFQYFERQFBBEWBAMRFQMCERQCAREWAREV2zwBERYBbwKBAQEhy8wARILwg11tyItwi8ZG1tuCyFPvQYL6u9So3lnCE/K1qzrn2b4AzCBukjBtjhIgbvLQgG8iyFkC9ACBAQHPAMniECZWFgEgbpUwWfRaMJRBM/QV4hETERYRExESERUREhERERQREREQERMREA8REg8OEREODREQDRDPEL4QrRCcEIsQehBpEFgHEDZFBA==');
    const __system = Cell.fromBase64('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EREQVeDbPMntVNgihwScAZIwf+BwIddJwh+VMCDXCx/eIIIQI+OzJLqOlTDTHwGCECPjsyS68uCBgQEB1wABMeAgghBzYtCcuuMCIIIQChn+nrrjAiCCEHvdl966IyQuNQLkERMRFBETERIRFBESERERFBERERARFBEQDxEUDw4RFA4NERQNDBEUDAsRFAsKERQKCREUCREUCAcGVUDbPIIAnfT4J28QVha+8vRWEAERFXFwVSBtbW3bPDAREhETERIRERESEREREBERERAPERAPVQ5/anUCqjDTHwGCEHNi0Jy68uCB0z/6APpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IhUEwMQI2wUMyLXScIHlgLTBzDAAZIycOKOgzHbPI6DAds84n8lJgAWUcygARETAQygERICxIFD7SLCAPL0ERQhoPgoERQRFhEUARETARESERYREgEREQEREBEWERAfDhEWDh0MERYMGwoRFgoZCBEWCBcGERYGFQQRFgQTAhEWAlYVAVYXAds8LIEBC1YWWfQLb6GSMG3fJysCsoFI7Czy9FExoAykERQRFhEUERMRFRETERIRFhESERERFRERERARFhEQDxEVDw4RFg4NERUNDBEWDAsRFQsKCREVCQgHERUHBgURFQUEAxEVAwIBERYB2zxcvCgD/nBZyHABywFzAcsBcAHLABLMzMn5AMhyAcsBcAHLABLKB8v/ydAg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIcH+AQPgoI8jJ0FYSBQQRHwQRHlnIVVDbPMlGUAQRGQQDERoDAgERGQERGhBGEEXbPDARERETEREREBESERApdSoAwIIQF41FGVAHyx8Vyz9QA/oCASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFgEgbpUwcAHLAY4eINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8W4gH6AgHPFgAUDxERDw4REA5VHQKSIG6SMG2OFtCBAQHXAIEBAdcAgQEB1wBVIGwTbwPibo6mERMRFRETERIRFBESERERExERERAREhEQDxERDw4REA4Q31Uc2zzjDkgsAfgsgQELVhZZ9AtvoZIwbd8gbpIwbY4W0IEBAdcAgQEB1wCBAQHXAFUgbBNvA+IgbvLQgG8jERgSoBETERURExESERQREhERERUREREQERQREA8RFQ8OERQODREVDQwRFAwLERULChEUCgkRFQkIERQIBxEVBwYRFAYFERUFLQKyBBEUBAMRFQMCERQCAREVAREUVhbbPAERGAGgAhEUAgERFQFvAxERERUREREQERQREA8REw8OERIODRERDQwREAwQvxCuEJ0QjBB7EGoQWRBIEDdGUEFA2zyzSwGGMNMfAYIQChn+nrry4IH6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIAYEBAdcA0gABkdSSbQHiVSBsE9s8fy8C9CJZABEWERcRFhEVERcRFREUERcRFBETERcRExESERcREhERERcREREQERcREA8RFw8OERcODREXDQwRFwwLERcLChEXCgkRFwkIERcIBxEXBwYRFwYFERcFBBEXBAMRFwPbPAukbXAN0CMDVhkDVhpQIwEREAFWEFVQMDQB8jJWFVYVVhVWFVYVVhVWFVYVVhVWFVYVVhVWFVYVVhVWFVYVVhVWFVYV+EFvJBAjXwMRExEqERMREhEpERIREREoEREREBEnERAPESYPDhElDg0RJA0MESMMCxEiCwoRIQoJESAJCBEfCAcRHgcGER0GBREcBQQRGwQxBPoDERoDAhEZAgERGAERF9s8VxBfD2xBAREVAREUERcRFBETERYREwEREgEREREXEREREBEWERAfDhEXDg0RFg0cCxEXCwoRFgoZCBEXCAcRFgcWBREXBQQRFgQTAhEXAgERFgHbPIFoUAHy9FYV2zxRcaBScqEdoMjJVhZus+KRMjMAPifCAJhTB6iBJxCpBJFw4iTCAJhRFKiBJxCpBJIxcOIAoJowERUgbvLQgBEVklcW4gERFgEGoQERFBETERURExESERQREhERERMREREQERIREA8REQ8OERAOEN8QzhBdEKwQmxCKEHkQaBBGEDUQJBAjAu7IVWDbPMlSMHCAQH8EA21t2zwwAREVyFmCEPW3HpRQA8sfgQEBzwABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WyciCWMAAAAAAAAAAAAAAAAEBy2fMyXD7ABESERMREhERERIREREQEREREA8REA9VDkJ1BP6O5zDTHwGCEHvdl9668uCB0z/6APpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgBINcLAcMAjh/6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIlHLXIW3iFEMwbBTbPH/gIIIQMtIPprrjAiCCELoHkS264wIgNj5DTQL2VCMgUkAAERcRGREXERYRGBEWERURGREVERQRGBEUERMRGRETERIRGBESERERGRERERARGBEQDxEZDw4RGA4NERkNDBEYDAsRGQsKERgKCREZCQgRGAgHERkHBhEYBgURGQUEERgE2zwRElYUoQmkbXDIydADERcDVhgDNz0C1jAyERMRFRETERIRFBESERERFRERERARFBEQDxEVDw4RFA4NERUNDBEUDAsRFQsKERQKCREVCQgRFAgHERUHBhEUBgURFQUEERQEAxEVAwIRFAIBERUBERRWFds8LIEBC1YXWfQLb6GSMG3fODoC7vhBbyQQI18DERMRFRETERIRFBESERERFRERERARFBEQDxEVDw4RFA4NERUNDBEUDAsRFQsKERQKCREVCQgRFAgHERUHBhEUBgURFQUEERQEAxEVAwIRFAIBERUBERSBEU0RFts8AREVAccFAREVAfL0ERERExERuzkAIBEQERIREA8REQ8OERAOVR0B+iBukjBtjhbQgQEB1wCBAQHXAIEBAdcAVSBsE28D4m6WggCHp/Lw3oIAvqchVha+8vSBMXpWE1YWvvL0LIEBC1YXWfQLb6GSMG3fIG6SMG2OFtCBAQHXAIEBAdcAgQEB1wBVIGwTbwPiIG7y0IBvIwNWF6ERFxKhERMRFRETOwL+ERIRFBESERERFRERERARFBEQDxEVDw4RFA4NERUNDBEUDAsRFQsKERQKCREVCQgRFAgHERUHBhEUBgURFQUEERQEAxEVAwIRFAIBERUBERZWF9s8AREVAaACERYCAREVAW8DERERFRERERARFBEQDxETDw4REg4NERENDBEQDLM8ASwQvxCuEJ0QjBB7EGoQWRBIEDdGUNs8SwOiVhlBM1YZVVDIVWDbPMlxfyNDEy0CBANtbds8MHBwgEBWFsgBghDVMnbbWMsfyz/JBBEYBBAkECNtbds8MBERERMREQcREgcPEREPDhEQDlUdQnV1A5Qw0x8BghAy0g+muvLggW0xANs8IMIAjy4KpBETKqH4QvhCbcjJ0C8QXwFWGFVQyFVg2zzJcX8kQxMuAgQDbW3bPDAJERIJkTDifz9CdQH0MIEBC/hCLllZ9AtvoZIwbd8gbpIwbY4W0IEBAdcAgQEB1wCBAQHXAFUgbBNvA+JulYFyZfLw3oEBC/hCLllZ9AtvoZIwbd8gbpIwbY4W0IEBAdcAgQEB1wCBAQHXAFUgbBNvA+IgbvLQgG8j+EIRFBEXERQRExEWERNAAv4REhEVERIREREXEREREBEWERAPERUPDhEXDg0RFg0MERUMCxEXCwoRFgoJERUJCBEXCAcRFgcGERUGBREXBQQRFgQDERUDAhEXAgERFgHbPAERFgGgIMAAjh0wVxNXFBEQERMREA8REg8OEREODREQDRDPVSsScOCBLIdWEyK+s0EB2vL0UbuhcPhCAhEWAhEYAW8DERMRFRETERIRFBESERERExERERAREhEQDxERDw4REA4Q3xDOEM0QrBCbEIoQeRBoEFcQRhA1RDABERYB2zwRExEUERMREhETERIRERESEREREBERERAPERAPVQ5LAN6CEA+KfqVQCMsfFss/UAT6Algg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxYBIG6VMHABywGOHiDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFuIhbrOVfwHKAMyUcDLKAOIB+gIBzxYBsjDTHwGCELoHkS268uCBgQEB1wD6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIAfpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IhDMGwT2zx/RALoERMRFhETERIRFRESERERFBERERARFhEQDxEVDw4RFA4NERYNDBEVDAsRFAsKERYKCREVCQgRFAgHERYHBhEVBgURFAUEERYEAxEVAwIRFAIBERYBERVWFds8ggCjWfhCEscF8vQsgQELVhhZ9AtvoZIwbd+6RQL+IG6SMG2OFtCBAQHXAIEBAdcAgQEB1wBVIGwTbwPiIG7y0IBvIxETERYRExESERUREhERERQREREQERYREA8RFQ8OERQODREWDQwRFQwLERQLChEWCgkRFQkIERQIBxEWBwYRFQYFERQFBBEWBAMRFQMCERQCAREWAREVVhnbPLNGA/oBERYBoBEUVhehAgERFgERFG8DERERFRERERARFBEQDxETDw4REg4NERENDBEQDBC/EK4QnRCMEHsQahBZEEgQN0ZQECQQIwERFwHbPCyBAQtWFln0C2+hkjBt3yBukjBtjhbQgQEB1wCBAQHXAIEBAdcAVSBsE28D4m7jD0tHSQFMERMRFRETERIRFBESERERExERERAREhEQDxERDw4REA4Q31Uc2zxIAFqBAQtRHnDIVSBQI4EBAc8AgQEBzwCBAQHPAMkQPxIgbpUwWfRZMJRBM/QT4gwB+CyBAQtWFln0C2+hkjBt3yBukjBtjhbQgQEB1wCBAQHXAIEBAdcAVSBsE28D4iBu8tCAbyMRExEWERMREhEVERIREREUEREREBEWERAPERUPDhEUDg0RFg0MERUMCxEUCwoRFgoJERUJCBEUCAcRFgcGERUGBREUBQQRFgRKAq4DERUDAhEUAgERFgERFVYX2zwBERYBoAERFAERGKACAREVAREXbwMREBEVERAPERQPDhETDg0REg0MEREMCxEQCxCvEJ4QjRB8EGsQWhBJEDhHYENQ2zyzSwGSICBu8tCAbyMxAm6Rf5ogwACTIcAAkXDi4o4rLoEBCwPIVSBQI4EBAc8AgQEBzwCBAQHPAMkQPxIgbpUwWfRZMJRBM/QT4uMNDEwAdFuBAQttIG6SMG2OHCBu8tCAbyPIVSBQI4EBAc8AgQEBzwCBAQHPAMniED8SIG6VMFn0WTCUQTP0E+IE4IIQYFkVELqOmDDTHwGCEGBZFRC68uCBgQEB1wABMds8f+AgghChvDZiuo6xMNMfAYIQobw2Yrry4IH6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIMds8f+AgghDTKe6DuuMCIIIQ+vhKfbpOUldeAfaCAMrmIcIA8vSBAQv4Qi9ZWfQLb6GSMG3fIG6SMG2OFtCBAQHXAIEBAdcAgQEB1wBVIGwTbwPibpWBcmXy8N6CAJCH+EIRFBEWERQRExEVERMREhEWERIREREVEREREBEWERAPERUPDhEWDg0RFQ0MERYMCxEVCwoRFgpPAtYJERUJCBEWCAcRFQcGERYGBREVBQQRFgQDERUDAhEWAgERFQHbPFYWvgERFQHy9PhCERMRFRETERIRFBESERERExERERAREhEQDxERDw4REA4Q3xDOEL0QrBCbEIoQeRBoEFcQRhA1RAPbPLRQAogLpBEUERURFBETERURExESERUREhERERUREREQERUREA8RFQ8OERUODREVDQwRFQwLERULVZDbPHB/gED4KC4CERoBbbtRAezIVTCCEFlfB7xQBcsfE8s/AfoCASBulTBwAcsBjh4g10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxbiIW6zlX8BygDMlHAyygDiyRA0QTABERgBECQQI21t2zwwERIRExESEREREhERERAREREQDxEQD1UOdQLuERMRFBETERIRFBESERERFBERERARFBEQDxEUDw4RFA4NERQNDBEUDAsRFAsKERQKCREUCREUCAcGVUDbPFYTVhNWE1YTVhNWE1YTVhNWE1YTVhNWE1YTVhNWE1YTVhNWE1YTVhMRExEnERMREhEmERIRERElERF9UwKcERARJBEQDxEjDw4RIg4NESENDBEgDAsRHwsKER4KCREdCQgRHAgHERsHBhEaBgURGQUEERgEAxEXAwIRFgIBERUBERTbPFcQXw9sQVYV6VQC/iaBAQEjWfQNb6GSMG3fIG6SMG2d0PQEgQEB1wBZbBJvAuIgbuMAIG7y0IBvIoEBC1ADf3EhbpVbWfRZMJjIAc8AQTP0QeKBAQECyFkC9ACBAQHPAMkQNxIgbpUwWfRaMJRBM/QV4gRWE1YTVhNWE1YTVhNWE1YTVhNWE1YTVhPoVQLeVhNWE1YTVhNWE1YTVhNWExETEScRExESESYREhERESUREREQESQREA8RIw8OESIODREhDQwRIAwLER8LChEeCgkRHQkIERwIBxEbBwYRGgYFERkFBBEYBAMRFwMCERYCAREVAREU2zxXEF8PbDEB6VYA/iaBAQEjWfQNb6GSMG3fIG6SMG2d0PQEgQEB1wBZbBJvAuKBC28hbrPy9CBu8tCAbyKBAQtQA3BxIW6VW1n0WTCYyAHPAEEz9EHigQEBAshZAvQAgQEBzwDJEDcSIG6VMFn0WjCUQTP0FeIEVxMRERESEREREBERERAPERAPVQ4BYjDTHwGCENMp7oO68uCB+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiDHbPH9YAu4RExEUERMREhEUERIREREUEREREBEUERAPERQPDhEUDg0RFA0MERQMCxEUCwoRFAoJERQJERQIBwZVQNs8VhNWE1YTVhNWE1YTVhNWE1YTVhNWE1YTVhNWE1YTVhNWE1YTVhNWExETEScRExESESYREhERESUREX1ZApwREBEkERAPESMPDhEiDg0RIQ0MESAMCxEfCwoRHgoJER0JCBEcCAcRGwcGERoGBREZBQQRGAQDERcDAhEWAgERFQERFNs8VxBfD2xBVhXmWgL+JoEBASNZ9A1voZIwbd8gbpIwbZ3Q9ASBAQHXAFlsEm8C4iBu4wAgbvLQgG8igQELUAN/cSFulVtZ9FkwmMgBzwBBM/RB4oEBAQLIWQL0AIEBAc8AyRA3EiBulTBZ9FowlEEz9BXiBFYTVhNWE1YTVhNWE1YTVhNWE1YTVhNWE+hbAt5WE1YTVhNWE1YTVhNWE1YTERMRJxETERIRJhESERERJRERERARJBEQDxEjDw4RIg4NESENDBEgDAsRHwsKER4KCREdCQgRHAgHERsHBhEaBgURGQUEERgEAxEXAwIRFgIBERUBERTbPFcQXw9sIjLmXAH+JoEBASNZ9A1voZIwbd8gbpIwbZ3Q9ASBAQHXAFlsEm8C4oELbyFus/L0IG7y0IBvIoEBC1ADcHEhbpVbWfRZMJjIAc8AQTP0QeKBAQECyFkC9ACBAQHPAMkQNxIgbpUwWfRaMJRBM/QV4gRXEBESERMREhERERIREREQEREREF0ABFUOBP6OsTDTHwGCEPr4Sn268uCB+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiDHbPH/gIIIQNhYgZ7qOrjDTHwGCEDYWIGe68uCB+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiDHgIIIQCFLVHLrjAiCCEBuZBIe6X2RlaALuERMRFBETERIRFBESERERFBERERARFBEQDxEUDw4RFA4NERQNDBEUDAsRFAsKERQKCREUCREUCAcGVUDbPFYTVhNWE1YTVhNWE1YTVhNWE1YTVhNWE1YTVhNWE1YTVhNWE1YTVhMRExEnERMREhEmERIRERElERF9YAKcERARJBEQDxEjDw4RIg4NESENDBEgDAsRHwsKER4KCREdCQgRHAgHERsHBhEaBgURGQUEERgEAxEXAwIRFgIBERUBERTbPFcQXw9sQVYV4mEC/iaBAQEjWfQNb6GSMG3fIG6SMG2d0PQEgQEB1wBZbBJvAuIgbuMAIG7y0IBvIoEBC1ADf3EhbpVbWfRZMJjIAc8AQTP0QeKBAQECyFkC9ACBAQHPAMkQNxIgbpUwWfRaMJRBM/QV4gRWE1YTVhNWE1YTVhNWE1YTVhNWE1YTVhPoYgLeVhNWE1YTVhNWE1YTVhNWExETEScRExESESYREhERESUREREQESQREA8RIw8OESIODREhDQwRIAwLER8LChEeCgkRHQkIERwIBxEbBwYRGgYFERkFBBEYBAMRFwMCERYCAREVAREU2zxXEF8PMTMx4mMA/iaBAQEjWfQNb6GSMG3fIG6SMG2d0PQEgQEB1wBZbBJvAuKBC28hbrPy9CBu8tCAbyKBAQtQA3BxIW6VW1n0WTCYyAHPAEEz9EHigQEBAshZAvQAgQEBzwDJEDcSIG6VMFn0WjCUQTP0FeIEVxEREhETERIRERESEREPERAPVQ4B3hETERQRExESERQREhERERQREREQERQREA8RFA8OERQODREUDQwRFAwLERQLChEUCgkRFAkRFAgHBlVA2zwxERIRExESEREREhERERAREREQDxEQDxDvEN4QzRC8EKsQmhCJEHgQZxBWEEUQNEEwf30BPDDTHwGCEAhS1Ry68uCBgQEB1wCBAQHXAFlsEts8f2YC9BETERURExESERQREhERERUREREQERQREA8RFQ8OERQODREVDQwRFAwLERULChEUCgkRFQkIERQIBxEVBwYRFAYFERUFBBEUBAMRFQMCERQCAREVAREU2zwyNYFzC1YUVhS78vQRERETEREREBESERAPEREPDhEQDhDfamcALhDOEL0QrBCbEIoQeRBoEFcQVhA1RDASBKjjAiCCEJRqmLa6jqgw0x8BghCUapi2uvLggdM/ATHIAYIQr/kPV1jLH8s/yfhCAXBt2zx/4CDAACLXScEhsJJbf+AgghCvHKJquuMCIIIQLHa5c7ppbW5wAv4w0x8BghAbmQSHuvLggYEBAdcAATERExEUERMREhEUERIREREUEREREBEUERAPERQPDhEUDg0RFA0MERQMCxEUCwoRFAoJERQJERQIBwZVQNs8OoIAg4FWFMIA8vQREhETERIRERESEREREBERERAPERAPEO8Q3hDNELwQq1UIamwC0iQREhEUERIRERETEREREBEUERAPERMPDhEUDg0REw0MERQMCxETCwoRFAoJERMJCBEUCAcREwcGERQGBRETBQQRFAQDERMDAhEUAgEREwERFIEBAREU2zwCERYCAREVAVn0DW+hkjBt3+ZrANYgbpIwbZ3Q9ASBAQHXAFlsEm8C4oIA0U0hbrPy9CBu8tCAbyIwgQEL+EFvJBAjXwNxQTP0Cm+hlAHXADCSW23igRgrIW6zmAEgbvLQgMD/kjFw4vL0ERERExERERAREhEQDxERDw4REA5VHQACfwE8bW0ibrOZWyBu8tCAbyIBkTLiECRwAwSAQlAj2zwwdQHQMNMfAYIQrxyiarry4IHUATERExEUERMREhEUERIREREUEREREBEUERAPERQPDhEUDg0RFA0MERQMCxEUCwoRFAoJERQJERQIBwZVQNs8PxESERMREhERERIREREQEREREA8REA9VDX9vABL4QlKAxwXy4IQD/I62MNMfAYIQLHa5c7ry4IHTP/pAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgB0gBVIGwT4CCCEAph21m6jrkw0x8BghAKYdtZuvLggfpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgBgQEB1wBZbBLbPH/gIHF3ewPkgV2P+EFvJBNfA4IIXRQgvvL0+EP4KFIw2zwCjtIy+EJwA4BAA3BZyHABywFzAcsBcAHLABLMzMn5AMhyAcsBcAHLABLKB8v/ydAg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIyHABygDJ0BAl4w1/wHJzAXbIVSCCENFzVABQBMsfEss/ASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFgHPFsl/VTBtbds8MHUB4vhCcAKAQARwWchwAcsBcwHLAXABywASzMzJ+QDIcgHLAXABywASygfL/8nQINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiMh/AcoAUAUg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxbJ0EVAdAF6yFUgghDRc1QAUATLHxLLPwEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxYBzxbJECN/VTBtbds8MHUByshxAcoBUAcBygBwAcoCUAUg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxZQA/oCcAHKaCNus5F/kyRus+KXMzMBcAHKAOMNIW6znH8BygABIG7y0IABzJUxcAHKAOLJAfsIdgCYfwHKAMhwAcoAcAHKACRus51/AcoABCBu8tCAUATMljQDcAHKAOIkbrOdfwHKAAQgbvLQgFAEzJY0A3ABygDicAHKAAJ/AcoAAslYzAL0ERMRFRETERIRFBESERERFRERERARFBEQDxEVDw4RFA4NERUNDBEUDAsRFQsKERQKCREVCQgRFAgHERUHBhEUBgURFQUEERQEAxEVAwIRFAIBERUBERTbPBETERURExESERQREhERERMREREQERIREA8REQ8OERAOEN99eAEIVRzbPHkD1hETERURExESERQREhERERUREREQERQREA8RFQ8OERQODREVDQwRFAwLERULChEUCgkRFQkIERQIBxEVBwYRFAYFERUFBBEUBAMRFQMCERQCAREVAREUVhXbPNs8JIEBAVYXWfQNb6GSMG3fnIJ6Af4gbpIwbZ3Q9ASBAQHXAFlsEm8C4iBu8tCAbyKBAQsBERd/cSFulVtZ9FkwmMgBzwBBM/RB4oEBAREWyFkC9ACBAQHPAMkQNQIRFQIBERYBIG6VMFn0WjCUQTP0FeIRERETEREREBESERAPEREPDhEQDhDfEM4QvRCsEJsQihB5hQOwghBRPvNeuo65MNMfAYIQUT7zXrry4IH6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIAYEBAdcAWWwS2zx/4CCCEBcyviG64wKCECT6R8m64wIwcHyAhgL0ERMRFRETERIRFBESERERFRERERARFBEQDxEVDw4RFA4NERUNDBEUDAsRFQsKERQKCREVCQgRFAgHERUHBhEUBgURFQUEERQEAxEVAwIRFAIBERUBERTbPBETERURExESERQREhERERMREREQERIREA8REQ8OERAOEN99fwLSJBESERQREhERERMREREQERQREA8REw8OERQODRETDQwRFAwLERMLChEUCgkREwkIERQIBxETBwYRFAYFERMFBBEUBAMREwMCERQCARETAREUgQEBERTbPAIRFgIBERUBWfQNb6GSMG3f6X4A1CBukjBtndD0BIEBAdcAWWwSbwLigRWUIW6z8vQgbvLQgG8iMIEBC/hBbyQQI18DcUEz9ApvoZQB1wAwkltt4oFCjyFus5gBIG7y0IDA/5IxcOLy9BERERMREREQERIREA8REQ8OERAOVR0BCFUc2zyBAZAw0x8BghAXMr4huvLggYEBAdcA+kABINdJgQELuvLgiCDXCwoggQT/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');
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
    1237: { message: `APY: rewards == 0` },
    2927: { message: `AccessControl: Role ID doesn't exist` },
    4429: { message: `Invalid sender` },
    5524: { message: `AccessControl: Role ADMIN is undefined` },
    6187: { message: `AccessControl: Doesn't have the CFO role` },
    7947: { message: `AccessControl: BadConfirmation` },
    10858: { message: `AccessControl: Doesn't have the BRIDGE role` },
    11399: { message: `Insufficient LP balance to withdraw rewards` },
    12450: { message: `AccessControl: Role BRIDGE is undefined` },
    12666: { message: `TokenBurnNotification: Amount exceeds underlying balance` },
    14033: { message: `APY: totalSupply == 0` },
    15100: { message: `TokenBurn: Invalid balance` },
    17039: { message: `AccessControl: Doesn't have the ADMIN role` },
    17389: { message: `Deposit amount must be greater than zero.` },
    18668: { message: `Can't Mint Anymore` },
    21733: { message: `AccessControl: Role doesn't exist` },
    23951: { message: `Insufficient gas` },
    26704: { message: `ReleaseTokens: Unauthorized release tokens call.` },
    29285: { message: `The caller has no staking position to withdraw` },
    29451: { message: `Protocol fee cannot exceed token fee.` },
    33665: { message: `Gas cost must be positive.` },
    33951: { message: `Protocol fee cannot exceed the token fee.` },
    34727: { message: `TokenBurnNotification: Missing staker position` },
    36999: { message: `Insufficient staker's balance to withdraw the amount.` },
    40436: { message: `WithdrawGas: Insufficient TON balance` },
    41817: { message: `UpdateDeposit must originate from the LP wallet.` },
    42708: { message: `Invalid sender!` },
    46518: { message: `APY: totalSupply and rewards are not on the same decimal scale` },
    48807: { message: `TokenBurnNotification: Amount exceeds total supply` },
    50413: { message: `AccessControl: Doesnt have the role` },
    51942: { message: `Withdraw amount must be greater than zero.` },
    53581: { message: `AccessControl: Role CFO is undefined` },
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
    {"name":"InternalWithdrawDeposit","header":432565636,"fields":[{"name":"amount","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"global_fee_growth","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"total_supply","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"InternalWithdrawFee","header":2441921564,"fields":[{"name":"lastFeeGrowth","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"owner","type":{"kind":"simple","type":"address","optional":false}},{"name":"balance","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
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
    {"name":"JettonLP$Data","header":null,"fields":[{"name":"admin","type":{"kind":"simple","type":"address","optional":false}},{"name":"available_underlying","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"bridge","type":{"kind":"simple","type":"address","optional":false}},{"name":"cfo","type":{"kind":"simple","type":"address","optional":false}},{"name":"content","type":{"kind":"simple","type":"cell","optional":false}},{"name":"decimals","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"deployed","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"deposits","type":{"kind":"dict","key":"address","value":"Position","valueFormat":"ref"}},{"name":"fee_growth_global","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"gas_cost","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"query_id","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"mintable","type":{"kind":"simple","type":"bool","optional":false}},{"name":"owner","type":{"kind":"simple","type":"address","optional":false}},{"name":"protocolFee","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"protocol_fee_amount","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"roles","type":{"kind":"dict","key":"int","value":"RoleData","valueFormat":"ref"}},{"name":"stake_token","type":{"kind":"simple","type":"address","optional":false}},{"name":"tokenFee","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"token_wallet","type":{"kind":"simple","type":"address","optional":false}},{"name":"total_supply","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
]

const JettonLP_getters: ABIGetter[] = [
    {"name":"currentAPY","arguments":[],"returnType":{"kind":"simple","type":"int","optional":false,"format":257}},
    {"name":"decimals","arguments":[],"returnType":{"kind":"simple","type":"int","optional":false,"format":257}},
    {"name":"feeGrowthGlobal","arguments":[],"returnType":{"kind":"simple","type":"int","optional":false,"format":257}},
    {"name":"get_admin","arguments":[],"returnType":{"kind":"simple","type":"address","optional":false}},
    {"name":"get_available_underlying","arguments":[],"returnType":{"kind":"simple","type":"int","optional":false,"format":257}},
    {"name":"get_cfo","arguments":[],"returnType":{"kind":"simple","type":"address","optional":false}},
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
    'currentAPY': 'getCurrentApy',
    'decimals': 'getDecimals',
    'feeGrowthGlobal': 'getFeeGrowthGlobal',
    'get_admin': 'getGetAdmin',
    'get_available_underlying': 'getGetAvailableUnderlying',
    'get_cfo': 'getGetCfo',
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
    {"receiver":"internal","message":{"kind":"typed","type":"WithdrawGas"}},
    {"receiver":"internal","message":{"kind":"typed","type":"TokenNotification"}},
    {"receiver":"internal","message":{"kind":"typed","type":"ReleaseTokens"}},
    {"receiver":"internal","message":{"kind":"typed","type":"TokenBurnNotification"}},
    {"receiver":"internal","message":{"kind":"typed","type":"WithdrawRewards"}},
    {"receiver":"internal","message":{"kind":"typed","type":"UpdateDeposits"}},
    {"receiver":"internal","message":{"kind":"typed","type":"Withdraw"}},
    {"receiver":"internal","message":{"kind":"typed","type":"SetAdmin"}},
    {"receiver":"internal","message":{"kind":"typed","type":"SetCFO"}},
    {"receiver":"internal","message":{"kind":"typed","type":"SetBridge"}},
    {"receiver":"internal","message":{"kind":"typed","type":"SetWalletAddress"}},
    {"receiver":"internal","message":{"kind":"typed","type":"UpdateFees"}},
    {"receiver":"internal","message":{"kind":"typed","type":"UpdateGasCost"}},
    {"receiver":"internal","message":{"kind":"typed","type":"Deploy"}},
    {"receiver":"internal","message":{"kind":"empty"}},
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
    
    async send(provider: ContractProvider, via: Sender, args: { value: bigint, bounce?: boolean| null | undefined }, message: WithdrawGas | TokenNotification | ReleaseTokens | TokenBurnNotification | WithdrawRewards | UpdateDeposits | Withdraw | SetAdmin | SetCFO | SetBridge | SetWalletAddress | UpdateFees | UpdateGasCost | Deploy | null | TokenUpdateContent | ProvideWalletAddress | GrantRole | RevokeRole | RenounceRole | UpdateRoleAdmin) {
        
        let body: Cell | null = null;
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'WithdrawGas') {
            body = beginCell().store(storeWithdrawGas(message)).endCell();
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
        if (message === null) {
            body = new Cell();
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