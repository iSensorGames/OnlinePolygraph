import withRoot from "../../modules/withRoot";
import React from "react";
import { compose } from "recompose";

// Component
import { withAuthentication } from "../../modules/components/Session";

// Views
import AppAppBar from "../../modules/views/AppAppBar";

// Styles
import { withStyles } from "@material-ui/core/styles";
const styles = () => ({
  container: {
    display: "flex",
    flexDirection: "column"
  }
});

const Index = ({ children, classes }) => {
  return (
    <div className={classes.container}>
      <AppAppBar />
      {children}
    </div>
  );
};

export default compose(
  withAuthentication,
  withRoot,
  withStyles(styles)
)(Index);
