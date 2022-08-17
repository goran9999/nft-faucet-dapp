//TODO@milica: check if we need this file
import { encode } from "@project-serum/anchor/dist/cjs/utils/bytes/bs58";
import { WalletSigner } from "@solana/spl-governance/lib/tools/walletAdapter";
import {
  Commitment,
  Connection,
  SignatureStatus,
  SimulatedTransactionResponse,
  Transaction,
  TransactionSignature,
  PublicKey,
  TransactionInstruction,
} from "@solana/web3.js";
import { IInstructionData } from "../common/interface";
import { RPC_CONNECTION } from "./helpers/utilities";

import { getUnixTs, simulateTransaction } from "./sendTransaction";

export const sleep = (ttl: number) =>
  new Promise((resolve) => setTimeout(() => resolve(true), ttl));
/**
 * Awaits for confirmation of transaction signature
 *
 * @param txid
 * @param timeout
 * @param connection
 * @param commitment
 * @param queryStatus
 * @returns
 */
async function awaitTransactionSignatureConfirmation(
  txid: TransactionSignature,
  timeout: number,
  connection: Connection,
  commitment: Commitment = "recent",
  queryStatus = false
) {
  let done = false;
  let status: SignatureStatus | null = {
    slot: 0,
    confirmations: 0,
    err: null,
  };
  let subId = 0;
  await new Promise((resolve, reject) => {
    const fn = async () => {
      setTimeout(() => {
        if (done) {
          return;
        }
        done = true;
        reject({ timeout: true });
      }, timeout);
      try {
        subId = connection.onSignature(
          txid,
          (result, context) => {
            done = true;
            status = {
              err: result.err,
              slot: context.slot,
              confirmations: 0,
            };
            if (result.err) {
              console.log("Rejected via websocket", result.err);
              reject(result.err);
            } else {
              console.log("Resolved via websocket", result);
              resolve(result);
            }
          },
          commitment
        );
      } catch (e) {
        done = true;
        console.error("WS error in setup", txid, e);
      }
      while (!done && queryStatus) {
        // eslint-disable-next-line no-loop-func
        const fn = async () => {
          try {
            const signatureStatuses = await connection.getSignatureStatuses([
              txid,
            ]);
            status = signatureStatuses && signatureStatuses.value[0];
            if (!done) {
              if (!status) {
                console.log("REST null result for", txid, status);
              } else if (status.err) {
                console.log("REST error for", txid, status);
                done = true;
                reject(status.err);
              } else if (!status.confirmations) {
                console.log("REST no confirmations for", txid, status);
              } else {
                console.log("REST confirmation for", txid, status);
                done = true;
                resolve(status);
              }
            }
          } catch (e) {
            if (!done) {
              console.log("REST connection error: txid", txid, e);
            }
            throw e;
          }
        };
        await fn();
        await sleep(2000);
      }
    };
    fn();
  })
    .catch((err) => {
      if (err.timeout && status) {
        status.err = { timeout: true };
      }

      //@ts-ignore
      if (connection._signatureSubscriptions[subId])
        connection.removeSignatureListener(subId);
      throw err;
    })
    .then((_) => {
      //@ts-ignore
      if (connection._signatureSubscriptions[subId])
        connection.removeSignatureListener(subId);
    });
  done = true;
  return status;
}

/**
 * Sends signed transaction
 * @param param0
 * @returns
 */
