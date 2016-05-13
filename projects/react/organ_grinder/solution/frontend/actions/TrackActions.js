var AppDispatcher = require("../dispatcher/Dispatcher"),
    OrganConstants = require("../constants/OrganConstants");

var TrackActions = {
  addTrack: function (track) {
    AppDispatcher.dispatch({
      actionType: OrganConstants.ADD_TRACK,
      track: track
    });
  },

  createTrack: function (track) {
    AppDispatcher.dispatch({
      actionType: OrganConstants.CREATE_TRACK,
      track: track
    });
  },

  resetTracks: function (tracks) {
    AppDispatcher.dispatch({
      actionType: OrganConstants.RESET_TRACKS,
      tracks: tracks
    });
  }
};

module.exports = TrackActions;
