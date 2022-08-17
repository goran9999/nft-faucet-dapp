import { Connection, PublicKey } from "@solana/web3.js";
import { Program } from "@project-serum/anchor";
import { IDL } from "../nft_faucet_program";

export const SOLANA_RPC = process.env.REACT_APP_RPC_URL;
export const RPC_CONNECTION = new Connection(SOLANA_RPC!, "processed");

export const PROGRAM_ID = process.env.REACT_APP_PROGRAM_ID;

export const nftFaucetProgram = () => {
  return new Program(IDL, PROGRAM_ID!);
};
export const METADATA_PROGRAM_ID = new PublicKey(
  "metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s"
);
