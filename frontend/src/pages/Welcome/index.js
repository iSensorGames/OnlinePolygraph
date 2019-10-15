import withRoot from "../../modules/withRoot";
// --- Post bootstrap -----
import React, { useEffect } from "react";
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

const Welcome = ({ isSubscribed, subscribeUser }) => {
  const unsubscribe = () => {};

  console.log("isSubscribed", isSubscribed);

  useEffect(
    () => {
      if (isSubscribed) {
        return;
      }

      unsubscribe = subscribeUser();
    },
    () => unsubscribe()
  );

  return (
    <React.Fragment>
      <AppAppBar />
      <WelcomeCover />
    </React.Fragment>
  );
};

const condition = authUser => authUser && authUser.roles === ROLES.USER;

const mapStateToProps = state => {
  return {
    isSubscribed: userSelectors.getIsSubscribed(state),
    data: userSelectors.getData(state),
    conectedUsersCount: userSelectors.getUserConnectedCount(state)
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
