const csv = require("csv-parser");
const fs = require("node:fs");
const path = require("node:path");

const results = [];

console.log(path.dirname(path.dirname(path.resolve(__dirname))));

fs.createReadStream(
  path.resolve(
    path.dirname(path.dirname(path.resolve(__dirname))),
    "./data/uber.csv",
  ),
)
  .pipe(csv())
  .on("data", (data) =>
    results.push({
      pickup_longitude: data.pickup_longitude,
      pickup_latitude: data.pickup_latitude,
    }),
  )
  .on("end", () => {
    console.log("finished reading");
    fs.writeFile(
      path.resolve(
        path.dirname(path.dirname(path.resolve(__dirname))),
        "./data/uber.json",
      ),
      JSON.stringify(results),
      "utf8",
      (err) => {
        if (err) throw err;
        console.log("Finished wiriting");
      },
    );
  });
