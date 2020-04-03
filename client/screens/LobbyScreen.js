import React, { Fragment, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { StyleSheet } from 'react-native';
import { Container, H1, H3, Text, Button, List, ListItem } from 'native-base';
import { fetch1v1Round } from '../store/game';
import socket from '../socket';
import { set } from 'react-native-reanimated';

const LobbyScreen = ({ navigation, create1v1Round, user }) => {
  const [inRoom, setInRoom] = useState(true);
  const [users, setUsers] = useState({});
  const [room, setRoom] = useState('');
  const [usersReady, setUsersReady] = useState([]);

  /*
  Notes: I think that there should be two modes,

  Random Oponent: You enter the lobby and see the waiting screen if no one is in there. Otherwise, you are automatically assigned to a room once another user joins the lobby.

  Play with Friends: You click a diferent button and you are navigated to a screen where you create a room and then invite your friend to join that room. Maybe you can click on your friend from a list of your friends and have this happen dynamically but for now lets just have one user create a room and invite there friend to it.
  */
  useEffect(() => {
    if (inRoom) {
      socket.emit('join room', {
        user: user
      });
      setInRoom(false);
    }
  }); //only run once ...

  useEffect(() => {
    socket.on('game ready!', data => {
      const gameData = JSON.parse(data);
      console.log(`Me ${user.username} has data for game`, gameData.room);
      setUsers(gameData.users);
      setRoom(gameData.room);
      create1v1Round(user.id, gameData.round.id);
      navigation.navigate('CountdownScreen', { user: user });
    });
  }, [users]);

  const handlePlay = () => {
    // socket.emit('op clicked play', { username: user.username });
    // socket.on('recieved play click', data => {
    //   let arr = usersReady;
    //   if (!arr.includes(data.username)) {
    //     arr.push(data.username);
    //   }
    //   setUsersReady(arr);
    // });

    // let arr = usersReady;
    // if (!arr.includes(user.username)) {
    //   arr.push(user.username);
    // }
    // setUsersReady(arr);

    // console.log(usersReady);
    // if (usersReady.length === 2) {
    //   socket.emit('start game ', { bool: true });
    //   socket.on('game starting', data => {
    //     if (data.bool) {
    //       navigation.navigate('CountdownScreen', { user: user });
    //     }
    //   });

    //   navigation.navigate('CountdownScreen', { user: user });
    // }
    navigation.navigate('CountdownScreen', { user: user });
  };

  const handleLeaving = () => {
    // Given game ready
    // From client we do post
    // Ensuring that users get same round
    setUsers(users => {
      const newUsers = { ...users };
      delete newUsers[user.id.toString()];
      return newUsers;
    });
    setInRoom(false);
    socket.emit('leave room', {
      user: { username: user.username, id: user.id },
      room: room
    });
    console.log('leftRoom', room);
    navigation.navigate('PlayScreen');
  };

  return Object.keys(users).length > 1 ? (
    <Container>
      <H1 style={styles.lobby}></H1>
      <H3>You have opponents!</H3>
      <List>
        {Object.keys(users).map(key => (
          <ListItem key={key} bottomDivider>
            <Text>{users[key]}</Text>
          </ListItem>
        ))}
      </List>

      <Button
        primary
        block
        rounded
        marginTopL
        title="Play"
        onPress={() => handlePlay()}
      >
        <Text>Play</Text>
      </Button>

      <Button
        primary
        block
        rounded
        marginTopL
        title="Leave"
        onPress={() => handleLeaving()}
      >
        <Text>Leave</Text>
      </Button>
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

const mapDispatch = dispatch => {
  return {
    create1v1Round: (userId, roundId) =>
      dispatch(fetch1v1Round(userId, roundId))
  };
};

export default connect(mapState, mapDispatch)(LobbyScreen);
