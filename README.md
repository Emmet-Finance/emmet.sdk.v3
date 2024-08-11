# Emmet Cross-Chain Bridge Client Library

All the Emmet.Bridge related data is stored `on-chain`!. Use async / await to fetch it.

NB: To avoid repetition, every variable is set once in the document. If you forgot how to set the variable search for the other occurances in the document above its usage.

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

Getting the token data:

```ts

type TTokenName = 
    'CAVI' 
    | 'DAI'
    | 'GrabClub'
    | 'TON'
    | 'TRT'
    | 'USDC'
    ;

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

### Getting an EVM Signer

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

### Getting a TON signer

```ts
import { useTonAddress, useTonConnectUI } from "@tonconnect/ui-react";
import { Address, Sender, SenderArguments } from "@ton/core";

export function useTonConnect(): {
  sender: Sender;
  connected: boolean;
  hash: string;
} {
  const [tonConnectUI] = useTonConnectUI();
  const address = useTonAddress();

  return {
    sender: {
      // @ts-ignore
      send: async (args: SenderArguments) => {
        await tonConnectUI.sendTransaction({
          messages: [
            {
              address: args.to.toString(),
              amount: args.value.toString(),
              payload: args.body?.toBoc().toString("base64"),
            },
          ],
          validUntil: Date.now() + 5 * 60 * 1000, // 5 minutes for user to approve
        });
        return 0;
      },
      address: address ? Address.parse(address) : undefined,
    },
    connected: tonConnectUI.connected,
  };
}
```

### Transferring tokens

```ts
export const SUPPORTED_CHAINS = { ...MAINNETS, ...TESTNETS };
export type TChainName = keyof typeof SUPPORTED_CHAINS;
export const ChainToDestinationDomain: { [key in TChainName]: number } = {
    // CCTP unsupported chains
  ethereum: 0,
  sepolia: 0,
  avalanche: 1,
  avalancheFuji: 1,
  optimism: 2,
  optimismSepolia: 2,
  arbitrum: 3,
  arbitrumSepolia: 3,
  bsc: 4,
  bscTestnet: 4,
  base: 6,
  baseSepolia: 6,
  polygon: 7,
  polygonAmoy: 7,
  // Other chains
  ton: 65534,
  tonTestnet: 65535,
  berachainBartio: 80084,
  onlylayerTestnet: 728696,
  solana: 102, // TODO: subject to change
};

(async (
    fromChain: TChainName,
    toChain: TChainName, 
    fromToken: TTokenName, 
    toToken: TTokenName,
    amount: bigint,
    mintRecipient: string // the address of the destination beneficiary
) => {
    ...
    const { sender: tonSender } = useTonConnect();
    // See: https://github.com/Emmet-Finance/websitev2/blob/feat/TON/src/hooks/useBridgeFee.ts
    const { fee } = useBridgeFee();
    const signer = useEthersSigner();

    const fromChainID = ChainToDestinationDomain[toChain];
    const formattedAmount: bigint = amount * 10n ** tokenDecimals;
    const destinationDomain = ChainToDestinationDomain[toChain];

     // TON example:
    if(fromChainID === Chain.TON){
        const handler = await chainFactoryTestnet.inner(fromChainID);
        const { hash } = await chainFactoryTestnet.sendInstallment(
            handler,
            tonSender,
            BigInt(Math.ceil(formattedAmount)),
            destinationDomain,
            fromToken,
            toToken,
            mintRecipient,
        );
        console.log(hash);
    // EVM chains example:
    } else if ( 
          fromChainID === Chain.POLYGON ||
          fromChainID === Chain.ETHEREUM ||
          fromChainID === Chain.BSC ||
          fromChainID === Chain.BERACHAIN ||
          fromChainID === Chain.ONLYLAYER
    ) {
        const handler = await chainFactoryTestnet.inner(fromChainID);

        const { hash } = await chainFactoryTestnet.sendInstallment(
            handler,
            // @ts-ignore
            signer,
            BigInt(Math.ceil(formattedAmount)),
            destinationDomain,
            fromToken,
            toToken,
            mintRecipient,
            {
              value: fee,
            },
          );
          console.log(hash);

    }

})(
    'tonTestnet'
    'sepolia',
    'USDC',
    'USDC',
    10n,
    'your-evm-address'
)   
```