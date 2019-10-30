import React from "react";
import { compose } from "recompose";

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
// Mock Data
const users = [
  {
    id: 1,
    userName: "John Doe",
    isOnline: true
  },
  {
    id: 2,
    userName: "Ben Smith",
    isOnline: false
  },
  {
    id: 3,
    userName: "Carol Park",
    isOnline: false
  },
  {
    id: 4,
    userName: "Alice Ventura",
    isOnline: true
  }
];

const User = ({ classes, userName, isOnline }) => (
  <ListItem className={classes.listItem} divider>
    <ListItemAvatar>
      <Avatar>
        <ImageIcon />
      </Avatar>
    </ListItemAvatar>
    <ListItemText className={classes.listItemMiddle} primary={userName} />
    <ListItemText
      className={clsx(classes.listItemRight, classes.isOnline)}
      primary={isOnline ? "Online" : ""}
    />
  </ListItem>
);

const OpponentSelection = ({ classes }) => {
  return (
    <BaseLayout backgroundClassName={classes.background}>
      <Typography align="center" color="inherit" variant="h5">
        Choose opponent
      </Typography>
      <List className={classes.root}>
        {users &&
          users.map(({ id, userName, isOnline }) => (
            <User
              key={id}
              classes={classes}
              userName={userName}
              isOnline={isOnline}
            />
          ))}
      </List>
    </BaseLayout>
  );
};

export default compose(withStyles(styles))(OpponentSelection);
