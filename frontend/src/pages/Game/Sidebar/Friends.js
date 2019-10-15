import React from "react";
import Icon from "react-eva-icons";

// Mock data
import friends from "./data/friends";
import { withStyles } from "@material-ui/core/styles";

const styles = () => ({
  link: {
    cursor: "pointer"
  }
});

const Friends = ({ isActive, classes }) => (
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
    </div>
    <div className="middle">
      <h4>Friends</h4>
      <hr />
      <ul className="users">
        {friends
          ? friends.map((friend, idx) => {
              return (
                <li key={idx} className={classes.link}>
                  <div className="status online">
                    <img src={friend.img} alt="avatar" />
                    <Icon name="radio-button-on" size="medium" />
                  </div>
                  <div className="content">
                    <h5>{friend.name}</h5>
                    <span>{friend.location}</span>
                  </div>
                  <div className="icon">
                    <Icon name="person" size="medium" />
                  </div>
                </li>
              );
            })
          : null}
      </ul>
    </div>
  </div>
);

export default withStyles(styles)(Friends);
