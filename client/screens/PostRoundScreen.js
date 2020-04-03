import React from 'react';
import { connect } from 'react-redux';
import { View } from 'react-native';
import { Button, Card, Container, H1, Text } from 'native-base';
import { Stats, Logo } from '../components';
import { fetchRound } from '../store/game';

function PostRoundScreen({ route, navigation, createUserRound, user }) {
  const words = route.params.words;
  const score = route.params.score;

  console.log('SCORE', score);

  const postRound = [
    {
      title: 'Total Score',
      stat: `${score}`
    },
    {
      title: 'Words Got',
      stat: `${words.length}`
    }
  ];

  return (
    <Container>
      <Logo />
      <H1>Round Over</H1>
      {/* <Card style={{ marginTop: 20 }}> */}
      <Stats style={{ width: '400' }} stats={postRound} words={words} />
      {/* </Card> */}
      <Button
        block
        rounded
        title="Play Again"
        onPress={() => {
          createUserRound(user.id);
          navigation.navigate('HomeScreen', { screen: 'CountdownScreen' });
        }}
      >
        <Text>Play Again</Text>
      </Button>

      <Button
        block
        bordered
        rounded
        marginTop
        title="Quit"
        onPress={() => navigation.navigate('PlayScreen')}
      >
        <Text>Quit</Text>
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
    createUserRound: userId => dispatch(fetchRound(userId))
  };
};

export default connect(mapState, mapDispatch)(PostRoundScreen);
