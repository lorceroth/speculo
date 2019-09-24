const path = require('path');
const fs = require('fs');

const entry = process.argv.pop();
if (/webpack/.test(entry)) {
  throw new Error('An entry must be provided, e.g. "yarn build:plugin plugins/clock/clock.tsx"');
}

const pluginDir = path.join(__dirname,
  entry.split(/\/|\\/g).slice(0, -1).join('/'));
const manifestContent = fs.readFileSync(`${pluginDir}/plugin.json`, 'utf8');
const manifest = JSON.parse(manifestContent);

module.exports = {
  mode: 'development',
  output: {
    path: path.resolve(__dirname, 'dist/plugins'),
    filename: `${manifest.name}-${manifest.version}.js`,
    library: manifest.componentName,
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
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json', '.scss'],
    alias: {
      '@app': path.resolve(__dirname, 'src/'),
      '@plugins': path.resolve(__dirname, 'plugins/'),
    }
  },
};
