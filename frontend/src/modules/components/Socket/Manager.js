import React from "react";
import { connect } from "react-redux";

// Selectors
import * as userSelectors from "../../../reducers/user";

// Actions
import * as userActions from "../../../actions/user";

class Manager extends React.Component {
  componentDidMount() {
    const { connectUser, isConnected } = this.props;

    console.log("withSocket isConnected", isConnected);

    if (!isConnected) {
      this.disconnectUser = connectUser();
    }
  }
  componentWillUnmount() {
    if (typeof this.disconnectUser === "function") {
      this.disconnectUser();
    }
  }

  render() {
    const { children } = this.props;

    return <div>{children}</div>;
  }
}

const mapStateToProps = state => {
  return {
    isConnected: userSelectors.isConnected(state)
  };
};

const actionCreators = {
  connectUser: userActions.connectUser
};

export default connect(
  mapStateToProps,
  actionCreators
)(Manager);
