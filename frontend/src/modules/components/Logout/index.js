import React from "react";
import { connect } from "react-redux";
import { compose } from "recompose";
import * as ROUTES from "../../constants/routes";

// Actions
import * as userActions from "../../../actions/user";

// Components
import clsx from "clsx";
import { withRouter } from "react-router";
import { withDatabase } from "../Database";

// Styles
import "./logout.css";

const Logout = ({ database, history, saveUser }) => (
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
      saveUser(null);
      history.push(ROUTES.SIGN_IN);
    }}
  >
    {"Logout"}
  </div>
);

const actionCreators = {
  saveUser: userActions.saveUser
};

export default compose(
  connect(
    null,
    actionCreators
  ),
  withRouter,
  withDatabase
)(Logout);
