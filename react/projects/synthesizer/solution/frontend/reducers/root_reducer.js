import { combineReducers } from 'redux';
import notesReducer from './notes_reducer';
import tracksReducer from './tracks_reducer';
import isRecordingReducer from './is_recording_reducer';
import isPlayingReducer from './is_playing_reducer';

const rootReducer = combineReducers({
  notes: notesReducer,
  tracks: tracksReducer,
  isRecording: isRecordingReducer,
  isPlaying: isPlayingReducer
});

export default rootReducer;
