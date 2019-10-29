import withRoot from "../../modules/withRoot";
// --- Post bootstrap -----
import React, { Component } from "react";

// Styles
import "./welcome.css";

// Components
import { compose } from "recompose";
import { withAuthorization } from "../../modules/components/Session";
import { withSocket } from "../../modules/components/Socket";
import AppAppBar from "../../modules/views/AppAppBar";
import WelcomeCover from "../../modules/views/Cover/Welcome";

// Constants
import * as ROLES from "../../modules/constants/roles";

class Welcome extends Component {
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

export default compose(
  withAuthorization(condition),
  withSocket,
  withRoot
)(Welcome);
