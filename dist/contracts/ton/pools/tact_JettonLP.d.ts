import { Cell, Slice, Address, Builder, Dictionary, ContractProvider, Sender, Contract, ContractABI } from '@ton/core';
export type StateInit = {
    $$type: 'StateInit';
    code: Cell;
    data: Cell;
};
export declare function storeStateInit(src: StateInit): (builder: Builder) => void;
export declare function loadStateInit(slice: Slice): {
    $$type: "StateInit";
    code: Cell;
    data: Cell;
};
export type StdAddress = {
    $$type: 'StdAddress';
    workchain: bigint;
    address: bigint;
};
export declare function storeStdAddress(src: StdAddress): (builder: Builder) => void;
export declare function loadStdAddress(slice: Slice): {
    $$type: "StdAddress";
    workchain: bigint;
    address: bigint;
};
export type VarAddress = {
    $$type: 'VarAddress';
    workchain: bigint;
    address: Slice;
};
export declare function storeVarAddress(src: VarAddress): (builder: Builder) => void;
export declare function loadVarAddress(slice: Slice): {
    $$type: "VarAddress";
    workchain: bigint;
    address: Slice;
};
export type Context = {
    $$type: 'Context';
    bounced: boolean;
    sender: Address;
    value: bigint;
    raw: Slice;
};
export declare function storeContext(src: Context): (builder: Builder) => void;
export declare function loadContext(slice: Slice): {
    $$type: "Context";
    bounced: boolean;
    sender: Address;
    value: bigint;
    raw: Slice;
};
export type SendParameters = {
    $$type: 'SendParameters';
    bounce: boolean;
    to: Address;
    value: bigint;
    mode: bigint;
    body: Cell | null;
    code: Cell | null;
    data: Cell | null;
};
export declare function storeSendParameters(src: SendParameters): (builder: Builder) => void;
export declare function loadSendParameters(slice: Slice): {
    $$type: "SendParameters";
    bounce: boolean;
    to: Address;
    value: bigint;
    mode: bigint;
    body: Cell | null;
    code: Cell | null;
    data: Cell | null;
};
export type JettonData = {
    $$type: 'JettonData';
    total_supply: bigint;
    mintable: boolean;
    admin: Address;
    content: Cell;
    wallet_code: Cell;
};
export declare function storeJettonData(src: JettonData): (builder: Builder) => void;
export declare function loadJettonData(slice: Slice): {
    $$type: "JettonData";
    total_supply: bigint;
    mintable: boolean;
    admin: Address;
    content: Cell;
    wallet_code: Cell;
};
export type JettonWalletData = {
    $$type: 'JettonWalletData';
    balance: bigint;
    owner: Address;
    master: Address;
    code: Cell;
};
export declare function storeJettonWalletData(src: JettonWalletData): (builder: Builder) => void;
export declare function loadJettonWalletData(slice: Slice): {
    $$type: "JettonWalletData";
    balance: bigint;
    owner: Address;
    master: Address;
    code: Cell;
};
export type TokenTransfer = {
    $$type: 'TokenTransfer';
    query_id: bigint;
    amount: bigint;
    sender: Address;
    response_destination: Address | null;
    custom_payload: Cell | null;
    forward_ton_amount: bigint;
    forward_payload: Slice;
};
export declare function storeTokenTransfer(src: TokenTransfer): (builder: Builder) => void;
export declare function loadTokenTransfer(slice: Slice): {
    $$type: "TokenTransfer";
    query_id: bigint;
    amount: bigint;
    sender: Address;
    response_destination: Address | null;
    custom_payload: Cell | null;
    forward_ton_amount: bigint;
    forward_payload: Slice;
};
export type TokenTransferInternal = {
    $$type: 'TokenTransferInternal';
    query_id: bigint;
    amount: bigint;
    from: Address;
    response_destination: Address | null;
    forward_ton_amount: bigint;
    forward_payload: Slice;
};
export declare function storeTokenTransferInternal(src: TokenTransferInternal): (builder: Builder) => void;
export declare function loadTokenTransferInternal(slice: Slice): {
    $$type: "TokenTransferInternal";
    query_id: bigint;
    amount: bigint;
    from: Address;
    response_destination: Address | null;
    forward_ton_amount: bigint;
    forward_payload: Slice;
};
export type TokenNotification = {
    $$type: 'TokenNotification';
    query_id: bigint;
    amount: bigint;
    from: Address;
    forward_payload: Slice;
};
export declare function storeTokenNotification(src: TokenNotification): (builder: Builder) => void;
export declare function loadTokenNotification(slice: Slice): {
    $$type: "TokenNotification";
    query_id: bigint;
    amount: bigint;
    from: Address;
    forward_payload: Slice;
};
export type TokenBurn = {
    $$type: 'TokenBurn';
    query_id: bigint;
    amount: bigint;
    response_destination: Address | null;
    custom_payload: Cell | null;
};
export declare function storeTokenBurn(src: TokenBurn): (builder: Builder) => void;
export declare function loadTokenBurn(slice: Slice): {
    $$type: "TokenBurn";
    query_id: bigint;
    amount: bigint;
    response_destination: Address | null;
    custom_payload: Cell | null;
};
export type TokenBurnNotification = {
    $$type: 'TokenBurnNotification';
    query_id: bigint;
    amount: bigint;
    sender: Address;
    response_destination: Address | null;
};
export declare function storeTokenBurnNotification(src: TokenBurnNotification): (builder: Builder) => void;
export declare function loadTokenBurnNotification(slice: Slice): {
    $$type: "TokenBurnNotification";
    query_id: bigint;
    amount: bigint;
    sender: Address;
    response_destination: Address | null;
};
export type TokenExcesses = {
    $$type: 'TokenExcesses';
    query_id: bigint;
};
export declare function storeTokenExcesses(src: TokenExcesses): (builder: Builder) => void;
export declare function loadTokenExcesses(slice: Slice): {
    $$type: "TokenExcesses";
    query_id: bigint;
};
export type TokenUpdateContent = {
    $$type: 'TokenUpdateContent';
    content: Cell;
};
export declare function storeTokenUpdateContent(src: TokenUpdateContent): (builder: Builder) => void;
export declare function loadTokenUpdateContent(slice: Slice): {
    $$type: "TokenUpdateContent";
    content: Cell;
};
export type ProvideWalletAddress = {
    $$type: 'ProvideWalletAddress';
    query_id: bigint;
    owner_address: Address;
    include_address: boolean;
};
export declare function storeProvideWalletAddress(src: ProvideWalletAddress): (builder: Builder) => void;
export declare function loadProvideWalletAddress(slice: Slice): {
    $$type: "ProvideWalletAddress";
    query_id: bigint;
    owner_address: Address;
    include_address: boolean;
};
export type TakeWalletAddress = {
    $$type: 'TakeWalletAddress';
    query_id: bigint;
    wallet_address: Address;
    owner_address: Slice;
};
export declare function storeTakeWalletAddress(src: TakeWalletAddress): (builder: Builder) => void;
export declare function loadTakeWalletAddress(slice: Slice): {
    $$type: "TakeWalletAddress";
    query_id: bigint;
    wallet_address: Address;
    owner_address: Slice;
};
export type JettonMint = {
    $$type: 'JettonMint';
    origin: Address;
    receiver: Address;
    amount: bigint;
    custom_payload: Cell | null;
    forward_ton_amount: bigint;
    forward_payload: Slice;
};
export declare function storeJettonMint(src: JettonMint): (builder: Builder) => void;
export declare function loadJettonMint(slice: Slice): {
    $$type: "JettonMint";
    origin: Address;
    receiver: Address;
    amount: bigint;
    custom_payload: Cell | null;
    forward_ton_amount: bigint;
    forward_payload: Slice;
};
export type UpdateDeposits = {
    $$type: 'UpdateDeposits';
    amount: bigint;
    sender: Address;
    receiver: Address;
};
export declare function storeUpdateDeposits(src: UpdateDeposits): (builder: Builder) => void;
export declare function loadUpdateDeposits(slice: Slice): {
    $$type: "UpdateDeposits";
    amount: bigint;
    sender: Address;
    receiver: Address;
};
export type BridgeBoilerplate = {
    $$type: 'BridgeBoilerplate';
    amount: bigint;
    payload: Cell;
};
export declare function storeBridgeBoilerplate(src: BridgeBoilerplate): (builder: Builder) => void;
export declare function loadBridgeBoilerplate(slice: Slice): {
    $$type: "BridgeBoilerplate";
    amount: bigint;
    payload: Cell;
};
export type Boost = {
    $$type: 'Boost';
    amount: bigint;
};
export declare function storeBoost(src: Boost): (builder: Builder) => void;
export declare function loadBoost(slice: Slice): {
    $$type: "Boost";
    amount: bigint;
};
export type InternalWithdrawDeposit = {
    $$type: 'InternalWithdrawDeposit';
    amount: bigint;
    global_fee_growth: bigint;
    total_supply: bigint;
};
export declare function storeInternalWithdrawDeposit(src: InternalWithdrawDeposit): (builder: Builder) => void;
export declare function loadInternalWithdrawDeposit(slice: Slice): {
    $$type: "InternalWithdrawDeposit";
    amount: bigint;
    global_fee_growth: bigint;
    total_supply: bigint;
};
export type InternalWithdrawFee = {
    $$type: 'InternalWithdrawFee';
    lastFeeGrowth: bigint;
    owner: Address;
    balance: bigint;
};
export declare function storeInternalWithdrawFee(src: InternalWithdrawFee): (builder: Builder) => void;
export declare function loadInternalWithdrawFee(slice: Slice): {
    $$type: "InternalWithdrawFee";
    lastFeeGrowth: bigint;
    owner: Address;
    balance: bigint;
};
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
};
export declare function storeLPData(src: LPData): (builder: Builder) => void;
export declare function loadLPData(slice: Slice): {
    $$type: "LPData";
    apy: bigint;
    available_underlying: bigint;
    decimals: bigint;
    fee_growth_global: bigint;
    fee_decimals: bigint;
    protocol_fee: bigint;
    protocol_fee_amount: bigint;
    token_fee: bigint;
    total_supply: bigint;
};
export type ReleaseTokens = {
    $$type: 'ReleaseTokens';
    to: Address;
    amount: bigint;
    body: Cell | null;
};
export declare function storeReleaseTokens(src: ReleaseTokens): (builder: Builder) => void;
export declare function loadReleaseTokens(slice: Slice): {
    $$type: "ReleaseTokens";
    to: Address;
    amount: bigint;
    body: Cell | null;
};
export type PoolPayload = {
    $$type: 'PoolPayload';
    mode: bigint;
};
export declare function storePoolPayload(src: PoolPayload): (builder: Builder) => void;
export declare function loadPoolPayload(slice: Slice): {
    $$type: "PoolPayload";
    mode: bigint;
};
export type Position = {
    $$type: 'Position';
    balance: bigint;
    last_fee_growth: bigint;
    rewards: bigint;
};
export declare function storePosition(src: Position): (builder: Builder) => void;
export declare function loadPosition(slice: Slice): {
    $$type: "Position";
    balance: bigint;
    last_fee_growth: bigint;
    rewards: bigint;
};
export type CollectWithdrawData = {
    $$type: 'CollectWithdrawData';
    amount: bigint;
    wallet: Address;
};
export declare function storeCollectWithdrawData(src: CollectWithdrawData): (builder: Builder) => void;
export declare function loadCollectWithdrawData(slice: Slice): {
    $$type: "CollectWithdrawData";
    amount: bigint;
    wallet: Address;
};
export type RewardSplit = {
    $$type: 'RewardSplit';
    protocolFeeShare: bigint;
    lpProvidersShare: bigint;
};
export declare function storeRewardSplit(src: RewardSplit): (builder: Builder) => void;
export declare function loadRewardSplit(slice: Slice): {
    $$type: "RewardSplit";
    protocolFeeShare: bigint;
    lpProvidersShare: bigint;
};
export type SetAdmin = {
    $$type: 'SetAdmin';
    newAdmin: Address;
};
export declare function storeSetAdmin(src: SetAdmin): (builder: Builder) => void;
export declare function loadSetAdmin(slice: Slice): {
    $$type: "SetAdmin";
    newAdmin: Address;
};
export type SetBridge = {
    $$type: 'SetBridge';
    newBridge: Address;
};
export declare function storeSetBridge(src: SetBridge): (builder: Builder) => void;
export declare function loadSetBridge(slice: Slice): {
    $$type: "SetBridge";
    newBridge: Address;
};
export type SetCFO = {
    $$type: 'SetCFO';
    newCFO: Address;
};
export declare function storeSetCFO(src: SetCFO): (builder: Builder) => void;
export declare function loadSetCFO(slice: Slice): {
    $$type: "SetCFO";
    newCFO: Address;
};
export type SetWalletAddress = {
    $$type: 'SetWalletAddress';
    token_wallet: Address;
};
export declare function storeSetWalletAddress(src: SetWalletAddress): (builder: Builder) => void;
export declare function loadSetWalletAddress(slice: Slice): {
    $$type: "SetWalletAddress";
    token_wallet: Address;
};
export type UpdateFees = {
    $$type: 'UpdateFees';
    protocol_fee: bigint;
    token_fee: bigint;
};
export declare function storeUpdateFees(src: UpdateFees): (builder: Builder) => void;
export declare function loadUpdateFees(slice: Slice): {
    $$type: "UpdateFees";
    protocol_fee: bigint;
    token_fee: bigint;
};
export type UpdateGasCost = {
    $$type: 'UpdateGasCost';
    newGasCost: bigint;
};
export declare function storeUpdateGasCost(src: UpdateGasCost): (builder: Builder) => void;
export declare function loadUpdateGasCost(slice: Slice): {
    $$type: "UpdateGasCost";
    newGasCost: bigint;
};
export type Withdraw = {
    $$type: 'Withdraw';
    amount: bigint;
};
export declare function storeWithdraw(src: Withdraw): (builder: Builder) => void;
export declare function loadWithdraw(slice: Slice): {
    $$type: "Withdraw";
    amount: bigint;
};
export type WithdrawGas = {
    $$type: 'WithdrawGas';
    amount: bigint;
};
export declare function storeWithdrawGas(src: WithdrawGas): (builder: Builder) => void;
export declare function loadWithdrawGas(slice: Slice): {
    $$type: "WithdrawGas";
    amount: bigint;
};
export type WithdrawRewards = {
    $$type: 'WithdrawRewards';
};
export declare function storeWithdrawRewards(): (builder: Builder) => void;
export declare function loadWithdrawRewards(slice: Slice): {
    $$type: "WithdrawRewards";
};
export type WithdrawCallback = {
    $$type: 'WithdrawCallback';
    feeGrowthGlobal: bigint;
    rewards: bigint;
};
export declare function storeWithdrawCallback(src: WithdrawCallback): (builder: Builder) => void;
export declare function loadWithdrawCallback(slice: Slice): {
    $$type: "WithdrawCallback";
    feeGrowthGlobal: bigint;
    rewards: bigint;
};
export type WithdrawProtocolFee = {
    $$type: 'WithdrawProtocolFee';
};
export declare function storeWithdrawProtocolFee(): (builder: Builder) => void;
export declare function loadWithdrawProtocolFee(slice: Slice): {
    $$type: "WithdrawProtocolFee";
};
export type WithdrawStake = {
    $$type: 'WithdrawStake';
    amount: bigint;
};
export declare function storeWithdrawStake(src: WithdrawStake): (builder: Builder) => void;
export declare function loadWithdrawStake(slice: Slice): {
    $$type: "WithdrawStake";
    amount: bigint;
};
export type Staked = {
    $$type: 'Staked';
    amount: bigint;
    staker: Address;
};
export declare function storeStaked(src: Staked): (builder: Builder) => void;
export declare function loadStaked(slice: Slice): {
    $$type: "Staked";
    amount: bigint;
    staker: Address;
};
export type LPTransfer = {
    $$type: 'LPTransfer';
    amount: bigint;
    to: Address;
};
export declare function storeLPTransfer(src: LPTransfer): (builder: Builder) => void;
export declare function loadLPTransfer(slice: Slice): {
    $$type: "LPTransfer";
    amount: bigint;
    to: Address;
};
export type RewardsPaid = {
    $$type: 'RewardsPaid';
    user: Address;
    amount: bigint;
};
export declare function storeRewardsPaid(src: RewardsPaid): (builder: Builder) => void;
export declare function loadRewardsPaid(slice: Slice): {
    $$type: "RewardsPaid";
    user: Address;
    amount: bigint;
};
export type Withdrawn = {
    $$type: 'Withdrawn';
    stake: bigint;
    rewards: bigint;
    user: Address;
};
export declare function storeWithdrawn(src: Withdrawn): (builder: Builder) => void;
export declare function loadWithdrawn(slice: Slice): {
    $$type: "Withdrawn";
    stake: bigint;
    rewards: bigint;
    user: Address;
};
export type Deploy = {
    $$type: 'Deploy';
    queryId: bigint;
};
export declare function storeDeploy(src: Deploy): (builder: Builder) => void;
export declare function loadDeploy(slice: Slice): {
    $$type: "Deploy";
    queryId: bigint;
};
export type DeployOk = {
    $$type: 'DeployOk';
    queryId: bigint;
};
export declare function storeDeployOk(src: DeployOk): (builder: Builder) => void;
export declare function loadDeployOk(slice: Slice): {
    $$type: "DeployOk";
    queryId: bigint;
};
export type FactoryDeploy = {
    $$type: 'FactoryDeploy';
    queryId: bigint;
    cashback: Address;
};
export declare function storeFactoryDeploy(src: FactoryDeploy): (builder: Builder) => void;
export declare function loadFactoryDeploy(slice: Slice): {
    $$type: "FactoryDeploy";
    queryId: bigint;
    cashback: Address;
};
export type LPWallet$Data = {
    $$type: 'LPWallet$Data';
    balance: bigint;
    owner: Address;
    master: Address;
};
export declare function storeLPWallet$Data(src: LPWallet$Data): (builder: Builder) => void;
export declare function loadLPWallet$Data(slice: Slice): {
    $$type: "LPWallet$Data";
    balance: bigint;
    owner: Address;
    master: Address;
};
export type ChangeOwner = {
    $$type: 'ChangeOwner';
    queryId: bigint;
    newOwner: Address;
};
export declare function storeChangeOwner(src: ChangeOwner): (builder: Builder) => void;
export declare function loadChangeOwner(slice: Slice): {
    $$type: "ChangeOwner";
    queryId: bigint;
    newOwner: Address;
};
export type ChangeOwnerOk = {
    $$type: 'ChangeOwnerOk';
    queryId: bigint;
    newOwner: Address;
};
export declare function storeChangeOwnerOk(src: ChangeOwnerOk): (builder: Builder) => void;
export declare function loadChangeOwnerOk(slice: Slice): {
    $$type: "ChangeOwnerOk";
    queryId: bigint;
    newOwner: Address;
};
export type GrantRole = {
    $$type: 'GrantRole';
    to: Address;
    role_id: bigint;
};
export declare function storeGrantRole(src: GrantRole): (builder: Builder) => void;
export declare function loadGrantRole(slice: Slice): {
    $$type: "GrantRole";
    to: Address;
    role_id: bigint;
};
export type RenounceRole = {
    $$type: 'RenounceRole';
    role_id: bigint;
    address: Address;
};
export declare function storeRenounceRole(src: RenounceRole): (builder: Builder) => void;
export declare function loadRenounceRole(slice: Slice): {
    $$type: "RenounceRole";
    role_id: bigint;
    address: Address;
};
export type RevokeRole = {
    $$type: 'RevokeRole';
    to: Address;
    role_id: bigint;
};
export declare function storeRevokeRole(src: RevokeRole): (builder: Builder) => void;
export declare function loadRevokeRole(slice: Slice): {
    $$type: "RevokeRole";
    to: Address;
    role_id: bigint;
};
export type RoleData = {
    $$type: 'RoleData';
    roles: Dictionary<Address, boolean>;
    admin_role: bigint;
};
export declare function storeRoleData(src: RoleData): (builder: Builder) => void;
export declare function loadRoleData(slice: Slice): {
    $$type: "RoleData";
    roles: Dictionary<Address, boolean>;
    admin_role: bigint;
};
export type UpdateRoleAdmin = {
    $$type: 'UpdateRoleAdmin';
    role_id: bigint;
    role_admin: bigint;
};
export declare function storeUpdateRoleAdmin(src: UpdateRoleAdmin): (builder: Builder) => void;
export declare function loadUpdateRoleAdmin(slice: Slice): {
    $$type: "UpdateRoleAdmin";
    role_id: bigint;
    role_admin: bigint;
};
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
};
export declare function storeJettonLP$Data(src: JettonLP$Data): (builder: Builder) => void;
export declare function loadJettonLP$Data(slice: Slice): {
    $$type: "JettonLP$Data";
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
};
export declare const JettonLP_getterMapping: {
    [key: string]: string;
};
export declare class JettonLP implements Contract {
    static init(admin: Address, cfo: Address, bridge: Address, stake_token: Address, decimals: bigint, protocolFee: bigint, tokenFee: bigint, content: Cell): Promise<{
        code: Cell;
        data: Cell;
    }>;
    static fromInit(admin: Address, cfo: Address, bridge: Address, stake_token: Address, decimals: bigint, protocolFee: bigint, tokenFee: bigint, content: Cell): Promise<JettonLP>;
    static fromAddress(address: Address): JettonLP;
    readonly address: Address;
    readonly init?: {
        code: Cell;
        data: Cell;
    };
    readonly abi: ContractABI;
    private constructor();
    send(provider: ContractProvider, via: Sender, args: {
        value: bigint;
        bounce?: boolean | null | undefined;
    }, message: null | Boost | WithdrawGas | WithdrawProtocolFee | TokenNotification | ReleaseTokens | TokenBurnNotification | WithdrawRewards | TokenExcesses | UpdateDeposits | Withdraw | SetAdmin | SetCFO | SetBridge | SetWalletAddress | UpdateFees | UpdateGasCost | Deploy | TokenUpdateContent | ProvideWalletAddress | GrantRole | RevokeRole | RenounceRole | UpdateRoleAdmin): Promise<void>;
    getUnderlying(provider: ContractProvider): Promise<Address>;
    getCurrentApy(provider: ContractProvider): Promise<bigint>;
    getDecimals(provider: ContractProvider): Promise<bigint>;
    getFeeGrowthGlobal(provider: ContractProvider): Promise<bigint>;
    getGetAdmin(provider: ContractProvider): Promise<Address>;
    getGetAvailableUnderlying(provider: ContractProvider): Promise<bigint>;
    getGetCfo(provider: ContractProvider): Promise<Address>;
    getGetData(provider: ContractProvider): Promise<{
        $$type: "LPData";
        apy: bigint;
        available_underlying: bigint;
        decimals: bigint;
        fee_growth_global: bigint;
        fee_decimals: bigint;
        protocol_fee: bigint;
        protocol_fee_amount: bigint;
        token_fee: bigint;
        total_supply: bigint;
    }>;
    getGetQueryId(provider: ContractProvider): Promise<bigint>;
    getGetPosition(provider: ContractProvider, staker: Address): Promise<{
        $$type: "Position";
        balance: bigint;
        last_fee_growth: bigint;
        rewards: bigint;
    }>;
    getGetTotalSupply(provider: ContractProvider): Promise<bigint>;
    getGetUnderlyingWallet(provider: ContractProvider): Promise<Address>;
    getProtocolFee(provider: ContractProvider): Promise<bigint>;
    getProtocolFeeAmount(provider: ContractProvider): Promise<bigint>;
    getRewards(provider: ContractProvider, staker: Address): Promise<bigint>;
    getTokenFee(provider: ContractProvider): Promise<bigint>;
    getGetJettonData(provider: ContractProvider): Promise<{
        $$type: "JettonData";
        total_supply: bigint;
        mintable: boolean;
        admin: Address;
        content: Cell;
        wallet_code: Cell;
    }>;
    getGetWalletAddress(provider: ContractProvider, owner: Address): Promise<Address>;
    getOwner(provider: ContractProvider): Promise<Address>;
    getAdminRoleId(provider: ContractProvider): Promise<bigint>;
    getBridgeRoleId(provider: ContractProvider): Promise<bigint>;
    getCfoRoleId(provider: ContractProvider): Promise<bigint>;
    getHasRole(provider: ContractProvider, address: Address, role_id: bigint): Promise<boolean>;
    getRoleAdmin(provider: ContractProvider, role_id: bigint): Promise<bigint>;
}
//# sourceMappingURL=tact_JettonLP.d.ts.map