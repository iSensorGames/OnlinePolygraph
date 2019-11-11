import React from 'react';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import moment from 'moment';

// Selectors
import * as chatSelectors from '../../../../reducers/chat';

// Actions
import * as chatActions from '../../../../actions/chat';

// Styles
import clsx from 'clsx';
import { withStyles } from '@material-ui/core/styles';
const styles = theme => ({
  inboxPeople: {
    background: '#f8f8f8 none repeat scroll 0 0',
    borderRight: '1px solid #c4c4c4',
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    width: '100%',
  },
  headingSearch: {
    alignItems: 'center',
    background: 'yellow',
    color: 'var(--gray-dark)',
    display: 'flex',
    fontSize: 14,
    height: 38,
    padding: '0px 35px',
    overflow: 'hidden',
    borderBottom: '1px solid #c4c4c4',
  },
  inboxChat: {
    flex: 1,
    height: '100%',
    overflowY: 'auto',
  },
  body: {
    color: 'var(--gray)',
  },
  inboxNoChat: {
    alignItems: 'center',
    color: 'var(--gray-dark)',
    display: 'flex',
    flex: 1,
    height: '100%',
    justifyContent: 'center',
    marginTop: -35,
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
  fullRoomChat: {
    background: 'var(--yellow)',
    '&:hover': {
      cursor: 'default',
      background: 'var(--yellow)',
    },
  },
  chatPeople: {
    display: 'flex',
    flexDirection: 'column',
  },
  chat: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    fontSize: 14,
    fontWeight: 'bold',
    color: '#464646',
    margin: '0 0 8px 0',
  },
  isAuthor: {
    border: '1px solid',
    padding: '2px 5px',
  },
  chatFooter: {
    color: 'var(--gray)',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    fontSize: 12,
  },
});

const RoomMenu = ({
  classes,
  setRoom,
  userId,
  room,
  rooms,
  joinRoom,
  fullMenuWidth,
  setChatSetupTab,
}) => {
  console.log('RoomMenu rooms', rooms);

  const activeRoomId = room.id;

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
    <div
      className={clsx(classes.inboxPeople, {
        width: !fullMenuWidth && '30%',
      })}
    >
      <div className={classes.headingSearch}>Join a Game</div>
      <div className={classes.inboxChat}>
        {rooms && rooms.length === 0 ? (
          <div className={classes.inboxNoChat}>No room(s) available</div>
        ) : (
          Object.keys(rooms).map(id => {
            const { created_at, creator_id, length, name, topic } = rooms[id];
            const isAuthor = created_at === userId;
            const isActiveRoom = id === activeRoomId;
            const isRoomFull = length >= 2;

            if (length === 0) {
              return null;
            }

            return (
              <div
                key={id}
                className={clsx(
                  classes.chatList,
                  isActiveRoom && classes.activeChat,
                  isRoomFull && classes.fullRoomChat
                )}
                onClick={() => !isAuthor && !isRoomFull && handleRoomSelect(id)}
              >
                <div className={classes.chatPeople}>
                  <div className={classes.chat}>
                    <div>{`${name}`}</div>
                    {isAuthor ? (
                      <div className={classes.isAuthor}>Author</div>
                    ) : null}
                  </div>
                  <div className={classes.body}>
                    {isRoomFull ? (
                      <div>{`Room is full. Ongoing game...`}</div>
                    ) : (
                      <div>{`Waiting for an opponent...`}</div>
                    )}
                  </div>
                  <div className={classes.chatFooter}>
                    <div>{`${topic}`}</div>
                    <div>{`${moment(created_at).fromNow()}`}</div>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    room: chatSelectors.getRoom(state),
    rooms: chatSelectors.getAvailableRooms(state),
  };
};

const actionCreators = {
  setRoom: chatActions.setRoom,
  setChatSetupTab: chatActions.setChatSetupTab,
  joinRoom: chatActions.joinRoom,
};

export default compose(
  withStyles(styles),
  connect(
    mapStateToProps,
    actionCreators
  )
)(RoomMenu);
