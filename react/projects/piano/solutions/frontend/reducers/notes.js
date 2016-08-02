import { NoteConstants } from '../actions/note_actions';
import { NOTES } from '../constants/tones';

const validKeys = ['a', 's', 'd', 'f', 'j', 'k', 'l'];
const keyMap = {}; // maps keyboard keys to notes
validKeys.forEach((key, i) => {
  keyMap[key] = NOTES[i];
});

const notes = (state = [], action) => {
  const note = keyMap[action.key]; // convert key to note
  const idx = state.indexOf(note); // check to see if it's in the state tree

  switch(action.type) {
    case NoteConstants.KEY_PRESSED:
      if (note && idx === -1) {
        return [
          ...state,
          note
        ];
      }
      return state;
    case NoteConstants.KEY_RELEASED:
      if (idx !== -1) {
        return [
          ...state.slice(0, idx),
          ...state.slice(idx + 1)
        ];
      }
      return state;
    default:
      return state;
  }
};

export default notes;
