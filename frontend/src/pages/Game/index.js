import React from "react";
import { Switch, Route } from "react-router";

// Constants
import * as ROUTES from "../../modules/constants/routes";

// Pages
import Welcome from "./Welcome";
import Rules from "./Rules";
import Setup from "./Setup";
import Terms from "./Terms";
import Privacy from "./Privacy";

class Game extends React.Component {
  render() {
    return (
      <Switch>
        <Route exact path={ROUTES.WELCOME_ROUTE} component={Welcome} />
        <Route exact path={ROUTES.RULES_ROUTE} component={Rules} />
        <Route exact path={ROUTES.GAME_SETUP_ROUTE} component={Setup} />
        <Route exact path={ROUTES.TERMS_ROUTE} component={Terms} />
        <Route exact path={ROUTES.PRIVACY_ROUTE} component={Privacy} />
      </Switch>
    );
  }
}

export default Game;
