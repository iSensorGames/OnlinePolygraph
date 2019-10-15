import React from "react";
import { compose } from "recompose";
import { connect } from "react-redux";

// Selectors
import * as userSelectors from "../../../../reducers/user";

// Component
import OpponentSelectionCover from "../../../../modules/views/OpponentSelectionCover";
import { withDatabase } from "../../../../modules/components/Database";

const OpponentSelection = () => <OpponentSelectionBase />;

const mapStateToProps = state => {
  return {
    connectedUsersCount: userSelectors.getConnectedUsersCount(state)
  };
};

const OpponentSelectionBase = compose(
  connect(
    mapStateToProps,
    null
  ),
  withDatabase
)(OpponentSelectionCover);

export default OpponentSelection;
