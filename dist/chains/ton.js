"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.assertNotNull = exports.raise = exports.tonHandler = exports.sleep = void 0;
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
    //          C O N T R A C T S
    const ab = fetchClient().open(address_book_1.AddressBook.fromAddress(addressBook));
    const bridge = await getAddressByName("EmmetBridge");
    const bridgeReader = fetchClient().open(ton_2.Bridge.fromAddress(bridge));
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
            const poolAddress = await getAddressByName(`elp${poolName}`);
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
        const wtd = await bridgeReader.getTokens();
        const wt = wtd.get(tid);
        const jt = fetchClient().open(wrapped_jetton_1.WrappedJetton.fromAddress(wt.address));
        const jtw = fetchClient().open(wrapped_jetton_wallet_1.WrappedJettonWallet.fromAddress(await jt.getGetWalletAddress(signer.address)));
        // console.log("Destination chainId:", cid);
        return (await jtw.send(signer, { value: gasArgs.value + (0, ton_1.toNano)("0.08") }, {
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
            forward_ton_amount: gasArgs.value + (0, ton_1.toNano)("0.03"),
            response_destination: bridge,
        }));
    };
    // -------------------------------------
    const transferJettonToBridge = async (fromToken, targetToken, signer, target_chain, destAddress, amt, gasArgs) => {
        const tid = toKey(fromToken);
        const ntd = await bridgeReader.getTokens();
        const wt = ntd.get(tid);
        const jt = fetchClient().open(wrapped_jetton_1.WrappedJetton.fromAddress(wt.address));
        const jtw = fetchClient().open(wrapped_jetton_wallet_1.WrappedJettonWallet.fromAddress(await jt.getGetWalletAddress(signer.address)));
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
        return (await jtw.send(signer, { value: gasArgs.value + (0, ton_1.toNano)("0.05") }, {
            $$type: "JettonTransfer",
            amount: amt,
            custom_payload: null,
            destination: bridge,
            forward_payload,
            forward_ton_amount: gasArgs.value,
            query_id: 0n,
            response_destination: bridge,
        }));
    };
    // -------------------------------------
    async function isWrappedToken(targetChain, fromTokenId, targetTokenId) {
        const steps = await bridgeReader.getCrossChainStrategy();
        const strategy = steps
            .get(targetChain)
            ?.i.get(fromTokenId)
            ?.i.get(targetTokenId);
        if (!strategy)
            return false;
        for (let i = 0; i < strategy.local_steps.size; i++) {
            const strat = strategy.local_steps.steps.get(BigInt(i));
            if (strat === 5n)
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
                const stonRouter = fetchClient().open(new sdk_1.DEX.v2_2.Router(stonRouterAddress));
                const proxyTon = sdk_1.pTON.v2_1.create(pTonAddress);
                if (!sender.address)
                    throw new Error("Sender address not passed");
                const tokens = await bridgeReader.getTokens();
                const ft = tokens.get(toKey(fromSymbol));
                if (!ft)
                    throw new Error("From Token not found");
                const tt = tokens.get(toKey(targetSymbol));
                if (!tt)
                    throw new Error("Target Token not found");
                if (fromSymbol === targetSymbol) {
                    throw new Error("From and Target tokens are the same");
                }
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
            const tokens = await bridgeReader.getTokens();
            const ft = tokens.get(toKey(fromSymbol));
            if (!ft)
                throw new Error("From Token not found");
            const tt = tokens.get(toKey(targetSymbol));
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
            catch {
                return {
                    '$$type': 'LPData',
                    apy: 0n,
                    available_underlying: 0n,
                    decimals: 0n,
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
        async stakeJetton(poolName, signer, amount, gasArgs) {
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
        async stakeTon(signer, amount) {
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
                    value: amount + (0, ton_1.toNano)("0.04"),
                }, {
                    $$type: "Deposit",
                    amount,
                    forward_payload: payload
                });
                return await getNewTxAfterHash(last, tonLp.address, 923309543);
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
                value: (0, ton_1.toNano)("0.4"),
                ...ga,
            }, {
                $$type: "TokenTransfer",
                amount: amount,
                custom_payload: null,
                sender: lp.address,
                forward_payload: payload,
                forward_ton_amount: (0, ton_1.toNano)("0.2"),
                query_id: 0n,
                response_destination: lp.address,
            });
            return await getNewTxAfterHash(last, lp.address, 923309543);
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
            const ccs = await bridgeReader.getCrossChainStrategy();
            const strategy = ccs
                .get(BigInt(targetChain))
                ?.i.get(toKey(fromSymbol))
                ?.i.get(toKey(targetSymbol));
            if (!strategy)
                throw new Error("No cross chain strategy found");
            const local = [];
            for (let i = 0; i < strategy.local_steps.size; i++) {
                const strat = strategy.local_steps.steps.get(BigInt(i));
                if (strat) {
                    const strategyName = _1.strategyMap[BigInt(strat).toString()];
                    local.push(strategyName);
                }
            }
            const foreign = [];
            for (let i = 0; i < strategy.foreign_steps.size; i++) {
                const strat = strategy.local_steps.steps.get(BigInt(i));
                if (strat) {
                    const strategyName = _1.strategyMap[BigInt(strat).toString()];
                    local.push(strategyName);
                }
            }
            return {
                foreign,
                outgoing: local,
                incoming: foreign
            };
        },
        // -----------------------------------------------------------------
        estimateTime: () => Promise.resolve(2n * 60n * 1000n), // 2 minutes
        // -----------------------------------------------------------------
        nativeCoin: () => "TON",
        // -----------------------------------------------------------------
        chainName: () => chainName,
        async txFee(tc) {
            const fee = (await bridgeReader.getProtocolFee()) +
                ((await bridgeReader.getChainFees()).get(tc) ??
                    raise("Chain fees not configured for this chain"));
            return fee;
        },
        async token(symbol) {
            const id = toKey(symbol);
            const tokens = await bridgeReader.getTokens();
            const qToken = tokens.get(id);
            if (!qToken)
                throw new Error("No Such Token Found in Storage");
            return {
                address: qToken.address.toString(),
                decimals: qToken.decimals,
                fee: qToken.fee,
                feeDecimals: qToken.fee_decimals,
                symbol: qToken.symbol,
                swap: qToken.swap_address.toString(),
                priceFeed: id.toString(),
                token: qToken.address.toString()
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
            return await bridgeReader.getProtocolFee();
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
            const bc = fetchClient().open(ton_2.Bridge.fromAddress(bridge));
            const fsid = BigInt(`0x${(0, crypto_1.sha256_sync)(fromSymbol).toString("hex")}`);
            const tid = BigInt(`0x${(0, crypto_1.sha256_sync)(targetSymbol).toString("hex")}`);
            const isWrapped = await isWrappedToken(cid, fsid, tid);
            const gs = fee !== undefined
                ? {
                    value: fee,
                }
                : {
                    value: (await bridgeReader.getProtocolFee()) +
                        ((await bridgeReader.getChainFees()).get(cid) ??
                            raise("Chain fees not configured for this chain")),
                };
            if (fsid === nativeTokenId) {
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
exports.tonHandler = tonHandler;
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
exports.raise = raise;
// -----------------------------------------------------------------
function assertNotNull(t) {
    if (t === null || t === undefined)
        throw new Error(`Failed to unwrap value: ${t}`);
    return true;
}
exports.assertNotNull = assertNotNull;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2NoYWlucy90b24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsa0NBU2tCO0FBQ2xCLHdCQWdDVztBQUNYLDBDQUFtRTtBQUNuRSxrRUFBOEQ7QUFDOUQsZ0VBQThFO0FBQzlFLHNDQUE2QztBQUM3QyxzQ0FBeUM7QUFDekMsd0VBQWdFO0FBQ2hFLHNFQUE4RDtBQUM5RCw0RUFBb0U7QUFDcEUsd0NBQTBDO0FBQzFDLGtFQUE4RDtBQUU5RCxvRUFBZ0U7QUFDaEUsa0ZBQTZFO0FBa0Q3RTs7OztHQUlHO0FBQ0ksTUFBTSxLQUFLLEdBQUcsQ0FBQyxFQUFVLEVBQUUsRUFBRSxDQUFDLElBQUksT0FBTyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxVQUFVLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUM7QUFBOUQsUUFBQSxLQUFLLFNBQXlEO0FBRXBFLEtBQUssVUFBVSxVQUFVLENBQUMsRUFDL0IsSUFBSSxFQUNKLGFBQWEsRUFDYixTQUFTLEVBQ1QsT0FBTyxFQUNQLFVBQVUsRUFDVixXQUFXLEVBQ1gsaUJBQWlCLEVBQ2pCLFdBQVcsR0FDRDtJQUNWLHdDQUF3QztJQUN4QyxNQUFNLE9BQU8sR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxJQUFJLGVBQVMsQ0FBQyxFQUFFLFFBQVEsRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDcEUsTUFBTSxXQUFXLEdBQUcsR0FBRyxFQUFFO1FBQ3ZCLE1BQU0sY0FBYyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUMvRCxPQUFPLE9BQU8sQ0FBQyxjQUFjLENBQUMsQ0FBQztJQUNqQyxDQUFDLENBQUM7SUFFRiw2QkFBNkI7SUFDN0IsTUFBTSxFQUFF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