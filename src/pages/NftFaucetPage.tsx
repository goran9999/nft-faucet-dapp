import React, { useEffect, useState } from "react";
import { predefinedNfts } from "../common/data";
import { ICustomNftData, INftData } from "../common/interface";
import NftList from "../components/NftList/NftList";
import { NftContext } from "../context/nftContext";
import "./NftFaucetPage.scss";

const NftFaucetPage = () => {
  const [selectedNfts, setSelectedNfts] = useState<INftData[]>([]);
  const [customNfts, setCustomNfts] = useState<ICustomNftData[]>([]);
  const [mappedCustomNfts, setMappedCustomNfts] = useState<INftData[]>([]);
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
      </NftContext.Provider>
    </div>
  );
};

export default NftFaucetPage;
