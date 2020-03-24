import React, { useState, Component } from 'react';
import { connect } from 'react-redux';
import { Button, StyleSheet, View, Text } from 'react-native';
import { Container } from 'native-base';
import Hive from '../components/Hive';
import Input from '../components/Input';
import Error from '../components/Error';
import CorrectWords from '../components/CorrectWords';
import { shallowEqual } from '@babel/types';

import {
  shuffle,
  ranker,
  getScore,
  getPossiblePoints,
  getRank,
  getMinutesAndSeconds
} from './gameBoardController';

function GameBoardScreen(props) {
  const cl = props.practiceRound.round.coreLetter;
  const otherLetters = props.practiceRound.round.letters
    .replace(cl, '')
    .split(''); // subtract core letter
  const roundDict = props.practiceRound.round.words.map(word => word.word);
  const panagramList = ['HUNCHBACK']; // HEY BOBBY, this can be derived from word dict
  const possiblePoints = getPossiblePoints(roundDict, panagramList);

  [input, setInput] = useState([]);
  [correctWords, setCorrectWords] = useState([]);
  [lettersOrdering, setLettersOrdering] = useState(otherLetters);
  [score, setScore] = useState(0);
  [rank, setRank] = useState('Beginner');
  [error, setError] = useState([]);

  // a little more complicated
  [gameTimer, setGameTime] = useState(300);
  [isActive, toggleActive] = useState(true);
  [minutesAndSeconds, setMinutesAndSeconds] = useState(
    getMinutesAndSeconds(300)
  );

  // chose to fire only when this.state.gameTimer has changed
  // gameOver, when that has changed then fire this effect
  // update game timer?
  // update minutes and seconds?
  // useEffect(() => {
  //   if (this.state.gameTimer > 0) {
  //     // Update gameTimer state
  //     setTimeout(() => {
  //       this.setState({ gameTimer: this.state.gameTimer - 1 });
  //       this.tick();
  //     }, 1000);
  //   } else {
  //     // Redirect to PostRound
  //     setTimeout(() => {
  //       this.props.navigation.navigate('PostRoundScreen');
  //     }, 1000);
  //   }
  // }, [gameTimer]);

  // to do, come back here
  //error function
  err = str => {
    setError([...error, str]);
  };

  handleDelete = () => {
    // can't mutate state, need to copy
    setInput(input.slice(0, input.length - 1));
  };

  handleShuffle = () => {
    // make sure shuffle is making a copy of the array
    setLettersOrdering(shuffle(lettersOrdering));
  };

  handleLetterPress = letter => {
    setError(error.slice(0, error.length - 1));
    setInput([...input, letter]);
  };

  handleEnter = () => {
    let word = input.join('');
    // Clear input
    setInput([]);

    //Clear error message everytime enter is pressed
    setError(error.slice(0, error.length - 1));

    // Too short word logic
    if (word.length < 4) {
      err('Your word is too short');
    } else if (!word.includes(cl)) {
      err('Your word must contain the center letter.');
    } else if (correctWords.includes(word)) {
      err('Youve already found this word');
    } else if (roundDict.includes(word)) {
      setCorrectWords([...correctWords, word]);

      // Score function
      setScore(getScore(word, panagramList));
    }
    // Incorect word logic
    else {
      err('Your word is not in our dictionary.');
    }

    setRank(getRank(score, possiblePoints));
  };

  return (
    <Container style={styles.container}>
      <Text>
        Score: {score} Rank: {rank}
      </Text>
      <Text>You've found {correctWords.length} correct Words:</Text>
      <CorrectWords words={correctWords.join(', ')} />
      <Error error={error} />
      <Input inputLetters={input} />
      <Hive
        centerLetter={cl} // comes from redux now
        otherLetters={lettersOrdering} // comes from redux now
        onLetterPress={letter => handleLetterPress(letter)}
      />
      <View style={styles.flexRow}>
        <Button title="Delete" onPress={() => handleDelete()} />
        <Button title="Shuffle" onPress={() => handleShuffle()} />
        <Button title="Enter" onPress={() => handleEnter()} />
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
