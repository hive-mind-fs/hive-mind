import React, { Component } from 'react';
import { Button, StyleSheet, View, Text } from 'react-native';
import { Container } from 'native-base';
import Hive from '../components/Hive';
import Input from '../components/Input';
import Error from '../components/Error';
import CorrectWords from '../components/CorrectWords';

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
    letters: ['B', 'C', 'D', 'E', 'F', 'G'],
    correctWords: [],
    error: []
  };

  render() {
    return (
      <Container
        style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
      >
        <Text>Correct Words:</Text>
        <CorrectWords words={this.state.correctWords} />
        <Error error={this.state.error} />
        <Input inputLetters={this.state.input} />
        <Hive
          centerLetter={this.state.cl}
          otherLetters={this.state.letters}
          onLetterPress={letter => {
            let error = this.state.error;
            error.length > 0 ? error.pop() : null;
            this.setState(error);
            let input = this.state.input;
            input.push(letter);
            this.setState(input);
          }}
        />
        <View style={styles.flexRow}>
          <Button
            title="Delete"
            onPress={() => {
              let input = this.state.input;
              input.pop();
              this.setState(input);
            }}
          />
          <Button
            title="Shuffle"
            onPress={() => {
              let letters = this.state.letters;
              letters = shuffle(letters);
              this.setState(letters);
            }}
          />
          <Button
            title="Enter"
            onPress={() => {
              let input = this.state.input;
              let correctWords = this.state.correctWords;
              if (input.length >= 4) {
                let word = [...input].join('');
                correctWords.length > 0 ? (word = ', ' + word) : null;
                correctWords.push(word);
                this.setState(correctWords);
                input.length = 0;
                this.setState(input);
              } else {
                input.length = 0;
                let error = this.state.error;
                error.push('your word is too short');
                this.setState(error);
              }
            }}
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
