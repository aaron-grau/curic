import { combineReducers } from 'redux';
import notes from './notes';
import tracks from './tracks';

const pianoApp = combineReducers({
  notes,
  tracks
});

export default pianoApp;
