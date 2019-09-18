import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Switch } from "react-router";

// Styles
import "./styles/palette.css";

// Constants
import * as ROUTES from "./modules/constants/routes";

// Components
import Home from "./Home";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import ForgotPassword from "./ForgotPassword";
import Welcome from "./Welcome";
import Game from "./Game";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path={ROUTES.HOME} component={Home} />
        <Route exact path={ROUTES.SIGN_IN} component={SignIn} />
        <Route exact path={ROUTES.SIGN_UP} component={SignUp} />
        <Route exact path={ROUTES.FORGOT_PASSWORD} component={ForgotPassword} />
        <Route exact path={ROUTES.WELCOME} component={Welcome} />
        <Route exact path={ROUTES.GAME} component={Game} />
      </Switch>
    </Router>
  );
}

export default App;
