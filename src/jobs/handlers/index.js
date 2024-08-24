const botService = require("../../service");

const JobHandlers = {
  createBots: async (job, done) => {
    await botService.createBots();
    done();
  },
  sendTotalBots: async (job, done) => {
    const totalBots = await botService.totalBots();

    done();
  },
};

module.exports = { JobHandlers };
