const handler = require("./handler");

const router = require("express").Router();

router.get("/", handler.index);

router.get("/:botId/posts", handler.getPosts);
router.get("/:postId/comments", handler.getComments);

module.exports = router;
