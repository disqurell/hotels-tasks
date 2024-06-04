const database = require("./database");
const { v4: uuidv4 } = require("uuid");

let db = {
  users: {},

  async createUser(email, password) {
    const uuid = uuidv4();
    try {
      await database.query(
        "INSERT INTO users (uuid, email, password) VALUES ($1, $2, $3)",
        [uuid, email, password]
      );
    } catch {
      return;
    }

    return uuid;
  },
  async getUser(uuid) {
    try {
      const res = await database.query("SELECT * FROM users WHERE uuid=$1", [
        uuid,
      ]);
      return res.rows[0];
    } catch {
      return;
    }
  },
  async getUserByEmail(email) {
    const res = await database.query("SELECT * FROM users WHERE email=$1", [
      email,
    ]);

    return res.rows.toString();
  },
  async updateUser(uuid, data) {
    const res = await database.query(
      "UPDATE users SET email = $1, password = $2 WHERE uuid=$3",
      [data.email, data.password, uuid]
    );
    return res;
  },
  async deleteUser(uuid) {
    const res = await database.query("DELETE FROM users WHERE uuid = $1", [
      uuid,
    ]);
    return res;
  },
};

module.exports = { db };
