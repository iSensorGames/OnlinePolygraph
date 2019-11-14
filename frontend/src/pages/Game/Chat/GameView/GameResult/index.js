import React from "react";
import { compose } from "recompose";
import { connect } from "react-redux";

// Selectors
import * as chatSelectors from "../../../../../reducers/chat";

// Actions
import * as chatActions from "../../../../../actions/chat";

// Contants
import topicImages from "../../../../../modules/constants/topicImages";

// Styles
import { withStyles } from "@material-ui/core/styles";
const styles = theme => ({
  container: {
    alignItems: "center",
    display: "flex",
    justifyContent: "center",
    position: "relative"
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
  }
});

const GameResult = ({ classes, game, room }) => {
  const { topic } = room;
  const topicImage = topicImages.filter(image => image.title === topic)[0];

  console.log("game", game);

  return (
    <div className={classes.container}>
      <div
        className={classes.imageSrc}
        style={{
          backgroundImage: `url(${topicImage.url})`
        }}
      />
      <div className={classes.imageBackdrop} />
    </div>
  );
};

const mapStateToProps = state => {
  return {
    game: chatSelectors.getGame(state),
    room: chatSelectors.getRoom(state)
  };
};

export default compose(
  withStyles(styles),
  connect(mapStateToProps, null)
)(GameResult);
