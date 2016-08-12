import { TracksConstants } from '../actions/tracks_actions';
import merge from 'lodash/merge';

let currTrackId = 1;

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

const tracks = (state = preloadedTracks, action) => {
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

const rugratsTheme = {"id":0,"name":"Rugrats Theme","roll":[{"notes":["E5"],"timeSlice":755},{"notes":["E5","C5"],"timeSlice":763},{"notes":["C5"],"timeSlice":848},{"notes":[],"timeSlice":856},{"notes":["F5"],"timeSlice":1027},{"notes":["F5","D5"],"timeSlice":1032},{"notes":["D5"],"timeSlice":1138},{"notes":[],"timeSlice":1146},{"notes":["E5"],"timeSlice":1300},{"notes":["E5","G5"],"timeSlice":1309},{"notes":["G5"],"timeSlice":1406},{"notes":[],"timeSlice":1414},{"notes":["F5"],"timeSlice":1584},{"notes":["F5","A5"],"timeSlice":1591},{"notes":["F5"],"timeSlice":1728},{"notes":[],"timeSlice":1752},{"notes":["B5"],"timeSlice":1988},{"notes":["B5","G5"],"timeSlice":1994},{"notes":["G5"],"timeSlice":2124},{"notes":[],"timeSlice":2151},{"notes":["A5"],"timeSlice":2440},{"notes":["A5","C6"],"timeSlice":2445},{"notes":["A5"],"timeSlice":2574},{"notes":[],"timeSlice":2592},{"notes":["D6"],"timeSlice":3003},{"notes":["D6","B5"],"timeSlice":3007},{"notes":["B5"],"timeSlice":3118},{"notes":[],"timeSlice":3139},{"notes":["E5"],"timeSlice":3506},{"notes":["E5","G5"],"timeSlice":3513},{"notes":["E5"],"timeSlice":3617},{"notes":[],"timeSlice":3633},{"notes":["A5"],"timeSlice":3823},{"notes":["A5","F5"],"timeSlice":3828},{"notes":["F5"],"timeSlice":4005},{"notes":[],"timeSlice":4028},{"notes":["G5"],"timeSlice":4231},{"notes":["G5","E5"],"timeSlice":4251},{"notes":["E5"],"timeSlice":4364},{"notes":[],"timeSlice":4395},{"notes":["F5"],"timeSlice":4643},{"notes":["F5","D5"],"timeSlice":4651},{"notes":["D5"],"timeSlice":4835},{"notes":[],"timeSlice":4858},{"notes":[],"timeSlice":6202}],"timeStart":1470955099976};
const californiaGirls = {"id":1,"name":"California Girls","roll":[{"notes":["F5"],"timeSlice":940},{"notes":[],"timeSlice":1072},{"notes":["F5"],"timeSlice":1312},{"notes":[],"timeSlice":1482},{"notes":["F5"],"timeSlice":1698},{"notes":["F5","D5"],"timeSlice":2074},{"notes":["D5"],"timeSlice":2092},{"notes":[],"timeSlice":2281},{"notes":["F5"],"timeSlice":2297},{"notes":["F5","D5"],"timeSlice":2699},{"notes":["D5"],"timeSlice":2760},{"notes":["D5","F5"],"timeSlice":2914},{"notes":["F5"],"timeSlice":2948},{"notes":[],"timeSlice":3058},{"notes":["G5"],"timeSlice":3129},{"notes":[],"timeSlice":3240},{"notes":["A5"],"timeSlice":3364},{"notes":[],"timeSlice":3456},{"notes":["A5"],"timeSlice":3559},{"notes":[],"timeSlice":3669},{"notes":["F5"],"timeSlice":3789},{"notes":[],"timeSlice":4016},{"notes":["F5"],"timeSlice":4189},{"notes":[],"timeSlice":4392},{"notes":["F5"],"timeSlice":4572},{"notes":[],"timeSlice":4806},{"notes":["F5"],"timeSlice":4981},{"notes":[],"timeSlice":5216},{"notes":["F5"],"timeSlice":5407},{"notes":["F5","C5"],"timeSlice":5623},{"notes":["C5"],"timeSlice":5642},{"notes":[],"timeSlice":5895},{"notes":["C5"],"timeSlice":5998},{"notes":[],"timeSlice":6217},{"notes":["G5"],"timeSlice":6221},{"notes":[],"timeSlice":6492},{"notes":["F5"],"timeSlice":6605},{"notes":["F5"],"timeSlice":7104},{"notes":[],"timeSlice":7131},{"notes":["F5"],"timeSlice":7361},{"notes":[],"timeSlice":7576},{"notes":["F5"],"timeSlice":7757},{"notes":[],"timeSlice":7915},{"notes":["F5"],"timeSlice":8142},{"notes":[],"timeSlice":8530},{"notes":["D5"],"timeSlice":8540},{"notes":["D5","F5"],"timeSlice":8736},{"notes":["F5"],"timeSlice":8756},{"notes":["F5","D5"],"timeSlice":9147},{"notes":["D5"],"timeSlice":9208},{"notes":[],"timeSlice":9355},{"notes":["F5"],"timeSlice":9379},{"notes":[],"timeSlice":9525},{"notes":["G5"],"timeSlice":9576},{"notes":[],"timeSlice":9707},{"notes":["A5"],"timeSlice":9785},{"notes":[],"timeSlice":9876},{"notes":["A5"],"timeSlice":9970},{"notes":[],"timeSlice":10138},{"notes":["F5"],"timeSlice":10191},{"notes":["F5"],"timeSlice":10687},{"notes":[],"timeSlice":10763},{"notes":["D6"],"timeSlice":10850},{"notes":[],"timeSlice":11057},{"notes":["C6"],"timeSlice":11425},{"notes":[],"timeSlice":11658},{"notes":["G5"],"timeSlice":11686},{"notes":[],"timeSlice":11802},{"notes":["A5"],"timeSlice":11809},{"notes":["A5","C6"],"timeSlice":11909},{"notes":["C6"],"timeSlice":11934},{"notes":[],"timeSlice":12124},{"notes":["G5"],"timeSlice":12134},{"notes":["G5","A5"],"timeSlice":12196},{"notes":["A5"],"timeSlice":12261},{"notes":[],"timeSlice":12313},{"notes":["C6"],"timeSlice":12318},{"notes":["C6","G5"],"timeSlice":12534},{"notes":["G5"],"timeSlice":12545},{"notes":["G5","A5"],"timeSlice":12597},{"notes":["A5"],"timeSlice":12645},{"notes":[],"timeSlice":12697},{"notes":["C6"],"timeSlice":12730},{"notes":[],"timeSlice":13042},{"notes":["C6"],"timeSlice":13209},{"notes":["C6","G5"],"timeSlice":13402},{"notes":["G5"],"timeSlice":13423},{"notes":["G5","A5"],"timeSlice":13486},{"notes":["A5"],"timeSlice":13577},{"notes":[],"timeSlice":13607},{"notes":["C6"],"timeSlice":13637},{"notes":["C6","G5"],"timeSlice":13843},{"notes":["G5"],"timeSlice":13888},{"notes":["G5","A5"],"timeSlice":13915},{"notes":["A5"],"timeSlice":13995},{"notes":[],"timeSlice":14032},{"notes":["C6"],"timeSlice":14064},{"notes":[],"timeSlice":14300},{"notes":["A5"],"timeSlice":14318},{"notes":[],"timeSlice":14611},{"notes":[],"timeSlice":15793}],"timeStart":1470964065425};
const preloadedTracks = {"0":rugratsTheme, "1":californiaGirls};
