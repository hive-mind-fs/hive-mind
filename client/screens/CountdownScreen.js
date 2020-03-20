import React, { useState, useEffect } from 'react';
import { Button, Text } from 'react-native';
import { Container, H1 } from 'native-base';

export default function CountdownScreen({ navigation }) {
  const [countdownTimer, setCountdownTimer] = useState('3');

  useEffect(() => {
    if (countdownTimer > 0) {
      setTimeout(() => {
        if (countdownTimer === 1) {
          setCountdownTimer('Go!')
        } else {
          setCountdownTimer(countdownTimer - 1)
        }
      }, 1000)
    } else {
      setTimeout(() => {
        navigation.navigate("GameBoardScreen")
      }, 1000)
    }
  })

  return (
    <Container
      style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
    >
      <Text>Game Starts In</Text>
      <H1>{countdownTimer}</H1>
    </Container>
  );
}