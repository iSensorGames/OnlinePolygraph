import React from "react";
import { compose } from "recompose";
import { connect } from "react-redux";

// Components
import Button from "@material-ui/core/Button";

// Actions
import * as chatActions from "../../../../actions/chat";

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

const ChatSetup = ({ classes, createRoom }) => {
  return (
    <div className={classes.container}>
      <ChatSetupLayout>
        <Button color="primary" onClick={() => createRoom()}>
          Room Create
        </Button>
      </ChatSetupLayout>
    </div>
  );
};

const actionCreators = {
  createRoom: chatActions.createRoom
};

export default compose(
  withStyles(styles),
  connect(
    null,
    actionCreators
  )
)(ChatSetup);
