import React from "react";
import { connect } from "react-redux";
import { compose } from "recompose";

// ACTIONS
import * as sessionActions from "../../../actions/session";

/**
 * @description Check user Authentication
 */
const withAuthentication = Component => {
  class WithAuthentication extends React.Component {
    async componentDidMount() {
      const { verifyToken } = this.props;

      await verifyToken();
    }

    render() {
      return <Component {...this.props} />;
    }
  }

  const actionCreators = {
    verifyToken: sessionActions.verifyToken
  };

  return compose(
    connect(
      null,
      actionCreators
    )
  )(WithAuthentication);
};

export default withAuthentication;
