import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { compose } from "recompose";

// Selectors
import * as sessionSelectors from "../../../reducers/session";

// Actions
import * as sessionActions from "../../../actions/session";

// Constants
import * as ROUTES from "../../../modules/constants/routes";

/**
 * @description Check user authorization
 */
const withAuthorization = Component => {
  class WithAuthorization extends React.Component {
    componentDidMount() {
      const {
        updateLocation,
        previousLocation,
        location,
        verifyToken,
        history
      } = this.props;

      // Only verify authorization only on initial page load
      // Redirect if token is expired
      if (previousLocation !== location.pathname) {
        updateLocation(location.pathname);

        verifyToken().catch(error => {
          console.log("withAuthorization verifyToken", error.message);
          history.push(ROUTES.SIGN_IN);
        });
      }
    }

    render() {
      const { session } = this.props;

      if (!!!session) {
        return null;
      }

      return <Component {...this.props} />;
    }
  }

  const mapStateToProps = state => {
    return {
      previousLocation: sessionSelectors.getPreviousLocation(state),
      session: sessionSelectors.getSession(state)
    };
  };

  const actionCreators = {
    updateLocation: sessionActions.updateLocation,
    verifyToken: sessionActions.verifyToken
  };

  return compose(
    withRouter,
    connect(
      mapStateToProps,
      actionCreators
    )
  )(WithAuthorization);
};

export default withAuthorization;
