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
            const isWrapped = isWrappedToken(strategies.outgoing);
            fee = await bridgeReader.getEstimateFee(cid, toKey(fromSymbol), toKey(targetSymbol));
            const provider = fetchClient();
            const userBalance = await provider.getBalance(signer.address);
            if (userBalance < fee) {
                return {
                    hash: "Insufficient TON for gas",
                    tx: "ERROR",
                };
            }
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
                return {
                    hash: "Token transfer failed",
                    tx: "ERROR",
                };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2NoYWlucy90b24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBc0hBLGdDQXU2QkM7QUFVRCxzQkFFQztBQUVELHNDQUlDO0FBL2lDRCxrQ0FXa0I7QUFDbEIsd0JBZ0NXO0FBQ1gsMENBQXdFO0FBQ3hFLGtFQUFrRTtBQUNsRSxnRUFBOEU7QUFDOUUsc0NBQTZDO0FBQzdDLHNDQUF5QztBQUN6Qyx3RUFBZ0U7QUFDaEUsc0VBQThEO0FBQzlELDRFQUFvRTtBQUNwRSx3Q0FBMEM7QUFDMUMsa0VBQThEO0FBRTlELG9FQUFnRTtBQUNoRSxrRkFBNkU7QUFDN0UsNkNBQTZDO0FBRTdDLG1GQUFtRjtBQUNuRixNQUFNLFVBQVUsR0FBVyxJQUFBLFlBQU0sRUFBQyxNQUFNLENBQUMsQ0FBQztBQWtEMUM7Ozs7R0FJRztBQUNJLE1BQU0sS0FBSyxHQUFHLENBQUMsRUFBVSxFQUFFLEVBQUUsQ0FBQyxJQUFJLE9BQU8sQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsVUFBVSxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDO0FBQTlELFFBQUEsS0FBSyxTQUF5RDtBQUVwRSxLQUFLLFVBQVUsVUFBVSxDQUFDLEVBQy9CLElBQUksRUFDSixhQUFhLEVBQ2IsU0FBUyxFQUNULE9BQU8sRUFDUCxVQUFVLEVBQ1YsV0FBVyxFQUNYLGlCQUFpQixFQUNqQixXQUFXLEdBQ0Q7SUFDVix3Q0FBd0M7SUFDeEMsTUFBTSxPQUFPLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUMsSUFBSSxlQUFTLENBQUMsRUFBRSxRQUFRLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQ3BFLE1BQU0sV0FBVyxHQUFHLEdBQWMsRUFBRTtRQUNsQyxNQUFNLGNBQWMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxNQUFN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