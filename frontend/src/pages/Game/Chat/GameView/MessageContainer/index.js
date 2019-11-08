import React from 'react';

// Icons
import SendIcon from '@material-ui/icons/Send';

// Styles
import { withStyles } from '@material-ui/core/styles';

const styles = () => ({
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

const MessageContainer = ({ classes }) => {
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

export default withStyles(styles)(MessageContainer);
