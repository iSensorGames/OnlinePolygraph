import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { compose } from "recompose";

// Selectors
import * as sessionSelectors from "../../../reducers/session";

// Actions
import * as sessionActions from "../../../actions/session";

// Constants
import * as ROUTES from "../../constants/routes";

/**
 * @description Check user authorization
 */
const withAuthorization = Component => {
  class WithAuthorization extends React.Component {
    componentDidMount() {
      const {
        verifyToken,
        updateLocation,
        previousLocation,
        location
      } = this.props;

      console.log("WithAuthorization");

      // Only verify authorization only on initial page load
      // Redirect if token is expired
      if (previousLocation !== location.pathname) {
        updateLocation(location.pathname);
        verifyToken();
      }
    }

    render() {
      const { errorMessage, history } = this.props;
      if (errorMessage) {
        history.push(ROUTES.SIGN_IN);
        return null;
      }

      return <Component {...this.props} />;
    }
  }

  const mapStateToProps = state => {
    return {
      previousLocation: sessionSelectors.getPreviousLocation(state),
      errorMessage: sessionSelectors.getErrorMessage(state)
    };
  };

  const actionCreators = {
    verifyToken: sessionActions.verifyToken,
    updateLocation: sessionActions.updateLocation
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
