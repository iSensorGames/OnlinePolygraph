import React from "react";
import { compose } from "recompose";
import { connect } from "react-redux";

// Component
import Button from "../../../../../modules/components/Button";
import List from "@material-ui/core/List";
import ListSubheader from "@material-ui/core/ListSubheader";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import ImageIcon from "@material-ui/icons/Image";
import WorkIcon from "@material-ui/icons/Work";
import BeachAccessIcon from "@material-ui/icons/BeachAccess";

// Actions
import * as chatActions from "../../../../../actions/chat";

// Selectors
import * as chatSelectors from "../../../../../reducers/chat";

// Styles
import { withStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
const styles = theme => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
    color: "black",
    marginBottom: 20
  },
  container: {
    alignItems: "center",
    display: "flex",
    flexDirection: "column",
    flex: 1,
    justifyContent: "center"
  },
  textMessage: {
    marginBottom: 20
  },
  button: {
    minWidth: 200
  }
});

const Ready = ({ classes, room, startGame }) => {
  const { id, topic, name, opponent } = room;
  return (
    <div className={classes.container}>
      <List className={classes.root}>
        <ListSubheader component="div" id="nested-list-subheader">
          READY
        </ListSubheader>
        <ListItem>
          <ListItemAvatar>
            <Avatar>
              <ImageIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary={`Topic:`} secondary={`${topic}`} />
        </ListItem>
        <ListItem>
          <ListItemAvatar>
            <Avatar>
              <WorkIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary={`Room ID`} secondary={`${id}`} />
        </ListItem>
        <ListItem>
          <ListItemAvatar>
            <Avatar>
              <BeachAccessIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary={`Room Name:`} secondary={`${name}`} />
        </ListItem>
        <ListItem>
          <ListItemAvatar>
            <Avatar>
              <BeachAccessIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText
            primary={`Opponent`}
            secondary={
              opponent
                ? `${opponent.firstName} is connected`
                : `Waiting for your opponent to connect...`
            }
          />
        </ListItem>
      </List>
      <Typography
        variant="h4"
        color="primaryText"
        className={classes.textMessage}
      ></Typography>
      <Button
        color="primary"
        variant="contained"
        size="large"
        className={classes.button}
        onClick={() => startGame()}
        disabled={!!!opponent}
      >
        Start Game
      </Button>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    room: chatSelectors.getRoom(state)
  };
};

const actionCreators = {
  startGame: chatActions.startGame
};

export default compose(
  withStyles(styles),
  connect(
    mapStateToProps,
    actionCreators
  )
)(Ready);
