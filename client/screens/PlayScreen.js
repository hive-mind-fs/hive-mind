import React from 'react';
import { connect } from 'react-redux';
// import { Button, Text } from 'react-native';
import { Container, H1, H3, Button, Text } from 'native-base';
import { Logo } from '../components';
import { fetchPracticeRound } from '../store/game';
import { logout } from '../store';

function PlayScreen({ navigation, createUserRound, userId }) {
  const handleSubmit = () => {
    createUserRound(1); //userId);
    navigation.navigate('CountdownScreen');
  };

  return (
    <Container>
      <Logo />
      <H1>Spelling Bee</H1>
      <Text marginT5 center>How many words can you make{"\n"}with 7 letters?</Text>
      <Button 
        primary block rounded marginTopL
        title="Start Playing" 
        onPress={() => handleSubmit()}
      >
        <Text>Start Playing</Text>
      </Button>
      
      <Button 
        light block rounded marginTop
        title="Rules" 
        onPress={() => navigation.navigate('RulesScreen')}
      >
        <Text>How To Play</Text>
      </Button>
      {/* <Button
        transparent marginTop
        title="Logout"
        onPress={() => navigation.navigate('LandingScreen')}
      >
        <Text>Log Out</Text>
      </Button>  */}
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
