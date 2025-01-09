"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JettonMinter = exports.jettonContentToCell = exports.jettonMinterConfigToCell = exports.jettonMinterConfigFullToCell = exports.parseJettonMinterData = exports.jettonMinterConfigCellToConfig = exports.endParse = exports.intToLockType = exports.lockTypeToInt = exports.LOCK_TYPES = exports.Errors = exports.Op = void 0;
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
exports.endParse = endParse;
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
exports.jettonMinterConfigCellToConfig = jettonMinterConfigCellToConfig;
function parseJettonMinterData(data) {
    return jettonMinterConfigCellToConfig(data);
}
exports.parseJettonMinterData = parseJettonMinterData;
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
exports.jettonMinterConfigFullToCell = jettonMinterConfigFullToCell;
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
exports.jettonMinterConfigToCell = jettonMinterConfigToCell;
function jettonContentToCell(content) {
    return (0, core_1.beginCell)()
        .storeStringRefTail(content.uri) //Snake logic under the hood
        .endCell();
}
exports.jettonContentToCell = jettonContentToCell;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiamV0dG9uLW1hc3Rlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb250cmFjdHMvdG9uL2pldHRvbi1tYXN0ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsb0NBVW1CO0FBQ25CLG1EQUE2QztBQUU3QyxNQUFzQixFQUFFOztBQUF4QixnQkFrQkM7QUFqQlEsV0FBUSxHQUFHLFNBQVMsQ0FBQztBQUNyQix3QkFBcUIsR0FBRyxVQUFVLENBQUM7QUFDbkMsb0JBQWlCLEdBQUcsVUFBVSxDQUFDO0FBQy9CLFdBQVEsR0FBRyxVQUFVLENBQUM7QUFDdEIsT0FBSSxHQUFHLFVBQVUsQ0FBQztBQUNsQixvQkFBaUIsR0FBRyxVQUFVLENBQUM7QUFFL0IseUJBQXNCLEdBQUcsVUFBVSxDQUFDO0FBQ3BDLHNCQUFtQixHQUFHLFVBQVUsQ0FBQztBQUNqQyxPQUFJLEdBQUcsVUFBVSxDQUFDO0FBQ2xCLGVBQVksR0FBRyxVQUFVLENBQUM7QUFDMUIsY0FBVyxHQUFHLFVBQVUsQ0FBQztBQUN6QixVQUFPLEdBQUcsVUFBVSxDQUFDO0FBQ3JCLFVBQU8sR0FBRyxVQUFVLENBQUM7QUFDckIsU0FBTSxHQUFHLFVBQVUsQ0FBQztBQUNwQixzQkFBbUIsR0FBRyxVQUFVLENBQUM7QUFDakMsYUFBVSxHQUFHLFVBQVUsQ0FBQztBQUdqQyxNQUFzQixNQUFNOztBQUE1Qix3QkFZQztBQVhRLGlCQUFVLEdBQUcsRUFBRSxDQUFDO0FBQ2hCLGVBQVEsR0FBRyxNQUFNLENBQUM7QUFDbEIsZ0JBQVMsR0FBRyxFQUFFLENBQUM7QUFDZix1QkFBZ0IsR0FBRyxFQUFFLENBQUM7QUFDdEIsc0JBQWUsR0FBRyxHQUFHLENBQUM7QUFFdEIsc0JBQWUsR0FBRyxFQUFFLENBQUM7QUFDckIsb0JBQWEsR0FBRyxFQUFFLENBQUM7QUFDbkIscUJBQWMsR0FBRyxFQUFFLENBQUM7QUFDcEIscUJBQWMsR0FBRyxFQUFFLENBQUM7QUFDcEIs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