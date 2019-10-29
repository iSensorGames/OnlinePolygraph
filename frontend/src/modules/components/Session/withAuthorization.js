import React from "react";
import { connect } from "react-redux";
import { compose } from "recompose";

// Selectors
import * as userSelectors from "../../../reducers/user";

// Componets
import { withRouter } from "react-router-dom";
import { withDatabase } from "../Database";
import * as ROUTES from "../../constants/routes";

/**
 * @description Check user's authorization and token validity on every page's first load.
 * @param {*} condition
 */
const withAuthorization = condition => Component => {
  class WithAuthorization extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        location: ""
      };
    }
    componentDidMount() {
      const { database, location, history } = this.props;

      // Only verify authorization on the initial page load
      if (this.state.location !== location.pathname) {
        this.setState({
          location: location.pathname
        });

        database
          .onAuthUserListener()
          .then(result => {
            const { data } = result;

            if (!condition(data)) {
              history.push(ROUTES.SIGN_IN_ROUTE);
            }
          })
          .catch(err => {
            history.push(ROUTES.SIGN_IN_ROUTE);
          });
      }
    }

    render() {
      return condition(this.props.user) ? <Component {...this.props} /> : null;
    }
  }

  const mapStateToProps = state => {
    return {
      user: userSelectors.getUser(state)
    };
  };

  return compose(
    connect(
      mapStateToProps,
      null
    ),
    withRouter,
    withDatabase
  )(WithAuthorization);
};

export default withAuthorization;
