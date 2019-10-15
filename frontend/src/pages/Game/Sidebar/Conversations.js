import React from "react";
import Icon from "react-eva-icons";

// Components
import clsx from "clsx";
import { withStyles } from "@material-ui/core/styles";

// Mock data
import conversations from "./data/conversations";

// Constants
const TYPE = {
  DIRECT: "Direct",
  GROUPS: "Groups"
};

const styles = () => ({
  link: {
    cursor: "pointer"
  },
  hide: {
    display: "none"
  }
});

const ConversationTypeMenuItem = ({ classes, title, isActive, onClick }) => (
  <li
    className={clsx(classes.link, "filter-btn", isActive ? "active" : "")}
    onClick={onClick}
  >
    {title}
  </li>
);

const ConversationList = ({ conversation, classes }) => (
  <li key={conversation.id}>
    <div
      className={clsx(
        "filter direct",
        classes.link,
        !!conversation.isActive ? "active" : ""
      )}
    >
      <div
        className={`status ${!!conversation.isOnline ? "online" : "offline"}`}
      >
        <img src={conversation.img} alt="avatar" />
        <Icon name="radio-button-on" size="medium" />
      </div>
      <div className="content">
        <div className="headline">
          <h5>{conversation.name}</h5>
          <span>{conversation.messageSentDate}</span>
        </div>
        <p>{conversation.lastText}</p>
      </div>
    </div>
  </li>
);

const Conversations = ({ classes, isActive }) => {
  const [type, setType] = React.useState(TYPE.DIRECT);

  return (
    <div
      className={`tab-pane fade${isActive ? " active show" : ""}`}
      role="tabpanel"
    >
      <div className="top">
        <form>
          <input type="search" className="form-control" placeholder="Search" />
          <button type="submit" className="btn prepend">
            <Icon name="search" size="medium" />
          </button>
        </form>
        <ul className="nav" role="tablist">
          <ConversationTypeMenuItem
            classes={classes}
            title={TYPE.DIRECT}
            isActive={type === TYPE.DIRECT}
            onClick={() => setType(TYPE.DIRECT)}
          />
          <ConversationTypeMenuItem
            classes={classes}
            title={TYPE.GROUPS}
            isActive={type === TYPE.GROUPS}
            onClick={() => setType(TYPE.GROUPS)}
          />
        </ul>
      </div>
      <div className="middle">
        <h4>Discussions</h4>
        <button
          type="button"
          className="btn round"
          data-toggle="modal"
          data-target="#compose"
        >
          <Icon name="edit-2" size="medium" />
        </button>
        <hr />
        <ul className="nav discussions" role="tablist">
          {conversations
            ? conversations
                .filter(conversation => {
                  return conversation.type === type.toLowerCase();
                })
                .map(conversation => {
                  return (
                    <ConversationList
                      conversation={conversation}
                      classes={classes}
                    />
                  );
                })
            : null}
        </ul>
      </div>
    </div>
  );
};

export default withStyles(styles)(Conversations);
