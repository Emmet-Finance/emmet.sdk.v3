import { BigNumberish } from "ethers";
import { Consensus } from "@emmet-contracts/web3";
import { ReceiveParams } from ".";
import { CrossChainTransaction } from "@emmet-contracts/web3/dist/contracts/consensus/Consensus";
/**
 * @returns the consensus contract handler
 *
 * Usage:
 * ```ts
 * const consensus: Consensus = await getConsensus();
 * ```
 */
export declare function getConsensus(): Promise<Consensus>;
/**
 * @notice Deserialize ReceiveParams
 * @param calldata Emmet.Bridge receiveInstallment calldata
 * @returns ReceiveParams
 */
export declare function decodeCalldata(calldata: string): ReceiveParams | undefined;
export declare function decodeCCMTransaction(tx: CrossChainTransaction.CCTStructOutput): CrossChainTransaction.CCTStructOutput;
export declare function ccmHashByOriginalHash(consensus: Consensus, originalHash: string, batch?: BigNumberish): Promise<string>;
export declare function getTransaction(consensus: Consensus, ccmHash: string): Promise<CrossChainTransaction.CCTStructOutput>;
//# sourceMappingURL=getConsensus.d.ts.map