# Flux Organ Project

Live demo available [here][live-link]!

[live-link]: http://www.aa-organ-grinder.herokuapp.com

## Overview

In this project we'll make a musical organ you can play on your keyboard! When
we're finished a user will be able to save their track and replay it. We'll use
React.js and Flux. Hitting a key will create an action that adds a key to the
`KeyStore`. Changes to the `KeyStore` will cause your React components to update
themselves.

This is another Rails app, so start by running `rails new --skip-turbolinks` --database=POSTGRESQL.

Make sure to test as you go. Your understanding will suffer if you code an
entire section before figuring out how to make it run. Start small and append.

## Phase 1: Flux Structure

* Make a `StaticPagesController`. It should serve a root view with a
  `div#content`. Set up the appropriate route.
* Test that you can access the root view.
* NB: At this point we are NOT dealing with our backend beyond setting up this static page. Don't worry about database concerns until we get to the Recorder phase.
* Run `npm init --yes` to set up your `package.json`
* Run `npm install --save webpack react react-dom flux babel-core babel-loader babel-preset-react`
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
    // can't explain 0.3, it is a reasonable value
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

## Phase 3: `KeyStore` and `KeyActions`

In the Todo app, we built our own Store from scratch. To speed up
our development process, we're going to use the one provided to us by
the `flux` package (available to us through require under
'flux/utils'). As you build the `KeyStore` and `KeyActions` in this
phase, feel free to refer to this [reference material][stores-and-actions].

[stores-and-actions]: ../../readings/stores_and_actions.md

First, make a `KeyStore`. This should keep track of all the keys
currently being played; we can store these by name (e.g., "C3").

Next, make a `util/add_key_listeners.js` file. This file will hold jQuery
listeners for `keyup` and `keydown`. Install event handlers for these using `on`
on `$(document)`. Wrap these two functions in a single function that will be
your only export. We'll later call this function within a `ComponentDidMount`
lifecycle method for our `Organ` component.

When a user presses a key, the key listener should trigger an action, which--
when dispatched--will add a key to the `KeyStore`. Likewise, when the key is
released, the listener should trigger an action to remove the key from the
store.

How would you test that your listeners work on their own (without calling any
other code in your app)?

To know which key name to pass to our action, we'll need to map
[keycodes][keycode-list] (this information is available as part of the `event` object) to organ keys, e.g.

```js
const Mapping = {
  65: 'C4',
  // ...
};
```

**NB:** Do not create an instance of a `Note`. Only the key name ("C4", "D3",
etc) should be passed through the action and kept in the store. `Note` objects
will be kept as instance variables in our React components.

Here's how an event propagates through our app:

0. User presses a key.
0. The key listener catches the `keydown` event and invokes
   `KeyActions.keyPressed` with the appropriate key name.
0. The `KeyActions.keyPressed` action sends a payload to the
   `AppDispatcher`. The payload should contain the `actionType` and a `noteName`.
0. The dispatcher emits the event. The `KeyStore` catches the event, gets the `noteName`
  out of the payload, and adds the `noteName` to its array of `keys`. The `KeyStore`
  also emits a change event.

How do you grab the keycode? Put a debugger at the top of your key listener and
poke around until you find the keycode: an effective strategy for investigating
unknown objects.

In a moment we'll write a `NoteKey` React component, which will listen for
changes in the `KeyStore`. When that change occurs, the `NoteKey` will
conditionally re-render and either start or stop its `Note`. Make sure
you've built out both the `KeyStore` and `AddKeyListeners` before
continuing.

[keycode-list]: http://www.cambiaresearch.com/articles/15/javascript-char-codes-key-codes#TABLE2

## Phase 4: React Components

### NoteKey

Let's write a `NoteKey` React class component (Note: we're calling it `NoteKey`
to distinguish it from the keyboard's keys). This component will be the visual
representation of a single note in your organ. It's also the component
responsible for whether a `Note` is played. The component will be passed a
single `noteName` as a prop. After the component has mounted, create a new
`Note` instance and store it as an instance variable in your component. Notice
that a `Note` is constructed with a frequency, not a `noteName` string, so use
your `Tones` constant to convert it.

The `NoteKey` should listen to the `KeyStore`. If the `noteName` for the
`NoteKey` is in the `KeyStore`, the `NoteKey` should `start` its `Note`.
Remember to remove the listener in `componentWillUnmount` -- refer
back to the reference reading if you're unsure how to do this.

### Organ

Now let's add support for more than one `NoteKey`. We'll do this by writing
a new React component, `Organ`. This should render an `NoteKey` for each of
the `TONES`.

Now we can test our setup. When our `Organ` has mounted, it should call the
method we exported from `add_key_listeners.js`. In `organ_grinder.jsx`, use
`ReactDOM` to put our `Organ` on the page. Fire up your rails server and press
some keys. You should hopefully hear sound!

If no sonorous tones emerge, first check for errors in your console. Then follow
the Flux pattern to debug piece by piece. The interaction chain is roughly
`Event Listener -> Action Creator -> Dispatcher -> Store -> Component`. I
recommend starting at the beginning and checking as you go through the Flux
structure.

At this point, you should be able to make beautiful music by typing on your
keyboard! Using CSS rules and the `state` of your `NoteKey` component, update
the `NoteKey` visually when its note is being played.

## Phase 5: Track Recording and Playback

Before we worry about how to persist a track on the server, let's build track
recording on the front end.

