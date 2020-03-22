import React from 'react';
import { connect } from 'redux';
import { Button, Text } from 'react-native';
import { Container, H1 } from 'native-base';
import { Logo } from '../components';
import { fetchPracticeRound } from '../store'

export default function PlayScreen({ navigation, createUserRound }) {
  return (
    <Container
      style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
    >
      <Logo />
      <H1>Spelling Bee</H1>
      <Text>How many words can you make with 7 letters?</Text>
      <Button
        title="Start Playing"
        onPress={() => {
          createUserRound(10) // To do, replace with user id
          navigation.navigate('CountdownScreen')
        }
      />
      <Button
        title="Rules"
        onPress={() => navigation.navigate('RulesScreen')}
      />
    </Container>
  );
}

const mapDispatch = dispatch => {
  return {
    createUserRound: (userId) => dispatch(fetchPracticeRound(userId))
  };
};
