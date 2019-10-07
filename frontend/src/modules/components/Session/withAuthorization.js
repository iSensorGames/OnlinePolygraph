import React from "react";

import AuthUserContext from "./context";
import { compose } from "recompose";
import { withRouter } from "react-router-dom";
import { withDatabase } from "../Database";
import * as ROUTES from "../../constants/routes";

const withAuthorization = condition => Component => {
  class WithAuthorization extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        location: ""
      };
    }
    componentDidMount() {
      const { location } = this.state;

      // Only verify authorization on the initial page load
      if (location !== this.props.location.pathname) {
        this.setState({
          location: this.props.location.pathname
        });

        this.props.database
          .onAuthUserListener()
          .then(result => {
            const { data } = result;

            if (!condition(data)) {
              this.props.history.push(ROUTES.SIGN_IN);
            }
          })
          .catch(err => {
            this.props.history.push(ROUTES.SIGN_IN);
          });
      }
    }

    render() {
      return (
        <AuthUserContext.Consumer>
          {({ authUser }) => {
            return condition(authUser) ? <Component {...this.props} /> : null;
          }}
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
