# Getting Started With Node Package Manager

This homework covers configuration of a new React project. Download the skeleton [here][skeleton].

## Initialize NPM

In your project directory, run: 

```
npm init --yes
```

## Install Dependencies

```
npm install --save package1 package2 etc
```

You'll need the following packages: 

- `webpack`
- `react`
- `react-dom`
- `babel-core`
- `babel-preset-es2015`
- `babel-preset-react`

You might also need (in other projects): 

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
-	Create a `.gitignore` for your node modules and bundled files.

## Boot it Up!

Run `npm run webpack` in your terminal, then open `index.html`. Congratulations:
you're up and running!

[skeleton]: skeleton.zip?raw=true
