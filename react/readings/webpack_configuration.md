# Webpack Configuration

## `.gitignore`

Before discuss into webpack configuration, you should know that running webpack 
and using NPM create many redundant and very large files in your local project
directory. Use a `.gitignore` file to prevent these files from being pushed to and 
pulled from your remote Git repositories. Create a `.gitignore` file in your 
project's root directory and list the files or directories you want to ignore, 
one per line. Use a trailing `/` to indicate a directory to ignore.

For example,
```
# .gitignore

node_modules/
bundle.js
bundle.js.map
```

You can view App Academy's full `.gitignore` [here][gitignore].

## Configuring Webpack

Just like with NPM, you can use a configuration file to set up your webpack
options. You'll have to create this file by hand. It should live in your
project's root directory, be named `webpack.config.js`, and export a single
object.

### Specifying Entry and Output Files

`webpack.config.js` allows you to specify your entry file, and the name and
location of your output file. See the example below:

```js
// webpack.config.js

module.exports = {
  entry: "frontend/my_app.jsx",
  output: {
      path: "app/assets/javascripts",
      filename: "bundle.js"
  }
  ...
};
```

**NB**: For Rails projects, make sure to locate the bundle in your
`app/assets/javascripts` folder so that it's included in your asset pipeline.

### Dev Tools / Source Map

`webpack.config.js` accepts a `devtool` key that can be used to enable useful
tools, particularly `source-map`. A source map makes it possible for you to get
line references to your code when errors are raised, which is impossible
otherwise due to bundling.

```js
// webpack.config.js

module.exports = {
  ...
	devtool: 'source-map',
  ...
}
```

### Resolving Extensions

`webpack.config.js` also accepts a `resolve` key, which lets you specify what
file extensions to process without specifically naming them.

```js
// webpack.config.js

module.exports = {
	...
	resolve: {
		extensions: ['', '.js', '.jsx']
	},
  ...
};
```

By including an empty string, you can write import statements more succinctly:

For example,
```js
import App from './components/app';
import { createTodos } from './actions/todos';
```

# Sample `webpack.config.js`

```js
// webpack.config.js

module.exports = {
  entry: "path/to/entry.jsx",
  output: {
    path: "app/assets/javascripts",
    filename: "bundle.js",
  },
  module: {
    loaders: [
      {
        test: [/\.jsx?$/, /\.js?$/],
        exclude: /(node_modules)/,
        loader: 'babel',
        query: {
          presets: ['es2015', 'react']
        }
      }
    ]
  },
  devtool: 'source-map',
  resolve: {
    extensions: ["", ".js", ".jsx" ]
  }
};
```

[gitignore]: https://github.com/appacademy/dotfiles/blob/master/dot/gitignore
