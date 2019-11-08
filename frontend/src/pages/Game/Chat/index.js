import React from 'react';
import { connect } from 'react-redux';

// Selectors
import * as chatSelectors from '../../../reducers/chat';
import * as sessionSelectors from '../../../reducers/session';

// Actions
import * as chatActions from '../../../actions/chat';

// Components
import moment from 'moment';
import { compose } from 'recompose';

// View
import ChatSetup from './Setup';
import GroundTruth from './Setup/GroundTruth';

// Layout
import ChatLayout from '../../../layout/Chat';

// Styles
import { withStyles } from '@material-ui/core/styles';
import clsx from 'clsx';

const styles = () => ({
  messaging: {
    height: '100%',
    width: '100%',
  },
  inboxMsg: {
    display: 'flex',
    flexDirection: 'row',
    height: '100%',
  },
  inboxPeople: {
    background: '#f8f8f8 none repeat scroll 0 0',
    height: '100%',
    width: '30%',
    borderRight: '1px solid #c4c4c4',
  },
  headingSearch: {
    alignItems: 'center',
    display: 'flex',
    padding: '10px 29px 10px 20px',
    overflow: 'hidden',
    borderBottom: '1px solid #c4c4c4',
  },
  recentHeading: {
    color: '#05728f',
    fontSize: 21,
    margin: 'auto',
    '& h4': {
      color: '#05728f',
      fontSize: 21,
      margin: 'auto',
    },
  },
  inboxChat: {
    height: '100%',
    overflowY: 'auto',
  },
  chatList: {
    borderBottom: '1px solid #c4c4c4',
    margin: 0,
    padding: '18px 16px 10px',
    '&:hover': {
      background: '#b8b8b8',
      cursor: 'pointer',
    },
  },
  activeChat: {
    background: '#b8b8b8',
  },
  chatPeople: {
    display: 'flex',
    flexDirection: 'column',
  },
  chat: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    fontSize: 15,
    fontWeight: 'bold',
    color: '#464646',
    margin: '0 0 8px 0',
  },
  isAuthor: {
    border: '1px solid',
    padding: '2px 5px',
  },
  chatFooter: {
    color: '#989898',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    fontSize: 14,
  },
  link: {
    cursor: 'pointer',
  },
});

const Chat = ({
  classes,
  setRoom,
  userId,
  room,
  rooms,
  game,
  joinRoom,
  setChatSetupTab,
}) => {
  const activeRoomId = room.id;
  const { isStarted } = game;

  const handleRoomSelect = selectedRoomId => {
    const room = rooms[selectedRoomId];
    if (!!room) {
      const { id, creator_id, topic, name, created_at } = room;

      setRoom({
        id,
        creatorId: creator_id,
        topic,
        name,
        createdAt: created_at,
      });

      setChatSetupTab('room-join');
      joinRoom(id);
    }
  };

  return (
    <ChatLayout>
      <div className={classes.messaging}>
        <div className={classes.inboxMsg}>
          <div className={classes.inboxPeople}>
            <div className={classes.headingSearch}>
              <div className={classes.recentHeading}>
                <h4>Join a Game</h4>
              </div>
            </div>
            <div className={classes.inboxChat}>
              {rooms
                ? Object.keys(rooms).map(id => {
                    const isAuthor = rooms[id].creator_id === userId;
                    const isActiveRoom = rooms[id].id === activeRoomId;

                    return (
                      <div
                        key={id}
                        className={clsx(
                          classes.chatList,
                          isActiveRoom && classes.activeChat
                        )}
                        onClick={() => !isAuthor && handleRoomSelect(id)}
                      >
                        <div className={classes.chatPeople}>
                          <div className={classes.chat}>
                            <div>{`${rooms[id].name}`}</div>
                            {isAuthor ? (
                              <div className={classes.isAuthor}>Author</div>
                            ) : null}
                          </div>
                          <div className={classes.chatFooter}>
                            <div>{`${rooms[id].topic}`}</div>
                            <div>{`${moment(
                              rooms[id].created_at
                            ).fromNow()}`}</div>
                          </div>
                        </div>
                      </div>
                    );
                  })
                : null}
            </div>
          </div>
          {isStarted ? <GroundTruth /> : <ChatSetup />}
        </div>
      </div>
    </ChatLayout>
  );
};

const mapStateToProps = state => {
  return {
    game: chatSelectors.getGame(state),
    room: chatSelectors.getRoom(state),
    rooms: chatSelectors.getAvailableRooms(state),
    userId: sessionSelectors.getUserId(state),
  };
};

const actionCreators = {
  createRoom: chatActions.createRoom,
  setRoom: chatActions.setRoom,
  setChatSetupTab: chatActions.setChatSetupTab,
  joinRoom: chatActions.joinRoom,
  leaveRoom: chatActions.leaveRoom,
};

export default compose(
  withStyles(styles),
  connect(
    mapStateToProps,
    actionCreators
  )
)(Chat);
