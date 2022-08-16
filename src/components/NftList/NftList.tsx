import React, { FC } from "react";
import { INftData } from "../../common/interface";
import NftCard from "../NftCard/NftCard";
import "./NftList.scss";
const NftList: FC<{
  title: string;
  nfts: INftData[];
  showSelectNftsButton?: boolean;
}> = ({ nfts, title, showSelectNftsButton }) => {
  return (
    <div className="nft-list">
      <h3 className="nft-list__title">{title}</h3>
      <div className="nft-list__nfts">
        {nfts.map((nft) => {
          return <NftCard nft={nft} key={nft.nftImageUrl} />;
        })}
      </div>
      {showSelectNftsButton && (
        <button className="nft-list__select-nfts">Select NFTs</button>
      )}
    </div>
  );
};

export default NftList;
