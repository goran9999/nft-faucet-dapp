import React from "react";

import "./index.scss";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import ReactDOM, { render } from "react-dom";

const renderApp = () => {
  render(
    <BrowserRouter>
      <App />
    </BrowserRouter>,
    document.getElementById("root")
  );
};
renderApp();
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
