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
  constructor() {
    super();
    // HEY BOBBY, this is broken. it's using all the letters right now. We need to remove the core letter from teh set of letters returned from the database
  }

  state = {
    input: [],
    correctWords: [],
    lettersOrdering: this.otherLetters,
    score: 0,
    rank: 'Beginner',
    error: [],
    gameTimer: 300
  };

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
   err = () => {
    this.state.input.length = 0;
    this.setState(this.state.error);
  };

  render() {
    let minutes = Math.floor(this.state.gameTimer / 60);
    let secondsCalc = this.state.gameTimer - minutes * 60;
    let seconds = secondsCalc <= 9 ? '0' + secondsCalc : secondsCalc;

    let otherLetters = this.props.practiceRound.round.letters.split(''); // subtract core letter
    let cl = this.props.practiceRound.round.coreLetter;
    let roundDict = this.props.practiceRound.round.words.map(word => word.word);
    let panagramList = ['HUNCHBACK']; // HEY BOBBY, this can be derived from word dict

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
                error.push('Your word is too short');
                this.err();
              }
              // Correct word logic
              else if (!word.includes(cl)) {
                error.push('Your word must contain the center letter.');
                this.err();
              } else if (correctWords.includes(word)) {
                error.push('Youve already found this word');
                this.err();
              } else if (input.length >= 4 && roundDict.indexOf(word) > -1) {
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
                error.push('Your word is not in our dictionary.');
                this.err();
              }
              //Ranking Logic
              // Convert round dictionary into array of points for each word
              const possiblePoints = roundDict
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
