import React from 'react';
import { Button, Container, H1, Text } from 'native-base';
import { Logo } from '../components';

export default function LandingScreen({ navigation }) {
  return (
    <Container>
      <Logo xlarge />
      <H1>Hive Mind</H1>
      <Button
        rounded block marginTop bordered
        title="Sign Up"
        onPress={() => navigation.navigate('SignupScreen')}
      >
        <Text>Sign Up</Text>
      </Button>
      <Button
        rounded block marginTop bordered
        title="Log In"
        onPress={() => navigation.navigate('LoginScreen')}
      >
        <Text>Log In</Text>
      </Button>
    </Container>
  );
}
