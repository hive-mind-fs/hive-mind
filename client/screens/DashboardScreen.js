import React from 'react';
import { Button, Text, View } from 'react-native';
import { Container, Icon, Left, List, ListItem, Right } from 'native-base';

const screens = [
  'LandingScreen',
  'LoginScreen',
  'SignupScreen',
  'CountdownScreen',
  'Game',
  'Nav',
  'GameBoardScreen',
  'PlayScreen',
  'PostRoundScreen',
  'ProfileScreen',
  'DashboardScreen'
];

export default function DashboardScreen({ navigation }) {
  return (
    <Container
      style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
    >
      <Text>Home Screen</Text>
      <List>
        <Text>This is to get the screens to show up:</Text>
        {screens.map(screen => (
          <ListItem button key={screen}>
            <Left>
              <Text
                onPress={() =>
                  navigation.navigate({ name: screen, key: screen })
                }
              >
                {screen}
              </Text>
            </Left>
            <Right>
              <Icon name="arrow-forward" />
            </Right>
          </ListItem>
        ))}
      </List>
    </Container>
  );
}
