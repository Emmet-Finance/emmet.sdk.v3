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
    const emmetData = await addrBook.get("EmmetDataV2");
    const data = web3_1.EmmetDataV2__factory.connect(emmetData, await fetchProvider());
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
            lp = web3_1.EmmetLiquidityPoolV2__factory.connect(lpAddress, signer ? signer : await fetchProvider());
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
                const ccts = await data.getStrategies(targetChain, fromSymbol, targetSymbol);
                const map = [
                    { strategies: ccts.local, targetArray: outgoing },
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
        tokenBalance: async (tkn, addr) => {
            let _balance = 0n;
            try {
                return web3_1.WrappedERC20__factory.connect(tkn, await fetchProvider()).balanceOf(addr);
            }
            catch (error) {
                console.log("Emmet.SDK tokenBalance", error);
            }
            return _balance;
        },
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
            const t = await data.getToken(symbol);
            return {
                token: t.target,
                priceFeed: t.priceFeed,
                decimals: t.tokenDecimals,
            };
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
                const ts = await data.getStrategies(targetChain, fromToken, targetToken);
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
                total_supply: 0n,
            };
            try {
                await (0, _1.sleep)(1000); // Wait for the contract to be ready
                const lp = await getLpByName(formatedPoolName(poolName));
                await (0, _1.sleep)(1000); // Wait for the contract to be ready
                // Use a fallback value to ensure type safety
                const lpData = await lp?.getData();
                if (lpData) {
                    data = {
                        $$type: "LPData", // Set the required value for $$type
                        apy: lpData.apy_,
                        available_underlying: lpData.balance,
                        decimals: lpData.tokenDecimals,
                        total_supply: lpData.supply,
                    };
                }
            }
            catch (error) {
                console.warn("Emmet.SDK getLpData " + error.message);
                await (0, _1.sleep)(9000);
                return await (await this).getLpData(poolName);
            }
            return data;
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
            const lp = web3_1.EmmetLiquidityPoolV2__factory.connect(pool, signer);
            const deposit = await lp.deposit(amount, { ...ga });
            return {
                hash: deposit.hash,
                tx: deposit,
            };
        },
        // -----------------------------------------------------------------
        withdrawLiquidity: async (signer, pool, ga) => {
            const lp = web3_1.EmmetLiquidityPoolV2__factory.connect(pool, signer);
            const withdraw = await lp.withdraw({ ...ga });
            return {
                hash: withdraw.hash,
                tx: withdraw,
            };
        },
        // -----------------------------------------------------------------
        getLpCurrentAPY: async (pool) => {
            const lp = web3_1.EmmetLiquidityPoolV2__factory.connect(pool, await fetchProvider());
            const apy = await lp.apy();
            return apy;
        },
        // -----------------------------------------------------------------
        getLpTotalSupply: async (pool) => {
            const lp = web3_1.EmmetLiquidityPoolV2__factory.connect(pool, await fetchProvider());
            const totalSupply = await lp.totalSupply();
            return totalSupply;
        },
        // -----------------------------------------------------------------
        getLpFeeDecimals: async (pool) => {
            const lp = web3_1.EmmetLiquidityPoolV2__factory.connect(pool, await fetchProvider());
            const feeDecimals = await lp.percentDecimals();
            return feeDecimals;
        },
        // -----------------------------------------------------------------
        async isTransferFromLp(targetChain, fromToken, targetToken) {
            const ts = await data.getStrategies(targetChain, fromToken, targetToken);
            const _isTransferFromLp = ts.local.includes(7n);
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
                    gasLimit: sendGas + 100000n,
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
            const protocolFee = await bridge.estimateFee(targetChainId, fromToken, targetToken);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2ViMy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jaGFpbnMvd2ViMy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQW9DQSxnQ0Fva0JDO0FBeG1CRCxtQ0FXZ0I7QUFNaEIsd0JBQWtEO0FBQ2xELGdEQVMrQjtBQUcvQixpREFBOEM7QUFJOUMsTUFBTSxLQUFLLEdBQUcsSUFBSSxpQkFBUSxFQUFFLENBQUM7QUFFdEIsS0FBSyxVQUFVLFVBQVUsQ0FBQyxFQUMvQixJQUFJLEVBQ0osV0FBVyxFQUNYLFNBQVMsRUFDVCxVQUFVLEdBQ0M7SUFDWCxNQUFNLG9CQUFvQixHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLElBQUksd0JBQWUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3JFLE1BQU0sS0FBSyxHQUE2QixFQUFFLENBQUM7SUFFM0M7O09BRUc7SUFDSCxNQUFNLGFBQWEsR0FBRyxLQUFLLElBQXVCLEVBQUU7UUFDbEQsTUFBTSxjQUFjLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQy9ELElBQUksS0FBSyxDQUFDLGNBQWMsQ0FBQyxFQUFFLENBQUM7WUFDMUIsT0FBTyxLQUFLLENBQUMsY0FBYyxDQUFDLENBQUM7UUFDL0IsQ0FBQztRQUNELE1BQU0sUUFBUSxHQUFHLG9CQUFvQixDQUFDLGNBQWMsQ0FBQyxDQUFDO1FBQ3RELG1CQUFtQjtRQUNuQixJQUFJLENBQUM7WUFDSCxNQUFNLFFBQVEsQ0FBQyxVQUFVLEVBQUUsQ0FBQztZQUM1QixLQUFLLENBQUMsY0FBYyxDQUFDLEdBQUcsUUFBUSxDQUFDO1lBQ2pDLE9BQU8sUUFBUSxDQUFDO1FBQ2xCLENBQUM7UUFBQyxNQUFNLENBQUM7WUFDUCxNQUFNLElBQUEsUUFBSyxFQUFDLElBQUksQ0FBQyxDQUFDO1lBQ2xCLE9BQU8sTUFBTSxhQUFhLEVBQUUsQ0FBQztRQUMvQixDQUFDO0lBQ0gsQ0FBQyxDQUFDO0lBRUYsZUFBZTtJQUNmLE1BQU0sUUFBUSxHQUFHLGdDQUF5QixDQUFDLE9BQU8sQ0FDaEQsV0FBVyxFQUNYLE1BQU0sYUFBYSxFQUFFLENBQ3RCLENBQUM7SUFDRixTQUFTO0lBQ1QsTUFBTSxVQUFVLEdBQUcsTUFBTSxRQUFRLENBQUMsR0FBRyxDQUFDLGFBQWEsQ0FBQyxDQUFDO0lBQ3JELE1BQU0sTUFBTSxHQUFHLDJCQUFvQixDQUFDLE9BQU8sQ0FDekMsVUFBVSxFQUNWLE1BQU0sYUFBYSxFQUFFLENBQ3RCLENBQUM7SUFDRixhQUFhO0lBQ2IsTUFBTSxTQUFTLEdBQWMsTUFBTSxJQUFBLDJCQUFZLEdBQUUsQ0FBQztJQUNsRCxPQUFPO0lBQ1AsTUFBTSxTQUFTLEdBQUcsTUFBTSxRQUFRLENBQUMsR0FBRyxDQUFDLGFBQWEsQ0FBQyxDQUFDO0lBQ3BELE1BQU0sSUFBSSxHQUFHLDJCQUFvQixDQUFDLE9BQU8sQ0FBQyxTQUFTLEVBQUUsTUFBTSxhQUFhLEVBQUUsQ0FBQyxDQUFDO0lBRTVFLDZCQUE2QjtJQUM3Qix3Q0FBd0M7SUFDeEMsS0FBSyxVQUFVLGdCQUFnQixDQUFDLElBQVk7UUFDMUMsSUFBSSxPQUFPLEdBQVcsRUFBRSxDQUFDO1FBQ3pCLElBQUksQ0FBQztZQUNILE9BQU8sR0FBRyxNQUFNLFFBQVEsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDckMsQ0FBQztRQUFDLE9BQU8sS0FBZ0MsRUFBRSxDQUFDO1lBQzFDLE1BQU0sSUFBSSxLQUFLLENBQUMsOEJBQThCLEdBQUcsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ2xFLENBQUM7UUFDRCxPQUFPLE9BQU8sQ0FBQztJQUNqQixDQUFDO0lBQ0Qsd0NBQXdDO0lBQ3hDLEtBQUssVUFBVSxXQUFXLENBQUMsUUFBZ0IsRUFBRSxNQUE4QjtRQUN6RSxJQUFJLEVBQUUsR0FBcUMsU0FBUyxDQUFDO1FBQ3JELElBQUksQ0FBQztZQUNILE1BQU0sU0FBUyxHQUFXLE1BQU0sZ0JBQWdCLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDM0QsRUFBRSxHQUFHLG9DQUE2QixDQUFDLE9BQU8sQ0FDeEMsU0FBUyxFQUNULE1BQU0sQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxNQUFNLGFBQWEsRUFBRSxDQUNoQixDQUFDO1FBRTVCLENBQUM7UUFBQyxPQUFPLEtBQWdDLEVBQUUsQ0FBQztZQUMxQyxNQUFNLElBQUksS0FBSyxDQUFDLHlCQUF5QixHQUFHLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUM3RCxDQUFDO1FBQ0QsT0FBTyxFQUFFLENBQUM7SUFFWixDQUFDO0lBQ0Qsd0NBQXdDO0lBQ3hDLFNBQVMsZ0JBQWdCLENBQUMsUUFBZ0I7UUFDeEMsT0FBTyxRQUFRLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQztZQUM3QixDQUFDLENBQUMsUUFBUTtZQUNWLENBQUMsQ0FBQyxNQUFNLFFBQVEsRUFBRSxDQUFDO0lBQ3ZCLENBQUM7SUFFRCxPQUFPO1FBQ0wsb0VBQW9FO1FBQ3BFLHVDQUF1QztRQUN2QyxvRUFBb0U7UUFDcEUsS0FBSyxDQUFDLE9BQU8sQ0FBQyxLQUFhO1lBQ3pCLE9BQU8sTUFBTSxRQUFRLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ25DLENBQUM7UUFDRCxvRUFBb0U7UUFDcEUsS0FBSyxDQUFDLE1BQU07WUFDVixPQUFPLE1BQU0sTUFBTSxDQUFDLFVBQVUsRUFBRSxDQUFDO1FBQ25DLENBQUM7UUFDRCxvRUFBb0U7UUFDcEUsRUFBRSxFQUFFLEtBQUssSUFBSSxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsTUFBTSxhQUFhLEVBQUUsQ0FBQyxDQUFDLFVBQVUsRUFBRSxDQUFDLENBQUMsT0FBTztRQUNwRSxvRUFBb0U7UUFDcEUsS0FBSyxDQUFDLGtCQUFrQixDQUFDLFdBQXlCLEVBQUUsVUFBa0IsRUFBRSxZQUFvQjtZQUUxRixNQUFNLFFBQVEsR0FBZ0IsRUFBRSxDQUFDO1lBQ2pDLE1BQU0sUUFBUSxHQUFnQixFQUFFLENBQUM7WUFDakMsTUFBTSxPQUFPLEdBQWdCLEVBQUUsQ0FBQztZQUVoQyxJQUFJLENBQUM7Z0JBRUgsTUFBTSxJQUFJLEdBQUcsTUFBTSxJQUFJLENBQUMsYUFBYSxDQUNuQyxXQUFXLEVBQ1gsVUFBVSxFQUNWLFlBQVksQ0FDYixDQUFDO2dCQUVGLE1BQU0sR0FBRyxHQUFHO29CQUNWLEVBQUUsVUFBVSxFQUFFLElBQUksQ0FBQyxLQUFLLEVBQUUsV0FBVyxFQUFFLFFBQVEsRUFBRTtvQkFDakQsRUFBRSxVQUFVLEVBQUUsSUFBSSxDQUFDLFFBQVEsRUFBRSxXQUFXLEVBQUUsUUFBUSxFQUFFO29CQUNwRCxFQUFFLFVBQVUsRUFBRSxJQUFJLENBQUMsT0FBTyxFQUFFLFdBQVcsRUFBRSxPQUFPLEVBQUU7aUJBQ25ELENBQUM7Z0JBRUYsS0FBSyxNQUFNLEVBQUUsVUFBVSxFQUFFLFdBQVcsRUFBRSxJQUFJLEdBQUcsRUFBRSxDQUFDO29CQUM5QyxLQUFLLE1BQU0sS0FBSyxJQUFJLFVBQVUsRUFBRSxDQUFDO3dCQUMvQixNQUFNLFlBQVksR0FBYyxjQUFXLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFjLENBQUM7d0JBQ25GLElBQUksWUFBWSxFQUFFLENBQUM7NEJBQ2pCLFdBQVcsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7d0JBQ2pDLENBQUM7b0JBQ0gsQ0FBQztnQkFDSCxDQUFDO1lBRUgsQ0FBQztZQUFDLE9BQU8sS0FBSyxFQUFFLENBQUM7WUFFakIsQ0FBQztZQUVELE9BQU87Z0JBQ0wsUUFBUTtnQkFDUixRQUFRO2dCQUNSLE9BQU87YUFDUixDQUFDO1FBQ0osQ0FBQztRQUNELG9FQUFvRTtRQUNwRSxhQUFhLEVBQUUsQ0FBQyxPQUFlLEVBQUUsRUFBRTtZQUNqQyxJQUFJLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLFdBQVcsRUFBRSxJQUFJLFlBQVksRUFBRSxDQUFDO2dCQUN2RCxJQUFJLENBQUM7b0JBQ0gsTUFBTSxNQUFNLEdBQUcsS0FBSyxDQUFDLE1BQU0sQ0FDekI7d0JBQ0UsU0FBUzt3QkFDVCxtR0FBbUc7cUJBQ3BHLEVBQ0QsSUFBSSxHQUFHLE9BQU8sQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFFLENBQzFCLENBQUM7b0JBRUYsTUFBTSxFQUNKLENBQUMsRUFBRSxXQUFXLEVBQ2QsQ0FBQyxFQUFFLGVBQWUsRUFDbEIsQ0FBQyxFQUFFLEtBQUssRUFDUixDQUFDLEVBQUUsU0FBUyxFQUFLLDBDQUEwQztvQkFDM0QsQ0FBQyxFQUFFLFVBQVUsRUFDYixDQUFDLEVBQUUsYUFBYSxFQUNoQixDQUFDLEVBQUUsV0FBVyxFQUNkLENBQUMsRUFBRSxTQUFTLEVBQ1osQ0FBQyxFQUFFLEVBQUUsRUFDTCxDQUFDLEVBQUUsU0FBUyxFQUNaLEVBQUUsRUFBRSxPQUFPLEVBQ1gsRUFBRSxFQUFFLElBQUksRUFDVCxHQUFHLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFFZCxPQUFPO3dCQUNMLFdBQVc7d0JBQ1gsZUFBZTt3QkFDZixLQUFLO3dCQUNMLFNBQVM7d0JBQ1QsVUFBVTt3QkFDVixhQUFhO3dCQUNiLFdBQVc7d0JBQ1gsU0FBUzt3QkFDVCxFQUFFO3dCQUNGLFNBQVM7d0JBQ1QsT0FBTzt3QkFDUCxJQUFJO3FCQUNMLENBQUM7Z0JBRUosQ0FBQztnQkFBQyxPQUFPLEtBQUssRUFBRSxDQUFDO29CQUNmLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUE7Z0JBQ3BCLENBQUM7WUFDSCxDQUFDO1lBQ0QsT0FBTyxTQUFTLENBQUM7UUFDbkIsQ0FBQztRQUNELG9FQUFvRTtRQUNwRSxnQkFBZ0IsRUFBRSxHQUFHLEVBQUU7WUFDckIsd0NBQXdDO1lBQ3hDLDRCQUE0QjtZQUM1QixPQUFPLEdBQUcsQ0FBQztRQUNiLENBQUM7UUFDRCxvRUFBb0U7UUFDcEUsZUFBZSxFQUFFLENBQUMsSUFBWSxFQUFFLEVBQUUsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLElBQUEsa0JBQVMsRUFBQyxJQUFJLENBQUMsQ0FBQztRQUNuRSxvRUFBb0U7UUFDcEUsZUFBZSxFQUFFLEtBQUssRUFBRSxNQUFjLEVBQW1CLEVBQUU7WUFDekQsTUFBTSxPQUFPLEdBQUcsTUFBTSxRQUFRLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQzNDLE9BQU8sT0FBTyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztRQUNoQyxDQUFDO1FBQ0Qsb0VBQW9FO1FBQ3BFLFlBQVksRUFBRSxLQUFLLEVBQUUsR0FBVyxFQUFFLElBQWlCLEVBQUUsRUFBRTtZQUNyRCxJQUFJLFFBQVEsR0FBVyxFQUFFLENBQUM7WUFDMUIsSUFBSSxDQUFDO2dCQUNILE9BQU8sNEJBQXFCLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxNQUFNLGFBQWEsRUFBRSxDQUFDLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ25GLENBQUM7WUFBQyxPQUFPLEtBQUssRUFBRSxDQUFDO2dCQUNmLE9BQU8sQ0FBQyxHQUFHLENBQUMsd0JBQXdCLEVBQUUsS0FBSyxDQUFDLENBQUM7WUFDL0MsQ0FBQztZQUNELE9BQU8sUUFBUSxDQUFDO1FBQ2xCLENBQUM7UUFFRCxvRUFBb0U7UUFDcEUsS0FBSyxDQUFDLE1BQU0sQ0FBQyxJQUFZO1lBQ3ZCLE1BQU0sUUFBUSxHQUFHLE1BQU0sYUFBYSxFQUFFLENBQUM7WUFDdkMsSUFBSSxJQUFJLEtBQUssRUFBRSxFQUFFLENBQUM7Z0JBQ2hCLE9BQU87b0JBQ0wsU0FBUyxFQUFFLEVBQUU7b0JBQ2IsS0FBSyxFQUFFLEVBQUU7aUJBQ1YsQ0FBQztZQUNKLENBQUM7WUFDRCxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDO2dCQUMzQixtREFBbUQ7Z0JBQ25ELElBQUksR0FBRyxLQUFLLElBQUksRUFBRSxDQUFDO1lBQ3JCLENBQUM7WUFDRCxJQUFJLENBQUM7Z0JBQ0gsTUFBTSxPQUFPLEdBQUcsTUFBTSxRQUFRLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ3hELElBQUksQ0FBQyxPQUFPO29CQUNWLE1BQU0sSUFBSSxLQUFLLENBQUMsd0NBQXdDLElBQUksRUFBRSxDQUFDLENBQUM7Z0JBQ2xFLE1BQU0sS0FBSyxHQUFHLE1BQU0sUUFBUSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLENBQUM7Z0JBQzNELE9BQU87b0JBQ0wsU0FBUyxFQUFFLE1BQU0sQ0FBQyxLQUFLLEVBQUUsU0FBUyxJQUFJLENBQUMsQ0FBQztvQkFDeEMsS0FBSyxFQUFFLE9BQU8sQ0FBQyxHQUFHO2lCQUNuQixDQUFDO1lBQ0osQ0FBQztZQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUM7Z0JBQ1gsT0FBTztvQkFDTCxTQUFTLEVBQUUsRUFBRTtvQkFDYixLQUFLLEVBQUUsRUFBRTtpQkFDVixDQUFDO1lBQ0osQ0FBQztRQUNILENBQUM7UUFFRCxvRUFBb0U7UUFDcEUsV0FBVztZQUNULE9BQU8sT0FBTyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLHlCQUF5QjtRQUN4RCxDQUFDO1FBQ0Qsb0VBQW9FO1FBQ3BFLEtBQUssQ0FBQyxLQUFLLENBQUMsTUFBYztZQUN4QixNQUFNLENBQUMsR0FBaUMsTUFBTSxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQ3BFLE9BQU87Z0JBQ0wsS0FBSyxFQUFFLENBQUMsQ0FBQyxNQUFNO2dCQUNmLFNBQVMsRUFBRSxDQUFDLENBQUMsU0FBUztnQkFDdEIsUUFBUSxFQUFFLENBQUMsQ0FBQyxhQUFhO2FBQzFCLENBQUM7UUFDSixDQUFDO1FBQ0Qsb0VBQW9FO1FBQ3BFLFFBQVEsRUFBRSxLQUFLLEVBQUUsSUFBd0IsRUFBRSxFQUFFO1lBQzNDLElBQUksQ0FBQyxJQUFJO2dCQUFFLE9BQU8sRUFBRSxDQUFDO1lBQ3JCLE9BQU8sTUFBTSxDQUNYLE1BQU0scUJBQWMsQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLE1BQU0sYUFBYSxFQUFFLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FDckUsQ0FBQztRQUNKLENBQUM7UUFDRCxvRUFBb0U7UUFDcEUsVUFBVSxFQUFFLEdBQUcsRUFBRSxDQUFDLFVBQVU7UUFDNUIsb0VBQW9FO1FBQ3BFLFNBQVMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxTQUFTO1FBQzFCLG9FQUFvRTtRQUNwRSxpQkFBaUIsRUFBRSxLQUFLLEVBQ3RCLEdBQVcsRUFDWCxLQUFrQixFQUNsQixPQUFvQixFQUNwQixFQUFFLENBQ0YsTUFBTSw0QkFBcUIsQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLE1BQU0sYUFBYSxFQUFFLENBQUMsQ0FBQyxTQUFTLENBQ3ZFLEtBQUssRUFDTCxPQUFPLENBQ1I7UUFDSCxvRUFBb0U7UUFDcEUsT0FBTyxFQUFFLEtBQUssRUFBRSxJQUFpQixFQUFFLEVBQUUsQ0FBQyxDQUFDLE1BQU0sYUFBYSxFQUFFLENBQUMsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDO1FBQzlFLG9FQUFvRTtRQUNwRSxRQUFRLEVBQUUsS0FBSyxJQUFJLEVBQUUsQ0FBQyxNQUFNLGFBQWEsRUFBRTtRQUMzQyxvRUFBb0U7UUFDcEUsS0FBSyxDQUFDLFlBQVksQ0FBQyxXQUF5QixFQUFFLFNBQWlCLEVBQUUsV0FBbUI7WUFDbEYsZUFBZTtZQUNmLElBQUksVUFBVSxHQUFXLEVBQUUsR0FBRyxHQUFHLEdBQUcsS0FBSyxDQUFDO1lBRTFDLElBQUksQ0FBQztnQkFFSCxNQUFNLEVBQUUsR0FBRyxNQUFNLElBQUksQ0FBQyxhQUFhLENBQ2pDLFdBQVcsRUFDWCxTQUFTLEVBQ1QsV0FBVyxDQUNaLENBQUM7Z0JBRUYsTUFBTSxRQUFRLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUN2QixNQUFNLE9BQU8sR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBRXRCLE1BQU0sUUFBUSxHQUFXLE1BQU0sQ0FBQyxZQUFTLENBQUMsU0FBUyxDQUFDLENBQUM7Z0JBQ3JELE1BQU0sU0FBUyxHQUFXLE1BQU0sQ0FBQyxZQUFTLENBQUMsU0FBUyxDQUFDLENBQUM7Z0JBRXRELE1BQU0sTUFBTSxHQUNWLE9BQU8sQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDO29CQUMxQixPQUFPLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQztvQkFDM0IsUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUM7b0JBQzNCLFFBQVEsQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLENBQUM7Z0JBRS9CLElBQUksTUFBTSxFQUFFLENBQUM7b0JBQ1gsWUFBWTtvQkFDWixVQUFVLEdBQUcsQ0FBQyxFQUFFLEdBQUcsR0FBRyxDQUFDLEdBQUcsS0FBSyxDQUFDO2dCQUNsQyxDQUFDO3FCQUFNLENBQUM7b0JBQ04sV0FBVztvQkFDWCxVQUFVLEdBQUcsQ0FBQyxFQUFFLEdBQUcsR0FBRyxDQUFDLEdBQUcsS0FBSyxDQUFDO2dCQUNsQyxDQUFDO1lBRUgsQ0FBQztZQUFDLE9BQU8sS0FBSyxFQUFFLENBQUM7Z0JBQ2YsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQTtZQUNyQixDQUFDO1lBRUQsT0FBTyxVQUFVLENBQUM7UUFDcEIsQ0FBQztRQUVELG9FQUFvRTtRQUNwRSw0Q0FBNEM7UUFDNUMsb0VBQW9FO1FBQ3BFLEtBQUssQ0FBQyxTQUFTLENBQUMsUUFBUTtZQUN0QixJQUFJLElBQUksR0FBWTtnQkFDbEIsTUFBTSxFQUFFLFFBQVE7Z0JBQ2hCLEdBQUcsRUFBRSxFQUFFO2dCQUNQLG9CQUFvQixFQUFFLEVBQUU7Z0JBQ3hCLFFBQVEsRUFBRSxFQUFFO2dCQUNaLFlBQVksRUFBRSxFQUFFO2FBQ2pCLENBQUE7WUFDRCxJQUFJLENBQUM7Z0JBQ0gsTUFBTSxJQUFBLFFBQUssRUFBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLG9DQUFvQztnQkFDdkQsTUFBTSxFQUFFLEdBQUcsTUFBTSxXQUFXLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztnQkFDekQsTUFBTSxJQUFBLFFBQUssRUFBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLG9DQUFvQztnQkFDdkQsNkNBQTZDO2dCQUM3QyxNQUFNLE1BQU0sR0FBRyxNQUFNLEVBQUUsRUFBRSxPQUFPLEVBQUUsQ0FBQztnQkFDbkMsSUFBSSxNQUFNLEVBQUUsQ0FBQztvQkFDWCxJQUFJLEdBQUc7d0JBQ0wsTUFBTSxFQUFFLFFBQVEsRUFBRSxvQ0FBb0M7d0JBQ3RELEdBQUcsRUFBRSxNQUFNLENBQUMsSUFBSTt3QkFDaEIsb0JBQW9CLEVBQUUsTUFBTSxDQUFDLE9BQU87d0JBQ3BDLFFBQVEsRUFBRSxNQUFNLENBQUMsYUFBYTt3QkFDOUIsWUFBWSxFQUFFLE1BQU0sQ0FBQyxNQUFNO3FCQUM1QixDQUFDO2dCQUNKLENBQUM7WUFFSCxDQUFDO1lBQUMsT0FBTyxLQUFnQyxFQUFFLENBQUM7Z0JBQzFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsc0JBQXNCLEdBQUcsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDO2dCQUNyRCxNQUFNLElBQUEsUUFBSyxFQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNsQixPQUFPLE1BQU0sQ0FBQyxNQUFNLElBQUksQ0FBQyxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUNoRCxDQUFDO1lBQ0QsT0FBTyxJQUFJLENBQUM7UUFDZCxDQUFDO1FBQ0Qsb0VBQW9FO1FBQ3BFLEtBQUssQ0FBQyxVQUFVLENBQUMsUUFBUSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsT0FBTztZQUNoRCxJQUFJLE1BQStDLENBQUM7WUFDcEQsSUFBSSxDQUFDO2dCQUNILE1BQU0sRUFBRSxHQUFHLE1BQU0sV0FBVyxDQUFDLGdCQUFnQixDQUFDLFFBQVEsQ0FBQyxFQUFFLE1BQU0sQ0FBQyxDQUFDO2dCQUNqRSxNQUFNLEdBQUcsTUFBTSxFQUFFLEVBQUUsT0FBTyxDQUFDLE1BQU0sRUFBRSxFQUFFLEdBQUcsT0FBTyxFQUFFLENBQUMsQ0FBQztZQUNyRCxDQUFDO1lBQUMsT0FBTyxLQUFnQyxFQUFFLENBQUM7Z0JBQzFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsdUJBQXVCLEdBQUcsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQ3hELENBQUM7WUFDRCxPQUFPLE1BQU0sQ0FBQztRQUNoQixDQUFDO1FBQ0Qsb0VBQW9FO1FBQ3BFLEtBQUssQ0FBQyxTQUFTLENBQUMsTUFBTSxFQUFFLE1BQU07WUFDNUIsSUFBSSxNQUErQyxDQUFDO1lBQ3BELElBQUksQ0FBQztnQkFDSCxNQUFNLEVBQUUsR0FBRyxNQUFNLFdBQVcsQ0FBQyxnQkFBZ0IsQ0FBQyxVQUFVLENBQUMsRUFBRSxNQUFNLENBQUMsQ0FBQztnQkFDbkUsTUFBTSxHQUFHLE1BQU0sRUFBRSxFQUFFLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUNyQyxDQUFDO1lBQUMsT0FBTyxLQUFnQyxFQUFFLENBQUM7Z0JBQzFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsc0JBQXNCLEdBQUcsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQ3ZELENBQUM7WUFDRCxPQUFPLE1BQU0sQ0FBQztRQUNoQixDQUFDO1FBQ0Qsb0VBQW9FO1FBQ3BFLGNBQWMsRUFBRSxLQUFLLEVBQUcsNkJBQTZCO1FBQ25ELE1BQWMsRUFDZCxJQUFZLEVBQ1osTUFBYyxFQUNkLEVBQXlCLEVBQ3pCLEVBQUU7WUFDRixNQUFNLEVBQUUsR0FBRyxvQ0FBNkIsQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLE1BQU0sQ0FBQyxDQUFDO1lBQy9ELE1BQU0sT0FBTyxHQUFHLE1BQU0sRUFBRSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQUUsRUFBRSxHQUFHLEVBQUUsRUFBRSxDQUFDLENBQUM7WUFDcEQsT0FBTztnQkFDTCxJQUFJLEVBQUUsT0FBTyxDQUFDLElBQUk7Z0JBQ2xCLEVBQUUsRUFBRSxPQUFPO2FBQ1osQ0FBQztRQUNKLENBQUM7UUFDRCxvRUFBb0U7UUFDcEUsaUJBQWlCLEVBQUUsS0FBSyxFQUFFLE1BQVcsRUFBRSxJQUFZLEVBQUUsRUFBTyxFQUFFLEVBQUU7WUFDOUQsTUFBTSxFQUFFLEdBQUcsb0NBQTZCLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxNQUFNLENBQUMsQ0FBQztZQUMvRCxNQUFNLFFBQVEsR0FBRyxNQUFNLEVBQUUsQ0FBQyxRQUFRLENBQUMsRUFBRSxHQUFHLEVBQUUsRUFBRSxDQUFDLENBQUM7WUFDOUMsT0FBTztnQkFDTCxJQUFJLEVBQUUsUUFBUSxDQUFDLElBQUk7Z0JBQ25CLEVBQUUsRUFBRSxRQUFRO2FBQ2IsQ0FBQztRQUNKLENBQUM7UUFDRCxvRUFBb0U7UUFDcEUsZUFBZSxFQUFFLEtBQUssRUFBRSxJQUFZLEVBQUUsRUFBRTtZQUN0QyxNQUFNLEVBQUUsR0FBRyxvQ0FBNkIsQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLE1BQU0sYUFBYSxFQUFFLENBQUMsQ0FBQztZQUM5RSxNQUFNLEdBQUcsR0FBRyxNQUFNLEVBQUUsQ0FBQyxHQUFHLEVBQUUsQ0FBQztZQUMzQixPQUFPLEdBQUcsQ0FBQztRQUNiLENBQUM7UUFDRCxvRUFBb0U7UUFDcEUsZ0JBQWdCLEVBQUUsS0FBSyxFQUFFLElBQVksRUFBRSxFQUFFO1lBQ3ZDLE1BQU0sRUFBRSxHQUFHLG9DQUE2QixDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsTUFBTSxhQUFhLEVBQUUsQ0FBQyxDQUFDO1lBQzlFLE1BQU0sV0FBVyxHQUFHLE1BQU0sRUFBRSxDQUFDLFdBQVcsRUFBRSxDQUFDO1lBQzNDLE9BQU8sV0FBVyxDQUFDO1FBQ3JCLENBQUM7UUFDRCxvRUFBb0U7UUFDcEUsZ0JBQWdCLEVBQUUsS0FBSyxFQUFFLElBQVksRUFBRSxFQUFFO1lBQ3ZDLE1BQU0sRUFBRSxHQUFHLG9DQUE2QixDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsTUFBTSxhQUFhLEVBQUUsQ0FBQyxDQUFDO1lBQzlFLE1BQU0sV0FBVyxHQUFHLE1BQU0sRUFBRSxDQUFDLGVBQWUsRUFBRSxDQUFDO1lBQy9DLE9BQU8sV0FBVyxDQUFDO1FBQ3JCLENBQUM7UUFDRCxvRUFBb0U7UUFDcEUsS0FBSyxDQUFDLGdCQUFnQixDQUNwQixXQUF5QixFQUN6QixTQUFpQixFQUNqQixXQUFtQjtZQUVuQixNQUFNLEVBQUUsR0FBRyxNQUFNLElBQUksQ0FBQyxhQUFhLENBQ2pDLFdBQVcsRUFDWCxTQUFTLEVBQ1QsV0FBVyxDQUNaLENBQUM7WUFDRixNQUFNLGlCQUFpQixHQUFHLEVBQUUsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQ2hELE9BQU8saUJBQWlCLENBQUM7UUFDM0IsQ0FBQztRQUNELG9FQUFvRTtRQUNwRSxtREFBbUQ7UUFDbkQsb0VBQW9FO1FBQ3BFLHlCQUF5QixFQUFFLEtBQUssRUFBRSxJQUFZLEVBQUUsRUFBRTtZQUNoRCxJQUFJLENBQUM7Z0JBQ0gsTUFBTSxHQUFHLEdBQTRDLE1BQU0sU0FBUyxDQUFDLGVBQWUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUM7Z0JBQzdGLE1BQU0sUUFBUSxHQUNaLEdBQUcsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsWUFBWSxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUM7Z0JBQzlELE9BQU8sUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3JCLENBQUM7WUFBQyxPQUFPLEtBQUssRUFBRSxDQUFDO2dCQUNmLE9BQU8sU0FBUyxDQUFDO1lBQ25CLENBQUM7UUFDSCxDQUFDO1FBQ0Qsb0VBQW9FO1FBQ3BFLHVCQUF1QixFQUFFLEtBQUssRUFBRSxJQUFZLEVBQUUsRUFBRTtZQUM5QyxJQUFJLENBQUM7Z0JBQ0gsTUFBTSxFQUFFLEdBQTBDLE1BQU0sU0FBUyxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDdkYsT0FBTyxFQUFFLENBQUM7WUFDWixDQUFDO1lBQUMsT0FBTyxLQUFLLEVBQUUsQ0FBQztnQkFDZixPQUFPLFNBQVMsQ0FBQztZQUNuQixDQUFDO1FBRUgsQ0FBQztRQUNELG9FQUFvRTtRQUNwRSxLQUFLLENBQUMsZUFBZSxDQUFDLElBQVk7WUFFaEMsTUFBTSxPQUFPLEdBQUcsTUFBTSxDQUFDLE1BQU0sYUFBYSxFQUFFLENBQUMsQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUV2RSxJQUFJLENBQUMsT0FBTztnQkFBRSxNQUFNLElBQUksS0FBSyxDQUFDLGlDQUFpQyxJQUFJLEVBQUUsQ0FBQyxDQUFDO1lBQ3ZFLE1BQU0sR0FBRyxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FDbEMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQ2YsTUFBTSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxTQUFTLENBQ3ZELENBQ0YsQ0FBQztZQUNGLElBQUksQ0FBQyxHQUFHO2dCQUNOLE1BQU0sSUFBSSxLQUFLLENBQUMsOENBQThDLElBQUksRUFBRSxDQUFDLENBQUM7WUFDeEUsTUFBTSxNQUFNLEdBQUcsTUFBTSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDOUMsT0FBTyxNQUFNLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQztRQUM3QixDQUFDO1FBQ0Qsb0VBQW9FO1FBQ3BFLCtDQUErQztRQUMvQyxvRUFBb0U7UUFDcEUsV0FBVyxFQUFFLEtBQUssRUFDaEIsTUFBNkIsRUFDN0IsR0FBVyxFQUNYLE9BQW9CLEVBQ3BCLEdBQWlCLEVBQ2pCLE9BQVksRUFDWixFQUFFO1lBQ0YsTUFBTSxHQUFHLEdBQUcsNEJBQXFCLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxNQUFNLENBQUMsQ0FBQztZQUN2RCxJQUFJLENBQUM7WUFFTCxDQUFDO1lBQUMsT0FBTyxLQUFLLEVBQUUsQ0FBQztZQUVqQixDQUFDO1lBQ0QsTUFBTSxjQUFjLEdBQUcsTUFBTSxHQUFHLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxPQUFPLEVBQUUsR0FBRyxDQUFDLENBQUM7WUFDbkUsTUFBTSxRQUFRLEdBQUcsTUFBTSxHQUFHLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFBRSxHQUFHLEVBQUU7Z0JBQy9DLEdBQUcsT0FBTztnQkFDVixRQUFRLEVBQUUsY0FBYzthQUN6QixDQUFDLENBQUM7WUFDSCxNQUFNLFFBQVEsQ0FBQyxJQUFJLEVBQUUsQ0FBQztZQUN0QixPQUFPLFFBQVEsQ0FBQyxJQUFJLENBQUM7UUFDdkIsQ0FBQztRQUNELG9FQUFvRTtRQUNwRSxlQUFlLEVBQUUsS0FBSyxFQUNwQixNQUE2QixFQUM3QixHQUFXLEVBQ1gsR0FBVyxFQUNYLEVBQVUsRUFDVixFQUFVLEVBQ1YsRUFBVSxFQUNWLEdBQXVCLEVBQ3ZCLE9BQVksRUFDWixFQUFFO1lBRUYsTUFBTSxNQUFNLEdBQWU7Z0JBQ3pCLFdBQVcsRUFBRSxFQUFFLEVBQUUsNEJBQTRCO2dCQUM3QyxVQUFVLEVBQUUsS0FBSyxFQUFFLHlCQUF5QjtnQkFDNUMsVUFBVSxFQUFFLEdBQUc7Z0JBQ2YsYUFBYSxFQUFFLEdBQUc7Z0JBQ2xCLFNBQVMsRUFBRSxHQUFHO2dCQUNkLFNBQVMsRUFBRSxFQUFFO2dCQUNiLE9BQU8sRUFBRSxFQUFFO2dCQUNYLEVBQUUsRUFBRSxFQUFFO2dCQUNOLFNBQVMsRUFBRSxJQUFJO2FBQ2hCLENBQUE7WUFFRCxJQUFJLENBQUM7Z0JBQ0gsSUFBSSxPQUFPLEdBQUcsTUFBTSxNQUFNO3FCQUN2QixPQUFPLENBQUMsTUFBTSxDQUFDO3FCQUNmLGVBQWUsQ0FBQyxXQUFXLENBQUMsTUFBTSxFQUFFO29CQUNuQyxLQUFLLEVBQUUsR0FBSSxHQUFHLEdBQUcsR0FBRyxHQUFHO2lCQUN4QixDQUFDLENBQUM7Z0JBRUwsTUFBTSxRQUFRLEdBQUcsTUFBTSxhQUFhLEVBQUUsQ0FBQztnQkFDdkMsYUFBYTtnQkFDYixNQUFNLFdBQVcsR0FBRyxNQUFNLFFBQVEsQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLENBQUM7Z0JBRXRELElBQUksT0FBTyxHQUFHLFdBQVcsRUFBRSxDQUFDO29CQUMxQixPQUFPO3dCQUNMLElBQUksRUFBRSxvQkFBb0I7d0JBQzFCLEVBQUUsRUFBRSxPQUFpRDtxQkFDdEQsQ0FBQTtnQkFDSCxDQUFDO2dCQUVELE1BQU0sRUFBRSxHQUFHLE1BQU0sTUFBTTtxQkFDcEIsT0FBTyxDQUFDLE1BQU0sQ0FBQztxQkFDZixlQUFlLENBQUMsTUFBTSxFQUFFO29CQUN2QixHQUFHLE9BQU87b0JBQ1YsS0FBSyxFQUFFLEdBQUksR0FBRyxHQUFHLEdBQUcsR0FBRztvQkFDdkIsUUFBUSxFQUFFLE9BQU8sR0FBRyxPQUFPO2lCQUM1QixDQUFDLENBQUM7Z0JBRUwsT0FBTztvQkFDTCxJQUFJLEVBQUUsRUFBRSxDQUFDLElBQUk7b0JBQ2IsRUFBRSxFQUFFLEVBQUU7aUJBQ1AsQ0FBQztZQUNKLENBQUM7WUFBQyxPQUFPLEtBQVMsRUFBRSxDQUFDO2dCQUNuQixJQUFHLEtBQUssSUFBSSxLQUFLLENBQUMsWUFBWSxFQUFDLENBQUM7b0JBQzlCLE9BQU8sQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLEtBQUssQ0FBQyxDQUFBO29CQUNoQyxNQUFNLFFBQVEsR0FBRyxLQUFLLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztvQkFDL0MsT0FBTzt3QkFDTCxJQUFJLEVBQUUsUUFBUSxDQUFDLFFBQVEsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUM7d0JBQ3BELEVBQUUsRUFBRSxPQUFpRDtxQkFDdEQsQ0FBQTtnQkFDSCxDQUFDO3FCQUFNLENBQUM7b0JBQ04sT0FBTzt3QkFDTCxJQUFJLEVBQUUsa0NBQWtDO3dCQUN4QyxFQUFFLEVBQUUsT0FBaUQ7cUJBQ3RELENBQUE7Z0JBQ0gsQ0FBQztZQUNILENBQUM7UUFFSCxDQUFDO1FBQ0Qsb0VBQW9FO1FBQ3BFLEtBQUssQ0FBQyxLQUFLLENBQUMsYUFBMkIsRUFBRSxTQUFpQixFQUFFLFdBQW1CO1lBQzdFLE1BQU0sV0FBVyxHQUFHLE1BQU0sTUFBTSxDQUFDLFdBQVcsQ0FDMUMsYUFBYSxFQUNiLFNBQVMsRUFDVCxXQUFXLENBQ1osQ0FBQztZQUNGLE9BQU8sV0FBVyxDQUFDO1FBQ3JCLENBQUM7UUFDRCxvRUFBb0U7UUFDcEUsNENBQTRDO1FBQzVDLG9FQUFvRTtRQUNwRSxLQUFLLENBQUMsbUJBQW1CLENBQ3ZCLFdBQWdCLEVBQ2hCLGFBQWtCLEVBQ2xCLE1BQW9CLEVBQ3BCLFNBQWM7WUFFZCxPQUFPLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUN4QixDQUFDO0tBRUYsQ0FBQztBQUNKLENBQUMifQ==