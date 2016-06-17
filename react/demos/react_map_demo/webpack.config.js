"use strict";

module.exports = {
  context: __dirname,
  entry: "./map.jsx",
  output: {
    filename: "./bundle.js",
  },
  module: {
    loaders: [
      {
        test: [/\.jsx?$/, /\.js?$/],
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          presets: ['react', 'es2015']
        }
      }
    ]
  },
  resolve: {
    extensions: ["", ".js", ".jsx" ]
  }
};
