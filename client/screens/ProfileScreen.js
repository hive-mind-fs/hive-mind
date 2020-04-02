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

const ProfileScreen = ({
  user,
  navigation,
  handleLogout,
  getUserStats,
  userStats
}) => {
  useEffect(() => {
    getUserStats(user.id);
  }, []);

  const stats = [
    {
      title: 'Total Score',
      stat: `${userStats.totalScore}`
    },
    {
      title: 'Games Played',
      stat: `${userStats.roundsPlayed}`
    },
    {
      title: 'Words Gotten',
      stat: `${userStats.wordsGotten}`
    }
  ];

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
            <Stats stats={stats} />
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
    userStats: state.game.userStats
  };
};

const mapDispatch = dispatch => {
  return {
    handleLogout: () => dispatch(logout()),
    getUserStats: userId => dispatch(getUserStats(userId))
  };
};

export default connect(mapState, mapDispatch)(ProfileScreen);
