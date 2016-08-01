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

#### Actions

#### Reducer

### KeyListeners

Create a `util/key_listeners.js` file. This file will hold jQuery listerner for `keyup` and `keydown` events. Install event handlers by calling the `on` methods on `$(document)`. Wrap these two listeners within a single function that will be your entire export.

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

When a user presses a key, the key listener should call your `keyPressed(key)` function from `key_actions.js`, which will change add a key to the state of your application. Likewise, when a user releases a key, the listener should call your `keyReleased(key)` function to remove the key from the state.

There's a helpful property of the `KeyboardEvent` to determine which `key` to pass to your action.

**NB:** Do not create an instance of a `Note` here. The callback function of each jQuery listener should pass the key alone to the action. The state keeps track of which keys are pressed. We'll store `Note` objects as instance variables in our React components.

**NB:** A jQuery `'keydown'` listener fires repeatedly when the user holds down a key, which will repeatedly trigger our `keyPressed` function. Ensure that you call the `keyPressed` function only once per key by only adding the key to the state if it isn't already added!

Make sure that your have your key actions, reducer and listeners working before continuing.

## Phase 4: React Components

### `NoteKey`

Let's write a `NoteKey` React class component. We're calling it `NoteKey` to distinguish it from the keyboard's keys.

This component will be the visual representation of a single note in your piano. It's also the component responsible for whether or not to play a `Note`. The `Piano` component will pass `NoteKey` a single `key` as a prop. After `NoteKey` has mounted, create a new `Note` instance and store it as an instance variable.

Flashback: your `Note` constructor takes a frequency as a parameter, not a string. Use your `Tones` constant to convert the string to the right frequency.

The `NoteKey` component listens to the store. If its `key` is in the state, then the `NoteKey` should `start` its `Note`.

Add a listener in `componentDidMount`. Remember to store the listener as an instance variable so you can remove it in `componentWillUnmount`.
