import React from "react";
import { connect } from "react-redux";

// Selectors
import * as chatSelectors from "../../../reducers/chat";

// Components
import { compose } from "recompose";

// View
import ChatSetup from "./Setup";
import GameView from "./GameView";
import RoomMenu from "./RoomMenu";

// Layout
import ChatLayout from "../../../layout/Chat";

// Styles
import { withStyles } from "@material-ui/core/styles";
const styles = theme => ({
  messaging: {
    height: "100%",
    width: "100%"
  },
  inboxMsg: {
    display: "flex",
    flexDirection: "row",
    height: "100%"
  },
  sideBarContainer: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "flex"
    }
  },
  link: {
    cursor: "pointer"
  }
});

const Chat = ({ classes, game }) => {
  const { isStarted } = game;

  return (
    <ChatLayout>
      <div className={classes.messaging}>
        <div className={classes.inboxMsg}>
          <div className={classes.sideBarContainer}>
            <RoomMenu />
          </div>
          {isStarted ? <GameView /> : <ChatSetup />}
        </div>
      </div>
    </ChatLayout>
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
)(Chat);
