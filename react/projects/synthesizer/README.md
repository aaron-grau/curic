# Redux Synthesizer

## This project is deprecated as of 11/21/2016, and might use outdated patterns.

## Overview

Today we're using React.js and Redux to create our own musical keyboard! Check out the live demo [here][live-demo] to get a sense of what you are building! If you have any trouble playing the keys update your chrome browser to the newest version.

[**Live Demo!**][live-demo]

[live-demo]:http://appacademy.github.io/curriculum/react/synthesizer/solution/index.html

## Phase 0: Frontend Structure

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
  * `jquery`
  * `lodash` -  We'll be using `merge` from the [lodash][lodash] library later to help prevent object mutation in our app's state.
* Create a `/frontend` folder at the root directory of your project to contain
 all of your front-end code.
* Model your `/frontend` folder to look like the directory tree below:

  ```
  /frontend
    + /actions
    + /components
    + /reducers
    + /store
    + /util
    + synthesizer.jsx
  ```

* Import `React` from `react` and `ReactDOM` from `react-dom`.
* Set up your entry file `synthesizer.jsx` to render your app into the into the
 `#root` container of your `index.html`. You'll want to add an event listener for `'DOMContentLoaded'` and pass it a callback that finds and uses `ReactDOM` to render into the `#root` container from `index.html`.
* Configure your webpack setup in `webpack.config.js` to compile all of your JS
 into a `bundle.js`.
 * You may copy the code below (and use it as a template for future projects).

```js
 //webpack.config.js

 const path = require("path");

module.exports = {
  context: __dirname,
  entry: "./frontend/synthesizer.jsx",
  output: {
    path: path.join(__dirname),
    filename: "bundle.js"
  },
  module: {
    loaders: [
      {
        test: [/\.jsx?$/, /\.js?$/],
        exclude: /(node_modules|bower_components)/,
        loader: 'babel',
        query: {
          presets: ['es2015', 'react']
        }
      }
    ]
  },
  devtool: 'source-maps',
  resolve: {
    extensions: ["", ".js", ".jsx" ]
  }
};
```

* Source your bundle file in `index.html`.
* Run `webpack --watch` and test that your app renders before moving on.

[lodash]:https://lodash.com/docs

## Phase 1: Notes and Tones


#### `Note` Class

You need a `Note` class which you will use to actually play tones using the
`start` and `stop` functions. We are providing the code for this phase.

* Make a `note.js` file inside of your `util` folder.
* Copy and paste the following into your `note.js`.

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

export default Note;
```

Before moving on, test that you can initialize and play an instance of a `Note`
from the `window`. Try a frequency of 800!
  * Hint - define `window.Note` in your entry file (`synthesizer.jsx`) to access
  the `Note` class from your browser console.

#### `TONES` and `NOTE_NAMES` Constants

In this step, let's create a constants file which will help us translate
keyboard keys (e.g. `a`, `s`) into frequencies (i.e. tones) which we will need
to create `Note`s.

* Create a `util/tones.js` file.
* From there create and export a `TONES` constant, a JavaScript object mapping key names to frequencies. Something like this,

  ```js
  // util/tones.js

  export const TONES = {
    'a': 523.25,
    's': 587.33,
    'd': 659.25,
    'f': 698.46,
    'g': 783.99
  };
  ```

  Feel free to copy and paste the object above. If you are interested, you may use [this table][note-frequencies]
  as a resource for additional keys.
* Create and export a `NOTE_NAMES` constant, an array of all of the keys from `TONES`.

We'll be using these constants later to map our keyboard keys to tones.

[note-frequencies]: http://www.phy.mtu.edu/~suits/notefreqs.html

## Phase 2: Notes Redux Structure

### Designing the State Shape

In Redux, all of your application's state is stored as a single JavaScript
object. It's really good practice to think about its shape before writing any
code. Ask yourself, what's the minimal representation of your app's state as an
object?

For our synthesizer app, we first and foremost want to store the `notes` being
played as an array of note names. In other words, your app's `state` shape will
look something like this:

```js
{
  notes: ['a', 's']
}
```

### Action Creators

We need start by to defining action creators. Remember, an **action creator** is
simply a function that returns an action. **Actions** are POJOs that define what we can do in our
app. They have a mandatory `type` property indicating the type of
action being performed.

* Create an `actions/notes_actions.js` file which will house our action creators changing the app's `notes`.

#### `Note Action Constants`

Action `type`s are typically expressed as string constants - that way if you accidentally misspell the type later on an error will get thrown versus silently failing.

* In `notes_actions.js`, let's export two action types: `KEY_PRESSED` and `KEY_RELEASED`.

For example,

```js
// actions/note_actions.js

