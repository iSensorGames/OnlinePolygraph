import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import PropTypes from 'prop-types';

// Selectors
import * as userSelectors from '../../reducers/user';

// Components
import clsx from 'clsx';
import { withStyles } from '@material-ui/core/styles';
import Link from '@material-ui/core/Link';
import AppBar from '../components/AppBar';
import Logout from '../components/Logout';
import Typography from '../components/Typography';
import Toolbar, { styles as toolbarStyles } from '../components/Toolbar';

// Constants
import * as ROUTES from '../constants/routes';
import * as ROLES from '../constants/roles';

// Assets
import logo from '../../static/img/logo.png';

const styles = theme => ({
  logoContainer: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    height: 20,
  },
  logo: {
    height: 60,
  },
  title: {
    color: 'var(--white)',
    fontSize: 24,
    marginLeft: 10,
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
  placeholder: toolbarStyles(theme).root,
  toolbar: {
    justifyContent: 'space-between',
  },
  left: {
    [theme.breakpoints.up('sm')]: {
      flex: 1,
    },
  },
  leftLinkActive: {
    color: theme.palette.common.white,
  },
  right: {
    flex: 1,
    display: 'flex',
    justifyContent: 'flex-end',
  },
  rightLink: {
    fontSize: 16,
    color: theme.palette.common.white,
    marginLeft: theme.spacing(3),
  },
  linkSecondary: {
    color: theme.palette.secondary.main,
  },
});

const settings = {
  title: 'Real or Spiel?',
  game: 'Play Game',
  admin: 'Admin',
  signin: 'Sign In',
  signup: 'Sign Up',
};

const AppAppBar = ({ classes, user }) => {
  console.log('user', user);
  return user ? (
    <AppAppBarAuth classes={classes} user={user} />
  ) : (
    <AppAppBarNonAuth classes={classes} />
  );
};

const AppAppBarAuth = ({ classes, user }) => {
  return (
    <AppBar position="fixed">
      <Toolbar className={classes.toolbar}>
        <div className={classes.left} />
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
        <div className={classes.right}>
          <Link
            color="inherit"
            variant="h6"
            underline="none"
            className={classes.rightLink}
            href={ROUTES.WELCOME}
          >
            {settings.game}
          </Link>
          {!!user.roles && !!user.roles === ROLES.ADMIN && (
            <Link
              variant="h6"
              underline="none"
              className={classes.rightLink}
              href={ROUTES.ADMIN}
            >
              {settings.admin}
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
          {settings.title}
        </Link>
        <div className={classes.right}>
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
        </div>
      </Toolbar>
    </AppBar>
  );
};

AppAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => {
  return {
    user: userSelectors.getUser(state),
  };
};

export default compose(
  withStyles(styles),
  connect(
    mapStateToProps,
    null
  )
)(AppAppBar);
