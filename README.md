# Emmet Cross-Chain Bridge Client Library

All the Emmet.Bridge related data is stored `on-chain`!. Use async / await to fetch it.

## Library installation

Go to https://github.com/Emmet-Finance/emmet.sdk.v3/tree/dist and check the hash of the last commit.

For example: https://github.com/Emmet-Finance/emmet.sdk.v3/commit/011d4f7783f6c3771f36ec0aa4ecc3cbfe4f2344

Install or update the library in your environment to the last commit:

```bash
yarn add "git+https://github.com/Emmet-Finance/emmet.sdk.v3#011d4f7783f6c3771f36ec0aa4ecc3cbfe4f2344"
```
or
```bash
npm install "git+https://github.com/Emmet-Finance/emmet.sdk.v3#011d4f7783f6c3771f36ec0aa4ecc3cbfe4f2344"
```

## Import

Importing the chain Factories:

```ts
import { ChainFactoryBuilder, ChainFactoryConfigs } from "emmet.js/dist";
import { ChainFactory } from "emmet.js/dist/factory/types";

export const chainFactoryTestnet: ChainFactory = await ChainFactoryBuilder(
  // Switch between Mainnet & testnet
  ChainFactoryConfigs.TestNet(),
);
```

## Usage

### Getting the current chain handler

```ts
import {Chain} from "emmet.js/dist/factory/types";
import { chainFactoryTestnet } from "./your-path-to/chainFactory";

// Same for Mainnets & Testnets

(async () => {
    ...
    const berachain = await chainFactoryTestnet.inner(Chain.BERACHAIN);
    const ethereum  = await chainFactoryTestnet.inner(Chain.ETHEREUM);
    const onlylayer = await chainFactoryTestnet.inner(Chain.ONLYLAYER);
    const polygon   = await chainFactoryTestnet.inner(Chain.POLYGON);
    const ton       = await chainFactoryTestnet.inner(Chain.TON);
    ...
})()
```

### Getting token data

Currently supported tokens:

- $CAVI or CAVI (partner project)
- DAI (AAVE liquidity)
- GrabClub (on Ton chain)
- TON (native Ton chain currency)
- TRT (Ston.fi Test RED Token)
- USDC (Circle)

Getting the token data:

```ts
type TToken {
    address:     string,    // the token contract address
    swap?:       string,    // will be deprecated soon
    decimals:    bigint,    // token decimals, ex. 6 or 18
    symbol:      string,    // The short name, ex. USDC
    fee:         bigint,    // the token fee if liquidity pool is involved
    feedecimals: bigint,    // the fee decimals, usually 6
}

(async () => {
    ...
    const tokenSymbol: string = "USDC";
    const token: TToken = await handler.token(tokenSymbol);
    console.log(token);
    const tokenAddress:     string = token.address;
    const tokenDecimals:    bigint = token.decimals;
    ...
})()
```

### Getting Token allowance

If token allowance is less than the amount intended to be bridged, the transfer will fail.

```ts
(async () => {

    const bridgeAddress: string = await handler.bridge();

    const allowance: bigint = await handler.getApprovedAmount(
        token.address,
        bridge.senderAddress,
        bridgeAddress
    );

    console.log(allowance);

})()
```

### getting an EVM Signer

To trigger user signature generate a signer object

```ts
import { BrowserProvider, JsonRpcSigner } from "ethers";
import { useMemo } from "react";
import type { Account, Chain, Client, Transport } from "viem";
import { type Config, useConnectorClient } from "wagmi";

export function clientToSigner(client: Client<Transport, Chain, Account>) {
  const { account, chain, transport } = client;
  const network = {
    chainId: chain.id,
    name: chain.name,
    ensAddress: chain.contracts?.ensRegistry?.address,
  };
  const provider = new BrowserProvider(transport, network);
  const signer = new JsonRpcSigner(provider, account.address);
  return signer;
}

/** Hook to convert a viem Wallet Client to an ethers.js Signer. */
export function useEthersSigner({ chainId }: { chainId?: number } = {}) {
  const { data: client } = useConnectorClient<Config>({ chainId });
  return useMemo(() => (client ? clientToSigner(client) : undefined), [client]);
}
```

### Approving (only relevant for EVM chains)

To avoid transfer failure, the amount must be approved

```ts
import { useEthersSigner } from "./useEthersSigner";
import { AddressBookKeys } from "emmet.js";

(async () => {
    ...
    const bridgeAddress: string = await handler.bridge();

    const signer = useEthersSigner();

    const amountToApprove: bigint = 10; // update to your amount

    const formattedAmount: bigint = amountToApprove * 10n ** tokenDecimals;

    // Some non-Evm chains don't have approval, ut have pre-transfer
    // The SDK function is called so for compatibility with them all
    await chainFactoryTestnet.preTransfer(
          // @ts-ignore
          handler,
          signer,
          tokenAddress,
          bridgeAddress,
          BigInt(Math.ceil(formattedAmount)),
          {},
        );

    ...

})()
```