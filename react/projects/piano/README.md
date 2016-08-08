# Redux Synthesizer

Live demo available [here]!

[here]:https://www.youtube.com/watch?v=J---aiyznGQ

## Overview

Today we're using React.js and Redux to create our own musical keyboard!

**NB**: Make sure to test as you go and refer to the Redux readings if you get
stuck. Your understanding will suffer if you code an entire section before
figuring out how to make it run. Start small and append.

## Phase 1: Frontend Structure

* Create a project directory.
* Create an `index.html` file and give it a `<div id="root"></div>` container.
* Run `npm init --yes` to set up your `package.json`.
* To set up React and Redux `npm install --save` the following packages:
  * `webpack`
  * `react`
  * `react-dom`
  * `react-redux`
  * `redux`
  * `babel-core`
  * `babel-loader`
  * `babel-preset-react`
  * `babel-preset-es2015`
* Run `npm install --save jquery`. We'll be using jQuery later.
* Create a `/frontend` folder at the root directory of your project to contain
 all of your front-end code.
* Model your `/frontend` folder to look like the directory tree below:

  ```
  /frontend
    + /actions
    + /components
    + /constants
    + /reducers
    + /store
    + /util
    + synthesizer.jsx
  ```

* Setup your entry file `synthesizer.jsx` to render your app into the into the
 `root` container.
* Configure your webpack setup in `webpack.config.js` to compile all of your JS
 into a `bundle.js`.
* Run `wepback --watch` and test that your app renders before moving on.

## Phase 2: Notes and Tones

#### `Note` Class

Make a `note.js` file inside of your `util` folder. This file will contain the
code for your `Note` class which you will use to actually play tones using the
`start` and `stop` functions. We'll provide the code for this phase. Copy and
paste the following into your `note.js`.

```js
// util/note.js
const ctx = new (window.AudioContext || window.webkitAudioContext)();

const createOscillator = (freq) => {
  const osc = ctx.createOscillator();
  osc.type = "sine";
  osc.frequency.value = freq;
  osc.detune.value = 0;
  osc.start(ctx.currentTime);
  return osc;
};

const createGainNode = () => {
  const gainNode = ctx.createGain();
  gainNode.gain.value = 0;
  gainNode.connect(ctx.destination);
  return gainNode;
};

class Note {
  constructor(freq) {
    this.oscillatorNode = createOscillator(freq);
    this.gainNode = createGainNode();
    this.oscillatorNode.connect(this.gainNode);
  }

  start() {
    this.gainNode.gain.value = 0.3;
  }

  stop() {
    this.gainNode.gain.value = 0;
  }
};

module.exports = Note;
```

Before moving on, test that you can instantiate and play a `Note` from the
console.

#### `TONES` and `NOTES` Constants

Create a `constants/tones.js` file. From there export a `TONES` constant, a
JavaScript object mapping note names to frequencies. Also export a `NOTES`
constant, an array of all of the keys in `TONES`. We'll be using these constants
later to map our keyboard keys to notes names to tones!

Feel free to use [this table][note-frequencies] as a resource.

[note-frequencies]: http://www.phy.mtu.edu/~suits/notefreqs.html

## Phase 3: Notes Redux Structure

### Designing the State Shape

In Redux, all app state is stored as a single JavaScript object. It's good
practice to think about its shape before writing any code. Ask yourself what's
the minimal representation of your app's state as an object?

For our synthesizer app, we first and foremost want to store the `notes` in play, as an array of note names.

### Action Creators

We need to define our first action creators. Remember, an action creator is
simply a function that returns an action. Actions define what we can do in our
app. In Redux, they are POJOs that have a `type` property indicating the type of
action being performed.

Create an `actions/note_actions.js` file which will house our action creators for `notes`.

#### `NOTES_CONSTANTS`

Action `type`s are typically defined as string constants. In our new file, let's export a `NOTES_CONSTANTS`, an object containing keys for `KEY_PRESSED` and `KEY_RELEASED`. Technically, the values of these keys can be anything, but our convention is to use the string literal of the key. For example,

