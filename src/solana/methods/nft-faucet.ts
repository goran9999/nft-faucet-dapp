import { TOKEN_PROGRAM_ID } from "@solana/spl-token";
import { AnchorWallet } from "@solana/wallet-adapter-react";
import {
  AccountMeta,
  Keypair,
  PublicKey,
  SystemProgram,
  SYSVAR_CLOCK_PUBKEY,
  SYSVAR_RENT_PUBKEY,
  TransactionInstruction,
} from "@solana/web3.js";
import {
  ICustomNftData,
  IInstructionData,
  INftData,
} from "../../common/interface";
import {
  METADATA_PROGRAM_ID,
  nftFaucetProgram,
  RPC_CONNECTION,
} from "../helpers/utilities";
import { Metadata } from "@metaplex-foundation/mpl-token-metadata";
import { chunk } from "lodash";
import {
  createAndInitializeAssociatedTokenAccount,
  createAndInitializeMint,
} from "../helpers/helpers";
import { sendTransactions } from "../sendTransactions";

export async function mintNfts(
  nfts: INftData[],
  metadataUris: string[],
  wallet: AnchorWallet
) {
  try {
    const allInstructions: IInstructionData[] = [];
    let collectionMint: Keypair | undefined;
    const nftFaucet = nftFaucetProgram();
    const { mint, createAccountIx, createMintIx } =
      await createAndInitializeMint(wallet);
    collectionMint = mint;
    allInstructions.push({
      instructions: [createAccountIx, createMintIx],
      partialSigner: collectionMint,
    });

    const chunkedNfts = chunk(nfts, 2);
    const chunkedMetadatas = chunk(metadataUris, 2);
    // if (chunkedNfts.length !== chunkedMetadatas.length) {
    //   throw new Error("Missing metadatas for nft!");
    // }
    for (const [arrayIndex, nftArray] of chunkedNfts.entries()) {
      for (const [nftInfex, nft] of nftArray.entries()) {
        const relatedMetadata = chunkedMetadatas[arrayIndex][nftInfex];
        const { mint, createAccountIx, createMintIx } =
          await createAndInitializeMint(wallet);
        const { ataKeypar, createAtaIx } =
          await createAndInitializeAssociatedTokenAccount(
            wallet,
            mint.publicKey
          );
        allInstructions.push({
          instructions: [createAccountIx, createMintIx],
          partialSigner: mint,
        });

        allInstructions.push({
          instructions: [createAtaIx],
        });
        const [metadataPda] = await PublicKey.findProgramAddress(
          [
            Buffer.from("metadata"),
            METADATA_PROGRAM_ID.toBuffer(),
            mint.publicKey.toBuffer(),
          ],
          METADATA_PROGRAM_ID
        );
        const [editionPda] = await PublicKey.findProgramAddress(
          [
            Buffer.from("metadata"),
            METADATA_PROGRAM_ID.toBuffer(),
            mint.publicKey.toBuffer(),
            Buffer.from("edition"),
          ],
          METADATA_PROGRAM_ID
        );
        const remainingAccounts: AccountMeta[] = [];
        remainingAccounts.push({
          isSigner: false,
          isWritable: true,
          pubkey: mint.publicKey,
        });
        remainingAccounts.push({
          isSigner: false,
          isWritable: true,
          pubkey: ataKeypar,
        });
        remainingAccounts.push({
          isSigner: false,
          isWritable: true,
          pubkey: metadataPda,
        });
        remainingAccounts.push({
          isSigner: false,
          isWritable: true,
          pubkey: editionPda,
        });
        const [nftCollectionData] = await PublicKey.findProgramAddress(
          [
            Buffer.from("nft-minting"),
            wallet.publicKey.toBuffer(),
            collectionMint.publicKey.toBuffer(),
          ],
          nftFaucet.programId
        );
        const mintNftIx = nftFaucet.instruction.mintNftCollection(
          [
            {
              name: nft.nftName,
              symbol: nft.nftSymbol,
              uri: relatedMetadata,
            },
          ],
          {
            accounts: {
              nftCollectionData,
              nftAuthority: wallet.publicKey,
              systemProgram: SystemProgram.programId,
              tokenProgram: TOKEN_PROGRAM_ID,
              clock: SYSVAR_CLOCK_PUBKEY,
              collectionAddress: collectionMint.publicKey,
              rent: SYSVAR_RENT_PUBKEY,
              metadataProgram: METADATA_PROGRAM_ID,
            },
            remainingAccounts,
          }
        );
        allInstructions.push({
          instructions: [mintNftIx],
        });
      }
    }
    await sendTransactions(RPC_CONNECTION, wallet, allInstructions);
  } catch (error) {
    console.log(error);
    throw error;
  }
}
