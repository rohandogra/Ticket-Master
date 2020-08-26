import React from "react";
import ReactDOM from "react-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "antd/dist/antd.css";
import App from "./App";
import { Provider } from "react-redux";
import store from "./redux/store/store";

const ele = (
  <Provider store={store()}>
    <App />
  </Provider>
);
ReactDOM.render(ele, document.getElementById("root"));
