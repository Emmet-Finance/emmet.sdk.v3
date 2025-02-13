import {
  Address,
  beginCell,
  Cell,
  ContractProvider,
  JettonMaster,
  type OpenedContract,
  type Sender,
  SendMode,
  toNano,
  TonClient,
} from "@ton/ton";
import {
  type ChainID,
  type ChainName,
  type Decimals,
  type FetchTxInfo,
  type GetBalance,
  type GetBridgeAddress,
  type GetEmmetHashFromTx,
  type GetEstimatedTime,
  type GetProvider,
  type GetTokenBalance,
  type GetTxFee,
  type NativeCoinName,
  type ProtocolFee,
  type SendInstallment,
  type TokenInfo,
  type ValidateAddress,
  type AddressBook,
  type StakeLiquidity,
  type WithdrawFees,
  type WithdrawLiquidity,
  type IsTransferFromLp,
  type GetProtocolFeeInUSD,
  type GetSwapResultAmount,
  type GetCrossChainStrategy,
  type GetTokenAddress,
  type SwapTokens,
  strategyMap,
  type TStrategy,
  ILiquidityPool,
  TLPData,
  TLPPosition,
} from ".";
import { EmmetBridge, loadOutgoingTransaction } from "../contracts/ton";
import { JettonMinter, Op } from "../contracts/ton/jetton-master";
import { AddressBook as TonAddressBook } from "../contracts/ton/address-book";
import { StonApiClient } from "@ston-fi/api";
import { DEX, pTON } from "@ston-fi/sdk";
import { JettonLP } from "../contracts/ton/pools/tact_JettonLP";
import { TonLP } from "../contracts/ton/pools/ton/tact_TonLP";
import { LPWallet } from "../contracts/ton/pools/ton/tact_LPWallet";
import { sha256_sync } from "@ton/crypto";
import { JettonWallet } from '../contracts/ton/jetton-wallet';

import { WrappedJetton } from "../contracts/ton/wrapped-jetton";
import { WrappedJettonWallet } from "../contracts/ton/wrapped-jetton-wallet";
import { TonStrategies } from "./strategies";

// const ADDRESS_ZERO: string = "EQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAM9c";
const MIN_TX_FEE: bigint = toNano("0.03");

export type TonGasArgs = { value: bigint; bounce?: boolean | null | undefined };

export type TonHelper = AddressBook &
  // G E N E R A L  P U R P O S E
  ChainID &
  ChainName &
  Decimals &
  GetBridgeAddress &
  GetBalance &
  GetCrossChainStrategy &
  GetEmmetHashFromTx &
  GetEstimatedTime &
  GetProtocolFeeInUSD &
  GetProvider<TonClient> &
  GetTokenAddress &
  GetTokenBalance &
  GetTxFee &
  NativeCoinName &
  ProtocolFee &
  TokenInfo &
  ValidateAddress &

  // B R I D G E
  FetchTxInfo &
  SendInstallment<Sender, string, TonGasArgs> &

  // L I Q U I D I T Y   P O O L
  ILiquidityPool<Sender, string, { value: bigint; bounce?: boolean }> &
  StakeLiquidity<Sender, string, { value: bigint; bounce?: boolean }> &
  WithdrawLiquidity<Sender, string, { value: bigint; bounce?: boolean }> &
  WithdrawFees<Sender, string, { value: bigint; bounce?: boolean }> &
  IsTransferFromLp &

  // S W A P
  GetSwapResultAmount &
  SwapTokens<Sender, undefined>;

export interface TonParams {
  rpcs: readonly string[];
  nativeTokenId: bigint;
  chainName: string;
  chainId: bigint;
  addressBook: Address;
  stonApiUrl: string;
  stonRouterAddress: string;
  pTonAddress: string;
}

/**
 * Holds the code execution for a number of `ms` milliseconds
 * @param ms number of milliseconds to wait
 * @returns halts the program execution for the `ms` milliseconds
 */
export const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

