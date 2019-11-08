import withRoot from "../../modules/withRoot";
import React from "react";
import { compose } from "recompose";
import PropTypes from "prop-types";
import Container from "@material-ui/core/Container";

// Styles
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  root: {
    color: theme.palette.common.white,
    overflowY: "auto",
    height: "100%"
  },
  container: {
    alignItems: "center",
    marginTop: 70,
    marginBottom: 70,
    paddingBottom: 24,
    paddingTop: 24,
    display: "flex",
    flexDirection: "column",
    position: "relative",
    [theme.breakpoints.down("sm")]: {
      marginTop: 64
    }
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
  arrowDown: {
    position: "absolute",
    bottom: theme.spacing(4)
  }
});

function Base(props) {
  const { children, classes } = props;

  return (
    <section className={classes.root}>
      <Container className={classes.container}>{children}</Container>
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
