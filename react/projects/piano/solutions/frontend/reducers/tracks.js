import { TrackConstants } from '../actions/track_actions';

let index = 0;

const track = (state, action) => {
  switch(action.type) {
    case TrackConstants.START_RECORDING:
      let trackId = index++; // increment id
      let newTrack = {}
      return newTrack[trackId] = {
        id: trackId,
        roll: [],
        timeStart: action.timeStart
      }
    case TrackConstants.STOP_RECORDING:
      let timeSlice = action.timeNow - state.timeStart;
      return Object.assign({}, state,
        roll: [
          ...state.roll,
          { notes: [], timeSlice: timeSlice }
        ]
      );
    case TrackConstants.ADD_NOTES:
      let timeSlice = action.timeNow - state.timeStart;
      return Object.assign({}, state,
        roll: [
          ...state.roll,
          { notes: state.notes, timeSlice: timeSlice }
        ]
      );
    default:
      return state;
  }
};

const tracks = (state = {}, action) => {
  switch(action.type) {
    case TrackConstants.START_RECORDING:
      return Object.assign({}, state,
        track(undefined, action)
      );
    case TrackConstants.STOP_RECORDING:
      return Object.assign({}, state,
        track(state[index], action)
      );
    case TrackConstants.ADD_NOTES:
      return Object.assign({}, state,
        track(state[index], action)
      );
    default:
      return state;
  }
};