```js
export const NotesConstants = {
  KEY_PRESSED: "KEY_PRESSED",
  ...
};
```

#### `keyPressed`

+ Export a `keyPressed` function which takes the keyboard `key` pressed and
returns an action of `type` `KEY_PRESSED`.
+ Add `key` as a property to the action to let the store know which `key` to add to its `notes` array.

#### `keyReleased`

+ Export a `keyReleased` function which takes the keyboard `key` released and
returns an action of `type` `KEY_RELEASED`.
+ Add `key` as a property to the action to let the store know which `key` to remove from its `notes` array.

### Handling Actions - Reducers
Now that we’ve decided what our state shape looks like and defined the actions
that will send data from your app to the store, we need reducers that
update the state base on the actions.

A reducer is a *pure* function that takes the previous state and an action,
and returns the next state. It manages the shape of our application's state.

Things you should never do inside a reducer:
+ Mutate its arguments;
+ Perform side effects like API calls and routing transitions;
+ Call non-pure functions, e.g. `Date.now()` or `Math.random()`.

**TL;DR**: Reducers are pure functions. Given the same arguments for `state` and
`action`, a reducer should calculate the next state and return it. No side
effects.

Let's write a reducer for our app which handles the actions we defined above.

#### `notes` Reducer

Create a `reducers/notes_reducer.js` file that exports a `notes` reducer. Import `NotesConstants` from `notes_actions`.

`notes` is a pure function that takes two arguments:
+ `state` - the previous `notes` state
+ `action` - the action object dispatched

Redux will call our reducer with an `undefined` state for the first time so use
the [ES6 default arguments syntax][default-args] to return an empty array as the
 initial state.

+ Add a `switch` statement evaluating `action.type`.
+ Return the previous `state` as the `default` case.
+ Then add a case for each key (i.e. action type) defined in `NOTES_CONSTANTS`.
  + `KEY_PRESSED` - if the `action.key` isn't already in the state (i.e. already
  playing) then return a new state with the new key appended to the previous
  state, else return the previous state.
  + `KEY_RELEASED` - return a new state with the `action.key` removed only if
  it's currently playing (i.e. in the state), else return the previous state.

**NB**: State is never mutated in Redux. Thus, we must return a new array when
 our state changes. Make sure your `notes` reducer creates and returns a new
 array when adding or removing a note. Here's a good [reference][array-mutation]
 on how to avoid array mutation.

[default-args]: https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Functions/default_parameters
[array-mutation]: https://egghead.io/lessons/javascript-redux-avoiding-array-mutations-with-concat-slice-and-spread

We're almost there. You might have noticed that `action.key` evaluates to the
keyboard key pressed or released while our state's `notes` store an array of
note names. So we must map our `key`s to a note names using our constant `NOTES`
and an array of valid keyboard keys.

+ Define an array called `validKeys` which stores the strings of all of your
synthesizer's keyboard keys (e.g. `a`, `s`). The number of valid keys must equal
the number of notes you plan on having.
+ Define an object called `keyMap` which stores as keys, valid keys and as
values, corresponding note names (e.g. `keyMap['a'] = 'C5'`).
+ Modify your `KEY_PRESSED` and `KEY_RELEASED` cases so that they also check to
see if a `action.key` is also a valid key. If not in both cases, return the
previous state.

#### Root Reducer

Now the `notes` reducer just updates and returns to the store a single slice of
the state: the `notes` in play.

**NB**: When we have state fields that are independent of each other, we split
the reducer into multiple reducers that each handle its own slice of the state.
This is called **reducer composition**, and it’s the fundamental pattern of
building Redux apps.

We only have one reducer right now, but later as our app grows we'll be adding
more. For now, let's define the root reducer that calls all of the reducers
managing parts of the state, and combines them into a single function.

Create a new file called `reducers/index.js` file and import
[`combineReducers`][combine-reducers] from `redux` and your `notes` reducer.

Using it, define and `export default` a root `reducer` function.

[combine-reducers]: http://redux.js.org/docs/api/combineReducers.html

### Store
In Redux, the store calls the reducer function you give it whenever
`dispatch(action)` is called within your app. The store saves the complete state
tree that is returned by the root reducer, and every listener registered will be
called in response to the new state!

