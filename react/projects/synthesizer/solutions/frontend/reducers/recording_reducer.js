import { TracksConstants } from '../actions/tracks_actions';

const recording = (state = false, action) => {
  switch(action.type) {
    case TracksConstants.START_RECORDING:
      return true;
    case TracksConstants.STOP_RECORDING:
      return false;
    default:
      return state;
  }
};

export default recording;
