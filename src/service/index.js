const db = require("../db/db");
const { bots, botPosts, botPostComments } = require("../db/schema");

const { get } = require("../api");

let lastId = 1;

const createComments = async ({ postId }) => {
  try {
    let comments = [];
    const response = await get("comments");
    for (let i = 0; i < 10; i++) {
      comments.push({
        comment: `${response.data[i].body}`,
        postId,
      });
    }
    await db.insert(botPostComments).values(comments);
  } catch (e) {
    console.log(e);
  }
};

const createPosts = async ({ botId }) => {
  try {
    const posts = [];
    let ids = [];
    const response = await get("posts");
    for (let i = 0; i < 10; i++) {
      posts.push({
        title: `${response.data[i].title}-${botId}`,
        content: response.data[i].body,
        botId,
      });
    }
    ids = await db.insert(botPosts).values(posts).$returningId();
    for await (let id of ids) {
      await createComments({
        postId: id.id,
      });
    }
  } catch (e) {
    console.log(e);
  }
};

const createBots = async () => {
  try {
    const users = [];
    let ids = [];
    const response = await get("users");
    for (let i = 0; i < 10; i++) {
      users.push({
        name: `${response.data[i].username}-${lastId}`,
        lastId,
      });
      lastId = lastId + 1;
    }
    ids = await db.insert(bots).values(users).$returningId();

    for await (let id of ids) {
      await createPosts({
        botId: id.id,
      });
    }
  } catch (e) {
    console.log(e);
  }
};

const totalBots = async () =>
  await db.select({ value: count(bots.id) }).from(bots);

module.exports = {
  createBots,
  totalBots,
};
