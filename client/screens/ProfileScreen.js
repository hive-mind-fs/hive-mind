import React from 'react';
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
import { Stats, Logo, BarChart, BarChartGrouped } from '../components';
import { logout } from '../store';

const ProfileScreen = ({ user, navigation, handleLogout }) => {
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
            <BarChart width={320} round={100} unit="€" />
            <BarChartGrouped width={320} round={1} unit="€" />
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
    user: state.user
  };
};

const mapDispatch = dispatch => {
  return {
    handleLogout: () => dispatch(logout())
  };
};

export default connect(mapState, mapDispatch)(ProfileScreen);
