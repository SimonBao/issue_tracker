const webpack = require("webpack");
const path = require("path");

/*
 * We've enabled UglifyJSPlugin for you! This minifies your app
 * in order to load faster and run less javascript.
 *
 * https://github.com/webpack-contrib/uglifyjs-webpack-plugin
 *
 */

const UglifyJSPlugin = require("uglifyjs-webpack-plugin");

module.exports = {
  entry: "./src/App.jsx",
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "static"),
    publicPath: "/"
  },

  module: {
    rules: [
      {
        test: /\.jsx$/,
        exclude: /node_modules/,

        use: [
          {
            loader: "babel-loader",

            options: {
              presets: ["env", "react", "es2015"]
            }
          }
        ]
      }
    ]
  },
  devServer: {
    historyApiFallback: true
  },
  plugins: [
    new UglifyJSPlugin(),
    new webpack.ProvidePlugin({
      React: "react"
    })
  ]
};
