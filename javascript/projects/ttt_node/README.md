# Tic Tac Toe

[Here][ruby-ttt]'s a link to the old instructions for Tic Tac Toe.

* Write a `Board` class in `ttt/board.js`.
  * There should be no UI in your `Board`, except maybe to
    `console.log` a representation of the grid.
* Write a `Game` class in `ttt/game.js`. You'll want to require your
`ttt/board.js` file.
* Write the `Game` constructor such that it takes a reader interface as an 
argument. As in the previous exercise, write a `run` method that takes in both
this reader and a completion callback (`Game.prototype.run(reader, 
completionCallback)`).
* Copy your `playScript.js` from [Hanoi Node][node-ttt]. It should work for Tic Tac Toe as well.

## Bonus
* Build an AI for your game. Try to make it unbeatable.

[ruby-ttt]: ruby_ttt.md
[node-ttt]: ../hanoi_node
