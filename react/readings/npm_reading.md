# Getting Started With Node Package Manager

You've already seen NPM and Webpack, but today we're going to explore a few more features that we will need for writing React apps.

## Transpiling

**Transpiling** is taking source code written in one language or syntax and transforming it into another one. When using React, our source code will be written in JSX and ES2015. Because many browsers do not fully support these syntaxes, we need to transpile our code to ES5 Javascript for compatibility.

## NPM Init and `package.json`

We're going to use `npm` to facilitate our transpiling. As you've already seen, `npm` allows us to install dependencies to individual JS projects, similar to ruby's `bundler` gem. 

To set up `npm` for a project, navigate to the project directory and run: 

```
npm init --yes
```

This command creates a `package.json` file representing the NPM configuration of your project. The `--yes` flag tells `npm` to use a reasonable default setup. 

`package.json` has two main purposes: identifying key information about the project to NPM, and specifying the dependencies of the project (the libraries that need to be loaded). You can read more on each property of `package.json` [here][packageurl], but many of them are only relevant if we're exporting our own package, which we won't be doing in this course. **The most important property for us right now is `dependencies`.** Think of it as your Gemfile.

Now that we have a `package.json` file, we need to actually install some dependencies. **To install a package as a dependency, run the following command:**

```
npm install --save name_of_package
```
Breaking down the command:
  * `npm install`: this installs the actual package and places it in your `node_modules` folder. It will create the folder if it doesn't already exist.
  * `--save`: the package is installed, but in order to get it listed as a dependency in your `package.json`, we need to include the `--save` option. Later, someone cloning your project can run `npm install` to get all the listed dependencies, similar to `bundle install`.
  * `name_of_package`: the name of the package to install. You can find package names on [npmjs.com][npm-site] if you're not sure what the package you might want is called.

You will need to `npm install --save` the following packages for a React project: 
  * `webpack`
  * `react`: provides component creation methods
  * `react-dom`: provides DOM-interaction methods

By the way, you can install multiple packages at once like this: 

```
npm install --save package1 package2 package3
```

## Adding a `webpack` script

Recall that, in Ruby, running `bundle exec some_command` is **not the same** as running `some_command`. In the former, the `Gemfile`-specified version of `some_command` is run, while in the latter, the local version is run. Omitting `bundle exec` when running commands can cause errors if our app isn't compatible with the local version.

To solve this issue with NPM packages, we need to add `"scripts"` for any packages that we intend to call from the command line. Once we've added a script for a package, we can 

```
npm run that_package
```

to ensure that we run the `package.json` specified version.

To create a `webpack` script, add the following attribute to your `package.json`:
```
"scripts": {
  "webpack": "webpack"
},
```

When building your app, always use `npm run webpack` instead of simply `webpack` to avoid compatibility problems.

## Try it yourself

Before we move on, **try setting up a new project** in a folder called `hello_world_app`. Install the dependencies listed above and then add a script for `webpack`. Your `package.json` should look very similar to this (you may have higher version numbers):

```json
{
  "name": "hello_world_app",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "dependencies": {
    "react": "^0.14.2",
    "react-dom": "^0.14.2",
    "webpack": "^1.12.4"
  },
  "scripts": {
    "webpack": "webpack"
  },
}
```

## Loaders

With the steps above, we've loaded React, but what about JSX? the `react` package itself doesn't provide JSX transpiling, and there's still the issue of our ES2015 code confusing older browsers.

We can address our transpiling problems by adding **Babel** to our dependencies. Babel translates various syntaxes into browser-compatible javascript. 

To get Babel, install these packages: 
  * `babel-core`
  * `babel-loader`
  * `babel-preset-react`
  * `babel-preset-es2015`

Once everything is installed, create a `webpack.config.js` file. Copy this config to start, which should look familiar.

```javascript
module.exports = {
  context: __dirname,
  entry: "./hello_world.jsx",
  output: {
    path: "./",
    filename: "bundle.js"
  }
};
```

Now we need to add a **loader**. Loaders preprocess our source files before Webpack bundles them. Naturally, they're the perfect vehicle for transpiling. Extend your config to match this:

```javascript
module.exports = {
  context: __dirname,
  entry: "./hello_world.jsx",
  output: {
    path: "./",
    filename: "bundle.js"
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
    extensions: ["", ".js", ".jsx"]
  }  
};
```

What does this do? It tells Webpack that, when compiling the `bundle.js` file, it should first use Babel to process any file whose name matches the regex. Babel will apply the `react` and `es2015` presets to our files and convert them into ES5 in the bundle. We add an `exclude` property for `node_modules` since we don't want to mess with other packages while doing this. The `resolve: ...` line tells Webpack what types of files to include in bundle.js.

## Source Maps

When Webpack bundles our files, the resulting bundle doesn't have the same file names and line numbers as our source code. This makes locating errors difficult, since error messages will point to the bundle and not the original source file.  

We can fix this by adding a **source map**, which map lines of bundle code to their corresponding source file locations. Look at the difference [without][without-source-maps] and [with][with-source-maps] a source map.

Add a source map to your webpack config by extending it as follows: 

```javascript
module.exports = {
  context: __dirname,
  entry: "./hello_world.jsx",
  output: {
    path: "./",
    filename: "bundle.js"
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
    extensions: ["", ".js", ".jsx"]
  },
  devtool: 'source-map'
};
```

## Sourcing the bundle

We're almost there! Let's finish our example app by creating an `index.html` and a `hello_world.jsx` file. It's important that the latter matches the `entry` in our Webpack config, as we'll require all of our React components from here. Put the following code in `hello_world.jsx`:

```javascript
const React = require('react');
const ReactDOM = require('react-dom');

var MyComponent = React.createClass({
  render() {
    return(
      <div>Hello World</div>
    );
  }
});

document.addEventListener("DOMContentLoaded", () => {
  ReactDOM.render(<MyComponent />, document.getElementById('main'));
});
```

Lastly, using a standard script tag, source `bundle.js` in `index.html`. 

Run `webpack` in your terminal, then open `index.html`. Congratulations: you're
up and running!

[npm-site]: https://www.npmjs.com/
[packageurl]: http://browsenpm.org/package.json
[without-source-maps]: http://imgur.com/3PuzELi
[with-source-maps]: http://imgur.com/zZzWt9K
