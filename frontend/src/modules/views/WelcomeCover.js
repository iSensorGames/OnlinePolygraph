import React from "react";
import PropTypes from "prop-types";

// Assets
import logo from "../../static/img/logo.png";

// Components
import clsx from "clsx";
import { withStyles } from "@material-ui/core/styles";
import Button from "../components/Button";
import Typography from "../components/Typography";
import WelcomeLayout from "./WelcomeLayout";

const styles = theme => ({
  background: {
    backgroundColor: "#43CEEB", // Average color of the background image.
    backgroundPosition: "center"
  },
  button: {
    marginBottom: 20,
    minWidth: 200
  },
  logo: {
    height: 200,
    [theme.breakpoints.up("sm")]: {
      height: "inherit"
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

function WelcomeCover(props) {
  const { classes } = props;

  return (
    <WelcomeLayout backgroundClassName={classes.background}>
      {/* <Typography color="inherit" align="center" variant="h2" marked="center">
        Welcome to Real or Spiel
      </Typography> */}
      <img src={logo} className={classes.logo} alt="Real or Spiel?" />
      <Typography
        color="inherit"
        align="center"
        variant="h5"
        className={clsx(classes.h5, classes.slogan)}
      >
        Enhancing your detection and convincing skills. Gain extra points. Be
        the winner.
      </Typography>
      <Button
        color="secondary"
        variant="contained"
        size="large"
        className={classes.button}
        component="a"
        href="/rules"
      >
        Rules
      </Button>
      <Button
        color="primary"
        variant="contained"
        size="large"
        className={classes.button}
        component="a"
        href="/game"
      >
        Play Game
      </Button>
      <Typography variant="body2" color="inherit" className={classes.more}>
        Discover the experience
      </Typography>
    </WelcomeLayout>
  );
}

WelcomeCover.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(WelcomeCover);
