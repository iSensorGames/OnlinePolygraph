import withRoot from "../../modules/withRoot";
// --- Post bootstrap -----
import React from "react";

// Styles
import "./welcome.css";

// Components
import { compose } from "recompose";
import { withAuthorization } from "../../modules/components/Session";
import AppAppBar from "../../modules/views/AppAppBar";
import WelcomeCover from "../../modules/views/WelcomeCover";

// Constants
import * as ROLES from "../../modules/constants/roles";

const Welcome = () => {
  return (
    <React.Fragment>
      <AppAppBar />
      <WelcomeCover />
    </React.Fragment>
  );
};

const condition = authUser => authUser && authUser.roles === ROLES.USER;

export default compose(
  withAuthorization(condition),
  withRoot
)(Welcome);
