import { AnchorWallet } from "@solana/wallet-adapter-react";
import {
  Commitment,
  Connection,
  Keypair,
  RpcResponseAndContext,
  SimulatedTransactionResponse,
  Transaction,
} from "@solana/web3.js";
import { RPC_CONNECTION } from "./helpers/utilities";
import { sendSignedTransaction } from "./sendTransactions";

export function getUnixTs() {
  return new Date().getTime() / 1000;
}

export async function sendTransaction({
  transaction,
  wallet,
  signers = [],
  connection,
  sendingMessage = "Sending transaction...",
  errorMessage = "Transaction failed",
  timeout = 60000,
}: {
  transaction: Transaction;
  wallet: AnchorWallet;
  signers?: Array<Keypair>;
  connection: Connection;
  sendingMessage?: string;
  errorMessage?: string;
  timeout?: number;
}) {
  if (!wallet.publicKey) throw new Error("Wallet not connected!");
  const accountInfo = await RPC_CONNECTION.getParsedAccountInfo(
    wallet.publicKey
  );
  if (!accountInfo.value) throw new Error("You do not have enough SOL.");

  return await sendSignedTransaction({
    signedTransaction: transaction,
    connection,
    sendingMessage,
    errorMessage,
    timeout,
  });
}

/** Copy of Connection.simulateTransaction that takes a commitment parameter. */
export async function simulateTransaction(
  connection: Connection,
  transaction: Transaction,
  commitment: Commitment
): Promise<RpcResponseAndContext<SimulatedTransactionResponse>> {
  // @ts-ignore
  transaction.recentBlockhash = await connection._recentBlockhash(
    // @ts-ignore
    connection._disableBlockhashCaching
  );

  console.log("simulating transaction", transaction);

  const signData = transaction.serializeMessage();
  // @ts-ignore
  const wireTransaction = transaction._serialize(signData);
  const encodedTransaction = wireTransaction.toString("base64");

  console.log("encoding");
  const config: any = { encoding: "base64", commitment };
  const args = [encodedTransaction, config];
  console.log("simulating data", args);

  // @ts-ignore
  const res = await connection._rpcRequest("simulateTransaction", args);

  console.log("res simulating transaction", res);
  if (res.error) {
    throw new Error("failed to simulate transaction: " + res.error.message);
  }
  return res.result;
}
