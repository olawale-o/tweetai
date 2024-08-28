const moment = require("moment");
const BUCKET_SIZE = 5; // REQUESTS
const WINDOW_SIZE = 1; //MINUTES
const MAX_REQUEST_BLOCK_TIME = 5; // MINUTES
const mapBucket = new Map();

const rateLimiter = async (req, res, next) => {
  const currentRequestTime = moment();
  const ipAddress = req.ip;

  const newRequestLog = {
    firstRequestTimeStamp: currentRequestTime.unix(),
    requestCount: 1,
    ipAddressBlocked: false,
  };

  const ipTokenBucket = mapBucket.get(ipAddress);

  // check if this is the first request
  if (ipTokenBucket === undefined) {
    mapBucket.set(ipAddress, newRequestLog);
    next();
  } else {
    // check if ip address is blocked
    if (ipTokenBucket.ipAddressBlocked) {
      let elapsedBlockTimeStamp = currentRequestTime
        .subtract(MAX_REQUEST_BLOCK_TIME, "minutes")
        .unix();
      // check if ip is still block or block duration hasnt passed
      if (ipTokenBucket.ipBlockTimeStamp > elapsedBlockTimeStamp) {
        return res.status(429).json({
          status: false,
          message: "Request Blocked. Please try again later",
        });
      } else {
        mapBucket.set(ipAddress, newRequestLog);
        next();
      }
    } else if (!ipTokenBucket.ipAddressBlocked) {
      let windowStartTimestamp = moment()
        .subtract(WINDOW_SIZE, "minutes")
        .unix();
      // the request window might have elapsed, while request count is below limit
      if (ipTokenBucket.firstRequestTimeStamp < windowStartTimestamp) {
        mapBucket.set(ipAddress, newRequestLog);
        next();
      } else if (
        ipTokenBucket.firstRequestTimeStamp > windowStartTimestamp &&
        ipTokenBucket.requestCount >= BUCKET_SIZE
      ) {
        let blockedRequestLog = {
          ...ipTokenBucket,
          ipAddressBlocked: true,
          ipBlockTimeStamp: currentRequestTime.unix(),
        };

        mapBucket.set(ipAddress, blockedRequestLog);

        return res.status(429).json({
          status: false,
          message: "Maximum attempts exceeded. Please try later.",
        });
      } else if (
        ipTokenBucket.firstRequestTimeStamp > windowStartTimestamp &&
        ipTokenBucket.requestCount < BUCKET_SIZE
      ) {
        ipTokenBucket.requestCount++;
        mapBucket.set(ipAddress, ipTokenBucket);
        next();
      }
    }
  }
};

module.exports = {
  rateLimiter,
};
