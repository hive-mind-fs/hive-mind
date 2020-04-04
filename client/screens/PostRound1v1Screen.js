import React from 'react';
import { connect } from 'react-redux';
import { View, StyleSheet } from 'react-native';
import { Button, Footer, Card, Container, H1, H3, Text } from 'native-base';
// import { Col, Row, Grid } from 'react-native-easy-grid';
import { Stats, Logo, BarChartGrouped } from '../components';
import { fetchPracticeRound } from '../store/game';

function PostRound1v1Screen({ route, navigation, createUserRound, user }) {
  //   const words = route.params.words;
  //   const score = route.params.score;

  const postRound = [
    {
      title: 'Total Score',
      //   stat: `${score}`
      stat: 134
    },
    {
      title: 'Words Got',
      //   stat: `${words.length}`
      stat: 13
    }
  ];

  return (
    <Container>
      <H1 style={styles.textCenter}>Game Over!</H1>
      <View style={styles.flexRow}>
        <View style={styles.colLarge}>
          <Logo style={styles.center} />
          <H3 style={styles.textCenter}>Username</H3>
          <Text style={styles.textCenter}>23-4-5</Text>
        </View>
        <View style={styles.colSmall}>
          <Text style={styles.textCenter}>Vs</Text>
        </View>
        <View style={styles.colLarge}>
          <Logo />
          <H3 style={styles.textCenter}>Username</H3>
          <Text style={styles.textCenter}>1-2-0</Text>
        </View>
      </View>
      <View style={styles.flexRow}>
        <View style={styles.colMed}>
          <Text style={styles.textCenter}>x,xxx</Text>
          <Text style={styles.textCenter}>xx</Text>
          <Text style={styles.textCenter}>x</Text>
          <Text style={styles.textCenter}>x,xxx</Text>
          <Text style={styles.textCenter}>x.x</Text>
        </View>
        <View style={styles.colMed}>
          <Text style={styles.textCenter}>Score</Text>
          <Text style={styles.textCenter}>Words Got</Text>
          <Text style={styles.textCenter}>Pangrams</Text>
          <Text style={styles.textCenter}>Rank</Text>
          <Text style={styles.textCenter}>Avg Word</Text>
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
    createUserRound: userId => dispatch(fetchPracticeRound(userId))
  };
};

export default connect(mapState, mapDispatch)(PostRound1v1Screen);
