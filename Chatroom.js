class Chatroom {
  constructor() {
    this.users = [];
    this.messages = [];
  }

  get numUsers() {
    return this.users.length;
  }

  addUser(user) {
    this.users.push(user);
  }

  destroyUserSession(user) {
    this.users.slice(user.id, 1);
  }

  addMessage(message) {
    this.messages.push(message);
  }

  broadcast(message) {
    for (let i = 0; i < this.users.length; i++) {
      this.users[i].send(message);
    }
  }
}

module.exports = Chatroom;