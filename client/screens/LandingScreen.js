import React from 'react';
import { Button } from 'react-native';
import { Container, Thumbnail } from 'native-base';
import { Logo } from '../components';

export default function LandingScreen({ navigation }) {
  return (
    <Container style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Logo/>
      <Button
        title="Signup"
        onPress={() => navigation.navigate('SignupScreen')}
      />
      <Button
        title="Login"
        onPress={() => navigation.navigate('LoginScreen')}
      />
    </Container>
  );
}