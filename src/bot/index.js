const router = require("express").Router();

router.get("/", async (req, res, next) => {
  console.log("get all bots");
  res.sendStatus(200);
});
router.get("/:id/posts", async (req, res, next) => {
  console.log("get a bot's posts");
  res.sendStatus(200);
});
router.get("/:id/posts/:id/comments", async (req, res, next) => {
  console.log("get a bot's post comments");
  res.sendStatus(200);
});

module.exports = router;
