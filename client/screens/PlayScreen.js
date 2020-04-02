import React from 'react';
import { connect } from 'react-redux';
import { Container, H1, Button, Text } from 'native-base';
import { Logo } from '../components';
import { fetchPracticeRound } from '../store/game';

function PlayScreen({ getPuzzle, navigation, user }) {
  console.log('we have user', user);

  const handleSubmit = () => {
    console.log('user id', user.id);
    console.log('user id', user.id);
    getPuzzle();
    navigation.navigate('CountdownScreen');
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
        title="Start Playing"
        onPress={() => handleSubmit()}
      >
        <Text>Start Playing</Text>
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
    getPuzzle: () => dispatch(fetchPracticeRound()),
    logout: () => dispatch(logout())
  };
};

export default connect(mapState, mapDispatch)(PlayScreen);
