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
import GameSetupLayout from "../../../layout/GameSetup";

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
    width: 210,
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
          {isStarted ? (
            <GameView />
          ) : (
            <React.Fragment>
              <div className={classes.sideBarContainer}>
                <RoomMenu />
              </div>
              <GameSetupLayout isStartScreen>
                <ChatSetup />
              </GameSetupLayout>
            </React.Fragment>
          )}
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
