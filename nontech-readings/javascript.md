# About JavaScript
Being one of the three primary languages that ships with the browser, JavaScript is a critical tool for any web developer. Whereas HTML and CSS respectively provide static content and its styling, JavaScript makes websites dynamic. With JavaScript, the initial content of a webpage can be selected, altered, and transformed on a conditional basis.

It should also be noted that JavaScript is now no longer used just on the client-side, but on the server-side as well. There are various [Node.js] frameworks designed for this purpose.

In order to get a better understanding of JavaScript, what follows is a description of its history, alternatives, and package managers. There is also a brief glossary of terms that are in frequent use in the JavaScript community.

[Node.js]: https://nodejs.org/en/

## History
JavaScript was introduced during the initial [browser wars]. In 1995, [Netscape Communications] recruited [Brendan Eich] to add a language to their browser, Netscape Navigator, that non-professional programmers could use with ease. Having decided to incorporate Java into their browser with the collaboration of [Sun Microsystems], Netscape Communications decided to have Eich's new language act as a complement to Java. Eich completed his tasked language in ten days, and it eventually became known as JavaScript.

Following suit, Microsoft released a similar dialect called JScript in Internet Explorer 3.0. In June 1997, [ECMAScript] was established as a scripting-language specification. Put simply, ECMAScript is a standard, and various languages are implementations of that standard. Both JavaScript and JScript aim to fulfill the ECMA standards, but both also offer functionality that goes beyond the mutual specification.

*__Excerpted ECMAScript releases:__*

| Name                  | Release Number| Year of Release  |
| --------------------- |:-------------:| ----------------:|
| ES5                   | 5             |             2009 |
| ES6 / ECMAScript 2015 | 6             |             2015 |
| ES7 / ECMAScript 2017 | 7             |             2016 |


[browser wars]: https://en.wikipedia.org/wiki/Browser_wars
[Netscape Communications]: https://en.wikipedia.org/wiki/Netscape
[Brendan Eich]: https://en.wikipedia.org/wiki/Brendan_Eich
[Sun Microsystems]: https://en.wikipedia.org/wiki/Sun_Microsystems
[ECMAScript]: https://en.wikipedia.org/wiki/ECMAScript

## Alternatives to JavaScript
JavaScript, JScript, and ActionScript are all valid implementations of ECMAScript.

* While it does maintain slight differences with JavaScript, JScript is essentially the same language with a different name to avoid trademark issues. However, the difference is so slight that anything written in JavaScript is presumed to run properly in a browser that is built on JScript. Microsoft's Internet Explorer is the only browser that uses JScript.

* ActionScript is much more of an object-oriented language than JavaScript. For instance, it makes use of class inheritance, as opposed to JavaScript's prototypal inheritance. ActionScript was originally developed by [Macromedia Inc.], which merged into [Adobe Systems]. It is now associated with development in both [Adobe AIR] and [Adobe Flash], so it's use has rapidly declined since the [Apple and Adobe Flash controversy].

[Macromedia Inc.]: https://en.wikipedia.org/wiki/Macromedia
[Adobe Systems]: https://en.wikipedia.org/wiki/Adobe_Systems
[Adobe Flash]: https://en.wikipedia.org/wiki/Adobe_Flash
[Adobe AIR]: https://en.wikipedia.org/wiki/Adobe_AIR
[Apple and Adobe Flash controversy]: https://en.wikipedia.org/wiki/Apple_and_Adobe_Flash_controversy

## Package Managers: NPM vs. Bower
JavaScript's ever-increasing modularity is of particular use to software engineers. Innumerable JavaScript libraries are available to developers as packages. There are libraries that offer everything from [helper methods][lodash] to [various data structures][yallist] to [monolithic frontend frameworks][angular]. Also, there are plenty of [humorous libraries]. While some programmers are [skeptical][David Haney] of the widespread use of libraries – perhaps rightfully so – the proliferation of package integration has likely led to significantly faster project development and production code that is both more stable and more secure.

To handle project dependencies, a package manager has to be used. Two of the most commonly used package managers are [npm] (node package manager) and [Bower]. While npm is intended to handle Node.js dependencies, it is able to handle frontend dependencies – those that are sent to the client for use in the browser – as well. However, in order to allow for these frontend dependencies to be easily required, a bundling tool like [Browserify] or [webpack] has to be used. Bower, on the other hand, is designed specifically for managing frontend dependencies, so a bundling tool is not required. A key difference between npm and Bower lies in their treatment of conflicting dependencies. Take the following dependency structure:

| Dependency    | Requires       |
| ------------- |:--------------:|
| A version 2.0 | n/a            |
| B             | A version 1.0  |
| C             | A version 2.0  |

With npm, both A version 1.0 and A version 2.0 will be included. Bower, however, will only require one of the two versions of A in order to decrease duplication (which reduces the payload size). On bundle, Bower will ask version should be included. It will throw an error in the case that no mutual version of a package exists between two dependencies.

App Academy chooses to use npm with webpack. More information about its use can be found [here][npm reading].

