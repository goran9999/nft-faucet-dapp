import React from "react";

import "./App.css";
import { WalletWrapper } from "./components/WalletWrapper/WalletWrapper";
import Routes from "./Routes";

function App() {
  return (
    <div className="App">
      <WalletWrapper>
        <Routes />
      </WalletWrapper>
    </div>
  );
}

export default App;
