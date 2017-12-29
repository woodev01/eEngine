const Chatroom = require("./Chatroom");

class ChatBalancer {
  constructor(usersPerRoom) {
    this.chatRooms = [];
    this.users = 0;
    this.UPR = usersPerRoom;
  }

  addNewRoom() {
    this.chatRooms.push(new Chatroom());
    return this.chatRooms[this.chatRooms.length - 1];
  }

  addNewUser(user) {
    console.log("Adding User");
    let lastChatRoom = this.chatRooms[this.chatRooms.length - 1];
    let currentChatRoom = (lastChatRoom != undefined && this.UPR > lastChatRoom.numUsers) ? lastChatRoom : this.addNewRoom();

    console.log(currentChatRoom.numUsers);

    currentChatRoom.addUser(user);

    user.onMessage = (message) => {
      currentChatRoom.addMessage(message);
      currentChatRoom.broadcast(message);
    }

    user.onClose = () => {
      currentChatRoom.destroyUserSession(user);
    }

    console.log("Added User");
  }
}

module.exports = ChatBalancer;