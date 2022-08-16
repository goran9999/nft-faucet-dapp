import React, { FC, useContext, useState } from "react";
import Modal from "../Modal/Modal";
import { useDropzone } from "react-dropzone";
import "./CreateNftModal.scss";
import { NftContext } from "../../context/nftContext";
import { ICustomNftData } from "../../common/interface";
const CreateNftModal: FC<{ closeModal: () => void }> = ({ closeModal }) => {
  const [base64Image, setBase64Image] = useState<string>();
  const [nftName, setNftName] = useState("");
  const [nftSymbol, setNftSymobl] = useState("");

  const { customNfts, setCustomNfts } = useContext(NftContext);

  const fileReader = new FileReader();

  const readBase64Img = (accptedFile: any) => {
    fileReader.readAsDataURL(accptedFile[0]);
    fileReader.onload = async () => {
      const image = fileReader.result;
      setBase64Image(image as string);
    };
  };

  const { getRootProps, getInputProps, open } = useDropzone({
    accept: [".jpg", ".jpeg", ".png"],
    noClick: true,
    onDrop: (acceptedFile) => {
      readBase64Img(acceptedFile);
    },
  });

  const handleNftUpload = () => {
    if (base64Image) {
      const newNft: ICustomNftData = {
        nftBase64Image: base64Image,
        nftName: nftName,
        nftSymbol: nftSymbol,
      };
      const addedCustomNfts = [...customNfts, newNft];
      setCustomNfts(addedCustomNfts);
      closeModal();
    }
  };

  return (
    <Modal onCloseModal={closeModal}>
      <div className="create-nft-modal">
        <div className="create-nft-modal__image">
          <div className="create-nft-modal__image-placeholder">
            <img src={base64Image} alt="" />
          </div>
          <div {...getRootProps()}>
            <input {...getInputProps()} />
            <button onClick={open} className="create-nft-modal__select-image">
              Select image
            </button>
          </div>
        </div>
        <div className="create-nft-modal__input">
          <p>NFT name</p>
          <input
            onChange={(e) => setNftName(e.target.value)}
            value={nftName}
            type="text"
            placeholder="Type name of your NFT here"
          />
        </div>
        <div className="create-nft-modal__input">
          <p>NFT symbol</p>
          <input
            onChange={(e) => setNftSymobl(e.target.value)}
            value={nftSymbol}
            type="text"
            placeholder="Type symbol of your NFT here"
          />
        </div>
      </div>
      <div className="create-nft-modal__buttons">
        <button
          onClick={() => closeModal()}
          className="create-nft-modal__button create-nft-modal__button--cancel"
        >
          Cancel
        </button>
        <button onClick={handleNftUpload} className="create-nft-modal__button">
          Add NFT
        </button>
      </div>
    </Modal>
  );
};

export default CreateNftModal;
