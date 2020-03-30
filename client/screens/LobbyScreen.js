import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { StyleSheet } from 'react-native';
import { Container, H1, H3 } from 'native-base';
import { getSocket } from '../socket';

const LobbyScreen = ({ navigation, user }) => {
  const [inRoom, setInRoom] = useState(true);
  const [socket] = useState(getSocket());

  const TEST_ROOM = 'test-room';
  useEffect(() => {
    if (inRoom) {
      console.log('joining room');
      socket.emit('room', { room: TEST_ROOM });
    }

    // This just runs when the component dismounts
    return () => {
      if (inRoom) {
        console.log('leaving room');
        socket.emit('leave room', {
          room: TEST_ROOM
        });
      }
    };
  });

  const handleLeaving = () => {
    navigation.navigate('PlayScreen');
  };

  return (
    <Container>
      <H3>Waiting for opponent...</H3>
      <H1 style={styles.lobby}></H1>
      {inRoom && (
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
      )}
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

export default connect(mapState)(LobbyScreen);
