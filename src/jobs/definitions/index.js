const { botDefinitions, sendTotalBots } = require("./bot");

const definitions = [botDefinitions, sendTotalBots];

const allDefinitions = (agenda) =>
  definitions.forEach((definition) => definition(agenda));

module.exports = { allDefinitions };
