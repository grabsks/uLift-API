const io = require("socket.io")(4000);

class Socket {
  constructor() {
    const UserId = [];

    io.on("connection", (socket) => {
      socket.on("login", (id, callback) => {
        if (!(id in UserId)) {
          socket.user = id;
          UserId[id] = socket;

          io.sockets.emit("user_update", Object.keys(UserId));

          callback(true);
        } else {
          callback(false);
        }
      });
      socket.on("send_message", (message, callback) => {
        socket.emit("chat_update", message);
        UserId[message.To_id].emit("chat_update", message);
        callback();
      });
      socket.on("send_location", (location, callback) => {
        io.sockets.emit("location_update", location);
        callback();
      });
      socket.on("lift_request", (request, callback) => {
        UserId[request.To_id]("lift_request", request);
        callback();
      });
      socket.on("disconnect", () => {
        delete UserId[socket.id];
        io.sockets.emit("user_update", Object.keys(UserId));
      });
    });
  }
}

export default Socket;
