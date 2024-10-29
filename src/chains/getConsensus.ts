import { AbiCoder, JsonRpcProvider, Result } from "ethers";
import { MainnetRPCUri } from "../factory";
import { Consensus, Consensus__factory } from "@emmet-contracts/web3";
import { ReceiveParams } from ".";

// TODO: add testnet support
const rpcs = MainnetRPCUri.POLYGON;

const initializedProviders = rpcs.map((e) => new JsonRpcProvider(e));

/**
 * @returns the consensus contract handler
 * 
 * Usage: 
 * ```ts
 * const consensus: Consensus = await getConsensus();
 * ```
 */
export async function getConsensus(): Promise<Consensus> {

    const randomRpcIndex = Math.floor(Math.random() * rpcs.length);

    const provider = initializedProviders[randomRpcIndex];

    // Liveliness check
    try {
        await provider.getNetwork();
    } catch {
        return await getConsensus();
    }

    // TODO: add testnet support:
    const consAddress: string = "0xCd9036E522F353dD5c94e3da4d1323f9C0e96fBf";

    const consensus: Consensus = Consensus__factory.connect(
        consAddress,
        provider,
    );

    return consensus;

}

/**
 * @notice Deserialize ReceiveParams
 * @param calldata Emmet.Bridge receiveInstallment calldata
 * @returns ReceiveParams
 */
export function decodeCalldata(calldata: string): ReceiveParams | undefined {

    const selector: string = "0x3ba81aee";

    if(calldata.slice(0,10).toLowerCase() !== selector){
        return undefined;
    }

    const coder = new AbiCoder();
  
    // Step 1: remove the transaction selector
    const minusSelector: string = `0x${calldata.slice(10,)}`;
    // Step 2: decode
    const decoded: Result = coder.decode(
      [
        // CCM Hash
        "bytes32",
        // ReseiveInstallmentParams struct
        "tuple(uint256,uint256,uint256,uint256,uint256,uint256,uint128,uint128,string,string,string,bytes)",
      ],
      minusSelector,
    );
  
    // Step 3: extract the params
    const [, reseiveInstallmentParams] = decoded;
  
    // Step 4: destructure the params
    const [
      blockNumber,
      foreignIndexOut,
      value,
      start,
      sentAmount,
      receiveAmount,
      fromChainId,
      toChainId,
      to,
      fromToken,
      toToken,
      data,
    ] = reseiveInstallmentParams;
  
    // Step 5: return as ReceiveParams
    return {
      blockNumber,
      foreignIndexOut,
      value,
      timestamp: start,
      sentAmount,
      receiveAmount,
      fromChainId,
      toChainId,
      to,
      fromToken,
      toToken,
      data,
    } as ReceiveParams;
  }
