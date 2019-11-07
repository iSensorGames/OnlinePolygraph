import React from "react";
import { connect } from "react-redux";
import { compose } from "recompose";

// Components
import Button from "../../../../../modules/components/Button";
import Typography from "../../../../../modules/components/Typography";

// Styles
import { withStyles } from "@material-ui/core/styles";

// Data
import questionItems from "./data";

// Actions
import * as chatActions from "../../../../../actions/chat";

// Selecter
import * as chatSelectors from "../../../../../reducers/chat";

const styles = () => ({
  container: {
    alignItems: "center",
    display: "flex",
    flexDirection: "column",
    flex: 1,
    justifyContent: "center"
  },
  inputMsgWrite: {
    alignItems: "center",
    display: "flex",
    flexDirection: "row",
    position: "relative",
    paddingRight: 20,
    paddingLeft: 20,
    background: "white"
  },
  writeMsg: {
    "&:focus": {
      outline: "none"
    }
  },
  button: {
    minWidth: 200
  },
  buttonsContainer: {
    marginBottom: 40,
    maxWidth: 500,
    textAlign: "center"
  }
});

const randomize = maximumLength => {
  return Math.floor(Math.random() * maximumLength);
};

const GroundTruth = ({ classes, topic, setChatSetupTab, setGroundTruth }) => {
  const QuestionRenderer = () => {
    const groundTruthTopic = questionItems.filter(questionItem => {
      return questionItem.topic === topic;
    })[0];
    return (
      <Typography variant="h4">
        {
          groundTruthTopic.questions[
            randomize(groundTruthTopic.questions.length)
          ]
        }
      </Typography>
    );
  };

  const handleGroundTruthSelect = answer => {
    setGroundTruth(answer);
    setChatSetupTab("ready");
  };

  return (
    <div className={classes.container}>
      <QuestionRenderer />
      <div className={classes.buttonsContainer}>
        <Button
          color="primary"
          variant="contained"
          size="large"
          className={classes.button}
          onClick={() => handleGroundTruthSelect("yes")}
        >
          Yes
        </Button>
        <Button
          color="secondary"
          variant="contained"
          size="large"
          className={classes.button}
          onClick={() => handleGroundTruthSelect("no")}
        >
          No
        </Button>
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    topic: chatSelectors.getTopic(state)
  };
};

const actionCreators = {
  setChatSetupTab: chatActions.setChatSetupTab,
  setGroundTruth: chatActions.setGroundTruth
};

export default compose(
  withStyles(styles),
  connect(
    mapStateToProps,
    actionCreators
  )
)(GroundTruth);
