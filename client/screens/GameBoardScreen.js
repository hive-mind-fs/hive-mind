import React from 'react';
import { Button, Text, StyleSheet, View } from 'react-native';
import { Body, Card, CardItem, Container, Left, Right } from 'native-base';
import Hive from '../components/Hive';
import Input from '../components/Input';

// const wordsGot = ['this', 'team', 'is', 'poppin'];
const cl = 'A'
const letters = ['B', 'C', 'D', 'E', 'F', 'G'];
const input = [];

//shuffling algorithm: https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle#The_modern_algorithm
const shuffle = (arr) => {
  for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
};

export default function GameBoardScreen({ navigation }) {
  return (
    <Container
      style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
    >
    <Input inputLetters={input} />
      <Hive
        centerLetter={cl}
        otherLetters={letters}
        onLetterPress={letter => {
          input.push(letter);
        }}
      />
      <View style={styles.flexRow}>
        <Button
          title="Delete"
          onPress={() => input.pop()}
        />
        <Button
          title="Shuffle"
          onPress={() => shuffle(letters)}
        />
        <Button
          title="Enter"
          onPress={() => navigation.navigate('DashboardScreen')}
        />
      </View>
    </Container>
  );
}

const styles = StyleSheet.create({
  flexRow: {
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  gameBoard: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 20,
    margin: 10
  },
  gameButtons: {
    paddingLeft: 10,
    marginRight: 10
  }
});
