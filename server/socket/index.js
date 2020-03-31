let usersWaiting = []
const {Round} = require("../db/models")

//To do: get room from server

//To do: Emit to room, not socket

//To do: Only do once two people have joined

module.exports = io => {
  io.on('connection', socket => {
    console.log(
      `A socket connection to the server has been made: ${socket.id}`
    );

    socket.on('join room', async function(data) {
      console.log(`${data.user.username} joining room ${data.room}`);
      usersWaiting.push(data.user.username)
      socket.join(data.room);
      const round = await Round.getRandom()

      // io.to (name of room), to emit to room
      socket.emit('game ready!', {usersWaiting: usersWaiting, round: round})
      //socket.to()
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
