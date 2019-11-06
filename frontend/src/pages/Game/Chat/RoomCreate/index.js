import React from "react";
import { compose } from "recompose";
import { connect } from "react-redux";

// Components
import Button from "@material-ui/core/Button";

// Actions
import * as chatActions from "../../../../actions/chat";

// Layout
import ChatLayout from "../../../../layout/Chat";

// Styles
import { withStyles } from "@material-ui/core/styles";
const styles = () => ({
  container: {
    alignItems: "center",
    display: "flex",
    justifyContent: "center",
    width: "60%"
  }
});

const RoomCreate = ({ classes, createRoom }) => {
  return (
    <div className={classes.container}>
      <Button color="primary" onClick={() => createRoom()}>
        Room Create
      </Button>
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
)(RoomCreate);
