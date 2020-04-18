import React from "react";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
//import reduxPromise from "redux-promise";
import ayncMiddleware from "middlewares/async";
import stateValidator from "middlewares/stateValidator";
import reducers from "reducers";

export default ({ children, initialState = {} }) => {
  const store = createStore(
    reducers,
    initialState,
    applyMiddleware(ayncMiddleware, stateValidator)
  );
  return <Provider store={store}>{children}</Provider>;
};
