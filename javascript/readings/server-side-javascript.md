# Server-side JS

JavaScript's genesis comes from the browser; it was designed by
Netscape to add dynamic code inside Netscape Navigator. JavaScript
code was traditionally run by the user's browser, not the server.

In this respect, it was used very differently than Ruby. Programmers
didn't write stand-alone JavaScript programs (there wasn't a
`javascript my_script.js` command like `ruby my_script.rb`), nor was
there a REPL (no `irb` or `pry`). There are other differences rooted
in JS's history as a browser language that can make it frustrating for
general use.

In recent years, there has been more interest in bringing JavaScript
to the server. Our first JS programs won't feature the web browser at
all; they'll be a repeat of our first Ruby scripts.

We will use [node.js][node-js], a server-side JavaScript framework.

## Homebrew Installation

If you have Homebrew, installing should be as easy as `brew install
node`.

This gives us access to the node REPL:

```
~$ node
> console.log("Hello student!");
Hello student!
undefined
```

As part of the `brew install node` process, Homebrew will also install
the node package manager. This is like RubyGems, except it's used to
download and use node.js libraries.

## Executing scripts

We can run scripts in node.js with the greatest of ease:

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

## Using In-Progress and Staged Features

Not all ES6 features are fully compatible with the latest version of Node ([see compatibility tables][compatibility]). Luckily, Node provides a way to use staged features using the `--harmony` flag. Check out [node's docs on using staged features][node-harmony] for more information.

[node-js]: http://nodejs.org/
[node-harmony]: https://nodejs.org/en/docs/es6/
[compatibility]: http://node.green/
