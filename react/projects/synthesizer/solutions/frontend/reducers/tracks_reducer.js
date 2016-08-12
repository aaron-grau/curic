import { TracksConstants } from '../actions/tracks_actions';
import merge from 'lodash/merge';

let currTrackId = 0;

const track = (state, action) => {
  switch(action.type) {
    case TracksConstants.START_RECORDING:
      return {
        id: currTrackId,
        name: `Track ${currTrackId}`,
        roll: [],
        timeStart: action.timeStart
      };
    case TracksConstants.STOP_RECORDING:
      return merge({}, state, {
        roll: [
          ...state.roll,
          { notes: [], timeSlice: action.timeNow - state.timeStart }
        ]
      });
    case TracksConstants.ADD_NOTES:
      return merge({}, state, {
        roll: [
          ...state.roll,
          { notes: action.notes, timeSlice: action.timeNow - state.timeStart }
        ]
      });
    default:
      return state;
  }
};

const tracks = (state = rugratsTheme, action) => {
  switch(action.type) {
    case TracksConstants.START_RECORDING:
      currTrackId++; // increment id of current (newest) track
      return merge({}, state, {
        [currTrackId]: track(undefined, action)
      });
    case TracksConstants.STOP_RECORDING:
      return merge({}, state, {
        [currTrackId]: track(state[currTrackId], action)
      });
    case TracksConstants.ADD_NOTES:
      return merge({}, state, {
        [currTrackId]: track(state[currTrackId], action)
      });
    case TracksConstants.DELETE_TRACK:
      let nextState = merge({}, state);
      delete nextState[action.id];
      return nextState;
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
//     name: 'Track 1'
//     roll:
//     [ { notes: [ 'A5' ], timeSlice: 1250191 },
//       { notes: [ 'C5', 'D5' ], timeSlice: 1265180 }
//       { notes: [], timeSlice: 1279511 } ],
//     timeStart: 1470164117527
//   },
//   "2":
//   {
//     id: 2,
//     name: 'Track 2'
//     roll:
//     [ { notes: [ 'B5', 'C6', 'C6' ], timeSlice: 253386 },
//       { notes: [], timeSlice: 265216 } ],
//     timeStart: 1470173676236
//   },
// };

let rugratsTheme = {"0":{"id":0,"name":"Rugrats Theme","roll":[{"notes":["E5"],"timeSlice":755},{"notes":["E5","C5"],"timeSlice":763},{"notes":["C5"],"timeSlice":848},{"notes":[],"timeSlice":856},{"notes":["F5"],"timeSlice":1027},{"notes":["F5","D5"],"timeSlice":1032},{"notes":["D5"],"timeSlice":1138},{"notes":[],"timeSlice":1146},{"notes":["E5"],"timeSlice":1300},{"notes":["E5","G5"],"timeSlice":1309},{"notes":["G5"],"timeSlice":1406},{"notes":[],"timeSlice":1414},{"notes":["F5"],"timeSlice":1584},{"notes":["F5","A5"],"timeSlice":1591},{"notes":["F5"],"timeSlice":1728},{"notes":[],"timeSlice":1752},{"notes":["B5"],"timeSlice":1988},{"notes":["B5","G5"],"timeSlice":1994},{"notes":["G5"],"timeSlice":2124},{"notes":[],"timeSlice":2151},{"notes":["A5"],"timeSlice":2440},{"notes":["A5","C6"],"timeSlice":2445},{"notes":["A5"],"timeSlice":2574},{"notes":[],"timeSlice":2592},{"notes":["D6"],"timeSlice":3003},{"notes":["D6","B5"],"timeSlice":3007},{"notes":["B5"],"timeSlice":3118},{"notes":[],"timeSlice":3139},{"notes":["E5"],"timeSlice":3506},{"notes":["E5","G5"],"timeSlice":3513},{"notes":["E5"],"timeSlice":3617},{"notes":[],"timeSlice":3633},{"notes":["A5"],"timeSlice":3823},{"notes":["A5","F5"],"timeSlice":3828},{"notes":["F5"],"timeSlice":4005},{"notes":[],"timeSlice":4028},{"notes":["G5"],"timeSlice":4231},{"notes":["G5","E5"],"timeSlice":4251},{"notes":["E5"],"timeSlice":4364},{"notes":[],"timeSlice":4395},{"notes":["F5"],"timeSlice":4643},{"notes":["F5","D5"],"timeSlice":4651},{"notes":["D5"],"timeSlice":4835},{"notes":[],"timeSlice":4858},{"notes":[],"timeSlice":6202}],"timeStart":1470955099976}};