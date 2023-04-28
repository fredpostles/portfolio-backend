const path = require("path");

module.exports = {
  mode: "development",
  entry: "./index.js",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "public"),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
    ],
  },
  resolve: {
    fallback: {
      path: require.resolve("path-browserify"),
      net: require.resolve("net"),
      http: require.resolve("stream-http"),
      async_hooks: "async_hooks",
      zlib: "browserify-zlib",
      crypto: require.resolve("crypto-browserify"),
      fs: false,
      stream: require.resolve("stream-browserify"),
      os: require.resolve("os-browserify/browser"),
    },
  },
};
