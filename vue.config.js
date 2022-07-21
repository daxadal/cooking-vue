/* eslint-disable @typescript-eslint/no-var-requires */
const path = require("path");
const { defineConfig } = require("@vue/cli-service");

module.exports = defineConfig({
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
});
