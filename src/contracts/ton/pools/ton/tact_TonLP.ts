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

export type Deposit = {
    $$type: 'Deposit';
    amount: bigint;
    forward_payload: Slice;
}

export function storeDeposit(src: Deposit) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2548914161, 32);
        b_0.storeInt(src.amount, 257);
        b_0.storeBuilder(src.forward_payload.asBuilder());
    };
}

export function loadDeposit(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2548914161) { throw Error('Invalid prefix'); }
    let _amount = sc_0.loadIntBig(257);
    let _forward_payload = sc_0;
    return { $$type: 'Deposit' as const, amount: _amount, forward_payload: _forward_payload };
}

export type TonLP$Data = {
    $$type: 'TonLP$Data';
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
    tokenFee: bigint;
    token_wallet: Address;
    total_supply: bigint;
}

export function storeTonLP$Data(src: TonLP$Data) {
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
        b_4.storeInt(src.tokenFee, 257);
        b_4.storeAddress(src.token_wallet);
        b_4.storeInt(src.total_supply, 257);
        b_3.storeRef(b_4.endCell());
        b_2.storeRef(b_3.endCell());
        b_1.storeRef(b_2.endCell());
        b_0.storeRef(b_1.endCell());
    };
}

export function loadTonLP$Data(slice: Slice) {
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
    let _tokenFee = sc_4.loadIntBig(257);
    let _token_wallet = sc_4.loadAddress();
    let _total_supply = sc_4.loadIntBig(257);
    return { $$type: 'TonLP$Data' as const, admin: _admin, available_underlying: _available_underlying, bridge: _bridge, cfo: _cfo, content: _content, decimals: _decimals, deployed: _deployed, deposits: _deposits, fee_growth_global: _fee_growth_global, gas_cost: _gas_cost, query_id: _query_id, mintable: _mintable, owner: _owner, protocolFee: _protocolFee, protocol_fee_amount: _protocol_fee_amount, roles: _roles, tokenFee: _tokenFee, token_wallet: _token_wallet, total_supply: _total_supply };
}

 type TonLP_init_args = {
    $$type: 'TonLP_init_args';
    admin: Address;
    cfo: Address;
    bridge: Address;
    decimals: bigint;
    protocolFee: bigint;
    tokenFee: bigint;
    content: Cell;
}

function initTonLP_init_args(src: TonLP_init_args) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeAddress(src.admin);
        b_0.storeAddress(src.cfo);
        b_0.storeAddress(src.bridge);
        let b_1 = new Builder();
        b_1.storeInt(src.decimals, 257);
        b_1.storeInt(src.protocolFee, 257);
        b_1.storeInt(src.tokenFee, 257);
        b_1.storeRef(src.content);
        b_0.storeRef(b_1.endCell());
    };
}

