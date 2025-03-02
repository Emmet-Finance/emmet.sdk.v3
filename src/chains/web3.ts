import {
  AbiCoder,
  AddressLike,
  type BigNumberish,
  ContractRunner,
  ContractTransactionResponse,
  isAddress,
  JsonRpcProvider,
  Overrides,
  type Provider,
  Signer,
} from "ethers";
import type {
  TStrategy,
  SendParams,
  TLPData,
  TLPPosition,
} from ".";
import { strategyMap, EStrategy, sleep } from ".";
import {
  Consensus,
  EmmetAddressBook__factory,
  EmmetBridge__factory,
  EmmetData__factory,
  EmmetLP,
  EmmetLP__factory,
  ERC20__factory,
  WrappedERC20__factory,
} from "@emmet-contracts/web3";

import { CrossChainTransaction } from "@emmet-contracts/web3/dist/contracts/consensus/Consensus";
import { getConsensus } from "./getConsensus";
import { Web3Helper, Web3Params } from "./web3helper";

const coder = new AbiCoder();

export async function web3Helper({
  rpcs,
  addressBook,
  chainName,
  nativeCoin,
}: Web3Params): Promise<Web3Helper> {
  const initializedProviders = rpcs.map((e) => new JsonRpcProvider(e));
  const cache: Record<number, Provider> = {};

  /**
   * @returns a random RPC provider
   */
  const fetchProvider = async (): Promise<Provider> => {
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
    } catch {
      await sleep(1000);
      return await fetchProvider();
    }
  };

  // ADDRESS BOOK
  const addrBook = EmmetAddressBook__factory.connect(
    addressBook,
    await fetchProvider(),
  );
  // BRIDGE
  const bridgeAddr = await addrBook.get("EmmetBridge");
  const bridge = EmmetBridge__factory.connect(
    bridgeAddr,
    await fetchProvider(),
  );
  //  CONSENSUS
  const consensus: Consensus = await getConsensus();
  // DATA
  const emmetData = await addrBook.get("EmmetData");
  const data = EmmetData__factory.connect(emmetData, await fetchProvider());

  //          F U N C T I O N S
  // -------------------------------------
  async function getAddressByName(name: string): Promise<string> {
    let address: string = "";
    try {
      address = await addrBook.get(name);
    } catch (error: { message: string } | any) {
      throw new Error("Emmet.SDK getAddressByName: " + error.message);
    }
    return address;
  }
  // -------------------------------------
  async function getLpByName(poolName: string, signer?: ContractRunner | null): Promise<EmmetLP | undefined> {
    let lp: EmmetLP | undefined = undefined;
    try {
      const lpAddress: string = await getAddressByName(poolName);
      lp = EmmetLP__factory.connect(
        lpAddress,
        signer ? signer : await fetchProvider(),
      ) as EmmetLP;

    } catch (error: { message: string } | any) {
      throw new Error("Emmet.SDK getLpByName: " + error.message);
    }
    return lp;

  }
  // -------------------------------------
  function formatedPoolName(poolName: string): string {
    return poolName.includes("elp")
      ? poolName
      : `elp${poolName}`;
  }

  return {
    // -----------------------------------------------------------------
    //                          C O M M O N
    // -----------------------------------------------------------------
    async address(contr: string) {
      return await addrBook.get(contr);
    },
    // -----------------------------------------------------------------
    async bridge() {
      return await bridge.getAddress();
    },
    // -----------------------------------------------------------------
    id: async () => (await (await fetchProvider()).getNetwork()).chainId,
    // -----------------------------------------------------------------
    async crossChainStrategy(targetChain: BigNumberish, fromSymbol: string, targetSymbol: string) {

      const outgoing: TStrategy[] = [];
      const incoming: TStrategy[] = [];
      const foreign: TStrategy[] = [];

      try {

        const ccts = await data.getStrategy(
          targetChain,
          fromSymbol,
          targetSymbol,
        );

        const map = [
          { strategies: ccts.outgoing, targetArray: outgoing },
          { strategies: ccts.incoming, targetArray: incoming },
          { strategies: ccts.foreign, targetArray: foreign }
        ];

        for (const { strategies, targetArray } of map) {
          for (const strat of strategies) {
            const strategyName: TStrategy = strategyMap[BigInt(strat).toString()] as TStrategy;
            if (strategyName) {
              targetArray.push(strategyName);
            }
          }
        }

      } catch (error) {

      }

      return {
        outgoing,
        incoming,
        foreign,
      };
    },
    // -----------------------------------------------------------------
    parseCallData: (encoded: string) => {
      if (encoded.slice(0, 10).toLowerCase() == "0x3ba81aee") {
        try {
          const result = coder.decode(
            [
              "bytes32",
              "tuple(uint256,uint256,uint256,uint256,uint256,uint256,uint128,uint128,string,string,string,bytes)"
            ],
            "0x" + encoded.slice(10,)
          );

          const {
            0: blockNumber,
            1: foreignIndexOut,
            2: value,
            3: timestamp,    // Assuming timestamp is the 4th parameter
            4: sentAmount,
            5: receiveAmount,
            6: fromChainId,
            7: toChainId,
            8: to,
            9: fromToken,
            10: toToken,
            11: data
          } = result[1];

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

        } catch (error) {
          console.log(error)
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
    validateAddress: (addr: string) => Promise.resolve(isAddress(addr)),
    // -----------------------------------------------------------------
    getTokenAddress: async (symbol: string): Promise<string> => {
      const address = await addrBook.get(symbol);
      return address ? address : "";
    },
    // -----------------------------------------------------------------
    tokenBalance: async (tkn: string, addr: AddressLike) =>
      WrappedERC20__factory.connect(tkn, await fetchProvider()).balanceOf(addr),
    // -----------------------------------------------------------------
    async txInfo(hash: string) {
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

    // -----------------------------------------------------------------
    protocolFee() {
      return Promise.resolve(50n); // data.getProtocolFee();
    },
    // -----------------------------------------------------------------
    async token(symbol: string) {
      const token = await data.getToken(symbol);
      return token;
    },
    // -----------------------------------------------------------------
    decimals: async (pool: string | undefined) => {
      if (!pool) return 18;
      return Number(
        await ERC20__factory.connect(pool, await fetchProvider()).decimals(),
      );
    },
    // -----------------------------------------------------------------
    nativeCoin: () => nativeCoin,
    // -----------------------------------------------------------------
    chainName: () => chainName,
    // -----------------------------------------------------------------
    getApprovedAmount: async (
      tid: string,
      owner: AddressLike,
      spender: AddressLike
    ) =>
      await WrappedERC20__factory.connect(tid, await fetchProvider()).allowance(
        owner,
        spender,
      ),
    // -----------------------------------------------------------------
    balance: async (addr: AddressLike) => (await fetchProvider()).getBalance(addr),
    // -----------------------------------------------------------------
    provider: async () => await fetchProvider(),
    // -----------------------------------------------------------------
    async estimateTime(targetChain: BigNumberish, fromToken: string, targetToken: string) {
      // Default time
      let estimation: bigint = 2n * 60n * 1000n;

      try {

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
          // 3 minutes
          estimation = (3n * 60n) * 1000n;
        } else {
          // 1 minute
          estimation = (1n * 60n) * 1000n;
        }

      } catch (error) {
        console.warn(error)
      }

      return estimation;
    },

    // -----------------------------------------------------------------
    //                  L I Q U D I T Y  P O O L
    // -----------------------------------------------------------------
    async getLpData(poolName) {
      let data: TLPData = {
        $$type: "LPData",
        apy: 0n,
        available_underlying: 0n,
        decimals: 0n,
        fee_growth_global: 0n,
        fee_decimals: 0n,
        protocol_fee: 0n,
        protocol_fee_amount: 0n,
        token_fee: 0n,
        total_supply: 0n,
      }
      try {
        const lp = await getLpByName(formatedPoolName(poolName));
        // Use a fallback value to ensure type safety
        const lpData = await lp?.getData();
        if (lpData) {
          data = {
            $$type: "LPData", // Set the required value for $$type
            apy: lpData.apy,
            available_underlying: lpData.availableUnderlying,
            decimals: lpData.tokenDecimals,
            fee_growth_global: lpData.globalRewards,
            fee_decimals: lpData.feesDecimals,
            protocol_fee: lpData.communityFee,
            protocol_fee_amount: lpData.stakerFee,
            token_fee: lpData.stakerFee, // Adjust as needed
            total_supply: lpData.supply,
          };
        }

      } catch (error: any | { message: string }) {
        console.warn("Emmet.SDK getLpData " + error.message);
        await sleep(1000);

      }
      return data;
    },
    // -----------------------------------------------------------------
    async getRewards(poolName, staker): Promise<bigint> {
      let rewards: bigint = 0n;
      try {
        const lp = await getLpByName(formatedPoolName(poolName));
        rewards = await lp?.getProviderRewards(staker) as bigint;
      } catch (error: any | { message: string }) {
        console.warn("Emmet.SDK getRewards " + error.message);
      }
      return rewards;
    },
    // -----------------------------------------------------------------
    async getPosition(poolName, staker) {
      let position: TLPPosition = {
        "$$type": "Position",
        balance: 0n,
        last_fee_growth: 0n,
        rewards: 0n
      }

      try {
        const lp = await getLpByName(formatedPoolName(poolName));
        const lpPosition = await lp?.getPosition(staker);
        if (lpPosition) {
          position = {
            ...position,
            balance: lpPosition.balance,
            last_fee_growth: lpPosition.internalFeeGrowth,
            rewards: lpPosition.rewards
          }
        }
      } catch (error: any | { message: string }) {
        console.warn("Emmet.SDK getPosition " + error.message);
      }

      return position;
    },
    // -----------------------------------------------------------------
    async stakeToken(poolName, signer, amount, gasArgs) {
      let result: ContractTransactionResponse | undefined;
      try {
        const lp = await getLpByName(formatedPoolName(poolName), signer);
        result = await lp?.deposit(amount, { ...gasArgs });
      } catch (error: any | { message: string }) {
        console.warn("Emmet.SDK stakeToken " + error.message);
      }
      return result;
    },
    // -----------------------------------------------------------------
    async stakeCoin(signer, amount) {
      let result: ContractTransactionResponse | undefined;
      try {
        const lp = await getLpByName(formatedPoolName(nativeCoin), signer);
        result = await lp?.deposit(amount);
      } catch (error: any | { message: string }) {
        console.warn("Emmet.SDK stakeCoin " + error.message);
      }
      return result;
    },
    // -----------------------------------------------------------------
    stakeLiquidity: async ( // DEPRECATED (to be removed)
      signer: Signer,
      pool: string,
      amount: bigint,
      ga: Overrides | undefined
    ) => {
      const lp = EmmetLP__factory.connect(pool, signer);
      const deposit = await lp.deposit(amount, { ...ga });
      return {
        hash: deposit.hash,
        tx: deposit,
      };
    },
    // -----------------------------------------------------------------
    withdrawLiquidity: async (signer: any, pool: string, amt: BigNumberish, ga: any) => {
      const lp = EmmetLP__factory.connect(pool, signer);
      const withdraw = await lp.withdrawTokens(amt, { ...ga });
      return {
        hash: withdraw.hash,
        tx: withdraw,
      };
    },
    // -----------------------------------------------------------------
    withdrawFees: async (signer: any, pool: string, ga: any) => {
      const lp = EmmetLP__factory.connect(pool, signer);
      const withdraw = await lp.withdrawFees({ ...ga });
      return {
        hash: withdraw.hash,
        tx: withdraw,
      };
    },
    // -----------------------------------------------------------------
    getLpCurrentAPY: async (pool: string) => {
      const lp = EmmetLP__factory.connect(pool, await fetchProvider());
      const apy = await lp.currentAPY();
      return apy;
    },
    // -----------------------------------------------------------------
    getLpTotalSupply: async (pool: string) => {
      const lp = EmmetLP__factory.connect(pool, await fetchProvider());
      const totalSupply = await lp.totalSupply();
      return totalSupply;
    },
    // -----------------------------------------------------------------
    getLpTokenFee: async (pool: string) => {
      const lp = EmmetLP__factory.connect(pool, await fetchProvider());
      const tokenFee = await lp.tokenFee();
      return tokenFee;
    },
    getLpProtocolFee: async (pool: string) => {
      const lp = EmmetLP__factory.connect(pool, await fetchProvider());
      const protocolFee = await lp.protocolFee();
      return protocolFee;
    },
    // -----------------------------------------------------------------
    getLpProtocolFeeAmount: async (pool: string) => {
      const lp = EmmetLP__factory.connect(pool, await fetchProvider());
      const protocolFeeAmount = await lp.protocolFeeAmount();
      return protocolFeeAmount;
    },
    // -----------------------------------------------------------------
    getLpFeeGrowthGlobal: async (pool: string) => {
      const lp = EmmetLP__factory.connect(pool, await fetchProvider());
      const feeGrowthGlobal = await lp.feeGrowthGlobal();
      return feeGrowthGlobal;
    },
    // -----------------------------------------------------------------
    getLpFeeDecimals: async (pool: string) => {
      const lp = EmmetLP__factory.connect(pool, await fetchProvider());
      const feeDecimals = await lp.feeDecimals();
      return feeDecimals;
    },
    // -----------------------------------------------------------------
    async isTransferFromLp(
      targetChain: BigNumberish,
      fromToken: string,
      targetToken: string
    ) {
      const ts = await data.getStrategy(
        targetChain,
        fromToken,
        targetToken,
      );
      const _isTransferFromLp = ts[1].includes(7n);
      return _isTransferFromLp;
    },
    // -----------------------------------------------------------------
    //                  E X P L O R E R   R E L A T E D
    // -----------------------------------------------------------------
    findTransactionByFromHash: async (hash: string) => {
      try {
        const TXs: CrossChainTransaction.CCTStructOutput[] = await consensus.getTransactions(100, 0);
        const filtered: CrossChainTransaction.CCTStructOutput[] | undefined =
          TXs.filter(tx => tx.originalHash == hash.replace('0x', ''));
        return filtered[0];
      } catch (error) {
        return undefined;
      }
    },
    // -----------------------------------------------------------------
    getConsensusTransaction: async (hash: string) => {
      try {
        const TX: CrossChainTransaction.CCTStructOutput = await consensus.getTransaction(hash);
        return TX;
      } catch (error) {
        return undefined;
      }

    },
    // -----------------------------------------------------------------
    async emmetHashFromtx(hash: string) {

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
    // -----------------------------------------------------------------
    //                  B R I D G E   R E L A T E D
    // -----------------------------------------------------------------
    preTransfer: async (
      signer: ContractRunner | null,
      tid: string,
      spender: AddressLike,
      amt: BigNumberish,
      gasArgs: any
    ) => {
      const erc = WrappedERC20__factory.connect(tid, signer);
      try {
        
      } catch (error) {
        
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
    sendInstallment: async (
      signer: ContractRunner | null,
      amt: bigint,
      cid: bigint,
      fs: string,
      ts: string,
      da: string,
      fee: bigint | undefined,
      gasArgs: any,
    ) => {

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

      try {
        let sendGas = await bridge
          .connect(signer)
          .sendInstallment.estimateGas(params, {
            value: fee! * 11n / 10n,
          });

        const provider = await fetchProvider();
        // @ts-ignore
        const userBalance = await provider.getBalance(signer);

        if (sendGas > userBalance) {
          return {
            hash: "Insufficient funds",
            tx: "ERROR" as unknown as ContractTransactionResponse
          }
        }

        const tx = await bridge
          .connect(signer)
          .sendInstallment(params, {
            ...gasArgs,
            value: fee! * 11n / 10n,
            gasLimit: sendGas,
          });

        return {
          hash: tx.hash,
          tx: tx,
        };
      } catch (error:any) {
        if(error && error.shortMessage){
          console.warn("Emmet.SDK", error)
          const msgParts = error.shortMessage.split(":");
          return {
            hash: msgParts[msgParts.length - 1].replace('"', ""),
            tx: "ERROR" as unknown as ContractTransactionResponse
          }
        } else {
          return {
            hash: "Transfer failed. Reason unknown.",
            tx: "ERROR" as unknown as ContractTransactionResponse
          }
        }
      }

    },
    // -----------------------------------------------------------------
    async txFee(targetChainId: BigNumberish, fromToken: string, targetToken: string) {
      const isFeeERC20: boolean = false;
      const protocolFee = await bridge.estimateFee(
        targetChainId,
        fromToken,
        targetToken,
        isFeeERC20
      );
      return protocolFee;
    },
    // -----------------------------------------------------------------
    //                    S W A P  R E L A T E D
    // -----------------------------------------------------------------
    async getSwapResultAmount(
      _fromSymbol: any,
      _targetSymbol: any,
      amount: BigNumberish,
      _slippage: any
    ) {
      return BigInt(amount);
    },

  };
}
