# Babel

Javascript development touches a lot of diverse environments: Node, Chrome,
Safari, etc. These various environments have different levels of compatibility
with advanced Javascript features like JSX and ES6. To ensure that our JSX and
ES6 code works in any environment, we will use a transpiler called **Babel** to
convert our code into universal, vanilla Javascript.

## Configuring Babel for Web Apps

Webpack can be configured to transpile your JSX and ES6 source code into browser-compatible Javascript when creating the bundle.

**0.	Install the appropriate NPM packages:**

```
	npm install --save babel-core babel-preset-es2015 babel-preset-react
```

`babel-core` is the transpiling engine itself. `babel-preset-es2015` and `babel-
preset-react` are configurations that tell the core transpiler how to interpret
ES6 and JSX, respectively.

**0.	Configure the `module` key of your `webpack.config.js`:**

```js
module.exports = {
	...
	module: {
	  loaders: [
	    {
	      test: [/\.jsx?$/, /\.js?$/], // specifies file types to transpile
	      exclude: /(node_modules)/, // leaves dependencies alone
	      loader: 'babel', // sets Babel as the transpiler
	      query: {
	        presets: ['es2015', 'react'] // tells Babel what syntaxes to translate
	      }
	    }
	  ]
	}
}
```

## Checking Compatibility

[This chart][compat-table] is a great resource to see what levels of native
support exist for advanced JS features in different environments. However, you
shoudn't have to worry about compatibility if you use Babel.

[compat-table]: http://kangax.github.io/compat-table/es6/
[node-green]: http://node.green/