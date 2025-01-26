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
        await wallet.internal(signer, {
            value: gasArgs.value + MIN_TX_FEE * 5n,
            sendMode: ton_1.SendMode.PAY_GAS_SEPARATELY,
            bounce: true,
            body
        });
        return body.hash().toString("hex");
    };
    // -------------------------------------
    function isWrappedToken(strategy) {
        for (let i = 0; i < strategy.length; i++) {
            if (BigInt(strategy[i]) === strategies_1.TonStrategies.BURN)
                return true;
        }
        return false;
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
            const isWrapped = await isWrappedToken(strategies.outgoing);
            fee = await bridgeReader.getEstimateFee(cid, toKey(fromSymbol), toKey(targetSymbol));
            const gs = {
                value: fee
            };
            if (toKey(fromSymbol) === nativeTokenId) {
                await transferTon(bc, signer, destAddress, targetSymbol, cid, amt, gs);
            }
            else if (isWrapped) {
                console.log("burning");
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2NoYWlucy90b24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBc0hBLGdDQTg0QkM7QUFVRCxzQkFFQztBQUVELHNDQUlDO0FBdGhDRCxrQ0FXa0I7QUFDbEIsd0JBZ0NXO0FBQ1gsMENBQXdFO0FBQ3hFLGtFQUFrRTtBQUNsRSxnRUFBOEU7QUFDOUUsc0NBQTZDO0FBQzdDLHNDQUF5QztBQUN6Qyx3RUFBZ0U7QUFDaEUsc0VBQThEO0FBQzlELDRFQUFvRTtBQUNwRSx3Q0FBMEM7QUFDMUMsa0VBQThEO0FBRTlELG9FQUFnRTtBQUNoRSxrRkFBNkU7QUFDN0UsNkNBQTZDO0FBRTdDLG1GQUFtRjtBQUNuRixNQUFNLFVBQVUsR0FBVyxJQUFBLFlBQU0sRUFBQyxNQUFNLENBQUMsQ0FBQztBQWtEMUM7Ozs7R0FJRztBQUNJLE1BQU0sS0FBSyxHQUFHLENBQUMsRUFBVSxFQUFFLEVBQUUsQ0FBQyxJQUFJLE9BQU8sQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsVUFBVSxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDO0FBQTlELFFBQUEsS0FBSyxTQUF5RDtBQUVwRSxLQUFLLFVBQVUsVUFBVSxDQUFDLEVBQy9CLElBQUksRUFDSixhQUFhLEVBQ2IsU0FBUyxFQUNULE9BQU8sRUFDUCxVQUFVLEVBQ1YsV0FBVyxFQUNYLGlCQUFpQixFQUNqQixXQUFXLEdBQ0Q7SUFDVix3Q0FBd0M7SUFDeEMsTUFBTSxPQUFPLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUMsSUFBSSxlQUFTLENBQUMsRUFBRSxRQUFRLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQ3BFLE1BQU0sV0FBVyxHQUFHLEdBQWMsRUFBRTtRQUNsQyxNQUFNLGNBQWMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxNQUFN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