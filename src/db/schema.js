const { sql } = require("drizzle-orm");
const {
  int,
  mysqlTable,
  text,
  timestamp,
  uniqueIndex,
} = require("drizzle-orm/mysql-core");

const { relations } = require("drizzle-orm");
const { varchar } = require("drizzle-orm/pg-core");

const bots = mysqlTable(
  "bots",
  {
    id: int("id").primaryKey().autoincrement(),
    name: varchar("name", { length: 255 }).notNull(),
    createdAt: timestamp("created_at").defaultNow(),
  },
  (table) => ({
    nameUniqueIndex: uniqueIndex("nameUniqueIndex").on(lower(table.name)),
  }),
);

const botPosts = mysqlTable(
  "posts",
  {
    id: int("id").primaryKey().autoincrement(),
    title: varchar("title", { length: 255 }).notNull(),
    content: text("content"),
    botId: int("bot_id").references(() => bots.id),
    createdAt: timestamp("created_at").defaultNow(),
  },
  (table) => ({
    titleUniqueIndex: uniqueIndex("titleUniqueIndex").on(lower(table.title)),
  }),
);

const botPostComments = mysqlTable("comments", {
  id: int("id").primaryKey().autoincrement(),
  comment: text("comment"),
  postId: int("post_id").references(() => botPosts.id),
  createdAt: timestamp("created_at").defaultNow(),
});

const botRelations = relations(bots, ({ many }) => ({
  posts: many(botPosts),
}));

const postRelation = relations(botPosts, ({ one, many }) => ({
  bot: one(bots, {
    fields: [botPosts.botId],
    references: [bots.id],
  }),
  comments: many(botPostComments),
}));

const commentRelation = relations(botPostComments, ({ one }) => ({
  post: one(botPosts, {
    fields: [botPostComments.postId],
    references: [botPosts.id],
  }),
}));

function lower(item) {
  return sql`(lower(${item}))`;
}

module.exports = {
  bots,
  botPosts,
  botPostComments,
  lower,
};
