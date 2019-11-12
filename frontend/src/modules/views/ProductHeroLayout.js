import React from "react";
import PropTypes from "prop-types";
import Container from "@material-ui/core/Container";

// Styles
import { withStyles } from "@material-ui/core/styles";
const styles = theme => ({
  root: {
    alignItems: "center",
    color: theme.palette.common.white,
    display: "flex",
    height: "100%",
    marginTop: 70,
    position: "relative"
  },
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  backdrop: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: theme.palette.common.black,
    opacity: 0.5,
    zIndex: -1
  },
  background: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    zIndex: -2
  },
  arrowDown: {
    position: "absolute",
    bottom: theme.spacing(4)
  }
});

function ProductHeroLayout(props) {
  const { children, classes } = props;

  return (
    <section className={classes.root}>
      <Container className={classes.container}>{children}</Container>
    </section>
  );
}

ProductHeroLayout.propTypes = {
  backgroundClassName: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ProductHeroLayout);
