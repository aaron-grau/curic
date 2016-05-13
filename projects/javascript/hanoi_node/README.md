# Towers of Hanoi

Let's rewrite the towers of Hanoi game we previously wrote in Ruby.
[Here's][ruby-hanoi] a link to the old instructions.

Before you start, write out `HanoiGame#run` in pseudocode (using comments).  For example, if I were to write the pseudocode for `Chess#run`, it would look something like:

```javascript
  Chess.prototype.run = function() {
  // until a player is in checkmate
    // get move from current player
    // make move on board
    // switch current player
}
```

Save the pseudocode to a separate file.  We'll come back to it later.

Now write a `HanoiGame` class and run it using Node:

* In the initialization, set an ivar for the stacks.

* Write a `#promptMove` method that (1) prints the stacks,
  and (2) asks the user where they want to move a disc to/from. Pass
  the `startTowerIdx` and `endTowerIdx` to a callback.  
    * Test it by passing in dummy variables and make sure it works before you move on.  For example, your callback should console.log out the `startTowerIdx` and `endTowerIdx` (and not run any other code).

* Write an `#isValidMove(startTowerIdx, endTowerIdx)` method that
  checks that you can move the top of `startTowerIdx` onto the top of
  `endTowerIdx`. 
  * Test it by passing in dummy variables and make sure it works before you move on.

See the theme here?  Test each method, one at a time, before you move on.

* Write a `#move(startTowerIdx, endTowerIdx)` method that only performs
  the move if it is valid. Return true/false to indicate whether the
  move was performed.  Test it.

* Write a `#print` method to print the stacks. I used `JSON.stringify`
  to turn the array of stacks to a string. This works sort of like
  Ruby's `#inspect` method (called by the Ruby `p` method). Test it.

* Write an `#isWon` method that checks the stacks to see if all discs were moved to a new stack.  Test it by passing in dummy variables and make sure it works before you move on.

* Write a `#run(completionCallback)` method.
    * `promptMove` from the user.  
    * In the callback, try to perform the move. If it fails, print an
      error message.
    * Test `#run` here (yes, just make sure `#promptMove` works within `#run`).
    * If the game is not yet won, call `#run` again.
    * Otherwise, log that the user has won, then call the
      `completionCallback`.
    * Test this out, should we call `#isWon` in the top level of `#run` or in the callback to `#promptMove`?

Compare the `#run` method you wrote to the pseudocode you originally had.  Does it look like what you expected?

Instantiate the `HanoiGame` class and play a game. In the completion
callback, close your `reader` so that Node knows it can exit when the
game is over.

[ruby-hanoi]: https://github.com/appacademy/ruby-curriculum/blob/fcfb4fba24faef97a2559eaff811c0e7789e64ba/w1d1/data-structures/array.md#towers-of-hanoi
