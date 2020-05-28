import Haversine from "../../util/Haversine";

const io = require("socket.io")(4000);

class Socket {
  constructor() {
    this.users = [];

    io.on("connection", (socket) => {
      socket.on("login", (user, callback) => {
        if (!this.users[user.id]) {
          socket.user = user.id;
          this.users[user.id] = { socket, info: user };

          const nearUsers = this.getNearUsers(user);
          io.sockets.emit("user_update", nearUsers);
          callback(true);
        } else {
          callback(false);
        }
      });

      socket.on("logout", (user) => {
        if (this.users[user.id]) {
          delete this.users[user.id];
          console.log(user.id, "logged out");
        }
      });

      socket.on("send_message", (message, callback) => {
        socket.emit("chat_update", message);
        this.users[message.To_id].socket.emit("chat_update", message);
        callback();
      });

      socket.on("send_location", (user, callback) => {
        const nearUsers = this.getNearUsers(user);
        io.sockets.emit("user_update", nearUsers);
        callback();
      });

      socket.on("lift_request", (request, callback) => {
        this.users[request.To_id].socket("lift_request", request);
        callback();
      });

      socket.on("disconnect", () => {
        delete this.users[socket.user];
      });
    });
  }

  getNearUsers(user) {
    const nearUsers = this.users.filter((value) => {
      if (value.info.id === user.id) {
        return false;
      }
      const h = new Haversine(user.location, value.info.location);
      return h.isNear(1700);
    });

    return nearUsers;
  }
}

export default Socket;
