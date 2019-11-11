import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';

// ACTIONS
import * as sessionActions from '../../../actions/session';

// Constants
import * as ROUTES from '../../constants/routes';

const publicRoutes = [
  ROUTES.HOME_ROUTE,
  ROUTES.SIGN_IN_ROUTE,
  ROUTES.SIGN_UP_ROUTE,
];

/**
 * @description Check user Authentication
 */
const withAuthentication = Component => {
  class WithAuthentication extends React.Component {
    componentDidMount() {
      const { verifyToken, location, history } = this.props;

      verifyToken().catch(() => {
        if (!publicRoutes.includes(location.pathname)) {
          history.push(ROUTES.SIGN_IN);
        }
      });
    }

    render() {
      return <Component {...this.props} />;
    }
  }

  const actionCreators = {
    verifyToken: sessionActions.verifyToken,
  };

  return compose(
    connect(
      null,
      actionCreators
    ),
    withRouter
  )(WithAuthentication);
};

export default withAuthentication;
