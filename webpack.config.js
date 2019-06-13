/* eslint-disable */
const TerserPlugin = require("terser-webpack-plugin");
const webpack = require("webpack");
const path = require("path");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = function(env) {
  const isProduction = env.production;
  const webpackConfig = {
    mode: isProduction ? "production" : "development",
    devtool: isProduction ? false : "inline-source-map",
    entry: {
      popup: path.join(__dirname, "src/popup/index.tsx"),
      background: path.join(__dirname, "src/background/index.ts"),
      contentScript: path.join(__dirname, "src/contentScript/index.ts"),
      "popup.css": path.join(__dirname, `src/popup/popup.${env.browser}.scss`)
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
          use: "ts-loader"
        },
        {
          exclude: /node_modules/,
          test: /\.scss$/,
          use: [
            {
              loader: MiniCssExtractPlugin.loader,
              options: {
                hmr: !isProduction
              }
            },
            {
              loader: "css-loader" // Translates CSS into CommonJS
            },
            {
              loader: "sass-loader" // Compiles Sass to CSS
            }
          ]
        }
      ]
    },
    resolve: {
      extensions: [".ts", ".tsx", ".js"]
    },
    plugins: [
      new webpack.DefinePlugin({
        BROWSER: `"${env.browser}"`
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
      ]),
      new MiniCssExtractPlugin({
        filename: "../css/popup.css"
      })
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
