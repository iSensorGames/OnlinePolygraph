import React from "react";

import AuthUserContext from "./context";
import { withDatabase } from "../Database";

// Constants
import * as authConstants from "../../../modules/constants/auth";

const withAuthentication = Component => {
  class WithAuthentication extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        authUser: JSON.parse(localStorage.getItem(authConstants.KEY))
          ? JSON.parse(localStorage.getItem(authConstants.KEY)).user
          : null,
        setAuthUser: authUser => this.setState({ authUser })
      };
    }

    componentDidMount() {
      this.props.database
        .onAuthUserListener()
        .then(result => {
          if (result) {
            const { data } = result;
            if (data.result) {
              this.setState({
                authUser: {
                  ...data
                }
              });
            }
          }
        })
        .catch(err => {
          localStorage.removeItem(authConstants.KEY);
          this.setState({
            authUser: null
          });
        });
    }

    render() {
      return (
        <AuthUserContext.Provider value={this.state}>
          <Component {...this.props} />
        </AuthUserContext.Provider>
      );
    }
  }

  return withDatabase(WithAuthentication);
};

export default withAuthentication;
