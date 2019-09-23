import React from "react";
import Icon from "react-eva-icons";

// Mock data
import discussions from "./data/conversations";

const Conversations = ({ isActive }) => (
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
        <li>
          <a
            href="#direct"
            className="filter-btn active"
            data-toggle="tab"
            data-filter="direct"
          >
            Direct
          </a>
        </li>
        <li>
          <a
            href="#groups"
            className="filter-btn"
            data-toggle="tab"
            data-filter="groups"
          >
            Groups
          </a>
        </li>
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
        {discussions
          ? discussions.map((discussion, idx) => {
              return (
                <li key={idx}>
                  <a
                    href="#"
                    className={`filter ${discussion.type} ${
                      !!discussion.isActive ? "active" : ""
                    }`}
                    data-chat="open"
                    data-toggle="tab"
                    role="tab"
                    aria-controls="chat1"
                    aria-selected="true"
                  >
                    <div
                      className={`status ${
                        !!discussion.status ? "online" : "offline"
                      }`}
                    >
                      <img src={discussion.img} alt="avatar" />
                      <Icon name="radio-button-on" size="medium" />
                    </div>
                    <div className="content">
                      <div className="headline">
                        <h5>{discussion.name}</h5>
                        <span>{discussion.messageSentDate}</span>
                      </div>
                      <p>{discussion.lastText}</p>
                    </div>
                  </a>
                </li>
              );
            })
          : null}
      </ul>
    </div>
  </div>
);

export default Conversations;
