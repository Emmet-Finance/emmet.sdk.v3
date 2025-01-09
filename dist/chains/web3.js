"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.web3Helper = void 0;
const ethers_1 = require("ethers");
const _1 = require(".");
const web3_1 = require("@emmet-contracts/web3");
const getConsensus_1 = require("./getConsensus");
const coder = new ethers_1.AbiCoder();
async function web3Helper({ rpcs, addressBook, chainName, nativeCoin, }) {
    const initializedProviders = rpcs.map((e) => new ethers_1.JsonRpcProvider(e));
    const cache = {};
    /**
     * @returns a random RPC provider
     */
    const fetchProvider = async () => {
        const randomRpcIndex = Math.floor(Math.random() * rpcs.length);
        if (cache[randomRpcIndex]) {
            return cache[randomRpcIndex];
        }
        const provider = initializedProviders[randomRpcIndex];
        // Liveliness check
        try {
            await provider.getNetwork();
            cache[randomRpcIndex] = provider;
            return provider;
        }
        catch {
            return await fetchProvider();
        }
    };
    // ADDRESS BOOK
    const addrBook = web3_1.EmmetAddressBook__factory.connect(addressBook, await fetchProvider());
    // BRIDGE
    const bridgeAddr = await addrBook.get("EmmetBridge");
    const bridge = web3_1.EmmetBridge__factory.connect(bridgeAddr, await fetchProvider());
    //  CONSENSUS
    const consensus = await (0, getConsensus_1.getConsensus)();
    // DATA
    const emmetData = await addrBook.get("EmmetData");
    const data = web3_1.EmmetData__factory.connect(emmetData, await fetchProvider());
    return {
        id: async () => (await (await fetchProvider()).getNetwork()).chainId,
        parseCallData: (encoded) => {
            if (encoded.slice(0, 10).toLowerCase() == "0x3ba81aee") {
                try {
                    const result = coder.decode([
                        "bytes32",
                        "tuple(uint256,uint256,uint256,uint256,uint256,uint256,uint128,uint128,string,string,string,bytes)"
                    ], "0x" + encoded.slice(10));
                    const { 0: blockNumber, 1: foreignIndexOut, 2: value, 3: timestamp, // Assuming timestamp is the 4th parameter
                    4: sentAmount, 5: receiveAmount, 6: fromChainId, 7: toChainId, 8: to, 9: fromToken, 10: toToken, 11: data } = result[1];
                    return {
                        blockNumber,
                        foreignIndexOut,
                        value,
                        timestamp,
                        sentAmount,
                        receiveAmount,
                        fromChainId,
                        toChainId,
                        to,
                        fromToken,
                        toToken,
                        data
                    };
                }
                catch (error) {
                    console.log(error);
                }
            }
            return undefined;
        },
        stakeLiquidity: async (signer, pool, amt, ga) => {
            const lp = web3_1.EmmetLP__factory.connect(pool, signer);
            const deposit = await lp.deposit(amt, { ...ga });
            return {
                hash: deposit.hash,
                tx: deposit,
            };
        },
        async getSwapResultAmount(_fromSymbol, _targetSymbol, amount, _slippage) {
            return BigInt(amount);
        },
        async crossChainStrategy(targetChain, fromSymbol, targetSymbol) {
            const outgoing = [];
            const incoming = [];
            const foreign = [];
            try {
                const ccts = await data.getStrategy(targetChain, fromSymbol, targetSymbol);
                const map = [
                    { strategies: ccts.outgoing, targetArray: outgoing },
                    { strategies: ccts.incoming, targetArray: incoming },
                    { strategies: ccts.foreign, targetArray: foreign }
                ];
                for (const { strategies, targetArray } of map) {
                    for (const strat of strategies) {
                        const strategyName = _1.strategyMap[BigInt(strat).toString()];
                        if (strategyName) {
                            targetArray.push(strategyName);
                        }
                    }
                }
            }
            catch (error) {
            }
            return {
                outgoing,
                incoming,
                foreign,
            };
        },
        findTransactionByFromHash: async (hash) => {
            try {
                const TXs = await consensus.getTransactions(100, 0);
                const filtered = TXs.filter(tx => tx.originalHash == hash.replace('0x', ''));
                return filtered[0];
            }
            catch (error) {
                return undefined;
            }
        },
        getConsensusTransaction: async (hash) => {
            try {
                const TX = await consensus.getTransaction(hash);
                return TX;
            }
            catch (error) {
                return undefined;
            }
        },
        withdrawLiquidity: async (signer, pool, amt, ga) => {
            const lp = web3_1.EmmetLP__factory.connect(pool, signer);
            const withdraw = await lp.withdrawTokens(amt, { ...ga });
            return {
                hash: withdraw.hash,
                tx: withdraw,
            };
        },
        withdrawFees: async (signer, pool, ga) => {
            const lp = web3_1.EmmetLP__factory.connect(pool, signer);
            const withdraw = await lp.withdrawFees({ ...ga });
            return {
                hash: withdraw.hash,
                tx: withdraw,
            };
        },
        getLpCurrentAPY: async (pool) => {
            const lp = web3_1.EmmetLP__factory.connect(pool, await fetchProvider());
            const apy = await lp.currentAPY();
            return apy;
        },
        getLpTotalSupply: async (pool) => {
            const lp = web3_1.EmmetLP__factory.connect(pool, await fetchProvider());
            const totalSupply = await lp.totalSupply();
            return totalSupply;
        },
        getLpTokenFee: async (pool) => {
            const lp = web3_1.EmmetLP__factory.connect(pool, await fetchProvider());
            const tokenFee = await lp.tokenFee();
            return tokenFee;
        },
        getLpProtocolFee: async (pool) => {
            const lp = web3_1.EmmetLP__factory.connect(pool, await fetchProvider());
            const protocolFee = await lp.protocolFee();
            return protocolFee;
        },
        getLpProtocolFeeAmount: async (pool) => {
            const lp = web3_1.EmmetLP__factory.connect(pool, await fetchProvider());
            const protocolFeeAmount = await lp.protocolFeeAmount();
            return protocolFeeAmount;
        },
        getLpFeeGrowthGlobal: async (pool) => {
            const lp = web3_1.EmmetLP__factory.connect(pool, await fetchProvider());
            const feeGrowthGlobal = await lp.feeGrowthGlobal();
            return feeGrowthGlobal;
        },
        getLpFeeDecimals: async (pool) => {
            const lp = web3_1.EmmetLP__factory.connect(pool, await fetchProvider());
            const feeDecimals = await lp.feeDecimals();
            return feeDecimals;
        },
        async address(contr) {
            return await addrBook.get(contr);
        },
        async bridge() {
            return await bridge.getAddress();
        },
        async txFee(targetChainId, fromToken, targetToken) {
            const isFeeERC20 = false;
            const protocolFee = await bridge.estimateFee(targetChainId, fromToken, targetToken, isFeeERC20);
            return protocolFee;
        },
        async txInfo(hash) {
            const provider = await fetchProvider();
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
            const receipt = await (await fetchProvider()).waitForTransaction(hash);
            if (!receipt)
                throw new Error(`No receipt found for tx hash: ${hash}`);
            const log = receipt.logs.find((e) => e.topics.includes(bridge.interface.getEvent("SentInstallment").topicHash));
            if (!log)
                throw new Error(`No send installment log found for tx hash: ${hash}`);
            const decode = bridge.interface.parseLog(log);
            return decode?.args.txHash;
        },
        protocolFee() {
            return Promise.resolve(50n); // data.getProtocolFee();
        },
        async token(symbol) {
            const token = await data.getToken(symbol);
            return token;
        },
        decimals: async (pool) => {
            if (!pool)
                return 18;
            return Number(await web3_1.ERC20__factory.connect(pool, await fetchProvider()).decimals());
        },
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
        getApprovedAmount: async (tid, owner, spender) => await web3_1.WrappedERC20__factory.connect(tid, await fetchProvider()).allowance(owner, spender),
        balance: async (addr) => (await fetchProvider()).getBalance(addr),
        provider: async () => await fetchProvider(),
        async estimateTime(targetChain, fromToken, targetToken) {
            // Default time
            let estimation = 2n * 60n * 1000n;
            try {
                const ts = await data.getStrategy(targetChain, fromToken, targetToken);
                const outgoing = ts[0];
                const foreign = ts[1];
                const cctpBurn = BigInt(_1.EStrategy.CCTPClaim);
                const cctpClaim = BigInt(_1.EStrategy.CCTPClaim);
                const isCCTP = foreign.includes(cctpBurn) ||
                    foreign.includes(cctpClaim) ||
                    outgoing.includes(cctpBurn) ||
                    outgoing.includes(cctpClaim);
                if (isCCTP) {
                    // 3 minutes
                    estimation = (3n * 60n) * 1000n;
                }
                else {
                    // 1 minute
                    estimation = (1n * 60n) * 1000n;
                }
            }
            catch (error) {
                console.warn(error);
            }
            return estimation;
        },
        async isTransferFromLp(targetChain, fromToken, targetToken) {
            const ts = await data.getStrategy(targetChain, fromToken, targetToken);
            const _isTransferFromLp = ts[1].includes(7n);
            return _isTransferFromLp;
        },
        protocolFeeInUSD: () => {
            // const fee = await data.protocolFee();
            // return fee.usdEquivalent;
            return 50n;
        },
        validateAddress: (addr) => Promise.resolve((0, ethers_1.isAddress)(addr)),
        getTokenAddress: async (symbol) => {
            const address = await addrBook.get(symbol);
            return address ? address : "";
        },
        tokenBalance: async (tkn, addr) => web3_1.WrappedERC20__factory.connect(tkn, await fetchProvider()).balanceOf(addr),
        sendInstallment: async (signer, amt, cid, fs, ts, da, fee, gasArgs) => {
            const params = {
                blockNumber: 0n, // populated by the contract
                isFeeERC20: false, // will add support later
                sentAmount: amt,
                receiveAmount: amt,
                toChainId: cid,
                fromToken: fs,
                toToken: ts,
                to: da,
                isSuccess: true
            };
            const sendGas = await bridge
                .connect(signer)
                .sendInstallment.estimateGas(params, {
                value: fee * 11n / 10n,
            });
            const tx = await bridge
                .connect(signer)
                .sendInstallment(params, {
                ...gasArgs,
                value: fee * 11n / 10n,
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2ViMy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jaGFpbnMvd2ViMy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSxtQ0FRZ0I7QUFLaEIsd0JBQTJDO0FBQzNDLGdEQVErQjtBQUcvQixpREFBOEM7QUFHOUMsTUFBTSxLQUFLLEdBQUcsSUFBSSxpQkFBUSxFQUFFLENBQUM7QUFFdEIsS0FBSyxVQUFVLFVBQVUsQ0FBQyxFQUMvQixJQUFJLEVBQ0osV0FBVyxFQUNYLFNBQVMsRUFDVCxVQUFVLEdBQ0M7SUFDWCxNQUFNLG9CQUFvQixHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLElBQUksd0JBQWUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3JFLE1BQU0sS0FBSyxHQUE2QixFQUFFLENBQUM7SUFFM0M7O09BRUc7SUFDSCxNQUFNLGFBQWEsR0FBRyxLQUFLLElBQXVCLEVBQUU7UUFDbEQsTUFBTSxjQUFjLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQy9ELElBQUksS0FBSyxDQUFDLGNBQWMsQ0FBQyxFQUFFLENBQUM7WUFDMUIsT0FBTyxLQUFLLENBQUMsY0FBYyxDQUFDLENBQUM7UUFDL0IsQ0FBQztRQUNELE1BQU0sUUFBUSxHQUFHLG9CQUFvQixDQUFDLGNBQWMsQ0FBQyxDQUFDO1FBQ3RELG1CQUFtQjtRQUNuQixJQUFJLENBQUM7WUFDSCxNQUFNLFFBQVEsQ0FBQyxVQUFVLEVBQUUsQ0FBQztZQUM1QixLQUFLLENBQUMsY0FBYyxDQUFDLEdBQUcsUUFBUSxDQUFDO1lBQ2pDLE9BQU8sUUFBUSxDQUFDO1FBQ2xCLENBQUM7UUFBQyxNQUFNLENBQUM7WUFDUCxPQUFPLE1BQU0sYUFBYSxFQUFFLENBQUM7UUFDL0IsQ0FBQztJQUNILENBQUMsQ0FBQztJQUVGLGVB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