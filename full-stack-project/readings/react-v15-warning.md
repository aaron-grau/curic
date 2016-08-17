# Removing the Minification Warning from React v15

In order to make the warning about using a minified copy of the development version of React go away, we have to make a couple changes to our config files.


Because we only want this process to happen in production, we are going to
create a special webpack config file just for production, and then configure our
app to use this config file only we deploy to Heroku.

## webpack.config.prod.js

1. Copy your `webpack.config.js` to a new file called `webpack.config.prod.js`
2. Open up `webpack.config.prod.js`
3. Require webpack at the top of the file and assign it `var webpack` as below.
4. Copy the entire `plugins` section from the code block below and add it to the
   file.

Your `webpack.config.prod.js` should look exactly like the following code block, but your entry
point will be different.


```js
var webpack = require("webpack");

module.exports = {
  context: __dirname,
  entry: "./frontend/appName.jsx",
  output: {
    path: "./app/assets/javascripts",
    filename: "bundle.js"
  },
  plugins:[
    new webpack.DefinePlugin({
      'process.env':{
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress:{
        warnings: true
      }
    })
  ],
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          presets: ['react', 'es2015']
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

## package.json
1. Remove the `postinstall` option from `scripts`
2. Add a `heroku-postbuild` option with a value of `webpack --config
   webpack.config.prod.js`

See below for an example `package.json` with the update `scripts` value.

```js
{
  "name": "app_name",
  "version": "1.0.0",
  "description": "[Heroku link][heroku] **NB:** This should be a link to your production site",
  "main": "index.js",
  "directories": {
    "doc": "docs",
    "test": "test"
  },
  "scripts": {
    "heroku-postbuild": "webpack --config webpack.config.prod.js"
  },
  "repository": {
    "type": "git",
    "url": "git+https://example.com.git"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "bugs": {
    "url": "example.com"
  },
  "homepage": "example.com",
  "dependencies": {
    "babel-core": "^6.7.7",
    "babel-loader": "^6.2.4",
    "babel-preset-react": "^6.5.0",
    "flux": "^2.1.1",
    "react": "^15.0.1",
    "react-dom": "^15.0.1",
    "react-router": "^2.3.0",
    "webpack": "^1.13.0"
  },
  "engines": {
    "node": "5.7.1",
    "npm": "3.6.0"
  }
}
```

## Deploy
Commit your changes, push to Heroku, and then the warning should be gone

## Explanation (you don't need to know this, this is just if you're curious)

React v15 checks `process.env.NODE_ENV` to see if it should used the
production or development version. We want to remove every trace of the
development version from bundle to make the bundle smaller and to make the
warning go away.

We can't just make sure we have an environment variable of `NODE_ENV=production`
in order to set `process.env.NODE_ENV` because that is part of the `Node`
runtime. When the minifier is processing our bundle, it doesn't set
`process.env` for us like running a script in Node would, so we need to use Webpack's
[DefinePlugin](https://webpack.github.io/docs/list-of-plugins.html#defineplugin)
plugin to do [dependency injection](https://en.wikipedia.org/wiki/Dependency_injection)

Then when our minifer runs it will perform [static
analysis](https://en.wikipedia.org/wiki/Static_program_analysis) on our bundle
and see that all of the code in React inside the if statement below can never be
run and it will remove the dead code making the bundle smaller and making the
warning go away.

```js
if("production" !== process.env.NODE_ENV) {
//...
}
```
