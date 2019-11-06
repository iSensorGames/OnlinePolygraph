import React from "react";
import { connect } from "react-redux";

// Selectors
import * as sessionSelectors from "../../../reducers/session";

// Actions
import * as sessionActions from "../../../actions/session";

class Manager extends React.Component {
  initializeConnection() {
    const { openConnection, isConnected } = this.props;

    console.log("Manager isConnected", isConnected);

    if (!isConnected) {
      openConnection();
    }
  }

  componentDidMount() {
    this.initializeConnection();
  }

  render() {
    const { children } = this.props;

    return children;
  }
}

const mapStateToProps = state => {
  return {
    isConnected: sessionSelectors.getIsConnected(state)
  };
};

const actionCreators = {
  openConnection: sessionActions.openConnection
};

export default connect(
  mapStateToProps,
  actionCreators
)(Manager);
