import withRoot from "../../../modules/withRoot";
// --- Post bootstrap -----
import React from "react";

// Components
import { compose } from "recompose";
import { withAuthorization } from "../../../modules/components/Session";
import OpponentSelection from "../Setup/OpponentSelection";

const GameSetup = () => {
  return <OpponentSelection />;
};

export default compose(
  withAuthorization,
  withRoot
)(GameSetup);
