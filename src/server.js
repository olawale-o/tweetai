const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const rateLimit = require("express-rate-limit");

const agenda = require("./jobs");

const corsOption = {
  origin: "http://localhost:3000",
  credential: true,
};

const limiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  limit: 5,
});

// (async function () {
//   await agenda.start();

//   await agenda.every("1.2 minutes", "create-bots");
//   await agenda.every("60 minutes", "hourly-bots");
// })();

const app = express();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors(corsOption));

app.use(limiter);
app.use("/api/v1/bot", require("./bot"));

// app.use(async (err, _req, res) => {
//   await handleError(err, res);
// });

module.exports = app;
