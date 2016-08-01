import $ from 'jquery';
import TONES from '../constants/tones';

 const notes = Object.keys(TONES);
 const validKeys = ['a', 's', 'd', 'f', 'j', 'k', 'l'];

 const keyMap = {};
 validKeys.forEach((key, i) => { // maps keyboard keys to notes
   keyMap[key] = notes[i];
 });

 const heldKeys = [];

const keyDown = (e) => {
  const key = e.key;
  const valid = validKeys.indexOf(key) !== -1;
  const held = heldKeys.indexOf(key) !== -1;
  if (valid && !held) {
    heldKeys.push(key);
    return keyMap[key]; // note to be added to the state
  }
};

export default keyDown;

const keyUp = (e) => {
  const key = e.key;
  const idx = heldKeys.indexOf(key);
  if (idx !== -1) {
    heldKeys.splice(idx, 1);
    return keyMap[key]; // note to be removed from the state
  }
};
