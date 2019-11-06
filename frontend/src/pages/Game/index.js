import React from "react";
import { Switch, Route } from "react-router-dom";

// Components
import { withAuthorization } from "../../modules/components/Session";

// Socket
import { Manager } from "../../modules/components/Socket";

// Constants
import * as ROUTES from "../../modules/constants/routes";

// Pages
import Welcome from "./Welcome";
import Chat from "./Chat";
import Rules from "./Rules";
import Terms from "./Terms";
import Privacy from "./Privacy";

class Game extends React.Component {
  render() {
    return (
      <Manager>
        <Switch>
          <Route exact path={ROUTES.WELCOME_ROUTE} component={Welcome} />
          <Route exact path={ROUTES.CHAT_ROUTE} component={Chat} />
          <Route exact path={ROUTES.RULES_ROUTE} component={Rules} />
          <Route exact path={ROUTES.TERMS_ROUTE} component={Terms} />
          <Route exact path={ROUTES.PRIVACY_ROUTE} component={Privacy} />
        </Switch>
      </Manager>
    );
  }
}

export default withAuthorization(Game);
