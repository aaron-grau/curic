# JavaScript Introduction - Part I (The Beginnings)

Welcome to JavaScript! Make sure to follow along, type things in, and play with the new syntax as you make your way through this JS intro.

## JavaScript Environments and Node

JavaScript runs in 2 main environments: the browser and Node. We'll start out in the Node environment in order to focus on Javascript basics and work our way up to browser Javascript later.

What is Node exactly? The [website](https://nodejs.org/en/) has a pretty good description. The `node` command lets us run JavaScript from our terminal, kind of like the `ruby` command, and includes a REPL that resembles `pry` as well.

Head over to the [server side javascript reading][server-side-javascript] and download Node if you haven't already.

**Set up Node before reading further; you'll need it for the examples.**

Got it working? Congratulations! Time to learn JavaScript.

[server-side-javascript]:./server-side-javascript.md

## ECMAScript Versions

ECMAScript is the standardized specification that forms the basis for JavaScript. Think of it as a blueprint from which various JavaScript engines, such as Chrome's V8, are built. From 2009-2015, the most recent stable version of ECMAScript was ECMAScript 5, or ES5 for short.

The new ES6 standard, a.k.a. ES2015, was released in June 2015 and has added a wide variety of new features to JavaScript. ES6 features have been widely adopted across most browsers, but a number of environments still lag behind ([See this compatibility table.](http://kangax.github.io/compat-table/es6/)).

When using Javascript features, consider whether they are compatible with the environments you need. Features that are new to ES6 have been clearly indicated in this reading and in the MDN Documentation (example: [documentation for `indexOf`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/indexOf) - scroll down to the 'specifications' section for info on which ECMAScript versions the feature is compatible with. In this case, the feature `indexOf` is ES5 and ES6 compatible.)

When we need maximum compatibility, such as for a web page to be served through various browsers, we can use tools called **transpilers** to translate our ES6 back to the more universal ES5. We'll learn more about transpilers(in particular, **Babel**)  later.

## Practice Problems

Complete these readings and then do [homework part I][intro-js-homework]:
[Syntax](syntax.md)
[Data Types and Truthiness](data_types_and_truthiness.md)
[Useful Methods](useful_methods.md)
[Variables](variables.md)



[intro-js-homework]: ../homeworks/questions/js_intro.md
[mdn-let]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/let
