var webpack = require('webpack');
var path = require('path');

var config = {
  entry: './index.js',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js',
    sourceMapFilename: '[file].map',
    publicPath: '/'
  },
  devServer: {
    //contentBase: path.resolve(__dirname, 'build'),
  },
  module: {
    loaders: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          loader: 'babel-loader',
          query: {
            presets: ['es2015']
          }
      },
        {
          test: /\.html$/,
          loader: 'file-loader',
        }
    ],
  },
  devtool: 'source-map'
};

module.exports = config;
