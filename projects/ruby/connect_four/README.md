# Connect Four!

## Phase 0: What is Connect Four?
Please review [the documentation][connect_four_doc] before moving on.

## Phase I: The Board
Start by writing a `Board` class. This will handle the dropping of discs
as well as determining if the game is over.

#### `initialize`
The `initialize` method should create a 2D `grid` with 6 rows and 7
columns. This will hold all of the discs as the game is played.

#### `drop_disc`
The method should receive a `column` index and a `disc`. The disc should
_fall_ to the last empty row.

#### `over?`
The method will return true if any player has achieved four discs in
a row.

#### `winner`
`winner` returns whichever player has achieved four in a row. If neither
player has completed this challenge, return `nil`. This method will
probably need to call several helper methods to determine if a player
has won. I wrote methods to check for vertical, horizontal, and diagonal
victories. This part will be by far the most difficult of the entire
project.

## Phase II: The Game
Write a game class. It should create and store a `Board`.

#### `run`
When this method is called the game should start. The first player will
be prompted for a column to drop their disc into. If that column is
full, the player should be prompted again. Once the player has
successfully dropped their disc, the next player should be prompted.

This process should continue until a player has won.

## Phase Bonus

### AI
Change the interface of `initialize` in the game class to receive a
human player and a computer player. The computer player shall use
cunning brilliant strategy to defeat the human.

[connect_four_doc]: https://en.wikipedia.org/wiki/Connect_Four
