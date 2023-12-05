"use strict";

const path = require("path");
const webpack = require("webpack");

/**@type {import('webpack').Configuration}*/
const config = {
  target: "node",

  entry: "./extension.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "extension.js",
    libraryTarget: "commonjs2",
    devtoolModuleFilenameTemplate: "../[resource-path]",
  },
  devtool: "source-map",
  externals: {
    vscode: "commonjs vscode",
    fs: "commonjs fs",
    path: "commonjs path",
  },
  resolve: {
    mainFields: ["browser", "module", "main"],
    extensions: [".js"],
  },
  node: {
    __dirname: false,
    __filename: false,
  },
};

module.exports = config;
