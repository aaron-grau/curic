import { NoteConstants } from '../actions/note_actions';

const notes = (state = [], action) => {
  switch(action.type) {
    case NoteConstants.GROUP_UPDATE:
      return [
        ...action.notes
      ];
    case NoteConstants.KEY_PRESSED:
      return [
        ...state,
        action.note
      ];
    case NoteConstants.KEY_RELEASED:
      const idx = state.indexOf(action.note);
      return [
        ...state.slice(0, idx),
        ...state.slice(idx + 1)
      ];
    default:
      return state;
  }
};

export default notes;
