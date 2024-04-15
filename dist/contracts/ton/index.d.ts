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
export type AddValidator = {
    $$type: "AddValidator";
    new_validator: Address;
};
export declare function storeAddValidator(src: AddValidator): (builder: Builder) => void;
export declare function loadAddValidator(slice: Slice): {
    $$type: "AddValidator";
    new_validator: Address;
};
export type RemoveValidator = {
    $$type: "RemoveValidator";
    validator: Address;
};
export declare function storeRemoveValidator(src: RemoveValidator): (builder: Builder) => void;
export declare function loadRemoveValidator(slice: Slice): {
    $$type: "RemoveValidator";
    validator: Address;
};
export type TokenType = {
    $$type: "TokenType";
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
export type SendInstallment = {
    $$type: "SendInstallment";
    amount: bigint;
    tx_id: bigint;
    native_chain_nonce: bigint;
    target_chain: bigint;
    token_id: bigint;
    destination_address: Cell;
};
export declare function storeSendInstallment(src: SendInstallment): (builder: Builder) => void;
export declare function loadSendInstallment(slice: Slice): {
    $$type: "SendInstallment";
    amount: bigint;
    tx_id: bigint;
    native_chain_nonce: bigint;
    target_chain: bigint;
    token_id: bigint;
    destination_address: Cell;
};
export type ReceivedInstallment = {
    $$type: "ReceivedInstallment";
    amount: bigint;
    tx_id: bigint;
    chain_nonce: bigint;
    native_chain_nonce: bigint;
    token_id: bigint;
    destination_address: Address;
};
export declare function storeReceivedInstallment(src: ReceivedInstallment): (builder: Builder) => void;
export declare function loadReceivedInstallment(slice: Slice): {
    $$type: "ReceivedInstallment";
    amount: bigint;
    tx_id: bigint;
    chain_nonce: bigint;
    native_chain_nonce: bigint;
    token_id: bigint;
    destination_address: Address;
};
export type FreezeTon = {
    $$type: "FreezeTon";
    target_chain: bigint;
    token_id: bigint;
    to: Cell;
    amount: bigint;
};
export declare function storeFreezeTon(src: FreezeTon): (builder: Builder) => void;
export declare function loadFreezeTon(slice: Slice): {
    $$type: "FreezeTon";
    target_chain: bigint;
    token_id: bigint;
    to: Cell;
    amount: bigint;
};
export type MapNativeContract = {
    $$type: "MapNativeContract";
    token_id: bigint;
    token_symbol: string;
    contract: Address;
    decimals: bigint;
};
export declare function storeMapNativeContract(src: MapNativeContract): (builder: Builder) => void;
export declare function loadMapNativeContract(slice: Slice): {
    $$type: "MapNativeContract";
    token_id: bigint;
    token_symbol: string;
    contract: Address;
    decimals: bigint;
};
export type MapWrappedContract = {
    $$type: "MapWrappedContract";
    token_id: bigint;
    token_symbol: string;
    contract: Address;
    decimals: bigint;
};
export declare function storeMapWrappedContract(src: MapWrappedContract): (builder: Builder) => void;
export declare function loadMapWrappedContract(slice: Slice): {
    $$type: "MapWrappedContract";
    token_id: bigint;
    token_symbol: string;
    contract: Address;
    decimals: bigint;
};
export type AddChain = {
    $$type: "AddChain";
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
    $$type: "UpdateChain";
    chain_id: bigint;
    chain_name: string;
};
export declare function storeUpdateChain(src: UpdateChain): (builder: Builder) => void;
export declare function loadUpdateChain(slice: Slice): {
    $$type: "UpdateChain";
    chain_id: bigint;
    chain_name: string;
};
export type ReceiveInstallment = {
    $$type: "ReceiveInstallment";
    tx_id: bigint;
    installment: InstallmentIn;
};
export declare function storeReceiveInstallment(src: ReceiveInstallment): (builder: Builder) => void;
export declare function loadReceiveInstallment(slice: Slice): {
    $$type: "ReceiveInstallment";
    tx_id: bigint;
    installment: {
        $$type: "InstallmentIn";
        amount: bigint;
        to: Address;
        chain_id: bigint;
        token_id: bigint;
    };
};
export type SetChainFee = {
    $$type: "SetChainFee";
    chain_id: bigint;
    fee: bigint;
};
export declare function storeSetChainFee(src: SetChainFee): (builder: Builder) => void;
export declare function loadSetChainFee(slice: Slice): {
    $$type: "SetChainFee";
    chain_id: bigint;
    fee: bigint;
};
export type InstallmentIn = {
    $$type: "InstallmentIn";
    amount: bigint;
    to: Address;
    chain_id: bigint;
    token_id: bigint;
};
export declare function storeInstallmentIn(src: InstallmentIn): (builder: Builder) => void;
export declare function loadInstallmentIn(slice: Slice): {
    $$type: "InstallmentIn";
    amount: bigint;
    to: Address;
    chain_id: bigint;
    token_id: bigint;
};
export type InstallmentOut = {
    $$type: "InstallmentOut";
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
    $$type: "Token";
    address: Address;
    decimals: bigint;
};
export declare function storeToken(src: Token): (builder: Builder) => void;
export declare function loadToken(slice: Slice): {
    $$type: "Token";
    address: Address;
    decimals: bigint;
};
export type ChainName = {
    $$type: "ChainName";
    name: string;
};
export declare function storeChainName(src: ChainName): (builder: Builder) => void;
export declare function loadChainName(slice: Slice): {
    $$type: "ChainName";
    name: string;
};
export type TokenSymbol = {
    $$type: "TokenSymbol";
    symbol: string;
};
export declare function storeTokenSymbol(src: TokenSymbol): (builder: Builder) => void;
export declare function loadTokenSymbol(slice: Slice): {
    $$type: "TokenSymbol";
    symbol: string;
};
export declare class Bridge implements Contract {
    static init(chain_nonce: bigint, native_coin: bigint, burner: Address): Promise<{
        code: Cell;
        data: Cell;
    }>;
    static fromInit(chain_nonce: bigint, native_coin: bigint, burner: Address): Promise<Bridge>;
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
    }, message: JettonTransferNotification | JettonBurnNotification | FreezeTon | MapNativeContract | MapWrappedContract | AddChain | UpdateChain | "WithdrawFees" | ReceiveInstallment | SetChainFee | JettonExcesses | null | Deploy | AddValidator | RemoveValidator | "Pause" | "Unpause"): Promise<void>;
    getIsPaused(provider: ContractProvider): Promise<boolean>;
    getBridgeValidatorRole(provider: ContractProvider): Promise<Dictionary<Address, boolean>>;
    getMappingAdminRole(provider: ContractProvider): Promise<Dictionary<Address, boolean>>;
    getPauserRole(provider: ContractProvider): Promise<Dictionary<Address, boolean>>;
    getWithdrawerRole(provider: ContractProvider): Promise<Dictionary<Address, boolean>>;
    getDefaultAdminRole(provider: ContractProvider): Promise<Dictionary<Address, boolean>>;
    getNonce(provider: ContractProvider): Promise<bigint>;
    getNativeCoin(provider: ContractProvider): Promise<bigint>;
    getFees(provider: ContractProvider): Promise<bigint>;
    getTvl(provider: ContractProvider): Promise<bigint>;
    getChainNonce(provider: ContractProvider): Promise<bigint>;
    getIncoming(provider: ContractProvider): Promise<Dictionary<bigint, InstallmentIn>>;
    getOutgoing(provider: ContractProvider): Promise<Dictionary<bigint, InstallmentOut>>;
    getNativeTokens(provider: ContractProvider): Promise<Dictionary<bigint, Token>>;
    getNativeTokenIdToSymbol(provider: ContractProvider): Promise<Dictionary<bigint, TokenSymbol>>;
    getWrappedTokens(provider: ContractProvider): Promise<Dictionary<bigint, Token>>;
    getSupportedChains(provider: ContractProvider): Promise<Dictionary<bigint, ChainName>>;
    getWrappedTokenIdToSymbol(provider: ContractProvider): Promise<Dictionary<bigint, TokenSymbol>>;
    getChainFees(provider: ContractProvider): Promise<Dictionary<bigint, bigint>>;
}
//# sourceMappingURL=index.d.ts.map