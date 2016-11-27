'use strict';

// initializing express
const express = require('express');
const app = express();
// http being taken in server
const http = require('http').Server(app);
// requiring socket io
const io = require('socket.io')(http);

const path = require('path');


app.use(express.static(path.join(__dirname, 'public')));
// defining home route
app.get('/', (req, res) => {
  // res.sendFile(__dirname + '/index.html');
  // res.sendFile(__dirname + '/home.html');
  res.sendFile(path.join(__dirname, 'index.html'));
});

// adding io connection after requiring it
io.on('connection', (socket) => {
  console.log('a user connected');
  // adding a socket disconnect action
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
  // adding a socket for chat message
  socket.on('chat message', (msg) => {
    console.log('message: ' + msg);
  });

});

io.on('connection', (socket) => {

});




// making server listen on port 3000
http.listen(3000, () => {
  console.log('listening on PORT 3000');
});
