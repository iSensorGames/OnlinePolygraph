import withRoot from "../../modules/withRoot";
// --- Post bootstrap -----
import React from "react";

// Styles
import "./rules.css";

// Components
import { compose } from "recompose";
import { withAuthorization } from "../../modules/components/Session";
import AppAppBar from "../../modules/views/AppAppBar";
import RulesCover from "../../modules/views/Cover/Rules";

// Constants
import * as ROLES from "../../modules/constants/roles";

const Rules = () => {
  return (
    <React.Fragment>
      <AppAppBar />
      <RulesCover />
    </React.Fragment>
  );
};

const condition = authUser => authUser && authUser.roles === ROLES.USER;

export default compose(
  withAuthorization(condition),
  withRoot
)(Rules);
