import React, { useState, useEffect } from 'react';
import { Button, Text } from 'react-native';
import { Container, H1 } from 'native-base';

export default function CountdownScreen({ navigation }) {
  const [countdownTimer, setCountdownTimer] = useState(3);

  // Reset state when screen is loaded
  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setCountdownTimer(3);
    });
    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    setTimeout(() => {
      if (countdownTimer > 0) {
        setCountdownTimer(countdownTimer - 1);
      } else {
        navigation.navigate('GameBoardScreen');
      }
    }, 1000);
  });

  return (
    <Container
      style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
    >
      <Text>Game Starts In</Text>
      <H1>{countdownTimer === 0 ? 'Go!' : countdownTimer}</H1>
    </Container>
  );
}
