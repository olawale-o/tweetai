const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const rateLimit = require("express-rate-limit");

const botService = require("./service");

const agenda = require("./jobs");

const { streamHandler } = require("./handler");

const corsOption = {
  origin: "http://localhost:8080",
  credential: true,
};

const limiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  limit: 5,
});

(async function () {
  await agenda.start();

  await agenda.every("1.2 minutes", "create-bots", { priority: "high" });
})();

const app = express();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors(corsOption));

app.get("/stream", streamHandler);

app.use(limiter);
app.use("/api/v1/bots", require("./bots"));

module.exports = app;
