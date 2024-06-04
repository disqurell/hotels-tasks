const { Pool } = require("pg");
const dotenv = require("dotenv");

dotenv.config();

const DATABASE_URL = `postgres://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`

const pool = new Pool({
  connectionString: DATABASE_URL,
});

pool.on("connect", () => {
  console.log("Db connection created");
});

module.exports = {
  query: (text, params) => pool.query(text, params),
};
