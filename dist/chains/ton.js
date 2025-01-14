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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2NoYWlucy90b24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBZ0hBLGdDQW8zQkM7QUFVRCxzQkFFQztBQUVELHNDQUlDO0FBdC9CRCxrQ0FTa0I7QUFDbEIsd0JBZ0NXO0FBQ1gsMENBQW1FO0FBQ25FLGtFQUE4RDtBQUM5RCxnRUFBOEU7QUFDOUUsc0NBQTZDO0FBQzdDLHNDQUF5QztBQUN6Qyx3RUFBZ0U7QUFDaEUsc0VBQThEO0FBQzlELDRFQUFvRTtBQUNwRSx3Q0FBMEM7QUFDMUMsa0VBQThEO0FBRTlELG9FQUFnRTtBQUNoRSxrRkFBNkU7QUFrRDdFOzs7O0dBSUc7QUFDSSxNQUFNLEtBQUssR0FBRyxDQUFDLEVBQVUsRUFBRSxFQUFFLENBQUMsSUFBSSxPQUFPLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLFVBQVUsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQztBQUE5RCxRQUFBLEtBQUssU0FBeUQ7QUFFcEUsS0FBSyxVQUFVLFVBQVUsQ0FBQyxFQUMvQixJQUFJLEVBQ0osYUFBYSxFQUNiLFNBQVMsRUFDVCxPQUFPLEVBQ1AsVUFBVSxFQUNWLFdBQVcsRUFDWCxpQkFBaUIsRUFDakIsV0FBVyxHQUNEO0lBQ1Ysd0NBQXdDO0lBQ3hDLE1BQU0sT0FBTyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLElBQUksZUFBUyxDQUFDLEVBQUUsUUFBUSxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQztJQUNwRSxNQUFNLFdBQVcsR0FBRyxHQUFHLEVBQUU7UUFDdkIsTUFBTSxjQUFjLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQy9ELE9BQU8sT0FBTyxDQUFDLGNBQWMsQ0FBQyxDQUFDO0lBQ2pD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