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
/**
 * Deserialized a CCM transaction
 * @param tx a CCM transaction from the Consensus
 * @returns a deserialized CCM transaction
 */
export declare function decodeCCMTransaction(tx: CrossChainTransaction.CCTStructOutput): CrossChainTransaction.CCTStructOutput;
/**
 * Fetches a CCM `txHash` by the original chain hash
 * @param consensus a consensus instance
 * @param originalHash the original chain hash
 * @param batch batch of searched txs
 * @returns a CCM hash
 */
export declare function ccmHashByOriginalHash(consensus: Consensus, originalHash: string, batch?: BigNumberish): Promise<string>;
/**
 * Fetches a single CCM Transaction
 * @param consensus the consensus instance
 * @param ccmHash a Cross-Chain Messaging ID
 * @returns a CCM txHash
 */
export declare function getTransaction(consensus: Consensus, ccmHash: string): Promise<CrossChainTransaction.CCTStructOutput & {
    decoded?: ReceiveParams;
}>;
/**
 * Fetches the `batch` of transactions
 * @param consensus the consensus instance
 * @param batch batch of searched txs
 * @param skip the number of ommited txs
 * @returns the `batch` or an available number of txs
 */
export declare function getTransactions(consensus: Consensus, batch?: BigNumberish, skip?: BigNumberish): Promise<(CrossChainTransaction.CCTStructOutput & {
    decoded?: any;
})[]>;
//# sourceMappingURL=getConsensus.d.ts.map