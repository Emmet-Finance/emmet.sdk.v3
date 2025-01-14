"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JettonWallet = void 0;
exports.jettonWalletConfigToCell = jettonWalletConfigToCell;
exports.parseJettonWalletData = parseJettonWalletData;
const core_1 = require("@ton/core");
const jetton_master_1 = require("./jetton-master");
function jettonWalletConfigToCell(config) {
    return (0, core_1.beginCell)()
        .storeUint(0, 4) // status
        .storeCoins(0) // jetton balance
        .storeAddress(config.ownerAddress)
        .storeAddress(config.jettonMasterAddress)
        .endCell();
}
function parseJettonWalletData(data) {
    const sc = data.beginParse();
    const parsed = {
        status: sc.loadUint(4),
        balance: sc.loadCoins(),
        ownerAddress: sc.loadAddress(),
        jettonMasterAddress: sc.loadAddress(),
    };
    (0, jetton_master_1.endParse)(sc);
    return parsed;
}
class JettonWallet {
    constructor(address, init) {
        this.address = address;
        this.init = init;
    }
    static createFromAddress(address) {
        return new JettonWallet(address);
    }
    static createFromConfig(config, code, workchain = 0) {
        const data = jettonWalletConfigToCell(config);
        const init = { code, data };
        return new JettonWallet((0, core_1.contractAddress)(workchain, init), init);
    }
    async sendDeploy(provider, via, value) {
        await provider.internal(via, {
            value,
            sendMode: core_1.SendMode.PAY_GAS_SEPARATELY,
            body: (0, core_1.beginCell)().endCell(),
        });
    }
    async getWalletData(provider) {
        let { stack } = await provider.get('get_wallet_data', []);
        return {
            balance: stack.readBigNumber(),
            owner: stack.readAddress(),
            minter: stack.readAddress(),
            wallet_code: stack.readCell()
        };
    }
    async getJettonBalance(provider) {
        let state = await provider.getState();
        if (state.state.type !== 'active') {
            return 0n;
        }
        let res = await provider.get('get_wallet_data', []);
        return res.stack.readBigNumber();
    }
    async getWalletStatus(provider) {
        let state = await provider.getState();
        if (state.state.type !== 'active') {
            return 0;
        }
        let res = await provider.get('get_status', []);
        return res.stack.readNumber();
    }
    static transferMessage(jetton_amount, to, responseAddress, customPayload, forward_ton_amount, forwardPayload) {
        return (0, core_1.beginCell)().storeUint(jetton_master_1.Op.transfer, 32).storeUint(0, 64) // op, queryId
            .storeCoins(jetton_amount)
            .storeAddress(to)
            .storeAddress(responseAddress)
            .storeMaybeRef(customPayload)
            .storeCoins(forward_ton_amount)
            .storeMaybeRef(forwardPayload)
            .endCell();
    }
    async sendTransfer(provider, via, value, jetton_amount, to, responseAddress, customPayload, forward_ton_amount, forwardPayload) {
        await provider.internal(via, {
            sendMode: core_1.SendMode.PAY_GAS_SEPARATELY,
            body: JettonWallet.transferMessage(jetton_amount, to, responseAddress, customPayload, forward_ton_amount, forwardPayload),
            value: value
        });
    }
    /*
      burn#595f07bc query_id:uint64 amount:(VarUInteger 16)
                    response_destination:MsgAddress custom_payload:(Maybe ^Cell)
                    = InternalMsgBody;
    */
    static burnMessage(jetton_amount, responseAddress, customPayload) {
        return (0, core_1.beginCell)().storeUint(jetton_master_1.Op.burn, 32).storeUint(0, 64) // op, queryId
            .storeCoins(jetton_amount).storeAddress(responseAddress)
            .storeMaybeRef(customPayload)
            .endCell();
    }
    async sendBurn(provider, via, value, jetton_amount, responseAddress, customPayload) {
        await provider.internal(via, {
            sendMode: core_1.SendMode.PAY_GAS_SEPARATELY,
            body: JettonWallet.burnMessage(jetton_amount, responseAddress, customPayload),
            value: value
        });
    }
    /*
      withdraw_tons#107c49ef query_id:uint64 = InternalMsgBody;
    */
    static withdrawTonsMessage() {
        return (0, core_1.beginCell)().storeUint(0x6d8e5e3c, 32).storeUint(0, 64) // op, queryId
            .endCell();
    }
    async sendWithdrawTons(provider, via) {
        await provider.internal(via, {
            sendMode: core_1.SendMode.PAY_GAS_SEPARATELY,
            body: JettonWallet.withdrawTonsMessage(),
            value: (0, core_1.toNano)('0.1')
        });
    }
    /*
      withdraw_jettons#10 query_id:uint64 wallet:MsgAddressInt amount:Coins = InternalMsgBody;
    */
    static withdrawJettonsMessage(from, amount) {
        return (0, core_1.beginCell)().storeUint(0x768a50b2, 32).storeUint(0, 64) // op, queryId
            .storeAddress(from)
            .storeCoins(amount)
            .storeMaybeRef(null)
            .endCell();
    }
    async sendWithdrawJettons(provider, via, from, amount) {
        await provider.internal(via, {
            sendMode: core_1.SendMode.PAY_GAS_SEPARATELY,
            body: JettonWallet.withdrawJettonsMessage(from, amount),
            value: (0, core_1.toNano)('0.1')
        });
    }
}
exports.JettonWallet = JettonWallet;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiamV0dG9uLXdhbGxldC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb250cmFjdHMvdG9uL2pldHRvbi13YWxsZXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBUUEsNERBT0M7QUFFRCxzREFVQztBQTNCRCxvQ0FBNEg7QUFDNUgsbURBQTZDO0FBTzdDLFNBQWdCLHdCQUF3QixDQUFDLE1BQTBCO0lBQy9ELE9BQU8sSUFBQSxnQkFBUyxHQUFFO1NBQ2IsU0FBUyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxTQUFTO1NBQ3pCLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxpQkFBaUI7U0FDL0IsWUFBWSxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUM7U0FDakMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxtQkFBbUIsQ0FBQztTQUN4QyxPQUFPLEVBQUUsQ0FBQztBQUNuQixDQUFDO0FBRUQsU0FBZ0IscUJBQXFCLENBQUMsSUFBVTtJQUM1QyxNQUFNLEVBQUUsR0FBRyxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUE7SUFDNUIsTUFBTSxNQUFNLEdBQUc7UUFDWCxNQUFNLEVBQUUsRUFBRSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7UUFDdEIsT0FBTyxFQUFFLEVBQUUsQ0FBQyxTQUFTLEVBQUU7UUFDdkIsWUFBWSxFQUFFLEVBQUUsQ0FBQyxXQUFXLEVBQUU7UUFDOUIsbUJBQW1CLEVBQUUsRUFBRSxDQUFDLFdBQVcsRUFBRTtLQUN4QyxDQUFDO0lBQ0YsSUFBQSx3QkFBUSxFQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQ2IsT0FBTyxNQUFNLENBQUM7QUFDbEIsQ0FBQztBQUVELE1BQWEsWUFBWTtJQUNyQixZQUFxQixPQUFnQixFQUFXLElBQWlDO1FBQTVELFlBQU8sR0FBUCxPQUFPLENBQVM7UUFBVyxTQUFJLEdBQUosSUFBSSxDQUE2QjtJQUFHLENBQUM7SUFFckYsTUFBTSxDQUFDLGlCQUFpQixDQUFDLE9BQWdC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