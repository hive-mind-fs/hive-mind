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

const CorrectWords = ({ words }) => {
  return (
    <View style={{ width: 300, height: 20 }}>
      <Text style={styles.letter}>{words}</Text>
    </View>
  );
};

export default CorrectWords;
