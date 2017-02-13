const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const localconfig = require('./local.config.json');

module.exports = {
  entry: [
    "./app/app" // Your appʼs entry point
  ],
  devtool: process.env.WEBPACK_DEVTOOL || "source-map",
  output: {
    path: path.join(__dirname, "public"),
    filename: "bundle.js"
  },
  // resolve: {
  //   extensions: ["", ".js"]
  // },
  module: {
    loaders: [{
        test: /\.js?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015']
        }
      },
      {
        test: /\.css$/,
        loader: "style-loader!css-loader"
      },
      {
        test: /\.scss$/,
        loader: "style-loader!css-loader!sass-loader"
      },
      {
        test: /\.handlebars$/,
        loader: "handlebars-loader"
      }
      //,
      // {
      //   test: /\.handlebars$/,
      //   loader: __dirname + "?helperDirs[]=" + __dirname + "/helpers"
      // }
    ]
  },
  devServer: {
    contentBase: "./public",
    noInfo: false, //  --no-info option
    hot: true,
    inline: true,
    host: localconfig.host
  },
  plugins: [
    new webpack.NoErrorsPlugin(),
    new HtmlWebpackPlugin({
      template: './app/template.html'
    })
  ],
  resolve: {
    alias: {
      handlebars: 'handlebars/dist/handlebars.min.js'
    }
  }
};