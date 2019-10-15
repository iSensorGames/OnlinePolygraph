import withRoot from "../../modules/withRoot";
// --- Post bootstrap -----
import React, { Component } from "react";
import { connect } from "react-redux";

// Reducers
import * as userSelectors from "../../reducers/user";

// Actions
import * as userActions from "../../actions/user";

// Styles
import "./welcome.css";

// Components
import { compose } from "recompose";
import { withAuthorization } from "../../modules/components/Session";
import AppAppBar from "../../modules/views/AppAppBar";
import WelcomeCover from "../../modules/views/WelcomeCover";

// Constants
import * as ROLES from "../../modules/constants/roles";

class Welcome extends Component {
  componentDidMount() {
    if (this.props.isSubscribed) {
      return;
    }

    this.unsubscribe = this.props.subscribeUser();
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  render() {
    return (
      <React.Fragment>
        <AppAppBar />
        <WelcomeCover />
      </React.Fragment>
    );
  }
}

const condition = authUser => authUser && authUser.roles === ROLES.USER;

const mapStateToProps = state => {
  return {
    isSubscribed: userSelectors.getIsSubscribed(state)
  };
};

const actionCreators = {
  subscribeUser: userActions.subscribeUser
};

export default compose(
  withAuthorization(condition),
  withRoot,
  connect(
    mapStateToProps,
    actionCreators
  )
)(Welcome);
