import React, { useEffect, useState } from "react";
import { compose } from "recompose";
import { connect } from "react-redux";
import * as utils from "../../utils";

// Selectors
import * as chatSelectors from "../../reducers/chat";

// Actions
import * as chatActions from "../../actions/chat";

// Constants
import * as ROLES from "../../modules/constants/roles";

// Styles
import { withStyles } from "@material-ui/core/styles";
const styles = () => ({
  container: {
    alignItems: "center",
    display: "flex",
    flexDirection: "column",
    position: "relative",
    width: "100%"
  },
  topMenuContainer: {
    alignItems: "center",
    backgroundColor: "#123791",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%"
  },
  gameItemContainer: {
    alignItems: "center",
    display: "flex",
    flex: 1,
    flexDirection: "column",
    height: 80,
    justifyContent: "center"
  },
  questionContainer: {
    alignItems: "center",
    background: "var(--blue)",
    borderBottom: "1px solid var(--gray)",
    display: "flex",
    height: 40,
    justifyContent: "center",
    padding: "5px 10px",
    width: "100%"
  },
  title: {
    fontWeight: "bold"
  },
  value: {
    marginTop: 10
  }
});

const RoleWrapperLayout = ({ children, classes, game }) => {
  let [time, setTime] = useState(300000);
  let interval = null;
  useEffect(() => {
    console.log("RoleWrapperLayout useEffect");
    interval = setInterval(() => {
      console.log("RoleWrapperLayout useEffect setInterval");
      setTime(time - 1000);
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const {
    gameRound,
    question,
    outerRole,
    innerRole,
    readyToPlay,
    readyToPlayConfirmByOpponent
  } = game;
  const readyToStart = readyToPlay && readyToPlayConfirmByOpponent;

  return (
    <div className={classes.container}>
      {readyToStart && (
        <div className={classes.topMenuContainer}>
          <div className={classes.gameItemContainer}>
            <div className={classes.title}>Outer Role</div>
            <div className={classes.value}>
              {ROLES.OUTER_ROLE[outerRole] && ROLES.OUTER_ROLE[outerRole].NAME}
            </div>
          </div>
          <div className={classes.gameItemContainer}>
            <div className={classes.title}>Inner Role</div>
            <div className={classes.value}>
              {ROLES.INNER_ROLE[innerRole] && ROLES.INNER_ROLE[innerRole].NAME}
            </div>
          </div>
          <div className={classes.gameItemContainer}>
            <div className={classes.title}>Game Round</div>
            <div className={classes.value}>{`${gameRound} of 12`}</div>
          </div>
          <div className={classes.gameItemContainer}>
            <div className={classes.title}>Time left</div>
            <div className={classes.value}>
              {utils.millisecondsToMinutesSeconds(time)}
            </div>
          </div>
        </div>
      )}
      {readyToStart && (
        <div
          className={classes.questionContainer}
        >{`Target Question: ${question}`}</div>
      )}
      {children}
    </div>
  );
};

const mapStateToProps = state => {
  return {
    game: chatSelectors.getGame(state)
  };
};

export default compose(
  withStyles(styles),
  connect(
    mapStateToProps,
    null
  )
)(RoleWrapperLayout);
