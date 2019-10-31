import React from "react";
import { connect } from "react-redux";

// Selectors
import * as sessionSelectors from "../../../reducers/session";

// Actions
import * as sessionActions from "../../../actions/session";

class Manager extends React.Component {
  initializeConnection() {
    const { openConnection } = this.props;

    openConnection();
  }

  componentDidMount() {
    this.initializeConnection();
  }

  render() {
    const { children } = this.props;

    return children;
  }
}

const actionCreators = {
  openConnection: sessionActions.openConnection
};

export default connect(
  null,
  actionCreators
)(Manager);
