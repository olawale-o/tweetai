const { drizzle } = require("drizzle-orm/mysql2");
const mysql = require("mysql2/promise");

const pool = mysql.createPool({
  host: "127.0.0.1",
  user: "root",
  password: "",
  database: "tweetai_db",
});

const db = drizzle(pool);
module.exports = db;
