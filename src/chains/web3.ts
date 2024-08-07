import {
  type ContractTransactionResponse,
  isAddress,
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
  IsTransferFomLp,
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
  IsTransferFomLp;

export interface Web3Params {
  provider: Provider;
  addressBook: string;
  chainName: string;
  nativeCoin: string;
}

export async function web3Helper({
  provider,
  addressBook,
  chainName,
  nativeCoin,
}: Web3Params): Promise<Web3Helper> {
  const addrBook = EmmetAddressBook__factory.connect(addressBook, provider);
  const bridgeAddr = await addrBook.get("EmmetBridge");
  const emmetData = await addrBook.get("EmmetData");
  const bridge = EmmetBridge__factory.connect(bridgeAddr, provider);
  const data = EmmetData__factory.connect(emmetData, provider);
  return {
    id: async () => (await provider.getNetwork()).chainId,
    stakeLiquidity: async (signer, pool, amt, ga) => {
      const lp = EmmetLPV2__factory.connect(pool, signer);
      const deposit = await lp.deposit(amt, { ...ga });
      return {
        hash: deposit.hash,
        tx: deposit,
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
      const lp = EmmetLPV2__factory.connect(pool, provider);
      const apy = await lp.currentAPY();
      return apy;
    },
    getLpTotalSupply: async (pool) => {
      const lp = EmmetLPV2__factory.connect(pool, provider);
      const totalSupply = await lp.totalSupply();
      return totalSupply;
    },
    getLpTokenFee: async (pool) => {
      const lp = EmmetLPV2__factory.connect(pool, provider);
      const tokenFee = await lp.tokenFee();
      return tokenFee;
    },
    getLpProtocolFee: async (pool) => {
      const lp = EmmetLPV2__factory.connect(pool, provider);
      const protocolFee = await lp.protocolFee();
      return protocolFee;
    },
    getLpProtocolFeeAmount: async (pool) => {
      const lp = EmmetLPV2__factory.connect(pool, provider);
      const protocolFeeAmount = await lp.protocolFeeAmount();
      return protocolFeeAmount;
    },
    getLpProviderRewards: async (pool, address) => {
      const lp = EmmetLPV2__factory.connect(pool, provider);
      const providerRewards = await lp.getProviderRewards(address);
      return providerRewards;
    },
    getLpFeeGrowthGlobal: async (pool) => {
      const lp = EmmetLPV2__factory.connect(pool, provider);
      const feeGrowthGlobal = await lp.feeGrowthGlobal();
      return feeGrowthGlobal;
    },
    getLpFeeDecimals: async (pool) => {
      const lp = EmmetLPV2__factory.connect(pool, provider);
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
      const receipt = await provider.waitForTransaction(hash);
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
      return Number(await ERC20__factory.connect(pool, provider).decimals());
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
      await WrappedERC20__factory.connect(tid, provider).allowance(
        owner,
        spender,
      ),
    balance: (addr) => provider.getBalance(addr),
    provider: () => provider,
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
      WrappedERC20__factory.connect(tkn, provider).balanceOf(addr),
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
