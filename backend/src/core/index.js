module.exports = {
  createRoutes: require("./routes"),
  useMiddlewares: require("./useMiddlewares"),
  createSocket: require("./socket-io"),
  constants: require("./constants")
};