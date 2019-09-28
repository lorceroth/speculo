const path = require('path');

const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const environment = process.env.NODE_ENV;

module.exports = {
  mode: environment,
  entry: './src/main.ts',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.js',
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.(eot|svg|woff|woff2|ttf|jpg|png)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
            },
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json', '.scss'],
    alias: {
      '@app': path.resolve(__dirname, 'src/'),
    },
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
