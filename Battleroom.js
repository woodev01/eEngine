const Chatroom = require("./Chatroom");

class Battleroom extends Chatroom {
  constructor() {
    super();
  }

  addMessage(message) {
    super.addMessage(message);
    console.log(`Message: ${message}`);
  }

  respond(message) {
    let msgComponents = message.split(":");

    switch (msgComponents[0]) {
      case "QueueRequest":
        console.log(msgComponents[1]);
        break;
      default:
        console.log(msgComponents);
        break;
    }
  }
}

module.exports = Battleroom;