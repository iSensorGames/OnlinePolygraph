import React from "react";
import { connect } from "react-redux";
import { compose } from "recompose";

import { withDatabase } from "../Database";

// Actions
import * as userActions from "../../../actions/user";

// Constants
import * as authConstants from "../../../modules/constants/auth";

const withAuthentication = Component => {
  class WithAuthentication extends React.Component {
    componentDidMount() {
      const { database, saveUser } = this.props;

      database
        .onAuthUserListener()
        .then(result => {
          if (result) {
            const { data } = result;

            if (!data.success) {
              saveUser(null);
            } else {
              if (data) {
                saveUser(data);
              }
            }
          }
        })
        .catch(err => {
          localStorage.removeItem(authConstants.KEY);
          saveUser(null);
        });
    }

    render() {
      return <Component {...this.props} />;
    }
  }

  const actionCreators = {
    saveUser: userActions.saveUser
  };

  return compose(
    withDatabase,
    connect(
      null,
      actionCreators
    )
  )(WithAuthentication);
};

export default withAuthentication;
