import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

// Redux Setup
import { Provider } from "react-redux";
import store from "./store";

// Constants
import * as ROUTES from "./modules/constants/routes";

ReactDOM.render(
  <Provider store={store}>
    <Router basename={ROUTES.BASENAME}>
      <App />
    </Router>
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
