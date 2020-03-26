import { View, Text } from 'native-base';
import React from 'react';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  letter: {
    // position: 'absolute',
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold'
  }
});

const Error = ({ error }) => {
  return (
    <View style={{ height: 50 }}>
      <Text style={styles.letter}>{error}</Text>
    </View>
  );
};

export default Error;
