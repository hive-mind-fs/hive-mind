import React from 'react';
import { Button, Text } from 'react-native';
import { Container, H1 } from 'native-base';

export default function CountdownScreen({ navigation }) {
  return (
    <Container
      style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
    >
      <Text>Game Starts In</Text>
      <H1>3</H1>
      <Button
        title="Start Game"
        onPress={() => navigation.navigate("GameBoardScreen")}
      />
    </Container>
  );
}