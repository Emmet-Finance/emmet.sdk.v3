"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.web3Helper = void 0;
const ethers_1 = require("ethers");
const _1 = require(".");
const web3_1 = require("@emmet-contracts/web3");
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
    const consAddress = await addrBook.get("Consensus");
    const consensus = web3_1.Consensus__factory.connect(consAddress, await fetchProvider());
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
            return amount;
        },
        async crossChainStrategy(targetChain, fromSymbol, targetSymbol) {
            const ccts = await data.getStrategy(targetChain, fromSymbol, targetSymbol);
            const outgoing = [];
            const incoming = [];
            const foreign = [];
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
        getLpProviderRewards: async (pool, address) => {
            const lp = web3_1.EmmetLP__factory.connect(pool, await fetchProvider());
            const providerRewards = await lp.getProviderRewards(address);
            return providerRewards;
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
                // 2 minutes
                const timeInMs = (2n * 60n) * 1000n;
                return timeInMs;
            }
            else {
                // 1 minute
                const timeInMs = (1n * 60n) * 1000n;
                return timeInMs;
            }
            return undefined;
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
                value: fee,
            });
            const tx = await bridge
                .connect(signer)
                .sendInstallment(params, {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2ViMy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jaGFpbnMvd2ViMy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSxtQ0FTZ0I7QUF5Q2hCLHdCQUEyQztBQUMzQyxnREFTK0I7QUFJL0IsTUFBTSxLQUFLLEdBQUcsSUFBSSxpQkFBUSxFQUFFLENBQUM7QUErQ3RCLEtBQUssVUFBVSxVQUFVLENBQUMsRUFDL0IsSUFBSSxFQUNKLFdBQVcsRUFDWCxTQUFTLEVBQ1QsVUFBVSxHQUNDO0lBQ1gsTUFBTSxvQkFBb0IsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxJQUFJLHdCQUFlLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNyRSxNQUFNLEtBQUssR0FBNkIsRUFBRSxDQUFDO0lBRTNDOztPQUVHO0lBQ0gsTUFBTSxhQUFhLEdBQUcsS0FBSyxJQUF1QixFQUFFO1FBQ2xELE1BQU0sY0FBYyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUMvRCxJQUFJLEtBQUssQ0FBQyxjQUFjLENBQUMsRUFBRSxDQUFDO1lBQzFCLE9BQU8sS0FBSyxDQUFDLGNBQWMsQ0FBQyxDQUFDO1FBQy9CLENBQUM7UUFDRCxNQUFNLFFBQVEsR0FBRyxvQkFBb0IsQ0FBQyxjQUFjLENBQUMsQ0FBQztRQUN0RCxtQkFBbUI7UUFDbkIsSUFBSSxDQUFDO1lBQ0gsTUFBTSxRQUFRLENBQUMsVUFBVSxFQUFFLENBQUM7WUFDNUIsS0FBSyxDQUFDLGNBQWMsQ0FBQyxHQUFHLFFBQVEsQ0FBQztZQUNqQyxPQUFPLFFBQVEsQ0FBQztRQUNsQixDQUFDO1FBQUMsTUFBTSxDQUFDO1lBQ1AsT0FBTyxNQUFNLGFBQWEsRUFBRSxDQUFDO1FBQy9CLENBQUM7SUFDSCxDQUFDLENBQUM7SUFFRixlQUFlO0lBQ2YsTUFB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