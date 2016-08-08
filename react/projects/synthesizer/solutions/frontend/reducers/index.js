import { combineReducers } from 'redux';
import notes from './notes_reducer';
import tracks from './tracks_reducer';
import recording from './recording_reducer';
import playing from './playing_reducer';

const reducer = combineReducers({
  notes,
  tracks,
  recording,
  playing
});

export default reducer;
