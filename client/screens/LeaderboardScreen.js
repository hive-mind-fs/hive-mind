import React from 'react';
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
import { Stats } from '../components';
import { logout } from '../store';

const LeaderboardScreen = ({ navigation, handleLogout }) => {
  const stats = [
    {
      title: 'Total Score',
      stat: '1,234'
    },
    {
      title: 'Games Played',
      stat: '34'
    },
    {
      title: 'Words Gotten',
      stat: '334'
    },
    {
      title: 'Total Score',
      stat: '1,234'
    },
    {
      title: 'Games Played',
      stat: '34'
    },
    {
      title: 'Words Gotten',
      stat: '334'
    }
  ];

  const list = (
    <FlatList
      data={stats}
      renderItem={({ item }) => (
        <ListItem avatar>
          <Left>
            <Thumbnail source={{ uri: 'https://i.imgur.com/UMFJ5Gm.jpg' }} />
          </Left>
          <Body>
            <Text>Kumar Pratik</Text>
          </Body>
          <Right>
            <Text>1,123</Text>
          </Right>
        </ListItem>
      )}
      keyExtractor={item => item.id}
    />
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
    user: state.user
  };
};

const mapDispatch = dispatch => {
  return {
    handleLogout: () => dispatch(logout())
  };
};

export default connect(mapState, mapDispatch)(LeaderboardScreen);
