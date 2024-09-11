const { botDefinitions, sendTotalBots } = require("./bot");
const { backupDefinition } = require("./backup");

const definitions = [botDefinitions, sendTotalBots, backupDefinition];

const allDefinitions = (agenda) =>
  definitions.forEach((definition) => definition(agenda));

module.exports = { allDefinitions };
