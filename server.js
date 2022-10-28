const express = require("express");
const { Server } = require("socket.io");
const http = require("http");
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

io.on("connect", (socket) => {
  console.log("connection");

  //on disconnect
  socket.on("disconnect", function () {
    console.log("disconnect");
  });

  socket.on("connect_error", (err) => {
    console.log(`connect_error due to ${err.message}`);
  });

  /**
   * send message
   */
  socket.on("chat message", async (data) => {
    const dataMessage = {
      message: data.message,
      sender: data.sender,
      socketId: socket.id,
    };

    //broadcast to everyone
    socket.broadcast.emit("chat message", dataMessage);
  });
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
});
