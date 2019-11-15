import React, { useState } from "react";
import { compose } from "recompose";
import { connect } from "react-redux";

// Views
import Intro from "./Intro";
import TopicSelect from "./TopicSelect";
import RoomJoin from "./RoomJoin";
import Ready from "./Ready";

// Components
import Typography from "../../../../modules/components/Typography";
import Container from "@material-ui/core/Container";

// Actions
import * as chatActions from "../../../../actions/chat";

// Selectors
import * as chatSelectors from "../../../../reducers/chat";

// Layout
import ChatSetupLayout from "../../../../layout/ChatSetup";

// Styles
import { withStyles } from "@material-ui/core/styles";
const styles = theme => ({
  container: {
    alignItems: "center",
    display: "flex",
    flexDirection: "column",
    flex: 1,
    justifyContent: "center",
    position: "relative",
    marginBottom: 105,
    overflowY: "auto"
  },
  h5: {
    color: "var(--realspiel-green)",
    fontSize: 24,
    fontWeight: "bold",
    maxWidth: 400,
    marginBottom: theme.spacing(1),
    marginTop: theme.spacing(4),
    [theme.breakpoints.up("sm")]: {
      marginTop: theme.spacing(5)
    }
  },
  slogan: {
    color: "var(--realspiel-green)",
    fontSize: 20,
    maxWidth: 400,
    marginBottom: theme.spacing(4),
    marginTop: theme.spacing(1),
    [theme.breakpoints.up("sm")]: {
      marginTop: theme.spacing(1)
    }
  },
  textUserTip: {
    color: "var(--gray-dark)",
    display: "flex",
    flexDirection: "column",
    fontSize: 16,
    textTransform: "uppercase"
  }
});

const ChatSetup = ({ classes, chatSetupTab }) => {
  const [createGame, setCreateGame] = useState(false);

  const Tab = () => {
    switch (chatSetupTab) {
      case "intro":
        return <Intro />;
      case "topic":
        return <TopicSelect />;
      case "ready":
        return <Ready />;
      case "room-join":
        return <RoomJoin />;
      default:
        return null;
    }
  };

  return (
    <div className={classes.container}>
      {!createGame ? (
        <React.Fragment>
          <Typography
            color="inherit"
            align="center"
            variant="h5"
            className={classes.h5}
          >
            Enhance your detection and convincing skills. Gain extra points. Be
            the winner.
          </Typography>
          <Typography
            color="inherit"
            align="center"
            variant="h5"
            className={classes.slogan}
          >
            A multiplayer game for devious people. Who can be the best deceiver?
          </Typography>
          <Typography variant="h6" className={clsx(classes.textUserTip)}>
            Who is it about? What happened? When did it take place? Where did it
            take place? Why did it happen?
          </Typography>
          <Button
            color="primary"
            variant="contained"
            size="large"
            className={classes.button}
            onClick={() => setCreateGame(true)}
          >
            Create a new game
          </Button>
        </React.Fragment>
      ) : ["intro", "topic", "ready"].includes(chatSetupTab) ? (
        <ChatSetupLayout>
          <Tab />
        </ChatSetupLayout>
      ) : (
        <Tab />
      )}
    </div>
  );
};

const mapStateToProps = state => {
  return {
    chatSetupTab: chatSelectors.getChatSetupTab(state)
  };
};

const actionCreators = {
  createRoom: chatActions.createRoom
};

export default compose(
  withStyles(styles),
  connect(
    mapStateToProps,
    actionCreators
  )
)(ChatSetup);
