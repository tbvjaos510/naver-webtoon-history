/* eslint-disable */
const TerserPlugin = require("terser-webpack-plugin");
const webpack = require("webpack");
const path = require("path");
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = function(env) {
  const isProduction = env.production;
  const webpackConfig = {
    mode: isProduction ? "production" : "development",
    devtool: isProduction ? false : "inline-source-map",
    entry: {
      popup: path.join(__dirname, "src/popup/index.tsx"),
      background: path.join(__dirname, "src/background/index.ts"),
      contentScript: path.join(__dirname, "src/contentScript/index.ts")
    },
    output: {
      path: path.join(__dirname, `dist/${env.browser}/js`),
      filename: "[name].js"
    },
    module: {
      rules: [
        {
          exclude: /node_modules/,
          test: /\.tsx?$/,
          loader: "ts-loader"
        }
      ]
    },
    resolve: {
      plugins: [new TsconfigPathsPlugin()],
      extensions: [".ts", ".tsx", ".js"]
    },
    plugins: [
      new webpack.DefinePlugin({
        BROWSER: `"${env.browser}"`,
        ENV: `"${isProduction ? "production" : "development"}"`
      }),
      new CopyWebpackPlugin([
        {
          from: "src/static",
          to: `../`
        },
        {
          from: `src/manifest.${env.browser}.json`,
          to: `../manifest.json`
        }
      ])
    ]
  };
  if (isProduction) {
    webpackConfig.optimization = {
      minimizer: [
        new TerserPlugin({
          terserOptions: {
            compress: {
              drop_console: true
            }
          }
        })
      ]
    };
  }
  return webpackConfig;
};
