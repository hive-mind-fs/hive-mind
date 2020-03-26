import React, { useState, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { Container, H1, H3 } from 'native-base';

export default function CountdownScreen({ navigation }) {
  const preGameTimer = 3;

  const [countdownTimer, setCountdownTimer] = useState(preGameTimer);

  // Reset timer when screen is loaded
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setCountdownTimer(preGameTimer);
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
    <Container>
      <H3>Game Starts In</H3>
      <H1 style={ styles.countdown }>{countdownTimer === 0 ? 'Go!' : countdownTimer}</H1>
    </Container>
  );
}

const styles = StyleSheet.create({
  countdown: {
    fontSize: 100,
    lineHeight: 120,
  },
});
