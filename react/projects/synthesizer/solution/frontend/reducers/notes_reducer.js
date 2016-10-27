import  { KEY_PRESSED,
          KEY_RELEASED,
          GROUP_UPDATE
        } from '../actions/notes_actions';

import { NOTE_NAMES } from '../util/tones';
import union from 'lodash/union';

const notesReducer = (state = [], action) => {
  Object.freeze(state)
  const validNote = NOTE_NAMES.includes(action.key); // check if the key corresponds to a note frequency
  const idx = state.indexOf(action.key); // check to see if note is in previous state

  switch(action.type) {
    case KEY_PRESSED:
      if (validNote && idx === -1) {
        return [
          ...state,
          action.key
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

export default notesReducer;
