const axios = require("axios");
const baseUrl = "https://jsonplaceholder.typicode.com/";
const get = async (endpoint) => {
  return axios.get(`${baseUrl}${endpoint}`);
};

module.exports = { get };
