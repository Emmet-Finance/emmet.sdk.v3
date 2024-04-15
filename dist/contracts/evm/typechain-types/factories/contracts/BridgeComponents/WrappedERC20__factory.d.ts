import { ContractFactory, ContractTransactionResponse } from "ethers";
import type { Signer, BigNumberish, AddressLike, ContractDeployTransaction, ContractRunner } from "ethers";
import type { NonPayableOverrides } from "../../../common";
import type { WrappedERC20, WrappedERC20Interface } from "../../../contracts/BridgeComponents/WrappedERC20";
type WrappedERC20ConstructorParams = [signer?: Signer] | ConstructorParameters<typeof ContractFactory>;
export declare class WrappedERC20__factory extends ContractFactory {
    constructor(...args: WrappedERC20ConstructorParams);
    getDeployTransaction(symbol_: string, _bridge: AddressLike, decimals_: BigNumberish, overrides?: NonPayableOverrides & {
        from?: string;
    }): Promise<ContractDeployTransaction>;
    deploy(symbol_: string, _bridge: AddressLike, decimals_: BigNumberish, overrides?: NonPayableOverrides & {
        from?: string;
    }): Promise<WrappedERC20 & {
        deploymentTransaction(): ContractTransactionResponse;
    }>;
    connect(runner: ContractRunner | null): WrappedERC20__factory;
    static readonly bytecode = "0x60806040523480156200001157600080fd5b50604051620025b0380380620025b0833981810160405281019062000037919062000484565b826040516020016200004a919062000572565b6040516020818303038152906040528381600390816200006b9190620007dc565b5080600490816200007d9190620007dc565b505050620000b27f52ba824bfabc2bcfcdf7f0edbb486ebb05e1836c90e78047efeb949990f72e5f83620000d760201b60201c565b5080600660006101000a81548160ff021916908360ff160217905550505050620008c3565b6000620000eb8383620001db60201b60201c565b620001d05760016005600085815260200190815260200160002060000160008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff0219169083151502179055506200016c6200024660201b60201c565b73ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff16847f2f8788117e7eff1d82e926ec794901d17c78024a50270940304540a733656f0d60405160405180910390a460019050620001d5565b600090505b92915050565b60006005600084815260200190815260200160002060000160008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff16905092915050565b600033905090565b6000604051905090565b600080fd5b600080fd5b600080fd5b600080fd5b6000601f19601f8301169050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b620002b7826200026c565b810181811067ffffffffffffffff82111715620002d957620002d86200027d565b5b80604052505050565b6000620002ee6200024e565b9050620002fc8282620002ac565b919050565b600067ffffffffffffffff8211156200031f576200031e6200027d565b5b6200032a826200026c565b9050602081019050919050565b60005b83811015620003575780820151818401526020810190506200033a565b60008484015250505050565b60006200037a620003748462000301565b620002e2565b90508281526020810184848401111562000399576200039862000267565b5b620003a684828562000337565b509392505050565b600082601f830112620003c657620003c562000262565b5b8151620003d884826020860162000363565b91505092915050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b60006200040e82620003e1565b9050919050565b620004208162000401565b81146200042c57600080fd5b50565b600081519050620004408162000415565b92915050565b600060ff82169050919050565b6200045e8162000446565b81146200046a57600080fd5b50565b6000815190506200047e8162000453565b92915050565b600080600060608486031215620004a0576200049f62000258565b5b600084015167ffffffffffffffff811115620004c157620004c06200025d565b5b620004cf86828701620003ae565b9350506020620004e2868287016200042f565b9250506040620004f5868287016200046d565b9150509250925092565b7f656d2e0000000000000000000000000000000000000000000000000000000000815250565b600081519050919050565b600081905092915050565b6000620005488262000525565b62000554818562000530565b93506200056681856020860162000337565b80840191505092915050565b60006200057f82620004ff565b6003820191506200059182846200053b565b915081905092915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b60006002820490506001821680620005e457607f821691505b602082108103620005fa57620005f96200059c565b5b50919050565b60008190508160005260206000209050919050565b60006020601f8301049050919050565b600082821b905092915050565b600060088302620006647fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff8262000625565b62000670868362000625565b95508019841693508086168417925050509392505050565b6000819050919050565b6000819050919050565b6000620006bd620006b7620006b18462000688565b62000692565b62000688565b9050919050565b6000819050919050565b620006d9836200069c565b620006f1620006e882620006c4565b84845462000632565b825550505050565b600090565b62000708620006f9565b62000715818484620006ce565b505050565b5b818110156200073d5762000731600082620006fe565b6001810190506200071b565b5050565b601f8211156200078c57620007568162000600565b620007618462000615565b8101602085101562000771578190505b62000789620007808562000615565b8301826200071a565b50505b505050565b600082821c905092915050565b6000620007b16000198460080262000791565b1980831691505092915050565b6000620007cc83836200079e565b9150826002028217905092915050565b620007e78262000525565b67ffffffffffffffff8111156200080357620008026200027d565b5b6200080f8254620005cb565b6200081c82828562000741565b600060209050601f8311600181146200085457600084156200083f578287015190505b6200084b8582620007be565b865550620008bb565b601f198416620008648662000600565b60005b828110156200088e5784890151825560018201915060208501945060208101905062000867565b86831015620008ae5784890151620008aa601f8916826200079e565b8355505b6001600288020188555050505b505050505050565b611cdd80620008d36000396000f3fe608060405234801561001057600080fd5b506004361061012c5760003560e01c806340c10f19116100ad578063a217fddf11610071578063a217fddf14610355578063a9059cbb14610373578063b5bfddea146103a3578063d547741f146103c1578063dd62ed3e146103dd5761012c565b806340c10f191461029f57806370a08231146102bb57806379cc6790146102eb57806391d148541461030757806395d89b41146103375761012c565b806323b872dd116100f457806323b872dd146101e9578063248a9ca3146102195780632f2ff15d14610249578063313ce5671461026557806336568abe146102835761012c565b806301ffc9a71461013157806306fdde0314610161578063095ea7b31461017f5780630ce83a61146101af57806318160ddd146101cb575b600080fd5b61014b6004803603810190610146919061150e565b61040d565b6040516101589190611556565b60405180910390f35b610169610487565b6040516101769190611601565b60405180910390f35b610199600480360381019061019491906116b7565b610519565b6040516101a69190611556565b60405180910390f35b6101c960048036038101906101c49190611730565b61053c565b005b6101d3610621565b6040516101e0919061176c565b60405180910390f35b61020360048036038101906101fe9190611787565b61062b565b6040516102109190611556565b60405180910390f35b610233600480360381019061022e9190611810565b61065a565b604051610240919061184c565b60405180910390f35b610263600480360381019061025e9190611867565b61067a565b005b61026d61069c565b60405161027a91906118b6565b60405180910390f35b61029d60048036038101906102989190611867565b6106b3565b005b6102b960048036038101906102b491906116b7565b61072e565b005b6102d560048036038101906102d091906118d1565b61085e565b6040516102e2919061176c565b60405180910390f35b610305600480360381019061030091906116b7565b6108a6565b005b610321600480360381019061031c9190611867565b610967565b60405161032e9190611556565b60405180910390f35b61033f6109d2565b60405161034c9190611601565b60405180910390f35b61035d610a64565b60405161036a919061184c565b60405180910390f35b61038d600480360381019061038891906116b7565b610a6b565b60405161039a9190611556565b60405180910390f35b6103ab610a8e565b6040516103b8919061184c565b60405180910390f35b6103db60048036038101906103d69190611867565b610ab2565b005b6103f760048036038101906103f291906118fe565b610ad4565b604051610404919061176c565b60405180910390f35b60007f7965db0b000000000000000000000000000000000000000000000000000000007bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff19161480610480575061047f82610b5b565b5b9050919050565b6060600380546104969061196d565b80601f01602080910402602001604051908101604052809291908181526020018280546104c29061196d565b801561050f5780601f106104e45761010080835404028352916020019161050f565b820191906000526020600020905b8154815290600101906020018083116104f257829003601f168201915b5050505050905090565b600080610524610bc5565b9050610531818585610bcd565b600191505092915050565b61056d7f52ba824bfabc2bcfcdf7f0edbb486ebb05e1836c90e78047efeb949990f72e5f610568610bc5565b610967565b6105ac576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016105a3906119ea565b60405180910390fd5b8060ff166000111580156105c4575060128160ff1611155b610603576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016105fa90611a56565b60405180910390fd5b80600660006101000a81548160ff021916908360ff16021790555050565b6000600254905090565b600080610636610bc5565b9050610643858285610bdf565b61064e858585610c73565b60019150509392505050565b600060056000838152602001908152602001600020600101549050919050565b6106838261065a565b61068c81610d67565b6106968383610d7b565b50505050565b6000600660009054906101000a900460ff16905090565b6106bb610bc5565b73ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff161461071f576040517f6697b23200000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b6107298282610e6d565b505050565b61075f7f52ba824bfabc2bcfcdf7f0edbb486ebb05e1836c90e78047efeb949990f72e5f61075a610bc5565b610967565b61079e576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610795906119ea565b60405180910390fd5b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff160361080d576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161080490611ac2565b60405180910390fd5b60008111610850576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161084790611b2e565b60405180910390fd5b61085a8282610f60565b5050565b60008060008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020549050919050565b6108d77f52ba824bfabc2bcfcdf7f0edbb486ebb05e1836c90e78047efeb949990f72e5f6108d2610bc5565b610967565b610916576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161090d906119ea565b60405180910390fd5b60008111610959576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161095090611b9a565b60405180910390fd5b6109638282610fe2565b5050565b60006005600084815260200190815260200160002060000160008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff16905092915050565b6060600480546109e19061196d565b80601f0160208091040260200160405190810160405280929190818152602001828054610a0d9061196d565b8015610a5a5780601f10610a2f57610100808354040283529160200191610a5a565b820191906000526020600020905b815481529060010190602001808311610a3d57829003601f168201915b5050505050905090565b6000801b81565b600080610a76610bc5565b9050610a83818585610c73565b600191505092915050565b7f52ba824bfabc2bcfcdf7f0edbb486ebb05e1836c90e78047efeb949990f72e5f81565b610abb8261065a565b610ac481610d67565b610ace8383610e6d565b50505050565b6000600160008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054905092915050565b60007f01ffc9a7000000000000000000000000000000000000000000000000000000007bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916149050919050565b600033905090565b610bda8383836001611064565b505050565b6000610beb8484610ad4565b90507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff8114610c6d5781811015610c5d578281836040517ffb8f41b2000000000000000000000000000000000000000000000000000000008152600401610c5493929190611bc9565b60405180910390fd5b610c6c84848484036000611064565b5b50505050565b600073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff1603610ce55760006040517f96c6fd1e000000000000000000000000000000000000000000000000000000008152600401610cdc9190611c00565b60405180910390fd5b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff1603610d575760006040517fec442f05000000000000000000000000000000000000000000000000000000008152600401610d4e9190611c00565b60405180910390fd5b610d6283838361123b565b505050565b610d7881610d73610bc5565b611460565b50565b6000610d878383610967565b610e625760016005600085815260200190815260200160002060000160008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff021916908315150217905550610dff610bc5565b73ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff16847f2f8788117e7eff1d82e926ec794901d17c78024a50270940304540a733656f0d60405160405180910390a460019050610e67565b600090505b92915050565b6000610e798383610967565b15610f555760006005600085815260200190815260200160002060000160008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff021916908315150217905550610ef2610bc5565b73ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff16847ff6391f5c32d9c69d2a47ea670b442974b53935d1edc7fd64eb21e047a839171b60405160405180910390a460019050610f5a565b600090505b92915050565b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff1603610fd25760006040517fec442f05000000000000000000000000000000000000000000000000000000008152600401610fc99190611c00565b60405180910390fd5b610fde6000838361123b565b5050565b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff16036110545760006040517f96c6fd1e00000000000000000000000000000000000000000000000000000000815260040161104b9190611c00565b60405180910390fd5b6110608260008361123b565b5050565b600073ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff16036110d65760006040517fe602df050000000000000000000000000000000000000000000000000000000081526004016110cd9190611c00565b60405180910390fd5b600073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff16036111485760006040517f94280d6200000000000000000000000000000000000000000000000000000000815260040161113f9190611c00565b60405180910390fd5b81600160008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055508015611235578273ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b9258460405161122c919061176c565b60405180910390a35b50505050565b600073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff160361128d5780600260008282546112819190611c4a565b92505081905550611360565b60008060008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054905081811015611319578381836040517fe450d38c00000000000000000000000000000000000000000000000000000000815260040161131093929190611bc9565b60405180910390fd5b8181036000808673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002081905550505b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff16036113a957806002600082825403925050819055506113f6565b806000808473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082825401925050819055505b8173ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef83604051611453919061176c565b60405180910390a3505050565b61146a8282610967565b6114ad5780826040517fe2517d3f0000000000000000000000000000000000000000000000000000000081526004016114a4929190611c7e565b60405180910390fd5b5050565b600080fd5b60007fffffffff0000000000000000000000000000000000000000000000000000000082169050919050565b6114eb816114b6565b81146114f657600080fd5b50565b600081359050611508816114e2565b92915050565b600060208284031215611524576115236114b1565b5b6000611532848285016114f9565b91505092915050565b60008115159050919050565b6115508161153b565b82525050565b600060208201905061156b6000830184611547565b92915050565b600081519050919050565b600082825260208201905092915050565b60005b838110156115ab578082015181840152602081019050611590565b60008484015250505050565b6000601f19601f8301169050919050565b60006115d382611571565b6115dd818561157c565b93506115ed81856020860161158d565b6115f6816115b7565b840191505092915050565b6000602082019050818103600083015261161b81846115c8565b905092915050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b600061164e82611623565b9050919050565b61165e81611643565b811461166957600080fd5b50565b60008135905061167b81611655565b92915050565b6000819050919050565b61169481611681565b811461169f57600080fd5b50565b6000813590506116b18161168b565b92915050565b600080604083850312156116ce576116cd6114b1565b5b60006116dc8582860161166c565b92505060206116ed858286016116a2565b9150509250929050565b600060ff82169050919050565b61170d816116f7565b811461171857600080fd5b50565b60008135905061172a81611704565b92915050565b600060208284031215611746576117456114b1565b5b60006117548482850161171b565b91505092915050565b61176681611681565b82525050565b6000602082019050611781600083018461175d565b92915050565b6000806000606084860312156117a05761179f6114b1565b5b60006117ae8682870161166c565b93505060206117bf8682870161166c565b92505060406117d0868287016116a2565b9150509250925092565b6000819050919050565b6117ed816117da565b81146117f857600080fd5b50565b60008135905061180a816117e4565b92915050565b600060208284031215611826576118256114b1565b5b6000611834848285016117fb565b91505092915050565b611846816117da565b82525050565b6000602082019050611861600083018461183d565b92915050565b6000806040838503121561187e5761187d6114b1565b5b600061188c858286016117fb565b925050602061189d8582860161166c565b9150509250929050565b6118b0816116f7565b82525050565b60006020820190506118cb60008301846118a7565b92915050565b6000602082840312156118e7576118e66114b1565b5b60006118f58482850161166c565b91505092915050565b60008060408385031215611915576119146114b1565b5b60006119238582860161166c565b92505060206119348582860161166c565b9150509250929050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b6000600282049050600182168061198557607f821691505b6020821081036119985761199761193e565b5b50919050565b7f556e617574686f72697365642063616c6c000000000000000000000000000000600082015250565b60006119d460118361157c565b91506119df8261199e565b602082019050919050565b60006020820190508181036000830152611a03816119c7565b9050919050565b7f52657175697265643a2030203c3d206e6577446563696d616c73203c3d203138600082015250565b6000611a4060208361157c565b9150611a4b82611a0a565b602082019050919050565b60006020820190508181036000830152611a6f81611a33565b9050919050565b7f4d696e74696e6720617474656d707420746f2061646472657373207a65726f00600082015250565b6000611aac601f8361157c565b9150611ab782611a76565b602082019050919050565b60006020820190508181036000830152611adb81611a9f565b9050919050565b7f417474656d707420746f206d696e74207a65726f20746f6b656e730000000000600082015250565b6000611b18601b8361157c565b9150611b2382611ae2565b602082019050919050565b60006020820190508181036000830152611b4781611b0b565b9050919050565b7f417474656d707420746f206275726e207a65726f20746f6b656e730000000000600082015250565b6000611b84601b8361157c565b9150611b8f82611b4e565b602082019050919050565b60006020820190508181036000830152611bb381611b77565b9050919050565b611bc381611643565b82525050565b6000606082019050611bde6000830186611bba565b611beb602083018561175d565b611bf8604083018461175d565b949350505050565b6000602082019050611c156000830184611bba565b92915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b6000611c5582611681565b9150611c6083611681565b9250828201905080821115611c7857611c77611c1b565b5b92915050565b6000604082019050611c936000830185611bba565b611ca0602083018461183d565b939250505056fea26469706673582212207e9ea31bfc5e2a61b97d666b221eb29929b8aec1a21b14cc8fd80eb7c4aa35fd64736f6c63430008140033";
    static readonly abi: readonly [{
        readonly inputs: readonly [{
            readonly internalType: "string";
            readonly name: "symbol_";
            readonly type: "string";
        }, {
            readonly internalType: "address";
            readonly name: "_bridge";
            readonly type: "address";
        }, {
            readonly internalType: "uint8";
            readonly name: "decimals_";
            readonly type: "uint8";
        }];
        readonly stateMutability: "nonpayable";
        readonly type: "constructor";
    }, {
        readonly inputs: readonly [];
        readonly name: "AccessControlBadConfirmation";
        readonly type: "error";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "address";
            readonly name: "account";
            readonly type: "address";
        }, {
            readonly internalType: "bytes32";
            readonly name: "neededRole";
            readonly type: "bytes32";
        }];
        readonly name: "AccessControlUnauthorizedAccount";
        readonly type: "error";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "address";
            readonly name: "spender";
            readonly type: "address";
        }, {
            readonly internalType: "uint256";
            readonly name: "allowance";
            readonly type: "uint256";
        }, {
            readonly internalType: "uint256";
            readonly name: "needed";
            readonly type: "uint256";
        }];
        readonly name: "ERC20InsufficientAllowance";
        readonly type: "error";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "address";
            readonly name: "sender";
            readonly type: "address";
        }, {
            readonly internalType: "uint256";
            readonly name: "balance";
            readonly type: "uint256";
        }, {
            readonly internalType: "uint256";
            readonly name: "needed";
            readonly type: "uint256";
        }];
        readonly name: "ERC20InsufficientBalance";
        readonly type: "error";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "address";
            readonly name: "approver";
            readonly type: "address";
        }];
        readonly name: "ERC20InvalidApprover";
        readonly type: "error";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "address";
            readonly name: "receiver";
            readonly type: "address";
        }];
        readonly name: "ERC20InvalidReceiver";
        readonly type: "error";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "address";
            readonly name: "sender";
            readonly type: "address";
        }];
        readonly name: "ERC20InvalidSender";
        readonly type: "error";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "address";
            readonly name: "spender";
            readonly type: "address";
        }];
        readonly name: "ERC20InvalidSpender";
        readonly type: "error";
    }, {
        readonly anonymous: false;
        readonly inputs: readonly [{
            readonly indexed: true;
            readonly internalType: "address";
            readonly name: "owner";
            readonly type: "address";
        }, {
            readonly indexed: true;
            readonly internalType: "address";
            readonly name: "spender";
            readonly type: "address";
        }, {
            readonly indexed: false;
            readonly internalType: "uint256";
            readonly name: "value";
            readonly type: "uint256";
        }];
        readonly name: "Approval";
        readonly type: "event";
    }, {
        readonly anonymous: false;
        readonly inputs: readonly [{
            readonly indexed: true;
            readonly internalType: "bytes32";
            readonly name: "role";
            readonly type: "bytes32";
        }, {
            readonly indexed: true;
            readonly internalType: "bytes32";
            readonly name: "previousAdminRole";
            readonly type: "bytes32";
        }, {
            readonly indexed: true;
            readonly internalType: "bytes32";
            readonly name: "newAdminRole";
            readonly type: "bytes32";
        }];
        readonly name: "RoleAdminChanged";
        readonly type: "event";
    }, {
        readonly anonymous: false;
        readonly inputs: readonly [{
            readonly indexed: true;
            readonly internalType: "bytes32";
            readonly name: "role";
            readonly type: "bytes32";
        }, {
            readonly indexed: true;
            readonly internalType: "address";
            readonly name: "account";
            readonly type: "address";
        }, {
            readonly indexed: true;
            readonly internalType: "address";
            readonly name: "sender";
            readonly type: "address";
        }];
        readonly name: "RoleGranted";
        readonly type: "event";
    }, {
        readonly anonymous: false;
        readonly inputs: readonly [{
            readonly indexed: true;
            readonly internalType: "bytes32";
            readonly name: "role";
            readonly type: "bytes32";
        }, {
            readonly indexed: true;
            readonly internalType: "address";
            readonly name: "account";
            readonly type: "address";
        }, {
            readonly indexed: true;
            readonly internalType: "address";
            readonly name: "sender";
            readonly type: "address";
        }];
        readonly name: "RoleRevoked";
        readonly type: "event";
    }, {
        readonly anonymous: false;
        readonly inputs: readonly [{
            readonly indexed: true;
            readonly internalType: "address";
            readonly name: "from";
            readonly type: "address";
        }, {
            readonly indexed: true;
            readonly internalType: "address";
            readonly name: "to";
            readonly type: "address";
        }, {
            readonly indexed: false;
            readonly internalType: "uint256";
            readonly name: "value";
            readonly type: "uint256";
        }];
        readonly name: "Transfer";
        readonly type: "event";
    }, {
        readonly inputs: readonly [];
        readonly name: "BRIDGE_ROLE";
        readonly outputs: readonly [{
            readonly internalType: "bytes32";
            readonly name: "";
            readonly type: "bytes32";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly inputs: readonly [];
        readonly name: "DEFAULT_ADMIN_ROLE";
        readonly outputs: readonly [{
            readonly internalType: "bytes32";
            readonly name: "";
            readonly type: "bytes32";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "address";
            readonly name: "owner";
            readonly type: "address";
        }, {
            readonly internalType: "address";
            readonly name: "spender";
            readonly type: "address";
        }];
        readonly name: "allowance";
        readonly outputs: readonly [{
            readonly internalType: "uint256";
            readonly name: "";
            readonly type: "uint256";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "address";
            readonly name: "spender";
            readonly type: "address";
        }, {
            readonly internalType: "uint256";
            readonly name: "value";
            readonly type: "uint256";
        }];
        readonly name: "approve";
        readonly outputs: readonly [{
            readonly internalType: "bool";
            readonly name: "";
            readonly type: "bool";
        }];
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "address";
            readonly name: "account";
            readonly type: "address";
        }];
        readonly name: "balanceOf";
        readonly outputs: readonly [{
            readonly internalType: "uint256";
            readonly name: "";
            readonly type: "uint256";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "address";
            readonly name: "account";
            readonly type: "address";
        }, {
            readonly internalType: "uint256";
            readonly name: "amount";
            readonly type: "uint256";
        }];
        readonly name: "burnFrom";
        readonly outputs: readonly [];
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }, {
        readonly inputs: readonly [];
        readonly name: "decimals";
        readonly outputs: readonly [{
            readonly internalType: "uint8";
            readonly name: "";
            readonly type: "uint8";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "bytes32";
            readonly name: "role";
            readonly type: "bytes32";
        }];
        readonly name: "getRoleAdmin";
        readonly outputs: readonly [{
            readonly internalType: "bytes32";
            readonly name: "";
            readonly type: "bytes32";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "bytes32";
            readonly name: "role";
            readonly type: "bytes32";
        }, {
            readonly internalType: "address";
            readonly name: "account";
            readonly type: "address";
        }];
        readonly name: "grantRole";
        readonly outputs: readonly [];
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "bytes32";
            readonly name: "role";
            readonly type: "bytes32";
        }, {
            readonly internalType: "address";
            readonly name: "account";
            readonly type: "address";
        }];
        readonly name: "hasRole";
        readonly outputs: readonly [{
            readonly internalType: "bool";
            readonly name: "";
            readonly type: "bool";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "address";
            readonly name: "to";
            readonly type: "address";
        }, {
            readonly internalType: "uint256";
            readonly name: "amount";
            readonly type: "uint256";
        }];
        readonly name: "mint";
        readonly outputs: readonly [];
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }, {
        readonly inputs: readonly [];
        readonly name: "name";
        readonly outputs: readonly [{
            readonly internalType: "string";
            readonly name: "";
            readonly type: "string";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "bytes32";
            readonly name: "role";
            readonly type: "bytes32";
        }, {
            readonly internalType: "address";
            readonly name: "callerConfirmation";
            readonly type: "address";
        }];
        readonly name: "renounceRole";
        readonly outputs: readonly [];
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "bytes32";
            readonly name: "role";
            readonly type: "bytes32";
        }, {
            readonly internalType: "address";
            readonly name: "account";
            readonly type: "address";
        }];
        readonly name: "revokeRole";
        readonly outputs: readonly [];
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "bytes4";
            readonly name: "interfaceId";
            readonly type: "bytes4";
        }];
        readonly name: "supportsInterface";
        readonly outputs: readonly [{
            readonly internalType: "bool";
            readonly name: "";
            readonly type: "bool";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly inputs: readonly [];
        readonly name: "symbol";
        readonly outputs: readonly [{
            readonly internalType: "string";
            readonly name: "";
            readonly type: "string";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly inputs: readonly [];
        readonly name: "totalSupply";
        readonly outputs: readonly [{
            readonly internalType: "uint256";
            readonly name: "";
            readonly type: "uint256";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "address";
            readonly name: "to";
            readonly type: "address";
        }, {
            readonly internalType: "uint256";
            readonly name: "value";
            readonly type: "uint256";
        }];
        readonly name: "transfer";
        readonly outputs: readonly [{
            readonly internalType: "bool";
            readonly name: "";
            readonly type: "bool";
        }];
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "address";
            readonly name: "from";
            readonly type: "address";
        }, {
            readonly internalType: "address";
            readonly name: "to";
            readonly type: "address";
        }, {
            readonly internalType: "uint256";
            readonly name: "value";
            readonly type: "uint256";
        }];
        readonly name: "transferFrom";
        readonly outputs: readonly [{
            readonly internalType: "bool";
            readonly name: "";
            readonly type: "bool";
        }];
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "uint8";
            readonly name: "newDecimals";
            readonly type: "uint8";
        }];
        readonly name: "updateDecimals";
        readonly outputs: readonly [];
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }];
    static createInterface(): WrappedERC20Interface;
    static connect(address: string, runner?: ContractRunner | null): WrappedERC20;
}
export {};
//# sourceMappingURL=WrappedERC20__factory.d.ts.map