### `util/track.js`

Write a `Track` class to represent a recorded song. The constructor for this
class should accept an attributes hash, which will contain a `name` and
(optionally) a `roll`. The `roll` will be an array that holds the "recipe" for
playing a track (more details later).

Write a method to `startRecording`. Reset `this.roll` to an empty array and save
the current time to an instance variable. You can use this instance variable to
calculate when a note's played relative to the start of the recording.

While the track is recorded, we'll need to update `this.roll` as new notes are
pressed. Write an `addNotes` method that uses `push` to add into the `roll` an
object with the following values:

- `timeSlice`: how much time has elapsed since we started recording
- `notes`: which note names (`['C3', 'E3', 'G3']`) are currently being pressed

NB: we shouldn't be storing instances of `Note` in the roll, only the names of
the notes. We'll create actions for each one of these note names when it's time
to play them to leverage  our existing flux structure. Your program's like a
player piano, which uses the same keys for live playing and playing back a roll.

Write another instance method to `stopRecording`. Simply
call `this.addNotes` with an empty array, ensuring that the
track is silent when it ends.

### `components/recorder.jsx`

Make a new `Recorder` React component. The component's `state` should have two
parts: `recording` (a boolean) and a blank `Track`. The component's visual
interface should include buttons to start and stop recording: simply delegate to
your Track's instance methods.

The Recorder should also listen for changes in the `KeyStore`. When a change
occurs, respond by invoking your Track's `addNotes` method, passing in the notes
currently in the store.

Finally, we need to be able to replay the `Track`, which requires:

- a "Play" button for our Recorder component
- a `play` instance method for our `Track` class

Let's think about how to implement the `Track#play` method. Track data
is stored in a `roll`, which contains objects of the form:

```js
{
  timeSlice: (timeElapsed),
  notes: (notesArray)
}
```

`timeSlice` ensures that these objects are in ascending order (since
`timeElapsed` increases between calls to `addNotes`). But we can't just iterate
over these objects because iteration happens (essentially) instantaneously.
Instead, we want to **throttle** our iteration, such that we only move on to the
next note once `Date.now() - playBackStartTime` exceeds the current note's
`timeSlice`. What JavaScript function allows us to invoke a callback over
(relatively) large spans of time? That's right: `setInterval`. Note that we
don't want to run the interval forever--only until the end of the `Track`.

Store a reference to the interval as an instance variable (`this.interval`) of
the `Track`. At the top of your `play` method, check if `this.interval` already
exists. If it does, return immediately so we don't play the `Track` over itself.
Next grab `Date.now()` and assign it to `playbackStartTime`. We'll also want to
initialize the `currentNote` to `0`. Local variables are sufficient; the
interval callback closes over them.

Now for the meat of the method: set an interval, passing in an anonymous
callback. The callback should check whether `currentNote` is still in range of
the `roll`. **If so**:

- Check whether `Date.now() - playBackStartTime` exceeds the current
  note's `timeSlice`. If it does:
    - Use one of your `KeyActions` to update the `KeyStore`.
    - Continue to the next note.
    - _Hint:_ A new KeyAction might make this easier to manage.

**Else**, we've exceeded the range of the roll. Clear the interval and
`delete` it from the properties of `this`.

Remember to cancel your interval when the `Track` is done playing:

```js
const intervalId = setInterval(callback, 10);
clearInterval(intervalId);
```

Don't continue until you're able to record and play back tracks!

### `TrackStore`

Write a `TrackStore` to hold all the tracks that have been recorded (or
fetched from the server). You'll also need an action to add tracks to
the store. Invoke this action from your `Recorder` when a track is
saved.

### `Jukebox` and `TrackPlayer`

Let's write a `Jukebox` component to display all the tracks in the
`TrackStore`. Each track will be represented by a `TrackPlayer` component; the
`Jukebox` will wrap these and group them together.

The `TrackPlayer` should have a `track` as part of its `props`. Its `render`
method should render buttons to "Play" or "Delete" the track.

Once you're able to view and play tracks in your `Jukebox`, you're ready to move
on!

But FIRST: look through every file you've written and make sure you know which
part of [the flux pattern][flux-diagram] the file represents. Check that you and
your partner agree.

[flux-diagram]: ../../assets/flux-diagram.png

## Phase 6: Adding Tracks to the DB

Let's finally start saving songs to the server. Write a Rails `Track` model, as
well as a `TracksController`. The `Track` model should have columns for `name`
(a string) and `roll` (a JSON object).

In your `TracksController`, write actions for `create`, `index`, and `destroy`.
The `index` action should render a JSON representation of each saved `Track`
object.

To connect everything, we'll need more actions and utilities. Write a
`TrackApiUtil` utility to fetch, save, and destroy tracks through your JSON API.
You'll also need a `createTrack` action to save tracks through your API Util.

## Bonus: Extra Awesome Features

* It's a keyboard; have fun! Add more notes!
* Make additional keys that play entire CHORDS.
* **Looping**: Add a setting to allow tracks to play continuously.
* **Jam Session**: Allow users to play on the organ while a track runs in the
  background.
* **Scales**: pentatonic, minor, etc.
* **Playlists**: Queue up tracks to be played one after another.
* Implement other octaves and waveforms.
* Make it beautiful. This could be a *key component* of your portfolio.
* Options to change volume/waveform of notes and tracks.
* Export tracks as audio files so they can be saved to the client's machine.
