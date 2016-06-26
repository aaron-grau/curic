# Flux Organ Project

Live demo available [here][live-link]!

[live-link]: http://aa-organ-grinder.herokuapp.com/

## Overview

Let's make a musical organ you can play on your keyboard! When
we're finished a user will be able to save their track and replay it. We'll use
React.js and Flux. Hitting a key will create an action that adds a key to the
`KeyStore`. Changes to the `KeyStore` will cause your React components to update
themselves.

This is another Rails app, so start by running `rails new --skip-turbolinks --database=POSTGRESQL`.

Make sure to test as you go. Your understanding will suffer if you code an
entire section before figuring out how to make it run. Start small and append.

## Phase 1: Flux Structure

* Make a `StaticPagesController`. It should serve a root view with a
  `div#content`. Set up the appropriate route.
* Test that you can access the root view.
* NB: At this point we are NOT dealing with our backend beyond setting up this static page. Don't worry about database concerns until we get to the Recorder phase.
* Run `npm init --yes` to set up your `package.json`
* Run `npm install --save webpack react react-dom flux babel-core babel-loader babel-preset-es2015 babel-preset-react`
* Run `npm install --save jquery`. We'll be using jQuery later.
* Create a `frontend` folder at the root of your project to contain your front-end code.

```
frontend
  + actions
  + components // all React components, both views and controller-views
  + constants
  + dispatcher
  + stores
  + util
  organ_grinder.jsx
```

* Model your `frontend` folder on the above diagram.
* These folders will store our front-end goodies.
* Configure your webpack setup in `webpack.config.js` to compile all JS
  into `app/assets/javascripts/bundle.js`. Require this file in
  `application.js`
* Create the dispatcher file as follows:

  ```javascript
  //dispatcher/dispatcher.js
  const Dispatcher = require('flux').Dispatcher;
  module.exports = new Dispatcher();
  ```

* This file creates and exports a new Dispatcher, provided by the 'flux' package.

Test that your foundation works by finding a way to access the Dispatcher in the console.

## Phase 2: Notes: A Freebie :)

First, make a `note.js` file inside your `util` folder. We'll provide the code for this phase. Copy and paste the following into `note.js`.

```javascript
// util/note.js
const ctx = new (window.AudioContext || window.webkitAudioContext)();

const createOscillator = function (freq) {
  const osc = ctx.createOscillator();
  osc.type = "sine";
  osc.frequency.value = freq;
  osc.detune.value = 0;
  osc.start(ctx.currentTime);
  return osc;
};

const createGainNode = function () {
  const gainNode = ctx.createGain();
  gainNode.gain.value = 0;
  gainNode.connect(ctx.destination);
  return gainNode;
};

const Note = function (freq) {
  this.oscillatorNode = createOscillator(freq);
  this.gainNode = createGainNode();
  this.oscillatorNode.connect(this.gainNode);
};

Note.prototype.start = function () {
    // can't explain 0.3, it's a reasonable value
    this.gainNode.gain.value = 0.3;
};

Note.prototype.stop = function () {
    this.gainNode.gain.value = 0;
};

module.exports = Note;

```

Test that you can play a note from the console by passing in a sample frequency.

**NB**: If you can't play the note and can't figure out why, try playing
it in a new browser tab. Chrome's still resolving internal kinks with its
media APIs.

### `Tones`

Create a `constants/tones.js` file. From there export a `TONES`
constant: a JavaScript object mapping note names to
frequencies. Feel free to use [this table][note-frequencies] as a
resource.

[note-frequencies]: http://www.phy.mtu.edu/~suits/notefreqs.html

## Phase 3: `KeyStore`, `KeyActions`, and `AddKeyListeners`

In the Todo app, we built our own Store from scratch. To speed up
our development process, we're going to use the one provided to us by
the `flux` package (available to us through require under
'flux/utils'). As you build the `KeyStore` and `KeyActions` in this
phase, feel free to refer to this [reference material][stores-and-actions].

[stores-and-actions]: ../../readings/stores_and_actions.md

First, make a `KeyStore`. This should keep track of all the keys
played; we can store these by name (e.g., "C3"). Here's the setup:

```js
const Store =  require("flux/utils").Store;
const AppDispatcher = require('../dispatcher/dispatcher');
const KeyStore = new Store(AppDispatcher);

let _keys = [];
```

**NB**: You may assign `_keys` to either `[]` or `{}`. An object has O(1) lookup
**but is slightly trickier to manipulate. Recall that we make `_keys` a local
**variable to be less accessible.

Create an `actions/key_actions.js` file. This file should export
`keyPressed(noteName)` and `keyRelesed(noteName)` functions. Within each
function the `Dispatcher` we instantiated in our `dispatcher.js` file should
`dispatch` an object with `actionType` and `note` keys.

