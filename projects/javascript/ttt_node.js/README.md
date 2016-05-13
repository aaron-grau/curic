# Tic Tac Toe

[Here's][ruby-ttt] a link to the old instructions for Tic Tac Toe.

* Write a `Board` class in `ttt/board.js`.
    * There should be no UI in your `Board`, except maybe to
      `console.log` a representation of the grid.
* Write a `Game` class in `ttt/game.js`. You'll want to require your
  `ttt/board.js` file.
    * Write the `Game` constructor such that it takes a reader interface
      as an argument. As in the previous exercise, write a
      `#run(completionCallback)` method.
* Write a `ttt/index.js` that exports both the `Game` and `Board`
  classes.
* Write a `playTicTacToe.js` script. Import your library by requiring
  `ttt/index.js`.
    * Instantiate a reader.
    * Instantiate a `TTT.Game`, passing the reader.
    * Run the game; close the reader when done.

[ruby-ttt]: https://github.com/appacademy/ruby-curriculum/blob/fcfb4fba24faef97a2559eaff811c0e7789e64ba/w1d2/classes.md#tic-tac-toe
