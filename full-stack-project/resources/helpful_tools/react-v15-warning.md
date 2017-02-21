# Removing React v15 Minification Warning

<code style="color: red">Warning: It looks like you're using a minified copy of the development build of React. When deploying React apps to production, make sure to use the production build which skips development warnings and is faster. See https://fb.me/react-minification for more details.
</code>

In order to remove this warning about using a minified copy of the development version of React, we need to make a couple changes to our config files.

Because we only want this process to happen in production, we are going to
create a special Webpack config file just for production, and then configure our
app to use this config file only we deploy to Heroku.

## `webpack.config.prod.js`

1. Copy your `webpack.config.js` to a new file called `webpack.config.prod.js`
2. Open up `webpack.config.prod.js`
3. Require `webpack` at the top of the file and assign it `var webpack` as below.
4. Copy the entire `plugins` section from the code block below and add it to the
   file.

Your `webpack.config.prod.js` should look exactly like the following code block, but your entry
point will be different.


```js
var path = require('path');
var webpack = require("webpack");

module.exports = {
  context: __dirname,
  entry: "./frontend/appName.jsx",
  output: {
    path: path.resolve(__dirname, 'app', 'assets', 'javascripts'),
    filename: 'bundle.js'
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
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015']
        }
      }
    ]
  },
  devtool: 'source-map',
  resolve: {
    extensions: ['.js', '.jsx', '*']
  }
};
```

## package.json
1. Remove the `postinstall` option from `scripts`
2. Add a `heroku-postbuild` option with a value of `webpack --config
   webpack.config.prod.js`

See below for an example `package.json` with the updated `scripts`.

```json
{
  "name": "app_name",
  "version": "1.0.0",
  "description": "[Heroku link][heroku] **NB:** This should be a link to your production site",
  "main": "index.js",
  "directories": {
    "doc": "docs",
    "test": "test"
  },
  "engines": {
    "node": "5.7.1",
    "npm": "3.6.0"
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
    "babel-core": "^6.13.2",
    "babel-loader": "^6.2.4",
    "babel-preset-es2015": "^6.13.2",
    "babel-preset-react": "^6.11.1",
    "lodash": "^4.16.4",
    "react": "^15.3.0",
    "react-dom": "^15.3.0",
    "react-redux": "^4.4.5",
    "react-router": "^2.6.1",
    "redux": "^3.5.2",
    "redux-thunk": "^2.1.0",
    "webpack": "^2.2.1"
  }
}
```

## Deploy
Commit your changes, push to Heroku, and the warning should be gone.

## Explanation (you don't need to know this, this is just if you're curious)

React v15 checks `process.env.NODE_ENV` to see if it should used the
production or development version. We want to remove every trace of the
development version from bundle to make the bundle smaller and to make the
warning go away.

We can't just make sure we have an environment variable of `NODE_ENV=production`
in order to set `process.env.NODE_ENV` because that is part of the `Node`
runtime. When the minifier is processing our bundle, it doesn't set
`process.env` for us like running a script in Node would, so we need to use Webpack's
[DefinePlugin][webpack-define-plugin]
plugin to do [dependency injection][dependency-injection].

Then when our minifier runs it will perform [static
analysis][static-analysis] on `bundle.js`
and see that all of the code in React inside the if statement below can never be
run and it will remove the dead code making the bundle smaller and making the
warning go away.

```js
if("production" !== process.env.NODE_ENV) {
//...
}
```

[webpack-define-plugin]: https://webpack.js.org/plugins/define-plugin
[dependency-injection]: https://en.wikipedia.org/wiki/Dependency_injection
[static-analysis]: https://en.wikipedia.org/wiki/Static_program_analysis
