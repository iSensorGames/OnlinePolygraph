import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { compose } from "recompose";

// Utility function
import * as utils from "../../../../../utils";

// Constants
import * as ROLES from "../../../../../modules/constants/roles";

// Components
import Button from "../../../../../modules/components/Button";
import Typography from "../../../../../modules/components/Typography";

// Data
import questionItems from "./data";

// Actions
import * as chatActions from "../../../../../actions/chat";

// Selecter
import * as chatSelectors from "../../../../../reducers/chat";

// Assets
import topicImages from "../../../../../modules/constants/topicImages";

// Styles
import { withStyles } from "@material-ui/core/styles";
const styles = theme => ({
  container: {
    alignItems: "center",
    display: "flex",
    flexDirection: "column",
    flex: 1,
    justifyContent: "center",
    paddingRight: 20,
    paddingLeft: 20,
    position: "relative",
    alignItems: "center",
    textAlign: "center",
    width: "100%"
  },
  inputMsgWrite: {
    alignItems: "center",
    display: "flex",
    flexDirection: "row",
    position: "relative",
    paddingRight: 20,
    paddingLeft: 20,
    background: "white"
  },
  writeMsg: {
    "&:focus": {
      outline: "none"
    }
  },
  button: {
    minWidth: 200
  },
  innerRoleExplanation: {
    marginTop: 20,
    marginBottom: 10
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
  textTitle: {
    color: "var(--realspiel-green)",
    fontSize: 22,
    fontWeight: "bold",
    zIndex: 1
  },
  questionTitle: {
    color: "var(--realspiel-green)",
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 30,
    zIndex: 1
  },
  textDescription: {
    color: "var(--realspiel-green)",
    fontSize: 16,
    zIndex: 1
  },
  buttonsContainer: {
    marginTop: 10,
    maxWidth: 500,
    textAlign: "center"
  },
  footerContainer: {
    alignItems: "center",
    display: "flex",
    height: 150,
    justifyContent: "center"
  }
});

const GroundTruth = ({
  classes,
  game,
  room,
  setGame,
  setReady,
  setGameReadyToPlay
}) => {
  const [question, setQuestion] = useState(null);

  const {
    gameRound,
    outerRole,
    innerRole,
    readyToPlay,
    readyToPlayConfirmByOpponent,
    groundTruth
  } = game;
  const { topic } = room;

  useEffect(() => {
    if (topic) {
      const groundTruthTopic = questionItems.filter(questionItem => {
        return questionItem.topic === topic;
      })[0];
      setQuestion(
        groundTruthTopic.questions[
          utils.randomize(groundTruthTopic.questions.length)
        ]
      );
    }
  }, []);

  const QuestionRenderer = () => {
    return (
      <Typography variant="h4" className={classes.questionTitle}>
        {question}
      </Typography>
    );
  };

  const handleGroundTruthSelect = userAnswer => {
    setGame({ groundTruth: userAnswer, gameRound, question });
  };

  const handleConfirm = () => {
    setReady({
      readyToPlay: true,
      tab: readyToPlayConfirmByOpponent ? "messenger" : "ground-truth"
    });
    setGameReadyToPlay();
  };

  const confirmMessage = !readyToPlay
    ? "Got it. Start the game."
    : !readyToPlayConfirmByOpponent
    ? "Waiting opponent..."
    : "Ready";

  const isDetector =
    ROLES.OUTER_ROLE[outerRole] && ROLES.OUTER_ROLE[outerRole].ID === 1;

  const topicImage = topicImages.filter(image => image.title === topic)[0];

  return (
    <div className={classes.container}>
      <div
        className={classes.imageSrc}
        style={{
          backgroundImage: `url(${topicImage.url})`
        }}
      />
      <div className={classes.imageBackdrop} />
      {isDetector ? (
        <React.Fragment>
          <Typography variant="h6" className={classes.textTitle}>
            {`Round ${gameRound}. Your have been assigned with the ${ROLES.INNER_ROLE[innerRole].NAME} role.`}
          </Typography>
          <Typography variant="h6" className={classes.textDescription}>
            {`The topic is: ${topic}`}
          </Typography>
          <Typography variant="h6" className={classes.textDescription}>
            {`${ROLES.INNER_ROLE[innerRole] &&
              ROLES.INNER_ROLE[innerRole].DESCRIPTION2}`}
          </Typography>
        </React.Fragment>
      ) : (
        <React.Fragment>
          {!groundTruth ? (
            <React.Fragment>
              <Typography variant="h6" className={classes.textTitle}>
                {`Round ${gameRound}. Answer truthfully!`}
              </Typography>
              <Typography variant="h6" className={classes.textDescription}>
                {`The topic is: ${topic}`}
              </Typography>
              <QuestionRenderer />
              <div className={classes.buttonsContainer}>
                <Button
                  color="primary"
                  variant="contained"
                  size="large"
                  className={classes.button}
                  onClick={() => handleGroundTruthSelect("yes")}
                >
                  Yes
                </Button>
                <Button
                  color="secondary"
                  variant="contained"
                  size="large"
                  className={classes.button}
                  onClick={() => handleGroundTruthSelect("no")}
                >
                  No
                </Button>
              </div>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <Typography variant="h6" className={classes.textTitle}>
                {`Round ${gameRound}. Your have been assigned with the ${ROLES.INNER_ROLE[innerRole].NAME} role.`}
              </Typography>
              <Typography variant="h6" className={classes.textDescription}>
                {`The topic is: ${topic}`}
              </Typography>
              <Typography variant="h6" className={classes.textDescription}>
                {`${ROLES.INNER_ROLE[innerRole] &&
                  ROLES.INNER_ROLE[innerRole].DESCRIPTION2}`}
              </Typography>
            </React.Fragment>
          )}
        </React.Fragment>
      )}
      <div className={classes.footerContainer}>
        {isDetector ? (
          <Button
            color="secondary"
            variant="contained"
            size="large"
            className={classes.button}
            onClick={() => handleConfirm()}
            disabled={readyToPlay}
          >
            {confirmMessage}
          </Button>
        ) : (
          groundTruth && (
            <Button
              color="secondary"
              variant="contained"
              size="large"
              className={classes.button}
              onClick={() => handleConfirm()}
              disabled={!groundTruth}
            >
              {confirmMessage}
            </Button>
          )
        )}
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    room: chatSelectors.getRoom(state),
    game: chatSelectors.getGame(state)
  };
};

const actionCreators = {
  setGame: chatActions.setGame,
  setReady: chatActions.setReady,
  setGameReadyToPlay: chatActions.setGameReadyToPlay
};

export default compose(
  withStyles(styles),
  connect(
    mapStateToProps,
    actionCreators
  )
)(GroundTruth);
