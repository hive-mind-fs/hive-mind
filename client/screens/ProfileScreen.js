import React from 'react';
import { StyleSheet } from 'react-native';
import {
  Button,
  Container,
  H1,
  Tab,
  Tabs,
  TabHeading,
  Text
} from 'native-base';
import { Stats, Logo } from '../components';
import { logout } from '../store';

export default function ProfileScreen({ navigation }) {
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

  const handleLogout = () => {
    logout();
    navigation.navigate('LandingScreen');
  };

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
        onPress={() => handleLogout()}
      >
        <Text>Log Out</Text>
      </Button>
    </Container>
  );
}

const styles = StyleSheet.create({
  Logo: {
    marginTop: 60
  },
  Tabs: {
    marginTop: 30
  }
});
