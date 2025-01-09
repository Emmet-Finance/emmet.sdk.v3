import { Address, Cell, Contract, ContractProvider, Sender, Slice } from '@ton/core';
export declare abstract class Op {
    static transfer: number;
    static transfer_notification: number;
    static internal_transfer: number;
    static excesses: number;
    static burn: number;
    static burn_notification: number;
    static provide_wallet_address: number;
    static take_wallet_address: number;
    static mint: number;
    static change_admin: number;
    static claim_admin: number;
    static upgrade: number;
    static call_to: number;
    static top_up: number;
    static change_metadata_url: number;
    static set_status: number;
}
export declare abstract class Errors {
    static invalid_op: number;
    static wrong_op: number;
    static not_owner: number;
    static not_valid_wallet: number;
    static wrong_workchain: number;
    static contract_locked: number;
    static balance_error: number;
    static not_enough_gas: number;
    static invalid_mesage: number;
    static discovery_fee_not_matched: number;
}
export type JettonMinterContent = {
    uri: string;
};
export type JettonMinterConfig = {
    admin: Address;
    wallet_code: Cell;
    jetton_content: Cell | JettonMinterContent;
};
export type JettonMinterConfigFull = {
    supply: bigint;
    admin: Address;
    transfer_admin: Address | null;
    wallet_code: Cell;
    jetton_content: Cell | JettonMinterContent;
};
export type LockType = 'unlock' | 'out' | 'in' | 'full';
export declare const LOCK_TYPES: string[];
export declare const lockTypeToInt: (lockType: LockType) => number;
export declare const intToLockType: (lockType: number) => LockType;
export declare function endParse(slice: Slice): void;
export declare function jettonMinterConfigCellToConfig(config: Cell): JettonMinterConfigFull;
export declare function parseJettonMinterData(data: Cell): JettonMinterConfigFull;
export declare function jettonMinterConfigFullToCell(config: JettonMinterConfigFull): Cell;
export declare function jettonMinterConfigToCell(config: JettonMinterConfig): Cell;
export declare function jettonContentToCell(content: JettonMinterContent): Cell;
export declare class JettonMinter implements Contract {
    readonly address: Address;
    readonly init?: {
        code: Cell;
        data: Cell;
    } | undefined;
    constructor(address: Address, init?: {
        code: Cell;
        data: Cell;
    } | undefined);
    static createFromAddress(address: Address): JettonMinter;
    static createFromConfig(config: JettonMinterConfig, code: Cell, workchain?: number): JettonMinter;
    sendDeploy(provider: ContractProvider, via: Sender, value: bigint): Promise<void>;
    static mintMessage(to: Address, jetton_amount: bigint, from?: Address | null, response?: Address | null, customPayload?: Cell | null, forward_ton_amount?: bigint, total_ton_amount?: bigint): Cell;
    static parseMintInternalMessage(slice: Slice): {
        queryId: number;
        jettonAmount: bigint;
        fromAddress: Address;
        responseAddress: Address;
        forwardTonAmount: bigint;
        customPayload: Cell | null;
    };
    static parseMintMessage(slice: Slice): {
        queryId: number;
        toAddress: Address;
        tonAmount: bigint;
        internalMessage: {
            queryId: number;
            jettonAmount: bigint;
            fromAddress: Address;
            responseAddress: Address;
            forwardTonAmount: bigint;
            customPayload: Cell | null;
        };
    };
    sendMint(provider: ContractProvider, via: Sender, to: Address, jetton_amount: bigint, from?: Address | null, response_addr?: Address | null, customPayload?: Cell | null, forward_ton_amount?: bigint, total_ton_amount?: bigint): Promise<void>;
    static discoveryMessage(owner: Address, include_address: boolean): Cell;
    sendDiscovery(provider: ContractProvider, via: Sender, owner: Address, include_address: boolean, value?: bigint): Promise<void>;
    static topUpMessage(): Cell;
    static parseTopUp(slice: Slice): {
        queryId: number;
    };
    sendTopUp(provider: ContractProvider, via: Sender, value?: bigint): Promise<void>;
    static changeAdminMessage(newOwner: Address): Cell;
    static parseChangeAdmin(slice: Slice): {
        queryId: number;
        newAdminAddress: Address;
    };
    sendChangeAdmin(provider: ContractProvider, via: Sender, newOwner: Address): Promise<void>;
    static claimAdminMessage(query_id?: bigint): Cell;
    static parseClaimAdmin(slice: Slice): {
        queryId: number;
    };
    sendClaimAdmin(provider: ContractProvider, via: Sender, query_id?: bigint): Promise<void>;
    static changeContentMessage(content: Cell | JettonMinterContent): Cell;
    static parseChangeContent(slice: Slice): {
        queryId: number;
        newMetadataUrl: string;
    };
    sendChangeContent(provider: ContractProvider, via: Sender, content: Cell | JettonMinterContent): Promise<void>;
    static lockWalletMessage(lock_address: Address, lock: number, amount: bigint, query_id?: bigint | number): Cell;
    static parseSetStatus(slice: Slice): {
        queryId: number;
        newStatus: number;
    };
    static parseCallTo(slice: Slice, refPrser: (slice: Slice) => any): {
        queryId: number;
        toAddress: Address;
        tonAmount: bigint;
        action: any;
    };
    sendLockWallet(provider: ContractProvider, via: Sender, lock_address: Address, lock: LockType, amount?: bigint, query_id?: bigint | number): Promise<void>;
    static forceTransferMessage(transfer_amount: bigint, to: Address, from: Address, custom_payload: Cell | null, forward_amount: bigint | undefined, forward_payload: Cell | null, value?: bigint, query_id?: bigint): Cell;
    static parseTransfer(slice: Slice): {
        queryId: number;
        jettonAmount: bigint;
        toAddress: Address;
        responseAddress: Address;
        customPayload: Cell | null;
        forwardTonAmount: bigint;
        forwardPayload: Slice;
    };
    sendForceTransfer(provider: ContractProvider, via: Sender, transfer_amount: bigint, to: Address, from: Address, custom_payload: Cell | null, forward_amount: bigint | undefined, forward_payload: Cell | null, value?: bigint, query_id?: bigint): Promise<void>;
    static forceBurnMessage(burn_amount: bigint, to: Address, response: Address | null, value?: bigint, query_id?: bigint | number): Cell;
    static parseBurn(slice: Slice): {
        queryId: number;
        jettonAmount: bigint;
        responseAddress: Address;
        customPayload: Cell | null;
    };
    sendForceBurn(provider: ContractProvider, via: Sender, burn_amount: bigint, address: Address, response: Address | null, value?: bigint, query_id?: bigint | number): Promise<void>;
    static upgradeMessage(new_code: Cell, new_data: Cell, query_id?: bigint | number): Cell;
    static parseUpgrade(slice: Slice): {
        queryId: number;
        newData: Cell;
        newCode: Cell;
    };
    sendUpgrade(provider: ContractProvider, via: Sender, new_code: Cell, new_data: Cell, value?: bigint, query_id?: bigint | number): Promise<void>;
    getWalletAddress(provider: ContractProvider, owner: Address): Promise<Address>;
    getJettonData(provider: ContractProvider): Promise<{
        totalSupply: bigint;
        mintable: boolean;
        adminAddress: Address;
        content: Cell;
        walletCode: Cell;
    }>;
    getTotalSupply(provider: ContractProvider): Promise<bigint>;
    getAdminAddress(provider: ContractProvider): Promise<Address>;
    getContent(provider: ContractProvider): Promise<Cell>;
    getNextAdminAddress(provider: ContractProvider): Promise<Address | null>;
}
//# sourceMappingURL=jetton-master.d.ts.map