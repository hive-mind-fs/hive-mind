import React from 'react';
import { Button, Text, StyleSheet, View } from 'react-native';
import { Body, Card, CardItem, Container, Left, Right } from 'native-base';
import Hive from '../components/Hive';
import Input from '../components/Input';

const wordsGot = ['this', 'team', 'is', 'poppin'];
const letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g'];
const input = ['a'];

export default function GameBoardScreen({ navigation }) {
  return (
    <Container
      style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
    >
    <Input inputLetters={input} />
      <Hive
        centerLetter="A"
        otherLetters={['B', 'C', 'D', 'E', 'F', 'G']}
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
          onPress={() => navigation.navigate('DashboardScreen')}
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
