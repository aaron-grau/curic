import { combineReducers } from 'redux';
import notes from './notes';
import tracks from './tracks';
import recording from './recording';

const pianoApp = combineReducers({
  notes,
  tracks,
  recording
});

export default pianoApp;
