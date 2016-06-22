const Store = require ("flux/utils").Store;
const OrganConstants = require("../constants/organ_constants");
const AppDispatcher = require('../dispatcher/dispatcher');
const TrackStore = new Store(AppDispatcher);

let _tracks = [];

TrackStore.all = function() {
  return _tracks.slice(0);
};

TrackStore.__onDispatch = function(payload) {
  switch(payload.actionType){
  case OrganConstants.ADD_TRACK:
    TrackStore._addTrack(payload.track);
    break;
  case OrganConstants.RESET_TRACKS:
    TrackStore._resetTracks(payload.tracks);
    break;
  case OrganConstants.DELETE_TRACK:
    TrackStore._deleteTrack(payload.id);
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

TrackStore._deleteTrack = function (id) {
  let idx;
  for(let i = 0; i < _tracks.length; i++) {
    if(_tracks[i].attributes.id === id) idx = i;
  }
  _tracks.splice(idx, 1);
  this.__emitChange();
};


module.exports = TrackStore;
