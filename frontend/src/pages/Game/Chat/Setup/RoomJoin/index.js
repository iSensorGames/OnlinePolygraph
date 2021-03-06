import React from 'react';
import { compose } from 'recompose';
import { connect } from 'react-redux';

// Component
import List from '@material-ui/core/List';
import ListSubheader from '@material-ui/core/ListSubheader';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';

// Icons
import SendIcon from '@material-ui/icons/Send';
import ImageIcon from '@material-ui/icons/Image';
import WorkIcon from '@material-ui/icons/Work';
import BeachAccessIcon from '@material-ui/icons/BeachAccess';

// Actions
import * as chatActions from '../../../../../actions/chat';

// Selectors
import * as chatSelectors from '../../../../../reducers/chat';
import * as socketSelectors from '../../../../../reducers/socket';

// Styles
import { withStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
    color: 'black',
    marginBottom: 20,
  },
  container: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    justifyContent: 'center',
  },
  textMessage: {
    marginBottom: 20,
  },
  button: {
    minWidth: 200,
  },
  bottomText: {
    marginTop: 20,
    color: 'var(--white)',
  },
});

const RoomJoin = ({ classes, room, onlineUsers }) => {
  const { id, creatorId, topic, name } = room;

  const roomAuthor = onlineUsers.filter(onlineUser => {
    return onlineUser.id === creatorId;
  })[0];

  return (
    <div className={classes.container}>
      <List className={classes.root}>
        <ListSubheader component="div" id="nested-list-subheader">
          Room Join
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
              <SendIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText
            primary={`Opponent`}
            secondary={`${roomAuthor.firstName} ${roomAuthor.lastName}`}
          />
        </ListItem>
      </List>
      <Typography className={classes.bottomText} variant="h5">
        Waiting the game to start...
      </Typography>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    room: chatSelectors.getRoom(state),
    onlineUsers: socketSelectors.getOnlineUsers(state),
  };
};

export default compose(
  withStyles(styles),
  connect(
    mapStateToProps,
    null
  )
)(RoomJoin);
