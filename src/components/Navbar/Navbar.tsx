import React, { FC } from "react";
import {
  WalletModalProvider,
  WalletMultiButton,
} from "@solana/wallet-adapter-react-ui";
import "./Navbar.scss";
import { NFT_FAUCET_URL, NFT_VESTING_URL } from "../../common/constants";

const Navbar: FC = () => {
  return (
    <WalletModalProvider>
      <div className="navbar">
        <img src="" alt="" />
        <div className="navbar__menu">
          <ul>
            <li>
              <a className="navbar__link" href={NFT_FAUCET_URL}>
                NFT faucet
              </a>
            </li>
            <li>
              <a className="navbar__link" href={NFT_VESTING_URL}>
                NFT vesting
              </a>
            </li>
            <li>
              <WalletMultiButton />
            </li>
          </ul>
        </div>
      </div>
    </WalletModalProvider>
  );
};

export default Navbar;
