const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const agenda = require("./jobs");

const corsOption = {
  origin: "http://localhost:3000",
  credential: true,
};

// const mongoConnectionString = "mongodb://127.0.0.1/agenda";

// const agenda = new Agenda({
//   db: {
//     address: mongoConnectionString,
//     options: {
//       useUnifiedTopology: true,
//     },
//   },
//   processEvery: "1 minute",
//   maxConcurrency: 20,
// });

// agenda.define("create_bots_every_1_mins", createUsers);

// agenda.define("get_hourly_created_users", async () => {
//   const totalBots = await db.select({ value: count(bots.id) }).from(bots);
//   console.log(`current total bots ${totalBots}`);
// });

(async function () {
  await agenda.start();

  await agenda.every("1.2 minutes", "create-bots");
  await agenda.every("60 minutes", "hourly-bots");
})();

const app = express();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors(corsOption));

app.use("/api/v1/bot", require("./bot"));

// app.use(async (err, _req, res) => {
//   await handleError(err, res);
// });

module.exports = app;
