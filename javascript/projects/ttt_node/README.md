# Tic Tac Toe

[Here's][ruby-ttt] a link to the old instructions for Tic Tac Toe.

* Write a `Board` class in `ttt/board.js`.
    * There should be no UI in your `Board`, except maybe to
      `console.log` a representation of the grid.
* Write a `Game` class in `ttt/game.js`. You'll want to require your
  `ttt/board.js` file.
    * Write the `Game` constructor such that it takes a reader interface
      as an argument. As in the previous exercise, write a
      `#run` method that takes in both this reader and a completion callback (`#run(reader, completionCallback)`).
* Write a `playTicTacToe.js` script. Import your game by requiring
  `ttt/game.js`.
    * Instantiate a reader using node's [readline library][node-io].
    * Write a completion callback to ask the users if they want to play again.
    * Instantiate a `TTT.Game`, passing the reader and the completion callback.
    * Run the game; close the reader when done.

[ruby-ttt]: https://github.com/appacademy/curriculum/tree/master/ruby/w1d2/classes.md#tic-tac-toe
[node-io]:https://github.com/appacademy/curriculum/tree/master/javascript/readings/intro-to-callbacks.md
