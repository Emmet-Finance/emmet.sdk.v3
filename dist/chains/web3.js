"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.web3Helper = void 0;
const ethers_1 = require("ethers");
const web3_1 = require("@emmet-contracts/web3");
async function web3Helper({ provider, addressBook, chainName, nativeCoin, }) {
    const addrBook = web3_1.EmmetAddressBook__factory.connect(addressBook, provider);
    const bridgeAddr = await addrBook.get("EmmetBridge");
    const emmetData = await addrBook.get("EmmetData");
    const bridge = web3_1.EmmetBridge__factory.connect(bridgeAddr, provider);
    const data = web3_1.EmmetData__factory.connect(emmetData, provider);
    return {
        id: async () => (await provider.getNetwork()).chainId,
        stakeLiquidity: async (signer, pool, amt, ga) => {
            const lp = web3_1.EmmetLPV2__factory.connect(pool, signer);
            const deposit = await lp.deposit(amt, { ...ga });
            return {
                hash: deposit.hash,
                tx: deposit,
            };
        },
        withdrawLiquidity: async (signer, pool, amt, ga) => {
            const lp = web3_1.EmmetLPV2__factory.connect(pool, signer);
            const withdraw = await lp.withdrawTokens(amt, { ...ga });
            return {
                hash: withdraw.hash,
                tx: withdraw,
            };
        },
        getLpCurrentAPY: async (pool) => {
            const lp = web3_1.EmmetLPV2__factory.connect(pool);
            const apy = await lp.currentAPY();
            return apy;
        },
        getLpTotalSupply: async (pool) => {
            const lp = web3_1.EmmetLPV2__factory.connect(pool);
            const totalSupply = await lp.totalSupply();
            return totalSupply;
        },
        getLpTokenFee: async (pool) => {
            const lp = web3_1.EmmetLPV2__factory.connect(pool);
            const tokenFee = await lp.tokenFee();
            return tokenFee;
        },
        getLpProtocolFee: async (pool) => {
            const lp = web3_1.EmmetLPV2__factory.connect(pool);
            const protocolFee = await lp.protocolFee();
            return protocolFee;
        },
        getLpProtocolFeeAmount: async (pool) => {
            const lp = web3_1.EmmetLPV2__factory.connect(pool);
            const protocolFeeAmount = await lp.protocolFeeAmount();
            return protocolFeeAmount;
        },
        async address(contr) {
            return await addrBook.get(contr);
        },
        async bridge() {
            return await bridge.getAddress();
        },
        async txFee(targetChainId, fromToken, targetToken) {
            const protocolFee = await data.getProtocolFee();
            const ffc = await data.getForeignFeeCompensation(targetChainId, fromToken, targetToken);
            return protocolFee + ffc;
        },
        async txInfo(hash) {
            if (hash === "") {
                return {
                    timestamp: 0n,
                    value: 0n,
                };
            }
            if (!hash.startsWith("0x")) {
                //biome-ignore lint/style/noParameterAssign: ignore
                hash = `0x${hash}`;
            }
            try {
                const receipt = await provider.waitForTransaction(hash);
                if (!receipt)
                    throw new Error(`No such transaction found with hash: ${hash}`);
                const block = await provider.getBlock(receipt.blockNumber);
                return {
                    timestamp: BigInt(block?.timestamp ?? 0),
                    value: receipt.fee,
                };
            }
            catch (e) {
                return {
                    timestamp: 0n,
                    value: 0n,
                };
            }
        },
        async emmetHashFromtx(hash) {
            const receipt = await provider.waitForTransaction(hash);
            if (!receipt)
                throw new Error(`No receipt found for tx hash: ${hash}`);
            const log = receipt.logs.find((e) => e.topics.includes(bridge.interface.getEvent("SendInstallment").topicHash));
            if (!log)
                throw new Error(`No send installment log found for tx hash: ${hash}`);
            const decode = bridge.interface.parseLog(log);
            return decode?.args.txHash;
        },
        protocolFee() {
            return data.getProtocolFee();
        },
        async token(symbol) {
            const token = await data.getToken(symbol);
            return {
                address: token.addr,
                swap: token.swap,
                decimals: token.decimals,
                fee: token.fee,
                feeDecimals: token.feeDecimals,
                symbol: token.symbol,
            };
        },
        decimals: () => 18,
        nativeCoin: () => nativeCoin,
        chainName: () => chainName,
        preTransfer: async (signer, tid, spender, amt, gasArgs) => {
            const erc = web3_1.WrappedERC20__factory.connect(tid, signer);
            const preTransferGas = await erc.approve.estimateGas(spender, amt);
            const approved = await erc.approve(spender, amt, {
                ...gasArgs,
                gasLimit: preTransferGas,
            });
            await approved.wait();
            return approved.hash;
        },
        getApprovedAmount: async (tid, owner, spender) => await web3_1.WrappedERC20__factory.connect(tid, provider).allowance(owner, spender),
        balance: (addr) => provider.getBalance(addr),
        provider: () => provider,
        async estimateTime(targetChain, fromToken, targetToken) {
            const ts = await data.getCrossChainTokenStrategy(targetChain, fromToken, targetToken);
            const localSteps = ts[0];
            const foreignSteps = ts[1];
            const isCCTP = foreignSteps.includes(1n) ||
                foreignSteps.includes(2n) ||
                localSteps.includes(1n) ||
                localSteps.includes(2n);
            if (isCCTP) {
                const time = await data.getCCTPChain(targetChain);
                const timeInMs = (time.awaitMinutes * 60n + time.awaitSeconds) * 1000n;
                return timeInMs;
            }
            return undefined;
        },
        protocolFeeInUSD: async () => {
            const fee = await data.protocolFee();
            return fee.usdEquivalent;
        },
        validateAddress: (addr) => Promise.resolve((0, ethers_1.isAddress)(addr)),
        tokenBalance: async (tkn, addr) => web3_1.WrappedERC20__factory.connect(tkn, provider).balanceOf(addr),
        sendInstallment: async (signer, amt, cid, fs, ts, da, fee, gasArgs) => {
            const sendGas = await bridge
                .connect(signer)
                .sendInstallment.estimateGas(cid, amt, fs, ts, da, {
                value: fee,
            });
            const tx = await bridge
                .connect(signer)
                .sendInstallment(cid, amt, fs, ts, da, {
                ...gasArgs,
                value: fee,
                gasLimit: sendGas,
            });
            return {
                hash: tx.hash,
                tx: tx,
            };
        },
    };
}
exports.web3Helper = web3Helper;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2ViMy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jaGFpbnMvd2ViMy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSxtQ0FNZ0I7QUE4QmhCLGdEQU0rQjtBQXNDeEIsS0FBSyxVQUFVLFVBQVUsQ0FBQyxFQUMvQixRQUFRLEVBQ1IsV0FBVyxFQUNYLFNBQVMsRUFDVCxVQUFVLEdBQ0M7SUFDWCxNQUFNLFFBQVEsR0FBRyxnQ0FBeUIsQ0FBQyxPQUFPLENBQUMsV0FBVyxFQUFFLFFBQVEsQ0FBQyxDQUFDO0lBQzFFLE1BQU0sVUFBVSxHQUFHLE1BQU0sUUFBUSxDQUFDLEdBQUcsQ0FBQyxhQUFhLENBQUMsQ0FBQztJQUNyRCxNQUFNLFNBQVMsR0FBRyxNQUFNLFFBQVEsQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDLENBQUM7SUFDbEQsTUFBTSxNQUFNLEdBQUcsMkJBQW9CLENBQUMsT0FBTyxDQUFDLFVBQVUsRUFBRSxRQUFRLENBQUMsQ0FBQztJQUNsRSxNQUFNLElBQUksR0FBRyx5QkFBa0IsQ0FBQyxPQUFPLENBQUMsU0FBUyxFQUFFLFFBQVEsQ0FBQyxDQUFDO0lBQzdELE9BQU87UUFDTCxFQUFFLEVBQUUsS0FBSyxJQUFJLEVBQUUsQ0FBQyxDQUFDLE1BQU0sUUFBUSxDQUFDLFVBQVUsRUFBRSxDQUFDLENBQUMsT0FBTztRQUNyRCxjQUFjLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsR0FBRyxFQUFFLEVBQUUsRUFBRSxFQUFFO1lBQzlDLE1BQU0sRUFBRSxHQUFHLHlCQUFrQixDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsTUFBTSxDQUFDLENBQUM7WUFDcEQsTUFBTSxPQUFPLEdBQUcsTUFBTSxFQUFFLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxFQUFFLEdBQUcsRUFBRSxFQUFFLENBQUMsQ0FBQztZQUNqRCxPQUFPO2dCQUNMLElBQUksRUFBRSxPQUFPLENBQUMsSUFBSTtnQkFDbEIs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