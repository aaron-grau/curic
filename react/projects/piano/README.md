# Redux Piano Project

Live demo available [here][demo]!

[demo]:

## Overview
We'll use React.js and Redux to create our own musical keyboard!

**NB:** Make sure to test as you go. Your understanding will suffer if you code an entire section before figuring out how to make it run. Start small and append.

## Phase 1: Redux Structure

* Create a project directory.
* Run `npm init --yes` to set up your `package.json`.
* Run `npm install --save webpack react react-dom react-redux redux babel-core babel-loader babel-preset-es2015 babel-preset-react` to set up React and Redux.
* Run `npm install --save jquery`. We'll be using jQuery later.
Create a `frontend` folder at the root of your project to contain your front-end code.
* Model your `frontend` folder on the diagram below:

```
frontend/
  + actions/
  + components/
  + reducers/
  + store/
  + util/
  + piano.jsx
```

These folders will store our front-end goodies.
