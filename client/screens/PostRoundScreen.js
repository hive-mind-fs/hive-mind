import React from 'react';
import { connect } from 'react-redux';
import { Button } from 'react-native';
import { Card, Container, H1 } from 'native-base';
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
    <Container
      style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
    >
      <Logo />
      <H1>Username</H1>
      <Card>
        <Stats stats={postRound} words={words}/>
      </Card>
      <Card>

      </Card>

      <Button
        title="Quit"
        onPress={() => navigation.navigate('PlayScreen')}
      />
      <Button
        title="Play Again"
        onPress={() => {
          createUserRound(7) // To do, replace with user id
          navigation.navigate('CountdownScreen')
        }}
      />
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
    createUserRound: (userId) => dispatch(fetchPracticeRound(userId))
  };
};

export default connect(mapState, mapDispatch)(PostRoundScreen);
