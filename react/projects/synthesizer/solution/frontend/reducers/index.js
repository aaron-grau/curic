import { combineReducers } from 'redux';
import notes from './notes_reducer';
import tracks from './tracks_reducer';
import isRecording from './is_recording_reducer';
import isPlaying from './is_playing_reducer';

const reducer = combineReducers({
  notes,
  tracks,
  isRecording,
  isPlaying
});

export default reducer;
