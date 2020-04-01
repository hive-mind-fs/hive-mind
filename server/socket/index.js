const { Round } = require('../db/models');
let users = new Set();
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

      users.add({ id: data.user.id, name: data.user.username });

      console.log('users waiting', users);

      socket.join(v1Room);

      if (users.size === 1) {
        // TO DO: get a round once
        round = await Round.getRandom();
      } else {
        io.to(v1Room).emit(
          'game ready!',
          JSON.stringify({ users: Array.from(users), round: round })
        ); // emit this to all clients in waiting room
        roomCtr++;
        users = new Set();
      }
    });

    socket.on('leave room', function(data) {
      console.log(`${data.user.username} leaving room ${data.room}`);
      socket.leave(data.room);
    });

    // how is this different than disconnect?
    socket.on('disconnect', data => {
      console.log(`Connection ${socket.id} has disconnected`);
    });
  });
};
