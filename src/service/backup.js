const Rsync = require("rsync");

const syncProgram = process.platform === "win32" ? "robocopy" : "rsync";

const rsync = new Rsync()
  .executable(syncProgram)
  .flags("a")
  .source("source/")
  .destination("destination/");

const backupService = () => {
  rsync.execute((error, code, cmd) => {
    let result = null;

    if (error) {
      result = `Code ${code} ${error?.message}`;
    } else {
      result = "Backup complete";
    }
    const currentDate = new Date().toISOString();
    process.stdout.write(`${currentDate}: ${result}\n`);
  });
};
module.exports = backupService;
