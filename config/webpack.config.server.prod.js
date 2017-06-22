'use strict';

const path = require('path');
const paths = require('./paths');
const nodeExternals = require('webpack-node-externals');

// This is the production configuration.
// It compiles slowly and is focused on producing a fast and minimal bundle.
// The development configuration is different and lives in a separate file.
module.exports = {
  target: 'node',
  // Don't attempt to continue if there are any errors.
  bail: true,
  devtool: 'cheap-module-source-map',
  entry: [paths.serverIndexJs],
  output: {
    // The build folder.
    path: paths.appBackend,
    // Generated JS file names (with nested folders).
    // There will be one main bundle, and one file per asynchronous chunk.
    // We don't currently advertise code splitting but Webpack supports it.
    filename: 'server.js',
  },
  resolve: {
    // This allows you to set a fallback for where Webpack should look for modules.
    // We placed these paths second because we want `node_modules` to "win"
    // if there are any conflicts. This matches Node resolution mechanism.
    // https://github.com/facebookincubator/create-react-app/issues/253
    modules: ['node_modules', paths.appNodeModules].concat(
      // It is guaranteed to exist because we tweak it in `env.js`
      process.env.NODE_PATH.split(path.delimiter).filter(Boolean)
    ),
    // These are the reasonable defaults supported by the Node ecosystem.
    // We also include JSX as a common component filename extension to support
    // some tools, although we do not recommend using it, see:
    // https://github.com/facebookincubator/create-react-app/issues/290
    extensions: ['.js', '.json', '.jsx'],
  },
  module: {
    strictExportPresence: true,
    rules: [
      {
        exclude: [
          /\.html$/,
          /\.(js|jsx)$/,
          /\.css$/,
          /\.json$/,
          /\.bmp$/,
          /\.gif$/,
          /\.jpe?g$/,
          /\.png$/,
        ],
        loader: require.resolve('file-loader'),
        options: {
          name: 'static/media/[name].[hash:8].[ext]',
        },
      },
      // "url" loader works just like "file" loader but it also embeds
      // assets smaller than specified size as data URLs to avoid requests.
      {
        test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
        loader: require.resolve('url-loader'),
        options: {
          limit: 10000,
          name: 'static/media/[name].[hash:8].[ext]',
        },
      },
      // Process JS with Babel.
      {
        test: /\.(js|jsx)$/,
        include: paths.appSrc,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['es2015', 'react-app'],
          },
        },
      },
      {
        test: /\.css$/,
        use: [
          require.resolve('isomorphic-style-loader'),
          {
            loader: require.resolve('css-loader'),
            options: {
              importLoaders: 1,
              modules: true,
              minimize: true,
              localIdentName: '[name]_[local]_[hash:base64:5]',
            },
          },
        ],
      },
    ],
  },
  externals: [nodeExternals()],
};
