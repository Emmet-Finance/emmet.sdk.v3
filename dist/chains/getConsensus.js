"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTransaction = exports.ccmHashByOriginalHash = exports.decodeCCMTransaction = exports.decodeCalldata = exports.getConsensus = void 0;
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
exports.getConsensus = getConsensus;
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
exports.decodeCalldata = decodeCalldata;
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
exports.decodeCCMTransaction = decodeCCMTransaction;
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
exports.ccmHashByOriginalHash = ccmHashByOriginalHash;
async function getTransaction(consensus, ccmHash) {
    // Fetch the transaction by hash
    const tx = await consensus.getTransaction(ccmHash);
    // Decode & return
    return decodeCCMTransaction(tx);
}
exports.getTransaction = getTransaction;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0Q29uc2Vuc3VzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2NoYWlucy9nZXRDb25zZW5zdXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsbUNBQXlFO0FBQ3pFLHdDQUEyQztBQUMzQyxnREFBc0U7QUFJdEUsNEJBQTRCO0FBQzVCLE1BQU0sSUFBSSxHQUFHLHVCQUFhLENBQUMsT0FBTyxDQUFDO0FBRW5DLE1BQU0sb0JBQW9CLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsSUFBSSx3QkFBZSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFFckU7Ozs7Ozs7R0FPRztBQUNJLEtBQUssVUFBVSxZQUFZO0lBRTlCLE1BQU0sY0FBYyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUUvRCxNQUFNLFFBQVEsR0FBRyxvQkFBb0IsQ0FBQyxjQUFjLENBQUMsQ0FBQztJQUV0RCxtQkFBbUI7SUFDbkIsSUFBSSxDQUFDO1FBQ0QsTUFBTSxRQUFRLENBQUMsVUFBVSxFQUFFLENBQUM7SUFDaEMsQ0FBQztJQUFDLE1BQU0sQ0FBQztRQUNMLE9BQU8sTUFBTSxZQUFZLEVBQUUsQ0FBQztJQUNoQyxDQUFDO0lBRUQsNkJBQTZCO0lBQzdCLE1BQU0sV0FBVyxHQUFXLDRDQUE0QyxDQUFDO0lBRXpFLE1BQU0sU0FBUyxHQUFjLHlCQUFrQixDQUFDLE9BQU8sQ0FDbkQsV0FBVyxFQUNYLFFBQVEsQ0FDWCxDQUFDO0lBRUYsT0FBTyxTQUFTLENBQUM7QUFFckIsQ0FBQztBQXZCRCxvQ0F1QkM7QUFFRDs7OztHQUlHO0FBQ0gsU0FBZ0IsY0FBYyxDQUFDLFFBQWdCO0lBRTNDLE1BQU0sUUFBUSxHQUFXLFlBQVksQ0FBQztJQUV0Qyw4QkFBOEI7SUFDOUIsSUFBSSxRQUFRLENBQUMsS0FBSyxD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