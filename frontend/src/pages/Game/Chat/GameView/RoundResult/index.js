import React from "react";
import { compose } from "recompose";
import { connect } from "react-redux";

// Selectors
import * as chatSelectors from "../../../../../reducers/chat";
import * as sessionSelectors from "../../../../../reducers/session";

// Constants
import * as ROLES from "../../../../../modules/constants/roles";

// Actions
import * as chatActions from "../../../../../actions/chat";

// Contants
import topicImages from "../../../../../modules/constants/topicImages";

// Components
import Button from "../../../../../modules/components/Button";
import Typography from "../../../../../modules/components/Typography";

// Styles
import { withStyles } from "@material-ui/core/styles";
const styles = theme => ({
  container: {
    alignItems: "center",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    position: "relative",
    height: "100%",
    width: "100%"
  },
  imageSrc: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundSize: "cover",
    backgroundPosition: "center 40%",
    zIndex: 1
  },
  imageBackdrop: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    background: theme.palette.common.black,
    opacity: 0.5,
    transition: theme.transitions.create("opacity"),
    zIndex: 1
  },
  textTitle: {
    color: "var(--realspiel-green)",
    fontSize: 22,
    zIndex: 1
  },
  textWin: {
    color: "var(--ufo-green)",
    fontWeight: "bold"
  },
  textLose: {
    color: "var(--popstar)",
    fontWeight: "bold"
  },
  textSecondaryTitle: {
    color: "var(--realspiel-green)",
    marginTop: 40,
    marginBottom: 20,
    zIndex: 1
  },
  textQuestion: {
    color: "var(--realspiel-green)",
    fontWeight: "bold",
    fontSize: 20,
    zIndex: 1
  },
  textDescription: {
    color: "var(--realspiel-green)",
    fontSize: 16,
    zIndex: 1
  },
  textDescriptionContent: {
    color: "var(--realspiel-green)",
    fontSize: 16,
    zIndex: 1
  },
  footerContainer: {
    alignItems: "center",
    display: "flex",
    height: 150,
    justifyContent: "center",
    zIndex: 1
  }
});

const RoundResult = ({ classes, game, room, user, startGame, setReady }) => {
  const { creatorId, topic } = room;
  const { id } = user;
  const {
    detectorResponse,
    outerRole,
    innerRole,
    creatorInnerRole,
    creatorOuterRole,
    opponentInnerRole,
    opponentOuterRole,
    question
  } = game;
  const topicImage = topicImages.filter(image => image.title === topic)[0];
  const isDetector = outerRole === 1;
  const formattedDetectorResponse = detectorResponse + 2; // Adding one two match roles constants;
  const isAuthor = creatorId === id;
  console.log("isAuthor", isAuthor);
  console.log("game", game);

  const formattedOpponentRoles = {
    innerRole: isAuthor ? opponentInnerRole : creatorInnerRole,
    outerRole: isAuthor ? opponentOuterRole : creatorOuterRole
  };

  let isWinner = true;
  if (isDetector) {
    isWinner = formattedDetectorResponse === formattedOpponentRoles.innerRole;
  } else {
    isWinner = formattedDetectorResponse !== innerRole;
  }

  const handleConfirm = () => {
    setReady({ tab: "ground-truth" });
    startGame(detectorResponse);
  };

  return (
    <div className={classes.container}>
      <div
        className={classes.imageSrc}
        style={{
          backgroundImage: `url(${topicImage.url})`
        }}
      />
      <div className={classes.imageBackdrop} />
      {
        <React.Fragment>
          <Typography variant="h6" className={classes.textTitle}>
            {isWinner ? (
              <div
                className={classes.textWin}
              >{`Good job. You won this round!`}</div>
            ) : (
              <div
                className={classes.textLose}
              >{`Mm...You lost this round!`}</div>
            )}
          </Typography>
          <Typography variant="h6" className={classes.textSecondaryTitle}>
            {`Round summary:`}
          </Typography>
          <Typography variant="h6" className={classes.textQuestion}>
            {`The target question was: ${question}`}
          </Typography>
          {isDetector ? (
            <React.Fragment>
              <Typography variant="h6" className={classes.textDescription}>
                {`Your guess: `}
                <div className={classes.textDescriptionContent}>
                  {`${ROLES.INNER_ROLE[formattedDetectorResponse].NAME}`}
                </div>
              </Typography>
              <Typography variant="h6" className={classes.textDescription}>
                {`Speaker's inner role: `}
                <div className={classes.textDescriptionContent}>
                  {`${ROLES.INNER_ROLE[formattedOpponentRoles.innerRole].NAME}`}
                </div>
              </Typography>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <Typography variant="h6" className={classes.textDescription}>
                {`Your inner role: `}
                <div className={classes.textDescriptionContent}>
                  {`${ROLES.INNER_ROLE[innerRole].NAME}`}
                </div>
              </Typography>
              <Typography variant="h6" className={classes.textDescription}>
                {`Detector's guess: `}
                <div className={classes.textDescriptionContent}>
                  {`${ROLES.INNER_ROLE[formattedDetectorResponse].NAME}`}
                </div>
              </Typography>
            </React.Fragment>
          )}
          <div className={classes.footerContainer}>
            <Button
              color="secondary"
              variant="contained"
              size="large"
              className={classes.button}
              onClick={() => handleConfirm()}
            >
              {`Start next round.`}
            </Button>
          </div>
        </React.Fragment>
      }
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
  setReady: chatActions.setReady,
  startGame: chatActions.startGame
};

export default compose(
  withStyles(styles),
  connect(mapStateToProps, actionCreators)
)(RoundResult);
