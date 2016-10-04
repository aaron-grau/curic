# Introduction to JavaScript

Welcome to JavaScript!

## JavaScript Environments

JavaScript runs in 2 main environments:
+ the browser;
+ and server-side.

We'll start out using [Node](#node), a server-side JavaScript framework in order
to focus on Javascript basics and work our way up to browser Javascript later.

## Server-Side JS

JavaScript's genesis comes from the browser; it was designed by Netscape to add
dynamic code inside Netscape Navigator. JavaScript code was traditionally run by
the user's browser, not the server.

In this respect, it was used very differently than Ruby. Programmers didn't
write stand-alone JavaScript programs (initially there wasn't a `javascript
my_script.js` command like `ruby my_script.rb`), nor was there a REPL (no `irb`
or `pry`). There are other differences rooted in JS's history as a browser
language that can make it frustrating for general use.

In recent years, there has been interest in bringing JavaScript to the server.
[Node.js][node-js] is a server-side JavaScript framework which allows
programmers like us to run JavaScript from their terminals. Our first JS
programs won't feature the web browser at all; they'll be a repeat of our first
Ruby scripts.

## Node

What is Node exactly? The [website][about-node] has a pretty good description.
The `node` command lets us run JavaScript from our terminal, kind of like the
`ruby` command, and includes a REPL that resembles `pry` as well.

### Homebrew Installation

If you have Homebrew, installing should be as easy as `brew install node`.

This gives us access to the node REPL:

```js
~$ node
> console.log("Hello student!");
Hello student!
undefined
```

Try it!

As part of the `brew install node` process, Homebrew will also install the
[node package manager][npm]. This is like RubyGems, except it's used to download
and use node.js libraries.

[npm]: https://www.npmjs.com/
[node-js]: http://nodejs.org/
[about-node]: https://nodejs.org/en/

### Executing Scripts

A JavaScript file has a `.js` file extension. We can run JS scripts in node.js
with great ease:

```javascript
// script.js
for (let i = 0; i < 10; i++) {
  console.log("The greatest of ease!");
}
```

```
~$ node script.js
The greatest of ease!
The greatest of ease!
The greatest of ease!
The greatest of ease!
The greatest of ease!
The greatest of ease!
The greatest of ease!
The greatest of ease!
The greatest of ease!
The greatest of ease!
```

**NB: Set up Node before reading further! You'll need it for the examples.**

[node]:
[server-side-javascript]:./server-side-javascript.md

## ECMAScript Versions

ECMAScript is the standardized specification that forms the basis for
JavaScript. Think of it as a blueprint from which various JavaScript engines,
such as Chrome's V8, are built. From 2009-2015, the most recent stable version
of ECMAScript was ECMAScript 5, or ES5 for short.

The new ES6 standard, a.k.a. ES2015, was released in June 2015 and has added a
wide variety of new features to JavaScript. ES6 features have been widely
adopted across most browsers, but a number of environments still lag behind
([see this compatibility table][compatibility-table]).

When using Javascript features, consider whether they are compatible with the
environments you need. Features that are new to ES6 are clearly indicated in the
compatibility table. In addition, you can look up features and their
compatibility using MDN's JavaScript Documentation. For example, check out the
[documentation for `Array.prototype.indexOf`][index-of]. Scroll
down to the 'Specifications' section for information on which ECMAScript
versions the feature is compatible with. In this case, the `indexOf` is both
ES5 and ES6 compatible. However, other features like
[`Array.prototype.includes`][includes] are ES6 compatible only.

When we need maximum compatibility, such as for a web page to be served through
various browsers, we can use tools called **transpilers** to translate our ES6
back to the more universal ES5. We'll learn more about transpilers (in particular, Babel) later.

[compatibility-table]: http://kangax.github.io/compat-table/es6/
[index-of]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/indexOf
[includes]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/includes

### Using Node's In-Progress and Staged Features

Not all ES6 features are fully compatible with the latest version of Node.js
([see node's compatibility table][compatibility]). Luckily, Node provides a way
to use staged features using the `--harmony` flag. Check out [node's docs on
using staged features][node-harmony] for more information.

[node-harmony]: https://nodejs.org/en/docs/es6/
[compatibility]: http://node.green/
