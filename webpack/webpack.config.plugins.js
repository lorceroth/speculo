const path = require('path');
const baseConfig = require('./webpack.config');

const config = {
  entry: {
    clock: './plugins/clock/clock.tsx',
  },
  output: {
    path: path.join(__dirname, '../dist/plugins'),
    filename: '[name].js',
  },
  externals: {
    React: 'react',
    ReactDOM: 'react-dom',
  },
};

module.exports = Object.assign(baseConfig, config);
