# Redux Piano Project

Live demo available [here][demo]!

[demo]:

## Overview
We'll use React.js and Redux to create our own musical keyboard!

**NB:** Make sure to test as you go. Your understanding will suffer if you code an entire section before figuring out how to make it run. Start small and append.

## Phase 1: Redux Structure

* Create a project directory.
* Run `npm init --yes` to set up your `package.json`.
* Run `npm install --save webpack react react-dom react-redux redux babel-core babel-loader babel-preset-es2015 babel-preset-react` to set up React and Redux.
* Run `npm install --save jquery`. We'll be using jQuery later.
* Create a `frontend` folder at the root of your project to contain your front-end code.
* Model your `frontend` folder on the diagram below:

```
frontend/
  + actions/
  + components/
  + constants/
  + reducers/
  + store/
  + util/
  + piano.jsx
```

These folders will store our front-end goodies.
* Next, configure your webpack setup in `webpack.config.js` to compile all of your JS into a `bundle.js`.

## Phase 2: Notes!

First, make a `note.js` file inside of your `util` folder. We'll provide the code for this phase. Copy and paste the following into `note.js`

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

const Note = function (freq) {
  this.oscillatorNode = createOscillator(freq);
  this.gainNode = createGainNode();
  this.oscillatorNode.connect(this.gainNode);
};

Note.prototype.start = function () {
  this.gainNode.gain.value = 0.3;
};

Note.prototype.stop = function () {
  this.gainNode.gain.value = 0;
}

module.exports = Note;
```

Test that you can play a note from the console by passing in a sample frequency, like 800.

#### `Tones`

Create a `constants/tones.js` file. From there export a `TONES` constant, a JavaScript object mapping note names to frequencies. Feel free to use [this table][note-frequencies] as a resource!

[note-frequencies]: http://www.phy.mtu.edu/~suits/notefreqs.html

## Phase 3: Key

#### Action Creators
Let's define the actions that represent what happened.

#### Reducer
Now that we've defined the actions that will send data from your app to the store, let's define the reducers that update the state base on the actions.


#### Store
Let's create a store that holds the state and calls the reducer when an action is dispatched.

Recap, in Redux a store is responsible for:
+ holding your app's state
+ allowing access to state via `getState()`
+ allowing state to be updated via `dispatch(action)`
+ registering listeners via `subscribe(listener)`
+ handling the unregistering of listeners

In `piano.jsx`, import `createStore()` from `redux`. To create the store, call `createStore` and pass it your app's reducer. Now the store will call the reducer function you gave it whenever `dispatch(action)` is called within your app. The store saves the complete state tree that is returned by the root reducer, and every listener registered will be called in response to the new state.

### KeyListeners

Create a `util/key_listeners.js` file. This file will hold jQuery listener for `keyup` and `keydown` events. Install event handlers by calling the `on` methods on `$(document)`. Wrap these two listeners within a single function that will be your entire export.

```js
// util/key_listerners.js
module.exports = () => {
  $(document).on('keydown', (e) => {
    // dispatch a keyAction to add key
  });
  $(document).on('keyup', (e) => {
    // dispatch a keyAction to remove key
  });
}
```

When a user presses a key, the key listener should call your `keyPressed(key)` function from `notes_actions.js`, which will change add a key to the state of your application. Likewise, when a user releases a key, the listener should call your `keyReleased(key)` function to remove the key from the state.

There's a helpful property of the `KeyboardEvent` to determine which `key` to pass to your action.

**NB:** Do not create an instance of a `Note` here. The callback function of each jQuery listener should pass the key alone to the action. The state keeps track of which keys are pressed. We'll store `Note` objects as instance variables in our React components.

**NB:** A jQuery `'keydown'` listener fires repeatedly when the user holds down a key, which will repeatedly trigger our `keyPressed` function. Ensure that you call the `keyPressed` function only once per key by only adding the key to the state if it isn't already added!

Make sure that your have your key actions, reducer and listeners working before continuing.

## Phase 4: React Components

### Presentational vs Container Components
#### Presentational Components
+ are concerned with how things look
+ do not specify how the data is loaded or mutated
+ receive data and callbacks exclusively via `props`
+ rarely have their own state - when they do, its UI state rather than app data
+ are written as functional components unless they need internal state, lifecycle hoots, etc.
+ not aware of Redux
+ read data from props
+ to change data: invoke callbacks from `props`
+ generated by hand

#### Containers
+ are concerned with how things work
+ provide the data and behavior to presentational and/or other container components
+ often state-ful
+ technically, a container is a React component that uses `store.subscribe` to read parts of the Redux state tree and supply `props` to the presentational component(s) it renders
+ aware of Redux
+ subscribe to Redux state
+ to change state/data: dispatch Redux actions
+ can be written by hand or generated by `react-redux` using `connect()`

Why to introduce containers?
+ start with presentational components
+ when you start passing too may props down to immediate components and some components don't use the props they receive, but merely forward them down and you have to rewire all of those intermediate components - it's a good time to create container components
+ need containers to connect presentational components to the Redux store

Using `connect()` from `react-redux`:
1. define a function called `mapStateToProps` that tells the container how to transform the current Redux store state into the props you want to pass the presentational component(s) wrapped
2. define a function called `mapDispatchToProps` that receives the `dispatch` method and returns callback props that you want to inject into the presentational component(s) wrapped
3. call `connect(mapStateToProps, mapDispatchToProps) `

*TL;DR:* `mapStateToProps` reads the state held by the store and `mapDispatchToProps` dispatches actions to the store.
### `NoteKey`

Let's write a `NoteKey` React class component. We're calling it `NoteKey` to distinguish it from the keyboard's keys.

This component will be the visual representation of a single note in your piano. It's also the component responsible for whether or not to play a `Note`. The `Piano` component will pass `NoteKey` a single `key` as a prop. After `NoteKey` has mounted, create a new `Note` instance and store it as an instance variable.

Flashback: your `Note` constructor takes a frequency as a parameter, not a string. Use your `Tones` constant to convert the string to the right frequency.

The `NoteKey` component listens to the store. If its `key` is in the state, then the `NoteKey` should `start` its `Note`.

Add a listener in `componentDidMount`. Remember to store the listener as an instance variable so you can remove it in `componentWillUnmount`.

### `Piano`

Let's support more than one `NoteKey` by creating a `Piano` component (`components/piano.jsx`). It will render a `NoteKey` for each of the `TONES`.

Now we can test our setup. When your `Piano` is mounted it should call the method we exported from `util/key_listeners`, thereby adding `keydown` and `keyup` event listeners. In `piano.jsx` use `ReactDOM` to position our `Piano` on the page. Remember to provide an HTML container as the second argument of `ReactDOM.render`. Open your HTML file and press some keys. You should hopefully hear sound!

If you don't here anything, first check for errors in your console and errors in the `webpack`ing. Follow the redux pattern to debug piece by piece. Start at the beginning and debug your way through.

## Phase 5: Style your Piano

Use your css knowledge and style your components so that it looks like a piano.

Bonus:  Using CSS rules and the `state` of your `NoteKey` components, visually update
a `NoteKey` when the user plays its note.


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
* **Jam Session**: Allow users to play while a track runs in the background.
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
