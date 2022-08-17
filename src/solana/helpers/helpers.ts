import {
  getMinimumBalanceForRentExemptAccount,
  ACCOUNT_SIZE,
  createInitializeMintInstruction,
  createAssociatedTokenAccountInstruction,
} from "@solana/spl-token";
import { AnchorWallet } from "@solana/wallet-adapter-react";
import {
  Keypair,
  PublicKey,
  SystemProgram,
  Transaction,
} from "@solana/web3.js";
import { RPC_CONNECTION } from "./utilities";

export async function createAndInitializeMint(wallet: AnchorWallet) {
  try {
    const collectionMintKeypar = Keypair.generate();

    const mintAccount = SystemProgram.createAccount({
      fromPubkey: wallet.publicKey,
      lamports: await getMinimumBalanceForRentExemptAccount(RPC_CONNECTION),
      newAccountPubkey: collectionMintKeypar.publicKey,
      programId: SystemProgram.programId,
      space: ACCOUNT_SIZE,
    });
    const createMintIx = createInitializeMintInstruction(
      collectionMintKeypar.publicKey,
      0,
      wallet.publicKey,
      wallet.publicKey
    );
    return {
      mint: collectionMintKeypar,
      createAccountIx: mintAccount,
      createMintIx: createMintIx,
    };
  } catch (error) {
    console.log(error);

    throw error;
  }
}

export async function createAndInitializeAssociatedTokenAccount(
  wallet: AnchorWallet,
  mint: PublicKey
) {
  try {
    const ataKeypar = Keypair.generate();
    const createAccountIx = SystemProgram.createAccount({
      fromPubkey: wallet.publicKey,
      lamports: await getMinimumBalanceForRentExemptAccount(RPC_CONNECTION),
      newAccountPubkey: ataKeypar.publicKey,
      programId: SystemProgram.programId,
      space: ACCOUNT_SIZE,
    });
    const createAtaIx = createAssociatedTokenAccountInstruction(
      wallet.publicKey,
      ataKeypar.publicKey,
      wallet.publicKey,
      mint
    );
    return {
      ataKeypar: ataKeypar,
      createAtaAccountIx: createAccountIx,
      createAtaIx: createAtaIx,
    };
  } catch (error) {
    console.log(error);
    throw error;
  }
}
