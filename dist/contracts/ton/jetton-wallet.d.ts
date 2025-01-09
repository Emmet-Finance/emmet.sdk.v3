import { Address, Cell, Contract, ContractProvider, Sender } from '@ton/core';
export type JettonWalletConfig = {
    ownerAddress: Address;
    jettonMasterAddress: Address;
};
export declare function jettonWalletConfigToCell(config: JettonWalletConfig): Cell;
export declare function parseJettonWalletData(data: Cell): {
    status: number;
    balance: bigint;
    ownerAddress: Address;
    jettonMasterAddress: Address;
};
export declare class JettonWallet implements Contract {
    readonly address: Address;
    readonly init?: {
        code: Cell;
        data: Cell;
    } | undefined;
    constructor(address: Address, init?: {
        code: Cell;
        data: Cell;
    } | undefined);
    static createFromAddress(address: Address): JettonWallet;
    static createFromConfig(config: JettonWalletConfig, code: Cell, workchain?: number): JettonWallet;
    sendDeploy(provider: ContractProvider, via: Sender, value: bigint): Promise<void>;
    getWalletData(provider: ContractProvider): Promise<{
        balance: bigint;
        owner: Address;
        minter: Address;
        wallet_code: Cell;
    }>;
    getJettonBalance(provider: ContractProvider): Promise<bigint>;
    getWalletStatus(provider: ContractProvider): Promise<number>;
    static transferMessage(jetton_amount: bigint, to: Address, responseAddress: Address | null, customPayload: Cell | null, forward_ton_amount: bigint, forwardPayload: Cell | null): Cell;
    sendTransfer(provider: ContractProvider, via: Sender, value: bigint, jetton_amount: bigint, to: Address, responseAddress: Address, customPayload: Cell | null, forward_ton_amount: bigint, forwardPayload: Cell | null): Promise<void>;
    static burnMessage(jetton_amount: bigint, responseAddress: Address | null, customPayload: Cell | null): Cell;
    sendBurn(provider: ContractProvider, via: Sender, value: bigint, jetton_amount: bigint, responseAddress: Address | null, customPayload: Cell | null): Promise<void>;
    static withdrawTonsMessage(): Cell;
    sendWithdrawTons(provider: ContractProvider, via: Sender): Promise<void>;
    static withdrawJettonsMessage(from: Address, amount: bigint): Cell;
    sendWithdrawJettons(provider: ContractProvider, via: Sender, from: Address, amount: bigint): Promise<void>;
}
//# sourceMappingURL=jetton-wallet.d.ts.map