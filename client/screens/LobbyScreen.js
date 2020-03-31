import React, { Fragment, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { StyleSheet } from 'react-native';
import { Container, H1, H3, Text, Button, List, ListItem } from 'native-base';
import socket from '../socket';

const LobbyScreen = ({ navigation, user }) => {
  const [curr1v1Room, set1v1Room] = useState(0);
  const [usersWaiting, setUsersWaiting] = useState([]);

  /*
  Notes: I think that there should be two modes,

  Random Oponent: You enter the lobby and see the waiting screen if no one is in there. Otherwise, you are automatically assigned to a room once another user joins the lobby.

  Play with Friends: You click a diferent button and you are navigated to a screen where you create a room and then invite your friend to join that room. Maybe you can click on your friend from a list of your friends and have this happen dynamically but for now lets just have one user create a room and invite there friend to it.
  */
  useEffect(() => {
      socket.emit('join room', {
        user: user
      });
});
 //A room always will be unique, when you do socket.join('roomname') if the room not exist it will created and this socket will join it, if exist the socket just will join it.


    // } else if (inRoom && usersWaiting.length > 1) {
    //   socket.emit('join room', {
    //     user: user,
    //     room: V1_ROOM
    //   });
    //   socket.clients(curr1v1Room) === 2 //not sure this works based on my web search it seems like the command to get the number of people in a room keeps changing with version updates
    //     ? set1v1Room(curr1v1Room + 1)
    //     : set1v1Room(curr1v1Room); //increment the room id once 2 users are in it so the next user can joing a unique room
    //   setUsersWaiting(usersWaiting.splice(usersWaiting.indexOf(user), 1)); //Remove user from Waiting_Room
    //   setInRoom(false);
    //   if (!usersWaiting.includes(user)) {
    //     setUsersWaiting([...usersWaiting, user]);
    //   }
    // }

    // This just runs when the component dismounts
  //   return () => {
  //     if (inRoom) {
  //       socket.emit('leave room', {
  //         user: user,
  //         room: WAITING_ROOM
  //       });
  //     }
  //   };
  //});

  // useEffect((user) => {
  //   if (!usersWaiting.includes(user)) {
  //   console.log('before update users waiting', usersWaiting)
  //   setUsersWaiting([]);
  //   } else {
  //     console.log('nothing happened')
  //     console.log(`users waiting ${usersWaiting.length}`)
  //   }
  // }, [usersWaiting]);

  const handleLeaving = () => {
    // Given game ready
    // From client we do post
    // Ensuring that users get same round
    setInRoom(false);
    setUsersWaiting(usersWaiting.splice(usersWaiting.indexOf(user), 1));
    navigation.navigate('PlayScreen');
  };

  return usersWaiting.length >= 1 ? (
    <Container>
      <H1 style={styles.lobby}></H1>
      <H3>You have opponents!</H3>
      <List>
        {usersWaiting.map(user => (
          <ListItem key={user.id} bottomDivider>
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
