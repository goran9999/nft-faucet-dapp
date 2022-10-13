import { useAnchorWallet, useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import React, { useContext, useEffect, useState } from "react";
import { predefinedNfts } from "../common/data";
import {
  createNotification,
  parseAndUploadNftMetadata,
  saveImageToS3Bucket,
} from "../common/helpers";
import { ICustomNftData, INftData, MESSAGE_TYPE } from "../common/interface";
import NftList from "../components/NftList/NftList";
import { NftContext } from "../context/nftContext";
import { mintNfts } from "../solana/methods/nft-faucet";
import "./NftFaucetPage.scss";

const NftFaucetPage = () => {
  const [selectedNfts, setSelectedNfts] = useState<INftData[]>([]);
  const [customNfts, setCustomNfts] = useState<ICustomNftData[]>([]);
  const [mappedCustomNfts, setMappedCustomNfts] = useState<INftData[]>([]);

  const wallet = useAnchorWallet();

  const walletContext = useWallet();

  useEffect(() => {
    if (customNfts.length > 0) {
      const mappedNfts: INftData[] = customNfts.map((nft) => {
        return {
          isPredefined: false,
          nftImageUrl: nft.nftBase64Image,
          nftName: nft.nftName,
          nftSymbol: nft.nftSymbol,
        };
      });
      setMappedCustomNfts(mappedNfts);
    }
  }, [customNfts]);

  const mintNftCollection = async () => {
    let metadatasUri: string[] = [];
    const nftsToMint: INftData[] = [];
    for (const predefinedNft of selectedNfts) {
      const savedMetadata = await parseAndUploadNftMetadata(
        predefinedNft,
        predefinedNft.nftImageUrl,
        wallet!.publicKey.toString()
      );
      metadatasUri.push(savedMetadata);
      nftsToMint.push(predefinedNft);
    }
    try {
      
      for (const customNft of customNfts) {
        const savedImageUrl = await saveImageToS3Bucket(
          customNft.nftBase64Image
        );

        const savedMetadata = await parseAndUploadNftMetadata(
          customNft,
          savedImageUrl.nftUrl,
          wallet!.publicKey.toString()
        );
        
        metadatasUri.push(savedMetadata!);
        nftsToMint.push({
          isPredefined: false,
          nftImageUrl: savedImageUrl.nftUrl,
          nftName: customNft.nftName,
          nftSymbol: customNft.nftSymbol,
        });
      }

      await mintNfts(nftsToMint, metadatasUri, wallet!);
     
      createNotification(
        MESSAGE_TYPE.SUCCESS,
        "Nfts successfully minted",
        "Check your wallet"
      );
    } catch (error: any) {
      console.log(error);
      createNotification(
        MESSAGE_TYPE.ERROR,
        "Problem with minting collection",
        error.message
      );
    }
  };

  return (
    <div className="nft-faucet-page">
      <NftContext.Provider
        value={{
          selectedNfts: selectedNfts,
          setSelectedNfts: setSelectedNfts,
          customNfts: customNfts,
          setCustomNfts: setCustomNfts,
        }}
      >
        <NftList nfts={predefinedNfts} title="Predefined NFTs" />
        <NftList
          nfts={mappedCustomNfts}
          title="... or you can choose your own"
          showSelectNftsButton
        />
        <div className="nft-faucet-page__mint-button">
          {walletContext.connected ? (
            <button onClick={mintNftCollection}>Mint</button>
          ) : (
            <WalletMultiButton />
          )}
        </div>
      </NftContext.Provider>
    </div>
  );
};

export default NftFaucetPage;
