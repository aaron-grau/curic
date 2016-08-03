import { TrackConstants } from '../actions/track_actions';

let currTrackId = 0;

const track = (state, action) => {
  switch(action.type) {
    case TrackConstants.START_RECORDING:
      return {
        id: currTrackId,
        roll: [],
        timeStart: action.timeStart
      };
    case TrackConstants.STOP_RECORDING:
      return Object.assign({}, state, {
        roll: [
          ...state.roll,
          { notes: [], timeSlice: action.timeNow - state.timeStart }
        ]
      });
    case TrackConstants.ADD_NOTES:
      return Object.assign({}, state, {
        roll: [
          ...state.roll,
          { notes: action.notes, timeSlice: action.timeNow - state.timeStart }
        ]
      });
    default:
      return state;
  }
};

const tracks = (state = {}, action) => {
  switch(action.type) {
    case TrackConstants.START_RECORDING:
      currTrackId++; // increment id of current (newest) track
      return Object.assign({}, state, {
        [currTrackId]: track(undefined, action)
      });
    case TrackConstants.STOP_RECORDING:
      return Object.assign({}, state, {
        [currTrackId]: track(state[currTrackId], action)
      });
    case TrackConstants.ADD_NOTES:
      return Object.assign({}, state, {
        [currTrackId]: track(state[currTrackId], action)
      });
    default:
      return state;
  }
};

export default tracks;

// sample state tree - tracks:
// {
//   "1":
//   {
//     id: 1,
//     roll:
//     [ { notes: [ 'A5' ], timeSlice: 1250191 },
//       { notes: [ 'C5', 'D5' ], timeSlice: 1265180 }
//       { notes: [], timeSlice: 1279511 } ],
//     timeStart: 1470164117527
//   },
//   "2":
//   {
//     id: 2,
//     roll:
//     [ { notes: [ 'B5', 'C6', 'C6' ], timeSlice: 253386 },
//       { notes: [], timeSlice: 265216 } ],
//     timeStart: 1470173676236
//   },
// };
