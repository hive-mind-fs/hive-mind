import { Button, Text } from 'native-base';
import React from 'react';
import { StyleSheet } from 'react-native';
import Svg, { Polygon } from 'react-native-svg';

const styles = StyleSheet.create({
  letterButton: {
    backgroundColor: 'transparent',
    position: 'absolute',
    width: '40%',
    height: '33%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  hexagon: { width: '100%', height: '100%' },
  letter: {
    position: 'absolute',
    textAlign: 'center',
    fontSize: 40,
    fontWeight: 'bold'
  }
});

const HiveShape = ({ top, left, fill, letter, onLetterPress }) => {
  return (
    <Button
      onPress={() => {
        onLetterPress(letter);
      }}
      style={{ ...styles.letterButton, top: top, left: left }}
    >
      <Svg viewBox="0 0 120 103.92304845413263" style={styles.hexagon}>
        <Polygon
          class="cell-fill"
          points="0,51.96152422706631 30,0 90,0 120,51.96152422706631 90,103.92304845413263 30,103.92304845413263"
          stroke="white"
          stroke-width="7.5"
          style={{ fill: fill }}
        ></Polygon>
      </Svg>
      <Text style={styles.letter}>{letter}</Text>
    </Button>
  );
};

export default HiveShape;
