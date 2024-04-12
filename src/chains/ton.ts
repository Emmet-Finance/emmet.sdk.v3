import {
  Address,
  beginCell,
  JettonMaster,
  JettonWallet,
  type OpenedContract,
  type Sender,
  toNano,
  type TonClient,
} from "@ton/ton";
import type {
  GetBalance,
  GetProvider,
  GetTokenBalance,
  SendInstallment,
  ValidateAddress,
} from ".";
import { Bridge } from "../contracts/ton";
import { sha256_sync } from "@ton/crypto";

export type TonHelper = GetBalance &
  GetProvider<TonClient> &
  SendInstallment<Sender, undefined> &
  ValidateAddress &
  GetTokenBalance;

export interface TonParams {
  client: TonClient;
  bridge: Address;
  nativeTokenId: bigint;
}

export function tonHandler({
  client,
  bridge,
  nativeTokenId,
}: TonParams): TonHelper {
  const bridgeReader = client.open(Bridge.fromAddress(bridge));
  function transferTon(
    bridge: OpenedContract<Bridge>,
    sender: Sender,
    to: string,
    tokenId: bigint,
    chainId: number,
    amount: bigint,
  ) {
    return bridge.send(
      sender,
      {
        value: toNano("0.8"),
      },
      {
        $$type: "FreezeTon",
        amount: amount,
        target_chain: BigInt(chainId),
        to: beginCell().storeStringRefTail(to).endCell(),
        token_id: tokenId, // Should map to some token in the tokens table
      },
    );
  }

  async function isWrappedToken(tokenId: bigint) {
    const wrapped = await bridgeReader.getWrappedTokens();
    return wrapped.get(tokenId) !== null;
  }

  //@ts-ignore
  async function transferJetton(
    jetton: Address,
    sender: Sender,
    _to: string,
    _tokenId: bigint,
    _chainId: number,
    _amount: bigint,
  ) {
    const jc = client.open(JettonMaster.create(jetton));
    const jwa = await jc.getWalletAddress(sender.address!);
    const jw = client.open(JettonWallet.create(jwa));
    console.log(jw);
  }

  return {
    balance: (addr) => client.getBalance(Address.parse(addr)),
    provider: () => client,
    validateAddress: (addr) => {
      try {
        Address.parse(addr);
        return Promise.resolve(true);
      } catch (e) {
        return Promise.resolve(false);
      }
    },
    tokenBalance: async (token, addr) => {
      const jc = client.open(JettonMaster.create(Address.parse(token)));
      const jwa = await jc.getWalletAddress(Address.parse(addr));
      const jw = client.open(JettonWallet.create(jwa));
      return jw.getBalance();
    },
    sendInstallment: async (signer, amt, cid, tokenSymbol, destAddress) => {
      const bc = client.open(Bridge.fromAddress(bridge));
      const tid = BigInt(`0x${sha256_sync(tokenSymbol).toString("hex")}`);

      if (tid === nativeTokenId) {
        transferTon(bc, signer, destAddress, tid, cid, amt);
      } else if (await isWrappedToken(tid)) {
      } else {
        throw new Error("Need to transfer ");
      }

      return {
        hash: "",
        tx: undefined,
      };
    },
  };
}
