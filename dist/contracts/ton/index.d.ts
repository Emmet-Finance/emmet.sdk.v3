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
export type Installment = {
    $$type: 'Installment';
    from_chain: bigint;
    target_chain: bigint;
    amount: bigint;
    nonce: bigint;
    from_token: Cell;
    to_token: Cell;
    recipient: Address;
};
export declare function storeInstallment(src: Installment): (builder: Builder) => void;
export declare function loadInstallment(slice: Slice): {
    $$type: "Installment";
    from_chain: bigint;
    target_chain: bigint;
    amount: bigint;
    nonce: bigint;
    from_token: Cell;
    to_token: Cell;
    recipient: Address;
};
export type SignerAndSignature = {
    $$type: 'SignerAndSignature';
    signature: Slice;
    key: bigint;
};
export declare function storeSignerAndSignature(src: SignerAndSignature): (builder: Builder) => void;
export declare function loadSignerAndSignature(slice: Slice): {
    $$type: "SignerAndSignature";
    signature: Slice;
    key: bigint;
};
export type ReceiveInstallment = {
    $$type: 'ReceiveInstallment';
    installment: Installment;
    signatures: Dictionary<bigint, SignerAndSignature>;
    len: bigint;
    tx_hash: bigint;
    id: bigint;
};
export declare function storeReceiveInstallment(src: ReceiveInstallment): (builder: Builder) => void;
export declare function loadReceiveInstallment(slice: Slice): {
    $$type: "ReceiveInstallment";
    installment: {
        $$type: "Installment";
        from_chain: bigint;
        target_chain: bigint;
        amount: bigint;
        nonce: bigint;
        from_token: Cell;
        to_token: Cell;
        recipient: Address;
    };
    signatures: Dictionary<bigint, SignerAndSignature>;
    len: bigint;
    tx_hash: bigint;
    id: bigint;
};
export type FreezeTon = {
    $$type: 'FreezeTon';
    target_chain: bigint;
    to_token: Cell;
    to: Cell;
    from_token: Cell;
    amount: bigint;
};
export declare function storeFreezeTon(src: FreezeTon): (builder: Builder) => void;
export declare function loadFreezeTon(slice: Slice): {
    $$type: "FreezeTon";
    target_chain: bigint;
    to_token: Cell;
    to: Cell;
    from_token: Cell;
    amount: bigint;
};
export type OutgoingTransaction = {
    $$type: 'OutgoingTransaction';
    id: bigint;
    amount: bigint;
    from_token: Cell;
    to_token: Cell;
    to: Cell;
    target_chain_id: bigint;
};
export declare function storeOutgoingTransaction(src: OutgoingTransaction): (builder: Builder) => void;
export declare function loadOutgoingTransaction(slice: Slice): {
    $$type: "OutgoingTransaction";
    id: bigint;
    amount: bigint;
    from_token: Cell;
    to_token: Cell;
    to: Cell;
    target_chain_id: bigint;
};
export type IncomingTransaction = {
    $$type: 'IncomingTransaction';
    id: bigint;
    amount: bigint;
    from_token: Cell;
    to_token: Cell;
    target_chain_id: bigint;
    to: Address;
};
export declare function storeIncomingTransaction(src: IncomingTransaction): (builder: Builder) => void;
export declare function loadIncomingTransaction(slice: Slice): {
    $$type: "IncomingTransaction";
    id: bigint;
    amount: bigint;
    from_token: Cell;
    to_token: Cell;
    target_chain_id: bigint;
    to: Address;
};
export type InstallmentOut = {
    $$type: 'InstallmentOut';
    amount: bigint;
    to: string;
    target_chain: bigint;
    token_id: bigint;
};
export declare function storeInstallmentOut(src: InstallmentOut): (builder: Builder) => void;
export declare function loadInstallmentOut(slice: Slice): {
    $$type: "InstallmentOut";
    amount: bigint;
    to: string;
    target_chain: bigint;
    token_id: bigint;
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
export type JettonBurnNotification = {
    $$type: 'JettonBurnNotification';
    query_id: bigint;
    amount: bigint;
    sender: Address;
    response_destination: Address;
    forward_ton_amount: bigint;
    forward_payload: Slice;
};
export declare function storeJettonBurnNotification(src: JettonBurnNotification): (builder: Builder) => void;
export declare function loadJettonBurnNotification(slice: Slice): {
    $$type: "JettonBurnNotification";
    query_id: bigint;
    amount: bigint;
    sender: Address;
    response_destination: Address;
    forward_ton_amount: bigint;
    forward_payload: Slice;
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
export type JettonTransfer = {
    $$type: 'JettonTransfer';
    query_id: bigint;
    amount: bigint;
    destination: Address;
    response_destination: Address | null;
    custom_payload: Cell | null;
    forward_ton_amount: bigint;
    forward_payload: Cell | null;
};
export declare function storeJettonTransfer(src: JettonTransfer): (builder: Builder) => void;
export declare function loadJettonTransfer(slice: Slice): {
    $$type: "JettonTransfer";
    query_id: bigint;
    amount: bigint;
    destination: Address;
    response_destination: Address | null;
    custom_payload: Cell | null;
    forward_ton_amount: bigint;
    forward_payload: Cell | null;
};
export type TokenTransferNotification = {
    $$type: 'TokenTransferNotification';
    query_id: bigint;
    amount: bigint;
    sender: Address;
    forward_payload: Slice;
};
export declare function storeTokenTransferNotification(src: TokenTransferNotification): (builder: Builder) => void;
export declare function loadTokenTransferNotification(slice: Slice): {
    $$type: "TokenTransferNotification";
    query_id: bigint;
    amount: bigint;
    sender: Address;
    forward_payload: Slice;
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
export type StonfiSwap = {
    $$type: 'StonfiSwap';
    otherTokenWallet: Address;
    refundAddress: Address;
    excessesAddress: Address;
    deadline: bigint;
    additionalData: SwapAdditionalData;
};
export declare function storeStonfiSwap(src: StonfiSwap): (builder: Builder) => void;
export declare function loadStonfiSwap(slice: Slice): {
    $$type: "StonfiSwap";
    otherTokenWallet: Address;
    refundAddress: Address;
    excessesAddress: Address;
    deadline: bigint;
    additionalData: {
        $$type: "SwapAdditionalData";
        minOut: bigint;
        receiverAddress: Address;
        fwdGas: bigint;
        customPayload: Cell | null;
        refundFwdGas: bigint;
        refundPayload: Cell | null;
        refFee: bigint;
        referralAddress: Address | null;
    };
};
export type SwapAdditionalData = {
    $$type: 'SwapAdditionalData';
    minOut: bigint;
    receiverAddress: Address;
    fwdGas: bigint;
    customPayload: Cell | null;
    refundFwdGas: bigint;
    refundPayload: Cell | null;
    refFee: bigint;
    referralAddress: Address | null;
};
export declare function storeSwapAdditionalData(src: SwapAdditionalData): (builder: Builder) => void;
export declare function loadSwapAdditionalData(slice: Slice): {
    $$type: "SwapAdditionalData";
    minOut: bigint;
    receiverAddress: Address;
    fwdGas: bigint;
    customPayload: Cell | null;
    refundFwdGas: bigint;
    refundPayload: Cell | null;
    refFee: bigint;
    referralAddress: Address | null;
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
export type DeleteChain = {
    $$type: 'DeleteChain';
    chain_id: bigint;
};
export declare function storeDeleteChain(src: DeleteChain): (builder: Builder) => void;
export declare function loadDeleteChain(slice: Slice): {
    $$type: "DeleteChain";
    chain_id: bigint;
};
export type DeleteModule = {
    $$type: 'DeleteModule';
    step: bigint;
};
export declare function storeDeleteModule(src: DeleteModule): (builder: Builder) => void;
export declare function loadDeleteModule(slice: Slice): {
    $$type: "DeleteModule";
    step: bigint;
};
export type DeleteStategies = {
    $$type: 'DeleteStategies';
    chain_id: bigint;
    from_token: bigint;
    to_token: bigint;
};
export declare function storeDeleteStategies(src: DeleteStategies): (builder: Builder) => void;
export declare function loadDeleteStategies(slice: Slice): {
    $$type: "DeleteStategies";
    chain_id: bigint;
    from_token: bigint;
    to_token: bigint;
};
export type DeleteToken = {
    $$type: 'DeleteToken';
    symbol: string;
};
export declare function storeDeleteToken(src: DeleteToken): (builder: Builder) => void;
export declare function loadDeleteToken(slice: Slice): {
    $$type: "DeleteToken";
    symbol: string;
};
export type DeleteValidator = {
    $$type: 'DeleteValidator';
    candidate: Address;
};
export declare function storeDeleteValidator(src: DeleteValidator): (builder: Builder) => void;
export declare function loadDeleteValidator(slice: Slice): {
    $$type: "DeleteValidator";
    candidate: Address;
};
export type Pause = {
    $$type: 'Pause';
};
export declare function storePause(): (builder: Builder) => void;
export declare function loadPause(slice: Slice): {
    $$type: "Pause";
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
export type SetChain = {
    $$type: 'SetChain';
    name: string;
    chain_id: bigint;
};
export declare function storeSetChain(src: SetChain): (builder: Builder) => void;
export declare function loadSetChain(slice: Slice): {
    $$type: "SetChain";
    name: string;
    chain_id: bigint;
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
export type SetModule = {
    $$type: 'SetModule';
    step: bigint;
    module: Address;
};
export declare function storeSetModule(src: SetModule): (builder: Builder) => void;
export declare function loadSetModule(slice: Slice): {
    $$type: "SetModule";
    step: bigint;
    module: Address;
};
export type SetValidator = {
    $$type: 'SetValidator';
    candidate: Address;
};
export declare function storeSetValidator(src: SetValidator): (builder: Builder) => void;
export declare function loadSetValidator(slice: Slice): {
    $$type: "SetValidator";
    candidate: Address;
};
export type SetStrategies = {
    $$type: 'SetStrategies';
    chain_id: bigint;
    from_token: bigint;
    to_token: bigint;
    foreign: Steps;
    incomming: Steps;
    local: Steps;
};
export declare function storeSetStrategies(src: SetStrategies): (builder: Builder) => void;
export declare function loadSetStrategies(slice: Slice): {
    $$type: "SetStrategies";
    chain_id: bigint;
    from_token: bigint;
    to_token: bigint;
    foreign: {
        $$type: "Steps";
        path: Dictionary<bigint, bigint>;
        size: bigint;
    };
    incomming: {
        $$type: "Steps";
        path: Dictionary<bigint, bigint>;
        size: bigint;
    };
    local: {
        $$type: "Steps";
        path: Dictionary<bigint, bigint>;
        size: bigint;
    };
};
export type SetToken = {
    $$type: 'SetToken';
    address: Address;
    decimals: bigint;
    emmet_lp: Address;
    symbol: string;
    swap_pool: Address;
    swap_router: Address;
    wallet: Address;
};
export declare function storeSetToken(src: SetToken): (builder: Builder) => void;
export declare function loadSetToken(slice: Slice): {
    $$type: "SetToken";
    address: Address;
    decimals: bigint;
    emmet_lp: Address;
    symbol: string;
    swap_pool: Address;
    swap_router: Address;
    wallet: Address;
};
export type Unpause = {
    $$type: 'Unpause';
};
export declare function storeUnpause(): (builder: Builder) => void;
export declare function loadUnpause(slice: Slice): {
    $$type: "Unpause";
};
export type UpdateChainFee = {
    $$type: 'UpdateChainFee';
    chain_id: bigint;
    strategy_step: bigint;
    gas_amount: bigint;
};
export declare function storeUpdateChainFee(src: UpdateChainFee): (builder: Builder) => void;
export declare function loadUpdateChainFee(slice: Slice): {
    $$type: "UpdateChainFee";
    chain_id: bigint;
    strategy_step: bigint;
    gas_amount: bigint;
};
export type UpdateConsensusFee = {
    $$type: 'UpdateConsensusFee';
    amount: bigint;
};
export declare function storeUpdateConsensusFee(src: UpdateConsensusFee): (builder: Builder) => void;
export declare function loadUpdateConsensusFee(slice: Slice): {
    $$type: "UpdateConsensusFee";
    amount: bigint;
};
export type UpdateMinimumTxFee = {
    $$type: 'UpdateMinimumTxFee';
    amount: bigint;
};
export declare function storeUpdateMinimumTxFee(src: UpdateMinimumTxFee): (builder: Builder) => void;
export declare function loadUpdateMinimumTxFee(slice: Slice): {
    $$type: "UpdateMinimumTxFee";
    amount: bigint;
};
export type UpdateProtocolFee = {
    $$type: 'UpdateProtocolFee';
    amount: bigint;
};
export declare function storeUpdateProtocolFee(src: UpdateProtocolFee): (builder: Builder) => void;
export declare function loadUpdateProtocolFee(slice: Slice): {
    $$type: "UpdateProtocolFee";
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
export type Token = {
    $$type: 'Token';
    address: Address;
    decimals: bigint;
    emmet_lp: Address;
    symbol: string;
    swap_pool: Address;
    swap_router: Address;
    wallet: Address;
};
export declare function storeToken(src: Token): (builder: Builder) => void;
export declare function loadToken(slice: Slice): {
    $$type: "Token";
    address: Address;
    decimals: bigint;
    emmet_lp: Address;
    symbol: string;
    swap_pool: Address;
    swap_router: Address;
    wallet: Address;
};
export type Chain = {
    $$type: 'Chain';
    name: string;
    chain_id: bigint;
};
export declare function storeChain(src: Chain): (builder: Builder) => void;
export declare function loadChain(slice: Slice): {
    $$type: "Chain";
    name: string;
    chain_id: bigint;
};
export type ForeignFees = {
    $$type: 'ForeignFees';
    i: Dictionary<bigint, bigint>;
};
export declare function storeForeignFees(src: ForeignFees): (builder: Builder) => void;
export declare function loadForeignFees(slice: Slice): {
    $$type: "ForeignFees";
    i: Dictionary<bigint, bigint>;
};
export type Steps = {
    $$type: 'Steps';
    path: Dictionary<bigint, bigint>;
    size: bigint;
};
export declare function storeSteps(src: Steps): (builder: Builder) => void;
export declare function loadSteps(slice: Slice): {
    $$type: "Steps";
    path: Dictionary<bigint, bigint>;
    size: bigint;
};
export type Strategies = {
    $$type: 'Strategies';
    foreign: Steps;
    incomming: Steps;
    local: Steps;
};
export declare function storeStrategies(src: Strategies): (builder: Builder) => void;
export declare function loadStrategies(slice: Slice): {
    $$type: "Strategies";
    foreign: {
        $$type: "Steps";
        path: Dictionary<bigint, bigint>;
        size: bigint;
    };
    incomming: {
        $$type: "Steps";
        path: Dictionary<bigint, bigint>;
        size: bigint;
    };
    local: {
        $$type: "Steps";
        path: Dictionary<bigint, bigint>;
        size: bigint;
    };
};
export type ToTokenMap = {
    $$type: 'ToTokenMap';
    i: Dictionary<bigint, Strategies>;
};
export declare function storeToTokenMap(src: ToTokenMap): (builder: Builder) => void;
export declare function loadToTokenMap(slice: Slice): {
    $$type: "ToTokenMap";
    i: Dictionary<bigint, Strategies>;
};
export type FromTokenMap = {
    $$type: 'FromTokenMap';
    i: Dictionary<bigint, ToTokenMap>;
};
export declare function storeFromTokenMap(src: FromTokenMap): (builder: Builder) => void;
export declare function loadFromTokenMap(slice: Slice): {
    $$type: "FromTokenMap";
    i: Dictionary<bigint, ToTokenMap>;
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
export type EmmetBridge$Data = {
    $$type: 'EmmetBridge$Data';
    admin: Address;
    cfo: Address;
    chains: Dictionary<bigint, Chain>;
    chainId: bigint;
    consensus_fee: bigint;
    foreign_fees: Dictionary<bigint, ForeignFees>;
    incomming_txs: Dictionary<bigint, boolean>;
    locked: Dictionary<bigint, bigint>;
    min_tx_fee: bigint;
    modules: Dictionary<bigint, Address>;
    nonce: bigint;
    paused: boolean;
    protocol_fee: bigint;
    roles: Dictionary<bigint, RoleData>;
    token_strategies: Dictionary<bigint, FromTokenMap>;
    threshold: bigint;
    tokens: Dictionary<bigint, Token>;
    TVL: bigint;
    validators: Dictionary<bigint, Address>;
    validator_count: bigint;
};
export declare function storeEmmetBridge$Data(src: EmmetBridge$Data): (builder: Builder) => void;
export declare function loadEmmetBridge$Data(slice: Slice): {
    $$type: "EmmetBridge$Data";
    admin: Address;
    cfo: Address;
    chains: Dictionary<bigint, Chain>;
    chainId: bigint;
    consensus_fee: bigint;
    foreign_fees: Dictionary<bigint, ForeignFees>;
    incomming_txs: Dictionary<bigint, boolean>;
    locked: Dictionary<bigint, bigint>;
    min_tx_fee: bigint;
    modules: Dictionary<bigint, Address>;
    nonce: bigint;
    paused: boolean;
    protocol_fee: bigint;
    roles: Dictionary<bigint, RoleData>;
    token_strategies: Dictionary<bigint, FromTokenMap>;
    threshold: bigint;
    tokens: Dictionary<bigint, Token>;
    TVL: bigint;
    validators: Dictionary<bigint, Address>;
    validator_count: bigint;
};
export declare const EmmetBridge_getterMapping: {
    [key: string]: string;
};
export declare class EmmetBridge implements Contract {
    static init(admin: Address, cfo: Address, validator: Address): Promise<{
        code: Cell;
        data: Cell;
    }>;
    static fromInit(admin: Address, cfo: Address, validator: Address): Promise<EmmetBridge>;
    static fromAddress(address: Address): EmmetBridge;
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
    }, message: TokenExcesses | ReceiveInstallment | FreezeTon | JettonBurnNotification | TokenTransferNotification | null | DeleteChain | DeleteModule | DeleteStategies | DeleteToken | DeleteValidator | Pause | SetAdmin | SetChain | SetCFO | SetModule | SetStrategies | SetToken | SetValidator | Unpause | UpdateChainFee | UpdateConsensusFee | UpdateMinimumTxFee | UpdateProtocolFee | WithdrawGas | Deploy | GrantRole | RevokeRole | RenounceRole | UpdateRoleAdmin): Promise<void>;
    getEstimateFee(provider: ContractProvider, chain_id: bigint, from_token: bigint, to_token: bigint): Promise<bigint>;
    getGetAdmin(provider: ContractProvider): Promise<Address>;
    getGetCfo(provider: ContractProvider): Promise<Address>;
    getGetChain(provider: ContractProvider, chain_id: bigint): Promise<{
        $$type: "Chain";
        name: string;
        chain_id: bigint;
    }>;
    getGetMinTxFee(provider: ContractProvider): Promise<bigint>;
    getGetModule(provider: ContractProvider, step: bigint): Promise<Address>;
    getGetNonce(provider: ContractProvider): Promise<bigint>;
    getGetChainId(provider: ContractProvider): Promise<bigint>;
    getGetConsensusFee(provider: ContractProvider): Promise<bigint>;
    getGetLocked(provider: ContractProvider, token: bigint): Promise<bigint>;
    getGetPaused(provider: ContractProvider): Promise<boolean>;
    getGetProtocolFee(provider: ContractProvider): Promise<bigint>;
    getGetStepFee(provider: ContractProvider, chain_id: bigint, step: bigint): Promise<bigint>;
    getGetThreshold(provider: ContractProvider): Promise<bigint>;
    getGetToken(provider: ContractProvider, key: bigint): Promise<{
        $$type: "Token";
        address: Address;
        decimals: bigint;
        emmet_lp: Address;
        symbol: string;
        swap_pool: Address;
        swap_router: Address;
        wallet: Address;
    }>;
    getGetTvl(provider: ContractProvider): Promise<bigint>;
    getGetValidator(provider: ContractProvider, index: bigint): Promise<Address>;
    getGetValidatorCount(provider: ContractProvider): Promise<bigint>;
    getIsProcessed(provider: ContractProvider, hash: bigint): Promise<boolean>;
    getIsValidator(provider: ContractProvider, address: Address): Promise<boolean>;
    getAdminRoleId(provider: ContractProvider): Promise<bigint>;
    getBridgeRoleId(provider: ContractProvider): Promise<bigint>;
    getCfoRoleId(provider: ContractProvider): Promise<bigint>;
    getHasRole(provider: ContractProvider, address: Address, role_id: bigint): Promise<boolean>;
    getRoleAdmin(provider: ContractProvider, role_id: bigint): Promise<bigint>;
    getValidatorRoleId(provider: ContractProvider): Promise<bigint>;
    getGetForeignStrategies(provider: ContractProvider, chain_id: bigint, from_token: bigint, to_token: bigint): Promise<{
        $$type: "Steps";
        path: Dictionary<bigint, bigint>;
        size: bigint;
    }>;
    getGetIncomingStrategies(provider: ContractProvider, chain_id: bigint, from_token: bigint, to_token: bigint): Promise<{
        $$type: "Steps";
        path: Dictionary<bigint, bigint>;
        size: bigint;
    }>;
    getGetLocalStrategies(provider: ContractProvider, chain_id: bigint, from_token: bigint, to_token: bigint): Promise<{
        $$type: "Steps";
        path: Dictionary<bigint, bigint>;
        size: bigint;
    }>;
    getGetStrategies(provider: ContractProvider, chain_id: bigint, from_token: bigint, to_token: bigint): Promise<{
        $$type: "Strategies";
        foreign: {
            $$type: "Steps";
            path: Dictionary<bigint, bigint>;
            size: bigint;
        };
        incomming: {
            $$type: "Steps";
            path: Dictionary<bigint, bigint>;
            size: bigint;
        };
        local: {
            $$type: "Steps";
            path: Dictionary<bigint, bigint>;
            size: bigint;
        };
    }>;
}
//# sourceMappingURL=index.d.ts.map