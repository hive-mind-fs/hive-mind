import React from 'react';
import { Button, Text } from 'react-native';
import { Container, H1 } from 'native-base';
import { Logo } from '../components';

export default function PlayScreen({ navigation }) {
  return (
    <Container style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Logo/>
        <H1>Spelling Bee</H1>
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