import React, { Fragment, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { StyleSheet } from 'react-native';
import { Container, H1, H3, Text, Button, List, ListItem } from 'native-base';
import socket from '../socket';

const LobbyScreen = ({ navigation, user }) => {
  const [enteredRoom, setEnteredRoom] = useState(true)
  const [usersWaiting, setUsersWaiting] = useState([]);

  /*
  Notes: I think that there should be two modes,

  Random Oponent: You enter the lobby and see the waiting screen if no one is in there. Otherwise, you are automatically assigned to a room once another user joins the lobby.

  Play with Friends: You click a diferent button and you are navigated to a screen where you create a room and then invite your friend to join that room. Maybe you can click on your friend from a list of your friends and have this happen dynamically but for now lets just have one user create a room and invite there friend to it.
  */
  useEffect(() => {
    if (enteredRoom) {
    console.log(`${user.username} joining waiting room`)

    socket.emit('join room', {
        user: user
      });

    setEnteredRoom(false)
    }
  }); //only run once ...

  useEffect(() => {
    socket.on('game ready!', data => {
      const gameData = JSON.parse(data)
      console.log(`We have data for game`, gameData)
      setUsersWaiting(gameData.usersWaiting)
    })
  })


  const handleLeaving = () => {
    // Given game ready
    // From client we do post
    // Ensuring that users get same round
    setUsersWaiting(usersWaiting.splice(usersWaiting.indexOf(user), 1));
    navigation.navigate('PlayScreen');
  };

  return usersWaiting.length ? (
    <Container>
      <H1 style={styles.lobby}></H1>
      <H3>You have opponents!</H3>
      <List>
        {usersWaiting.map((user,i) => (
          <ListItem key={i} bottomDivider>
            <Text>{user.username}</Text>
          </ListItem>
        ))}
      </List>
    </Container>
  ) : (
      <Container>
        <H1 style={styles.lobby}></H1>
        <H3>Waiting for opponent...</H3>

        <Button
          primary
          block
          rounded
          marginTopL
          title="Leave Lobby"
          onPress={() => handleLeaving()}
        >
          <Text>Leave Lobby</Text>
        </Button>
      </Container>
    )
};

const styles = StyleSheet.create({
  lobby: {
    fontSize: 100,
    lineHeight: 120
  }
});

const mapState = state => {
  return {
    user: state.user
  };
};

export default connect(mapState)(LobbyScreen);
