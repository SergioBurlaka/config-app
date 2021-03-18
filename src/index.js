import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { applyMiddleware, createStore } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import rootReducer from "./reducers";
import { Header, Body } from "./components";

import "bootstrap/dist/css/bootstrap.css";
import "./scss/main.scss";

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

const Application = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Header />
        <Body />
      </BrowserRouter>
    </Provider>
  );
};

ReactDOM.render(<Application />, document.getElementById("root"));
