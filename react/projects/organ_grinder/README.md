# Flux Organ Project

## Overview

In this project we will be making a simple musical organ that can be
played using the keys on your keyboard! When we are finished a user will
be able to save their track and play it back. We will implement this
using React.js and Flux. Hitting a key will create an action that adds a
key to the `KeyStore`. Changes to the `KeyStore` will cause your React
components to update themselves.

As with the Todo App, this will be a Rails project, so go ahead and start
by running `rails new --skip-turbolinks`.

Make sure to test out your code as you go.  You won't get as solid an understanding if you code everything in a section and then try to figure out how to get it to run.  Start small and tack on.

## Phase 1: Flux Structure

* Make a `StaticPagesController`, and have it serve a root view with a
  `div#content`. Set up the appropriate route.
* Test that you can access the root view.
* NB: At this point we are NOT dealing with our backend beyond setting up this static page. Don't worry about any database concerns until we get to the Recorder phase.
* run `npm init --yes` to set up your `package.json`
* run `npm install --save webpack react react-dom flux babel-core babel-loader babel-preset-react`
* create a `frontend` folder at the root of your project to contain your frontend code

```
frontend
  + actions
  + components // all React components, both views and controller-views
  + constants
  + dispatcher
  + stores
  + util
  OrganGrinder.jsx
```

* create the folders such that your `frontend` folder resembles the diagram
  above
* these folders will store all of our front end goodies
* configure your webpack setup in `webpack.config.js` to compile all JS
  into `app/assets/javascripts/bundle.js`. require this file in `application.js`

Finally, create the dispatcher file:
* create the dispatcher file as follows:
```javascript
//dispatcher/Dispatcher.js
var Dispatcher = require('flux').Dispatcher;
module.exports = new Dispatcher();
```
* this file will now create and export a new Dispatcher, provided to us by
  the 'flux' package.

Test that your structure works by finding a way to access the Dispatcher in the console.

## Phase 2: Notes - a freebie :)

First, make a `Note.js` file inside your `util` folder. We are going to provide
you the code for this phase. Just copy and paste everything that follows into
`Note.js`.

```javascript
// util/Note.js
var ctx = new (window.AudioContext || window.webkitAudioContext)();

var createOscillator = function (freq) {
  var osc = ctx.createOscillator();
  osc.type = "sine";
  osc.frequency.value = freq;
  osc.detune.value = 0;
  osc.start(ctx.currentTime);
  return osc;
};

var createGainNode = function () {
  var gainNode = ctx.createGain();
  gainNode.gain.value = 0;
  gainNode.connect(ctx.destination);
  return gainNode;
};

var Note = function (freq) {
  this.oscillatorNode = createOscillator(freq);
  this.gainNode = createGainNode();
  this.oscillatorNode.connect(this.gainNode);
};

Note.prototype = {
  start: function () {
    // can't explain 0.3, it is a reasonable value
    this.gainNode.gain.value = 0.3;
  },

  stop: function () {
    this.gainNode.gain.value = 0;
  }
};

module.exports = Note;

```

Test out that you can play a note from the console (passing in a sample frequency).  

**NB**: If you can't get the note to play and can't figure out why, test out playing 
it in a new browser tab.  Chrome is still working out internal kinks with its media APIs, 
unfortunately.  You have been warned.

### `Tones`

Create a `constants/Tones.js` file. In this file, export a `TONES`
constant; this will just be a JavaScript object mapping note names to
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

Next, make a `util/KeyListener.js` file. This file will hold jQuery
listeners for `keyup` and `keydown`. To listen to these events,
register event handlers using `on` on `$(document)`. When a user
presses a key, the key listener should trigger an action, which when
dispatched will add a key to the `KeyStore`. Likewise, when the key is
released, the listener should trigger an action to remove the key from the
store.

How would you test that your listeners work on their own (without calling any other code in your app)?

To know which key name to pass to our action, we'll need to create a
mapping of [keycodes][keycode-list] (this information is available as
part of the `event` object) to key names. E,g.

```js
var Mapping = {
  65: 'C4',
  // ...
};
```

**NB:** Do not create an instance of a `Note`. Only the key name
("C4", "D3", etc) should be passed through the action and kept in the
store. `Note` objects will be kept as instance variables in our React
components.

Here's an example of how this event will propagate through our app:

