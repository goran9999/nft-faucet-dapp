import { Connection, PublicKey } from "@solana/web3.js";
import {
  getProvider,
  Program,
  Provider,
  setProvider,
} from "@project-serum/anchor";
import { IDL } from "../nft_faucet_program";

export const SOLANA_RPC = process.env.REACT_APP_RPC_URL;
export const RPC_CONNECTION = new Connection(SOLANA_RPC!, "processed");

export const PROGRAM_ID = process.env.REACT_APP_PROGRAM_ID;

const provider = setProvider({ connection: RPC_CONNECTION });

export const nftFaucetProgram = () => {
  return new Program(IDL, PROGRAM_ID!, getProvider());
};
export const METADATA_PROGRAM_ID = new PublicKey(
  "metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s"
);
