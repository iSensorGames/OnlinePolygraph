import React from "react";

// Component
import OpponentSelectionCover from "../../../../modules/views/Cover/OpponentSelection";
import { withDatabase } from "../../../../modules/components/Database";

const OpponentSelection = () => <OpponentSelectionBase />;

const OpponentSelectionBase = withDatabase(OpponentSelectionCover);

export default OpponentSelection;
