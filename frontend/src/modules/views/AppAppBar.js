import React from "react";
import PropTypes from "prop-types";

// Components
import { AuthUserContext } from "../components/Session";
import clsx from "clsx";
import { withStyles } from "@material-ui/core/styles";
import Link from "@material-ui/core/Link";
import AppBar from "../components/AppBar";
import Logout from "../components/Logout";
import Toolbar, { styles as toolbarStyles } from "../components/Toolbar";

// Constants
import * as ROUTES from "../constants/routes";
import * as ROLES from "../constants/roles";

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

const AppAppBar = ({ classes }) => (
  <AuthUserContext.Consumer>
    {authUser =>
      authUser ? (
        <AppAppBarAuth classes={classes} authUser={authUser} />
      ) : (
        <AppAppBarNonAuth classes={classes} />
      )
    }
  </AuthUserContext.Consumer>
);

const AppAppBarAuth = ({ classes, authUser }) => {
  return (
    <AppBar position="fixed">
      <Toolbar className={classes.toolbar}>
        <div className={classes.left} />
        <Link
          variant="h6"
          underline="none"
          color="inherit"
          className={classes.title}
          href={ROUTES.HOME}
        >
          {"Online Polygraph"}
        </Link>
        <div className={classes.right}>
          <Link
            color="inherit"
            variant="h6"
            underline="none"
            className={classes.rightLink}
            href={ROUTES.GAME}
          >
            {"Play Game"}
          </Link>
          {!!authUser.roles[ROLES.ADMIN] && (
            <Link
              variant="h6"
              underline="none"
              className={classes.rightLink}
              href={ROUTES.ADMIN}
            >
              {"Admin"}
            </Link>
          )}
          <Logout />
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
          href={ROUTES.HOME}
        >
          {"Online Polygraph"}
        </Link>
        <div className={classes.right}>
          <Link
            color="inherit"
            variant="h6"
            underline="none"
            className={classes.rightLink}
            href={ROUTES.SIGN_IN}
          >
            {"Sign In"}
          </Link>
          <Link
            variant="h6"
            underline="none"
            className={clsx(classes.rightLink, classes.linkSecondary)}
            href={ROUTES.SIGN_UP}
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

export default withStyles(styles)(AppAppBar);