export async function sendSignedTransaction({
  signedTransaction,
  connection,
  timeout = 60000,
  errorMessage,
}: {
  signedTransaction: Transaction;
  connection: Connection;
  sendingMessage?: string;
  sentMessage?: string;
  successMessage?: string;
  errorMessage?: string;
  timeout?: number;
}): Promise<{ txid: string; slot: number }> {
  const rawTransaction = signedTransaction.serialize();
  const startTime = getUnixTs();
  let slot = 0;
  const txid: TransactionSignature = await connection.sendRawTransaction(
    rawTransaction,
    {
      skipPreflight: true,
    }
  );

  console.log("Started awaiting confirmation for", txid);

  let done = false;
  (async () => {
    while (!done && getUnixTs() - startTime < timeout) {
      connection.sendRawTransaction(rawTransaction, {
        skipPreflight: true,
      });
      await sleep(500);
    }
  })();
  try {
    const confirmation = await awaitTransactionSignatureConfirmation(
      txid,
      timeout,
      connection,
      "recent",
      true
    );

    if (confirmation.err) {
      console.error(confirmation.err);
      throw new Error("Transaction failed: Custom instruction error");
    }

    slot = confirmation?.slot || 0;
  } catch (error) {
    if (error instanceof Object && error.hasOwnProperty("timeout")) {
      throw new Error("Timed out awaiting confirmation on transaction");
    }
    let simulateResult: SimulatedTransactionResponse | null = null;
    try {
      simulateResult = (
        await simulateTransaction(connection, signedTransaction, "single")
      ).value;
    } catch (e) {
      //
    }

    throw new Error(`$Transaction failed ${txid}`);
  } finally {
    done = true;
  }

  console.log("Latency", txid, getUnixTs() - startTime);
  return { txid, slot };
}

/**
 * Sends multiple transactions at once
 *
 * @param connection
 * @param wallet
 * @param instructionSet
 * @param isClubCreation
 * @param clubInfo
 * @param sequenceType
 * @param commitment
 * @param successCallback
 * @param failCallback
 * @param block
 * @returns
 */
export const sendTransactions = async (
  connection: Connection,
  wallet: WalletSigner,
  instructionSet: IInstructionData[],
  commitment: Commitment = "singleGossip",
  successCallback: (txid: string, ind: number) => void = (_txid, _ind) => null,
  failCallback: (reason: string, ind: number) => boolean = (_txid, _ind) =>
    false,
  block?: {
    blockhash: string;
    lastValidBlockHeight: number;
  }
) => {
  try {
    if (!wallet.publicKey) throw new Error("Wallet not connected!");
    const accountInfo = await RPC_CONNECTION.getParsedAccountInfo(
      wallet.publicKey
    );
    if (!accountInfo.value) throw new Error("You do not have enough SOL.");
    const unsignedTxns: Transaction[] = [];
    let signedTxns: Transaction[] = [];
    if (!block) {
      block = await connection.getLatestBlockhash(commitment);
    }

    for (let i = 0; i < instructionSet.length; i++) {
      const instructions = instructionSet[i];

      if (instructions.instructions.length === 0) {
        continue;
      }

      const transaction = new Transaction({
        feePayer: wallet.publicKey,
        recentBlockhash: block.blockhash,
      });
      if (instructions.partialSigner) {
        transaction.partialSign(instructions.partialSigner);
      }

      instructions.instructions.forEach((instruction) =>
        transaction.add(instruction)
      );

      unsignedTxns.push(transaction);

      const pendingTxns: { txid: string; slot: number }[] = [];

      const breakEarlyObject = { breakEarly: false };

      for (let i = 0; i < signedTxns.length; i++) {
        try {
          const signedTxnPromise = await sendSignedTransaction({
            connection,
            signedTransaction: signedTxns[i],
          });

          pendingTxns.push(signedTxnPromise);
        } catch (error: any) {
          console.log(error);
          const instructionsSetNew = instructionSet.slice(
            i,
            instructionSet.length
          );

          async () => {
            try {
              await sendTransactions(connection, wallet, instructionsSetNew);
            } catch (error) {
              console.log(error);
            }
          };
        }

        // eslint-disable-next-line eqeqeq
      }

      // eslint-disable-next-line eqeqeq
      // if (sequenceType != SequenceType.Parallel) {
      //   await Promise.all(pendingTxns);
      // }
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
};