0. User presses a key.
0. The key listener catches the `keydown` event and invokes
   `KeyActions.keyPressed` with the appropriate key name.
0. The `KeyActions.keyPressed` action sends a payload to the
   `AppDispatcher`. The payload should contain the `actionType` and a
   `noteName`.
0. The dispatcher emits the event. The `KeyStore` catches the event,
   gets the `noteName` out of the payload, and adds it to its array of
   `keys`. The `KeyStore` also emits a change event.

How do you grab the keycode?  Stick a debugger at the top line of your key listener and poke around until you find the keycode.  This strategy is very effective for trying to figure out what unknown objects can do.  Use this strategy often.

In a moment, we'll write a `Key` React component, which will listen for
changes in the `KeyStore`. When that change occurs, the `Key` will
conditionally re-render and either start or stop its `Note`. Make sure
you've built out both your KeyStore and two KeyAction functions before
continuing.

[keycode-list]: http://www.cambiaresearch.com/articles/15/javascript-char-codes-key-codes#TABLE2

## Phase 4: React Components

### OrganKey

Let's write an`OrganKey` React class component (NB: We're calling it
`OrganKey` to help distinguish it from our computer keyboard's keys). 
This will be the visual
representation for a single note in your organ, as well as the
component responsible for managing whether a `Note` is being played. 
The component will be passed a single `noteName` as a prop. When the
component mounts, create a new `Note` instance and store this as an
instance variable in your component. Notice that a `Note` is
constructed with a frequency, not a `noteName` string, so be sure to
use your `Tones` constant to convert it.

The `OrganKey` should listen to the `KeyStore`. If the `noteName` for the
`OrganKey` is in the `KeyStore`, the `OrganKey` should `start` its `Note`.
Remember to remove the listener in `componentWillUnmount` -- refer
back to the reference reading if you are unsure how to do this.

The time has finally come to test our setup. In `OrganGrinder.jsx`, use
`ReactDOM` to put a single OrganKey on the page (ensuring that the
`noteName` you pass is in both your Notes and Key mappings). Ensure
you are also requiring your KeyListener.js file so the event listeners
are probably bound. Fire up your rails server and press the specified
key. You should hopefully hear sound!

If you don't, first check for errors in your console. After that,
follow the Flux pattern to debug piece by piece. Your interaction
chain is roughly `Event Listener -> Action Creator -> Dispatcher ->
Store -> Component`. I recommend starting at the beginning and
checking that things are as they should be as you go through the Flux
structure.

### Organ

Now let's add support for more than one `OrganKey`. We'll do this by writing
a new React component, `Organ`. This should render an `OrganKey` for each of
the `TONES`. At this point, you should be able to make beautiful
music just by typing on your keyboard! Using CSS rules and the `state`
of your `OrganKey` component, update the `OrganKey` visually when its note is being
played.

## Phase 5: Track Recording and Playback

Before we worry about how we want to persist a track on the server,
let's get track recording working on the front end.

### `util/Track.js`

Write a `Track` class to represent a recorded song. The constructor for
this class should accept an attributes hash, which will contain a `name`
and (optionally) a `roll`. The `roll` will be an array that holds the
"recipe" for playing a track (more details later).

Write a method to `startRecording`. Reset `this.roll` to an empty array,
grab the current time, and save it to an instance variable. This will
allow you to easily calculate when a note has been played, relative to
the start of the recording.

While the track is being recorded, we'll need to update `this.roll` as
new notes are pressed. Write an `addNotes` method for this purpose. The
method should `push` into the `roll` an Object with the following values:

- `timeSlice` (how much time has elapsed since we started recording)
- `notes` (which note names (`['C3', 'E3', 'G3']`) are currently being
  pressed)

NB: we shouldn't be storing instances of `Note` in the roll. Only the
names of the notes. We will create actions for each one of these note
names when it is time to play them so that the existing flux structure
can play the notes. In this way, your program is like a player piano. A
player piano doesn't have a second set of keys for playback, it uses the
same keys for live playing or playing back a roll.

Write another instance method to `stopRecording`. In this method, simply
call `this.addNotes` with an empty array--this will ensure that the
track is silent when it ends, and won't haunt our ears forever.

### `components/Recorder.jsx`

