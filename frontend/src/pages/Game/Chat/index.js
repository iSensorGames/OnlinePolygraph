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
import ChatSetup from './ChatSetup';

// Icons
import SendIcon from '@material-ui/icons/Send';

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
  message: {
    padding: 0,
    width: '100%',
  },
  messageHistory: {
    height: 'calc(100% - 98px)',
    overflowY: 'auto',
    padding: '30px 20px 0px',
  },
  incomingMessageImage: {
    display: 'inline-block',
    width: '6%',
  },
  receivedMsg: {
    display: 'inline-block',
    padding: '0 0 0 10px',
    verticalAlign: 'top',
    width: '92%',
  },
  receivedMsgWithdMsg: {
    background: '#ebebeb none repeat scroll 0 0',
    borderRadius: 3,
    color: '#646464',
    fontSize: 14,
    margin: 0,
    padding: '5px 10px 5px 12px',
    width: '100%',
  },
  timeDate: {
    color: '#747474',
    display: 'block',
    fontSize: 12,
    margin: '8px 0 0',
  },
  outgoingMessage: {
    overflow: 'hidden',
    margin: '26px 0 26px',
  },
  sentMessage: {
    float: 'right',
    width: '46%',
  },
  typeMessage: {
    marginLeft: 5,
    marginRight: 5,
  },
  inputMessageWrite: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    position: 'relative',
    paddingRight: 20,
    paddingLeft: 20,
    background: 'white',
    '& input': {
      background: 'rgba(0, 0, 0, 0) none repeat scroll 0 0',
      border: 'medium none',
      color: '#4c4c4c',
      fontSize: 15,
      minHeight: 48,
      width: '100%',
    },
  },
  writeMessage: {
    '&:focus': {
      outline: 'none',
    },
  },
  messageSendButton: {
    background: '#05728f none repeat scroll 0 0',
    border: 'medium none',
    borderRadius: '50%',
    color: '#fff',
    cursor: 'pointer',
    fontSize: 17,
    height: 33,
    width: 33,
  },
  link: {
    cursor: 'pointer',
  },
});

const messages = [
  {
    id: 1,
    type: 'incoming',
    src: 'https://ptetutorials.com/images/user-profile.png',
    message: 'Test which is a new approach to have all solutions',
    created_at: '11:01 AM | June 9',
  },
  {
    id: 2,
    type: 'outgoing',
    message: 'Test which is a new approach to have all solutions',
    created_at: '11:01 AM | June 9',
  },
  {
    id: 3,
    type: 'incoming',
    src: 'https://ptetutorials.com/images/user-profile.png',
    message: 'Test which is a new approach to have',
    created_at: '11:01 AM | Yesterday',
  },
  {
    id: 4,
    type: 'outgoing',
    message: 'Apollo University, Delhi, India Test',
    created_at: '11:01 AM | Today',
  },
  {
    id: 5,
    type: 'incoming',
    src: 'https://ptetutorials.com/images/user-profile.png',
    message:
      'We work directly with our designers and suppliers, and sell direct to you, which means quality, exclusive products, at a price anyone can afford.',
    created_at: '11:01 AM | Today',
  },
];

const Chat = ({
  classes,
  setRoom,
  activeRoomId,
  userId,
  rooms,
  joinRoom,
  setChatSetupTab,
  isGameSetupComplete,
}) => {
  const ChatMessageContainer = () => {
    return (
      <div className={classes.message}>
        <div className={classes.messageHistory}>
          {messages.map(({ id, type, src, message, created_at }) => {
            const isIncoming = type === 'incoming';
            return isIncoming ? (
              <div key={id} className={classes.incomingMessage}>
                <div className={classes.incomingMessageImage}>
                  <img src={src} alt="sunil" />
                </div>
                <div className={classes.receivedMsg}>
                  <div className={classes.receivedMsgWithdMsg}>
                    <p>{message}</p>
                    <span className={classes.timeDate}>{created_at}</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className={classes.outgoingMessage}>
                <div className={classes.sentMessage}>
                  <p>{message}</p>
                  <span className={classes.timeDate}> {created_at}</span>
                </div>
              </div>
            );
          })}
        </div>
        <div className={classes.typeMessage}>
          <div className={classes.inputMessageWrite}>
            <input
              type="text"
              className={classes.writeMessage}
              placeholder="Type a message"
            />
            <button className={classes.messageSendButton} type="button">
              <SendIcon />
            </button>
          </div>
        </div>
      </div>
    );
  };

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
                        onClick={() => handleRoomSelect(id)}
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
          {isGameSetupComplete ? <ChatMessageContainer /> : <ChatSetup />}
        </div>
      </div>
    </ChatLayout>
  );
};

const mapStateToProps = state => {
  return {
    isGameSetupComplete: chatSelectors.getIsGameSetupComplete(state),
    rooms: chatSelectors.getAvailableRooms(state),
    activeRoomId: chatSelectors.getRoom(state).id,
    userId: sessionSelectors.getUserId(state),
  };
};

const actionCreators = {
  createRoom: chatActions.createRoom,
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
)(Chat);
