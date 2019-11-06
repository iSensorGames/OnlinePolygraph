import React from "react";
import { connect } from "react-redux";
import { compose } from "recompose";
import * as ROUTES from "../../constants/routes";

// Actions
import * as sessionActions from "../../../actions/session";

// Components
import clsx from "clsx";
import { withRouter } from "react-router-dom";

// Styles
import "./logout.css";

const Logout = ({ history, signOut }) => (
  <div
    className={clsx(
      "Logout-btn",
      "Logout-h6",
      "Logout-underlineNone",
      "Logout-rightLink-10",
      "Logout-linkSecondary-11"
    )}
    onClick={() => {
      signOut().then(() => {
        history.push(ROUTES.SIGN_IN);
      });
    }}
  >
    Logout
  </div>
);

const actionCreators = {
  signOut: sessionActions.signOut
};

export default compose(
  connect(
    null,
    actionCreators
  ),
  withRouter
)(Logout);
