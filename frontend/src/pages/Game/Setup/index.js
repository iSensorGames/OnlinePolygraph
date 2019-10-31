import React from "react";

// Components
import { compose } from "recompose";
import { withAuthorization } from "../../../modules/components/Session";
import OpponentSelection from "./OpponentSelection";

// Layout
import BaseLayout from "../../../layout/Base";

const GameSetup = () => {
  return (
    <BaseLayout>
      <OpponentSelection />
    </BaseLayout>
  );
};

export default compose(withAuthorization)(GameSetup);
