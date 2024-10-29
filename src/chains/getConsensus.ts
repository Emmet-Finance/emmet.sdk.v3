import { AbiCoder, BigNumberish, JsonRpcProvider, Result } from "ethers";
import { MainnetRPCUri } from "../factory";
import { Consensus, Consensus__factory } from "@emmet-contracts/web3";
import { ReceiveParams } from ".";
import { CrossChainTransaction } from "@emmet-contracts/web3/dist/contracts/consensus/Consensus";

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

    // Exclude non-bridge calldata
    if (calldata.slice(0, 10).toLowerCase() !== selector) {
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

export function decodeCCMTransaction(
    tx: CrossChainTransaction.CCTStructOutput
): CrossChainTransaction.CCTStructOutput {
    const [
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
    ] = tx;

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
    } as CrossChainTransaction.CCTStructOutput;
}

export async function ccmHashByOriginalHash(
    consensus: Consensus,
    originalHash: string,
    batch: BigNumberish = 100n
): Promise<string> {

    function format(s: string): string {
        return s.replace("0x", "").toLowerCase();
    }

    const txs = await consensus.getTransactions(batch, 0n);

    for (const tx of txs) {
        const decoded: CrossChainTransaction.CCTStructOutput = decodeCCMTransaction(tx);
        if (format(decoded.originalHash) === format(originalHash)) return decoded.txHash;
    }

    return "";

}

export async function getTransaction(
    consensus: Consensus,
    ccmHash: string
): Promise<CrossChainTransaction.CCTStructOutput> {
    // Fetch the transaction by hash
    const tx = await consensus.getTransaction(ccmHash);
    // Decode & return
    return decodeCCMTransaction(tx);
}