const Chatroom = require("./Chatroom");
const Battleroom = require("./Battleroom");

class ChatBalancer {
  constructor(roomType, usersPerRoom) {
    this.chatRooms = [];
    this.users = {};
    this.UPR = usersPerRoom;
    this.roomType = roomType;
  }

  addNewRoom() {
    if (this.roomType == "battle") {
      this.chatRooms.push(new Battleroom());
    } else {
      this.chatRooms.push(new Chatroom());
    }
    return this.chatRooms[this.chatRooms.length - 1];
  }

  addNewUser(user) {
    console.log("Adding User");
    let lastChatRoom = this.chatRooms[this.chatRooms.length - 1];
    let currentChatRoom = (lastChatRoom != undefined && this.UPR > lastChatRoom.numUsers) ? lastChatRoom : this.addNewRoom();

    currentChatRoom.addUser(user);

    user.onMessage = (message) => {
      currentChatRoom.addMessage(message);
      currentChatRoom.respond(message);
    }

    user.onClose = () => {
      currentChatRoom.destroyUserSession(user);
    }

    this.users[user.id] = user;

    console.log("Added User");
    console.log(`Current Users in Current Room: ${ currentChatRoom.numUsers }`);
  }

  removeUser(user) {
    user.onClose();
    delete this.users[user.id];
  }
}

module.exports = ChatBalancer;