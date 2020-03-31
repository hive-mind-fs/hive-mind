let usersWaiting = []
const {Round} = require("../db/models")
let round = null;
let roomCtr = 0;

const WAITING_ROOM = 'waiting_room'

//To do: get room from server

//To do: Emit to room, not socket

//To do: Only do once two people have joined

module.exports = io => {
  io.on('connection', socket => {
    console.log(
      `A socket connection to the server has been made: ${socket.id}`
    );

    socket.on('join room', async function (data) {
      console.log(`${data.user.username} joining room ${WAITING_ROOM}`);

      socket.join(WAITING_ROOM);

      usersWaiting.push(data.user.username)

      round = await Round.getRandom()

      if (usersWaiting.length > 1) {
        const v1Room = `room_${roomCtr++}`
        socket.broadcast.to(WAITING_ROOM)
        .emit('game ready!', {usersWaiting: usersWaiting, round: round, v1Room: v1Room})
        usersWaiting = []
      }
    });

    socket.on('leave room', function(data) {
      console.log(`${data.user.username} joining room ${data.room}`);
      socket.leave(data.room);
    });

    // how is this different than disconnect?
    socket.on('disconnect', data => {
      console.log(`Connection ${socket.id} has disconnected`);
    });
  });
};
