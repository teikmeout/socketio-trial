const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io').listen(server);
users = [];
connections = [];

server.listen(process.env.PORT || 3000);
console.log('server listening on port 3000');

// sending out the index.html file, no need to restart server if it's only
// index.html we are modifying
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
})

// all of the events we need to create are gonna go inside here
io.sockets.on('connection', (socket) => {
  // we have an array of name connections at the top and we are pushing
  // into that array the new connection created on that moment with the socket ID
  connections.push(socket);
  console.log(`Connected on ${connections.length} sockets`);

  // making the disconnect
  connections.splice(connections.indexOf(socket), 1);
  console.log(`Disconnected. ${connections.length} sockets remaining`);
})
