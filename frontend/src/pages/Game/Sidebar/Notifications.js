import React from "react";
import Icon from "react-eva-icons";

const Notifications = ({ isActive }) => (
  <div
    className={`tab-pane fade${isActive ? " active show" : ""}`}
    role="tabpanel"
  >
    <div className="top">
      <form>
        <input type="search" className="form-control" placeholder="Search" />
        <button type="submit" className="btn prepend">
          <Icon name="search" />
        </button>
      </form>
    </div>
    <div className="middle">
      <h4>Notifications</h4>
      <hr />
      <ul className="notifications">
        <li>
          <div className="round">
            <Icon name="person-done" />
          </div>
          <p>
            Quincy has joined to <strong>Squad Ghouls</strong> group.
          </p>
        </li>
        <li>
          <div className="round">
            <Icon name="lock" />
          </div>
          <p>You need change your password for security reasons.</p>
        </li>
        <li>
          <div className="round">
            <Icon name="attach" />
          </div>
          <p>
            Mark attached the file <strong>workbox.js</strong>.
          </p>
        </li>
        <li>
          <div className="icon round">
            <Icon name="gift" />
          </div>
          <p>Sara has a birthday today. Wish her all the best.</p>
        </li>
        <li>
          <div className="round">
            <Icon name="person" />
          </div>
          <p>Sanne has accepted your friend request.</p>
        </li>
      </ul>
    </div>
  </div>
);

export default Notifications;
