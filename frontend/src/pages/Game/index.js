import React from 'react';

// Styles
import './game.css';

// Layout
import Container from '../../layout/Container';
import PeopleList from '../../layout/PeopleList';
import Chat from '../../layout/Chat';

const Game = () => {
    return (
        <Container>
            <PeopleList />
            <Chat />
        </Container>
    )
}

export default Game;