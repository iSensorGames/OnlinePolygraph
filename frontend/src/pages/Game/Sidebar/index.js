import React from "react";

// Components
import Conversations from "./Conversations";
import Friends from "./Friends";
import Notifications from "./Notifications";
import Settings from "./Settings";

// Constants
import * as CURRENT_PAGE from "../../../modules/constants/sidebar";

const Sidebar = ({ currentPage }) => {
  return (
    <div className="sidebar">
      <div className="container">
        <div className="tab-content">
          <Conversations
            isActive={currentPage === CURRENT_PAGE.CONVERSATIONS}
          />
          <Friends isActive={currentPage === CURRENT_PAGE.FRIENDS} />
          <Notifications
            isActive={currentPage === CURRENT_PAGE.NOTIFICATIONS}
          />
          <Settings isActive={currentPage === CURRENT_PAGE.SETTINGS} />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
