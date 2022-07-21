/* eslint-disable @typescript-eslint/no-var-requires */
const path = require("path");

module.exports = {
  publicPath: "./",
  pages: {
    index: {
      entry: "src/main.ts",
      title: "Cooking Vue",
    },
  },
  configureWebpack: {
    resolve: {
      alias: {
        "@": path.join(__dirname, "./src/"),
      },
    },
  },
};
