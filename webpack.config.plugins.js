const path = require('path');
const fs = require('fs');

const environment = process.env.NODE_ENV;

const entry = process.argv.pop();
if (/webpack/.test(entry)) {
  throw new Error('An entry must be provided, e.g. "yarn build:plugin plugins/clock/clock.tsx"');
}

const entrySegments = entry.split(/\/|\\/g);
const componentName = entrySegments[entrySegments.length - 1].replace(/.tsx/, '');

module.exports = {
  mode: environment,
  output: {
    path: path.resolve(__dirname, 'dist/plugins'),
    filename: `${componentName}.js`,
    library: componentName,
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
  externals: {
    React: 'react',
    ReactDOM: 'react-dom',
    // moment: 'moment',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json', '.scss'],
    alias: {
      '@app': path.resolve(__dirname, 'src/'),
      '@plugins': path.resolve(__dirname, 'plugins/'),
    }
  },
};
