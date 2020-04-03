import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import {
  Button,
  Container,
  H1,
  Tab,
  Tabs,
  TabHeading,
  Text,
  Thumbnail
} from 'native-base';
import { connect } from 'react-redux';
import { Stats, Logo, BarChartStacked, BarChartGrouped } from '../components';
import { logout, getUserStats, getUser } from '../store';

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
      title: 'Total Points',
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

  return (
    <Container>
      <Button
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
        <Thumbnail center large source={{ uri: user.photo }} />
      ) : (
        <Logo />
      )}
      <H1 marginT20 center>
        {user.username ? user.username : 'You'}
      </H1>
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
            {userStats.roundsPlayed >= 7 && (
              <BarChartStacked round="250" data={userStats.graphPoints} />
            )}
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
          {userStats.roundsPlayed > 0 ? (
            <Stats
              stats={userStats.graphPoints}
              header={['LETTERS', 'SCORE']}
            />
          ) : (
            <Text center marginT20>
              You haven't played any games yet!
            </Text>
          )}
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
