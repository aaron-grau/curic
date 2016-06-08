module.exports = {
  context: /* the directory containing the entry file */,
  entry: /* your `main` file */,
  output: {
    path: /* where `index.html` can find your bundle */,
    filename:/* your `bundle` */
  }
  devtool: /* add 'source-map' to get line-sourced errors in Dev Tools*/
};

// NOTE: `context` and `path` are relative to this config file.