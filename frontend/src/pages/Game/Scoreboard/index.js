import React, { useEffect } from "react";
import { connect } from "react-redux";
import * as utils from "../../../utils";

// Actions
import * as usersActions from "../../../actions/users";

// Selectors
import * as usersSelectors from "../../../reducers/users";

// Components
import clsx from "clsx";
import { compose } from "recompose";
import Typography from "../../../modules/components/Typography";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

// Layout
import BaseLayout from "../../../layout/Base";
import GameSetupLayout from "../../../layout/GameSetup";

// Actions

// Styles
import { withStyles } from "@material-ui/core/styles";
const styles = theme => ({
  img: {
    height: 200,
    maxWidth: "50%",
    [theme.breakpoints.up("sm")]: {
      height: "inherit",
      maxHeight: 400
    }
  },
  root: {
    width: "100%",
    overflowX: "auto"
  },
  table: {
    minWidth: 700,
    minHeight: 400
  },
  slogan: {
    color: "var(--realspiel-green)",
    fontWeight: "bold",
    fontSize: 25,
    marginBottom: 15,
    marginTop: 15,
    textAlign: "left"
  },
  more: {
    marginTop: theme.spacing(2)
  },
  loading: {
    alignItems: "center",
    display: "flex",
    justifyContent: "center"
  }
});

const StyledTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white
  },
  body: {
    fontSize: 14
  }
}))(TableCell);

const StyledTableRow = withStyles(theme => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.background.default
    }
  }
}))(TableRow);

const Scoreboard = ({ classes, isFetching, users, getUsers }) => {
  useEffect(() => {
    getUsers();
  }, []);

  return (
    <BaseLayout>
      <GameSetupLayout>
        <Typography
          color="inherit"
          align="center"
          variant="h5"
          className={classes.slogan}
        >
          Scoreboard
        </Typography>
        <Paper className={classes.root}>
          {isFetching ? (
            <div className={classes.loading}>Fetching scoreboard...</div>
          ) : (
            <Table className={classes.table} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell>Player</StyledTableCell>
                  <StyledTableCell align="right">Score</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {!users ? (
                  <div className={classes.loading}>No user(s) were found.</div>
                ) : (
                  Object.keys(users).map(key => {
                    const { first_name, last_name, email } = users[key];
                    const score = utils.randomize(100);
                    return (
                      <StyledTableRow key={email}>
                        <StyledTableCell component="th" scope="row">
                          {`${first_name} ${last_name} (${email})`}
                        </StyledTableCell>
                        <StyledTableCell align="right">{`${score} points`}</StyledTableCell>
                      </StyledTableRow>
                    );
                  })
                )}
              </TableBody>
            </Table>
          )}
        </Paper>
      </GameSetupLayout>
    </BaseLayout>
  );
};

const mapStateToProps = state => {
  return {
    users: usersSelectors.getUsers(state),
    isFetching: usersSelectors.getIsFetching(state)
  };
};

const actionCreators = {
  getUsers: usersActions.getUsers
};

export default compose(
  withStyles(styles),
  connect(
    mapStateToProps,
    actionCreators
  )
)(Scoreboard);
