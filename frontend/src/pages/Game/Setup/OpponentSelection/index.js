import React from "react";
import { connect } from "react-redux";
import { compose } from "recompose";

// Selectors
import * as sessionSelectors from "../../../../reducers/session";

// Component
import Typography from "../../../../modules/components/Typography";
import clsx from "clsx";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import ImageIcon from "@material-ui/icons/Image";

// Layout
import BaseLayout from "../../../../layout/Base";

// Styles
import { withStyles } from "@material-ui/core/styles";
const styles = theme => ({
  background: {
    backgroundColor: "#43CEEB", // Average color of the background image.
    backgroundPosition: "center"
  },
  root: {
    backgroundColor: theme.palette.background.paper,
    marginTop: theme.spacing(2),
    maxWidth: 360,
    padding: 0,
    width: "100%"
  },
  listItem: {
    color: "var(--gray-dark)",
    justifyContent: "space-between"
  },
  listItemMiddle: {
    flex: "4 1"
  },
  listItemRight: {
    flex: "1 1"
  },
  isOnline: {
    color: "#86bb71"
  }
});

const User = ({ classes, firstName, lastName, email, isOnline }) => (
  <ListItem className={classes.listItem} button divider>
    <ListItemAvatar>
      <Avatar>
        <ImageIcon />
      </Avatar>
    </ListItemAvatar>
    <ListItemText
      className={classes.listItemMiddle}
      primary={`${firstName} ${lastName}`}
      secondary={`${email}`}
    />
    <ListItemText
      className={clsx(classes.listItemRight, classes.isOnline)}
      primary={isOnline ? "Online" : ""}
    />
  </ListItem>
);

const OpponentSelection = ({ onlineUsers, classes }) => {
  return (
    <BaseLayout backgroundClassName={classes.background}>
      <Typography align="center" color="inherit" variant="h5">
        Choose opponent
      </Typography>
      <List className={classes.root}>
        {onlineUsers &&
          onlineUsers.map(({ id, firstName, lastName, email }) => (
            <User
              key={id}
              classes={classes}
              firstName={firstName}
              lastName={lastName}
              email={email}
              isOnline={true}
            />
          ))}
      </List>
    </BaseLayout>
  );
};

const mapStateToProps = state => {
  return {
    onlineUsers: sessionSelectors.getOnlineUsers(state)
  };
};

const actionCreators = {};

export default compose(
  withStyles(styles),
  connect(
    mapStateToProps,
    actionCreators
  )
)(OpponentSelection);
