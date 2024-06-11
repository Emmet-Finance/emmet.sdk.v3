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
export type UpdateAdmin = {
    $$type: 'UpdateAdmin';
    new_admin: Address;
};
export declare function storeUpdateAdmin(src: UpdateAdmin): (builder: Builder) => void;
export declare function loadUpdateAdmin(slice: Slice): {
    $$type: "UpdateAdmin";
    new_admin: Address;
};
export type UpdateOwner = {
    $$type: 'UpdateOwner';
    new_owner: Address;
};
export declare function storeUpdateOwner(src: UpdateOwner): (builder: Builder) => void;
export declare function loadUpdateOwner(slice: Slice): {
    $$type: "UpdateOwner";
    new_owner: Address;
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
    new_admin: Address;
};
export declare function storeUpdateRoleAdmin(src: UpdateRoleAdmin): (builder: Builder) => void;
export declare function loadUpdateRoleAdmin(slice: Slice): {
    $$type: "UpdateRoleAdmin";
    role_id: bigint;
    new_admin: Address;
};
export type RoleData = {
    $$type: 'RoleData';
    roles: Dictionary<Address, boolean>;
    admin_role: Address;
};
export declare function storeRoleData(src: RoleData): (builder: Builder) => void;
export declare function loadRoleData(slice: Slice): {
    $$type: "RoleData";
    roles: Dictionary<Address, boolean>;
    admin_role: Address;
};
export type TokenType = {
    $$type: 'TokenType';
    is_native_coin: boolean;
    is_native_token: boolean;
    is_wrapped_token: boolean;
};
export declare function storeTokenType(src: TokenType): (builder: Builder) => void;
export declare function loadTokenType(slice: Slice): {
    $$type: "TokenType";
    is_native_coin: boolean;
    is_native_token: boolean;
    is_wrapped_token: boolean;
};
export type SentInstallment = {
    $$type: 'SentInstallment';
    tx_hash: bigint;
};
export declare function storeSentInstallment(src: SentInstallment): (builder: Builder) => void;
export declare function loadSentInstallment(slice: Slice): {
    $$type: "SentInstallment";
    tx_hash: bigint;
};
export type ReceivedInstallment = {
    $$type: 'ReceivedInstallment';
    tx_hash: bigint;
};
export declare function storeReceivedInstallment(src: ReceivedInstallment): (builder: Builder) => void;
export declare function loadReceivedInstallment(slice: Slice): {
    $$type: "ReceivedInstallment";
    tx_hash: bigint;
};
export type Installment = {
    $$type: 'Installment';
    from_chain: bigint;
    target_chain: bigint;
    amount: bigint;
    from_token: Cell;
    to_token: Cell;
    recepient: Address;
};
export declare function storeInstallment(src: Installment): (builder: Builder) => void;
export declare function loadInstallment(slice: Slice): {
    $$type: "Installment";
    from_chain: bigint;
    target_chain: bigint;
    amount: bigint;
    from_token: Cell;
    to_token: Cell;
    recepient: Address;
};
export type SignerAndSignature = {
    $$type: 'SignerAndSignature';
    signature: Cell;
    key: bigint;
};
export declare function storeSignerAndSignature(src: SignerAndSignature): (builder: Builder) => void;
export declare function loadSignerAndSignature(slice: Slice): {
    $$type: "SignerAndSignature";
    signature: Cell;
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
        from_token: Cell;
        to_token: Cell;
        recepient: Address;
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
export type MapContract = {
    $$type: 'MapContract';
    token_id: bigint;
    token_symbol: string;
    contract: Address;
    decimals: bigint;
    fee: bigint;
    fee_decimals: bigint;
    swap_address: Address;
    token_bridge_wallet_address: Address;
};
export declare function storeMapContract(src: MapContract): (builder: Builder) => void;
export declare function loadMapContract(slice: Slice): {
    $$type: "MapContract";
    token_id: bigint;
    token_symbol: string;
    contract: Address;
    decimals: bigint;
    fee: bigint;
    fee_decimals: bigint;
    swap_address: Address;
    token_bridge_wallet_address: Address;
};
export type AddChain = {
    $$type: 'AddChain';
    chain_id: bigint;
    chain_name: string;
};
export declare function storeAddChain(src: AddChain): (builder: Builder) => void;
export declare function loadAddChain(slice: Slice): {
    $$type: "AddChain";
    chain_id: bigint;
    chain_name: string;
};
export type UpdateChain = {
    $$type: 'UpdateChain';
    chain_id: bigint;
    chain_name: string;
};
export declare function storeUpdateChain(src: UpdateChain): (builder: Builder) => void;
export declare function loadUpdateChain(slice: Slice): {
    $$type: "UpdateChain";
    chain_id: bigint;
    chain_name: string;
};
export type SetChainFee = {
    $$type: 'SetChainFee';
    chain_id: bigint;
    fee: bigint;
};
export declare function storeSetChainFee(src: SetChainFee): (builder: Builder) => void;
export declare function loadSetChainFee(slice: Slice): {
    $$type: "SetChainFee";
    chain_id: bigint;
    fee: bigint;
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
export type Token = {
    $$type: 'Token';
    symbol: string;
    address: Address;
    swap_address: Address;
    decimals: bigint;
    fee: bigint;
    fee_decimals: bigint;
    token_bridge_wallet_address: Address;
};
export declare function storeToken(src: Token): (builder: Builder) => void;
export declare function loadToken(slice: Slice): {
    $$type: "Token";
    symbol: string;
    address: Address;
    swap_address: Address;
    decimals: bigint;
    fee: bigint;
    fee_decimals: bigint;
    token_bridge_wallet_address: Address;
};
export type ChainName = {
    $$type: 'ChainName';
    name: string;
};
export declare function storeChainName(src: ChainName): (builder: Builder) => void;
export declare function loadChainName(slice: Slice): {
    $$type: "ChainName";
    name: string;
};
export type UpdateBaseUri = {
    $$type: 'UpdateBaseUri';
    new_base_uri: string;
};
export declare function storeUpdateBaseUri(src: UpdateBaseUri): (builder: Builder) => void;
export declare function loadUpdateBaseUri(slice: Slice): {
    $$type: "UpdateBaseUri";
    new_base_uri: string;
};
export type UpdateTransferFee = {
    $$type: 'UpdateTransferFee';
    new_fee: bigint;
};
export declare function storeUpdateTransferFee(src: UpdateTransferFee): (builder: Builder) => void;
export declare function loadUpdateTransferFee(slice: Slice): {
    $$type: "UpdateTransferFee";
    new_fee: bigint;
};
export type RemoveMappedContract = {
    $$type: 'RemoveMappedContract';
    token_id: bigint;
};
export declare function storeRemoveMappedContract(src: RemoveMappedContract): (builder: Builder) => void;
export declare function loadRemoveMappedContract(slice: Slice): {
    $$type: "RemoveMappedContract";
    token_id: bigint;
};
export type Strategies = {
    $$type: 'Strategies';
    strategies: Dictionary<bigint, Steps>;
};
export declare function storeStrategies(src: Strategies): (builder: Builder) => void;
export declare function loadStrategies(slice: Slice): {
    $$type: "Strategies";
    strategies: Dictionary<bigint, Steps>;
};
export type ToTokenCrossChainStrategy = {
    $$type: 'ToTokenCrossChainStrategy';
    to_token: Dictionary<bigint, CrossChainStrategy>;
};
export declare function storeToTokenCrossChainStrategy(src: ToTokenCrossChainStrategy): (builder: Builder) => void;
export declare function loadToTokenCrossChainStrategy(slice: Slice): {
    $$type: "ToTokenCrossChainStrategy";
    to_token: Dictionary<bigint, CrossChainStrategy>;
};
export type CrossChainTokenStrategy = {
    $$type: 'CrossChainTokenStrategy';
    from_token: Dictionary<bigint, ToTokenCrossChainStrategy>;
};
export declare function storeCrossChainTokenStrategy(src: CrossChainTokenStrategy): (builder: Builder) => void;
export declare function loadCrossChainTokenStrategy(slice: Slice): {
    $$type: "CrossChainTokenStrategy";
    from_token: Dictionary<bigint, ToTokenCrossChainStrategy>;
};
export type TargetTokenToSteps = {
    $$type: 'TargetTokenToSteps';
    i: Dictionary<bigint, Steps>;
};
export declare function storeTargetTokenToSteps(src: TargetTokenToSteps): (builder: Builder) => void;
export declare function loadTargetTokenToSteps(slice: Slice): {
    $$type: "TargetTokenToSteps";
    i: Dictionary<bigint, Steps>;
};
export type Steps = {
    $$type: 'Steps';
    steps: Dictionary<bigint, bigint>;
    size: bigint;
};
export declare function storeSteps(src: Steps): (builder: Builder) => void;
export declare function loadSteps(slice: Slice): {
    $$type: "Steps";
    steps: Dictionary<bigint, bigint>;
    size: bigint;
};
export type CrossChainStrategy = {
    $$type: 'CrossChainStrategy';
    local_steps: Steps;
    foreign_steps: Steps;
};
export declare function storeCrossChainStrategy(src: CrossChainStrategy): (builder: Builder) => void;
export declare function loadCrossChainStrategy(slice: Slice): {
    $$type: "CrossChainStrategy";
    local_steps: {
        $$type: "Steps";
        steps: Dictionary<bigint, bigint>;
        size: bigint;
    };
    foreign_steps: {
        $$type: "Steps";
        steps: Dictionary<bigint, bigint>;
        size: bigint;
    };
};
export type TargetTokenToCrossChainStrategy = {
    $$type: 'TargetTokenToCrossChainStrategy';
    i: Dictionary<bigint, CrossChainStrategy>;
};
export declare function storeTargetTokenToCrossChainStrategy(src: TargetTokenToCrossChainStrategy): (builder: Builder) => void;
export declare function loadTargetTokenToCrossChainStrategy(slice: Slice): {
    $$type: "TargetTokenToCrossChainStrategy";
    i: Dictionary<bigint, CrossChainStrategy>;
};
export type FromTokenToTargetTokenToCrossChainStrategy = {
    $$type: 'FromTokenToTargetTokenToCrossChainStrategy';
    i: Dictionary<bigint, TargetTokenToCrossChainStrategy>;
};
export declare function storeFromTokenToTargetTokenToCrossChainStrategy(src: FromTokenToTargetTokenToCrossChainStrategy): (builder: Builder) => void;
export declare function loadFromTokenToTargetTokenToCrossChainStrategy(slice: Slice): {
    $$type: "FromTokenToTargetTokenToCrossChainStrategy";
    i: Dictionary<bigint, TargetTokenToCrossChainStrategy>;
};
export type UpdateProtocolFee = {
    $$type: 'UpdateProtocolFee';
    new_fee: bigint;
};
export declare function storeUpdateProtocolFee(src: UpdateProtocolFee): (builder: Builder) => void;
export declare function loadUpdateProtocolFee(slice: Slice): {
    $$type: "UpdateProtocolFee";
    new_fee: bigint;
};
export type AddValidator = {
    $$type: 'AddValidator';
    key: bigint;
    address: Address;
};
export declare function storeAddValidator(src: AddValidator): (builder: Builder) => void;
export declare function loadAddValidator(slice: Slice): {
    $$type: "AddValidator";
    key: bigint;
    address: Address;
};
export type RemoveValidator = {
    $$type: 'RemoveValidator';
    key: bigint;
};
export declare function storeRemoveValidator(src: RemoveValidator): (builder: Builder) => void;
export declare function loadRemoveValidator(slice: Slice): {
    $$type: "RemoveValidator";
    key: bigint;
};
export type SetIncomingStrategy = {
    $$type: 'SetIncomingStrategy';
    from_token: bigint;
    target_token: bigint;
    steps: Steps;
};
export declare function storeSetIncomingStrategy(src: SetIncomingStrategy): (builder: Builder) => void;
export declare function loadSetIncomingStrategy(slice: Slice): {
    $$type: "SetIncomingStrategy";
    from_token: bigint;
    target_token: bigint;
    steps: {
        $$type: "Steps";
        steps: Dictionary<bigint, bigint>;
        size: bigint;
    };
};
export type SetCrossChainStrategy = {
    $$type: 'SetCrossChainStrategy';
    target_chain: bigint;
    from_token: bigint;
    target_token: bigint;
    local_steps: Steps;
    foreign_steps: Steps;
};
export declare function storeSetCrossChainStrategy(src: SetCrossChainStrategy): (builder: Builder) => void;
export declare function loadSetCrossChainStrategy(slice: Slice): {
    $$type: "SetCrossChainStrategy";
    target_chain: bigint;
    from_token: bigint;
    target_token: bigint;
    local_steps: {
        $$type: "Steps";
        steps: Dictionary<bigint, bigint>;
        size: bigint;
    };
    foreign_steps: {
        $$type: "Steps";
        steps: Dictionary<bigint, bigint>;
        size: bigint;
    };
};
export type RemoveInternalStrategy = {
    $$type: 'RemoveInternalStrategy';
    from_token: bigint;
    target_token: bigint;
};
export declare function storeRemoveInternalStrategy(src: RemoveInternalStrategy): (builder: Builder) => void;
export declare function loadRemoveInternalStrategy(slice: Slice): {
    $$type: "RemoveInternalStrategy";
    from_token: bigint;
    target_token: bigint;
};
export type RemoveCrossChainStrategy = {
    $$type: 'RemoveCrossChainStrategy';
    target_chain: bigint;
    from_token: bigint;
    target_token: bigint;
};
export declare function storeRemoveCrossChainStrategy(src: RemoveCrossChainStrategy): (builder: Builder) => void;
export declare function loadRemoveCrossChainStrategy(slice: Slice): {
    $$type: "RemoveCrossChainStrategy";
    target_chain: bigint;
    from_token: bigint;
    target_token: bigint;
};
export declare class Bridge implements Contract {
    static init(chain_nonce: bigint, native_coin: bigint, burner: Address, base_uri: string, transfer_fee: bigint, protocol_fee: bigint, bootstrap_validator_key: bigint, bootstrap_validator_address: Address): Promise<{
        code: Cell;
        data: Cell;
    }>;
    static fromInit(chain_nonce: bigint, native_coin: bigint, burner: Address, base_uri: string, transfer_fee: bigint, protocol_fee: bigint, bootstrap_validator_key: bigint, bootstrap_validator_address: Address): Promise<Bridge>;
    static fromAddress(address: Address): Bridge;
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
    }, message: JettonTransferNotification | JettonBurnNotification | FreezeTon | MapContract | AddChain | RemoveMappedContract | UpdateChain | 'WithdrawFees' | ReceiveInstallment | SetChainFee | JettonExcesses | UpdateProtocolFee | UpdateBaseUri | UpdateTransferFee | AddValidator | RemoveValidator | SetIncomingStrategy | SetCrossChainStrategy | RemoveCrossChainStrategy | RemoveInternalStrategy | null | 'Pause' | 'Unpause' | Deploy | GrantRole | RevokeRole | RenounceRole | UpdateRoleAdmin): Promise<void>;
    getWithdrawerRoleId(provider: ContractProvider): Promise<bigint>;
    getPauserRoleId(provider: ContractProvider): Promise<bigint>;
    getMappingAdminRoleId(provider: ContractProvider): Promise<bigint>;
    getBridgeValidatorRoleId(provider: ContractProvider): Promise<bigint>;
    getManagerRoleId(provider: ContractProvider): Promise<bigint>;
    getBaseUri(provider: ContractProvider): Promise<string>;
    getProtocolFee(provider: ContractProvider): Promise<bigint>;
    getNonce(provider: ContractProvider): Promise<bigint>;
    getNativeCoin(provider: ContractProvider): Promise<bigint>;
    getFees(provider: ContractProvider): Promise<bigint>;
    getTvl(provider: ContractProvider): Promise<bigint>;
    getChainNonce(provider: ContractProvider): Promise<bigint>;
    getIncoming(provider: ContractProvider): Promise<Dictionary<bigint, IncomingTransaction>>;
    getOutgoing(provider: ContractProvider): Promise<Dictionary<bigint, OutgoingTransaction>>;
    getTokens(provider: ContractProvider): Promise<Dictionary<bigint, Token>>;
    getSupportedChains(provider: ContractProvider): Promise<Dictionary<bigint, ChainName>>;
    getChainFees(provider: ContractProvider): Promise<Dictionary<bigint, bigint>>;
    getIncomingStrategy(provider: ContractProvider): Promise<Dictionary<bigint, TargetTokenToSteps>>;
    getCrossChainStrategy(provider: ContractProvider): Promise<Dictionary<bigint, FromTokenToTargetTokenToCrossChainStrategy>>;
    getHasRole(provider: ContractProvider, address: Address, role_id: bigint): Promise<boolean>;
    getRoleAdmin(provider: ContractProvider, role_id: bigint): Promise<Address>;
    getAdminRoleId(provider: ContractProvider): Promise<bigint>;
}
//# sourceMappingURL=index.d.ts.map