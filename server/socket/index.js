const { Round, Word } = require('../db/models');
let users = {};
let round = null;
let roomCtr = 0;

module.exports = io => {
  io.on('connection', socket => {
    console.log(
      `A socket connection to the server has been made: ${socket.id}`
    );

    socket.on('join room', async function(data) {
      const v1Room = `room_${roomCtr}`;

      console.log(`${data.user.username} joining room ${v1Room} server`);

      users[data.user.id] = data.user.username;

      console.log('users waiting', users);

      socket.join(v1Room);

      if (Object.keys(users).length === 1) {
        // TO DO: get a round once
        round = await Round.getRandom({ include: [{ model: Word }] });
      } else {
        io.to(v1Room).emit(
          'game ready!',
          JSON.stringify({ users: users, round: round, room: v1Room })
        ); // emit this to all clients in waiting room
        roomCtr++;
        users = {};
      }
    });

    socket.on('game start', function(data) {
      const room = data.room;
      const userData = data;
      //socket.broadcast.to('room_0').emit('opponent', userData);
      socket.broadcast.to(room).emit('opponent', userData);
    });

    socket.on('my score changed', function(data) {
      const room = data.room;
      socket.broadcast.to(room).emit('ops score changed', data);
    });

    socket.on('leave room', function(data) {
      console.log(`${data.user.username} leaving room ${data.room}`);
      console.log('users before leaving:', users);
      delete users[data.user.id.toString()];
      console.log('users after leaving:', users);
      socket.leave(data.room);
    });

    // how is this different than disconnect?
    socket.on('disconnect', data => {
      console.log(`Connection ${socket.id} has disconnected`);
    });
  });
};
