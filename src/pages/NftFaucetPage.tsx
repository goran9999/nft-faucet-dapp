import React, { useState } from "react";
import { predefinedNfts } from "../common/data";
import { INftData } from "../common/interface";
import NftList from "../components/NftList/NftList";
import { NftContext } from "../context/nftContext";
import "./NftFaucetPage.scss";

const NftFaucetPage = () => {
  const [addedCustomNfts, setAddedCustomNfts] = useState<Array<INftData>>([]);
  const [selectedNfts, setSelectedNfts] = useState<INftData[]>([]);
  return (
    <div className="nft-faucet-page">
      <NftContext.Provider
        value={{
          selectedNfts: selectedNfts,
          setSelectedNfts: setSelectedNfts,
        }}
      >
        <NftList nfts={predefinedNfts} title="Predefined NFTs" />
        <NftList
          nfts={addedCustomNfts}
          title="... or you can choose your own"
          showSelectNftsButton
        />
      </NftContext.Provider>
    </div>
  );
};

export default NftFaucetPage;
