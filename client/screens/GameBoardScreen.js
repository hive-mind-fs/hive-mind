import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, View } from 'react-native';
import { Button, Container, Text, Icon, Thumbnail } from 'native-base';
import Hive from '../components/Hive';
import Input from '../components/Input';
import Error from '../components/Error';
import CorrectWords from '../components/CorrectWords';
import { saveRound } from '../store';
import socket from '../socket';

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
    pangramList,
    possiblePoints
  } = getInitialStateFromProps(props);

  const [input, setInput] = useState([]);
  const [correctWords, setCorrectWords] = useState([]);
  const [lettersOrdering, setLettersOrdering] = useState(otherLetters);
  const [score, setScore] = useState(0);
  const [opScore, setOpScore] = useState(0);
  const [rank, setRank] = useState('Beginner');
  const [error, setError] = useState([]);
  const [gameTimer, setGameTimer] = useState(300);
  const [isActive, toggleActive] = useState(true);
  const [gameStart, setGameStart] = useState(true);
  const [opName, setOpName] = useState('');
  const [opPhoto, setOpPhoto] = useState('');
  const [gotOp, setGotOp] = useState(false);
  const [opId, setOpId] = useState('');

  //runs once on component did mount
  useEffect(() => {
    if (gameStart) {
      socket.emit('game start', {
        user: props.user,
        username: props.user.username,
        photo: props.user.photo,
        room: props.room,
        id: props.user.id
      });
    }
  });

  useEffect(() => {
    if (!gotOp) {
      socket.on('opponent', function(data) {
        if (data.username !== props.user.username) {
          let username = data.username;
          let photo = data.photo;
          let id = data.id;
          setOpId(id);
          setOpName(username);
          setOpPhoto(photo);
          setGotOp(true);
        }
      });
    }
  }, [gotOp]);

  useEffect(() => {
    socket.emit('my score changed', {
      room: props.room,
      score: score
    });

    socket.on('ops score changed', function(data) {
      console.log('this is your oponents score', data.score);
      setOpScore(data.score);
      console.log('this is the score on state:', opScore);
    });
  }, [score]);
  //Runs everytime the score changes

  useEffect(() => {
    setTimeout(() => {
      if (gameTimer > 0) {
        setGameTimer(gameTimer - 1);
      } else {
        let userWords = roundDictObjs.filter(word =>
          correctWords.includes(word.word)
        );
        props.saveRound(props.round.id, score, userWords, opId);
        props.navigation.navigate('PostRoundScreen', {
          words: userWords,
          score: score
        });
      }
    }, 1000);
  }, [gameTimer]);

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
    let word = input.join('').toLowerCase();
    // Clear input
    setInput([]);
    //Clear error message everytime enter is pressed
    setError(error.slice(0, error.length - 1));
    if (word.length < 4) {
      err('Your word is too short');
    } else if (!word.includes(cl.toLowerCase())) {
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

  let profPic = props.user.photo + '.jpg';
  let opProfPic = opPhoto + '.jpg';
  let loading = 'Loading...';

  return (
    <Container style={styles.container}>
      <View style={styles.topBar}>
        <Thumbnail center large source={{ uri: profPic }} />
        <Text style={styles.topBarItem}>
          {score + ' '}
          {props.user.username}
        </Text>
        <Text style={styles.topBarItem}>
          <Icon classes={styles.topBarIcon} name="alarm" />
          {'  '}
          {minutes}:{seconds}
        </Text>
        <Thumbnail center large source={{ uri: opProfPic }} />
        <Text style={styles.topBarItem}>
          {opScore + ' '}
          {opName.length === 0 && loading}
          {opName.length > 0 && opName}
        </Text>
      </View>
      <View style={styles.correctWordsCont}>
        <Text marginT10>You've found {correctWords.length} correct words</Text>
        <CorrectWords words={correctWords.join('   ')} />
      </View>
      <View style={styles.inputCont}>
        <Input style={styles.textCenter} inputLetters={input} />
        <Error error={error} />
      </View>
      <Hive
        style={styles.gameBoard}
        centerLetter={cl} // comes from redux now
        otherLetters={lettersOrdering}
        onLetterPress={letter => handleLetterPress(letter)}
      />
      <View style={styles.flexRow}>
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
  topBar: {
    position: 'absolute',
    top: 70,
    // flex: 2,
    display: 'flex',
    justifyContent: 'space-around',
    flexDirection: 'row'
  },
  topBarItem: {
    flex: 1,
    textAlign: 'center'
  },
  topBarIcon: {
    paddingRight: 15
  },
  topBarPhoto: {
    paddingRight: 15,
    width: 10,
    height: 10,
    borderRadius: 50
  },
  correctWordsCont: {
    // flex: 1
    // width: 100
    position: 'absolute',
    top: 130,
    alignItems: 'center'
  },
  inputCont: {
    // flex: 4,
    position: 'absolute',
    top: 200
  },
  gameBoard: {
    alignItems: 'center',
    justifyContent: 'center',
    // flex: 5,
    position: 'absolute',
    bottom: 200
  },
  flexRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    position: 'absolute',
    bottom: 40
    // flex: 1
  },
  gameButtons: {
    flex: 1,
    marginLeft: 5,
    marginRight: 5
  },
  textCenter: {
    textAlign: 'center'
  }
});

const mapState = state => {
  return {
    round: state.game.round,
    user: state.user,
    room: state.game.room
  };
};

const mapDispatch = dispatch => {
  return {
    saveRound: (userRoundId, score, correctWords, opId) =>
      dispatch(saveRound(userRoundId, score, correctWords, opId))
  };
};

export default connect(mapState, mapDispatch)(GameBoardScreen);
