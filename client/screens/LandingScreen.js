import React from 'react';
import { Button } from 'react-native';
import { Container } from 'native-base';
import { Logo } from '../components';
import FBLoginScreen from './FBLoginScreen';

export default function LandingScreen({ navigation }) {

  return (
    <Container
      style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
    >
      <Logo />
      <Button
        title="Sign Up"
        onPress={() => navigation.navigate('SignupScreen')}
      />
      <Button
        title="Log In"
        onPress={() => navigation.navigate('LoginScreen')}
      />
      <FBLoginScreen />
    </Container>
  );
}
