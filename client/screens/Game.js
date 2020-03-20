import React from 'react';
// import { CountdownScreen, GameBoardScreen, PostRoundScreen } from './';
import { Button, Text } from 'react-native';
import { Container, Thumbnail } from 'native-base';

export default function Game({ navigation }) {
  // WHERE I THINK WE SHOULD STORE OVERALL GAME STATE
  // const [roundStatus, setRoundStatus] = useState('countdown');

  return (
    <Container
      style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
    >
      <Text>GAME CONTAINER</Text>
      <Button
        title="Return To Dashboard"
        onPress={() => navigation.navigate('Dashboard')}
      />
    </Container>
  );
}