+ Create a `store/store.js` file and import [`createStore`][create-store] from
`redux` and your root `reducer`.
+ Define and `export default` a function called `configureStore` that returns a
new store with the root reducer.
+ In your entry file, import `configureStore` and create your app's `store`.

[create-store]: http://redux.js.org/docs/api/createStore.html

## Phase 4: `Synth` Components

### `App` Component
The `App` component will hold all of the top-level components of your app.

+ Create a file `components/app.jsx` and `React` from `react`.
+ Define and `export default` a functional `App` component.

### `Root` Component

The `Root` component serves to wrap your `App` component with a
[`Provider`][provider] component. The Provider is a special React Redux
component that gives all of your container components access to your app's store
without passing it explicitly to each container, allowing all of them to read
your app's state and dispatch actions.

+ Create a file `components/root.jsx`.
+ Import `Provider` from `react-redux`, `React` and your `App` component.
+ Define and export a `Root` component which takes as an argument `store` and
wraps your `App` with a `Provider`. Like so:

```js
const Root = ({ store }) => (
  <Provider store={store}>
    <App/>
  </Provider>
);

export default Root;
```

+ Update your entry file to render your `Root` component, passing it the store
returned by `configureStore`.

[provider]: https://github.com/reactjs/react-redux/blob/master/docs/api.md#provider-store

### `SynthContainer` Component

The goal of a container component is to allow the presentational component to be
as simple and lightweight as possible. To create a container, we need map the
application state and the Store's dispatch to a set of props that get passed to
the presentational component. Fortunately, `react-redux` provides a function
that does this for us: [`connect`][connect].

* Create a new directory `components/synth`.
* Create a file `components/synth/synth.jsx`. Define and export `Synth`, a function component to start.
* Create a file `components/synth/synth_container.jsx`, and import [`connect`] from `react-redux` and your `Synth` component.
* Define a `mapStateToProps(state)` function. Return an object mapping `state.notes` to a `notes` key.
* Import your `keyPressed` and `keyReleased` action creators.
* Define a `mapDispatchToProps(dispatch)` function. Return an object containing callback props for your action creators. For example,

```js
const mapDispatchToProps = dispatch => ({
  keyDown: key => dispatch(keyPressed(key)),
  ...
});
```
* `mapStateToProps` reads the state held by the store and `mapDispatchToProps` dispatches actions to the store. Call `connect(mapStateToProps,
mapDispatchToProps)` on your `Synth` component to connect it to your Redux
store.
* Export the result of this call.

[connect]: https://github.com/reactjs/react-redux/blob/master/docs/api.md#connectmapstatetoprops-mapdispatchtoprops-mergeprops-options

### `Synth` Component

`Synth` is an example of a presentational component. Presentational components
are typically written as functional components unless they require internal
state, lifecycle hooks, etc. Your `Synth` component will instantiate an array of
`Note`s, calling `start` and `stop` depending on the notes in the store and
define key listeners on the window.

* Redefine your `Synth` component so that it extends the `React.Component`.
* Import your `NOTES` and `TONES` constants, and `Note` class.
* In the `constructor`, instantiate an array of `Note` instances and setting it to `this.notes.` Flashback, your `Note` constructor takes a frequency as a parameter, not a string. Hint: Use `NOTES` and `TONES` to return an array mapping note names to the right frequency.
* In the `render` function, render a list of `this.notes` to test.

#### Key Listeners
Now let's create a jQuery listener for `keyup` and `keydown` events.

* In your `Synth` class define a `onKeyDown(e)` function which takes as an argument a [KeyboardEvent][keyboard-event]. Grab the key from the event and call `this.props.keyUp`. Remember `keyUp` is the function you defined in `mapDispatchToProps` in your `SynthContainer`.
* Define another function called `onKeyDown(e)`. Call `this.props.keyDown` passing it the key from the KeyboardEvent.
* In `componentDidMount`, install the two event handlers by calling the `on` methods on `$(document)`. For example,
```js
$(document).on('keydown', e => this.onKeyDown(e));
```

