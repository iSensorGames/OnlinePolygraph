import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { Switch } from "react-router";

// Constants
import * as ROUTES from "./modules/constants/routes";

// Components
import { withAuthentication } from "./modules/components/Session";
import SocketManager from "./modules/components/Socket/Manager";

// Pages
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import ForgotPassword from "./pages/ForgotPassword";
import Welcome from "./pages/Welcome";
import Rules from "./pages/Rules";
import Game from "./pages/Game";
import GameSetup from "./pages/Game/Setup";
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";
import Admin from "./pages/Admin";

// Layout
import IndexLayout from "./layout/Index";

const App = () => {
  return (
    <SocketManager>
      <IndexLayout>
        <BrowserRouter basename={ROUTES.BASENAME}>
          <Switch>
            <Route exact path={ROUTES.HOME_ROUTE} component={Home} />
            <Route exact path={ROUTES.SIGN_IN_ROUTE} component={SignIn} />
            <Route exact path={ROUTES.SIGN_UP_ROUTE} component={SignUp} />
            <Route
              exact
              path={ROUTES.FORGOT_PASSWORD_ROUTE}
              component={ForgotPassword}
            />
            <BrowserRouter basename={ROUTES.BASENAME_GAME}>
              <Switch>
                <Route exact path={ROUTES.GAME_ROOT_ROUTE} component={Game} />
                <Route exact path={ROUTES.WELCOME_ROUTE} component={Welcome} />
                <Route exact path={ROUTES.RULES_ROUTE} component={Rules} />
                <Route
                  exact
                  path={ROUTES.GAME_SETUP_ROUTE}
                  component={GameSetup}
                />
                <Route exact path={ROUTES.TERMS_ROUTE} component={Terms} />
                <Route exact path={ROUTES.PRIVACY_ROUTE} component={Privacy} />
                <Route exact path={ROUTES.ADMIN_ROUTE} component={Admin} />
              </Switch>
            </BrowserRouter>
          </Switch>
        </BrowserRouter>
      </IndexLayout>
    </SocketManager>
  );
};

export default withAuthentication(App);
