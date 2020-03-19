import React from "react";
import { Button, Text } from "react-native";
import { Container, Icon, Left, List, ListItem, Right } from "native-base";

const screens = [
  "LandingScreen",
  "LoginScreen",
  "SignupScreen",
  "CountdownScreen",
  "GameBoardScreen",
  "PlayScreen",
  "PostRoundScreen",
  "ProfileScreen",
  "DashboardScreen"
];

export default function DashboardScreen({ navigation }) {
  return (
    <Container
      style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
    >
      <Text>Home Screen</Text>

      <List>
        {screens.map(screen => (
          <ListItem button key={screen}>
            <Left>
              <Text onPress={() => navigation.navigate({ name: screen, key: screen })}>
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
