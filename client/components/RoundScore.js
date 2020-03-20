import { View, Text } from 'native-base';
import React from 'react';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  letter: {
    position: 'absolute',
    textAlign: 'center',
    fontSize: 12,
    fontWeight: 'bold'
  }
});

const RoundScore= ({ score }) => {
  return (
    <View style={{ width: 10, height: 20 }}>
      <Text style={styles.letter}>{score}</Text>
    </View>
  );
};

export default RoundScore;
