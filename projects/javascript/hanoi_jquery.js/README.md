# Browser Based Games

In this project we'll build HTML views for our Tic-Tac-Toe and Towers
of Hanoi games. We're not going to write any of the core game code,
we'll just write **view classes** that display the game in the
browser, and also handle browser user input.

## Tic-Tac-Toe

We're looking to build something like [this][ttt-demo] (don't look at
the code!).

[ttt-demo]: http://appacademy.github.io/ttt.js/solution/index.html

**Structure**

You will be sent a skeleton for the project, as well as a folder called `ttt-core-solution`.

The `ttt-core-solution` directory contains all the game logic of
Tic-Tac-Toe. We've written this for you so you can focus on building the
UI. You will need to reference the files in `ttt-core-solution/src`
because you'll be using `Board`, `Game`, and `MoveError`. You shouldn't
have to modify anything in `ttt-core-solution`, but definitely read and 
refer to that code!

A brief side-note here. We'll be using use Node's `module.exports` and 
`require` to break our game into digestible modules. Since we can't actually use `require` in the
browser, this is a considerable problem. To solve this, we'll use 
[Webpack][webpack] to bundle things up. 

Take a gander at the `webpack.config` and `js/main.js` files we've included for you.
We included statements to `require` both the `ttt-view` and the `game` from 
`ttt-core-solution`.

When this file is processed by webpack, it will include those files as
dependencies so that we can use those classes _within_ this file.

The bundled file will be output to `js/bundle.js` which we have included a
script tag for in `index.html`.

Remember to run webpack, keep a terminal tab or window open running `webpack
--watch` so webpack will rebundle your app every time a file is saved.


[webpack]: https://webpack.github.io/

**Instructions**

We've given you the outline of a `View` class in `js/ttt-view.js`.
The constructor takes in a `Game` object and a jQuery object in
which to display the grid.

Let's create our `View` and `Game` objects in the entry point (`js/main.js`).
Since we have required these constructor functions, we can create a new Game
with `new Game()`

Use jQuery to find the container element in the view that we created in
`index.html`. Make sure you do this inside the `$(function () {...})` so that we
can be sure that the container element has been loaded.

Write a `View#setupBoard` method; it should make a grid to represent the
board. Build the grid using an unordered list (`<ul>`). The cells can
be respresented inside the grid using `<li>` elements. By floating the
`<li>` elements left and giving the `<ul>` a fixed width, the cells
will appear on the same line and nicely wrap around to form a 3x3 grid.
Set a border on the cells to make it look like a real grid. Style
unclicked cells with a gray `background`. Change the background to
yellow while the user `:hover`s over an unclicked cell.

Call `#setupBoard` in your constructor and place the new `<ul>` inside
your container `$el`; check that this is drawing a grid.

Write a `#bindEvents` method. When a user clicks on a cell, call
`Game#playMove` to register their move. Manipulate the cell `<li>`
to show the current player's mark. Add/remove CSS classes to change
the cell background to white and display the 'X's and 'O's in different
colors. I did all this in a `View#makeMove` method. I also popped an
`alert` if the move was invalid.

Display a congratulatory message when a player wins!

Note: Since the core solution classes are written for the node console,
the `Game` class has a `#run` and a `#promptMove` method. Ignore
these. You're going to call `Game#makeMove` directly from your
`View#makeMove` method.

## Towers of Hanoi

**[Live Demo!](http://appacademy.github.io/hanoi.js/solution/index.html)**

As before, use the Towers of Hanoi skeleton. As before, there is a `game.js` 
file in `hanoi-core-solution/`. The only class defined is `Game`. Look in 
the file and become familiar with the API. Notice that the `Game` 
constructor is exported at the bottom of the file.

You will work in the skeleton directory. This time though, you'll have to 
create more of your files from scratch. Setup the directory structure as 
before: make `css`, `html` and `js` directories. Remember to load all the 
relevant CSS and JQuery in your `index.html`. Move the `main.js` file into
the `js` directory. Open the file and require the `game.js` file, storing 
the result into `HanoiGame`.

Before we start writing the view class we will setup webpack. Make sure
you have it installed, then open `webpack.config.js`. Fill in all the
fields with their appropriate values. Our entry file will be the `main.js`
file.

Once you've completed the `webpack.config.js` file, run the 
`webpack --watch` command and include the resulting bundled file in your
`index.html`. To make sure everything is set up properly, let's add a
`console.log()` to the `main.js` file and see if it prints in our
browser's terminal.

Write a `hanoi-view.js` file, and a `HanoiView` class. Pass in a
`HanoiGame` and a DOM element. Require it in the `main.js` file.

Write a `View#setupTowers` method to fill the main DOM element
with a "naive" representation of the game (i.e., not reflecting the
current game state). Use `<ul>` elements to store three piles.
Inside, use `<li>`s to store the discs. Call this in your constructor.

Write a `View#render` to alter the DOM elements to reflect the
current game state. You should call this in your constructor, too.

In the constructor, install a click handler on each pile. I wrote a
`#clickTower` method. On the first click to a pile, get the pile number
and store this in an instance variable. On the second click (which you
can identify because the ivar has been set), perform the move. Reset the
ivar after. Alert the user if this was an invalid move.

After each move, call `render` to redraw the board. Once the player
wins, tell the player how awesome they are.

To improve UX, use CSS to highlight a pile so that it is clear which
pile has been clicked first. You should do this by toggling a class, not
by setting the style attribute. Setting the style attribute is bad for a
number of reasons. First of all, it has super high specificity, so it
can only be overridden with `!important` css rules. It is also really
hard to read because it sprinkles presentation logic in with JS code.
Toggling classes is the clean, best-practice way to do this.
