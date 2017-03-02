# Getting Your App Production Ready

## Remove `console.log` and `debugger` Statements

Take out any instances of `console.log`, `debugger` or `byebug` from your project.

## Remove Minification Warnings

In order to make the warning about using a minified copy of the development version of React go away, we have to make a couple changes to our config files.

Because we only want this process to happen in production, we are going to
update our `webpack.config.js` file to include the `UglifyJsPlugin` and use `DefinePlugin` to set `process.env.NODE_ENV` to `'production'` for use in our webpacked files.

By default, Heroku will run Node with `process.env.NODE_ENV == 'production'`. This allows us to include our plugins only under certain conditions.

```js
// webpack.config.js
var path = require("path");
var webpack = require("webpack");

var plugins = []; // if using any plugins for both dev and production
var devPlugins = []; // if using any plugins for development

var prodPlugins = [
  new webpack.DefinePlugin({
    'process.env': {
      'NODE_ENV': JSON.stringify('production')
    }
  }),
  new webpack.optimize.UglifyJsPlugin({
    compress: {
      warnings: true
    }
  })
];

plugins = plugins.concat(
  process.env.NODE_ENV === 'production' ? prodPlugins : devPlugins
)

// include plugins config
module.exports = {
  context: __dirname,
  entry: "./frontend/<name of entry file>",
  output: {
    path: path.resolve(__dirname, "app", "assets", "javascripts"),
    filename: "bundle.js"
  },
  plugins: plugins,
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
    extensions: [".js", ".jsx", "*"]
  }
};
```

## Only Use Development Tools in Dev Environment

Your app may include tools used in development, such as `redux-logger` for Redux or `byebug` and `pry-rails` for Rails. Let's make sure that these are set to only be installed and used locally.

At this point you already know about separating these concerns in Rails. Do a quick re-check to ensure tools like `byebug`, `pry-rails` and `web-console` are in the development group in your Gemfile.

```ruby
# Gemfile
group :development, :test do
  gem 'pry-rails'
  gem 'byebug'
  gem 'web-console', '~> 2.0'
  gem 'spring'
end
```

Let's do the same with our node packages. Similarly to our Gemfile's development group, we can specify development only packages within our `package.json` by moving them out of `dependencies` and into `devDependencies`. Packages listed in `devDependencies` will be ignored when the `--production` flag is passed to `npm install`. Fortunately, the Heroku Node buildpack does this for us by default.

Example `package.json`:
```json
{
  "name": "solution",
  "version": "1.0.0",
  "description": "",
  "main": "webpack.config.js",
  "directories": {
    "test": "test"
  },
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
  },
  "devDependencies": {
    "redux-logger": "^2.8.1"
  },
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "postinstall": "webpack",
    "webpack": "webpack --watch"
  },
  "author": "",
  "license": "ISC"
}
```

Now that we are not installing these packages, we need to remove them from our code, but only when running in production. The following production-only plugin sets `process.env.NODE_ENV` to `production`, so we can check this value to conditionally `import` them.

To exclude `redux-logger` from production we can add the following code to `store.js`:

```js
// store.js
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import RootReducer from '../reducers/root_reducer';

const middlewares = [thunk];

if (process.env.NODE_ENV !== 'production') {
  // must use 'require' (import only allowed at top of file)
  const createLogger = require('redux-logger');
  middlewares.push(createLogger());
}

const configureStore = (preloadedState = {}) => (
  createStore(RootReducer, preloadedState, applyMiddleware(...middlewares))
);

export default configureStore;
```

## Fix Commit Authorship

Making sure your project commits are attached to your Github account is very important. Prospective employers want to know you can use Git and setting your username and email is one of its most basic functionalities. Also, we want those green squares, right? Check through your commit history (use `git log`) and verify the authorship is correct. If anything is amiss, review [this][git-fix-authorship] reading from the curriculum to learn how to make the appropriate change.

[git-fix-authorship]: https://github.com/appacademy/curriculum/blob/master/ruby/readings/git-fix-authorship.md
