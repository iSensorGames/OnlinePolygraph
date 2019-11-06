import React from "react";
import { compose } from "recompose";
import { connect } from "react-redux";

// Views
import Intro from "./Intro";
import TopicSelect from "./TopicSelect";

// Actions
import * as chatActions from "../../../../actions/chat";

// Selectors
import * as chatSelectors from "../../../../reducers/chat";

// Layout
import ChatSetupLayout from "../../../../layout/ChatSetup";

// Styles
import { withStyles } from "@material-ui/core/styles";
const styles = () => ({
  container: {
    alignItems: "center",
    display: "flex",
    flex: 1,
    justifyContent: "center",
    position: "relative"
  }
});

const Tab = ({ chatSetupTab }) => {
  switch (chatSetupTab) {
    case "intro":
      return <Intro />;
    case "topic":
      return <TopicSelect />;
    default:
      return null;
  }
};

const ChatSetup = ({ classes, chatSetupTab }) => {
  return (
    <div className={classes.container}>
      <ChatSetupLayout>
        <Tab chatSetupTab={chatSetupTab} />
      </ChatSetupLayout>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    chatSetupTab: chatSelectors.getChatSetupTab(state)
  };
};

const actionCreators = {
  createRoom: chatActions.createRoom
};

export default compose(
  withStyles(styles),
  connect(
    mapStateToProps,
    actionCreators
  )
)(ChatSetup);
