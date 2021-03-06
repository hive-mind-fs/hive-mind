import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { StyleSheet } from 'react-native';
import { Container, H1, H3 } from 'native-base';

function CountdownScreen({route, navigation }) {
  const mode = route.params.mode
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
        if (mode === 'practice') {
          navigation.navigate('PracticeRoundScreen');
        } else {
          navigation.navigate('GameBoardScreen');
        }
      }
    }, 1000);
  });

  return (
    <Container>
      <H3>Game Starts In</H3>
      <H1 style={styles.countdown}>
        {countdownTimer === 0 ? 'Go!' : countdownTimer}
      </H1>
    </Container>
  );
}

const styles = StyleSheet.create({
  countdown: {
    fontSize: 100,
    lineHeight: 120
  }
});

const mapState = state => {
  return {
    user: state.user,
    room: state.game.room
  };
};

export default connect(mapState)(CountdownScreen);
