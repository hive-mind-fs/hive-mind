import io from 'socket.io-client';

// To do: make sure the PORT is correct
// This will probably work locally and then we have to figure out how to make it work when we deploy
const PORT = 8080;
const socket = io(`http://localhost:${PORT}`);

// Not sure if we're going to use this, but we'll find out
socket.on('connect', () => {
  console.log(`Connected on client! ${socket.id}`);
});

socket.on('game ready!', data => {
  console.log(`We have users waiting, ${data.usersWaiting[0]}`)
  console.log(`To play round, ${data.round.coreLetter}`)
  console.log(`And join room, ${data.v1Room}`)
})

socket.on('...', () => {

});

export default socket;
