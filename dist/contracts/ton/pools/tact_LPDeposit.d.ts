import { Cell, Slice, Address, Builder, Dictionary, ContractProvider, Sender, Contract, ContractABI } from "@ton/core";
export type StateInit = {
    $$type: "StateInit";
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
    $$type: "Context";
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
    $$type: "SendParameters";
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
    $$type: "Deploy";
    queryId: bigint;
};
export declare function storeDeploy(src: Deploy): (builder: Builder) => void;
export declare function loadDeploy(slice: Slice): {
    $$type: "Deploy";
    queryId: bigint;
};
export type DeployOk = {
    $$type: "DeployOk";
    queryId: bigint;
};
export declare function storeDeployOk(src: DeployOk): (builder: Builder) => void;
export declare function loadDeployOk(slice: Slice): {
    $$type: "DeployOk";
    queryId: bigint;
};
export type FactoryDeploy = {
    $$type: "FactoryDeploy";
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
    $$type: "JettonData";
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
    $$type: "JettonMint";
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
    $$type: "JettonTransfer";
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
    $$type: "JettonTransferNotification";
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
    $$type: "JettonBurn";
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
    $$type: "JettonExcesses";
    query_id: bigint;
};
export declare function storeJettonExcesses(src: JettonExcesses): (builder: Builder) => void;
export declare function loadJettonExcesses(slice: Slice): {
    $$type: "JettonExcesses";
    query_id: bigint;
};
export type JettonInternalTransfer = {
    $$type: "JettonInternalTransfer";
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
    $$type: "JettonBurnNotification";
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
    $$type: "WalletData";
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
    $$type: "GrantRole";
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
    $$type: "RevokeRole";
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
    $$type: "RenounceRole";
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
    $$type: "UpdateRoleAdmin";
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
    $$type: "RoleData";
    roles: Dictionary<Address, boolean>;
    admin_role: bigint;
};
export declare function storeRoleData(src: RoleData): (builder: Builder) => void;
export declare function loadRoleData(slice: Slice): {
    $$type: "RoleData";
    roles: Dictionary<Address, boolean>;
    admin_role: bigint;
};
export type WithdrawTokens = {
    $$type: "WithdrawTokens";
    amount: bigint;
};
export declare function storeWithdrawTokens(src: WithdrawTokens): (builder: Builder) => void;
export declare function loadWithdrawTokens(slice: Slice): {
    $$type: "WithdrawTokens";
    amount: bigint;
};
export type InternalWithdrawTokens = {
    $$type: "InternalWithdrawTokens";
    amount: bigint;
    to: Address;
};
export declare function storeInternalWithdrawTokens(src: InternalWithdrawTokens): (builder: Builder) => void;
export declare function loadInternalWithdrawTokens(slice: Slice): {
    $$type: "InternalWithdrawTokens";
    amount: bigint;
    to: Address;
};
export type SetPosition = {
    $$type: "SetPosition";
    lastInternalFeeGrowth: bigint;
    amount: bigint;
};
export declare function storeSetPosition(src: SetPosition): (builder: Builder) => void;
export declare function loadSetPosition(slice: Slice): {
    $$type: "SetPosition";
    lastInternalFeeGrowth: bigint;
    amount: bigint;
};
export type Withdraw = {
    $$type: "Withdraw";
    lastInternalFeeGrowth: bigint;
    amount: bigint;
    address: Address;
};
export declare function storeWithdraw(src: Withdraw): (builder: Builder) => void;
export declare function loadWithdraw(slice: Slice): {
    $$type: "Withdraw";
    lastInternalFeeGrowth: bigint;
    amount: bigint;
    address: Address;
};
export type ReleaseTokens = {
    $$type: "ReleaseTokens";
    to: Address;
    amount: bigint;
};
export declare function storeReleaseTokens(src: ReleaseTokens): (builder: Builder) => void;
export declare function loadReleaseTokens(slice: Slice): {
    $$type: "ReleaseTokens";
    to: Address;
    amount: bigint;
};
export type Staked = {
    $$type: "Staked";
    amount: bigint;
    staker: Address;
};
export declare function storeStaked(src: Staked): (builder: Builder) => void;
export declare function loadStaked(slice: Slice): {
    $$type: "Staked";
    amount: bigint;
    staker: Address;
};
export type SetWalletAddress = {
    $$type: "SetWalletAddress";
    token_wallet: Address;
};
export declare function storeSetWalletAddress(src: SetWalletAddress): (builder: Builder) => void;
export declare function loadSetWalletAddress(slice: Slice): {
    $$type: "SetWalletAddress";
    token_wallet: Address;
};
export type PoolPayload = {
    $$type: "PoolPayload";
    mode: bigint;
};
export declare function storePoolPayload(src: PoolPayload): (builder: Builder) => void;
export declare function loadPoolPayload(slice: Slice): {
    $$type: "PoolPayload";
    mode: bigint;
};
export type Position = {
    $$type: "Position";
    lastInternalFeeGrowth: bigint;
    rewards: bigint;
};
export declare function storePosition(src: Position): (builder: Builder) => void;
export declare function loadPosition(slice: Slice): {
    $$type: "Position";
    lastInternalFeeGrowth: bigint;
    rewards: bigint;
};
export type RewardSplit = {
    $$type: "RewardSplit";
    protocolFeeShare: bigint;
    lpProvidersShare: bigint;
};
export declare function storeRewardSplit(src: RewardSplit): (builder: Builder) => void;
export declare function loadRewardSplit(slice: Slice): {
    $$type: "RewardSplit";
    protocolFeeShare: bigint;
    lpProvidersShare: bigint;
};
export declare class LPDeposit implements Contract {
    static init(master: Address, owner: Address): Promise<{
        code: Cell;
        data: Cell;
    }>;
    static fromInit(master: Address, owner: Address): Promise<LPDeposit>;
    static fromAddress(address: Address): LPDeposit;
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
    }, message: SetPosition | "WithdrawFees" | WithdrawTokens | JettonExcesses | Deploy): Promise<void>;
    getAmount(provider: ContractProvider): Promise<bigint>;
    getLastInternalFeeGrowth(provider: ContractProvider): Promise<bigint>;
    getMaster(provider: ContractProvider): Promise<Address>;
    getOwner(provider: ContractProvider): Promise<Address>;
}
//# sourceMappingURL=tact_LPDeposit.d.ts.map