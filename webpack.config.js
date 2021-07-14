const path = require("path");

module.exports = {
  entry: {
    api: "./api/quickmoveapi.js",
  },
  output: {
    path: path.resolve(__dirname, "addon"),
    filename: "[name]/index.js",
  },
};
