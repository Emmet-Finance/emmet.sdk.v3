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
exports.web3Helper = web3Helper;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2ViMy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jaGFpbnMvd2ViMy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSxtQ0FXZ0I7QUFPaEIsd0JBQTJDO0FBQzNDLGdEQVMrQjtBQUcvQixpREFBOEM7QUFHOUMsTUFBTSxLQUFLLEdBQUcsSUFBSSxpQkFBUSxFQUFFLENBQUM7QUFFdEIsS0FBSyxVQUFVLFVBQVUsQ0FBQyxFQUMvQixJQUFJLEVBQ0osV0FBVyxFQUNYLFNBQVMsRUFDVCxVQUFVLEdBQ0M7SUFDWCxNQUFNLG9CQUFvQixHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLElBQUksd0JBQWUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3JFLE1BQU0sS0FBSyxHQUE2QixFQUFFLENBQUM7SUFFM0M7O09BRUc7SUFDSCxNQUFNLGFBQWEsR0FBRyxLQUFLLElBQXVCLEVBQUU7UUFDbEQsTUFBTSxjQUFjLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQy9ELElBQUksS0FBSyxDQUFDLGNBQWMsQ0FBQyxFQUFFLENBQUM7WUFDMUIsT0FBTyxLQUFLLENBQUMsY0FBYyxDQUFDLENBQUM7UUFDL0IsQ0FBQztRQUNELE1BQU0sUUFBUSxHQUFHLG9CQUFvQixDQUFDLGNBQWMsQ0FBQyxDQUFDO1FBQ3RELG1CQUFtQjtRQUNuQixJQUFJLENBQUM7WUFDSCxNQUFNLFFBQVEsQ0FBQyxVQUFVLEVBQUUsQ0FBQztZQUM1QixLQUFLLENBQUMsY0FBYyxDQUFDLEdBQUcsUUFBUSxDQUFDO1lBQ2pDLE9BQU8sUUFBUSxDQUFDO1FBQ2xCLENBQUM7UUFBQyxNQUFNLENBQUM7WUFDUCxPQUFPLE1BQU0sYUFBYSxFQUFFLENBQUM7UUFDL0IsQ0FBQztJQUNILENBQUMsQ0FBQztJQUVGLGVB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