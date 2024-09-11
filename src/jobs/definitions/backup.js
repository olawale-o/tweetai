const { JobHandlers } = require("../handlers");

const backupDefinition = (agenda) => {
  agenda.define("backup", JobHandlers.backup);
};

module.exports = { backupDefinition };