When a user presses a key, the key listener calls your `onKeyDown(e)` function, which dispatches a `keyPressed(key)` action to the store. Likewise, when a user releases a key, the listener calls your `onKeyUp(e)`, which dispatches a `keyReleased(key)` action to the store. Make sure your follow this before moving on.

**NB**: A jQuery `'keydown'` listener fires repeatedly when the user holds down a key, which will repeatedly trigger our `keyPressed` function. Does this explain some of the overhead in our `notes` reducer?

#### Playing `Note`s

Ok let's actually start jamming.

* Define a `playNotes` function.
* Iterate through `this.notes`, calling `start` and `stop` on all of the notes present in the store and `stop` on all the other notes.
* Call `playNotes` in `render`.
* Test your app! Make sure that your have your key actions, reducer and listeners working before continuing.

[keyboard-event]: https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent
### `NoteKey` Component

Let's write a presentational component, `NoteKey`. This component will be the visual representation of a single note in your piano.

* Create a new file, `components/synth/note_key.jsx`.
* Define and export a new functional component called `NoteKey`.
* Import `NoteKey` in `Synth`.
* Render a list of `NoteKey`s instead of list `this.notes`, passing as a prop the note name.
* Change your `NoteKey` component to display the name of the note.

Cool, your now have the core of your Redux Synthesizer done! Let's start adding additional features.

## Phase 6: Track Recording

`startRecoding` action instantiates a new instance of track in the store. A track contains

```

idx = 1;

{ idx : {

  }}
obj = {}
obj[idx] = {}

tracks
{
  "1": {
    id: 1
    roll: []
    timeStart: time
  },
  id: {
    id:
    roll: []
    timeStart: time
  }
}
```

Roll starts as an empty array. Save the current time which we will use to calculate when to play a note relative to the start of the recording.

While the user records a track, we'll need to update `roll` as the user presses new notes. `addNotes(notes)` that `pushes` into the `roll` an object with the following values:
- `timeSlice`: the time elapsed since the user started recording
- `notes`: an array of note names (eg. `['C3', 'E3', 'G3']`) are currently pressed

**NB:** We storing only the names of the notes in the roll, *not* instances of `Note`. Your app's like a player piano, which uses the same keys for live playing and replaying a roll!

Write another action called `stopRecording` which calls `addNotes` on an empty array, ensuring that the track is silent when it ends.

## Playing a Track

We need a "Play" button for our `JukeBox` tracks and a `playTrack` action for our tracks.

Remember the `roll` array stores track data in the form:

```js
{
  timeSlice: (timeElapsed),
  notes: (notesArray)
}
```

`timeSlice` ensures that the `roll`'s objects are in ascending order (since `timeElapsed` increases between calls to `addNotes`). But we can't simply iterate over these objects because iteration happens (essentially) instantaneously. We instead want to *throttle* our iteration, such that we continue the next note once `Date.now() - playBackStartTime` exceeds the current note's `timeSlice`. `setInterval` allows us to invoke a callback over (relatively) large spans of time.

We want the interval to run until the end of the `track`.

Store a reference to the interval as an instance variable (`this.interval`) of the `track`. At the top of your `play` method, check if `this.interval` already exists. If it does, `return` so that we don't play the `track` over itself. Next grab `Date.now()` and assign it to a local variable `playBackStartTime`. Also initialize the local variable `currentNote` to `0`.

Now for the meat of the method: set an interval and pass in an anonymous callback. The callback should check whether `currentNote` is still in range of the `roll`. **If so**:
- Check whether `Date.now() - playBackStartTime` excessed the current note's `timeSlice`. **If so**:
  - Use one of your `KeyActions` to update the `KeyStore`.
  - Continue to the next note.
  - *Hint:* A new KeyAction such as `groupUpdate(notes)` might simplify your task.

**Else**: we've exceeded the range of the roll. Clear the interval and `delete` it from the properties of `this`.

Remember to cancel your interval when the `track` finishes playing.
```js
const intervalId = setINterval(callback, 10);
clearINterval(intervalId);
```
Don't proceed until you're about to play all of your tracks!

