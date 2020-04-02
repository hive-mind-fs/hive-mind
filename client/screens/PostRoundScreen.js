import React from 'react';
import { connect } from 'react-redux';
import { Button, Card, Container, H1, Text } from 'native-base';
import { Stats, Logo } from '../components';
import { fetchPracticeRound } from '../store/game';

function PostRoundScreen({ getPuzzle, route, navigation }) {
  const words = route.params.words;
  const score = route.params.score;

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
      <Card style={{ marginTop: 20 }}>
        <Stats stats={postRound} words={words} />
      </Card>
      <Card></Card>

      <Button
        block
        rounded
        title="Play Again"
        onPress={() => {
          getPuzzle();
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
    getPuzzle: () => dispatch(fetchPracticeRound())
  };
};

export default connect(mapState, mapDispatch)(PostRoundScreen);
