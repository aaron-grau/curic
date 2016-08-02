import $ from 'jquery';
import { NOTES } from '../constants/tones';

const validKeys = ['a', 's', 'd', 'f', 'j', 'k', 'l'];

const keyMap = {};
validKeys.forEach((key, i) => { // maps keyboard keys to notes
  keyMap[key] = NOTES[i];
});

const heldKeys = [];

export const keyDown = (e) => {
  const key = e.key;
  const valid = validKeys.indexOf(key) !== -1;
  const held = heldKeys.indexOf(key) !== -1;
  if (valid && !held) {
    heldKeys.push(key);
    console.log("down", keyMap[key]);
    return keyMap[key]; // note to be added to the state
  }
};

export const keyUp = (e) => {
  const key = e.key;
  const idx = heldKeys.indexOf(key);
  if (idx !== -1) {
    heldKeys.splice(idx, 1);
    console.log("up", keyMap[key]);
    return keyMap[key]; // note to be removed from the state
  }
};
