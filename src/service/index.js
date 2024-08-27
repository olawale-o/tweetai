const db = require("../db/db");
const { bots, botPosts, botPostComments } = require("../db/schema");

const { get } = require("../api");

let lastId = 1;

const createComments = async (comments, ids) => {
  let data = [];
  for (let i = 0; i < ids.length; i++) {
    for (let j = 0; j < 10; j++) {
      data.push({
        comment: `${comments[j].body}`,
        postId: ids[i].id,
      });
    }
  }
  await db.insert(botPostComments).values(data);
};

const createPosts = async (posts, botIds) => {
  let data = [];
  let ids = [];
  for (let i = 0; i < botIds.length; i++) {
    for (let j = 0; j < 10; j++) {
      data.push({
        title: `${j}-${posts[i].title}-${botIds[i].id}`,
        content: posts[j].body,
        botId: botIds[i].id,
      });
    }
  }
  ids = await db.insert(botPosts).values(data).$returningId();

  return ids;
};

const createBots = async (users) => {
  const data = [];
  let ids = [];
  for (let i = 0; i < users.length; i++) {
    data.push({
      name: `${users[i].username}-${lastId}`,
      lastId,
    });
    lastId = lastId + 1;
  }
  ids = await db.insert(bots).values(data).$returningId();

  return ids;
};

const totalBots = async () =>
  await db.select({ value: count(bots.id) }).from(bots);

const makeCall = async () => {
  await Promise.all([get("users"), get("posts"), get("comments")])
    .then(async ([bots, posts, comments]) => {
      const botIds = await createBots(bots.data);
      const postIds = await createPosts(posts.data, botIds);
      await createComments(comments.data, postIds);
    })
    .catch((e) => console.log(e));
};

module.exports = {
  totalBots,
  makeCall,
};
