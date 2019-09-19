import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Switch } from "react-router";

// Styles
import "./styles/palette.css";

// Constants
import * as ROUTES from "./modules/constants/routes";

// Components
import { withAuthentication } from "./modules/components/Session";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import ForgotPassword from "./pages/ForgotPassword";
import Welcome from "./pages/Welcome";
import Game from "./pages/Game";
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path={ROUTES.HOME} component={Home} />
        <Route exact path={ROUTES.SIGN_IN} component={SignIn} />
        <Route exact path={ROUTES.SIGN_UP} component={SignUp} />
        <Route exact path={ROUTES.FORGOT_PASSWORD} component={ForgotPassword} />
        <Route exact path={ROUTES.WELCOME} component={Welcome} />
        <Route exact path={ROUTES.GAME} component={Game} />
        <Route exact path={ROUTES.TERMS} component={Terms} />
        <Route exact path={ROUTES.PRIVACY} component={Privacy} />
      </Switch>
    </Router>
  );
};

export default withAuthentication(App);
