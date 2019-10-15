import React from "react";
import * as ROUTES from "../../constants/routes";

// Components
import clsx from "clsx";
import { withRouter } from "react-router";
import { withDatabase } from "../Database";
import { AuthUserContext } from "../../components/Session";

// Styles
import "./logout.css";

const Logout = ({ database, history }) => (
  <AuthUserContext.Consumer>
    {({ setAuthUser }) => (
      <div
        className={clsx(
          "Logout-btn",
          "Logout-h6",
          "Logout-underlineNone",
          "Logout-rightLink-10",
          "Logout-linkSecondary-11"
        )}
        onClick={() => {
          database.doSignOut();
          setAuthUser(null);
          history.push(ROUTES.SIGN_IN);
        }}
      >
        {"Logout"}
      </div>
    )}
  </AuthUserContext.Consumer>
);

export default withRouter(withDatabase(Logout));
