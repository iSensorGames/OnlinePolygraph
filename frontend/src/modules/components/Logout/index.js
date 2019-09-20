import React from "react";

// Components
import clsx from "clsx";
import { withFirebase } from "../Firebase";

// Styles
import "./logout.css";

const Logout = ({ firebase }) => (
  <div
    className={clsx(
      "Logout-btn",
      "Logout-h6",
      "Logout-underlineNone",
      "Logout-rightLink-10",
      "Logout-linkSecondary-11"
    )}
    onClick={() => firebase.doSignOut()}
  >
    {"Logout"}
  </div>
);

export default withFirebase(Logout);
