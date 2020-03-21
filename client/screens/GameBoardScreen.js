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
    panagramList: ['HUNCHBACK'],
    roundDict: [
      'ABACA',
      'ABACK',
      'ABAKA',
      'ABBA',
      'ANKH',
      'ANNA',
      'AUCUBA',
      'BABA',
      'BABKA',
      'BABU',
      'BACCA',
      'BACH',
      'BACK',
      'BANANA',
      'BANK',
      'BUBBA',
      'BUNA',
      'CABANA',
      'CACA',
      'CACHUCHA',
      'CANCAN',
      'CANCHA',
      'CANNA',
      'CHABUK',
      'CHACHKA',
      'CHUKKA',
      'HABU',
      'HACK',
      'HAHA',
      'HAKU',
      'HANK',
      'HAUNCH',
      'HUCKABACK',
      'HUNCHBACK',
      'KABAB',
      'KABAKA',
      'KAHUNA',
      'KAKA',
      'KANA',
      'KANAKA',
      'KANBAN',
      'KHAN',
      'KNACK',
      'KUNA',
      'NAAN',
      'NANA',
      'NUCHA',
      'NUNCHAKU',
      'UNAU',
      'UNBAN'
    ],
    correctWords: [],
    score: 0,
    rank: 'Beginner',
    rankings: [
      'Beginner',
      'Good Start',
      'Moving Up',
      'Good',
      'Solid',
      'Nice',
      'Great',
      'Amazing',
      'Genius'
    ],
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

  render() {
    let minutes = Math.floor(this.state.gameTimer / 60);
    let secondsCalc = this.state.gameTimer - minutes * 60;
    let seconds = secondsCalc <= 9 ? '0' + secondsCalc : secondsCalc;

    return (
      <Container
        style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
      >
        <Text>{ this.state.gameTimer === 0 ? 'Round Over!' : `Time: ${minutes}:${seconds}`}</Text>
        <Text>
          Score: {this.state.score} Rank: {this.state.rank}
        </Text>
        <Text>
          You've found {this.state.correctWords.length} correct Words:
        </Text>
        <CorrectWords words={this.state.correctWords} />
        <Text>
          {this.state.gameTimer === 0
            ? 'Round Over!'
            : `Time: ${minutes}:${seconds}`}
        </Text>
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
              let rank = this.state.rank;
              let rankings = this.state.rankings;
              let panagramList = this.state.panagramList;
              let wordLength = [...input].length;
              let word = [...input].join('');

              //Clear error message everytime enter is pressed
              error.length > 0 ? error.pop() : null;
              this.setState(error);

              // Too short word logic
              if (input.length < 4) {
                input.length = 0;
                error.push('Your word is too short');
                this.setState(error);
              }
              // Correct word logic
              else if(!word.includes(this.state.cl)){
                input.length = 0;
                error.push('Your word must contain the center letter.');
                this.setState(error);
              }
              else if(correctWords.includes(word)){
                input.length = 0;
                error.push('Youve already found this word');
                this.setState(error);
              }
              else if (input.length >= 4 && roundDict.indexOf(word) > -1) {
                correctWords.length > 0 ? (word = ', ' + word) : null;
                correctWords.push(word);
                this.setState(correctWords);

                //Scoring Logic
                wordLength === 4
                  ? this.setState({ score: (score += wordLength - 3) })
                  : panagramList.indexOf(word) > -1 && wordLength > 4
                  ? this.setState({ score: (score += wordLength + 7) })
                  : this.setState({ score: (score += wordLength) });

                input.length = 0;
                this.setState(input);
              }
              // Incorect word logic
              else {
                input.length = 0;
                error.push('your word is not in our dictionary');
                this.setState(error);
              }
              //Ranking Logic
              // Convert round dictionary into array of points for each word
              const possiblePoints = roundDict
                .map(i =>
                  i.length === 4
                    ? 1
                    : panagramList.indexOf(i) > -1
                    ? i.length + 7
                    : i.length
                )
                .reduce((a, b) => a + b, 0);

              //Change ranking
              let x = 0;
              let shareOfTotal = (score / possiblePoints) * 100;
              shareOfTotal < 2.5
                ? (x = 0)
                : shareOfTotal > 2.5 && shareOfTotal < 5
                ? (x = 1)
                : shareOfTotal > 5 && shareOfTotal < 10
                ? (x = 2)
                : shareOfTotal > 10 && shareOfTotal < 15
                ? (x = 3)
                : shareOfTotal > 15 && shareOfTotal < 25
                ? (x = 4)
                : shareOfTotal > 25 && shareOfTotal < 40
                ? (x = 5)
                : shareOfTotal > 40 && shareOfTotal < 55
                ? (x = 6)
                : shareOfTotal > 55 && shareOfTotal < 75
                ? (x = 7)
                : shareOfTotal > 75
                ? (x = 8)
                : null;

              this.setState({ rank: rankings[x] });
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