async function TonLP_init(admin: Address, cfo: Address, bridge: Address, decimals: bigint, protocolFee: bigint, tokenFee: bigint, content: Cell) {
    const __code = Cell.fromBase64('te6ccgECvgEAMlwAART/APSkE/S88sgLAQIBYgIDA+LQAdDTAwFxsKMB+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiFRQUwNvBPhhAvhi2zwREhEUERIRERETEREREBESERAPEREPDhEQDhDfVRzbPPLggsj4QwHMfwHKABETERIREREQVeDbPMntVK0EBQIBIGJjBPIBkjB/4HAh10nCH5UwINcLH94gwAAi10nBIbCOjVv4QW8kE18D+ELbPH/gIIIQl+1X8bqPQjDTHwGCEJftV/G68uCBgQEB1wBmbBKCAIvt+EFvJBNfA1M9oL7y9CDXScIHldMHMMABkjBw4o6C2zyOhPhC2zzif+AgCQgJCgH0ARETARESINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WAREQAYEBAc8AUA4g10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxbIUA0g10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxYbzBmBAQHPABeBAQEGAf7PABX0AAPIgQEBzwASgQEBzwCBAQHPABLKAMhQAyDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFhOBAQHPABOBAQHPABT0AATIgQEBzwBQBiDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFhSBAQHPAMlYzMlQA8zJBwAKWMzJAcwAFlG7oAEREgELoBERAsCBQ+0iwgDy9BETIaD4KBETERUREwEREgEREREVEREBERABDxEVDx4NERUNHAsRFQsaCREVCRgHERUHFgURFQUUAxEVAxIBERUBVhQBVhYB2zwrgQELVhVZ9AtvoZIwbd8LDATSghAKGf6euo7DMNMfAYIQChn+nrry4IH6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIAYEBAdcA0gABkdSSbQHiVSBsE9s8f+AgghB73ZfeuuMCIIIQMtIPprrjAiCCELoHkS26EhMUFQKwgUjsK/L0UTGgC6QRExEVERMREhEUERIREREVEREREBEUERAPERUPDhEUDg0RFQ0MERQMCxEVCwoRFAoJCBEUCAcGERQGBQQRFAQDAhEUAgERFQERFNs8XJ4NAoIgbpIwbY4W0IEBAdcAgQEB1wCBAQHXAFUgbBNvA+Jujp4REhEUERIRERETEREREBESERAPEREPDhEQDlUd2zzjDiwQA/pwWchwAcsBcwHLAXABywASzMzJ+QDIcgHLAXABywASygfL/8nQINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiHB/gED4KCPIydBWEQUEER4EER1ZyFVQ2zzJRlAEERgEAxEZAwIBERgBERkQRhBF2zwwERAREhEQDxERDw5TDwDAghAXjUUZUAfLHxXLP1AD+gIBINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WASBulTBwAcsBjh4g10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxbiAfoCAc8WABAOERAOEN9VHAH8K4EBC1YVWfQLb6GSMG3fIG6SMG2OFtCBAQHXAIEBAdcAgQEB1wBVIGwTbwPiIG7y0IBvIxEXEqAREhEUERIRERETEREREBEUERAPERMPDhEUDg0REw0MERQMCxETCwoRFAoJERMJCBEUCAcREwcGERQGBRETBQQRFAQDERMDEQKWAhEUAgEREwERFFYV2zwBERcBoAIRFAIBERMBbwMREBEUERAPERMPDhESDg0REQ0MERAMEL8QrhCdEIwQexBqEFkQSBA3RlBEMNs8li4D8iJZABEVERYRFREUERYRFBETERYRExESERYREhERERYREREQERYREA8RFg8OERYODREWDQwRFgwLERYLChEWCgkRFgkIERYIBxEWBwYRFgYFERYFBBEWBAMRFgPbPFcTgEB/VhZRMEMTAREWAVUwbW3bPDABEREBERMWUxcBzjDTHwGCEHvdl9668uCB0z/6APpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgBINcLAcMAjh/6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIlHLXIW3iFEMwbBTbPH8bAmow0x8BghAy0g+muvLggW0xANs8VxJWEcIAjo/4QgEREnFwVSBtbW3bPDCSVxHi+CdvEBERfyJTA/6O2TDTHwGCELoHkS268uCBgQEB1wD6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIAfpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IhDMGwT2zx/4CCCEGBZFRC6jpgw0x8BghBgWRUQuvLggYEBAdcAATHbPH/gJSYnAfIyVhRWFFYUVhRWFFYUVhRWFFYUVhRWFFYUVhRWFFYUVhRWFFYUVhT4QW8kECNfAxESESgREhEREScREREQESYREA8RJQ8OESQODREjDQwRIgwLESELChEgCgkRHwkIER4IBxEdBwYRHAYFERsFBBEaBAMRGQMCERgCGADeyFmCEPW3HpRQA8sfgQEBzwABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WyciCWMAAAAAAAAAAAAAAAAEBy2fMyXD7APgnbxARERESDxEQDxDvEN4QzRC8EKsQmhCJEHgQZxBWEEUQNEEwBPwBERcBERbbPFcQXw9sMQERFAERExEWERMREhEVERIBEREBERARFhEQDxEVDx4NERYNDBEVDBsKERYKCREVCRgHERYHBhEVBhUEERYEAxEVAxIBERYB2zyBaFAB8vRWFNs8UWGgUmKhHKDIyVYVbrOaMBEUIG7y0IARFJJXFeK2dxkaAD4mwgCYUwaogScQqQSRcOIkwgCYURSogScQqQSSMXDiAHIBERUBBaEBERMREhEUERIRERETEREREBESERAPEREPDhEQDhDfEM4QvRBMEJsQihB5EGgQVxA1ECQD8FQjIFJAABEWERgRFhEVERcRFREUERgRFBETERcRExESERgREhERERcREREQERgREA8RFw8OERgODREXDQwRGAwLERcLChEYCgkRFwkIERgIBxEXBwYRGAYFERcFBBEYBNs8VxFWEgERFHF/VSBtbW3bPDBwcIBAKRxTHQLKMDIREhEUERIRERETEREREBEUERAPERMPDhEUDg0REw0MERQMCxETCwoRFAoJERMJCBEUCAcREwcGERQGBRETBQQRFAQDERMDAhEUAgEREwERFFYT2zwrgQELVhVZ9AtvoZIwbd8eHwFeyAGCENUydttYyx/LP8kEERUEECQQI21t2zww+CdvEBEQERIREBERDhEQDhDfVRxTAfb4QW8kECNfAxESERQREhERERMREREQERQREA8REw8OERQODRETDQwRFAwLERMLChEUCgkREwkIERQIBxETBwYRFAYFERMFBBEUBAMREwMCERQCARETAREUgRFNERTbPAERFQHHBQEREwHy9BEQERIREA8REQ8OERAOVR2dAfogbpIwbY4W0IEBAdcAgQEB1wCBAQHXAFUgbBNvA+JuloIAh6fy8N6CAL6nIVYWvvL0gTF6VhJWFr7y9CuBAQtWFVn0C2+hkjBt3yBukjBtjhbQgQEB1wCBAQHXAIEBAdcAVSBsE28D4iBu8tCAbyMDVhehERcSoRESERQREiAC/hERERMREREQERQREA8REw8OERQODRETDQwRFAwLERMLChEUCgkREwkIERQIBxETBwYRFAYFERMFBBEUBAMREwMCERQCARETAREWVhXbPAERFQGgAhEWAgEREwFvAxEQERQREA8REw8OERIODRERDQwREAwQvxCuEJ0QjBB7EGqWIQEWEFkQSBA3RlAT2zwuAfQwgQEL+EItWVn0C2+hkjBt3yBukjBtjhbQgQEB1wCBAQHXAIEBAdcAVSBsE28D4m6VgXJl8vDegQEL+EItWVn0C2+hkjBt3yBukjBtjhbQgQEB1wCBAQHXAIEBAdcAVSBsE28D4iBu8tCAbyP4QhETERYRExESERUREiMC/BERERQREREQERYREA8RFQ8OERQODREWDQwRFQwLERQLChEWCgkRFQkIERQIBxEWBwYRFQYFERQFBBEWBAMRFQMCERQCAREWAds8AREWAaAgwACOFjBXElcSDxESDw4REQ4NERANEM9VK3DggSyHVhIivvL0UaqhcPhCAhEWApYkAaYRFQFvAxESERQREhERERMREREQERIREA8REQ8OERAOEN8QzhC9EJsQihB5EGgQVxBGEDVEMAIRFQLbPBESERMREhERERIREREQEREREA8REA9VDi4C3BESERUREhERERQREREQERMREA8RFQ8OERQODRETDQwRFQwLERQLChETCgkRFQkIERQIBxETBwYRFQYFERQFBBETBAMRFQMCERQCARETAREVVhXbPIIAo1n4QhLHBfL0K4EBC1YVWfQLb6GSMG3fnCgB8oIAyuYhwgDy9IEBC/hCLllZ9AtvoZIwbd8gbpIwbY4W0IEBAdcAgQEB1wCBAQHXAFUgbBNvA+JulYFyZfLw3oIAkIf4QhETERURExESERQREhERERUREREQERQREA8RFQ8OERQODREVDQwRFAwLERULChEUCgkRFQkwA/4gghChvDZiuo6xMNMfAYIQobw2Yrry4IH6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIMds8f+AgghDTKe6Duo6xMNMfAYIQ0ynug7ry4IH6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIMds8f+AgghD6+Ep9MzQ1AvwgbpIwbY4W0IEBAdcAgQEB1wCBAQHXAFUgbBNvA+IgbvLQgG8jERIRFRESERERFBERERARExEQDxEVDw4RFA4NERMNDBEVDAsRFAsKERMKCREVCQgRFAgHERMHBhEVBgURFAUEERMEAxEVAwIRFAIBERMBERVWFts8AREWAaCWKQPaERRWF6ECARETAREUbwMREBEUERAPERMPDhESDg0REQ0MERAMEL8QrhCdEIwQexBqEFkQSBA3RlBEMBLbPCuBAQtWFln0C2+hkjBt3yBukjBtjhbQgQEB1wCBAQHXAIEBAdcAVSBsE28D4m7jDy4qKwFAERIRFBESERERExERERAREhEQDxERDw4REA4Q31Uc2zwsAfwrgQELVhZZ9AtvoZIwbd8gbpIwbY4W0IEBAdcAgQEB1wCBAQHXAFUgbBNvA+IgbvLQgG8jERIRFRESERERFBERERARExEQDxEVDw4RFA4NERMNDBEVDAsRFAsKERMKCREVCQgRFAgHERMHBhEVBgURFAUEERMEAxEVAwIRFAItAFqBAQtRHXDIVSBQI4EBAc8AgQEBzwCBAQHPAMkQPhIgbpUwWfRZMJRBM/QT4gsClAEREwERFVYX2zwBERYBoAERFAERFqACARESAREVbwMPERQPDhETDg0REg0MEREMCxEQCxCvEJ4QjRB8EGsQWhBJEDhHYBRDUNs8li4BkiAgbvLQgG8jMQJukX+aIMAAkyHAAJFw4uKOKy2BAQsDyFUgUCOBAQHPAIEBAc8AgQEBzwDJED4SIG6VMFn0WTCUQTP0E+LjDQsvAHRbgQELbSBukjBtjhwgbvLQgG8jyFUgUCOBAQHPAIEBAc8AgQEBzwDJ4hA+EiBulTBZ9FkwlEEz9BPiAsIIERQIBxEVBwYRFAYFERUFBBEUBAMRFQMCERQCAREVAds8VhS+AREVAfL0+EIREhEUERIRERETEREREBESERAPEREPDhEQDhDfEM4QvRCsEJsQihB5EGgQVxBGEDVEA9s8mDEChAqkERMRFBETERIRFBESERERFBERERARFBEQDxEUDw4RFA4NERQNDBEUDAsRFAsKERQKVYDbPHB/gED4KC0CERkBbZ0yAeDIVTCCEFlfB7xQBcsfE8s/AfoCASBulTBwAcsBjh4g10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxbiIW6zlX8BygDMlHAyygDiyRA0QTABERcBECQQI21t2zwwEREREhERERAREREQDxEQD1UOUwL2ERIRExESERERExERERARExEQDxETDw4REw4NERMNDBETDAsREwsKERMKCRETCRETCAcGVUDbPFYSVhJWElYSVhJWElYSVhJWElYSVhJWElYSVhJWElYSVhJWElYSERIRJRESERERJBERERARIxEQDxEiDw4RIQ4NESANXDYC9hESERMREhERERMREREQERMREA8REw8OERMODRETDQwREwwLERMLChETCgkREwkREwgHBlVA2zxWElYSVhJWElYSVhJWElYSVhJWElYSVhJWElYSVhJWElYSVhJWEhESESUREhERESQREREQESMREA8RIg8OESEODREgDVw6BP66jrEw0x8BghD6+Ep9uvLggfpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4Igx2zx/4CCCEDYWIGe6jq4w0x8BghA2FiBnuvLggfpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4Igx4CCCEAhS1Ry64wIgghAbmQSHPj9AQQJ4DBEfDAsRHgsKER0KCREcCQgRGwgHERoHBhEZBgURGAUEERcEAxEWAwIRFQIBERQBERPbPFcQXw9sMVYUvDcC/iWBAQEjWfQNb6GSMG3fIG6SMG2d0PQEgQEB1wBZbBJvAuIgbuMAIG7y0IBvIoEBC1ADf3EhbpVbWfRZMJjIAc8AQTP0QeKBAQECyFkC9ACBAQHPAMkQNhIgbpUwWfRaMJRBM/QV4gNWElYSVhJWElYSVhJWElYSVhJWElYSVhK7OALOVhJWElYSVhJWElYSVhIREhElERIREREkEREREBEjERAPESIPDhEhDg0RIA0MER8MCxEeCwoRHQoJERwJCBEbCAcRGgcGERkGBREYBQQRFwQDERYDAhEVAgERFAERE9s8VxBfD2whAbw5APIlgQEBI1n0DW+hkjBt3yBukjBtndD0BIEBAdcAWWwSbwLigQtvIW6z8vQgbvLQgG8igQELUANwcSFulVtZ9FkwmMgBzwBBM/RB4oEBAQLIWQL0AIEBAc8AyRA2EiBulTBZ9FowlEEz9BXiA1cSERAREREQDxEQD1UOAngMER8MCxEeCwoRHQoJERwJCBEbCAcRGgcGERkGBREYBQQRFwQDERYDAhEVAgERFAERE9s8VxBfD2wxVhS5OwL+JYEBASNZ9A1voZIwbd8gbpIwbZ3Q9ASBAQHXAFlsEm8C4iBu4wAgbvLQgG8igQELUAN/cSFulVtZ9FkwmMgBzwBBM/RB4oEBAQLIWQL0AIEBAc8AyRA2EiBulTBZ9FowlEEz9BXiA1YSVhJWElYSVhJWElYSVhJWElYSVhJWErs8AsxWElYSVhJWElYSVhJWEhESESUREhERESQREREQESMREA8RIg8OESEODREgDQwRHwwLER4LChEdCgkRHAkIERsIBxEaBwYRGQYFERgFBBEXBAMRFgMCERUCAREUARET2zxXEV8PbCK5PQD8JYEBASNZ9A1voZIwbd8gbpIwbZ3Q9ASBAQHXAFlsEm8C4oELbyFus/L0IG7y0IBvIoEBC1ADcHEhbpVbWfRZMJjIAc8AQTP0QeKBAQECyFkC9ACBAQHPAMkQNhIgbpUwWfRaMJRBM/QV4gM/EREREhERERAREREQDxEQD1UNAvYREhETERIRERETEREREBETERAPERMPDhETDg0REw0MERMMCxETCwoREwoJERMJERMIBwZVQNs8VhJWElYSVhJWElYSVhJWElYSVhJWElYSVhJWElYSVhJWElYSVhIREhElERIREREkEREREBEjERAPESIPDhEhDg0RIA1cQgHGERIRExESERERExERERARExEQDxETDw4REw4NERMNDBETDAsREwsKERMKCRETCRETCAcGVUDbPDERERESEREREBERERAPERAPEO8Q3hDNELwQqxCaEIkQeBBnEFYQRRA0QTB/XAE8MNMfAYIQCFLVHLry4IGBAQHXAIEBAdcAWWwS2zx/RgL2uo72MNMfAYIQG5kEh7ry4IGBAQHXAAExERIRExESERERExERERARExEQDxETDw4REw4NERMNDBETDAsREwsKERMKCRETCRETCAcGVUDbPDmCAIOBVhPCAPL0EREREhERERAREREQDxEQDxDvEN4QzRC8EKsQmlUHf+AgSEkCeAwRHwwLER4LChEdCgkRHAkIERsIBxEaBwYRGQYFERgFBBEXBAMRFgMCERUCAREUARET2zxXEF8PbDFWFLZDAv4lgQEBI1n0DW+hkjBt3yBukjBtndD0BIEBAdcAWWwSbwLiIG7jACBu8tCAbyKBAQtQA39xIW6VW1n0WTCYyAHPAEEz9EHigQEBAshZAvQAgQEBzwDJEDYSIG6VMFn0WjCUQTP0FeIDVhJWElYSVhJWElYSVhJWElYSVhJWElYSu0QCzFYSVhJWElYSVhJWElYSERIRJRESERERJBERERARIxEQDxEiDw4RIQ4NESANDBEfDAsRHgsKER0KCREcCQgRGwgHERoHBhEZBgURGAUEERcEAxEWAwIRFQIBERQBERPbPFcQXw8zMbZFAPYlgQEBI1n0DW+hkjBt3yBukjBtndD0BIEBAdcAWWwSbwLigQtvIW6z8vQgbvLQgG8igQELUANwcSFulVtZ9FkwmMgBzwBBM/RB4oEBAQLIWQL0AIEBAc8AyRA2EiBulTBZ9FowlEEz9BXiA1cQEREREhERERAREREQVQ4C9BESERQREhERERMREREQERQREA8REw8OERQODRETDQwRFAwLERMLChEUCgkREwkIERQIBxETBwYRFAYFERMFBBEUBAMREwMCERQCARETAREU2zwyNIFzC1YSVhS78vQREBESERAPEREPDhEQDhDfEM4QvRCsEJsQihB5SEcAEBBoEFcQRkQwAvAjERERExERXj8OERIODRETDQwREgwLERMLChESCgkREwkIERIIBxETBwYREgYFERMFBBESBAMREwMCERICARETARESgQEBERTbPAIRFAIBERUBWfQNb6GSMG3fIG6SMG2d0PQEgQEB1wBZbBJvAuKCANFNIW6z8vS5SgT8ghCUapi2uo6oMNMfAYIQlGqYtrry4IHTPwExyAGCEK/5D1dYyx/LP8n4QgFwbds8f+AgghCvHKJquuMCIIIQLHa5c7qOtjDTHwGCECx2uXO68uCB0z/6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIAdIAVSBsE+AgS0xNTgCQIG7y0IBvIjCBAQv4QW8kECNfA3FBM/QKb6GUAdcAMJJbbeKBGCshbrOYASBu8tCAwP+SMXDi8vQREBESERAPEREPDhEQDlUdATxtbSJus5lbIG7y0IBvIgGRMuIQJHADBIBCUCPbPDBTAbww0x8BghCvHKJquvLggdQBMRESERMREhERERMREREQERMREA8REw8OERMODRETDQwREwwLERMLChETCgkREwkREwgHBlVA2zw+EREREhERERAREREQDxEQDxDvVQx/TwPkgV2P+EFvJBNfA4IIXRQgvvL0+EP4KFIw2zwCjtIy+EJwA4BAA3BZyHABywFzAcsBcAHLABLMzMn5AMhyAcsBcAHLABLKB8v/ydAg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIyHABygDJ0BAl4w1/n1BRBLaCEAph21m6jrYw0x8BghAKYdtZuvLggfpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgBgQEB1wBZbBLgIIIQUT7zXrrjAiCCEBcyviG64wKCECT6R8m6VVZXWAAS+EJScMcF8uCEAXbIVSCCENFzVABQBMsfEss/ASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFgHPFsl/VTBtbds8MFMB4vhCcAKAQARwWchwAcsBcwHLAXABywASzMzJ+QDIcgHLAXABywASygfL/8nQINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiMh/AcoAUAUg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxbJ0EVAUgF6yFUgghDRc1QAUATLHxLLPwEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxYBzxbJECN/VTBtbds8MFMByshxAcoBUAcBygBwAcoCUAUg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxZQA/oCcAHKaCNus5F/kyRus+KXMzMBcAHKAOMNIW6znH8BygABIG7y0IABzJUxcAHKAOLJAfsIVACYfwHKAMhwAcoAcAHKACRus51/AcoABCBu8tCAUATMljQDcAHKAOIkbrOdfwHKAAQgbvLQgFAEzJY0A3ABygDicAHKAAJ/AcoAAslYzALmERIRFBESERERExERERARFBEQDxETDw4RFA4NERMNDBEUDAsREwsKERQKCRETCQgRFAgHERMHBhEUBgUREwUEERQEAxETAwIRFAIBERMBERTbPBESERQREhERERMREREQERIREA8REQ8OERAOEN9VHNs8f1xZAWww0x8BghBRPvNeuvLggfpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgBgQEB1wBZbBJbAZAw0x8BghAXMr4huvLggYEBAdcA+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiBJsEoEfC/hBbyQQI18DIscF8vTbPH9eAOaObtMfAYIQJPpHybry4IGBAQHXAIEBAdcAWWwSJYEBASNZ9A1voZIwbd8gbpIwbZ3Q9ASBAQHXAFlsEm8C4oFU5SFus/L0IG7y0IBvIjCBAQECyFkC9ACBAQHPAMkQNhIgbpUwWfRaMJRBM/QV4gN/4DBwA/IREhEUERIRERETEREREBEUERAPERMPDhEUDg0REw0MERQMCxETCwoRFAoJERMJCBEUCAcREwcGERQGBRETBQQRFAQDERMDAhEUAgEREwERFFYT2zzbPCOBAQFWFVn0DW+hkjBt3yBukjBtndD0BIEBAdcAWWwSbwLifl9aAN4gbvLQgG8igQELAREXf3EhbpVbWfRZMJjIAc8AQTP0QeKBAQERFshZAvQAgQEBzwDJEDQCERUCAREUASBulTBZ9FowlEEz9BXiERAREhEQDxERDw4REA4Q3xDOEL0QrBCbEIoQeRBoEFcQRhA1QUMC5hESERQREhERERMREREQERQREA8REw8OERQODRETDQwRFAwLERMLChEUCgkREwkIERQIBxETBwYRFAYFERMFBBEUBAMREwMCERQCARETAREU2zwREhEUERIRERETEREREBESERAPEREPDhEQDhDfVRzbPH9cXgLuIxERERMREV4/DhESDg0REw0MERIMCxETCwoREgoJERMJCBESCAcREwcGERIGBRETBQQREgQDERMDAhESAgEREwEREoEBAREU2zwCERQCAREVAVn0DW+hkjBt3yBukjBtndD0BIEBAdcAWWwSbwLigRWUIW6z8vS8XQCQIG7y0IBvIjCBAQv4QW8kECNfA3FBM/QKb6GUAdcAMJJbbeKBQo8hbrOYASBu8tCAwP+SMXDi8vQREBESERAPEREPDhEQDlUdA/IREhEUERIRERETEREREBEUERAPERMPDhEUDg0REw0MERQMCxETCwoRFAoJERMJCBEUCAcREwcGERQGBRETBQQRFAQDERMDAhEUAgEREwERFFYT2zzbPCOBAQFWFVn0DW+hkjBt3yBukjBtndD0BIEBAdcAWWwSbwLifl9gAvKCAMTt+EFvJBAjXwMRFBEVERQRExEVERMREhEVERIREREVEREREBEVERAPERUP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');
    const __system = Cell.fromBase64('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PMntVMwifQTyAZIwf+BwIddJwh+VMCDXCx/eIMAAItdJwSGwjo1b+EFvJBNfA/hC2zx/4CCCEJftV/G6j0Iw0x8BghCX7VfxuvLggYEBAdcAZmwSggCL7fhBbyQTXwNTPaC+8vQg10nCB5XTBzDAAZIwcOKOgts8joT4Qts84n/gICQjJCwAFlG7oAEREgELoBERAsCBQ+0iwgDy9BETIaD4KBETERUREwEREgEREREVEREBERABDxEVDx4NERUNHAsRFQsaCREVCRgHERUHFgURFQUUAxEVAxIBERUBVhQBVhYB2zwrgQELVhVZ9AtvoZIwbd8lKQKwgUjsK/L0UTGgC6QRExEVERMREhEUERIREREVEREREBEUERAPERUPDhEUDg0RFQ0MERQMCxEVCwoRFAoJCBEUCAcGERQGBQQRFAQDAhEUAgERFQERFNs8XLAmA/pwWchwAcsBcwHLAXABywASzMzJ+QDIcgHLAXABywASygfL/8nQINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiHB/gED4KCPIydBWEQUEER4EER1ZyFVQ2zzJRlAEERgEAxEZAwIBERgBERkQRhBF2zwwERAREhEQDxERDydtKADAghAXjUUZUAfLHxXLP1AD+gIBINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WASBulTBwAcsBjh4g10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxbiAfoCAc8WABAOERAOEN9VHAKCIG6SMG2OFtCBAQHXAIEBAdcAgQEB1wBVIGwTbwPibo6eERIRFBESERERExERERAREhEQDxERDw4REA5VHds84w5EKgH8K4EBC1YVWfQLb6GSMG3fIG6SMG2OFtCBAQHXAIEBAdcAgQEB1wBVIGwTbwPiIG7y0IBvIxEXEqAREhEUERIRERETEREREBEUERAPERMPDhEUDg0REw0MERQMCxETCwoRFAoJERMJCBEUCAcREwcGERQGBRETBQQRFAQDERMDKwKWAhEUAgEREwERFFYV2zwBERcBoAIRFAIBERMBbwMREBEUERAPERMPDhESDg0REQ0MERAMEL8QrhCdEIwQexBqEFkQSBA3RlBEMNs8qEcE0oIQChn+nrqOwzDTHwGCEAoZ/p668uCB+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiAGBAQHXANIAAZHUkm0B4lUgbBPbPH/gIIIQe92X3rrjAiCCEDLSD6a64wIgghC6B5Etui0zOz8D8iJZABEVERYRFREUERYRFBETERYRExESERYREhERERYREREQERYREA8RFg8OERYODREWDQwRFgwLERYLChEWCgkRFgkIERYIBxEWBwYRFgYFERYFBBEWBAMRFgPbPFcTgEB/VhZRMEMTAREWAVUwbW3bPDABEREBERMubTIB8jJWFFYUVhRWFFYUVhRWFFYUVhRWFFYUVhRWFFYUVhRWFFYUVhRWFPhBbyQQI18DERIRKBESERERJxERERARJhEQDxElDw4RJA4NESMNDBEiDAsRIQsKESAKCREfCQgRHggHER0HBhEcBgURGwUEERoEAxEZAwIRGAIvBPwBERcBERbbPFcQXw9sMQERFAERExEWERMREhEVERIBEREBERARFhEQDxEVDx4NERYNDBEVDBsKERYKCREVCRgHERYHBhEVBhUEERYEAxEVAxIBERYB2zyBaFAB8vRWFNs8UWGgUmKhHKDIyVYVbrOaMBEUIG7y0IARFJJXFeLUhzAxAD4mwgCYUwaogScQqQSRcOIkwgCYURSogScQqQSSMXDiAHIBERUBBaEBERMREhEUERIRERETEREREBESERAPEREPDhEQDhDfEM4QvRBMEJsQihB5EGgQVxA1ECQA3shZghD1tx6UUAPLH4EBAc8AASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFsnIgljAAAAAAAAAAAAAAAABActnzMlw+wD4J28QEREREg8REA8Q7xDeEM0QvBCrEJoQiRB4EGcQVhBFEDRBMAHOMNMfAYIQe92X3rry4IHTP/oA+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiAEg1wsBwwCOH/pAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IiUctchbeIUQzBsFNs8fzQD8FQjIFJAABEWERgRFhEVERcRFREUERgRFBETERcRExESERgREhERERcREREQERgREA8RFw8OERgODREXDQwRGAwLERcLChEYCgkRFwkIERgIBxEXBwYRGAYFERcFBBEYBNs8VxFWEgERFHF/VSBtbW3bPDBwcIBAKTVtOgLKMDIREhEUERIRERETEREREBEUERAPERMPDhEUDg0REw0MERQMCxETCwoRFAoJERMJCBEUCAcREwcGERQGBRETBQQRFAQDERMDAhEUAgEREwERFFYT2zwrgQELVhVZ9AtvoZIwbd82NwH2+EFvJBAjXwMREhEUERIRERETEREREBEUERAPERMPDhEUDg0REw0MERQMCxETCwoRFAoJERMJCBEUCAcREwcGERQGBRETBQQRFAQDERMDAhEUAgEREwERFIERTREU2zwBERUBxwUBERMB8vQREBESERAPEREPDhEQDlUdrwH6IG6SMG2OFtCBAQHXAIEBAdcAgQEB1wBVIGwTbwPibpaCAIen8vDeggC+pyFWFr7y9IExelYSVha+8vQrgQELVhVZ9AtvoZIwbd8gbpIwbY4W0IEBAdcAgQEB1wCBAQHXAFUgbBNvA+IgbvLQgG8jA1YXoREXEqEREhEUERI4Av4RERETEREREBEUERAPERMPDhEUDg0REw0MERQMCxETCwoRFAoJERMJCBEUCAcREwcGERQGBRETBQQRFAQDERMDAhEUAgEREwERFlYV2zwBERUBoAIRFgIBERMBbwMREBEUERAPERMPDhESDg0REQ0MERAMEL8QrhCdEIwQexBqqDkBFhBZEEgQN0ZQE9s8RwFeyAGCENUydttYyx/LP8kEERUEECQQI21t2zww+CdvEBEQERIREBERDhEQDhDfVRxtAmow0x8BghAy0g+muvLggW0xANs8VxJWEcIAjo/4QgEREnFwVSBtbW3bPDCSVxHi+CdvEBERfzxtAfQwgQEL+EItWVn0C2+hkjBt3yBukjBtjhbQgQEB1wCBAQHXAIEBAdcAVSBsE28D4m6VgXJl8vDegQEL+EItWVn0C2+hkjBt3yBukjBtjhbQgQEB1wCBAQHXAIEBAdcAVSBsE28D4iBu8tCAbyP4QhETERYRExESERUREj0C/BERERQREREQERYREA8RFQ8OERQODREWDQwRFQwLERQLChEWCgkRFQkIERQIBxEWBwYRFQYFERQFBBEWBAMRFQMCERQCAREWAds8AREWAaAgwACOFjBXElcSDxESDw4REQ4NERANEM9VK3DggSyHVhIivvL0UaqhcPhCAhEWAqg+AaYRFQFvAxESERQREhERERMREREQERIREA8REQ8OERAOEN8QzhC9EJsQihB5EGgQVxBGEDVEMAIRFQLbPBESERMREhERERIREREQEREREA8REA9VDkcD/o7ZMNMfAYIQugeRLbry4IGBAQHXAPpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgB+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiEMwbBPbPH/gIIIQYFkVELqOmDDTHwGCEGBZFRC68uCBgQEB1wABMds8f+BASU0C3BESERUREhERERQREREQERMREA8RFQ8OERQODRETDQwRFQwLERQLChETCgkRFQkIERQIBxETBwYRFQYFERQFBBETBAMRFQMCERQCARETAREVVhXbPIIAo1n4QhLHBfL0K4EBC1YVWfQLb6GSMG3frkEC/CBukjBtjhbQgQEB1wCBAQHXAIEBAdcAVSBsE28D4iBu8tCAbyMREhEVERIREREUEREREBETERAPERUPDhEUDg0REw0MERUMCxEUCwoREwoJERUJCBEUCAcREwcGERUGBREUBQQREwQDERUDAhEUAgEREwERFVYW2zwBERYBoKhCA9oRFFYXoQIBERMBERRvAxEQERQREA8REw8OERIODRERDQwREAwQvxCuEJ0QjBB7EGoQWRBIEDdGUEQwEts8K4EBC1YWWfQLb6GSMG3fIG6SMG2OFtCBAQHXAIEBAdcAgQEB1wBVIGwTbwPibuMPR0NFAUAREhEUERIRERETEREREBESERAPEREPDhEQDhDfVRzbPEQAWoEBC1EdcMhVIFAjgQEBzwCBAQHPAIEBAc8AyRA+EiBulTBZ9FkwlEEz9BPiCwH8K4EBC1YWWfQLb6GSMG3fIG6SMG2OFtCBAQHXAIEBAdcAgQEB1wBVIGwTbwPiIG7y0IBvIxESERUREhERERQREREQERMREA8RFQ8OERQODRETDQwRFQwLERQLChETCgkRFQkIERQIBxETBwYRFQYFERQFBBETBAMRFQMCERQCRgKUARETAREVVhfbPAERFgGgAREUAREWoAIBERIBERVvAw8RFA8OERMODRESDQwREQwLERALEK8QnhCNEHwQaxBaEEkQOEdgFENQ2zyoRwGSICBu8tCAbyMxAm6Rf5ogwACTIcAAkXDi4o4rLYEBCwPIVSBQI4EBAc8AgQEBzwCBAQHPAMkQPhIgbpUwWfRZMJRBM/QT4uMNC0gAdFuBAQttIG6SMG2OHCBu8tCAbyPIVSBQI4EBAc8AgQEBzwCBAQHPAMniED4SIG6VMFn0WTCUQTP0E+IB8oIAyuYhwgDy9IEBC/hCLllZ9AtvoZIwbd8gbpIwbY4W0IEBAdcAgQEB1wCBAQHXAFUgbBNvA+JulYFyZfLw3oIAkIf4QhETERURExESERQREhERERUREREQERQREA8RFQ8OERQODREVDQwRFAwLERULChEUCgkRFQlKAsIIERQIBxEVBwYRFAYFERUFBBEUBAMRFQMCERQCAREVAds8VhS+AREVAfL0+EIREhEUERIRERETEREREBESERAPEREPDhEQDhDfEM4QvRCsEJsQihB5EGgQVxBGEDVEA9s8qUsChAqkERMRFBETERIRFBESERERFBERERARFBEQDxEUDw4RFA4NERQNDBEUDAsRFAsKERQKVYDbPHB/gED4KC0CERkBba9MAeDIVTCCEFlfB7xQBcsfE8s/AfoCASBulTBwAcsBjh4g10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxbiIW6zlX8BygDMlHAyygDiyRA0QTABERcBECQQI21t2zwwEREREhERERAREREQDxEQD1UObQP+IIIQobw2YrqOsTDTHwGCEKG8NmK68uCB+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiDHbPH/gIIIQ0ynug7qOsTDTHwGCENMp7oO68uCB+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiDHbPH/gIIIQ+vhKfU5TWAL2ERIRExESERERExERERARExEQDxETDw4REw4NERMNDBETDAsREwsKERMKCRETCRETCAcGVUDbPFYSVhJWElYSVhJWElYSVhJWElYSVhJWElYSVhJWElYSVhJWElYSERIRJRESERERJBERERARIxEQDxEiDw4RIQ4NESANdU8CeAwRHwwLER4LChEdCgkRHAkIERsIBxEaBwYRGQYFERgFBBEXBAMRFgMCERUCAREUARET2zxXEF8PbDFWFNpQAv4lgQEBI1n0DW+hkjBt3yBukjBtndD0BIEBAdcAWWwSbwLiIG7jACBu8tCAbyKBAQtQA39xIW6VW1n0WTCYyAHPAEEz9EHigQEBAshZAvQAgQEBzwDJEDYSIG6VMFn0WjCUQTP0FeIDVhJWElYSVhJWElYSVhJWElYSVhJWElYS2VECzlYSVhJWElYSVhJWElYSERIRJRESERERJBERERARIxEQDxEiDw4RIQ4NESANDBEfDAsRHgsKER0KCREcCQgRGwgHERoHBhEZBgURGAUEERcEAxEWAwIRFQIBERQBERPbPFcQXw9sIQHaUgDyJYEBASNZ9A1voZIwbd8gbpIwbZ3Q9ASBAQHXAFlsEm8C4oELbyFus/L0IG7y0IBvIoEBC1ADcHEhbpVbWfRZMJjIAc8AQTP0QeKBAQECyFkC9ACBAQHPAMkQNhIgbpUwWfRaMJRBM/QV4gNXEhEQEREREA8REA9VDgL2ERIRExESERERExERERARExEQDxETDw4REw4NERMNDBETDAsREwsKERMKCRETCRETCAcGVUDbPFYSVhJWElYSVhJWElYSVhJWElYSVhJWElYSVhJWElYSVhJWElYSERIRJRESERERJBERERARIxEQDxEiDw4RIQ4NESANdVQCeAwRHwwLER4LChEdCgkRHAkIERsIBxEaBwYRGQYFERgFBBEXBAMRFgMCERUCAREUARET2zxXEF8PbDFWFNdVAv4lgQEBI1n0DW+hkjBt3yBukjBtndD0BIEBAdcAWWwSbwLiIG7jACBu8tCAbyKBAQtQA39xIW6VW1n0WTCYyAHPAEEz9EHigQEBAshZAvQAgQEBzwDJEDYSIG6VMFn0WjCUQTP0FeIDVhJWElYSVhJWElYSVhJWElYSVhJWElYS2VYCzFYSVhJWElYSVhJWElYSERIRJRESERERJBERERARIxEQDxEiDw4RIQ4NESANDBEfDAsRHgsKER0KCREcCQgRGwgHERoHBhEZBgURGAUEERcEAxEWAwIRFQIBERQBERPbPFcRXw9sItdXAPwlgQEBI1n0DW+hkjBt3yBukjBtndD0BIEBAdcAWWwSbwLigQtvIW6z8vQgbvLQgG8igQELUANwcSFulVtZ9FkwmMgBzwBBM/RB4oEBAQLIWQL0AIEBAc8AyRA2EiBulTBZ9FowlEEz9BXiAz8RERESEREREBERERAPERAPVQ0E/rqOsTDTHwGCEPr4Sn268uCB+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiDHbPH/gIIIQNhYgZ7qOrjDTHwGCEDYWIGe68uCB+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiDHgIIIQCFLVHLrjAiCCEBuZBIdZXl9iAvYREhETERIRERETEREREBETERAPERMPDhETDg0REw0MERMMCxETCwoREwoJERMJERMIBwZVQNs8VhJWElYSVhJWElYSVhJWElYSVhJWElYSVhJWElYSVhJWElYSVhIREhElERIREREkEREREBEjERAPESIPDhEhDg0RIA11WgJ4DBEfDAsRHgsKER0KCREcCQgRGwgHERoHBhEZBgURGAUEERcEAxEWAwIRFQIBERQBERPbPFcQXw9sMVYU1FsC/iWBAQEjWfQNb6GSMG3fIG6SMG2d0PQEgQEB1wBZbBJvAuIgbuMAIG7y0IBvIoEBC1ADf3EhbpVbWfRZMJjIAc8AQTP0QeKBAQECyFkC9ACBAQHPAMkQNhIgbpUwWfRaMJRBM/QV4gNWElYSVhJWElYSVhJWElYSVhJWElYSVhLZXALMVhJWElYSVhJWElYSVhIREhElERIREREkEREREBEjERAPESIPDhEhDg0RIA0MER8MCxEeCwoRHQoJERwJCBEbCAcRGgcGERkGBREYBQQRFwQDERYDAhEVAgERFAERE9s8VxBfDzMx1F0A9iWBAQEjWfQNb6GSMG3fIG6SMG2d0PQEgQEB1wBZbBJvAuKBC28hbrPy9CBu8tCAbyKBAQtQA3BxIW6VW1n0WTCYyAHPAEEz9EHigQEBAshZAvQAgQEBzwDJEDYSIG6VMFn0WjCUQTP0FeIDVxARERESEREREBERERBVDgHGERIRExESERERExERERARExEQDxETDw4REw4NERMNDBETDAsREwsKERMKCRETCRETCAcGVUDbPDERERESEREREBERERAPERAPEO8Q3hDNELwQqxCaEIkQeBBnEFYQRRA0QTB/dQE8MNMfAYIQCFLVHLry4IGBAQHXAIEBAdcAWWwS2zx/YAL0ERIRFBESERERExERERARFBEQDxETDw4RFA4NERMNDBEUDAsREwsKERQKCRETCQgRFAgHERMHBhEUBgUREwUEERQEAxETAwIRFAIBERMBERTbPDI0gXMLVhJWFLvy9BEQERIREA8REQ8OERAOEN8QzhC9EKwQmxCKEHljYQAQEGgQVxBGRDAC9rqO9jDTHwGCEBuZBIe68uCBgQEB1wABMRESERMREhERERMREREQERMREA8REw8OERMODRETDQwREwwLERMLChETCgkREwkREwgHBlVA2zw5ggCDgVYTwgDy9BERERIREREQEREREA8REA8Q7xDeEM0QvBCrEJpVB3/gIGNlAvAjERERExERXj8OERIODRETDQwREgwLERMLChESCgkREwkIERIIBxETBwYREgYFERMFBBESBAMREwMCERICARETARESgQEBERTbPAIRFAIBERUBWfQNb6GSMG3fIG6SMG2d0PQEgQEB1wBZbBJvAuKCANFNIW6z8vTXZACQIG7y0IBvIjCBAQv4QW8kECNfA3FBM/QKb6GUAdcAMJJbbeKBGCshbrOYASBu8tCAwP+SMXDi8vQREBESERAPEREPDhEQDlUdBPyCEJRqmLa6jqgw0x8BghCUapi2uvLggdM/ATHIAYIQr/kPV1jLH8s/yfhCAXBt2zx/4CCCEK8comq64wIgghAsdrlzuo62MNMfAYIQLHa5c7ry4IHTP/pAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgB0gBVIGwT4CBmZ2lvATxtbSJus5lbIG7y0IBvIgGRMuIQJHADBIBCUCPbPDBtAbww0x8BghCvHKJquvLggdQBMRESERMREhERERMREREQERMREA8REw8OERMODRETDQwREwwLERMLChETCgkREwkREwgHBlVA2zw+EREREhERERAREREQDxEQDxDvVQx/aAAS+EJScMcF8uCEA+SBXY/4QW8kE18DgghdFCC+8vT4Q/goUjDbPAKO0jL4QnADgEADcFnIcAHLAXMBywFwAcsAEszMyfkAyHIBywFwAcsAEsoHy//J0CDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjIcAHKAMnQECXjDX+0amsBdshVIIIQ0XNUAFAEyx8Syz8BINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WAc8WyX9VMG1t2zwwbQHi+EJwAoBABHBZyHABywFzAcsBcAHLABLMzMn5AMhyAcsBcAHLABLKB8v/ydAg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIyH8BygBQBSDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFsnQRUBsAXrIVSCCENFzVABQBMsfEss/ASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFgHPFskQI39VMG1t2zwwbQHKyHEBygFQBwHKAHABygJQBSDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFlAD+gJwAcpoI26zkX+TJG6z4pczMwFwAcoA4w0hbrOcfwHKAAEgbvLQgAHMlTFwAcoA4skB+whuAJh/AcoAyHABygBwAcoAJG6znX8BygAEIG7y0IBQBMyWNANwAcoA4iRus51/AcoABCBu8tCAUATMljQDcAHKAOJwAcoAAn8BygACyVjMBLaCEAph21m6jrYw0x8BghAKYdtZuvLggfpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgBgQEB1wBZbBLgIIIQUT7zXrrjAiCCEBcyviG64wKCECT6R8m6cHN3fALmERIRFBESERERExERERARFBEQDxETDw4RFA4NERMNDBEUDAsREwsKERQKCRETCQgRFAgHERMHBhEUBgUREwUEERQEAxETAwIRFAIBERMBERTbPBESERQREhERERMREREQERIREA8REQ8OERAOEN9VHNs8f3VxA/IREhEUERIRERETEREREBEUERAPERMPDhEUDg0REw0MERQMCxETCwoRFAoJERMJCBEUCAcREwcGERQGBRETBQQRFAQDERMDAhEUAgEREwERFFYT2zzbPCOBAQFWFVn0DW+hkjBt3yBukjBtndD0BIEBAdcAWWwSbwLiknlyAN4gbvLQgG8igQELAREXf3EhbpVbWfRZMJjIAc8AQTP0QeKBAQERFshZAvQAgQEBzwDJEDQCERUCAREUASBulTBZ9FowlEEz9BXiERAREhEQDxERDw4REA4Q3xDOEL0QrBCbEIoQeRBoEFcQRhA1QUMBbDDTHwGCEFE+81668uCB+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiAGBAQHXAFlsEnQC5hESERQREhERERMREREQERQREA8REw8OERQODRETDQwRFAwLERMLChEUCgkREwkIERQIBxETBwYRFAYFERMFBBEUBAMREwMCERQCARETAREU2zwREhEUERIRERETEREREBESERAPEREPDhEQDhDfVRzbPH91eALuIxERERMREV4/DhESDg0REw0MERIMCxETCwoREgoJERMJCBESCAcREwcGERIGBRETBQQREgQDERMDAhESAgEREwEREoEB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A9VDts8VxBfD2wxgzKQBBNs8qAJ7qwg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCI2zwREhETERIRERESEREREBERERAPERAPVQ7bPGzzbEODMpgH0LIEBCyJZ9AtvoZIwbd8gbpIwbY4W0IEBAdcAgQEB1wCBAQHXAFUgbBNvA+JulDBwUwDgLIEBCyJZ9AtvoZIwbd8gbpIwbY4W0IEBAdcAgQEB1wCBAQHXAFUgbBNvA+IgbvLQgG8jWywRExEVERMREhEUERIREREVERGnAvwREBEUERAPERUPDhEUDg0RFQ0MERQMCxEVCwoRFAoJERUJCBEUCAcRFQcGERQGBREVBQQRFAQDERUDAhEUAgERFQERFNs8AhEVAgERFAERExEVERMREhEUERIRERETEREREBESERAPEREPDhEQDhDfEM4QvRCsEJsQihB5EGioqwL0LIEBCyJZ9AtvoZIwbd8gbpIwbY4W0IEBAdcAgQEB1wCBAQHXAFUgbBNvA+JukjBw4BESERMREhERERMREREQERMREA8REw8OERMODRETDQwREwwLERMLChETCgkREwkREwgHBlVAVhPbPIEBCy0CERZZ9AtvoZIwbd+pqgDKLIEBCyJZ9AtvoZIwbd8gbpIwbY4W0IEBAdcAgQEB1wCBAQHXAFUgbBNvA+JukjBw4IEBCy0CWfQLb6GSMG3fIG6SMG2OFtCBAQHXAIEBAdcAgQEB1wBVIGwTbwPiIG7y0IBvI1sA/iBukjBtjhbQgQEB1wCBAQHXAIEBAdcAVSBsE28D4iBu8tCAbyMwMVKwoSDCAI45AREUAahWE6kEERIRExESEREREhERERAREREQDxEQDxDvEN4QzRC8EKsQmhCJEHgQZxBWEEUQNEEw4DBXExERERIREREQEREREA8REA9VDnAAEBBXEEYQNRA0AgEgrbECf7+SDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjbPBESERMREhERERIREREQEREREA8REA9VDts8VxBfD2wxjMrgEE2zyvAYbbPHBZyHABywFzAcsBcAHLABLMzMn5AMhyAcsBcAHLABLKB8v/ydAg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIsAEO+EP4KBLbPLQCF7mds82zxXEF8PbDGMzUAhWvFu2ebZ42erYiwMyzASL4Q/goUoDbPDBUYZBSkFYSAbQA1gLQ9AQwbQGBNI4BgBD0D2+h8uCHAYE0jiICgBD0F8gByPQAyQHMcAHKAEADWSDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFgEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxbJAgEgtrgCGbEjNs82zxXEF8PbDGDMtwACLQIBWLm7Ahip9ts82zxXEF8PbDHMugAEVhICGKj62zzbPFcQXw9sMcy8AAIiAgEgvsUCASC/wwIBYsDCAhelLbZ5tniuIL4e2GPMwQACJQAPpX3aiaGkAAMCGbP9ts82zxXEF8PbDGDMxAACIAIBIMbLAgFYx8kCGKrb2zzbPFcQXw9sMczIAAIkAhipPts82zxXEF8PbDHMygACKgIZsqy2zzbPFcQXw9sMYMzcA2ztRNDUAfhj0gABjpbbPFcTEREREhERERAREREQDxEQD1UO4Pgo1wsKgwm68uCJ2zwH0VUF2zzNz9AB9vpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgBgQEB1wD6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIAdQB0PpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgB1IEBAdcAgQEB1wD0BNQw0IEBAc4A+tcAgQEB1wCBAQHXANIA1DDQ+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiAGBAQHXAIEBAdcA9ATUMNCBAQHXAPpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgBgQEB1wAwERARExEQERAREhEQERAREREQAPT6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIAfpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgB+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiAHUAdCBAQHXAIEBAdcAgQEB1wDUMBBHEEYQRQHybW2CAISfU1S78vRUeGf4QnAgfyH4I1MRjQhgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEggkxLQBUfFstVhNWFypWFVR7j1YRVhVWHlYQVhxWIFYSVhoREhEfERIREREYEREREBEeERAPER0PDhEiDtECyA0RJQ0MERcMCxEhCwoRFgoJERMJCBEaCAcRGQcGERwGBREkBQQRFQQDESADAhEjAgERFAERG9s8VxBfD2wxDREUDQYREwYMERIMCxERCxBvEF4QbRBMGxCKEHkQRxA2RAQDERba0gL+JYEBASNZ9A1voZIwbd8gbpIwbZ3Q9ASBAQHXAFlsEm8C4iBu4wAgbvLQgG8igQELUAN/cSFulVtZ9FkwmMgBzwBBM/RB4oEBAQLIWQL0AIEBAc8AyRA2EiBulTBZ9FowlEEz9BXiA1YSVhJWElYSVhJWElYSVhJWElYSVhJWEtnTAvxWElYSVhJWElYSVhJWEhESESUREhERESQREREQESMREA8RIg8OESEODREgDQwRHwwLER4LChEdCgkRHAkIERsIBxEaBwYRGQYFERgFBBEXBAMRFgMCERUCAREUARET2zxXEF8PbDERExEUERMREhETERIRERESEREREBERERDU1QBEgvDvME++qxP+a+Fg14X87KpWIMhG561pfikVv+BhL6nLZwL+DxEQD1UOERUlgQEBI1n0DW+hkjBt3yBukjBtndD0BIEBAdcAWWwSbwLiIG7jACBu8tCAbyKBAQtQA39xIW6VW1n0WTCYyAHPAEEz9EHigQEBAshZAvQAgQEBzwDJEDYSIG6VMFn0WjCUQTP0FeIDVhJWElYSVhJWElYSVhJWEtnWAvRWElYSVhJWElYSVhJWElYSVhJWElYSERIRJRESERERJBERERARIxEQDxEiDw4RIQ4NESANDBEfDAsRHgsKER0KCREcCQgRGwgHERoHBhEZBgURGAUEERcEAxEWAwIRFQIBERQBERPbPFcQXw9sMRETERQRExESERMREtfYAESC8FJIIca2yaF+viaZY+A9GeQzaQ2YlQc6rUPMxrV04vGhAfIRERESEREREBERERAPERAPVQ4lgQEBI1n0DW+hkjBt3yBukjBtndD0BIEBAdcAWWwSbwLiIG7jACBu8tCAbyKBAQtQA39xIW6VW1n0WTCYyAHPAEEz9EHigQEBAshZAvQAgQEBzwDJEDYSIG6VMFn0WjCUQTP0FeID2QLsMG2BAQsif3EhbpVbWfRZMJjIAc8AQTP0QeIREhEVERIREREUEREREBETERAPERUPDhEUDg0REw0MERUMCxEUCwoREwoJERUJCBEUCAcREwcGERUGBREUBQQREwQDERUDAhEUAgEREwERFds8AREWAW8CgQEBIdrbAESC8INdbciLcIvGRtbbgshT70GC+rvUqN5ZwhPytas659m+AMIgbpIwbY4SIG7y0IBvIshZAvQAgQEBzwDJ4hAlVhYBIG6VMFn0WjCUQTP0FeIREhEVERIREREUEREREBETERAPERIPDhERDg0REA0QzxC+EK0QnBCLEHoQaRBYEEdFFlBDAARWEW47ppg=');
    let builder = beginCell();
    builder.storeRef(__system);
    builder.storeUint(0, 1);
    initTonLP_init_args({ $$type: 'TonLP_init_args', admin, cfo, bridge, decimals, protocolFee, tokenFee, content })(builder);
    const __data = builder.endCell();
    return { code: __code, data: __data };
}

