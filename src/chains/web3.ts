import {
  type ContractTransactionResponse,
  isAddress,
  type Provider,
  type Signer,
} from "ethers";
import type {
  AddressBook,
  ChainName,
  GetApprovedTokenAmount,
  GetBalance,
  GetProvider,
  GetTokenBalance,
  NativeCoinName,
  PreTransfer,
  SendInstallment,
  TokenInfo,
  ValidateAddress,
} from ".";
import { EmmetAddressBook__factory, EmmetBridge__factory, EmmetData__factory, WrappedERC20__factory } from "@emmet-contracts/web3";
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
  AddressBook & TokenInfo;

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
    async address(contr) {
      return await addrBook.get(contr);
    },
    async token(symbol) {
      const token = await data.getToken(symbol)
      return {
        address: token.addr,
        swap: token.swap,
        decimals: token.decimals,
        fee: token.fee,
        feeDecimals: token.feeDecimals,
        symbol: token.symbol
      }
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
      const tx = await bridge.connect(signer).sendInstallment(cid, amt, fs, ts, da,
        { ...gasArgs },
      );
      return {
        tx: tx,
        hash: tx.hash,
      };
    },
  };
}
