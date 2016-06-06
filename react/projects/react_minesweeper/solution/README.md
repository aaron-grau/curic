# Minesweeper with React

## Overview

In this project, you'll create an interactive version of minesweeper
using React. Click [here][chf2_link] to see an example. Start by
taking a look at the JS file `minesweeper.js` and copying it into a
local directory for your project. We will write an application to
interface with the Board and Tile classes defined there, with our
React components updating and re-rendering the board's current state
based on user input. Let's get started!

[chf2_link]: http://chf2.github.io/react_minesweeper/

## Phase 0: SimpleHTTPServer

Create `index.html`, `application.css`, and `application.js` files. As
with the widgets, we'll run our code on a lightweight local server.
This is necessary to allow us to put our JSX script in a separate
`application.js` file. (The JSX transformer loads JSX scripts via
AJAX, which Chrome does not allow for scripts in a `file://` path.)
Ensuring you are in the correct directory, run `python -m
SimpleHTTPServer` and navigate to `localhost:8000` in your browser.
Don't forget to load the React, JSX, and minesweeper.js scripts in
`<head>`.

## Phase 1: Game

Start by creating a component for the game using `React.createClass`.
In `getInitialState`, initialize a new Minesweeper board from the
minesweeper.js file, which has been made available under the
`window.Minsweeper` namespace. We'll keep track of three things in our
game's state: the active board, whether the game is over, and whether
the game is won. When returning the initial state, set the latter two
to false.

Stub out a second function, `updateGame`, but don't write anything
here yet. We'll return to this after we have a properly rendering
board. Then, write a render method. Have it return a new React
component, Board, passing in `this.state.board` and `this.updateGame`
as props. The Board component will pass the `updateGame` function to
each individual tile: ultimately, this is how we'll make sure that the
board re-renders when the state of the game changes.

## Phase 1a: React.render / Tile Stub

While we're writing the Board component, it would be nice to be able
to test that our render method is working. We need to do two things to
do this. First, call React.render at the bottom of your script in
`application.js` to put the Game component on the page. Second, create
a very basic Tile component. Give it a simple render function that
returns a string, " T ". This will allow us to tell if our board is
putting Tile components onto the page correctly.

## Phase 2: Board

Our Board component will be responsible for a single task — rendering rows of Tile components. We're going to return a component tree that looks roughly like the example below, only with more rows and tiles: 

```html
<div id="board">
	<div class="row">
		<div class="tile"/>
	</div>
</div>
```
Start with the top-level `<div id="board">` element.  The content of this element should be a call to a helper method `renderRows()`, which will create the row elements for the board. 

`renderRows()` should use `Array#map` on `this.props.board.grid` to return a `div` for each row with a `className="row"`. When writing your `Array#map` callback, make sure it receives two arguments, the `row` object and its index. Use the index to assign a unique `key` prop to each row. Then pass the `row` and index to another helper, `renderTiles()`, which will return an array of tiles to go inside that row.

`renderTiles()` should return an array of `Tile` components (see [Phase 3](#phase-3-tile) below). Each `Tile` component should take 3 props: the `tile` object being mapped, a unique `key` based on the tile's position, and an `updateGame` callback that refers to the Board's `updateGame` prop.

If you're wondering what a `key` does, read [this][key_reading]. We'll cover these more later.

[key_reading]: https://facebook.github.io/react/docs/multiple-components.html#dynamic-children

## Phase 3: Tile

It's time to flesh out our Tile component. Update your render logic to
change the text of the tile based on whether it has been revealed, is
bombed, or is flagged. If it's been revealed and has more than one
adjacent bomb, show that number. For bombs and flags, use Unicode!

In addition, let's start applying some CSS. Change your render method
to return a `div` with the text calculated above. Give all of your
tile `div`s a class of 'tile' using the `className` prop. Also add a
bombed, revealed, or flagged class as appropriate. Use CSS to style
your tiles and make your board beautiful. Hint: use `border-style:
inset;` and `border-style: outset;` to achieve the 3D tile effect for
revealed tiles.

After you've finished with the CSS, write a `handleClick` function for
the Tile component, and pass it to the component's rendered `div`
using `onClick`. Have this call the `updateGame` function we passed as
a property, giving the tile's position and a boolean for whether the
user is flagging or revealing the tile as arguments. (You might note
that our Game's `updateGame` function doesn't take any arguments yet –
we'll fix that shortly).

How could we tell if a user wants to flag a tile? For now, check
whether the user is holding down the alt key when they click. For
help, read the Mozilla [documentation][click_docs] on click events.

[click_docs]: https://developer.mozilla.org/en-US/docs/Web/Events/click

## Phase 4: A Working Game

Back in your Game component, update the `updateGame` function to take
two arguments. Matching what we wrote in the Tile's `handleClick`
function, the first will be a position (e,g. `[1, 3]`), and the second
will be a boolean. The boolean should indicate whether the player was
flagging the tile (true) or revealing it (false).

It's time to have the Game component interact with the JavaScript game
on the back-end. Key into the board at the appropriate position and
call toggleFlag() or explore() based on the user's action. Once you've
done this, check if the user has won or lost and update the state
accordingly using `setState`. Do this even if the state hasn't
changed, so we can ensure we trigger a re-render our component tree.

Last, write some basic logic in your Game's return function to
indicate to the user if they've won or lost based on the Game
components's state.

## Phase 5: Modal

Time to practice your CSS chops. In our Game component's render
method, check if the game is over. If it is, have a modal pop up
congratulating (or consoling) the player. Also include a button to
play another round. To make this work, add another method
`restartGame` to your Game component, which generates a new board and
resets the board in the Game's state to the new board (as well as
resetting both `won` and `over`).

As a guide, check out the modal demo in the [css demos][css_demos]. 

[css_demos]: https://github.com/appacademy/css-demos