import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, View } from 'react-native';
import {
  Button,
  Container,
  Text,
  Icon,
  Thumbnail,
  Content,
  Accordion
} from 'native-base';
import Hive from '../components/Hive';
import Input from '../components/Input';
import Error from '../components/Error';
import CorrectWords from '../components/CorrectWords';
import CorrectWordsModal from '../components/CorrectWordsModal';
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

  const gameDuration = 20;

  const [input, setInput] = useState([]);
  const [correctWords, setCorrectWords] = useState([]);
  const [lettersOrdering, setLettersOrdering] = useState(otherLetters);
  const [score, setScore] = useState(0);
  const [rank, setRank] = useState('Beginner');
  const [opScore, setOpScore] = useState(0);

  // refactor this
  const [opName, setOpName] = useState('');
  const [opPhoto, setOpPhoto] = useState('');
  const [gotOp, setGotOp] = useState(false);
  const [opId, setOpId] = useState('');
  const [opWords, setOpWords] = useState([])

  const [error, setError] = useState([]);
  const [gameTimer, setGameTimer] = useState(gameDuration);
  const [modalVisible, setModalVisible] = useState(false);
  const [gameStart, setGameStart] = useState(true);

  // Reset timer when screen is reloaded
  useEffect(() => {
    const unsubscribe = props.navigation.addListener('focus', () => {
      setGameTimer(gameDuration);
    });
    return unsubscribe;
  }, [props.navigation]);

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
      score: score,
      words: JSON.stringify(correctWords)
    });

    socket.on('ops score changed', function(data) {
      setOpScore(data.score);
      setOpWords(JSON.parse(data.words));
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
        )
        props.saveRound(props.round.id, score, userWords, opId);
        props.navigation.navigate('PostRound1v1Screen', {
          user: {
            words: correctWords,
            score: score
          },
          opponent: {
            username: opName,
            photo: opPhoto,
            score: opScore,
            words: opWords
          }
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
      setCorrectWords([...correctWords, word]);
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

  const correctWordsArray = [
    {
      title: "You've found " + correctWords.length + ' correct words',
      content: correctWords.join('   ')
    }
  ];

  return (
    <Container style={styles.container}>
      <View style={styles.topBar}>
        <Thumbnail
          style={styles.topBarPhoto}
          center
          large
          source={{ uri: profPic }}
        />
        <View style={styles.topBarUserInfo}>
          <Text style={styles.topBarScore}>{score}</Text>
          <Text style={styles.userName}>
            {props.user.username.length > 0 && props.user.username.length > 6
              ? props.user.username.slice(0, 4) + '...'
              : props.user.username}
          </Text>
        </View>
        <View style={styles.topBarClock}>
          <Icon classes={styles.topBarIcon} name="alarm" />
          <Text style={styles.topBarItem}>
            {minutes}:{seconds}
          </Text>
        </View>
        <Thumbnail
          style={styles.topBarPhoto}
          center
          large
          source={{ uri: opProfPic }}
        />
        <View style={styles.topBarUserInfo}>
          <Text style={styles.topBarScore}>{opScore}</Text>
          <Text style={styles.opName}>
            {opName.length === 0 && loading}
            {opName.length > 0 && opName.length > 7
              ? opName.slice(0, 5) + '...'
              : opName}
          </Text>
        </View>
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
      <Hive
        style={styles.hive}
        centerLetter={cl}
        otherLetters={lettersOrdering}
        onLetterPress={letter => handleLetterPress(letter)}
      />
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
  topBarUserInfo: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'center',
    justifyContent: 'center',
    margin: 1
  },
  userName: {
    flex: 1,
    flexDirection: 'column',
    textAlign: 'center',
    justifyContent: 'flex-start'
  },
  opName: {
    flex: 1,
    flexDirection: 'column',
    textAlign: 'center',
    justifyContent: 'flex-start'
  },
  topBarScore: {
    flex: 1,
    flexDirection: 'column',
    textAlign: 'center',
    justifyContent: 'flex-end'
  },
  topBarClock: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    justifyContent: 'flex-start',
    flex: 2
  },
  topBarIcon: {
    flex: 1
  },
  topBarPhoto: {
    paddingRight: 15,
    width: 50,
    height: 50
  },
  correctWordsCont: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'flex-end'
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
    marginTop: 20,
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
