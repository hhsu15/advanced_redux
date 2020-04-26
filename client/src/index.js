import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import reduxThunk from "redux-thunk";

import App from "./components/App";
import Welcome from "./components/Welcome";
import Signup from "./components/auth/Signup";
import Signin from "./components/auth/Signin";
import reducers from "./reducers";
import Feature from "./components/Feature";
import Signout from "./components/auth/Signout";

// the store will use initial state with the localstore whcih we set when user is authorized
const initialState = { auth: { authenticated: localStorage.getItem("token") } };
const store = createStore(reducers, initialState, applyMiddleware(reduxThunk));
ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App>
        <Route path="/" exact component={Welcome} />
        <Route path="/signup" component={Signup} />
        <Route path="/feature" component={Feature} />
        <Route path="/signout" component={Signout} />
        <Route path="/signin" component={Signin} />
      </App>
    </BrowserRouter>
  </Provider>,
  document.querySelector("#root")
);
