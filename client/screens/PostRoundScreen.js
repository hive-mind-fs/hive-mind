import React from 'react';
import { Button } from 'react-native';
import { Card, Container, H1 } from 'native-base';
import { Stats, Logo } from '../components';

export default function PostRoundScreen({ navigation }) {
  const postRound = [
    {
      title: 'Total Score',
      stat: '1,234'
    },
    {
      title: 'Words Got',
      stat: '34'
    }
  ];

  const words = ['stuff', 'things', 'lorem', 'ipsup thooo', 'these', 'arent', 'real', 'words', 'yet', 'also', 'words', 'you', 'got', 'should', 'be', 'bold'];
  
  return (
    <Container
      style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
    >
      <Logo />
      <H1>Username</H1>
      <Card>
        <Stats stats={postRound} words={words}/>
      </Card>
      <Card>

      </Card>

      <Button
        title="Quit"
        onPress={() => navigation.navigate('PlayScreen')}
      />
      <Button
        title="Play Again"
        onPress={() => navigation.navigate('CountdownScreen')}
      />
    </Container>
  );
}
