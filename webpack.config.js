const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");
const path = require("path");

module.exports = {
  entry: "./src/index.ts",
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: "ts-loader",
        exclude: /node_modules/
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: ["file-loader"]
      },
    ]
  },
  resolve: {
    extensions: [".ts", ".js"]
  },
  devtool: "inline-source-map",
  devServer: {
    contentBase: [__dirname + "/dist", __dirname + "/assets"],
    hot: true
  },
  plugins: [
    new HtmlWebpackPlugin(),
    new webpack.ProvidePlugin({
      'p5': 'p5/lib/p5',
      'p5dom': 'p5/lib/addons/p5.dom'
    })
  ],
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist")
  }
};