export async function tonHandler({
  rpcs,
  nativeTokenId,
  chainName,
  chainId,
  stonApiUrl,
  addressBook,
  stonRouterAddress,
  pTonAddress,
}: TonParams): Promise<TonHelper> {
  // -------------------------------------
  const clients = rpcs.map((rpc) => new TonClient({ endpoint: rpc }));
  const fetchClient = (): TonClient => {
    const randomRpcIndex = Math.floor(Math.random() * rpcs.length);
    return clients[randomRpcIndex];
  };

  const getContractProvider = (address: Address): ContractProvider => {
    return fetchClient().provider(address)
  }

  //          C O N T R A C T S
  const ab = fetchClient().open(TonAddressBook.fromAddress(addressBook));

  const bridge = await getAddressByName("EmmetBridge");
  const bridgeReader = fetchClient().open(EmmetBridge.fromAddress(bridge));

  //          F U N C T I O N S
  // -------------------------------------
  async function getAddressByName(name: string): Promise<Address> {
    try {
      const poolAddress: Address = await ab.getGet(name) ??
        raise(`Failed to fetch the ${name} address from the addressbook`);
      return poolAddress;
    } catch (error: { message: string } | any) {
      throw new Error(error.message);
    }
  }
  // -------------------------------------
  function getJettonLp(pool: string): OpenedContract<JettonLP> {
    try {
      return fetchClient().open(
        JettonLP.fromAddress(Address.parse(pool)),
      );
    } catch {
      throw new Error("Error getting JettonLP");
    }
  }
  // -------------------------------------
  async function getJettonLpByName(poolName: string): Promise<OpenedContract<JettonLP>> {
    try {
      const poolAddress: Address = await getAddressByName(
        poolName.includes("elp") ? poolName : `elp${poolName}`
      );
      return fetchClient().open(
        JettonLP.fromAddress(poolAddress),
      );
    } catch (error: { message: string } | any) {
      throw new Error("Emmet.SDK getJettonLpByName: " + error.message);
    }
  }
  // -------------------------------------
  async function getLastTxHashInBase64ForAddress(addr: Address) {
    const txns = await fetchClient().getTransactions(addr, { limit: 1 });
    return txns[0].hash().toString("base64");
  }
  // -------------------------------------
  function getJettonMaster(address: Address): OpenedContract<JettonMinter> {
    return fetchClient().open(
      JettonMinter.createFromAddress(address)
    )
  }
  // -------------------------------------
  function getJettonWallet(
    walletAddress: Address
  ): OpenedContract<JettonWallet> {
    return fetchClient().open(
      JettonWallet.createFromAddress(
        walletAddress
      ),
    );
  }
  async function getStrategies(targetChain: bigint, fromSymbol: string, targetSymbol: string) {

    const strategy = await bridgeReader.getGetStrategies(
      BigInt(targetChain),
      toKey(fromSymbol),
      toKey(targetSymbol)
    );

    if (!strategy) throw new Error("No cross chain strategy found");
    const outgoing: TStrategy[] = [];

    for (let i = 0; i < strategy.local.size; i++) {
      const strat = strategy.local.path.get(BigInt(i));
      if (strat) {
        const strategyName: TStrategy = strategyMap[
          BigInt(strat).toString()
        ];
        outgoing.push(strategyName)
      }
    }
    const foreign: TStrategy[] = [];
    for (let i = 0; i < strategy.foreign.size; i++) {
      const strat = strategy.foreign.path.get(BigInt(i));
      if (strat) {
        const strategyName: TStrategy =
          strategyMap[BigInt(strat).toString()];
        foreign.push(strategyName);
      }
    }

    const incoming: TStrategy[] = [];
    for (let i = 0; i < strategy.incomming.size; i++) {
      const strat = strategy.incomming.path.get(BigInt(i));
      if (strat) {
        const strategyName: TStrategy =
          strategyMap[BigInt(strat).toString()];
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
  async function transferTon(
    bridge: OpenedContract<EmmetBridge>,
    sender: Sender,
    to: string,
    targetTkn: string,
    chainId: bigint,
    amount: bigint,
    gasArgs: TonGasArgs,
  ): Promise<string> {
    return (await bridge.send(
      sender,
      {
        value: amount + gasArgs.value,
      },
      {
        $$type: "FreezeTon",
        amount: amount,
        target_chain: BigInt(chainId),
        to: beginCell().storeStringRefTail(to).endCell(),
        from_token: beginCell()
          .storeInt(toKey("TON"), 256)
          .storeStringRefTail("TON")
          .endCell(),
        to_token: beginCell()
          .storeInt(toKey(targetTkn), 256)
          .storeStringRefTail(targetTkn)
          .endCell(),
      },
    )) as unknown as Promise<string>;
  }
  // -------------------------------------
  const transferJettonToBurner = async (
    fromToken: string,
    targetToken: string,
    signer: Sender,
    amt: bigint,
    destAddress: string,
    cid: bigint,
    gasArgs: TonGasArgs,
  ): Promise<string> => {
    const tid = toKey(fromToken);
    const wt = await bridgeReader.getGetToken(tid);
    const jt = fetchClient().open(WrappedJetton.fromAddress(wt.address));
    const jtw = fetchClient().open(
      WrappedJettonWallet.fromAddress(
        await jt.getGetWalletAddress(signer.address!),
      ),
    );

    // console.log("Destination chainId:", cid);

    return (await jtw.send(
      signer,
      { value: gasArgs.value + MIN_TX_FEE * 4n },
      {
        $$type: "JettonBurn",
        amount: amt,
        custom_payload: null,
        query_id: 0n,
        forward_payload: beginCell()
          .storeUint(cid, 64) // Target Chain
          .storeRef(
            beginCell()
              .storeUint(toKey(fromToken), 256)
              .storeStringRefTail(fromToken)
              .asCell(),
          )
          .storeRef(beginCell().storeStringRefTail(destAddress).asCell())
          .storeRef(
            beginCell()
              .storeUint(toKey(targetToken), 256)
              .storeStringRefTail(targetToken)
              .asCell(),
          )
          .endCell(),
        forward_ton_amount: gasArgs.value + MIN_TX_FEE * 3n,
        response_destination: bridge,
      },
    )) as unknown as Promise<string>;
  };
  // -------------------------------------
  const transferJettonToBridge = async (
    fromToken: string,
    targetToken: string,
    signer: Sender,
    target_chain: bigint,
    destAddress: string,
    amt: bigint,
    gasArgs: TonGasArgs,
  ) => {

    const token = await bridgeReader.getGetToken(toKey(fromToken));
    const jt = fetchClient().open(WrappedJetton.fromAddress(token.address));
    const walletAddress: Address = await jt.getGetWalletAddress(signer.address!);
    const wallet = getContractProvider(walletAddress);

    const forward_payload: Cell = beginCell()
      .storeUint(target_chain, 64) // Target Chain
      .storeRef(
        beginCell()
          .storeUint(toKey(fromToken), 256)
          .storeStringRefTail(fromToken)
          .asCell(),
      )
      .storeRef(
        beginCell()
          .storeStringRefTail(destAddress)
          .asCell())
      .storeRef(
        beginCell()
          .storeUint(toKey(targetToken), 256)
          .storeStringRefTail(targetToken)
          .asCell(),
      )
      .endCell();

    const body = beginCell()
      .storeUint(Op.transfer, 32)
      .storeUint(1n, 64)
      .storeCoins(amt)
      .storeAddress(bridge)
      .storeAddress(bridge)
      .storeMaybeRef(null)
      .storeCoins(gasArgs.value + MIN_TX_FEE * 4n)
      .storeMaybeRef(forward_payload)
      .endCell();

    await wallet.internal(
      signer,
      {
        value: gasArgs.value + MIN_TX_FEE * 5n,
        sendMode: SendMode.PAY_GAS_SEPARATELY,
        bounce: true,
        body
      },
    )

    return body.hash().toString("hex");

  };
  // -------------------------------------
  function isWrappedToken(
    strategy: TStrategy[]
  ) {

    let isWrapped = false;

    try {
      for (let i = 0; i < strategy.length; i++) {

        if (strategy[i]
          && BigInt(strategy[i]) === TonStrategies.BURN) return true;
      }
    } catch (error) {
      console.warn("Emmet.SDK isWrappedToken", error)
    }

    return isWrapped;
  }
  // -------------------------------------
  async function getNewTxAfterHash(
    last: string,
    addr: Address,
    op: number,
  ): Promise<{ hash: string; tx: string }> {

    let foundTx = false;
    let hash = "";
    let retries = 0;

    while (!foundTx && retries < 10) {

      const latestTx = (
        await fetchClient().getTransactions(addr, { limit: 1 })
      )[0];

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
  const ston = new StonApiClient({
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

        const stonRouter = fetchClient().open(new DEX!.v2_2!.Router(stonRouterAddress));
        const proxyTon = pTON.v2_1.create(pTonAddress);

        if (!sender.address) throw new Error("Sender address not passed");

        const ft = await bridgeReader.getGetToken(toKey(fromSymbol));
        if (!ft) throw new Error("From Token not found");

        const tt = await bridgeReader.getGetToken(toKey(targetSymbol));
        if (!tt) throw new Error("Target Token not found");


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

      } catch (error) {
        console.warn(error);
      }

    },
    // -----------------------------------------------------------------
    async getSwapResultAmount(fromSymbol, targetSymbol, amount, slippage) {
      const ft = await bridgeReader.getGetToken(toKey(fromSymbol));
      if (!ft) throw new Error("From Token not found");
      const tt = await bridgeReader.getGetToken(toKey(targetSymbol));
      if (!tt) throw new Error("Target Token not found");
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
        const data: TLPData = await lp.getGetData();
        return data;
      } catch (error) {
        console.warn(error)
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
        } as TLPData;
      }
    },
    // -----------------------------------------------------------------
    async getPosition(poolName, staker) {
      try {
        const lp = await getJettonLpByName(poolName);
        const position: TLPPosition = await lp.getGetPosition(Address.parse(staker));
        return position;
      } catch {
        return {
          "$$type": "Position",
          balance: 0n,
          last_fee_growth: 0n,
          rewards: 0n
        } as TLPPosition;
      }
    },
    // -----------------------------------------------------------------
    async getRewards(poolName, staker) {
      try {
        const lp = await getJettonLpByName(poolName);
        return await lp.getRewards(Address.parse(staker));
      } catch {
        return 0n;
      }
    },
    // -----------------------------------------------------------------
    async stakeToken(poolName, signer, amount, gasArgs) {
      if (!signer.address)
        throw new Error(`Signer address not passed: ${signer}`);

      try {
        const value: bigint = toNano("0.12");
        const forwardAmount = toNano('0.095');

        const lp = await getJettonLpByName(poolName);
        const underlyingAddress: Address = await lp.getUnderlying();

        const jettonMaster: OpenedContract<JettonMinter> = getJettonMaster(underlyingAddress);

        const underlyingWallet: OpenedContract<JettonWallet> = getJettonWallet(
          await jettonMaster.getWalletAddress(signer.address!!)
        );

        const last = await getLastTxHashInBase64ForAddress(underlyingWallet.address);

        const addValue: bigint = gasArgs
          ? gasArgs.value
          : 0n;

        await underlyingWallet.sendTransfer(
          signer,
          value + addValue,
          amount,
          lp.address,
          signer.address!!,
          beginCell().storeStringRefTail("Deposit").endCell(),
          forwardAmount,
          null
        );

        return (await getNewTxAfterHash(
          last,
          underlyingWallet.address,
          0xf8a7ea5) // op::transfer
        ).hash as string;

      } catch (error: any | { message: string }) {
        throw new Error(`Emmet.SDK stakeJetton: ${error.message}`)
      }
    },
    // -----------------------------------------------------------------
    async stakeCoin(signer, amount) {
      if (!signer.address)
        throw new Error(`Signer address not passed: ${signer}`);

      const tonLpAddress: Address = await ab.getGet("elpTON") as Address;

      const tonLp = fetchClient().open(TonLP.fromAddress(tonLpAddress!));

      const last = await getLastTxHashInBase64ForAddress(tonLp.address);

      await tonLp.send(
        signer,
        {
          value: amount + toNano("0.04"),
        },
        {
          $$type: "Deposit",
          amount,
          forward_payload: beginCell().storeUint(2, 8).endCell().beginParse()
        },
      );

      return (await getNewTxAfterHash(
        last,
        tonLp.address,
        0x97ed57f1) // Deposit
      ).hash as string;

    },
    // -----------------------------------------------------------------
    async stakeLiquidity(signer, pool, amount, ga) { // OLD - to be removed
      if (!signer.address)
        throw new Error(`Signer address not passed: ${signer}`);

      const pa = Address.parse(pool); // Pool address

      const tonLp = await ab.getGet("elpTON");
      const isTonLp = tonLp?.equals(pa) ?? false;

      const payload = beginCell().storeUint(2, 8).endCell().beginParse();

      // ----------------- If TON is deposited -----------------
      if (isTonLp) {
        const tonLp = fetchClient().open(TonLP.fromAddress(pa));
        const last = await getLastTxHashInBase64ForAddress(tonLp.address);
        await tonLp.send(
          signer,
          {
            value: amount + toNano("0.02"),
          },
          {
            $$type: "Deposit",
            amount,
            forward_payload: payload
          },
        );
        return (await getNewTxAfterHash(
          last,
          tonLp.address,
          0x97ed57f1) // Deposit
        );
      }

      // ----------------- If Jetton is deposited -----------------
      const lp = getJettonLp(pool);

      const underlyingWalletAddress = await lp.getGetUnderlyingWallet();
      const underlying_wallet = fetchClient().open(LPWallet.fromAddress(underlyingWalletAddress));

      const tokenAddress = (await underlying_wallet.getGetWalletData()).master;
      const token = fetchClient().open(JettonMaster.create(tokenAddress));

      const wallet = await token.getWalletAddress(isTonLp ? lp.address : signer.address);

      const wc = fetchClient().open(LPWallet.fromAddress(wallet));
      const last = await getLastTxHashInBase64ForAddress(wc.address);

      await wc.send(
        signer,
        {
          value: toNano("0.2"),
          ...ga,
        },
        {
          $$type: "TokenTransfer",
          amount: amount,
          custom_payload: null,
          sender: lp.address,
          forward_payload: payload,
          forward_ton_amount: toNano("0.1"),
          query_id: 0n,
          response_destination: lp.address,
        },
      );
      return (await getNewTxAfterHash(
        last,
        wc.address,
        0xf8a7ea5) // op::transfer
      );
    },
    // -----------------------------------------------------------------
    async withdrawFees(signer, pool, ga) {

      if (!signer.address)
        throw new Error(`Signer address not passed: ${signer}`);

      const lp = getJettonLp(pool);
      const last = await getLastTxHashInBase64ForAddress(lp.address);

      await lp.send(
        signer,
        { value: toNano("0.06"), ...ga },
        { $$type: "WithdrawRewards" }
      );

      return await getNewTxAfterHash(last, lp.address, 0x32d20fa6);
    },
    // -----------------------------------------------------------------
    async withdrawLiquidity(signer, pool, amount, ga) {

      if (!signer.address)
        throw new Error(`Signer address not passed: ${signer}`);

      const lp = getJettonLp(pool);
      const last = await getLastTxHashInBase64ForAddress(lp.address);

      await lp.send(
        signer,
        { value: toNano("0.05"), ...ga },
        {
          $$type: "Withdraw",
          amount
        },
      );

      return await getNewTxAfterHash(last, lp.address, 0x60591510);
    },
    // -----------------------------------------------------------------
    decimals: async (pool) => {
      if (!pool) return 9;
      const lp = getJettonLp(pool);
      const dec = await lp.getDecimals();
      return Number(dec);
    },
    async address(contr) {
      const address =
        (await ab.getGet(contr)) ??
        raise(
          `Failed to fetch address for ${contr} in ${addressBook.toString()}`,
        );
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
          const om = tx.outMessages.get(i)!;
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
      let _fee: bigint = 0n;
      try {
        _fee = await bridgeReader.getEstimateFee(
          BigInt(targetChain),
          toKey(fromSymbol),
          toKey(targetSymbol)
        );
      } catch (error) {
        console.warn("Emmet.SDK txFee", error)
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

      let bal: bigint = 0n;

      try {
        bal = await fetchClient().getBalance(Address.parse(addr));
      } catch (error) {
        console.warn(error)
        await sleep(1000);
        return await fetchClient().getBalance(Address.parse(addr));
      }

      return bal;

    },
    // -----------------------------------------------------------------
    provider: () => Promise.resolve(fetchClient()),
    // -----------------------------------------------------------------
    validateAddress: (addr) => {
      try {
        Address.parse(addr);
        return Promise.resolve(true);
      } catch (e) {
        return Promise.resolve(false);
      }
    },
    // -----------------------------------------------------------------
    async protocolFee() {
      return await bridgeReader.getGetProtocolFee();
    },
    // -----------------------------------------------------------------
    async txInfo(hash) {
      const bs64 = Buffer.from(hash.replace("0x", ""), "hex").toString(
        "base64",
      );
      try {
        const tx = await fetchClient().getTransactions(bridge, {
          limit: 1,
          hash: bs64,
        });

        return {
          timestamp: BigInt(tx[0].now),
          value: tx[0].totalFees.coins,
        };
      } catch (e) {
        return {
          timestamp: 0n,
          value: 0n,
        };
      }
    },
    // -----------------------------------------------------------------
    getTokenAddress: async (symbol: string): Promise<string> => {
      const address: Address | null = await ab.getGet(symbol);
      return address ? address.toString() : "";
    },
    // -----------------------------------------------------------------
    tokenBalance: async (token, addr) => {

      let tokenBal: bigint = 0n;
      let tokenAddress: Address;
      let userAddress: Address;

      // Ensure token & user addresses are valid
      try {
        tokenAddress = Address.parse(token);
      } catch {
        console.warn(`Invalid token address: ${token}`);
        return tokenBal;
      }

      try {
        userAddress = Address.parse(addr);
      } catch {
        console.warn(`Invalid user address: ${addr}`);
        return tokenBal;
      }

      try {
        const jc = getJettonMaster(tokenAddress!);
        const jwa = await jc.getWalletAddress(userAddress!);
        const jw = getJettonWallet(jwa);
        await sleep(1000);
        const data = await jw.getWalletData();
        tokenBal = data.balance;
        return tokenBal;
      } catch (error) {
        // RPC / Contract related errors
        console.warn(`Emmet.SDK tokenBalance: token: ${token}, user: ${addr}\n`, error);
        await sleep(1000); // Not to overload the RPC
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
    sendInstallment: async (
      signer,
      amt,
      cid,
      fromSymbol,
      targetSymbol,
      destAddress,
      fee,
    ) => {
      const lastBridgeTxHash = await getLastTxHashInBase64ForAddress(bridge);
      const bc = fetchClient().open(EmmetBridge.fromAddress(bridge));

      const strategies = await getStrategies(cid, fromSymbol, targetSymbol);
      const isWrapped: boolean = isWrappedToken(strategies.outgoing);

      fee = await bridgeReader.getEstimateFee(cid, toKey(fromSymbol), toKey(targetSymbol));

      const provider = fetchClient();
      const userBalance = await provider.getBalance(signer.address!);

      if(userBalance < fee) {
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
        } else if (isWrapped) {
          await transferJettonToBurner(
            fromSymbol,
            targetSymbol,
            signer,
            amt,
            destAddress,
            cid,
            gs,
          );
        } else {
          await transferJettonToBridge(
            fromSymbol,
            targetSymbol,
            signer,
            cid,
            destAddress,
            amt,
            gs,
          );
        }

        let foundTx = false;
        let hash = "";
        let retries = 0;
        while (!foundTx && retries < 10) {
          await new Promise((e) => setTimeout(e, 2000));
          const latestTx = (
            await fetchClient().getTransactions(bridge, { limit: 1 })
          )[0];
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
              const otx = loadOutgoingTransaction(msg.body.asSlice());
              if (
                destAddress === otx.to.asSlice().loadStringRefTail() &&
                amt === otx.amount &&
                otx.from_token.asSlice().loadStringRefTail() === fromSymbol
              ) {
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
      } catch (error) {
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
const toKey = (key: string) => {
  return BigInt(`0x${sha256_sync(key).toString("hex")}`);
};
// -----------------------------------------------------------------
export function raise(msg: string): never {
  throw new Error(msg);
}
// -----------------------------------------------------------------
export function assertNotNull<T>(t: T | null | undefined): t is T {
  if (t === null || t === undefined)
    throw new Error(`Failed to unwrap value: ${t}`);
  return true;
}
