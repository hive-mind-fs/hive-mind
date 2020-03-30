module.exports = io => {
  io.on('connection', socket => {
    console.log(
      `A socket connection to the server has been made: ${socket.id}`
    );

    socket.on('room', function(data) {
      console.log('user has joined room', data);
    });

    // for this particular socket, this function returns a function that can disconnect
    socket.on('leave room', () => {
      console.log(`Connection ${socket.id} has left the building`);
    });
  });
};