export const KEY_PRESSED = "KEY_PRESSED";
```

#### `keyPressed(key)`

+ Export a `keyPressed` function which takes the keyboard `key` pressed and
returns an action of `type` `"KEY_PRESSED".`
+ Add `key` as a property to the action to let the store know which `key` to add to its `notes` array.

Your action creator `keyPressed` should look like this:

```js
// actions/note_actions.js

export const keyPressed = key => ({
  type: KEY_PRESSED,
  key
});
```

#### `keyReleased(key)`

+ Export a `keyReleased` function which takes the keyboard `key` released and
returns an action of `type` `"KEY_RELEASED"`.
+ Add `key` as a property to the action to let the store know which `key` to remove from its `notes` array.

### Handling Actions - Reducers
Now that we’ve decided what our state shape looks like and defined the actions
that will send data from your app to the store, we need reducers that update the
state base on the actions.

A **reducer** is a pure function that takes the previous state and an action, and
returns the next state. It manages the shape of our application's state. Given
the same arguments for `state` and `action`, a reducer should calculate the next
state and return it. No side effects, such as mutating its arguments!

Let's write a reducer for our app which handles the actions we defined above.

#### `notes` Reducer

+ Create a `reducers/notes_reducer.js` file that exports a `notes` reducer, a pure function that takes two arguments:
  + `state` - the previous `notes` state;
  + `action` - the action object dispatched.
+ Import `KEY_PRESSED` and `KEY_RELEASED` from `../actions/notes_actions.js`.
+ Import `NOTE_NAMES` from `../util/tones`.
+ Redux will call our reducer with an `undefined` state for the first time so use the [ES6 default arguments syntax][default-args] to give our state argument a default value of an empty array.
+ Call [`Object.freeze()`][object-freeze] on the state in order to avoid accidentally mutating it!
+ Add a `switch` statement evaluating `action.type`.
+ Return the previous `state` as the `default` case.
+ Then add a case for each action type.
  + `KEY_PRESSED` - Return a new state with the `action.key` appended to the previous state if the note isn't already playing (i.e. `action.key` isn't already in the state), else return the previous state.
  + `KEY_RELEASED` - Return a new state with the `action.key` removed only if the `action.key` is currently in the state (i.e. currently playing), otherwise return the previous state.

*NB*: State is never mutated in Redux (hence the use of `Object.freeze()`). Thus, we must return a new array when
our state changes. Make sure your `notes` reducer creates and returns a new
array when adding or removing a note. This is a good [reference][array-mutation]
on how to avoid array mutation ([here][array-mutation-code]'s the code from the video).

[default-args]: https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Functions/default_parameters
[array-mutation]: https://egghead.io/lessons/javascript-redux-avoiding-array-mutations-with-concat-slice-and-spread
[array-mutation-code]:https://jsbin.com/juseku/1/embed?js
[union-lodash]: https://lodash.com/docs#union
[object-freeze]: ../../readings/object_freeze.md


We're almost there. Note that `action.key` references keys that should be included in `NOTE_NAMES`.

+ Modify your `KEY_PRESSED` and `KEY_RELEASED` cases so that they check to
see if a `action.key` is also a valid key included in `NOTE_NAMES`. If not, return the previous state.

#### Root Reducer

The `notes` reducer updates and returns to the store only a single slice of
the state: the `notes` in play.

*NB*: When we have state fields that are independent of each other, we split the
reducer into multiple reducers that each handle their own slices of the state.
This is called **reducer composition**, and it’s the fundamental pattern of
building Redux apps.

We only have one reducer right now, but later as our app grows we'll be adding
more. For now, let's define a root reducer that calls all of the reducers
managing parts of the state, and combines them into a single function.

* Create a new file called `reducers/root_reducer.js` file.
* Import [`combineReducers`][combine-reducers] from `redux` and your `notes` reducer from `./notes_reducer`.
* Using `combineReducers`, define and `export default` a `rootReducer` function.

[combine-reducers]: http://redux.js.org/docs/api/combineReducers.html


### Store
In Redux, the store calls the reducer function you give it whenever
`dispatch(action)` is called within your app. The store saves the complete state
tree that is returned by the root reducer, and every listener registered will be
called in response to the new state!

+ Create a `store/store.js` file and import [`createStore`][create-store] from
`redux` and your root `reducer`.
+ Define a POJO `preloadedState` that maps `notes` to an empty array.
+ Define and `export default` a function called `configureStore` that takes `preloadedState` as an argument and returns a
new store with the root reducer.
+ In your entry file (`synthesizer.jsx`), import `configureStore` and create your app's `store`. It would be a good idea to define the store on your window. Our code should look something like the following:

```js
// synthesizer.jsx

