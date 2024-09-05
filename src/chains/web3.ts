import {
  type ContractTransactionResponse,
  isAddress,
  JsonRpcProvider,
  type Overrides,
  type Provider,
  type Signer,
} from "ethers";
import type {
  AddressBook,
  ChainID,
  ChainName,
  Decimals,
  FetchTxInfo,
  GetApprovedTokenAmount,
  GetBalance,
  GetBridgeAddress,
  GetLpCurrentAPY,
  GetEmmetHashFromTx,
  GetEstimatedTime,
  GetProtocolFeeInUSD,
  GetProvider,
  GetTokenBalance,
  GetLpTotalSupply,
  GetTxFee,
  NativeCoinName,
  PreTransfer,
  ProtocolFee,
  SendInstallment,
  StakeLiquidity,
  TokenInfo,
  ValidateAddress,
  WithdrawLiquidity,
  GetLpTokenFee,
  GetLpProtocolFee,
  GetLpProtocolFeeAmount,
  WithdrawFees,
  GetLpProviderRewards,
  GetLpFeeGrowthGlobal,
  GetLpFeeDecimals,
  IsTransferFromLp,
  GetCrossChainStrategy,
  Strategy,
  GetSwapResultAmount,
} from ".";
import {
  EmmetAddressBook__factory,
  EmmetBridge__factory,
  EmmetData__factory,
  EmmetLPV2__factory,
  ERC20__factory,
  WrappedERC20__factory,
} from "@emmet-contracts/web3";
import type { PayableOverrides } from "@emmet-contracts/web3/dist/common";

export type Web3Helper = GetBalance &
  GetProvider<Provider> &
  SendInstallment<Signer, ContractTransactionResponse, PayableOverrides> &
  ValidateAddress &
  GetTokenBalance &
  GetApprovedTokenAmount &
  PreTransfer<Signer, PayableOverrides> &
  ChainName &
  NativeCoinName &
  AddressBook &
  TokenInfo &
  ChainID &
  GetTxFee &
  FetchTxInfo &
  ProtocolFee &
  GetEmmetHashFromTx &
  GetEstimatedTime &
  GetBridgeAddress &
  GetProtocolFeeInUSD &
  Decimals &
  StakeLiquidity<Signer, ContractTransactionResponse, Overrides> &
  WithdrawLiquidity<Signer, ContractTransactionResponse, Overrides> &
  WithdrawFees<Signer, ContractTransactionResponse, Overrides> &
  GetLpCurrentAPY &
  GetLpTotalSupply &
  GetLpTokenFee &
  GetLpProtocolFee &
  GetLpProtocolFeeAmount &
  GetLpProviderRewards &
  GetLpFeeGrowthGlobal &
  GetLpFeeDecimals &
  IsTransferFromLp &
  GetCrossChainStrategy &
  GetSwapResultAmount;

export interface Web3Params {
  rpcs: readonly string[];
  addressBook: string;
  chainName: string;
  nativeCoin: string;
}

