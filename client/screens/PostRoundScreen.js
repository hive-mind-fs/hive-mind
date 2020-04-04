import React from 'react';
import { connect } from 'react-redux';
import { View, StyleSheet } from 'react-native';
import {
  Button,
  Content,
  Container,
  H1,
  Text,
  Tabs,
  Tab,
  TabHeading
} from 'native-base';
import { Stats, Logo } from '../components';
import { fetchRound } from '../store/game';

function PostRoundScreen({ route, navigation, createUserRound, user }) {
  const words = route.params.words;
  const score = route.params.score;

  return (
    <Container>
      <Logo />
      <H1>Round Over</H1>
      <View style={styles.flexRow}></View>

      <View style={styles.flexRow}>
        <View style={styles.halves}>
          <Text style={styles.left}>Score</Text>
          <Text style={styles.left}>Words Got</Text>
          <Text style={styles.left}>Avg Word Length</Text>
        </View>
        <View style={styles.halves}>
          <Text style={styles.right}>{score}</Text>
          <Text style={styles.right}>{words.length}</Text>
          <Text style={styles.right}>x</Text>
        </View>
      </View>

      <Button
        block
        rounded
        title="Play Again"
        onPress={() => {
          createUserRound(user.id);
          navigation.navigate('HomeScreen', { screen: 'CountdownScreen' });
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
    </Container>
  );
}

const styles = StyleSheet.create({
  flexRow: {
    display: 'flex',
    alignSelf: 'stretch',
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: 'black',
    paddingBottom: 30,
    marginBottom: 30
    // backgroundColor: 'black'
  },
  halves: {
    flex: 1
  },
  left: {
    marginRight: 10,
    textAlign: 'right'
  },
  right: {
    marginLeft: 10,
    textAlign: 'left'
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

export default connect(mapState, mapDispatch)(PostRoundScreen);