BONUS:

Figure out what song this is.

```
"{"id":3,"roll":[{"notes":["A5"],"timeSlice":901},{"notes":["A5"],"timeSlice":1408},{"notes":["G5"],"timeSlice":1431},{"notes":["C6"],"timeSlice":1664},{"notes":["B5"],"timeSlice":1903},{"notes":["A5"],"timeSlice":2170},{"notes":["G5"],"timeSlice":2396},{"notes":["B5"],"timeSlice":2692},{"notes":["G5"],"timeSlice":3183},{"notes":["G5"],"timeSlice":3679},{"notes":["G5"],"timeSlice":3764},{"notes":["G5"],"timeSlice":3848},{"notes":["G5"],"timeSlice":3932},{"notes":["A5"],"timeSlice":4476},{"notes":["A5"],"timeSlice":4699},{"notes":["G5"],"timeSlice":4933},{"notes":["C6"],"timeSlice":5215},{"notes":["B5"],"timeSlice":5475},{"notes":["A5"],"timeSlice":5702},{"notes":["G5"],"timeSlice":5923},{"notes":["B5"],"timeSlice":6199},{"notes":["G5"],"timeSlice":6651},{"notes":["E5"],"timeSlice":7140},{"notes":["G5"],"timeSlice":7596},{"notes":["E5"],"timeSlice":7910},{"notes":["A5"],"timeSlice":8364},{"notes":["A5"],"timeSlice":8612},{"notes":["G5"],"timeSlice":8836},{"notes":["C6"],"timeSlice":9102},{"notes":["B5"],"timeSlice":9340},{"notes":["A5"],"timeSlice":9620},{"notes":["G5"],"timeSlice":9846},{"notes":["B5"],"timeSlice":10113},{"notes":["G5"],"timeSlice":10628},{"notes":["G5"],"timeSlice":11126},{"notes":["G5"],"timeSlice":11210},{"notes":["G5"],"timeSlice":11293},{"notes":["G5"],"timeSlice":11376},{"notes":["A5"],"timeSlice":11930},{"notes":["A5"],"timeSlice":12149},{"notes":["G5"],"timeSlice":12378},{"notes":["C6"],"timeSlice":12612},{"notes":["B5"],"timeSlice":12835},{"notes":["A5"],"timeSlice":13116},{"notes":["G5"],"timeSlice":13334},{"notes":["B5"],"timeSlice":13597},{"notes":["G5"],"timeSlice":14056},{"notes":["E5"],"timeSlice":14466},{"notes":["G5"],"timeSlice":14919},{"notes":["E5"],"timeSlice":15217},{"notes":["G5"],"timeSlice":16469},{"notes":["G5"],"timeSlice":16714},{"notes":["G5"],"timeSlice":16943},{"notes":["E5"],"timeSlice":17178},{"notes":["G5"],"timeSlice":17423},{"notes":["G5"],"timeSlice":17638},{"notes":["A5"],"timeSlice":17983},{"notes":["C5"],"timeSlice":19616},{"notes":["E5"],"timeSlice":19905},{"notes":["D5"],"timeSlice":20161},{"notes":["C5"],"timeSlice":20401},{"notes":["D5"],"timeSlice":20648},{"notes":["D5"],"timeSlice":20883},{"notes":["E5"],"timeSlice":21155},{"notes":["G5"],"timeSlice":22235},{"notes":["G5"],"timeSlice":22484},{"notes":["G5"],"timeSlice":22701},{"notes":["E5"],"timeSlice":22943},{"notes":["G5"],"timeSlice":23227},{"notes":["G5"],"timeSlice":23460},{"notes":["B5"],"timeSlice":23720},{"notes":[],"timeSlice":25642}],"timeStart":1470268928733}"
```

* **Looping***: Add a setting to allow tracks to play continuously.
* **Playlists**: Queue up tracks to be played sequentially.


classes:
+ `app`

+ `piano`
+ `note-key-list`
+ `note-key`

+ `recorder`
+ `start-button`
+ `stop-button`

+ `juke-box`
+ `track-list`
+ `track`
+ `play-button`
+ `delete-button`
