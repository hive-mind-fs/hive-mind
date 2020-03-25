import React from 'react';
import { connect } from 'react-redux';
import { Button, Text } from 'react-native';
import { Container, H1 } from 'native-base';
import { Logo } from '../components';
import { fetchPracticeRound } from '../store/game';
import { logout } from '../store';

function PlayScreen({ navigation, createUserRound, userId }) {
  const handleSubmit = () => {
    createUserRound(userId);
    navigation.navigate('CountdownScreen');
  };

  return (
    <Container
      style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
    >
      <Logo />
      <H1>Spelling Bee</H1>
      <Text>How many words can you make with 7 letters?</Text>
      <Button title="Start Playing" onPress={() => handleSubmit()} />
      <Button
        title="Rules"
        onPress={() => navigation.navigate('RulesScreen')}
      />
      <Button
        title="Logout"
        onPress={() => navigation.navigate('LandingScreen')}
      />
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
    createUserRound: userId => dispatch(fetchPracticeRound(userId))
  };
};

export default connect(mapState, mapDispatch)(PlayScreen);
