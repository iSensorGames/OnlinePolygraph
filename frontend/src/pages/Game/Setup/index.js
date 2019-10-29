import withRoot from "../../../modules/withRoot";
// --- Post bootstrap -----
import React from "react";

// Components
import { compose } from "recompose";
import { withAuthorization } from "../../../modules/components/Session";
import { withSocket } from "../../../modules/components/Socket";
import AppAppBar from "../../../modules/views/AppAppBar";
import OpponentSelection from "../Setup/OpponentSelection";

// Constants
import * as ROLES from "../../../modules/constants/roles";

const GameSetup = () => {
  return (
    <React.Fragment>
      <AppAppBar />
      <OpponentSelection />
    </React.Fragment>
  );
};

const condition = authUser => authUser && authUser.roles === ROLES.USER;

export default compose(
  withAuthorization(condition),
  withSocket,
  withRoot
)(GameSetup);
