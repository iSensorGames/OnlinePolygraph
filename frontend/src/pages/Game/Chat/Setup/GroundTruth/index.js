import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';

// Utility function
import * as utils from '../../../../../utils';

// Components
import Button from '../../../../../modules/components/Button';
import Typography from '../../../../../modules/components/Typography';

// Styles
import { withStyles } from '@material-ui/core/styles';

// Data
import questionItems from './data';

// Actions
import * as chatActions from '../../../../../actions/chat';

// Selecter
import * as chatSelectors from '../../../../../reducers/chat';

const styles = () => ({
  container: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    justifyContent: 'center',
  },
  inputMsgWrite: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    position: 'relative',
    paddingRight: 20,
    paddingLeft: 20,
    background: 'white',
  },
  writeMsg: {
    '&:focus': {
      outline: 'none',
    },
  },
  button: {
    minWidth: 200,
  },
  buttonsContainer: {
    marginBottom: 40,
    maxWidth: 500,
    textAlign: 'center',
  },
});

const GroundTruth = ({ classes, game, room, setChatSetupTab, setRoom }) => {
  const {
    roles: { outerRole },
  } = game;
  const { topic } = room;

  const QuestionRenderer = () => {
    const groundTruthTopic = questionItems.filter(questionItem => {
      return questionItem.topic === topic;
    })[0];
    return (
      <Typography variant="h4">
        {
          groundTruthTopic.questions[
            utils.randomize(groundTruthTopic.questions.length)
          ]
        }
      </Typography>
    );
  };

  const handleGroundTruthSelect = answer => {
    setRoom({ groundTruth: answer });
    setChatSetupTab('ready');
  };

  return outerRole === 'Detector' ? (
    <div className={classes.container}></div>
  ) : (
    <div className={classes.container}>
      <Typography className={classes.roleExplanation} variant="h4">
        Your role is ""
      </Typography>
      <QuestionRenderer />
      <div className={classes.buttonsContainer}>
        <Button
          color="primary"
          variant="contained"
          size="large"
          className={classes.button}
          onClick={() => handleGroundTruthSelect('yes')}
        >
          Yes
        </Button>
        <Button
          color="secondary"
          variant="contained"
          size="large"
          className={classes.button}
          onClick={() => handleGroundTruthSelect('no')}
        >
          No
        </Button>
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    room: chatSelectors.getRoom(state),
    game: chatSelectors.getGame(state),
  };
};

const actionCreators = {
  setChatSetupTab: chatActions.setChatSetupTab,
  setRoom: chatActions.setRoom,
};

export default compose(
  withStyles(styles),
  connect(
    mapStateToProps,
    actionCreators
  )
)(GroundTruth);
