/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Interface, type ContractRunner } from "ethers";
import type {
  IBridgeContract,
  IBridgeContractInterface,
} from "../../../contracts/BridgeComponents/IBridgeContract";

const _abi = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "bytes32",
        name: "txId",
        type: "bytes32",
      },
      {
        indexed: false,
        internalType: "uint16",
        name: "fromChain",
        type: "uint16",
      },
      {
        indexed: false,
        internalType: "uint16",
        name: "toChain",
        type: "uint16",
      },
      {
        indexed: false,
        internalType: "string",
        name: "tokenSymbol",
        type: "string",
      },
      {
        indexed: false,
        internalType: "address",
        name: "toAddress",
        type: "address",
      },
    ],
    name: "ReceivedInstallment",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "bytes32",
        name: "txId",
        type: "bytes32",
      },
      {
        indexed: false,
        internalType: "uint16",
        name: "fromChain",
        type: "uint16",
      },
      {
        indexed: false,
        internalType: "uint16",
        name: "toChain",
        type: "uint16",
      },
      {
        indexed: false,
        internalType: "string",
        name: "tokenSymbol",
        type: "string",
      },
      {
        indexed: false,
        internalType: "string",
        name: "toAddress",
        type: "string",
      },
    ],
    name: "SendInstallment",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "txId",
        type: "bytes32",
      },
      {
        components: [
          {
            internalType: "uint256",
            name: "amount",
            type: "uint256",
          },
          {
            internalType: "uint16",
            name: "chainId",
            type: "uint16",
          },
          {
            internalType: "string",
            name: "tokenSymbol",
            type: "string",
          },
          {
            internalType: "address payable",
            name: "destinationAddress",
            type: "address",
          },
        ],
        internalType: "struct BridgeStorage.InstallmentIn",
        name: "params",
        type: "tuple",
      },
    ],
    name: "receiveInstallment",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "amount",
            type: "uint256",
          },
          {
            internalType: "uint16",
            name: "chainId",
            type: "uint16",
          },
          {
            internalType: "string",
            name: "tokenSymbol",
            type: "string",
          },
          {
            internalType: "string",
            name: "destinationAddress",
            type: "string",
          },
        ],
        internalType: "struct BridgeStorage.InstallmentOut",
        name: "params",
        type: "tuple",
      },
    ],
    name: "sendInstallment",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
] as const;

export class IBridgeContract__factory {
  static readonly abi = _abi;
  static createInterface(): IBridgeContractInterface {
    return new Interface(_abi) as IBridgeContractInterface;
  }
  static connect(
    address: string,
    runner?: ContractRunner | null,
  ): IBridgeContract {
    return new Contract(address, _abi, runner) as unknown as IBridgeContract;
  }
}
