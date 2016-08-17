# Calculator

Tonight we're going to build a simple calculator app. Our app takes in two numbers and shows the result of a simple operation on the numbers when you click the operation button. Take a look at the [live demo][live-demo] to see the app in action. Assume that only numbers will be entered.

[live-demo]: https://appacademy.github.io/curriculum/calculator/

## Setup

Set up your `package.json`, `webpack.config.js`, and `index.html`. You can use the configuration you built earlier tonight from the [npm/webpack homework][npm-webpack]. Rename your entry file to `app.jsx`. Make sure you also update this in your webpack config! Run `webpack --watch` to keep your code up to date.

[npm-webpack]: https://github.com/appacademy/curriculum/blob/master/react/readings/npm_reading.md

Open `index.html` and make sure you can see Hello World in the browser.

## The `Calculator` Component

Make a new file called `calculator.jsx`. Paste in this skeleton.

```javascript
import React from 'react';

class Calculator extends React.Component{
  constructor(props){
    super(props);
    // your code will be here
  }

  // your code will be here

  render(){
    return (
      <div>
        <h1>Hello World</h1> // you'll be replacing this with your own code
      </div>
    );
  }
}

export default Calculator;
```

Delete `MyComponent` in your entry file. Import the `Calculator` and set it to render in the DOM. Make sure Hello World still shows up in the browser, this time from your `Calculator` component.

### State

The state of your app is just a Javascript object. For the calculator, it will contain the result and the two user-inputted numbers. Define `this.state` with default values in the constructor. The result should have a default value of `0`. We actually want the two numbers to start out blank, so give them a default value of an empty string.

## Render

The first thing we want to render is our result. We want to interpolate the result, which is stored in our state, into the jsx. It'll look something like this.

```javascript
render(){
  return (
    <div>
      <h1>{this.state.result}</h1>
    </div>
  );
}
```

Remember that everything that will be returned needs to be a wrapped in a single element.

## Input

Let's make the input fields. We want the state to update with the new value of the input field every time something is typed in. We can do this by triggering an `onChange` event on the input field. Whenever something is entered, `onChange` will invoke the callback passed to it. Let's write that callback inside our component. The callback should retrieve the value from the input field and set the state of the number.

Remember that the values come in as strings. Consider what would happen if the value was an empty string (i.e., the user hit backspace after entering something).

```javascript
setNum1(e){
  // your code here
}
```

We also want to keep the value displayed synced up with the state. Make sure to include `value={this.state.num1}` in the input tag.

That's one of the inputs! Write the other. It should look very similar.

**NB** `React.createClass` binds all the functions on a component for us. We're using the ES6-style `extends React.Component`, however, so we have to bind any function in which we want to preserve the scope of `this`. Remember to bind your functions in the constructor! It'll look like this:

```javascript
this.setNum1 = this.setNum1.bind(this);
```

## Buttons

Time to write the operations. Each one of these is a button, with an `onClick` callback set that carries out the operation and sets the state of the result to the answer.

Don't forget `e.preventDefault()`.

### Clear

It'd also be nice to be able to clear out the input fields. Make a button that resets the state to its initial values.

## Destructuring

You're probably using the values stored in your state a few times in your `render` function. Let's DRY it up a little. Destructure the elements stored in your state in your `render` function to be able to refer to them more cleanly. Remember that any Javascript we do should happen before the `return` statement!

Think about other ways you could refactor your code.

Congratulations! You've created your first component!
