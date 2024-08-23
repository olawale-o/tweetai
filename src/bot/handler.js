const { eq } = require("drizzle-orm");
const db = require("../db/db");
const { bots, botPosts, botPostComments } = require("../db/schema");
const PER_PAGE = 10;

module.exports = {
  index: async (req, res, next) => {
    try {
      const { page } = req.query;
      const dbBots = await db
        .select()
        .from(bots)
        .limit(PER_PAGE)
        .offset(parseInt(page - 1) * PER_PAGE);
      res.status(200).json({
        bots: dbBots,
      });
    } catch (e) {
      res.status(500).json(err);
    }
  },
  getPosts: async (req, res, next) => {
    try {
      const { botId } = req.params;
      if (isNaN(parseInt(botId))) {
        throw new Error("botId is not a number");
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
    const { postId } = req.params;
    const comments = await db
      .select()
      .from(botPostComments)
      .where(eq(botPostComments.postId, parseInt(postId)))
      .limit(PER_PAGE)
      .offset(parseInt(page - 1) * PER_PAGE);
    res.status(200).json({
      comments,
    });
  },
};
