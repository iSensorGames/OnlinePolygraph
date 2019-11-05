import withRoot from "../../modules/withRoot";
import React from "react";
import { compose } from "recompose";
import PropTypes from "prop-types";
import clsx from "clsx";
import Container from "@material-ui/core/Container";

// Styles
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  root: {
    color: theme.palette.common.white,
    display: "flex",
    alignItems: "center",
    [theme.breakpoints.up("sm")]: {
      position: "relative",
      minHeight: 500,
      maxHeight: 1300
    }
  },
  container: {
    marginTop: 70,
    paddingBottom: 24,
    paddingTop: 24,
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

function Base(props) {
  const { backgroundClassName, children, classes } = props;

  return (
    <section className={classes.root}>
      <Container className={classes.container}>
        {children}
        <div className={classes.backdrop} />
        <div className={clsx(classes.background, backgroundClassName)} />
      </Container>
    </section>
  );
}

Base.propTypes = {
  backgroundClassName: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  classes: PropTypes.object.isRequired
};

export default compose(
  withRoot,
  withStyles(styles)
)(Base);
