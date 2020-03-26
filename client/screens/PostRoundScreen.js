import React from 'react';
import { connect } from 'react-redux';
import { Button, Card, Container, H1, Text } from 'native-base';
import { Stats, Logo } from '../components';
import { fetchPracticeRound } from '../store/game';

function PostRoundScreen({ practiceRound, navigation, createUserRound }) {
  const postRound = [
    {
      title: 'Total Score',
      stat: `${practiceRound.score}`
    },
    {
      title: 'Words Got',
      stat: `${practiceRound.words.length}`
    }
  ];

  const words = practiceRound.words.map(word => word.word);

  return (
    <Container>
      <Logo />
      <H1>Round Over</H1>
      <Card style={{ marginTop: 20 }}>
        <Stats stats={postRound} words={words} />
      </Card>
      <Card></Card>

      <Button
        block rounded
        title="Play Again"
        onPress={() => {
          createUserRound(7); // To do, replace with user id
          navigation.navigate('CountdownScreen');
        }}
      >
        <Text>Play Again</Text>
      </Button>

      <Button 
        block bordered rounded marginTop
        title="Quit" 
        onPress={() => navigation.navigate('HomeScreen')}>
        <Text>Quit</Text>
      </Button>
      
    </Container>
  );
}

const mapState = state => {
  return {
    practiceRound: state.game.practiceRound,
    user: state.user
  };
};

const mapDispatch = dispatch => {
  return {
    createUserRound: userId => dispatch(fetchPracticeRound(userId))
  };
};

export default connect(mapState, mapDispatch)(PostRoundScreen);
