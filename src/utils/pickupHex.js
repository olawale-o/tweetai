const { latLngToCell } = require("h3-js");
const fs = require("node:fs");
const path = require("node:path");
const JSONStream = require("JSONStream");

const parser = JSONStream.parse("*");

const { Transform } = require("stream");

const transform = new Transform({
  transform: (chunk, encoding, done) => {
    const result = chunk.toString("utf8");
    done(null, result);
  },
});

const convertLatlngToCell = (coord) => {
  const { pickup_longitude, pickup_latitude } = coord;
  return latLngToCell(pickup_latitude, pickup_longitude, 7);
};

const uberHexJson = fs.createWriteStream(
  path.resolve(path.dirname(path.dirname(__dirname)), "./data/uber_hex.json"),
);

let hexs = {};

fs.createReadStream(
  path.resolve(path.dirname(path.dirname(__dirname)), "./data/uber.json"),
  { encoding: "utf8" },
)
  .pipe(parser)
  .on("data", (data) => {
    const hexId = convertLatlngToCell(data);
    if (hexId in hexs) {
      hexs[hexId] += 1;
    } else {
      hexs[hexId] = 1;
    }
  })
  .on("end", () => {
    console.log("No more data");
    fs.writeFile(
      path.resolve(
        path.dirname(path.dirname(__dirname)),
        "./data/uber_hex.json",
      ),
      JSON.stringify(hexs),
      "utf8",
      (err) => {
        if (err) throw err;
        console.log("Finished wiriting");
      },
    );
  });
