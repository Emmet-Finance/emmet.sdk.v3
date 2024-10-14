import {
  BigNumberish,
  type ContractTransactionResponse,
  isAddress,
  JsonRpcProvider,
  type Overrides,
  type Provider,
  type Signer,
} from "ethers";
import {
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
  EStrategy,
  TStrategy,
  GetSwapResultAmount,
  strategyMap,
  SendParams,
} from ".";
import {
  EmmetAddressBook__factory,
  EmmetBridge__factory,
  EmmetData__factory,
  EmmetLP__factory,
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
  addressBook: string;
  chainId?: BigNumberish,
  chainName: string;
  nativeCoin: string;
  rpcs: readonly string[];
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
      const lp = EmmetLP__factory.connect(pool, signer);
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
      const ccts = await data.getStrategy(
        targetChain,
        fromSymbol,
        targetSymbol,
      );

      const outgoing: TStrategy[] = [];
      const incoming: TStrategy[] = [];
      const foreign: TStrategy[] = [];

      const map = [
        { strategies: ccts.outgoing, targetArray: outgoing },
        { strategies: ccts.incoming, targetArray: incoming },
        { strategies: ccts.foreign, targetArray: foreign }
      ]

      for (const { strategies, targetArray } of map) {
        for (const strat of strategies) {
          const strategyName: TStrategy = strategyMap[BigInt(strat).toString()] as TStrategy;
          if (strategyName) {
            targetArray.push(strategyName);
          }
        }
      }

      return {
        outgoing,
        incoming,
        foreign,
      };
    },
    withdrawLiquidity: async (signer, pool, amt, ga) => {
      const lp = EmmetLP__factory.connect(pool, signer);
      const withdraw = await lp.withdrawTokens(amt, { ...ga });
      return {
        hash: withdraw.hash,
        tx: withdraw,
      };
    },
    withdrawFees: async (signer, pool, ga) => {
      const lp = EmmetLP__factory.connect(pool, signer);
      const withdraw = await lp.withdrawFees({ ...ga });
      return {
        hash: withdraw.hash,
        tx: withdraw,
      };
    },
    getLpCurrentAPY: async (pool) => {
      const lp = EmmetLP__factory.connect(pool, await fetchProvider());
      const apy = await lp.currentAPY();
      return apy;
    },
    getLpTotalSupply: async (pool) => {
      const lp = EmmetLP__factory.connect(pool, await fetchProvider());
      const totalSupply = await lp.totalSupply();
      return totalSupply;
    },
    getLpTokenFee: async (pool) => {
      const lp = EmmetLP__factory.connect(pool, await fetchProvider());
      const tokenFee = await lp.tokenFee();
      return tokenFee;
    },
    getLpProtocolFee: async (pool) => {
      const lp = EmmetLP__factory.connect(pool, await fetchProvider());
      const protocolFee = await lp.protocolFee();
      return protocolFee;
    },
    getLpProtocolFeeAmount: async (pool) => {
      const lp = EmmetLP__factory.connect(pool, await fetchProvider());
      const protocolFeeAmount = await lp.protocolFeeAmount();
      return protocolFeeAmount;
    },
    getLpProviderRewards: async (pool, address) => {
      const lp = EmmetLP__factory.connect(pool, await fetchProvider());
      const providerRewards = await lp.getProviderRewards(address);
      return providerRewards;
    },
    getLpFeeGrowthGlobal: async (pool) => {
      const lp = EmmetLP__factory.connect(pool, await fetchProvider());
      const feeGrowthGlobal = await lp.feeGrowthGlobal();
      return feeGrowthGlobal;
    },
    getLpFeeDecimals: async (pool) => {
      const lp = EmmetLP__factory.connect(pool, await fetchProvider());
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
      const isFeeERC20: boolean = false;
      const protocolFee = await bridge.estimateFee(
        targetChainId,
        fromToken,
        targetToken,
        isFeeERC20
      );
      return protocolFee;
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
          bridge.interface.getEvent("SentInstallment").topicHash,
        ),
      );
      if (!log)
        throw new Error(`No send installment log found for tx hash: ${hash}`);
      const decode = bridge.interface.parseLog(log);
      return decode?.args.txHash;
    },
    protocolFee() {
      return 50n; // data.getProtocolFee();
    },
    async token(symbol) {
      const token = await data.getToken(symbol);
      return token;
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

      const ts = await data.getStrategy(
        targetChain,
        fromToken,
        targetToken,
      );

      const outgoing = ts[0];
      const foreign = ts[1];

      const cctpBurn: bigint = BigInt(EStrategy.CCTPClaim);
      const cctpClaim: bigint = BigInt(EStrategy.CCTPClaim);

      const isCCTP =
        foreign.includes(cctpBurn) ||
        foreign.includes(cctpClaim) ||
        outgoing.includes(cctpBurn) ||
        outgoing.includes(cctpClaim);

      if (isCCTP) {
        // 2 minutes
        const timeInMs = (2n * 60n) * 1000n;
        return timeInMs;
      }
      return undefined;
    },

    async isTransferFromLp(targetChain, fromToken, targetToken) {
      const ts = await data.getStrategy(
        targetChain,
        fromToken,
        targetToken,
      );
      const _isTransferFromLp = ts[1].includes(7n);
      return _isTransferFromLp;
    },
    protocolFeeInUSD:  () => {
      // const fee = await data.protocolFee();
      // return fee.usdEquivalent;
      return 50n;
    },
    validateAddress: (addr) => Promise.resolve(isAddress(addr)),
    tokenBalance: async (tkn, addr) =>
      WrappedERC20__factory.connect(tkn, await fetchProvider()).balanceOf(addr),
    sendInstallment: async (signer, amt, cid, fs, ts, da, fee, gasArgs) => {

      const params: SendParams = {
        blockNumber: 0n, // populated by the contract
        isFeeERC20: false, // will add support later
        sentAmount: amt,
        receiveAmount: amt,
        toChainId: cid,
        fromToken: fs,
        toToken: ts,
        to: da,
        isSuccess: true
      }

      const sendGas = await bridge
        .connect(signer)
        .sendInstallment.estimateGas(params, {
          value: fee,
        });
        
      const tx = await bridge
        .connect(signer)
        .sendInstallment(params, {
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
