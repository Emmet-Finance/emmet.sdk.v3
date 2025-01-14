"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JettonMinter = exports.intToLockType = exports.lockTypeToInt = exports.LOCK_TYPES = exports.Errors = exports.Op = void 0;
exports.endParse = endParse;
exports.jettonMinterConfigCellToConfig = jettonMinterConfigCellToConfig;
exports.parseJettonMinterData = parseJettonMinterData;
exports.jettonMinterConfigFullToCell = jettonMinterConfigFullToCell;
exports.jettonMinterConfigToCell = jettonMinterConfigToCell;
exports.jettonContentToCell = jettonContentToCell;
const core_1 = require("@ton/core");
const jetton_wallet_1 = require("./jetton-wallet");
class Op {
}
exports.Op = Op;
Op.transfer = 0xf8a7ea5;
Op.transfer_notification = 0x7362d09c;
Op.internal_transfer = 0x178d4519;
Op.excesses = 0xd53276db;
Op.burn = 0x595f07bc;
Op.burn_notification = 0x7bdd97de;
Op.provide_wallet_address = 0x2c76b973;
Op.take_wallet_address = 0xd1735400;
Op.mint = 0x642b7d07;
Op.change_admin = 0x6501f354;
Op.claim_admin = 0xfb88e119;
Op.upgrade = 0x2508d66a;
Op.call_to = 0x235caf52;
Op.top_up = 0xd372158c;
Op.change_metadata_url = 0xcb862902;
Op.set_status = 0xeed236d3;
class Errors {
}
exports.Errors = Errors;
Errors.invalid_op = 72;
Errors.wrong_op = 0xffff;
Errors.not_owner = 73;
Errors.not_valid_wallet = 74;
Errors.wrong_workchain = 333;
Errors.contract_locked = 45;
Errors.balance_error = 47;
Errors.not_enough_gas = 48;
Errors.invalid_mesage = 49;
Errors.discovery_fee_not_matched = 75;
exports.LOCK_TYPES = ['unlock', 'out', 'in', 'full'];
const lockTypeToInt = (lockType) => {
    switch (lockType) {
        case 'unlock':
            return 0;
        case 'out':
            return 1;
        case 'in':
            return 2;
        case 'full':
            return 3;
        default:
            throw new Error("Invalid argument!");
    }
};
exports.lockTypeToInt = lockTypeToInt;
const intToLockType = (lockType) => {
    switch (lockType) {
        case 0:
            return 'unlock';
        case 1:
            return 'out';
        case 2:
            return 'in';
        case 3:
            return 'full';
        default:
            throw new Error("Invalid argument!");
    }
};
exports.intToLockType = intToLockType;
function endParse(slice) {
    if (slice.remainingBits > 0 || slice.remainingRefs > 0) {
        throw new Error('remaining bits in data');
    }
}
function jettonMinterConfigCellToConfig(config) {
    const sc = config.beginParse();
    const parsed = {
        supply: sc.loadCoins(),
        admin: sc.loadAddress(),
        transfer_admin: sc.loadMaybeAddress(),
        wallet_code: sc.loadRef(),
        jetton_content: sc.loadRef()
    };
    endParse(sc);
    return parsed;
}
function parseJettonMinterData(data) {
    return jettonMinterConfigCellToConfig(data);
}
function jettonMinterConfigFullToCell(config) {
    const content = config.jetton_content instanceof core_1.Cell ? config.jetton_content : jettonContentToCell(config.jetton_content);
    return (0, core_1.beginCell)()
        .storeCoins(config.supply)
        .storeAddress(config.admin)
        .storeAddress(config.transfer_admin)
        .storeRef(config.wallet_code)
        .storeRef(content)
        .endCell();
}
function jettonMinterConfigToCell(config) {
    const content = config.jetton_content instanceof core_1.Cell ? config.jetton_content : jettonContentToCell(config.jetton_content);
    return (0, core_1.beginCell)()
        .storeCoins(0)
        .storeAddress(config.admin)
        .storeAddress(null) // Transfer admin address
        .storeRef(config.wallet_code)
        .storeRef(content)
        .endCell();
}
function jettonContentToCell(content) {
    return (0, core_1.beginCell)()
        .storeStringRefTail(content.uri) //Snake logic under the hood
        .endCell();
}
class JettonMinter {
    constructor(address, init) {
        this.address = address;
        this.init = init;
    }
    static createFromAddress(address) {
        return new JettonMinter(address);
    }
    static createFromConfig(config, code, workchain = 0) {
        const data = jettonMinterConfigToCell(config);
        const init = { code, data };
        return new JettonMinter((0, core_1.contractAddress)(workchain, init), init);
    }
    async sendDeploy(provider, via, value) {
        await provider.internal(via, {
            value,
            sendMode: core_1.SendMode.PAY_GAS_SEPARATELY,
            body: (0, core_1.beginCell)().storeUint(Op.top_up, 32).storeUint(0, 64).endCell(),
        });
    }
    static mintMessage(to, jetton_amount, from, response, customPayload, forward_ton_amount = 0n, total_ton_amount = 0n) {
        const mintMsg = (0, core_1.beginCell)().storeUint(Op.internal_transfer, 32)
            .storeUint(0, 64)
            .storeCoins(jetton_amount)
            .storeAddress(from)
            .storeAddress(response)
            .storeCoins(forward_ton_amount)
            .storeMaybeRef(customPayload)
            .endCell();
        return (0, core_1.beginCell)().storeUint(Op.mint, 32).storeUint(0, 64) // op, queryId
            .storeAddress(to)
            .storeCoins(total_ton_amount)
            .storeRef(mintMsg)
            .endCell();
    }
    static parseMintInternalMessage(slice) {
        const op = slice.loadUint(32);
        if (op !== Op.internal_transfer)
            throw new Error('Invalid op');
        const queryId = slice.loadUint(64);
        const jettonAmount = slice.loadCoins();
        const fromAddress = slice.loadAddress();
        const responseAddress = slice.loadAddress();
        const forwardTonAmount = slice.loadCoins();
        const customPayload = slice.loadMaybeRef();
        endParse(slice);
        return {
            queryId,
            jettonAmount,
            fromAddress,
            responseAddress,
            forwardTonAmount,
            customPayload
        };
    }
    static parseMintMessage(slice) {
        const op = slice.loadUint(32);
        if (op !== Op.mint)
            throw new Error('Invalid op');
        const queryId = slice.loadUint(64);
        const toAddress = slice.loadAddress();
        const tonAmount = slice.loadCoins();
        const mintMsg = slice.loadRef();
        endParse(slice);
        return {
            queryId,
            toAddress,
            tonAmount,
            internalMessage: this.parseMintInternalMessage(mintMsg.beginParse())
        };
    }
    async sendMint(provider, via, to, jetton_amount, from, response_addr, customPayload, forward_ton_amount = (0, core_1.toNano)('0.1'), total_ton_amount = (0, core_1.toNano)('2')) {
        await provider.internal(via, {
            sendMode: core_1.SendMode.PAY_GAS_SEPARATELY,
            body: JettonMinter.mintMessage(to, jetton_amount, from, response_addr, customPayload, forward_ton_amount, total_ton_amount),
            value: total_ton_amount,
        });
    }
    /* provide_wallet_address#2c76b973 query_id:uint64 owner_address:MsgAddress include_address:Bool = InternalMsgBody;
    */
    static discoveryMessage(owner, include_address) {
        return (0, core_1.beginCell)().storeUint(Op.provide_wallet_address, 32).storeUint(0, 64) // op, queryId
            .storeAddress(owner).storeBit(include_address)
            .endCell();
    }
    async sendDiscovery(provider, via, owner, include_address, value = (0, core_1.toNano)('0.1')) {
        await provider.internal(via, {
            sendMode: core_1.SendMode.PAY_GAS_SEPARATELY,
            body: JettonMinter.discoveryMessage(owner, include_address),
            value: value,
        });
    }
    static topUpMessage() {
        return (0, core_1.beginCell)().storeUint(Op.top_up, 32).storeUint(0, 64) // op, queryId
            .endCell();
    }
    static parseTopUp(slice) {
        const op = slice.loadUint(32);
        if (op !== Op.top_up)
            throw new Error('Invalid op');
        const queryId = slice.loadUint(64);
        endParse(slice);
        return {
            queryId,
        };
    }
    async sendTopUp(provider, via, value = (0, core_1.toNano)('0.1')) {
        await provider.internal(via, {
            sendMode: core_1.SendMode.PAY_GAS_SEPARATELY,
            body: JettonMinter.topUpMessage(),
            value: value,
        });
    }
    static changeAdminMessage(newOwner) {
        return (0, core_1.beginCell)().storeUint(Op.change_admin, 32).storeUint(0, 64) // op, queryId
            .storeAddress(newOwner)
            .endCell();
    }
    static parseChangeAdmin(slice) {
        const op = slice.loadUint(32);
        if (op !== Op.change_admin)
            throw new Error('Invalid op');
        const queryId = slice.loadUint(64);
        const newAdminAddress = slice.loadAddress();
        endParse(slice);
        return {
            queryId,
            newAdminAddress
        };
    }
    async sendChangeAdmin(provider, via, newOwner) {
        await provider.internal(via, {
            sendMode: core_1.SendMode.PAY_GAS_SEPARATELY,
            body: JettonMinter.changeAdminMessage(newOwner),
            value: (0, core_1.toNano)("0.1"),
        });
    }
    static claimAdminMessage(query_id = 0n) {
        return (0, core_1.beginCell)().storeUint(Op.claim_admin, 32).storeUint(query_id, 64).endCell();
    }
    static parseClaimAdmin(slice) {
        const op = slice.loadUint(32);
        if (op !== Op.claim_admin)
            throw new Error('Invalid op');
        const queryId = slice.loadUint(64);
        endParse(slice);
        return {
            queryId
        };
    }
    async sendClaimAdmin(provider, via, query_id = 0n) {
        await provider.internal(via, {
            sendMode: core_1.SendMode.PAY_GAS_SEPARATELY,
            body: JettonMinter.claimAdminMessage(query_id),
            value: (0, core_1.toNano)('0.1')
        });
    }
    static changeContentMessage(content) {
        const contentString = content instanceof core_1.Cell ? content.beginParse().loadStringTail() : content.uri;
        return (0, core_1.beginCell)().storeUint(Op.change_metadata_url, 32).storeUint(0, 64) // op, queryId
            .storeStringTail(contentString)
            .endCell();
    }
    static parseChangeContent(slice) {
        const op = slice.loadUint(32);
        if (op !== Op.change_metadata_url)
            throw new Error('Invalid op');
        const queryId = slice.loadUint(64);
        const newMetadataUrl = slice.loadStringTail();
        endParse(slice);
        return {
            queryId,
            newMetadataUrl
        };
    }
    async sendChangeContent(provider, via, content) {
        await provider.internal(via, {
            sendMode: core_1.SendMode.PAY_GAS_SEPARATELY,
            body: JettonMinter.changeContentMessage(content),
            value: (0, core_1.toNano)("0.1"),
        });
    }
    static lockWalletMessage(lock_address, lock, amount, query_id = 0) {
        return (0, core_1.beginCell)().storeUint(Op.call_to, 32).storeUint(query_id, 64)
            .storeAddress(lock_address)
            .storeCoins(amount)
            .storeRef((0, core_1.beginCell)().storeUint(Op.set_status, 32).storeUint(query_id, 64).storeUint(lock, 4).endCell())
            .endCell();
    }
    static parseSetStatus(slice) {
        const op = slice.loadUint(32);
        if (op !== Op.set_status)
            throw new Error('Invalid op');
        const queryId = slice.loadUint(64);
        const newStatus = slice.loadUint(4);
        endParse(slice);
        return {
            queryId,
            newStatus
        };
    }
    static parseCallTo(slice, refPrser) {
        const op = slice.loadUint(32);
        if (op !== Op.call_to)
            throw new Error('Invalid op');
        const queryId = slice.loadUint(64);
        const toAddress = slice.loadAddress();
        const tonAmount = slice.loadCoins();
        const ref = slice.loadRef();
        endParse(slice);
        return {
            queryId,
            toAddress,
            tonAmount,
            action: refPrser(ref.beginParse())
        };
    }
    async sendLockWallet(provider, via, lock_address, lock, amount = (0, core_1.toNano)('0.1'), query_id = 0) {
        const lockCmd = (0, exports.lockTypeToInt)(lock);
        await provider.internal(via, {
            sendMode: core_1.SendMode.PAY_GAS_SEPARATELY,
            body: JettonMinter.lockWalletMessage(lock_address, lockCmd, amount, query_id),
            value: amount + (0, core_1.toNano)('0.1')
        });
    }
    static forceTransferMessage(transfer_amount, to, from, custom_payload, forward_amount = 0n, forward_payload, value = (0, core_1.toNano)('0.1'), query_id = 0n) {
        const transferMessage = jetton_wallet_1.JettonWallet.transferMessage(transfer_amount, to, to, custom_payload, forward_amount, forward_payload);
        return (0, core_1.beginCell)().storeUint(Op.call_to, 32).storeUint(query_id, 64)
            .storeAddress(from)
            .storeCoins(value)
            .storeRef(transferMessage)
            .endCell();
    }
    static parseTransfer(slice) {
        const op = slice.loadUint(32);
        if (op !== Op.transfer)
            throw new Error('Invalid op');
        const queryId = slice.loadUint(64);
        const jettonAmount = slice.loadCoins();
        const toAddress = slice.loadAddress();
        const responseAddress = slice.loadAddress();
        const customPayload = slice.loadMaybeRef();
        const forwardTonAmount = slice.loadCoins();
        const inRef = slice.loadBit();
        const forwardPayload = inRef ? slice.loadRef().beginParse() : slice;
        return {
            queryId,
            jettonAmount,
            toAddress,
            responseAddress,
            customPayload,
            forwardTonAmount,
            forwardPayload
        };
    }
    async sendForceTransfer(provider, via, transfer_amount, to, from, custom_payload, forward_amount = 0n, forward_payload, value = (0, core_1.toNano)('0.1'), query_id = 0n) {
        await provider.internal(via, {
            sendMode: core_1.SendMode.PAY_GAS_SEPARATELY,
            body: JettonMinter.forceTransferMessage(transfer_amount, to, from, custom_payload, forward_amount, forward_payload, value, query_id),
            value: value + (0, core_1.toNano)('0.1')
        });
    }
    static forceBurnMessage(burn_amount, to, response, value = (0, core_1.toNano)('0.1'), query_id = 0) {
        return (0, core_1.beginCell)().storeUint(Op.call_to, 32).storeUint(query_id, 64)
            .storeAddress(to)
            .storeCoins(value)
            .storeRef(jetton_wallet_1.JettonWallet.burnMessage(burn_amount, response, null))
            .endCell();
    }
    static parseBurn(slice) {
        const op = slice.loadUint(32);
        if (op !== Op.burn)
            throw new Error('Invalid op');
        const queryId = slice.loadUint(64);
        const jettonAmount = slice.loadCoins();
        const responseAddress = slice.loadAddress();
        const customPayload = slice.loadMaybeRef();
        endParse(slice);
        return {
            queryId,
            jettonAmount,
            responseAddress,
            customPayload,
        };
    }
    async sendForceBurn(provider, via, burn_amount, address, response, value = (0, core_1.toNano)('0.1'), query_id = 0) {
        await provider.internal(via, {
            sendMode: core_1.SendMode.PAY_GAS_SEPARATELY,
            body: JettonMinter.forceBurnMessage(burn_amount, address, response, value, query_id),
            value: value + (0, core_1.toNano)('0.1')
        });
    }
    static upgradeMessage(new_code, new_data, query_id = 0) {
        return (0, core_1.beginCell)().storeUint(Op.upgrade, 32).storeUint(query_id, 64)
            .storeRef(new_data)
            .storeRef(new_code)
            .endCell();
    }
    static parseUpgrade(slice) {
        const op = slice.loadUint(32);
        if (op !== Op.upgrade)
            throw new Error('Invalid op');
        const queryId = slice.loadUint(64);
        const newData = slice.loadRef();
        const newCode = slice.loadRef();
        endParse(slice);
        return {
            queryId,
            newData,
            newCode
        };
    }
    async sendUpgrade(provider, via, new_code, new_data, value = (0, core_1.toNano)('0.1'), query_id = 0) {
        await provider.internal(via, {
            sendMode: core_1.SendMode.PAY_GAS_SEPARATELY,
            body: JettonMinter.upgradeMessage(new_code, new_data, query_id),
            value
        });
    }
    async getWalletAddress(provider, owner) {
        const res = await provider.get('get_wallet_address', [{
                type: 'slice',
                cell: (0, core_1.beginCell)().storeAddress(owner).endCell()
            }]);
        return res.stack.readAddress();
    }
    async getJettonData(provider) {
        let res = await provider.get('get_jetton_data', []);
        let totalSupply = res.stack.readBigNumber();
        let mintable = res.stack.readBoolean();
        let adminAddress = res.stack.readAddress();
        let content = res.stack.readCell();
        let walletCode = res.stack.readCell();
        return {
            totalSupply,
            mintable,
            adminAddress,
            content,
            walletCode,
        };
    }
    async getTotalSupply(provider) {
        let res = await this.getJettonData(provider);
        return res.totalSupply;
    }
    async getAdminAddress(provider) {
        let res = await this.getJettonData(provider);
        return res.adminAddress;
    }
    async getContent(provider) {
        let res = await this.getJettonData(provider);
        return res.content;
    }
    async getNextAdminAddress(provider) {
        const res = await provider.get('get_next_admin_address', []);
        return res.stack.readAddressOpt();
    }
}
exports.JettonMinter = JettonMinter;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiamV0dG9uLW1hc3Rlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb250cmFjdHMvdG9uL2pldHRvbi1tYXN0ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBa0dBLDRCQUlDO0FBRUQsd0VBV0M7QUFFRCxzREFFQztBQUVELG9FQVNDO0FBRUQsNERBU0M7QUFFRCxrREFJQztBQW5KRCxvQ0FVbUI7QUFDbkIsbURBQTZDO0FBRTdDLE1BQXNCLEVBQUU7O0FBQXhCLGdCQWtCQztBQWpCUSxXQUFRLEdBQUcsU0FBUyxDQUFDO0FBQ3JCLHdCQUFxQixHQUFHLFVBQVUsQ0FBQztBQUNuQyxvQkFBaUIsR0FBRyxVQUFVLENBQUM7QUFDL0IsV0FBUSxHQUFHLFVBQVUsQ0FBQztBQUN0QixPQUFJLEdBQUcsVUFBVSxDQUFDO0FBQ2xCLG9CQUFpQixHQUFHLFVBQVUsQ0FBQztBQUUvQix5QkFBc0IsR0FBRyxVQUFVLENBQUM7QUFDcEMsc0JBQW1CLEdBQUcsVUFBVSxDQUFDO0FBQ2pDLE9BQUksR0FBRyxVQUFVLENBQUM7QUFDbEIsZUFBWSxHQUFHLFVBQVUsQ0FBQztBQUMxQixjQUFXLEdBQUcsVUFBVSxDQUFDO0FBQ3pCLFVBQU8sR0FBRyxVQUFVLENBQUM7QUFDckIsVUFBTyxHQUFHLFVBQVUsQ0FBQztBQUNyQixTQUFNLEdBQUcsVUFBVSxDQUFDO0FBQ3BCLHNCQUFtQixHQUFHLFVBQVUsQ0FBQztBQUNqQyxhQUFVLEdBQUcsVUFBVSxDQUFDO0FBR2pDLE1BQXNCLE1BQU07O0FBQTVCLHdCQVlDO0FBWFEsaUJBQVUsR0FBRyxFQUFFLENBQUM7QUFDaEIsZUFBUSxHQUFHLE1BQU0sQ0FBQztBQUNsQixnQkFBUyxHQUFHLEVBQUUsQ0FBQztBQUNmLHVCQUFnQixHQUFHLEVBQUUsQ0FBQztBQUN0QixzQkFBZSxHQUFHLEdBQUcsQ0FBQztBQUV0QixzQkFBZSxHQUFHLEVBQUUsQ0FBQztBQUNyQixvQkFBYSxHQUFHLEVB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