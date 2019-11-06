import React from "react";
import { connect } from "react-redux";

// Assets
import logo from "../../../static/img/logo.png";

// Components
import clsx from "clsx";
import { compose } from "recompose";
import Typography from "../../../modules/components/Typography";

// Layout
import BaseLayout from "../../../layout/Base";
import GameSetupLayout from "../../../layout/GameSetup";

// Actions

// Styles
import { withStyles } from "@material-ui/core/styles";
const styles = theme => ({
  img: {
    height: 200,
    maxWidth: "50%",
    [theme.breakpoints.up("sm")]: {
      height: "inherit",
      maxHeight: 400
    }
  },
  h5: {
    marginBottom: theme.spacing(4),
    marginTop: theme.spacing(4),
    [theme.breakpoints.up("sm")]: {
      marginTop: theme.spacing(10)
    }
  },
  slogan: {
    fontWeight: "bold",
    fontSize: 25
  },
  more: {
    marginTop: theme.spacing(2)
  }
});

const Scoreboard = ({ classes }) => {
  return (
    <BaseLayout>
      <GameSetupLayout>
        <Typography
          color="inherit"
          align="center"
          variant="h2"
          className={clsx(classes.h5, classes.slogan)}
        >
          Scoreboard
        </Typography>
        <Typography
          color="inherit"
          align="center"
          variant="h5"
          className={clsx(classes.h5, classes.slogan)}
        >
          A multiplayer game for devious people. Enhance your detection and
          persuading skills. Gain extra points. Be the winner.
        </Typography>
        <Typography variant="body2" color="inherit" className={classes.more}>
          Discover the experience
        </Typography>
      </GameSetupLayout>
    </BaseLayout>
  );
};

const mapStateToProps = state => {
  return {};
};

const actionCreators = {};

export default compose(
  withStyles(styles),
  connect(
    mapStateToProps,
    actionCreators
  )
)(Scoreboard);
