var path = require('path');

module.exports = {
  context: __dirname,
  entry: "./react_minesweeper.jsx",
  output: {
    path: path.resolve(__dirname), 
    filename: "bundle.js"
  },
  module: {
    loaders: [
      {
        test: [/\.jsx?$/, /\.js?$/],
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015']
        }
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx', '*']
  }
};
