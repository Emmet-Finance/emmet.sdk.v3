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
                const lp = await getLpByName(formatedPoolName(poolName));
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
                await (0, _1.sleep)(1000);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2ViMy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jaGFpbnMvd2ViMy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQW9DQSxnQ0EwakJDO0FBOWxCRCxtQ0FXZ0I7QUFNaEIsd0JBQWtEO0FBQ2xELGdEQVMrQjtBQUcvQixpREFBOEM7QUFJOUMsTUFBTSxLQUFLLEdBQUcsSUFBSSxpQkFBUSxFQUFFLENBQUM7QUFFdEIsS0FBSyxVQUFVLFVBQVUsQ0FBQyxFQUMvQixJQUFJLEVBQ0osV0FBVyxFQUNYLFNBQVMsRUFDVCxVQUFVLEdBQ0M7SUFDWCxNQUFNLG9CQUFvQixHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLElBQUksd0JBQWUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3JFLE1BQU0sS0FBSyxHQUE2QixFQUFFLENBQUM7SUFFM0M7O09BRUc7SUFDSCxNQUFNLGFBQWEsR0FBRyxLQUFLLElBQXVCLEVBQUU7UUFDbEQsTUFBTSxjQUFjLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQy9ELElBQUksS0FBSyxDQUFDLGNBQWMsQ0FBQyxFQUFFLENBQUM7WUFDMUIsT0FBTyxLQUFLLENBQUMsY0FBYyxDQUFDLENBQUM7UUFDL0IsQ0FBQztRQUNELE1BQU0sUUFBUSxHQUFHLG9CQUFvQixDQUFDLGNBQWMsQ0FBQyxDQUFDO1FBQ3RELG1CQUFtQjtRQUNuQixJQUFJLENBQUM7WUFDSCxNQUFNLFFBQVEsQ0FBQyxVQUFVLEVBQUUsQ0FBQztZQUM1QixLQUFLLENBQUMsY0FBYyxDQUFDLEdBQUcsUUFBUSxDQUFDO1lBQ2pDLE9BQU8sUUFBUSxDQUFDO1FBQ2xCLENBQUM7UUFBQyxNQUFNLENBQUM7WUFDUCxNQUFNLElBQUEsUUFBSyxFQUFDLElBQUksQ0FBQyxDQUFDO1lBQ2xCLE9BQU8sTUFBTSxhQUFhLEVBQUUsQ0FBQztRQUMvQixDQUFDO0lBQ0gsQ0FBQyxDQUFDO0lBRUYsZUFBZTtJQUNmLE1BQU0sUUFBUSxHQUFHLGdDQUF5QixDQUFDLE9BQU8sQ0FDaEQsV0FBVyxFQUNYLE1BQU0sYUFBYSxFQUFFLENBQ3RCLENBQUM7SUFDRixTQUFTO0lBQ1QsTUFBTSxVQUFVLEdBQUcsTUFBTSxRQUFRLENBQUMsR0FBRyxDQUFDLGFBQWEsQ0FBQyxDQUFDO0lBQ3JELE1BQU0sTUFBTSxHQUFHLDJCQUFvQixDQUFDLE9BQU8sQ0FDekMsVUFBVSxFQUNWLE1BQU0sYUFBYSxFQUFFLENBQ3RCLENBQUM7SUFDRixhQUFhO0lBQ2IsTUFBTSxTQUFTLEdBQWMsTUFBTSxJQUFBLDJCQUFZLEdBQUUsQ0FBQztJQUNsRCxPQUFPO0lBQ1AsTUFBTSxTQUFTLEdBQUcsTUFBTSxRQUFRLENBQUMsR0FBRyxDQUFDLGFBQWEsQ0FBQyxDQUFDO0lBQ3BELE1BQU0sSUFBSSxHQUFHLDJCQUFvQixDQUFDLE9BQU8sQ0FBQyxTQUFTLEVBQUUsTUFBTSxhQUFhLEVBQUUsQ0FBQyxDQUFDO0lBRTVFLDZCQUE2QjtJQUM3Qix3Q0FBd0M7SUFDeEMsS0FBSyxVQUFVLGdCQUFnQixDQUFDLElBQVk7UUFDMUMsSUFBSSxPQUFPLEdBQVcsRUFBRSxDQUFDO1FBQ3pCLElBQUksQ0FBQztZQUNILE9BQU8sR0FBRyxNQUFNLFFBQVEsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDckMsQ0FBQztRQUFDLE9BQU8sS0FBZ0MsRUFBRSxDQUFDO1lBQzFDLE1BQU0sSUFBSSxLQUFLLENBQUMsOEJBQThCLEdBQUcsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ2xFLENBQUM7UUFDRCxPQUFPLE9BQU8sQ0FBQztJQUNqQixDQUFDO0lBQ0Qsd0NBQXdDO0lBQ3hDLEtBQUssVUFBVSxXQUFXLENBQUMsUUFBZ0IsRUFBRSxNQUE4QjtRQUN6RSxJQUFJLEVBQUUsR0FBcUMsU0FBUyxDQUFDO1FBQ3JELElBQUksQ0FBQztZQUNILE1BQU0sU0FBUyxHQUFXLE1BQU0sZ0JBQWdCLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDM0QsRUFBRSxHQUFHLG9DQUE2QixDQUFDLE9BQU8sQ0FDeEMsU0FBUyxFQUNULE1BQU0sQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxNQUFNLGFBQWEsRUFBRSxDQUNoQixDQUFDO1FBRTVCLENBQUM7UUFBQyxPQUFPLEtBQWdDLEVBQUUsQ0FBQztZQUMxQyxNQUFNLElBQUksS0FBSyxDQUFDLHlCQUF5QixHQUFHLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUM3RCxDQUFDO1FBQ0QsT0FBTyxFQUFFLENBQUM7SUFFWixDQUFDO0lBQ0Qsd0NBQXdDO0lBQ3hDLFNBQVMsZ0JBQWdCLENBQUMsUUFBZ0I7UUFDeEMsT0FBTyxRQUFRLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQztZQUM3QixDQUFDLENBQUMsUUFBUTtZQUNWLENBQUMsQ0FBQyxNQUFNLFFBQVEsRUFBRSxDQUFDO0lBQ3ZCLENBQUM7SUFFRCxPQUFPO1FBQ0wsb0VBQW9FO1FBQ3BFLHVDQUF1QztRQUN2QyxvRUFBb0U7UUFDcEUsS0FBSyxDQUFDLE9BQU8sQ0FBQyxLQUFhO1lBQ3pCLE9BQU8sTUFBTSxRQUFRLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ25DLENBQUM7UUFDRCxvRUFBb0U7UUFDcEUsS0FBSyxDQUFDLE1BQU07WUFDVixPQUFPLE1BQU0sTUFBTSxDQUFDLFVBQVUsRUFBRSxDQUFDO1FBQ25DLENBQUM7UUFDRCxvRUFBb0U7UUFDcEUsRUFBRSxFQUFFLEtBQUssSUFBSSxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsTUFBTSxhQUFhLEVBQUUsQ0FBQyxDQUFDLFVBQVUsRUFBRSxDQUFDLENBQUMsT0FBTztRQUNwRSxvRUFBb0U7UUFDcEUsS0FBSyxDQUFDLGtCQUFrQixDQUFDLFdBQXlCLEVBQUUsVUFBa0IsRUFBRSxZQUFvQjtZQUUxRixNQUFNLFFBQVEsR0FBZ0IsRUFBRSxDQUFDO1lBQ2pDLE1BQU0sUUFBUSxHQUFnQixFQUFFLENBQUM7WUFDakMsTUFBTSxPQUFPLEdBQWdCLEVBQUUsQ0FBQztZQUVoQyxJQUFJLENBQUM7Z0JBRUgsTUFBTSxJQUFJLEdBQUcsTUFBTSxJQUFJLENBQUMsYUFBYSxDQUNuQyxXQUFXLEVBQ1gsVUFBVSxFQUNWLFlBQVksQ0FDYixDQUFDO2dCQUVGLE1BQU0sR0FBRyxHQUFHO29CQUNWLEVBQUUsVUFBVSxFQUFFLElBQUksQ0FBQyxLQUFLLEVBQUUsV0FBVyxFQUFFLFFBQVEsRUFBRTtvQkFDakQsRUFBRSxVQUFVLEVBQUUsSUFBSSxDQUFDLFFBQVEsRUFBRSxXQUFXLEVBQUUsUUFBUSxFQUFFO29CQUNwRCxFQUFFLFVBQVUsRUFBRSxJQUFJLENBQUMsT0FBTyxFQUFFLFdBQVcsRUFBRSxPQUFPLEVBQUU7aUJBQ25ELENBQUM7Z0JBRUYsS0FBSyxNQUFNLEVBQUUsVUFBVSxFQUFFLFdBQVcsRUFBRSxJQUFJLEdBQUcsRUFBRSxDQUFDO29CQUM5QyxLQUFLLE1BQU0sS0FBSyxJQUFJLFVBQVUsRUFBRSxDQUFDO3dCQUMvQixNQUFNLFlBQVksR0FBYyxjQUFXLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFjLENBQUM7d0JBQ25GLElBQUksWUFBWSxFQUFFLENBQUM7NEJBQ2pCLFdBQVcsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7d0JBQ2pDLENBQUM7b0JBQ0gsQ0FBQztnQkFDSCxDQUFDO1lBRUgsQ0FBQztZQUFDLE9BQU8sS0FBSyxFQUFFLENBQUM7WUFFakIsQ0FBQztZQUVELE9BQU87Z0JBQ0wsUUFBUTtnQkFDUixRQUFRO2dCQUNSLE9BQU87YUFDUixDQUFDO1FBQ0osQ0FBQztRQUNELG9FQUFvRTtRQUNwRSxhQUFhLEVBQUUsQ0FBQyxPQUFlLEVBQUUsRUFBRTtZQUNqQyxJQUFJLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLFdBQVcsRUFBRSxJQUFJLFlBQVksRUFBRSxDQUFDO2dCQUN2RCxJQUFJLENBQUM7b0JBQ0gsTUFBTSxNQUFNLEdBQUcsS0FBSyxDQUFDLE1BQU0sQ0FDekI7d0JBQ0UsU0FBUzt3QkFDVCxtR0FBbUc7cUJBQ3BHLEVBQ0QsSUFBSSxHQUFHLE9BQU8sQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFFLENBQzFCLENBQUM7b0JBRUYsTUFBTSxFQUNKLENBQUMsRUFBRSxXQUFXLEVBQ2QsQ0FBQyxFQUFFLGVBQWUsRUFDbEIsQ0FBQyxFQUFFLEtBQUssRUFDUixDQUFDLEVBQUUsU0FBUyxFQUFLLDBDQUEwQztvQkFDM0QsQ0FBQyxFQUFFLFVBQVUsRUFDYixDQUFDLEVBQUUsYUFBYSxFQUNoQixDQUFDLEVBQUUsV0FBVyxFQUNkLENBQUMsRUFBRSxTQUFTLEVBQ1osQ0FBQyxFQUFFLEVBQUUsRUFDTCxDQUFDLEVBQUUsU0FBUyxFQUNaLEVBQUUsRUFBRSxPQUFPLEVBQ1gsRUFBRSxFQUFFLElBQUksRUFDVCxHQUFHLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFFZCxPQUFPO3dCQUNMLFdBQVc7d0JBQ1gsZUFBZTt3QkFDZixLQUFLO3dCQUNMLFNBQVM7d0JBQ1QsVUFBVTt3QkFDVixhQUFhO3dCQUNiLFdBQVc7d0JBQ1gsU0FBUzt3QkFDVCxFQUFFO3dCQUNGLFNBQVM7d0JBQ1QsT0FBTzt3QkFDUCxJQUFJO3FCQUNMLENBQUM7Z0JBRUosQ0FBQztnQkFBQyxPQUFPLEtBQUssRUFBRSxDQUFDO29CQUNmLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUE7Z0JBQ3BCLENBQUM7WUFDSCxDQUFDO1lBQ0QsT0FBTyxTQUFTLENBQUM7UUFDbkIsQ0FBQztRQUNELG9FQUFvRTtRQUNwRSxnQkFBZ0IsRUFBRSxHQUFHLEVBQUU7WUFDckIsd0NBQXdDO1lBQ3hDLDRCQUE0QjtZQUM1QixPQUFPLEdBQUcsQ0FBQztRQUNiLENBQUM7UUFDRCxvRUFBb0U7UUFDcEUsZUFBZSxFQUFFLENBQUMsSUFBWSxFQUFFLEVBQUUsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLElBQUEsa0JBQVMsRUFBQyxJQUFJLENBQUMsQ0FBQztRQUNuRSxvRUFBb0U7UUFDcEUsZUFBZSxFQUFFLEtBQUssRUFBRSxNQUFjLEVBQW1CLEVBQUU7WUFDekQsTUFBTSxPQUFPLEdBQUcsTUFBTSxRQUFRLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQzNDLE9BQU8sT0FBTyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztRQUNoQyxDQUFDO1FBQ0Qsb0VBQW9FO1FBQ3BFLFlBQVksRUFBRSxLQUFLLEVBQUUsR0FBVyxFQUFFLElBQWlCLEVBQUUsRUFBRSxDQUNyRCw0QkFBcUIsQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLE1BQU0sYUFBYSxFQUFFLENBQUMsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDO1FBQzNFLG9FQUFvRTtRQUNwRSxLQUFLLENBQUMsTUFBTSxDQUFDLElBQVk7WUFDdkIsTUFBTSxRQUFRLEdBQUcsTUFBTSxhQUFhLEVBQUUsQ0FBQztZQUN2QyxJQUFJLElBQUksS0FBSyxFQUFFLEVBQUUsQ0FBQztnQkFDaEIsT0FBTztvQkFDTCxTQUFTLEVBQUUsRUFBRTtvQkFDYixLQUFLLEVBQUUsRUFBRTtpQkFDVixDQUFDO1lBQ0osQ0FBQztZQUNELElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUM7Z0JBQzNCLG1EQUFtRDtnQkFDbkQsSUFBSSxHQUFHLEtBQUssSUFBSSxFQUFFLENBQUM7WUFDckIsQ0FBQztZQUNELElBQUksQ0FBQztnQkFDSCxNQUFNLE9BQU8sR0FBRyxNQUFNLFFBQVEsQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDeEQsSUFBSSxDQUFDLE9BQU87b0JBQ1YsTUFBTSxJQUFJLEtBQUssQ0FBQyx3Q0FBd0MsSUFBSSxFQUFFLENBQUMsQ0FBQztnQkFDbEUsTUFBTSxLQUFLLEdBQUcsTUFBTSxRQUFRLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsQ0FBQztnQkFDM0QsT0FBTztvQkFDTCxTQUFTLEVBQUUsTUFBTSxDQUFDLEtBQUssRUFBRSxTQUFTLElBQUksQ0FBQyxDQUFDO29CQUN4QyxLQUFLLEVBQUUsT0FBTyxDQUFDLEdBQUc7aUJBQ25CLENBQUM7WUFDSixDQUFDO1lBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQztnQkFDWCxPQUFPO29CQUNMLFNBQVMsRUFBRSxFQUFFO29CQUNiLEtBQUssRUFBRSxFQUFFO2lCQUNWLENBQUM7WUFDSixDQUFDO1FBQ0gsQ0FBQztRQUVELG9FQUFvRTtRQUNwRSxXQUFXO1lBQ1QsT0FBTyxPQUFPLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMseUJBQXlCO1FBQ3hELENBQUM7UUFDRCxvRUFBb0U7UUFDcEUsS0FBSyxDQUFDLEtBQUssQ0FBQyxNQUFjO1lBQ3hCLE1BQU0sQ0FBQyxHQUFpQyxNQUFNLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDcEUsT0FBTztnQkFDTCxLQUFLLEVBQUUsQ0FBQyxDQUFDLE1BQU07Z0JBQ2YsU0FBUyxFQUFFLENBQUMsQ0FBQyxTQUFTO2dCQUN0QixRQUFRLEVBQUUsQ0FBQyxDQUFDLGFBQWE7YUFDMUIsQ0FBQztRQUNKLENBQUM7UUFDRCxvRUFBb0U7UUFDcEUsUUFBUSxFQUFFLEtBQUssRUFBRSxJQUF3QixFQUFFLEVBQUU7WUFDM0MsSUFBSSxDQUFDLElBQUk7Z0JBQUUsT0FBTyxFQUFFLENBQUM7WUFDckIsT0FBTyxNQUFNLENBQ1gsTUFBTSxxQkFBYyxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsTUFBTSxhQUFhLEVBQUUsQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUNyRSxDQUFDO1FBQ0osQ0FBQztRQUNELG9FQUFvRTtRQUNwRSxVQUFVLEVBQUUsR0FBRyxFQUFFLENBQUMsVUFBVTtRQUM1QixvRUFBb0U7UUFDcEUsU0FBUyxFQUFFLEdBQUcsRUFBRSxDQUFDLFNBQVM7UUFDMUIsb0VBQW9FO1FBQ3BFLGlCQUFpQixFQUFFLEtBQUssRUFDdEIsR0FBVyxFQUNYLEtBQWtCLEVBQ2xCLE9BQW9CLEVBQ3BCLEVBQUUsQ0FDRixNQUFNLDRCQUFxQixDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsTUFBTSxhQUFhLEVBQUUsQ0FBQyxDQUFDLFNBQVMsQ0FDdkUsS0FBSyxFQUNMLE9BQU8sQ0FDUjtRQUNILG9FQUFvRTtRQUNwRSxPQUFPLEVBQUUsS0FBSyxFQUFFLElBQWlCLEVBQUUsRUFBRSxDQUFDLENBQUMsTUFBTSxhQUFhLEVBQUUsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUM7UUFDOUUsb0VBQW9FO1FBQ3BFLFFBQVEsRUFBRSxLQUFLLElBQUksRUFBRSxDQUFDLE1BQU0sYUFBYSxFQUFFO1FBQzNDLG9FQUFvRTtRQUNwRSxLQUFLLENBQUMsWUFBWSxDQUFDLFdBQXlCLEVBQUUsU0FBaUIsRUFBRSxXQUFtQjtZQUNsRixlQUFlO1lBQ2YsSUFBSSxVQUFVLEdBQVcsRUFBRSxHQUFHLEdBQUcsR0FBRyxLQUFLLENBQUM7WUFFMUMsSUFBSSxDQUFDO2dCQUVILE1BQU0sRUFBRSxHQUFHLE1BQU0sSUFBSSxDQUFDLGFBQWEsQ0FDakMsV0FBVyxFQUNYLFNBQVMsRUFDVCxXQUFXLENBQ1osQ0FBQztnQkFFRixNQUFNLFFBQVEsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ3ZCLE1BQU0sT0FBTyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFFdEIsTUFBTSxRQUFRLEdBQVcsTUFBTSxDQUFDLFlBQVMsQ0FBQyxTQUFTLENBQUMsQ0FBQztnQkFDckQsTUFBTSxTQUFTLEdBQVcsTUFBTSxDQUFDLFlBQVMsQ0FBQyxTQUFTLENBQUMsQ0FBQztnQkFFdEQsTUFBTSxNQUFNLEdBQ1YsT0FBTyxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUM7b0JBQzFCLE9BQU8sQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDO29CQUMzQixRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQztvQkFDM0IsUUFBUSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsQ0FBQztnQkFFL0IsSUFBSSxNQUFNLEVBQUUsQ0FBQztvQkFDWCxZQUFZO29CQUNaLFVBQVUsR0FBRyxDQUFDLEVBQUUsR0FBRyxHQUFHLENBQUMsR0FBRyxLQUFLLENBQUM7Z0JBQ2xDLENBQUM7cUJBQU0sQ0FBQztvQkFDTixXQUFXO29CQUNYLFVBQVUsR0FBRyxDQUFDLEVBQUUsR0FBRyxHQUFHLENBQUMsR0FBRyxLQUFLLENBQUM7Z0JBQ2xDLENBQUM7WUFFSCxDQUFDO1lBQUMsT0FBTyxLQUFLLEVBQUUsQ0FBQztnQkFDZixPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFBO1lBQ3JCLENBQUM7WUFFRCxPQUFPLFVBQVUsQ0FBQztRQUNwQixDQUFDO1FBRUQsb0VBQW9FO1FBQ3BFLDRDQUE0QztRQUM1QyxvRUFBb0U7UUFDcEUsS0FBSyxDQUFDLFNBQVMsQ0FBQyxRQUFRO1lBQ3RCLElBQUksSUFBSSxHQUFZO2dCQUNsQixNQUFNLEVBQUUsUUFBUTtnQkFDaEIsR0FBRyxFQUFFLEVBQUU7Z0JBQ1Asb0JBQW9CLEVBQUUsRUFBRTtnQkFDeEIsUUFBUSxFQUFFLEVBQUU7Z0JBQ1osWUFBWSxFQUFFLEVBQUU7YUFDakIsQ0FBQTtZQUNELElBQUksQ0FBQztnQkFDSCxNQUFNLEVBQUUsR0FBRyxNQUFNLFdBQVcsQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO2dCQUN6RCw2Q0FBNkM7Z0JBQzdDLE1BQU0sTUFBTSxHQUFHLE1BQU0sRUFBRSxFQUFFLE9BQU8sRUFBRSxDQUFDO2dCQUNuQyxJQUFJLE1BQU0sRUFBRSxDQUFDO29CQUNYLElBQUksR0FBRzt3QkFDTCxNQUFNLEVBQUUsUUFBUSxFQUFFLG9DQUFvQzt3QkFDdEQsR0FBRyxFQUFFLE1BQU0sQ0FBQyxJQUFJO3dCQUNoQixvQkFBb0IsRUFBRSxNQUFNLENBQUMsT0FBTzt3QkFDcEMsUUFBUSxFQUFFLE1BQU0sQ0FBQyxhQUFhO3dCQUM5QixZQUFZLEVBQUUsTUFBTSxDQUFDLE1BQU07cUJBQzVCLENBQUM7Z0JBQ0osQ0FBQztZQUVILENBQUM7WUFBQyxPQUFPLEtBQWdDLEVBQUUsQ0FBQztnQkFDMUMsT0FBTyxDQUFDLElBQUksQ0FBQyxzQkFBc0IsR0FBRyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUM7Z0JBQ3JELE1BQU0sSUFBQSxRQUFLLEVBQUMsSUFBSSxDQUFDLENBQUM7WUFFcEIsQ0FBQztZQUNELE9BQU8sSUFBSSxDQUFDO1FBQ2QsQ0FBQztRQUNELG9FQUFvRTtRQUNwRSxLQUFLLENBQUMsVUFBVSxDQUFDLFFBQVEsRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLE9BQU87WUFDaEQsSUFBSSxNQUErQyxDQUFDO1lBQ3BELElBQUksQ0FBQztnQkFDSCxNQUFNLEVBQUUsR0FBRyxNQUFNLFdBQVcsQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLENBQUMsRUFBRSxNQUFNLENBQUMsQ0FBQztnQkFDakUsTUFBTSxHQUFHLE1BQU0sRUFBRSxFQUFFLE9BQU8sQ0FBQyxNQUFNLEVBQUUsRUFBRSxHQUFHLE9BQU8sRUFBRSxDQUFDLENBQUM7WUFDckQsQ0FBQztZQUFDLE9BQU8sS0FBZ0MsRUFBRSxDQUFDO2dCQUMxQyxPQUFPLENBQUMsSUFBSSxDQUFDLHVCQUF1QixHQUFHLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUN4RCxDQUFDO1lBQ0QsT0FBTyxNQUFNLENBQUM7UUFDaEIsQ0FBQztRQUNELG9FQUFvRTtRQUNwRSxLQUFLLENBQUMsU0FBUyxDQUFDLE1BQU0sRUFBRSxNQUFNO1lBQzVCLElBQUksTUFBK0MsQ0FBQztZQUNwRCxJQUFJLENBQUM7Z0JBQ0gsTUFBTSxFQUFFLEdBQUcsTUFBTSxXQUFXLENBQUMsZ0JBQWdCLENBQUMsVUFBVSxDQUFDLEVBQUUsTUFBTSxDQUFDLENBQUM7Z0JBQ25FLE1BQU0sR0FBRyxNQUFNLEVBQUUsRUFBRSxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDckMsQ0FBQztZQUFDLE9BQU8sS0FBZ0MsRUFBRSxDQUFDO2dCQUMxQyxPQUFPLENBQUMsSUFBSSxDQUFDLHNCQUFzQixHQUFHLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUN2RCxDQUFDO1lBQ0QsT0FBTyxNQUFNLENBQUM7UUFDaEIsQ0FBQztRQUNELG9FQUFvRTtRQUNwRSxjQUFjLEVBQUUsS0FBSyxFQUFHLDZCQUE2QjtRQUNuRCxNQUFjLEVBQ2QsSUFBWSxFQUNaLE1BQWMsRUFDZCxFQUF5QixFQUN6QixFQUFFO1lBQ0YsTUFBTSxFQUFFLEdBQUcsb0NBQTZCLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxNQUFNLENBQUMsQ0FBQztZQUMvRCxNQUFNLE9BQU8sR0FBRyxNQUFNLEVBQUUsQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFLEVBQUUsR0FBRyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1lBQ3BELE9BQU87Z0JBQ0wsSUFBSSxFQUFFLE9BQU8sQ0FBQyxJQUFJO2dCQUNsQixFQUFFLEVBQUUsT0FBTzthQUNaLENBQUM7UUFDSixDQUFDO1FBQ0Qsb0VBQW9FO1FBQ3BFLGlCQUFpQixFQUFFLEtBQUssRUFBRSxNQUFXLEVBQUUsSUFBWSxFQUFFLEVBQU8sRUFBRSxFQUFFO1lBQzlELE1BQU0sRUFBRSxHQUFHLG9DQUE2QixDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsTUFBTSxDQUFDLENBQUM7WUFDL0QsTUFBTSxRQUFRLEdBQUcsTUFBTSxFQUFFLENBQUMsUUFBUSxDQUFDLEVBQUUsR0FBRyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1lBQzlDLE9BQU87Z0JBQ0wsSUFBSSxFQUFFLFFBQVEsQ0FBQyxJQUFJO2dCQUNuQixFQUFFLEVBQUUsUUFBUTthQUNiLENBQUM7UUFDSixDQUFDO1FBQ0Qsb0VBQW9FO1FBQ3BFLGVBQWUsRUFBRSxLQUFLLEVBQUUsSUFBWSxFQUFFLEVBQUU7WUFDdEMsTUFBTSxFQUFFLEdBQUcsb0NBQTZCLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxNQUFNLGFBQWEsRUFBRSxDQUFDLENBQUM7WUFDOUUsTUFBTSxHQUFHLEdBQUcsTUFBTSxFQUFFLENBQUMsR0FBRyxFQUFFLENBQUM7WUFDM0IsT0FBTyxHQUFHLENBQUM7UUFDYixDQUFDO1FBQ0Qsb0VBQW9FO1FBQ3BFLGdCQUFnQixFQUFFLEtBQUssRUFBRSxJQUFZLEVBQUUsRUFBRTtZQUN2QyxNQUFNLEVBQUUsR0FBRyxvQ0FBNkIsQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLE1BQU0sYUFBYSxFQUFFLENBQUMsQ0FBQztZQUM5RSxNQUFNLFdBQVcsR0FBRyxNQUFNLEVBQUUsQ0FBQyxXQUFXLEVBQUUsQ0FBQztZQUMzQyxPQUFPLFdBQVcsQ0FBQztRQUNyQixDQUFDO1FBQ0Qsb0VBQW9FO1FBQ3BFLGdCQUFnQixFQUFFLEtBQUssRUFBRSxJQUFZLEVBQUUsRUFBRTtZQUN2QyxNQUFNLEVBQUUsR0FBRyxvQ0FBNkIsQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLE1BQU0sYUFBYSxFQUFFLENBQUMsQ0FBQztZQUM5RSxNQUFNLFdBQVcsR0FBRyxNQUFNLEVBQUUsQ0FBQyxlQUFlLEVBQUUsQ0FBQztZQUMvQyxPQUFPLFdBQVcsQ0FBQztRQUNyQixDQUFDO1FBQ0Qsb0VBQW9FO1FBQ3BFLEtBQUssQ0FBQyxnQkFBZ0IsQ0FDcEIsV0FBeUIsRUFDekIsU0FBaUIsRUFDakIsV0FBbUI7WUFFbkIsTUFBTSxFQUFFLEdBQUcsTUFBTSxJQUFJLENBQUMsYUFBYSxDQUNqQyxXQUFXLEVBQ1gsU0FBUyxFQUNULFdBQVcsQ0FDWixDQUFDO1lBQ0YsTUFBTSxpQkFBaUIsR0FBRyxFQUFFLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUNoRCxPQUFPLGlCQUFpQixDQUFDO1FBQzNCLENBQUM7UUFDRCxvRUFBb0U7UUFDcEUsbURBQW1EO1FBQ25ELG9FQUFvRTtRQUNwRSx5QkFBeUIsRUFBRSxLQUFLLEVBQUUsSUFBWSxFQUFFLEVBQUU7WUFDaEQsSUFBSSxDQUFDO2dCQUNILE1BQU0sR0FBRyxHQUE0QyxNQUFNLFNBQVMsQ0FBQyxlQUFlLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDO2dCQUM3RixNQUFNLFFBQVEsR0FDWixHQUFHLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLFlBQVksSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDO2dCQUM5RCxPQUFPLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNyQixDQUFDO1lBQUMsT0FBTyxLQUFLLEVBQUUsQ0FBQztnQkFDZixPQUFPLFNBQVMsQ0FBQztZQUNuQixDQUFDO1FBQ0gsQ0FBQztRQUNELG9FQUFvRTtRQUNwRSx1QkFBdUIsRUFBRSxLQUFLLEVBQUUsSUFBWSxFQUFFLEVBQUU7WUFDOUMsSUFBSSxDQUFDO2dCQUNILE1BQU0sRUFBRSxHQUEwQyxNQUFNLFNBQVMsQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ3ZGLE9BQU8sRUFBRSxDQUFDO1lBQ1osQ0FBQztZQUFDLE9BQU8sS0FBSyxFQUFFLENBQUM7Z0JBQ2YsT0FBTyxTQUFTLENBQUM7WUFDbkIsQ0FBQztRQUVILENBQUM7UUFDRCxvRUFBb0U7UUFDcEUsS0FBSyxDQUFDLGVBQWUsQ0FBQyxJQUFZO1lBRWhDLE1BQU0sT0FBTyxHQUFHLE1BQU0sQ0FBQyxNQUFNLGFBQWEsRUFBRSxDQUFDLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLENBQUM7WUFFdkUsSUFBSSxDQUFDLE9BQU87Z0JBQUUsTUFBTSxJQUFJLEtBQUssQ0FBQyxpQ0FBaUMsSUFBSSxFQUFFLENBQUMsQ0FBQztZQUN2RSxNQUFNLEdBQUcsR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQ2xDLENBQUMsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUNmLE1BQU0sQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLGlCQUFpQixDQUFDLENBQUMsU0FBUyxDQUN2RCxDQUNGLENBQUM7WUFDRixJQUFJLENBQUMsR0FBRztnQkFDTixNQUFNLElBQUksS0FBSyxDQUFDLDhDQUE4QyxJQUFJLEVBQUUsQ0FBQyxDQUFDO1lBQ3hFLE1BQU0sTUFBTSxHQUFHLE1BQU0sQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQzlDLE9BQU8sTUFBTSxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUM7UUFDN0IsQ0FBQztRQUNELG9FQUFvRTtRQUNwRSwrQ0FBK0M7UUFDL0Msb0VBQW9FO1FBQ3BFLFdBQVcsRUFBRSxLQUFLLEVBQ2hCLE1BQTZCLEVBQzdCLEdBQVcsRUFDWCxPQUFvQixFQUNwQixHQUFpQixFQUNqQixPQUFZLEVBQ1osRUFBRTtZQUNGLE1BQU0sR0FBRyxHQUFHLDRCQUFxQixDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsTUFBTSxDQUFDLENBQUM7WUFDdkQsSUFBSSxDQUFDO1lBRUwsQ0FBQztZQUFDLE9BQU8sS0FBSyxFQUFFLENBQUM7WUFFakIsQ0FBQztZQUNELE1BQU0sY0FBYyxHQUFHLE1BQU0sR0FBRyxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsT0FBTyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1lBQ25FLE1BQU0sUUFBUSxHQUFHLE1BQU0sR0FBRyxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUUsR0FBRyxFQUFFO2dCQUMvQyxHQUFHLE9BQU87Z0JBQ1YsUUFBUSxFQUFFLGNBQWM7YUFDekIsQ0FBQyxDQUFDO1lBQ0gsTUFBTSxRQUFRLENBQUMsSUFBSSxFQUFFLENBQUM7WUFDdEIsT0FBTyxRQUFRLENBQUMsSUFBSSxDQUFDO1FBQ3ZCLENBQUM7UUFDRCxvRUFBb0U7UUFDcEUsZUFBZSxFQUFFLEtBQUssRUFDcEIsTUFBNkIsRUFDN0IsR0FBVyxFQUNYLEdBQVcsRUFDWCxFQUFVLEVBQ1YsRUFBVSxFQUNWLEVBQVUsRUFDVixHQUF1QixFQUN2QixPQUFZLEVBQ1osRUFBRTtZQUVGLE1BQU0sTUFBTSxHQUFlO2dCQUN6QixXQUFXLEVBQUUsRUFBRSxFQUFFLDRCQUE0QjtnQkFDN0MsVUFBVSxFQUFFLEtBQUssRUFBRSx5QkFBeUI7Z0JBQzVDLFVBQVUsRUFBRSxHQUFHO2dCQUNmLGFBQWEsRUFBRSxHQUFHO2dCQUNsQixTQUFTLEVBQUUsR0FBRztnQkFDZCxTQUFTLEVBQUUsRUFBRTtnQkFDYixPQUFPLEVBQUUsRUFBRTtnQkFDWCxFQUFFLEVBQUUsRUFBRTtnQkFDTixTQUFTLEVBQUUsSUFBSTthQUNoQixDQUFBO1lBRUQsSUFBSSxDQUFDO2dCQUNILElBQUksT0FBTyxHQUFHLE1BQU0sTUFBTTtxQkFDdkIsT0FBTyxDQUFDLE1BQU0sQ0FBQztxQkFDZixlQUFlLENBQUMsV0FBVyxDQUFDLE1BQU0sRUFBRTtvQkFDbkMsS0FBSyxFQUFFLEdBQUksR0FBRyxHQUFHLEdBQUcsR0FBRztpQkFDeEIsQ0FBQyxDQUFDO2dCQUVMLE1BQU0sUUFBUSxHQUFHLE1BQU0sYUFBYSxFQUFFLENBQUM7Z0JBQ3ZDLGFBQWE7Z0JBQ2IsTUFBTSxXQUFXLEdBQUcsTUFBTSxRQUFRLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxDQUFDO2dCQUV0RCxJQUFJLE9BQU8sR0FBRyxXQUFXLEVBQUUsQ0FBQztvQkFDMUIsT0FBTzt3QkFDTCxJQUFJLEVBQUUsb0JBQW9CO3dCQUMxQixFQUFFLEVBQUUsT0FBaUQ7cUJBQ3RELENBQUE7Z0JBQ0gsQ0FBQztnQkFFRCxNQUFNLEVBQUUsR0FBRyxNQUFNLE1BQU07cUJBQ3BCLE9BQU8sQ0FBQyxNQUFNLENBQUM7cUJBQ2YsZUFBZSxDQUFDLE1BQU0sRUFBRTtvQkFDdkIsR0FBRyxPQUFPO29CQUNWLEtBQUssRUFBRSxHQUFJLEdBQUcsR0FBRyxHQUFHLEdBQUc7b0JBQ3ZCLFFBQVEsRUFBRSxPQUFPLEdBQUcsT0FBTztpQkFDNUIsQ0FBQyxDQUFDO2dCQUVMLE9BQU87b0JBQ0wsSUFBSSxFQUFFLEVBQUUsQ0FBQyxJQUFJO29CQUNiLEVBQUUsRUFBRSxFQUFFO2lCQUNQLENBQUM7WUFDSixDQUFDO1lBQUMsT0FBTyxLQUFTLEVBQUUsQ0FBQztnQkFDbkIsSUFBRyxLQUFLLElBQUksS0FBSyxDQUFDLFlBQVksRUFBQyxDQUFDO29CQUM5QixPQUFPLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxLQUFLLENBQUMsQ0FBQTtvQkFDaEMsTUFBTSxRQUFRLEdBQUcsS0FBSyxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7b0JBQy9DLE9BQU87d0JBQ0wsSUFBSSxFQUFFLFFBQVEsQ0FBQyxRQUFRLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDO3dCQUNwRCxFQUFFLEVBQUUsT0FBaUQ7cUJBQ3RELENBQUE7Z0JBQ0gsQ0FBQztxQkFBTSxDQUFDO29CQUNOLE9BQU87d0JBQ0wsSUFBSSxFQUFFLGtDQUFrQzt3QkFDeEMsRUFBRSxFQUFFLE9BQWlEO3FCQUN0RCxDQUFBO2dCQUNILENBQUM7WUFDSCxDQUFDO1FBRUgsQ0FBQztRQUNELG9FQUFvRTtRQUNwRSxLQUFLLENBQUMsS0FBSyxDQUFDLGFBQTJCLEVBQUUsU0FBaUIsRUFBRSxXQUFtQjtZQUM3RSxNQUFNLFdBQVcsR0FBRyxNQUFNLE1BQU0sQ0FBQyxXQUFXLENBQzFDLGFBQWEsRUFDYixTQUFTLEVBQ1QsV0FBVyxDQUNaLENBQUM7WUFDRixPQUFPLFdBQVcsQ0FBQztRQUNyQixDQUFDO1FBQ0Qsb0VBQW9FO1FBQ3BFLDRDQUE0QztRQUM1QyxvRUFBb0U7UUFDcEUsS0FBSyxDQUFDLG1CQUFtQixDQUN2QixXQUFnQixFQUNoQixhQUFrQixFQUNsQixNQUFvQixFQUNwQixTQUFjO1lBRWQsT0FBTyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDeEIsQ0FBQztLQUVGLENBQUM7QUFDSixDQUFDIn0=