const { eq } = require("drizzle-orm");
const db = require("../db/db");
const { bots, botPosts, botPostComments } = require("../db/schema");
const PER_PAGE = 10;

module.exports = {
  index: async (req, res, next) => {
    try {
      const { page = 1 } = req.query;
      if (isNaN(parseInt(page))) {
        throw new Error("page is not a number");
      }
      const dbBots = await db
        .select()
        .from(bots)
        .limit(PER_PAGE)
        .offset(parseInt(page - 1) * PER_PAGE);
      res.status(200).json({
        bots: dbBots,
      });
    } catch (e) {
      res.status(500).json({ err: e.message });
    }
  },
  getPosts: async (req, res, next) => {
    try {
      const { botId, page = 1 } = req.params;
      if (isNaN(parseInt(botId))) {
        throw new Error("botId is not a number");
      }

      const botResult = await db
        .select()
        .from(bots)
        .where(eq(bots.id, parseInt(botId)))
        .limit(1);
      if (botResult.length < 1) {
        throw new Error("bot does not exist");
      }

      const posts = await db
        .select()
        .from(botPosts)
        .where(eq(botPosts.botId, parseInt(botId)))
        .limit(PER_PAGE)
        .offset(parseInt(page - 1) * PER_PAGE);
      res.status(200).json({
        posts,
      });
    } catch (e) {
      res.status(500).json({ err: `${e.message}` });
    }
  },
  getComments: async (req, res, next) => {
    try {
      const { botId, postId, page = 1 } = req.params;
      if (isNaN(parseInt(botId)) || isNaN(parseInt(postId))) {
        throw new Error("bot id or post id is not a number");
      }
      const botResult = await db
        .select()
        .from(bots)
        .where(eq(bots.id, parseInt(botId)))
        .limit(1);
      if (botResult.length < 1) {
        throw new Error("bot does not exist");
      }
      const postResult = await db
        .select()
        .from(botPosts)
        .where(eq(botPosts.id, parseInt(postId)))
        .limit(1);

      if (postResult.length < 1) {
        throw new Error("post does not exist");
      }
      const comments = await db
        .select()
        .from(botPostComments)
        .where(eq(botPostComments.postId, parseInt(postId)))
        .limit(PER_PAGE)
        .offset(parseInt(page - 1) * PER_PAGE);
      res.status(200).json({
        comments,
      });
    } catch (e) {
      res.status(500).json({ err: err.message });
    }
  },
};
