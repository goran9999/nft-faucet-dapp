import React from "react";
import { ICustomNftData, INftData } from "../common/interface";

export interface INftContext {
  selectedNfts: INftData[];
  setSelectedNfts: (nfts: INftData[]) => void;
  customNfts: ICustomNftData[];
  setCustomNfts: (nfts: ICustomNftData[]) => void;
}

export const NftContext = React.createContext({} as INftContext);
