import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Button from "../components/Button";
import Typography from "../components/Typography";
import ProductHeroLayout from "./ProductHeroLayout";

// Constants
import * as ROUTES from "../constants/routes";

const styles = theme => ({
  background: {
    backgroundColor: "#43CEEB", // Average color of the background image.
    backgroundPosition: "center"
  },
  button: {
    minWidth: 200
  },
  h5: {
    color: "var(--realspiel-green)",
    fontSize: 24,
    fontWeight: "bold",
    maxWidth: 400,
    marginBottom: theme.spacing(1),
    marginTop: theme.spacing(4),
    [theme.breakpoints.up("sm")]: {
      marginTop: theme.spacing(5)
    }
  },
  slogan: {
    color: "var(--realspiel-green)",
    fontSize: 20,
    maxWidth: 400,
    marginBottom: theme.spacing(4),
    marginTop: theme.spacing(1),
    [theme.breakpoints.up("sm")]: {
      marginTop: theme.spacing(1)
    }
  },
  more: {
    marginTop: theme.spacing(2)
  }
});

const ProductHero = props => {
  const { classes } = props;

  return (
    <ProductHeroLayout>
      <Typography color="inherit" align="center" variant="h2" marked="center">
        Upgrade your Senses
      </Typography>
      <Typography
        color="inherit"
        align="center"
        variant="h5"
        className={classes.h5}
      >
        Enhancing your detection and convincing skills. Gain extra points. Be
        the winner.
      </Typography>
      <Typography
        color="inherit"
        align="center"
        variant="h5"
        className={classes.slogan}
      >
        A multiplayer game for devious people. Who can be the best deceiver?
      </Typography>
      <Button
        color="secondary"
        variant="contained"
        size="large"
        className={classes.button}
        component="a"
        href={ROUTES.SCOREBOARD}
      >
        Play Game
      </Button>
      <Typography variant="body2" color="inherit" className={classes.more}>
        Discover the experience
      </Typography>
    </ProductHeroLayout>
  );
};

ProductHero.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ProductHero);
