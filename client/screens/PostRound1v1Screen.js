import React from 'react';
import { connect } from 'react-redux';
import { View, StyleSheet } from 'react-native';
import {
  Button,
  Footer,
  Card,
  Container,
  H1,
  H3,
  Text,
  Thumbnail
} from 'native-base';
// import { Col, Row, Grid } from 'react-native-easy-grid';
import { Stats, Logo, BarChartGrouped } from '../components';
import { fetchRound } from '../store/game';
import { getAverageWordLength, getPangrams } from './postRoundUtils'

function PostRound1v1Screen({ route, navigation, createUserRound, user }) {
  const opName = route.params.opponent.username;
  const opPhoto = route.params.opponent.photo;
  const opScore = route.params.opponent.score;

  const userName = user.username;
  const userPhoto = user.photo;
  const userScore = route.params.user.score;
  const userWords = route.params.user.words;
  const userPangrams = getPangrams(userWords);
  const userAverageWordLength = getAverageWordLength(userWords)

  return (
    <Container>
      <H1 style={styles.textCenter}>
        Game Over! You {opScore > userScore ? 'Lost!' : 'Won!'}
      </H1>
      <View style={styles.flexRow}>
        <View style={styles.colLarge}>
          {userPhoto ? (
            <Thumbnail center large source={{ uri: userPhoto }} />
          ) : (
            <Logo />
          )}
          <H3 style={styles.textCenter}>{userName}</H3>
        </View>
        <View style={styles.colSmall}>
          <Text style={styles.textCenter}>Vs</Text>
        </View>
        <View style={styles.colLarge}>
          {opPhoto ? (
            <Thumbnail center large source={{ uri: opPhoto }} />
          ) : (
            <Logo />
          )}
          <H3 style={styles.textCenter}>{opName}</H3>
        </View>
      </View>
      <View style={styles.flexRow}>
        <View style={styles.colMed}>
          <Text style={styles.textCenter}>{userScore}</Text>
          <Text style={styles.textCenter}>{userWords.length}</Text>
          <Text style={styles.textCenter}>{userPangrams.length}</Text>
          <Text style={styles.textCenter}>{userAverageWordLength}</Text>
        </View>
        <View style={styles.colMed}>
          <Text style={styles.textCenter}>Score</Text>
          <Text style={styles.textCenter}>Words Got</Text>
          <Text style={styles.textCenter}>Pangram #</Text>
          <Text style={styles.textCenter}>Avg Word Length</Text>
        </View>
        <View style={styles.colMed}>
          <Text style={styles.textCenter}>x,xxx</Text>
          <Text style={styles.textCenter}>xx</Text>
          <Text style={styles.textCenter}>x</Text>
          <Text style={styles.textCenter}>x,xxx</Text>
          <Text style={styles.textCenter}>x.x</Text>
        </View>
      </View>
      {/* <BarChartGrouped paddingTop={10} paddingLeft={30} /> */}
      <View style={styles.footer}>
        <Button
          block
          rounded
          marginTopL
          title="Play Again"
          onPress={() => {
            createUserRound(user.id);
            navigation.navigate('LobbyScreen');
          }}
        >
          <Text>Play Again</Text>
        </Button>

        <Button
          block
          bordered
          rounded
          marginTop
          title="Quit"
          onPress={() => navigation.navigate('PlayScreen')}
        >
          <Text>Quit</Text>
        </Button>
      </View>

      {/* <Card style={{ marginTop: 20 }}>
            <Stats stats={postRound} words={words} />
            <Stats stats={postRound} />
          </Card>

           */}
    </Container>
  );
}

const styles = StyleSheet.create({
  flexRow: {
    display: 'flex',
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: 'black',
    paddingBottom: 30,
    marginBottom: 30
  },
  colLarge: {
    flex: 5,
    display: 'flex'
  },
  colMed: {
    flex: 1
  },
  colSmall: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center'
  },
  fullWidth: {
    alignSelf: 'stretch',
    height: 40
  },
  footer: {
    alignSelf: 'stretch'
  },
  textCenter: {
    textAlign: 'center'
  },
  center: {
    alignSelf: 'stretch'
  }
});

const mapState = state => {
  return {
    user: state.user
  };
};

const mapDispatch = dispatch => {
  return {
    createUserRound: userId => dispatch(fetchRound(userId))
  };
};

export default connect(mapState, mapDispatch)(PostRound1v1Screen);
