const baseWebpackConfig = require("./webpack.base.conf");

module.exports = {
  entry: "./src/sw.js",
  target: "webworker",
  output: {
    path: baseWebpackConfig.output.path,
    filename: "sw.js",
    publicPath: baseWebpackConfig.output.publicPath
  },
  module: baseWebpackConfig.module
};
