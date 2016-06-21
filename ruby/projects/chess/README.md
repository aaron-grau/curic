# Chess

Write a [chess game][wiki-chess] in an object-oriented way. **Please
read all through the various phases before proceeding.**

Review the [Chess UML Diagram][chess-uml] to get an overview of what you'll be creating.

Please split your program into multiple files. Use
[require-relative][require-relative] to load files. Make separate files for each
class. Give files `snake_case` titles.

Don't forget to keep using Git. Look back at
[Friday's instructions][minesweeper] and read the Git portions again if
you need a reminder. Committing and branching are important habits for
any kind of software developer.

[chess-uml]: ../../assets/Chess_Diagram.png
[require-relative]: http://www.ruby-doc.org/core-2.1.2/Kernel.html#method-i-require_relative
[minesweeper]: ../minesweeper/

## Phase I: `Board`

Your `Board` class should hold a 2-dimensional array (an array of
arrays). Each position in the board either holds a `Piece`, or `nil` if
no piece is present there. You may want to create an empty Piece class
as a placeholder for now. Write code to setup the board correctly on
`initialize`.

The `Board` class should have a `#move(start, end_pos)` method. This
should update the 2D grid and also the moved piece's position. You'll
want to raise an exception if: (a) there is no piece at `start` or (b)
the piece cannot move to `end_pos`.

## Phase II: `Display`

Next, you'll want to make a `Display` class to handle your rendering
logic. Your `Display` class should have access to the board, and
eventually to the game. You'll want to require the `colorize` gem so you
can render in color.

In your `Display` class, you'll want to create a cursor that you can
move around with the keyboard. Eventually, your `Player` class should
encapsulate some of this logic, but for now you can put it in `Display`.

A cursor will generally require three things:
1. Using `STDIN#getch` along with a mapping of keys to process your
   cursor actions/movements (this [demo][cursor-demo] will help you out)
2. An `@cursor` that remembers the coordinates of the cursor at all
   times
3. A boolean `@selected` for storing whether the cursor has selected a
   piece and is now trying to move it.

As you render your board, you'll want to have the cursor be highlighted
in a different color from the rest of your board. You should be able to
handle this in your render logic just by checking whether the square
you're rendering is your `@cursor`.

**Note:** if you're stuck on cursor for more than ~30 minutes, please call for help from a TA. Fancy cursors are cool, but the main purpose of today is to become more familiar with Object Oriented Programming.

**Code Review Time:** Before moving on to piece logic, get a code review from a TA! How you've set up your Board and Display Classes will greatly affect your game moving forward, so make sure that these classes are solid and well-written before continuing.

## Phase III: `Pieces`

There are many different kinds of pieces in chess, and each moves a
specific way.  Based on their moves, they can be placed in three
categories:

0. Sliding pieces (Bishop/Rook/Queen)
0. Stepping pieces (Knight/King)
0. The pawn (do this last)

You should also have a `NullPiece` class that includes [the `singleton` module][singleton]. The null piece instance can then occupy any 'empty' spaces on the board.
[singleton]: http://ruby-doc.org/stdlib-1.9.3/libdoc/singleton/rdoc/Singleton.html

Start by writing a `Piece` parent class that contains the
functionality common to all pieces. A key method of `Piece` is
`#moves`, which should return an array of places a `Piece` can move
to. Of course, every piece will move differently, so you can't write
(**implement**) the `#moves` method of `Piece` without subclasses.

You can make subclasses for `SlidingPiece` and `SteppingPiece`. The
`SlidingPiece` class can implement `#moves`, but it needs to know what
directions a piece can move in (diagonal, horizontally/vertically,
both). A subclass of `SlidingPiece` (`Bishop`/`Rook`/`Queen`) will
need to implement a method `#move_dirs`, which `SlidingPiece#moves`
will use.

Your `Piece` will need to (1) track its position and (2) hold a
reference to the `Board`. The `SlidingPiece` in particular needs the
`Board` so it knows to stop sliding when blocked by another
piece. Don't allow a piece to move into a square already occupied by the
same color piece, or to move a sliding piece past a piece that blocks it.

For now, do not worry if a move would leave a player in check.

## Phase IV: `Board#in_check?(color)` and `#checkmate?(color)`

The `Board` class should have a method `#in_check?(color)` that
returns whether a player is in check. You can implement this by (1)
finding the position of the king on the board then (2) seeing if any
of the opposing pieces can move to that position.

Then write a `#checkmate?` method. If the player is in check, and if
none of the player's pieces have any `#valid_moves` (to be implemented
in a moment), then the player is in checkmate.

