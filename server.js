const ChatBalancer = require('./ChatBalancer');
const User = require("./User");
const WebSockets = require("ws");

function main() {
  const chatBalancer = new ChatBalancer(2);
  let users = 0;


  // TODO: Either allow multiple server ports for gameplay and chat
  // and sync them, or expand current server to take multiple command
  // sets
  const server = new WebSockets.Server({ port:8080 });
  server.on("connection", (ws) => {
    ws.send("Welcome to the chat room!", (err) => {
      return null;
    });

    console.log("Making a new User");

    let user = new User(ws, users++);

    user.onMessage = (message) => {
      console.log("Adding the user to a room");
      chatBalancer.addNewUser(user);
      user.onMessage(message);
    }

    ws.on("message", (message) => {
      user.onMessage(message);
    });
      
    ws.on("error", (err) => {
      console.log(err);
    });

    ws.on("close", () => {
      user.onClose();
    });
  });
}

main();