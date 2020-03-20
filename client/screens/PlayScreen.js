import React from 'react';
import { Button, Text } from 'react-native';
import { Container } from 'native-base';
import { Logo } from '../components';

export default function PlayScreen({ navigation }) {
  return (
    <Container
      style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
    >
      <Logo />
      <Text>Spelling Bee</Text>
      <Text>How many words can you make with 7 letters?</Text>
      <Button
        title="Start Playing"
        onPress={() => navigation.navigate('CountdownScreen')}
      />
      <Button
        title="Rules"
        onPress={() => navigation.navigate('RulesScreen')}
      />
    </Container>
  );
}
