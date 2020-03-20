import { View } from 'native-base';
import React from 'react';
import HiveShape from './HiveShape';

const Hive = ({ centerLetter, otherLetters }) => {
  return (
    <View style={{ width: 400, height: 400 }}>
      <HiveShape
        top="33.333%"
        left="30%"
        fill="#f8cd05"
        letter={centerLetter}
      />
      <HiveShape
        top="16.667%"
        left="0%"
        fill="#e6e6e6"
        letter={otherLetters[0]}
      />
      <HiveShape top="0%" left="30%" fill="#e6e6e6" letter={otherLetters[1]} />
      <HiveShape
        top="16.667%"
        left="60%"
        fill="#e6e6e6"
        letter={otherLetters[2]}
      />
      <HiveShape top="50%" left="60%" fill="#e6e6e6" letter={otherLetters[3]} />
      <HiveShape
        top="66.667%"
        left="30%"
        fill="#e6e6e6"
        letter={otherLetters[4]}
      />
      <HiveShape top="50%" left="0%" fill="#e6e6e6" letter={otherLetters[5]} />
    </View>
  );
};

export default Hive;
