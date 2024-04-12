/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import {
  Contract,
  ContractFactory,
  ContractTransactionResponse,
  Interface,
} from "ethers";
import type {
  Signer,
  BigNumberish,
  ContractDeployTransaction,
  ContractRunner,
} from "ethers";
import type { NonPayableOverrides } from "../../../common";
import type {
  BridgeUtils,
  BridgeUtilsInterface,
} from "../../../contracts/BridgeComponents/BridgeUtils";

const _abi = [
  {
    inputs: [
      {
        internalType: "string",
        name: "_nativeCoin",
        type: "string",
      },
      {
        internalType: "uint16",
        name: "_nativeChainId",
        type: "uint16",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "required",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "approved",
        type: "uint256",
      },
    ],
    name: "InsufficientApproval",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "declared",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "provided",
        type: "uint256",
      },
    ],
    name: "InsufficientFunds",
    type: "error",
  },
  {
    inputs: [],
    name: "UnsupportedToken",
    type: "error",
  },
  {
    inputs: [],
    name: "TVL",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "actionId",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "first",
        type: "string",
      },
      {
        internalType: "string",
        name: "second",
        type: "string",
      },
    ],
    name: "areStringsEqual",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [],
    name: "fees",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    name: "incomming",
    outputs: [
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
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "nativeChainId",
    outputs: [
      {
        internalType: "uint16",
        name: "",
        type: "uint16",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "nativeCoin",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    name: "nativeTokens",
    outputs: [
      {
        internalType: "address",
        name: "constractAddress",
        type: "address",
      },
      {
        internalType: "uint8",
        name: "decimals",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    name: "outgoing",
    outputs: [
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
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint16",
        name: "",
        type: "uint16",
      },
    ],
    name: "supportedChains",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    name: "wrappedTokens",
    outputs: [
      {
        internalType: "address",
        name: "constractAddress",
        type: "address",
      },
      {
        internalType: "uint8",
        name: "decimals",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
] as const;

const _bytecode =
  "0x60806040523480156200001157600080fd5b50604051620013673803806200136783398181016040528101906200003791906200025b565b8181600080819055506000600181905550600060028190555081600390816200006191906200050c565b5080600460006101000a81548161ffff021916908361ffff16021790555050505050620005f3565b6000604051905090565b600080fd5b600080fd5b600080fd5b600080fd5b6000601f19601f8301169050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b620000f282620000a7565b810181811067ffffffffffffffff82111715620001145762000113620000b8565b5b80604052505050565b60006200012962000089565b9050620001378282620000e7565b919050565b600067ffffffffffffffff8211156200015a5762000159620000b8565b5b6200016582620000a7565b9050602081019050919050565b60005b838110156200019257808201518184015260208101905062000175565b60008484015250505050565b6000620001b5620001af846200013c565b6200011d565b905082815260208101848484011115620001d457620001d3620000a2565b5b620001e184828562000172565b509392505050565b600082601f8301126200020157620002006200009d565b5b8151620002138482602086016200019e565b91505092915050565b600061ffff82169050919050565b62000235816200021c565b81146200024157600080fd5b50565b60008151905062000255816200022a565b92915050565b6000806040838503121562000275576200027462000093565b5b600083015167ffffffffffffffff81111562000296576200029562000098565b5b620002a485828601620001e9565b9250506020620002b78582860162000244565b9150509250929050565b600081519050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b600060028204905060018216806200031457607f821691505b6020821081036200032a5762000329620002cc565b5b50919050565b60008190508160005260206000209050919050565b60006020601f8301049050919050565b600082821b905092915050565b600060088302620003947fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff8262000355565b620003a0868362000355565b95508019841693508086168417925050509392505050565b6000819050919050565b6000819050919050565b6000620003ed620003e7620003e184620003b8565b620003c2565b620003b8565b9050919050565b6000819050919050565b6200040983620003cc565b620004216200041882620003f4565b84845462000362565b825550505050565b600090565b6200043862000429565b62000445818484620003fe565b505050565b5b818110156200046d57620004616000826200042e565b6001810190506200044b565b5050565b601f821115620004bc57620004868162000330565b620004918462000345565b81016020851015620004a1578190505b620004b9620004b08562000345565b8301826200044a565b50505b505050565b600082821c905092915050565b6000620004e160001984600802620004c1565b1980831691505092915050565b6000620004fc8383620004ce565b9150826002028217905092915050565b6200051782620002c1565b67ffffffffffffffff811115620005335762000532620000b8565b5b6200053f8254620002fb565b6200054c82828562000471565b600060209050601f8311600181146200058457600084156200056f578287015190505b6200057b8582620004ee565b865550620005eb565b601f198416620005948662000330565b60005b82811015620005be5784890151825560018201915060208501945060208101905062000597565b86831015620005de5784890151620005da601f891682620004ce565b8355505b6001600288020188555050505b505050505050565b610d6480620006036000396000f3fe608060405234801561001057600080fd5b50600436106100a95760003560e01c8063aa810c4211610071578063aa810c4214610169578063b1496cd41461019c578063c1a68b38146101cc578063cb3f217d146101ea578063d174cb2b1461021b578063edaf2d2e1461024e576100a9565b806310d58783146100ae57806312afda25146100de578063167b78cd1461010f57806336b6e82b1461012d5780639af1d35a1461014b575b600080fd5b6100c860048036038101906100c39190610769565b61026c565b6040516100d59190610826565b60405180910390f35b6100f860048036038101906100f3919061097d565b61030c565b604051610106929190610a23565b60405180910390f35b610117610373565b6040516101249190610826565b60405180910390f35b610135610401565b6040516101429190610a65565b60405180910390f35b610153610407565b6040516101609190610a65565b60405180910390f35b610183600480360381019061017e9190610ab6565b61040d565b6040516101939493929190610af2565b60405180910390f35b6101b660048036038101906101b19190610b45565b61055b565b6040516101c39190610bd8565b60405180910390f35b6101d46105b4565b6040516101e19190610bf3565b60405180910390f35b61020460048036038101906101ff919061097d565b6105c8565b604051610212929190610a23565b60405180910390f35b61023560048036038101906102309190610ab6565b61062f565b6040516102459493929190610c2f565b60405180910390f35b610256610715565b6040516102639190610a65565b60405180910390f35b6009602052806000526040600020600091509050805461028b90610caa565b80601f01602080910402602001604051908101604052809291908181526020018280546102b790610caa565b80156103045780601f106102d957610100808354040283529160200191610304565b820191906000526020600020905b8154815290600101906020018083116102e757829003601f168201915b505050505081565b6007818051602081018201805184825260208301602085012081835280955050505050506000915090508060000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16908060000160149054906101000a900460ff16905082565b6003805461038090610caa565b80601f01602080910402602001604051908101604052809291908181526020018280546103ac90610caa565b80156103f95780601f106103ce576101008083540402835291602001916103f9565b820191906000526020600020905b8154815290600101906020018083116103dc57829003601f168201915b505050505081565b60005481565b60025481565b60066020528060005260406000206000915090508060000154908060010160009054906101000a900461ffff169080600201805461044a90610caa565b80601f016020809104026020016040519081016040528092919081815260200182805461047690610caa565b80156104c35780601f10610498576101008083540402835291602001916104c3565b820191906000526020600020905b8154815290600101906020018083116104a657829003601f168201915b5050505050908060030180546104d890610caa565b80601f016020809104026020016040519081016040528092919081815260200182805461050490610caa565b80156105515780601f1061052657610100808354040283529160200191610551565b820191906000526020600020905b81548152906001019060200180831161053457829003601f168201915b5050505050905084565b60008160405160200161056e9190610d17565b60405160208183030381529060405280519060200120836040516020016105959190610d17565b6040516020818303038152906040528051906020012014905092915050565b600460009054906101000a900461ffff1681565b6008818051602081018201805184825260208301602085012081835280955050505050506000915090508060000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16908060000160149054906101000a900460ff16905082565b60056020528060005260406000206000915090508060000154908060010160009054906101000a900461ffff169080600201805461066c90610caa565b80601f016020809104026020016040519081016040528092919081815260200182805461069890610caa565b80156106e55780601f106106ba576101008083540402835291602001916106e5565b820191906000526020600020905b8154815290600101906020018083116106c857829003601f168201915b5050505050908060030160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905084565b60015481565b6000604051905090565b600080fd5b600080fd5b600061ffff82169050919050565b6107468161072f565b811461075157600080fd5b50565b6000813590506107638161073d565b92915050565b60006020828403121561077f5761077e610725565b5b600061078d84828501610754565b91505092915050565b600081519050919050565b600082825260208201905092915050565b60005b838110156107d05780820151818401526020810190506107b5565b60008484015250505050565b6000601f19601f8301169050919050565b60006107f882610796565b61080281856107a1565b93506108128185602086016107b2565b61081b816107dc565b840191505092915050565b6000602082019050818103600083015261084081846107ed565b905092915050565b600080fd5b600080fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b61088a826107dc565b810181811067ffffffffffffffff821117156108a9576108a8610852565b5b80604052505050565b60006108bc61071b565b90506108c88282610881565b919050565b600067ffffffffffffffff8211156108e8576108e7610852565b5b6108f1826107dc565b9050602081019050919050565b82818337600083830152505050565b600061092061091b846108cd565b6108b2565b90508281526020810184848401111561093c5761093b61084d565b5b6109478482856108fe565b509392505050565b600082601f83011261096457610963610848565b5b813561097484826020860161090d565b91505092915050565b60006020828403121561099357610992610725565b5b600082013567ffffffffffffffff8111156109b1576109b061072a565b5b6109bd8482850161094f565b91505092915050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b60006109f1826109c6565b9050919050565b610a01816109e6565b82525050565b600060ff82169050919050565b610a1d81610a07565b82525050565b6000604082019050610a3860008301856109f8565b610a456020830184610a14565b9392505050565b6000819050919050565b610a5f81610a4c565b82525050565b6000602082019050610a7a6000830184610a56565b92915050565b6000819050919050565b610a9381610a80565b8114610a9e57600080fd5b50565b600081359050610ab081610a8a565b92915050565b600060208284031215610acc57610acb610725565b5b6000610ada84828501610aa1565b91505092915050565b610aec8161072f565b82525050565b6000608082019050610b076000830187610a56565b610b146020830186610ae3565b8181036040830152610b2681856107ed565b90508181036060830152610b3a81846107ed565b905095945050505050565b60008060408385031215610b5c57610b5b610725565b5b600083013567ffffffffffffffff811115610b7a57610b7961072a565b5b610b868582860161094f565b925050602083013567ffffffffffffffff811115610ba757610ba661072a565b5b610bb38582860161094f565b9150509250929050565b60008115159050919050565b610bd281610bbd565b82525050565b6000602082019050610bed6000830184610bc9565b92915050565b6000602082019050610c086000830184610ae3565b92915050565b6000610c19826109c6565b9050919050565b610c2981610c0e565b82525050565b6000608082019050610c446000830187610a56565b610c516020830186610ae3565b8181036040830152610c6381856107ed565b9050610c726060830184610c20565b95945050505050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b60006002820490506001821680610cc257607f821691505b602082108103610cd557610cd4610c7b565b5b50919050565b600081905092915050565b6000610cf182610796565b610cfb8185610cdb565b9350610d0b8185602086016107b2565b80840191505092915050565b6000610d238284610ce6565b91508190509291505056fea2646970667358221220fed27c3840b3b5a54800f1020a55f3b492565a5286e5111838237ab4ce49cd3864736f6c63430008140033";

type BridgeUtilsConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: BridgeUtilsConstructorParams,
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class BridgeUtils__factory extends ContractFactory {
  constructor(...args: BridgeUtilsConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override getDeployTransaction(
    _nativeCoin: string,
    _nativeChainId: BigNumberish,
    overrides?: NonPayableOverrides & { from?: string },
  ): Promise<ContractDeployTransaction> {
    return super.getDeployTransaction(
      _nativeCoin,
      _nativeChainId,
      overrides || {},
    );
  }
  override deploy(
    _nativeCoin: string,
    _nativeChainId: BigNumberish,
    overrides?: NonPayableOverrides & { from?: string },
  ) {
    return super.deploy(
      _nativeCoin,
      _nativeChainId,
      overrides || {},
    ) as Promise<
      BridgeUtils & {
        deploymentTransaction(): ContractTransactionResponse;
      }
    >;
  }
  override connect(runner: ContractRunner | null): BridgeUtils__factory {
    return super.connect(runner) as BridgeUtils__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): BridgeUtilsInterface {
    return new Interface(_abi) as BridgeUtilsInterface;
  }
  static connect(address: string, runner?: ContractRunner | null): BridgeUtils {
    return new Contract(address, _abi, runner) as unknown as BridgeUtils;
  }
}
