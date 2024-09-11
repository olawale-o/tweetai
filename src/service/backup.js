const Rsync = require("rsync");

const rsync = new Rsync()
  .flags("a")
  .source("source/")
  .destination("destination/");

const backupService = () => {
  rsync.execute((error, code, cmd) => {
    console.log("backup completed with status code: " + code);
  });
};
module.exports = backupService;
