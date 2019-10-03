import React from "react";

import AuthUserContext from "./context";
import { compose } from "recompose";
import { withRouter } from "react-router-dom";
import { withDatabase } from "../Database";
import * as ROUTES from "../../constants/routes";

const withAuthorization = condition => Component => {
  class WithAuthorization extends React.Component {
    componentDidMount() {
      this.listener = this.props.database.onAuthUserListener(
        authUser => {
          if (!condition(authUser)) {
            this.props.history.push(ROUTES.SIGN_IN);
          }
        },
        () => this.props.history.push(ROUTES.SIGN_IN)
      );
    }

    componentWillUnmount() {
      this.listener();
    }

    render() {
      return (
        <AuthUserContext.Consumer>
          {authUser =>
            condition(authUser) ? <Component {...this.props} /> : null
          }
        </AuthUserContext.Consumer>
      );
    }
  }

  return compose(
    withRouter,
    withDatabase
  )(WithAuthorization);
};

export default withAuthorization;
