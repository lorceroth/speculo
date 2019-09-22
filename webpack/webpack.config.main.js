const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const baseConfig = require('./webpack.config');

const config = {
  entry: './src/main.ts',
  output: {
    path: path.join(__dirname, '../dist'),
    filename: 'main.js',
  },
  plugins: [
    new CopyWebpackPlugin([
      { from: './src/resources/config.json', to: 'config.json' },
    ]),
    new HtmlWebpackPlugin({
      template: './src/resources/index.html',
    }),
  ],
};

module.exports = Object.assign(baseConfig, config);
