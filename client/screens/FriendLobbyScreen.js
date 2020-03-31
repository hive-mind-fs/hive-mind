import React, { Fragment, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { StyleSheet } from 'react-native';
import { Container, H1, H3, Text, Button } from 'native-base';
import getSocket from '../socket';

/*
As rooms can only be joined if we know the name of the room, it creates a sort of sudo-security.
But it is a bit of a hack because if someone can guess the room name and it is exposed to the client to join,
they can join any arbitrary room.
*/

const FriendLobbyScreen = ({ navigation, user }) => {
  const [input, handleInput] = useState('');
  const [inRoom, setInRoom] = useState(true);
  const [players, setPlayers] = useState([]);
  const [socket] = useState(getSocket());

  const room = input;

  useEffect(() => {
    if (inRoom) {
      socket.emit('join room', {
        user: user,
        room: room
      });
      setPlayers([...players, user]);
    }

    // This just runs when the component dismounts
    // return () => {
    //   if (inRoom) {
    //     socket.emit('leave room', {
    //       user: user,
    //       room: WAITING_ROOM
    //     });
    //   }
    // };
  });

  const handleLeaving = () => {
    setInRoom(false);
    navigation.navigate('PlayScreen');
  };

  return players.length > 1 ? (
    <Container>
      <H1 style={styles.lobby}></H1>
      <H3>{players[1]} has joined!</H3>
    </Container>
  ) : (
    inRoom && (
      <Container>
        <H1 style={styles.lobby}></H1>
        <H3>Waiting for Friend...</H3>

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
  );
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

export default connect(mapState)(FriendLobbyScreen);
