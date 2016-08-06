# Getting Started With Node Package Manager

This homework covers configuration of a new React project. Download the skeleton [here][skeleton].

## Initialize NPM

In your project directory, run: 

```
npm init --yes
```

Check your `package.json`.

## Install Dependencies

```
npm install --save <packages>
```

You'll need the following packages: 

- `react`
- `react-dom`
- `babel-core`
- `babel-preset-es2015`
- `babel-preset-react`
- `webpack`

You might also need (for other projects): 

- `redux`
- `react-redux`
- `react-router`
- `lodash`

## Configure Webpack

In `webpack.config.js`:

- Set your entry and output files.
- Add Babel transpilation.
- Add a source map.
- Ensure that `.js` and `.jsx` files resolve automatically.
- Add a `webpack` script to your `package.json`.

## Boot it Up!

Run `npm run webpack` in your terminal, then open `index.html`. Congratulations:
you're up and running!

[skeleton]: skeleton.zip?raw=true
[npm-site]: https://www.npmjs.com/
[packageurl]: http://browsenpm.org/package.json
[without-source-maps]: http://imgur.com/3PuzELi
[with-source-maps]: http://imgur.com/zZzWt9K


