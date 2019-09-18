import withRoot from "../../modules/withRoot";
// --- Post bootstrap -----
import React from "react";

// Components
import AppAppBar from "../../modules/views/AppAppBar";
import AppFooter from "../../modules/views/AppFooter";

const Welcome = () => {
  return (
    <React.Fragment>
      <AppAppBar />
      <div className="Welcome">Welcome page</div>
      <AppFooter />
    </React.Fragment>
  );
};

export default withRoot(Welcome);
