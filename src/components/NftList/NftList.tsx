import React, { FC, useState } from "react";
import { ICustomNftData, INftData } from "../../common/interface";
import CreateNftModal from "../CreateNftModal/CreateNftModal";
import NftCard from "../NftCard/NftCard";
import "./NftList.scss";
const NftList: FC<{
  title: string;
  nfts: INftData[];
  showSelectNftsButton?: boolean;
}> = ({ nfts, title, showSelectNftsButton }) => {
  const [isCreateNftModalVisible, toggleIsCreateNftModalVisible] =
    useState(false);
  return (
    <>
      {isCreateNftModalVisible && (
        <CreateNftModal
          closeModal={() => toggleIsCreateNftModalVisible(false)}
        />
      )}
      <div className="nft-list">
        <h3 className="nft-list__title">{title}</h3>
        <div className="nft-list__nfts">
          {nfts.map((nft) => {
            return <NftCard nft={nft} key={nft.nftImageUrl} />;
          })}
        </div>
        {showSelectNftsButton && (
          <button
            onClick={() => toggleIsCreateNftModalVisible(true)}
            className="nft-list__select-nfts"
          >
            Select NFTs
          </button>
        )}
      </div>
    </>
  );
};

export default NftList;
