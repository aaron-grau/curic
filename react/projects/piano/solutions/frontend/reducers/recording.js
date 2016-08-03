import { TracksConstants } from '../actions/track_actions';

const recording = (state = false, action) => {
  // console.log("recording", action.type);
  switch(action.type) {
    case TracksConstants.START_RECORDING:
      return true;
    case TracksConstants.STOP_RECORDING:
      return false;
    default:
      return state;
  }
}

export default recording;
