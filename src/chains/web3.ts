import {
  type ContractTransactionResponse,
  isAddress,
  type Provider,
  type Signer,
} from "ethers";
import type {
  GetApprovedTokenAmount,
  GetBalance,
  GetProvider,
  GetTokenBalance,
  PreTransfer,
  SendInstallment,
  ValidateAddress,
} from ".";
import {
  FTBridge__factory,
  WrappedERC20__factory,
} from "../contracts/evm/typechain-types";
import type { PayableOverrides } from "../contracts/evm/typechain-types/common";

export type Web3Helper = GetBalance &
  GetProvider<Provider> &
  SendInstallment<Signer, ContractTransactionResponse, PayableOverrides> &
  ValidateAddress &
  GetTokenBalance &
  GetApprovedTokenAmount &
  PreTransfer<Signer, PayableOverrides>;

export interface Web3Params {
  provider: Provider;
  contract: string;
}

export function web3Helper({ provider, contract }: Web3Params): Web3Helper {
  const bridge = FTBridge__factory.connect(contract, provider);
  return {
    preTransfer: async (signer, tid, amt, gasArgs) => {
      const approved = await WrappedERC20__factory.connect(tid, signer).approve(
        contract,
        amt,
        gasArgs
      );
      return approved.hash;
    },
    getApprovedAmount: async (tid, owner) =>
      await WrappedERC20__factory.connect(tid, provider).allowance(
        owner,
        bridge
      ),
    balance: (addr) => provider.getBalance(addr),
    provider: () => provider,
    validateAddress: (addr) => Promise.resolve(isAddress(addr)),
    tokenBalance: async (tkn, addr) =>
      WrappedERC20__factory.connect(tkn, provider).balanceOf(addr),
    sendInstallment: async (signer, amt, cid, ts, da, gasArgs) => {
      const tx = await bridge.connect(signer).sendInstallment(
        {
          chainId: cid,
          amount: amt,
          destinationAddress: da,
          tokenSymbol: ts,
        },
        { ...gasArgs }
      );
      return {
        tx: tx,
        hash: tx.hash,
      };
    },
  };
}
