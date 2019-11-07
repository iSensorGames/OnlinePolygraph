import React from "react";
import { compose } from "recompose";
import { connect } from "react-redux";

// Component
import Button from "../../../../../modules/components/Button";
import Typography from "../../../../../modules/components/Typography";

// Actions
import * as chatActions from "../../../../../actions/chat";

// Styles
import { withStyles } from "@material-ui/core/styles";

const styles = () => ({
  container: {
    alignItems: "center",
    display: "flex",
    flexDirection: "column",
    flex: 1,
    justifyContent: "center"
  },
  inputMsgWrite: {
    alignItems: "center",
    display: "flex",
    flexDirection: "row",
    position: "relative",
    paddingRight: 20,
    paddingLeft: 20,
    background: "white"
  },
  writeMsg: {
    "&:focus": {
      outline: "none"
    }
  },
  button: {
    minWidth: 200
  }
});

const Intro = ({ classes, setRoomName, setChatSetupTab }) => {
  return (
    <div className={classes.container}>
      <Typography variant="h3" align="center">
        INTRO
      </Typography>
      <div className={classes.inputMsgWrite}>
        <input
          type="text"
          onChange={e => setRoomName(e.target.value)}
          className={classes.writeMsg}
          placeholder="Give a name to your game"
        />
      </div>
      <Typography variant="h5">
        {
          "Give a name for your game. Pick a conversation topic. Create a new game."
        }
        {"Pair up with your opponent."}
      </Typography>
      <Button
        color="secondary"
        variant="contained"
        size="large"
        className={classes.button}
        onClick={() => setChatSetupTab("topic")}
      >
        Got it
      </Button>
    </div>
  );
};

const actionCreators = {
  setChatSetupTab: chatActions.setChatSetupTab,
  setRoomName: chatActions.setRoomName
};

export default compose(
  withStyles(styles),
  connect(
    null,
    actionCreators
  )
)(Intro);
