const { migrate } = require("drizzle-orm/mysql2/migrator");
const db = require("./db");

const main = async () => {
  try {
    console.log("Running your migrations...");
    // This will run migrations on the database, skipping the ones already applied
    await migrate(db, { migrationsFolder: "drizzle" });

    console.log("Woohoo! Migrations completed!");
    return;
  } catch (e) {
    console.error(e);
    process.exit(1);
  } finally {
    // Don't forget to close the connection, otherwise the script will hang
    //  await client.end();
    //
    console.log("Migration complete");
    process.exit(1);
  }
};

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(() => {
    console.log("Migration complete");
  });
