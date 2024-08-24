const Agenda = require("agenda");
const { allDefinitions } = require("./definitions");

const mongoConnectionString = "mongodb://127.0.0.1/agenda";

const agenda = new Agenda({
  db: {
    address: mongoConnectionString,
    options: { useUnifiedTopology: true },
  },
  processEvery: "1 minute",
  maxConcurrency: 20,
});

// listen for the ready or error event.
agenda
  .on("ready", () => console.log("Agenda started!"))
  .on("error", () => console.log("Agenda connection error!"));

// define all agenda jobs
allDefinitions(agenda);

// logs all registered jobs
// console.log({ jobs: agenda._definitions });

module.exports = agenda;
