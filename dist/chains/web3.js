"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.web3Helper = web3Helper;
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
            await (0, _1.sleep)(1000);
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
    //          F U N C T I O N S
    // -------------------------------------
    async function getAddressByName(name) {
        let address = "";
        try {
            address = await addrBook.get(name);
        }
        catch (error) {
            throw new Error("Emmet.SDK getAddressByName: " + error.message);
        }
        return address;
    }
    // -------------------------------------
    async function getLpByName(poolName, signer) {
        let lp = undefined;
        try {
            const lpAddress = await getAddressByName(poolName);
            lp = web3_1.EmmetLP__factory.connect(lpAddress, signer ? signer : await fetchProvider());
        }
        catch (error) {
            throw new Error("Emmet.SDK getLpByName: " + error.message);
        }
        return lp;
    }
    // -------------------------------------
    function formatedPoolName(poolName) {
        return poolName.includes("elp")
            ? poolName
            : `elp${poolName}`;
    }
    return {
        // -----------------------------------------------------------------
        //                          C O M M O N
        // -----------------------------------------------------------------
        async address(contr) {
            return await addrBook.get(contr);
        },
        // -----------------------------------------------------------------
        async bridge() {
            return await bridge.getAddress();
        },
        // -----------------------------------------------------------------
        id: async () => (await (await fetchProvider()).getNetwork()).chainId,
        // -----------------------------------------------------------------
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
        // -----------------------------------------------------------------
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
        // -----------------------------------------------------------------
        protocolFeeInUSD: () => {
            // const fee = await data.protocolFee();
            // return fee.usdEquivalent;
            return 50n;
        },
        // -----------------------------------------------------------------
        validateAddress: (addr) => Promise.resolve((0, ethers_1.isAddress)(addr)),
        // -----------------------------------------------------------------
        getTokenAddress: async (symbol) => {
            const address = await addrBook.get(symbol);
            return address ? address : "";
        },
        // -----------------------------------------------------------------
        tokenBalance: async (tkn, addr) => web3_1.WrappedERC20__factory.connect(tkn, await fetchProvider()).balanceOf(addr),
        // -----------------------------------------------------------------
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
        // -----------------------------------------------------------------
        protocolFee() {
            return Promise.resolve(50n); // data.getProtocolFee();
        },
        // -----------------------------------------------------------------
        async token(symbol) {
            const token = await data.getToken(symbol);
            return token;
        },
        // -----------------------------------------------------------------
        decimals: async (pool) => {
            if (!pool)
                return 18;
            return Number(await web3_1.ERC20__factory.connect(pool, await fetchProvider()).decimals());
        },
        // -----------------------------------------------------------------
        nativeCoin: () => nativeCoin,
        // -----------------------------------------------------------------
        chainName: () => chainName,
        // -----------------------------------------------------------------
        getApprovedAmount: async (tid, owner, spender) => await web3_1.WrappedERC20__factory.connect(tid, await fetchProvider()).allowance(owner, spender),
        // -----------------------------------------------------------------
        balance: async (addr) => (await fetchProvider()).getBalance(addr),
        // -----------------------------------------------------------------
        provider: async () => await fetchProvider(),
        // -----------------------------------------------------------------
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
        // -----------------------------------------------------------------
        //                  L I Q U D I T Y  P O O L
        // -----------------------------------------------------------------
        async getLpData(poolName) {
            let data = {
                $$type: "LPData",
                apy: 0n,
                available_underlying: 0n,
                decimals: 0n,
                fee_growth_global: 0n,
                fee_decimals: 0n,
                protocol_fee: 0n,
                protocol_fee_amount: 0n,
                token_fee: 0n,
                total_supply: 0n,
            };
            try {
                const lp = await getLpByName(formatedPoolName(poolName));
                // Use a fallback value to ensure type safety
                const lpData = await lp?.getData();
                if (lpData) {
                    data = {
                        $$type: "LPData", // Set the required value for $$type
                        apy: lpData.apy,
                        available_underlying: lpData.availableUnderlying,
                        decimals: lpData.tokenDecimals,
                        fee_growth_global: lpData.globalRewards,
                        fee_decimals: lpData.feesDecimals,
                        protocol_fee: lpData.communityFee,
                        protocol_fee_amount: lpData.stakerFee,
                        token_fee: lpData.stakerFee, // Adjust as needed
                        total_supply: lpData.supply,
                    };
                }
            }
            catch (error) {
                console.warn("Emmet.SDK getLpData " + error.message);
                await (0, _1.sleep)(1000);
            }
            return data;
        },
        // -----------------------------------------------------------------
        async getRewards(poolName, staker) {
            let rewards = 0n;
            try {
                const lp = await getLpByName(formatedPoolName(poolName));
                rewards = await lp?.getProviderRewards(staker);
            }
            catch (error) {
                console.warn("Emmet.SDK getRewards " + error.message);
            }
            return rewards;
        },
        // -----------------------------------------------------------------
        async getPosition(poolName, staker) {
            let position = {
                "$$type": "Position",
                balance: 0n,
                last_fee_growth: 0n,
                rewards: 0n
            };
            try {
                const lp = await getLpByName(formatedPoolName(poolName));
                const lpPosition = await lp?.getPosition(staker);
                if (lpPosition) {
                    position = {
                        ...position,
                        balance: lpPosition.balance,
                        last_fee_growth: lpPosition.internalFeeGrowth,
                        rewards: lpPosition.rewards
                    };
                }
            }
            catch (error) {
                console.warn("Emmet.SDK getPosition " + error.message);
            }
            return position;
        },
        // -----------------------------------------------------------------
        async stakeToken(poolName, signer, amount, gasArgs) {
            let result;
            try {
                const lp = await getLpByName(formatedPoolName(poolName), signer);
                result = await lp?.deposit(amount, { ...gasArgs });
            }
            catch (error) {
                console.warn("Emmet.SDK stakeToken " + error.message);
            }
            return result;
        },
        // -----------------------------------------------------------------
        async stakeCoin(signer, amount) {
            let result;
            try {
                const lp = await getLpByName(formatedPoolName(nativeCoin), signer);
                result = await lp?.deposit(amount);
            }
            catch (error) {
                console.warn("Emmet.SDK stakeCoin " + error.message);
            }
            return result;
        },
        // -----------------------------------------------------------------
        stakeLiquidity: async (// DEPRECATED (to be removed)
        signer, pool, amount, ga) => {
            const lp = web3_1.EmmetLP__factory.connect(pool, signer);
            const deposit = await lp.deposit(amount, { ...ga });
            return {
                hash: deposit.hash,
                tx: deposit,
            };
        },
        // -----------------------------------------------------------------
        withdrawLiquidity: async (signer, pool, amt, ga) => {
            const lp = web3_1.EmmetLP__factory.connect(pool, signer);
            const withdraw = await lp.withdrawTokens(amt, { ...ga });
            return {
                hash: withdraw.hash,
                tx: withdraw,
            };
        },
        // -----------------------------------------------------------------
        withdrawFees: async (signer, pool, ga) => {
            const lp = web3_1.EmmetLP__factory.connect(pool, signer);
            const withdraw = await lp.withdrawFees({ ...ga });
            return {
                hash: withdraw.hash,
                tx: withdraw,
            };
        },
        // -----------------------------------------------------------------
        getLpCurrentAPY: async (pool) => {
            const lp = web3_1.EmmetLP__factory.connect(pool, await fetchProvider());
            const apy = await lp.currentAPY();
            return apy;
        },
        // -----------------------------------------------------------------
        getLpTotalSupply: async (pool) => {
            const lp = web3_1.EmmetLP__factory.connect(pool, await fetchProvider());
            const totalSupply = await lp.totalSupply();
            return totalSupply;
        },
        // -----------------------------------------------------------------
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
        // -----------------------------------------------------------------
        getLpProtocolFeeAmount: async (pool) => {
            const lp = web3_1.EmmetLP__factory.connect(pool, await fetchProvider());
            const protocolFeeAmount = await lp.protocolFeeAmount();
            return protocolFeeAmount;
        },
        // -----------------------------------------------------------------
        getLpFeeGrowthGlobal: async (pool) => {
            const lp = web3_1.EmmetLP__factory.connect(pool, await fetchProvider());
            const feeGrowthGlobal = await lp.feeGrowthGlobal();
            return feeGrowthGlobal;
        },
        // -----------------------------------------------------------------
        getLpFeeDecimals: async (pool) => {
            const lp = web3_1.EmmetLP__factory.connect(pool, await fetchProvider());
            const feeDecimals = await lp.feeDecimals();
            return feeDecimals;
        },
        // -----------------------------------------------------------------
        async isTransferFromLp(targetChain, fromToken, targetToken) {
            const ts = await data.getStrategy(targetChain, fromToken, targetToken);
            const _isTransferFromLp = ts[1].includes(7n);
            return _isTransferFromLp;
        },
        // -----------------------------------------------------------------
        //                  E X P L O R E R   R E L A T E D
        // -----------------------------------------------------------------
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
        // -----------------------------------------------------------------
        getConsensusTransaction: async (hash) => {
            try {
                const TX = await consensus.getTransaction(hash);
                return TX;
            }
            catch (error) {
                return undefined;
            }
        },
        // -----------------------------------------------------------------
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
        // -----------------------------------------------------------------
        //                  B R I D G E   R E L A T E D
        // -----------------------------------------------------------------
        preTransfer: async (signer, tid, spender, amt, gasArgs) => {
            const erc = web3_1.WrappedERC20__factory.connect(tid, signer);
            try {
            }
            catch (error) {
            }
            const preTransferGas = await erc.approve.estimateGas(spender, amt);
            const approved = await erc.approve(spender, amt, {
                ...gasArgs,
                gasLimit: preTransferGas,
            });
            await approved.wait();
            return approved.hash;
        },
        // -----------------------------------------------------------------
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
            try {
                let sendGas = await bridge
                    .connect(signer)
                    .sendInstallment.estimateGas(params, {
                    value: fee * 11n / 10n,
                });
                const provider = await fetchProvider();
                // @ts-ignore
                const userBalance = await provider.getBalance(signer);
                if (sendGas > userBalance) {
                    return {
                        hash: "Insufficient funds",
                        tx: "ERROR"
                    };
                }
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
            }
            catch (error) {
                if (error && error.shortMessage) {
                    console.warn("Emmet.SDK", error);
                    const msgParts = error.shortMessage.split(":");
                    return {
                        hash: msgParts[msgParts.length - 1].replace('"', ""),
                        tx: "ERROR"
                    };
                }
                else {
                    return {
                        hash: "Transfer failed. Reason unknown.",
                        tx: "ERROR"
                    };
                }
            }
        },
        // -----------------------------------------------------------------
        async txFee(targetChainId, fromToken, targetToken) {
            const isFeeERC20 = false;
            const protocolFee = await bridge.estimateFee(targetChainId, fromToken, targetToken, isFeeERC20);
            return protocolFee;
        },
        // -----------------------------------------------------------------
        //                    S W A P  R E L A T E D
        // -----------------------------------------------------------------
        async getSwapResultAmount(_fromSymbol, _targetSymbol, amount, _slippage) {
            return BigInt(amount);
        },
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2ViMy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jaGFpbnMvd2ViMy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQW9DQSxnQ0F1b0JDO0FBM3FCRCxtQ0FXZ0I7QUFPaEIsd0JBQWtEO0FBQ2xELGdEQVMrQjtBQUcvQixpREFBOEM7QUFHOUMsTUFBTSxLQUFLLEdBQUcsSUFBSSxpQkFBUSxFQUFFLENBQUM7QUFFdEIsS0FBSyxVQUFVLFVBQVUsQ0FBQyxFQUMvQixJQUFJLEVBQ0osV0FBVyxFQUNYLFNBQVMsRUFDVCxVQUFVLEdBQ0M7SUFDWCxNQUFNLG9CQUFvQixHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLElBQUksd0JBQWUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3JFLE1BQU0sS0FBSyxHQUE2QixFQUFFLENBQUM7SUFFM0M7O09BRUc7SUFDSCxNQUFNLGFBQWEsR0FBRyxLQUFLLElBQXVCLEVBQUU7UUFDbEQsTUFBTSxjQUFjLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQy9ELElBQUksS0FBSyxDQUFDLGNBQWMsQ0FBQyxFQUFFLENBQUM7WUFDMUIsT0FBTyxLQUFLLENBQUMsY0FBYyxDQUFDLENBQUM7UUFDL0IsQ0FBQztRQUNELE1BQU0sUUFBUSxHQUFHLG9CQUFvQixDQUFDLGNBQWMsQ0FBQyxDQUFDO1FBQ3RELG1CQUFtQjtRQUNuQixJQUFJLENBQUM7WUFDSCxNQUFNLFFBQVEsQ0FBQyxVQUFVLEVBQUUsQ0FBQztZQUM1QixLQUFLLENBQUMsY0FBYyxDQUFDLEdBQUcsUUFBUSxDQUFDO1lBQ2pDLE9BQU8sUUFBUSxDQUFDO1FBQ2xCLENBQUM7UUFBQyxNQUFNLENBQUM7WUFDUCxNQUFNLElBQUEsUUFBSyxFQUFDLElBQUksQ0FBQyxDQUFDO1lBQ2xCLE9B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