Because we instantiated our `KeyStore` with the same `Dispatcher`, it will
invoke its `__onDispatch` method whenever that dispatcher dispatches an action
object. `__onDispatch` in turn decides which of its methods to call in response
to the action's `actionType` (typically in a switch statement), after which it
calls `__emitChange`. `__emitChange` allows any React component listening (e.g.
via `KeyStore.addListener(this.someComponentMethod)` to register a change in the
`KeyStore` and react accordingly.

Create a `util/add_key_listeners.js` file. This file will hold jQuery
listeners for `keyup` and `keydown`. Install event handlers for these using `on`
on `$(document)`. Wrap these two listeners within a single function that will be
your entire export. We'll later call this function within a `ComponentDidMount`
lifecycle method for our `Organ` component.

When a user presses a key, the key listener should call our
`keyPressed(noteName)` function from `key_actions.js`, which-- when
dispatched--will add a key to the `KeyStore`. Likewise, when a user released a
key, the listener should call our `keyReleased(noteName)` function to
remove the key from the store.

**NB:** A jQuery `'keydown'` listener fires continually when the user holds down
**a key, thereby repeatedly calling the `KeyPressed` function. The `KeyReleased`
**function would become out of sync because it can fire only once. Undesirable
**keys would remain in our `KeyStore`. How might you ensure you call the
**`KeyPressed`function once per key press?

Think of a way to test that your listeners work on their own (without calling
any other code in your app). Our old friend `console.log` might help.

To know which `noteName` to pass to our action, we'll need to map
[keycodes][keycode-list] (this information is available as part of the `event`
object) to organ keys, e.g.

```js
const Mapping = {
  65: 'C4',
  // ...
};
```

**NB:** Do not create an instance of a `Note`. The callback function of each
**jQuery listener should pass the key name alone (e.g. "C4", "D3", etc.) to the
**action. The store ultimately keeps key names in `_keys`. We'll store `Note`
**objects as instance variables in our React components.

Here's how a `keydown` event propagates through our app:

0. User presses a key.
0. The key listener catches the `keydown` event and invokes
   `KeyActions.keyPressed` with the appropriate key name.
0. The `KeyActions.keyPressed` action sends a payload to the
   `AppDispatcher`. The payload should contain the `actionType` and a `noteName`.
0. The dispatcher emits the event. The `KeyStore` catches the event, gets the
`noteName` out of the payload, and adds the `noteName` to its array of `keys`.
The `KeyStore` also emits a change event.

Go [here](http://keycode.info/) to find keycodes.

In a moment we'll write a `NoteKey` React component, which will listen for
changes in the `KeyStore`. When that change occurs, the `NoteKey` will
conditionally re-render and either start or stop its `Note`. Make sure
you've built the `KeyActions`, `AddKeyListeners`, and the `KeyStore` before
continuing.

[keycode-list]: http://www.cambiaresearch.com/articles/15/javascript-char-codes-key-codes#TABLE2

## Phase 4: React Components

### NoteKey

Let's write a `NoteKey` React class component (Note: we're calling it `NoteKey`
to distinguish it from the keyboard's keys). This component will be the visual
representation of a single note in your organ. It's also the component
responsible for whether to play a `Note`. The `Organ` component will pass to
`NoteKey` a single `noteName` as a prop. After `NoteKey` has mounted, create a
new `Note` instance and store it as an instance variable. Notice that the `Note`
constructor takes  a frequency as a parameter, not a `noteName` string. Use your
`Tones` constant to convert the string.

The `NoteKey` component should listen to the `KeyStore`. If the `NoteKey`'s
`this.props.noteName` is in the `KeyStore`, the `NoteKey` should `start` its
`Note`. Add the `KeyStore` listener in `componentDidMount`. Remember to store
the listener as an instance variable so you can remove it in
`componentWillUnmount`--refer to the [reading][stores_and_actions] under "Stores
are even emitters" for guidance.

[stores_and_actions]: https://github.com/appacademy/curriculum/blob/master/react/readings/stores_and_actions.md

### Organ

Let's support more than one `NoteKey` by writing an `Organ` component. The
`Organ` component will render a `NoteKey` for each of the `TONES`.

Now we can test our setup. When our `Organ` has mounted, it should call the
method we exported from `add_key_listeners.js`, thereby adding `'keydown'` and
`'keyup'` event listeners. In `organ_grinder.jsx` use `ReactDOM` to position our
`Organ` on the page. Remember to provide an HTML container as the second
argument of `ReactDOM.render` Fire up your rails server and press some keys. You
should hopefully hear sound!

If no sonorities emerge, first check for errors in your console. Then follow
the Flux pattern to debug piece by piece. The interaction chain is rougly
`Event Listener -> Action Creator -> Dispatcher -> Store -> Component`. Start at
the beginning and debug your way through.

At this point, you should be able to make beautiful music by typing on your
keyboard! Using CSS rules and the `state` of your `NoteKey` component, visually update
the `NoteKey` when the user plays its note.

## Phase 5: Track Recording and Playback

Before we worry about how to persist a track on the server, let's build track
recording on the front end.

### `util/track.js`

Write a `Track` class to represent a recorded song. The constructor for this
class should accept an attributes hash, which will contain a `name` and
(optionally) a `roll`. The `roll` is be an array that holds the "recipe" for
playing a track (more details later).

Write a method to `startRecording`. Reset `this.roll` to an empty array and save
the current time to an instance variable. Later you'll use this instance variable to
calculate when to play a note relative to the start of the recording.

While the user records a track, we'll need to update `this.roll` as the user
presses new notes. Write an `addNotes` method that `push`es into the `roll` an
object with the following values:

- `timeSlice`: the time elapsed since the user started recording
- `notes`: which note names (`['C3', 'E3', 'G3']`) are currently pressed

**NB:** we should store only the names of the notes in the roll, *not* instances
**of `Note`. We'll dispatch actions for each note names when it's time
to play them, thereby leveraging our existing flux structure. Your program's like a
player piano, which uses the same keys for live playing and replaying a roll.

Write another function to `stopRecording`. Call `this.addNotes` with an empty
array, ensuring that the track is silent when it ends.

### `components/recorder.jsx`

Make a new `Recorder` React component. The component's `state` should have two
keys: `recording` (a boolean) and a `track` whose value is initially a blank
`Track`. The component's interface should include buttons to start and
stop recording: delegate to your Track's instance methods for each button.

The Recorder should also listen for changes in the `KeyStore`. When a change
occurs, respond by invoking your Track's `addNotes` method, with the
`KeyStore`'s `_keys` as its argument.

We need to be able to replay a `Track`. We need:

- a "Play" button for our Recorder component
- a `play` instance method for our `Track` class

How would you implement the `Track#play` method? The `roll` stores track data in the form:

```js
{
  timeSlice: (timeElapsed),
  notes: (notesArray)
}
```

`timeSlice` ensures that the `roll`'s objects are in ascending order (since
`timeElapsed` increases between calls to `addNotes`). But we can't simply
iterate over these objects because iteration happens (essentially)
instantaneously. We instead want to **throttle** our iteration, such that we
continue to the next note once `Date.now() - playBackStartTime` exceeds the
current note's `timeSlice`. `setInterval` allows us to invoke a callback over
(relatively) large spans of time. Note that we want the interval to run until
the end of the `Track`.

Store a reference to the interval as an instance variable (`this.interval`) of
the `Track`. At the top of your `play` method, check if `this.interval` already
exists. If it does, `return` so that we don't play the `Track` over itself.
Next grab `Date.now()` and assign it to a local variable `playbackStartTime`. Also
initialize the local variable `currentNote` to `0`.

Now for the meat of the method: set an interval and pass in an anonymous
callback. The callback should check whether `currentNote` is still in range of
the `roll`. **If so**:

- Check whether `Date.now() - playBackStartTime` exceeds the current
  note's `timeSlice`. **If so**:
    - Use one of your `KeyActions` to update the `KeyStore`.
    - Continue to the next note.
    - _Hint:_ A new KeyAction such as `groupUpdate(notes)` might simplify your task.

**Else**: we've exceeded the range of the roll. Clear the interval and
`delete` it from the properties of `this`.

Remember to cancel your interval when the `Track` finishes playing:

```js
const intervalId = setInterval(callback, 10);
clearInterval(intervalId);
```

Don't proceed until you're able to record and replay tracks!

### `TrackStore`

Write a `TrackStore` to hold all the recorded tracks (or those fetched from the
server). You'll also need an action to add tracks to the store. Invoke this
action from your `Recorder` when the user saves a track.

### `Jukebox` and `TrackPlayer`

Let's write a `Jukebox` component to display all the tracks in the
`TrackStore`. A `TrackPlayer` component will represent each track; the
`Jukebox` wraps each `TrackPlayer` and groups them together.

The `TrackPlayer` should have a `track` as part of its `props`. Its `render`
method should render buttons to "Play" or "Delete" the track.

Proceed once you're able to view and play tracks in your `Jukebox`.

But FIRST: look through every file you've written and ensure you know where it
fits into [the flux pattern][flux-diagram].

[flux-diagram]: ../../assets/flux-diagram.png

## Phase 6: Adding Tracks to the DB

Let's save songs to the server. Write a Rails `Track` model, as well as a
`TracksController`. The `Track` model should have columns for `name` (a string)
and `roll` (a JSON object).

In your `TracksController` write actions for `create`, `index`, and `destroy`.
The `index` action should render a JSON representation of every saved `Track`
object.

To connect everything, we'll need more actions and utilities. Write a
`TrackApiUtil` utility to fetch, save, and destroy tracks through your JSON API.
You'll also need a `createTrack` action to save tracks through your API Util.

## Bonus: Extra Awesome Features

* It's a keyboard. Have fun! Add more notes!
* Make keys that play entire chords.
* **Looping**: Add a setting to allow tracks to play continuously.
* **Jam Session**: Allow users to play on the organ while a track runs in the
  background.
* **Scales**: pentatonic, minor, etc.
* **Playlists**: Queue up tracks to be played sequentially.
* Use other octaves and waveforms.
* Prettify. This could be a *key component* of your portfolio.
* Options to change volume/waveform of notes and tracks.
* Export tracks as audio files so the client's machine can save them.
