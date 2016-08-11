import { combineReducers } from 'redux';
import notes from './notes_reducer';
import tracks from './tracks_reducer';
import isRecording from './isRecording_reducer';
import playing from './playing_reducer';

const reducer = combineReducers({
  notes,
  tracks,
  isRecording,
  playing
});

export default reducer;
