import { Keypair, TransactionInstruction } from "@solana/web3.js";

export interface INftData {
  nftName: string;
  nftSymbol: string;
  nftImageUrl: string;
  isPredefined: boolean;
}

export interface ICustomNftData {
  nftName: string;
  nftSymbol: string;
  nftBase64Image: string;
}

export interface IInstructionData {
  instructions: TransactionInstruction[];
  partialSigner?: Keypair;
}

export enum MESSAGE_TYPE {
  SUCCESS = "success",
  ERROR = "error",
}
