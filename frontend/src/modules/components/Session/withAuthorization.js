import React from "react";
import { connect } from "react-redux";
import { compose } from "recompose";

// Selectors
import * as sessionSelectors from "../../../reducers/session";

// ACTIONS
import * as sessionActions from "../../../actions/session";

// Componets
import { withRouter } from "react-router-dom";
import * as ROUTES from "../../constants/routes";

/**
 * @description Check user's authorization and token validity on every page's first load.
 */
const withAuthorization = Component => {
  class WithAuthorization extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        location: ""
      };
    }

    componentDidMount() {
      const { verifyToken, location, history } = this.props;

      // Only verify authorization on the initial page load
      if (this.state.location !== location.pathname) {
        this.setState({
          location: location.pathname
        });

        verifyToken
          .then(result => {
            const { data } = result;

            console.log("verifyToken data", data);
          })
          .catch(err => {
            history.push(ROUTES.SIGN_IN_ROUTE);
          });
      }
    }

    render() {
      return <Component {...this.props} />;
    }
  }

  const mapStateToProps = state => {
    return {
      user: sessionSelectors.getUser(state)
    };
  };

  const actionCreators = {
    verifyToken: sessionActions.verifyToken
  };

  return compose(
    connect(
      mapStateToProps,
      actionCreators
    ),
    withRouter
  )(WithAuthorization);
};

export default withAuthorization;
