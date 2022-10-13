import AWS from "aws-sdk";
import { ICustomNftData, INftData, MESSAGE_TYPE } from "./interface";

import { NotificationManager } from "react-notifications";

import metadataBoilerplate from "../assets/metadata-boilerplate.json";
import {

  BASE_URL,
  NFT_METADATA,
  NFT_IMAGE,
} from "./constants";
import { post } from "./api";
export const saveImageToS3Bucket = async (base64Image: string) => {
  try {
    const savedData = await post(BASE_URL + NFT_IMAGE, {
      nftImage: base64Image,
    });
    console.log(savedData);

    const savedDataJson = await savedData.json();
    return savedDataJson;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const parseAndUploadNftMetadata = async (
  nft: ICustomNftData | INftData,
  imageUrl: string,
  creator: string
) => {
  try {
    const newMetadata = { ...metadataBoilerplate };
    newMetadata.name = nft.nftName;
    newMetadata.symbol = nft.nftSymbol;
    newMetadata.image = imageUrl;
    newMetadata.properties.creators = [
      {
        address: creator,
        share: 100,
      },
    ];

    const savedData = await post(BASE_URL + NFT_METADATA, {
      nftMetadata: newMetadata,
    });
    console.log(savedData);
    const savedDataJson = await savedData.json();
    console.log(savedDataJson);
    return savedDataJson.metadataUrl;
  } catch (error) {
    console.log(error);
  }
};

export const createNotification = (
  messageType: string,
  messageText: string,
  description?: string
) => {
  switch (messageType) {
    case MESSAGE_TYPE.SUCCESS:
      console.log(NotificationManager);
      
      NotificationManager.success(messageText);
      break;
    case MESSAGE_TYPE.ERROR:
      NotificationManager.error(description, messageText);
      break;
  }
};
