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
  // can't explain the 0.3 - it's a reasonable value
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

## Phase 3: 
