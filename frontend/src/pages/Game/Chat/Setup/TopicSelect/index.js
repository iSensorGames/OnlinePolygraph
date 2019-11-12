import React from "react";
import { compose } from "recompose";
import { connect } from "react-redux";

// Actions
import * as chatActions from "../../../../../actions/chat";

// Component
import Typography from "../../../../../modules/components/Typography";
import ButtonBase from "@material-ui/core/ButtonBase";

// Assets
import images from "../../../../../modules/constants/topicImages";

// Styles
import { withStyles } from "@material-ui/core/styles";
const styles = theme => ({
  container: {
    alignItems: "center",
    display: "flex",
    flexDirection: "column",
    flex: 1,
    justifyContent: "center",
    height: "100%",
    width: "100%",
    overflowY: "auto"
  },
  images: {
    display: "flex",
    flexWrap: "wrap",
    width: "100%",
    height: "100%"
  },
  imageWrapper: {
    position: "relative",
    display: "block",
    padding: 0,
    borderRadius: 0,
    [theme.breakpoints.down("sm")]: {
      width: "100% !important",
      height: 100
    },
    "&:hover": {
      zIndex: 1
    },
    "&:hover $imageBackdrop": {
      opacity: 0.15
    },
    "&:hover $imageMarked": {
      opacity: 0
    },
    "&:hover $imageTitle": {
      border: "4px solid currentColor"
    }
  },
  imageButton: {
    cursor: "pointer",
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: theme.palette.common.white
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
  imageTitle: {
    position: "relative",
    padding: `${theme.spacing(2)}px ${theme.spacing(4)}px 14px`
  },
  imageMarked: {
    height: 3,
    width: 18,
    background: theme.palette.common.white,
    position: "absolute",
    bottom: -2,
    left: "calc(50% - 9px)",
    transition: theme.transitions.create("opacity")
  }
});

const TopicSelect = ({ classes, setRoom, setChatSetupTab, createRoom }) => {
  const handleTopicSelect = async selectedTopic => {
    createRoom(selectedTopic).then(() => {
      setChatSetupTab("ready");
      setRoom({ topic: selectedTopic });
    });
  };

  return (
    <div className={classes.container}>
      <div className={classes.images}>
        {images.map(image => (
          <ButtonBase
            key={image.title}
            className={classes.imageWrapper}
            onClick={() => handleTopicSelect(image.title)}
            style={{
              width: image.width
            }}
          >
            <div
              className={classes.imageSrc}
              style={{
                backgroundImage: `url(${image.url})`
              }}
            />
            <div className={classes.imageBackdrop} />
            <div className={classes.imageButton}>
              <Typography
                component="h3"
                variant="h6"
                color="inherit"
                className={classes.imageTitle}
              >
                {image.title}
                <div className={classes.imageMarked} />
              </Typography>
            </div>
          </ButtonBase>
        ))}
      </div>
    </div>
  );
};

const actionCreators = {
  setChatSetupTab: chatActions.setChatSetupTab,
  setRoom: chatActions.setRoom,
  createRoom: chatActions.createRoom
};

export default compose(
  withStyles(styles),
  connect(
    null,
    actionCreators
  )
)(TopicSelect);
