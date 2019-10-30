import React from "react";
import { Route } from "react-router-dom";
import { Switch } from "react-router";
import SocketManager from "./modules/components/Socket/Manager";

// Pages
import Welcome from "./Welcome";
import Rules from "./Rules";
import GameSetup from "./Game/Setup";
import Terms from "./Terms";
import Privacy from "./Privacy";

const Game = () => {
  <SocketManager>
    <Switch>
      <Route exact path={ROUTES.GAME_ROOT_ROUTE} component={Game} />
      <Route exact path={ROUTES.WELCOME_ROUTE} component={Welcome} />
      <Route exact path={ROUTES.RULES_ROUTE} component={Rules} />
      <Route exact path={ROUTES.GAME_SETUP_ROUTE} component={GameSetup} />
      <Route exact path={ROUTES.TERMS_ROUTE} component={Terms} />
      <Route exact path={ROUTES.PRIVACY_ROUTE} component={Privacy} />
    </Switch>
  </SocketManager>;
};

export default Game;
