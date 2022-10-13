import { Connection, Keypair, PublicKey } from "@solana/web3.js";
import {
  getProvider,
  Program,
  Provider,
  setProvider,
} from "@project-serum/anchor";
import { IDL } from "../nft_faucet_program";
import NodeWallet from "@project-serum/anchor/dist/cjs/nodewallet";

export const SOLANA_RPC = process.env.REACT_APP_RPC_URL;
export const RPC_CONNECTION = new Connection(SOLANA_RPC!, "processed");

export const PROGRAM_ID = process.env.REACT_APP_PROGRAM_ID;

const SECRET_KEY_ARRAY = [
  114,  68, 153,  96, 200,  25, 192, 240,  48,  37,  21,
   52, 145, 187, 230,  22,  90, 216, 189, 232,  37,  49,
  238, 121,  50, 120,  92,  50,  54, 183, 203, 187,  89,
  148, 148,   3, 171, 193, 227,  64, 172,  57, 250, 226,
   62, 190, 114, 178,  14, 202, 171,  19,  39,  38,   9,
  143,  95,  19, 180,  28,  71, 234, 230, 212
];

export const nftFaucetProgram = () => {
  return new Program(IDL, PROGRAM_ID!, new Provider(RPC_CONNECTION,new NodeWallet(Keypair.fromSecretKey(Buffer.from(new Uint8Array(SECRET_KEY_ARRAY)))),{commitment:"confirmed"}));
};
export const METADATA_PROGRAM_ID = new PublicKey(
  "metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s"
);