[lodash]: https://www.npmjs.com/package/lodash
[yallist]: https://www.npmjs.com/package/yallist
[angular]: https://www.npmjs.com/package/angular
[humorous libraries]: http://qz.com/677122/when-programmers-get-weird-the-funniest-code-projects-on-github/
[David Haney]: http://www.haneycodes.net/npm-left-pad-have-we-forgotten-how-to-program/
[npm]: https://www.npmjs.com/
[npm reading]: https://github.com/appacademy/curriculum/blob/master/react/readings/npm_configuration.md
[Bower]: https://bower.io/
[Browserify]: http://browserify.org/
[Webpack]: https://webpack.github.io/

## Terms to Know
Below are some terms that are frequently used when describing JavaScript.

### Function
Put simply, a function is a set of procedures. A JavaScript function is roughly equivalent to a Ruby method.

### Vanilla
*Vanilla* is a term used to describe standard JavaScript without the use of additional frameworks or libraries. If, for instance, one uses jQuery to make `.ajax` requests, one is not using *vanilla* JavaScript. If, however, one uses native XHR requests in place of jQuery's `.ajax`, and, if no other framework or library is used, then one is writing *vanilla* JavaScript.

### Hoisting
In JavaScript, declarations are *hoisted* by default. This means that variable and function declarations are put into memory at compile time. Therefore, it is actually possible, on execution, to call a declared function or variable before it is defined. For instance, the following will properly call the function `sayHello`.

```javascript
console.log(sayHello()); // => 'hi!'

function sayHello() {
  return 'hi!';
}
```

### 'use strict';
You will sometimes see this line at the top of JavaScript files. It is an instance of a special compiler directive called a [pragma]. This specific pragma ensures that the code in its scope follows certain rules, and if those rules are broken, errors will be thrown at compile time. For instance, strict mode prohibits the use of global variables. There are [many other rules][strict mode] that are enforced in strict mode.

[pragma]: http://stackoverflow.com/questions/14593350/what-exactly-is-a-javascript-pragma
[strict mode]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode

### Closures
A *closure* is a function that makes use of a variable defined in an outer scope. In the following example, calling `parent()` will log the value of `x`. `closureTime` is a closure:

```javascript
function parent() {
  const x = 5;
  function closureTime() {
    console.log(x);
  }
  return closureTime();
}

parent(); // => 5
```

### Callbacks
A *callback* is an argument that is passed to a function that is itself a function. Once passed in, the callback can be called at any time within the function. For instance:

```javascript
function a() {
  console.log('I have been called!');
}

function b(callback) {
  return callback();
}

b(a); // => 'I have been called!'
```

### Currying
*Currying* occurs when a function returns another function. This is typically used to allow for partial evaluation of arguments. For example:

```javascript
function f(x) {
  return function g(y) {
    console.log(`${x} and ${y} are good in curry!`);
  }
}

let partiallyEvaluated = f('curry powder');
// partiallyEvaluated == function g(y) { console.log(`${x} and ${y} are good in curry!`); }
partiallyEvaluated('cardamom'); // => 'curry powder and cardamom are good in curry!'

// Also:

f('cinnamon')('cloves') // => 'cinnamon and cloves are good in curry!'
```
### Invocation
*Invocation* is the manner in which a function is called. There are four ways to invoke a function.

#### As a Function
```javascript
function callMe() {
  console.log('called!')
}

callMe(); // => 'called!'
```

#### As a Method
```javascript
const cat = {
  name: 'Callie',
  purr: function() {
    console.log('PURRpuuuuurrPUUUUURR');
  }
}
cat.purr(); // => 'PURRpuuuuurrPUUUUURR'
```

#### Through a Function Constructor
When `new` is used to invoke a function, a new object instance is created. For example:

```javascript
function cat(name) {
  this.name = name;
}

const callie = new cat('Callie');
console.log(callie.name); // => 'Callie';
```

#### Through a Function Method
Both `call` and `apply` allow for a way to call a function, with the additional ability of setting the context of the function. (Context is described below.) A simple use of invocation through a function method would look as follows:

```javascript
const callie = {
  name: 'Callie'
}

function meow() {
  return `${this.name} says "meow"`;
}

meow.call(callie); // => Callie says "meow"

// Also:

meow.apply(callie); //=> Callie says "meow"
```

For examples where contexts are properly passed to these methods, see the reading on context below.

### Context
Scope and *context* are two different things. Scope refers to the level of variable access, while context refers to the value of `this` at any given time. For instance, in the method invocation of a function, the context is set to the object of which the function is a method:

```javascript
const cat = {
  lookInMirror: function() {
    return this;
  }
}

cat.lookInMirror() == cat; // => true
```
The context of a function can be set with `.bind`, where the argument passed is the desired context. For example:

```javascript
const lion = {};

cat.lookInMirror = cat.lookInMirror.bind(lion);
cat.lookInMirror() == lion; // => true
```

The context can also be set on the call of the function through use of `.call` or `.apply` like so:

```javascript
cat.lookInMirror.call(lion) == lion; // => true
// or
cat.lookInMirror.apply(lion) == lion; // => true
```

However, `.call` and `.apply` are [not the same][call vs. apply].

[call vs. apply]: https://github.com/appacademy/curriculum/blob/master/javascript/readings/function-invocation-in-depth.md
### IIFE
An *Immediately-Invoked Function Expression* is a function that is called immediately after it is defined. For example, the following would run right after it is created:

```javascript
(function() {
  console.log('testing');
})(); // => 'testing'
```
