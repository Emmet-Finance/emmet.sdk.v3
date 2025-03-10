"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sleep = void 0;
exports.tonHandler = tonHandler;
exports.raise = raise;
exports.assertNotNull = assertNotNull;
const ton_1 = require("@ton/ton");
const _1 = require(".");
const ton_2 = require("../contracts/ton");
const jetton_master_1 = require("../contracts/ton/jetton-master");
const address_book_1 = require("../contracts/ton/address-book");
const api_1 = require("@ston-fi/api");
const sdk_1 = require("@ston-fi/sdk");
const tact_JettonLP_1 = require("../contracts/ton/pools/tact_JettonLP");
const tact_TonLP_1 = require("../contracts/ton/pools/ton/tact_TonLP");
const tact_LPWallet_1 = require("../contracts/ton/pools/ton/tact_LPWallet");
const crypto_1 = require("@ton/crypto");
const jetton_wallet_1 = require("../contracts/ton/jetton-wallet");
const wrapped_jetton_1 = require("../contracts/ton/wrapped-jetton");
const wrapped_jetton_wallet_1 = require("../contracts/ton/wrapped-jetton-wallet");
const strategies_1 = require("./strategies");
// const ADDRESS_ZERO: string = "EQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAM9c";
const MIN_TX_FEE = (0, ton_1.toNano)("0.03");
/**
 * Holds the code execution for a number of `ms` milliseconds
 * @param ms number of milliseconds to wait
 * @returns halts the program execution for the `ms` milliseconds
 */
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
exports.sleep = sleep;
async function tonHandler({ rpcs, nativeTokenId, chainName, chainId, stonApiUrl, addressBook, stonRouterAddress, pTonAddress, }) {
    // -------------------------------------
    const clients = rpcs.map((rpc) => new ton_1.TonClient({ endpoint: rpc }));
    const fetchClient = () => {
        const randomRpcIndex = Math.floor(Math.random() * rpcs.length);
        return clients[randomRpcIndex];
    };
    const getContractProvider = (address) => {
        return fetchClient().provider(address);
    };
    //          C O N T R A C T S
    const ab = fetchClient().open(address_book_1.AddressBook.fromAddress(addressBook));
    const bridge = await getAddressByName("EmmetBridge");
    const bridgeReader = fetchClient().open(ton_2.EmmetBridge.fromAddress(bridge));
    //          F U N C T I O N S
    // -------------------------------------
    async function getAddressByName(name) {
        try {
            const poolAddress = await ab.getGet(name) ??
                raise(`Failed to fetch the ${name} address from the addressbook`);
            return poolAddress;
        }
        catch (error) {
            throw new Error(error.message);
        }
    }
    // -------------------------------------
    function getJettonLp(pool) {
        try {
            return fetchClient().open(tact_JettonLP_1.JettonLP.fromAddress(ton_1.Address.parse(pool)));
        }
        catch {
            throw new Error("Error getting JettonLP");
        }
    }
    // -------------------------------------
    async function getJettonLpByName(poolName) {
        try {
            const poolAddress = await getAddressByName(poolName.includes("elp") ? poolName : `elp${poolName}`);
            return fetchClient().open(tact_JettonLP_1.JettonLP.fromAddress(poolAddress));
        }
        catch (error) {
            throw new Error("Emmet.SDK getJettonLpByName: " + error.message);
        }
    }
    // -------------------------------------
    async function getLastTxHashInBase64ForAddress(addr) {
        const txns = await fetchClient().getTransactions(addr, { limit: 1 });
        return txns[0].hash().toString("base64");
    }
    // -------------------------------------
    function getJettonMaster(address) {
        return fetchClient().open(jetton_master_1.JettonMinter.createFromAddress(address));
    }
    // -------------------------------------
    function getJettonWallet(walletAddress) {
        return fetchClient().open(jetton_wallet_1.JettonWallet.createFromAddress(walletAddress));
    }
    // -------------------------------------
    async function getStrategies(targetChain, fromSymbol, targetSymbol) {
        const strategy = await bridgeReader.getGetStrategies(BigInt(targetChain), toKey(fromSymbol), toKey(targetSymbol));
        if (!strategy)
            throw new Error("No cross chain strategy found");
        const outgoing = [];
        for (let i = 0; i < strategy.local.size; i++) {
            const strat = strategy.local.path.get(BigInt(i));
            if (strat) {
                const strategyName = _1.strategyMap[BigInt(strat).toString()];
                outgoing.push(strategyName);
            }
        }
        const foreign = [];
        for (let i = 0; i < strategy.foreign.size; i++) {
            const strat = strategy.foreign.path.get(BigInt(i));
            if (strat) {
                const strategyName = _1.strategyMap[BigInt(strat).toString()];
                foreign.push(strategyName);
            }
        }
        const incoming = [];
        for (let i = 0; i < strategy.incomming.size; i++) {
            const strat = strategy.incomming.path.get(BigInt(i));
            if (strat) {
                const strategyName = _1.strategyMap[BigInt(strat).toString()];
                incoming.push(strategyName);
            }
        }
        return {
            foreign,
            outgoing,
            incoming
        };
    }
    // -------------------------------------
    async function transferTon(bridge, sender, to, targetTkn, chainId, amount, gasArgs) {
        return (await bridge.send(sender, {
            value: amount + gasArgs.value,
        }, {
            $$type: "FreezeTon",
            amount: amount,
            target_chain: BigInt(chainId),
            to: (0, ton_1.beginCell)().storeStringRefTail(to).endCell(),
            from_token: (0, ton_1.beginCell)()
                .storeInt(toKey("TON"), 256)
                .storeStringRefTail("TON")
                .endCell(),
            to_token: (0, ton_1.beginCell)()
                .storeInt(toKey(targetTkn), 256)
                .storeStringRefTail(targetTkn)
                .endCell(),
        }));
    }
    // -------------------------------------
    const transferJettonToBurner = async (fromToken, targetToken, signer, amt, destAddress, cid, gasArgs) => {
        const tid = toKey(fromToken);
        const wt = await bridgeReader.getGetToken(tid);
        const jt = fetchClient().open(wrapped_jetton_1.WrappedJetton.fromAddress(wt.address));
        const jtw = fetchClient().open(wrapped_jetton_wallet_1.WrappedJettonWallet.fromAddress(await jt.getGetWalletAddress(signer.address)));
        // console.log("Destination chainId:", cid);
        return (await jtw.send(signer, { value: gasArgs.value + MIN_TX_FEE * 4n }, {
            $$type: "JettonBurn",
            amount: amt,
            custom_payload: null,
            query_id: 0n,
            forward_payload: (0, ton_1.beginCell)()
                .storeUint(cid, 64) // Target Chain
                .storeRef((0, ton_1.beginCell)()
                .storeUint(toKey(fromToken), 256)
                .storeStringRefTail(fromToken)
                .asCell())
                .storeRef((0, ton_1.beginCell)().storeStringRefTail(destAddress).asCell())
                .storeRef((0, ton_1.beginCell)()
                .storeUint(toKey(targetToken), 256)
                .storeStringRefTail(targetToken)
                .asCell())
                .endCell(),
            forward_ton_amount: gasArgs.value + MIN_TX_FEE * 3n,
            response_destination: bridge,
        }));
    };
    // -------------------------------------
    const transferJettonToBridge = async (fromToken, targetToken, signer, target_chain, destAddress, amt, gasArgs) => {
        const token = await bridgeReader.getGetToken(toKey(fromToken));
        const jt = fetchClient().open(wrapped_jetton_1.WrappedJetton.fromAddress(token.address));
        const walletAddress = await jt.getGetWalletAddress(signer.address);
        const wallet = getContractProvider(walletAddress);
        const forward_payload = (0, ton_1.beginCell)()
            .storeUint(target_chain, 64) // Target Chain
            .storeRef((0, ton_1.beginCell)()
            .storeUint(toKey(fromToken), 256)
            .storeStringRefTail(fromToken)
            .asCell())
            .storeRef((0, ton_1.beginCell)()
            .storeStringRefTail(destAddress)
            .asCell())
            .storeRef((0, ton_1.beginCell)()
            .storeUint(toKey(targetToken), 256)
            .storeStringRefTail(targetToken)
            .asCell())
            .endCell();
        const body = (0, ton_1.beginCell)()
            .storeUint(jetton_master_1.Op.transfer, 32)
            .storeUint(1n, 64)
            .storeCoins(amt)
            .storeAddress(bridge)
            .storeAddress(bridge)
            .storeMaybeRef(null)
            .storeCoins(gasArgs.value + MIN_TX_FEE * 4n)
            .storeMaybeRef(forward_payload)
            .endCell();
        const isLucky = fromToken === "LKY";
        await wallet.internal(signer, {
            value: isLucky ? gasArgs.value + MIN_TX_FEE * 5n + (0, ton_1.toNano)("0.031") : gasArgs.value + MIN_TX_FEE * 5n,
            sendMode: ton_1.SendMode.PAY_GAS_SEPARATELY,
            bounce: true,
            body
        });
        return body.hash().toString("hex");
    };
    // -------------------------------------
    function isWrappedToken(strategy) {
        let isWrapped = false;
        try {
            for (let i = 0; i < strategy.length; i++) {
                if (strategy[i]
                    && BigInt(strategy[i]) === strategies_1.TonStrategies.BURN)
                    return true;
            }
        }
        catch (error) {
            console.warn("Emmet.SDK isWrappedToken", error);
        }
        return isWrapped;
    }
    // -------------------------------------
    async function getNewTxAfterHash(last, addr, op) {
        let foundTx = false;
        let hash = "";
        let retries = 0;
        while (!foundTx && retries < 10) {
            const latestTx = (await fetchClient().getTransactions(addr, { limit: 1 }))[0];
            if (latestTx.hash().toString("base64") === last) {
                await new Promise((e) => setTimeout(e, 10000));
                retries++;
                continue;
            }
            const txs = await fetchClient().getTransactions(addr, { limit: 10 });
            for (const tx of txs) {
                for (let i = 0; i < tx.outMessages.size; i++) {
                    const msg = tx.outMessages.get(i) ?? raise("Unreachable");
                    if (msg.body.asSlice().loadUint(32) === op) {
                        foundTx = true;
                        hash = tx.hash().toString("hex");
                    }
                }
            }
            retries++;
        }
        return {
            hash,
            tx: hash,
        };
    }
    const ston = new api_1.StonApiClient({
        baseURL: stonApiUrl,
    });
    // -------------------------------------
    return {
        // -----------------------------------------------------------------
        //                    S W A P - R E L A T E D
        // -----------------------------------------------------------------
        async swapTokens(sender, fromSymbol, targetSymbol, amount, _slippage) {
            try { // https://docs.ston.fi/docs/developer-section/sdk/dex-v2/swap
                if (fromSymbol === targetSymbol) {
                    throw new Error("From and Target tokens are the same");
                }
                const stonRouter = fetchClient().open(new sdk_1.DEX.v2_2.Router(stonRouterAddress));
                const proxyTon = sdk_1.pTON.v2_1.create(pTonAddress);
                if (!sender.address)
                    throw new Error("Sender address not passed");
                const ft = await bridgeReader.getGetToken(toKey(fromSymbol));
                if (!ft)
                    throw new Error("From Token not found");
                const tt = await bridgeReader.getGetToken(toKey(targetSymbol));
                if (!tt)
                    throw new Error("Target Token not found");
                if (fromSymbol === "TON") {
                    await stonRouter.sendSwapTonToJetton(sender, {
                        askJettonAddress: tt.address,
                        minAskAmount: 0,
                        offerAmount: amount,
                        proxyTon,
                        userWalletAddress: sender.address,
                    });
                    return;
                }
                if (targetSymbol === "TON") {
                    await stonRouter.sendSwapJettonToTon(sender, {
                        minAskAmount: 0,
                        offerAmount: amount,
                        proxyTon,
                        userWalletAddress: sender.address,
                        offerJettonAddress: ft.address,
                    });
                    return;
                }
                await stonRouter.sendSwapJettonToJetton(sender, {
                    askJettonAddress: tt.address,
                    minAskAmount: 0,
                    offerAmount: amount,
                    offerJettonAddress: ft.address,
                    userWalletAddress: sender.address,
                });
                return;
            }
            catch (error) {
                console.warn(error);
            }
        },
        // -----------------------------------------------------------------
        async getSwapResultAmount(fromSymbol, targetSymbol, amount, slippage) {
            const ft = await bridgeReader.getGetToken(toKey(fromSymbol));
            if (!ft)
                throw new Error("From Token not found");
            const tt = await bridgeReader.getGetToken(toKey(targetSymbol));
            if (!tt)
                throw new Error("Target Token not found");
            const simulation = await ston.simulateSwap({
                askAddress: tt.address.toString(),
                offerAddress: ft.address.toString(),
                offerUnits: amount.toString(),
                slippageTolerance: (slippage / 10000).toString(),
            });
            return BigInt(simulation.minAskUnits);
        },
        // -----------------------------------------------------------------
        //                  L I Q U D I T Y  P O O L
        // -----------------------------------------------------------------
        async getLpData(poolName) {
            try {
                const lp = await getJettonLpByName(poolName);
                const data = await lp.getGetData();
                return data;
            }
            catch (error) {
                console.warn(error);
                return {
                    '$$type': 'LPData',
                    apy: 0n,
                    available_underlying: 0n,
                    decimals: 1n,
                    fee_growth_global: 0n,
                    fee_decimals: 0n,
                    protocol_fee: 0n,
                    protocol_fee_amount: 0n,
                    token_fee: 0n,
                    total_supply: 0n
                };
            }
        },
        // -----------------------------------------------------------------
        async getPosition(poolName, staker) {
            try {
                const lp = await getJettonLpByName(poolName);
                const position = await lp.getGetPosition(ton_1.Address.parse(staker));
                return position;
            }
            catch {
                return {
                    "$$type": "Position",
                    balance: 0n,
                    last_fee_growth: 0n,
                    rewards: 0n
                };
            }
        },
        // -----------------------------------------------------------------
        async getRewards(poolName, staker) {
            try {
                const lp = await getJettonLpByName(poolName);
                return await lp.getRewards(ton_1.Address.parse(staker));
            }
            catch {
                return 0n;
            }
        },
        // -----------------------------------------------------------------
        async stakeToken(poolName, signer, amount, gasArgs) {
            if (!signer.address)
                throw new Error(`Signer address not passed: ${signer}`);
            try {
                const value = (0, ton_1.toNano)("0.12");
                const forwardAmount = (0, ton_1.toNano)('0.095');
                const lp = await getJettonLpByName(poolName);
                const underlyingAddress = await lp.getUnderlying();
                const jettonMaster = getJettonMaster(underlyingAddress);
                const underlyingWallet = getJettonWallet(await jettonMaster.getWalletAddress(signer.address));
                const last = await getLastTxHashInBase64ForAddress(underlyingWallet.address);
                const addValue = gasArgs
                    ? gasArgs.value
                    : 0n;
                await underlyingWallet.sendTransfer(signer, value + addValue, amount, lp.address, signer.address, (0, ton_1.beginCell)().storeStringRefTail("Deposit").endCell(), forwardAmount, null);
                return (await getNewTxAfterHash(last, underlyingWallet.address, 0xf8a7ea5) // op::transfer
                ).hash;
            }
            catch (error) {
                throw new Error(`Emmet.SDK stakeJetton: ${error.message}`);
            }
        },
        // -----------------------------------------------------------------
        async stakeCoin(signer, amount) {
            if (!signer.address)
                throw new Error(`Signer address not passed: ${signer}`);
            const tonLpAddress = await ab.getGet("elpTON");
            const tonLp = fetchClient().open(tact_TonLP_1.TonLP.fromAddress(tonLpAddress));
            const last = await getLastTxHashInBase64ForAddress(tonLp.address);
            await tonLp.send(signer, {
                value: amount + (0, ton_1.toNano)("0.04"),
            }, {
                $$type: "Deposit",
                amount,
                forward_payload: (0, ton_1.beginCell)().storeUint(2, 8).endCell().beginParse()
            });
            return (await getNewTxAfterHash(last, tonLp.address, 0x97ed57f1) // Deposit
            ).hash;
        },
        // -----------------------------------------------------------------
        async stakeLiquidity(signer, pool, amount, ga) {
            if (!signer.address)
                throw new Error(`Signer address not passed: ${signer}`);
            const pa = ton_1.Address.parse(pool); // Pool address
            const tonLp = await ab.getGet("elpTON");
            const isTonLp = tonLp?.equals(pa) ?? false;
            const payload = (0, ton_1.beginCell)().storeUint(2, 8).endCell().beginParse();
            // ----------------- If TON is deposited -----------------
            if (isTonLp) {
                const tonLp = fetchClient().open(tact_TonLP_1.TonLP.fromAddress(pa));
                const last = await getLastTxHashInBase64ForAddress(tonLp.address);
                await tonLp.send(signer, {
                    value: amount + (0, ton_1.toNano)("0.02"),
                }, {
                    $$type: "Deposit",
                    amount,
                    forward_payload: payload
                });
                return (await getNewTxAfterHash(last, tonLp.address, 0x97ed57f1) // Deposit
                );
            }
            // ----------------- If Jetton is deposited -----------------
            const lp = getJettonLp(pool);
            const underlyingWalletAddress = await lp.getGetUnderlyingWallet();
            const underlying_wallet = fetchClient().open(tact_LPWallet_1.LPWallet.fromAddress(underlyingWalletAddress));
            const tokenAddress = (await underlying_wallet.getGetWalletData()).master;
            const token = fetchClient().open(ton_1.JettonMaster.create(tokenAddress));
            const wallet = await token.getWalletAddress(isTonLp ? lp.address : signer.address);
            const wc = fetchClient().open(tact_LPWallet_1.LPWallet.fromAddress(wallet));
            const last = await getLastTxHashInBase64ForAddress(wc.address);
            await wc.send(signer, {
                value: (0, ton_1.toNano)("0.2"),
                ...ga,
            }, {
                $$type: "TokenTransfer",
                amount: amount,
                custom_payload: null,
                sender: lp.address,
                forward_payload: payload,
                forward_ton_amount: (0, ton_1.toNano)("0.1"),
                query_id: 0n,
                response_destination: lp.address,
            });
            return (await getNewTxAfterHash(last, wc.address, 0xf8a7ea5) // op::transfer
            );
        },
        // -----------------------------------------------------------------
        async withdrawFees(signer, pool, ga) {
            if (!signer.address)
                throw new Error(`Signer address not passed: ${signer}`);
            const lp = getJettonLp(pool);
            const last = await getLastTxHashInBase64ForAddress(lp.address);
            await lp.send(signer, { value: (0, ton_1.toNano)("0.06"), ...ga }, { $$type: "WithdrawRewards" });
            return await getNewTxAfterHash(last, lp.address, 0x32d20fa6);
        },
        // -----------------------------------------------------------------
        async withdrawLiquidity(signer, pool, amount, ga) {
            if (!signer.address)
                throw new Error(`Signer address not passed: ${signer}`);
            const lp = getJettonLp(pool);
            const last = await getLastTxHashInBase64ForAddress(lp.address);
            await lp.send(signer, { value: (0, ton_1.toNano)("0.05"), ...ga }, {
                $$type: "Withdraw",
                amount
            });
            return await getNewTxAfterHash(last, lp.address, 0x60591510);
        },
        // -----------------------------------------------------------------
        decimals: async (pool) => {
            if (!pool)
                return 9;
            const lp = getJettonLp(pool);
            const dec = await lp.getDecimals();
            return Number(dec);
        },
        async address(contr) {
            const address = (await ab.getGet(contr)) ??
                raise(`Failed to fetch address for ${contr} in ${addressBook.toString()}`);
            return address.toString();
        },
        // -----------------------------------------------------------------
        isTransferFromLp: () => Promise.resolve(false), // TODO: update it
        async emmetHashFromtx(hash) {
            const b64 = Buffer.from(hash, "hex").toString("base64");
            const txs = await fetchClient().getTransactions(bridge, {
                hash: b64,
                limit: 10,
            });
            for (const tx of txs) {
                for (let i = 0; i < tx.outMessagesCount; i++) {
                    const om = tx.outMessages.get(i);
                    const code = om.body.asSlice().loadUint(32);
                    if (code === 1673830231) {
                        return `0x${om.body.hash().toString("hex")}`;
                    }
                }
            }
            throw new Error("No send installment found");
        },
        id: () => Promise.resolve(chainId),
        async bridge() {
            return await bridge.toString();
        },
        // -----------------------------------------------------------------
        //                          C O M M O N
        // -----------------------------------------------------------------
        async crossChainStrategy(targetChain, fromSymbol, targetSymbol) {
            return await getStrategies(targetChain, fromSymbol, targetSymbol);
        },
        // -----------------------------------------------------------------
        estimateTime: () => Promise.resolve(2n * 60n * 1000n), // 2 minutes
        // -----------------------------------------------------------------
        nativeCoin: () => "TON",
        // -----------------------------------------------------------------
        chainName: () => chainName,
        async txFee(targetChain, fromSymbol, targetSymbol) {
            let _fee = 0n;
            try {
                _fee = await bridgeReader.getEstimateFee(BigInt(targetChain), toKey(fromSymbol), toKey(targetSymbol));
            }
            catch (error) {
                console.warn("Emmet.SDK txFee", error);
            }
            return _fee;
        },
        async token(symbol) {
            const foundToken = await bridgeReader.getGetToken(toKey(symbol));
            return {
                address: foundToken.address.toString(),
                decimals: foundToken.decimals,
                lp: foundToken.emmet_lp.toString(),
                symbol: foundToken.symbol,
                swapPool: foundToken.swap_pool.toString(),
                swapRouter: foundToken.swap_router.toString(),
                priceFeed: foundToken.wallet.toString(),
                token: foundToken.address.toString()
            };
        },
        // -----------------------------------------------------------------
        balance: async (addr) => {
            let bal = 0n;
            try {
                bal = await fetchClient().getBalance(ton_1.Address.parse(addr));
            }
            catch (error) {
                console.warn(error);
                await (0, exports.sleep)(1000);
                return await fetchClient().getBalance(ton_1.Address.parse(addr));
            }
            return bal;
        },
        // -----------------------------------------------------------------
        provider: () => Promise.resolve(fetchClient()),
        // -----------------------------------------------------------------
        validateAddress: (addr) => {
            try {
                ton_1.Address.parse(addr);
                return Promise.resolve(true);
            }
            catch (e) {
                return Promise.resolve(false);
            }
        },
        // -----------------------------------------------------------------
        async protocolFee() {
            return await bridgeReader.getGetProtocolFee();
        },
        // -----------------------------------------------------------------
        async txInfo(hash) {
            const bs64 = Buffer.from(hash.replace("0x", ""), "hex").toString("base64");
            try {
                const tx = await fetchClient().getTransactions(bridge, {
                    limit: 1,
                    hash: bs64,
                });
                return {
                    timestamp: BigInt(tx[0].now),
                    value: tx[0].totalFees.coins,
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
        getTokenAddress: async (symbol) => {
            const address = await ab.getGet(symbol);
            return address ? address.toString() : "";
        },
        // -----------------------------------------------------------------
        tokenBalance: async (token, addr) => {
            let tokenBal = 0n;
            let tokenAddress;
            let userAddress;
            // Ensure token & user addresses are valid
            try {
                tokenAddress = ton_1.Address.parse(token);
            }
            catch {
                console.warn(`Invalid token address: ${token}`);
                return tokenBal;
            }
            try {
                userAddress = ton_1.Address.parse(addr);
            }
            catch {
                console.warn(`Invalid user address: ${addr}`);
                return tokenBal;
            }
            try {
                const jc = getJettonMaster(tokenAddress);
                const jwa = await jc.getWalletAddress(userAddress);
                const jw = getJettonWallet(jwa);
                await (0, exports.sleep)(1000);
                const data = await jw.getWalletData();
                tokenBal = data.balance;
                return tokenBal;
            }
            catch (error) {
                // RPC / Contract related errors
                console.warn(`Emmet.SDK tokenBalance: token: ${token}, user: ${addr}\n`, error);
                await (0, exports.sleep)(1000); // Not to overload the RPC
                // @ts-ignore
                return await this.tokenBalance(token, addr);
            }
        },
        // -----------------------------------------------------------------
        protocolFeeInUSD: () => {
            return 50n;
        },
        // -----------------------------------------------------------------
        //                  B R I D G E   T R A N S F E R
        // -----------------------------------------------------------------
        sendInstallment: async (signer, amt, cid, fromSymbol, targetSymbol, destAddress, fee) => {
            const lastBridgeTxHash = await getLastTxHashInBase64ForAddress(bridge);
            const bc = fetchClient().open(ton_2.EmmetBridge.fromAddress(bridge));
            const strategies = await getStrategies(cid, fromSymbol, targetSymbol);
            const isWrapped = isWrappedToken(strategies.outgoing) || ["NTM"].includes(fromSymbol);
            fee = await bridgeReader.getEstimateFee(cid, toKey(fromSymbol), toKey(targetSymbol));
            const provider = fetchClient();
            const userBalance = await provider.getBalance(signer.address);
            if (userBalance < fee) {
                return {
                    hash: "Insufficient TON for gas",
                    tx: "ERROR",
                };
            }
            console.log("isLKY", fromSymbol === "LKY");
            const gs = {
                value: fee
            };
            try {
                if (toKey(fromSymbol) === nativeTokenId) {
                    await transferTon(bc, signer, destAddress, targetSymbol, cid, amt, gs);
                }
                else if (isWrapped) {
                    await transferJettonToBurner(fromSymbol, targetSymbol, signer, amt, destAddress, cid, gs);
                }
                else {
                    await transferJettonToBridge(fromSymbol, targetSymbol, signer, cid, destAddress, amt, gs);
                }
                let foundTx = false;
                let hash = "";
                let retries = 0;
                while (!foundTx && retries < 10) {
                    await new Promise((e) => setTimeout(e, 2000));
                    const latestTx = (await fetchClient().getTransactions(bridge, { limit: 1 }))[0];
                    if (latestTx.hash().toString("base64") === lastBridgeTxHash) {
                        await new Promise((e) => setTimeout(e, 10000));
                        retries++;
                        continue;
                    }
                    const txs = await fetchClient().getTransactions(bridge, { limit: 2 });
                    for (const tx of txs) {
                        for (let i = 0; i < tx.outMessages.size; i++) {
                            const msg = tx.outMessages.get(i) ?? raise("Unreachable");
                            if (tx.hash().toString("base64") === lastBridgeTxHash) {
                                await new Promise((e) => setTimeout(e, 10000));
                                continue;
                            }
                            if (msg.body.asSlice().loadUint(32) !== 1673830231) {
                                continue;
                            }
                            const otx = (0, ton_2.loadOutgoingTransaction)(msg.body.asSlice());
                            if (destAddress === otx.to.asSlice().loadStringRefTail() &&
                                amt === otx.amount &&
                                otx.from_token.asSlice().loadStringRefTail() === fromSymbol) {
                                foundTx = true;
                                hash = tx.hash().toString("hex");
                            }
                        }
                    }
                    retries++;
                }
                return {
                    hash: hash,
                    tx: hash,
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
    };
}
// -----------------------------------------------------------------
//                        U T I L I T I E S
// -----------------------------------------------------------------
const toKey = (key) => {
    return BigInt(`0x${(0, crypto_1.sha256_sync)(key).toString("hex")}`);
};
// -----------------------------------------------------------------
function raise(msg) {
    throw new Error(msg);
}
// -----------------------------------------------------------------
function assertNotNull(t) {
    if (t === null || t === undefined)
        throw new Error(`Failed to unwrap value: ${t}`);
    return true;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2NoYWlucy90b24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBc0hBLGdDQXE3QkM7QUFVRCxzQkFFQztBQUVELHNDQUlDO0FBN2pDRCxrQ0FXa0I7QUFDbEIsd0JBZ0NXO0FBQ1gsMENBQXdFO0FBQ3hFLGtFQUFrRTtBQUNsRSxnRUFBOEU7QUFDOUUsc0NBQTZDO0FBQzdDLHNDQUF5QztBQUN6Qyx3RUFBZ0U7QUFDaEUsc0VBQThEO0FBQzlELDRFQUFvRTtBQUNwRSx3Q0FBMEM7QUFDMUMsa0VBQThEO0FBRTlELG9FQUFnRTtBQUNoRSxrRkFBNkU7QUFDN0UsNkNBQTZDO0FBRTdDLG1GQUFtRjtBQUNuRixNQUFNLFVBQVUsR0FBVyxJQUFBLFlBQU0sRUFBQyxNQUFNLENBQUMsQ0FBQztBQWtEMUM7Ozs7R0FJRztBQUNJLE1BQU0sS0FBSyxHQUFHLENBQUMsRUFBVSxFQUFFLEVBQUUsQ0FBQyxJQUFJLE9BQU8sQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsVUFBVSxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDO0FBQTlELFFBQUEsS0FBSyxTQUF5RDtBQUVwRSxLQUFLLFVBQVUsVUFBVSxDQUFDLEVBQy9CLElBQUksRUFDSixhQUFhLEVBQ2IsU0FBUyxFQUNULE9BQU8sRUFDUCxVQUFVLEVBQ1YsV0FBVyxFQUNYLGlCQUFpQixFQUNqQixXQUFXLEdBQ0Q7SUFDVix3Q0FBd0M7SUFDeEMsTUFBTSxPQUFPLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUMsSUFBSSxlQUFTLENBQUMsRUFBRSxRQUFRLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQ3BFLE1BQU0sV0FBVyxHQUFHLEdBQWMsRUFBRTtRQUNsQyxNQUFNLGNBQWMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDL0QsT0FBTyxPQUFPLENBQUMsY0FBYyxDQUFDLENBQUM7SUFDakMsQ0FBQyxDQUFDO0lBRUYsTUFBTSxtQkFBbUIsR0FBRyxDQUFDLE9BQWdCLEVBQW9CLEVBQUU7UUFDakUsT0FBTyxXQUFXLEVBQUUsQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUE7SUFDeEMsQ0FBQyxDQUFBO0lBRUQsNkJBQTZCO0lBQzdCLE1BQU0sRUFBRSxHQUFHLFdBQVcsRUFBRSxDQUFDLElBQUksQ0FBQywwQkFBYyxDQUFDLFdBQVcsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDO0lBRXZFLE1BQU0sTUFBTSxHQUFHLE1BQU0sZ0JBQWdCLENBQUMsYUFBYSxDQUFDLENBQUM7SUFDckQsTUFBTSxZQUFZLEdBQUcsV0FBVyxFQUFFLENBQUMsSUFBSSxDQUFDLGlCQUFXLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7SUFFekUsNkJBQTZCO0lBQzdCLHdDQUF3QztJQUN4QyxLQUFLLFVBQVUsZ0JBQWdCLENBQUMsSUFBWTtRQUMxQyxJQUFJLENBQUM7WUFDSCxNQUFNLFdBQVcsR0FBWSxNQUFNLEVBQUUsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDO2dCQUNoRCxLQUFLLENBQUMsdUJBQXVCLElBQUksK0JBQStCLENBQUMsQ0FBQztZQUNwRSxPQUFPLFdBQVcsQ0FBQztRQUNyQixDQUFDO1FBQUMsT0FBTyxLQUFnQyxFQUFFLENBQUM7WUFDMUMsTUFBTSxJQUFJLEtBQUssQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDakMsQ0FBQztJQUNILENBQUM7SUFDRCx3Q0FBd0M7SUFDeEMsU0FBUyxXQUFXLENBQUMsSUFBWTtRQUMvQixJQUFJLENBQUM7WUFDSCxPQUFPLFdBQVcsRUFBRSxDQUFDLElBQUksQ0FDdkIsd0JBQVEsQ0FBQyxXQUFXLENBQUMsYUFBTyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUMxQyxDQUFDO1FBQ0osQ0FBQztRQUFDLE1BQU0sQ0FBQztZQUNQLE1BQU0sSUFBSSxLQUFLLENBQUMsd0JBQXdCLENBQUMsQ0FBQztRQUM1QyxDQUFDO0lBQ0gsQ0FBQztJQUNELHdDQUF3QztJQUN4QyxLQUFLLFVBQVUsaUJBQWlCLENBQUMsUUFBZ0I7UUFDL0MsSUFBSSxDQUFDO1lBQ0gsTUFBTSxXQUFXLEdBQVksTUFBTSxnQkFBZ0IsQ0FDakQsUUFBUSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxNQUFNLFFBQVEsRUFBRSxDQUN2RCxDQUFDO1lBQ0YsT0FBTyxXQUFXLEVBQUUsQ0FBQyxJQUFJLENBQ3ZCLHdCQUFRLENBQUMsV0FBVyxDQUFDLFdBQVcsQ0FBQyxDQUNsQyxDQUFDO1FBQ0osQ0FBQztRQUFDLE9BQU8sS0FBZ0MsRUFBRSxDQUFDO1lBQzFDLE1BQU0sSUFBSSxLQUFLLENBQUMsK0JBQStCLEdBQUcsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ25FLENBQUM7SUFDSCxDQUFDO0lBQ0Qsd0NBQXdDO0lBQ3hDLEtBQUssVUFBVSwrQkFBK0IsQ0FBQyxJQUFhO1FBQzFELE1BQU0sSUFBSSxHQUFHLE1BQU0sV0FBVyxFQUFFLENBQUMsZUFBZSxDQUFDLElBQUksRUFBRSxFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQ3JFLE9BQU8sSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUMzQyxDQUFDO0lBQ0Qsd0NBQXdDO0lBQ3hDLFNBQVMsZUFBZSxDQUFDLE9BQWdCO1FBQ3ZDLE9BQU8sV0FBVyxFQUFFLENBQUMsSUFBSSxDQUN2Qiw0QkFBWSxDQUFDLGlCQUFpQixDQUFDLE9BQU8sQ0FBQyxDQUN4QyxDQUFBO0lBQ0gsQ0FBQztJQUNELHdDQUF3QztJQUN4QyxTQUFTLGVBQWUsQ0FDdEIsYUFBc0I7UUFFdEIsT0FBTyxXQUFXLEVBQUUsQ0FBQyxJQUFJLENBQ3ZCLDRCQUFZLENBQUMsaUJBQWlCLENBQzVCLGFBQWEsQ0FDZCxDQUNGLENBQUM7SUFDSixDQUFDO0lBQ0Qsd0NBQXdDO0lBQ3hDLEtBQUssVUFBVSxhQUFhLENBQUMsV0FBbUIsRUFBRSxVQUFrQixFQUFFLFlBQW9CO1FBRXhGLE1BQU0sUUFBUSxHQUFHLE1BQU0sWUFBWSxDQUFDLGdCQUFnQixDQUNsRCxNQUFNLENBQUMsV0FBVyxDQUFDLEVBQ25CLEtBQUssQ0FBQyxVQUFVLENBQUMsRUFDakIsS0FBSyxDQUFDLFlBQVksQ0FBQyxDQUNwQixDQUFDO1FBRUYsSUFBSSxDQUFDLFFBQVE7WUFBRSxNQUFNLElBQUksS0FBSyxDQUFDLCtCQUErQixDQUFDLENBQUM7UUFDaEUsTUFBTSxRQUFRLEdBQWdCLEVBQUUsQ0FBQztRQUVqQyxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsUUFBUSxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQztZQUM3QyxNQUFNLEtBQUssR0FBRyxRQUFRLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDakQsSUFBSSxLQUFLLEVBQUUsQ0FBQztnQkFDVixNQUFNLFlBQVksR0FBYyxjQUFXLENBQ3pDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FDekIsQ0FBQztnQkFDRixRQUFRLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFBO1lBQzdCLENBQUM7UUFDSCxDQUFDO1FBQ0QsTUFBTSxPQUFPLEdBQWdCLEVBQUUsQ0FBQztRQUNoQyxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsUUFBUSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQztZQUMvQyxNQUFNLEtBQUssR0FBRyxRQUFRLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDbkQsSUFBSSxLQUFLLEVBQUUsQ0FBQztnQkFDVixNQUFNLFlBQVksR0FDaEIsY0FBVyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDO2dCQUN4QyxPQUFPLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO1lBQzdCLENBQUM7UUFDSCxDQUFDO1FBRUQsTUFBTSxRQUFRLEdBQWdCLEVBQUUsQ0FBQztRQUNqQyxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsUUFBUSxDQUFDLFNBQVMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQztZQUNqRCxNQUFNLEtBQUssR0FBRyxRQUFRLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDckQsSUFBSSxLQUFLLEVBQUUsQ0FBQztnQkFDVixNQUFNLFlBQVksR0FDaEIsY0FBVyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDO2dCQUN4QyxRQUFRLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO1lBQzlCLENBQUM7UUFDSCxDQUFDO1FBRUQsT0FBTztZQUNMLE9BQU87WUFDUCxRQUFRO1lBQ1IsUUFBUTtTQUNULENBQUM7SUFDSixDQUFDO0lBQ0Qsd0NBQXdDO0lBQ3hDLEtBQUssVUFBVSxXQUFXLENBQ3hCLE1BQW1DLEVBQ25DLE1BQWMsRUFDZCxFQUFVLEVBQ1YsU0FBaUIsRUFDakIsT0FBZSxFQUNmLE1BQWMsRUFDZCxPQUFtQjtRQUVuQixPQUFPLENBQUMsTUFBTSxNQUFNLENBQUMsSUFBSSxDQUN2QixNQUFNLEVBQ047WUFDRSxLQUFLLEVBQUUsTUFBTSxHQUFHLE9BQU8sQ0FBQyxLQUFLO1NBQzlCLEVBQ0Q7WUFDRSxNQUFNLEVBQUUsV0FBVztZQUNuQixNQUFNLEVBQUUsTUFBTTtZQUNkLFlBQVksRUFBRSxNQUFNLENBQUMsT0FBTyxDQUFDO1lBQzdCLEVBQUUsRUFBRSxJQUFBLGVBQVMsR0FBRSxDQUFDLGtCQUFrQixDQUFDLEVBQUUsQ0FBQyxDQUFDLE9BQU8sRUFBRTtZQUNoRCxVQUFVLEVBQUUsSUFBQSxlQUFTLEdBQUU7aUJBQ3BCLFFBQVEsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLEVBQUUsR0FBRyxDQUFDO2lCQUMzQixrQkFBa0IsQ0FBQyxLQUFLLENBQUM7aUJBQ3pCLE9BQU8sRUFBRTtZQUNaLFFBQVEsRUFBRSxJQUFBLGVBQVMsR0FBRTtpQkFDbEIsUUFBUSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsRUFBRSxHQUFHLENBQUM7aUJBQy9CLGtCQUFrQixDQUFDLFNBQVMsQ0FBQztpQkFDN0IsT0FBTyxFQUFFO1NBQ2IsQ0FDRixDQUErQixDQUFDO0lBQ25DLENBQUM7SUFDRCx3Q0FBd0M7SUFDeEMsTUFBTSxzQkFBc0IsR0FBRyxLQUFLLEVBQ2xDLFNBQWlCLEVBQ2pCLFdBQW1CLEVBQ25CLE1BQWMsRUFDZCxHQUFXLEVBQ1gsV0FBbUIsRUFDbkIsR0FBVyxFQUNYLE9BQW1CLEVBQ0YsRUFBRTtRQUNuQixNQUFNLEdBQUcsR0FBRyxLQUFLLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDN0IsTUFBTSxFQUFFLEdBQUcsTUFBTSxZQUFZLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQy9DLE1BQU0sRUFBRSxHQUFHLFdBQVcsRUFBRSxDQUFDLElBQUksQ0FBQyw4QkFBYSxDQUFDLFdBQVcsQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztRQUNyRSxNQUFNLEdBQUcsR0FBRyxXQUFXLEVBQUUsQ0FBQyxJQUFJLENBQzVCLDJDQUFtQixDQUFDLFdBQVcsQ0FDN0IsTUFBTSxFQUFFLENBQUMsbUJBQW1CLENBQUMsTUFBTSxDQUFDLE9BQVEsQ0FBQyxDQUM5QyxDQUNGLENBQUM7UUFFRiw0Q0FBNEM7UUFFNUMsT0FBTyxDQUFDLE1BQU0sR0FBRyxDQUFDLElBQUksQ0FDcEIsTUFBTSxFQUNOLEVBQUUsS0FBSyxFQUFFLE9BQU8sQ0FBQyxLQUFLLEdBQUcsVUFBVSxHQUFHLEVBQUUsRUFBRSxFQUMxQztZQUNFLE1BQU0sRUFBRSxZQUFZO1lBQ3BCLE1BQU0sRUFBRSxHQUFHO1lBQ1gsY0FBYyxFQUFFLElBQUk7WUFDcEIsUUFBUSxFQUFFLEVBQUU7WUFDWixlQUFlLEVBQUUsSUFBQSxlQUFTLEdBQUU7aUJBQ3pCLFNBQVMsQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLENBQUMsZUFBZTtpQkFDbEMsUUFBUSxDQUNQLElBQUEsZUFBUyxHQUFFO2lCQUNSLFNBQVMsQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLEVBQUUsR0FBRyxDQUFDO2lCQUNoQyxrQkFBa0IsQ0FBQyxTQUFTLENBQUM7aUJBQzdCLE1BQU0sRUFBRSxDQUNaO2lCQUNBLFFBQVEsQ0FBQyxJQUFBLGVBQVMsR0FBRSxDQUFDLGtCQUFrQixDQUFDLFdBQVcsQ0FBQyxDQUFDLE1BQU0sRUFBRSxDQUFDO2lCQUM5RCxRQUFRLENBQ1AsSUFBQSxlQUFTLEdBQUU7aUJBQ1IsU0FBUyxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsRUFBRSxHQUFHLENBQUM7aUJBQ2xDLGtCQUFrQixDQUFDLFdBQVcsQ0FBQztpQkFDL0IsTUFBTSxFQUFFLENBQ1o7aUJBQ0EsT0FBTyxFQUFFO1lBQ1osa0JBQWtCLEVBQUUsT0FBTyxDQUFDLEtBQUssR0FBRyxVQUFVLEdBQUcsRUFBRTtZQUNuRCxvQkFBb0IsRUFBRSxNQUFNO1NBQzdCLENBQ0YsQ0FBK0IsQ0FBQztJQUNuQyxDQUFDLENBQUM7SUFDRix3Q0FBd0M7SUFDeEMsTUFBTSxzQkFBc0IsR0FBRyxLQUFLLEVBQ2xDLFNBQWlCLEVBQ2pCLFdBQW1CLEVBQ25CLE1BQWMsRUFDZCxZQUFvQixFQUNwQixXQUFtQixFQUNuQixHQUFXLEVBQ1gsT0FBbUIsRUFDbkIsRUFBRTtRQUVGLE1BQU0sS0FBSyxHQUFHLE1BQU0sWUFBWSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztRQUMvRCxNQUFNLEVBQUUsR0FBRyxXQUFXLEVBQUUsQ0FBQyxJQUFJLENBQUMsOEJBQWEsQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7UUFDeEUsTUFBTSxhQUFhLEdBQVksTUFBTSxFQUFFLENBQUMsbUJBQW1CLENBQUMsTUFBTSxDQUFDLE9BQVEsQ0FBQyxDQUFDO1FBQzdFLE1BQU0sTUFBTSxHQUFHLG1CQUFtQixDQUFDLGFBQWEsQ0FBQyxDQUFDO1FBRWxELE1BQU0sZUFBZSxHQUFTLElBQUEsZUFBUyxHQUFFO2FBQ3RDLFNBQVMsQ0FBQyxZQUFZLEVBQUUsRUFBRSxDQUFDLENBQUMsZUFBZTthQUMzQyxRQUFRLENBQ1AsSUFBQSxlQUFTLEdBQUU7YUFDUixTQUFTLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxFQUFFLEdBQUcsQ0FBQzthQUNoQyxrQkFBa0IsQ0FBQyxTQUFTLENBQUM7YUFDN0IsTUFBTSxFQUFFLENBQ1o7YUFDQSxRQUFRLENBQ1AsSUFBQSxlQUFTLEdBQUU7YUFDUixrQkFBa0IsQ0FBQyxXQUFXLENBQUM7YUFDL0IsTUFBTSxFQUFFLENBQUM7YUFDYixRQUFRLENBQ1AsSUFBQSxlQUFTLEdBQUU7YUFDUixTQUFTLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxFQUFFLEdBQUcsQ0FBQzthQUNsQyxrQkFBa0IsQ0FBQyxXQUFXLENBQUM7YUFDL0IsTUFBTSxFQUFFLENBQ1o7YUFDQSxPQUFPLEVBQUUsQ0FBQztRQUViLE1BQU0sSUFBSSxHQUFHLElBQUEsZUFBUyxHQUFFO2FBQ3JCLFNBQVMsQ0FBQyxrQkFBRSxDQUFDLFFBQVEsRUFBRSxFQUFFLENBQUM7YUFDMUIsU0FBUyxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUM7YUFDakIsVUFBVSxDQUFDLEdBQUcsQ0FBQzthQUNmLFlBQVksQ0FBQyxNQUFNLENBQUM7YUFDcEIsWUFBWSxDQUFDLE1BQU0sQ0FBQzthQUNwQixhQUFhLENBQUMsSUFBSSxDQUFDO2FBQ25CLFVBQVUsQ0FBQyxPQUFPLENBQUMsS0FBSyxHQUFHLFVBQVUsR0FBRyxFQUFFLENBQUM7YUFDM0MsYUFBYSxDQUFDLGVBQWUsQ0FBQzthQUM5QixPQUFPLEVBQUUsQ0FBQztRQUViLE1BQU0sT0FBTyxHQUFHLFNBQVMsS0FBSyxLQUFLLENBQUM7UUFFcEMsTUFBTSxNQUFNLENBQUMsUUFBUSxDQUNuQixNQUFNLEVBQ047WUFDRSxLQUFLLEVBQUUsT0FBTyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsS0FBSyxHQUFHLFVBQVUsR0FBRyxFQUFFLEdBQUcsSUFBQSxZQUFNLEVBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxLQUFLLEdBQUcsVUFBVSxHQUFHLEVBQUU7WUFDcEcsUUFBUSxFQUFFLGNBQVEsQ0FBQyxrQkFBa0I7WUFDckMsTUFBTSxFQUFFLElBQUk7WUFDWixJQUFJO1NBQ0wsQ0FDRixDQUFBO1FBRUQsT0FBTyxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBRXJDLENBQUMsQ0FBQztJQUNGLHdDQUF3QztJQUN4QyxTQUFTLGNBQWMsQ0FDckIsUUFBcUI7UUFHckIsSUFBSSxTQUFTLEdBQUcsS0FBSyxDQUFDO1FBRXRCLElBQUksQ0FBQztZQUNILEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxRQUFRLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUM7Z0JBRXpDLElBQUksUUFBUSxDQUFDLENBQUMsQ0FBQzt1QkFDVixNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssMEJBQWEsQ0FBQyxJQUFJO29CQUFFLE9BQU8sSUFBSSxDQUFDO1lBQy9ELENBQUM7UUFDSCxDQUFDO1FBQUMsT0FBTyxLQUFLLEVBQUUsQ0FBQztZQUNmLE9BQU8sQ0FBQyxJQUFJLENBQUMsMEJBQTBCLEVBQUUsS0FBSyxDQUFDLENBQUE7UUFDakQsQ0FBQztRQUVELE9BQU8sU0FBUyxDQUFDO0lBQ25CLENBQUM7SUFDRCx3Q0FBd0M7SUFDeEMsS0FBSyxVQUFVLGlCQUFpQixDQUM5QixJQUFZLEVBQ1osSUFBYSxFQUNiLEVBQVU7UUFHVixJQUFJLE9BQU8sR0FBRyxLQUFLLENBQUM7UUFDcEIsSUFBSSxJQUFJLEdBQUcsRUFBRSxDQUFDO1FBQ2QsSUFBSSxPQUFPLEdBQUcsQ0FBQyxDQUFDO1FBRWhCLE9BQU8sQ0FBQyxPQUFPLElBQUksT0FBTyxHQUFHLEVBQUUsRUFBRSxDQUFDO1lBRWhDLE1BQU0sUUFBUSxHQUFHLENBQ2YsTUFBTSxXQUFXLEVBQUUsQ0FBQyxlQUFlLENBQUMsSUFBSSxFQUFFLEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQ3hELENBQUMsQ0FBQyxDQUFDLENBQUM7WUFFTCxJQUFJLFFBQVEsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLEtBQUssSUFBSSxFQUFFLENBQUM7Z0JBQ2hELE1BQU0sSUFBSSxPQUFPLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLFVBQVUsQ0FBQyxDQUFDLEVBQUUsS0FBSyxDQUFDLENBQUMsQ0FBQztnQkFDL0MsT0FBTyxFQUFFLENBQUM7Z0JBQ1YsU0FBUztZQUNYLENBQUM7WUFFRCxNQUFNLEdBQUcsR0FBRyxNQUFNLFdBQVcsRUFBRSxDQUFDLGVBQWUsQ0FBQyxJQUFJLEVBQUUsRUFBRSxLQUFLLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQztZQUVyRSxLQUFLLE1BQU0sRUFBRSxJQUFJLEdBQUcsRUFBRSxDQUFDO2dCQUNyQixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsRUFBRSxDQUFDLFdBQVcsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQztvQkFDN0MsTUFBTSxHQUFHLEdBQUcsRUFBRSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLElBQUksS0FBSyxDQUFDLGFBQWEsQ0FBQyxDQUFDO29CQUMxRCxJQUFJLEdBQUcsQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDO3dCQUMzQyxPQUFPLEdBQUcsSUFBSSxDQUFDO3dCQUNmLElBQUksR0FBRyxFQUFFLENBQUMsSUFBSSxFQUFFLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDO29CQUNuQyxDQUFDO2dCQUNILENBQUM7WUFDSCxDQUFDO1lBRUQsT0FBTyxFQUFFLENBQUM7UUFDWixDQUFDO1FBRUQsT0FBTztZQUNMLElBQUk7WUFDSixFQUFFLEVBQUUsSUFBSTtTQUNULENBQUM7SUFDSixDQUFDO0lBQ0QsTUFBTSxJQUFJLEdBQUcsSUFBSSxtQkFBYSxDQUFDO1FBQzdCLE9BQU8sRUFBRSxVQUFVO0tBQ3BCLENBQUMsQ0FBQztJQUNILHdDQUF3QztJQUN4QyxPQUFPO1FBRUwsb0VBQW9FO1FBQ3BFLDZDQUE2QztRQUM3QyxvRUFBb0U7UUFDcEUsS0FBSyxDQUFDLFVBQVUsQ0FBQyxNQUFNLEVBQUUsVUFBVSxFQUFFLFlBQVksRUFBRSxNQUFNLEVBQUUsU0FBUztZQUVsRSxJQUFJLENBQUMsQ0FBQyw4REFBOEQ7Z0JBRWxFLElBQUksVUFBVSxLQUFLLFlBQVksRUFBRSxDQUFDO29CQUNoQyxNQUFNLElBQUksS0FBSyxDQUFDLHFDQUFxQyxDQUFDLENBQUM7Z0JBQ3pELENBQUM7Z0JBRUQsTUFBTSxVQUFVLEdBQUcsV0FBVyxFQUFFLENBQUMsSUFBSSxDQUFDLElBQUksU0FBSSxDQUFDLElBQUssQ0FBQyxNQUFNLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxDQUFDO2dCQUNoRixNQUFNLFFBQVEsR0FBRyxVQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsQ0FBQztnQkFFL0MsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPO29CQUFFLE1BQU0sSUFBSSxLQUFLLENBQUMsMkJBQTJCLENBQUMsQ0FBQztnQkFFbEUsTUFBTSxFQUFFLEdBQUcsTUFBTSxZQUFZLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO2dCQUM3RCxJQUFJLENBQUMsRUFBRTtvQkFBRSxNQUFNLElBQUksS0FBSyxDQUFDLHNCQUFzQixDQUFDLENBQUM7Z0JBRWpELE1BQU0sRUFBRSxHQUFHLE1BQU0sWUFBWSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQztnQkFDL0QsSUFBSSxDQUFDLEVBQUU7b0JBQUUsTUFBTSxJQUFJLEtBQUssQ0FBQyx3QkFBd0IsQ0FBQyxDQUFDO2dCQUduRCxJQUFJLFVBQVUsS0FBSyxLQUFLLEVBQUUsQ0FBQztvQkFDekIsTUFBTSxVQUFVLENBQUMsbUJBQW1CLENBQUMsTUFBTSxFQUFFO3dCQUMzQyxnQkFBZ0IsRUFBRSxFQUFFLENBQUMsT0FBTzt3QkFDNUIsWUFBWSxFQUFFLENBQUM7d0JBQ2YsV0FBVyxFQUFFLE1BQU07d0JBQ25CLFFBQVE7d0JBQ1IsaUJBQWlCLEVBQUUsTUFBTSxDQUFDLE9BQU87cUJBQ2xDLENBQUMsQ0FBQztvQkFDSCxPQUFPO2dCQUNULENBQUM7Z0JBQ0QsSUFBSSxZQUFZLEtBQUssS0FBSyxFQUFFLENBQUM7b0JBQzNCLE1BQU0sVUFBVSxDQUFDLG1CQUFtQixDQUFDLE1BQU0sRUFBRTt3QkFDM0MsWUFBWSxFQUFFLENBQUM7d0JBQ2YsV0FBVyxFQUFFLE1BQU07d0JBQ25CLFFBQVE7d0JBQ1IsaUJBQWlCLEVBQUUsTUFBTSxDQUFDLE9BQU87d0JBQ2pDLGtCQUFrQixFQUFFLEVBQUUsQ0FBQyxPQUFPO3FCQUMvQixDQUFDLENBQUM7b0JBQ0gsT0FBTztnQkFDVCxDQUFDO2dCQUNELE1BQU0sVUFBVSxDQUFDLHNCQUFzQixDQUFDLE1BQU0sRUFBRTtvQkFDOUMsZ0JBQWdCLEVBQUUsRUFBRSxDQUFDLE9BQU87b0JBQzVCLFlBQVksRUFBRSxDQUFDO29CQUNmLFdBQVcsRUFBRSxNQUFNO29CQUNuQixrQkFBa0IsRUFBRSxFQUFFLENBQUMsT0FBTztvQkFDOUIsaUJBQWlCLEVBQUUsTUFBTSxDQUFDLE9BQU87aUJBQ2xDLENBQUMsQ0FBQztnQkFDSCxPQUFPO1lBRVQsQ0FBQztZQUFDLE9BQU8sS0FBSyxFQUFFLENBQUM7Z0JBQ2YsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUN0QixDQUFDO1FBRUgsQ0FBQztRQUNELG9FQUFvRTtRQUNwRSxLQUFLLENBQUMsbUJBQW1CLENBQUMsVUFBVSxFQUFFLFlBQVksRUFBRSxNQUFNLEVBQUUsUUFBUTtZQUNsRSxNQUFNLEVBQUUsR0FBRyxNQUFNLFlBQVksQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7WUFDN0QsSUFBSSxDQUFDLEVBQUU7Z0JBQUUsTUFBTSxJQUFJLEtBQUssQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDO1lBQ2pELE1BQU0sRUFBRSxHQUFHLE1BQU0sWUFBWSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQztZQUMvRCxJQUFJLENBQUMsRUFBRTtnQkFBRSxNQUFNLElBQUksS0FBSyxDQUFDLHdCQUF3QixDQUFDLENBQUM7WUFDbkQsTUFBTSxVQUFVLEdBQUcsTUFBTSxJQUFJLENBQUMsWUFBWSxDQUFDO2dCQUN6QyxVQUFVLEVBQUUsRUFBRSxDQUFDLE9BQU8sQ0FBQyxRQUFRLEVBQUU7Z0JBQ2pDLFlBQVksRUFBRSxFQUFFLENBQUMsT0FBTyxDQUFDLFFBQVEsRUFBRTtnQkFDbkMsVUFBVSxFQUFFLE1BQU0sQ0FBQyxRQUFRLEVBQUU7Z0JBQzdCLGlCQUFpQixFQUFFLENBQUMsUUFBUSxHQUFHLEtBQUssQ0FBQyxDQUFDLFFBQVEsRUFBRTthQUNqRCxDQUFDLENBQUM7WUFDSCxPQUFPLE1BQU0sQ0FBQyxVQUFVLENBQUMsV0FBVyxDQUFDLENBQUM7UUFDeEMsQ0FBQztRQUlELG9FQUFvRTtRQUNwRSw0Q0FBNEM7UUFDNUMsb0VBQW9FO1FBRXBFLEtBQUssQ0FBQyxTQUFTLENBQUMsUUFBUTtZQUN0QixJQUFJLENBQUM7Z0JBQ0gsTUFBTSxFQUFFLEdBQUcsTUFBTSxpQkFBaUIsQ0FBQyxRQUFRLENBQUMsQ0FBQztnQkFDN0MsTUFBTSxJQUFJLEdBQVksTUFBTSxFQUFFLENBQUMsVUFBVSxFQUFFLENBQUM7Z0JBQzVDLE9BQU8sSUFBSSxDQUFDO1lBQ2QsQ0FBQztZQUFDLE9BQU8sS0FBSyxFQUFFLENBQUM7Z0JBQ2YsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQTtnQkFDbkIsT0FBTztvQkFDTCxRQUFRLEVBQUUsUUFBUTtvQkFDbEIsR0FBRyxFQUFFLEVBQUU7b0JBQ1Asb0JBQW9CLEVBQUUsRUFBRTtvQkFDeEIsUUFBUSxFQUFFLEVBQUU7b0JBQ1osaUJBQWlCLEVBQUUsRUFBRTtvQkFDckIsWUFBWSxFQUFFLEVBQUU7b0JBQ2hCLFlBQVksRUFBRSxFQUFFO29CQUNoQixtQkFBbUIsRUFBRSxFQUFFO29CQUN2QixTQUFTLEVBQUUsRUFBRTtvQkFDYixZQUFZLEVBQUUsRUFBRTtpQkFDTixDQUFDO1lBQ2YsQ0FBQztRQUNILENBQUM7UUFDRCxvRUFBb0U7UUFDcEUsS0FBSyxDQUFDLFdBQVcsQ0FBQyxRQUFRLEVBQUUsTUFBTTtZQUNoQyxJQUFJLENBQUM7Z0JBQ0gsTUFBTSxFQUFFLEdBQUcsTUFBTSxpQkFBaUIsQ0FBQyxRQUFRLENBQUMsQ0FBQztnQkFDN0MsTUFBTSxRQUFRLEdBQWdCLE1BQU0sRUFBRSxDQUFDLGNBQWMsQ0FBQyxhQUFPLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7Z0JBQzdFLE9BQU8sUUFBUSxDQUFDO1lBQ2xCLENBQUM7WUFBQyxNQUFNLENBQUM7Z0JBQ1AsT0FBTztvQkFDTCxRQUFRLEVBQUUsVUFBVTtvQkFDcEIsT0FBTyxFQUFFLEVBQUU7b0JBQ1gsZUFBZSxFQUFFLEVBQUU7b0JBQ25CLE9BQU8sRUFBRSxFQUFFO2lCQUNHLENBQUM7WUFDbkIsQ0FBQztRQUNILENBQUM7UUFDRCxvRUFBb0U7UUFDcEUsS0FBSyxDQUFDLFVBQVUsQ0FBQyxRQUFRLEVBQUUsTUFBTTtZQUMvQixJQUFJLENBQUM7Z0JBQ0gsTUFBTSxFQUFFLEdBQUcsTUFBTSxpQkFBaUIsQ0FBQyxRQUFRLENBQUMsQ0FBQztnQkFDN0MsT0FBTyxNQUFNLEVBQUUsQ0FBQyxVQUFVLENBQUMsYUFBTyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1lBQ3BELENBQUM7WUFBQyxNQUFNLENBQUM7Z0JBQ1AsT0FBTyxFQUFFLENBQUM7WUFDWixDQUFDO1FBQ0gsQ0FBQztRQUNELG9FQUFvRTtRQUNwRSxLQUFLLENBQUMsVUFBVSxDQUFDLFFBQVEsRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLE9BQU87WUFDaEQsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPO2dCQUNqQixNQUFNLElBQUksS0FBSyxDQUFDLDhCQUE4QixNQUFNLEVBQUUsQ0FBQyxDQUFDO1lBRTFELElBQUksQ0FBQztnQkFDSCxNQUFNLEtBQUssR0FBVyxJQUFBLFlBQU0sRUFBQyxNQUFNLENBQUMsQ0FBQztnQkFDckMsTUFBTSxhQUFhLEdBQUcsSUFBQSxZQUFNLEVBQUMsT0FBTyxDQUFDLENBQUM7Z0JBRXRDLE1BQU0sRUFBRSxHQUFHLE1BQU0saUJBQWlCLENBQUMsUUFBUSxDQUFDLENBQUM7Z0JBQzdDLE1BQU0saUJBQWlCLEdBQVksTUFBTSxFQUFFLENBQUMsYUFBYSxFQUFFLENBQUM7Z0JBRTVELE1BQU0sWUFBWSxHQUFpQyxlQUFlLENBQUMsaUJBQWlCLENBQUMsQ0FBQztnQkFFdEYsTUFBTSxnQkFBZ0IsR0FBaUMsZUFBZSxDQUNwRSxNQUFNLFlBQVksQ0FBQyxnQkFBZ0IsQ0FBQyxNQUFNLENBQUMsT0FBUyxDQUFDLENBQ3RELENBQUM7Z0JBRUYsTUFBTSxJQUFJLEdBQUcsTUFBTSwrQkFBK0IsQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLENBQUMsQ0FBQztnQkFFN0UsTUFBTSxRQUFRLEdBQVcsT0FBTztvQkFDOUIsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxLQUFLO29CQUNmLENBQUMsQ0FBQyxFQUFFLENBQUM7Z0JBRVAsTUFBTSxnQkFBZ0IsQ0FBQyxZQUFZLENBQ2pDLE1BQU0sRUFDTixLQUFLLEdBQUcsUUFBUSxFQUNoQixNQUFNLEVBQ04sRUFBRSxDQUFDLE9BQU8sRUFDVixNQUFNLENBQUMsT0FBUyxFQUNoQixJQUFBLGVBQVMsR0FBRSxDQUFDLGtCQUFrQixDQUFDLFNBQVMsQ0FBQyxDQUFDLE9BQU8sRUFBRSxFQUNuRCxhQUFhLEVBQ2IsSUFBSSxDQUNMLENBQUM7Z0JBRUYsT0FBTyxDQUFDLE1BQU0saUJBQWlCLENBQzdCLElBQUksRUFDSixnQkFBZ0IsQ0FBQyxPQUFPLEVBQ3hCLFNBQVMsQ0FBQyxDQUFDLGVBQWU7aUJBQzNCLENBQUMsSUFBYyxDQUFDO1lBRW5CLENBQUM7WUFBQyxPQUFPLEtBQWdDLEVBQUUsQ0FBQztnQkFDMUMsTUFBTSxJQUFJLEtBQUssQ0FBQywwQkFBMEIsS0FBSyxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUE7WUFDNUQsQ0FBQztRQUNILENBQUM7UUFDRCxvRUFBb0U7UUFDcEUsS0FBSyxDQUFDLFNBQVMsQ0FBQyxNQUFNLEVBQUUsTUFBTTtZQUM1QixJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU87Z0JBQ2pCLE1BQU0sSUFBSSxLQUFLLENBQUMsOEJBQThCLE1BQU0sRUFBRSxDQUFDLENBQUM7WUFFMUQsTUFBTSxZQUFZLEdBQVksTUFBTSxFQUFFLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBWSxDQUFDO1lBRW5FLE1BQU0sS0FBSyxHQUFHLFdBQVcsRUFBRSxDQUFDLElBQUksQ0FBQyxrQkFBSyxDQUFDLFdBQVcsQ0FBQyxZQUFhLENBQUMsQ0FBQyxDQUFDO1lBRW5FLE1BQU0sSUFBSSxHQUFHLE1BQU0sK0JBQStCLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBRWxFLE1BQU0sS0FBSyxDQUFDLElBQUksQ0FDZCxNQUFNLEVBQ047Z0JBQ0UsS0FBSyxFQUFFLE1BQU0sR0FBRyxJQUFBLFlBQU0sRUFBQyxNQUFNLENBQUM7YUFDL0IsRUFDRDtnQkFDRSxNQUFNLEVBQUUsU0FBUztnQkFDakIsTUFBTTtnQkFDTixlQUFlLEVBQUUsSUFBQSxlQUFTLEdBQUUsQ0FBQyxTQUFTLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLE9BQU8sRUFBRSxDQUFDLFVBQVUsRUFBRTthQUNwRSxDQUNGLENBQUM7WUFFRixPQUFPLENBQUMsTUFBTSxpQkFBaUIsQ0FDN0IsSUFBSSxFQUNKLEtBQUssQ0FBQyxPQUFPLEVBQ2IsVUFBVSxDQUFDLENBQUMsVUFBVTthQUN2QixDQUFDLElBQWMsQ0FBQztRQUVuQixDQUFDO1FBQ0Qsb0VBQW9FO1FBQ3BFLEtBQUssQ0FBQyxjQUFjLENBQUMsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsRUFBRTtZQUMzQyxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU87Z0JBQ2pCLE1BQU0sSUFBSSxLQUFLLENBQUMsOEJBQThCLE1BQU0sRUFBRSxDQUFDLENBQUM7WUFFMUQsTUFBTSxFQUFFLEdBQUcsYUFBTyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLGVBQWU7WUFFL0MsTUFBTSxLQUFLLEdBQUcsTUFBTSxFQUFFLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQ3hDLE1BQU0sT0FBTyxHQUFHLEtBQUssRUFBRSxNQUFNLENBQUMsRUFBRSxDQUFDLElBQUksS0FBSyxDQUFDO1lBRTNDLE1BQU0sT0FBTyxHQUFHLElBQUEsZUFBUyxHQUFFLENBQUMsU0FBUyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxVQUFVLEVBQUUsQ0FBQztZQUVuRSwwREFBMEQ7WUFDMUQsSUFBSSxPQUFPLEVBQUUsQ0FBQztnQkFDWixNQUFNLEtBQUssR0FBRyxXQUFXLEVBQUUsQ0FBQyxJQUFJLENBQUMsa0JBQUssQ0FBQyxXQUFXLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztnQkFDeEQsTUFBTSxJQUFJLEdBQUcsTUFBTSwrQkFBK0IsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUM7Z0JBQ2xFLE1BQU0sS0FBSyxDQUFDLElBQUksQ0FDZCxNQUFNLEVBQ047b0JBQ0UsS0FBSyxFQUFFLE1BQU0sR0FBRyxJQUFBLFlBQU0sRUFBQyxNQUFNLENBQUM7aUJBQy9CLEVBQ0Q7b0JBQ0UsTUFBTSxFQUFFLFNBQVM7b0JBQ2pCLE1BQU07b0JBQ04sZUFBZSxFQUFFLE9BQU87aUJBQ3pCLENBQ0YsQ0FBQztnQkFDRixPQUFPLENBQUMsTUFBTSxpQkFBaUIsQ0FDN0IsSUFBSSxFQUNKLEtBQUssQ0FBQyxPQUFPLEVBQ2IsVUFBVSxDQUFDLENBQUMsVUFBVTtpQkFDdkIsQ0FBQztZQUNKLENBQUM7WUFFRCw2REFBNkQ7WUFDN0QsTUFBTSxFQUFFLEdBQUcsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBRTdCLE1BQU0sdUJBQXVCLEdBQUcsTUFBTSxFQUFFLENBQUMsc0JBQXNCLEVBQUUsQ0FBQztZQUNsRSxNQUFNLGlCQUFpQixHQUFHLFdBQVcsRUFBRSxDQUFDLElBQUksQ0FBQyx3QkFBUSxDQUFDLFdBQVcsQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDLENBQUM7WUFFNUYsTUFBTSxZQUFZLEdBQUcsQ0FBQyxNQUFNLGlCQUFpQixDQUFDLGdCQUFnQixFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUM7WUFDekUsTUFBTSxLQUFLLEdBQUcsV0FBVyxFQUFFLENBQUMsSUFBSSxDQUFDLGtCQUFZLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUM7WUFFcEUsTUFBTSxNQUFNLEdBQUcsTUFBTSxLQUFLLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUM7WUFFbkYsTUFBTSxFQUFFLEdBQUcsV0FBVyxFQUFFLENBQUMsSUFBSSxDQUFDLHdCQUFRLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7WUFDNUQsTUFBTSxJQUFJLEdBQUcsTUFBTSwrQkFBK0IsQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDLENBQUM7WUFFL0QsTUFBTSxFQUFFLENBQUMsSUFBSSxDQUNYLE1BQU0sRUFDTjtnQkFDRSxLQUFLLEVBQUUsSUFBQSxZQUFNLEVBQUMsS0FBSyxDQUFDO2dCQUNwQixHQUFHLEVBQUU7YUFDTixFQUNEO2dCQUNFLE1BQU0sRUFBRSxlQUFlO2dCQUN2QixNQUFNLEVBQUUsTUFBTTtnQkFDZCxjQUFjLEVBQUUsSUFBSTtnQkFDcEIsTUFBTSxFQUFFLEVBQUUsQ0FBQyxPQUFPO2dCQUNsQixlQUFlLEVBQUUsT0FBTztnQkFDeEIsa0JBQWtCLEVBQUUsSUFBQSxZQUFNLEVBQUMsS0FBSyxDQUFDO2dCQUNqQyxRQUFRLEVBQUUsRUFBRTtnQkFDWixvQkFBb0IsRUFBRSxFQUFFLENBQUMsT0FBTzthQUNqQyxDQUNGLENBQUM7WUFDRixPQUFPLENBQUMsTUFBTSxpQkFBaUIsQ0FDN0IsSUFBSSxFQUNKLEVBQUUsQ0FBQyxPQUFPLEVBQ1YsU0FBUyxDQUFDLENBQUMsZUFBZTthQUMzQixDQUFDO1FBQ0osQ0FBQztRQUNELG9FQUFvRTtRQUNwRSxLQUFLLENBQUMsWUFBWSxDQUFDLE1BQU0sRUFBRSxJQUFJLEVBQUUsRUFBRTtZQUVqQyxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU87Z0JBQ2pCLE1BQU0sSUFBSSxLQUFLLENBQUMsOEJBQThCLE1BQU0sRUFBRSxDQUFDLENBQUM7WUFFMUQsTUFBTSxFQUFFLEdBQUcsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQzdCLE1BQU0sSUFBSSxHQUFHLE1BQU0sK0JBQStCLENBQUMsRUFBRSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBRS9ELE1BQU0sRUFBRSxDQUFDLElBQUksQ0FDWCxNQUFNLEVBQ04sRUFBRSxLQUFLLEVBQUUsSUFBQSxZQUFNLEVBQUMsTUFBTSxDQUFDLEVBQUUsR0FBRyxFQUFFLEVBQUUsRUFDaEMsRUFBRSxNQUFNLEVBQUUsaUJBQWlCLEVBQUUsQ0FDOUIsQ0FBQztZQUVGLE9BQU8sTUFBTSxpQkFBaUIsQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLE9BQU8sRUFBRSxVQUFVLENBQUMsQ0FBQztRQUMvRCxDQUFDO1FBQ0Qsb0VBQW9FO1FBQ3BFLEtBQUssQ0FBQyxpQkFBaUIsQ0FBQyxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxFQUFFO1lBRTlDLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTztnQkFDakIsTUFBTSxJQUFJLEtBQUssQ0FBQyw4QkFBOEIsTUFBTSxFQUFFLENBQUMsQ0FBQztZQUUxRCxNQUFNLEVBQUUsR0FBRyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDN0IsTUFBTSxJQUFJLEdBQUcsTUFBTSwrQkFBK0IsQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDLENBQUM7WUFFL0QsTUFBTSxFQUFFLENBQUMsSUFBSSxDQUNYLE1BQU0sRUFDTixFQUFFLEtBQUssRUFBRSxJQUFBLFlBQU0sRUFBQyxNQUFNLENBQUMsRUFBRSxHQUFHLEVBQUUsRUFBRSxFQUNoQztnQkFDRSxNQUFNLEVBQUUsVUFBVTtnQkFDbEIsTUFBTTthQUNQLENBQ0YsQ0FBQztZQUVGLE9BQU8sTUFBTSxpQkFBaUIsQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLE9BQU8sRUFBRSxVQUFVLENBQUMsQ0FBQztRQUMvRCxDQUFDO1FBQ0Qsb0VBQW9FO1FBQ3BFLFFBQVEsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLEVBQUU7WUFDdkIsSUFBSSxDQUFDLElBQUk7Z0JBQUUsT0FBTyxDQUFDLENBQUM7WUFDcEIsTUFBTSxFQUFFLEdBQUcsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQzdCLE1BQU0sR0FBRyxHQUFHLE1BQU0sRUFBRSxDQUFDLFdBQVcsRUFBRSxDQUFDO1lBQ25DLE9BQU8sTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ3JCLENBQUM7UUFDRCxLQUFLLENBQUMsT0FBTyxDQUFDLEtBQUs7WUFDakIsTUFBTSxPQUFPLEdBQ1gsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBQ3hCLEtBQUssQ0FDSCwrQkFBK0IsS0FBSyxPQUFPLFdBQVcsQ0FBQyxRQUFRLEVBQUUsRUFBRSxDQUNwRSxDQUFDO1lBQ0osT0FBTyxPQUFPLENBQUMsUUFBUSxFQUFFLENBQUM7UUFDNUIsQ0FBQztRQUNELG9FQUFvRTtRQUNwRSxnQkFBZ0IsRUFBRSxHQUFHLEVBQUUsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxFQUFFLGtCQUFrQjtRQUNsRSxLQUFLLENBQUMsZUFBZSxDQUFDLElBQUk7WUFDeEIsTUFBTSxHQUFHLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsS0FBSyxDQUFDLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQ3hELE1BQU0sR0FBRyxHQUFHLE1BQU0sV0FBVyxFQUFFLENBQUMsZUFBZSxDQUFDLE1BQU0sRUFBRTtnQkFDdEQsSUFBSSxFQUFFLEdBQUc7Z0JBQ1QsS0FBSyxFQUFFLEVBQUU7YUFDVixDQUFDLENBQUM7WUFDSCxLQUFLLE1BQU0sRUFBRSxJQUFJLEdBQUcsRUFBRSxDQUFDO2dCQUNyQixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsRUFBRSxDQUFDLGdCQUFnQixFQUFFLENBQUMsRUFBRSxFQUFFLENBQUM7b0JBQzdDLE1BQU0sRUFBRSxHQUFHLEVBQUUsQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBRSxDQUFDO29CQUNsQyxNQUFNLElBQUksR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsQ0FBQztvQkFDNUMsSUFBSSxJQUFJLEtBQUssVUFBVSxFQUFFLENBQUM7d0JBQ3hCLE9BQU8sS0FBSyxFQUFFLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDO29CQUMvQyxDQUFDO2dCQUNILENBQUM7WUFDSCxDQUFDO1lBQ0QsTUFBTSxJQUFJLEtBQUssQ0FBQywyQkFBMkIsQ0FBQyxDQUFDO1FBQy9DLENBQUM7UUFDRCxFQUFFLEVBQUUsR0FBRyxFQUFFLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUM7UUFDbEMsS0FBSyxDQUFDLE1BQU07WUFDVixPQUFPLE1BQU0sTUFBTSxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBQ2pDLENBQUM7UUFJRCxvRUFBb0U7UUFDcEUsdUNBQXVDO1FBQ3ZDLG9FQUFvRTtRQUNwRSxLQUFLLENBQUMsa0JBQWtCLENBQUMsV0FBVyxFQUFFLFVBQVUsRUFBRSxZQUFZO1lBRTVELE9BQU8sTUFBTSxhQUFhLENBQUMsV0FBVyxFQUFFLFVBQVUsRUFBRSxZQUFZLENBQUMsQ0FBQztRQUNwRSxDQUFDO1FBQ0Qsb0VBQW9FO1FBQ3BFLFlBQVksRUFBRSxHQUFHLEVBQUUsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLEVBQUUsR0FBRyxHQUFHLEdBQUcsS0FBSyxDQUFDLEVBQUUsWUFBWTtRQUNuRSxvRUFBb0U7UUFDcEUsVUFBVSxFQUFFLEdBQUcsRUFBRSxDQUFDLEtBQUs7UUFDdkIsb0VBQW9FO1FBQ3BFLFNBQVMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxTQUFTO1FBQzFCLEtBQUssQ0FBQyxLQUFLLENBQUMsV0FBVyxFQUFFLFVBQVUsRUFBRSxZQUFZO1lBQy9DLElBQUksSUFBSSxHQUFXLEVBQUUsQ0FBQztZQUN0QixJQUFJLENBQUM7Z0JBQ0gsSUFBSSxHQUFHLE1BQU0sWUFBWSxDQUFDLGNBQWMsQ0FDdEMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxFQUNuQixLQUFLLENBQUMsVUFBVSxDQUFDLEVBQ2pCLEtBQUssQ0FBQyxZQUFZLENBQUMsQ0FDcEIsQ0FBQztZQUNKLENBQUM7WUFBQyxPQUFPLEtBQUssRUFBRSxDQUFDO2dCQUNmLE9BQU8sQ0FBQyxJQUFJLENBQUMsaUJBQWlCLEVBQUUsS0FBSyxDQUFDLENBQUE7WUFDeEMsQ0FBQztZQUNELE9BQU8sSUFBSSxDQUFDO1FBQ2QsQ0FBQztRQUNELEtBQUssQ0FBQyxLQUFLLENBQUMsTUFBTTtZQUNoQixNQUFNLFVBQVUsR0FBRyxNQUFNLFlBQVksQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7WUFFakUsT0FBTztnQkFDTCxPQUFPLEVBQUUsVUFBVSxDQUFDLE9BQU8sQ0FBQyxRQUFRLEVBQUU7Z0JBQ3RDLFFBQVEsRUFBRSxVQUFVLENBQUMsUUFBUTtnQkFDN0IsRUFBRSxFQUFFLFVBQVUsQ0FBQyxRQUFRLENBQUMsUUFBUSxFQUFFO2dCQUNsQyxNQUFNLEVBQUUsVUFBVSxDQUFDLE1BQU07Z0JBQ3pCLFFBQVEsRUFBRSxVQUFVLENBQUMsU0FBUyxDQUFDLFFBQVEsRUFBRTtnQkFDekMsVUFBVSxFQUFFLFVBQVUsQ0FBQyxXQUFXLENBQUMsUUFBUSxFQUFFO2dCQUM3QyxTQUFTLEVBQUUsVUFBVSxDQUFDLE1BQU0sQ0FBQyxRQUFRLEVBQUU7Z0JBQ3ZDLEtBQUssRUFBRSxVQUFVLENBQUMsT0FBTyxDQUFDLFFBQVEsRUFBRTthQUNyQyxDQUFDO1FBQ0osQ0FBQztRQUNELG9FQUFvRTtRQUNwRSxPQUFPLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxFQUFFO1lBRXRCLElBQUksR0FBRyxHQUFXLEVBQUUsQ0FBQztZQUVyQixJQUFJLENBQUM7Z0JBQ0gsR0FBRyxHQUFHLE1BQU0sV0FBVyxFQUFFLENBQUMsVUFBVSxDQUFDLGFBQU8sQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztZQUM1RCxDQUFDO1lBQUMsT0FBTyxLQUFLLEVBQUUsQ0FBQztnQkFDZixPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFBO2dCQUNuQixNQUFNLElBQUEsYUFBSyxFQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNsQixPQUFPLE1BQU0sV0FBVyxFQUFFLENBQUMsVUFBVSxDQUFDLGFBQU8sQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztZQUM3RCxDQUFDO1lBRUQsT0FBTyxHQUFHLENBQUM7UUFFYixDQUFDO1FBQ0Qsb0VBQW9FO1FBQ3BFLFFBQVEsRUFBRSxHQUFHLEVBQUUsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQzlDLG9FQUFvRTtRQUNwRSxlQUFlLEVBQUUsQ0FBQyxJQUFJLEVBQUUsRUFBRTtZQUN4QixJQUFJLENBQUM7Z0JBQ0gsYUFBTyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDcEIsT0FBTyxPQUFPLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQy9CLENBQUM7WUFBQyxPQUFPLENBQUMsRUFBRSxDQUFDO2dCQUNYLE9BQU8sT0FBTyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUNoQyxDQUFDO1FBQ0gsQ0FBQztRQUNELG9FQUFvRTtRQUNwRSxLQUFLLENBQUMsV0FBVztZQUNmLE9BQU8sTUFBTSxZQUFZLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztRQUNoRCxDQUFDO1FBQ0Qsb0VBQW9FO1FBQ3BFLEtBQUssQ0FBQyxNQUFNLENBQUMsSUFBSTtZQUNmLE1BQU0sSUFBSSxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLEVBQUUsS0FBSyxDQUFDLENBQUMsUUFBUSxDQUM5RCxRQUFRLENBQ1QsQ0FBQztZQUNGLElBQUksQ0FBQztnQkFDSCxNQUFNLEVBQUUsR0FBRyxNQUFNLFdBQVcsRUFBRSxDQUFDLGVBQWUsQ0FBQyxNQUFNLEVBQUU7b0JBQ3JELEtBQUssRUFBRSxDQUFDO29CQUNSLElBQUksRUFBRSxJQUFJO2lCQUNYLENBQUMsQ0FBQztnQkFFSCxPQUFPO29CQUNMLFNBQVMsRUFBRSxNQUFNLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQztvQkFDNUIsS0FBSyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsS0FBSztpQkFDN0IsQ0FBQztZQUNKLENBQUM7WUFBQyxPQUFPLENBQUMsRUFBRSxDQUFDO2dCQUNYLE9BQU87b0JBQ0wsU0FBUyxFQUFFLEVBQUU7b0JBQ2IsS0FBSyxFQUFFLEVBQUU7aUJBQ1YsQ0FBQztZQUNKLENBQUM7UUFDSCxDQUFDO1FBQ0Qsb0VBQW9FO1FBQ3BFLGVBQWUsRUFBRSxLQUFLLEVBQUUsTUFBYyxFQUFtQixFQUFFO1lBQ3pELE1BQU0sT0FBTyxHQUFtQixNQUFNLEVBQUUsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDeEQsT0FBTyxPQUFPLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO1FBQzNDLENBQUM7UUFDRCxvRUFBb0U7UUFDcEUsWUFBWSxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLEVBQUU7WUFFbEMsSUFBSSxRQUFRLEdBQVcsRUFBRSxDQUFDO1lBQzFCLElBQUksWUFBcUIsQ0FBQztZQUMxQixJQUFJLFdBQW9CLENBQUM7WUFFekIsMENBQTBDO1lBQzFDLElBQUksQ0FBQztnQkFDSCxZQUFZLEdBQUcsYUFBTyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUN0QyxDQUFDO1lBQUMsTUFBTSxDQUFDO2dCQUNQLE9BQU8sQ0FBQyxJQUFJLENBQUMsMEJBQTBCLEtBQUssRUFBRSxDQUFDLENBQUM7Z0JBQ2hELE9BQU8sUUFBUSxDQUFDO1lBQ2xCLENBQUM7WUFFRCxJQUFJLENBQUM7Z0JBQ0gsV0FBVyxHQUFHLGFBQU8sQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDcEMsQ0FBQztZQUFDLE1BQU0sQ0FBQztnQkFDUCxPQUFPLENBQUMsSUFBSSxDQUFDLHlCQUF5QixJQUFJLEVBQUUsQ0FBQyxDQUFDO2dCQUM5QyxPQUFPLFFBQVEsQ0FBQztZQUNsQixDQUFDO1lBRUQsSUFBSSxDQUFDO2dCQUNILE1BQU0sRUFBRSxHQUFHLGVBQWUsQ0FBQyxZQUFhLENBQUMsQ0FBQztnQkFDMUMsTUFBTSxHQUFHLEdBQUcsTUFBTSxFQUFFLENBQUMsZ0JBQWdCLENBQUMsV0FBWSxDQUFDLENBQUM7Z0JBQ3BELE1BQU0sRUFBRSxHQUFHLGVBQWUsQ0FBQyxHQUFHLENBQUMsQ0FBQztnQkFDaEMsTUFBTSxJQUFBLGFBQUssRUFBQyxJQUFJLENBQUMsQ0FBQztnQkFDbEIsTUFBTSxJQUFJLEdBQUcsTUFBTSxFQUFFLENBQUMsYUFBYSxFQUFFLENBQUM7Z0JBQ3RDLFFBQVEsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDO2dCQUN4QixPQUFPLFFBQVEsQ0FBQztZQUNsQixDQUFDO1lBQUMsT0FBTyxLQUFLLEVBQUUsQ0FBQztnQkFDZixnQ0FBZ0M7Z0JBQ2hDLE9BQU8sQ0FBQyxJQUFJLENBQUMsa0NBQWtDLEtBQUssV0FBVyxJQUFJLElBQUksRUFBRSxLQUFLLENBQUMsQ0FBQztnQkFDaEYsTUFBTSxJQUFBLGFBQUssRUFBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLDBCQUEwQjtnQkFDN0MsYUFBYTtnQkFDYixPQUFPLE1BQU0sSUFBSSxDQUFDLFlBQVksQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLENBQUM7WUFDOUMsQ0FBQztRQUVILENBQUM7UUFDRCxvRUFBb0U7UUFDcEUsZ0JBQWdCLEVBQUUsR0FBRyxFQUFFO1lBQ3JCLE9BQU8sR0FBRyxDQUFDO1FBQ2IsQ0FBQztRQUNELG9FQUFvRTtRQUNwRSxpREFBaUQ7UUFDakQsb0VBQW9FO1FBQ3BFLGVBQWUsRUFBRSxLQUFLLEVBQ3BCLE1BQU0sRUFDTixHQUFHLEVBQ0gsR0FBRyxFQUNILFVBQVUsRUFDVixZQUFZLEVBQ1osV0FBVyxFQUNYLEdBQUcsRUFDSCxFQUFFO1lBQ0YsTUFBTSxnQkFBZ0IsR0FBRyxNQUFNLCtCQUErQixDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQ3ZFLE1BQU0sRUFBRSxHQUFHLFdBQVcsRUFBRSxDQUFDLElBQUksQ0FBQyxpQkFBVyxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1lBRS9ELE1BQU0sVUFBVSxHQUFHLE1BQU0sYUFBYSxDQUFDLEdBQUcsRUFBRSxVQUFVLEVBQUUsWUFBWSxDQUFDLENBQUM7WUFDdEUsTUFBTSxTQUFTLEdBQVksY0FBYyxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsSUFBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsQ0FBQztZQUVoRyxHQUFHLEdBQUcsTUFBTSxZQUFZLENBQUMsY0FBYyxDQUFDLEdBQUcsRUFBRSxLQUFLLENBQUMsVUFBVSxDQUFDLEVBQUUsS0FBSyxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUM7WUFFckYsTUFBTSxRQUFRLEdBQUcsV0FBVyxFQUFFLENBQUM7WUFDL0IsTUFBTSxXQUFXLEdBQUcsTUFBTSxRQUFRLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxPQUFRLENBQUMsQ0FBQztZQUUvRCxJQUFJLFdBQVcsR0FBRyxHQUFHLEVBQUUsQ0FBQztnQkFDdEIsT0FBTztvQkFDTCxJQUFJLEVBQUUsMEJBQTBCO29CQUNoQyxFQUFFLEVBQUUsT0FBTztpQkFDWixDQUFDO1lBQ0osQ0FBQztZQUVELE9BQU8sQ0FBQyxHQUFHLENBQUMsT0FBTyxFQUFFLFVBQVUsS0FBSyxLQUFLLENBQUMsQ0FBQTtZQUUxQyxNQUFNLEVBQUUsR0FBRztnQkFDVCxLQUFLLEVBQUUsR0FBRzthQUNYLENBQUM7WUFFRixJQUFJLENBQUM7Z0JBQ0gsSUFBSSxLQUFLLENBQUMsVUFBVSxDQUFDLEtBQUssYUFBYSxFQUFFLENBQUM7b0JBQ3hDLE1BQU0sV0FBVyxDQUFDLEVBQUUsRUFBRSxNQUFNLEVBQUUsV0FBVyxFQUFFLFlBQVksRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEVBQUUsQ0FBQyxDQUFDO2dCQUN6RSxDQUFDO3FCQUFNLElBQUksU0FBUyxFQUFFLENBQUM7b0JBQ3JCLE1BQU0sc0JBQXNCLENBQzFCLFVBQVUsRUFDVixZQUFZLEVBQ1osTUFBTSxFQUNOLEdBQUcsRUFDSCxXQUFXLEVBQ1gsR0FBRyxFQUNILEVBQUUsQ0FDSCxDQUFDO2dCQUNKLENBQUM7cUJBQU0sQ0FBQztvQkFDTixNQUFNLHNCQUFzQixDQUMxQixVQUFVLEVBQ1YsWUFBWSxFQUNaLE1BQU0sRUFDTixHQUFHLEVBQ0gsV0FBVyxFQUNYLEdBQUcsRUFDSCxFQUFFLENBQ0gsQ0FBQztnQkFDSixDQUFDO2dCQUVELElBQUksT0FBTyxHQUFHLEtBQUssQ0FBQztnQkFDcEIsSUFBSSxJQUFJLEdBQUcsRUFBRSxDQUFDO2dCQUNkLElBQUksT0FBTyxHQUFHLENBQUMsQ0FBQztnQkFDaEIsT0FBTyxDQUFDLE9BQU8sSUFBSSxPQUFPLEdBQUcsRUFBRSxFQUFFLENBQUM7b0JBQ2hDLE1BQU0sSUFBSSxPQUFPLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLFVBQVUsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQztvQkFDOUMsTUFBTSxRQUFRLEdBQUcsQ0FDZixNQUFNLFdBQVcsRUFBRSxDQUFDLGVBQWUsQ0FBQyxNQUFNLEVBQUUsRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FDMUQsQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDTCxJQUFJLFFBQVEsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLEtBQUssZ0JBQWdCLEVBQUUsQ0FBQzt3QkFDNUQsTUFBTSxJQUFJLE9BQU8sQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsVUFBVSxDQUFDLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQyxDQUFDO3dCQUMvQyxPQUFPLEVBQUUsQ0FBQzt3QkFDVixTQUFTO29CQUNYLENBQUM7b0JBQ0QsTUFBTSxHQUFHLEdBQUcsTUFBTSxXQUFXLEVBQUUsQ0FBQyxlQUFlLENBQUMsTUFBTSxFQUFFLEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7b0JBQ3RFLEtBQUssTUFBTSxFQUFFLElBQUksR0FBRyxFQUFFLENBQUM7d0JBQ3JCLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxFQUFFLENBQUMsV0FBVyxDQUFDLElBQUksRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDOzRCQUM3QyxNQUFNLEdBQUcsR0FBRyxFQUFFLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsSUFBSSxLQUFLLENBQUMsYUFBYSxDQUFDLENBQUM7NEJBQzFELElBQUksRUFBRSxDQUFDLElBQUksRUFBRSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsS0FBSyxnQkFBZ0IsRUFBRSxDQUFDO2dDQUN0RCxNQUFNLElBQUksT0FBTyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxVQUFVLENBQUMsQ0FBQyxFQUFFLEtBQUssQ0FBQyxDQUFDLENBQUM7Z0NBQy9DLFNBQVM7NEJBQ1gsQ0FBQzs0QkFDRCxJQUFJLEdBQUcsQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxLQUFLLFVBQVUsRUFBRSxDQUFDO2dDQUNuRCxTQUFTOzRCQUNYLENBQUM7NEJBQ0QsTUFBTSxHQUFHLEdBQUcsSUFBQSw2QkFBdUIsRUFBQyxHQUFHLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUM7NEJBQ3hELElBQ0UsV0FBVyxLQUFLLEdBQUcsQ0FBQyxFQUFFLENBQUMsT0FBTyxFQUFFLENBQUMsaUJBQWlCLEVBQUU7Z0NBQ3BELEdBQUcsS0FBSyxHQUFHLENBQUMsTUFBTTtnQ0FDbEIsR0FBRyxDQUFDLFVBQVUsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxpQkFBaUIsRUFBRSxLQUFLLFVBQVUsRUFDM0QsQ0FBQztnQ0FDRCxPQUFPLEdBQUcsSUFBSSxDQUFDO2dDQUNmLElBQUksR0FBRyxFQUFFLENBQUMsSUFBSSxFQUFFLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDOzRCQUNuQyxDQUFDO3dCQUNILENBQUM7b0JBQ0gsQ0FBQztvQkFDRCxPQUFPLEVBQUUsQ0FBQztnQkFDWixDQUFDO2dCQUVELE9BQU87b0JBQ0wsSUFBSSxFQUFFLElBQUk7b0JBQ1YsRUFBRSxFQUFFLElBQUk7aUJBQ1QsQ0FBQztZQUNKLENBQUM7WUFBQyxPQUFPLEtBQVUsRUFBRSxDQUFDO2dCQUNwQixJQUFJLEtBQUssSUFBSSxLQUFLLENBQUMsWUFBWSxFQUFFLENBQUM7b0JBQ2hDLE9BQU8sQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLEtBQUssQ0FBQyxDQUFBO29CQUNoQyxNQUFNLFFBQVEsR0FBRyxLQUFLLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztvQkFDL0MsT0FBTzt3QkFDTCxJQUFJLEVBQUUsUUFBUSxDQUFDLFFBQVEsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUM7d0JBQ3BELEVBQUUsRUFBRSxPQUFPO3FCQUNaLENBQUE7Z0JBQ0gsQ0FBQztxQkFBTSxDQUFDO29CQUNOLE9BQU87d0JBQ0wsSUFBSSxFQUFFLGtDQUFrQzt3QkFDeEMsRUFBRSxFQUFFLE9BQU87cUJBQ1osQ0FBQTtnQkFDSCxDQUFDO1lBQ0gsQ0FBQztRQUVILENBQUM7S0FDRixDQUFDO0FBQ0osQ0FBQztBQUdELG9FQUFvRTtBQUNwRSwyQ0FBMkM7QUFDM0Msb0VBQW9FO0FBQ3BFLE1BQU0sS0FBSyxHQUFHLENBQUMsR0FBVyxFQUFFLEVBQUU7SUFDNUIsT0FBTyxNQUFNLENBQUMsS0FBSyxJQUFBLG9CQUFXLEVBQUMsR0FBRyxDQUFDLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQztBQUN6RCxDQUFDLENBQUM7QUFDRixvRUFBb0U7QUFDcEUsU0FBZ0IsS0FBSyxDQUFDLEdBQVc7SUFDL0IsTUFBTSxJQUFJLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUN2QixDQUFDO0FBQ0Qsb0VBQW9FO0FBQ3BFLFNBQWdCLGFBQWEsQ0FBSSxDQUF1QjtJQUN0RCxJQUFJLENBQUMsS0FBSyxJQUFJLElBQUksQ0FBQyxLQUFLLFNBQVM7UUFDL0IsTUFBTSxJQUFJLEtBQUssQ0FBQywyQkFBMkIsQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUNsRCxPQUFPLElBQUksQ0FBQztBQUNkLENBQUMifQ==