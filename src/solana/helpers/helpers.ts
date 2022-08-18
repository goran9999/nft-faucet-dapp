import {
  getMinimumBalanceForRentExemptAccount,
  ACCOUNT_SIZE,
  createInitializeMintInstruction,
  createAssociatedTokenAccountInstruction,
  TOKEN_PROGRAM_ID,
  createMint,
  AccountLayout,
  ASSOCIATED_TOKEN_PROGRAM_ID,
  initializeMintInstructionData,
  MINT_SIZE,
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
      programId: TOKEN_PROGRAM_ID,
      space: MINT_SIZE,
    });

    const createMintIx = createInitializeMintInstruction(
      collectionMintKeypar.publicKey,
      0,
      wallet.publicKey,
      wallet.publicKey,
      TOKEN_PROGRAM_ID
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
    const [ataAddress] = await PublicKey.findProgramAddress(
      [
        wallet.publicKey.toBuffer(),
        TOKEN_PROGRAM_ID.toBuffer(),
        mint.toBuffer(),
      ],
      ASSOCIATED_TOKEN_PROGRAM_ID
    );
    // const createAccountIx = SystemProgram.createAccount({
    //   fromPubkey: wallet.publicKey,
    //   lamports: await getMinimumBalanceForRentExemptAccount(RPC_CONNECTION),
    //   newAccountPubkey: ataAddress,
    //   programId: SystemProgram.programId,
    //   space: ACCOUNT_SIZE,
    // });
    const createAtaIx = createAssociatedTokenAccountInstruction(
      wallet.publicKey,
      ataAddress,
      wallet.publicKey,
      mint
    );
    return {
      ataKeypar: ataAddress,
      // createAtaAccountIx: createAccountIx,
      createAtaIx: createAtaIx,
    };
  } catch (error) {
    console.log(error);
    throw error;
  }
}
