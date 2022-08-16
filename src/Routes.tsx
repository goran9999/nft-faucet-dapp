import React, { Fragment } from "react";
import { Routes as ReactRoutes, Route } from "react-router";
import { Navigate } from "react-router-dom";
import { NFT_FAUCET_URL } from "./common/constants";
import Navbar from "./components/Navbar/Navbar";
import NftFaucetPage from "./pages/NftFaucetPage";
const Routes = () => {
  return (
    <Fragment>
      <Navbar />
      <ReactRoutes>
        <Route path="*" element={<Navigate to={NFT_FAUCET_URL} />} />
        <Route path={NFT_FAUCET_URL} element={<NftFaucetPage />} />
      </ReactRoutes>
    </Fragment>
  );
};

export default Routes;
