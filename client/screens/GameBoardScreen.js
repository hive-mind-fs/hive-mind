import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Button, StyleSheet, View, Text } from 'react-native';
import { Container } from 'native-base';
import Hive from '../components/Hive';
import Input from '../components/Input';
import Error from '../components/Error';
import CorrectWords from '../components/CorrectWords';
import { savePracticeRound } from '../store';

import {
  shuffle,
  getScore,
  getRank,
  getInitialStateFromProps
} from './gameBoardController';

function GameBoardScreen(props) {
  const {
    cl,
    otherLetters,
    roundDict,
    roundDictObjs,
    panagramList,
    possiblePoints
  } = getInitialStateFromProps(props);

  [input, setInput] = useState([]);
  [correctWords, setCorrectWords] = useState([]);
  [lettersOrdering, setLettersOrdering] = useState(otherLetters);
  [score, setScore] = useState(0);
  [rank, setRank] = useState('Beginner');
  [error, setError] = useState([]);

  // a little more complicated
  [gameTimer, setGameTimer] = useState(10);
  [isActive, toggleActive] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      if (gameTimer > 0) {
        setGameTimer(gameTimer - 1)
        } else {
          let userWords = roundDictObjs.filter(word => correctWords.includes(word.word));
          console.log('userWORDS', userWords);
          props.savePracticeRound(props.practiceRound.id, score, userWords)
          props.navigation.navigate("PostRoundScreen")
        }
    }, 1000)
  }, [gameTimer])

  err = str => {
    setError([...error, str]);
  };

  handleDelete = () => {
    setInput(input.slice(0, input.length - 1));
  };
  handleShuffle = () => {
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
    if (word.length < 4) {
      err('Your word is too short');
    } else if (!word.includes(cl)) {
      err('Your word must contain the center letter.');
    } else if (correctWords.includes(word)) {
      err("You've already found this word");
    } else if (roundDict.includes(word)) {
      setCorrectWords([...correctWords, word]);
      // Score function
      setScore(score + getScore(word, panagramList));
    } else {
      err('Your word is not in our dictionary.');
    }

    setRank(getRank(score, possiblePoints));
  };

  let minutes = Math.floor(gameTimer / 60);
  let secondsCalc = gameTimer - minutes * 60;
  let seconds = secondsCalc <= 9 ? '0' + secondsCalc : secondsCalc;
  
  return (
    <Container style={styles.container}>
      <Text>
        Score: {score} Rank: {rank}  Timer: { minutes }:{ seconds }
        {/* Timer: { minutesAndSeconds } */}
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

const mapDispatch = dispatch => {
  return {
    savePracticeRound: (userRoundId, score, correctWords) =>
      dispatch(savePracticeRound(userRoundId, score, correctWords))
  };
};

export default connect(mapState, mapDispatch)(GameBoardScreen);
