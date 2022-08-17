import AWS from "aws-sdk";
import { ICustomNftData, MESSAGE_TYPE } from "./interface";

import { NotificationManager } from "react-notifications";

import metadataBoilerplate from "../assets/metadata-boilerplate.json";
import { bucketName, accessKey, secretKey } from "./constants";
export const saveImageToS3Bucket = async (base64Image: string) => {
  try {
    if (!bucketName) {
      throw new Error("Problem with S3 bucket config");
    }

    const s3 = new AWS.S3({
      accessKeyId: accessKey,
      secretAccessKey: secretKey,
    });

    const uploadedImage = await s3
      .upload({
        Bucket: bucketName,
        Key: new Date().toISOString(),
        Body: base64Image,
      })
      .promise();

    return uploadedImage.Location;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const parseAndUploadNftMetadata = async (
  nft: ICustomNftData,
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
    const s3 = new AWS.S3({
      accessKeyId: accessKey,
      secretAccessKey: secretKey,
    });

    if (!bucketName) {
      throw new Error("Problem with S3 bucket config");
    }

    const uploadedMetadata = await s3
      .upload({
        Bucket: bucketName,
        Key: "meta-" + new Date().toISOString(),
        Body: JSON.stringify(newMetadata),
      })
      .promise();
    return uploadedMetadata.Location;
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
      NotificationManager.success(messageText);
      break;
    case MESSAGE_TYPE.ERROR:
      NotificationManager.error(description, messageText);
      break;
  }
};
