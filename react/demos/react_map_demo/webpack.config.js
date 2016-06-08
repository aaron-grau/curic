module.exports = {
  context: __dirname,
  entry: "./map.jsx",
  output: {
    filename: "./bundle.js",
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel',
        query: {
          presets: ['react']
        }
      }
    ]
  },
  resolve: {
    extensions: ["", ".js", ".jsx" ]
  }
};
