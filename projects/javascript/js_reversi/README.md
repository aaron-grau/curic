# Reversi: Javascript Style

Use the [skeleton repo][reversi-skeleton].

[reversi-skeleton]: https://github.com/appacademy/js-reversi

## Reversi: Part I

* Write the [Reversi][reversi] game.
* You probably want a `Board`, `Piece`, and `Game` class.
* Do not write any user interaction code yet. Your `Game` should have a
  method `placePiece(position, color)`.
    * In particular, don't add a run loop yet.
* A challenge is to write your code in a way that is *modular* -- it
  should be broken up into small methods that you can individually
  test.
* Practice [Namespacing][namespacing] up your code into different
  source files and using [Exporting][exporting] to include them.

[reversi]: http://en.wikipedia.org/wiki/Reversi
[namespacing]: http://addyosmani.com/blog/essential-js-namespacing/#beginners
[exporting]: http://stackoverflow.com/questions/11726525/nodejs-require-file-js-issues/11726614

## Reversi: Part II

* Begin writing a run-loop.
* `Game` should be modified to support `HumanPlayer`s and `AIPlayer`s.