import React from 'react';
import ReactDOM from 'react-dom';
import configureStore from './store/store';

document.addEventListener('DOMContentLoaded', () => {
  const store = configureStore();
  const rootEl = document.getElementById('root');
  ReactDOM.render(<h1> Synthesizer</h1>, rootEl);

  window.store = store; // for testing
});
```

**NB**: that you should *never* invoke `configureStore()` more than once - your
app only need one store!

Test your new store. Run `open index.html` in your terminal and open up
Chrome Dev Tools. Does `store.getState()` return what you would expect?

[create-store]: http://redux.js.org/docs/api/createStore.html


## Phase 3: Synth Components

### `App` Component
The `App` component will hold all of the top-level components of your app.

+ Create a file `components/app.jsx` and import `React` from `react`.
+ Define and `export default` a functional `App` component. For now this should just be a `div`  with `className='app'`.

### `Root` Component

The `Root` component serves to wrap your `App` component with a
[`Provider`][provider] component. The Provider is a special React Redux
component that gives all of your container components access to your app's store
without passing it explicitly to each component, allowing all of them to read
your app's state and dispatch actions. These components that connect to the
store are known as **container** components.

+ Create a file `components/root.jsx`.
+ Import `Provider` from `react-redux`, `React` and your `App` component.
+ Define and export a `Root` component which takes as an argument `store` and
wraps your `App` with a `Provider`. Like so:

  ```js
  // components/root.jsx

  import React from 'react';
  import { Provider } from 'react-redux';
  import App from './app';

  const Root = ({ store }) => (
    <Provider store={store}>
      <App/>
    </Provider>
  );

  export default Root;
  ```

+ Update your entry file to render your `Root` component, passing it the store
returned by `configureStore`. Your entry should now contain something like the following:

  ```js
  document.addEventListener('DOMContentLoaded', () => {
    const store = configureStore();
    const rootEl = document.getElementById('root');
    ReactDOM.render(<Root store={store} />, rootEl);
  });
  ```

[provider]: https://github.com/reactjs/react-redux/blob/master/docs/api.md#provider-store

### `SynthContainer` Component

Container components are concerned with how things work, such as data fetching
and changes in your app's state. Presentational components are concerned with
how things look. These distinctions allow for better separation of concerns and
better usability of components.

To create a container, we need to map the application state and the Store's
dispatch to a set of props that get passed to the presentational component.
Fortunately, `react-redux` provides a function that does this for us: [`connect`][connect].

* Create a new directory `components/synth`.
* Create a file `components/synth/synth.jsx`. Import `React` from `react`.
* Define and export `Synth`, a component that extends `React.component`. Have its render method simply return `<div>Synth</div>` for now.
* Create a file `components/synth/synth_container.jsx`, and import both `connect` from
`react-redux` and your `Synth` component from `./synth`.
* Define a `mapStateToProps(state)` function. Return an object that maps `state.notes` to a `notes` key. For example,

  ```js
  const mapStateToProps = state => ({
    notes: state.notes
  })
  ```

* Import your `keyPressed` and `keyReleased` action creators from `../../actions/note_actions`.
* Define a `mapDispatchToProps(dispatch)` function. Return an object containing callback props for your action creators.

  For example,

  ```js
  const mapDispatchToProps = dispatch => ({
    keyPressed: key => dispatch(keyPressed(key)),
    ...
  });
  ```

* `mapStateToProps` reads the state held by the store and `mapDispatchToProps` dispatches actions to the store. Call
`connect(mapStateToProps, mapDispatchToProps)` on your `Synth` component to
connect it to your Redux store.
* Export the result of this call, like so:

  ```js
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(Synth);
  ```

* In your `App` component, import your `SynthContainer` and render it. Make sure
you can `webpack` your app and that there are no errors in the console before
moving on. Make sure you can now see 'Synth' somewhere on your webpage!

[connect]: https://github.com/reactjs/react-redux/blob/master/docs/api.md#connectmapstatetoprops-mapdispatchtoprops-mergeprops-options

### `Synth` Component

`Synth` is an example of a presentational component. Presentational components
are typically written as functional components unless they require internal
state, lifecycle hooks, etc. Your `Synth` component will initialize an array of
`Note` objects, calling `start` and `stop` depending on the notes in the store
and define key listeners on the window.

* Import your `NOTE_NAMES` and `TONES` constants, and `Note` class.
* In the `constructor`, initialize an array of `Note` instances and setting it to `this.notes.` Flashback: your `Note`
constructor takes a frequency as a parameter, not a string. Hint: Use
`NOTE_NAMES` and `TONES` to return an array mapping note names to the right
frequency.
* In the `render` function, render a list of `this.notes` to test.

#### Key Listeners
Now let's create a jQuery listener for `keyup` and `keydown` events.

* In your `Synth` class, import `$` from `jquery`.
* Define an `onKeyDown(e)` function which takes as an argument a [KeyboardEvent][keyboard-event]. Grab the key from the
event and call `this.props.keyPressed`. Recap: `keyPressed` is the function you
defined in `mapDispatchToProps` in your `SynthContainer`.
* Define another function called `onKeyUp(e)`. Call `this.props.keyReleased` passing it the key from the
KeyboardEvent.
* In `componentDidMount`, install the two listeners by calling the `on` methods on `$(document)`. For example,

  ```js
  // components/synth/synth_component.jsx

  componentDidMount() {
    $(document).on('keydown', e => this.onKeyDown(e));
    $(document).on('keyup', e => this.onKeyUp(e));
  }
  ```

When a user presses a key, the key listener calls your `onKeyDown(e)` function,
which dispatches a `keyPressed(key)` action to the store. Likewise, when a user
releases a key, the listener calls your `onKeyUp(e)`, which dispatches a
`keyReleased(key)` action to the store. Make sure you follow this before moving
on.

*NB*: A jQuery `'keydown'` listener fires repeatedly when the user holds down a
key, which will repeatedly trigger our `keyPressed` function. Does this explain
some of the overhead in our `notes` reducer?

#### Playing `Note`s

Ok, let's actually start jamming.

Define a `playNotes` function. It should iterate through `this.notes`, calling `start` on all of the notes present in the store and `stop` on all the other notes. Then call `playNotes` in `render`. Your `render` should return a list of `this.notes`.

Test your app! Make sure that your have your key actions, reducer and listeners working before continuing.

[keyboard-event]: https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent

### `NoteKey` Component

Let's write a pure presentational component, `NoteKey`. This component will be
the visual representation of a single note in your piano.

* Create a new file, `components/synth/note_key.jsx`.
* Define and export a new functional component called `NoteKey({note, pressed})`. Here we are [destructing][destructing] the props `note` and `pressed` that we will pass into `NoteKey`.
* Import `NoteKey` in `Synth`.
* Render a list of `NoteKey`s instead of a list `this.notes`, passing as a prop the note name.
* Change your `NoteKey` component to display the name of the note.

Cool, you now have the core of your Redux Synthesizer done. Let's start adding
additional features!

[destructing]: ../../readings/object_destructuring.md

---

## Phase 4: Recorder Redux Structure

Let's give our synthesizer the ability to record tracks.

### Re-Designing the State Shape
This means in addition to storing `notes`, our state needs to store:
+ `isRecording` - a boolean to indicate if your app is recording or not;
+ `tracks` - an object of tracks objects.

Add these options to your `preloadedState` in `store/store`.

Here's a sample of our new state shape:
```js
{
  notes: ['a', 's'],
  isRecording: false,
  tracks: {
    "1": {
      id: 1,
      name: 'Track 1',
      roll:
      [
        { notes: [ 'A5' ], timeSlice: 1250191 },
        { notes: [], timeSlice: 1255000 },
        { notes: [ 'a', 's' ], timeSlice: 1265180 }
        { notes: [], timeSlice: 1279511 }
      ],
      timeStart: 1470164117527
    },
    "2": {
      id: 2,
      name: 'Track 2',
      roll:
      [
        { notes: [ 's', 'd', ';' ], timeSlice: 253386 },
        { notes: [], timeSlice: 265216 }
      ],
      timeStart: 1470173676236
    }
  }
}
```

Take a good look at what your app's state could look like, but let's save
discussing the details of our track objects for a little later.

### Action Creators

+ Create an `actions/tracks_actions.js` file which will house our action creators for `tracks` and `isRecording`.

#### `TracksConstants`

+ Export constants for `START_RECORDING`, `STOP_RECORDING`, and `ADD_NOTES`.

#### `startRecording`

+ Export a `startRecording` action creator which takes no arguments and returns an action of `type` `START_RECORDING`.
+ Add `timeNow` as a property to the action and assign `Date.now()` as its value.

#### `stopRecording`

+ Export a `stopRecording` action creator which takes no arguments and returns an action of the appropriate type.
+ Add `timeNow` as a property to the action and assign `Date.now()` as its value.

#### `addNotes`

+ Export a `addNotes(notes)` action creator which takes an array of `notes` as an argument and returns an action of the appropriate type.
+ Add `timeNow` as a property to the action and assign `Date.now()` as its value.
+ Add `notes` as a property to let the store know which `notes` to add to the track's roll.

### Reducers

#### `isRecordingReducer`
+ Create a `reducers/is_recording_reducer.js` file that exports a `recording(state, action)` reducer.
+ Import your constants from `actions/tracks_actions.js`.
+ `Export default` your `isRecordingReducer`.
+ Use the ES6 default arguments syntax to return `false` as the initial state.
+ Add a `switch` statement evaluating `action.type` and return `state` as the `default` case.
+ The recording is only concerned with two action types: `START_RECORDING` and `STOP_RECORDING`. Return the appropriate next state for each case.

#### `tracksReducer`

`tracks` should be an object that stores track objects using their `id`s as keys.

Let's take a closer look at a track object.

```js
{
  id: 1,
  name: 'Track 1'
  roll:
  [
    { notes: [ 'a' ], timeSlice: 1250191 },
    { notes: [], timeSlice: 1255000 },
    { notes: [ 's', 'd' ], timeSlice: 1265180 }
    { notes: [], timeSlice: 1279511 }
  ],
  timeStart: 1470164117527
},
```

`roll` starts as an empty array.  While the user records a track, we'll need to
update `roll` as the user presses new notes. We append into the `roll` an object
with the following values:
+ `timeSlice` - the time elapsed since the track started recording;
+ `notes` - an array of note names (eg. `['a', 's', 'd']`)
We need to know the current time a note is played to calculate when to
play a note relative to the `timeStart` of the recording (`timeSlice`) and the
names of the notes actually played (`notes`).

Let's get stated writing our `tracksReducer`:

+ Create a `reducers/tracks_reducer.js` file; import your constants from `actions/tracks_actions.js`, and `merge` from `lodash/merge`.
+ Initialize a variable `currTrackId` to `0`. This variable will be used to set track ids and add notes to the newest recording.
+ `export default` your `tracksReducer`.
+ Use the ES6 default arguments syntax to return an empty object as the initial state.
+ Call `Object.freeze()` on `state` to keep from mutating it.
+ Add a `switch` statement and return `state` as the `default` case.
+ Add a case for each action type.
  + `START_RECORDING` -
    + Increment `currTrackId`.
    + Create a new track with the appropriate key-value pairs for `id`, `name`, `roll` and `timeStart`.
    + Use [`merge`][merge-lodash] to create a new object with the new track added to the state.
    + Return this object.
  + `STOP_RECORDING` -
    + Add a new roll to the current track's `roll` containing an empty array of `notes`, ensuring that the track is silent when it ends.
    + Calculate `timeSlice` with `action.timeNow - state[currTrackId].timeStart`.
    + Return the new state.
  + `ADD_NOTES` -
    + Add a new roll to the current track's `roll`.
    + Grab the `notes` played from the `action` and calculate the `timeSlice` as you did above.
    + Return the new state.

**NB**: State must never be mutated in the redux, so make sure you are calling
`Object.freeze(state)` and creating and returning new objects and arrays.
`Object.assign` returns a shallow copy of an object, which is why for nested
objects we must rely on `merge` from `lodash`.

[merge-lodash]:https://lodash.com/docs#merge

#### Root Reducer

+ Import your `tracksReducer` and `isRecordingReducer` reducers.
+ Update your root reducer so it combines your `notesReducer`, `tracksReducer` and `isRecordingReducer` reducers.
+ Test that this works by looking at your initial application state. Hint: do you still have store defined on the `window`?

## Phase 5: Recording Track Components

Now let's build the interface that users will use to add tracks to our store.

+ Create a new directory `components/recorder`.

### `RecorderContainer` Component

* Create a file `components/recorder/recorder.jsx`.
* Define and export `Recorder`, a functional component to start.
* Create a file `components/recorder/recorder_container.jsx`.
* Import `connect` from `react-redux` and your `Recorder`.
* Import your actions from `actions/track_actions.js`
* Define a `mapStateToProps(state)` function returning an object that maps the state's `tracks` and `isRecording`
* Import your `startRecording` and `stopRecording` action creators.
* Define a `mapDispatchToProps(dispatch)` function returning an object containing callback props for each of your action creators.
* Call `connect(mapStateToProps,
mapDispatchToProps)` on your `Recorder` component to connect it to your Redux
store.
* `export default` the result of this call.
* In your `App` component, import your `RecorderContainer` and render it.

### `Recorder` Component

* Return a `div` containing a "Start" and a "Stop" button.
* [De-structure][destructure] all of its `props` argument passed from the `RecorderContainer`.
* [Disable][disable] the "Start" button if `isRecording`, and `onClick`, `startRecording`.
* Disable the "Stop" button if not `isRecording`, and `onClick`, `stopRecording`.

Your code should look something like the following:

```js
// components/recorder/recorder.jsx

