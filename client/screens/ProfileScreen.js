import React from 'react';
import { StyleSheet, View } from 'react-native';
import {
  Button,
  Container,
  H1,
  Tab,
  Tabs,
  TabHeading,
  Text
} from 'native-base';
import { connect } from 'react-redux';
import { Stats, Logo, BarChart } from '../components';
import { logout } from '../store';

const ProfileScreen = ({ navigation, handleLogout }) => {
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

  // const handleLogout = () => {
  //   handleLogout();
  //   navigation.navigate('LandingScreen');
  // };

  return (
    <Container>
      <Text style={styles.Logo} />
      <Logo />
      <H1>Username</H1>
      <Tabs style={styles.Tabs}>
        <Tab
          heading={
            <TabHeading>
              <Text>Stats</Text>
            </TabHeading>
          }
        >
          <View
            onLayout={event => {
              var { x, y, width, height } = event.nativeEvent.layout;
            }}
          >
            <BarChart width={width} round={100} unit="€" />
          </View>

          <Stats stats={stats} />
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
      <Button
        rounded
        bordered
        block
        marginTop
        title="Log Out"
        onPress={() => {
          console.log('attempting to logout');
          handleLogout();
          navigation.navigate('LandingScreen');
        }}
      >
        <Text>Log Out</Text>
      </Button>
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

export default connect(mapState, mapDispatch)(ProfileScreen);
