import React from "react";
import { INftData } from "../common/interface";

export interface INftContext {
  selectedNfts: INftData[];
  setSelectedNfts: (nfts: INftData[]) => void;
}

export const NftContext = React.createContext({} as INftContext);
