const { JobHandlers } = require("../handlers");

const botDefinitions = (agenda) => {
  agenda.define("create-bots", JobHandlers.createBots);
};

const sendTotalBots = (agenda) => {
  agenda.define("hourly-bots", JobHandlers.sendTotalBots);
};

module.exports = { botDefinitions, sendTotalBots };
