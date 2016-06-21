let _tracks = [];
const Store = require ("flux/utils").Store;
const OrganConstants = require("../constants/organ_constants");
const AppDispatcher = require('../dispatcher/dispatcher');
const TrackStore = new Store(AppDispatcher);


TrackStore.all = () => _tracks.slice(0);

TrackStore.__onDispatch = payload => {
  switch(payload.actionType){
  case OrganConstants.ADD_TRACK:
    TrackStore._addTrack(payload.track);
    break;
  case OrganConstants.RESET_TRACKS:
    TrackStore._resetTracks(payload.tracks);
    break;
  default:
  }
};

TrackStore._addTrack = function (track) {
  const idx = _tracks.indexOf(track);
  if (idx == -1) {
    _tracks.push(track);
    this.__emitChange();
  }
};

TrackStore._resetTracks = function (tracks) {
  _tracks = tracks.slice();
  this.__emitChange();
};


module.exports = TrackStore;
