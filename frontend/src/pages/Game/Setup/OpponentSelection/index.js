import React from "react";
import { compose } from "recompose";
import { connect } from "react-redux";

// Selectors
import * as userSelectors from "../../../../reducers/user";

// Component
import OpponentSelectionCover from "../../../../modules/views/OpponentSelectionCover";
import { withDatabase } from "../../../../modules/components/Database";

const OpponentSelection = () => <OpponentSelectionBase />;

const OpponentSelectionBase = compose(
  connect(
    mapStateToProps,
    null
  ),
  withDatabase
)(OpponentSelectionCover);

const mapStateToProps = state => {
  return {
    connectedUsersCount: userSelectors.getConnectedUsersCount(state)
  };
};

export default OpponentSelection;
