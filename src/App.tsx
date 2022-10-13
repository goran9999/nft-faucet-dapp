import React from "react";
import "react-notifications/lib/notifications.css";
import "./App.css";
import { WalletWrapper } from "./components/WalletWrapper/WalletWrapper";
import {NotificationContainer} from 'react-notifications'
import Routes from "./Routes";

function App() {
  return (
    <div className="App">
      <WalletWrapper>
        <Routes />
        <NotificationContainer/>
      </WalletWrapper>
    </div>
  );
}

export default App;
