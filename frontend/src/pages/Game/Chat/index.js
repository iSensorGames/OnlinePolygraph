import React from "react";
import { connect } from "react-redux";

// Styles
import "./chat.css";

// Selectors
import * as chatSelectors from "../../../reducers/chat";

// Actions
import * as chatActions from "../../../actions/chat";

// Components
import { compose } from "recompose";
import { withStyles } from "@material-ui/core/styles";

// View
import RoomCreate from "./RoomCreate";

// Icons
import SendIcon from "@material-ui/icons/Send";

// Layout
import ChatLayout from "../../../layout/Chat";

const styles = () => ({
  link: {
    cursor: "pointer"
  }
});

const chats = [
  {
    id: 1,
    src: "https://ptetutorials.com/images/user-profile.png",
    firstName: "Sunil",
    lastName: "Rajput",
    createdAt: "Dec 25",
    lastMessage:
      "Test, which is a new approach to have all solutions astrology under one roof."
  }
];

const messages = [
  {
    id: 1,
    type: "incoming",
    src: "https://ptetutorials.com/images/user-profile.png",
    message: "Test which is a new approach to have all solutions",
    created_at: "11:01 AM | June 9"
  },
  {
    id: 2,
    type: "outgoing",
    message: "Test which is a new approach to have all solutions",
    created_at: "11:01 AM | June 9"
  },
  {
    id: 3,
    type: "incoming",
    src: "https://ptetutorials.com/images/user-profile.png",
    message: "Test which is a new approach to have",
    created_at: "11:01 AM | Yesterday"
  },
  {
    id: 4,
    type: "outgoing",
    message: "Apollo University, Delhi, India Test",
    created_at: "11:01 AM | Today"
  },
  {
    id: 5,
    type: "incoming",
    src: "https://ptetutorials.com/images/user-profile.png",
    message:
      "We work directly with our designers and suppliers, and sell direct to you, which means quality, exclusive products, at a price anyone can afford.",
    created_at: "11:01 AM | Today"
  }
];

const ChatMessageContainer = () => {
  return (
    <div class="mesgs">
      <div class="msg_history">
        {messages.map(({ id, type, src, message, created_at }) => {
          const isIncoming = type === "incoming";
          return isIncoming ? (
            <div key={id} class="incoming_msg">
              <div class="incoming_msg_img">
                <img src={src} alt="sunil" />
              </div>
              <div class="received_msg">
                <div class="received_withd_msg">
                  <p>{message}</p>
                  <span class="time_date">{created_at}</span>
                </div>
              </div>
            </div>
          ) : (
            <div class="outgoing_msg">
              <div class="sent_msg">
                <p>{message}</p>
                <span class="time_date"> {created_at}</span>
              </div>
            </div>
          );
        })}
      </div>
      <div class="type_msg">
        <div class="input_msg_write">
          <input type="text" class="write_msg" placeholder="Type a message" />
          <button class="msg_send_btn" type="button">
            <SendIcon />
          </button>
        </div>
      </div>
    </div>
  );
};

const Chat = ({ roomId }) => {
  return (
    <ChatLayout>
      <div class="messaging">
        <div class="inbox_msg">
          <div class="inbox_people">
            <div class="headind_srch">
              <div class="recent_heading">
                <h4>History</h4>
              </div>
            </div>
            <div class="inbox_chat">
              <div class="chat_list active_chat">
                <div class="chat_people">
                  <div class="chat_img">
                    {" "}
                    <img
                      src="https://ptetutorials.com/images/user-profile.png"
                      alt="sunil"
                    />{" "}
                  </div>
                  <div class="chat_ib">
                    <h5>
                      Sunil Rajput <span class="chat_date">Dec 25</span>
                    </h5>
                    <p>
                      Test, which is a new approach to have all solutions
                      astrology under one roof.
                    </p>
                  </div>
                </div>
              </div>
              {chats.map(
                ({ id, src, firstName, lastName, createdAt, lastMessage }) => {
                  return (
                    <div key={id} class="chat_list">
                      <div class="chat_people">
                        <div class="chat_img">
                          <img src={src} alt="sunil" />{" "}
                        </div>
                        <div class="chat_ib">
                          <h5>
                            {`${firstName} ${lastName}`}{" "}
                            <span class="chat_date">{createdAt}</span>
                          </h5>
                          <p>{lastMessage}</p>
                        </div>
                      </div>
                    </div>
                  );
                }
              )}
            </div>
          </div>
          {roomId ? <ChatMessageContainer /> : <RoomCreate />}
        </div>
      </div>
    </ChatLayout>
  );
};

const mapStateToProps = state => {
  return {
    roomId: chatSelectors.getRoomId(state)
  };
};

const actionCreators = {
  createRoom: chatActions.createRoom
};

export default compose(
  withStyles(styles),
  connect(
    mapStateToProps,
    actionCreators
  )
)(Chat);
