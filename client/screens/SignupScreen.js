import React from 'react';
import { Button, Text } from 'react-native';
import { Container } from 'native-base';

export default function SignupScreen({ navigation }) {
  return (
    <Container style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Signup</Text>
      <Button
        title="Go to Dashboard"
        onPress={() => navigation.navigate('Dashboard')}
      />
    </Container>
  );
}