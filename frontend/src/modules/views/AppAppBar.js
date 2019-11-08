import React from "react";
import { connect } from "react-redux";
import { compose } from "recompose";
import PropTypes from "prop-types";

// Selectors
import * as sessionSelectors from "../../reducers/session";

// Components
import clsx from "clsx";
import { withStyles, useTheme } from "@material-ui/core/styles";
import Link from "@material-ui/core/Link";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "../components/AppBar";
import Logout from "../components/Logout";
import Typography from "../components/Typography";
import Toolbar, { styles as toolbarStyles } from "../components/Toolbar";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";

// Views
import RoomMenu from "../../pages/Game/Chat/RoomMenu";

// Constants
import * as ROUTES from "../constants/routes";

// Assets
import logo from "../../static/img/logo.png";

const drawerWidth = 240;
const styles = theme => ({
  logoContainer: {
    alignItems: "center",
    display: "flex",
    flexDirection: "row",
    height: 20
  },
  logo: {
    height: 60
  },
  title: {
    color: "var(--white)",
    fontSize: 24,
    marginLeft: 10,
    [theme.breakpoints.down("sm")]: {
      display: "none"
    }
  },
  placeholder: toolbarStyles(theme).root,
  toolbar: {
    justifyContent: "space-between"
  },
  left: {
    flex: 1,
    [theme.breakpoints.up("sm")]: {
      display: "none"
    }
  },
  leftTitle: {
    marginLeft: 10
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
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0
  },
  drawerPaper: {
    width: drawerWidth
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    justifyContent: "flex-end",
    ...theme.mixins.toolbar
  }
});

const settings = {
  title: "Real or Spiel?",
  game: "Play Game",
  admin: "Admin",
  signin: "Sign In",
  signup: "Sign Up"
};

const AppAppBar = ({ classes, user }) => {
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const AppToolbar = ({ children }) => (
    <React.Fragment>
      <AppBar position="fixed">
        <Toolbar className={classes.toolbar}>
          <div className={classes.left}>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              className={clsx(classes.menuButton, open && classes.hide)}
            >
              <MenuIcon />
              <div className={classes.leftTitle}>Rooms</div>
            </IconButton>
          </div>
          <Link
            underline="none"
            href={ROUTES.HOME}
            className={classes.logoContainer}
          >
            <img src={logo} alt="Real or Spiel logo" className={classes.logo} />
            <Typography className={classes.title} variant="h6">
              {settings.title}
            </Typography>
          </Link>
          <div className={classes.right}>{children}</div>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </div>
        <Divider />
        <RoomMenu fullMenuWidth />
      </Drawer>
    </React.Fragment>
  );

  const AppAppBarAuth = ({ user }) => {
    return (
      <AppToolbar classes={classes}>
        <Link
          color="inherit"
          variant="h6"
          underline="none"
          className={classes.rightLink}
          href={ROUTES.ACCOUNT}
        >
          {`${user.firstName} ${user.lastName}`}
        </Link>
        <Logout />
      </AppToolbar>
    );
  };

  const AppAppBarNonAuth = () => {
    return (
      <AppToolbar classes={classes}>
        <Link
          color="inherit"
          variant="h6"
          underline="none"
          className={classes.rightLink}
          href={ROUTES.SIGN_IN}
        >
          {settings.signin}
        </Link>
        <Link
          variant="h6"
          underline="none"
          className={clsx(classes.rightLink, classes.linkSecondary)}
          href={ROUTES.SIGN_UP}
        >
          {settings.signup}
        </Link>
      </AppToolbar>
    );
  };

  return !!user ? (
    <AppAppBarAuth classes={classes} user={user} />
  ) : (
    <AppAppBarNonAuth classes={classes} />
  );
};

AppAppBar.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
    user: sessionSelectors.getUser(state)
  };
};

export default compose(
  withStyles(styles),
  connect(
    mapStateToProps,
    null
  )
)(AppAppBar);
