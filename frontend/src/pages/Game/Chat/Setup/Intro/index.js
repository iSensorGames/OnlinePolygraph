import React from "react";
import { compose } from "recompose";
import { connect } from "react-redux";

// Component
import Button from "../../../../../modules/components/Button";
import Typography from "../../../../../modules/components/Typography";
import Container from "@material-ui/core/Container";

// Actions
import * as chatActions from "../../../../../actions/chat";

// Styles
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  container: {
    alignItems: "center",
    display: "flex",
    flexDirection: "column",
    flex: 1,
    justifyContent: "flex-start",
    marginTop: 20,
    width: "100%",
    overflowY: "auto"
  },
  writeMsg: {
    fontSize: 20,
    paddingTop: 5,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 5,
    width: "100%",
    "&:focus": {
      outline: "none"
    },
    [theme.breakpoints.down("sm")]: {
      fontSize: 30,
      paddingLeft: 20,
      paddingRight: 20,
      paddingTop: 10,
      paddingBottom: 10
    }
  },
  title: {
    color: "#48542a",
    fontSize: 16,
    textAlign: "center",
    marginTop: 20,
    marginBottom: 20
  },
  button: {
    fontSize: 14,
    minHeight: 42,
    margin: "20px auto 80px",
    padding: 0,
    width: "100%",
    [theme.breakpoints.down("sm")]: {
      padding: 10,
      fontSize: 24
    }
  },
  description: {
    marginTop: 40,
    marginBottom: 15
  },
  curvyLines: {
    opacity: 0.7,
    pointerEvents: "none",
    position: "absolute",
    top: -180
  },
  inputContainer: {
    alignItems: "center",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    marginTop: 20,
    margin: "0 auto",
    width: "50%",
    [theme.breakpoints.down("sm")]: {
      width: "100%"
    }
  }
});

const Intro = ({ classes, setRoom, setChatSetupTab }) => {
  return (
    <div className={classes.container}>
      <Container>
        <Typography
          variant="h4"
          marked="center"
          className={classes.title}
          component="h2"
        >
          Give a name for your game.
        </Typography>
        <div className={classes.inputContainer}>
          <input
            type="text"
            onChange={e => setRoom({ name: e.target.value })}
            className={classes.writeMsg}
            placeholder="e.g.: Game 1"
            autoFocus
          />
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
      </Container>
    </div>
  );
};

const actionCreators = {
  setChatSetupTab: chatActions.setChatSetupTab,
  setRoom: chatActions.setRoom
};

export default compose(
  withStyles(styles),
  connect(
    null,
    actionCreators
  )
)(Intro);
