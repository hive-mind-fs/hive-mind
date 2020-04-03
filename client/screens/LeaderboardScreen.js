import React, { useEffect } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import {
  Container,
  Content,
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
import { getLeaderboard } from '../store';

const LeaderboardScreen = ({ navigation, getLeaderboard, leaderboard }) => {
  useEffect(() => {
    getLeaderboard();
  }, []);

  const list =
    leaderboard.length > 0 ? (
      <FlatList
        data={leaderboard}
        keyExtractor={(item, idx) => item + idx}
        renderItem={({ item }) => {
          return (
            <ListItem avatar style={{ padding: 10 }}>
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
          );
        }}
      />
    ) : (
      <Text center marginT20>
        Loading...
      </Text>
    );
  return (
    <Container>
      <Content>
        <Text style={styles.Logo} />
        <H1 center>Leaderboard</H1>
        <Tabs style={styles.Tabs}>
          <Tab
            heading={
              <TabHeading>
                <Text>All-Time</Text>
              </TabHeading>
            }
          >
            {list}
          </Tab>
          {/* <Tab
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
        </Tab> */}
        </Tabs>
      </Content>
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
