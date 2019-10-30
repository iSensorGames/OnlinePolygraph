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
    async componentDidMount() {
      const {
        verifyToken,
        updateLocation,
        previousLocation,
        location,
        history
      } = this.props;

      // Only verify authorization only on initial page load
      // Redirect if token is expired
      if (previousLocation !== location.pathname) {
        await updateLocation(location);
        const response = await verifyToken();
        if ("error" in response) {
          history.push(ROUTES.SIGN_IN_ROUTE);
        }
      }
    }

    render() {
      return <Component {...this.props} />;
    }
  }

  const mapStateToProps = state => {
    return {
      previousLocation: sessionSelectors.getPreviousLocation(state)
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