Make a new `Recorder` React component. The component's `state` should
have two parts: a boolean, `isRecording`, and a blank `Track`. The
component's visual interface should include buttons to start and stop
recording. This should be easy; simply delegate to your Track's instance
methods.

The Recorder should also listen for changes in the `KeyStore`. When a
change occurs, respond by invoking your Track's `addNotes` method,
passing in the notes currently in the store.

Finally, we need to be able to play the Track back. Two things are
required:

- a "Play" button for our Recorder component
- a `play` instance method for our Track class.

Let's think about how to implement the `Track#play` method. Track data
is stored in a `roll`, which contains objects of the form:

```js
{
  timeSlice: (timeElapsed),
  notes: (notesArray)
}
```

We can count on these objects being sorted in ascending order by
`timeSlice` (since `timeElapsed` only grows between calls to
`addNotes`). We can't just iterate over these objects, though, because
iteration happens (essentially) instantaneously. Instead, we want to
**throttle** our iteration, such that we only move on to the next note
once `Date.now() - playBackStartTime` exceeds the current note's
`timeSlice`. What JavaScript function allows us to invoke a callback
over larger spans of time? That's right: `setInterval`. It's important
to note here that we don't want to run the interval forever--only until
the end of the Track. It's important to note that you can cancel an
interval:

```js
var intervalId = setInterval(callback, 10);
clearInterval(intervalId);
```

We'll store a reference to the interval as an instance variable of the
Track, `this.interval`. At the top of your `play` method, check if
`this.interval` already exists; if so, return immediately so we don't
play the Track over itself. Next, grab `Date.now()` and assign it to
`playbackStartTime`. We'll also want to initialize the `currentNote` to
`0`. Local variables are sufficient here; the interval callback will
close over them. Now for the meat of the method: set an interval,
passing in an anonymous callback.

The callback should check whether `currentNote` is still in range of the
`roll`. If so:

- Check whether `Date.now() - playBackStartTime` exceeds the current
  note's `timeSlice`. If so:
    - Use one of your KeyActions to update the KeyStore.
    - Move on to the next note.
    - _Hint:_ A new KeyAction might make this easier to manage.

**Else**, we've gone out of range of the roll. Clear the interval and
`delete` it from the properties of `this`.

Don't move on until you're able to record and play back tracks!

### `TrackStore`

Write a `TrackStore` to hold all the tracks that have been recorded (or
fetched from the server). You'll also need an action to add tracks to
the store. Invoke this action from your `Recorder` when a track is
saved.

### `Jukebox` and `TrackPlayer`

Let's write a `Jukebox` React component to display all the tracks in the
`TrackStore`. Each track will be represented by a `TrackPlayer`
component; the `Jukebox` will simply wrap around these and group them
together.

The `TrackPlayer` should have a `track` as part of its `props`. Its
`render` method should render buttons to "Play" or "Delete" the track.

Once you're able to view and play tracks in your Jukebox, you're ready
to move on!

But FIRST: look through every file you've written and make sure you know which part of [the flux pattern][flux-diagram] the file represents.  Check with your partner that they can make the same connections.

[flux-diagram]: ../../assets/flux-diagram.png

## Phase 6: Adding Tracks to the DB

It's finally time to start saving songs to the server. Write a Rails
Track model, as well as a TracksController. The Track model should have
columns for `name` (a string) and `roll` (a JSON object). SQLite3
doesn't support JSON columns natively; you could handle the conversions
yourself, but it's easier to simply use Postgres.

In your TracksController, write actions for `create`, `index`, and
`destroy`. The `index` action should render a JSON representation of
each saved Track object.

To wire everything up, we're going to need a few more actions and
utilities. Write a `TrackApiUtil` utility to fetch, save, and destroy
tracks through your JSON API. You'll also need a `createTrack` action to
save tracks through your API Util.

## Bonus: Extra Awesome Features

* It's a keyboard; have fun! Add more notes!
* Make additional keys that play entire CHORDS.
* **Looping**: add a setting to allow tracks to play continuously.
* **Jam Session**: allow users to play on the organ while a track runs
  in the background.
* **Scales**: pentatonic, minor, etc.
* **Playlists**: queue up tracks to be played one after another.
* Implement other octaves and waveforms.
* Make it beautiful. This could be a *key component* of your portfolio
  (see what we did there?)
* Options to change volume/waveform of notes and tracks
* Export tracks as audio files so they can be saved to the client's
  machine
