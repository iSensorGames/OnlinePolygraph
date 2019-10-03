import React from "react";

// Components
import clsx from "clsx";
import { withDatabase } from "../Database";

// Styles
import "./logout.css";

const Logout = ({ database }) => (
  <div
    className={clsx(
      "Logout-btn",
      "Logout-h6",
      "Logout-underlineNone",
      "Logout-rightLink-10",
      "Logout-linkSecondary-11"
    )}
    onClick={() => database.doSignOut()}
  >
    {"Logout"}
  </div>
);

export default withDatabase(Logout);
