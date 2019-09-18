import withRoot from "../../modules/withRoot";
// --- Post bootstrap -----
import React from "react";

// Styles
import "./welcome.css";

// Components
import AppAppBar from "../../modules/views/AppAppBar";
import AppFooter from "../../modules/views/AppFooter";

// Static Assets
import wolfInSheepsClothing from "../../static/img/wolf-in-sheeps-clothing.jpg";

const Welcome = () => {
  return (
    <React.Fragment>
      <AppAppBar />
      <div
        className="Welcome"
        style={{ backgroundImage: `url(${wolfInSheepsClothing})` }}
      >
        <div className="title">Welcome to Real Spiel</div>
        <div className="description">
          Aliquam a dapibus magna. Nullam pretium vestibulum dolor, at
          vestibulum turpis imperdiet euismod. Proin eu metus metus. Mauris
          placerat neque id blandit malesuada. Aliquam id turpis tellus. Nam
          convallis neque sed tellus pretium accumsan. Mauris libero felis,
          consequat eu dictum id, convallis at neque.
        </div>
      </div>
      <AppFooter />
    </React.Fragment>
  );
};

export default withRoot(Welcome);
