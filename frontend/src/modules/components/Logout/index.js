import React from "react";
import { connect } from "react-redux";
import { compose } from "recompose";
import * as ROUTES from "../../constants/routes";

// Actions
import * as sessionActions from "../../../actions/session";

// Components
import { withRouter } from "react-router-dom";
import Typography from "../Typography";

// Styles
import clsx from "clsx";
import { withStyles } from "@material-ui/core/styles";
import theme from "../../theme";
const styles = () => ({
  btn: {
    cursor: "pointer",
    "&:hover": {
      cursor: "pointer"
    }
  },
  underlineNone: {
    textDecoration: "none"
  },
  h6: {
    fontSize: 18,
    fontFamily: "'Roboto Condensed', 'sans-serif'",
    fontWeight: 700,
    lineHeight: 1.6,
    textTransform: "uppercase"
  },
  rightLink10: {
    color: "#e62958",
    fontSize: 16,
    marginLeft: 20,
    [theme.breakpoints.down("sm")]: {
      fontSize: 12
    },
    "&:hover": {
      color: "#0056b3"
    }
  },
  linkSecondary11: {
    color: "#ff3366"
  }
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
        history.push(ROUTES.SIGN_IN);
      });
    }}
  >
    <Typography variant="h6" className={classes.rightLink10}>
      Logout
    </Typography>
  </div>
);

const actionCreators = {
  signOut: sessionActions.signOut
};

export default compose(
  withStyles(styles),
  connect(
    null,
    actionCreators
  ),
  withRouter
)(Logout);
