import React from 'react';
import { connect } from 'react-redux';
import { Container, H1, Button, Text } from 'native-base';
import { Logo } from '../components';
import { fetchPracticeRound } from '../store/game';

function PlayScreen({ navigation, createUserRound, user }) {
  console.log('we have user', user);

  const handlePracticeRound = () => {
    console.log('user id', user.id);

    createUserRound(user.id);
    navigation.navigate('CountdownScreen');
  };

  const handleFriendLobbying = () => {
    console.log('user id', user.id);
    // we don't know whether we will create round or not
    navigation.navigate('FriendLobbyScreen');
  };

  const handleRandomLobbying = () => {
    console.log('user id', user.id);
    // we don't know whether we will create round or not
    navigation.navigate('LobbyScreen');
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
        onPress={() => handleFriendLobbying()}
      >
        <Text>Play A Friend</Text>
      </Button>

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
    createUserRound: userId => dispatch(fetchPracticeRound(userId)),
    logout: () => dispatch(logout())
  };
};

export default connect(mapState, mapDispatch)(PlayScreen);
