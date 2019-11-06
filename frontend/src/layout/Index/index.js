import withRoot from "../../modules/withRoot";
import React from "react";
import clsx from "clsx";
import { compose } from "recompose";

// Component
import { withAuthentication } from "../../modules/components/Session";

// Views
import AppAppBar from "../../modules/views/AppAppBar";

// Asset
import bgImg from "../../static/img/bg.png";

// Styles
import { withStyles } from "@material-ui/core/styles";
const styles = () => ({
  container: {
    display: "flex",
    flexDirection: "column"
  },
  background: {
    position: "fixed",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundPosition: "center",
    backgroundImage: `url(${bgImg})`,
    zIndex: -2
  }
});

const Index = ({ children, classes }) => {
  return (
    <div className={clsx(classes.container, classes.background)}>
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
