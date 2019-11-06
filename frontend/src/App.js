import React from "react";
import { Switch, Route } from "react-router-dom";

// Constants
import * as ROUTES from "./modules/constants/routes";

// Pages
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import ForgotPassword from "./pages/ForgotPassword";
import Game from "./pages/Game";
import Admin from "./pages/Admin";

// Layout
import IndexLayout from "./layout/Index";
import HomeLayout from "./layout/Home";

const App = () => {
  return (
    <Switch>
      <HomeLayout>
        <Route exact path={ROUTES.HOME_ROUTE} component={Home} />
      </HomeLayout>
      <IndexLayout>
        <Route exact path={ROUTES.SIGN_IN_ROUTE} component={SignIn} />
        <Route exact path={ROUTES.SIGN_UP_ROUTE} component={SignUp} />
        <Route exact path={ROUTES.ADMIN_ROUTE} component={Admin} />
        <Route
          exact
          path={ROUTES.FORGOT_PASSWORD_ROUTE}
          component={ForgotPassword}
        />
        <Route component={Game} />
      </IndexLayout>
    </Switch>
  );
};

export default App;
