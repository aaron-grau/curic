# Reversi: Javascript Style

Download the [skeleton][reversi-skeleton].

[reversi-skeleton]: skeleton.zip?raw=true

Read the entirety of the project description before starting!

## Reversi: Part I

* Write the [Reversi][reversi] game.
* You probably want a `Board`, `Piece`, and `Game` class.
* Do not write any user interaction code yet. Your `Game` should have a
  method `placePiece(position, color)`.
    * In particular, don't add a run loop yet.
* A challenge is to write your code in a way that is *modular* -- it
  should be broken up into small methods that you can individually
  test.

[reversi]: http://en.wikipedia.org/wiki/Reversi

## Reversi: Part II

* Begin writing a run-loop.
* `Game` should be modified to support `HumanPlayer`s and `AIPlayer`s.

---

**NB**: This project uses the node's [module pattern][module-pattern] to import and export classes. We'll read more on that tonight. For now all you need to know is that node uses `require` to allow one JS file to load a second JS file. For example,

```js
// lib/game.js
let Piece = require("./piece");
```

When a file is `require`d, node loads and executes its code. Thus `Piece` in `lib/game.js` refers to the `Piece` class defined in `lib/piece.js`.

In the corresponding file with the exported object, we have:

```js
// lib/piece.js

function Piece () {
  // class definition...
}

module.exports = Piece;
```

`module` is a pre-defined variable set up by Node, and its `exports` property is
returned whenever we `require` it from another file. File dependencies for this
project are already setup for you.

[module-pattern]: ../../readings/module-pattern.md
