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
    letters: ['B', 'C', 'H', 'K', 'N', 'U'],
    cl: 'A',
    panagramList: ["HUNCHBACK"],
    roundDict: ['ABACA', 'ABACK', 'ABAKA', 'ABBA', 'ANKH', 'ANNA', 'AUCUBA', 'BABA', 'BABKA', 'BABU', 'BACCA', 'BACH', 'BACK', 'BANANA', 'BANK', 'BUBBA', 'BUNA', 'CABANA', 'CACA', 'CACHUCHA', 'CANCAN', 'CANCHA', 'CANNA', 'CHABUK', 'CHACHKA', 'CHUKKA', 'HABU', 'HACK', 'HAHA', 'HAKU', 'HANK', 'HAUNCH', 'HUCKABACK', 'HUNCHBACK', 'KABAB', 'KABAKA', 'KAHUNA', 'KAKA', 'KANA', 'KANAKA', 'KANBAN', 'KHAN', 'KNACK', 'KUNA', 'NAAN', 'NANA', 'NUCHA', 'NUNCHAKU', 'UNAU', 'UNBAN'],
    correctWords: [],
    score: 0,
    error: []
  };

  render() {
    return (
      <Container
        style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
      >
        <Text>Score: {this.state.score}</Text>
        <Text>You've found {this.state.correctWords.length} correct Words:</Text>
        <CorrectWords  words={this.state.correctWords} />
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
              let roundDict = this.state.roundDict;
              let correctWords = this.state.correctWords;
              let error = this.state.error;
              let score = this.state.score;
              let panagramList = this.state.panagramList;
              let wordLength = [...input].length;
              let word = [...input].join('');
              if (input.length < 4) {
                input.length = 0;
                error.push('your word is too short');
                this.setState(error);
              } else if ( (input.length >= 4) && (roundDict.indexOf(word) > -1) ) {
                correctWords.length > 0 ? (word = ', ' + word) : null;
                correctWords.push(word);
                this.setState(correctWords);
                wordLength === 4 ? this.setState({score: score += (wordLength - 3)}) : ((panagramList.indexOf(word) > -1) && (wordLength > 4)) ? this.setState({score: score += (wordLength + 7)}) : this.setState({score: score += wordLength});
                input.length = 0;
                this.setState(input);
              } else {
                input.length = 0;
                error.push('your word is not in our dictionary');
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
