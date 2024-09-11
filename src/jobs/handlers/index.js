const botService = require("../../service");
const backupService = require("../../service/backup");

const JobHandlers = {
  createBots: async (job, done) => {
    await botService.makeCall();
    done();
  },
  sendTotalBots: async (job, done) => {
    const totalBots = await botService.totalBots();

    done();
  },
  backup: async (job, done) => {
    backupService();

    done();
  },
};

module.exports = { JobHandlers };
