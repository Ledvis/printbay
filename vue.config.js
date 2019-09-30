const path = require("path");

// vue.config.js
module.exports = {
  chainWebpack: config => {
    config
      .entry("app")
      .clear()
      .add("./client/main.js")
      .end();
    config.resolve.alias.set("@", path.join(__dirname, "./client"));
  },
  devServer: {
    port: process.env.CLIENT_PORT,
    proxy: `http://localhost:${process.env.SERVER_PORT}`
  }
};
