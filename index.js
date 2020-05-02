// Core Node Modules
const http = require('http');

// Modules
const chalk = require('chalk');
const express = require('express');
const socketio = require('socket.io');

// Required Files
const router = require('./routes/router');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

io.on('connection', socket => {
  console.log('New socket connected');

  socket.on('disconnect', () => {
    console.log('Someone has disconnected');
  })
});

app.use(router);

const port = process.env.PORT || 3333;

server.listen(port, (err) => {
  if (err) return console.log(err);
  console.log(`Server running ${chalk.blue.bold(`http://127.0.0.1:${port}`)}`);
})