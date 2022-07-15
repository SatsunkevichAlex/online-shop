const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
  entry: "./src/main.ts",
  module: {
    rules: [
      {
        test: /\.ts$/,
        include: [path.resolve(__dirname, "src")],
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          // Creates `style` nodes from JS strings
          "style-loader",
          // Translates CSS into CommonJS
          "css-loader",
          // Compiles Sass to CSS
          "sass-loader",
        ],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        loader: "file-loader",
        options: {
          name: "/public/images/[name].[ext]",
        },
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".js"],
  },
  devtool: "source-map",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "./public"),
  },
  mode: "development",
  plugins: [
    new HtmlWebpackPlugin({
      title: "Brashes shop",
      template: "src/index.html",
    }),
    new CopyWebpackPlugin({
      patterns: [{ from: "./src/assets/images", to: "images" }],
    }),
  ],
};
