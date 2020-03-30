import React, { Fragment, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { StyleSheet } from 'react-native';
import { Container, H1, H3, Text, Button, List, ListItem } from 'native-base';
import getSocket from '../socket';

const LobbyScreen = ({ navigation, user }) => {
  const [inRoom, setInRoom] = useState(true);
  const [socket] = useState(getSocket());
  const [curr1v1Room, set1v1Room] = useState(0);
  const [usersWaiting, setUsersWaiting] = useState([]);

  const WAITING_ROOM = 'waiting_room';

  useEffect(() => {
    if (inRoom) {
      socket.emit('join room', {
        user: user,
        room: WAITING_ROOM
      }); //A room always will be unique, when you do socket.join('roomname') if the room not exist it will created and this socket will join it, if exist the socket just will join it.

      setUsersWaiting([...usersWaiting, user]);
    }

    // This just runs when the component dismounts
    return () => {
      if (inRoom) {
        socket.emit('leave room', {
          user: user,
          room: WAITING_ROOM
        });
      }
    };
  });

  const handleLeaving = () => {
    navigation.navigate('PlayScreen');
  };

  return usersWaiting.length >= 1 ? (
    <Container>
      <H1 style={styles.lobby}></H1>
      <H3>You have opponents!</H3>
      <List>
        {usersWaiting.map(user => (
          <ListItem key={user.id} title={user.username} bottomDivider>
            {/* <Text>{l.username}</Text> */}
          </ListItem>
        ))}
      </List>
    </Container>
  ) : (
    inRoom && (
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
          <Text>Find An Opponent</Text>
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

export default connect(mapState)(LobbyScreen);
