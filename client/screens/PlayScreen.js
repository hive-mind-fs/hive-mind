import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Container, H1, Button, Text } from 'native-base';
import { Logo } from '../components';
import { fetchRound, fetchGODRound } from '../store/game';
var moment = require('moment');
function PlayScreen({ navigation, createUserRound, createGODUserRound, user }) {
  let [disabled, setDisabled] = useState(false);
  let [godRoundId, setGODRoundId] = useState(0);
  const GODRounds = [
    19580,
    17103,
    29493,
    30172,
    41358,
    17096,
    19588,
    15962,
    15130,
    822
  ];

  const timeToMidnight = () => {
    var now = new Date();
    var end = moment().endOf('day');
    return end - now + 1000;
  };

  const updateGOD = () => {
    setGODRoundId(godRoundId++);
    setDisabled(false);
    setTimeout(updateGOD, timeToMidnight());
  };

  const handlePracticeRound = async () => {
    await createUserRound(user.id);
    navigation.navigate('PracticeRoundScreen');
  };

  const handleGOD = async () => {
    setDisabled(true);
    await createGODUserRound(user.id, GODRounds[godRoundId]);
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
    createGODUserRound: (userId, RoundId) =>
      dispatch(fetchGODRound(userId, RoundId)),
    logout: () => dispatch(logout())
  };
};

export default connect(mapState, mapDispatch)(PlayScreen);
