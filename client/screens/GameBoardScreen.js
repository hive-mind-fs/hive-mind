import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, StyleSheet, View, Text } from 'react-native';
import { Container } from 'native-base';
import Hive from '../components/Hive';
import Input from '../components/Input';
import Error from '../components/Error';
import CorrectWords from '../components/CorrectWords';
import { shallowEqual } from '@babel/types';

import { shuffle, ranker } from './gameBoardController';

class GameBoardScreen extends Component {
  constructor(props) {
    super(props);
    this.cl = props.practiceRound.round.coreLetter;
    this.otherLetters = props.practiceRound.round.letters
      .replace(this.cl, '')
      .split(''); // subtract core letter
    this.roundDict = props.practiceRound.round.words.map(word => word.word);
    this.panagramList = ['HUNCHBACK']; // HEY BOBBY, this can be derived from word dict

    this.state = {
      input: [],
      correctWords: [],
      lettersOrdering: this.otherLetters,
      score: 0,
      rank: 'Beginner',
      error: [],
      gameTimer: 300
    };
  }

  componentDidMount() {
    this.tick();
  }

  tick = () => {
    if (this.state.gameTimer > 0) {
      // Update gameTimer state
      setTimeout(() => {
        this.setState({ gameTimer: this.state.gameTimer - 1 });
        this.tick();
      }, 1000);
    } else {
      // Redirect to PostRound
      setTimeout(() => {
        this.props.navigation.navigate('PostRoundScreen');
      }, 1000);
    }
  };

  //error function
  err = str => {
    this.state.input.length = 0;
    this.state.error.push(str);
    this.setState(this.state.error);
  };

  render() {
    let minutes = Math.floor(this.state.gameTimer / 60);
    let secondsCalc = this.state.gameTimer - minutes * 60;
    let seconds = secondsCalc <= 9 ? '0' + secondsCalc : secondsCalc;

    return (
      <Container style={styles.container}>
        <Text>
          {this.state.gameTimer === 0
            ? 'Round Over!'
            : `Time: ${minutes}:${seconds}`}
        </Text>
        <Text>
          Score: {this.state.score} Rank: {this.state.rank}
        </Text>
        <Text>
          You've found {this.state.correctWords.length} correct Words:
        </Text>
        <CorrectWords words={this.state.correctWords} />
        {/* <Text>
          {this.state.gameTimer === 0
            ? 'Round Over!'
            : `Time: ${minutes}:${seconds}`}
        </Text> */}
        <Error error={this.state.error} />
        <Input inputLetters={this.state.input} />
        <Hive
          centerLetter={this.cl} // comes from redux now
          otherLetters={this.otherLetters} // comes from redux now
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
              let lettersOrdering = this.state.lettersOrdering;
              lettersOrdering = shuffle(lettersOrdering);
              this.setState(lettersOrdering);
            }}
          />
          <Button
            title="Enter"
            onPress={() => {
              let input = this.state.input;
              let correctWords = this.state.correctWords;
              let error = this.state.error;
              let score = this.state.score;
              let rank = this.state.rank;
              let wordLength = [...input].length;
              let word = [...input].join('');

              //Clear error message everytime enter is pressed
              error.length > 0 ? error.pop() : null;
              this.setState(error);

              // Too short word logic
              if (input.length < 4) {
                this.err('Your word is too short');
              }
              // Correct word logic
              else if (!word.includes(this.cl)) {
                this.err('Your word must contain the center letter.');
              } else if (correctWords.includes(word)) {
                this.err('Youve already found this word');
              } else if (
                input.length >= 4 &&
                this.roundDict.indexOf(word) > -1
              ) {
                correctWords.length > 0 ? (word = ', ' + word) : null;
                correctWords.push(word);
                this.setState(correctWords);

                //Scoring Logic
                wordLength === 4
                  ? this.setState({ score: (score += wordLength - 3) })
                  : this.panagramList.indexOf(word) > -1 && wordLength > 4
                  ? this.setState({ score: (score += wordLength + 7) })
                  : this.setState({ score: (score += wordLength) });

                input.length = 0;
                this.setState(input);
              }
              // Incorect word logic
              else {
                this.err('Your word is not in our dictionary.');
              }
              //Ranking Logic
              // Convert round dictionary into array of points for each word
              const possiblePoints = this.roundDict
                .map(i =>
                  i.length === 4
                    ? 1
                    : this.panagramList.indexOf(i) > -1
                    ? i.length + 7
                    : i.length
                )
                .reduce((a, b) => a + b, 0);

              this.setState({ rank: RANKINGS[ranker(n)] });
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
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});

const mapState = state => {
  return {
    practiceRound: state.game.practiceRound
  };
};

export default connect(mapState, null)(GameBoardScreen);
