# Towers of Hanoi

**[Live Demo](http://appacademy.github.io/curriculum/toh_jquery/index.html)**

[hanoi-node]: https://www.github.com/appacademy/curriculum/tree/master/javascript/projects/hanoi_node/solution.zip

Download the [skeleton][skeleton]. Set up the directory structure as
before: make `css`, `html` and `js` directories. Remember to load all the
relevant CSS and JQuery in your `index.html`. Move the provided 'main.js' file
in your 'js' directory. Download the [hanoi_node solution][hanoi-node] (`View
Raw`) and put the 'game.js' file from that project into your 'js' folder as
well. Then require 'game.js' as `HanoiGame` in 'main.js'.

Run `webpack --watch ./js/main.js ./js/bundle.js`. Include the resultant bundled file as
a `<script>` in `index.html`. To ensure that all's well, add a `console.log()` to
the `main.js` file and check that it prints in our browser's terminal.

Write a `hanoi-view.js` file, and a `HanoiView` class. Pass in a `HanoiGame` and
a DOM element. Require it in the `main.js` file.

Write a `View.prototype.setupTowers` method to fill the main DOM element with a
"naive" representation of the game (i.e., not reflecting the current game
state). Use `<ul>` elements to store three piles. Inside, use `<li>`s to store
the discs. Call this in your `constructor`.

Write a `View.prototype.render` to alter the DOM elements to reflect the current
game state. You should call this in your `constructor`, too.

In the `constructor`, install a click handler on each pile. I wrote a `clickTower`
method. On the first click to a pile, get the pile number and store this in an
instance variable. On the second click (which you can identify because the ivar
has been set), perform the move. Reset the ivar after. Alert the user if this
was an invalid move.

After each move, call the `render` method to redraw the board. Once the player
wins, tell the player how awesome they are.

To improve UX, use CSS to highlight a pile so that it is clear which pile has
been clicked first. You should do this by toggling a class, not by setting the
style attribute. Setting the style attribute is bad for a number of reasons.
First of all, it has super high specificity, so it can only be overridden with
`!important` css rules. It is also really hard to read because it sprinkles
presentation logic in with JS code. Toggling classes is the clean, best-practice
way to do this.

[skeleton]: skeleton.zip?raw=true
