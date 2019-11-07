import React from "react";
import { connect } from "react-redux";
import { compose } from "recompose";
import clsx from "clsx";

// Selectors
import * as chatSelectors from "../../reducers/chat";

// Styles
import { withStyles } from "@material-ui/core/styles";
const styles = () => ({
  container: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    height: "100%"
  },
  tabContainer: {
    alignItems: "center",
    display: "flex",
    flexDirection: "row",
    position: "absolute",
    left: 0,
    top: 0,
    right: 0,
    flex: 1,
    height: 80
  },
  tab: {
    alignItems: "center",
    backgroundColor: "#b2c23d",
    borderBottom: "1px solid #b2c23d",
    flex: 1,
    display: "flex",
    justifyContent: "center",
    height: "100%"
  },
  tabActive: {
    backgroundColor: "#8bb523"
  }
});

const ChatSetupLayout = ({ children, classes, chatSetupTab }) => {
  return (
    <div className={classes.container}>
      <div className={classes.tabContainer}>
        <div
          className={clsx(
            classes.tab,
            chatSetupTab === "intro" ? classes.tabActive : ""
          )}
        >
          1. Intro
        </div>
        <div
          className={clsx(
            classes.tab,
            chatSetupTab === "topic" ? classes.tabActive : ""
          )}
        >
          2. Topic Select
        </div>
        <div
          className={clsx(
            classes.tab,
            chatSetupTab === "ready" ? classes.tabActive : ""
          )}
        >
          3. Ready
        </div>
      </div>
      {children}
    </div>
  );
};

const mapStateToProps = state => {
  return {
    chatSetupTab: chatSelectors.getChatSetupTab(state)
  };
};

export default compose(
  withStyles(styles),
  connect(
    mapStateToProps,
    null
  )
)(ChatSetupLayout);
