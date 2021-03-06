import { View, Text } from 'native-base';
import React from 'react';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  letter: {
    // position: 'absolute',
    textAlign: 'center',
    fontSize: 40,
    fontWeight: 'bold',
    marginTop: 40
  }
});

const Input = ({ inputLetters }) => {
  return (
    <View style={{ width: 300, height: 100, display: 'flex', alignItems: 'center' }}>
      <Text style={styles.letter}>{inputLetters}</Text>
    </View>
  );
};

export default Input;
