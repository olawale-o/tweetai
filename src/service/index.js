const db = require("../db/db");
const { bots, botPosts, botPostComments } = require("../db/schema");

const axios = require("axios");

let lastId = 1;

const createComments = async ({ postId }) => {
  let comments = [];
  const response = await axios
    .get("https://jsonplaceholder.typicode.com/comments")
    .then(async function (response) {
      for (let i = 1; i < 11; i++) {
        comments.push({
          comment: `${response.data[i].body}`,
          postId,
        });
      }
    })
    .catch(function (error) {
      console.log(error);
    });
  await db.insert(botPostComments).values(comments);
  console.log("finished writting comments");
};

const createPosts = async ({ userName, botId }) => {
  let posts = [];
  const response = await axios
    .get("https://jsonplaceholder.typicode.com/posts")
    .then(async function (response) {
      for (let i = 1; i < 11; i++) {
        posts.push({
          title: `${userName}-${response.data[i].title}-${botId}`,
          content: response.data[i].body,
          botId,
        });
      }
    })
    .catch(function (error) {
      console.log(error);
    });

  await db.insert(botPosts).values(posts);
  console.log("finished writting POSTS");
  for (let i = 0; i < posts.length; i++) {
    await createComments({
      postId: posts[i].id,
    });
  }
};

const createBots = async () => {
  const users = [];
  let i = 1;
  const response = await axios
    .get("https://jsonplaceholder.typicode.com/users")
    .then(async function (response) {
      for (let i = 0; i < 10; i++) {
        users.push({
          id: lastId,
          name: `${response.data[i].username}-${lastId}`,
        });
        lastId = lastId + 1;
      }

      await db.insert(bots).values(users);
      console.log("finished writting users");
    })
    .catch(function (error) {
      console.log(error);
    });

  for (let i = 1; i < users.length + 1; i++) {
    await createPosts({
      botId: users[i - 1].id,
      userName: users[i - 1].name,
    });
  }
};

const totalBots = async () =>
  await db.select({ value: count(bots.id) }).from(bots);

module.exports = {
  createBots,
  totalBots,
};
