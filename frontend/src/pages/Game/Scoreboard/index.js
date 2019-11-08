import React from "react";
import { connect } from "react-redux";

// Assets
import logo from "../../../static/img/logo.png";

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
  h5: {
    marginBottom: theme.spacing(4),
    marginTop: theme.spacing(4),
    [theme.breakpoints.up("sm")]: {
      marginTop: theme.spacing(10)
    }
  },
  root: {
    width: "100%",
    marginTop: theme.spacing(3),
    overflowX: "auto"
  },
  table: {
    minWidth: 700
  },
  slogan: {
    fontWeight: "bold",
    fontSize: 25
  },
  more: {
    marginTop: theme.spacing(2)
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

function createData(name, ranking, fat, carbs, protein) {
  return { name, ranking, fat, carbs, protein };
}

const rows = [
  createData("John Smith", 159),
  createData("Jennifer Oliveira", 237),
  createData("Gustavo Lee", 262),
  createData("Henry Tradford", 305),
  createData("Katherine Jameson", 356)
];

const Scoreboard = ({ classes }) => {
  return (
    <BaseLayout>
      <GameSetupLayout>
        <Typography
          color="inherit"
          align="center"
          variant="h5"
          className={clsx(classes.h5, classes.slogan)}
        >
          A multiplayer game for devious people. Enhance your detection and
          persuading skills. Gain extra points. Be the winner.
        </Typography>
        <Paper className={classes.root}>
          <Table className={classes.table} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Scoreboard</StyledTableCell>
                <StyledTableCell align="right">Ranking</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map(row => (
                <StyledTableRow key={row.name}>
                  <StyledTableCell component="th" scope="row">
                    {row.name}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {row.calories}
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      </GameSetupLayout>
    </BaseLayout>
  );
};

const mapStateToProps = state => {
  return {};
};

const actionCreators = {};

export default compose(
  withStyles(styles),
  connect(
    mapStateToProps,
    actionCreators
  )
)(Scoreboard);
