import { Text, View } from 'native-base';
import React from 'react';
import Svg, { Polygon } from 'react-native-svg';

const HiveShape = ({ top, left, fill, letter }) => {
  return (
    <Button
      onPress={() => {
        console.log('HELLO');
      }}
      style={{
        position: 'absolute',
        top: top,
        left: left,
        width: '40%',
        height: '33%',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <Svg
        viewBox="0 0 120 103.92304845413263"
        style={{ width: '100%', height: '100%' }}
      >
        <Polygon
          class="cell-fill"
          points="0,51.96152422706631 30,0 90,0 120,51.96152422706631 90,103.92304845413263 30,103.92304845413263"
          stroke="white"
          stroke-width="7.5"
          style={{ fill: fill }}
        ></Polygon>
      </Svg>
      <Text
        style={{
          position: 'absolute',
          textAlign: 'center',
          fontSize: 40,
          fontWeight: 'bold'
        }}
      >
        {letter}
      </Text>
    </Button>
  );
};

export default HiveShape;
