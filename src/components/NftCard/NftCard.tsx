import React, { FC, useContext, useState } from "react";
import { INftData } from "../../common/interface";
import { MdDone } from "react-icons/md";
import "./NftCard.scss";
import { NftContext } from "../../context/nftContext";
const NftCard: FC<{
  nft: INftData;
}> = ({ nft }) => {
  const [isChecked, toggleIsChecked] = useState(false);
  const { selectedNfts, setSelectedNfts } = useContext(NftContext);

  const handleNftSelection = () => {
    let addedNfts = [...selectedNfts];
    if (!isChecked) {
      addedNfts.push(nft);
      setSelectedNfts(addedNfts);
    } else {
      const filteredNfts = addedNfts.filter(
        (addedNft) => addedNft.nftImageUrl !== nft.nftImageUrl
      );
      setSelectedNfts(filteredNfts);
    }
    toggleIsChecked((prevValue) => !prevValue);
  };

  return (
    <div className="nft-card">
      <div className="nft-card__nft-image">
        {nft.isPredefined && (
          <div
            onClick={handleNftSelection}
            className={`${
              isChecked
                ? "nft-card__check-button nft-card__check-button__checked"
                : "nft-card__check-button"
            }`}
          >
            {isChecked && <MdDone />}
          </div>
        )}
        <img src={nft.nftImageUrl} alt="nftImage" />
      </div>
      <div className="nft-card__info">
        <p className="nft-card__name">{nft.nftName}</p>
        <p className="nft-card__symbol">{nft.nftSymbol}</p>
      </div>
    </div>
  );
};

export default NftCard;
