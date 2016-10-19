import { KEY_PRESSED, KEY_RELEASED, GROUP_UPDATE } from '../actions/notes_actions';
import { NOTE_NAMES } from '../util/tones';
import union from 'lodash/union';

const validKeys = ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', "'", "Enter"];
const keyMap = {}; // maps keyboard keys to notes
validKeys.forEach((key, i) => {
  keyMap[key] = NOTE_NAMES[i];
});

const notes = (state = [], action) => {
  const note = keyMap[action.key]; // convert key to note
  const idx = state.indexOf(note); // check to see if note is in previous state

  switch(action.type) {
    case KEY_PRESSED:
      if (note && idx === -1) {
        return [
          ...state,
          note
        ];
      }
      return state;
    case KEY_RELEASED:
      if (idx !== -1) {
        return [
          ...state.slice(0, idx),
          ...state.slice(idx + 1)
        ];
      }
      return state;
    case GROUP_UPDATE:
      return [
        ...action.notes
      ];
    default:
      return state;
  }
};

export default notes;