import React from 'react';

const Recorder = ({ isRecording, isPlaying, startRecording, stopRecording }) => (
  <div className='recorder'>
    <div className='recorder-title'>
      Recorder
    </div>
    <button
      className ='start-button'
      onClick={startRecording}
      disabled={isRecording || isPlaying}>
      Start
    </button>
    <button
      className='stop-button'
      onClick={stopRecording}
      disabled={!isRecording || isPlaying}>
      Stop
    </button>
  </div>
);


export default Recorder;
```

[destructure]:https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment#Pulling_fields_from_objects_passed_as_function_parameter
[disable]:http://www.w3schools.com/tags/att_button_disabled.asp

### `SynthContainer`

* Update `mapStateToProps` so that `Synth` has access to the state's  `isRecording` as well as `notes`.
* Import your `addNotes` action creator.
* Rewrite `mapDispatchToProps` to return an object containing a callback prop for `keyPressed(key)`, `keyReleased(key)`, and `addNotes(notes)`.

### `Synth` Component

* Rewrite `onKeyUp` and `onKeyDown` so that if `isRecording`, call `addNotes` passing it the store's `notes`.
* Don't remove the calls to `keyReleased` and `keyPressed` though! Two things are now happening:
  + Whenever the user presses/releases a key, the corresponding actions are dispatched to the store;
  + If you're recording, the notes currently in the store are saved to the end of the roll of the newest track in the state.

Now your synthesizer plays musical notes and records tracks! Nice.

## Phase 6: Jukebox

Let's create a `Jukebox` to display and play our recorded tracks. We're going to
add to the state a boolean `isPlaying` to indicate if a track is playing or not and add `isPlaying:false` to your preloaded state.

### Action Creators
* Create a `actions/playing_actions.js` file.
* Export `START_PLAYING` and `STOP_PLAYING` constants.
* Export `startPlaying` and `stopPlaying` action creators.
* Add a new `GROUP_UPDATE` constant to your `actions/notes_actions.js`. We'll be using this action to replace the `notes` in the store with notes from a track's roll.
* Export a `groupUpdate` action creator from `actions/notes_actions.js` which takes as an argument an array of `notes`.

### Reducers
* Create a `reducers/is_playing_reducer.js` file.
* Import `START_PLAYING` and `STOP_PLAYING`, and export an `isPlayingReducer`.
* Set the initial state to `false` and return the state by default.
* Create switch cases for `START_PLAYING` and `STOP_PLAYING`, setting the `isRecording` to the appropriate boolean value.
* In your `notes` reducer, add a new switch case for `GROUP_UPDATE`, replacing the `notes` in the state with `action.notes`.
* Update your root reducer to combine all of your reducers.

### Components

* Create a new directory `components/jukebox`.

#### `JukeboxContainer`

* Create a file `components/jukebox/jukebox.jsx`.
* Define and export `Jukebox`, a functional component to start.
* Create a file `components/jukebox/jukebox_container.jsx`.
* Import `connect` from `react-redux`, your `groupUpdate`, `startPlaying` and `stopPlaying` action creators, and your `Jukebox` component.
* Define `mapStateToProps` returning an object which maps the state's `tracks`, `isRecording`, and `isPlaying`.
* Define `mapDispatchToProps` returning an object containing a callback prop for `onPlay` which dispatches both action creators. We'll come back to defining it the following section.
* Call `connect`on your `Jukebox` component to connect it to your Redux store.
* Export the result of this call.
* Import and render your `JukeboxContainer` in your `App` component.

#### `onPlay`

`onPlay` is a [curried function][currying]. It takes as an argument a `track`
object and returns a function. This function takes as an argument an event `e`.
Your function definition should look like this:

```js
const onPlay = track => e => {
  ...
}
```

Remember a track's `roll` array stores track data in the form of:

```js
{
  notes: (notesArray),
  timeSlice: (time elapsed since startTime)
}
```

To play the notes in a track, we can't simply iterate over these objects because
iteration happens (essentially) instantaneously. We instead want to *throttle*
our iteration, such that we continue the next note once `Date.now() -
playBackStartTime` exceeds the current note's `timeSlice`. `setInterval` allows
us to invoke a callback over relatively large spans of time.

* In the body of your function, `dispatch` a `startPlaying` action.
* Grab `Date.now()` and assign it to a `playBackStartTime` variable.
* Initialize a `currNote` to `0`.
* Declare a `timeElapsed` variable

Now for the meat of this method, *throttling* our iteration using `setInterval`:
* Declare an `interval` variable.
* Assign `interval` to a `setInterval` call passing it an anonymous callback and a delay of `1`.
* The callback takes no arguments.
* The body of the callback should check whether `currNote` is still in range of the `roll`. *If so*,
  * Check whether `Date.now() - playBackStartTime` exceeds the current note's `timeSlice`. *If so*,
    * `dispatch` a `groupUpdate` action with the current note's `notes`.
    * Continue to the next note.
* *Else*, we've exceeded the range of the roll and finished playing the track. [Clear][clear-interval] `interval`.
* `dispatch` a `stopPlaying` action.

[currying]: https://www.sitepoint.com/currying-in-functional-javascript/
[set-interval]:https://developer.mozilla.org/en-US/docs/Web/API/WindowTimers/setInterval
[clear-interval]: https://developer.mozilla.org/en-US/docs/Web/API/WindowTimers/clearInterval

#### `Jukebox` Component

* [De-structure][destructure] its `props` argument.
* Return a `div` containing a list of `Track` components, which we will write next.

#### `Track` Component

* Create a file `components/jukebox/track.jsx`.
* Define and export a `Track` component, a `div` containing the name of the `track` and a "Play" button.
* Disable the "Play" button if `isRecording` or `isPlaying`. Add `onPlay(track)` for `onClick`.

#### Update Buttons

* Don't forget to update your "Start", "Stop", and "Play" buttons so that they are disabled if a track is playing.

## Phase 7: Style Your App

Now that you have your cool redux app with recording and playing track features, let's make your app look nice.

+ Create a new file `application.css`.
+ Add a reference to it in `index.html`.
+ Style your app. Refer to our [HTML/CSS Curriculum][html-curriculum].

I added these css classes to my components.
```
  + app

  + synth
  + note-key-list
  + note-key

  + recorder
  + start-button
  + stop-button

  + juke-box
  + track-list
  + track
  + play-button
  + delete-button
```

[html-curriculum]:https://github.com/appacademy/curriculum/tree/master/html-css

## Bonus Phase
* **Delete Tracks**: Add a feature to delete any track from your Jukebox.
* **Name your Tracks**: Add a feature to rename the tracks in your Jukebox.
* **Looping**: Add a setting to allow tracks to play continuously.
* **Playlists**: Queue up tracks to be played sequentially.
* Rewrite your Track to use [ES6 generators][generators] for recording and playback.

[generators]:https://davidwalsh.name/es6-generators