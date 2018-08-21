const path = require("path");
const webpack = require("webpack");

const srcPath = path.resolve(__dirname, "./src/js/");
const distPath = path.resolve(__dirname, "./dist/js/");

module.exports = function(mode = "production") {
    return {
        mode: mode,
        resolve: {
            alias: {
                "@": srcPath
            }
        },
        plugins: [

        ],
        entry: {
            "background": [
                path.resolve(srcPath, "background.js")
            ],
            "scripts": [
                path.resolve(srcPath, "scripts.js")
            ]
        },
        output: {
            path: distPath,
            filename: "[name].js"
        }
    }
}
