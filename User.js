class User {
  constructor(ws, id, room) {
    this.sock = ws;
    this._id = id;
  }

  get id() {
    return this._id;
  }

  send(message) {
    this.sock.send(message, (err) => {
      if (err) console.error(err);
      return null;
    });
  }

  onMessage(message) {}

  onClose() {}
}

module.exports = User;