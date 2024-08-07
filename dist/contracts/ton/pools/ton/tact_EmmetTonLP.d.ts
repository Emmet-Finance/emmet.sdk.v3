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
export type Context = {
    $$type: 'Context';
    bounced: boolean;
    sender: Address;
    value: bigint;
    raw: Cell;
};
export declare function storeContext(src: Context): (builder: Builder) => void;
export declare function loadContext(slice: Slice): {
    $$type: "Context";
    bounced: boolean;
    sender: Address;
    value: bigint;
    raw: Cell;
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
export type JettonData = {
    $$type: 'JettonData';
    total_supply: bigint;
    mintable: boolean;
    admin_address: Address;
    jetton_content: Cell;
    jetton_wallet_code: Cell;
};
export declare function storeJettonData(src: JettonData): (builder: Builder) => void;
export declare function loadJettonData(slice: Slice): {
    $$type: "JettonData";
    total_supply: bigint;
    mintable: boolean;
    admin_address: Address;
    jetton_content: Cell;
    jetton_wallet_code: Cell;
};
export type JettonMint = {
    $$type: 'JettonMint';
    origin: Address;
    receiver: Address;
    amount: bigint;
    custom_payload: Cell | null;
    forward_ton_amount: bigint;
    forward_payload: Cell;
};
export declare function storeJettonMint(src: JettonMint): (builder: Builder) => void;
export declare function loadJettonMint(slice: Slice): {
    $$type: "JettonMint";
    origin: Address;
    receiver: Address;
    amount: bigint;
    custom_payload: Cell | null;
    forward_ton_amount: bigint;
    forward_payload: Cell;
};
export type JettonTransfer = {
    $$type: 'JettonTransfer';
    query_id: bigint;
    amount: bigint;
    destination: Address;
    response_destination: Address;
    custom_payload: Cell | null;
    forward_ton_amount: bigint;
    forward_payload: Cell;
};
export declare function storeJettonTransfer(src: JettonTransfer): (builder: Builder) => void;
export declare function loadJettonTransfer(slice: Slice): {
    $$type: "JettonTransfer";
    query_id: bigint;
    amount: bigint;
    destination: Address;
    response_destination: Address;
    custom_payload: Cell | null;
    forward_ton_amount: bigint;
    forward_payload: Cell;
};
export type JettonTransferNotification = {
    $$type: 'JettonTransferNotification';
    query_id: bigint;
    amount: bigint;
    sender: Address;
    forward_payload: Cell;
};
export declare function storeJettonTransferNotification(src: JettonTransferNotification): (builder: Builder) => void;
export declare function loadJettonTransferNotification(slice: Slice): {
    $$type: "JettonTransferNotification";
    query_id: bigint;
    amount: bigint;
    sender: Address;
    forward_payload: Cell;
};
export type JettonBurn = {
    $$type: 'JettonBurn';
    query_id: bigint;
    amount: bigint;
    response_destination: Address;
    custom_payload: Cell | null;
    forward_ton_amount: bigint;
    forward_payload: Cell;
};
export declare function storeJettonBurn(src: JettonBurn): (builder: Builder) => void;
export declare function loadJettonBurn(slice: Slice): {
    $$type: "JettonBurn";
    query_id: bigint;
    amount: bigint;
    response_destination: Address;
    custom_payload: Cell | null;
    forward_ton_amount: bigint;
    forward_payload: Cell;
};
export type JettonExcesses = {
    $$type: 'JettonExcesses';
    query_id: bigint;
};
export declare function storeJettonExcesses(src: JettonExcesses): (builder: Builder) => void;
export declare function loadJettonExcesses(slice: Slice): {
    $$type: "JettonExcesses";
    query_id: bigint;
};
export type JettonInternalTransfer = {
    $$type: 'JettonInternalTransfer';
    query_id: bigint;
    amount: bigint;
    from: Address;
    response_address: Address;
    forward_ton_amount: bigint;
    forward_payload: Cell;
};
export declare function storeJettonInternalTransfer(src: JettonInternalTransfer): (builder: Builder) => void;
export declare function loadJettonInternalTransfer(slice: Slice): {
    $$type: "JettonInternalTransfer";
    query_id: bigint;
    amount: bigint;
    from: Address;
    response_address: Address;
    forward_ton_amount: bigint;
    forward_payload: Cell;
};
export type JettonBurnNotification = {
    $$type: 'JettonBurnNotification';
    query_id: bigint;
    amount: bigint;
    sender: Address;
    response_destination: Address;
    forward_ton_amount: bigint;
    forward_payload: Cell;
};
export declare function storeJettonBurnNotification(src: JettonBurnNotification): (builder: Builder) => void;
export declare function loadJettonBurnNotification(slice: Slice): {
    $$type: "JettonBurnNotification";
    query_id: bigint;
    amount: bigint;
    sender: Address;
    response_destination: Address;
    forward_ton_amount: bigint;
    forward_payload: Cell;
};
export type WalletData = {
    $$type: 'WalletData';
    balance: bigint;
    owner: Address;
    jetton: Address;
    jetton_wallet_code: Cell;
};
export declare function storeWalletData(src: WalletData): (builder: Builder) => void;
export declare function loadWalletData(slice: Slice): {
    $$type: "WalletData";
    balance: bigint;
    owner: Address;
    jetton: Address;
    jetton_wallet_code: Cell;
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
export type Withdraw = {
    $$type: 'Withdraw';
    rewards: bigint;
    address: Address;
};
export declare function storeWithdraw(src: Withdraw): (builder: Builder) => void;
export declare function loadWithdraw(slice: Slice): {
    $$type: "Withdraw";
    rewards: bigint;
    address: Address;
};
export type ReleaseTokens = {
    $$type: 'ReleaseTokens';
    to: Address;
    amount: bigint;
};
export declare function storeReleaseTokens(src: ReleaseTokens): (builder: Builder) => void;
export declare function loadReleaseTokens(slice: Slice): {
    $$type: "ReleaseTokens";
    to: Address;
    amount: bigint;
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
export type Deposit = {
    $$type: 'Deposit';
    amount: bigint;
};
export declare function storeDeposit(src: Deposit): (builder: Builder) => void;
export declare function loadDeposit(slice: Slice): {
    $$type: "Deposit";
    amount: bigint;
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
export type TokenTransfer = {
    $$type: 'TokenTransfer';
    query_id: bigint;
    amount: bigint;
    sender: Address;
    response_destination: Address | null;
    custom_payload: Cell | null;
    forward_ton_amount: bigint;
    forward_payload: Cell;
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
    forward_payload: Cell;
};
export type UpdateDeposit = {
    $$type: 'UpdateDeposit';
    feeGrowthGlobal: bigint;
    new_total_supply: bigint;
};
export declare function storeUpdateDeposit(src: UpdateDeposit): (builder: Builder) => void;
export declare function loadUpdateDeposit(slice: Slice): {
    $$type: "UpdateDeposit";
    feeGrowthGlobal: bigint;
    new_total_supply: bigint;
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
export type Withdrawn = {
    $$type: 'Withdrawn';
    user: Address;
    amount: bigint;
};
export declare function storeWithdrawn(src: Withdrawn): (builder: Builder) => void;
export declare function loadWithdrawn(slice: Slice): {
    $$type: "Withdrawn";
    user: Address;
    amount: bigint;
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
export declare class EmmetTonLP implements Contract {
    static init(admin: Address, owner: Address, bridge: Address, decimals: bigint, protocolFee: bigint, tokenFee: bigint, jetton_content: Cell): Promise<{
        code: Cell;
        data: Cell;
    }>;
    static fromInit(admin: Address, owner: Address, bridge: Address, decimals: bigint, protocolFee: bigint, tokenFee: bigint, jetton_content: Cell): Promise<EmmetTonLP>;
    static fromAddress(address: Address): EmmetTonLP;
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
    }, message: Deposit | Boost | ReleaseTokens | null | JettonExcesses | InternalWithdrawFee | Deploy | JettonBurnNotification | JettonMint | GrantRole | RevokeRole | RenounceRole | UpdateRoleAdmin): Promise<void>;
    getFeeGrowthGlobal(provider: ContractProvider): Promise<bigint>;
    getProtocolFeeAmount(provider: ContractProvider): Promise<bigint>;
    getCurrentApy(provider: ContractProvider): Promise<bigint>;
    getRewards(provider: ContractProvider, lastInternalFeeGrowth: bigint, balance: bigint): Promise<bigint>;
    getBridgeRoleId(provider: ContractProvider): Promise<bigint>;
    getProtocolFee(provider: ContractProvider): Promise<bigint>;
    getTokenFee(provider: ContractProvider): Promise<bigint>;
    getDecimals(provider: ContractProvider): Promise<bigint>;
    getGetJettonData(provider: ContractProvider): Promise<{
        $$type: "JettonData";
        total_supply: bigint;
        mintable: boolean;
        admin_address: Address;
        jetton_content: Cell;
        jetton_wallet_code: Cell;
    }>;
    getGetWalletAddress(provider: ContractProvider, owner_address: Address): Promise<Address>;
    getHasRole(provider: ContractProvider, address: Address, role_id: bigint): Promise<boolean>;
    getRoleAdmin(provider: ContractProvider, role_id: bigint): Promise<bigint>;
    getAdminRoleId(provider: ContractProvider): Promise<bigint>;
}
//# sourceMappingURL=tact_EmmetTonLP.d.ts.map