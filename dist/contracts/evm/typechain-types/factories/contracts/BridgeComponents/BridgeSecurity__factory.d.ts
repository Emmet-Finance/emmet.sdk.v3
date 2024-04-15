import { ContractFactory, ContractTransactionResponse } from "ethers";
import type { Signer, ContractDeployTransaction, ContractRunner } from "ethers";
import type { NonPayableOverrides } from "../../../common";
import type { BridgeSecurity, BridgeSecurityInterface } from "../../../contracts/BridgeComponents/BridgeSecurity";
type BridgeSecurityConstructorParams = [signer?: Signer] | ConstructorParameters<typeof ContractFactory>;
export declare class BridgeSecurity__factory extends ContractFactory {
    constructor(...args: BridgeSecurityConstructorParams);
    getDeployTransaction(overrides?: NonPayableOverrides & {
        from?: string;
    }): Promise<ContractDeployTransaction>;
    deploy(overrides?: NonPayableOverrides & {
        from?: string;
    }): Promise<BridgeSecurity & {
        deploymentTransaction(): ContractTransactionResponse;
    }>;
    connect(runner: ContractRunner | null): BridgeSecurity__factory;
    static readonly bytecode = "0x60806040523480156200001157600080fd5b506000600160006101000a81548160ff0219169083151502179055506001600281905550620000596000801b6200004d6200012660201b60201c565b6200012e60201b60201c565b506200009b7f91254af6ef471a2b22aab0d27dac912f65156059964a7fe1f3f45622a2a502c36200008f6200012660201b60201c565b6200012e60201b60201c565b50620000dd7f65d7a28e3265b37a6474929f336521b332c1681b933f6cb9f3376673440d862a620000d16200012660201b60201c565b6200012e60201b60201c565b506200011f7f10dac8c06a04bec0b551627dad28bc00d6516b0caacd1c7b345fcdb5211334e4620001136200012660201b60201c565b6200012e60201b60201c565b506200029b565b600033905090565b60006200014283836200023160201b60201c565b6200022657600160008085815260200190815260200160002060000160008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff021916908315150217905550620001c26200012660201b60201c565b73ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff16847f2f8788117e7eff1d82e926ec794901d17c78024a50270940304540a733656f0d60405160405180910390a4600190506200022b565b600090505b92915050565b600080600084815260200190815260200160002060000160008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff16905092915050565b610da580620002ab6000396000f3fe6080604052600436106100f75760003560e01c80634d238c8e1161008a57806391d148541161005957806391d14854146102f8578063a217fddf14610335578063d547741f14610360578063e63ab1e914610389576100fe565b80634d238c8e146102625780635c975abb1461028b5780638456cb59146102b657806385f438c1146102cd576100fe565b806336568abe116100c657806336568abe146101ce5780633f4ba83a146101f757806340a141ff1461020e5780634247836814610237576100fe565b806301ffc9a714610100578063248a9ca31461013d5780632db63e1d1461017a5780632f2ff15d146101a5576100fe565b366100fe57005b005b34801561010c57600080fd5b5061012760048036038101906101229190610b61565b6103b4565b6040516101349190610ba9565b60405180910390f35b34801561014957600080fd5b50610164600480360381019061015f9190610bfa565b61042e565b6040516101719190610c36565b60405180910390f35b34801561018657600080fd5b5061018f61044d565b60405161019c9190610c36565b60405180910390f35b3480156101b157600080fd5b506101cc60048036038101906101c79190610caf565b610471565b005b3480156101da57600080fd5b506101f560048036038101906101f09190610caf565b610493565b005b34801561020357600080fd5b5061020c61050e565b005b34801561021a57600080fd5b5061023560048036038101906102309190610cef565b610543565b005b34801561024357600080fd5b5061024c61057e565b6040516102599190610c36565b60405180910390f35b34801561026e57600080fd5b5061028960048036038101906102849190610cef565b6105a2565b005b34801561029757600080fd5b506102a06105dd565b6040516102ad9190610ba9565b60405180910390f35b3480156102c257600080fd5b506102cb6105f4565b005b3480156102d957600080fd5b506102e2610629565b6040516102ef9190610c36565b60405180910390f35b34801561030457600080fd5b5061031f600480360381019061031a9190610caf565b61064d565b60405161032c9190610ba9565b60405180910390f35b34801561034157600080fd5b5061034a6106b7565b6040516103579190610c36565b60405180910390f35b34801561036c57600080fd5b5061038760048036038101906103829190610caf565b6106be565b005b34801561039557600080fd5b5061039e6106e0565b6040516103ab9190610c36565b60405180910390f35b60007f7965db0b000000000000000000000000000000000000000000000000000000007bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff19161480610427575061042682610704565b5b9050919050565b6000806000838152602001908152602001600020600101549050919050565b7f91254af6ef471a2b22aab0d27dac912f65156059964a7fe1f3f45622a2a502c381565b61047a8261042e565b6104838161076e565b61048d8383610782565b50505050565b61049b610873565b73ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff16146104ff576040517f6697b23200000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b610509828261087b565b505050565b7f65d7a28e3265b37a6474929f336521b332c1681b933f6cb9f3376673440d862a6105388161076e565b61054061096d565b50565b6000801b6105508161076e565b61057a7f4b9166b2e998c2955a9bb028c99665e792fb350659767827c9ca91a745a16e7c836106be565b5050565b7f4b9166b2e998c2955a9bb028c99665e792fb350659767827c9ca91a745a16e7c81565b6000801b6105af8161076e565b6105d97f4b9166b2e998c2955a9bb028c99665e792fb350659767827c9ca91a745a16e7c83610471565b5050565b6000600160009054906101000a900460ff16905090565b7f65d7a28e3265b37a6474929f336521b332c1681b933f6cb9f3376673440d862a61061e8161076e565b6106266109d0565b50565b7f10dac8c06a04bec0b551627dad28bc00d6516b0caacd1c7b345fcdb5211334e481565b600080600084815260200190815260200160002060000160008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff16905092915050565b6000801b81565b6106c78261042e565b6106d08161076e565b6106da838361087b565b50505050565b7f65d7a28e3265b37a6474929f336521b332c1681b933f6cb9f3376673440d862a81565b60007f01ffc9a7000000000000000000000000000000000000000000000000000000007bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916149050919050565b61077f8161077a610873565b610a32565b50565b600061078e838361064d565b61086857600160008085815260200190815260200160002060000160008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff021916908315150217905550610805610873565b73ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff16847f2f8788117e7eff1d82e926ec794901d17c78024a50270940304540a733656f0d60405160405180910390a46001905061086d565b600090505b92915050565b600033905090565b6000610887838361064d565b1561096257600080600085815260200190815260200160002060000160008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff0219169083151502179055506108ff610873565b73ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff16847ff6391f5c32d9c69d2a47ea670b442974b53935d1edc7fd64eb21e047a839171b60405160405180910390a460019050610967565b600090505b92915050565b610975610a83565b6000600160006101000a81548160ff0219169083151502179055507f5db9ee0a495bf2e6ff9c91a7834c1ba4fdd244a5e8aa4e537bd38aeae4b073aa6109b9610873565b6040516109c69190610d2b565b60405180910390a1565b6109d8610ac3565b60018060006101000a81548160ff0219169083151502179055507f62e78cea01bee320cd4e420270b5ea74000d11b0c9f74754ebdbfc544b05a258610a1b610873565b604051610a289190610d2b565b60405180910390a1565b610a3c828261064d565b610a7f5780826040517fe2517d3f000000000000000000000000000000000000000000000000000000008152600401610a76929190610d46565b60405180910390fd5b5050565b610a8b6105dd565b610ac1576040517f8dfc202b00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b565b610acb6105dd565b15610b02576040517fd93c066500000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b565b600080fd5b60007fffffffff0000000000000000000000000000000000000000000000000000000082169050919050565b610b3e81610b09565b8114610b4957600080fd5b50565b600081359050610b5b81610b35565b92915050565b600060208284031215610b7757610b76610b04565b5b6000610b8584828501610b4c565b91505092915050565b60008115159050919050565b610ba381610b8e565b82525050565b6000602082019050610bbe6000830184610b9a565b92915050565b6000819050919050565b610bd781610bc4565b8114610be257600080fd5b50565b600081359050610bf481610bce565b92915050565b600060208284031215610c1057610c0f610b04565b5b6000610c1e84828501610be5565b91505092915050565b610c3081610bc4565b82525050565b6000602082019050610c4b6000830184610c27565b92915050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000610c7c82610c51565b9050919050565b610c8c81610c71565b8114610c9757600080fd5b50565b600081359050610ca981610c83565b92915050565b60008060408385031215610cc657610cc5610b04565b5b6000610cd485828601610be5565b9250506020610ce585828601610c9a565b9150509250929050565b600060208284031215610d0557610d04610b04565b5b6000610d1384828501610c9a565b91505092915050565b610d2581610c71565b82525050565b6000602082019050610d406000830184610d1c565b92915050565b6000604082019050610d5b6000830185610d1c565b610d686020830184610c27565b939250505056fea2646970667358221220cd70bede6336aad76aac1f34f68efe0cff2a7c7d21622794405a85194135ff0464736f6c63430008140033";
    static readonly abi: readonly [{
        readonly inputs: readonly [];
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
        readonly inputs: readonly [];
        readonly name: "EnforcedPause";
        readonly type: "error";
    }, {
        readonly inputs: readonly [];
        readonly name: "ExpectedPause";
        readonly type: "error";
    }, {
        readonly inputs: readonly [];
        readonly name: "ReentrancyGuardReentrantCall";
        readonly type: "error";
    }, {
        readonly anonymous: false;
        readonly inputs: readonly [{
            readonly indexed: false;
            readonly internalType: "address";
            readonly name: "account";
            readonly type: "address";
        }];
        readonly name: "Paused";
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
            readonly indexed: false;
            readonly internalType: "address";
            readonly name: "account";
            readonly type: "address";
        }];
        readonly name: "Unpaused";
        readonly type: "event";
    }, {
        readonly stateMutability: "payable";
        readonly type: "fallback";
    }, {
        readonly inputs: readonly [];
        readonly name: "BRIDGE_VALIDATOR_ROLE";
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
        readonly inputs: readonly [];
        readonly name: "MAPPING_ADMIN_ROLE";
        readonly outputs: readonly [{
            readonly internalType: "bytes32";
            readonly name: "";
            readonly type: "bytes32";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly inputs: readonly [];
        readonly name: "PAUSER_ROLE";
        readonly outputs: readonly [{
            readonly internalType: "bytes32";
            readonly name: "";
            readonly type: "bytes32";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly inputs: readonly [];
        readonly name: "WITHDRAWER_ROLE";
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
            readonly name: "_validator";
            readonly type: "address";
        }];
        readonly name: "addValidator";
        readonly outputs: readonly [];
        readonly stateMutability: "nonpayable";
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
        readonly inputs: readonly [];
        readonly name: "pause";
        readonly outputs: readonly [];
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }, {
        readonly inputs: readonly [];
        readonly name: "paused";
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
            readonly name: "_validator";
            readonly type: "address";
        }];
        readonly name: "removeValidator";
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
        readonly name: "unpause";
        readonly outputs: readonly [];
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }, {
        readonly stateMutability: "payable";
        readonly type: "receive";
    }];
    static createInterface(): BridgeSecurityInterface;
    static connect(address: string, runner?: ContractRunner | null): BridgeSecurity;
}
export {};
//# sourceMappingURL=BridgeSecurity__factory.d.ts.map