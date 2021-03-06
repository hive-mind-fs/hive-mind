import React from 'react';
import { connect } from 'react-redux';
import { Container, H1, Button, Text } from 'native-base';
import { Logo } from '../components';
import { fetchRound } from '../store/game';

function PlayScreen({ navigation, createUserRound, user }) {
  console.log('we have user', user);

  const handlePracticeRound = async () => {
    await createUserRound(user.id);
    navigation.navigate('PracticeRoundScreen');
  };

  const handleRandomLobbying = () => {
    navigation.navigate('LobbyScreen');
  };

  return (
    <Container>
      <Logo />
      <H1>Hivemind</H1>
      <Text marginT5 center>
        How many words can you{'\n'}spell with 7 letters?
      </Text>

      <Button
        primary
        block
        rounded
        marginTopL
        title="FindOpponent"
        onPress={() => handleRandomLobbying()}
      >
        <Text>Find Opponent</Text>
      </Button>
      {/*
      <Button
        primary
        block
        rounded
        marginTopL
        title="GameOfTheDay"
        onPress={() => handleGOD()}
      >
        <Text>Game Of The Day</Text>
      </Button> */}

      <Button
        primary
        rounded
        block
        marginTop
        title="Practice"
        onPress={() => handlePracticeRound()}
      >
        <Text>Practice</Text>
      </Button>

      <Button
        bordered
        block
        rounded
        marginTop
        title="Rules"
        onPress={() => navigation.navigate('RulesScreen')}
      >
        <Text>How To Play</Text>
      </Button>
    </Container>
  );
}

const mapState = state => {
  return {
    user: state.user
  };
};

const mapDispatch = dispatch => {
  return {
    createUserRound: userId => dispatch(fetchRound(userId)),
    logout: () => dispatch(logout())
  };
};

export default connect(mapState, mapDispatch)(PlayScreen);
