import React from 'react';
import { Button, Text } from 'react-native';
import { Container, H1, Tab, Tabs, TabHeading } from 'native-base';
import { Stats, Logo, Nav } from '../components';

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

  return (
    <Container
      style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
    >
      <Logo />
      <H1>Username</H1>
      <Tabs>
          <Tab heading={ <TabHeading><Text>Stats</Text></TabHeading>}>
            <Stats stats={stats} navigaton={ navigation }/>
          </Tab>
          <Tab heading={ <TabHeading><Text>Game Log</Text></TabHeading>}>
            <Stats stats={games} navigaton={ navigation }/>
          </Tab>
        </Tabs>
      <Button
        title="Logout"
        onPress={() => navigation.navigate('DashboardScreen')}
      />
      {/* <Nav navigaton={ navigation } active='profile' /> */}
    </Container>
  );
}
