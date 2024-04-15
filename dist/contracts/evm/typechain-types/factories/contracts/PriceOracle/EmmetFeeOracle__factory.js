"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmmetFeeOracle__factory = void 0;
/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
const ethers_1 = require("ethers");
const _abi = [
    {
        inputs: [
            {
                internalType: "string",
                name: "selfCoin_",
                type: "string",
            },
            {
                internalType: "uint256",
                name: "txMinimumFee_",
                type: "uint256",
            },
            {
                internalType: "address",
                name: "priceOracle_",
                type: "address",
            },
        ],
        stateMutability: "nonpayable",
        type: "constructor",
    },
    {
        inputs: [
            {
                internalType: "string",
                name: "description",
                type: "string",
            },
        ],
        name: "AddressZerro",
        type: "error",
    },
    {
        inputs: [
            {
                internalType: "uint128",
                name: "value",
                type: "uint128",
            },
        ],
        name: "ValueExceedsOneHundredPercent",
        type: "error",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: false,
                internalType: "address",
                name: "newAdmin",
                type: "address",
            },
        ],
        name: "AdminChanged",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: false,
                internalType: "uint256",
                name: "newFee",
                type: "uint256",
            },
        ],
        name: "MinimalFeeChanged",
        type: "event",
    },
    {
        inputs: [
            {
                internalType: "string",
                name: "coinName_",
                type: "string",
            },
            {
                internalType: "uint256",
                name: "amount_",
                type: "uint256",
            },
        ],
        name: "calculateCoinFees",
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
                name: "destChainName_",
                type: "string",
            },
        ],
        name: "calculateTransactionFee",
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
                name: "chainName_",
                type: "string",
            },
        ],
        name: "getChainByname",
        outputs: [
            {
                components: [
                    {
                        internalType: "uint64",
                        name: "chainId",
                        type: "uint64",
                    },
                    {
                        internalType: "uint64",
                        name: "domain",
                        type: "uint64",
                    },
                    {
                        internalType: "uint64",
                        name: "txFee",
                        type: "uint64",
                    },
                    {
                        internalType: "bytes14",
                        name: "nativeCoin",
                        type: "bytes14",
                    },
                ],
                internalType: "struct IEmmetFeeOracle.Chain",
                name: "",
                type: "tuple",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "uint64",
                name: "destDomain_",
                type: "uint64",
            },
        ],
        name: "getChainFee",
        outputs: [
            {
                internalType: "uint64",
                name: "",
                type: "uint64",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "uint64",
                name: "destDomain_",
                type: "uint64",
            },
        ],
        name: "getChainNameByDomain",
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
                internalType: "uint64",
                name: "chainId_",
                type: "uint64",
            },
        ],
        name: "getChainNameById",
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
                name: "coinName_",
                type: "string",
            },
        ],
        name: "getCoinFee",
        outputs: [
            {
                components: [
                    {
                        internalType: "uint128",
                        name: "minimum",
                        type: "uint128",
                    },
                    {
                        internalType: "uint128",
                        name: "percentage",
                        type: "uint128",
                    },
                ],
                internalType: "struct IEmmetFeeOracle.CoinFee",
                name: "",
                type: "tuple",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "string",
                name: "coinName",
                type: "string",
            },
        ],
        name: "getCoinPrice",
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
        name: "priceOracle",
        outputs: [
            {
                internalType: "address",
                name: "",
                type: "address",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "protocolFeeDivisor",
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
        name: "selfChainId",
        outputs: [
            {
                internalType: "uint64",
                name: "",
                type: "uint64",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "selfCoin",
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
                internalType: "bytes4",
                name: "interfaceId",
                type: "bytes4",
            },
        ],
        name: "supportsInterface",
        outputs: [
            {
                internalType: "bool",
                name: "",
                type: "bool",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "newAdmin",
                type: "address",
            },
        ],
        name: "updateAdmin",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "string",
                name: "chainName",
                type: "string",
            },
            {
                internalType: "uint64",
                name: "chainId_",
                type: "uint64",
            },
            {
                internalType: "uint64",
                name: "domain_",
                type: "uint64",
            },
            {
                internalType: "uint64",
                name: "txFee_",
                type: "uint64",
            },
            {
                internalType: "string",
                name: "nativeCoin_",
                type: "string",
            },
        ],
        name: "updateChain",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "string",
                name: "coinName_",
                type: "string",
            },
            {
                components: [
                    {
                        internalType: "uint128",
                        name: "minimum",
                        type: "uint128",
                    },
                    {
                        internalType: "uint128",
                        name: "percentage",
                        type: "uint128",
                    },
                ],
                internalType: "struct IEmmetFeeOracle.CoinFee",
                name: "coinFee_",
                type: "tuple",
            },
        ],
        name: "updateCoinFee",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "protocolFeeDivisor_",
                type: "uint256",
            },
        ],
        name: "updateProtocolFeeDivisor",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "txMinimumFee_",
                type: "uint256",
            },
        ],
        name: "updateTxMinimalFee",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
];
const _bytecode = "0x60c060405260016003553480156200001657600080fd5b5060405162001c2c38038062001c2c8339810160408190526200003991620000fe565b600080546001600160a01b031916331790556001600160401b03461660805260016200006684826200027e565b5060028290556001600160a01b038116620000b6576040516349ac169d60e11b815260206004820152600b60248201526a70726963654f7261636c6560a81b604482015260640160405180910390fd5b6001600160a01b031660a052506200034a9050565b634e487b7160e01b600052604160045260246000fd5b80516001600160a01b0381168114620000f957600080fd5b919050565b6000806000606084860312156200011457600080fd5b83516001600160401b03808211156200012c57600080fd5b818601915086601f8301126200014157600080fd5b815181811115620001565762000156620000cb565b604051601f8201601f19908116603f01168101908382118183101715620001815762000181620000cb565b816040528281526020935089848487010111156200019e57600080fd5b600091505b82821015620001c25784820184015181830185015290830190620001a3565b60008484830101528097505050508086015193505050620001e660408501620000e1565b90509250925092565b600181811c908216806200020457607f821691505b6020821081036200022557634e487b7160e01b600052602260045260246000fd5b50919050565b601f8211156200027957600081815260208120601f850160051c81016020861015620002545750805b601f850160051c820191505b81811015620002755782815560010162000260565b5050505b505050565b81516001600160401b038111156200029a576200029a620000cb565b620002b281620002ab8454620001ef565b846200022b565b602080601f831160018114620002ea5760008415620002d15750858301515b600019600386901b1c1916600185901b17855562000275565b600085815260208120601f198616915b828110156200031b57888601518255948401946001909101908401620002fa565b50858210156200033a5787850151600019600388901b60f8161c191681555b5050505050600190811b01905550565b60805160a051611899620003936000396000818161015d0152818161077f015281816107fb0152818161088d015281816109210152610b4d015260006102c901526118996000f3fe608060405234801561001057600080fd5b50600436106101165760003560e01c8063a9d524e3116100a2578063dd1a338e11610071578063dd1a338e14610303578063dfa9124e14610316578063e2f273bd14610329578063ed1c4a121461033c578063f6626c951461034457600080fd5b8063a9d524e31461027e578063b356fa3d14610291578063c9912366146102b1578063cc9e3e89146102c457600080fd5b80634c5140dd116100e95780634c5140dd146101ae5780634d0d6103146101c15780637074dad2146101fb5780637e8e805f1461020e578063a643b7751461022157600080fd5b806301ffc9a71461011b57806325c94d31146101435780632630c12f146101585780633b46a6e714610197575b600080fd5b61012e6101293660046110a6565b610357565b60405190151581526020015b60405180910390f35b6101566101513660046111af565b61038e565b005b61017f7f000000000000000000000000000000000000000000000000000000000000000081565b6040516001600160a01b03909116815260200161013a565b6101a060035481565b60405190815260200161013a565b6101566101bc36600461125e565b6104b4565b6101d46101cf3660046112f3565b610549565b6040805182516001600160801b03908116825260209384015116928101929092520161013a565b6101a061020936600461132f565b610616565b6101a061021c3660046112f3565b610688565b61023461022f3660046112f3565b610a54565b6040805182516001600160401b0390811682526020808501518216908301528383015116918101919091526060918201516001600160901b0319169181019190915260800161013a565b6101a061028c3660046112f3565b610b33565b6102a461029f366004611373565b610bc3565b60405161013a91906113de565b6101566102bf3660046113f1565b610c6f565b6102eb7f000000000000000000000000000000000000000000000000000000000000000081565b6040516001600160401b03909116815260200161013a565b6102a4610311366004611373565b610c7c565b6101566103243660046113f1565b610ca3565b61015661033736600461140a565b610ce7565b6102a4610d3d565b6102eb610352366004611373565b610dcf565b60006301ffc9a760e01b6001600160e01b03198316148061038857506001600160e01b03198216630e54d1cb60e21b145b92915050565b610396610ef3565b620f42406001600160801b031681602001516001600160801b031611156103e65760208101516040516316a9098b60e01b81526001600160801b0390911660048201526024015b60405180910390fd5b80600001516001600160801b03166005836040516104049190611433565b908152604051908190036020019020546001600160801b0316141580610467575080602001516001600160801b03166005836040516104439190611433565b908152604051908190036020019020546001600160801b03600160801b9091041614155b156104b0578060058360405161047d9190611433565b908152604051908190036020908101909120825192909101516001600160801b03908116600160801b0292169190911790555b5050565b6104bc610ef3565b610542858585858573__$da45e8fac203693ea6f365c15770158faa$__63053f3a2f90916040518263ffffffff1660e01b81526004016104fc91906113de565b602060405180830381865af4158015610519573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061053d919061144f565b610f44565b5050505050565b6040805180820190915260008082526020820152600060058360405161056f9190611433565b90815260405190819003602001902080549091506001600160801b03161515806105a957508054600160801b90046001600160801b031615155b6105e95760405162461bcd60e51b81526020600482015260116024820152702ab739bab83837b93a32b21031b7b4b71760791b60448201526064016103dd565b6040805180820190915290546001600160801b038082168352600160801b90910416602082015292915050565b60008061062284610549565b9050600081602001516001600160801b03168461063f919061148f565b82519091506001600160801b031661065a620f4240836114a6565b11156106765761066d620f4240826114a6565b92505050610388565b50516001600160801b03169392505050565b60008060068360405161069b9190611433565b90815260405160209181900391909101812060010154636b73898560e11b825260901b6001600160901b031916600482015273__$da45e8fac203693ea6f365c15770158faa$__9063d6e7130a90602401600060405180830381865af4158015610709573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f1916820160405261073191908101906114c8565b905060006006846040516107459190611433565b90815260405190819003602001812054632aedd0eb60e01b82526001600160401b03600160801b9091041691506000906001600160a01b037f00000000000000000000000000000000000000000000000000000000000000001690632aedd0eb906107b49086906004016113de565b602060405180830381865afa1580156107d1573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906107f5919061153e565b905060007f00000000000000000000000000000000000000000000000000000000000000006001600160a01b0316632aedd0eb60016040518263ffffffff1660e01b81526004016108469190611591565b602060405180830381865afa158015610863573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610887919061153e565b905060007f00000000000000000000000000000000000000000000000000000000000000006001600160a01b031663b0e5fb01866040518263ffffffff1660e01b81526004016108d791906113de565b602060405180830381865afa1580156108f4573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610918919061161c565b60ff16905060007f00000000000000000000000000000000000000000000000000000000000000006001600160a01b031663b0e5fb0160016040518263ffffffff1660e01b815260040161096c9190611591565b602060405180830381865afa158015610989573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906109ad919061161c565b60ff16905060006109be8383611064565b9050818311156109d9576109d2818561148f565b93506109e6565b6109e3818661148f565b94505b6000846001816109f6898b61148f565b610a00919061163f565b610a0a9190611652565b610a1491906114a6565b9050600060035482610a2691906114a6565b90506002548111610a3957600254610a3b565b805b610a45908361163f565b9b9a5050505050505050505050565b6040805160808101825260008082526020820181905291810182905260608101919091526000825111610abe5760405162461bcd60e51b81526020600482015260126024820152712ab739bab83837b93a32b2103237b6b0b4b760711b60448201526064016103dd565b600682604051610ace9190611433565b908152604080516020928190038301812060808201835280546001600160401b038082168452600160401b8204811695840195909552600160801b90049093169181019190915260019091015460901b6001600160901b031916606082015292915050565b604051632aedd0eb60e01b81526000906001600160a01b037f00000000000000000000000000000000000000000000000000000000000000001690632aedd0eb90610b829085906004016113de565b602060405180830381865afa158015610b9f573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610388919061153e565b6001600160401b0381166000908152600460205260409020805460609190610bea90611557565b80601f0160208091040260200160405190810160405280929190818152602001828054610c1690611557565b8015610c635780601f10610c3857610100808354040283529160200191610c63565b820191906000526020600020905b815481529060010190602001808311610c4657829003601f168201915b50505050509050919050565b610c77610ef3565b600355565b6001600160401b0381166000908152600760205260409020805460609190610bea90611557565b610cab610ef3565b60028190556040518181527f076b69250f26f40827dee6a9be68dc3d524f057fb8a34a42ac6ee26fb97f302b906020015b60405180910390a150565b610cef610ef3565b600080546001600160a01b0319166001600160a01b0383169081179091556040519081527f7ce7ec0b50378fb6c0186ffb5f48325f6593fcb4ca4386f21861af3129188f5c90602001610cdc565b606060018054610d4c90611557565b80601f0160208091040260200160405190810160405280929190818152602001828054610d7890611557565b8015610dc55780601f10610d9a57610100808354040283529160200191610dc5565b820191906000526020600020905b815481529060010190602001808311610da857829003601f168201915b5050505050905090565b6001600160401b03811660009081526004602052604081208054829190610df590611557565b80601f0160208091040260200160405190810160405280929190818152602001828054610e2190611557565b8015610e6e5780601f10610e4357610100808354040283529160200191610e6e565b820191906000526020600020905b815481529060010190602001808311610e5157829003601f168201915b505050505090506000815111610ebb5760405162461bcd60e51b81526020600482015260126024820152712ab739bab83837b93a32b2103237b6b0b4b760711b60448201526064016103dd565b600681604051610ecb9190611433565b908152604051908190036020019020546001600160401b03600160801b909104169392505050565b6000546001600160a01b03163314610f425760405162461bcd60e51b81526020600482015260126024820152712ab730baba3437b934b9b2b21031b0b6361760711b60448201526064016103dd565b565b604080516080810182526001600160401b03808716825285811660208301528416818301526001600160901b03198316606082015290518190600690610f8b908990611433565b90815260408051602092819003830190208351815485850151868501516001600160401b039384166fffffffffffffffffffffffffffffffff1990931692909217600160401b918416919091021767ffffffffffffffff60801b1916600160801b91831691909102178255606090940151600190910180546dffffffffffffffffffffffffffff191660909290921c919091179055918616600090815260049091522061103887826116b4565b506001600160401b038516600090815260076020526040902061105b87826116b4565b50505050505050565b60008183111561108a576110788284611652565b61108390600a611857565b9050610388565b6110948383611652565b61109f90600a611857565b9392505050565b6000602082840312156110b857600080fd5b81356001600160e01b03198116811461109f57600080fd5b634e487b7160e01b600052604160045260246000fd5b604051601f8201601f191681016001600160401b038111828210171561110e5761110e6110d0565b604052919050565b60006001600160401b0382111561112f5761112f6110d0565b50601f01601f191660200190565b600082601f83011261114e57600080fd5b813561116161115c82611116565b6110e6565b81815284602083860101111561117657600080fd5b816020850160208301376000918101602001919091529392505050565b80356001600160801b03811681146111aa57600080fd5b919050565b60008082840360608112156111c357600080fd5b83356001600160401b03808211156111da57600080fd5b6111e68783880161113d565b94506040601f19840112156111fa57600080fd5b60405192506040830191508282108183111715611219576112196110d0565b5060405261122960208501611193565b815261123760408501611193565b6020820152809150509250929050565b80356001600160401b03811681146111aa57600080fd5b600080600080600060a0868803121561127657600080fd5b85356001600160401b038082111561128d57600080fd5b61129989838a0161113d565b96506112a760208901611247565b95506112b560408901611247565b94506112c360608901611247565b935060808801359150808211156112d957600080fd5b506112e68882890161113d565b9150509295509295909350565b60006020828403121561130557600080fd5b81356001600160401b0381111561131b57600080fd5b6113278482850161113d565b949350505050565b6000806040838503121561134257600080fd5b82356001600160401b0381111561135857600080fd5b6113648582860161113d565b95602094909401359450505050565b60006020828403121561138557600080fd5b61109f82611247565b60005b838110156113a9578181015183820152602001611391565b50506000910152565b600081518084526113ca81602086016020860161138e565b601f01601f19169290920160200192915050565b60208152600061109f60208301846113b2565b60006020828403121561140357600080fd5b5035919050565b60006020828403121561141c57600080fd5b81356001600160a01b038116811461109f57600080fd5b6000825161144581846020870161138e565b9190910192915050565b60006020828403121561146157600080fd5b81516001600160901b03198116811461109f57600080fd5b634e487b7160e01b600052601160045260246000fd5b808202811582820484141761038857610388611479565b6000826114c357634e487b7160e01b600052601260045260246000fd5b500490565b6000602082840312156114da57600080fd5b81516001600160401b038111156114f057600080fd5b8201601f8101841361150157600080fd5b805161150f61115c82611116565b81815285602083850101111561152457600080fd5b61153582602083016020860161138e565b95945050505050565b60006020828403121561155057600080fd5b5051919050565b600181811c9082168061156b57607f821691505b60208210810361158b57634e487b7160e01b600052602260045260246000fd5b50919050565b60006020808352600084546115a581611557565b808487015260406001808416600081146115c657600181146115e05761160e565b60ff1985168984015283151560051b89018301955061160e565b896000528660002060005b858110156116065781548b82018601529083019088016115eb565b8a0184019650505b509398975050505050505050565b60006020828403121561162e57600080fd5b815160ff8116811461109f57600080fd5b8082018082111561038857610388611479565b8181038181111561038857610388611479565b601f8211156116af57600081815260208120601f850160051c8101602086101561168c5750805b601f850160051c820191505b818110156116ab57828155600101611698565b5050505b505050565b81516001600160401b038111156116cd576116cd6110d0565b6116e1816116db8454611557565b84611665565b602080601f83116001811461171657600084156116fe5750858301515b600019600386901b1c1916600185901b1785556116ab565b600085815260208120601f198616915b8281101561174557888601518255948401946001909101908401611726565b50858210156117635787850151600019600388901b60f8161c191681555b5050505050600190811b01905550565b600181815b808511156117ae57816000190482111561179457611794611479565b808516156117a157918102915b93841c9390800290611778565b509250929050565b6000826117c557506001610388565b816117d257506000610388565b81600181146117e857600281146117f25761180e565b6001915050610388565b60ff84111561180357611803611479565b50506001821b610388565b5060208310610133831016604e8410600b8410161715611831575081810a610388565b61183b8383611773565b806000190482111561184f5761184f611479565b029392505050565b600061109f83836117b656fea26469706673582212204c39fe30653bd617636b3b2cc23ef8b0e929bc0328c53ecbb3dfe62274f711bf64736f6c63430008140033";
const isSuperArgs = (xs) => {
    return (typeof xs[0] === "string" ||
        Array.isArray(xs[0]) ||
        "_isInterface" in xs[0]);
};
class EmmetFeeOracle__factory extends ethers_1.ContractFactory {
    constructor(...args) {
        if (isSuperArgs(args)) {
            super(...args);
        }
        else {
            const [linkLibraryAddresses, signer] = args;
            super(_abi, EmmetFeeOracle__factory.linkBytecode(linkLibraryAddresses), signer);
        }
    }
    static linkBytecode(linkLibraryAddresses) {
        let linkedBytecode = _bytecode;
        linkedBytecode = linkedBytecode.replace(new RegExp("__\\$da45e8fac203693ea6f365c15770158faa\\$__", "g"), linkLibraryAddresses["contracts/libs/StringToFixedBytes.sol:StringToFixedBytes"]
            .replace(/^0x/, "")
            .toLowerCase());
        return linkedBytecode;
    }
    getDeployTransaction(selfCoin_, txMinimumFee_, priceOracle_, overrides) {
        return super.getDeployTransaction(selfCoin_, txMinimumFee_, priceOracle_, overrides || {});
    }
    deploy(selfCoin_, txMinimumFee_, priceOracle_, overrides) {
        return super.deploy(selfCoin_, txMinimumFee_, priceOracle_, overrides || {});
    }
    connect(runner) {
        return super.connect(runner);
    }
    static createInterface() {
        return new ethers_1.Interface(_abi);
    }
    static connect(address, runner) {
        return new ethers_1.Contract(address, _abi, runner);
    }
}
exports.EmmetFeeOracle__factory = EmmetFeeOracle__factory;
EmmetFeeOracle__factory.bytecode = _bytecode;
EmmetFeeOracle__factory.abi = _abi;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRW1tZXRGZWVPcmFjbGVfX2ZhY3RvcnkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9zcmMvY29udHJhY3RzL2V2bS90eXBlY2hhaW4tdHlwZXMvZmFjdG9yaWVzL2NvbnRyYWN0cy9QcmljZU9yYWNsZS9FbW1ldEZlZU9yYWNsZV9fZmFjdG9yeS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSwrQ0FBK0M7QUFDL0Msb0JBQW9CO0FBQ3BCLG9CQUFvQjtBQUNwQixtQ0FLZ0I7QUFjaEIsTUFBTSxJQUFJLEdBQUc7SUFDWDtRQUNFLE1BQU0sRUFBRTtZQUNOO2dCQUNFLFlBQVksRUFBRSxRQUFRO2dCQUN0QixJQUFJLEVBQUUsV0FBVztnQkFDakIsSUFBSSxFQUFFLFFBQVE7YUFDZjtZQUNEO2dCQUNFLFlBQVksRUFBRSxTQUFTO2dCQUN2QixJQUFJLEVBQUUsZUFBZTtnQkFDckIsSUFBSSxFQUFFLFNBQVM7YUFDaEI7WUFDRDtnQkFDRSxZQUFZLEVBQUUsU0FBUztnQkFDdkIsSUFBSSxFQUFFLGNBQWM7Z0JBQ3BCLElBQUksRUFBRSxTQUFTO2FBQ2hCO1NBQ0Y7UUFDRCxlQUFlLEVBQUUsWUFBWTtRQUM3QixJQUFJLEVBQUUsYUFBYTtLQUNwQjtJQUNEO1FBQ0UsTUFBTSxFQUFFO1lBQ047Z0JBQ0UsWUFBWSxFQUFFLFFBQVE7Z0JBQ3RCLElBQUksRUFBRSxhQUFhO2dCQUNuQixJQUFJLEVBQUUsUUFBUTthQUNmO1NBQ0Y7UUFDRCxJQUFJLEVBQUUsY0FBYztRQUNwQixJQUFJLEVBQUUsT0FBTztLQUNkO0lBQ0Q7UUFDRSxNQUFNLEVBQUU7WUFDTjtnQkFDRSxZQUFZLEVBQUUsU0FBUztnQkFDdkIsSUFBSSxFQUFFLE9BQU87Z0JBQ2IsSUFBSSxFQUFFLFNBQVM7YUFDaEI7U0FDRjtRQUNELElBQUksRUFBRSwrQkFBK0I7UUFDckMsSUFBSSxFQUFFLE9BQU87S0FDZDtJQUNEO1FBQ0UsU0FBUyxF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