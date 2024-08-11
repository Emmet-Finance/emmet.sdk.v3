# Emmet Lock-n-Mint Client Library

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
    console.log(token)
    ...
})()
```
