"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JettonWallet = exports.parseJettonWalletData = exports.jettonWalletConfigToCell = void 0;
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
exports.jettonWalletConfigToCell = jettonWalletConfigToCell;
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
exports.parseJettonWalletData = parseJettonWalletData;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiamV0dG9uLXdhbGxldC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb250cmFjdHMvdG9uL2pldHRvbi13YWxsZXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsb0NBQTRIO0FBQzVILG1EQUE2QztBQU83QyxTQUFnQix3QkFBd0IsQ0FBQyxNQUEwQjtJQUMvRCxPQUFPLElBQUEsZ0JBQVMsR0FBRTtTQUNiLFNBQVMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsU0FBUztTQUN6QixVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsaUJBQWlCO1NBQy9CLFlBQVksQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDO1NBQ2pDLFlBQVksQ0FBQyxNQUFNLENBQUMsbUJBQW1CLENBQUM7U0FDeEMsT0FBTyxFQUFFLENBQUM7QUFDbkIsQ0FBQztBQVBELDREQU9DO0FBRUQsU0FBZ0IscUJBQXFCLENBQUMsSUFBVTtJQUM1QyxNQUFNLEVBQUUsR0FBRyxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUE7SUFDNUIsTUFBTSxNQUFNLEdBQUc7UUFDWCxNQUFNLEVBQUUsRUFBRSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7UUFDdEIsT0FBTyxFQUFFLEVBQUUsQ0FBQyxTQUFTLEVBQUU7UUFDdkIsWUFBWSxFQUFFLEVBQUUsQ0FBQyxXQUFXLEVBQUU7UUFDOUIsbUJBQW1CLEVBQUUsRUFBRSxDQUFDLFdBQVcsRUFBRTtLQUN4QyxDQUFDO0lBQ0YsSUFBQSx3QkFBUSxFQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQ2IsT0FBTyxNQUFNLENBQUM7QUFDbEIsQ0FBQztBQVZELHNEQVVDO0FBRUQsTUFBYSxZQUFZO0lBQ3JCLFlBQXFCLE9BQWdCLEVBQVcsSUFBaUM7UUFBNUQsWUFBTyxHQUFQLE9BQU8sQ0FBUztRQUFXLFNBQUksR0FBSixJQUFJLENBQTZCO0lBQUcsQ0FBQztJQUVyRixNQUFNLENBQUMsaUJBQWlCLENBQUMsT0FBZ0I7UUFDckMsT0FBTyxJQUFJLFlBQVksQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUNyQyxDQUFDO0lBRUQsTUFBTSxDQUFDLGdCQUFnQixDQUFDLE1BQTBCLEVBQUUsSUFBVSxFQUFFLFNBQVMsR0FBRyxDQUFDO1FBQ3pFLE1BQU0sSUFBSSxHQUFHLHdCQUF3QixDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQzlDLE1BQU0sSUFBSSxHQUFHLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxDQUFDO1FBQzVCLE9BQU8sSUFBSSxZQUFZLENBQUMsSUFBQSxzQkFBZSxFQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQztJQUNwRSxDQUFDO0lBRUQsS0FBSyxDQUFDLFVBQVUsQ0FBQyxRQUEwQixFQUFFLEdBQVcsRUFBRSxLQUFhO1FBQ25FLE1BQU0sUUFBUSxDQUFDLFFBQVEsQ0FBQyxHQUFHLEVBQUU7WUFDekIsS0FBSztZQUNMLFFBQVEsRUFBRSxlQUFRLENBQUMsa0JBQWtCO1lBQ3JDLElBQUksRUFBRSxJQUFBLGdCQUFTLEdBQUUsQ0FBQyxPQUFPLEVBQUU7U0FDOUIsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVELEtBQUssQ0FBQyxhQUFhLENBQUMsUUFBMEI7UUFDMUMsSUFBSSxFQUFFLEtBQUssRUFBRSxHQUFHLE1BQU0sUUFBUSxDQUFDLEdBQUcsQ0FBQyxpQkFBaUIsRUFBRSxFQUFFLENBQUMsQ0FBQztRQUMxRCxPQUFPO1lBQ0gsT0FBTyxFQUFFLEtBQUssQ0FBQyxhQUFhLEVBQUU7WUFDOUIsS0FBSyxFQUFFLEtBQUssQ0FBQyxXQUFXLEVBQUU7WUFDMUIsTUFBTSxFQUFFLEtBQUssQ0FBQyxXQUFXLEVBQUU7WUFDM0IsV0FBVyxFQUFFLEtBQUssQ0FBQyxRQUFRLEVBQUU7U0FDaEMsQ0FBQTtJQUNMLENBQUM7SUFDRCxLQUFLLENBQUMsZ0JBQWdCLENBQUMsUUFBMEI7UUFDN0MsSUFBSSxLQUFLLEdBQUcsTUFBTSxRQUFRLENBQUMsUUFBUSxFQUFFLENBQUM7UUFDdEMsSUFBSSxLQUFLLENBQUMsS0FBSyxDQUFDLElBQUksS0FBSyxRQUFRLEVBQUUsQ0FBQztZQUNoQyxPQUFPLEVBQUUsQ0FBQztRQUNkLENBQUM7UUFDRCxJQUFJLEdBQUcsR0FBRyxNQUFNLFFBQVEsQ0FBQyxHQUFHLENBQUMsaUJBQWlCLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFDcEQsT0FBTyxHQUFHLENBQUMsS0FBSyxDQUFDLGFBQWEsRUFBRSxDQUFDO0lBQ3JDLENBQUM7SUFDRCxLQUFLLENBQUMsZUFBZSxDQUFDLFFBQTBCO1FBQzVDLElBQUksS0FBSyxHQUFHLE1BQU0sUUFBUSxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBQ3RDLElBQUksS0FBSyxDQUFDLEtBQUssQ0FBQyxJQUFJLEtBQUssUUFBUSxFQUFFLENBQUM7WUFDaEMsT0FBTyxDQUFDLENBQUM7UUFDYixDQUFDO1FBQ0QsSUFBSSxHQUFHLEdBQUcsTUFBTSxRQUFRLENBQUMsR0FBRyxDQUFDLFlBQVksRUFBRSxFQUFFLENBQUMsQ0FBQztRQUMvQyxPQUFPLEdBQUcsQ0FBQyxLQUFLLENBQUMsVUFBVSxFQUFFLENBQUM7SUFDbEMsQ0FBQztJQUNELE1BQU0sQ0FBQyxlQUFlLENBQUMsYUFBcUIsRUFBRSxFQUFXLEVBQ2xDLGVBQThCLEVBQzlCLGFBQTBCLEVBQzFCLGtCQUEwQixFQUMxQixjQUEyQjtRQUU5QyxPQUFPLElBQUEsZ0JBQVMsR0FBRSxDQUFDLFNBQVMsQ0FBQyxrQkFBRSxDQUFDLFFBQVEsRUFBRSxFQUFFLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLGNBQWM7YUFDMUQsVUFBVSxDQUFDLGFBQWEsQ0FBQzthQUN6QixZQUFZLENBQUMsRUFBRSxDQUFDO2FBQ2hCLFlBQVksQ0FBQyxlQUFlLENBQUM7YUFDN0IsYUFBYSxDQUFDLGFBQWEsQ0FBQzthQUM1QixVQUFVLENBQUMsa0JBQWtCLENBQUM7YUFDOUIsYUFBYSxDQUFDLGNBQWMsQ0FBQzthQUN4QyxPQUFPLEVBQUUsQ0FBQztJQUN0QixDQUFDO0lBQ0QsS0FBSyxDQUFDLFlBQVksQ0FBQyxRQUEwQixFQUFFLEdBQVcsRUFDaEMsS0FBYSxFQUNiLGFBQXFCLEVBQ3JCLEVBQVcsRUFDWCxlQUF1QixFQUN2QixhQUEwQixFQUMxQixrQkFBMEIsRUFDMUIsY0FBMkI7UUFDakQsTUFBTSxRQUFRLENBQUMsUUFBUSxDQUFDLEdBQUcsRUFBRTtZQUN6QixRQUFRLEVBQUUsZUFBUSxDQUFDLGtCQUFrQjtZQUNyQyxJQUFJLEVBQUUsWUFBWSxDQUFDLGVBQWUsQ0FBQyxhQUFhLEVBQUUsRUFBRSxFQUFFLGVBQWUsRUFBRSxhQUFhLEVBQUUsa0JBQWtCLEVBQUUsY0FBYyxDQUFDO1lBQ3pILEtBQUssRUFBQyxLQUFLO1NBQ2QsQ0FBQyxDQUFDO0lBRVAsQ0FBQztJQUNEOzs7O01BSUU7SUFDRixNQUFNLENBQUMsV0FBVyxDQUFDLGFBQXFCLEVBQ3JCLGVBQThCLEVBQzlCLGFBQTBCO1FBQ3pDLE9BQU8sSUFBQSxnQkFBUyxHQUFFLENBQUMsU0FBUyxDQUFDLGtCQUFFLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsY0FBYzthQUN0RCxVQUFVLENBQUMsYUFBYSxDQUFDLENBQUMsWUFBWSxDQUFDLGVBQWUsQ0FBQzthQUN2RCxhQUFhLENBQUMsYUFBYSxDQUFDO2FBQ3ZDLE9BQU8sRUFBRSxDQUFDO0lBQ3RCLENBQUM7SUFFRCxLQUFLLENBQUMsUUFBUSxDQUFDLFFBQTBCLEVBQUUsR0FBVyxFQUFFLEtBQWEsRUFDL0MsYUFBcUIsRUFDckIsZUFBOEIsRUFDOUIsYUFBMEI7UUFDNUMsTUFBTSxRQUFRLENBQUMsUUFBUSxDQUFDLEdBQUcsRUFBRTtZQUN6QixRQUFRLEVBQUUsZUFBUSxDQUFDLGtCQUFrQjtZQUNyQyxJQUFJLEVBQUUsWUFBWSxDQUFDLFdBQVcsQ0FBQyxhQUFhLEVBQUUsZUFBZSxFQUFFLGFBQWEsQ0FBQztZQUM3RSxLQUFLLEVBQUMsS0FBSztTQUNkLENBQUMsQ0FBQztJQUVQLENBQUM7SUFDRDs7TUFFRTtJQUNGLE1BQU0sQ0FBQyxtQkFBbUI7UUFDdEIsT0FBTyxJQUFBLGdCQUFTLEdBQUUsQ0FBQyxTQUFTLENBQUMsVUFBVSxFQUFFLEVBQUUsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsY0FBYzthQUNwRSxPQUFPLEVBQUUsQ0FBQztJQUN0QixDQUFDO0lBRUQsS0FBSyxDQUFDLGdCQUFnQixDQUFDLFFBQTBCLEVBQUUsR0FBVztRQUMxRCxNQUFNLFFBQVEsQ0FBQyxRQUFRLENBQUMsR0FBRyxFQUFFO1lBQ3pCLFFBQVEsRUFBRSxlQUFRLENBQUMsa0JBQWtCO1lBQ3JDLElBQUksRUFBRSxZQUFZLENBQUMsbUJBQW1CLEVBQUU7WUFDeEMsS0FBSyxFQUFDLElBQUEsYUFBTSxFQUFDLEtBQUssQ0FBQztTQUN0QixDQUFDLENBQUM7SUFFUCxDQUFDO0lBQ0Q7O01BRUU7SUFDRixNQUFNLENBQUMsc0JBQXNCLENBQUMsSUFBWSxFQUFFLE1BQWE7UUFDckQsT0FBTyxJQUFBLGdCQUFTLEdBQUUsQ0FBQyxTQUFTLENBQUMsVUFBVSxFQUFFLEVBQUUsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsY0FBYzthQUN6RCxZQUFZLENBQUMsSUFBSSxDQUFDO2FBQ2xCLFVBQVUsQ0FBQyxNQUFNLENBQUM7YUFDbEIsYUFBYSxDQUFDLElBQUksQ0FBQzthQUM5QixPQUFPLEVBQUUsQ0FBQztJQUN0QixDQUFDO0lBRUQsS0FBSyxDQUFDLG1CQUFtQixDQUFDLFFBQTBCLEVBQUUsR0FBVyxFQUFFLElBQVksRUFBRSxNQUFhO1FBQzFGLE1BQU0sUUFBUSxDQUFDLFFBQVEsQ0FBQyxHQUFHLEVBQUU7WUFDekIsUUFBUSxFQUFFLGVBQVEsQ0FBQyxrQkFBa0I7WUFDckMsSUFBSSxFQUFFLFlBQVksQ0FBQyxzQkFBc0IsQ0FBQyxJQUFJLEVBQUUsTUFBTSxDQUFDO1lBQ3ZELEtBQUssRUFBQyxJQUFBLGFBQU0sRUFBQyxLQUFLLENBQUM7U0FDdEIsQ0FBQyxDQUFDO0lBRVAsQ0FBQztDQUNKO0FBeElELG9DQXdJQyJ9