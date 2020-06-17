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
          console.log("logged in", this.users[user.id].info);
          callback(true);
        } else {
          callback(false);
        }
      });

      socket.on("logout", (id) => {
        if (this.users[id]) {
          delete this.users[id];
          console.log(id, "logged out");
        }
      });

      socket.on("send_message", (message, callback) => {
        socket.emit("chat_update", message);
        this.users[message.To_id].socket.emit("chat_update", message);
        callback();
      });

      socket.on("send_location", (user) => {
        if (this.users[user.id]) {
          this.users[user.id].info.location = user.location;
          const near = this.getNearUsers(user);

          socket.emit("user_update", near);
          console.log("receiving location");
        } else {
          console.log(false);
        }
      });

      socket.on("lift_request", (request, callback)=>{
        //io.sockets.emit("lift_response", (request));
		this.users[request.To_id].socket.emit("lift_response", (request))
		callback("abc")
      });

      socket.on("disconnect", () => {
        delete this.users[socket.user];
      });
    });
  }

  getNearUsers(user) {
    const ids = Object.keys(this.users);
    const nearIDS = ids.filter((id) => {
      if (user.id === id) return false;

      const h = new Haversine(user.location, this.users[id].info.location);
      return h.isNear(1700);
    });

    const near = nearIDS.map((value) => {
      return this.users[value].info;
    });

    return near;
  }
}

export default Socket;
