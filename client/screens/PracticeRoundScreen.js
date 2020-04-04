import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, View, Modal, TouchableHighlight } from 'react-native';
import { Button, Container, Text, Icon, Content, Accordion } from 'native-base';
import Hive from '../components/Hive';
import CorrectWordsModal from '../components/CorrectWordsModal';
import Input from '../components/Input';
import Error from '../components/Error';
import CorrectWords from '../components/CorrectWords';
import { saveRound } from '../store';

import {
  shuffle,
  getScore,
  getRank,
  getInitialStateFromProps
} from './gameBoardController';

function PracticeRoundScreen(props) {
  const {
    cl,
    otherLetters,
    roundDict,
    roundDictObjs,
    pangramList,
    possiblePoints
  } = getInitialStateFromProps(props);

  const [input, setInput] = useState([]);
  const [correctWords, setCorrectWords] = useState([]);
  const [lettersOrdering, setLettersOrdering] = useState(otherLetters);
  const [score, setScore] = useState(0);
  const [rank, setRank] = useState('Beginner');
  const [error, setError] = useState([]);
  const [gameTimer, setGameTimer] = useState(30000);
  const [isActive, toggleActive] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      if (gameTimer > 0) {
        setGameTimer(gameTimer - 1);
      } else {
        let userWords = roundDictObjs.filter(word =>
          correctWords.includes(word.word)
        );
        props.saveRound(props.round.id, score, userWords);
        props.navigation.navigate('PostRoundScreen', {
          words: userWords,
          score: score
        });
      }
    }, 1000);
  }, [gameTimer]);

  const err = str => {
    setError([...error, str]);
  };

  const handleDelete = () => {
    setInput(input.slice(0, input.length - 1));
  };
  const handleShuffle = () => {
    setLettersOrdering(shuffle(lettersOrdering));
  };
  const handleLetterPress = letter => {
    setError(error.slice(0, error.length - 1));
    setInput([...input, letter]);
  };

  const handleEnter = () => {
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
      setCorrectWords([...correctWords, word.toUpperCase()]);
      // Score function
      setScore(score + getScore(word, pangramList));
    } else {
      err('Your word is not in our dictionary.');
    }

    setRank(getRank(score, possiblePoints));
  };

  let minutes = Math.floor(gameTimer / 60);
  let secondsCalc = gameTimer - minutes * 60;
  let seconds = secondsCalc <= 9 ? '0' + secondsCalc : secondsCalc;
  const correctWordsArray = [
    {
      title: "You've found " + correctWords.length + ' correct words',
      content: correctWords.join(' ')
    }
  ];

  return (
    <Container style={styles.container}>
      <View style={styles.topBar}>
        <Text style={styles.topBarItem}>
          <Icon classes={styles.topBarIcon} name="alarm" />
          {'  '}
          {minutes}:{seconds}
        </Text>
        <Text style={styles.topBarItem}>
          <Icon classes={styles.topBarIcon} name="trophy" />
          {'  '}
          {score}
        </Text>
        <Text style={styles.topBarItem}>
          <Icon classes={styles.topBarIcon} name="school" />
          {'  '}
          {rank}
        </Text>
      </View>
      <View style={styles.correctWordsCont}>
        <CorrectWordsModal
          correctWords={correctWords}
          correctWordsjoined={correctWords.join('   ')}
          correctWordsArray={correctWordsArray}
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
        />
      </View>
      <View style={styles.inputCont}>
        {input.map(i =>
          i === cl ? (
            <Text style={styles.yellow}>{i}</Text>
          ) : (
            <Text style={styles.black}>{i}</Text>
          )
        )}
        <Error error={error} />
      </View>
      <View style={styles.hive}>
        <Hive
          centerLetter={cl} // comes from redux now
          otherLetters={lettersOrdering}
          onLetterPress={letter => handleLetterPress(letter)}
        />
      </View>
      <View style={styles.bottom}>
        <Button
          style={styles.gameButtons}
          block
          bordered
          rounded
          large
          title="Delete"
          onPress={() => handleDelete()}
        >
          <Text>Delete</Text>
        </Button>
        <Button
          style={styles.gameButtons}
          block
          bordered
          rounded
          large
          title="Shuffle"
          onPress={() => handleShuffle()}
        >
          <Text>Shuffle</Text>
        </Button>
        <Button
          style={styles.gameButtons}
          block
          bordered
          rounded
          large
          title="Enter"
          onPress={() => handleEnter()}
        >
          <Text>Enter</Text>
        </Button>
      </View>
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column'
  },
  topBar: {
    width: '100%',
    flex: 1,
    marginTop: 15,
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'row'
  },
  topBarItem: {
    textAlign: 'center'
  },
  topBarIcon: {
    paddingRight: 15
  },
  correctWordsCont: {
    flex: 2,
    alignItems: 'center'
  },
  inputCont: {
    width: '100%',
    flex: 3,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center'
  },
  hive: {
    alignItems: 'center',
    flex: 10,
    width: '100%'
  },
  bottom: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    flex: 2
  },
  gameButtons: {
    flex: 1,
    marginLeft: 5,
    marginRight: 5
  },
  black: {
    textAlign: 'center',
    color: 'black',
    fontSize: 40
  },
  yellow: {
    textAlign: 'center',
    color: '#f8cd05',
    fontSize: 40
  }
});

const mapState = state => {
  return {
    round: state.game.round
  };
};

const mapDispatch = dispatch => {
  return {
    saveRound: (userRoundId, score, correctWords) =>
      dispatch(saveRound(userRoundId, score, correctWords))
  };
};

export default connect(mapState, mapDispatch)(PracticeRoundScreen);
