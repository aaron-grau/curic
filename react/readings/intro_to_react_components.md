# Introduction to React Components

## What are Components?

React Components are the building blocks of a React view-layer. They are Javascript functions that return HTML to be rendered onto a document. Because they are typically written in JSX (more on that later), components often look like HTML dropped into a Javascript file. 

## A Simple Example

Open [this example][simple_component] in another tab and read along below. 

Start by opening `index.html`. It's a normal HTML document that contains a `<div id='root'/>`. This `#root` element will serve as the 'hook' into which we insert our React component. 

Now, take a look at `index.jsx`. Note `React.createClass()` and `ReactDOM.render()`. `React.createClass()` is used to create a re-useable component called `SimpleComponent`, which is then passed to `ReactDOM.render()`, which inserts it into the DOM inside the `root`.

Both `React.createClass()` and `ReactDOM.render()` contain JSX syntax (the parts that look like HTML). These expressions represent Javascript functions that ultimately render HTML onto a document. 

The Demo also contains a `package.json` file, which is used to configure NPM and lists all of an app's javascript dependencies, similar to a Ruby `Gemfile`. You'll read more about this later.

It also contains a `webpack.config.js` file, which configures Webpack. Note that the output file, `bundle.js`, is sourced in our `index.html` and represents all of our app's code, along with its dependencies (`react` and `react-dom`). Webpack is also responsible for transpiling our JSX into raw Javascript for the browser. More on this later, too.

## Dependencies

In order to create React components, you will need to require the `react` and `react-dom` packages from `npm`. 

[simple_component]: ../demos/simple_component