const TonLP_errors: { [key: number]: { message: string } } = {
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
    35821: { message: `Deposit: Value < amount + gas` },
    36999: { message: `Insufficient staker's balance to withdraw the amount.` },
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

const TonLP_types: ABIType[] = [
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
    {"name":"Deposit","header":2548914161,"fields":[{"name":"amount","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"forward_payload","type":{"kind":"simple","type":"slice","optional":false,"format":"remainder"}}]},
    {"name":"TonLP$Data","header":null,"fields":[{"name":"admin","type":{"kind":"simple","type":"address","optional":false}},{"name":"available_underlying","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"bridge","type":{"kind":"simple","type":"address","optional":false}},{"name":"cfo","type":{"kind":"simple","type":"address","optional":false}},{"name":"content","type":{"kind":"simple","type":"cell","optional":false}},{"name":"decimals","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"deployed","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"deposits","type":{"kind":"dict","key":"address","value":"Position","valueFormat":"ref"}},{"name":"fee_growth_global","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"gas_cost","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"query_id","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"mintable","type":{"kind":"simple","type":"bool","optional":false}},{"name":"owner","type":{"kind":"simple","type":"address","optional":false}},{"name":"protocolFee","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"protocol_fee_amount","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"roles","type":{"kind":"dict","key":"int","value":"RoleData","valueFormat":"ref"}},{"name":"tokenFee","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"token_wallet","type":{"kind":"simple","type":"address","optional":false}},{"name":"total_supply","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
]

const TonLP_getters: ABIGetter[] = [
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

export const TonLP_getterMapping: { [key: string]: string } = {
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

const TonLP_receivers: ABIReceiver[] = [
    {"receiver":"internal","message":{"kind":"empty"}},
    {"receiver":"internal","message":{"kind":"typed","type":"Deposit"}},
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
    {"receiver":"internal","message":{"kind":"typed","type":"TokenUpdateContent"}},
    {"receiver":"internal","message":{"kind":"typed","type":"ProvideWalletAddress"}},
    {"receiver":"internal","message":{"kind":"typed","type":"GrantRole"}},
    {"receiver":"internal","message":{"kind":"typed","type":"RevokeRole"}},
    {"receiver":"internal","message":{"kind":"typed","type":"RenounceRole"}},
    {"receiver":"internal","message":{"kind":"typed","type":"UpdateRoleAdmin"}},
]

export class TonLP implements Contract {
    
    static async init(admin: Address, cfo: Address, bridge: Address, decimals: bigint, protocolFee: bigint, tokenFee: bigint, content: Cell) {
        return await TonLP_init(admin, cfo, bridge, decimals, protocolFee, tokenFee, content);
    }
    
    static async fromInit(admin: Address, cfo: Address, bridge: Address, decimals: bigint, protocolFee: bigint, tokenFee: bigint, content: Cell) {
        const init = await TonLP_init(admin, cfo, bridge, decimals, protocolFee, tokenFee, content);
        const address = contractAddress(0, init);
        return new TonLP(address, init);
    }
    
    static fromAddress(address: Address) {
        return new TonLP(address);
    }
    
    readonly address: Address; 
    readonly init?: { code: Cell, data: Cell };
    readonly abi: ContractABI = {
        types:  TonLP_types,
        getters: TonLP_getters,
        receivers: TonLP_receivers,
        errors: TonLP_errors,
    };
    
    private constructor(address: Address, init?: { code: Cell, data: Cell }) {
        this.address = address;
        this.init = init;
    }
    
    async send(provider: ContractProvider, via: Sender, args: { value: bigint, bounce?: boolean| null | undefined }, message: null | Deposit | ReleaseTokens | TokenBurnNotification | WithdrawRewards | UpdateDeposits | Withdraw | SetAdmin | SetCFO | SetBridge | SetWalletAddress | UpdateFees | UpdateGasCost | Deploy | TokenUpdateContent | ProvideWalletAddress | GrantRole | RevokeRole | RenounceRole | UpdateRoleAdmin) {
        
        let body: Cell | null = null;
        if (message === null) {
            body = new Cell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'Deposit') {
            body = beginCell().store(storeDeposit(message)).endCell();
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