import React from 'react';
import { Button, Text } from 'react-native';
import { Container } from 'native-base';

export default function PostRoundScreen({ navigation }) {
  return (
    <Container
      style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
    >
      <Text>PostRound</Text>
      <Button
        title="Go to Dashboard"
        onPress={() => navigation.navigate('DashboardScreen')}
      />
    </Container>
  );
}
