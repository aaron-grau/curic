import { RecordingConstants } from '../actions/recording_actions';

const recording = (state = false, action) => {
  switch(action.type) {
    case RecordingConstants.START_RECORDING:
      return true;
    case RecordingConstants.STOP_RECORDING:
      return false;
    default:
      return state;
  }
}

export default recording;
