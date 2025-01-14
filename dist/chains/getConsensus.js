"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getConsensus = getConsensus;
exports.decodeCalldata = decodeCalldata;
exports.decodeCCMTransaction = decodeCCMTransaction;
exports.ccmHashByOriginalHash = ccmHashByOriginalHash;
exports.getTransaction = getTransaction;
exports.getTransactions = getTransactions;
const ethers_1 = require("ethers");
const factory_1 = require("../factory");
const web3_1 = require("@emmet-contracts/web3");
// TODO: add testnet support
const rpcs = factory_1.MainnetRPCUri.POLYGON;
const initializedProviders = rpcs.map((e) => new ethers_1.JsonRpcProvider(e));
/**
 * @returns the consensus contract handler
 *
 * Usage:
 * ```ts
 * const consensus: Consensus = await getConsensus();
 * ```
 */
async function getConsensus() {
    const randomRpcIndex = Math.floor(Math.random() * rpcs.length);
    const provider = initializedProviders[randomRpcIndex];
    // Liveliness check
    try {
        await provider.getNetwork();
    }
    catch {
        return await getConsensus();
    }
    // TODO: add testnet support:
    const consAddress = "0xCd9036E522F353dD5c94e3da4d1323f9C0e96fBf";
    const consensus = web3_1.Consensus__factory.connect(consAddress, provider);
    return consensus;
}
/**
 * @notice Deserialize ReceiveParams
 * @param calldata Emmet.Bridge receiveInstallment calldata
 * @returns ReceiveParams
 */
function decodeCalldata(calldata) {
    const selector = "0x3ba81aee";
    // Exclude non-bridge calldata
    if (calldata.slice(0, 10).toLowerCase() !== selector) {
        return undefined;
    }
    const coder = new ethers_1.AbiCoder();
    // Step 1: remove the transaction selector
    const minusSelector = `0x${calldata.slice(10)}`;
    // Step 2: decode
    const decoded = coder.decode([
        // CCM Hash
        "bytes32",
        // ReseiveInstallmentParams struct
        "tuple(uint256,uint256,uint256,uint256,uint256,uint256,uint128,uint128,string,string,string,bytes)",
    ], minusSelector);
    // Step 3: extract the params
    const [, reseiveInstallmentParams] = decoded;
    // Step 4: destructure the params
    const [blockNumber, foreignIndexOut, value, start, sentAmount, receiveAmount, fromChainId, toChainId, to, fromToken, toToken, data,] = reseiveInstallmentParams;
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
    };
}
/**
 * Deserialized a CCM transaction
 * @param tx a CCM transaction from the Consensus
 * @returns a deserialized CCM transaction
 */
function decodeCCMTransaction(tx) {
    const [txHash, indexOrigin, fromChainId, toChainId, started, finished, compensation, msgValue, protocolFee, sender, recipient, originalHash, destinationHash, outcome, data,] = tx;
    return {
        txHash,
        indexOrigin,
        fromChainId,
        toChainId,
        started,
        finished,
        compensation,
        msgValue,
        protocolFee,
        sender,
        recipient,
        originalHash,
        destinationHash,
        outcome,
        data,
    };
}
/**
 * Fetches a CCM `txHash` by the original chain hash
 * @param consensus a consensus instance
 * @param originalHash the original chain hash
 * @param batch batch of searched txs
 * @returns a CCM hash
 */
async function ccmHashByOriginalHash(consensus, originalHash, batch = 100n) {
    function format(s) {
        return s.replace("0x", "").toLowerCase();
    }
    const txs = await consensus.getTransactions(batch, 0n);
    for (const tx of txs) {
        const decoded = decodeCCMTransaction(tx);
        if (format(decoded.originalHash) === format(originalHash))
            return decoded.txHash;
    }
    return "";
}
/**
 * Fetches a single CCM Transaction
 * @param consensus the consensus instance
 * @param ccmHash a Cross-Chain Messaging ID
 * @returns a CCM txHash
 */
async function getTransaction(consensus, ccmHash) {
    // Fetch the transaction by hash
    const tx = await consensus.getTransaction(ccmHash);
    // Decode & return
    return { ...decodeCCMTransaction(tx), decoded: decodeCalldata(tx.data) };
}
/**
 * Fetches the `batch` of transactions
 * @param consensus the consensus instance
 * @param batch batch of searched txs
 * @param skip the number of ommited txs
 * @returns the `batch` or an available number of txs
 */
async function getTransactions(consensus, batch = 100n, skip = 0n) {
    const decoded = [];
    const txs = await consensus.getTransactions(batch, skip);
    for (const tx of txs) {
        decoded.push({ ...decodeCCMTransaction(tx), decoded: decodeCalldata(tx.data) });
    }
    return decoded;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0Q29uc2Vuc3VzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2NoYWlucy9nZXRDb25zZW5zdXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFtQkEsb0NBdUJDO0FBT0Qsd0NBMERDO0FBT0Qsb0RBc0NDO0FBU0Qsc0RBbUJDO0FBUUQsd0NBUUM7QUFTRCwwQ0FpQkM7QUE5TkQsbUNBQXlFO0FBQ3pFLHdDQUEyQztBQUMzQyxnREFBc0U7QUFJdEUsNEJBQTRCO0FBQzVCLE1BQU0sSUFBSSxHQUFHLHVCQUFhLENBQUMsT0FBTyxDQUFDO0FBRW5DLE1BQU0sb0JBQW9CLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsSUFBSSx3QkFBZSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFFckU7Ozs7Ozs7R0FPRztBQUNJLEtBQUssVUFBVSxZQUFZO0lBRTlCLE1BQU0sY0FBYyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUUvRCxNQUFNLFFBQVEsR0FBRyxvQkFBb0IsQ0FBQyxjQUFjLENBQUMsQ0FBQztJQUV0RCxtQkFBbUI7SUFDbkIsSUFBSSxDQUFDO1FBQ0QsTUFBTSxRQUFRLENBQUMsVUFBVSxFQUFFLENBQUM7SUFDaEMsQ0FBQztJQUFDLE1BQU0sQ0FBQztRQUNMLE9BQU8sTUFBTSxZQUFZLEVBQUUsQ0FBQztJQUNoQyxDQUFDO0lBRUQsNkJBQTZCO0lBQzdCLE1BQU0sV0FBVyxHQUFXLDRDQUE0QyxDQUFDO0lBRXpFLE1BQU0sU0FBUyxHQUFjLHlCQUFrQixDQUFDLE9BQU8sQ0FDbkQsV0FBVyxFQUNYLFFBQVEsQ0FDWCxDQUFDO0lBRUYsT0FBTyxTQUFTLENBQUM7QUFFckIsQ0FBQztBQUVEOzs7O0dBSUc7QUFDSCxTQUFnQixjQUFjLENBQUMsUUFBZ0I7SUFFM0MsTUFBTSxR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