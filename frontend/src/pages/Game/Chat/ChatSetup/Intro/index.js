import React from "react";
import { compose } from "recompose";
import { connect } from "react-redux";

// Component
import Button from "../../../../../modules/components/Button";

// Actions
import * as chatActions from "../../../../../actions/chat";

// Styles
import { withStyles } from "@material-ui/core/styles";
const styles = () => ({
  container: {
    alignItems: "center",
    display: "flex",
    flexDirection: "column",
    flex: 1,
    justifyContent: "center"
  }
});

const Intro = ({ classes, setChatSetupTab }) => {
  return (
    <div className={classes.container}>
      <div>INTRO</div>
      <Button color="primary" onClick={() => setChatSetupTab("topic")}>
        Okay
      </Button>
    </div>
  );
};

const actionCreators = {
  setChatSetupTab: chatActions.setChatSetupTab
};

export default compose(
  withStyles(styles),
  connect(
    null,
    actionCreators
  )
)(Intro);
