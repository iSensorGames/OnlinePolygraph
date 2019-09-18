import React, { Component } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { withFirebase } from "../components/Firebase";
import { withStyles } from "@material-ui/core/styles";
import Link from "@material-ui/core/Link";
import AppBar from "../components/AppBar";
import Toolbar, { styles as toolbarStyles } from "../components/Toolbar";

const styles = theme => ({
  title: {
    fontSize: 24
  },
  placeholder: toolbarStyles(theme).root,
  toolbar: {
    justifyContent: "space-between"
  },
  left: {
    flex: 1
  },
  leftLinkActive: {
    color: theme.palette.common.white
  },
  right: {
    flex: 1,
    display: "flex",
    justifyContent: "flex-end"
  },
  rightLink: {
    fontSize: 16,
    color: theme.palette.common.white,
    marginLeft: theme.spacing(3)
  },
  linkSecondary: {
    color: theme.palette.secondary.main
  }
});

class AppAppBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      authUser: null
    };
  }

  componentDidMount() {
    this.props.firebase.auth.onAuthStateChanged(authUser => {
      authUser
        ? this.setState({ authUser })
        : this.setState({ authUser: null });
    });
  }

  componentWillUnmount() {
    this.listener();
  }

  render() {
    const { classes, authUser } = this.props;

    return (
      <div>
        {authUser ? (
          <AppAppBarAuth classes={classes} />
        ) : (
          <AppAppBarAuth classes={classes} />
        )}
        <div className={classes.placeholder} />
      </div>
    );
  }
}

const AppAppBarAuth = ({ classes }) => {
  return (
    <AppBar position="fixed">
      <Toolbar className={classes.toolbar}>
        <div className={classes.left} />
        <Link
          variant="h6"
          underline="none"
          color="inherit"
          className={classes.title}
          href="/"
        >
          {"Online Polygraph"}
        </Link>
        <div className={classes.right}>
          <Link
            color="inherit"
            variant="h6"
            underline="none"
            className={classes.rightLink}
            href="/sign-in/"
          >
            {"Sign In"}
          </Link>
          <Link
            variant="h6"
            underline="none"
            className={clsx(classes.rightLink, classes.linkSecondary)}
            href="/sign-up/"
          >
            {"Sign Up"}
          </Link>
        </div>
      </Toolbar>
    </AppBar>
  );
};

const AppAppBarNonAuth = ({ classes }) => {
  return (
    <AppBar position="fixed">
      <Toolbar className={classes.toolbar}>
        <div className={classes.left} />
        <Link
          variant="h6"
          underline="none"
          color="inherit"
          className={classes.title}
          href="/"
        >
          {"Online Polygraph"}
        </Link>
        <div className={classes.right}>
          <Link
            color="inherit"
            variant="h6"
            underline="none"
            className={classes.rightLink}
            href="/sign-in/"
          >
            {"Sign In"}
          </Link>
          <Link
            variant="h6"
            underline="none"
            className={clsx(classes.rightLink, classes.linkSecondary)}
            href="/sign-up/"
          >
            {"Sign Up"}
          </Link>
        </div>
      </Toolbar>
    </AppBar>
  );
};

AppAppBar.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withFirebase(withStyles(styles)(AppAppBar));
