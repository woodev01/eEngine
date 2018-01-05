const ChatServer = require("./ChatServer");

function main() {
  const chatServer = new ChatServer(8080, "chat");
  chatServer.initialize();

  const battleServer = new ChatServer(8081, "battle");
  battleServer.initialize();
}

main();