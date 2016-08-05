import { NotesConstants } from '../actions/notes_actions';
import { NOTES } from '../constants/tones';

const validKeys = ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', "'"];
const keyMap = {}; // maps keyboard keys to notes
validKeys.forEach((key, i) => {
  keyMap[key] = NOTES[i];
});

const notes = (state = [], action) => {
  const note = keyMap[action.key]; // convert key to note
  const alreadyPlaying = state.indexOf(note) !== -1; // check to see if note is in previous state

  switch(action.type) {
    case NotesConstants.KEY_PRESSED:
      if (note && !alreadyPlaying) {
        return [
          ...state,
          note
        ];
      }
      return state;
    case NotesConstants.KEY_RELEASED:
      if (alreadyPlaying) {
        return [
          ...state.slice(0, idx),
          ...state.slice(idx + 1)
        ];
      }
      return state;
    case NotesConstants.GROUP_UPDATE:
      return [
        ...action.notes
      ];
    default:
      return state;
  }
};

export default notes;
