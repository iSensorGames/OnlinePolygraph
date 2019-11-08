import withRoot from "../../modules/withRoot";
import React from "react";
import { compose } from "recompose";
import PropTypes from "prop-types";

// Styles
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  root: {
    color: theme.palette.common.white,
    height: "100%"
  },
  container: {
    alignItems: "center",
    marginTop: 70,
    paddingBottom: 24,
    display: "flex",
    flexDirection: "row",
    height: "100%",
    [theme.breakpoints.down("sm")]: {
      marginTop: 64
    }
  }
});

function Base(props) {
  const { children, classes } = props;

  return (
    <section className={classes.root}>
      <div className={classes.container}>{children}</div>
    </section>
  );
}

Base.propTypes = {
  children: PropTypes.node.isRequired,
  classes: PropTypes.object.isRequired
};

export default compose(
  withRoot,
  withStyles(styles)
)(Base);
