const ChatBalancer = require('./ChatBalancer');
const User = require("./User");
const WebSockets = require("ws");

class ChatServer {
  constructor(port, roomType, balancer_rate = 2) {
    this._balancer = new ChatBalancer(roomType, balancer_rate)
    this._total_users = 0;
    this._user_ids = 0;

    this._server = new WebSockets.Server({ port:port });
  }

  initialize() {
    this._server.on("connection", (ws) => {
      ws.send("Welcom to the chat room!", (err) => {
        return null;
      });

      console.log(`Making a new User: ${ this._total_users + 1}`);

      let user = new User(ws, this._user_ids++);
      this._total_users++;

      user.onMessage = (message) => {
        console.log("Adding the user to a room");
        this._balancer.addNewUser(user);
        console.log(`User Profiles: ${this._balancer.users}`);
        user.onMessage(message);
      }

      ws.on("message", (message) => {
        user.onMessage(message);
      });

      ws.on("error", (err) => {
        console.error(`Error: ${err}`);
      });

      ws.on("close", () => {
        this._balancer.removeUser(user);
        console.log(this._balancer.users);
        this._total_users--;
      });
    });
  }
}

module.exports = ChatServer;