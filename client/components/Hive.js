import { View } from 'native-base';
import React from 'react';
import { StyleSheet } from 'react-native';
import HiveShape from './HiveShape';

const Hive = ({ centerLetter, otherLetters, onLetterPress }) => {
  return (
    <View style={{ width: 400, height: 400 }}>
      <HiveShape
        top="33.333%"
        left="30%"
        fill="#f8cd05"
        letter={centerLetter}
        onLetterPress={onLetterPress}
      />
      <HiveShape
        top="16.667%"
        left="0%"
        fill="#e6e6e6"
        letter={otherLetters[0]}
        onLetterPress={onLetterPress}
      />
      <HiveShape
        top="0%"
        left="30%"
        fill="#e6e6e6"
        letter={otherLetters[1]}
        onLetterPress={onLetterPress}
      />
      <HiveShape
        top="16.667%"
        left="60%"
        fill="#e6e6e6"
        letter={otherLetters[2]}
        onLetterPress={onLetterPress}
      />
      <HiveShape
        top="50%"
        left="60%"
        fill="#e6e6e6"
        letter={otherLetters[3]}
        onLetterPress={onLetterPress}
      />
      <HiveShape
        top="66.667%"
        left="30%"
        fill="#e6e6e6"
        letter={otherLetters[4]}
        onLetterPress={onLetterPress}
      />
      <HiveShape
        top="50%"
        left="0%"
        fill="#e6e6e6"
        letter={otherLetters[5]}
        onLetterPress={onLetterPress}
      />
    </View>
  );
};

export default Hive;
