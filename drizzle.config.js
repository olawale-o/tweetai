export default {
  schema: "./src/db/schema.js",
  out: "./drizzle",
  dialect: "mysql",
  dbCredentials: {
    host: "localhost",
    user: "root",
    password: "",
    database: "tweetai_db",
  },
};
