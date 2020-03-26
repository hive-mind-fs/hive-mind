import React from 'react';
import { connect } from 'react-redux';
import { Container, H1, Button, Text } from 'native-base';
import { Logo } from '../components';
import { fetchPracticeRound } from '../store/game';

function PlayScreen({ navigation, createUserRound, userId }) {
  const handleSubmit = () => {
    createUserRound(userId);
    navigation.navigate('CountdownScreen');
  };
  console.log(userId);
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
    userId: state.user.id
  };
};

const mapDispatch = dispatch => {
  return {
    createUserRound: userId => dispatch(fetchPracticeRound(userId)),
    logout: () => dispatch(logout())
  };
};

export default connect(mapState, mapDispatch)(PlayScreen);
