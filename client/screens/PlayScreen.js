import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Container, H1, Button, Text } from 'native-base';
import { Logo } from '../components';
import { fetchRound } from '../store/game';

function PlayScreen({ navigation, createUserRound, user }) {
  const [disabled, setDisabled] = useState(false);

  const handlePracticeRound = async () => {
    await createUserRound(user.id);
    navigation.navigate('PracticeRoundScreen');
  };

  const handleGOD = async () => {
    setDisabled(true);
    await createUserRound(user.id);
    navigation.navigate('GameOfTheDayScreen');
  };

  const handleRandomLobbying = () => {
    navigation.navigate('HomeScreen', { screen: 'LobbyScreen' });
  };

  return (
    <Container>
      <Logo />
      <H1>Spelling Bee</H1>
      <Text marginT5 center>
        How many words can you make{'\n'}with 7 letters?
      </Text>

      <Button
        primary
        block
        rounded
        marginTopL
        title="FindOpponent"
        onPress={() => handleRandomLobbying()}
      >
        <Text>Play A Stranger</Text>
      </Button>

      <Button
        primary
        block
        rounded
        marginTopL
        title="GameOfTheDay"
        disabled={disabled}
        onPress={() => handleGOD()}
      >
        <Text>Game Of The Day</Text>
      </Button>

      <Button
        primary
        block
        rounded
        marginTopL
        title="Practice"
        onPress={() => handlePracticeRound()}
      >
        <Text>Practice</Text>
      </Button>

      <Button
        light
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
