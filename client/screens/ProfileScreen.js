import React, { useEffect, useState } from 'react';
import { StyleSheet, View, DatePickerIOSComponent } from 'react-native';
import {
  Button,
  Container,
  H1,
  Icon,
  Tab,
  Tabs,
  TabHeading,
  Text,
  Thumbnail
} from 'native-base';
import { connect } from 'react-redux';
import { Stats, Logo, BarChartStacked, BarChartGrouped } from '../components';
import { logout, getUserStats } from '../store';
import { getInitialStateFromProps } from './profileController';

const ProfileScreen = ({
  user,
  navigation,
  handleLogout,
  getUserStats,
  userRounds
}) => {
  // const [userStats, setUserStats] = useState(preGameTimer);
  let userTotalScore = '-';
  let userRoundsPlayed = '-';
  let userWordsGotten = '-';
  let userPointsGraphData = '-';

  getUserStats();

  // [userStats, setUserStats] = useState(getUserStats());
  // [userTotalScore, setUserTotalScore] = useState('-');
  // [userRoundsPlayed, setUserRoundsPlayed] = useState('-');
  // [userWordsGotten, setUserWordsGotten] = useState('-');
  // Reset timer when screen is loaded
  // useEffect(() => {
  //   getUserStats();

  //   setUserTotalScore(
  //     userRounds
  //       .map(userRound => userRound.score)
  //       .reduce((acc, curr) => acc + curr)
  //   );

  //   userRoundsPlayed = userRounds.length;

  //   userWordsGotten = userRounds
  //     .map(userRound => userRound.words.length)
  //     .reduce((acc, curr) => acc + curr);

  //   userPointsGraphData = userRounds.map(userRound => {
  //     return {
  //       label: userRound.round.letters,
  //       player: userRound.score,
  //       totalPossible: userRound.possiblePoints
  //     };
  //   });
  // });

  // const stats = [
  //   {
  //     title: 'Total Score',
  //     stat: `${userTotalScore}`
  //   },
  //   {
  //     title: 'Games Played',
  //     stat: `${userRoundsPlayed}`
  //   },
  //   {
  //     title: 'Words Gotten',
  //     stat: `${userWordsGotten}`
  //   }
  // ];

  const games = [
    {
      title: 'PANGRAM',
      stat: '234'
    },
    {
      title: 'LETTERS',
      stat: '341'
    },
    {
      title: 'STUFFING',
      stat: '34'
    }
  ];

  // console.log('USER GRAPH DATA', userPointsGraphData);

  return (
    <Container>
      <Button
        iconLeft
        transparent
        marginTopL
        title="Log Out"
        onPress={() => {
          console.log('attempting to logout');
          handleLogout();
          navigation.navigate('LandingScreen');
        }}
        style={{ marginLeft: 'auto' }}
      >
        {/* <Icon name="cog" /> */}
        <Text>Log Out</Text>
      </Button>
      {user.photo ? (
        <Thumbnail xlarge source={{ uri: user.photo }} />
      ) : (
        <Logo />
      )}
      <H1>{user.username ? user.username : 'You'}</H1>
      <Tabs style={styles.Tabs}>
        <Tab
          heading={
            <TabHeading>
              <Text>Stats</Text>
            </TabHeading>
          }
        >
          <View
          // onLayout={event => {
          //   var { x, y, width, height } = event.nativeEvent.layout;
          // }}
          >
            {/* <Stats stats={stats} /> */}
            {/* <BarChartStacked round="50" data={userPointsGraphData} /> */}
            {/* <BarChartGrouped width={320} round={1} unit="€" /> */}
          </View>
        </Tab>
        <Tab
          heading={
            <TabHeading>
              <Text>Game Log</Text>
            </TabHeading>
          }
        >
          <Stats stats={games} />
        </Tab>
      </Tabs>
    </Container>
  );
};

const styles = StyleSheet.create({
  Tabs: {
    marginTop: 30
  }
});

const mapState = state => {
  return {
    user: state.user,
    userRounds: state.game.userRounds
  };
};

const mapDispatch = dispatch => {
  return {
    handleLogout: () => dispatch(logout()),
    getUserStats: userId => dispatch(getUserStats(userId))
  };
};

export default connect(mapState, mapDispatch)(ProfileScreen);
