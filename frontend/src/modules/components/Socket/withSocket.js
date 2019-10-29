import React from "react";
import { connect } from "react-redux";

// Selectors
import * as userSelectors from "../../../reducers/user";

// Actions
import * as userActions from "../../../actions/user";

const withSocket = Component => {
  class WithSocket extends React.Component {
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
      return <Component {...this.props} />;
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

  return connect(
    mapStateToProps,
    actionCreators
  )(WithSocket);
};

export default withSocket;
