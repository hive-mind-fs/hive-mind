import React, { Component } from 'react';
import { Button, StyleSheet, View } from 'react-native';
import { Container } from 'native-base';
import Hive from '../components/Hive';
import Input from '../components/Input';

// const wordsGot = ['this', 'team', 'is', 'poppin'];

//shuffling algorithm: https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle#The_modern_algorithm
const shuffle = arr => {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
};

export default class GameBoardScreen extends Component {
  state = {
    input: [],
    cl: 'A',
    letters: ['B', 'C', 'D', 'E', 'F', 'G']
  };

  render() {
    return (
      <Container
        style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
      >
        <Input inputLetters={this.state.input} />
        <Hive
          centerLetter={this.state.cl}
          otherLetters={this.state.letters}
          onLetterPress={letter => {
            let input = this.state.input;
            input.push(letter);
            this.setState(input);
          }}
        />
        <View style={styles.flexRow}>
          <Button title="Delete" onPress={() => input.pop()} />
          <Button title="Shuffle" onPress={() => {
            let letters = this.state.letters;
            letters = shuffle(letters);
            this.setState(letters);
            }} />
          <Button
            title="Enter"
            onPress={() => navigation.navigate('DashboardScreen')}
          />
        </View>
      </Container>
    );
  }
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
