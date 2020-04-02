import React, { useEffect } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import {
  Container,
  H1,
  Tab,
  Tabs,
  TabHeading,
  Text,
  List,
  ListItem,
  Left,
  Body,
  Right,
  Thumbnail
} from 'native-base';
import { connect } from 'react-redux';
// import { Stats } from '../components';
import { getLeaderboard } from '../store';

const LeaderboardScreen = ({ navigation, getLeaderboard, leaderboard }) => {
  useEffect(() => {
    getLeaderboard();
  }, []);

  // const stats = [
  //   {
  //     userId: '1',
  //     title: 'Total Score',
  //     stat: '1,234'
  //   },
  //   {
  //     userId: '2',
  //     title: 'Games Played',
  //     stat: '34'
  //   },
  //   {
  //     userId: '3',
  //     title: 'Words Gotten',
  //     stat: '334'
  //   },
  //   {
  //     userId: '4',
  //     title: 'Total Score2',
  //     stat: '34'
  //   },
  //   {
  //     userId: '5',
  //     title: 'Games Played',
  //     stat: '4'
  //   },
  //   {
  //     userId: '6',
  //     title: 'Words Gotten',
  //     stat: '1'
  //   }
  // ];

  const list =
    leaderboard.length > 0 ? (
      <FlatList
        data={leaderboard}
        keyExtractor={(item, idx) => item + idx}
        renderItem={({ item }) => (
          <ListItem avatar>
            <Left>
              <Thumbnail small source={{ uri: `${item.photo}` }} />
            </Left>
            <Body>
              <Text>{item.username}</Text>
            </Body>
            <Right>
              <Text>{item.totalScore}</Text>
            </Right>
          </ListItem>
        )}
      />
    ) : (
      <Text center marginT20>
        Loading...
      </Text>
    );
  return (
    <Container>
      <Text style={styles.Logo} />
      <H1>Leaderboard</H1>
      <Tabs style={styles.Tabs}>
        <Tab
          heading={
            <TabHeading>
              <Text>Today</Text>
            </TabHeading>
          }
        >
          {list}
        </Tab>
        <Tab
          heading={
            <TabHeading>
              <Text>This Week</Text>
            </TabHeading>
          }
        >
          {list}
        </Tab>
        <Tab
          heading={
            <TabHeading>
              <Text>All-Time</Text>
            </TabHeading>
          }
        >
          {list}
        </Tab>
      </Tabs>
    </Container>
  );
};

const styles = StyleSheet.create({
  Logo: {
    marginTop: 60
  },
  Tabs: {
    marginTop: 30
  }
});

const mapState = state => {
  return {
    user: state.user,
    leaderboard: state.game.leaderboard
  };
};

const mapDispatch = dispatch => {
  return {
    getLeaderboard: () => dispatch(getLeaderboard())
  };
};

export default connect(mapState, mapDispatch)(LeaderboardScreen);
