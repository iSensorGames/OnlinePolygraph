import React from "react";
import { connect } from "react-redux";

// Selectors
import * as sessionSelectors from "../../../reducers/session";

// Actions
import * as sessionActions from "../../../actions/session";

class Manager extends React.Component {
  initializeConnection() {
    const { openConnection, token } = this.props;

    this.reconnect =
      typeof this.reconnect === "function"
        ? this.reconnect({ token })
        : openConnection({ token });
  }

  terminateConnection() {
    if (typeof this.reconnect !== "function") {
      return;
    }

    this.reconnect(false);
  }
  componentDidMount() {
    this.initializeConnection();
  }

  componentWillUnmount() {
    this.terminateConnection();
  }

  render() {
    const { children, token } = this.props;

    if (!token) {
      return null;
    }

    return { children };
  }
}

const mapStateToProps = state => {
  return {
    token: sessionSelectors.getToken(state)
  };
};

const actionCreators = {
  openConnection: sessionActions.openConnection
};

export default connect(
  mapStateToProps,
  actionCreators
)(Manager);