export async function web3Helper({
  rpcs,
  addressBook,
  chainName,
  nativeCoin,
}: Web3Params): Promise<Web3Helper> {
  const initializedProviders = rpcs.map((e) => new JsonRpcProvider(e));
  const cache: Record<number, Provider> = {};

  const fetchProvider = async (): Promise<Provider> => {
    const randomRpcIndex = Math.floor(Math.random() * rpcs.length);
    if (cache[randomRpcIndex]) {
      return cache[randomRpcIndex];
    }
    const provider = initializedProviders[randomRpcIndex];
    try {
      await provider.getNetwork();
      cache[randomRpcIndex] = provider;
      return provider;
    } catch {
      return fetchProvider();
    }
  };

  const addrBook = EmmetAddressBook__factory.connect(
    addressBook,
    await fetchProvider(),
  );
  const bridgeAddr = await addrBook.get("EmmetBridge");
  const emmetData = await addrBook.get("EmmetData");
  const bridge = EmmetBridge__factory.connect(
    bridgeAddr,
    await fetchProvider(),
  );
  const data = EmmetData__factory.connect(emmetData, await fetchProvider());
  return {
    id: async () => (await (await fetchProvider()).getNetwork()).chainId,
    stakeLiquidity: async (signer, pool, amt, ga) => {
      const lp = EmmetLPV2__factory.connect(pool, signer);
      const deposit = await lp.deposit(amt, { ...ga });
      return {
        hash: deposit.hash,
        tx: deposit,
      };
    },
    async getSwapResultAmount(_fromSymbol, _targetSymbol, amount, _slippage) {
      return amount;
    },
    async crossChainStrategy(targetChain, fromSymbol, targetSymbol) {
      const ccts = await data.getCrossChainTokenStrategy(
        targetChain,
        fromSymbol,
        targetSymbol,
      );
      const local: Strategy[] = [];
      for (const strat of ccts.localSteps) {
        if (strat === 0n) local.push("nothing");
        if (strat === 1n) local.push("cctp_burn");
        if (strat === 2n) local.push("cctp_claim");
        if (strat === 3n) local.push("lock");
        if (strat === 4n) local.push("mint");
        if (strat === 5n) local.push("burn");
        if (strat === 6n) local.push("pass_to_lp");
        if (strat === 7n) local.push("transfer_from_lp");
        if (strat === 8n) local.push("swap");
        if (strat === 13n) local.push("unlock");
      }
      const foreign: Strategy[] = [];
      for (const strat of ccts.foreignSteps) {
        if (strat === 0n) foreign.push("nothing");
        if (strat === 1n) foreign.push("cctp_burn");
        if (strat === 2n) foreign.push("cctp_claim");
        if (strat === 3n) foreign.push("lock");
        if (strat === 4n) foreign.push("mint");
        if (strat === 5n) foreign.push("burn");
        if (strat === 6n) foreign.push("pass_to_lp");
        if (strat === 7n) foreign.push("transfer_from_lp");
        if (strat === 8n) foreign.push("swap");
        if (strat === 13n) foreign.push("unlock");
      }
      return {
        local,
        foreign,
      };
    },
    withdrawLiquidity: async (signer, pool, amt, ga) => {
      const lp = EmmetLPV2__factory.connect(pool, signer);
      const withdraw = await lp.withdrawTokens(amt, { ...ga });
      return {
        hash: withdraw.hash,
        tx: withdraw,
      };
    },
    withdrawFees: async (signer, pool, ga) => {
      const lp = EmmetLPV2__factory.connect(pool, signer);
      const withdraw = await lp.withdrawFees({ ...ga });
      return {
        hash: withdraw.hash,
        tx: withdraw,
      };
    },
    getLpCurrentAPY: async (pool) => {
      const lp = EmmetLPV2__factory.connect(pool, await fetchProvider());
      const apy = await lp.currentAPY();
      return apy;
    },
    getLpTotalSupply: async (pool) => {
      const lp = EmmetLPV2__factory.connect(pool, await fetchProvider());
      const totalSupply = await lp.totalSupply();
      return totalSupply;
    },
    getLpTokenFee: async (pool) => {
      const lp = EmmetLPV2__factory.connect(pool, await fetchProvider());
      const tokenFee = await lp.tokenFee();
      return tokenFee;
    },
    getLpProtocolFee: async (pool) => {
      const lp = EmmetLPV2__factory.connect(pool, await fetchProvider());
      const protocolFee = await lp.protocolFee();
      return protocolFee;
    },
    getLpProtocolFeeAmount: async (pool) => {
      const lp = EmmetLPV2__factory.connect(pool, await fetchProvider());
      const protocolFeeAmount = await lp.protocolFeeAmount();
      return protocolFeeAmount;
    },
    getLpProviderRewards: async (pool, address) => {
      const lp = EmmetLPV2__factory.connect(pool, await fetchProvider());
      const providerRewards = await lp.getProviderRewards(address);
      return providerRewards;
    },
    getLpFeeGrowthGlobal: async (pool) => {
      const lp = EmmetLPV2__factory.connect(pool, await fetchProvider());
      const feeGrowthGlobal = await lp.feeGrowthGlobal();
      return feeGrowthGlobal;
    },
    getLpFeeDecimals: async (pool) => {
      const lp = EmmetLPV2__factory.connect(pool, await fetchProvider());
      const feeDecimals = await lp.feeDecimals();
      return feeDecimals;
    },
    async address(contr) {
      return await addrBook.get(contr);
    },
    async bridge() {
      return await bridge.getAddress();
    },
    async txFee(targetChainId, fromToken, targetToken) {
      const protocolFee = await data.getProtocolFee();
      const ffc = await data.getForeignFeeCompensation(
        targetChainId,
        fromToken,
        targetToken,
      );
      return protocolFee + ffc;
    },
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
      } catch (e) {
        return {
          timestamp: 0n,
          value: 0n,
        };
      }
    },
    async emmetHashFromtx(hash) {
      const receipt = await (await fetchProvider()).waitForTransaction(hash);
      if (!receipt) throw new Error(`No receipt found for tx hash: ${hash}`);
      const log = receipt.logs.find((e) =>
        e.topics.includes(
          bridge.interface.getEvent("SendInstallment").topicHash,
        ),
      );
      if (!log)
        throw new Error(`No send installment log found for tx hash: ${hash}`);
      const decode = bridge.interface.parseLog(log);
      return decode?.args.txHash;
    },
    protocolFee() {
      return data.getProtocolFee();
    },
    async token(symbol) {
      const token = await data.getToken(symbol);
      return {
        address: token.addr,
        swap: token.swap,
        decimals: token.decimals,
        fee: token.fee,
        feeDecimals: token.feeDecimals,
        symbol: token.symbol,
      };
    },
    decimals: async (pool) => {
      if (!pool) return 18;
      return Number(
        await ERC20__factory.connect(pool, await fetchProvider()).decimals(),
      );
    },
    nativeCoin: () => nativeCoin,
    chainName: () => chainName,
    preTransfer: async (signer, tid, spender, amt, gasArgs) => {
      const erc = WrappedERC20__factory.connect(tid, signer);
      const preTransferGas = await erc.approve.estimateGas(spender, amt);
      const approved = await erc.approve(spender, amt, {
        ...gasArgs,
        gasLimit: preTransferGas,
      });
      await approved.wait();
      return approved.hash;
    },

    getApprovedAmount: async (tid, owner, spender) =>
      await WrappedERC20__factory.connect(tid, await fetchProvider()).allowance(
        owner,
        spender,
      ),
    balance: async (addr) => (await fetchProvider()).getBalance(addr),
    provider: async () => await fetchProvider(),
    async estimateTime(targetChain, fromToken, targetToken) {
      const ts = await data.getCrossChainTokenStrategy(
        targetChain,
        fromToken,
        targetToken,
      );
      const localSteps = ts[0];
      const foreignSteps = ts[1];
      const isCCTP =
        foreignSteps.includes(1n) ||
        foreignSteps.includes(2n) ||
        localSteps.includes(1n) ||
        localSteps.includes(2n);
      if (isCCTP) {
        const time = await data.getCCTPChain(targetChain);
        const timeInMs = (time.awaitMinutes * 60n + time.awaitSeconds) * 1000n;
        return timeInMs;
      }
      return undefined;
    },
    async isTransferFromLp(targetChain, fromToken, targetToken) {
      const ts = await data.getCrossChainTokenStrategy(
        targetChain,
        fromToken,
        targetToken,
      );
      const _isTransferFromLp = ts[1].includes(7n);
      return _isTransferFromLp;
    },
    protocolFeeInUSD: async () => {
      const fee = await data.protocolFee();
      return fee.usdEquivalent;
    },
    validateAddress: (addr) => Promise.resolve(isAddress(addr)),
    tokenBalance: async (tkn, addr) =>
      WrappedERC20__factory.connect(tkn, await fetchProvider()).balanceOf(addr),
    sendInstallment: async (signer, amt, cid, fs, ts, da, fee, gasArgs) => {
      const sendGas = await bridge
        .connect(signer)
        .sendInstallment.estimateGas(cid, amt, fs, ts, da, {
          value: fee,
        });
      const tx = await bridge
        .connect(signer)
        .sendInstallment(cid, amt, fs, ts, da, {
          ...gasArgs,
          value: fee,
          gasLimit: sendGas,
        });
      return {
        hash: tx.hash,
        tx: tx,
      };
    },
  };
}
