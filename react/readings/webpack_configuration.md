# Webpack Configuration 

Just like with NPM, you can use a configuration file to set up your webpack
options.  You'll have to create this file by hand. It should be named
`webpack.config.js` and export a single object.

## Specifying Entry and Output Files

`webpack.config.js` allows you to specify your entry file and the name and
location of your output file. See the example below (Note: `__dirname`
references the directory where `webpack.config.js` is located). For Rails
projects, make sure to locate the bundle in your `app/assets/javascripts` folder
so that it's included in your asset pipeline.

```js
module.exports = {
  context: __dirname + "/frontend",
  entry: "./my_app.jsx",
  output: {
      path: __dirname + "/app/assets/javascripts",
      filename: "bundle.js"
  }	
};
```

## Dev Tools / Source Map

`webpack.config.js` accepts a `devtool` key that can be used to enable useful
tools, particularly `source-map`. A source map makes it possible
for you to get line references to your code when errors are raised, which is
impossible otherwise due to bundling.

```js
module.exports = {
	devtool: 'source-map';
}
```

## Resolving Extensions

`webpack.config.js` also accepts a `resolve` key, which lets you specify what
file extensions to process without specifically naming them.

```js
module.exports = {
	...
	resolve: {
		extensions: ['','.js', '.jsx']
	}
};
```

By including an empty string, you can write import statements more succinctly: 

```js
import App from './components/app';
import { createTodos } from './actions/todos';

```

## `.gitignore`

Running Webpack creates a lot of redundant and very large files in your local directory. Use a `.gitignore` file to prevent these files from being pushing and pulled from your remote Git repositories. Create a `.gitignore` and list the files or directories you want to ignore, one per line.

```
node_modules
bundle.js
bundle.js.map
```

You can view App Academy's full `.gitignore` [here][gitignore].

[gitignore]: https://github.com/appacademy/dotfiles/blob/master/dot/gitignore


