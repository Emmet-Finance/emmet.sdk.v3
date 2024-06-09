import {
  type ContractTransactionResponse,
  isAddress,
  type Provider,
  type Signer,
} from "ethers";
import type {
  AddressBook,
  ChainID,
  ChainName,
  FetchTxInfo,
  GetApprovedTokenAmount,
  GetBalance,
  GetProvider,
  GetTokenBalance,
  GetTxFee,
  NativeCoinName,
  PreTransfer,
  ProtocolFee,
  SendInstallment,
  TokenInfo,
  ValidateAddress,
} from ".";
import {
  EmmetAddressBook__factory,
  EmmetBridge__factory,
  EmmetData__factory,
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
  ProtocolFee;

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
    async address(contr) {
      return await addrBook.get(contr);
    },
    async txFee(targetChainId, fromToken, targetToken) {
      const protocolFee = await data.protocolFee();
      const ffc = await data.getForeignFeeCompensation(
        targetChainId,
        fromToken,
        targetToken,
      );
      return protocolFee.usdEquivalent + ffc;
    },
    async txInfo(hash) {
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
      } catch (_) {
        return {
          timestamp: 0n,
          value: 0n,
        };
      }
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
    nativeCoin: () => nativeCoin,
    chainName: () => chainName,
    preTransfer: async (signer, tid, amt, gasArgs) => {
      const approved = await WrappedERC20__factory.connect(tid, signer).approve(
        bridge,
        amt,
        gasArgs,
      );
      return approved.hash;
    },

    getApprovedAmount: async (tid, owner) =>
      await WrappedERC20__factory.connect(tid, provider).allowance(
        owner,
        bridge,
      ),
    balance: (addr) => provider.getBalance(addr),
    provider: () => provider,
    validateAddress: (addr) => Promise.resolve(isAddress(addr)),
    tokenBalance: async (tkn, addr) =>
      WrappedERC20__factory.connect(tkn, provider).balanceOf(addr),
    sendInstallment: async (signer, amt, cid, fs, ts, da, gasArgs) => {
      const tx = await bridge
        .connect(signer)
        .sendInstallment(cid, amt, fs, ts, da, { ...gasArgs });
      return {
        hash: tx.hash,
        tx: tx,
      };
    },
  };
}
