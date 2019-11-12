import React, { useState } from "react";
import { connect } from "react-redux";
import { compose } from "recompose";
import moment from "moment";

// Actions
import * as chatActions from "../../../../../actions/chat";

// Selectors
import * as chatSelectors from "../../../../../reducers/chat";
import * as sessionSelectors from "../../../../../reducers/session";

// Icons
import SendIcon from "@material-ui/icons/Send";
import PersonOutlineIcon from "@material-ui/icons/PersonOutline";

// Contants
import * as ROLES from "../../../../../modules/constants/roles";

// Components
import Button from "../../../../../modules/components/Button";
import Typography from "../../../../../modules/components/Typography";

// Assets
import topicImages from "../../../../../modules/constants/topicImages";

// Styles
import { withStyles } from "@material-ui/core/styles";
const styles = theme => ({
  container: {
    flex: 1,
    display: "flex",
    flexDirection: "row"
  },
  sideBar: {
    backgroundColor: "var(--white)",
    width: 200
  },
  message: {
    padding: 0,
    width: "100%",
    flex: 1,
    overflowY: "auto"
  },
  messageHistory: {
    height: "calc(100% - 135px)",
    overflowY: "auto",
    padding: 10
  },
  messageHistorySpeakerRole: {
    height: "calc(100% - 95px)",
    overflowY: "auto",
    padding: 10
  },
  messageEmpty: {
    alignItems: "center",
    color: "var(--realspiel-green)",
    display: "flex",
    flex: 1,
    fontSize: 18,
    fontWeight: "bold",
    height: "100%",
    justifyContent: "center"
  },
  icon: {
    width: 20
  },
  incomingMessage: {
    alignItems: "flex-start",
    display: "flex",
    flexDirection: "row"
  },
  incomingMessageImage: {
    "& img": {
      width: 55
    }
  },
  receivedMsg: {
    padding: "0 0 0 10px"
  },
  receivedMsgWithdMsg: {
    background: "var(--blue) none repeat scroll 0 0",
    borderRadius: 3,
    color: "#646464",
    display: "flex",
    flexDirection: "column",
    fontSize: 14,
    margin: 0,
    padding: "5px 10px 5px 12px",
    width: "100%"
  },
  timeDate: {
    color: "#747474",
    display: "block",
    fontSize: 12,
    margin: "8px 0 0"
  },
  outgoingMessage: {
    display: "flex",
    justifyContent: "flex-end",
    overflow: "hidden",
    margin: "26px 0 26px"
  },
  sentMessage: {
    display: "flex",
    flexDirection: "column",
    minWidth: 200,
    background: "var(--white)",
    color: "var(--gray-dark)",
    padding: "5px 20px",
    borderRadius: 7
  },
  inputMessageWrite: {
    alignItems: "center",
    display: "flex",
    flexDirection: "row",
    position: "relative",
    paddingRight: 20,
    paddingLeft: 20,
    background: "white",
    "& input": {
      background: "rgba(0, 0, 0, 0) none repeat scroll 0 0",
      border: "medium none",
      color: "#4c4c4c",
      fontSize: 15,
      minHeight: 48,
      width: "100%"
    }
  },
  writeMessage: {
    "&:focus": {
      outline: "none"
    }
  },
  messageSendButton: {
    background: "#05728f none repeat scroll 0 0",
    border: "medium none",
    borderRadius: "50%",
    color: "#fff",
    cursor: "pointer",
    fontSize: 17,
    height: 33,
    width: 33
  },
  guessContainer: {
    alignItems: "center",
    display: "flex",
    justifyContent: "space-evenly",
    padding: "0 40px",
    fontWeight: "bold",
    zIndex: 1
  },
  imageSrc: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundSize: "cover",
    backgroundPosition: "center 40%"
  },
  imageBackdrop: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    background: theme.palette.common.black,
    opacity: 0.5,
    transition: theme.transitions.create("opacity")
  },
  guessText: {
    color: "var(--gray-dark)",
    fontSize: 12
  },
  buttonsContainer: {
    display: "flex",
    flexDirection: "row"
  },
  button: {
    padding: "5px 10px"
  }
});

const MessageContainer = ({
  classes,
  sendMessage,
  room,
  game,
  user,
  startGame
}) => {
  const [message, setMessage] = useState("");
  const handleSubmit = e => {
    e.preventDefault();
    sendMessage(message);
  };

  const handleDetectorResponse = detectorResponse => {
    startGame(detectorResponse);
  };

  const { topic } = room;
  const { messages, innerRole, outerRole } = game;
  const isDetector = outerRole === 1;
  const topicImage = topicImages.filter(image => image.title === topic)[0];

  return (
    <div className={classes.container}>
      <div className={classes.sideBar}>
        <Typography variant="h6">{`The topic is: ${topic}`}</Typography>
        <Typography variant="h6">
          {`${ROLES.INNER_ROLE[innerRole] &&
            ROLES.INNER_ROLE[innerRole].DESCRIPTION2}`}
        </Typography>
        {isDetector && (
          <div className={classes.guessContainer}>
            <div className={classes.guessText}>Detector's guess: </div>
            <div className={classes.buttonsContainer}>
              <Button
                color="primary"
                variant="contained"
                size="large"
                className={classes.button}
                onClick={() => handleDetectorResponse("saint")}
              >
                Saint
              </Button>
              <Button
                color="secondary"
                variant="contained"
                size="large"
                className={classes.button}
                onClick={() => handleDetectorResponse("sinner")}
              >
                Sinner
              </Button>
            </div>
          </div>
        )}
      </div>
      <div className={classes.message}>
        <div
          className={classes.imageSrc}
          style={{
            backgroundImage: `url(${topicImage.url})`
          }}
        />
        <div className={classes.imageBackdrop} />
        <div
          className={
            isDetector
              ? classes.messageHistory
              : classes.messageHistorySpeakerRole
          }
        >
          {messages.length === 0 ? (
            <div className={classes.messageEmpty}>
              Currently there are no messages
            </div>
          ) : (
            messages.map(({ id, sender_id, message, created_at }) => {
              const isAuthor = sender_id === user.id;
              return isAuthor ? (
                <div key={id} className={classes.incomingMessage}>
                  <div className={classes.incomingMessageImage}>
                    <PersonOutlineIcon className={classes.icon} />
                  </div>
                  <div className={classes.receivedMsg}>
                    <div className={classes.receivedMsgWithdMsg}>
                      <div>{message}</div>
                      <span className={classes.timeDate}>
                        {moment(created_at).fromNow()}
                      </span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className={classes.outgoingMessage}>
                  <div className={classes.sentMessage}>
                    <div>{message}</div>
                    <span className={classes.timeDate}>
                      {moment(created_at).fromNow()}
                    </span>
                  </div>
                </div>
              );
            })
          )}
        </div>
        <form onSubmit={handleSubmit} className={classes.inputMessageWrite}>
          <input
            type="text"
            className={classes.writeMessage}
            placeholder="Type a message"
            value={message}
            onChange={e => setMessage(e.target.value)}
            autoFocus
          />
          <button className={classes.messageSendButton} type="submit">
            <SendIcon />
          </button>
        </form>
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    game: chatSelectors.getGame(state),
    room: chatSelectors.getRoom(state),
    user: sessionSelectors.getUser(state)
  };
};

const actionCreators = {
  sendMessage: chatActions.sendMessage,
  startGame: chatActions.startGame
};

export default compose(
  connect(
    mapStateToProps,
    actionCreators
  ),
  withStyles(styles)
)(MessageContainer);
