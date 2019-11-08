import React from 'react';
import { connect } from 'react-redux';

// Selectors
import * as chatSelectors from '../../../../reducers/chat';

// Layout
import RoleWrapper from '../../../../layout/RoleWrapper';

// Views
import GroundTruth from './GroundTruth';
import MessageContainer from './MessageContainer';

const GameView = ({ game }) => {
  const { tab } = game;

  console.log('GameView tab', tab);

  const ContentRenderer = () => {
    switch (tab) {
      case 'ground-truth':
        return <GroundTruth />;
      case 'messenger':
        return <MessageContainer />;
      default:
        return null;
    }
  };

  return (
    <RoleWrapper>
      <ContentRenderer />
    </RoleWrapper>
  );
};

const mapStateToProps = state => {
  return {
    game: chatSelectors.getGame(state),
  };
};

export default connect(
  mapStateToProps,
  null
)(GameView);
