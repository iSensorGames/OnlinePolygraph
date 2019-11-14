import React from "react";
import { connect } from "react-redux";

// Selectors
import * as chatSelectors from "../../../../reducers/chat";

// Layout
import RoleWrapperLayout from "../../../../layout/RoleWrapper";

// Views
import GroundTruth from "./GroundTruth";
import MessageContainer from "./MessageContainer";
import GameResult from "./GameResult";
import RoundResult from "./RoundResult";

const GameView = ({ game }) => {
  const { tab } = game;
  const ContentRenderer = () => {
    switch (tab) {
      case "ground-truth":
        return <GroundTruth />;
      case "messenger":
        return <MessageContainer />;
      case "round-result":
        return <RoundResult />;
      case "game-result":
        return <GameResult />;
      default:
        return null;
    }
  };

  return (
    <RoleWrapperLayout>
      <ContentRenderer />
    </RoleWrapperLayout>
  );
};

const mapStateToProps = state => {
  return {
    game: chatSelectors.getGame(state)
  };
};

export default connect(mapStateToProps, null)(GameView);
