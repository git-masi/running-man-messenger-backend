// Core Node Modules
const http = require("http");

// Modules
const chalk = require("chalk");
const express = require("express");
const socketio = require("socket.io");

// DB
require("./db/mongoose");

// Required Files
const router = require("./routes/router");
const generateMessage = require("./utils/generateMessage");
const {
  addUser,
  removeUser,
  getUser,
  getUsersInRoom,
} = require("./utils/users");

const app = express();
const server = http.createServer(app);
const io = socketio(server);

io.on("connection", (socket) => {
  console.log("New socket connected");

  socket.on("join", ({ name, room }, callback) => {
    const { user, err } = addUser({ id: socket.id, name, room });

    if (err) return callback(err);

    socket.join(user.room);
    socket.emit("message", generateMessage("admin", `Welcome ${user.name}`));
    socket.broadcast
      .to(user.room)
      .emit(
        "message",
        generateMessage("admin", `${user.name} has entered the chat`)
      );
    io.to(user.room).emit("roomData", getUsersInRoom({ room: user.room }));

    callback();
  });

  socket.on("newMessage", (text, callback) => {
    const { user, err } = getUser({ id: socket.id });

    if (err) return callback(err);

    io.to(user.room).emit("message", generateMessage(user.name, text));

    callback();
  });

  socket.on("disconnect", () => {
    const { user, err } = removeUser({ id: socket.id });

    if (err) return console.log(err);

    io.to(user.room).emit(
      "message",
      generateMessage("admin", `${user.name} has left the chat`)
    );

    io.to(user.room).emit("roomData", getUsersInRoom({ room: user.room }));
  });
});

app.use(express.json());
app.use(router);

const port = process.env.PORT || 3333;

server.listen(port, (err) => {
  if (err) return console.log(err);
  console.log(`Server running ${chalk.blue.bold(`http://127.0.0.1:${port}`)}`);
});
