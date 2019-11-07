import React from "react";
import { compose } from "recompose";
import { connect } from "react-redux";

// Component
import Button from "../../../../../modules/components/Button";
import Typography from "../../../../../modules/components/Typography";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";

// Actions
import * as chatActions from "../../../../../actions/chat";

// Styles
import { withStyles } from "@material-ui/core/styles";

// Assets
import productCurvyLines from "../../../../../static/img/productCurvyLines.png";
import productHowItWorks1 from "../../../../../static/img/productHowItWorks1.svg";
import productHowItWorks2 from "../../../../../static/img/productHowItWorks2.svg";
import productHowItWorks3 from "../../../../../static/img/productHowItWorks3.svg";

const styles = theme => ({
  container: {
    alignItems: "center",
    display: "flex",
    flexDirection: "column",
    flex: 1,
    justifyContent: "flex-start",
    marginTop: 80,
    width: "100%",
    overflowY: "auto"
  },
  inputMsgWrite: {
    display: "flex",
    flexDirection: "column"
  },
  writeMsg: {
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 10,
    paddingBottom: 10,
    fontSize: 30,
    minWidth: 600,
    "&:focus": {
      outline: "none"
    },
    [theme.breakpoints.down("sm")]: {
      minWidth: "inherit",
      marginRight: 10,
      marginLeft: 10
    }
  },
  button: {
    minWidth: 300,
    minHeight: 55,
    margin: "20px auto 80px"
  },
  description: {
    marginTop: 40,
    marginBottom: 15
  },
  item: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: theme.spacing(0, 5)
  },
  title: {
    color: "#48542a",
    marginBottom: theme.spacing(4),
    textAlign: "center",
    marginTop: 40
  },
  number: {
    fontSize: 24,
    fontFamily: theme.typography.fontFamily,
    color: theme.palette.secondary.main,
    fontWeight: theme.typography.fontWeightMedium
  },
  image: {
    height: 55,
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(4)
  },
  curvyLines: {
    pointerEvents: "none",
    position: "absolute",
    top: -180,
    opacity: 0.7
  },
  inputContainer: {
    alignItems: "center",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    marginTop: 50
  },
  divider: {
    borderTop: "1px solid",
    marginTop: 40
  }
});

const Intro = ({ classes, setRoomName, setChatSetupTab }) => {
  return (
    <div className={classes.container}>
      <Container>
        <Typography
          variant="h4"
          marked="center"
          className={classes.title}
          component="h2"
        >
          How it works
        </Typography>
        <div>
          <Grid container spacing={5}>
            <Grid item xs={12} md={4}>
              <div className={classes.item}>
                <div className={classes.number}>1.</div>
                <img
                  src={productHowItWorks1}
                  alt="suitcase"
                  className={classes.image}
                />
                <Typography variant="h6" align="center">
                  Give a name.
                </Typography>
              </div>
            </Grid>
            <Grid item xs={12} md={4}>
              <div className={classes.item}>
                <div className={classes.number}>2.</div>
                <img
                  src={productHowItWorks2}
                  alt="graph"
                  className={classes.image}
                />
                <Typography variant="h6" align="center">
                  Select a topic.
                </Typography>
              </div>
            </Grid>
            <Grid item xs={12} md={4}>
              <div className={classes.item}>
                <div className={classes.number}>3.</div>
                <img
                  src={productHowItWorks3}
                  alt="clock"
                  className={classes.image}
                />
                <Typography variant="h6" align="center">
                  Start playing.
                </Typography>
              </div>
            </Grid>
          </Grid>
        </div>
      </Container>
      <Container className={classes.divider}>
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
            onChange={e => setRoomName(e.target.value)}
            className={classes.writeMsg}
            placeholder="e.g.: Game 1"
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
  setRoomName: chatActions.setRoomName
};

export default compose(
  withStyles(styles),
  connect(
    null,
    actionCreators
  )
)(Intro);
