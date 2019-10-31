import React from "react";

// Assets
import "./welcome.css";
import logo from "../../../static/img/logo.png";

// Components
import clsx from "clsx";
import { compose } from "recompose";
import { withAuthorization } from "../../../modules/components/Session";
import Button from "../../../modules/components/Button";
import Typography from "../../../modules/components/Typography";

// Layout
import BaseLayout from "../../../layout/Base";

// Constants
import * as ROUTES from "../../../modules/constants/routes";

// Styles
import { withStyles } from "@material-ui/core/styles";
const styles = theme => ({
  background: {
    backgroundColor: "#43CEEB", // Average color of the background image.
    backgroundPosition: "center"
  },
  button: {
    marginBottom: 20,
    minWidth: 200
  },
  actionButton: {
    backgroundColor: "#FFDE07",
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

const Welcome = ({ classes }) => {
  return (
    <BaseLayout backgroundClassName={classes.background}>
      <img src={logo} className={classes.logo} alt="Real or Spiel?" />
      <Typography
        color="inherit"
        align="center"
        variant="h5"
        className={clsx(classes.h5, classes.slogan)}
      >
        A multiplayer game for devious people. Enhance your detection and
        persuading skills. Gain extra points. Be the winner.
      </Typography>
      <Button
        color="secondary"
        variant="contained"
        size="large"
        className={classes.button}
        component="a"
        href={ROUTES.RULES}
      >
        Rules
      </Button>
      <Button
        color="primary"
        variant="contained"
        size="large"
        className={classes.actionButton}
        component="a"
        href={ROUTES.GAME_SETUP}
      >
        Start
      </Button>
      <Typography variant="body2" color="inherit" className={classes.more}>
        Discover the experience
      </Typography>
    </BaseLayout>
  );
};

export default compose(
  withAuthorization,
  withStyles(styles)
)(Welcome);
