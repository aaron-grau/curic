# Getting Started With Node Package Manager

During the React/Flux curriculum, we're going to continue to use Webpack to compile
all of our resources into one large bundled JavaScript file. We now need to
solve a separate problem, though: getting access to the React.js library and to
a compiler for the JSX we're going to write. As you've seen, we _could_ get the
React library from a CDN by loading it in a `<script>` tag, but we're going to
take this opportunity to work with Node Package Manager for the first time.

Create a new project directory called `hello_world_app`. Go ahead and run `npm
init --yes`. The `--yes` flag will give us a reasonable default setup.  If npm still asks you for input, just hit enter bunch of times to choose the default settings.  This command creates a `package.json` file.

Package.json has two main purposes: identifying key
information about the project to npm, and specifying the dependencies of the
project (the libraries that need to be loaded). You can read more on each
property of `package.json` [here][packageurl], but many of them are only
relevant if we're exporting our own package, which we won't be doing today. The
most important property for us right now is `dependencies`. Think of this as
your Gemfile.

Now that we have a `package.json` file, we need to actually install some
packages. The two key ones for our Hello World app are `react` and `webpack`.
Install React by using the following command: `npm install --save react`.
Breaking down the command:
  * `npm install`: this installs the actual package and places it in your 
  `node_modules` folder.
  * `--save`: the package is installed, but in order to get it listed as a 
  dependency in your `package.json`, we need to include the `--save` option.
  * `react`: the name of the package to install. You can find package names on 
  [npmjs.com][npm-site] if you're not sure what the package you might want is 
  called.

We also need `react-dom` so we can call `ReactDOM.render`. Run the same command
for this pacakge: `npm install --save react-dom`. Lastly, install Webpack: `npm
install --save webpack`. You might ask why we're doing this when we've likely
already installed Webpack globally. Think of it as the difference between
installing a gem globally on your machine and putting it in your Gemfile. The
latter allows much greater project-specific control. What if someone removed the
global version of Webpack on a shared machine, or updated it to a version with
breaking changes? We want to make sure our project will still work.

Before we move on, take another look at the `package.json` file. It should look
very similar to this:

```javascript
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
  }
}
```

We're almost ready. We've loaded React, but what about JSX? Well, JSX is not
itself a library that we install, but is rather a syntax extension of JavaScript
that we need to then compile into vanilla JavaScript. If we send JSX to the
browser without compiling it, the browser won't know what to do with our code
--- it doesn't speak the language. There's good news: Webpack makes this really
easy. What we're going to do is add a transpiler called `babel` to our Webpack
configuration. If you haven't already, create a `webpack.config.js` file. Copy
this config to start, the format of which will look familiar.

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

What we're going to add is something called a **loader**. Extend your config to 
match this: 

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
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          presets: ['react']
        }
      }
    ]
  }
};
```

What does this do? It tells Webpack that, when compiling the `bundle.js` file,
it should first use `babel` to process any file whose name matches the regex. We
add an `exclude` property for `node_modules` since we don't want to mess with
other packages while doing this. This won't quite work yet -- we need to
actually install babel, and its `react` presets. Do this now by running `npm
install --save babel-core`, `npm install --save babel-loader`, and `npm install
--save babel-preset-react`.

Now we want to add source-maps, as well as point webpack at the right files to copy over to bundle.js:

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
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          presets: ['react']
        }
      }
    ]
  },
  devtool: 'source-map',
  resolve: {
    extensions: ["", ".js", ".jsx"]
  }
};
```

The `devtool: 'source-map'` line:  This saves us boatloads of time debugging.  When there's an error in our app, the console will point us at the original file that has the error instead of bundle.js.  Look at the difference [without][without-source-maps] and [with][with-source-maps] source maps.  See how much more confusing it is to track down the error without source maps?

The `resolve: ...` line: tells us what types of files to look at and eventually copy into bundle.js.


We're almost there! Create an `index.html` and a `hello_world.jsx` file. It's
important that the latter matches our `entry` in our Webpack config, as we'll
require all of our React components from here. Using a standard script tag,
source `bundle.js` in your HTML page. Put the following code in
`hello_world.jsx`:

```javascript
var React = require('react');
var ReactDOM = require('react-dom');

var MyComponent = React.createClass({
  render: function () {
    return(
      <div>Hello World</div>
    );
  }
});

document.addEventListener("DOMContentLoaded", function () {
  ReactDOM.render(<MyComponent />, document.getElementById('main'));
});
```

Run `webpack` in your terminal, then open index.html. Congratulations: you're
up and running!

[npm-site]: https://www.npmjs.com/
[packageurl]: http://browsenpm.org/package.json
[without-source-maps]: http://imgur.com/3PuzELi
[with-source-maps]: http://imgur.com/zZzWt9K
