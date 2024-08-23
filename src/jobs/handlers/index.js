const botService = require("../../service");

const JobHandlers = {
  createBots: async (job, done) => {
    await botService.createBots();
    done();
  },
  sendTotalBots: async (job, done) => {
    const totalBots = await botService.totalBots();
    console.log(`current total bots ${totalBots}`);
    done();
  },
};

module.exports = { JobHandlers };
