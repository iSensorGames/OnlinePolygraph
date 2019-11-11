import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import * as ROUTES from '../../constants/routes';

// Actions
import * as sessionActions from '../../../actions/session';

// Components
import { withRouter } from 'react-router-dom';

// Styles
import clsx from 'clsx';
import { withStyles } from '@material-ui/core/styles';
const styles = () => ({
  btn: {
    cursor: 'pointer',
    '&:hover': {
      cursor: 'pointer',
    },
  },
  underlineNone: {
    textDecoration: 'none',
  },
  h6: {
    color: 'rgba(0, 0, 0, 0.87)',
    fontSize: 18,
    fontFamily: "'Roboto Condensed', 'sans-serif'",
    fontWeight: 700,
    lineHeight: 1.6,
    textTransform: 'uppercase',
  },
  rightLink10: {
    color: '#fff',
    fontSize: '16px',
    marginLeft: 24,
  },
  linkSecondary11: {
    color: '#ff3366',
  },
});

const Logout = ({ classes, history, signOut }) => (
  <div
    className={clsx(
      classes.btn,
      classes.h6,
      classes.underlineNone,
      classes.rightLink10,
      classes.linkSecondary11
    )}
    onClick={() => {
      signOut().then(() => {
        history.push(ROUTES.SIGN_IN_ROUTE);
      });
    }}
  >
    Logout
  </div>
);

const actionCreators = {
  signOut: sessionActions.signOut,
};

export default compose(
  withStyles(styles),
  connect(
    null,
    actionCreators
  ),
  withRouter
)(Logout);
