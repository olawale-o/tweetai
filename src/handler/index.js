const { count } = require("drizzle-orm");
const db = require("../db/db");
const { bots } = require("../db/schema");

const streamHandler = async (_req, res) => {
  res.setHeader("Cache-Control", "no-store");
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Connection", "keep-alive");
  res.flushHeaders();

  let interval = setInterval(
    async () => {
      const counts = await db.select({ value: count() }).from(bots);
      res.write("data: " + JSON.stringify({ counts }) + "\n\n");
    },
    60 * 60 * 1000,
  );

  res.on("close", () => {
    clearInterval(interval);

    res.end();
  });
};

module.exports = {
  streamHandler,
};
