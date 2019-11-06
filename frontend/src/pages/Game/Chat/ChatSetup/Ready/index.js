import React from "react";
import { compose } from "recompose";
import { connect } from "react-redux";

// Component
import Button from "../../../../../modules/components/Button";

// Actions
import * as chatActions from "../../../../../actions/chat";

// Selectors
import * as chatSelectors from "../../../../../reducers/chat";

// Styles
import { withStyles } from "@material-ui/core/styles";
const styles = () => ({
  container: {
    alignItems: "center",
    display: "flex",
    flexDirection: "column",
    flex: 1,
    justifyContent: "center"
  }
});

const Ready = ({ classes, topic, roomName }) => {
  return (
    <div className={classes.container}>
      <div>READY</div>
      <div>Topic: {topic}</div>
      <div>Room Name: {roomName}</div>
      <div>Waiting for your opponent...</div>
      <Button color="primary" onClick={() => createRoom()}>
        Okay
      </Button>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    topic: chatSelectors.getTopic(state),
    roomName: chatSelectors.getRoomName(state)
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
)(Ready);
