import withRoot from "../../modules/withRoot";
// --- Post bootstrap -----
import React from "react";

// Components
import {
  AuthUserContext,
  withAuthorization
} from "../../modules/components/Session";
import AppAppBar from "../../modules/views/AppAppBar";
import AppFooter from "../../modules/views/AppFooter";

const AdminPage = () => {
  return (
    <AuthUserContext.Consumer>
      {authUser => (
        <React.Fragment>
          <AppAppBar />
          <div className="Welcome">
            <div className="title">Admin ({authUser.email})</div>
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
      )}
    </AuthUserContext.Consumer>
  );
};

const condition = authUser => !!authUser;

export default withAuthorization(condition)(withRoot(AdminPage));
