# Towers of Hanoi

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