## Phase V: `Piece#valid_moves`

You will want a method on `Piece` that filters out the `#moves` of a
`Piece` that would leave the player in check. A good approach is to
write a `Piece#move_into_check?(pos)` method that will:

0. Duplicate the `Board` and perform the move.
0. Look to see if the player is in check after the move
   (`Board#in_check?`).

To do this, you'll have to write a `Board#dup` method. Your `#dup`
method should duplicate not only the `Board`, but the pieces on the
`Board`. **Be aware**: Ruby's `#dup` method does not call `dup` on the
instance variables, so you may need to write your own `Board#dup`
method that will `dup` the individual pieces as well.

#### A Note on Deep Duping your Board

As we saw in one of the [recursion exercises][recursion-exercises],
Ruby's native `#dup` method does not make a **deep copy**.  This means
that nested arrays **and any arrays stored in instance variables**
will not be copied by the normal `dup` method:

```ruby
# Example: if piece position is stored as an array
queen = Queen.new([0, 1])
queen_copy = queen.dup

# shouldn't modify original queen
queen_copy.position[0] = "CHANGED"
# wtf?
queen.position # => ["CHANGED", 1]
```

### Caution on duping pieces
If your piece holds a reference to the original board, you will need to
update this reference to the new duped board. Failure to do so will
cause your duped board to generate incorrect moves!

### An alternative to duping?

Another way to write `#valid_moves` would be to make the move on the
original board, see if the player is in check, and then "undo" the
move. However, this would require that `Board` have a method to undo
moves.

Once you write your `Board#dup` method, it'll be very straightforward
to write `Piece#valid_moves` without complicated do/undo logic.

It will likely help at this point to put some debug information into
your `Display` class. Set a boolean variable on initialize of your
`Display` for whether or not to show your debug info (you want to be
able to easily turn this off). If that flag is set to true, then output
some debug info, such as the selected piece's available moves, whether
your opponent is in check, and so on.

### Further `Board` improvements

Modify your `Board#move` method so that it only allows you to make
valid moves. Because `Board#move` needs to call `Piece#valid_moves`,
`#valid_moves` must not call `Board#move`. But `#valid_moves` needs to
make a move on the duped board to see if a player is left in
check. For this reason, write a method `Board#move!` which makes a
move without checking if it is valid.

`Board#move` should raise an exception if it would leave you in check.

## Phase VI: `Game`

Only when done with the basic Chess logic (moving, check, checkmate)
should you begin writing user interaction code.

Write a `Game` class that constructs a `Board` object, that alternates
between players (assume two human players for now) prompting them to
move. The `Game` should handle exceptions from `Board#move` and report
them.

It is fine to write a `HumanPlayer` class with one method
(`#play_turn`).  In that case, `Game#play` method just continuously
calls `play_turn`.

It is not a requirement to write a `ComputerPlayer`, but you may do
this as a bonus. If you write your `Game` class cleanly, it should be
relatively straightforward to add new player types at a later date.

## Tips

* Do not implement tricky moves like "en passant". Don't implement
  castling, draws, or pawn promotion either. You **should** handle
  check and check mate, however.
* Once you get some of your pieces moving around the board, **call
  over your TA for a code-review**.
* Here's a four-move sequence to get to checkmate from a starting
  board for your checkmate testing:
    * f2, f3
    * e7, e5
    * g2, g4
    * d8, h4

## Phase VI: Bonus round!

After completing each phase of the project, please remember to go back
and make your code truly stellar, practicing all you know about coding
style, encapsulation, and exception handling.

 * DRY out your code
 * Use exception handling, and make sure to deal with bad user input
 * Method decomposition (pull chunks of code into helper methods)
 * Make helper methods private
 * Jazz up your User Interface (UI) with [colorize][colorize-gem] and
   [unicode][wiki-chess-unicode].
 * Make a chess AI! Start with totally random moves. Next, capture
   pieces when possible. When you have this functionality working start
   giving your pieces some strategy! You can do it!

[cursor-demo]: http://github.com/rglassett/ruby-cursor-game
[wiki-chess]: http://en.wikipedia.org/wiki/Chess
[recursion-exercises]: ../recursion/
[colorize-gem]: https://github.com/fazibear/colorize
[wiki-chess-unicode]: http://en.wikipedia.org/wiki/Chess_symbols_in_Unicode
