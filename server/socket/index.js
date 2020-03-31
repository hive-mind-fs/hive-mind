module.exports = io => {
  io.on('connection', socket => {
    console.log(
      `A socket connection to the server has been made: ${socket.id}`
    );

    socket.on('join room', function(data) {
      console.log(`${data.user.username} joining room ${data.room}`);
      data.usersWaiting.push(data.user)
      socket.join(data.room);
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
