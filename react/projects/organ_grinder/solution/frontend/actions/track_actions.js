const AppDispatcher = require("../dispatcher/dispatcher");
const OrganConstants = require("../constants/organ_constants");

const TrackActions = {
  addTrack(track) {
    AppDispatcher.dispatch({
      actionType: OrganConstants.ADD_TRACK,
      track
    });
  },

  createTrack(track) {
    AppDispatcher.dispatch({
      actionType: OrganConstants.CREATE_TRACK,
      track
    });
  },

  resetTracks(tracks) {
    AppDispatcher.dispatch({
      actionType: OrganConstants.RESET_TRACKS,
      tracks
    });
  }
};

module.exports = TrackActions;
