import { TracksConstants } from '../actions/tracks_actions';

const isRecording = (state = false, action) => {
  switch(action.type) {
    case TracksConstants.START_RECORDING:
      return true;
    case TracksConstants.STOP_RECORDING:
      return false;
    default:
      return state;
  }
};

export default isRecording;
