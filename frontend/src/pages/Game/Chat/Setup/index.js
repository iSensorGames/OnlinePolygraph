import React from 'react';
import { compose } from 'recompose';
import { connect } from 'react-redux';

// Views
import Intro from './Intro';
import TopicSelect from './TopicSelect';
import RoomJoin from './RoomJoin';
import GroundTruth from './GroundTruth';
import Ready from './Ready';

// Actions
import * as chatActions from '../../../../actions/chat';

// Selectors
import * as chatSelectors from '../../../../reducers/chat';

// Layout
import ChatSetupLayout from '../../../../layout/ChatSetup';

// Styles
import { withStyles } from '@material-ui/core/styles';
const styles = () => ({
  container: {
    alignItems: 'center',
    display: 'flex',
    flex: 1,
    justifyContent: 'center',
    position: 'relative',
  },
});

const ChatSetup = ({ classes, chatSetupTab }) => {
  console.log('ChatSetup chatSetupTab', chatSetupTab);

  const Tab = () => {
    switch (chatSetupTab) {
      case 'intro':
        return <Intro />;
      case 'topic':
        return <TopicSelect />;
      case 'ready':
        return <Ready />;
      case 'room-join':
        return <RoomJoin />;
      default:
        return null;
    }
  };

  return (
    <div className={classes.container}>
      {['intro', 'topic', 'ready'].includes(chatSetupTab) ? (
        <ChatSetupLayout>
          <Tab />
        </ChatSetupLayout>
      ) : (
        <Tab />
      )}
    </div>
  );
};

const mapStateToProps = state => {
  return {
    chatSetupTab: chatSelectors.getChatSetupTab(state),
  };
};

const actionCreators = {
  createRoom: chatActions.createRoom,
};

export default compose(
  withStyles(styles),
  connect(
    mapStateToProps,
    actionCreators
  )
)(ChatSetup);
