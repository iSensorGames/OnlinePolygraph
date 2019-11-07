import React from "react";
import { connect } from "react-redux";

// Selectors
import * as socketSelectors from "../../../reducers/socket";

// Actions
import * as socketActions from "../../../actions/socket";

class Manager extends React.Component {
  initializeConnection() {
    const { openConnection, isConnected } = this.props;

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
    isConnected: socketSelectors.getIsConnected(state)
  };
};

const actionCreators = {
  openConnection: socketActions.openConnection
};

export default connect(
  mapStateToProps,
  actionCreators
)(Manager);
